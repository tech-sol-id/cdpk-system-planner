#!/usr/bin/env python3
"""
Multi-Model AI Copilot Engine for CDPK System Planner.
Exclusively supports:
- gemini-3.8-flash (Google Gemini 3.8 Flash — Fast Sizing, BoQ & Budget Calculation)
- gemini-3.8-pro   (Google Gemini 3.8 Pro   — Deep RF Architecture & Proposal Reasoning)

Persona: Senior RF Telecom & Critical Communications Solutions Architect
Capabilities:
1. Precision RF Link Budget & Propagation (FSPL, Okumura-Hata, Fade Margin, RSL)
2. Hazardous Area ATEX / IECEx Compliance & Zero-Tolerance Safety Verification (Zone 1/21 vs Zone 2/22)
3. Tender Proposal & Specification Compliance Matrix Generator (Comply/Non-Comply + Citations)
4. Context-Aware Knowledge Retrieval (RAG) with Rich Key-Specs Snapshot
5. Off-Grid Solar PV & LiFePO4 Battery Autonomy Sizing
6. Hybrid DMR-to-Broadband / WAVE PTX PoC & RoIP Gateway Integration
7. Dispatch Console (SmartPTT AVL GPS & Voice Recording)
8. Proactive Missing Parameter Detection & Interactive Clarification Questions
"""

import json
import logging
import math
import os
import re
import urllib.error
import urllib.parse
import urllib.request
from typing import Any, Dict, List, Optional, Tuple

from server.knowledge_search import build_rag_context_for_prompt, search_knowledge_base

logger = logging.getLogger("cdpk.ai_copilot")

ALLOWED_MODELS = {
    "gemini-3.8-flash": {
        "id": "gemini-3.8-flash",
        "name": "Google Gemini 3.8 Flash",
        "badge_id": "Cepat & Efisien — Kalkulasi Sizing, BoQ & Optimasi Harga",
        "badge_en": "Fast & Efficient — Sizing Calculation, BoQ & Price Optimization"
    },
    "gemini-3.8-pro": {
        "id": "gemini-3.8-pro",
        "name": "Google Gemini 3.8 Pro",
        "badge_id": "Penalaran Mendalam — Arsitektur RF, Mitigasi Risiko & Proposal Eksekutif",
        "badge_en": "Deep Reasoning — RF Architecture, Risk Mitigation & Executive Proposal"
    }
}


# ─────────────────────────────────────────────────────────────────────────────
# 1. MATHEMATICAL RF LINK BUDGET & PROPAGATION CALCULATION
# ─────────────────────────────────────────────────────────────────────────────

def calc_fspl(freq_mhz: float, dist_km: float) -> float:
    """Free Space Path Loss (FSPL) in dB: 32.44 + 20*log10(f_MHz) + 20*log10(d_km)"""
    d = max(0.05, dist_km)
    f = max(30.0, freq_mhz)
    return round(32.44 + (20.0 * math.log10(f)) + (20.0 * math.log10(d)), 2)


def calc_okumura_hata(freq_mhz: float, dist_km: float, hb_m: float, hm_m: float, env_type: str) -> float:
    """
    Okumura-Hata empirical propagation path loss for VHF/UHF Land Mobile Radio:
    - Base station height hb: 30m - 200m
    - Mobile height hm: 1m - 10m
    - Distance d: 0.1km - 30km
    Supports: urban, suburban, open (mine/open pit), and foliage (palm oil / forest).
    """
    f = max(136.0, min(1500.0, freq_mhz))
    d = max(0.1, min(40.0, dist_km))
    hb = max(10.0, min(200.0, hb_m))
    hm = max(1.0, min(10.0, hm_m))

    # Mobile antenna correction factor a(hm) for small/medium city
    a_hm = ((1.1 * math.log10(f) - 0.7) * hm) - (1.56 * math.log10(f) - 0.8)

    # Base urban path loss L_urban
    l_urban = (
        69.55 +
        (26.16 * math.log10(f)) -
        (13.82 * math.log10(hb)) -
        a_hm +
        ((44.9 - (6.55 * math.log10(hb))) * math.log10(d))
    )

    if env_type in ("open", "flat", "mining"):
        # Open area formula (open-pit mine / open savanna)
        l_path = l_urban - (4.78 * (math.log10(f) ** 2)) + (18.33 * math.log10(f)) - 40.94
    elif env_type in ("suburban", "residential"):
        # Suburban area
        l_path = l_urban - (2.0 * ((math.log10(f / 28.0)) ** 2)) - 5.4
    elif env_type in ("dense", "foliage", "palm_oil"):
        # Tropical Palm Oil Plantation: Suburban base + canopy clutter attenuation (~1.5 dB/km)
        l_sub = l_urban - (2.0 * ((math.log10(f / 28.0)) ** 2)) - 5.4
        l_path = l_sub + min(22.0, d * 1.6)
    elif env_type in ("mountainous", "hilly"):
        # Hilly / Ridge terrain: Urban + knife-edge diffraction / shadow margin (~8 - 14 dB)
        l_path = l_urban + 9.5
    else:
        l_path = l_urban

    return round(max(30.0, l_path), 2)


def evaluate_link_budget(
    band: str,
    distance_km: float,
    terrain: str,
    hb_m: float = 30.0,
    tx_power_w: float = 50.0,
    feeder_type: str = "heliax_half_inch",
    feeder_len_m: float = 35.0,
    antenna_gain_dbi: float = 6.5
) -> Dict[str, Any]:
    """
    Perform complete bi-directional RF Link Budget analysis (Downlink & Uplink):
    Repeater (SLR 5300 50W) <---> Handheld Radio (R7/R2/XiR P8600 Ex).
    """
    freq_map = {"vhf": 155.0, "uhf": 450.0, "350": 360.0, "800": 850.0}
    freq_mhz = freq_map.get(band, 450.0)

    # 1. Transmitter (Base Station Repeater)
    tx_power_dbm = round(10.0 * math.log10(max(1.0, tx_power_w) * 1000.0), 2)  # 50W = +47 dBm
    loss_feeder_per_m = 0.028 if band == "vhf" else (0.048 if band == "uhf" else 0.075)
    if "seven_eighth" in feeder_type:
        loss_feeder_per_m *= 0.55  # 7/8" has lower attenuation
    total_feeder_loss = round(loss_feeder_per_m * feeder_len_m, 2)
    duplexer_loss = 1.0  # QPD-150 / QPD-450D insertion loss
    jumper_connector_loss = 1.0  # N-Connectors + lightning surge arrester

    eirp_dbm = round(tx_power_dbm + antenna_gain_dbi - total_feeder_loss - duplexer_loss - jumper_connector_loss, 2)

    # 2. Propagation Path Loss
    fspl_db = calc_fspl(freq_mhz, distance_km)
    hata_loss_db = calc_okumura_hata(freq_mhz, distance_km, hb_m=hb_m, hm_m=1.5, env_type=terrain)

    # 3. Receiver (Handheld HT / Mobile)
    ht_ant_gain_dbi = 1.5  # Typical helical whip antenna
    ht_body_loss = 2.0  # Operator body absorption loss
    rsl_downlink_dbm = round(eirp_dbm - hata_loss_db + ht_ant_gain_dbi - ht_body_loss, 2)

    # DMR Digital Receiver Sensitivity (-118 dBm @ 5% BER)
    rx_sens_dbm = -118.0
    fade_margin_db = round(rsl_downlink_dbm - rx_sens_dbm, 2)

    # 4. Uplink Calculation (HT transmitting at 4W / 5W to Repeater)
    ht_tx_w = 5.0 if band == "vhf" else 4.0
    ht_tx_dbm = round(10.0 * math.log10(ht_tx_w * 1000.0), 2)  # 4W = +36 dBm
    ht_eirp_dbm = round(ht_tx_dbm + ht_ant_gain_dbi - ht_body_loss, 2)
    rsl_uplink_dbm = round(ht_eirp_dbm - hata_loss_db + antenna_gain_dbi - total_feeder_loss - duplexer_loss - jumper_connector_loss, 2)
    uplink_fade_margin_db = round(rsl_uplink_dbm - rx_sens_dbm, 2)

    # 5. Reliability Assessment
    min_margin = min(fade_margin_db, uplink_fade_margin_db)
    if min_margin >= 20.0:
        quality = "EXCELLENT"
        reliability = "≥ 95% (Mission-Critical Tier 1)"
    elif min_margin >= 15.0:
        quality = "GOOD"
        reliability = "90% - 95% (Standard Industrial Grade)"
    elif min_margin >= 10.0:
        quality = "MARGINAL"
        reliability = "80% - 90% (Prone to multipath fading)"
    else:
        quality = "CRITICAL_BLINDSPOT"
        reliability = "< 80% (Requires higher tower or fill-in repeater)"

    # Recommended Tower Height based on terrain
    rec_tower_h = 30
    if terrain in ("dense", "foliage", "palm_oil"):
        rec_tower_h = 52  # Clear 20m tree canopy
    elif terrain in ("mountainous", "hilly"):
        rec_tower_h = 36  # Ridge top mounting
    elif terrain in ("open", "mining"):
        rec_tower_h = 42  # High wall pit overlook
    elif terrain in ("indoor", "mixed_inout"):
        rec_tower_h = 24

    return {
        "band": band.upper(),
        "freq_mhz": freq_mhz,
        "distance_km": round(distance_km, 2),
        "terrain": terrain,
        "hb_m": hb_m,
        "recommended_tower_m": rec_tower_h,
        "tx_power_w": tx_power_w,
        "tx_power_dbm": tx_power_dbm,
        "total_feeder_loss_db": total_feeder_loss,
        "duplexer_loss_db": duplexer_loss,
        "antenna_gain_dbi": antenna_gain_dbi,
        "eirp_dbm": eirp_dbm,
        "fspl_db": fspl_db,
        "path_loss_db": hata_loss_db,
        "rsl_downlink_dbm": rsl_downlink_dbm,
        "rsl_uplink_dbm": rsl_uplink_dbm,
        "rx_sensitivity_dbm": rx_sens_dbm,
        "fade_margin_downlink_db": fade_margin_db,
        "fade_margin_uplink_db": uplink_fade_margin_db,
        "link_quality": quality,
        "estimated_reliability": reliability
    }


