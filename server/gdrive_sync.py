#!/usr/bin/env python3
"""
Google Drive & Master Pricelist Live Sync Engine for CDPK System Planner.
Reads and writes live pricing, product catalog, composite system bundles,
and RF industry parameters from Google Drive folder & Google Sheet:
- Folder ID: 1OB_UaNyd65Ccb3lmdwJuw5raufCwhgbS (CDPK System Planner)
- Spreadsheet ID: 1Kp85v81JXeRC5ti-ZXYBChgrj2ztnnwrCHokI02LX6U (Master Pricelist)
"""

import io
import json
import logging
import os
import time
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional
import openpyxl

logger = logging.getLogger("cdpk.gdrive")

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEFAULT_KNOWLEDGE_PATH = os.path.join(BASE_DIR, "data", "default_knowledge.json")

DEFAULT_FOLDER_ID = os.environ.get("GDRIVE_FOLDER_ID", "1OB_UaNyd65Ccb3lmdwJuw5raufCwhgbS")
DEFAULT_SPREADSHEET_ID = os.environ.get("GDRIVE_SPREADSHEET_ID", "1Kp85v81JXeRC5ti-ZXYBChgrj2ztnnwrCHokI02LX6U")

_TOKEN_CACHE: Dict[str, Any] = {}
_KNOWLEDGE_CACHE: Dict[str, Any] = {
    "data": None,
    "last_sync": None,
    "source": "local_fallback",
    "folder_files": []
}


_DIAGNOSTIC_INFO: Dict[str, Any] = {
    "last_parse_err": None,
    "last_keys": [],
    "last_token_err": None
}


def get_gdrive_credential(account_key: str = "citradata") -> Optional[Dict[str, str]]:
    """
    Retrieve OAuth2 credentials from environment variable (Render production)
    or local Antigravity plugin_data token files.
    """
    env_map = {
        "citradata": "GDRIVE_CITRADATA_CRED",
        "techsolutions": "GDRIVE_TECHSOLUTIONS_CRED",
        "adrian": "GDRIVE_PERSONAL_CRED"
    }
    env_name = env_map.get(account_key, "GDRIVE_CITRADATA_CRED")
    raw = os.environ.get(env_name)
    if raw:
        raw = raw.strip()
        raw = raw.replace("“", '"').replace("”", '"').replace("‘", "'").replace("’", "'")
        if (raw.startswith("'") and raw.endswith("'")) or (raw.startswith('"') and raw.endswith('"')):
            raw = raw[1:-1].strip()

        attempts = [
            raw,
            raw.replace(r'\"', '"'),
            raw.replace(r'\\"', '"')
        ]
        parsed_dict = None
        for cand in attempts:
            try:
                d = json.loads(cand)
                if isinstance(d, str):
                    d = json.loads(d)
                if isinstance(d, dict):
                    parsed_dict = d
                    break
            except Exception as e:
                _DIAGNOSTIC_INFO["last_parse_err"] = str(e)

        if parsed_dict:
            _DIAGNOSTIC_INFO["last_keys"] = list(parsed_dict.keys())
            rt = parsed_dict.get("refresh_token")
            if not rt and isinstance(parsed_dict.get("token"), dict):
                rt = parsed_dict["token"].get("refresh_token")
            cid = parsed_dict.get("client_id")
            csec = parsed_dict.get("client_secret")
            if cid and csec and rt:
                return {
                    "client_id": cid,
                    "client_secret": csec,
                    "refresh_token": rt,
                    "email": parsed_dict.get("email", "adrian@citradata.id")
                }
            else:
                _DIAGNOSTIC_INFO["last_parse_err"] = f"Missing keys. Found: {list(parsed_dict.keys())}, cid={bool(cid)}, csec={bool(csec)}, rt={bool(rt)}"
        else:
            logger.warning(f"Failed parsing {env_name}: {_DIAGNOSTIC_INFO.get('last_parse_err')}")

    local_files = [
        os.path.expanduser("~/.gemini/antigravity/plugin_data/gdrive/token_adrian@citradata.id.json"),
        os.path.expanduser("~/.gemini/antigravity/plugin_data/gdrive/token.json"),
        os.path.expanduser("~/.gemini/antigravity/plugin_data/gdrive/token_hq@techsolutions.id.json"),
        os.path.expanduser("~/.gemini/antigravity/plugin_data/gdrive/token_adrian.kansil@gmail.com.json")
    ]
    for fp in local_files:
        if os.path.exists(fp):
            try:
                with open(fp, "r", encoding="utf-8") as f:
                    d = json.load(f)
                rt = d.get("refresh_token")
                if not rt and isinstance(d.get("token"), dict):
                    rt = d["token"].get("refresh_token")
                if d.get("client_id") and d.get("client_secret") and rt:
                    return {
                        "client_id": d["client_id"],
                        "client_secret": d["client_secret"],
                        "refresh_token": rt,
                        "email": d.get("email", "adrian@citradata.id")
                    }
            except Exception as e:
                logger.warning(f"Failed reading token {fp}: {e}")
    return None


