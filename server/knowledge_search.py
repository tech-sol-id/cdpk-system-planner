#!/usr/bin/env python3
"""
Knowledge Search & Retrieval Engine (RAG) for CDPK AI Copilot.
Enforces the mandatory rule:
"AI prioritas baca file teks markdown dulu dan cari referensi gambar di file asli."

Reads all generated Markdown documents from `data/knowledge_base/`,
indexes sections & metadata, and retrieves top matching citations with
original Google Drive URLs for schematics, block diagrams, and physical photos.
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
                    "text": s_clean[:2500]
                })

        return {
            "file_path": file_path,
            "filename": os.path.basename(file_path),
            "title": title,
            "view_url": view_url,
            "file_id": file_id,
            "folder_path": folder_path,
            "full_text": body,
            "sections": sections
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


def search_knowledge_base(query: str, top_k: int = 5) -> List[Dict[str, Any]]:
    """
    Search markdown documents by relevance to the query.
    Extracts high-value excerpts with original Drive links.
    """
    docs = refresh_knowledge_cache()
    if not docs or not query:
        return []

    q_low = query.lower()
    # Extract keywords
    tokens = [t for t in re.findall(r"\w+", q_low) if len(t) > 2]
    # Filter common stopwords
    stopwords = {"dan", "atau", "yang", "untuk", "dengan", "dari", "pada", "ini", "itu", "ada", "saya", "mau", "proyek", "the", "and", "for", "with"}
    search_tokens = [t for t in tokens if t not in stopwords]

    results = []
    for doc in docs:
        score = 0.0
        doc_text_low = doc["full_text"].lower()
        title_low = doc["title"].lower()

        # Exact query match boost
        if q_low in title_low:
            score += 50.0
        elif q_low in doc_text_low:
            score += 25.0

        # Token matches
        for tk in search_tokens:
            if tk in title_low:
                score += 15.0
            t_count = doc_text_low.count(tk)
            if t_count > 0:
                score += min(20.0, t_count * 2.0)

        # Domain term boosts
        if any(term in q_low for term in ["atex", "iecex", "zone", "hazard", "explosion"]):
            if "atex" in title_low or "explosion" in title_low or "hazard" in title_low:
                score += 15.0
        if any(term in q_low for term in ["is540", "is940", "is440", "isafe", "i.safe"]):
            if "is540" in title_low or "is940" in title_low or "safe" in title_low:
                score += 20.0
        if any(term in q_low for term in ["point to point", "p2p", "backhaul"]):
            if "point to point" in doc_text_low or "p2p" in doc_text_low or "link" in doc_text_low:
                score += 15.0

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
                "score": score,
                "snippet": best_snippet[:1500]
            })

    results.sort(key=lambda x: x["score"], reverse=True)
    return results[:top_k]


def build_rag_context_for_prompt(prompt: str) -> Tuple[str, List[Dict[str, Any]]]:
    """
    Build structured knowledge context ready for injection into Gemini or Local Expert,
    enforcing prior reading of Markdown text and linking to original files for images.
    """
    matches = search_knowledge_base(prompt, top_k=4)
    if not matches:
        return "", []

    context_lines = [
        "═════════════════════════════════════════════════════════════════════",
        "PRIORITIZED CITRADATA KNOWLEDGE BANK (EXTRACTED FROM DRIVE MARKDOWN):",
        "Rule: Prioritize these verified facts over generic assumptions.",
        "Rule: Provide the [View Original File in Drive] links for visual schematics / images.",
        "═════════════════════════════════════════════════════════════════════"
    ]

    citations = []
    for idx, m in enumerate(matches):
        context_lines.append(f"\n[Source Document #{idx + 1}: {m['title']}]")
        context_lines.append(f"Google Drive Link: {m['view_url']}")
        context_lines.append(f"Folder: {m['folder_path']}")
        context_lines.append("Content Excerpt:")
        context_lines.append(m["snippet"])
        context_lines.append("-" * 50)
        citations.append({
            "title": m["title"],
            "url": m["view_url"],
            "folder": m["folder_path"]
        })

    return "\n".join(context_lines), citations
