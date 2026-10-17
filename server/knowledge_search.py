#!/usr/bin/env python3
"""
Knowledge Search & Retrieval Engine (RAG) for CDPK AI Copilot.
Enforces the mandatory rule:
"AI prioritas baca file teks markdown dulu dan cari referensi gambar di file asli."

Upgraded with:
- Model-Preserving Tokenizer (IS540.1, IS540.2, QPD-150, SLR 5300, etc.)
- Domain Synonym Dictionary & Entity Normalization (TETRA, DMR, PoC, ATEX Zone 1/2)
- Frequency Band Matching (VHF 136-174, UHF 400-470, 350-390 MHz, PoC LTE/5G)
- Tiered Relevance Scoring (Datasheet & Cert boost over generic aggregated catalogs)
- Key Specs Snapshot Extraction (ATEX marking, frequency, Tx power, IP rating)
"""

import glob
import logging
import os
import re
from typing import Any, Dict, List, Optional, Tuple

logger = logging.getLogger("cdpk.knowledge_search")

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOCAL_KB_DIR = os.path.join(BASE_DIR, "data", "knowledge_base")

_DOCUMENT_CACHE: List[Dict[str, Any]] = []
_CACHE_TIMESTAMP = 0


def extract_key_specs_snapshot(text: str, filename: str) -> Dict[str, str]:
    """
    Extract structured hardware and safety specifications from document text
    to generate an authoritative key-specs card for RAG citations.
    """
    snapshot = {}
    f_low = filename.lower()
    t_raw = text[:4000]

    # 1. ATEX / IECEx Marking
    m_atex = re.search(r"(II\s*[123][GD]\s*Ex\s*[\w\(\)]+\s*[\w\(\)]+\s*T[1-6]\s*[\w\(\)]*)", t_raw, re.IGNORECASE)
    if m_atex:
        snapshot["atex_marking"] = m_atex.group(1).strip()
    elif "is540.1" in f_low:
        snapshot["atex_marking"] = "II 2G Ex ib IIC T4 Gb / II 2D Ex ib IIIC T135°C Db"
    elif "is540.2" in f_low:
        snapshot["atex_marking"] = "II 3G Ex ic IIC T4 Gc / II 3D Ex ic IIIC T135°C Dc"
    elif "is940.1" in f_low:
        snapshot["atex_marking"] = "II 2G Ex ib IIC T4 Gb / II 2D Ex ib IIIC T135°C Db"
    elif "is940.2" in f_low:
        snapshot["atex_marking"] = "II 3G Ex ic IIC T4 Gc / II 3D Ex ic IIIC T135°C Dc"
    elif "is440.1" in f_low:
        snapshot["atex_marking"] = "II 2G Ex ib IIC T4 Gb / II 2D Ex ib IIIC T135°C Db"
    elif "is440.2" in f_low:
        snapshot["atex_marking"] = "II 3G Ex ic IIC T4 Gc / II 3D Ex ic IIIC T135°C Dc"
    elif "p8600" in f_low and "ex" in f_low:
        snapshot["atex_marking"] = "ATEX Gas: II 2G Ex ib IIC T4 Gb / Dust: II 2D Ex ib IIIC T130°C Db"

    # 2. Ingress Protection (IP Rating)
    m_ip = re.search(r"\b(IP\s*[56][578])\b", t_raw, re.IGNORECASE)
    if m_ip:
        snapshot["ip_rating"] = m_ip.group(1).upper().replace(" ", "")
    elif any(k in f_low for k in ["is540", "is940", "is440", "r7", "rg170"]):
        snapshot["ip_rating"] = "IP68"
    elif "slr 1000" in f_low or "slr1000" in f_low or "oru" in f_low or "antg" in f_low or "antd" in f_low:
        snapshot["ip_rating"] = "IP65"
    elif "anti400" in f_low or "indoor_antenna" in f_low:
        snapshot["ip_rating"] = "IP53"

    # 3. Frequency Range
    m_freq = re.search(r"(\d{2,3}(?:\.\d+)?\s*(?:~|-|–)\s*\d{2,3}(?:\.\d+)?\s*MHz)", t_raw, re.IGNORECASE)
    if m_freq:
        snapshot["frequency_range"] = m_freq.group(1).strip()
    elif "domu" in f_low or "doru" in f_low or "bcfh" in f_low or "dsgq" in f_low:
        snapshot["frequency_range"] = "410~440 MHz (UHF Digital Fiber DAS)"
    elif "aomu" in f_low:
        snapshot["frequency_range"] = "410~470 MHz (UHF Analog Fiber DAS)"
    elif "udss" in f_low:
        snapshot["frequency_range"] = "350~470 MHz (UL/DL Signal Splitter)"
    elif "anti" in f_low or "antg" in f_low or "antd" in f_low or "pd400" in f_low or "cp400" in f_low:
        snapshot["frequency_range"] = "400~470 MHz (UHF DAS Distribution)"
    elif "qpd-150" in f_low:
        snapshot["frequency_range"] = "136~180 MHz (VHF)"
    elif "qpd-350" in f_low:
        snapshot["frequency_range"] = "350~390 MHz (Public Safety / Government)"
    elif "qpd-450" in f_low:
        snapshot["frequency_range"] = "400~470 MHz (UHF)"
    elif any(k in f_low for k in ["rg170", "wave_ptx", "is540"]):
        snapshot["frequency_range"] = "4G LTE / 5G NR / Wi-Fi / Bluetooth (PoC)"

    # 4. RF Output Power
    m_pwr = re.search(r"(\b\d+\s*-\s*\d+\s*W\b|\b\d+\s*Watt\b|\b\d+\s*W\b\s*(?:Max|output)?)", t_raw, re.IGNORECASE)
    if "slr 5300" in f_low or "slr5300" in f_low:
        snapshot["tx_power"] = "1–50 Watt (100% Continuous Duty)"
    elif "slr 1000" in f_low or "slr1000" in f_low:
        snapshot["tx_power"] = "1–10 Watt (Low-Power Compact DAS)"
    elif "doru" in f_low or "aoru" in f_low or "_oru_" in f_low:
        snapshot["tx_power"] = "40±2 dBm (≈10 Watt DL Output, Gain ≥50 dB)"
    elif "domu" in f_low:
        snapshot["tx_power"] = "Max 32 ORU Optical Master Unit (≤20 km Fiber)"
    elif "aomu" in f_low:
        snapshot["tx_power"] = "Max 4 ORU Optical Master Unit (≤8 km Fiber)"
    elif "r7" in f_low:
        snapshot["tx_power"] = "5 Watt (VHF) / 4 Watt (UHF)"
    elif "r2" in f_low:
        snapshot["tx_power"] = "5 Watt (VHF) / 4 Watt (UHF)"
    elif "qpd" in f_low:
        snapshot["tx_power"] = "50 Watt Continuous Input Power"
    elif m_pwr:
        snapshot["tx_power"] = m_pwr.group(1).strip()

    return snapshot