# ─────────────────────────────────────────────────────────────────────────────
# 2. OFF-GRID SOLAR PV & BATTERY AUTONOMY SIZING
# ─────────────────────────────────────────────────────────────────────────────

def calculate_solar_power_sizing(
    repeater_count: int,
    repeater_model: str = "SLR 5300",
    tx_duty_cycle: float = 0.20,
    autonomy_days: int = 3,
    psh: float = 4.0
) -> Dict[str, Any]:
    """
    Size Solar PV (Watt-Peak) and LiFePO4 Battery Bank for off-grid repeater sites.
    - MOTOTRBO SLR 5300: Standby ~40W, 50W Transmit ~140W
    - MOTOTRBO SLR 1000: Standby ~15W, 10W Transmit ~50W
    """
    is_slr1000 = "1000" in repeater_model
    p_standby = 15.0 if is_slr1000 else 40.0
    p_tx = 50.0 if is_slr1000 else 140.0

    avg_w = (p_tx * tx_duty_cycle) + (p_standby * (1.0 - tx_duty_cycle))
    total_w = avg_w * max(1, repeater_count)
    daily_wh = total_w * 24.0

    # System efficiency (MPPT controller + inverter/cable losses ~ 78%)
    sys_eff = 0.78
    needed_solar_wp = daily_wh / (psh * sys_eff)

    # Battery capacity: LiFePO4 Depth of Discharge (DoD) = 80%, System Voltage = 24V DC
    sys_voltage = 24.0
    dod = 0.80
    battery_wh = (daily_wh * autonomy_days) / dod
    battery_ah = battery_wh / sys_voltage

    # Recommended standard hardware components
    panel_qty = max(2, math.ceil(needed_solar_wp / 450.0))
    battery_qty = max(1, math.ceil(battery_ah / 100.0))

    return {
        "repeater_count": repeater_count,
        "repeater_model": repeater_model,
        "avg_power_watt": round(total_w, 1),
        "daily_energy_wh": round(daily_wh, 1),
        "autonomy_days": autonomy_days,
        "psh_hours": psh,
        "recommended_solar_wp": round(needed_solar_wp, 1),
        "recommended_battery_ah_24v": round(battery_ah, 1),
        "bom_solar_panels": f"{panel_qty}× 450Wp / 550Wp Monocrystalline Tier-1 Solar Panels",
        "bom_charge_controller": "1× MPPT Solar Charge Controller 40A/60A with RS485 SNMP Monitoring",
        "bom_battery_bank": f"{battery_qty}× 24V 100Ah (or 48V 100Ah) LiFePO4 Smart BMS Lithium Rackmount Battery",
        "bom_protection": "Class II DC Surge Arrester (SPD) + Copper Earthing Rod (< 5 Ohm)"
    }


# ─────────────────────────────────────────────────────────────────────────────
# 2B. FMTCS FIBER DAS (RFoF OMU + ORU) LINK BUDGET & MULTI-FLOOR SIZING
# ─────────────────────────────────────────────────────────────────────────────

def calculate_fmtcs_das_sizing(
    floors: int = 4,
    floor_area_m2: float = 5000.0,
    explicit_antennas: Optional[int] = None,
    repeaters_ch: int = 3,
    arch_mode: str = "digital",
    fiber_topo: str = "ring",
    oru_dbm: float = 40.0,
    cable_len_m: float = 30.0,
    splitters_in_path: int = 2
) -> Dict[str, Any]:
    """
    Calculate FMTCS RFoF Fiber Distributed Antenna System (DAS) link budget
    and multi-floor Bill of Quantities based on MY03 reference design ratios.
    """
    # 1. Downlink Signal Chain from ORU (40 dBm) to Indoor Antenna (ANTI400R 3 dBi)
    cable_loss_db = round((cable_len_m / 100.0) * 6.5, 2)  # 1/2" HCAAYZ-50-12 (6.5 dB/100m)
    splitter_loss_db = round(splitters_in_path * 3.3, 2)   # 2-way splitter FMTCS-PD (3.3 dB)
    other_loss_db = 1.0
    ant_gain_dbi = 3.0
    ant_input_dbm = round(oru_dbm - cable_loss_db - splitter_loss_db - other_loss_db, 2)
    eirp_dbm = round(ant_input_dbm + ant_gain_dbi, 2)

    if ant_input_dbm > 20.0:
        health = "HIGH (>20 dBm — Add splitter/coupler attenuation)"
    elif ant_input_dbm < -5.0:
        health = "LOW (<-5 dBm — Reduce coax length or add ORU)"
    else:
        health = "HEALTHY (-5 to +20 dBm Optimal Indoor Range)"

    # Coverage radius per indoor antenna (Office/Data Center n=4.5, target=-95 dBm, margin=12 dB)
    pl_max = eirp_dbm - 12.0 - (-95.0)
    cov_radius_m = round(max(10.0, min(65.0, math.pow(10.0, (pl_max - 24.8) / 45.0))), 1)
    usable_factor = 0.55
    area_per_ant_m2 = round(math.pi * (cov_radius_m ** 2) * usable_factor, 1)

    # 2. Antenna & Active/Passive Component Sizing (MY03 Reference Ratios)
    total_area_m2 = max(500.0, floor_area_m2 * max(1, floors))
    if explicit_antennas and explicit_antennas > 0:
        total_antennas = int(explicit_antennas)
    else:
        total_antennas = max(floors * 4, math.ceil(total_area_m2 / max(100.0, area_per_ant_m2)))

    r_oru = 30.0
    omu_cap = 32 if arch_mode == "digital" else 4
    oru_qty = max(1, math.ceil(total_antennas / r_oru))
    omu_qty = max(1, math.ceil(oru_qty / omu_cap))
    sig_splitter_qty = omu_qty * 2  # UL + DL FMTCS-LRF/S UDSS400C
    pwr_splitter_qty = max(1, round(total_antennas * 0.30))
    coupler_qty = max(1, round(total_antennas * 0.72))
    combiner_qty = max(1, math.ceil(repeaters_ch / 8.0))
    multiplexer_qty = max(1, math.ceil(repeaters_ch / 8.0))
    coax_m = round(total_antennas * 34.0)
    conn_qty = round(total_antennas * 6.0)
    fiber_patch_qty = max(2, round(oru_qty * 2.3))

    omu_model = "FMTCS-LRFN DOMU400C.RI (Digital, Max 32 ORU, ≤20km)" if arch_mode == "digital" else "FMTCS-LRFN AOMU400C.RI (Analog, Max 4 ORU, ≤8km)"
    oru_model = "FMTCS-LRFF DORU400CH.RI (Digital 10W / 40dBm, IP65)" if arch_mode == "digital" else "FMTCS-LRFF AORU400CH.RI (Analog 10W / 40dBm, IP65)"

    return {
        "arch_mode": arch_mode,
        "fiber_topology": fiber_topo.upper(),
        "omu_model": omu_model,
        "oru_model": oru_model,
        "floors": floors,
        "total_area_m2": round(total_area_m2),
        "indoor_antennas": total_antennas,
        "oru_qty": oru_qty,
        "omu_qty": omu_qty,
        "signal_splitter_qty": sig_splitter_qty,
        "power_splitter_qty": pwr_splitter_qty,
        "coupler_qty": coupler_qty,
        "combiner_qty": combiner_qty,
        "multiplexer_qty": multiplexer_qty,
        "coax_1_2_meters": coax_m,
        "rf_connectors_qty": conn_qty,
        "fiber_patch_qty": fiber_patch_qty,
        "ant_input_dbm": ant_input_dbm,
        "eirp_dbm": eirp_dbm,
        "ant_health": health,
        "cov_radius_m": cov_radius_m,
        "area_per_ant_m2": area_per_ant_m2
    }


# ─────────────────────────────────────────────────────────────────────────────
# 3. ATEX / INTRINSIC SAFETY HAZARDOUS AREA VALIDATOR
# ─────────────────────────────────────────────────────────────────────────────

