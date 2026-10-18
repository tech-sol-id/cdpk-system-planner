"""
CDPK System Planner — Commercial RBAC & Pricing Data Slicing (v8.7.0)

Pricing, COGS, margins, discounts, finance FX rates and BoQ grand totals are
restricted to commercial roles (admin, overseer, sales). Every other role —
and unauthenticated callers — receives the same payload shape with those
values neutralised, so the UI keeps working (quantities, SKUs, specs and RF
sizing stay intact) while no commercial figure ever leaves the server.

Deny-by-default: an unknown or missing role is treated as non-commercial.
"""

import copy
import re
from typing import Any, Dict, Optional

COMMERCIAL_ROLES = frozenset({"admin", "overseer", "sales"})

REDACTED_LABEL = "[Hanya Sales / Admin]"

# Scalar commercial fields (exact key match). RF terms such as fadeMarginDb,
# marginDb or optSafetyMargin are deliberately NOT listed: they are link-budget
# engineering values, not money.
_NUMERIC_COMMERCIAL_KEYS = frozenset({
    # Master Pricelist / knowledge catalog
    "price_idr", "price_usd", "cogs_usd", "cogs_idr",
    "usd_to_idr", "mandays_rate_idr", "mandays_rate_usd",
    "default_margin_percent", "default_discount_percent",
    # Frontend BoQ / CCTV / DAS / configurator state
    "unitPriceIdr", "unitPriceUsd", "cogsUsd", "cogsIdr",
    "lineCogsUsd", "lineCogsIdr", "lineSellUsd", "lineSellIdr",
    "priceIdr", "priceUsd",
    "marginPct", "marginPercent", "margin_percent",
    "discountPercent", "discount_percent",
    "grandTotal", "grand_total", "subtotalIdr", "subtotalUsd",
    "totalSellUsd", "totalSellIdr", "totalCogsUsd", "totalMarginUsd",
    "estimated_grand_total_idr", "estimated_grand_total_usd",
    "exchangeRate", "mandaysRateIdr",
})

# Container fields keyed by SKU (e.g. das.cloudPrices = {"FMTCS-OMU-DIG": 4500}).
_CONTAINER_COMMERCIAL_KEYS = frozenset({"cloudPrices", "cloudCogs", "customPrices"})


def has_commercial_access(user: Optional[Dict[str, Any]]) -> bool:
    """True only for an authenticated, active user holding a commercial role."""
    if not user or not isinstance(user, dict):
        return False
    if user.get("status") not in (None, "active"):
        return False
    role = str(user.get("role") or "").strip().lower()
    return role in COMMERCIAL_ROLES


def _redact_in_place(node: Any) -> None:
    if isinstance(node, dict):
        for key in list(node.keys()):
            val = node[key]
            if key in _NUMERIC_COMMERCIAL_KEYS and not isinstance(val, (dict, list)):
                # 0 (not None) keeps client-side arithmetic NaN-free.
                node[key] = 0
            elif key in _CONTAINER_COMMERCIAL_KEYS:
                node[key] = {} if isinstance(val, dict) else []
            else:
                _redact_in_place(val)
    elif isinstance(node, list):
        for item in node:
            _redact_in_place(item)


def redact_commercial(payload: Any) -> Any:
    """Return a deep copy of *payload* with all commercial values neutralised.

    Never mutates the input (callers often pass shared caches)."""
    clone = copy.deepcopy(payload)
    _redact_in_place(clone)
    return clone


# Defense-in-depth for free-text LLM output: mask anything that looks like a
# money amount (Rp / IDR / US$ / USD / $), including "Rp 1,2 miliar" forms.
_AMOUNT = r"\d[\d.,]*(?:\s?(?:rb|ribu|jt|juta|m|miliar|milyar|triliun|k|mn|million|billion|bn))?\b"
_CURRENCY_PATTERNS = [
    re.compile(r"(?i)\bRp\.?\s?" + _AMOUNT),
    re.compile(r"(?i)\bIDR\s?" + _AMOUNT),
    re.compile(r"(?i)\bUSD\s?" + _AMOUNT),
    re.compile(r"(?i)US\$\s?" + _AMOUNT),
    re.compile(r"\$\s?" + _AMOUNT),
    re.compile(r"(?i)" + _AMOUNT.replace(r"\b", "") + r"\s?(?:IDR|USD|rupiah|dollars?)\b"),
]


def mask_currency_amounts(text: str) -> str:
    if not text:
        return text
    for pat in _CURRENCY_PATTERNS:
        text = pat.sub(REDACTED_LABEL, text)
    return text
