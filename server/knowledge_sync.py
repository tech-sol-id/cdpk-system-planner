#!/usr/bin/env python3
"""
Knowledge Sync Engine for CDPK System Planner.
Recursively synchronizes Google Drive Knowledge Bank (Folder ID: 1LW_026giCQYGGpr7NynkSm2RTiUV1tKr)
into high-density Markdown (.md) documents and stores them in:
- Google Drive Subfolder: `_Markdown_Knowledge_Base` (Folder ID: 1-rv_4obDjZ3ZqxSQIvx6u-bYfUnH1zMV)
- Local Server Cache: `data/knowledge_base/*.md`
- State Ledger: `data/knowledge_state.json`

Features:
- Handles Google Drive Folders and Shortcuts (application/vnd.google-apps.shortcut)
- Extracts text & structured tables from PDF, DOCX, PPTX, XLSX, Google Docs, TXT
- Automatically embeds document metadata, Google Drive source links, and image reference notes
- Incremental syncing (only downloads & converts new or modified files)
- Periodic background monitoring daemon
"""

import io
import json
import logging
import os
import re
import threading
import time
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional, Set, Tuple

import openpyxl

try:
    import pypdf
except ImportError:
    pypdf = None

try:
    import docx
except ImportError:
    docx = None

try:
    import pptx
except ImportError:
    pptx = None

from server.gdrive_sync import get_access_token

logger = logging.getLogger("cdpk.knowledge_sync")

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
LOCAL_KB_DIR = os.path.join(DATA_DIR, "knowledge_base")
STATE_FILE = os.path.join(DATA_DIR, "knowledge_state.json")

# Google Drive Target Configuration
ROOT_KNOWLEDGE_FOLDER_ID = "1LW_026giCQYGGpr7NynkSm2RTiUV1tKr"
MARKDOWN_SUBFOLDER_NAME = "_Markdown_Knowledge_Base"
MARKDOWN_SUBFOLDER_ID = "1-rv_4obDjZ3ZqxSQIvx6u-bYfUnH1zMV"

# Supported mime types for document extraction
SUPPORTED_MIME_TYPES = {
    "application/pdf": "pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
    "application/vnd.ms-excel": "xls",
    "application/vnd.google-apps.document": "gdoc",
    "text/plain": "txt",
    "text/markdown": "md",
    "text/csv": "csv"
}

_SYNC_LOCK = threading.Lock()
_SYNC_STATUS = {
    "is_syncing": False,
    "last_synced": None,
    "last_error": None,
    "total_documents": 0,
    "new_synced_in_last_run": 0,
    "updated_in_last_run": 0
}


def ensure_directories():
    os.makedirs(LOCAL_KB_DIR, exist_ok=True)
    os.makedirs(DATA_DIR, exist_ok=True)


