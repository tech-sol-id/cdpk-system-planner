"""
CDPK System Planner — AI Copilot Tool Schemas, Validation & Deterministic Clamping
==================================================================================

Single source of truth for the Phase 1 "Actionable Presales Agent":

  * GEMINI_TOOL_DECLARATIONS
        Gemini Function Calling declarations (what the model is allowed to propose).
  * validate_and_sanitize_action(tool_name, args, current_state)
        Deterministic server-side enum validation + numeric clamping + diff,
        returning a standardized "proposed action" object for the
        Human-in-the-Loop Action Cards.
  * build_fallback_actions(extracted, current_state)
        Wraps the local deterministic parameter extractor output into the same
        proposed-action shape, used when Gemini is offline / no API key.

SECURITY (AGENTS.md / Zero-Trust):
  The AI is ONLY permitted to PROPOSE engineering INPUT parameters. This module
  never mutates application state and never performs pricing / link-budget math.
  Every numeric value is hard-clamped to safe engineering bounds here BEFORE it
  is ever shown to the user, so an out-of-range or hallucinated value from the
  model can never reach the deterministic calculators unchecked.
"""

from __future__ import annotations

import uuid
from typing import Any, Dict, List, Optional, Tuple

# ─────────────────────────────────────────────────────────────────────────────
# Territorial bounds for the Republic of Indonesia (GIS site placement guard).
# ─────────────────────────────────────────────────────────────────────────────
INDONESIA_LAT_MIN, INDONESIA_LAT_MAX = -11.5, 6.5
INDONESIA_LON_MIN, INDONESIA_LON_MAX = 94.5, 141.5

# ─────────────────────────────────────────────────────────────────────────────
# Enumerations — kept identical to the Alpine.js frontend state options.
# ─────────────────────────────────────────────────────────────────────────────
INDUSTRY_ENUM = ["mining", "oil_gas", "palm_oil", "airport", "hospital",
                 "hotel", "mall", "public_safety", "logistics", "manufacturing"]
AREA_UNIT_ENUM = ["ha", "km2"]
TERRAIN_ENUM = ["flat", "hilly", "mountainous", "dense", "indoor", "mixed_inout"]
FREQ_BAND_ENUM = ["vhf", "uhf", "350", "800"]
POWER_SOURCE_ENUM = ["pln_ups", "solar", "genset_ups"]
BACKHAUL_ENUM = ["fiber", "radio_ip", "starlink"]
DAS_ARCH_ENUM = ["digital", "analog"]
DAS_TOPO_ENUM = ["cascade", "ring", "star"]
VMS_BRAND_ENUM = ["pelco_videoxpert", "avigilon_unity", "generic_onvif"]
GIS_MODE_ENUM = ["append", "replace"]
# Whitelist — any tool name outside this set is rejected (never shown/applied).
SUPPORTED_TOOLS = frozenset({"set_dmr_sizing_params", "configure_fiber_das",
                             "configure_cctv_fleet", "place_gis_sites"})
ANTENNA_TYPE_ENUM = ["omni", "directional"]

