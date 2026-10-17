#!/usr/bin/env python3
"""
CDPK System Planner — In-App Notifications Manager
Stores and queries user-scoped and role-scoped notifications.
"""

import json
import logging
import os
import secrets
import time
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional

logger = logging.getLogger("cdpk.notifications")

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
NOTIFS_FILE = os.path.join(DATA_DIR, "notifications.json")


def load_notifications() -> List[Dict[str, Any]]:
    """Load notifications from data/notifications.json."""
    os.makedirs(DATA_DIR, exist_ok=True)
    if os.path.exists(NOTIFS_FILE):
        try:
            with open(NOTIFS_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            logger.warning(f"Failed reading notifications.json: {e}")
    return []


def save_notifications(notifs: List[Dict[str, Any]]):
    """Persist notifications to data/notifications.json."""
    os.makedirs(DATA_DIR, exist_ok=True)
    try:
        with open(NOTIFS_FILE, "w", encoding="utf-8") as f:
            json.dump(notifs[:100], f, indent=2, ensure_ascii=False)  # keep latest 100
    except Exception as e:
        logger.warning(f"Failed saving notifications.json: {e}")


def add_notification(
    target: str,
    title: str,
    message: str,
    notif_type: str = "system",
    action: str = "",
    action_data: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    """
    Create a new notification.
    target: 'admin' (for all admins) or specific username like 'budi'.
    """
    notifs = load_notifications()
    now_str = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")
    notif = {
        "id": f"notif_{secrets.token_hex(6)}",
        "target": target.strip().lower(),
        "type": notif_type,
        "title": title,
        "message": message,
        "action": action,
        "data": action_data or {},
        "read": False,
        "created_at": now_str
    }
    notifs.insert(0, notif)  # newest first
    save_notifications(notifs)
    return notif


def get_user_notifications(username: str, role: str) -> List[Dict[str, Any]]:
    """
    Return notifications for a specific user.
    Admin sees both 'admin' target and their own username.
    Regular user sees only their own username.
    """
    notifs = load_notifications()
    u_clean = username.strip().lower()
    is_admin = role.strip().lower() == "admin"

    res = []
    for n in notifs:
        target = n.get("target", "").lower()
        if target == u_clean or (is_admin and target == "admin"):
            item = dict(n)
            read_by = item.get("read_by", [])
            item["is_read"] = item.get("read", False) or (u_clean in read_by)
            res.append(item)
    return res


def mark_notifications_read(username: str, role: str, notif_id: Optional[str] = None):
    """Mark a specific notification or all notifications for this user as read."""
    notifs = load_notifications()
    u_clean = username.strip().lower()
    is_admin = role.strip().lower() == "admin"

    for n in notifs:
        target = n.get("target", "").lower()
        if target == u_clean or (is_admin and target == "admin"):
            if not notif_id or n.get("id") == notif_id:
                if "read_by" not in n:
                    n["read_by"] = []
                if u_clean not in n["read_by"]:
                    n["read_by"].append(u_clean)
                n["read"] = True
    save_notifications(notifs)