def validate_atex_safety(industry: str, prompt_text: str) -> Dict[str, Any]:
    """
    Enforce zero-tolerance intrinsic safety barriers for explosive atmospheres:
    Zone 1/21 vs Zone 2/22, Gas Group IIC/IIB, Temperature Class T4.
    """
    p_low = prompt_text.lower()
    hazardous_keywords = [
        "kilang", "refinery", "migas", "petrokimia", "petrochemical", "offshore",
        "fpso", "amonia", "ammonia", "lpg", "lng", "bunker", "coal bunker",
        "silo gandum", "silo", "cat semprot", "spray booth", "solvent",
        "anfo", "handak", "explosive", "peledak", "tangki bbm", "spbu"
    ]

    is_hazardous = any(k in p_low for k in hazardous_keywords) or industry in ("oil_gas",)

    if not is_hazardous and "atex" not in p_low and "iecex" not in p_low:
        return {
            "need_atex": False,
            "zone": "Safe / Non-Hazardous Commercial Area",
            "cert_standard": "Standard Commercial / MIL-STD-810H",
            "recommended_radios": ["MOTOTRBO R7", "MOTOTRBO R2", "MOTOTRBO SL1M"],
            "safety_barrier_active": False,
            "safety_warning": ""
        }

    # Determine specific zone
    is_zone1 = any(k in p_low for k in ["zone 1", "zona 1", "zone 21", "zona 21", "ex ib", "ex ia", "kilang", "refinery", "offshore"])
    if is_zone1:
        zone_label = "Zone 1 / 21 (Flammable gas/dust likely during normal operation)"
        marking = "II 2G Ex ib IIC T4 Gb / II 2D Ex ib IIIC T135°C Db"
        rec_ht = "i.safe MOBILE IS540.1 (5G Smartphone) & Motorola XiR P8600 Ex / P8668 Ex (ATEX DMR)"
        rec_tab = "i.safe MOBILE IS940.1 (10.1\" Zone 1 Tablet)"
        prohibited = "MOTOTRBO R2, MOTOTRBO R7 Standar (Non-TIA), Smartphone Komersial Biasa, dan Perangkat Zone 2 (IS540.2)."
    else:
        zone_label = "Zone 2 / 22 (Flammable gas/dust unlikely during normal operation)"
        marking = "II 3G Ex ic IIC T4 Gc / II 3D Ex ic IIIC T135°C Dc"
        rec_ht = "i.safe MOBILE IS540.2 / IS440.2 & MOTOTRBO R7 (TIA-4950 UL Intrinsically Safe Option)"
        rec_tab = "i.safe MOBILE IS940.2 (Zone 2 Tablet)"
        prohibited = "Semua perangkat komunikasi tanpa sertifikasi keselamatan intrinsik."

    warning = (
        f"⚠️ **PERINGATAN KESELAMATAN K3 & ATEX:** Lokasi kerja teridentifikasi sebagai **{zone_label}**. "
        f"Sesuai regulasi ESDM / K3 Migas dan EU ATEX Directive 2014/34/EU, **DILARANG KERAS** menggunakan {prohibited}. "
        f"Seluruh perangkat handheld wajib bersertifikasi minimum `{marking}`."
    )

    return {
        "need_atex": True,
        "zone": zone_label,
        "atex_marking": marking,
        "recommended_radios": [rec_ht, rec_tab],
        "safety_barrier_active": True,
        "safety_warning": warning
    }


# ─────────────────────────────────────────────────────────────────────────────
# 4. DETERMINISTIC PARAMETER & MISSING PARAMETER EXTRACTION
# ─────────────────────────────────────────────────────────────────────────────

def extract_params_from_prompt(prompt: str, current_state: Dict[str, Any]) -> Dict[str, Any]:
    """
    Deterministically extract project parameters from natural language (ID/EN)
    and detect missing operational dimensions for interactive clarification.
    """
    p_low = prompt.lower()
    extracted: Dict[str, Any] = {}

    # 1. Detect Industry
    industry_keywords = [
        ("oil_gas", ["oil", "gas", "migas", "kilang", "refinery", "petrokimia", "petrochemical", "offshore", "fpso", "lng", "lpg"]),
        ("mining", ["tambang", "mining", "batubara", "coal", "nikel", "nickel", "quarry", "pit", "smelter", "haul road"]),
        ("palm_oil", ["sawit", "kebun", "perkebunan", "plantation", "palm", "kehutanan", "forestry", "htl"]),
        ("airport", ["bandara", "airport", "pelabuhan", "seaport", "port", "dermaga", "aviasi", "terminal", "maritime"]),
        ("hospital", ["rumah sakit", "hospital", "klinik", "rsud", "rs ", "medis", "healthcare"]),
        ("hotel", ["hotel", "resort", "hospitality", "villa", "convention"]),
        ("mall", ["mall", "mal ", "plaza", "pusat perbelanjaan", "shopping", "ritel", "retail", "mixed"]),
        ("public_safety", ["polisi", "tni", "militer", "damkar", "sar", "bpbd", "public safety", "darurat", "emergency", "satpol"]),
        ("logistics", ["logistik", "logistics", "gudang", "warehouse", "kargo", "cargo", "pelayaran", "fleet"]),
        ("manufacturing", ["pabrik", "manufaktur", "manufacturing", "factory", "industri", "plant", "kawasan industri"])
    ]
    for ind_key, kw_list in industry_keywords:
        if any(kw in p_low for kw in kw_list):
            extracted["industry"] = ind_key
            break

    # 2. Detect Area (ha or km2)
    m_ha = re.search(r"(\d+(?:[\.,]\d+)?)\s*(?:rb|ribu)?\s*(?:ha|hektar|hectare)", p_low)
    if m_ha:
        val = float(m_ha.group(1).replace(",", "."))
        if "rb" in m_ha.group(0) or "ribu" in m_ha.group(0):
            val *= 1000
        extracted["areaInput"] = round(val, 2)
        extracted["areaUnit"] = "ha"
    else:
        m_km = re.search(r"(\d+(?:[\.,]\d+)?)\s*(?:km2|km²|sq\s*km|kilometer\s*persegi)", p_low)
        if m_km:
            val = float(m_km.group(1).replace(",", "."))
            extracted["areaInput"] = round(val, 2)
            extracted["areaUnit"] = "km2"

    # 3. Detect User / Radio Count
    m_usr = re.search(r"(\d+)\s*(?:user|pengguna|orang|personel|ht|radio|handheld|unit\s*ht|unit)", p_low)
    if m_usr:
        extracted["userCount"] = int(m_usr.group(1))

    # 4. Detect Talkgroups / Channels
    m_grp = re.search(r"(\d+)\s*(?:group|grup|talkgroup|talk\s*group|saluran|channel|kanal)", p_low)
    if m_grp:
        extracted["channels"] = int(m_grp.group(1))

    # 5. Detect Topology / Backhaul / Technology
    if any(w in p_low for w in ["tetra", "dimetra"]):
        extracted["technology"] = "tetra"
    elif any(w in p_low for w in ["poc", "wave ptx", "broadband ptt", "push to talk over cellular"]):
        extracted["technology"] = "poc_hybrid"
        extracted["hybridPoc"] = True

    if any(w in p_low for w in ["point to point", "point-to-point", "p2p", "ptp", "radio link", "link radio"]):
        extracted["backhaul"] = "radio_ip"
        extracted["topologyType"] = "point_to_point"

    # 6. Detect Building Floors
    m_flr = re.search(r"(\d+)\s*(?:lantai|lt|floors?|stories|storey)", p_low)
    if m_flr:
        extracted["buildingFloors"] = int(m_flr.group(1))

    # 7. Detect Terrain / Environment
    if any(w in p_low for w in ["indoor", "dalam gedung", "basement"]) and any(w in p_low for w in ["outdoor", "luar", "parkir", "mixed", "campuran"]):
        extracted["terrain"] = "mixed_inout"
    elif any(w in p_low for w in ["indoor", "dalam gedung", "in-building", "basement"]):
        extracted["terrain"] = "indoor"
    elif any(w in p_low for w in ["gunung", "pegunungan", "mountain", "curam", "ekstrem"]):
        extracted["terrain"] = "mountainous"
    elif any(w in p_low for w in ["bukit", "berbukit", "hilly", "perbukitan", "bergelombang"]):
        extracted["terrain"] = "hilly"
    elif any(w in p_low for w in ["sawit", "kebun", "hutan", "lebat", "dense", "foliage"]):
        extracted["terrain"] = "dense"
    elif any(w in p_low for w in ["tambang", "mining", "pit", "quarry"]):
        extracted["terrain"] = "mining"
    elif any(w in p_low for w in ["laut", "offshore", "water", "maritime"]):
        extracted["terrain"] = "offshore"
    elif any(w in p_low for w in ["datar", "flat", "terbuka", "open"]):
        extracted["terrain"] = "flat"

    # 8. Detect Frequency Band
    if "vhf" in p_low or "136" in p_low:
        extracted["freqBand"] = "vhf"
    elif "350" in p_low:
        extracted["freqBand"] = "350"
    elif "800" in p_low or "900" in p_low:
        extracted["freqBand"] = "800"
    elif "uhf" in p_low or "400" in p_low or "450" in p_low:
        extracted["freqBand"] = "uhf"

    # 9. Special System Requirements
    # ATEX
    atex_audit = validate_atex_safety(extracted.get("industry", ""), prompt)
    if atex_audit["need_atex"]:
        extracted["needAtex"] = True
        extracted["atexZone"] = atex_audit["zone"]
        extracted["atexMarking"] = atex_audit["atex_marking"]

    # Solar PV
    if any(w in p_low for w in ["solar", "tenaga surya", "off-grid", "panel surya", "plts", "tanpa pln", "baterai"]):
        extracted["powerSource"] = "solar"
        m_aut = re.search(r"(\d+)\s*(?:hari|days?)\s*(?:otonomi|cadangan|backup|autonomy)", p_low)
        extracted["solarAutonomyDays"] = int(m_aut.group(1)) if m_aut else 3

    # Backhaul
    if any(w in p_low for w in ["starlink", "vsat", "satelit"]):
        extracted["backhaul"] = "starlink"
    elif any(w in p_low for w in ["fiber", "fo ", "serat optik"]):
        extracted["backhaul"] = "fiber"

    # Dispatch Console
    if any(w in p_low for w in ["dispatch", "console", "dispatcher", "smartptt", "rekam suara", "recording", "gps", "avl"]):
        extracted["needDispatch"] = True

    # FMTCS Fiber DAS (RFoF In-Building Multi-Floor / Campus Distribution)
    das_keywords = [
        "das", "fmtcs", "omu", "oru", "domu", "doru", "aomu", "aoru",
        "rfof", "rf over fiber", "fiber das", "in-building", "indoor antenna",
        "antena indoor", "antena plafon", "ceiling antenna", "coupler", "splitter",
        "data center", "datacenter", "basement", "gedung bertingkat", "high-rise"
    ]
    if any(w in p_low for w in das_keywords) or extracted.get("buildingFloors", 1) >= 3 or extracted.get("terrain") in ("indoor", "mixed_inout"):
        extracted["needFiberDas"] = True
        extracted["dasArchMode"] = "analog" if "analog" in p_low or "aomu" in p_low or "aoru" in p_low else "digital"
        if "ring" in p_low:
            extracted["dasFiberTopo"] = "ring"
        elif "cascade" in p_low or "daisy" in p_low:
            extracted["dasFiberTopo"] = "cascade"
        else:
            extracted["dasFiberTopo"] = "star"
        m_ant = re.search(r"(\d+)\s*(?:antena|antenna|titik\s*antena|indoor\s*antenna)", p_low)
        if m_ant:
            extracted["dasAntennas"] = int(m_ant.group(1))
        m_sqm = re.search(r"(\d+(?:[\.,]\d+)?)\s*(?:m2|m²|sqm|meter\s*persegi)", p_low)
        if m_sqm:
            extracted["dasFloorAreaM2"] = float(m_sqm.group(1).replace(",", "."))

    # 10. Proactive Missing Parameter Detection
    missing_questions = []
    if "areaInput" not in extracted and "buildingFloors" not in extracted and "dasAntennas" not in extracted:
        missing_questions.append("Berapa estimasi luas area proyek (Hektar / km² / m²) atau jumlah lantai gedung yang perlu dicakup?")
    if "userCount" not in extracted:
        missing_questions.append("Berapa perkiraan total pengguna/personel (unit HT) dan jumlah grup komunikasi (talkgroup) aktif?")
    if extracted.get("needAtex") and "zone" not in p_low and "zona" not in p_low:
        missing_questions.append("Apakah lingkungan operasional diklasifikasikan sebagai Zone 1 (kontinu) atau Zone 2 (insidental)?")
    if "powerSource" not in extracted and extracted.get("industry") in ("mining", "palm_oil"):
        missing_questions.append("Apakah lokasi repeater terjangkau listrik PLN 24 jam atau membutuhkan sistem tenaga surya mandiri (Off-Grid Solar PV)?")
    if "needDispatch" not in extracted and extracted.get("industry") in ("mining", "oil_gas", "airport", "public_safety"):
        missing_questions.append("Apakah membutuhkan konsol dispatch terpusat (SmartPTT) untuk perekaman suara (voice recording) & pelacakan GPS?")

    extracted["missing_questions"] = missing_questions[:3]  # Keep max 3 high-impact questions

    return extracted