def parse_markdown_with_frontmatter(file_path: str) -> Optional[Dict[str, Any]]:
    """Parse YAML frontmatter and body sections from a markdown document."""
    try:
        with open(file_path, "r", encoding="utf-8", errors="replace") as f:
            content = f.read()

        meta = {}
        body = content
        if content.startswith("---"):
            parts = content.split("---", 2)
            if len(parts) >= 3:
                raw_fm = parts[1]
                body = parts[2]
                for line in raw_fm.splitlines():
                    if ":" in line:
                        k, v = line.split(":", 1)
                        meta[k.strip()] = v.strip().strip('"').strip("'")

        title = meta.get("title") or os.path.basename(file_path).replace(".md", "").replace("_", " ")
        view_url = meta.get("drive_view_url", "")
        file_id = meta.get("drive_file_id", "")
        folder_path = meta.get("folder_path", "")
        filename = os.path.basename(file_path)

        # Break body into searchable sections
        sections = []
        raw_sections = re.split(r"\n(?=#{1,4}\s+)", body)
        for s in raw_sections:
            s_clean = s.strip()
            if len(s_clean) > 30:
                header_m = re.match(r"^(#{1,4}\s+[^\n]+)", s_clean)
                hdr = header_m.group(1).lstrip("#").strip() if header_m else "Overview"
                sections.append({
                    "header": hdr,
                    "text": s_clean[:3000]
                })

        key_specs = extract_key_specs_snapshot(body, filename)

        return {
            "file_path": file_path,
            "filename": filename,
            "title": title,
            "view_url": view_url,
            "file_id": file_id,
            "folder_path": folder_path,
            "full_text": body,
            "sections": sections,
            "key_specs": key_specs
        }
    except Exception as e:
        logger.warning(f"Error parsing markdown {file_path}: {e}")
        return None