def get_access_token(account_key: str = "citradata") -> Optional[str]:
    """Return a valid OAuth2 access token with in-memory TTL caching."""
    now = time.time()
    cached = _TOKEN_CACHE.get(account_key)
    if cached and cached.get("access_token") and cached.get("expires_at", 0) > now + 90:
        return cached["access_token"]

    cred = get_gdrive_credential(account_key)
    if not cred:
        return None

    try:
        payload = urllib.parse.urlencode({
            "client_id": cred["client_id"],
            "client_secret": cred["client_secret"],
            "refresh_token": cred["refresh_token"],
            "grant_type": "refresh_token"
        }).encode("utf-8")
        req = urllib.request.Request("https://oauth2.googleapis.com/token", data=payload, method="POST")
        with urllib.request.urlopen(req, timeout=12) as resp:
            res_data = json.loads(resp.read().decode("utf-8"))
        token = res_data["access_token"]
        expires_in = int(res_data.get("expires_in", 3600))
        _TOKEN_CACHE[account_key] = {
            "access_token": token,
            "expires_at": now + expires_in,
            "email": cred.get("email", "adrian@citradata.id")
        }
        return token
    except Exception as e:
        logger.warning(f"OAuth token refresh failed: {e}")
        return None


def get_diagnostics(probe_remote: bool = False) -> Dict[str, Any]:
    raw_citra = os.environ.get("GDRIVE_CITRADATA_CRED", "")
    raw_gemini = os.environ.get("GEMINI_API_KEY", "")
    cred = get_gdrive_credential("citradata")
    token_ok = False
    if cred:
        if probe_remote:
            try:
                t = get_access_token("citradata")
                token_ok = bool(t)
            except Exception as ex:
                _DIAGNOSTIC_INFO["last_token_err"] = str(ex)
        else:
            cached = _TOKEN_CACHE.get("citradata")
            token_ok = bool(cached and cached.get("access_token"))
    return {
        "gdrive_env_present": bool(raw_citra.strip()),
        "gdrive_env_len": len(raw_citra.strip()),
        "raw_preview": (raw_citra[:25] + "..." + raw_citra[-15:]) if len(raw_citra) > 40 else raw_citra,
        "gdrive_cred_parsed": bool(cred),
        "gdrive_token_ok": token_ok,
        "parse_error": _DIAGNOSTIC_INFO.get("last_parse_err"),
        "parsed_keys": _DIAGNOSTIC_INFO.get("last_keys"),
        "token_err": _DIAGNOSTIC_INFO.get("last_token_err"),
        "gemini_key_present": bool(raw_gemini.strip()),
        "gemini_key_len": len(raw_gemini.strip())
    }