# ─────────────────────────────────────────────────────────────────────────────
# 5. SPECIFICATION COMPLIANCE MATRIX GENERATOR
# ─────────────────────────────────────────────────────────────────────────────

def generate_compliance_matrix(
    band: str,
    topo: str,
    need_atex: bool,
    atex_marking: str,
    ht_model: str,
    power_source: str,
    need_dispatch: bool,
    citations: List[Dict[str, Any]],
    das_sizing: Optional[Dict[str, Any]] = None
) -> str:
    """Generate Markdown Compliance Sheet table ready for sales & tender bids."""
    doc_ref_repeater = "Katalog Citradata 2026 / Datasheet MOTOTRBO SLR 5300"
    doc_ref_terminal = "Datasheet MOTOTRBO R7 / R2"
    doc_ref_safety = f"Sertifikat ATEX ({atex_marking})" if need_atex else "MIL-STD-810H & IP68 Datasheet"
    doc_ref_das = "FMTCS Fiber DAS Datasheet (DOMU400C.RI & DORU400CH.RI)"

    for c in citations:
        c_low = c.get("title", "").lower()
        if "slr" in c_low:
            doc_ref_repeater = f"**{c['title']}**"
        elif "is540" in c_low or "p8600" in c_low or "r7" in c_low or "r2" in c_low:
            doc_ref_terminal = f"**{c['title']}**"
        if "atex" in c_low or "iecex" in c_low:
            doc_ref_safety = f"**{c['title']}**"
        if "fmtcs" in c_low or "omu" in c_low or "oru" in c_low:
            doc_ref_das = f"**{c['title']}**"

    rows = [
        ("| 1 | Standar Protokol Radio Digital | DMR Tier II ETSI TS 102 361-1/2/3 (2 Slot TDMA) | "
         "Full Compliant DMR Tier II dengan efisiensi spektrum 12.5 kHz kanal spasi | **COMPLY** | "
         f"{doc_ref_repeater} |"),
        (f"| 2 | Kepatuhan Lingkungan Berbahaya | {'Wajib Sertifikasi ' + atex_marking if need_atex else 'Proteksi Standar Industri Kasar (Rugged)'} | "
         f"{'Sertifikasi Resmi ATEX/IECEx: ' + atex_marking if need_atex else 'Sertifikasi IP68 Kedap Air/Debu + MIL-STD-810H'} | **COMPLY** | "
         f"{doc_ref_safety} |"),
        ("| 3 | Daya Pancar Repeater Station | Minimum 45–50 Watt Continuous Duty 100% | "
         "MOTOTRBO SLR 5300 (1–50 Watt kontinu, solid-state PA dengan pendingin aktif) | **COMPLY** | "
         f"{doc_ref_repeater} |"),
        (f"| 4 | Terminal Radio Portabel (HT) | Radio Handheld Digital {band.upper()} High-Tier | "
         f"{ht_model} (Audio jernih dengan AI Noise Suppression SINC+ & IP68) | **COMPLY** | "
         f"{doc_ref_terminal} |"),
        ("| 5 | Isolasi Duplexer & Cavity Filter | Isolasi RX-TX ≥ 80–90 dB, Redaman Sisip < 1.2 dB | "
         f"QPD-Series / FMTCS DSGQ400C.RI Bandpass Duplexer (Isolasi ≥ 80–90 dB) | **COMPLY** | "
         "Brosur QPD-Series & FMTCS DSGQ400C.RI |")
    ]

    if das_sizing:
        rows.append(
            (f"| 6 | Sistem Distribusi Antena Serat Optik (Fiber DAS) | Cakupan In-Building {das_sizing['floors']} Lantai ({das_sizing['indoor_antennas']} Antena Indoor), VSWR ≤ 1.5 | "
             f"{das_sizing['omu_qty']}× {das_sizing['omu_model']} + {das_sizing['oru_qty']}× {das_sizing['oru_model']} (40 dBm / 10W IP65) + {das_sizing['indoor_antennas']}× ANTI400R.M | **COMPLY** | "
             f"{doc_ref_das} |")
        )

    if power_source == "solar":
        rows.append(
            ("| 7 | Sistem Catu Daya Mandiri | Pasokan Daya Off-Grid Tenaga Surya dengan Otonomi 3 Hari | "
             "Sistem Solar PV Monocrystalline Tier-1 + MPPT Controller + LiFePO4 Battery Bank | **COMPLY** | "
             "Citradata Green Telecom Solar Spec |")
        )

    if need_dispatch:
        rows.append(
            ("| 8 | Konsol Dispatch & Perekaman | Centralized Dispatch Console, Voice Recording & GPS AVL | "
             "SmartPTT Enterprise Software Suite terhubung via IP Gateway ke MOTOTRBO | **COMPLY** | "
             "SmartPTT Enterprise Brochure |")
        )

    table = (
        "| No | Parameter Spesifikasi Klien | Persyaratan Teknis | Solusi Ditawarkan PT Citradata | Status | Bukti Dokumen Rujukan |\n"
        "|:---|:----------------------------|:-------------------|:-------------------------------|:------:|:----------------------|\n" +
        "\n".join(rows)
    )
    return table


# ─────────────────────────────────────────────────────────────────────────────
# 6. LOCAL EXPERT RESPONSE GENERATOR (OFFLINE / FALLBACK)
# ─────────────────────────────────────────────────────────────────────────────