# ─────────────────────────────────────────────────────────────────────────────
# 1. GEMINI FUNCTION CALLING DECLARATIONS
# ─────────────────────────────────────────────────────────────────────────────
GEMINI_TOOL_DECLARATIONS: List[Dict[str, Any]] = [
    {
        "name": "set_dmr_sizing_params",
        "description": (
            "Usulkan parameter input untuk DMR Sizing & BoQ (radio digital MOTOTRBO). "
            "Hanya panggil jika pengguna memberi detail kebutuhan trunking/konvensional, "
            "jumlah pengguna, luas area, medan, atau pita frekuensi. Jangan menghitung harga "
            "atau link budget sendiri — itu dihitung oleh mesin deterministik aplikasi."
        ),
        "parameters": {
            "type": "OBJECT",
            "properties": {
                "industry": {"type": "STRING", "enum": INDUSTRY_ENUM,
                             "description": "Sektor industri/vertikal proyek."},
                "areaInput": {"type": "NUMBER",
                              "description": "Luas area cakupan (angka). Satuan ditentukan areaUnit."},
                "areaUnit": {"type": "STRING", "enum": AREA_UNIT_ENUM,
                             "description": "Satuan luas: 'ha' (hektar) atau 'km2'."},
                "userCount": {"type": "INTEGER",
                              "description": "Jumlah total pengguna radio/handheld (1-5000)."},
                "terrain": {"type": "STRING", "enum": TERRAIN_ENUM,
                            "description": "Profil medan dominan di lokasi."},
                "freqBand": {"type": "STRING", "enum": FREQ_BAND_ENUM,
                             "description": "Pita frekuensi: vhf, uhf, 350, atau 800 MHz."},
                "powerSource": {"type": "STRING", "enum": POWER_SOURCE_ENUM,
                                "description": "Sumber daya listrik site."},
                "backhaul": {"type": "STRING", "enum": BACKHAUL_ENUM,
                             "description": "Media backhaul antar site."},
                "needAtex": {"type": "BOOLEAN",
                             "description": "True bila area berbahaya (Zona ATEX/IECEx)."},
                "buildingFloors": {"type": "INTEGER",
                                   "description": "Jumlah lantai bangunan bila in-building (0-200)."},
                "rationale": {"type": "STRING",
                              "description": "Alasan singkat rekomendasi parameter ini."},
            },
            "required": [],
        },
    },
    {
        "name": "configure_fiber_das",
        "description": (
            "Usulkan konfigurasi RFoF Fiber DAS (in-building) FMTCS untuk gedung bertingkat, "
            "basement, tunnel, mall, rumah sakit, atau data center. Jangan menghitung BoQ sendiri."
        ),
        "parameters": {
            "type": "OBJECT",
            "properties": {
                "buildingFloors": {"type": "INTEGER",
                                   "description": "Jumlah lantai yang dicakup DAS (1-200)."},
                "dasAntennasPerFloor": {"type": "INTEGER",
                                        "description": "Jumlah antena ceiling per lantai (1-64)."},
                "dasArchMode": {"type": "STRING", "enum": DAS_ARCH_ENUM,
                                "description": "Arsitektur OMU/ORU: 'digital' atau 'analog'."},
                "dasFiberTopo": {"type": "STRING", "enum": DAS_TOPO_ENUM,
                                 "description": "Topologi serat optik: cascade, ring, atau star."},
                "dasRepeaters": {"type": "INTEGER",
                                 "description": "Jumlah repeater sumber sinyal (1-20)."},
                "dasRadios": {"type": "INTEGER",
                              "description": "Jumlah radio/pengguna yang dilayani DAS (1-500)."},
                "rationale": {"type": "STRING", "description": "Alasan singkat konfigurasi ini."},
            },
            "required": [],
        },
    },
    {
        "name": "configure_cctv_fleet",
        "description": (
            "Usulkan konfigurasi armada CCTV & NVR (Pelco / Avigilon / ONVIF generik). "
            "Jangan menghitung storage/BoQ sendiri — itu dihitung mesin deterministik."
        ),
        "parameters": {
            "type": "OBJECT",
            "properties": {
                "cameraCount": {"type": "INTEGER",
                                "description": "Jumlah total kamera (1-2000)."},
                "retentionDays": {"type": "INTEGER",
                                  "description": "Lama penyimpanan rekaman dalam hari (1-365)."},
                "vmsBrand": {"type": "STRING", "enum": VMS_BRAND_ENUM,
                             "description": "Merek VMS: pelco_videoxpert, avigilon_unity, generic_onvif."},
                "cableDistanceM": {"type": "INTEGER",
                                   "description": "Jarak kabel kamera terjauh dalam meter (10-300)."},
                "rationale": {"type": "STRING", "description": "Alasan singkat konfigurasi ini."},
            },
            "required": [],
        },
    },
    {
        "name": "place_gis_sites",
        "description": (
            "Usulkan penempatan site repeater/base station pada peta GIS. Koordinat WAJIB berada "
            "di dalam wilayah Republik Indonesia (lat -11.5..6.5, lon 94.5..141.5). Gunakan mode "
            "'replace' untuk mengganti seluruh site, atau 'append' untuk menambah."
        ),
        "parameters": {
            "type": "OBJECT",
            "properties": {
                "mode": {"type": "STRING", "enum": GIS_MODE_ENUM,
                         "description": "'append' menambah site, 'replace' mengganti semua site."},
                "sites": {
                    "type": "ARRAY",
                    "description": "Daftar site (maksimum 20).",
                    "items": {
                        "type": "OBJECT",
                        "properties": {
                            "name": {"type": "STRING", "description": "Nama site (maks 60 karakter)."},
                            "lat": {"type": "NUMBER", "description": "Lintang (Indonesia: -11.5..6.5)."},
                            "lon": {"type": "NUMBER", "description": "Bujur (Indonesia: 94.5..141.5)."},
                            "towerHeight": {"type": "NUMBER", "description": "Tinggi tower meter (3-120)."},
                            "txWatts": {"type": "NUMBER", "description": "Daya pancar Watt (1-100)."},
                            "antGainDbi": {"type": "NUMBER", "description": "Gain antena dBi (0-18)."},
                            "antennaType": {"type": "STRING", "enum": ANTENNA_TYPE_ENUM,
                                            "description": "'omni' atau 'directional'."},
                            "azimuthDeg": {"type": "NUMBER", "description": "Azimuth derajat (0-360)."},
                            "beamwidthDeg": {"type": "NUMBER", "description": "Lebar beam derajat (30-120)."},
                        },
                        "required": ["name", "lat", "lon"],
                    },
                },
                "rationale": {"type": "STRING", "description": "Alasan singkat penempatan ini."},
            },
            "required": ["sites"],
        },
    },
]

