#!/usr/bin/env python3
"""
CDPK System Planner — Cloud Web Server & API Gateway
Port: 7860 (Render Cloud Docker Standard)
Integrates:
- Team Multi-User Authentication & Roles (server/auth.py)
- Direct Google Drive Subfolder Save & Project Archive (Kalkulasi & Penawaran Tim)
- Live Master Pricelist Sync (drive citradata)
- Multi-Model AI Copilot (Google Gemini 3.8 Flash & Gemini 3.8 Pro)
- Bilingual (ID / EN) SPA Frontend
"""

import json
import logging
import mimetypes
import os
import urllib.parse
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

from server.auth import (
    authenticate_user,
    authenticate_google_user,
    register_self_user,
    create_session,
    get_session_user,
    invalidate_session,
    load_users,
    add_team_member,
    update_team_member,
    toggle_user_status,
    reset_user_password,
    approve_team_member,
    reject_team_member,
    delete_team_member,
    promote_team_member,
    demote_team_member,
    change_user_password,
    sync_users_from_gsheet
)
from server.gdrive_sync import (
    DEFAULT_FOLDER_ID,
    DEFAULT_SPREADSHEET_ID,
    OUTPUT_SUBFOLDER_ID,
    sync_from_gdrive,
    save_project_to_gdrive,
    list_saved_projects_from_gdrive,
    load_project_data_from_gdrive,
    patch_drive_file_properties,
    update_drive_file_content,
    parse_project_filename,
    get_diagnostics
)
from server.notifications import (
    get_user_notifications,
    mark_notifications_read,
    add_notification
)
from server.ai_copilot import ALLOWED_MODELS, query_ai_copilot
from server.audit import log_audit_event, get_audit_logs

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("cdpk.server")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")
PORT = int(os.environ.get("PORT", 7860))