def build_local_expert_response(
    model_id: str,
    lang: str,
    prompt: str,
    current_state: Dict[str, Any],
    extracted: Dict[str, Any],
    knowledge: Dict[str, Any],
    citations: Optional[List[Dict[str, Any]]] = None
) -> Dict[str, Any]:
    """
    Generate an authoritative engineering & commercial proposal combining:
    1. RF Link Budget & Propagation calculation (FSPL, Okumura-Hata, RSL).
    2. Zero-Tolerance ATEX & Hazardous Area verification.
    3. Off-Grid Solar PV & LiFePO4 battery autonomy sizing (if applicable).
    4. FMTCS Fiber DAS (RFoF OMU/ORU & Multi-Floor Indoor Antenna) sizing (if applicable).
    5. Compliance Matrix & Tender Sheet ready for commercial submission.
    6. Interactive clarification interview if parameters are incomplete.
    """
    is_pro = (model_id == "gemini-3.8-pro")
    is_en = (lang == "en")
    p_low = prompt.lower()
    citations = citations or []

    # Check sizing intent
    has_sizing_intent = (
        "userCount" in extracted or
        "areaInput" in extracted or
        "buildingFloors" in extracted or
        "dasAntennas" in extracted or
        "dasFloorAreaM2" in extracted or
        extracted.get("needFiberDas") or
        any(k in p_low for k in ["sizing", "kalkulasi", "hitung", "boq", "biaya", "harga", "anggaran", "budget", "penawaran", "tender", "proposal", "link budget", "das", "fmtcs"])
    )

    # ─────────────────────────────────────────────────────────────────────────
    # CASE A: Pure Technical / Knowledge Retrieval Question
    # ─────────────────────────────────────────────────────────────────────────
    if not has_sizing_intent and citations:
        icon = "🧠" if is_pro else "⚡"
        header = (
            f"### {icon} {ALLOWED_MODELS[model_id]['name']} — Jawaban Teknis Bank Knowledge Citradata\n"
            if not is_en else
            f"### {icon} {ALLOWED_MODELS[model_id]['name']} — Citradata Technical Knowledge Base Response\n"
        )
        body = (
            f"{header}\n"
            f"Berdasarkan penelusuran dokumen teknis terverifikasi pada **Bank Knowledge Internal PT Citra Data Purnama Karya**:\n\n"
            if not is_en else
            f"{header}\n"
            f"Based on verified engineering documentation from the **Internal Citradata Knowledge Bank**:\n\n"
        )

        for idx, c in enumerate(citations[:3]):
            specs = c.get("key_specs", {})
            spec_line = ""
            if specs:
                parts = []
                if "atex_marking" in specs:
                    parts.append(f"**ATEX:** `{specs['atex_marking']}`")
                if "frequency_range" in specs:
                    parts.append(f"**Freq:** `{specs['frequency_range']}`")
                if "tx_power" in specs:
                    parts.append(f"**Power:** `{specs['tx_power']}`")
                if "ip_rating" in specs:
                    parts.append(f"**Ingress:** `{specs['ip_rating']}`")
                if parts:
                    spec_line = f"  - 🏷️ *Spesifikasi Kunci:* {' | '.join(parts)}\n"

            body += f"- 📄 **{c['title']}** (`{c.get('folder', 'Knowledge Base')}`)\n{spec_line}"

        body += (
            f"\nSilakan ajukan skenario jumlah pengguna, jumlah lantai gedung, atau luas area proyek jika Anda ingin menghitung sizing sistem, RF link budget, dan BoQ komersial secara otomatis."
            if not is_en else
            f"\nPlease provide user count, building floors, or site area if you would like me to calculate complete RF Link Budget sizing and commercial BoQ."
        )

        return {
            "status": "ok",
            "model": model_id,
            "model_name": ALLOWED_MODELS[model_id]["name"],
            "engine_mode": "knowledge_bank_rag",
            "reply": body,
            "extracted_params": extracted,
            "citations": citations,
            "summary_metrics": {}
        }

    # ─────────────────────────────────────────────────────────────────────────
    # CASE B: Comprehensive RF System Engineering, Link Budget & Proposal
    # ─────────────────────────────────────────────────────────────────────────
    ind = extracted.get("industry", current_state.get("industry", "general"))
    area_val = float(extracted.get("areaInput", current_state.get("areaInput", 10)) or 10)
    area_unit = extracted.get("areaUnit", current_state.get("areaUnit", "km2"))
    area_km2 = area_val / 100.0 if area_unit == "ha" else area_val
    users = int(extracted.get("userCount", current_state.get("userCount", 40)) or 40)
    terrain = extracted.get("terrain", current_state.get("terrain", "flat"))
    band = extracted.get("freqBand", current_state.get("freqBand", "uhf"))
    floors = int(extracted.get("buildingFloors", current_state.get("buildingFloors", 1)) or 1)
    is_p2p = extracted.get("topologyType") == "point_to_point" or extracted.get("backhaul") == "radio_ip"
    channels = extracted.get("channels", max(1, math.ceil(users / 35.0)))
    power_source = extracted.get("powerSource", current_state.get("powerSource", "pln"))
    need_dispatch = bool(extracted.get("needDispatch", False))
    hybrid_poc = bool(extracted.get("hybridPoc", False))
    need_fiber_das = bool(extracted.get("needFiberDas", False)) or (terrain in ("indoor", "mixed_inout") and floors >= 3)

    # ATEX Audit
    atex_audit = validate_atex_safety(ind, prompt)
    need_atex = atex_audit["need_atex"] or bool(extracted.get("needAtex", False))
    atex_zone = atex_audit["zone"]
    atex_marking = atex_audit.get("atex_marking", "II 2G Ex ib IIC T4 Gb")

    # RF Math & Link Budget
    base_r = {"vhf": 16.0, "uhf": 11.0, "350": 13.0, "800": 8.5}.get(band, 11.0)
    t_mult = {
        "flat": 1.0, "hilly": 1.35, "mountainous": 1.75, "dense": 1.45,
        "mining": 1.40, "offshore": 0.90, "indoor": 2.2, "mixed_inout": 1.65
    }.get(terrain, 1.2)
    eff_r = max(1.2, base_r / t_mult)
    cell_area = math.pi * (eff_r ** 2) * 0.75
    est_sites = max(1, math.ceil(area_km2 / max(0.5, cell_area)))
    if is_p2p and est_sites < 2:
        est_sites = 2

    # Link Budget Execution
    lb = evaluate_link_budget(
        band=band,
        distance_km=eff_r,
        terrain=terrain,
        hb_m=30.0,
        tx_power_w=50.0,
        feeder_type="heliax_half_inch",
        feeder_len_m=35.0,
        antenna_gain_dbi=6.5
    )

    rpt_per_site = max(1, math.ceil(channels / 2.0))
    total_outdoor_rpt = est_sites * rpt_per_site

    # FMTCS Fiber DAS Calculation (if applicable)
    das_sizing = None
    das_sys_idr = 0
    das_nodes = 0
    if need_fiber_das:
        das_sizing = calculate_fmtcs_das_sizing(
            floors=max(1, floors),
            floor_area_m2=float(extracted.get("dasFloorAreaM2", 1800.0)),
            explicit_antennas=int(extracted.get("dasAntennas", 0)),
            repeaters_ch=total_outdoor_rpt,
            arch_mode=extracted.get("dasArchMode", "digital"),
            fiber_topo=extracted.get("dasFiberTopo", "star")
        )
        das_nodes = das_sizing["oru_qty"]
        extracted["needFiberDas"] = True
        extracted["buildingFloors"] = das_sizing["floors"]
        extracted["dasAntennasPerFloor"] = max(2, round(das_sizing["indoor_antennas"] / max(1, das_sizing["floors"])))
        extracted["dasRepeaters"] = total_outdoor_rpt
        extracted["dasRadios"] = users
        # Calculate FMTCS DAS package IDR price (OMU + ORU + UDSS + Combiner/Multiplexer + Splitters/Couplers + Antennas + Coax)
        omu_unit_idr = 68000000 if das_sizing["arch_mode"] == "digital" else 49000000
        oru_unit_idr = 56000000 if das_sizing["arch_mode"] == "digital" else 42000000
        das_sys_idr = (
            (das_sizing["omu_qty"] * omu_unit_idr) +
            (das_sizing["oru_qty"] * oru_unit_idr) +
            (das_sizing["signal_splitter_qty"] * 12500000) +
            (das_sizing["combiner_qty"] * 28500000) +
            (das_sizing["multiplexer_qty"] * 24500000) +
            (das_sizing["power_splitter_qty"] * 1350000) +
            (das_sizing["coupler_qty"] * 1450000) +
            (das_sizing["indoor_antennas"] * 1250000) +
            (das_sizing["coax_1_2_meters"] * 85000)
        )
    elif terrain in ("indoor", "mixed_inout") and floors >= 2:
        das_nodes = max(1, math.ceil(floors / 4))
        das_sys_idr = das_nodes * 60300000

    # Topology Selection
    if need_fiber_das and das_sizing:
        topo = f"MOTOTRBO DMR Tier II + RFoF DAS by FMTCS ({das_sizing['arch_mode'].title()} OMU/ORU Multi-Zone)"
    elif is_p2p:
        topo = "Point-to-Point Wireless Backhaul (Radio IP) + DMR Tier II Conventional"
    elif hybrid_poc:
        topo = "Hybrid MOTOTRBO DMR Tier II + Motorola WAVE PTX Broadband PoC Gateway"
    elif est_sites == 1 and rpt_per_site == 1:
        topo = "MOTOTRBO Conventional DMR Single-Site"
    elif est_sites == 1 and rpt_per_site > 1:
        topo = "MOTOTRBO Capacity Plus Single-Site (Multi-Channel Trunking)"
    elif est_sites > 1 and rpt_per_site == 1:
        topo = "MOTOTRBO IP Site Connect (IPSC Multi-Site)"
    elif est_sites <= 15 and users <= 1500:
        topo = "MOTOTRBO Linked Capacity Plus (LCP Multi-Site Trunking)"
    else:
        topo = "MOTOTRBO Capacity Max (DMR Tier III Trunking)"

    # Hardware Selection
    if need_atex:
        if "Zone 1" in atex_zone:
            ht_model = "i.safe MOBILE IS540.1 (5G ATEX) / Motorola XiR P8600 Ex"
            ht_price = 28500000
        else:
            ht_model = "i.safe MOBILE IS540.2 (Zone 2) / MOTOTRBO R7 (TIA-4950 UL IS)"
            ht_price = 21500000
    elif hybrid_poc:
        ht_model = "RugGear RG170 PoC + MOTOTRBO R7 Hybrid Fleet"
        ht_price = 9800000
    elif ind in ("mining", "oil_gas", "airport", "public_safety"):
        ht_model = "MOTOTRBO R7 (Industrial Heavy Duty IP68)"
        ht_price = 14800000
    elif ind in ("hotel", "hospital"):
        ht_model = "MOTOTRBO SL1M (Ultra-Slim Commercial)"
        ht_price = 5900000
    else:
        ht_model = "MOTOTRBO R2 (DMR Digital Rugged)"
        ht_price = 5400000

    ht_qty = math.ceil(users * 0.85)
    mob_qty = max(0, users - ht_qty)

    # Pricing Parameters
    rpt_sys_unit_idr = 78050000  # SLR 5300 50W bundle with duplexer & power supply
    p2p_link_idr = 45000000 if is_p2p else 0
    dispatch_sys_idr = 55000000 if need_dispatch else 0
    wave_ptx_gw_idr = 38000000 if hybrid_poc else 0

    # Solar Sizing (if requested)
    solar_sizing = None
    solar_sys_idr = 0
    if power_source == "solar":
        solar_sizing = calculate_solar_power_sizing(
            repeater_count=total_outdoor_rpt,
            repeater_model="SLR 5300",
            tx_duty_cycle=0.20,
            autonomy_days=extracted.get("solarAutonomyDays", 3),
            psh=4.0
        )
        solar_sys_idr = total_outdoor_rpt * 32000000  # Solar package unit estimate

    est_infra_idr = (
        (total_outdoor_rpt * rpt_sys_unit_idr) +
        das_sys_idr +
        p2p_link_idr +
        dispatch_sys_idr +
        wave_ptx_gw_idr +
        solar_sys_idr
    )
    est_terms_idr = (ht_qty * ht_price) + (mob_qty * 11500000)
    est_mandays = max(4, (est_sites * 4) + (das_nodes * 3) + (2 if need_dispatch else 0) + 3)
    est_svc_idr = est_mandays * 3500000
    est_subtotal = est_infra_idr + est_terms_idr + est_svc_idr
    est_ppn = round(est_subtotal * 0.11)
    est_grand_total = est_subtotal + est_ppn

    def fmt_idr(v: float) -> str:
        return "Rp " + f"{int(round(v)):,}".replace(",", ".")

    # Compliance Sheet Table
    comp_table = generate_compliance_matrix(
        band=band,
        topo=topo,
        need_atex=need_atex,
        atex_marking=atex_marking,
        ht_model=ht_model,
        power_source=power_source,
        need_dispatch=need_dispatch,
        citations=citations,
        das_sizing=das_sizing
    )

    # ─────────────────────────────────────────────────────────────────────────
    # NARRATIVE GENERATION (ID / EN)
    # ─────────────────────────────────────────────────────────────────────────
    if is_en:
        header = (
            f"### ⚡ {ALLOWED_MODELS[model_id]['name']} — Senior RF Telecom & Critical Communications Architecture\n"
            if not is_pro else
            f"### 🧠 {ALLOWED_MODELS[model_id]['name']} — Executive Telecom Design & Tender Compliance Proposal\n"
        )
        body = (
            f"{header}\n"
            f"Official Technical Engineering Proposal for **{users} Users**, **{channels} Talkgroups**, "
            f"Coverage: **{area_km2:.2f} km²** ({terrain.upper()}), Sector: **{ind.replace('_', ' ').title()}**:\n\n"
        )
        if atex_audit["safety_barrier_active"]:
            body += f"{atex_audit['safety_warning']}\n\n"

        body += (
            f"#### 1. System Topology & Operational Architecture\n"
            f"- **System Classification:** `{topo}`\n"
            f"- **Frequency Band:** `{band.upper()}` ({lb['freq_mhz']} MHz DMR Tier II Narrowband 12.5 kHz)\n"
            f"- **Base Station Repeaters:** **{est_sites} Site(s)** × **{rpt_per_site} Repeater/Site** = **{total_outdoor_rpt}× MOTOTRBO SLR 5300 (50W 100% Continuous Duty)**\n"
            f"- **RF Duplexer & Cavity:** QPD-Series / FMTCS DSGQ400C.RI Bandpass Duplexer with **≥ 85–90 dB RX-TX Isolation**\n"
        )
        if das_sizing:
            body += (
                f"- **RFoF DAS by FMTCS Optical Backbone:** **{das_sizing['omu_qty']}× {das_sizing['omu_model']}** + "
                f"**{das_sizing['oru_qty']}× {das_sizing['oru_model']}** (40 dBm / 10W IP65) + "
                f"**{das_sizing['signal_splitter_qty']}× UDSS400C.M** distributing RF across **{das_sizing['floors']} Floor(s)** "
                f"via **{das_sizing['indoor_antennas']}× ANTI400R.M** indoor omni antennas ({das_sizing['power_splitter_qty']} splitters, {das_sizing['coupler_qty']} couplers, {das_sizing['coax_1_2_meters']}m 1/2\" coax).\n"
            )
        elif das_nodes > 0:
            body += f"- **Indoor DAS Coverage:** **{das_nodes}× MOTOTRBO SLR 1000** for in-building penetration.\n"
        if is_p2p:
            body += f"- **Backhaul Interconnect:** High-Capacity Point-to-Point Wireless Radio IP Link.\n"
        if hybrid_poc:
            body += f"- **Broadband PTT Convergence:** Motorola WAVE PTX RoIP Gateway bridging DMR to 4G/5G mobile users.\n"
        if need_dispatch:
            body += f"- **Command Center Dispatching:** SmartPTT Enterprise Console (Voice Recording, GPS AVL Tracking & Emergency Lone Worker Telemetry).\n"
        if solar_sizing:
            body += f"- **Off-Grid Solar Power:** {solar_sizing['bom_solar_panels']} + {solar_sizing['bom_battery_bank']} ({solar_sizing['autonomy_days']} Days Autonomy).\n"

        body += (
            f"- **Subscriber Radio Terminals:** **{ht_qty}× {ht_model}** (Portable) + **{mob_qty}× MOTOTRBO XiR M8600i** (Mobile/Base Station)\n\n"
            f"#### 2. RF Propagation & Link Budget Analysis Table\n"
            f"```text\n"
            f"Target Operational Radius : {lb['distance_km']} km (Terrain: {lb['terrain'].title()})\n"
            f"Repeater Tx Power (+50W) : +{lb['tx_power_dbm']} dBm | Antenna Gain: +{lb['antenna_gain_dbi']} dBi\n"
            f"Feeder + Duplexer Loss    : -{round(lb['total_feeder_loss_db'] + lb['duplexer_loss_db'], 2)} dB | Effective EIRP: +{lb['eirp_dbm']} dBm\n"
            f"Free Space Path Loss FSPL : {lb['fspl_db']} dB\n"
            f"Okumura-Hata Clutter Loss : {lb['path_loss_db']} dB\n"
            f"Received Signal (RSL)     : {lb['rsl_downlink_dbm']} dBm (Rx Sensitivity: -118 dBm)\n"
            f"Calculated Fade Margin    : +{lb['fade_margin_downlink_db']} dB [Reliability: {lb['estimated_reliability']}]\n"
            f"Recommended Tower Height  : {lb['recommended_tower_m']} Meters AGL\n"
        )
        if das_sizing:
            body += (
                f"------------------------------------------------------------------------\n"
                f"RFoF DAS by FMTCS Link Budget: ORU +40.0 dBm -> Ant Input +{das_sizing['ant_input_dbm']} dBm "
                f"(EIRP +{das_sizing['eirp_dbm']} dBm | Status: {das_sizing['ant_health']} | Radius: ~{das_sizing['cov_radius_m']} m/ant)\n"
            )
        body += f"```\n\n"
        if is_pro:
            body += (
                f"#### 3. Tender Specification Compliance Matrix (Compliance Sheet)\n\n"
                f"{comp_table}\n\n"
                f"#### 4. Deep Architectural Redundancy, Risk Mitigation & SAT Protocol (Pro Analysis)\n"
                f"- **RF Isolation & Intermodulation Guard:** Enforce minimum **85–90 dB TX/RX Cavity Isolation** via `DSGQ400C.RI` / `QPD-450D` and `BCFH400x.RI` Combiner + `PDJF400x.M` Multiplexer to prevent receiver desensitization.\n"
                f"- **Optical & Passive DAS Integrity:** Target **+10 to +15 dBm** input power at each `ANTI400R.M` indoor antenna port using asymmetrical `CP400R.M` directional couplers near the `DORU400CH.RI` and balanced `PD400R.M` power splitters at far branches.\n"
                f"- **Site Acceptance Test (SAT) Thresholds:** Mandatory field verification at every antenna point: **VSWR ≤ 1.50 : 1** (Return Loss ≥ 14.0 dB), **TX Input ≥ +8.0 dBm**, **Indoor RSSI ≥ -85 dBm** across 95% coverage area, and grounding resistance **< 5.0 Ohm**.\n\n"
                f"#### 5. Live Commercial Cost Estimate (BoQ Master Pricelist)\n"
            )
        else:
            body += f"#### 3. Quick Commercial Cost Estimate (BoQ Master Pricelist)\n"

        body += (
            f"- **RF Repeater & Fiber DAS Infrastructure:** `{fmt_idr(est_infra_idr)}`\n"
            f"- **Subscriber Radios & Terminals ({users} Units):** `{fmt_idr(est_terms_idr)}`\n"
            f"- **Work Execution Statement / Engineering Services:** `{fmt_idr(est_svc_idr)}` (~{est_mandays} Mandays)\n"
            f"- **Estimated Grand Total (incl. 11% VAT):** **`{fmt_idr(est_grand_total)}`**\n"
        )
    else:
        header = (
            f"### ⚡ {ALLOWED_MODELS[model_id]['name']} — Kalkulasi Cepat Sizing & Estimasi BoQ\n"
            if not is_pro else
            f"### 🧠 {ALLOWED_MODELS[model_id]['name']} — Rancangan Arsitektur RF Mendalam & Proposal Kepatuhan Tender\n"
        )
        body = (
            f"{header}\n"
            f"Proposal Desain Teknis Resmi untuk **{users} Pengguna**, **{channels} Talkgroups/Kanal**, "
            f"Cakupan: **{area_km2:.2f} km²** ({terrain.upper()}), Sektor: **{ind.replace('_', ' ').title()}**:\n\n"
        )
        if atex_audit["safety_barrier_active"]:
            body += f"{atex_audit['safety_warning']}\n\n"

        body += (
            f"#### 1. Topologi Sistem & Arsitektur Jaringan Operasional\n"
            f"- **Klasifikasi Topologi:** `{topo}`\n"
            f"- **Alokasi Frekuensi:** `{band.upper()}` ({lb['freq_mhz']} MHz, DMR Tier II ETSI TS 102 361, Narrowband 12.5 kHz)\n"
            f"- **Infrastruktur Repeater:** **{est_sites} Lokasi Site** × **{rpt_per_site} Unit/Site** = **{total_outdoor_rpt} Unit MOTOTRBO SLR 5300 (50W Kontinu 100% Duty Cycle)**\n"
            f"- **Duplexer & Cavity Filter:** QPD-Series / FMTCS DSGQ400C.RI Bandpass Duplexer dengan **Isolasi RX-TX ≥ 85–90 dB**\n"
        )
        if das_sizing:
            body += (
                f"- **Backbone Optik RFoF DAS by FMTCS:** **{das_sizing['omu_qty']}× {das_sizing['omu_model']}** + "
                f"**{das_sizing['oru_qty']}× {das_sizing['oru_model']}** (Output 40 dBm / 10W IP65) + "
                f"**{das_sizing['signal_splitter_qty']}× UDSS400C.M** mendistribusikan sinyal RF ke **{das_sizing['floors']} Lantai** "
                f"melalui **{das_sizing['indoor_antennas']}× Antena Indoor ANTI400R.M** ({das_sizing['power_splitter_qty']} power splitter, {das_sizing['coupler_qty']} directional coupler, {das_sizing['coax_1_2_meters']}m coax 1/2\").\n"
            )
        elif das_nodes > 0:
            body += f"- **In-Building DAS:** **{das_nodes} Unit MOTOTRBO SLR 1000** untuk penetrasi sinyal indoor/lantai bertingkat.\n"
        if is_p2p:
            body += f"- **Wireless Backhaul:** Radio IP Link Point-to-Point antar site tanpa ketergantungan leased line.\n"
        if hybrid_poc:
            body += f"- **Konvergensi Hibrida Broadband:** Gateway RoIP Motorola WAVE PTX yang mengintegrasikan radio DMR ke pengguna smartphone 4G/5G.\n"
        if need_dispatch:
            body += f"- **Pusat Komando & Dispatcher:** SmartPTT Enterprise Console (Perekaman Suara 24/7, GPS AVL Tracking & Telemetri Darurat Man-Down).\n"
        if solar_sizing:
            body += f"- **Sistem Tenaga Surya (PLTS Off-Grid):** {solar_sizing['bom_solar_panels']} + {solar_sizing['bom_battery_bank']} (Cadangan {solar_sizing['autonomy_days']} Hari Otonomi Cuaca Mendung).\n"

        body += (
            f"- **Alokasi Perangkat Pengguna:** **{ht_qty} Unit {ht_model}** (HT Portabel) + **{mob_qty} Unit MOTOTRBO XiR M8600i** (Mobile/Base Station)\n\n"
            f"#### 2. Analisis Matematis Link Budget & Propagasi RF\n"
            f"```text\n"
            f"Target Radius Operasional  : {lb['distance_km']} km (Kontur Medan: {lb['terrain'].title()})\n"
            f"Daya Pancar Repeater (50W) : +{lb['tx_power_dbm']} dBm | Penguatan Antena: +{lb['antenna_gain_dbi']} dBi\n"
            f"Redaman Feeder + Duplexer  : -{round(lb['total_feeder_loss_db'] + lb['duplexer_loss_db'], 2)} dB | Efektif EIRP: +{lb['eirp_dbm']} dBm\n"
            f"Free Space Path Loss FSPL  : {lb['fspl_db']} dB\n"
            f"Redaman Okumura-Hata       : {lb['path_loss_db']} dB\n"
            f"Daya Terima Sinyal (RSL)   : {lb['rsl_downlink_dbm']} dBm (Sensitivitas Receiver: -118 dBm)\n"
            f"Margin Fading (Cadangan)   : +{lb['fade_margin_downlink_db']} dB [Keandalan: {lb['estimated_reliability']}]\n"
            f"Rekomendasi Tinggi Tower   : {lb['recommended_tower_m']} Meter AGL (Above Ground Level)\n"
        )
        if das_sizing:
            body += (
                f"------------------------------------------------------------------------\n"
                f"Link Budget RFoF DAS by FMTCS: ORU +40.0 dBm -> Input Antena +{das_sizing['ant_input_dbm']} dBm "
                f"(EIRP +{das_sizing['eirp_dbm']} dBm | Status: {das_sizing['ant_health']} | Radius: ~{das_sizing['cov_radius_m']} m/antena)\n"
            )
        body += f"```\n\n"
        if is_pro:
            body += (
                f"#### 3. Matriks Kepatuhan Spesifikasi Teknis (Compliance Sheet Tender)\n\n"
                f"{comp_table}\n\n"
                f"#### 4. Analisis Mendalam Redundansi Arsitektur, Mitigasi Risiko & Protokol SAT (Mode Pro)\n"
                f"- **Mitigasi Intermodulasi & Isolasi RF:** Wajib menggunakan Cavity Bandpass Duplexer `DSGQ400C.RI` / `QPD-450D` (**Isolasi TX-RX ≥ 85–90 dB**) serta `BCFH400x.RI` Combiner + `PDJF400x.M` Multiplexer pada sistem multi-repeater untuk mencegah desensitisasi receiver.\n"
                f"- **Keseimbangan Distribusi Daya RFoF DAS:** Gunakan `CP400R.M` Directional Coupler (6–15 dB) untuk titik antena yang dekat dengan `DORU400CH.RI` dan `PD400R.M` Power Splitter di ujung jalur agar daya input setiap antena indoor `ANTI400R.M` merata pada rentang ideal **+10 s/d +15 dBm**.\n"
                f"- **Standar Uji Terima Lapangan (FAT/SAT):** Setiap titik antena wajib lulus pengukuran **VSWR ≤ 1.50 : 1** (Return Loss ≥ 14.0 dB), **Daya TX ≥ +8.0 dBm**, **RSSI Indoor ≥ -85 dBm** pada ≥95% area kerja, serta resistansi grounding proteksi petir **< 5.0 Ohm**.\n\n"
                f"#### 5. Estimasi Komersial Master Pricelist (BoQ)\n"
            )
        else:
            body += f"#### 3. Estimasi Komersial Cepat Master Pricelist (BoQ)\n"

        body += (
            f"- **Paket Infrastruktur Repeater & Fiber DAS:** `{fmt_idr(est_infra_idr)}`\n"
            f"- **Perangkat Radio Pengguna ({users} Unit):** `{fmt_idr(est_terms_idr)}`\n"
            f"- **Jasa Implementasi Engineering (WES):** `{fmt_idr(est_svc_idr)}` (~{est_mandays} Mandays: FAT, SAT, Duplexer Tuning, Grounding < 5 Ohm)\n"
            f"- **Estimasi Grand Total (Termasuk PPN 11%):** **`{fmt_idr(est_grand_total)}`**\n"
        )

    # Attach interactive missing parameter questions if needed
    missing_q = extracted.get("missing_questions", [])
    if missing_q:
        body += (
            f"\n#### 💬 Sesi Klarifikasi Teknis Lanjutan (Proactive Missing Parameters)\n"
            f"Untuk menyempurnakan kalkulasi menuju dokumen final tender, mohon konfirmasi beberapa poin berikut:\n"
        )
        for idx, q in enumerate(missing_q):
            body += f"{idx + 1}. **{q}**\n"

    # Attach citations from Internal Bank Knowledge (Title & Category only — NO external links)
    if citations:
        body += (
            f"\n#### 📚 Referensi Bank Knowledge Terverifikasi (Internal PT Citra Data Purnama Karya)\n"
        )
        for c in citations[:3]:
            body += f"- 📄 **{c['title']}** (`{c.get('folder', 'Knowledge Base')}`)\n"

    return {
        "status": "ok",
        "model": model_id,
        "model_name": ALLOWED_MODELS[model_id]["name"],
        "engine_mode": "hybrid_expert_with_rag",
        "reply": body,
        "extracted_params": extracted,
        "citations": citations,
        "summary_metrics": {
            "topology": topo,
            "sites": est_sites,
            "channels": channels,
            "outdoor_repeaters": total_outdoor_rpt,
            "das_repeaters": das_nodes,
            "fmtcs_das_sizing": das_sizing,
            "ht_model": ht_model,
            "ht_qty": ht_qty,
            "mobile_qty": mob_qty,
            "mandays": est_mandays,
            "link_budget": lb,
            "solar_sizing": solar_sizing,
            "estimated_grand_total_idr": est_grand_total
        }
    }