# ─────────────────────────────────────────────────────────────────────────────
# 2. PARAMETER SPECS (server-side validation + clamping rules)
#    state_key = matching key in the frontend-supplied current_state (for diff).
# ─────────────────────────────────────────────────────────────────────────────
PARAM_SPECS: Dict[str, Dict[str, Dict[str, Any]]] = {
    "set_dmr_sizing_params": {
        "industry":      {"type": "enum", "enum": INDUSTRY_ENUM, "state_key": "industry"},
        "areaInput":     {"type": "number", "min": 0.01, "max": 1000000, "state_key": "areaInput"},
        "areaUnit":      {"type": "enum", "enum": AREA_UNIT_ENUM, "default": "ha", "state_key": "areaUnit"},
        "userCount":     {"type": "int", "min": 1, "max": 5000, "state_key": "userCount"},
        "terrain":       {"type": "enum", "enum": TERRAIN_ENUM, "state_key": "terrain"},
        "freqBand":      {"type": "enum", "enum": FREQ_BAND_ENUM, "state_key": "freqBand"},
        "powerSource":   {"type": "enum", "enum": POWER_SOURCE_ENUM, "state_key": "powerSource"},
        "backhaul":      {"type": "enum", "enum": BACKHAUL_ENUM, "state_key": "backhaul"},
        "needAtex":      {"type": "bool", "state_key": "needAtex"},
        "buildingFloors": {"type": "int", "min": 0, "max": 200, "state_key": "buildingFloors"},
    },
    "configure_fiber_das": {
        "buildingFloors":     {"type": "int", "min": 1, "max": 200, "state_key": "dasFloors"},
        "dasAntennasPerFloor": {"type": "int", "min": 1, "max": 64, "state_key": "dasAntennasPerFloor"},
        "dasArchMode":        {"type": "enum", "enum": DAS_ARCH_ENUM, "default": "digital", "state_key": "dasArchMode"},
        "dasFiberTopo":       {"type": "enum", "enum": DAS_TOPO_ENUM, "default": "star", "state_key": "dasFiberTopo"},
        "dasRepeaters":       {"type": "int", "min": 1, "max": 20, "state_key": "dasRepeaters"},
        "dasRadios":          {"type": "int", "min": 1, "max": 500, "state_key": "dasRadios"},
    },
    "configure_cctv_fleet": {
        "cameraCount":    {"type": "int", "min": 1, "max": 2000, "state_key": "cctvCameraCount"},
        "retentionDays":  {"type": "int", "min": 1, "max": 365, "state_key": "cctvRetentionDays"},
        "vmsBrand":       {"type": "enum", "enum": VMS_BRAND_ENUM, "default": "generic_onvif", "state_key": "cctvVmsBrand"},
        "cableDistanceM": {"type": "int", "min": 10, "max": 300, "state_key": "cctvCableDistM"},
    },
}