def refresh_knowledge_cache(force: bool = False) -> List[Dict[str, Any]]:
    global _DOCUMENT_CACHE, _CACHE_TIMESTAMP
    now = os.path.getmtime(LOCAL_KB_DIR) if os.path.exists(LOCAL_KB_DIR) else 0
    if not force and _DOCUMENT_CACHE and now <= _CACHE_TIMESTAMP:
        return _DOCUMENT_CACHE

    md_files = glob.glob(os.path.join(LOCAL_KB_DIR, "*.md"))
    docs = []
    for fp in md_files:
        parsed = parse_markdown_with_frontmatter(fp)
        if parsed:
            docs.append(parsed)

    _DOCUMENT_CACHE = docs
    _CACHE_TIMESTAMP = now
    logger.info(f"Refreshed knowledge search index with {len(docs)} Markdown documents.")
    return _DOCUMENT_CACHE


def normalize_query_entities(query: str) -> Tuple[List[str], Dict[str, Any]]:
    """
    Extract exact model codes, frequency bands, and safety zones without
    stripping dots and hyphens.
    """
    q_low = query.lower()
    entities: Dict[str, Any] = {
        "target_models": [],
        "target_zone": None,
        "target_band": None,
        "is_spec_query": False,
        "is_atex_query": False
    }

    # 1. Detect Model Numbers (e.g. IS540.1, IS540.2, IS940.1, IS440.2, QPD-150, RG170, R7, R2, SLR 5300)
    model_patterns = [
        ("is540.1", [r"\bis540[\.\s_-]*1\b", r"\bis\s*540\.1\b"]),
        ("is540.2", [r"\bis540[\.\s_-]*2\b", r"\bis\s*540\.2\b"]),
        ("is940.1", [r"\bis940[\.\s_-]*1\b", r"\bis\s*940\.1\b"]),
        ("is940.2", [r"\bis940[\.\s_-]*2\b", r"\bis\s*940\.2\b"]),
        ("is440.1", [r"\bis440[\.\s_-]*1\b", r"\bis\s*440\.1\b"]),
        ("is440.2", [r"\bis440[\.\s_-]*2\b", r"\bis\s*440\.2\b"]),
        ("qpd-150", [r"\bqpd[\.\s_-]*150\b", r"\bsgq[\.\s_-]*150d?\b"]),
        ("qpd-350d", [r"\bqpd[\.\s_-]*350d?\b", r"\bsgq[\.\s_-]*350d?\b"]),
        ("qpd-450d", [r"\bqpd[\.\s_-]*450d?\b", r"\bsgq[\.\s_-]*450d?\b"]),
        ("slr5300", [r"\bslr[\s_-]*5300\b"]),
        ("slr1000", [r"\bslr[\s_-]*1000\b"]),
        ("r7", [r"\bmototrbo\s*r7\b", r"\br7\b"]),
        ("r2", [r"\bmototrbo\s*r2\b", r"\br2\b"]),
        ("rg170", [r"\brg[\s_-]*170\b"]),
        ("p8600", [r"\bxir[\s_-]*p?8600\b", r"\bp8600\s*ex\b", r"\bp8668\s*ex\b"]),
        ("smartptt", [r"\bsmartptt\b", r"\bdispatch\s*console\b", r"\bvoice\s*recording\b"]),
        ("wave_ptx", [r"\bwave[\s_-]*ptx\b", r"\bpoc\b", r"\bbroadband\s*ptt\b"]),
        ("domu400c", [r"\bdomu[\s_-]*400\w*\b", r"\bomu\s*digital\b", r"\bdigital\s*omu\b"]),
        ("aomu400c", [r"\baomu[\s_-]*400\w*\b", r"\bomu\s*analog\b", r"\banalog\s*omu\b"]),
        ("doru400ch", [r"\bdoru[\s_-]*400\w*\b", r"\boru\s*digital\b", r"\bdigital\s*oru\b"]),
        ("aoru400ch", [r"\baoru[\s_-]*400\w*\b", r"\boru\s*analog\b", r"\banalog\s*oru\b"]),
        ("omu", [r"\bomu\b", r"\boptical\s*master\s*unit\b", r"\blrf[\s/_-]*n\b"]),
        ("oru", [r"\boru\b", r"\boptical\s*remote\s*unit\b", r"\blrf[\s/_-]*f\b"]),
        ("udss400c", [r"\budss[\s_-]*400\w*\b", r"\bsignal\s*splitter\b", r"\blrf[\s/_-]*s\b"]),
        ("bcfh400x", [r"\bbcfh[\s_-]*400\w*\b", r"\bfmtcs[\s_-]*cfh\b", r"\bcombiner\b"]),
        ("pdjf400x", [r"\bpdjf[\s_-]*400\w*\b", r"\bfmtcs[\s_-]*djf\b", r"\bmultiplexer\b"]),
        ("dsgq400c", [r"\bdsgq[\s_-]*400\w*\b", r"\bfmtcs[\s_-]*sgq\b"]),
        ("anti400r", [r"\banti[\s_-]*400\w*\b", r"\bfmtcs[\s_-]*anti\b", r"\bindoor\s*antenna\b", r"\bantena\s*indoor\b"]),
        ("antg400r", [r"\bantg[\s_-]*400\w*\b", r"\bantd[\s_-]*400\w*\b", r"\bfmtcs[\s_-]*ant[gd]\b"]),
        ("fmtcs_das", [r"\bfmtcs\b", r"\brfof\b", r"\bfiber\s*das\b", r"\bdas\b", r"\bcommissioning\b", r"\bvswr\b"])
    ]

    for model_key, patterns in model_patterns:
        if any(re.search(pat, q_low) for pat in patterns):
            entities["target_models"].append(model_key)

    # 2. Detect Explosive Safety Zone
    if re.search(r"\b(?:zone|zona)\s*1\b|\bzone\s*21\b|\bex\s*ib\b", q_low):
        entities["target_zone"] = 1
        entities["is_atex_query"] = True
    elif re.search(r"\b(?:zone|zona)\s*2\b|\bzone\s*22\b|\bex\s*ic\b", q_low):
        entities["target_zone"] = 2
        entities["is_atex_query"] = True
    elif any(k in q_low for k in ["atex", "iecex", "hazard", "explosion", "intrinsically safe", "gas"]):
        entities["is_atex_query"] = True

    # 3. Detect Frequency Band
    if any(k in q_low for k in ["vhf", "136-174", "150 mhz", "150mhz", "150"]):
        entities["target_band"] = "vhf"
    elif any(k in q_low for k in ["uhf", "400-470", "410-440", "450 mhz", "450mhz", "450"]):
        entities["target_band"] = "uhf"
    elif any(k in q_low for k in ["350 mhz", "350mhz", "350-390", "tetra 350"]):
        entities["target_band"] = "350"
    elif any(k in q_low for k in ["800", "900"]):
        entities["target_band"] = "800"
    elif any(k in q_low for k in ["lte", "5g", "poc", "cellular", "seluler"]):
        entities["target_band"] = "lte_poc"

    if any(k in q_low for k in ["spesifikasi", "spec", "datasheet", "brosur", "sertifikat", "marking", "compliance"]):
        entities["is_spec_query"] = True

    # Token extraction preserving hyphen/dots
    raw_tokens = re.findall(r"[a-zA-Z0-9]+(?:[\.\-_][a-zA-Z0-9]+)*", q_low)
    stopwords = {
        "dan", "atau", "yang", "untuk", "dengan", "dari", "pada", "ini", "itu", "ada",
        "saya", "mau", "proyek", "the", "and", "for", "with", "radio", "sistem", "system"
    }
    cleaned_tokens = [t for t in raw_tokens if len(t) >= 2 and t not in stopwords]

    return cleaned_tokens, entities


