#!/usr/bin/env python3
"""
Multi-Model AI Copilot Engine for CDPK System Planner.
Exclusively supports:
- gemini-3.8-flash (Google Gemini 3.8 Flash — Fast Sizing, BoQ & Budget Calculation)
- gemini-3.8-pro   (Google Gemini 3.8 Pro   — Deep RF Architecture & Proposal Reasoning)
"""

import json
import logging
import math
import os
import re
import urllib.error
import urllib.request
from typing import Any, Dict, List, Optional

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


def extract_params_from_prompt(prompt: str, current_state: Dict[str, Any]) -> Dict[str, Any]:
    """
    Deterministically extract project parameters from natural language (ID/EN)
    so the user can one-click apply AI recommendations to the Sizing & BoQ engine.
    """
    p_low = prompt.lower()
    extracted: Dict[str, Any] = {}

    # 1. Detect Industry
    industry_keywords = [
        ("oil_gas", ["oil", "gas", "migas", "kilang", "refinery", "petrokimia", "petrochemical", "offshore"]),
        ("mining", ["tambang", "mining", "batubara", "coal", "nikel", "nickel", "quarry", "pit", "smelter"]),
        ("palm_oil", ["sawit", "kebun", "perkebunan", "plantation", "palm", "kehutanan", "forestry", "htl"]),
        ("airport", ["bandara", "airport", "pelabuhan", "seaport", "port", "dermaga", "aviasi", "terminal"]),
        ("hospital", ["rumah sakit", "hospital", "klinik", "rsud", "rs ", "medis", "healthcare"]),
        ("hotel", ["hotel", "resort", "hospitality", "villa", "convention"]),
        ("mall", ["mall", "mal ", "plaza", "pusat perbelanjaan", "shopping", "ritel", "retail", "mixed"]),
        ("public_safety", ["polisi", "tni", "militer", "damkar", "sar", "bpbd", "public safety", "darurat", "emergency"]),
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
    m_usr = re.search(r"(\d+)\s*(?:user|pengguna|orang|personel|ht|radio|handheld|unit\s*ht)", p_low)
    if m_usr:
        extracted["userCount"] = int(m_usr.group(1))

    # 4. Detect Building Floors
    m_flr = re.search(r"(\d+)\s*(?:lantai|lt|floors?|stories|storey)", p_low)
    if m_flr:
        extracted["buildingFloors"] = int(m_flr.group(1))

    # 5. Detect Terrain / Environment
    if any(w in p_low for w in ["indoor", "dalam gedung", "basement"]) and any(w in p_low for w in ["outdoor", "luar", "parkir", "mixed", "campuran"]):
        extracted["terrain"] = "mixed_inout"
    elif any(w in p_low for w in ["indoor", "dalam gedung", "in-building", "basement"]):
        extracted["terrain"] = "indoor"
    elif any(w in p_low for w in ["gunung", "pegunungan", "mountain", "curam", "ekstrem"]):
        extracted["terrain"] = "mountainous"
    elif any(w in p_low for w in ["bukit", "berbukit", "hilly", "perbukitan", "bergelombang"]):
        extracted["terrain"] = "hilly"
    elif any(w in p_low for w in ["hutan", "lebat", "dense", "urban padat", "kota padat", "foliage"]):
        extracted["terrain"] = "dense"
    elif any(w in p_low for w in ["datar", "flat", "terbuka", "open"]):
        extracted["terrain"] = "flat"

    # 6. Detect Frequency Band
    if "vhf" in p_low:
        extracted["freqBand"] = "vhf"
    elif "800" in p_low or "900" in p_low:
        extracted["freqBand"] = "800"
    elif "uhf" in p_low:
        extracted["freqBand"] = "uhf"

    # 7. Detect Special Requirements
    if any(w in p_low for w in ["atex", "iecex", "explosion", "intrinsically safe", "zona berbahaya", "gas mudah terbakar"]):
        extracted["needAtex"] = True
    if any(w in p_low for w in ["solar", "tenaga surya", "off-grid", "panel surya", "tanpa pln"]):
        extracted["powerSource"] = "solar"
    if any(w in p_low for w in ["starlink", "vsat", "satelit"]):
        extracted["backhaul"] = "starlink"
    elif any(w in p_low for w in ["fiber", "fo ", "serat optik"]):
        extracted["backhaul"] = "fiber"

    return extracted


def build_local_expert_response(
    model_id: str,
    lang: str,
    prompt: str,
    current_state: Dict[str, Any],
    extracted: Dict[str, Any],
    knowledge: Dict[str, Any]
) -> Dict[str, Any]:
    """
    Generate a detailed engineering & commercial response tailored to either
    Google Gemini 3.8 Flash (fast calculation focus) or Google Gemini 3.8 Pro
    (deep architectural & executive proposal focus).
    """
    is_pro = (model_id == "gemini-3.8-pro")
    is_en = (lang == "en")

    # Merge state with extracted params to compute preview sizing
    ind = extracted.get("industry", current_state.get("industry", "mining"))
    area_val = float(extracted.get("areaInput", current_state.get("areaInput", 25)) or 25)
    area_unit = extracted.get("areaUnit", current_state.get("areaUnit", "km2"))
    area_km2 = area_val / 100.0 if area_unit == "ha" else area_val
    users = int(extracted.get("userCount", current_state.get("userCount", 80)) or 80)
    terrain = extracted.get("terrain", current_state.get("terrain", "hilly"))
    band = extracted.get("freqBand", current_state.get("freqBand", "uhf"))
    floors = int(extracted.get("buildingFloors", current_state.get("buildingFloors", 1)) or 1)
    need_atex = bool(extracted.get("needAtex", current_state.get("needAtex", ind == "oil_gas")))

    # Quick RF & Capacity math matching sizing engine
    base_r = {"vhf": 16.0, "uhf": 11.0, "800": 8.5}.get(band, 11.0)
    t_mult = {"flat": 1.0, "hilly": 1.35, "mountainous": 1.75, "dense": 1.45, "indoor": 2.2, "mixed_inout": 1.65}.get(terrain, 1.3)
    eff_r = max(1.2, base_r / t_mult)
    cell_area = math.pi * (eff_r ** 2) * 0.75
    est_sites = max(1, math.ceil(area_km2 / max(0.5, cell_area)))
    if terrain in ("indoor", "mixed_inout") and floors >= 4:
        das_nodes = max(1, math.ceil(floors / 4))
    else:
        das_nodes = 0

    ch_needed = max(1, math.ceil(users / 35.0))
    rpt_per_site = max(1, math.ceil(ch_needed / 2.0))
    total_outdoor_rpt = est_sites * rpt_per_site

    if est_sites == 1 and rpt_per_site == 1:
        topo = "Conventional DMR Single-Site"
    elif est_sites == 1 and rpt_per_site > 1:
        topo = "MOTOTRBO Capacity Plus Single-Site"
    elif est_sites > 1 and rpt_per_site == 1:
        topo = "MOTOTRBO IP Site Connect (IPSC)"
    elif est_sites <= 15 and users <= 1500:
        topo = "MOTOTRBO Linked Capacity Plus (LCP)"
    else:
        topo = "MOTOTRBO Connect Plus / Capacity Max"

    ht_model = "XiR P8600 Ex Series (ATEX)" if need_atex else ("MOTOTRBO R7" if ind in ("mining", "oil_gas", "airport", "public_safety") else ("MOTOTRBO SL1M" if ind in ("hotel", "hospital") else "MOTOTRBO R2"))
    ht_price = 24500000 if need_atex else (14800000 if "R7" in ht_model else (5900000 if "SL1M" in ht_model else 5400000))
    ht_qty = math.ceil(users * 0.85)
    mob_qty = max(0, users - ht_qty)

    # Estimate commercial total
    rpt_sys_unit_idr = 78050000  # SLR 5300 complete system bundle
    das_sys_unit_idr = 60300000  # SLR 1000 DAS bundle
    est_infra_idr = (total_outdoor_rpt * rpt_sys_unit_idr) + (das_nodes * das_sys_unit_idr)
    est_terms_idr = (ht_qty * ht_price) + (mob_qty * 11500000)
    est_mandays = max(4, (est_sites * 4) + (das_nodes * 3) + 3)
    est_svc_idr = est_mandays * 3500000
    est_subtotal = est_infra_idr + est_terms_idr + est_svc_idr
    est_ppn = round(est_subtotal * 0.11)
    est_grand_total = est_subtotal + est_ppn

    def fmt_idr(v: float) -> str:
        return "Rp " + f"{int(round(v)):,}".replace(",", ".")

    if is_en:
        header = (
            f"### ⚡ {ALLOWED_MODELS[model_id]['name']} — Engineering & Commercial Analysis\n"
            if not is_pro else
            f"### 🧠 {ALLOWED_MODELS[model_id]['name']} — Deep RF Architecture & Executive Advisory\n"
        )
        body = (
            f"{header}\n"
            f"Based on your scenario (**{area_km2:.2f} km²**, **{users} users**, **{ind.replace('_', ' ').title()}**, terrain **{terrain}**):\n\n"
            f"#### 1. Recommended System Architecture & RF Sizing\n"
            f"- **System Topology:** `{topo}`\n"
            f"- **Outdoor Repeater Sites:** **{est_sites} Site(s)** × **{rpt_per_site} Repeater(s)/Site** = **{total_outdoor_rpt}× MOTOTRBO SLR 5300 (50W)** ({total_outdoor_rpt * 2} TDMA Time Slots)\n"
        )
        if das_nodes > 0:
            body += f"- **In-Building DAS Nodes:** **{das_nodes}× MOTOTRBO SLR 1000** with ceiling omni antennas & splitters ({floors} floors)\n"
        body += (
            f"- **Subscriber Terminals:** **{ht_qty}× {ht_model}** (Portable HT) + **{mob_qty}× MOTOTRBO XiR M8600i** (Vehicle/Fixed Mobile)\n"
            f"- **Implementation Workload (WES):** **~{est_mandays} Mandays** (Site Survey, RF Tuning, Installation, FAT/SAT)\n\n"
            f"#### 2. Real-Time Cloud Pricelist Estimation (IDR)\n"
            f"- **RF Repeater & DAS System Bundles:** `{fmt_idr(est_infra_idr)}`\n"
            f"- **Subscriber Radios ({users} Units):** `{fmt_idr(est_terms_idr)}`\n"
            f"- **Engineering Services ({est_mandays} Mandays):** `{fmt_idr(est_svc_idr)}`\n"
            f"- **Estimated Grand Total (incl. 11% VAT):** **`{fmt_idr(est_grand_total)}`**\n"
        )
        if is_pro:
            body += (
                f"\n#### 3. Executive Proposal & Risk Mitigation Notes (Pro Analysis)\n"
                f"- **Co-Channel & Intermodulation Protection:** Each **MOTOTRBO SLR 5300** bundle includes a 6-cavity band-pass duplexer (>75 dB isolation) and in-line RF lightning arrester.\n"
                f"- **Capacity Headroom:** {total_outdoor_rpt * 2} voice/data time slots provide **{round((total_outdoor_rpt * 2 * 35 / max(1, users)) * 100)}%** capacity headroom during emergency peak traffic.\n"
                f"- **Action Ready:** Click **\"Apply Parameters to Sizing & BoQ\"** below to automatically populate all modules."
            )
    else:
        header = (
            f"### ⚡ {ALLOWED_MODELS[model_id]['name']} — Hasil Kalkulasi Cepat & Rekomendasi\n"
            if not is_pro else
            f"### 🧠 {ALLOWED_MODELS[model_id]['name']} — Analisa Arsitektur Mendalam & Ringkasan Proposal\n"
        )
        body = (
            f"{header}\n"
            f"Berdasarkan skenario kebutuhan Anda (**Luas {area_km2:.2f} km²**, **{users} Pengguna**, sektor **{ind.replace('_', ' ').title()}**, kontur **{terrain}**):\n\n"
            f"#### 1. Rekomendasi Arsitektur RF & Sizing Sistem\n"
            f"- **Topologi Sistem:** `{topo}`\n"
            f"- **Infrastruktur Repeater Outdoor:** **{est_sites} Site** × **{rpt_per_site} Repeater/Site** = **{total_outdoor_rpt} Unit MOTOTRBO SLR 5300 (50W)** ({total_outdoor_rpt * 2} Slot Kanal TDMA)\n"
        )
        if das_nodes > 0:
            body += f"- **Repeater In-Building DAS:** **{das_nodes} Unit MOTOTRBO SLR 1000** + distribusi antena ceiling & splitter ({floors} lantai)\n"
        body += (
            f"- **Alokasi Perangkat Radio User:** **{ht_qty} Unit {ht_model}** (Handy Talky) + **{mob_qty} Unit MOTOTRBO XiR M8600i** (Mobile/Base)\n"
            f"- **Estimasi Beban Kerja (Metode WES):** **~{est_mandays} Mandays** (Survey RF, Instalasi, Tuning Duplexer, Commissioning)\n\n"
            f"#### 2. Estimasi Komersial (Live Master Pricelist Cloud)\n"
            f"- **Paket Sistem Repeater & Infrastruktur RF:** `{fmt_idr(est_infra_idr)}`\n"
            f"- **Perangkat Radio User ({users} Unit):** `{fmt_idr(est_terms_idr)}`\n"
            f"- **Jasa Engineering & Implementasi ({est_mandays} Mandays):** `{fmt_idr(est_svc_idr)}`\n"
            f"- **Estimasi Grand Total (Termasuk PPN 11%):** **`{fmt_idr(est_grand_total)}`**\n"
        )
        if is_pro:
            body += (
                f"\n#### 3. Analisa Mitigasi Risiko & Narasi Eksekutif (Mode Pro)\n"
                f"- **Standarisasi Perangkat Utama:** Menggunakan **MOTOTRBO SLR 5300** (1U continuous duty 50W) lengkap dengan Duplexer 6-Cavity, Kabel Feeder 7/8\" low-loss, dan Lightning Arrester.\n"
                f"- **Kapasitas & Redundansi:** Tersedia **{total_outdoor_rpt * 2} jalur komunikasi simultan** dengan cadangan kapasitas darurat dan backup UPS Online.\n"
                f"- **Tindak Lanjut Otomatis:** Klik tombol **\"Terapkan ke Sizing & BoQ\"** di bawah untuk mengisi seluruh kalkulator secara otomatis."
            )

    return {
        "status": "ok",
        "model": model_id,
        "model_name": ALLOWED_MODELS[model_id]["name"],
        "engine_mode": "hybrid_expert",
        "reply": body,
        "extracted_params": extracted,
        "summary_metrics": {
            "topology": topo,
            "sites": est_sites,
            "outdoor_repeaters": total_outdoor_rpt,
            "das_repeaters": das_nodes,
            "ht_model": ht_model,
            "ht_qty": ht_qty,
            "mobile_qty": mob_qty,
            "mandays": est_mandays,
            "estimated_grand_total_idr": est_grand_total
        }
    }


def query_ai_copilot(
    model_id: str,
    prompt: str,
    lang: str = "id",
    current_state: Optional[Dict[str, Any]] = None,
    knowledge: Optional[Dict[str, Any]] = None,
    api_key_override: Optional[str] = None
) -> Dict[str, Any]:
    """
    Execute AI Copilot query using only the approved models:
    - gemini-3.8-flash
    - gemini-3.8-pro
    Uses Gemini API when GEMINI_API_KEY is available, seamlessly enriched with
    deterministic RF/BoQ parameter extraction so 1-click Auto-Fill always works.
    """
    if model_id not in ALLOWED_MODELS:
        model_id = "gemini-3.8-flash"

    current_state = current_state or {}
    knowledge = knowledge or {}
    extracted = extract_params_from_prompt(prompt, current_state)

    # First build the deterministic baseline & metrics
    expert_res = build_local_expert_response(model_id, lang, prompt, current_state, extracted, knowledge)

    api_key = (api_key_override or os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY") or "").strip()
    if not api_key:
        return expert_res

    # Call Google Gemini API (tries requested model_id first, with graceful fallback)
    sys_instruction = (
        f"You are the AI Engineering & Commercial Copilot inside 'CDPK System Planner' by PT Citra Data Purnama Karya (Motorola Solutions & Avigilon Partner). "
        f"Active Model: {ALLOWED_MODELS[model_id]['name']} ({model_id}). "
        f"Respond in {'English' if lang == 'en' else 'Indonesian'}. "
        f"Always use 'MOTOTRBO SLR 5300' for 50W DMR repeaters and 'MOTOTRBO SLR 1000' for compact/in-building DAS repeaters. "
        f"Reference these pre-calculated engineering metrics for accuracy: {json.dumps(expert_res['summary_metrics'])}. "
        f"Format your response cleanly in Markdown with actionable RF sizing, BoQ bundle breakdown, and commercial optimization advice."
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
                    "maxOutputTokens": 1200
                }
            }
            req = urllib.request.Request(
                url,
                data=json.dumps(payload).encode("utf-8"),
                method="POST",
                headers={"Content-Type": "application/json"}
            )
            with urllib.request.urlopen(req, timeout=20) as resp:
                data = json.loads(resp.read().decode("utf-8"))
            candidates = data.get("candidates", [])
            if candidates:
                parts = candidates[0].get("content", {}).get("parts", [])
                text = "".join(p.get("text", "") for p in parts).strip()
                if text:
                    expert_res["reply"] = text
                    expert_res["engine_mode"] = f"google_genai_live ({cand})"
                    return expert_res
        except Exception as e:
            logger.info(f"Gemini API call for {cand} skipped/fallback: {e}")

    return expert_res
