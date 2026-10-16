#!/usr/bin/env python3
"""
Authentication & Team User Management for CDPK System Planner.
Supports role-based access control (Admin, Engineer/Presales, Sales),
salted password hashing, and session token management.
"""

import hashlib
import json
import logging
import os
import secrets
import time
from typing import Any, Dict, List, Optional

logger = logging.getLogger("cdpk.auth")

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
USERS_FILE = os.path.join(DATA_DIR, "users.json")

# In-memory active session store: token -> session dict
_ACTIVE_SESSIONS: Dict[str, Dict[str, Any]] = {}
SESSION_TTL_SECONDS = 7 * 24 * 3600  # 7 days


def _hash_password(password: str, salt: str) -> str:
    """PBKDF2-HMAC-SHA256 password hashing."""
    return hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt.encode("utf-8"),
        100000
    ).hex()


def _get_initial_users() -> List[Dict[str, Any]]:
    """Seed default team accounts for CDPK team."""
    default_users = [
        {
            "username": "adrian",
            "email": "adrian@citradata.id",
            "name": "Adrian Kansil",
            "role": "admin",
            "title": "Principal Lead & Solutions Architect",
            "salt": secrets.token_hex(16),
            "password_hash": ""
        },
        {
            "username": "presales",
            "email": "presales@citradata.id",
            "name": "Presales Engineer",
            "role": "engineer",
            "title": "Senior Presales & RF Engineer",
            "salt": secrets.token_hex(16),
            "password_hash": ""
        },
        {
            "username": "sales",
            "email": "sales@citradata.id",
            "name": "Sales Account Manager",
            "role": "sales",
            "title": "Commercial Account Manager",
            "salt": secrets.token_hex(16),
            "password_hash": ""
        }
    ]
    # Set default password "cdpk2026!" for initial team accounts
    for u in default_users:
        u["password_hash"] = _hash_password("cdpk2026!", u["salt"])
    return default_users


def load_users() -> List[Dict[str, Any]]:
    """Load users from data/users.json or initialize with defaults."""
    os.makedirs(DATA_DIR, exist_ok=True)
    if os.path.exists(USERS_FILE):
        try:
            with open(USERS_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            logger.warning(f"Error reading users file: {e}")
    users = _get_initial_users()
    save_users(users)
    return users


def save_users(users: List[Dict[str, Any]]):
    """Persist users to data/users.json."""
    os.makedirs(DATA_DIR, exist_ok=True)
    with open(USERS_FILE, "w", encoding="utf-8") as f:
        json.dump(users, f, indent=2, ensure_ascii=False)


def authenticate_user(identifier: str, password: str) -> Optional[Dict[str, Any]]:
    """Verify user credentials by username or email."""
    ident_clean = (identifier or "").strip().lower()
    users = load_users()
    for u in users:
        if u.get("username", "").lower() == ident_clean or u.get("email", "").lower() == ident_clean:
            expected_hash = _hash_password(password, u.get("salt", ""))
            if secrets.compare_digest(expected_hash, u.get("password_hash", "")):
                # Clean profile without sensitive hash
                return {
                    "username": u["username"],
                    "email": u["email"],
                    "name": u["name"],
                    "role": u.get("role", "engineer"),
                    "title": u.get("title", "Solutions Engineer")
                }
    return None


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


def add_team_member(creator_role: str, new_user_data: Dict[str, Any]) -> Dict[str, Any]:
    """Add a new team member (Admin only)."""
    if creator_role != "admin":
        return {"status": "error", "message": "Only Admin can add team members"}

    username = (new_user_data.get("username") or "").strip().lower()
    email = (new_user_data.get("email") or "").strip().lower()
    password = new_user_data.get("password") or "cdpk2026!"
    name = (new_user_data.get("name") or "").strip()
    role = new_user_data.get("role") or "engineer"
    title = (new_user_data.get("title") or "").strip()

    if not username or not email or not name:
        return {"status": "error", "message": "Username, email, and name are required"}

    users = load_users()
    for u in users:
        if u["username"].lower() == username:
            return {"status": "error", "message": f"Username '{username}' already exists"}
        if u["email"].lower() == email:
            return {"status": "error", "message": f"Email '{email}' already registered"}

    salt = secrets.token_hex(16)
    new_user = {
        "username": username,
        "email": email,
        "name": name,
        "role": role,
        "title": title or ("Presales Engineer" if role == "engineer" else "Sales Account Manager"),
        "salt": salt,
        "password_hash": _hash_password(password, salt)
    }
    users.append(new_user)
    save_users(users)
    return {"status": "ok", "message": f"User {name} added successfully"}
