#!/usr/bin/env python3
"""
Authentication & Team User Management for CDPK System Planner.
Supports role-based access control (Admin, Engineer/Presales, Sales),
salted PBKDF2 password hashing, session tokens, and full two-way
synchronization with Google Sheets ('Team_Users' tab).
"""

import hashlib
import json
import logging
import os
import secrets
import time
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional, Tuple

logger = logging.getLogger("cdpk.auth")

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
USERS_FILE = os.path.join(DATA_DIR, "users.json")

# In-memory active session store: token -> session dict
_ACTIVE_SESSIONS: Dict[str, Dict[str, Any]] = {}
SESSION_TTL_SECONDS = 7 * 24 * 3600  # 7 days

# In-memory user cache with TTL
_USERS_CACHE: Dict[str, Any] = {
    "users": None,
    "last_sync": 0
}


def _hash_password(password: str, salt: str) -> str:
    """PBKDF2-HMAC-SHA256 password hashing."""
    return hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt.encode("utf-8"),
        100000
    ).hex()


def _get_initial_users() -> List[Dict[str, Any]]:
    """Seed default team accounts for CDPK team (Admin only)."""
    default_users = [
        {
            "username": "adrian",
            "email": "adrian@citradata.id",
            "name": "Adrian Kansil",
            "role": "admin",
            "title": "Principal Lead & Solutions Architect",
            "salt": secrets.token_hex(16),
            "password_hash": "",
            "status": "active",
            "created_at": "2026-10-17 00:00:00"
        }
    ]
    for u in default_users:
        u["password_hash"] = _hash_password("cdpk2026!", u["salt"])
    return default_users


# ─────────────────────────────────────────────────────────────────────────────
# Google Sheets REST API Integration for Team Users
# ─────────────────────────────────────────────────────────────────────────────

def _get_gdrive_token() -> Optional[str]:
    """Import and invoke get_access_token from server.gdrive_sync."""
    try:
        from server.gdrive_sync import get_access_token
        return get_access_token("citradata")
    except Exception as e:
        logger.warning(f"Failed getting GDrive token: {e}")
        return None


def _get_spreadsheet_id() -> str:
    """Return configured Master Spreadsheet ID."""
    try:
        from server.gdrive_sync import DEFAULT_SPREADSHEET_ID
        return DEFAULT_SPREADSHEET_ID
    except Exception:
        return os.environ.get("GDRIVE_SPREADSHEET_ID", "1Kp85v81JXeRC5ti-ZXYBChgrj2ztnnwrCHokI02LX6U")


def _ensure_team_users_sheet(token: str, spreadsheet_id: str) -> bool:
    """Ensure that the 'Team_Users' tab exists in the spreadsheet."""
    try:
        url_meta = f"https://sheets.googleapis.com/v4/spreadsheets/{spreadsheet_id}?fields=sheets.properties"
        req = urllib.request.Request(url_meta, headers={"Authorization": f"Bearer {token}"})
        with urllib.request.urlopen(req, timeout=12) as resp:
            meta = json.loads(resp.read().decode("utf-8"))
        sheet_titles = [s["properties"]["title"] for s in meta.get("sheets", [])]
        if "Team_Users" in sheet_titles:
            return True

        # Create tab
        add_url = f"https://sheets.googleapis.com/v4/spreadsheets/{spreadsheet_id}:batchUpdate"
        body = {
            "requests": [
                {
                    "addSheet": {
                        "properties": {
                            "title": "Team_Users",
                            "gridProperties": {"rowCount": 100, "columnCount": 10}
                        }
                    }
                }
            ]
        }
        req_add = urllib.request.Request(
            add_url,
            data=json.dumps(body).encode("utf-8"),
            headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
        )
        with urllib.request.urlopen(req_add, timeout=15) as resp_add:
            pass

        # Populate headers & initial seed
        headers = [
            "username", "name", "email", "role", "title",
            "password", "password_hash", "salt", "status", "created_at"
        ]
        initial_users = _get_initial_users()
        rows = [headers]
        for u in initial_users:
            rows.append([
                u["username"], u["name"], u["email"], u["role"], u["title"],
                "cdpk2026!", u["password_hash"], u["salt"], u.get("status", "active"), u.get("created_at", "")
            ])

        val_url = f"https://sheets.googleapis.com/v4/spreadsheets/{spreadsheet_id}/values/Team_Users!A1:J{len(rows)}?valueInputOption=USER_ENTERED"
        req_val = urllib.request.Request(
            val_url,
            data=json.dumps({"range": f"Team_Users!A1:J{len(rows)}", "values": rows}).encode("utf-8"),
            headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
            method="PUT"
        )
        with urllib.request.urlopen(req_val, timeout=15) as resp_val:
            pass
        return True
    except Exception as e:
        logger.warning(f"Failed ensuring Team_Users sheet: {e}")
        return False