def load_knowledge_state() -> Dict[str, Any]:
    ensure_directories()
    if os.path.exists(STATE_FILE):
        try:
            with open(STATE_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            logger.warning(f"Error loading {STATE_FILE}: {e}")
    return {
        "version": 1,
        "last_checked": None,
        "markdown_folder_id": MARKDOWN_SUBFOLDER_ID,
        "files": {},
        "remote_md_files": {}
    }


def save_knowledge_state(state: Dict[str, Any]):
    ensure_directories()
    try:
        with open(STATE_FILE, "w", encoding="utf-8") as f:
            json.dump(state, f, indent=2, ensure_ascii=False)
    except Exception as e:
        logger.error(f"Failed to save {STATE_FILE}: {e}")


def sanitize_filename(name: str) -> str:
    """Turn document title into a safe, clean markdown filename."""
    base = os.path.splitext(name)[0]
    base = re.sub(r"[^\w\-\.]+", "_", base)
    base = re.sub(r"_+", "_", base).strip("_")
    return (base or "document") + ".md"


# ═══════════════════════════════════════════════════════════════════════════
# GOOGLE DRIVE REST API HELPERS
# ═══════════════════════════════════════════════════════════════════════════

def drive_api_get(url: str, token: str, timeout: int = 20) -> Any:
    req = urllib.request.Request(url, headers={"Authorization": f"Bearer {token}"})
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return json.loads(resp.read().decode("utf-8"))


def drive_api_download_bytes(file_id: str, token: str, timeout: int = 45) -> Optional[bytes]:
    url = f"https://www.googleapis.com/drive/v3/files/{file_id}?alt=media&supportsAllDrives=true"
    req = urllib.request.Request(url, headers={"Authorization": f"Bearer {token}"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return resp.read()
    except Exception as e:
        logger.warning(f"Failed downloading file {file_id}: {e}")
        return None


def drive_api_export_text(file_id: str, token: str, mime_type: str = "text/plain") -> Optional[str]:
    enc_mime = urllib.parse.quote(mime_type)
    url = f"https://www.googleapis.com/drive/v3/files/{file_id}/export?mimeType={enc_mime}&supportsAllDrives=true"
    req = urllib.request.Request(url, headers={"Authorization": f"Bearer {token}"})
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return resp.read().decode("utf-8", errors="replace")
    except Exception as e:
        logger.warning(f"Failed exporting Google Doc {file_id}: {e}")
        return None


def list_remote_markdown_subfolder(token: str) -> Dict[str, str]:
    """
    Returns mapping of filename -> drive_file_id for files currently in
    the `_Markdown_Knowledge_Base` subfolder.
    """
    q = urllib.parse.quote(f"'{MARKDOWN_SUBFOLDER_ID}' in parents and trashed = false")
    url = (
        f"https://www.googleapis.com/drive/v3/files?q={q}"
        f"&fields=files(id,name,mimeType,modifiedTime)&supportsAllDrives=true"
        f"&includeItemsFromAllDrives=true&corpora=allDrives&pageSize=1000"
    )
    mapping = {}
    try:
        data = drive_api_get(url, token)
        for f in data.get("files", []):
            mapping[f.get("name")] = f.get("id")
    except Exception as e:
        logger.warning(f"Failed listing remote markdown subfolder: {e}")
    return mapping


def upload_or_update_markdown_file(
    filename: str,
    content: str,
    token: str,
    existing_file_id: Optional[str] = None
) -> Optional[str]:
    """
    Uploads new or updates existing Markdown file directly in Google Drive
    under `_Markdown_Knowledge_Base`.
    """
    content_bytes = content.encode("utf-8")

    if existing_file_id:
        # Update existing media
        upload_url = (
            f"https://www.googleapis.com/upload/drive/v3/files/{existing_file_id}"
            f"?uploadType=media&supportsAllDrives=true"
        )
        req = urllib.request.Request(
            upload_url,
            data=content_bytes,
            method="PATCH",
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "text/markdown; charset=UTF-8",
                "Content-Length": str(len(content_bytes))
            }
        )
        try:
            with urllib.request.urlopen(req, timeout=25) as resp:
                res = json.loads(resp.read().decode("utf-8"))
                return res.get("id", existing_file_id)
        except Exception as e:
            logger.warning(f"Failed updating remote MD {filename} ({existing_file_id}): {e}")

    # Multipart create
    boundary = f"=====CDPK_MD_BOUNDARY_{int(time.time())}====="
    metadata = {
        "name": filename,
        "parents": [MARKDOWN_SUBFOLDER_ID],
        "description": "Generated full-text Markdown for CDPK AI Copilot knowledge base"
    }

    body = io.BytesIO()
    body.write(f"--{boundary}\r\n".encode("utf-8"))
    body.write(b"Content-Type: application/json; charset=UTF-8\r\n\r\n")
    body.write(json.dumps(metadata).encode("utf-8"))
    body.write(b"\r\n")
    body.write(f"--{boundary}\r\n".encode("utf-8"))
    body.write(b"Content-Type: text/markdown; charset=UTF-8\r\n\r\n")
    body.write(content_bytes)
    body.write(b"\r\n")
    body.write(f"--{boundary}--\r\n".encode("utf-8"))

    upload_data = body.getvalue()
    upload_url = (
        "https://www.googleapis.com/upload/drive/v3/files"
        "?uploadType=multipart&supportsAllDrives=true&fields=id,name"
    )

    req = urllib.request.Request(
        upload_url,
        data=upload_data,
        method="POST",
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": f"multipart/related; boundary={boundary}",
            "Content-Length": str(len(upload_data))
        }
    )

    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            res = json.loads(resp.read().decode("utf-8"))
            return res.get("id")
    except Exception as e:
        logger.warning(f"Failed uploading new MD {filename} to Drive: {e}")
        return None


# ═══════════════════════════════════════════════════════════════════════════
# DOCUMENT EXTRACTION LOGIC
# ═══════════════════════════════════════════════════════════════════════════

def extract_pdf_text(content_bytes: bytes, max_pages: int = 30) -> str:
    """Extract page-by-page clean text from PDF bytes."""
    if pypdf is None:
        return "> *Catatan: Modul pypdf belum terpasang di runtime server.*"
    try:
        reader = pypdf.PdfReader(io.BytesIO(content_bytes))
        total = len(reader.pages)
        pages_to_read = min(total, max_pages)
        chunks = []
        for i in range(pages_to_read):
            time.sleep(0.01)  # Release GIL to let HTTP server handle requests
            page_text = reader.pages[i].extract_text() or ""
            page_text = page_text.strip()
            if page_text:
                chunks.append(f"### Halaman / Page {i + 1}\n\n{page_text}")
        if total > max_pages:
            chunks.append(f"\n> *Catatan: Dokumen memiliki total {total} halaman. Halaman 1-{max_pages} telah diekstrak ke dalam teks Markdown.*")
        return "\n\n".join(chunks)
    except Exception as e:
        logger.warning(f"PDF extraction error: {e}")
        return ""


def extract_docx_text(content_bytes: bytes) -> str:
    """Extract headings, paragraphs, and tables from DOCX."""
    if docx is None:
        return "> *Catatan: Modul python-docx belum terpasang di runtime server.*"
    try:
        doc = docx.Document(io.BytesIO(content_bytes))
        lines = []
        for p in doc.paragraphs:
            txt = p.text.strip()
            if not txt:
                continue
            if p.style.name.startswith("Heading 1"):
                lines.append(f"## {txt}")
            elif p.style.name.startswith("Heading 2"):
                lines.append(f"### {txt}")
            elif p.style.name.startswith("Heading"):
                lines.append(f"#### {txt}")
            else:
                lines.append(txt)

        for t_idx, table in enumerate(doc.tables):
            lines.append(f"\n#### Tabel {t_idx + 1}")
            rows_data = []
            for row in table.rows:
                row_cells = [cell.text.replace("\n", " ").strip() for cell in row.cells]
                rows_data.append(row_cells)
            if rows_data:
                # Markdown table format
                hdr = rows_data[0]
                lines.append("| " + " | ".join(hdr) + " |")
                lines.append("| " + " | ".join(["---"] * len(hdr)) + " |")
                for r in rows_data[1:]:
                    lines.append("| " + " | ".join(r) + " |")
                lines.append("")

        return "\n\n".join(lines)
    except Exception as e:
        logger.warning(f"DOCX extraction error: {e}")
        return ""


def extract_pptx_text(content_bytes: bytes) -> str:
    """Extract slides, titles, bullet points and notes from PPTX."""
    if pptx is None:
        return "> *Catatan: Modul python-pptx belum terpasang di runtime server.*"
    try:
        prs = pptx.Presentation(io.BytesIO(content_bytes))
        slides_text = []
        for idx, slide in enumerate(prs.slides):
            time.sleep(0.01)  # Release GIL
            slide_lines = [f"### Slide {idx + 1}"]
            for shape in slide.shapes:
                if shape.has_text_frame:
                    for p in shape.text_frame.paragraphs:
                        t = p.text.strip()
                        if t:
                            slide_lines.append(f"- {t}")
            if len(slide_lines) > 1:
                slides_text.append("\n".join(slide_lines))
        return "\n\n".join(slides_text)
    except Exception as e:
        logger.warning(f"PPTX extraction error: {e}")
        return ""


def extract_xlsx_text(content_bytes: bytes, max_rows: int = 200) -> str:
    """Extract sheets and tables from Excel."""
    try:
        wb = openpyxl.load_workbook(io.BytesIO(content_bytes), data_only=True)
        sheets_text = []
        for sname in wb.sheetnames:
            ws = wb[sname]
            rows = list(ws.iter_rows(values_only=True))
            if not rows:
                continue
            lines = [f"### Sheet: {sname}"]
            valid_rows = [r for r in rows if any(c is not None for c in r)][:max_rows]
            if valid_rows:
                hdr = [str(c or "").replace("\n", " ").strip() for c in valid_rows[0]]
                lines.append("| " + " | ".join(hdr) + " |")
                lines.append("| " + " | ".join(["---"] * len(hdr)) + " |")
                for r in valid_rows[1:]:
                    row_strs = [str(c or "").replace("\n", " ").strip() for c in r]
                    lines.append("| " + " | ".join(row_strs) + " |")
            sheets_text.append("\n".join(lines))
        return "\n\n".join(sheets_text)
    except Exception as e:
        logger.warning(f"XLSX extraction error: {e}")
        return ""


def build_markdown_document(
    metadata: Dict[str, Any],
    body_text: str
) -> str:
    """
    Format standard Markdown document with YAML frontmatter,
    source Drive reference link, and image reference notice.
    """
    title = metadata.get("name", "Document")
    file_id = metadata.get("id", "")
    mime_type = metadata.get("mimeType", "")
    folder_path = metadata.get("path", "")
    mod_time = metadata.get("modifiedTime", "")
    view_url = f"https://drive.google.com/file/d/{file_id}/view"

    frontmatter = f"""---
title: "{title}"
original_file_name: "{title}"
drive_file_id: "{file_id}"
drive_view_url: "{view_url}"
mime_type: "{mime_type}"
folder_path: "{folder_path}"
last_modified: "{mod_time}"
image_reference_note: "Gambar skematik, diagram blok, kurva grafis, dan foto fisik perangkat dapat dilihat langsung pada file asli di link di atas."
extracted_at: "{datetime.now(timezone.utc).isoformat()}"
---

# {title}

> 🔗 **Dokumen Asli (Google Drive):** [{title}]({view_url})
> 📂 **Lokasi Folder:** `{folder_path}`
> ℹ️ *Catatan AI: Teks dokumen ini adalah salinan lengkap untuk pemrosesan cepat. Untuk diagram, peta sinyal, kurva frekuensi, dan foto produk resolusi tinggi, rujuk langsung ke link dokumen asli.*

---

{body_text.strip()}
"""
    return frontmatter


# ═══════════════════════════════════════════════════════════════════════════
# CRAWLER & SYNC ORCHESTRATION
# ═══════════════════════════════════════════════════════════════════════════

def crawl_drive_knowledge_tree(token: str) -> List[Dict[str, Any]]:
    """
    Recursively traverse Google Drive root folder and shortcuts all the way
    to the deepest leaf, handling nested shortcuts and pagination with nextPageToken.
    Returns list of discovered documents eligible for extraction.
    """
    visited_folders: Set[str] = set()
    discovered_files: List[Dict[str, Any]] = []

    def _traverse(folder_id: str, path_prefix: str, depth: int = 0):
        if folder_id in visited_folders or depth > 8:
            return
        visited_folders.add(folder_id)

        page_token = None
        while True:
            q = urllib.parse.quote(f"'{folder_id}' in parents and trashed = false")
            url = (
                f"https://www.googleapis.com/drive/v3/files?q={q}"
                f"&fields=nextPageToken,files(id,name,mimeType,modifiedTime,size,shortcutDetails)"
                f"&supportsAllDrives=true&includeItemsFromAllDrives=true&corpora=allDrives&pageSize=100"
            )
            if page_token:
                url += f"&pageToken={page_token}"

            try:
                data = drive_api_get(url, token)
                items = data.get("files", [])
                page_token = data.get("nextPageToken")
            except Exception as e:
                logger.warning(f"Error traversing folder {folder_id} ({path_prefix}): {e}")
                break

            for it in items:
                name = it.get("name", "")
                mime = it.get("mimeType", "")
                fid = it.get("id", "")

                # Exclude output subfolder and photo gallery directories
                if name == MARKDOWN_SUBFOLDER_NAME or fid == MARKDOWN_SUBFOLDER_ID:
                    continue
                if any(w in name.lower() for w in ["foto produk", "gallery", "photos"]):
                    continue

                if mime == "application/vnd.google-apps.shortcut":
                    details = it.get("shortcutDetails", {})
                    target_id = details.get("targetId")
                    target_mime = details.get("targetMimeType")
                    if target_mime == "application/vnd.google-apps.folder" and target_id:
                        # Follow shortcut into target folder all the way to the deepest leaf
                        _traverse(target_id, f"{path_prefix}{name}/", depth + 1)
                    elif target_id and target_mime in SUPPORTED_MIME_TYPES:
                        discovered_files.append({
                            "id": target_id,
                            "name": name,
                            "mimeType": target_mime,
                            "path": path_prefix,
                            "modifiedTime": it.get("modifiedTime"),
                            "size": it.get("size")
                        })
                elif mime == "application/vnd.google-apps.folder":
                    _traverse(fid, f"{path_prefix}{name}/", depth + 1)
                elif mime in SUPPORTED_MIME_TYPES:
                    discovered_files.append({
                        "id": fid,
                        "name": name,
                        "mimeType": mime,
                        "path": path_prefix,
                        "modifiedTime": it.get("modifiedTime"),
                        "size": it.get("size")
                    })

            if not page_token:
                break

    _traverse(ROOT_KNOWLEDGE_FOLDER_ID, "AI Bank Knowledge/")
    return discovered_files


def sync_knowledge_base(force: bool = False, max_items_per_run: int = 15) -> Dict[str, Any]:
    """
    Main synchronization routine:
    1. Crawls root folder + shortcuts on Google Drive.
    2. Identifies new or modified documents compared to knowledge_state.json.
    3. Downloads and extracts text into Markdown.
    4. Saves locally into data/knowledge_base/*.md.
    5. Uploads / updates file in Google Drive subfolder `_Markdown_Knowledge_Base`.
    6. Updates state ledger.
    """
    global _SYNC_STATUS
    if not _SYNC_LOCK.acquire(blocking=False):
        return {
            "status": "already_running",
            "message": "Sinkronisasi sedang berlangsung di background.",
            **_SYNC_STATUS
        }

    ensure_directories()
    _SYNC_STATUS["is_syncing"] = True
    _SYNC_STATUS["last_error"] = None

    token = get_access_token("citradata")
    if not token:
        _SYNC_STATUS["is_syncing"] = False
        _SYNC_STATUS["last_error"] = "Google Drive access token tidak tersedia."
        _SYNC_LOCK.release()
        return {"status": "error", "message": _SYNC_STATUS["last_error"]}

    new_synced = 0
    updated_synced = 0
    errors = []

    try:
        state = load_knowledge_state()
        state_files = state.get("files", {})

        # List existing remote markdown files in _Markdown_Knowledge_Base
        remote_md_map = list_remote_markdown_subfolder(token)
        state["remote_md_files"] = remote_md_map

        # Discover all documents
        discovered = crawl_drive_knowledge_tree(token)
        logger.info(f"Discovered {len(discovered)} candidate documents in Drive Knowledge Bank.")

        # Determine which files need processing
        to_process = []
        for doc in discovered:
            fid = doc["id"]
            mtime = doc.get("modifiedTime")
            md_name = sanitize_filename(doc["name"])
            local_path = os.path.join(LOCAL_KB_DIR, md_name)

            cached = state_files.get(fid)
            needs_update = (
                force or
                not cached or
                cached.get("modifiedTime") != mtime or
                not os.path.exists(local_path) or
                cached.get("status") != "ready"
            )
            if needs_update:
                to_process.append(doc)

        def _doc_priority(d: Dict[str, Any]) -> int:
            n = d.get("name", "").lower()
            p = d.get("path", "").lower()
            pri = 0
            if "katalog" in n or "citradata" in n:
                pri += 200
            if "is540" in n or "is940" in n or "is440" in n:
                pri += 150
            if any(k in n for k in ["r2", "r7", "slr", "duplexer", "rg170", "brochure"]):
                pri += 120
            if "atex" in n or "hazard" in n:
                pri += 80
            return pri

        to_process.sort(key=_doc_priority, reverse=True)
        logger.info(f"Documents to convert/sync this run: {len(to_process)} (batch cap: {max_items_per_run})")

        # Process batch
        for doc in to_process[:max_items_per_run]:
            fid = doc["id"]
            name = doc["name"]
            mime = doc["mimeType"]
            mtime = doc.get("modifiedTime")
            md_name = sanitize_filename(name)
            local_path = os.path.join(LOCAL_KB_DIR, md_name)

            logger.info(f"Processing ({mime}): {name}")
            body_text = ""

            size_val = 0
            try:
                size_val = int(doc.get("size") or 0)
            except Exception:
                size_val = 0

            try:
                if size_val > 12 * 1024 * 1024 and mime == "application/pdf":
                    logger.info(f"Skipping heavy in-memory PDF parsing for {name} ({size_val} bytes > 12MB)")
                    body_text = f"> *Catatan: Dokumen berukuran besar ({round(size_val/(1024*1024), 1)} MB). Untuk referensi teknis lengkap, silakan buka langsung file asli di Google Drive link di atas.*"
                elif mime == "application/vnd.google-apps.document":
                    body_text = drive_api_export_text(fid, token) or ""
                elif mime in ("text/plain", "text/markdown", "text/csv"):
                    raw = drive_api_download_bytes(fid, token)
                    body_text = raw.decode("utf-8", errors="replace") if raw else ""
                elif mime == "application/pdf":
                    raw = drive_api_download_bytes(fid, token)
                    if raw:
                        body_text = extract_pdf_text(raw)
                elif mime == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                    raw = drive_api_download_bytes(fid, token)
                    if raw:
                        body_text = extract_docx_text(raw)
                elif mime == "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                    raw = drive_api_download_bytes(fid, token)
                    if raw:
                        body_text = extract_pptx_text(raw)
                elif mime in ("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"):
                    raw = drive_api_download_bytes(fid, token)
                    if raw:
                        body_text = extract_xlsx_text(raw)

                if not body_text or len(body_text.strip()) < 10:
                    body_text = f"> *Catatan: Tidak ada teks yang dapat diekstrak atau dokumen berupa gambar/grafis penuh. Rujuk langsung ke dokumen asli di link di atas.*"

                # Generate formatted Markdown with frontmatter & links
                full_md = build_markdown_document(doc, body_text)

                # Save local copy
                with open(local_path, "w", encoding="utf-8") as f:
                    f.write(full_md)

                # Upload or update in Drive _Markdown_Knowledge_Base
                existing_remote_id = remote_md_map.get(md_name)
                remote_md_id = upload_or_update_markdown_file(
                    md_name, full_md, token, existing_file_id=existing_remote_id
                )
                if remote_md_id:
                    remote_md_map[md_name] = remote_md_id

                # Update state entry
                is_new = fid not in state_files
                state_files[fid] = {
                    "name": name,
                    "mimeType": mime,
                    "modifiedTime": mtime,
                    "md_filename": md_name,
                    "drive_md_id": remote_md_id,
                    "local_path": local_path,
                    "char_count": len(full_md),
                    "synced_at": datetime.now(timezone.utc).isoformat(),
                    "status": "ready"
                }

                if is_new:
                    new_synced += 1
                else:
                    updated_synced += 1

                # Save state incrementally
                state["files"] = state_files
                state["last_checked"] = datetime.now(timezone.utc).isoformat()
                state["total_documents"] = len([f for f in state_files.values() if f.get("status") == "ready"])
                save_knowledge_state(state)

            except Exception as e:
                logger.error(f"Failed processing {name}: {e}")
                errors.append(f"{name}: {str(e)}")

        state["files"] = state_files
        state["last_checked"] = datetime.now(timezone.utc).isoformat()
        state["total_documents"] = len([f for f in state_files.values() if f.get("status") == "ready"])
        save_knowledge_state(state)

        _SYNC_STATUS["last_synced"] = state["last_checked"]
        _SYNC_STATUS["total_documents"] = state["total_documents"]
        _SYNC_STATUS["new_synced_in_last_run"] = new_synced
        _SYNC_STATUS["updated_in_last_run"] = updated_synced

        return {
            "status": "ok",
            "message": f"Sinkronisasi selesai: {new_synced} dokumen baru, {updated_synced} diperbarui.",
            "total_documents": state["total_documents"],
            "remaining_unconverted": max(0, len(to_process) - max_items_per_run),
            "errors": errors
        }

    except Exception as e:
        logger.error(f"Unexpected sync error: {e}")
        _SYNC_STATUS["last_error"] = str(e)
        return {"status": "error", "message": str(e)}

    finally:
        _SYNC_STATUS["is_syncing"] = False
        _SYNC_LOCK.release()


def get_knowledge_status() -> Dict[str, Any]:
    state = load_knowledge_state()
    files_list = list(state.get("files", {}).values())
    files_list.sort(key=lambda x: x.get("synced_at", ""), reverse=True)
    return {
        "status": "ok",
        "is_syncing": _SYNC_STATUS["is_syncing"],
        "last_synced": state.get("last_checked") or _SYNC_STATUS.get("last_synced"),
        "total_documents": len([f for f in files_list if f.get("status") == "ready"]),
        "markdown_folder_url": f"https://drive.google.com/drive/folders/{MARKDOWN_SUBFOLDER_ID}",
        "recent_documents": files_list[:10]
    }


# ═══════════════════════════════════════════════════════════════════════════
# BACKGROUND PERIODIC MONITORING DAEMON
# ═══════════════════════════════════════════════════════════════════════════

_DAEMON_THREAD = None
_DAEMON_RUNNING = False


def _daemon_loop(interval_seconds: int = 900):
    global _DAEMON_RUNNING
    logger.info(f"Knowledge sync background daemon started (interval: {interval_seconds}s).")
    # Deferred initial sync after 120s warmup to guarantee container health
    time.sleep(120)
    try:
        sync_knowledge_base(force=False, max_items_per_run=10)
    except Exception as e:
        logger.warning(f"Initial knowledge sync warning: {e}")

    while _DAEMON_RUNNING:
        try:
            time.sleep(interval_seconds)
            if not _DAEMON_RUNNING:
                break
            logger.info("Executing periodic knowledge sync check...")
            sync_knowledge_base(force=False, max_items_per_run=15)
        except Exception as e:
            logger.warning(f"Background sync exception: {e}")


def start_periodic_sync_daemon(interval_seconds: int = 900):
    global _DAEMON_THREAD, _DAEMON_RUNNING
    if _DAEMON_RUNNING:
        return
    _DAEMON_RUNNING = True
    _DAEMON_THREAD = threading.Thread(
        target=_daemon_loop,
        args=(interval_seconds,),
        daemon=True,
        name="CDPK-KnowledgeSyncDaemon"
    )
    _DAEMON_THREAD.start()