class CDPKRequestHandler(BaseHTTPRequestHandler):
    def log_message(self, fmt, *args):
        logger.info("%s - %s", self.address_string(), fmt % args)

    def _get_auth_user(self):
        auth_hdr = self.headers.get("Authorization", "")
        token = ""
        if auth_hdr.startswith("Bearer "):
            token = auth_hdr[7:].strip()
        elif "X-Session-Token" in self.headers:
            token = self.headers.get("X-Session-Token", "").strip()
        return get_session_user(token)

    def _send_json(self, payload: dict, status: int = 200):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("X-Frame-Options", "SAMEORIGIN")
        self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Session-Token")
        self.end_headers()

    def do_HEAD(self):
        self.do_GET()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path == "/health":
            return self._send_json({
                "status": "healthy",
                "app": "CDPK System Planner",
                "version": "8.4.0",
                "google_client_id": os.environ.get("GOOGLE_CLIENT_ID", "423480156983-n52244lq61g7u3qub5p2khlfvtd3hs0f.apps.googleusercontent.com"),
                "gdrive_folder_id": DEFAULT_FOLDER_ID,
                "gdrive_output_subfolder_id": OUTPUT_SUBFOLDER_ID,
                "gdrive_spreadsheet_id": DEFAULT_SPREADSHEET_ID,
                "ai_models": list(ALLOWED_MODELS.keys()),
                "diagnostics": get_diagnostics()
            })

        # ─── Auth Endpoints ───────────────────────────────────────────────
        if path == "/api/auth/me":
            user = self._get_auth_user()
            if user:
                return self._send_json({"status": "ok", "user": user})
            return self._send_json({"status": "unauthenticated"}, status=401)

        if path == "/api/auth/users":
            user = self._get_auth_user()
            if not user or user.get("role") not in ("admin", "overseer"):
                return self._send_json({"status": "forbidden", "message": "Akses ditolak: Hanya Administrator atau Overseer"}, status=403)
            qs = urllib.parse.parse_qs(parsed.query)
            force_remote = qs.get("force", ["0"])[0] in ("1", "true", "yes")
            all_users = load_users(force_remote=force_remote)
            clean_users = [
                {
                    "username": u["username"],
                    "email": u["email"],
                    "name": u["name"],
                    "role": u.get("role", "engineer"),
                    "title": u.get("title", ""),
                    "status": u.get("status", "active"),
                    "created_at": u.get("created_at", "")
                }
                for u in all_users
            ]
            return self._send_json({
                "status": "ok",
                "users": clean_users,
                "sheet_tab": "Team_Users",
                "spreadsheet_id": DEFAULT_SPREADSHEET_ID,
                "sheet_url": f"https://docs.google.com/spreadsheets/d/{DEFAULT_SPREADSHEET_ID}/edit#gid=78156397"
            })

        # ─── Knowledge & AI Models ────────────────────────────────────────
        if path == "/api/knowledge":
            qs = urllib.parse.parse_qs(parsed.query)
            force = qs.get("force", ["0"])[0] in ("1", "true", "yes")
            sync_res = sync_from_gdrive(force=force)
            return self._send_json(sync_res)

        if path == "/api/ai/models":
            return self._send_json({
                "status": "ok",
                "models": list(ALLOWED_MODELS.values())
            })

        # ─── In-App Notifications ─────────────────────────────────────────
        if path == "/api/notifications":
            cur_user = self._get_auth_user()
            if not cur_user:
                return self._send_json({"status": "unauthorized", "message": "Autentikasi diperlukan"}, status=401)
            notifs = get_user_notifications(cur_user["username"], cur_user.get("role", "engineer"))
            unread_count = sum(1 for n in notifs if not n.get("is_read"))
            return self._send_json({
                "status": "ok",
                "notifications": notifs,
                "unread_count": unread_count
            })

        # ─── Team Active Members for Handover & Collaboration ─────────────
        if path == "/api/team/active-members":
            cur_user = self._get_auth_user()
            if not cur_user:
                return self._send_json({"status": "unauthorized", "message": "Autentikasi diperlukan"}, status=401)
            users = load_users()
            members = [
                {
                    "username": u["username"],
                    "name": u["name"],
                    "email": u["email"],
                    "role": u.get("role", "engineer"),
                    "title": u.get("title", "")
                }
                for u in users
                if u.get("status") == "active"
            ]
            return self._send_json({
                "status": "ok",
                "members": members
            })

        # ─── Cloud Project Archive ────────────────────────────────────────
        if path == "/api/project/list-drive":
            cur_user = self._get_auth_user()
            if not cur_user:
                return self._send_json({"status": "unauthorized", "message": "Autentikasi diperlukan"}, status=401)

            raw_files = list_saved_projects_from_gdrive(OUTPUT_SUBFOLDER_ID)
            users = load_users()
            user_map = {u["username"]: u.get("name", u["username"]) for u in users}
            known_usernames = list(user_map.keys())

            enriched_files = []
            cur_username_lower = cur_user.get("username", "").strip().lower()
            is_admin = cur_user.get("role") == "admin"
            is_overseer = cur_user.get("role") == "overseer"
            can_view_all = is_admin or is_overseer

            for f in raw_files:
                name = f.get("name", "")
                if not (name.endswith(".cdpk.json") or name.endswith(".xlsx")):
                    continue

                app_props = f.get("appProperties") or {}
                creator = app_props.get("creator_username")
                creator_name = app_props.get("creator_name")

                collab_str = app_props.get("collaborators", "")
                collaborators = [c.strip().lower() for c in collab_str.split(",") if c.strip()]

                parsed = parse_project_filename(name, known_usernames)
                if not creator:
                    creator = parsed.get("creator") or "unknown"
                    creator_name = user_map.get(creator, creator.title())

                is_creator = (creator.strip().lower() == cur_username_lower)
                is_collab = (cur_username_lower in collaborators)

                margin_val = None
                if app_props.get("margin_percent"):
                    try:
                        margin_val = float(app_props.get("margin_percent"))
                    except Exception:
                        margin_val = None
                grand_total_val = None
                if app_props.get("grand_total"):
                    try:
                        grand_total_val = float(app_props.get("grand_total"))
                    except Exception:
                        grand_total_val = None

                f["creator_username"] = creator
                f["creator_name"] = creator_name or creator.title()
                f["file_type"] = parsed.get("type", "json")
                f["summary"] = parsed.get("summary", name)
                f["timestamp"] = parsed.get("timestamp", "")
                f["collaborators"] = collaborators
                f["is_creator"] = is_creator
                f["is_collaborator"] = is_collab
                f["margin_percent"] = margin_val
                f["grand_total"] = grand_total_val
                f["currency"] = app_props.get("currency", "IDR")

                # Access Control: Admin & Overseer get full team view; regular user sees their creations AND shared files
                if can_view_all or is_creator or is_collab:
                    enriched_files.append(f)

            return self._send_json({
                "status": "ok",
                "is_admin": is_admin,
                "is_overseer": is_overseer,
                "can_view_all": can_view_all,
                "current_username": cur_user.get("username"),
                "subfolder_id": OUTPUT_SUBFOLDER_ID,
                "subfolder_url": f"https://drive.google.com/drive/folders/{OUTPUT_SUBFOLDER_ID}" if is_admin else "",
                "files": enriched_files
            })

        # ─── Audit Trail Logs (Admin & Overseer) ──────────────────────────
        if path == "/api/audit/logs":
            cur_user = self._get_auth_user()
            if not cur_user or cur_user.get("role") not in ("admin", "overseer"):
                return self._send_json({"status": "forbidden", "message": "Akses ditolak: Hanya Administrator atau Overseer"}, status=403)
            qs = urllib.parse.parse_qs(parsed.query)
            limit = int(qs.get("limit", [100])[0])
            action_filter = qs.get("action", ["all"])[0]
            logs = get_audit_logs(limit=limit, action_filter=action_filter)
            return self._send_json({
                "status": "ok",
                "logs": logs
            })

        # ─── Serve Static Files ───────────────────────────────────────────
        if path in ("/", "/index.html"):
            file_path = os.path.join(STATIC_DIR, "index.html")
        else:
            rel_path = path.lstrip("/")
            file_path = os.path.abspath(os.path.join(STATIC_DIR, rel_path))
            if not file_path.startswith(STATIC_DIR):
                self.send_error(403, "Forbidden")
                return

        if os.path.isfile(file_path):
            mime, _ = mimetypes.guess_type(file_path)
            mime = mime or "application/octet-stream"
            with open(file_path, "rb") as f:
                content = f.read()
            self.send_response(200)
            self.send_header("Content-Type", f"{mime}; charset=utf-8" if mime.startswith("text/") or mime == "application/javascript" else mime)
            self.send_header("Content-Length", str(len(content)))
            self.send_header("X-Content-Type-Options", "nosniff")
            self.send_header("X-Frame-Options", "SAMEORIGIN")
            self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
            self.end_headers()
            self.wfile.write(content)
        else:
            self.send_error(404, "File Not Found")

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        content_len = int(self.headers.get("Content-Length", 0))
        raw_body = self.rfile.read(content_len) if content_len > 0 else b"{}"
        try:
            body = json.loads(raw_body.decode("utf-8"))
        except Exception:
            body = {}

        # ─── Auth Endpoints ───────────────────────────────────────────────
        if path == "/api/auth/google":
            id_token = body.get("id_token") or body.get("credential")
            user, err = authenticate_google_user(id_token)
            if user:
                token = create_session(user)
                log_audit_event(
                    user.get("username", ""),
                    user.get("name", ""),
                    user.get("role", "engineer"),
                    "login",
                    f"Login sukses via Google Workspace ({user.get('email', '')})",
                    ip=self.address_string()
                )
                return self._send_json({"status": "ok", "token": token, "user": user})
            return self._send_json({"status": "error", "message": err or "Google Workspace authentication failed."}, status=401)

        if path == "/api/auth/login":
            ident = body.get("identifier") or body.get("username") or body.get("email")
            pwd = body.get("password") or ""
            user, err = authenticate_user(ident, pwd)
            if user:
                token = create_session(user)
                log_audit_event(
                    user.get("username", ""),
                    user.get("name", ""),
                    user.get("role", "engineer"),
                    "login",
                    f"Login sukses via Kredensial (@{user.get('username', '')})",
                    ip=self.address_string()
                )
                return self._send_json({"status": "ok", "token": token, "user": user})
            return self._send_json({"status": "error", "message": err or "Username atau Password salah."}, status=401)

        if path == "/api/auth/register":
            user, err = register_self_user(body)
            if user:
                log_audit_event(
                    user.get("username", ""),
                    user.get("name", ""),
                    user.get("role", "engineer"),
                    "register",
                    f"Pengajuan registrasi mandiri: {user.get('name')} (@{user.get('username')}, {user.get('email')})",
                    ip=self.address_string()
                )
                return self._send_json({
                    "status": "ok",
                    "pending": True,
                    "user": user,
                    "message": "Pendaftaran berhasil diajukan! Akun Anda sedang menunggu verifikasi dan persetujuan dari Administrator sebelum dapat digunakan."
                })
            return self._send_json({"status": "error", "message": err or "Pendaftaran akun gagal."}, status=400)

        if path == "/api/auth/logout":
            auth_hdr = self.headers.get("Authorization", "")
            token = auth_hdr[7:].strip() if auth_hdr.startswith("Bearer ") else self.headers.get("X-Session-Token", "").strip()
            cur_user = self._get_auth_user()
            if cur_user:
                log_audit_event(
                    cur_user.get("username", ""),
                    cur_user.get("name", ""),
                    cur_user.get("role", "engineer"),
                    "logout",
                    f"Logout sesi (@{cur_user.get('username')})",
                    ip=self.address_string()
                )
            if token:
                invalidate_session(token)
            return self._send_json({"status": "ok", "message": "Logged out"})

        if path == "/api/auth/users":
            cur_user = self._get_auth_user()
            if not cur_user or cur_user.get("role") != "admin":
                return self._send_json({"status": "forbidden", "message": "Hanya Administrator yang dapat menambah pengguna"}, status=403)
            res = add_team_member(cur_user.get("role"), body)
            if res.get("status") == "ok":
                log_audit_event(
                    cur_user.get("username", ""),
                    cur_user.get("name", ""),
                    cur_user.get("role", "admin"),
                    "user_mgmt",
                    f"Menambah pengguna baru: {body.get('name')} (@{body.get('username')}) peran {body.get('role')}",
                    ip=self.address_string()
                )
            return self._send_json(res, status=200 if res["status"] == "ok" else 400)

        if path == "/api/auth/users/update":
            cur_user = self._get_auth_user()
            if not cur_user or cur_user.get("role") != "admin":
                return self._send_json({"status": "forbidden", "message": "Hanya Administrator yang dapat mengubah pengguna"}, status=403)
            username = body.get("username")
            res = update_team_member(cur_user.get("role"), username, body)
            if res.get("status") == "ok":
                log_audit_event(
                    cur_user.get("username", ""),
                    cur_user.get("name", ""),
                    cur_user.get("role", "admin"),
                    "user_mgmt",
                    f"Memperbarui profil anggota tim @{username}",
                    ip=self.address_string()
                )
            return self._send_json(res, status=200 if res["status"] == "ok" else 400)

        if path == "/api/auth/users/toggle-status":
            cur_user = self._get_auth_user()
            if not cur_user or cur_user.get("role") != "admin":
                return self._send_json({"status": "forbidden", "message": "Hanya Administrator yang dapat mengubah status pengguna"}, status=403)
            username = body.get("username")
            res = toggle_user_status(cur_user.get("role"), username)
            if res.get("status") == "ok":
                log_audit_event(
                    cur_user.get("username", ""),
                    cur_user.get("name", ""),
                    cur_user.get("role", "admin"),
                    "user_mgmt",
                    f"Mengubah status akun pengguna @{username} menjadi {res.get('new_status')}",
                    ip=self.address_string()
                )
            return self._send_json(res, status=200 if res["status"] == "ok" else 400)

        if path == "/api/auth/users/approve":
            cur_user = self._get_auth_user()
            if not cur_user or cur_user.get("role") != "admin":
                return self._send_json({"status": "forbidden", "message": "Hanya Administrator yang dapat menyetujui pendaftaran"}, status=403)
            username = body.get("username")
            assigned_role = body.get("role")
            res = approve_team_member(cur_user.get("role"), username, assigned_role=assigned_role)
            if res.get("status") == "ok":
                log_audit_event(
                    cur_user.get("username", ""),
                    cur_user.get("name", ""),
                    cur_user.get("role", "admin"),
                    "user_mgmt",
                    f"Menyetujui permohonan akun @{username} (Peran: {assigned_role or 'engineer'})",
                    ip=self.address_string()
                )
            return self._send_json(res, status=200 if res["status"] == "ok" else 400)

        if path == "/api/auth/users/reject":
            cur_user = self._get_auth_user()
            if not cur_user or cur_user.get("role") != "admin":
                return self._send_json({"status": "forbidden", "message": "Hanya Administrator yang dapat menolak pendaftaran"}, status=403)
            username = body.get("username")
            res = reject_team_member(cur_user.get("role"), username)
            if res.get("status") == "ok":
                log_audit_event(
                    cur_user.get("username", ""),
                    cur_user.get("name", ""),
                    cur_user.get("role", "admin"),
                    "user_mgmt",
                    f"Menolak pendaftaran akun @{username}",
                    ip=self.address_string()
                )
            return self._send_json(res, status=200 if res["status"] == "ok" else 400)

        if path == "/api/auth/users/delete":
            cur_user = self._get_auth_user()
            if not cur_user or cur_user.get("role") != "admin":
                return self._send_json({"status": "forbidden", "message": "Hanya Administrator yang dapat menghapus pengguna"}, status=403)
            username = body.get("username")
            res = delete_team_member(cur_user.get("role"), username)
            if res.get("status") == "ok":
                log_audit_event(
                    cur_user.get("username", ""),
                    cur_user.get("name", ""),
                    cur_user.get("role", "admin"),
                    "user_mgmt",
                    f"Menghapus pengguna @{username} secara permanen",
                    ip=self.address_string()
                )
            return self._send_json(res, status=200 if res["status"] == "ok" else 400)

        if path == "/api/auth/users/promote":
            cur_user = self._get_auth_user()
            if not cur_user or cur_user.get("role") != "admin":
                return self._send_json({"status": "forbidden", "message": "Hanya Administrator yang dapat mengangkat Administrator baru"}, status=403)
            username = body.get("username")
            res = promote_team_member(cur_user.get("role"), username)
            if res.get("status") == "ok":
                log_audit_event(
                    cur_user.get("username", ""),
                    cur_user.get("name", ""),
                    cur_user.get("role", "admin"),
                    "user_mgmt",
                    f"Mengangkat @{username} menjadi Administrator",
                    ip=self.address_string()
                )
            return self._send_json(res, status=200 if res["status"] == "ok" else 400)

        if path == "/api/auth/users/demote":
            cur_user = self._get_auth_user()
            if not cur_user or cur_user.get("role") != "admin":
                return self._send_json({"status": "forbidden", "message": "Hanya Administrator yang dapat mengubah peran"}, status=403)
            username = body.get("username")
            res = demote_team_member(cur_user.get("role"), username)
            if res.get("status") == "ok":
                log_audit_event(
                    cur_user.get("username", ""),
                    cur_user.get("name", ""),
                    cur_user.get("role", "admin"),
                    "user_mgmt",
                    f"Menurunkan peran Administrator @{username} menjadi Engineer",
                    ip=self.address_string()
                )
            return self._send_json(res, status=200 if res["status"] == "ok" else 400)

        if path == "/api/auth/users/reset-password":
            cur_user = self._get_auth_user()
            if not cur_user or cur_user.get("role") != "admin":
                return self._send_json({"status": "forbidden", "message": "Hanya Administrator yang dapat me-reset password"}, status=403)
            username = body.get("username")
            new_pwd = body.get("password") or body.get("new_password") or "cdpk2026!"
            res = reset_user_password(cur_user.get("role"), username, new_pwd)
            if res.get("status") == "ok":
                log_audit_event(
                    cur_user.get("username", ""),
                    cur_user.get("name", ""),
                    cur_user.get("role", "admin"),
                    "user_mgmt",
                    f"Reset password akun pengguna @{username}",
                    ip=self.address_string()
                )
            return self._send_json(res, status=200 if res["status"] == "ok" else 400)

        if path == "/api/auth/change-my-password":
            cur_user = self._get_auth_user()
            if not cur_user:
                return self._send_json({"status": "unauthorized", "message": "Autentikasi diperlukan"}, status=401)
            new_pwd = body.get("password") or body.get("new_password")
            if not new_pwd:
                return self._send_json({"status": "error", "message": "Password baru wajib diisi"}, status=400)
            res = change_user_password(cur_user["username"], new_pwd)
            if res.get("status") == "ok":
                log_audit_event(
                    cur_user.get("username", ""),
                    cur_user.get("name", ""),
                    cur_user.get("role", "engineer"),
                    "user_mgmt",
                    f"Pengguna @{cur_user.get('username')} memperbarui password akun pribadinya",
                    ip=self.address_string()
                )
            return self._send_json(res, status=200 if res["status"] == "ok" else 400)

        if path == "/api/auth/users/sync":
            cur_user = self._get_auth_user()
            if not cur_user or cur_user.get("role") != "admin":
                return self._send_json({"status": "forbidden", "message": "Hanya Administrator yang dapat sinkronisasi"}, status=403)
            users, err = sync_users_from_gsheet()
            clean_users = [
                {
                    "username": u["username"],
                    "email": u["email"],
                    "name": u["name"],
                    "role": u.get("role", "engineer"),
                    "title": u.get("title", ""),
                    "status": u.get("status", "active"),
                    "created_at": u.get("created_at", "")
                }
                for u in users
            ]
            return self._send_json({
                "status": "ok",
                "message": "Data pengguna berhasil disinkronkan dari Google Sheet",
                "users": clean_users,
                "error": err
            })

        # ─── Cloud Sync ───────────────────────────────────────────────────
        if path == "/api/pricing/sync":
            spreadsheet_id = body.get("spreadsheet_id") or DEFAULT_SPREADSHEET_ID
            folder_id = body.get("folder_id") or DEFAULT_FOLDER_ID
            sync_res = sync_from_gdrive(force=True, spreadsheet_id=spreadsheet_id, folder_id=folder_id)
            return self._send_json(sync_res)

        # ─── Save Calculation Directly to Google Drive Subfolder ──────────
        if path == "/api/project/save-to-drive":
            cur_user = self._get_auth_user() or {
                "username": body.get("creatorUsername") or "engineer",
                "name": body.get("creatorName") or "Presales Engineer",
                "email": body.get("creatorEmail") or "presales@citradata.id",
                "role": "engineer"
            }
            save_res = save_project_to_gdrive(body, cur_user)
            if save_res.get("status") == "ok":
                proj_title = body.get("projName") or body.get("projectName") or "Proyek CDPK"
                client_title = body.get("clientName") or "Klien"
                log_audit_event(
                    cur_user.get("username", ""),
                    cur_user.get("name", ""),
                    cur_user.get("role", "engineer"),
                    "save_project",
                    f"Menyimpan kalkulasi proyek '{proj_title}' (Klien: {client_title}) ke Google Drive",
                    ip=self.address_string(),
                    metadata={"file_id": save_res.get("file_id")}
                )
            return self._send_json(save_res)

        # ─── Notifications: Mark as Read ──────────────────────────────────
        if path == "/api/notifications/mark-read":
            cur_user = self._get_auth_user()
            if not cur_user:
                return self._send_json({"status": "unauthorized", "message": "Autentikasi diperlukan"}, status=401)
            notif_id = body.get("notif_id")
            mark_notifications_read(cur_user["username"], cur_user.get("role", "engineer"), notif_id)
            return self._send_json({"status": "ok", "message": "Notifikasi ditandai telah dibaca"})

        # ─── Project Handover / Sharing ───────────────────────────────────
        if path == "/api/project/handover":
            cur_user = self._get_auth_user()
            if not cur_user:
                return self._send_json({"status": "unauthorized", "message": "Autentikasi diperlukan"}, status=401)

            file_id = body.get("file_id")
            project_name = body.get("project_name") or "Proyek CDPK"
            client_name = body.get("client_name") or "Klien"
            target_usernames = body.get("target_usernames") or []
            note = body.get("note", "").strip()

            if not file_id:
                return self._send_json({"status": "error", "message": "file_id wajib disertakan"}, status=400)
            if not target_usernames or not isinstance(target_usernames, list):
                return self._send_json({"status": "error", "message": "Pilih minimal 1 rekan tim tujuan handover"}, status=400)

            users = load_users()
            user_dict = {u["username"].lower(): u for u in users if u.get("status") == "active"}
            cur_username_lower = cur_user.get("username", "").strip().lower()

            valid_targets = []
            for tu in target_usernames:
                tu_clean = tu.strip().lower()
                if tu_clean in user_dict and tu_clean != cur_username_lower:
                    valid_targets.append(tu_clean)

            if not valid_targets:
                return self._send_json({"status": "error", "message": "Tidak ada pengguna tujuan yang valid atau aktif"}, status=400)

            # Load project data from Google Drive
            proj_data = load_project_data_from_gdrive(file_id)
            existing_collabs = []
            if proj_data:
                file_creator = (proj_data.get("creator", {}).get("username") or "").lower()
                existing_collabs = [c.lower() for c in proj_data.get("collaborators", [])]
                if cur_user.get("role") not in ("admin", "overseer") and file_creator != cur_username_lower and cur_username_lower not in existing_collabs:
                    return self._send_json({"status": "forbidden", "message": "Hanya pembuat proyek, kolaborator, atau Admin/Overseer yang dapat melakukan handover"}, status=403)

                all_collabs = list(dict.fromkeys(existing_collabs + valid_targets))
                proj_data["collaborators"] = all_collabs

                if "handover_history" not in proj_data:
                    proj_data["handover_history"] = []
                proj_data["handover_history"].append({
                    "from_username": cur_user.get("username"),
                    "from_name": cur_user.get("name"),
                    "to_usernames": valid_targets,
                    "note": note,
                    "timestamp": datetime.now(timezone.utc).isoformat()
                })

                updated_json_bytes = json.dumps(proj_data, indent=2, ensure_ascii=False).encode("utf-8")
                update_drive_file_content(file_id, updated_json_bytes)
                collab_str = ",".join(all_collabs)
            else:
                collab_str = ",".join(valid_targets)

            # Update Google Drive appProperties
            patch_drive_file_properties(file_id, {"collaborators": collab_str})

            # Send in-app notification to all recipients
            note_suffix = f' Catatan: "{note}"' if note else ''
            notif_msg = f"{cur_user.get('name')} menyerahkan proyek '{project_name}' (Klien: {client_name}) kepada Anda.{note_suffix}"
            for tu in valid_targets:
                add_notification(
                    target=tu,
                    title=f"🤝 Handover Proyek: {project_name}",
                    message=notif_msg,
                    notif_type="handover",
                    action="load_project",
                    action_data={"file_id": file_id, "project_name": project_name, "client_name": client_name}
                )

            log_audit_event(
                cur_user.get("username", ""),
                cur_user.get("name", ""),
                cur_user.get("role", "engineer"),
                "handover",
                f"Handover proyek '{project_name}' (Klien: {client_name}) ke rekan: {', '.join(valid_targets)}",
                ip=self.address_string(),
                metadata={"file_id": file_id, "targets": valid_targets, "note": note}
            )

            return self._send_json({
                "status": "ok",
                "message": f"Proyek '{project_name}' berhasil diserahkan kepada {len(valid_targets)} rekan tim.",
                "collaborators": valid_targets
            })

        # ─── Load Project File from Google Drive ──────────────────────────
        if path == "/api/project/load-from-drive":
            cur_user = self._get_auth_user()
            if not cur_user:
                return self._send_json({"status": "unauthorized", "message": "Autentikasi diperlukan"}, status=401)
            file_id = body.get("file_id")
            if not file_id:
                return self._send_json({"status": "error", "message": "file_id required"}, status=400)
            proj_data = load_project_data_from_gdrive(file_id)
            if not proj_data:
                return self._send_json({"status": "error", "message": "Failed loading project file"}, status=404)

            # Access Control: Admin and Overseer get full access, regular user can access if creator or collaborator
            if cur_user.get("role") not in ("admin", "overseer"):
                file_creator = (proj_data.get("creator", {}).get("username") or "").lower()
                cur_u = cur_user.get("username", "").lower()
                collaborators = [c.lower() for c in proj_data.get("collaborators", [])]
                if file_creator and file_creator != cur_u and cur_u not in collaborators:
                    return self._send_json({
                        "status": "forbidden",
                        "message": "Akses ditolak: Anda hanya memiliki izin untuk membuka proyek yang Anda buat atau dibagikan kepada Anda."
                    }, status=403)

            proj_title = proj_data.get("projName") or "Proyek CDPK"
            client_title = proj_data.get("clientName") or "Klien"
            log_audit_event(
                cur_user.get("username", ""),
                cur_user.get("name", ""),
                cur_user.get("role", "engineer"),
                "load_project",
                f"Membuka berkas proyek '{proj_title}' (Klien: {client_title}) dari Google Drive",
                ip=self.address_string(),
                metadata={"file_id": file_id}
            )

            return self._send_json({"status": "ok", "project": proj_data})

        # ─── Client Audit Event Logger (PDF, Excel, Custom Activity) ───────
        if path == "/api/audit/log":
            cur_user = self._get_auth_user()
            if not cur_user:
                return self._send_json({"status": "unauthorized", "message": "Autentikasi diperlukan"}, status=401)
            action = body.get("action", "activity")
            detail = body.get("detail", "")
            metadata = body.get("metadata", {})
            entry = log_audit_event(
                username=cur_user.get("username", ""),
                name=cur_user.get("name", ""),
                role=cur_user.get("role", "engineer"),
                action=action,
                detail=detail,
                ip=self.address_string(),
                metadata=metadata
            )
            return self._send_json({"status": "ok", "entry": entry})

        # ─── AI Copilot ───────────────────────────────────────────────────
        if path == "/api/ai/copilot":
            model_id = body.get("model", "gemini-3.8-flash")
            prompt = body.get("prompt", "")
            lang = body.get("lang", "id")
            current_state = body.get("state", {})
            api_key_override = body.get("api_key", "")
            sync_res = sync_from_gdrive(force=False)
            ai_res = query_ai_copilot(
                model_id=model_id,
                prompt=prompt,
                lang=lang,
                current_state=current_state,
                knowledge=sync_res.get("knowledge", {}),
                api_key_override=api_key_override
            )
            return self._send_json(ai_res)

        self._send_json({"status": "error", "message": "Unknown endpoint"}, status=404)


def run_server():
    # Pre-warm users & knowledge cache at startup
    try:
        load_users()
        res = sync_from_gdrive(force=False)
        logger.info("Initial knowledge loaded from: %s", res.get("source"))
    except Exception as e:
        logger.warning("Startup sync warning: %s", e)

    server = ThreadingHTTPServer(("0.0.0.0", PORT), CDPKRequestHandler)
    logger.info("CDPK System Planner running at http://0.0.0.0:%d", PORT)
    server.serve_forever()


if __name__ == "__main__":
    run_server()