def sync_users_from_gsheet() -> Tuple[List[Dict[str, Any]], Optional[str]]:
    """
    Fetch users directly from Google Sheets 'Team_Users' tab.
    Automatically updates local users.json cache.
    """
    token = _get_gdrive_token()
    if not token:
        return load_local_users(), "Google Drive token unavailable"

    spreadsheet_id = _get_spreadsheet_id()
    try:
        _ensure_team_users_sheet(token, spreadsheet_id)
        url = f"https://sheets.googleapis.com/v4/spreadsheets/{spreadsheet_id}/values/Team_Users!A1:J200"
        req = urllib.request.Request(url, headers={"Authorization": f"Bearer {token}"})
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode("utf-8"))

        raw_rows = data.get("values", [])
        if not raw_rows or len(raw_rows) <= 1:
            return load_local_users(), "Empty Team_Users sheet"

        headers = [h.strip().lower() for h in raw_rows[0]]
        users = []
        for row in raw_rows[1:]:
            if not row or not any(row):
                continue
            # Pad row to 10 elements
            padded = row + [""] * (10 - len(row))
            username = str(padded[0]).strip().lower()
            if not username:
                continue

            name = str(padded[1]).strip()
            email = str(padded[2]).strip().lower()
            role = str(padded[3]).strip().lower()
            if role not in ("admin", "engineer", "sales"):
                role = "engineer"
            title = str(padded[4]).strip()
            plain_pwd = str(padded[5]).strip()
            pwd_hash = str(padded[6]).strip()
            salt = str(padded[7]).strip()
            status = str(padded[8]).strip().lower() or "active"
            created_at = str(padded[9]).strip() or datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")

            # Auto-hash if plain password was entered directly into Google Sheet
            if plain_pwd and (not pwd_hash or not salt):
                salt = secrets.token_hex(16)
                pwd_hash = _hash_password(plain_pwd, salt)

            users.append({
                "username": username,
                "name": name or username.title(),
                "email": email or f"{username}@citradata.id",
                "role": role,
                "title": title or ("Presales Engineer" if role == "engineer" else "Account Manager"),
                "password_hash": pwd_hash,
                "salt": salt,
                "status": status,
                "created_at": created_at
            })

        if users:
            save_local_users(users)
            _USERS_CACHE["users"] = users
            _USERS_CACHE["last_sync"] = time.time()
            return users, None

    except Exception as e:
        logger.warning(f"Error fetching Team_Users from GSheet: {e}")
        return load_local_users(), str(e)

    return load_local_users(), "Unknown error"