SITE_SPECS: Dict[str, Dict[str, Any]] = {
    "name":         {"type": "string", "max_len": 60},
    "lat":          {"type": "number", "min": INDONESIA_LAT_MIN, "max": INDONESIA_LAT_MAX},
    "lon":          {"type": "number", "min": INDONESIA_LON_MIN, "max": INDONESIA_LON_MAX},
    "towerHeight":  {"type": "number", "min": 3, "max": 120},
    "txWatts":      {"type": "number", "min": 1, "max": 100},
    "antGainDbi":   {"type": "number", "min": 0, "max": 18},
    "antennaType":  {"type": "enum", "enum": ANTENNA_TYPE_ENUM, "default": "omni"},
    "azimuthDeg":   {"type": "number", "min": 0, "max": 360},
    "beamwidthDeg": {"type": "number", "min": 30, "max": 120},
}


# ─────────────────────────────────────────────────────────────────────────────
# 3. LOW-LEVEL SANITIZERS
# ─────────────────────────────────────────────────────────────────────────────
def _norm(v: Any) -> Any:
    """Normalize a value for equality comparison in diff computation."""
    if isinstance(v, bool):
        return v
    if isinstance(v, (int, float)):
        return round(float(v), 6)
    if v is None:
        return None
    return str(v).strip().lower()


def _sanitize_scalar(key: str, val: Any, spec: Dict[str, Any]) -> Tuple[Any, Optional[str], bool]:
    """
    Return (clean_value, note_or_None, was_clamped).
    clean_value is None when the value must be dropped (invalid & no default).
    """
    t = spec["type"]

    if t == "enum":
        sval = str(val).strip().lower() if val is not None else ""
        if sval in spec["enum"]:
            return sval, None, False
        default = spec.get("default")
        if default is not None:
            return default, f"'{key}'='{val}' tidak dikenal, memakai default '{default}'.", True
        return None, f"'{key}'='{val}' bukan opsi valid, diabaikan.", True

    if t == "bool":
        if isinstance(val, bool):
            return val, None, False
        return (str(val).strip().lower() in ("true", "1", "ya", "yes", "y")), None, False

    if t in ("int", "number"):
        try:
            num = float(val)
        except (TypeError, ValueError):
            return None, f"'{key}'='{val}' bukan angka, diabaikan.", True
        lo, hi = spec.get("min"), spec.get("max")
        clamped = False
        if lo is not None and num < lo:
            num, clamped = lo, True
        if hi is not None and num > hi:
            num, clamped = hi, True
        if t == "int":
            num = int(round(num))
        note = f"'{key}' dibatasi ke rentang aman [{lo}..{hi}] → {num}." if clamped else None
        return num, note, clamped

    if t == "string":
        s = str(val)
        ml = spec.get("max_len")
        if ml and len(s) > ml:
            return s[:ml], f"'{key}' dipangkas ke {ml} karakter.", True
        return s, None, False

    return val, None, False


