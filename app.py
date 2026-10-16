#!/usr/bin/env python3
"""
CDPK System Planner — Cloud Web Server & API Gateway
Port: 7860 (Render Cloud Docker Standard)
Integrates:
- Live Google Drive & Master Pricelist Sync (drive citradata)
- Multi-Model AI Copilot (Google Gemini 3.8 Flash & Gemini 3.8 Pro)
- Bilingual (ID / EN) SPA Frontend
"""

import json
import logging
import mimetypes
import os
import urllib.parse
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

from server.gdrive_sync import (
    DEFAULT_FOLDER_ID,
    DEFAULT_SPREADSHEET_ID,
    sync_from_gdrive,
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
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path == "/health":
            return self._send_json({
                "status": "healthy",
                "app": "CDPK System Planner",
                "version": "8.0.0",
                "gdrive_folder_id": DEFAULT_FOLDER_ID,
                "gdrive_spreadsheet_id": DEFAULT_SPREADSHEET_ID,
                "ai_models": list(ALLOWED_MODELS.keys())
            })

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

        # Serve static files
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

        if path == "/api/pricing/sync":
            spreadsheet_id = body.get("spreadsheet_id") or DEFAULT_SPREADSHEET_ID
            folder_id = body.get("folder_id") or DEFAULT_FOLDER_ID
            sync_res = sync_from_gdrive(force=True, spreadsheet_id=spreadsheet_id, folder_id=folder_id)
            return self._send_json(sync_res)

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
    # Pre-warm knowledge cache at startup
    try:
        res = sync_from_gdrive(force=False)
        logger.info("Initial knowledge loaded from: %s", res.get("source"))
    except Exception as e:
        logger.warning("Startup sync warning: %s", e)

    server = ThreadingHTTPServer(("0.0.0.0", PORT), CDPKRequestHandler)
    logger.info("CDPK System Planner running at http://0.0.0.0:%d", PORT)
    server.serve_forever()


if __name__ == "__main__":
    run_server()
