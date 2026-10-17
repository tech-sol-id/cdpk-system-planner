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
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

from server.auth import (
    authenticate_user,
    create_session,
    get_session_user,
    invalidate_session,
    load_users,
    add_team_member,
    update_team_member,
    toggle_user_status,
    reset_user_password,
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
    get_diagnostics
)
from server.ai_copilot import ALLOWED_MODELS, query_ai_copilot

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
        self.send_header("Cache-Control", "no-store")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Session-Token")
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path == "/health":
            return self._send_json({
                "status": "healthy",
                "app": "CDPK System Planner",
                "version": "8.2.1",
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
            if not user or user.get("role") != "admin":
                return self._send_json({"status": "forbidden", "message": "Akses ditolak: Hanya Administrator"}, status=403)
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

        # ─── Cloud Project Archive ────────────────────────────────────────
        if path == "/api/project/list-drive":
            files = list_saved_projects_from_gdrive(OUTPUT_SUBFOLDER_ID)
            return self._send_json({
                "status": "ok",
                "subfolder_id": OUTPUT_SUBFOLDER_ID,
                "subfolder_url": f"https://drive.google.com/drive/folders/{OUTPUT_SUBFOLDER_ID}",
                "files": files
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
        if path == "/api/auth/login":
            ident = body.get("identifier") or body.get("username") or body.get("email")
            pwd = body.get("password") or ""
            user, err = authenticate_user(ident, pwd)
            if user:
                token = create_session(user)
                return self._send_json({"status": "ok", "token": token, "user": user})
            return self._send_json({"status": "error", "message": err or "Username atau Password salah."}, status=401)

        if path == "/api/auth/logout":
            auth_hdr = self.headers.get("Authorization", "")
            token = auth_hdr[7:].strip() if auth_hdr.startswith("Bearer ") else self.headers.get("X-Session-Token", "").strip()
            if token:
                invalidate_session(token)
            return self._send_json({"status": "ok", "message": "Logged out"})

        if path == "/api/auth/users":
            cur_user = self._get_auth_user()
            if not cur_user or cur_user.get("role") != "admin":
                return self._send_json({"status": "forbidden", "message": "Hanya Administrator yang dapat menambah pengguna"}, status=403)
            res = add_team_member(cur_user.get("role"), body)
            return self._send_json(res, status=200 if res["status"] == "ok" else 400)

        if path == "/api/auth/users/update":
            cur_user = self._get_auth_user()
            if not cur_user or cur_user.get("role") != "admin":
                return self._send_json({"status": "forbidden", "message": "Hanya Administrator yang dapat mengubah pengguna"}, status=403)
            username = body.get("username")
            res = update_team_member(cur_user.get("role"), username, body)
            return self._send_json(res, status=200 if res["status"] == "ok" else 400)

        if path == "/api/auth/users/toggle-status":
            cur_user = self._get_auth_user()
            if not cur_user or cur_user.get("role") != "admin":
                return self._send_json({"status": "forbidden", "message": "Hanya Administrator yang dapat mengubah status pengguna"}, status=403)
            username = body.get("username")
            res = toggle_user_status(cur_user.get("role"), username)
            return self._send_json(res, status=200 if res["status"] == "ok" else 400)

        if path == "/api/auth/users/reset-password":
            cur_user = self._get_auth_user()
            if not cur_user or cur_user.get("role") != "admin":
                return self._send_json({"status": "forbidden", "message": "Hanya Administrator yang dapat me-reset password"}, status=403)
            username = body.get("username")
            new_pwd = body.get("password") or body.get("new_password") or "cdpk2026!"
            res = reset_user_password(cur_user.get("role"), username, new_pwd)
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
                "email": body.get("creatorEmail") or "presales@citradata.id"
            }
            save_res = save_project_to_gdrive(body, cur_user)
            return self._send_json(save_res)

        # ─── Load Project File from Google Drive ──────────────────────────
        if path == "/api/project/load-from-drive":
            file_id = body.get("file_id")
            if not file_id:
                return self._send_json({"status": "error", "message": "file_id required"}, status=400)
            proj_data = load_project_data_from_gdrive(file_id)
            if proj_data:
                return self._send_json({"status": "ok", "project": proj_data})
            return self._send_json({"status": "error", "message": "Failed loading project file"}, status=404)

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