def _sanitize_site(raw: Any, idx: int) -> Tuple[Dict[str, Any], List[str], bool]:
    """Sanitize a single GIS site dict against SITE_SPECS + Indonesia bounds."""
    s = dict(raw or {})
    out: Dict[str, Any] = {}
    notes: List[str] = []
    clamped_any = False

    for key, spec in SITE_SPECS.items():
        if key in s and s[key] is not None:
            val, note, clamped = _sanitize_scalar(key, s[key], spec)
            if val is not None:
                out[key] = val
            if note:
                notes.append(f"Site#{idx + 1}: {note}")
            clamped_any = clamped_any or clamped

    out.setdefault("name", f"Site {idx + 1}")
    if "lat" not in out or "lon" not in out:
        notes.append(f"Site#{idx + 1}: koordinat lat/lon kosong atau di luar wilayah Indonesia; "
                     f"akan memakai titik acuan peta saat diterapkan.")
        clamped_any = True
    return out, notes, clamped_any


# ─────────────────────────────────────────────────────────────────────────────
# 4. PUBLIC: VALIDATE & SANITIZE A SINGLE PROPOSED ACTION
# ─────────────────────────────────────────────────────────────────────────────
def validate_and_sanitize_action(tool_name: str,
                                 args: Optional[Dict[str, Any]],
                                 current_state: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    """
    Validate + clamp a model-proposed tool call and return a standardized,
    never-auto-applied "proposed action" object for the Action Cards.
    """
    if not isinstance(current_state, dict):
        current_state = {}
    if tool_name not in SUPPORTED_TOOLS:
        return {
            "id": f"act_{uuid.uuid4().hex[:8]}",
            "tool": str(tool_name)[:64],
            "args": {},
            "diff": [],
            "rationale": "",
            "validation": {"status": "rejected",
                           "notes": [f"Tool '{str(tool_name)[:64]}' tidak dikenal, ditolak."]},
        }
    args = dict(args) if isinstance(args, dict) else {}
    rationale = str(args.pop("rationale", "") or "").strip()
    notes: List[str] = []
    sanitized: Dict[str, Any] = {}
    diff: List[Dict[str, Any]] = []
    clamped_any = False

    if tool_name == "place_gis_sites":
        mode = str(args.get("mode", "append")).strip().lower()
        if mode not in GIS_MODE_ENUM:
            notes.append(f"mode='{args.get('mode')}' tidak valid, memakai 'append'.")
            mode, clamped_any = "append", True
        sanitized["mode"] = mode

        raw_sites = args.get("sites") or []
        if not isinstance(raw_sites, list):
            raw_sites = []
        if len(raw_sites) > 20:
            notes.append(f"Jumlah site dipangkas dari {len(raw_sites)} ke 20 (batas maksimum).")
            raw_sites = raw_sites[:20]
            clamped_any = True

        clean_sites: List[Dict[str, Any]] = []
        for i, s in enumerate(raw_sites):
            cs, snotes, sclamped = _sanitize_site(s, i)
            clean_sites.append(cs)
            notes.extend(snotes)
            clamped_any = clamped_any or sclamped
        sanitized["sites"] = clean_sites

        existing = current_state.get("gisSites")
        if isinstance(existing, list):
            old_count = len(existing)
        else:
            try:
                old_count = max(0, int(current_state.get("gisSiteCount") or 0))
            except (TypeError, ValueError):
                old_count = 0
        new_count = len(clean_sites) if mode == "replace" else old_count + len(clean_sites)
        diff.append({"path": "gisSites", "from": old_count, "to": new_count})

    else:
        specs = PARAM_SPECS.get(tool_name, {})
        for key, val in args.items():
            spec = specs.get(key)
            if spec is None:
                continue  # Unknown/untrusted param → drop silently.
            clean, note, clamped = _sanitize_scalar(key, val, spec)
            if note:
                notes.append(note)
            clamped_any = clamped_any or clamped
            if clean is None:
                continue
            sanitized[key] = clean
            state_key = spec.get("state_key", key)
            old = current_state.get(state_key, None)
            if _norm(old) != _norm(clean):
                diff.append({"path": key, "from": old, "to": clean})

    return {
        "id": f"act_{uuid.uuid4().hex[:8]}",
        "tool": tool_name,
        "args": sanitized,
        "diff": diff,
        "rationale": rationale,
        "validation": {
            "status": "clamped" if clamped_any else "ok",
            "notes": notes,
        },
    }


def is_actionable(action: Optional[Dict[str, Any]]) -> bool:
    """True only for whitelisted, non-rejected actions that carry real arguments."""
    if not isinstance(action, dict):
        return False
    if (action.get("validation") or {}).get("status") == "rejected":
        return False
    args = action.get("args") or {}
    if action.get("tool") == "place_gis_sites":
        return bool(args.get("sites"))
    return bool(args)


# ─────────────────────────────────────────────────────────────────────────────
# 5. PUBLIC: FALLBACK — WRAP LOCAL EXTRACTOR OUTPUT AS PROPOSED ACTIONS
#    Used when Gemini is offline / no API key, so the Action Cards still work.
# ─────────────────────────────────────────────────────────────────────────────
def build_fallback_actions(extracted: Optional[Dict[str, Any]],
                           current_state: Optional[Dict[str, Any]] = None) -> List[Dict[str, Any]]:
    extracted = extracted or {}
    current_state = current_state or {}
    actions: List[Dict[str, Any]] = []

    # ── DMR sizing ──────────────────────────────────────────────────────────
    dmr_keys = ["industry", "areaInput", "areaUnit", "userCount", "terrain",
                "freqBand", "powerSource", "backhaul", "needAtex", "buildingFloors"]
    dmr_args = {k: extracted[k] for k in dmr_keys
                if k in extracted and extracted[k] is not None}
    if dmr_args:
        dmr_args["rationale"] = "Parameter terdeteksi otomatis dari teks (mesin ekstraksi lokal)."
        actions.append(validate_and_sanitize_action("set_dmr_sizing_params", dmr_args, current_state))

    # ── Fiber DAS ───────────────────────────────────────────────────────────
    das_trigger = extracted.get("needFiberDas") or any(
        k in extracted for k in ("dasAntennas", "dasArchMode", "dasFiberTopo"))
    if das_trigger:
        das_args: Dict[str, Any] = {}
        if extracted.get("buildingFloors") is not None:
            das_args["buildingFloors"] = extracted["buildingFloors"]
        if extracted.get("dasAntennas") is not None:
            das_args["dasAntennasPerFloor"] = extracted["dasAntennas"]
        if extracted.get("dasArchMode"):
            das_args["dasArchMode"] = extracted["dasArchMode"]
        if extracted.get("dasFiberTopo"):
            das_args["dasFiberTopo"] = extracted["dasFiberTopo"]
        if das_args:
            das_args["rationale"] = "Kebutuhan in-building Fiber DAS terdeteksi dari teks."
            actions.append(validate_and_sanitize_action("configure_fiber_das", das_args, current_state))

    # ── CCTV ────────────────────────────────────────────────────────────────
    cctv_trigger = extracted.get("needCctv") or any(
        k in extracted for k in ("cctvCameraCount", "cctvRetentionDays", "cctvVmsBrand", "cctvCableDistM"))
    if cctv_trigger:
        c_args: Dict[str, Any] = {}
        if extracted.get("cctvCameraCount") is not None:
            c_args["cameraCount"] = extracted["cctvCameraCount"]
        if extracted.get("cctvRetentionDays") is not None:
            c_args["retentionDays"] = extracted["cctvRetentionDays"]
        vb = extracted.get("cctvVmsBrand")
        if vb:
            vbl = str(vb).lower()
            if "pelco" in vbl:
                c_args["vmsBrand"] = "pelco_videoxpert"
            elif "avigilon" in vbl or "unity" in vbl:
                c_args["vmsBrand"] = "avigilon_unity"
            else:
                c_args["vmsBrand"] = "generic_onvif"
        if extracted.get("cctvCableDistM") is not None:
            c_args["cableDistanceM"] = extracted["cctvCableDistM"]
        if c_args:
            c_args["rationale"] = "Kebutuhan CCTV terdeteksi dari teks."
            actions.append(validate_and_sanitize_action("configure_cctv_fleet", c_args, current_state))

    return [a for a in actions if is_actionable(a)]