def load_local_fallback() -> Dict[str, Any]:
    """Load local default_knowledge.json fallback."""
    if os.path.exists(DEFAULT_KNOWLEDGE_PATH):
        with open(DEFAULT_KNOWLEDGE_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    return {
        "version": "8.0.0-cdpk",
        "app_name": "CDPK System Planner",
        "spreadsheet_id": DEFAULT_SPREADSHEET_ID,
        "folder_id": DEFAULT_FOLDER_ID,
        "commercial_config": {"usd_to_idr": 16200, "ppn_percent": 11},
        "products_catalog": [],
        "system_bundles": [],
        "industry_rf_params": []
    }


def list_folder_files(folder_id: str = DEFAULT_FOLDER_ID) -> List[Dict[str, Any]]:
    """List files inside the Google Drive folder (CDPK System Planner)."""
    token = get_access_token()
    if not token:
        return []
    try:
        q = urllib.parse.quote(f"'{folder_id}' in parents and trashed = false")
        url = (
            f"https://www.googleapis.com/drive/v3/files?q={q}"
            f"&supportsAllDrives=true&includeItemsFromAllDrives=true&corpora=allDrives"
            f"&fields=files(id,name,mimeType,modifiedTime,webViewLink,size)"
        )
        req = urllib.request.Request(url, headers={"Authorization": f"Bearer {token}"})
        with urllib.request.urlopen(req, timeout=12) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        return data.get("files", [])
    except Exception as e:
        logger.warning(f"Failed listing Drive folder {folder_id}: {e}")
        return []


def parse_xlsx_knowledge(xlsx_bytes: bytes, fallback: Dict[str, Any]) -> Dict[str, Any]:
    """Parse 4-sheet Master Pricelist .xlsx bytes into the structured knowledge dict."""
    wb = openpyxl.load_workbook(io.BytesIO(xlsx_bytes), data_only=True)
    result = json.loads(json.dumps(fallback))

    # 1. Products_Catalog
    if "Products_Catalog" in wb.sheetnames:
        ws = wb["Products_Catalog"]
        rows = list(ws.iter_rows(values_only=True))
        if len(rows) > 1:
            products = []
            for r in rows[1:]:
                if not r or not r[0] or not r[3]:
                    continue
                sku = str(r[0]).strip()
                cat = str(r[1] or "Repeater").strip()
                series = str(r[2] or "").strip()
                model = str(r[3]).strip()
                unit = str(r[4] or "Unit").strip()
                try:
                    price_idr = float(r[5] or 0)
                except Exception:
                    price_idr = 0.0
                try:
                    price_usd = float(r[6] or 0)
                except Exception:
                    price_usd = round(price_idr / 16200.0, 2) if price_idr else 0.0
                desc_id = str(r[7] or "").strip()
                desc_en = str(r[8] or desc_id).strip()
                feat_raw = str(r[9] or "")
                features = [x.strip() for x in feat_raw.split(",") if x.strip()]
                best_id = str(r[10] or "").strip()
                best_en = str(r[11] or best_id).strip()
                icon_bg = str(r[12] or "linear-gradient(135deg,#0056b3,#003875)").strip()
                products.append({
                    "sku": sku,
                    "cat": cat,
                    "series": series,
                    "model": model,
                    "unit": unit,
                    "price_idr": price_idr,
                    "price_usd": price_usd,
                    "desc_id": desc_id,
                    "desc_en": desc_en,
                    "features": features,
                    "best_for_id": best_id,
                    "best_for_en": best_en,
                    "iconBg": icon_bg
                })
            if products:
                seen_skus = {p["sku"] for p in products}
                for fb_item in fallback.get("products_catalog", []):
                    if fb_item.get("sku") and fb_item["sku"] not in seen_skus:
                        products.append(fb_item)
                        seen_skus.add(fb_item["sku"])
                result["products_catalog"] = products

    # 2. System_Bundles
    if "System_Bundles" in wb.sheetnames:
        ws = wb["System_Bundles"]
        rows = list(ws.iter_rows(values_only=True))
        if len(rows) > 1:
            bundles_map: Dict[str, Dict[str, Any]] = {}
            for r in rows[1:]:
                if not r or not r[0] or not r[4]:
                    continue
                bid = str(r[0]).strip()
                if bid not in bundles_map:
                    bundles_map[bid] = {
                        "bundle_id": bid,
                        "name_id": str(r[1] or bid).strip(),
                        "name_en": str(r[2] or r[1] or bid).strip(),
                        "category": str(r[3] or "Repeater System").strip(),
                        "desc_id": str(r[10] or "").strip() if len(r) > 10 else "",
                        "desc_en": str(r[11] or "").strip() if len(r) > 11 else "",
                        "components": []
                    }
                try:
                    def_qty = float(r[8] or 1)
                    if def_qty.is_integer():
                        def_qty = int(def_qty)
                except Exception:
                    def_qty = 1
                mand_str = str(r[9] if len(r) > 9 else "TRUE").strip().upper()
                bundles_map[bid]["components"].append({
                    "sku": str(r[4]).strip(),
                    "role_id": str(r[5] or "").strip(),
                    "role_en": str(r[6] or r[5] or "").strip(),
                    "qty_formula": str(r[7] or "1").strip(),
                    "default_qty": def_qty,
                    "mandatory": mand_str in ("TRUE", "1", "YES", "YA")
                })
            if bundles_map:
                merged_bundles = list(bundles_map.values())
                for fb_b in fallback.get("system_bundles", []):
                    fb_bid = fb_b.get("bundle_id") or fb_b.get("id")
                    if fb_bid and fb_bid not in bundles_map:
                        merged_bundles.append(fb_b)
                result["system_bundles"] = merged_bundles

    # 3. Industry_RF_Params
    if "Industry_RF_Params" in wb.sheetnames:
        ws = wb["Industry_RF_Params"]
        rows = list(ws.iter_rows(values_only=True))
        if len(rows) > 1:
            ind_list = []
            for r in rows[1:]:
                if not r or not r[0]:
                    continue
                ind_list.append({
                    "key": str(r[0]).strip(),
                    "label_id": str(r[1] or r[0]).strip(),
                    "label_en": str(r[2] or r[1] or r[0]).strip(),
                    "vhf_radius_km": float(r[3] or 15.0),
                    "uhf_radius_km": float(r[4] or 10.0),
                    "800_radius_km": float(r[5] or 8.0),
                    "call_rate": float(r[6] or 0.30),
                    "terrain_factor": float(r[7] or 1.25),
                    "recommended_band": str(r[8] or "uhf").strip().lower(),
                    "mandatory_atex": str(r[9] or "").strip().upper() == "TRUE",
                    "mandatory_encryption": str(r[10] or "").strip().upper() == "TRUE",
                    "mandatory_man_down": str(r[11] or "").strip().upper() == "TRUE",
                    "ht_primary_sku": str(r[12] or "MOT-HT-R7").strip(),
                    "ht_secondary_sku": str(r[13] or "MOT-HT-R2").strip(),
                    "mobile_sku": str(r[14] or "MOT-MB-M8600I").strip()
                })
            if ind_list:
                result["industry_rf_params"] = ind_list

    # 4. Commercial_Config
    if "Commercial_Config" in wb.sheetnames:
        ws = wb["Commercial_Config"]
        rows = list(ws.iter_rows(values_only=True))
        if len(rows) > 1:
            cfg = dict(result.get("commercial_config", {}))
            for r in rows[1:]:
                if not r or not r[0]:
                    continue
                k = str(r[0]).strip()
                v = r[1]
                if isinstance(v, str):
                    try:
                        if "." in v:
                            v = float(v)
                        else:
                            v = int(v)
                    except Exception:
                        pass
                cfg[k] = v
            result["commercial_config"] = cfg

    # 5. RFoF_DAS_FMTCS (Dedicated Tab for RFoF DAS by FMTCS Module)
    if "RFoF_DAS_FMTCS" in wb.sheetnames:
        ws = wb["RFoF_DAS_FMTCS"]
        rows = list(ws.iter_rows(values_only=True))
        if len(rows) > 1:
            das_items = []
            for r in rows[1:]:
                if not r or not r[0] or not r[3]:
                    continue
                sku = str(r[0]).strip()
                sub_cat = str(r[1] or "Active Optical").strip()
                series = str(r[2] or "FMTCS").strip()
                model = str(r[3]).strip()
                unit = str(r[4] or "Unit").strip()
                try:
                    price_idr = float(r[5] or 0)
                except Exception:
                    price_idr = 0.0
                try:
                    price_usd = float(r[6] or 0)
                except Exception:
                    price_usd = round(price_idr / 16200.0, 2) if price_idr else 0.0
                try:
                    cogs_usd = float(r[7] or round(price_usd * 0.70, 2))
                except Exception:
                    cogs_usd = round(price_usd * 0.70, 2)
                boq_key = str(r[8] or "").strip() if len(r) > 8 else ""
                desc_id = str(r[9] or "").strip() if len(r) > 9 else ""
                desc_en = str(r[10] or desc_id).strip() if len(r) > 10 else desc_id
                feat_raw = str(r[11] or "") if len(r) > 11 else ""
                features = [x.strip() for x in feat_raw.split(",") if x.strip()]
                best_id = str(r[12] or "").strip() if len(r) > 12 else ""
                best_en = str(r[13] or best_id).strip() if len(r) > 13 else best_id

                das_entry = {
                    "sku": sku,
                    "cat": "RFoF DAS by FMTCS",
                    "sub_cat": sub_cat,
                    "series": series,
                    "model": model,
                    "unit": unit,
                    "price_idr": price_idr,
                    "price_usd": price_usd,
                    "cogs_usd": cogs_usd,
                    "boq_key": boq_key,
                    "desc_id": desc_id,
                    "desc_en": desc_en,
                    "features": features,
                    "best_for_id": best_id,
                    "best_for_en": best_en,
                    "iconBg": "linear-gradient(135deg,#0369a1,#0c4a6e)"
                }
                das_items.append(das_entry)

            if das_items:
                result["rfof_das_catalog"] = das_items
                # Also sync/update matching SKUs in products_catalog
                prod_list = list(result.get("products_catalog", []))
                sku_to_idx = {p.get("sku"): idx for idx, p in enumerate(prod_list) if p.get("sku")}
                for d_it in das_items:
                    if d_it["sku"] in sku_to_idx:
                        prod_list[sku_to_idx[d_it["sku"]]] = d_it
                    else:
                        prod_list.append(d_it)
                result["products_catalog"] = prod_list

    return result


def sync_from_gdrive(force: bool = False, spreadsheet_id: str = DEFAULT_SPREADSHEET_ID, folder_id: str = DEFAULT_FOLDER_ID) -> Dict[str, Any]:
    """
    Sync live Master Pricelist from Google Drive Spreadsheet (1Kp85v81JXeRC5ti-ZXYBChgrj2ztnnwrCHokI02LX6U).
    Uses a 120-second cache unless force=True.
    """
    now_ts = time.time()
    if (
        not force
        and _KNOWLEDGE_CACHE.get("data") is not None
        and _KNOWLEDGE_CACHE.get("sync_epoch", 0) > now_ts - 120
    ):
        return {
            "status": "ok",
            "cached": True,
            "source": _KNOWLEDGE_CACHE["source"],
            "last_sync": _KNOWLEDGE_CACHE["last_sync"],
            "folder_files": _KNOWLEDGE_CACHE["folder_files"],
            "knowledge": _KNOWLEDGE_CACHE["data"]
        }

    fallback = load_local_fallback()
    token = get_access_token()
    if not token:
        _KNOWLEDGE_CACHE["data"] = fallback
        _KNOWLEDGE_CACHE["source"] = "local_fallback (no_token)"
        _KNOWLEDGE_CACHE["last_sync"] = datetime.now(timezone.utc).isoformat()
        _KNOWLEDGE_CACHE["sync_epoch"] = now_ts
        return {
            "status": "fallback",
            "cached": False,
            "source": _KNOWLEDGE_CACHE["source"],
            "last_sync": _KNOWLEDGE_CACHE["last_sync"],
            "folder_files": [],
            "knowledge": fallback
        }

    try:
        # Export Google Sheet as .xlsx bytes
        export_mime = urllib.parse.quote("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
        export_url = f"https://www.googleapis.com/drive/v3/files/{spreadsheet_id}/export?mimeType={export_mime}"
        req = urllib.request.Request(export_url, headers={"Authorization": f"Bearer {token}"})
        with urllib.request.urlopen(req, timeout=20) as resp:
            xlsx_bytes = resp.read()

        parsed = parse_xlsx_knowledge(xlsx_bytes, fallback)
        files = list_folder_files(folder_id)

        _KNOWLEDGE_CACHE["data"] = parsed
        _KNOWLEDGE_CACHE["source"] = "google_drive_live"
        _KNOWLEDGE_CACHE["last_sync"] = datetime.now(timezone.utc).isoformat()
        _KNOWLEDGE_CACHE["sync_epoch"] = now_ts
        _KNOWLEDGE_CACHE["folder_files"] = files

        # Persist updated cache to local fallback so offline mode stays fresh
        try:
            with open(DEFAULT_KNOWLEDGE_PATH, "w", encoding="utf-8") as f:
                json.dump(parsed, f, indent=2, ensure_ascii=False)
        except Exception:
            pass

        return {
            "status": "ok",
            "cached": False,
            "source": "google_drive_live",
            "last_sync": _KNOWLEDGE_CACHE["last_sync"],
            "folder_files": files,
            "knowledge": parsed
        }
    except Exception as e:
        logger.warning(f"Live sync from Google Sheet failed ({e}), using local fallback.")
        _KNOWLEDGE_CACHE["data"] = fallback
        _KNOWLEDGE_CACHE["source"] = f"local_fallback ({type(e).__name__})"
        _KNOWLEDGE_CACHE["last_sync"] = datetime.now(timezone.utc).isoformat()
        _KNOWLEDGE_CACHE["sync_epoch"] = now_ts
        return {
            "status": "fallback",
            "cached": False,
            "source": _KNOWLEDGE_CACHE["source"],
            "last_sync": _KNOWLEDGE_CACHE["last_sync"],
            "folder_files": _KNOWLEDGE_CACHE.get("folder_files", []),
            "knowledge": fallback
        }


# ─── TEAM PROJECT CLOUD STORAGE & EXPORT ENGINE ──────────────────────────────
OUTPUT_SUBFOLDER_ID = os.environ.get("GDRIVE_OUTPUT_SUBFOLDER_ID", "11NLBY5EAPLb4q753r1TRVKgYRe0JpO8W")


def upload_bytes_to_gdrive(
    content_bytes: bytes,
    filename: str,
    mime_type: str,
    folder_id: str = OUTPUT_SUBFOLDER_ID,
    description: str = "",
    app_properties: Optional[Dict[str, str]] = None
) -> Optional[Dict[str, Any]]:
    """Upload raw bytes to a Google Drive folder using multipart upload."""
    token = get_access_token()
    if not token:
        logger.warning("Upload failed: No Google Drive access token available")
        return None

    boundary = f"=====CDPK_BOUNDARY_{secrets_hex()}====="
    metadata: Dict[str, Any] = {
        "name": filename,
        "parents": [folder_id],
        "description": description or f"Generated by CDPK System Planner on {datetime.now(timezone.utc).isoformat()}"
    }
    if app_properties:
        metadata["appProperties"] = app_properties

    body = io.BytesIO()
    body.write(f"--{boundary}\r\n".encode("utf-8"))
    body.write(b"Content-Type: application/json; charset=UTF-8\r\n\r\n")
    body.write(json.dumps(metadata).encode("utf-8"))
    body.write(b"\r\n")
    body.write(f"--{boundary}\r\n".encode("utf-8"))
    body.write(f"Content-Type: {mime_type}\r\n\r\n".encode("utf-8"))
    body.write(content_bytes)
    body.write(b"\r\n")
    body.write(f"--{boundary}--\r\n".encode("utf-8"))

    upload_data = body.getvalue()
    upload_url = (
        "https://www.googleapis.com/upload/drive/v3/files"
        "?uploadType=multipart&supportsAllDrives=true&fields=id,name,mimeType,webViewLink,webContentLink,modifiedTime,appProperties"
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
            return json.loads(resp.read().decode("utf-8"))
    except Exception as e:
        logger.warning(f"Failed uploading {filename} to Drive: {e}")
        return None


def secrets_hex() -> str:
    import secrets
    return secrets.token_hex(8)


def generate_project_excel_bytes(project_data: Dict[str, Any]) -> bytes:
    """Generate professional multi-sheet Excel file for the project."""
    wb = openpyxl.Workbook()
    header_fill = openpyxl.styles.PatternFill(start_color="003875", end_color="003875", fill_type="solid")
    header_font = openpyxl.styles.Font(name="Calibri", size=11, bold=True, color="FFFFFF")

    # Sheet 1: Project & Sizing Summary
    ws_sum = wb.active
    ws_sum.title = "1_Ringkasan_Proyek"
    s = project_data.get("sizingResult", {})
    user_info = project_data.get("creator", {})

    summary_rows = [
        ["CDPK SYSTEM PLANNER — DOKUMEN PROYEK RESMI"],
        ["Nama Proyek", project_data.get("projName", "-")],
        ["Nama Klien / Perusahaan", project_data.get("clientName", "-")],
        ["Lokasi Proyek", project_data.get("projLocation", "-")],
        ["Dibuat Oleh (PIC)", f"{user_info.get('name', 'CDPK Presales')} ({user_info.get('email', '-')})"],
        ["Tanggal Dibuat", datetime.now().strftime("%d-%m-%Y %H:%M WIB")],
        [],
        ["HASIL KALKULASI SIZING RF", "SPESIFIKASI / NILAI"],
        ["Rekomendasi Topologi", s.get("topologyName", "-")],
        ["Platform Repeater Utama", s.get("primaryRepeaterModel", "-")],
        ["Kebutuhan Site Outdoor", s.get("outdoorSites", 1)],
        ["Total Repeater Outdoor (50W)", s.get("totalOutdoorRepeaters", 1)],
        ["Repeater In-Building DAS (SLR 1000)", s.get("dasNodes", 0)],
        ["Kapasitas Kanal TDMA", s.get("totalTimeSlots", 2)],
        ["Alokasi Handy Talky (85%)", f"{s.get('htQty', 0)} Unit ({s.get('recommendedHtModel', '-')})"],
        ["Alokasi Radio Mobile/Base (15%)", f"{s.get('mobileQty', 0)} Unit ({s.get('recommendedMobileModel', '-')})"],
        ["Rekomendasi UPS / Daya", f"{s.get('upsRecommendedVA', 1500)} VA / {s.get('batteryAh', 100)} Ah"]
    ]
    for r in summary_rows:
        ws_sum.append(r)
    ws_sum.column_dimensions["A"].width = 35
    ws_sum.column_dimensions["B"].width = 45

    # Sheet 2: BoQ & Commercial Quotation
    ws_boq = wb.create_sheet("2_Penawaran_Komersial_BoQ")
    boq_headers = ["No", "Kategori", "Deskripsi Sistem / Perangkat", "SKU", "Qty", "Satuan", "Harga Satuan (IDR)", "Total Harga (IDR)", "Catatan"]
    ws_boq.append(boq_headers)
    for col_i in range(1, len(boq_headers) + 1):
        cell = ws_boq.cell(row=1, column=col_i)
        cell.fill = header_fill
        cell.font = header_font

    boq_items = project_data.get("boqItems", [])
    row_idx = 1
    for it in boq_items:
        u_price = it.get("unitPrice", 0)
        l_total = it.get("lineTotal", 0)
        ws_boq.append([row_idx, it.get("category", ""), it.get("name", ""), it.get("sku", ""), it.get("qty", 1), it.get("unit", "Unit"), u_price, l_total, it.get("notes", "")])
        row_idx += 1
        # Include child BOM sub-items
        if it.get("isBundle") and isinstance(it.get("children"), list):
            for sub in it["children"]:
                if sub.get("enabled", True):
                    sub_qty = sub.get("qtyPerBundle", 1) * it.get("qty", 1)
                    sub_price = sub.get("price_idr", 0)
                    ws_boq.append(["", "  ↳ Sub-BOM", f"  • {sub.get('role_id', '')}: {sub.get('model', '')}", sub.get("sku", ""), sub_qty, sub.get("unit", "Unit"), sub_price, sub_price * sub_qty, "Komponen Pembentuk Paket"])

    # Commercial totals
    ws_boq.append([])
    comm = project_data.get("commercialTotals", {})
    ws_boq.append(["", "", "Subtotal Perangkat & Sistem", "", "", "", "", comm.get("hardwareSubtotal", 0)])
    if comm.get("serviceFeeTotal"):
        ws_boq.append(["", "", "Jasa Engineering & Commissioning (Mandays)", "", "", "", "", comm.get("serviceFeeTotal", 0)])
    if comm.get("discountAmount"):
        ws_boq.append(["", "", f"Diskon Komersial ({comm.get('discountPercent', 0)}%)", "", "", "", "", -comm.get("discountAmount", 0)])
    ws_boq.append(["", "", f"PPN ({comm.get('ppnPercent', 11)}%)", "", "", "", "", comm.get("ppnAmount", 0)])
    ws_boq.append(["", "", "GRAND TOTAL INVESTASI (IDR)", "", "", "", "", comm.get("grandTotal", 0)])

    ws_boq.column_dimensions["A"].width = 6
    ws_boq.column_dimensions["B"].width = 20
    ws_boq.column_dimensions["C"].width = 45
    ws_boq.column_dimensions["D"].width = 22
    ws_boq.column_dimensions["E"].width = 10
    ws_boq.column_dimensions["F"].width = 12
    ws_boq.column_dimensions["G"].width = 20
    ws_boq.column_dimensions["H"].width = 22
    ws_boq.column_dimensions["I"].width = 30

    out = io.BytesIO()
    wb.save(out)
    return out.getvalue()


def save_project_to_gdrive(project_payload: Dict[str, Any], user_info: Dict[str, Any]) -> Dict[str, Any]:
    """
    Saves a calculation project to the team Google Drive subfolder (11NLBY5EAPLb4q753r1TRVKgYRe0JpO8W).
    Uploads:
    1. Excel Workbook (.xlsx)
    2. Raw Project State JSON (.cdpk.json)
    """
    now_str = datetime.now().strftime("%Y%m%d_%H%M")
    client_slug = (project_payload.get("clientName") or "Client").replace(" ", "_").replace("/", "-")[:25]
    proj_slug = (project_payload.get("projName") or "Proyek").replace(" ", "_").replace("/", "-")[:35]
    user_slug = (user_info.get("username") or "user")

    base_filename = f"{now_str}_{client_slug}_{proj_slug}_{user_slug}"
    project_payload["creator"] = user_info
    project_payload["saved_at"] = datetime.now(timezone.utc).isoformat()

    # 1. Prepare Google Drive metadata properties
    comm = project_payload.get("commercialTotals", {})
    margin_val = project_payload.get("marginPercent") if project_payload.get("marginPercent") is not None else comm.get("marginPercent", 20)
    grand_tot_val = comm.get("grandTotal") if comm.get("grandTotal") is not None else project_payload.get("grandTotal", 0)
    curr_val = project_payload.get("currency", "IDR")

    app_props = {
        "creator_username": str(user_info.get("username", "user")),
        "creator_name": str(user_info.get("name", "")),
        "creator_email": str(user_info.get("email", "")),
        "client_name": str(project_payload.get("clientName", ""))[:50],
        "project_name": str(project_payload.get("projName", ""))[:50],
        "margin_percent": str(margin_val),
        "grand_total": str(grand_tot_val),
        "currency": str(curr_val)
    }

    # 2. Generate & Upload Excel (.xlsx)
    xlsx_bytes = generate_project_excel_bytes(project_payload)
    xlsx_name = f"{base_filename} - Quotation.xlsx"
    xlsx_upload = upload_bytes_to_gdrive(
        xlsx_bytes,
        xlsx_name,
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        folder_id=OUTPUT_SUBFOLDER_ID,
        description=f"Generated Quotation by {user_info.get('name')}",
        app_properties=app_props
    )

    # 3. Upload Raw Project Data JSON (.cdpk.json)
    json_bytes = json.dumps(project_payload, indent=2, ensure_ascii=False).encode("utf-8")
    json_name = f"{base_filename} - Data.cdpk.json"
    json_upload = upload_bytes_to_gdrive(
        json_bytes,
        json_name,
        "application/json",
        folder_id=OUTPUT_SUBFOLDER_ID,
        description=f"Full CDPK Project Data for reloading by {user_info.get('name')}",
        app_properties=app_props
    )

    return {
        "status": "ok" if (xlsx_upload or json_upload) else "error",
        "folder_id": OUTPUT_SUBFOLDER_ID,
        "folder_url": f"https://drive.google.com/drive/folders/{OUTPUT_SUBFOLDER_ID}",
        "excel_file": xlsx_upload,
        "json_file": json_upload,
        "saved_at": project_payload["saved_at"]
    }


def parse_project_filename(fn: str, known_users: Optional[List[str]] = None) -> Dict[str, Any]:
    """Extract metadata (timestamp, client, project summary, creator) from project filename."""
    file_type = "json" if fn.endswith(".cdpk.json") else ("excel" if fn.endswith(".xlsx") else "other")
    prefix = fn.split(" - ")[0] if " - " in fn else fn

    matched_creator = ""
    if known_users:
        for u in sorted(known_users, key=len, reverse=True):
            if prefix.endswith("_" + u):
                matched_creator = u
                break

    tokens = prefix.split("_")
    if not matched_creator:
        matched_creator = tokens[-1] if len(tokens) > 1 else "unknown"

    timestamp_str = ""
    summary = prefix
    if len(tokens) >= 3 and len(tokens[0]) == 8 and len(tokens[1]) == 4 and tokens[0].isdigit() and tokens[1].isdigit():
        timestamp_str = f"{tokens[0]}_{tokens[1]}"
        core_tokens = tokens[2:]
        if core_tokens and core_tokens[-1] == matched_creator:
            core_tokens = core_tokens[:-1]
        summary = " ".join(core_tokens).replace("_", " ")

    return {
        "filename": fn,
        "creator": matched_creator,
        "type": file_type,
        "timestamp": timestamp_str,
        "summary": summary
    }


def list_saved_projects_from_gdrive(folder_id: str = OUTPUT_SUBFOLDER_ID) -> List[Dict[str, Any]]:
    """List saved project files in the Google Drive subfolder."""
    token = get_access_token()
    if not token:
        return []
    try:
        q = urllib.parse.quote(f"'{folder_id}' in parents and trashed = false")
        url = (
            f"https://www.googleapis.com/drive/v3/files?q={q}"
            f"&supportsAllDrives=true&includeItemsFromAllDrives=true&corpora=allDrives"
            f"&orderBy=modifiedTime%20desc"
            f"&fields=files(id,name,mimeType,modifiedTime,webViewLink,size,appProperties,description)"
        )
        req = urllib.request.Request(url, headers={"Authorization": f"Bearer {token}"})
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        return data.get("files", [])
    except Exception as e:
        logger.warning(f"Failed listing saved projects: {e}")
        return []


def load_project_data_from_gdrive(file_id: str) -> Optional[Dict[str, Any]]:
    """Download and parse a saved .cdpk.json project file from Google Drive."""
    token = get_access_token()
    if not token:
        return None
    try:
        url = f"https://www.googleapis.com/drive/v3/files/{file_id}?alt=media&supportsAllDrives=true"
        req = urllib.request.Request(url, headers={"Authorization": f"Bearer {token}"})
        with urllib.request.urlopen(req, timeout=20) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except Exception as e:
        logger.warning(f"Failed loading project file {file_id}: {e}")
        return None


def patch_drive_file_properties(file_id: str, app_properties: Dict[str, str], description: Optional[str] = None) -> bool:
    """Updates appProperties and optionally description of an existing file in Google Drive."""
    token = get_access_token()
    if not token:
        return False
    try:
        url = f"https://www.googleapis.com/drive/v3/files/{file_id}?supportsAllDrives=true"
        payload: Dict[str, Any] = {"appProperties": app_properties}
        if description:
            payload["description"] = description
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json"
            },
            method="PATCH"
        )
        with urllib.request.urlopen(req, timeout=15) as resp:
            return resp.status in (200, 204)
    except Exception as e:
        logger.warning(f"Failed patching file properties for {file_id}: {e}")
        return False


def update_drive_file_content(file_id: str, content_bytes: bytes, mime_type: str = "application/json") -> bool:
    """Updates the file media in Google Drive."""
    token = get_access_token()
    if not token:
        return False
    try:
        url = f"https://www.googleapis.com/upload/drive/v3/files/{file_id}?uploadType=media&supportsAllDrives=true"
        req = urllib.request.Request(
            url,
            data=content_bytes,
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": mime_type
            },
            method="PATCH"
        )
        with urllib.request.urlopen(req, timeout=20) as resp:
            return resp.status in (200, 204)
    except Exception as e:
        logger.warning(f"Failed updating file content for {file_id}: {e}")
        return False