def search_knowledge_base(query: str, top_k: int = 5) -> List[Dict[str, Any]]:
    """
    Search markdown documents with domain-aware entity normalization,
    tiered relevance boosting, and rich spec snapshot citations.
    """
    docs = refresh_knowledge_cache()
    if not docs or not query:
        return []

    q_low = query.lower()
    search_tokens, entities = normalize_query_entities(query)
    target_models = entities.get("target_models", [])
    target_zone = entities.get("target_zone")
    target_band = entities.get("target_band")
    is_atex = entities.get("is_atex_query", False)
    is_spec = entities.get("is_spec_query", False)

    results = []
    for doc in docs:
        score = 0.0
        doc_text_low = doc["full_text"].lower()
        title_low = doc["title"].lower()
        fname_low = doc["filename"].lower()

        # ─── 1. Exact Target Model Boosting & Penalties ─────────────────────────
        if target_models:
            for tm in target_models:
                # E.g. tm == "is540.1"
                if tm in fname_low or tm in title_low:
                    score += 90.0
                elif tm.replace(".", "") in fname_low or tm.replace(".", "_") in fname_low:
                    score += 80.0
                elif tm in doc_text_low:
                    score += 35.0

                # Negative cross-model penalty (e.g. if looking for IS540.1, penalize IS540.2)
                if tm == "is540.1" and ("is540.2" in fname_low or "is540_2" in fname_low or "is540-2" in fname_low):
                    score -= 75.0
                elif tm == "is540.2" and ("is540.1" in fname_low or "is540_1" in fname_low or "is540-1" in fname_low):
                    score -= 75.0
                elif tm == "is940.1" and ("is940.2" in fname_low or "is940_2" in fname_low):
                    score -= 75.0
                elif tm == "is940.2" and ("is940.1" in fname_low or "is940_1" in fname_low):
                    score -= 75.0
                elif tm == "qpd-150" and ("350" in fname_low or "450" in fname_low):
                    score -= 50.0
                elif tm == "domu400c" and "aomu" in fname_low:
                    score -= 50.0
                elif tm == "aomu400c" and "domu" in fname_low:
                    score -= 50.0
                elif tm == "doru400ch" and "aoru" in fname_low:
                    score -= 50.0
                elif tm == "aoru400ch" and "doru" in fname_low:
                    score -= 50.0
                elif tm == "fmtcs_das" and "fmtcs_das" in fname_low:
                    score += 55.0

        # ─── 2. Hazardous Zone 1 vs Zone 2 Alignment ────────────────────────────
        if target_zone == 1:
            if any(k in fname_low for k in ["is540.1", "is940.1", "is440.1", "p8600", "atex_is540.1", "atex_is940.1"]):
                score += 55.0
            if "zone 1" in doc_text_low or "zone 21" in doc_text_low or "ii 2g" in doc_text_low:
                score += 30.0
            if any(k in fname_low for k in ["is540.2", "is940.2", "is440.2"]):
                score -= 40.0
        elif target_zone == 2:
            if any(k in fname_low for k in ["is540.2", "is940.2", "is440.2", "atex_is540.2", "atex_is940.2"]):
                score += 55.0
            if "zone 2" in doc_text_low or "zone 22" in doc_text_low or "ii 3g" in doc_text_low:
                score += 30.0

        # ─── 3. Frequency Band Alignment ─────────────────────────────────────────
        if target_band == "vhf":
            if "qpd-150" in fname_low or "150" in fname_low:
                score += 45.0
            if "136" in doc_text_low and "174" in doc_text_low:
                score += 25.0
        elif target_band == "uhf":
            if "qpd-450" in fname_low or "450" in fname_low or "fmtcs_das" in fname_low:
                score += 45.0
            if ("400" in doc_text_low and "470" in doc_text_low) or ("410" in doc_text_low and "440" in doc_text_low):
                score += 25.0
        elif target_band == "350":
            if "qpd-350" in fname_low or "350" in fname_low:
                score += 55.0
        elif target_band == "lte_poc":
            if any(k in fname_low for k in ["wave_ptx", "rg170", "is540", "is940"]):
                score += 40.0

        # ─── 4. Document Type Priority (Tiered Boosting) ────────────────────────
        # Specific Datasheets & Certificates are better technical references than 600KB catalogs
        if any(k in fname_low for k in ["datasheet", "brosur", "data-sheet", "atex_", "iecex_", "fmtcs_das_"]):
            score += 15.0
            if is_spec:
                score += 25.0
        elif "katalog" in fname_low:
            # Dampen huge catalog scores so targeted brochures win
            score *= 0.65

        # ─── 5. General Token Matches ───────────────────────────────────────────
        for tk in search_tokens:
            if tk in title_low or tk in fname_low:
                score += 20.0
            count_in_body = doc_text_low.count(tk)
            if count_in_body > 0:
                # Logarithmic/capped saturation
                score += min(25.0, count_in_body * 2.5)

        if score > 0:
            # Find best section snippet
            best_snippet = ""
            best_snippet_score = -1
            for s in doc["sections"]:
                s_low = s["text"].lower()
                s_score = sum(s_low.count(tk) for tk in search_tokens)
                if s_score > best_snippet_score:
                    best_snippet_score = s_score
                    best_snippet = s["text"]

            if not best_snippet:
                best_snippet = doc["full_text"][:1200]

            results.append({
                "title": doc["title"],
                "filename": doc["filename"],
                "view_url": doc["view_url"],
                "file_id": doc["file_id"],
                "folder_path": doc["folder_path"],
                "score": round(score, 1),
                "snippet": best_snippet[:1600],
                "key_specs": doc.get("key_specs", {})
            })

    results.sort(key=lambda x: x["score"], reverse=True)
    return results[:top_k]


