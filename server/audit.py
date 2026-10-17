#!/usr/bin/env python3
"""
CDPK System Planner — Audit Trail & Activity Logger
Maintains tamper-evident records of user activities across the platform:
exports, project modifications, handovers, and user management.
Accessible to Administrator and Overseer roles.
"""

import json
import logging
import os
import secrets
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional

logger = logging.getLogger("cdpk.audit")

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
AUDIT_FILE = os.path.join(DATA_DIR, "audit_log.json")


def load_audit_logs() -> List[Dict[str, Any]]:
    """Load audit events from data/audit_log.json."""
    os.makedirs(DATA_DIR, exist_ok=True)
    if os.path.exists(AUDIT_FILE):
        try:
            with open(AUDIT_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            logger.warning(f"Failed reading audit_log.json: {e}")
    return []


def save_audit_logs(logs: List[Dict[str, Any]]):
    """Persist audit events to data/audit_log.json (keep latest 300 entries)."""
    os.makedirs(DATA_DIR, exist_ok=True)
    try:
        with open(AUDIT_FILE, "w", encoding="utf-8") as f:
            json.dump(logs[:300], f, indent=2, ensure_ascii=False)
    except Exception as e:
        logger.warning(f"Failed saving audit_log.json: {e}")


def log_audit_event(
    username: str,
    name: str,
    role: str,
    action: str,
    detail: str,
    ip: str = "",
    metadata: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    """
    Append a new immutable audit record.
    action: 'export_pdf' | 'export_xlsx' | 'save_project' | 'load_project' | 'handover' | 'login' | 'user_mgmt'
    """
    logs = load_audit_logs()
    now_str = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")
    entry = {
        "id": f"aud_{secrets.token_hex(6)}",
        "timestamp": now_str,
        "username": (username or "").strip().lower(),
        "name": (name or username or "Unknown").strip(),
        "role": (role or "engineer").strip().lower(),
        "action": action.strip().lower(),
        "detail": detail.strip(),
        "ip": ip,
        "metadata": metadata or {}
    }
    logs.insert(0, entry)  # latest first
    save_audit_logs(logs)
    logger.info(f"AUDIT [{action.upper()}]: {name} (@{username}) - {detail}")
    return entry


def get_audit_logs(limit: int = 100, action_filter: Optional[str] = None) -> List[Dict[str, Any]]:
    """Query recent audit events with optional action filter."""
    logs = load_audit_logs()
    if action_filter and action_filter != "all":
        logs = [l for l in logs if l.get("action") == action_filter.lower()]
    return logs[:limit]
