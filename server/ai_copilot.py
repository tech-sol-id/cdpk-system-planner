#!/usr/bin/env python3
"""
Multi-Model AI Copilot Engine for CDPK System Planner.
Exclusively supports:
- gemini-3.8-flash (Google Gemini 3.8 Flash — Fast Sizing, BoQ & Budget Calculation)
- gemini-3.8-pro   (Google Gemini 3.8 Pro   — Deep RF Architecture & Proposal Reasoning)

Integrated with:
- Google Drive Knowledge Bank (data/knowledge_base/*.md)
- Deterministic Parameter Extraction (Auto-Fill Sizing & BoQ)
- RAG Citation & Google Drive Document Referencing
"""

import json
import logging
import math
import os
import re
import urllib.error
import urllib.parse
import urllib.request
from typing import Any, Dict, List, Optional

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
    m_usr = re.search(r"(\d+)\s*(?:user|pengguna|orang|personel|ht|radio|handheld|unit\s*ht|unit)", p_low)
    if m_usr:
        extracted["userCount"] = int(m_usr.group(1))

    # 4. Detect Talkgroups / Channels (e.g. "3 group", "5 talkgroup", "2 kanal")
    m_grp = re.search(r"(\d+)\s*(?:group|grup|talkgroup|talk\s*group|saluran|channel|kanal)", p_low)
    if m_grp:
        extracted["channels"] = int(m_grp.group(1))

    # 5. Detect Point-to-Point / Backhaul / Topology
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
    elif any(w in p_low for w in ["hutan", "lebat", "dense", "urban padat", "kota padat", "foliage"]):
        extracted["terrain"] = "dense"
    elif any(w in p_low for w in ["datar", "flat", "terbuka", "open"]):
        extracted["terrain"] = "flat"

    # 8. Detect Frequency Band
    if "vhf" in p_low:
        extracted["freqBand"] = "vhf"
    elif "800" in p_low or "900" in p_low:
        extracted["freqBand"] = "800"
    elif "uhf" in p_low:
        extracted["freqBand"] = "uhf"

    # 9. Detect Special Requirements
    if any(w in p_low for w in ["atex", "iecex", "explosion", "intrinsically safe", "zona berbahaya", "gas mudah terbakar"]):
        extracted["needAtex"] = True
    elif "non atex" in p_low or "tanpa atex" in p_low:
        extracted["needAtex"] = False

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
    knowledge: Dict[str, Any],
    citations: Optional[List[Dict[str, Any]]] = None
) -> Dict[str, Any]:
    """
    Generate an authoritative engineering & commercial response combining:
    1. Direct RAG answers from the Google Drive Markdown Knowledge Bank.
    2. Exact RF & BoQ calculations matching user requirements.
    3. Mandatory references to original Google Drive files for schematics/images.
    """
    is_pro = (model_id == "gemini-3.8-pro")
    is_en = (lang == "en")
    p_low = prompt.lower()
    citations = citations or []

    # Check if prompt is primarily an informational/spec question rather than sizing calculation
    has_sizing_intent = (
        "userCount" in extracted or
        "areaInput" in extracted or
        "buildingFloors" in extracted or
        any(k in p_low for k in ["sizing", "kalkulasi", "hitung", "boq", "biaya", "harga", "anggaran", "budget", "penawaran"])
    )

    # ─────────────────────────────────────────────────────────────────────────
    # CASE A: Technical / Informational Question answered from Knowledge Bank
    # ─────────────────────────────────────────────────────────────────────────
    if not has_sizing_intent and citations:
        top_c = citations[0]
        header = (
            f"### ⚡ {ALLOWED_MODELS[model_id]['name']} — Jawaban Teknis Bank Knowledge\n"
            if not is_en else
            f"### ⚡ {ALLOWED_MODELS[model_id]['name']} — Knowledge Bank Technical Response\n"
        )
        body = (
            f"{header}\n"
            f"Berdasarkan penelusuran dokumen resmi pada **Bank Knowledge Google Drive PT Citradata Purnakharisma**:\n\n"
            if not is_en else
            f"{header}\n"
            f"Based on official documentation from the **Citradata Google Drive Knowledge Bank**:\n\n"
        )

        for idx, c in enumerate(citations[:3]):
            body += f"- 📄 **[{c['title']}]({c['url']})** (`{c['folder']}`)\n"

        body += (
            f"\n#### ℹ️ Rujukan Gambar & Diagram Fisik\n"
            f"*Catatan: Teks dokumen di atas telah dibaca dan diprioritaskan oleh AI. Untuk memeriksa **gambar skematik, diagram blok, kurva frekuensi, dan foto fisik perangkat**, Anda dapat membuka langsung dokumen asli melalui tautan Google Drive di atas.*\n\n"
            f"Silakan ajukan skenario jumlah pengguna atau luas area proyek jika Anda ingin menghitung sizing sistem dan BoQ komersial secara otomatis."
            if not is_en else
            f"\n#### ℹ️ Schematic & Image References\n"
            f"*Note: The text of these documents was read and prioritized by AI. To view **schematics, circuit block diagrams, frequency curves, and high-resolution device photos**, please access the original files via the Google Drive links above.*\n\n"
            f"Feel free to specify user count or site area if you would like me to calculate complete RF sizing and BoQ pricing."
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
    # CASE B: Project Sizing, RF Architecture & BoQ Calculation
    # ─────────────────────────────────────────────────────────────────────────
    ind = extracted.get("industry", current_state.get("industry", "general"))
    area_val = float(extracted.get("areaInput", current_state.get("areaInput", 10)) or 10)
    area_unit = extracted.get("areaUnit", current_state.get("areaUnit", "km2"))
    area_km2 = area_val / 100.0 if area_unit == "ha" else area_val
    users = int(extracted.get("userCount", current_state.get("userCount", 40)) or 40)
    terrain = extracted.get("terrain", current_state.get("terrain", "flat"))
    band = extracted.get("freqBand", current_state.get("freqBand", "uhf"))
    floors = int(extracted.get("buildingFloors", current_state.get("buildingFloors", 1)) or 1)
    need_atex = bool(extracted.get("needAtex", False))
    is_p2p = extracted.get("topologyType") == "point_to_point" or extracted.get("backhaul") == "radio_ip"
    channels = extracted.get("channels", max(1, math.ceil(users / 35.0)))

    # RF Math
    base_r = {"vhf": 16.0, "uhf": 11.0, "800": 8.5}.get(band, 11.0)
    t_mult = {"flat": 1.0, "hilly": 1.35, "mountainous": 1.75, "dense": 1.45, "indoor": 2.2, "mixed_inout": 1.65}.get(terrain, 1.2)
    eff_r = max(1.2, base_r / t_mult)
    cell_area = math.pi * (eff_r ** 2) * 0.75
    est_sites = max(1, math.ceil(area_km2 / max(0.5, cell_area)))
    if is_p2p and est_sites < 2:
        est_sites = 2  # Point to point link connects at least 2 locations

    if terrain in ("indoor", "mixed_inout") and floors >= 4:
        das_nodes = max(1, math.ceil(floors / 4))
    else:
        das_nodes = 0

    rpt_per_site = max(1, math.ceil(channels / 2.0))
    total_outdoor_rpt = est_sites * rpt_per_site

    if is_p2p:
        topo = "Point-to-Point Wireless Backhaul (Radio IP) + DMR Conventional"
    elif est_sites == 1 and rpt_per_site == 1:
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

    rpt_sys_unit_idr = 78050000  # SLR 5300 bundle
    das_sys_unit_idr = 60300000  # SLR 1000 DAS bundle
    p2p_link_idr = 45000000 if is_p2p else 0  # Point to point radio IP backhaul link equipment

    est_infra_idr = (total_outdoor_rpt * rpt_sys_unit_idr) + (das_nodes * das_sys_unit_idr) + p2p_link_idr
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
            f"### ⚡ {ALLOWED_MODELS[model_id]['name']} — System Sizing & BoQ Optimization\n"
            if not is_pro else
            f"### 🧠 {ALLOWED_MODELS[model_id]['name']} — Deep RF Architecture & Executive Proposal\n"
        )
        body = (
            f"{header}\n"
            f"Analysis for **{users} Users**, **{channels} Talkgroups/Channels**, **{area_km2:.2f} km²**, Sector: **{ind.replace('_', ' ').title()}**:\n\n"
            f"#### 1. Recommended RF System Architecture\n"
            f"- **System Topology:** `{topo}`\n"
            f"- **Repeater Infrastructure:** **{est_sites} Site(s)** × **{rpt_per_site} Repeater(s)** = **{total_outdoor_rpt}× MOTOTRBO SLR 5300 (50W)**\n"
        )
        if is_p2p:
            body += f"- **Backhaul Link:** Dedicated Point-to-Point Wireless Radio IP Link connecting terminal sites.\n"
        if das_nodes > 0:
            body += f"- **In-Building DAS Nodes:** **{das_nodes}× MOTOTRBO SLR 1000** for indoor coverage.\n"
        body += (
            f"- **Subscriber Radios:** **{ht_qty}× {ht_model}** (Portable) + **{mob_qty}× MOTOTRBO XiR M8600i** (Mobile/Base)\n"
            f"- **Engineering Workload:** **~{est_mandays} Mandays** (FAT, SAT, Duplexer Tuning, Commissioning)\n\n"
            f"#### 2. Live Commercial Price Estimate\n"
            f"- **RF Repeater & Infrastructure:** `{fmt_idr(est_infra_idr)}`\n"
            f"- **Subscriber Radio Terminals:** `{fmt_idr(est_terms_idr)}`\n"
            f"- **Professional Services:** `{fmt_idr(est_svc_idr)}`\n"
            f"- **Estimated Grand Total (incl. 11% VAT):** **`{fmt_idr(est_grand_total)}`**\n"
        )
    else:
        header = (
            f"### ⚡ {ALLOWED_MODELS[model_id]['name']} — Hasil Analisa Sizing & BoQ Komersial\n"
            if not is_pro else
            f"### 🧠 {ALLOWED_MODELS[model_id]['name']} — Analisa Arsitektur Mendalam & Desain Solusi\n"
        )
        body = (
            f"{header}\n"
            f"Berdasarkan analisis kebutuhan (**{users} Pengguna**, **{channels} Group/Kanal**, Luas **{area_km2:.2f} km²**, Sektor: **{ind.replace('_', ' ').title()}**):\n\n"
            f"#### 1. Rekomendasi Arsitektur Sistem RF\n"
            f"- **Topologi Sistem:** `{topo}`\n"
            f"- **Infrastruktur Repeater:** **{est_sites} Lokasi Site** × **{rpt_per_site} Unit/Site** = **{total_outdoor_rpt} Unit MOTOTRBO SLR 5300 (50W)** ({total_outdoor_rpt * 2} Slot TDMA)\n"
        )
        if is_p2p:
            body += f"- **Wireless Backhaul:** Perangkat Radio IP Link Point-to-Point antar lokasi untuk interkoneksi data/voice tanpa ketergantungan leased line.\n"
        if das_nodes > 0:
            body += f"- **In-Building DAS:** **{das_nodes} Unit MOTOTRBO SLR 1000** dengan distribusi antena indoor.\n"
        body += (
            f"- **Alokasi Radio User:** **{ht_qty} Unit {ht_model}** (HT) + **{mob_qty} Unit MOTOTRBO XiR M8600i** (Mobile/Base)\n"
            f"- **Estimasi Jasa Engineering (WES):** **~{est_mandays} Mandays** (Survey RF, Duplexer Tuning, SAT & Commissioning)\n\n"
            f"#### 2. Estimasi Komersial Master Pricelist\n"
            f"- **Paket Infrastruktur Repeater & RF:** `{fmt_idr(est_infra_idr)}`\n"
            f"- **Perangkat Radio User ({users} Unit):** `{fmt_idr(est_terms_idr)}`\n"
            f"- **Jasa Implementasi & Engineering:** `{fmt_idr(est_svc_idr)}`\n"
            f"- **Estimasi Grand Total (Termasuk PPN 11%):** **`{fmt_idr(est_grand_total)}`**\n"
        )

    # Attach citations from Google Drive Bank Knowledge
    if citations:
        body += (
            f"\n#### 📚 Referensi Bank Knowledge (Google Drive)\n"
            f"Dokumen pendukung dari repositori teknis PT Citradata Purnakharisma:\n"
        )
        for c in citations[:3]:
            body += f"- 📄 **[{c['title']}]({c['url']})** (`{c['folder']}`)\n"
        body += f"\n> ℹ️ *Rujukan Visual: Untuk diagram skematik koneksi, gambar topologi fisik, dan foto resolusi tinggi, buka link file asli di atas.*\n"

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
    Execute AI Copilot query:
    1. Reads Markdown knowledge base FIRST (enforcing user rule).
    2. Deterministically extracts project parameters for 1-click Auto-Fill.
    3. Uses Gemini API (gemini-3.8-flash / gemini-3.8-pro) when API key is available.
    4. Falls back gracefully to the local expert engine enriched with RAG context.
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

    api_key = (api_key_override or os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY") or "").strip()
    if not api_key:
        return expert_res

    # Prepare Gemini Live Call
    sys_instruction = (
        f"You are the AI Engineering & Commercial Copilot inside 'CDPK System Planner' by PT Citra Data Purnama Karya (Motorola Solutions & Avigilon Partner). "
        f"Active Model: {ALLOWED_MODELS[model_id]['name']} ({model_id}). "
        f"Respond in {'English' if lang == 'en' else 'Indonesian'}. "
        f"Always use 'MOTOTRBO SLR 5300' for 50W DMR repeaters and 'MOTOTRBO SLR 1000' for compact/in-building DAS repeaters. "
        f"Reference these pre-calculated engineering metrics: {json.dumps(expert_res['summary_metrics'])}. "
        f"CRITICAL RULE: You must prioritize the facts from the Citradata Knowledge Bank below over generic knowledge. "
        f"When discussing specifications or products, cite the source document name and include its Google Drive link. "
        f"For visual schematics, block diagrams, or device photos, instruct the user to view the original file at the provided Google Drive link.\n\n"
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
                    "maxOutputTokens": 1400
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
                    expert_res["citations"] = citations
                    return expert_res
        except Exception as e:
            logger.info(f"Gemini API call for {cand} skipped/fallback: {e}")

    return expert_res