def build_rag_context_for_prompt(prompt: str) -> Tuple[str, List[Dict[str, Any]]]:
    """
    Build structured knowledge context ready for injection into Gemini or Local Expert,
    enforcing prior reading of Markdown text while strictly keeping internal Google Drive
    URLs confidential (never exposed in client responses or clickable links).
    """
    matches = search_knowledge_base(prompt, top_k=4)
    if not matches:
        return "", []

    context_lines = [
        "═════════════════════════════════════════════════════════════════════",
        "PRIORITIZED CITRADATA KNOWLEDGE BANK (INTERNAL VERIFIED MARKDOWN):",
        "Rule 1: Prioritize these verified facts over generic assumptions.",
        "Rule 2: Cite the verified document title by name only. NEVER include any URLs or Google Drive links.",
        "Rule 3: Enforce strict safety ratings (ATEX Zone 1 vs Zone 2) as listed below.",
        "═════════════════════════════════════════════════════════════════════"
    ]

    citations = []
    for idx, m in enumerate(matches):
        context_lines.append(f"\n[Source Document #{idx + 1}: {m['title']}]")
        context_lines.append(f"Category / Folder: {m['folder_path']}")

        specs = m.get("key_specs", {})
        if specs:
            specs_summary = []
            if "atex_marking" in specs:
                specs_summary.append(f"ATEX/IECEx: {specs['atex_marking']}")
            if "frequency_range" in specs:
                specs_summary.append(f"Frequency: {specs['frequency_range']}")
            if "tx_power" in specs:
                specs_summary.append(f"Tx Power: {specs['tx_power']}")
            if "ip_rating" in specs:
                specs_summary.append(f"Ingress: {specs['ip_rating']}")
            if specs_summary:
                context_lines.append(f"Verified Hardware Specs: {' | '.join(specs_summary)}")

        context_lines.append("Content Excerpt:")
        context_lines.append(m["snippet"])
        context_lines.append("-" * 50)

        citations.append({
            "title": m["title"],
            "folder": m["folder_path"],
            "key_specs": specs
        })

    return "\n".join(context_lines), citations