def load_local_users() -> List[Dict[str, Any]]:
    """Load users from local data/users.json fallback."""
    os.makedirs(DATA_DIR, exist_ok=True)
    if os.path.exists(USERS_FILE):
        try:
            with open(USERS_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            logger.warning(f"Error reading users file: {e}")
    users = _get_initial_users()
    save_local_users(users)
    return users


def save_local_users(users: List[Dict[str, Any]]):
    """Persist users to local data/users.json."""
    os.makedirs(DATA_DIR, exist_ok=True)
    with open(USERS_FILE, "w", encoding="utf-8") as f:
        json.dump(users, f, indent=2, ensure_ascii=False)


def load_users(force_remote: bool = False) -> List[Dict[str, Any]]:
    """Load users with in-memory caching and periodic cloud sync."""
    now = time.time()
    if not force_remote and _USERS_CACHE.get("users") and _USERS_CACHE.get("last_sync", 0) > now - 60:
        return _USERS_CACHE["users"]

    users, err = sync_users_from_gsheet()
    if users:
        _USERS_CACHE["users"] = users
        _USERS_CACHE["last_sync"] = now
        return users
    return load_local_users()


def authenticate_user(identifier: str, password: str) -> Tuple[Optional[Dict[str, Any]], Optional[str]]:
    """
    Verify user credentials by username or email.
    Returns (user_profile, error_message).
    """
    ident_clean = (identifier or "").strip().lower()
    users = load_users()
    for u in users:
        if u.get("username", "").lower() == ident_clean or u.get("email", "").lower() == ident_clean:
            if u.get("status") == "pending":
                return None, "Akun Anda sedang menunggu persetujuan Administrator. Silakan hubungi Admin untuk verifikasi & aktivasi akun."
            if u.get("status", "active") != "active":
                return None, "Akun Anda telah dinonaktifkan oleh Administrator."

            # Verify PBKDF2 hash
            salt = u.get("salt", "")
            expected_hash = _hash_password(password, salt) if salt else ""
            if expected_hash and secrets.compare_digest(expected_hash, u.get("password_hash", "")):
                return {
                    "username": u["username"],
                    "email": u["email"],
                    "name": u["name"],
                    "role": u.get("role", "engineer"),
                    "title": u.get("title", "Solutions Engineer"),
                    "status": u.get("status", "active")
                }, None

    return None, "Username atau Password salah."


# Allowed enterprise domains for Google Workspace SSO
ALLOWED_DOMAINS: List[str] = [
    d.strip().lower() for d in os.environ.get("ALLOWED_AUTH_DOMAINS", "citradata.id,techsolutions.id").split(",") if d.strip()
]


def _append_user_row_to_gsheet(u: Dict[str, Any], plain_pwd: str = ""):
    """Helper to append a user row directly to Google Sheets Team_Users tab."""
    token = _get_gdrive_token()
    if not token:
        return
    try:
        spreadsheet_id = _get_spreadsheet_id()
        url_append = f"https://sheets.googleapis.com/v4/spreadsheets/{spreadsheet_id}/values/Team_Users!A:J:append?valueInputOption=USER_ENTERED"
        row_vals = [
            u.get("username", ""),
            u.get("name", ""),
            u.get("email", ""),
            u.get("role", "engineer"),
            u.get("title", ""),
            plain_pwd or "cdpk2026!",
            u.get("password_hash", ""),
            u.get("salt", ""),
            u.get("status", "pending"),
            u.get("created_at", datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S"))
        ]
        req_append = urllib.request.Request(
            url_append,
            data=json.dumps({"values": [row_vals]}).encode("utf-8"),
            headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
        )
        with urllib.request.urlopen(req_append, timeout=12) as resp:
            pass
    except Exception as e:
        logger.warning(f"Failed appending user to sheet: {e}")


def authenticate_google_user(id_token: str) -> Tuple[Optional[Dict[str, Any]], Optional[str]]:
    """
    Verify Google ID token via Google's tokeninfo endpoint.
    1. Checks if domain is in ALLOWED_DOMAINS (@citradata.id, @techsolutions.id, etc.)
    2. Checks if email is registered in Team_Users.
       If not registered, automatically registers employee with status 'pending' (requires Admin approval).
    3. Blocks login if status == 'pending'.
    """
    if not id_token:
        return None, "ID Token Google tidak ditemukan."

    try:
        url = f"https://oauth2.googleapis.com/tokeninfo?id_token={urllib.parse.quote(id_token)}"
        req = urllib.request.Request(url, headers={"User-Agent": "CDPK-System-Planner/8.3.0"})
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode("utf-8"))
    except Exception as e:
        logger.error(f"Google tokeninfo validation failed: {e}")
        return None, f"Verifikasi Google Token gagal: {e}"

    email = (data.get("email") or "").strip().lower()
    email_verified = data.get("email_verified") in ("true", True, "1", 1)
    hd = (data.get("hd") or "").strip().lower()

    if not email or not email_verified:
        return None, "Email Google tidak terverifikasi atau tidak valid."

    # Validate Audience (Client ID) to prevent cross-app token replay
    aud = (data.get("aud") or "").strip()
    expected_client_id = os.environ.get("GOOGLE_CLIENT_ID", "423480156983-n52244lq61g7u3qub5p2khlfvtd3hs0f.apps.googleusercontent.com")
    if expected_client_id and aud and aud != expected_client_id:
        logger.warning(f"Google ID token aud mismatch: {aud} != {expected_client_id}")
        return None, "Akses ditolak: Token Google tidak diotorisasi untuk aplikasi ini."

    # Tier 1: Check enterprise domain
    user_domain = email.split("@")[1] if "@" in email else ""
    is_domain_approved = any(user_domain == d or hd == d for d in ALLOWED_DOMAINS)
    if not is_domain_approved:
        return None, "Akses ditolak: Masuk menggunakan email perusahaan terdaftar"

    # Tier 2: Check if email is pre-registered in Team_Users
    users = load_users()
    matched_user = None
    for u in users:
        if u.get("email", "").lower() == email:
            matched_user = u
            break

    if not matched_user:
        # Auto-register new employee from verified Google Workspace token
        user_name = (data.get("name") or email.split("@")[0].title()).strip()
        raw_username = email.split("@")[0].replace(".", "_").replace("-", "_").lower()
        existing_usernames = {u.get("username", "").lower() for u in users}
        username = raw_username
        counter = 1
        while username in existing_usernames:
            username = f"{raw_username}_{counter}"
            counter += 1

        now_str = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")
        new_user = {
            "username": username,
            "name": user_name,
            "email": email,
            "role": "engineer",
            "title": "Presales Engineer",
            "salt": secrets.token_hex(16),
            "password_hash": "",
            "status": "pending",  # Locked until Admin approves
            "created_at": now_str
        }
        users.append(new_user)
        save_local_users(users)
        _USERS_CACHE["users"] = users
        _USERS_CACHE["last_sync"] = time.time()
        _append_user_row_to_gsheet(new_user, "google_workspace_sso")
        return None, "Pendaftaran akun Anda via Google Workspace berhasil diajukan dan berstatus 'Menunggu Verifikasi'. Silakan hubungi Administrator (@adrian) untuk aktivasi akun."

    if matched_user.get("status") == "pending":
        return None, "Akun Anda sedang menunggu persetujuan Administrator. Silakan hubungi Admin untuk verifikasi & aktivasi akun."

    if matched_user.get("status", "active") != "active":
        return None, "Akses ditolak: Akun Anda telah dinonaktifkan oleh Administrator."

    return {
        "username": matched_user["username"],
        "email": matched_user["email"],
        "name": matched_user["name"],
        "role": matched_user.get("role", "engineer"),
        "title": matched_user.get("title", "Solutions Engineer"),
        "status": matched_user.get("status", "active")
    }, None


def create_session(user_profile: Dict[str, Any]) -> str:
    """Create a new session token for the authenticated user."""
    token = secrets.token_urlsafe(32)
    _ACTIVE_SESSIONS[token] = {
        "user": user_profile,
        "created_at": time.time(),
        "expires_at": time.time() + SESSION_TTL_SECONDS
    }
    return token


def get_session_user(token: str) -> Optional[Dict[str, Any]]:
    """Validate token and return active user profile."""
    if not token:
        return None
    sess = _ACTIVE_SESSIONS.get(token)
    if not sess:
        return None
    if time.time() > sess.get("expires_at", 0):
        _ACTIVE_SESSIONS.pop(token, None)
        return None
    return sess.get("user")


def invalidate_session(token: str):
    """Revoke session token."""
    _ACTIVE_SESSIONS.pop(token, None)


# ─────────────────────────────────────────────────────────────────────────────
# CRUD Operations (Admin only, Synchronized to Google Sheets)
# ─────────────────────────────────────────────────────────────────────────────

def add_team_member(creator_role: str, new_user_data: Dict[str, Any]) -> Dict[str, Any]:
    """Add a new team member and immediately append to Google Sheets."""
    if creator_role != "admin":
        return {"status": "error", "message": "Hanya Administrator yang memiliki akses untuk menambah pengguna"}

    username = (new_user_data.get("username") or "").strip().lower()
    email = (new_user_data.get("email") or "").strip().lower()
    password = new_user_data.get("password") or "cdpk2026!"
    name = (new_user_data.get("name") or "").strip()
    role = new_user_data.get("role") or "engineer"
    if role not in ("admin", "engineer", "sales"):
        role = "engineer"
    title = (new_user_data.get("title") or "").strip()

    if not username or not email or not name:
        return {"status": "error", "message": "Username, email, dan nama lengkap wajib diisi"}

    users = load_users()
    for u in users:
        if u["username"].lower() == username:
            return {"status": "error", "message": f"Username '{username}' sudah digunakan"}
        if u["email"].lower() == email:
            return {"status": "error", "message": f"Email '{email}' sudah terdaftar"}

    salt = secrets.token_hex(16)
    pwd_hash = _hash_password(password, salt)
    now_str = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")

    new_user = {
        "username": username,
        "email": email,
        "name": name,
        "role": role,
        "title": title or ("Presales Engineer" if role == "engineer" else "Sales Account Manager"),
        "salt": salt,
        "password_hash": pwd_hash,
        "status": "active",
        "created_at": now_str
    }
    users.append(new_user)
    save_local_users(users)
    _USERS_CACHE["users"] = users

    # Append to Google Sheet
    token = _get_gdrive_token()
    sheet_synced = False
    if token:
        try:
            spreadsheet_id = _get_spreadsheet_id()
            url_append = f"https://sheets.googleapis.com/v4/spreadsheets/{spreadsheet_id}/values/Team_Users!A:J:append?valueInputOption=USER_ENTERED"
            row_vals = [
                username, name, email, role, new_user["title"],
                password, pwd_hash, salt, "active", now_str
            ]
            req = urllib.request.Request(
                url_append,
                data=json.dumps({"values": [row_vals]}).encode("utf-8"),
                headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
            )
            with urllib.request.urlopen(req, timeout=15) as resp:
                sheet_synced = (resp.status == 200)
        except Exception as e:
            logger.warning(f"Error appending user to GSheet: {e}")

    return {
        "status": "ok",
        "message": f"Pengguna {name} (@{username}) berhasil ditambahkan" + (" dan tersimpan ke Google Sheet." if sheet_synced else " (tersimpan lokal)."),
        "user": {
            "username": username,
            "name": name,
            "email": email,
            "role": role,
            "title": new_user["title"],
            "status": "active",
            "created_at": now_str
        }
    }


def register_self_user(reg_data: Dict[str, Any]) -> Tuple[Optional[Dict[str, Any]], Optional[str]]:
    """
    Self-service registration for employees with approved enterprise email domain.
    Enforces @citradata.id and @techsolutions.id, saves to local cache and Google Sheets.
    Role is strictly non-admin ('engineer' or 'sales') to prevent privilege escalation.
    """
    email = (reg_data.get("email") or "").strip().lower()
    name = (reg_data.get("name") or "").strip()
    password = (reg_data.get("password") or "").strip()
    role = (reg_data.get("role") or "engineer").strip().lower()
    title = (reg_data.get("title") or "").strip()
    username = (reg_data.get("username") or "").strip().lower()

    if not email or not name or not password:
        return None, "Nama lengkap, email perusahaan, dan password wajib diisi."

    if len(password) < 6:
        return None, "Password minimal 6 karakter."

    # Validate enterprise domain
    user_domain = email.split("@")[1] if "@" in email else ""
    if not any(user_domain == d for d in ALLOWED_DOMAINS):
        allowed_str = ", ".join([f"@{d}" for d in ALLOWED_DOMAINS])
        return None, f"Pendaftaran hanya diizinkan untuk email perusahaan resmi ({allowed_str})."

    # Default username from email prefix if omitted
    if not username:
        username = email.split("@")[0].replace(".", "_").replace("-", "_")

    # Clean username: alphanumeric and underscore only
    username = "".join(c for c in username if c.isalnum() or c == "_")
    if not username:
        username = "user_" + secrets.token_hex(4)

    # Restrict role to engineer or sales (prevent self-escalation to admin)
    if role not in ("engineer", "sales"):
        role = "engineer"

    if not title:
        title = "Presales & RF Engineer" if role == "engineer" else "Commercial Account Manager"

    users = load_users()
    for u in users:
        if u["username"].lower() == username:
            return None, f"Username '@{username}' sudah digunakan. Silakan pilih username lain."
        if u["email"].lower() == email:
            return None, f"Email '{email}' sudah terdaftar. Silakan langsung login."

    salt = secrets.token_hex(16)
    pwd_hash = _hash_password(password, salt)
    now_str = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")

    new_user = {
        "username": username,
        "email": email,
        "name": name,
        "role": role,
        "title": title,
        "salt": salt,
        "password_hash": pwd_hash,
        "status": "pending",  # Requires Admin Approval!
        "created_at": now_str
    }
    users.append(new_user)
    save_local_users(users)
    _USERS_CACHE["users"] = users

    # Append to Google Sheet tab Team_Users
    _append_user_row_to_gsheet(new_user, password)

    return {
        "username": username,
        "email": email,
        "name": name,
        "role": role,
        "title": title,
        "status": "pending"
    }, None


def update_team_member(creator_role: str, username: str, update_data: Dict[str, Any]) -> Dict[str, Any]:
    """Update user profile, role, title, or status in Google Sheets and local cache."""
    if creator_role != "admin":
        return {"status": "error", "message": "Hanya Administrator yang dapat mengubah data pengguna"}

    username_clean = (username or "").strip().lower()
    users = load_users()
    target_idx = -1
    for i, u in enumerate(users):
        if u["username"].lower() == username_clean:
            target_idx = i
            break

    if target_idx == -1:
        return {"status": "error", "message": f"Pengguna @{username_clean} tidak ditemukan"}

    u = users[target_idx]

    # Update allowed fields
    if "name" in update_data and update_data["name"]:
        u["name"] = str(update_data["name"]).strip()
    if "email" in update_data and update_data["email"]:
        u["email"] = str(update_data["email"]).strip().lower()
    if "role" in update_data and update_data["role"] in ("admin", "engineer", "sales"):
        u["role"] = str(update_data["role"]).strip()
    if "title" in update_data:
        u["title"] = str(update_data["title"]).strip()
    if "status" in update_data and update_data["status"] in ("active", "inactive", "pending", "rejected"):
        # Prevent deactivating self or only admin
        if username_clean == "adrian" and update_data["status"] == "inactive":
            return {"status": "error", "message": "Akun administrator utama tidak dapat dinonaktifkan"}
        u["status"] = update_data["status"]

    save_local_users(users)
    _USERS_CACHE["users"] = users

    # Update row in Google Sheet
    token = _get_gdrive_token()
    if token:
        try:
            spreadsheet_id = _get_spreadsheet_id()
            # Fetch all rows to find exact row number
            url_get = f"https://sheets.googleapis.com/v4/spreadsheets/{spreadsheet_id}/values/Team_Users!A1:A200"
            req = urllib.request.Request(url_get, headers={"Authorization": f"Bearer {token}"})
            with urllib.request.urlopen(req, timeout=12) as resp:
                d = json.loads(resp.read().decode("utf-8"))
            rows = d.get("values", [])
            sheet_row_num = None
            for idx, r in enumerate(rows):
                if r and r[0].strip().lower() == username_clean:
                    sheet_row_num = idx + 1
                    break

            if sheet_row_num:
                row_vals = [
                    u["username"], u["name"], u["email"], u["role"], u["title"],
                    "********", u["password_hash"], u["salt"], u.get("status", "active"), u.get("created_at", "")
                ]
                url_put = f"https://sheets.googleapis.com/v4/spreadsheets/{spreadsheet_id}/values/Team_Users!A{sheet_row_num}:J{sheet_row_num}?valueInputOption=USER_ENTERED"
                req_put = urllib.request.Request(
                    url_put,
                    data=json.dumps({"range": f"Team_Users!A{sheet_row_num}:J{sheet_row_num}", "values": [row_vals]}).encode("utf-8"),
                    headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
                    method="PUT"
                )
                with urllib.request.urlopen(req_put, timeout=15) as resp_put:
                    pass
        except Exception as e:
            logger.warning(f"Error updating user row in GSheet: {e}")

    return {"status": "ok", "message": f"Data pengguna @{username_clean} berhasil diperbarui", "user": u}


def toggle_user_status(creator_role: str, username: str) -> Dict[str, Any]:
    """Toggle user active / inactive status."""
    if creator_role != "admin":
        return {"status": "error", "message": "Hanya Administrator yang dapat mengubah status pengguna"}

    username_clean = (username or "").strip().lower()
    if username_clean == "adrian":
        return {"status": "error", "message": "Akun administrator utama tidak dapat dinonaktifkan"}

    users = load_users()
    for u in users:
        if u["username"].lower() == username_clean:
            new_status = "inactive" if u.get("status", "active") == "active" else "active"
            return update_team_member(creator_role, username_clean, {"status": new_status})

    return {"status": "error", "message": f"Pengguna @{username_clean} tidak ditemukan"}


def reset_user_password(creator_role: str, username: str, new_password: str) -> Dict[str, Any]:
    """Reset password for a user and sync to Google Sheets."""
    if creator_role != "admin":
        return {"status": "error", "message": "Hanya Administrator yang dapat me-reset password"}

    username_clean = (username or "").strip().lower()
    new_pwd = (new_password or "").strip()
    if not new_pwd:
        return {"status": "error", "message": "Password baru tidak boleh kosong"}

    users = load_users()
    target_idx = -1
    for i, u in enumerate(users):
        if u["username"].lower() == username_clean:
            target_idx = i
            break

    if target_idx == -1:
        return {"status": "error", "message": f"Pengguna @{username_clean} tidak ditemukan"}

    salt = secrets.token_hex(16)
    pwd_hash = _hash_password(new_pwd, salt)
    users[target_idx]["salt"] = salt
    users[target_idx]["password_hash"] = pwd_hash

    save_local_users(users)
    _USERS_CACHE["users"] = users

    # Update in Google Sheet
    token = _get_gdrive_token()
    if token:
        try:
            spreadsheet_id = _get_spreadsheet_id()
            url_get = f"https://sheets.googleapis.com/v4/spreadsheets/{spreadsheet_id}/values/Team_Users!A1:A200"
            req = urllib.request.Request(url_get, headers={"Authorization": f"Bearer {token}"})
            with urllib.request.urlopen(req, timeout=12) as resp:
                d = json.loads(resp.read().decode("utf-8"))
            rows = d.get("values", [])
            sheet_row_num = None
            for idx, r in enumerate(rows):
                if r and r[0].strip().lower() == username_clean:
                    sheet_row_num = idx + 1
                    break

            if sheet_row_num:
                u = users[target_idx]
                row_vals = [
                    u["username"], u["name"], u["email"], u["role"], u["title"],
                    new_pwd, pwd_hash, salt, u.get("status", "active"), u.get("created_at", "")
                ]
                url_put = f"https://sheets.googleapis.com/v4/spreadsheets/{spreadsheet_id}/values/Team_Users!A{sheet_row_num}:J{sheet_row_num}?valueInputOption=USER_ENTERED"
                req_put = urllib.request.Request(
                    url_put,
                    data=json.dumps({"range": f"Team_Users!A{sheet_row_num}:J{sheet_row_num}", "values": [row_vals]}).encode("utf-8"),
                    headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
                    method="PUT"
                )
                with urllib.request.urlopen(req_put, timeout=15) as resp_put:
                    pass
        except Exception as e:
            logger.warning(f"Error updating password in GSheet: {e}")

    return {"status": "ok", "message": f"Password untuk @{username_clean} berhasil di-reset"}


def approve_team_member(creator_role: str, username: str) -> Dict[str, Any]:
    """Approve a pending self-registered user and activate account."""
    if creator_role != "admin":
        return {"status": "error", "message": "Hanya Administrator yang dapat menyetujui pendaftaran"}
    res = update_team_member(creator_role, username, {"status": "active"})
    if res.get("status") == "ok":
        res["message"] = f"Pendaftaran @{username} berhasil disetujui. Akun sekarang aktif."
    return res


def reject_team_member(creator_role: str, username: str) -> Dict[str, Any]:
    """Reject a pending registration by removing user from local cache and updating status in GSheet."""
    if creator_role != "admin":
        return {"status": "error", "message": "Hanya Administrator yang dapat menolak pendaftaran"}
    username_clean = (username or "").strip().lower()
    if username_clean == "adrian":
        return {"status": "error", "message": "Akun administrator utama tidak dapat ditolak"}

    users = load_users()
    users = [u for u in users if u["username"].lower() != username_clean]
    save_local_users(users)
    _USERS_CACHE["users"] = users

    # Update in Google Sheet: mark status as 'rejected'
    token = _get_gdrive_token()
    if token:
        try:
            spreadsheet_id = _get_spreadsheet_id()
            url_get = f"https://sheets.googleapis.com/v4/spreadsheets/{spreadsheet_id}/values/Team_Users!A1:A200"
            req = urllib.request.Request(url_get, headers={"Authorization": f"Bearer {token}"})
            with urllib.request.urlopen(req, timeout=12) as resp:
                d = json.loads(resp.read().decode("utf-8"))
            rows = d.get("values", [])
            sheet_row_num = None
            for idx, r in enumerate(rows):
                if r and r[0].strip().lower() == username_clean:
                    sheet_row_num = idx + 1
                    break
            if sheet_row_num:
                url_put = f"https://sheets.googleapis.com/v4/spreadsheets/{spreadsheet_id}/values/Team_Users!I{sheet_row_num}?valueInputOption=USER_ENTERED"
                req_put = urllib.request.Request(
                    url_put,
                    data=json.dumps({"range": f"Team_Users!I{sheet_row_num}", "values": [["rejected"]]}).encode("utf-8"),
                    headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
                    method="PUT"
                )
                with urllib.request.urlopen(req_put, timeout=12) as resp_put:
                    pass
        except Exception as e:
            logger.warning(f"Error marking user as rejected in GSheet: {e}")

    return {"status": "ok", "message": f"Pendaftaran pengguna @{username_clean} telah ditolak."}


def promote_team_member(creator_role: str, username: str) -> Dict[str, Any]:
    """Promote an existing registered user to Admin role."""
    if creator_role != "admin":
        return {"status": "error", "message": "Hanya Administrator yang dapat mengangkat Admin baru"}
    username_clean = (username or "").strip().lower()
    res = update_team_member(creator_role, username_clean, {"role": "admin"})
    if res.get("status") == "ok":
        res["message"] = f"Pengguna @{username_clean} berhasil diangkat menjadi Administrator."
    return res


def demote_team_member(creator_role: str, username: str) -> Dict[str, Any]:
    """Demote an Admin to Engineer role (cannot demote primary admin 'adrian')."""
    if creator_role != "admin":
        return {"status": "error", "message": "Hanya Administrator yang dapat mengubah role"}
    username_clean = (username or "").strip().lower()
    if username_clean == "adrian":
        return {"status": "error", "message": "Akun administrator utama (@adrian) tidak dapat diturunkan perannya"}
    res = update_team_member(creator_role, username_clean, {"role": "engineer"})
    if res.get("status") == "ok":
        res["message"] = f"Peran @{username_clean} telah diturunkan menjadi Engineer / Presales."
    return res