# ─────────────────────────────────────────────────────────────────────────────
# 7. AI COPILOT QUERY ENTRYPOINT WITH GEMINI REASONING ENGINE
# ─────────────────────────────────────────────────────────────────────────────

def query_ai_copilot(
    model_id: str,
    prompt: str,
    lang: str = "id",
    current_state: Optional[Dict[str, Any]] = None,
    knowledge: Optional[Dict[str, Any]] = None,
    api_key_override: Optional[str] = None
) -> Dict[str, Any]:
    """
    Execute AI Copilot query:
    1. Reads Markdown knowledge base FIRST (enforcing user rule).
    2. Deterministically extracts project parameters for 1-click Auto-Fill.
    3. Runs RF Link budget, ATEX safety checks, Solar PV sizing, and FMTCS Fiber DAS sizing.
    4. Uses Gemini API (gemini-3.8-flash / gemini-3.8-pro) with Senior Solutions Architect prompt.
    5. Falls back gracefully to local expert engine with full proposal formatting.
    """
    if model_id not in ALLOWED_MODELS:
        model_id = "gemini-3.8-flash"

    current_state = current_state or {}
    knowledge = knowledge or {}
    extracted = extract_params_from_prompt(prompt, current_state)

    # Search local Markdown Knowledge Base
    rag_context, citations = build_rag_context_for_prompt(prompt)

    # Build local expert response with RAG citations
    expert_res = build_local_expert_response(
        model_id=model_id,
        lang=lang,
        prompt=prompt,
        current_state=current_state,
        extracted=extracted,
        knowledge=knowledge,
        citations=citations
    )

    # Security Policy (AGENTS.md): Only use server-side environment credentials; ignore client-supplied API keys
    api_key = (os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY") or "").strip()
    if not api_key:
        return expert_res

    # Prepare Gemini Live Call with High-Level Senior Solutions Architect Persona
    sys_instruction = (
        f"You are the Lead Senior RF Telecom & Critical Communications Solutions Architect at PT Citra Data Purnama Karya (Motorola Solutions Platinum Channel Partner, i.safe MOBILE Partner, & FMTCS Fiber DAS Systems Integrator in Indonesia). "
        f"Active Model: {ALLOWED_MODELS[model_id]['name']} ({model_id}). "
        f"Language: {'English' if lang == 'en' else 'Indonesian'}. "
        f"\n=== ARCHITECTURAL & ENGINEERING DIRECTIVES ===\n"
        f"1. HARDWARE STANDARDS: Always use 'MOTOTRBO SLR 5300' for 50W continuous DMR repeaters, 'MOTOTRBO SLR 1000' for compact outdoor/small-site coverage, and QPD-Series / FMTCS DSGQ400C.RI duplexers (≥85-90 dB RX-TX isolation).\n"
        f"2. FMTCS FIBER DAS (RFoF IN-BUILDING): For multi-floor buildings, basements, tunnels, malls, hospitals, or data centers (like MY03/DayOne), design a complete FMTCS Fiber DAS system using Digital OMU ('FMTCS-LRFN DOMU400C.RI', up to 32 ORUs, 20km Star/Cascade/Ring) or Analog OMU ('FMTCS-LRFN AOMU400C.RI', up to 4 ORUs, 8km), paired with Digital/Analog ORU ('FMTCS-LRFF DORU400CH.RI' / 'AORU400CH.RI', 40 dBm / 10W output, IP65), Signal Splitters ('FMTCS-LRF/S UDSS400C.M'), Combiners ('FMTCS-CFH BCFH400x.RI'), Multiplexers ('FMTCS-DJF PDJF400x.M'), Power Splitters ('PD400R.M'), Directional Couplers ('CP400R.M'), and Indoor Ceiling Antennas ('ANTI400R.M', 3 dBi, target antenna input +10 to +15 dBm, VSWR ≤ 1.5).\n"
        f"3. CRITICAL SAFETY (ATEX / IECEx): For hazardous facilities (refinery, oil & gas, petrochemical, coal bunker, grain silo), enforce ZERO TOLERANCE: strictly recommend i.safe MOBILE IS540.1, IS940.1, or Motorola XiR P8600 Ex for Zone 1/21; and IS540.2 or MOTOTRBO R7 TIA-4950 UL for Zone 2/22. Strictly prohibit non-ATEX radios.\n"
        f"4. RF PROPAGATION & LINK BUDGET: Provide rigorous link budget analysis including Free Space Path Loss (FSPL), Okumura-Hata loss, Receiver Sensitivity (-118 dBm), Fade Margin (target ≥ 15 dB for commercial, ≥ 20 dB for mission-critical), and DAS RFoF chain losses.\n"
        f"5. GREEN POWER & OFF-GRID: If solar/off-grid is mentioned, calculate daily Wh load, Solar PV Watt-peak, and LiFePO4 battery bank with 3 days of autonomy.\n"
        f"6. HYBRID CONVERGENCE & POC: For broadband or LTE/5G integration, design Motorola WAVE PTX RoIP gateways and SmartPTT Enterprise dispatch console.\n"
        f"7. TENDER PROPOSAL STRUCTURE: Format responses with Executive Summary, Operational Topology, Link Budget Table, Specification Compliance Matrix (Compliance Sheet with COMPLY status), BoQ Pricing, and Engineering Implementation Plan (FAT/SAT, grounding < 5 Ohm, duplexer tuning, DAS VSWR & RSSI commissioning).\n"
        f"8. PROACTIVE INTERVIEW: If the user's requirements lack critical sizing details, formulate 2-3 focused clarification questions.\n"
        f"9. CITATIONS (STRICT ZERO-LINK POLICY): Reference the pre-calculated engineering metrics: {json.dumps(expert_res['summary_metrics'])}. "
        f"Mention verified document titles by name only from the Citradata Knowledge Bank below. NEVER output any URLs, Google Drive links, or clickable hyperlinks.\n\n"
        f"{rag_context}"
    )

    candidate_models = [model_id, "gemini-2.5-flash" if "flash" in model_id else "gemini-2.5-pro"]
    for cand in candidate_models:
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{cand}:generateContent?key={urllib.parse.quote(api_key)}"
            payload = {
                "systemInstruction": {"parts": [{"text": sys_instruction}]},
                "contents": [{"role": "user", "parts": [{"text": prompt}]}],
                "generationConfig": {
                    "temperature": 0.2 if "flash" in model_id else 0.35,
                    "maxOutputTokens": 2048
                }
            }
            req = urllib.request.Request(
                url,
                data=json.dumps(payload).encode("utf-8"),
                method="POST",
                headers={"Content-Type": "application/json"}
            )
            with urllib.request.urlopen(req, timeout=25) as resp:
                data = json.loads(resp.read().decode("utf-8"))
            candidates = data.get("candidates", [])
            if candidates:
                parts = candidates[0].get("content", {}).get("parts", [])
                text = "".join(p.get("text", "") for p in parts).strip()
                if text:
                    expert_res["reply"] = text
                    expert_res["engine_mode"] = f"google_genai_live ({cand})"
                    expert_res["citations"] = citations
                    return expert_res
        except Exception as e:
            logger.info(f"Gemini API call for {cand} skipped/fallback: {e}")

    return expert_res
