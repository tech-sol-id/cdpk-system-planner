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
    if os.environ.get(env_name):
        try:
            d = json.loads(os.environ[env_name])
            tok = d.get("token", {})
            rt = tok.get("refresh_token") if isinstance(tok, dict) else d.get("refresh_token")
            if d.get("client_id") and d.get("client_secret") and rt:
                return {
                    "client_id": d["client_id"],
                    "client_secret": d["client_secret"],
                    "refresh_token": rt,
                    "email": d.get("email", "adrian@citradata.id")
                }
        except Exception as e:
            logger.warning(f"Failed parsing {env_name}: {e}")

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
                tok = d.get("token", {})
                rt = tok.get("refresh_token") if isinstance(tok, dict) else d.get("refresh_token")
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
            f"&supportsAllDrives=true&includeItemsFromAllDrives=true"
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
                result["system_bundles"] = list(bundles_map.values())

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
