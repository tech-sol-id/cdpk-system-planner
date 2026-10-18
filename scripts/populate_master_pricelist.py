#!/usr/bin/env python3
"""
Populate Master Pricelist & Knowledge Bank for CDPK System Planner.
1. Extracts _LOGO_B64 from legacy/DMSC-I_Toolkit_v7_4.html -> static/js/logo_b64.js
2. Generates data/default_knowledge.json (Bilingual ID/EN, corrected SLR 5300 & SLR 1000)
3. Generates data/Master_Pricelist_CDPK.xlsx (4 sheets: Products_Catalog, System_Bundles, Industry_RF_Params, Commercial_Config)
4. Syncs/Uploads the 4-sheet workbook into Google Sheet 1Kp85v81JXeRC5ti-ZXYBChgrj2ztnnwrCHokI02LX6U in folder 1OB_UaNyd65Ccb3lmdwJuw5raufCwhgbS (drive citradata)
"""

import json
import os
import re
import urllib.parse
import urllib.request
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LEGACY_HTML = os.path.join(BASE_DIR, "legacy", "DMSC-I_Toolkit_v7_4.html")
DATA_DIR = os.path.join(BASE_DIR, "data")
STATIC_JS_DIR = os.path.join(BASE_DIR, "static", "js")

SPREADSHEET_ID = "1Kp85v81JXeRC5ti-ZXYBChgrj2ztnnwrCHokI02LX6U"
FOLDER_ID = "1OB_UaNyd65Ccb3lmdwJuw5raufCwhgbS"
TOKEN_PATH = os.path.expanduser("~/.gemini/antigravity/plugin_data/gdrive/token_adrian@citradata.id.json")

os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(STATIC_JS_DIR, exist_ok=True)

# 1. Extract _LOGO_B64 from legacy HTML
logo_b64 = ""
if os.path.exists(LEGACY_HTML):
    with open(LEGACY_HTML, "r", encoding="utf-8") as f:
        for line in f:
            if "_LOGO_B64:" in line:
                m = re.search(r"_LOGO_B64:\s*'([^']+)'", line)
                if m:
                    logo_b64 = m.group(1)
                    break

with open(os.path.join(STATIC_JS_DIR, "logo_b64.js"), "w", encoding="utf-8") as f:
    f.write(f"// Extracted CitraData Logo Base64\nwindow.CDPK_LOGO_B64 = '{logo_b64}';\n")
print(f"[OK] Extracted logo_b64 ({len(logo_b64)} chars) -> static/js/logo_b64.js")

# 2. Define Complete Bilingual Catalog (30 Core Catalog Products + 15 Infrastructure/License BOM Sub-items)
PRODUCTS_CATALOG = [
    # ─── HANDY TALKY (7) ─────────────────────────────────────────────────────
    {
        "sku": "MOT-HT-TLK100",
        "cat": "Handy Talky",
        "series": "LTE Nationwide PTT",
        "model": "Motorola TLK 100",
        "unit": "Unit",
        "price_idr": 6800000,
        "price_usd": 420,
        "desc_id": "Radio PTT berbasis jaringan LTE nationwide. Cakupan seluas jaringan seluler tanpa batasan site. Layar warna, GPS terintegrasi, tahan air IPx4.",
        "desc_en": "Nationwide LTE-based PoC two-way radio. Coverage across cellular networks without site limits. Built-in GPS, IP54/IPx4 durability.",
        "features": ["LTE Nationwide", "GPS Built-in", "IPx4", "Colour Display", "No Spectrum License"],
        "best_for_id": "Tim tersebar, logistik, security — komunikasi nasional tanpa repeater",
        "best_for_en": "Dispersed teams, logistics, fleet security — nationwide communication without repeaters",
        "iconBg": "linear-gradient(135deg,#0090cc,#005f8a)"
    },
    {
        "sku": "MOT-HT-R2",
        "cat": "Handy Talky",
        "series": "Workhorse DMR",
        "model": "MOTOTRBO R2",
        "unit": "Unit",
        "price_idr": 5400000,
        "price_usd": 335,
        "desc_id": "Radio DMR entry-level andal dengan SINC+ noise cancellation. Daya 4W/5W VHF/UHF, 64/128 channel, IP55. Tangguh untuk operasional harian.",
        "desc_en": "Reliable workhorse DMR radio with SINC+ noise suppression. 4W/5W VHF/UHF output, 64/128 channels, IP55 protection for daily operations.",
        "features": ["DMR Tier 2", "128 Channel", "4W/5W Output", "IP55", "SINC+ Noise Cancelling", "VHF/UHF"],
        "best_for_id": "Manufacturing, warehouse, hospitality, mall, ritel — radio kerja harian, cocok area mixed indoor outdoor",
        "best_for_en": "Manufacturing, warehouse, hospitality, mall, retail — daily workhorse radio for indoor & mixed areas",
        "iconBg": "linear-gradient(135deg,#003875,#0056b3)"
    },
    {
        "sku": "MOT-HT-R7",
        "cat": "Handy Talky",
        "series": "Professional DMR",
        "model": "MOTOTRBO R7",
        "unit": "Unit",
        "price_idr": 14800000,
        "price_usd": 915,
        "desc_id": "Radio DMR profesional generasi terbaru: Wi-Fi 5GHz WPA3, Bluetooth 5.2, GPS, Adaptive Dual-Mic Noise Cancellation, layar QVGA warna, IP68/IP66, MIL-STD-810H.",
        "desc_en": "Next-gen professional DMR portable: Wi-Fi 5GHz WPA3, Bluetooth 5.2, GNSS/GPS, Adaptive Dual-Mic Noise Cancellation, color display, IP68/IP66, MIL-STD-810H.",
        "features": ["Wi-Fi 5GHz WPA3", "Bluetooth 5.2", "IP68/IP66", "MIL-STD-810H", "GPS+GNSS", "WAVE PTX Ready"],
        "best_for_id": "Public safety, mining, oil & gas, airport — operasi kritis konektivitas penuh & bising ekstrem",
        "best_for_en": "Public safety, mining, oil & gas, airport — mission-critical operations in high-noise harsh environments",
        "iconBg": "linear-gradient(135deg,#0056b3,#003875)"
    },
    {
        "sku": "MOT-HT-P8600EX",
        "cat": "Handy Talky",
        "series": "ATEX Intrinsically Safe",
        "model": "XiR P8600 Ex Series",
        "unit": "Unit",
        "price_idr": 24500000,
        "price_usd": 1510,
        "desc_id": "Radio DMR intrinsically safe bersertifikat ATEX/IECEx untuk zona berbahaya gas dan debu mudah terbakar. IP67, MIL-STD-810G, GPS, Man Down & Lone Worker.",
        "desc_en": "ATEX/IECEx certified intrinsically safe DMR portable for explosive gas/dust zones. IP67, MIL-STD-810G, integrated GPS, Man Down & Lone Worker alerts.",
        "features": ["ATEX/IECEx", "IP67", "Zone 1/21", "DMR Tier 2 & 3", "Man Down", "MIL-STD-810G"],
        "best_for_id": "Oil & gas, petrochemical, underground mining — zona ATEX berbahaya (HazLoc)",
        "best_for_en": "Oil & gas, petrochemical, refining, underground mining — hazardous explosive ATEX zones",
        "iconBg": "linear-gradient(135deg,#dc2626,#7f1d1d)"
    },
    {
        "sku": "MOT-HT-C1200",
        "cat": "Handy Talky",
        "series": "Affordable DMR",
        "model": "MOTOTRBO XiR C1000/C2000 Series",
        "unit": "Unit",
        "price_idr": 4200000,
        "price_usd": 260,
        "desc_id": "Keluarga radio DMR ekonomis (XiR C1200, C2620, C2660). Migrasi mudah dari analog ke digital DMR dengan efisiensi baterai 40% lebih lama.",
        "desc_en": "Entry-level commercial DMR family (XiR C1200, C2620, C2660). Seamless analog-to-digital migration with 40% longer battery life.",
        "features": ["DMR Tier 2", "160 Channel", "4W/5W Output", "VHF/UHF", "Cost-Effective", "Digital+Analog"],
        "best_for_id": "Enterprise, hospital, hotel, retail — upgrade analog ke digital budget efisien",
        "best_for_en": "Enterprise, hospital, hotel, retail — cost-effective analog to digital DMR migration",
        "iconBg": "linear-gradient(135deg,#7c3aed,#4c1d95)"
    },
    {
        "sku": "MOT-HT-ION",
        "cat": "Handy Talky",
        "series": "LTE PTT Smart Radio",
        "model": "MOTOTRBO Ion",
        "unit": "Unit",
        "price_idr": 29500000,
        "price_usd": 1820,
        "desc_id": "Smart radio pertama yang menggabungkan DMR broadband, LTE, Wi-Fi, dan sistem operasi Android dengan layar sentuh penuh & kamera 13MP.",
        "desc_en": "Smart radio combining DMR Tier 2/3, 4G LTE, Wi-Fi, and full Android app ecosystem with rugged touchscreen and 13MP camera.",
        "features": ["Android + DMR", "LTE Broadband", "GPS Real-Time", "Wi-Fi", "Touch Display", "IP68"],
        "best_for_id": "Supervisor, commander, dispatcher — semua industri butuh smart device + DMR PTT",
        "best_for_en": "Supervisors, incident commanders, dispatchers needing Android workflows + mission-critical DMR PTT",
        "iconBg": "linear-gradient(135deg,#0090cc,#0056b3)"
    },
    {
        "sku": "MOT-HT-SL1M",
        "cat": "Handy Talky",
        "series": "Ultra Slim Portable",
        "model": "MOTOTRBO SL1M",
        "unit": "Unit",
        "price_idr": 5900000,
        "price_usd": 365,
        "desc_id": "Radio PTT ultra-ramping (<2cm) IP54 dengan Active View LED matrix display. Ringan, elegan, ideal untuk hospitality, rumah sakit, dan ritel.",
        "desc_en": "Ultra-slim (<2cm) IP54 DMR portable with shatterproof Active View LED matrix display. Discreet and lightweight for hospitality and retail.",
        "features": ["Ultra Slim", "IP54", "Active View LED", "DMR Tier 2", "Micro-USB Charging"],
        "best_for_id": "Hotel, mall, rumah sakit, kantor korporat, ritel — radio diskret desain premium, cocok indoor dan area mixed",
        "best_for_en": "Hotels, malls, hospitals, corporate offices, retail — discreet pocket-sized radio for indoor & mixed areas",
        "iconBg": "linear-gradient(135deg,#475569,#1e293b)"
    },
    {
        "sku": "MOT-HT-P8600I",
        "cat": "Handy Talky",
        "series": "Rugged Wide Band",
        "model": "MOTOTRBO XiR P8600i Series",
        "unit": "Unit",
        "price_idr": 12800000,
        "price_usd": 790,
        "desc_id": "Radio DMR profesional legendaris (P8668i/P8608i) IP68, MIL-STD-810G, Bluetooth 4.0, Wi-Fi, GNSS/GPS, mendukung IP Site Connect hingga Capacity Max.",
        "desc_en": "Proven rugged DMR portable (P8668i/P8608i) with IP68, MIL-STD-810G, Bluetooth 4.0, Wi-Fi, GNSS/GPS, supporting IP Site Connect through Capacity Max.",
        "features": ["IP68", "MIL-STD-810G", "Bluetooth 4.0", "GPS", "Multi Band", "Trunking Ready"],
        "best_for_id": "Public safety, utility, port, airport, plantation, mall — outdoor keras & manajemen armada luas",
        "best_for_en": "Public safety, utilities, ports, airports, plantations, malls — rugged outdoor & fleet management",
        "iconBg": "linear-gradient(135deg,#059669,#065f46)"
    },

    # ─── BASE STATION / MOBILE (4) ───────────────────────────────────────────
    {
        "sku": "MOT-BS-DR3000",
        "cat": "Base Station / Mobile",
        "series": "Desktop Base Station",
        "model": "MOTOTRBO DR3000 Series",
        "unit": "Unit",
        "price_idr": 34000000,
        "price_usd": 2100,
        "desc_id": "Base station/repeater DMR Tier 2 & 3 continuous duty cycle 25-40W. Mendukung IP Site Connect, Capacity Plus, Linked Capacity Plus.",
        "desc_en": "Continuous duty cycle 25-40W DMR Tier 2 & 3 base station/repeater. Supports IP Site Connect, Capacity Plus, and Linked Capacity Plus.",
        "features": ["DMR Tier 2 & 3", "25-40W", "IP Site Connect", "Capacity Plus", "Desktop/Rack", "VHF/UHF"],
        "best_for_id": "Kantor, gedung, kontrol room — base station/repeater andal single dan multi-site",
        "best_for_en": "Offices, buildings, control rooms — reliable single and multi-site base station",
        "iconBg": "linear-gradient(135deg,#003875,#0056b3)"
    },
    {
        "sku": "MOT-MB-M8600I",
        "cat": "Base Station / Mobile",
        "series": "Mobile Radio VHF/UHF",
        "model": "MOTOTRBO XiR M8600i Series",
        "unit": "Unit",
        "price_idr": 11500000,
        "price_usd": 710,
        "desc_id": "Radio mobile DMR 25-45W VHF/UHF (M8668i/M8628i) untuk kendaraan operasional dan base station. IP54, layar warna, GPS & Bluetooth 4.0 terintegrasi.",
        "desc_en": "25-45W VHF/UHF DMR mobile radio (M8668i/M8628i) for operational vehicles and fixed base stations. IP54, color display, built-in GPS & Bluetooth 4.0.",
        "features": ["25-45W Mobile", "IP54", "GPS Built-in", "Bluetooth 4.0", "Colour Display", "Capacity Plus"],
        "best_for_id": "Kendaraan operasional, dump truck, security patrol, ambulans — mobile bertenaga tinggi",
        "best_for_en": "Operational vehicles, haul trucks, security patrol, ambulances — high-power mobile radio",
        "iconBg": "linear-gradient(135deg,#0056b3,#003875)"
    },
    {
        "sku": "MOT-MB-M8668I-800",
        "cat": "Base Station / Mobile",
        "series": "Mobile Radio 700/800MHz",
        "model": "MOTOTRBO XiR M8668i",
        "unit": "Unit",
        "price_idr": 13500000,
        "price_usd": 835,
        "desc_id": "Radio mobile 700/800MHz dengan daya pancar 35W, GPS, Bluetooth 4.0. Mendukung Linked Capacity Plus dan Connect Plus hingga 250 site.",
        "desc_en": "700/800MHz 35W trunking-ready mobile radio with integrated GPS and Bluetooth 4.0. Supports Linked Capacity Plus and Connect Plus up to 250 sites.",
        "features": ["700/800MHz", "35W", "Linked Capacity Plus", "Connect Plus", "GPS", "Bluetooth 4.0"],
        "best_for_id": "Sistem trunking skala kota, bandara, transportasi massal, public safety",
        "best_for_en": "City-wide trunking systems, airports, mass transit, public safety",
        "iconBg": "linear-gradient(135deg,#7c3aed,#5b21b6)"
    },
    {
        "sku": "MOT-MB-M8260I",
        "cat": "Base Station / Mobile",
        "series": "Control Station",
        "model": "MOTOTRBO XiR M8260i",
        "unit": "Unit",
        "price_idr": 9800000,
        "price_usd": 605,
        "desc_id": "Control station desktop berbasis radio mobile untuk dispatcher tetap. VHF/UHF output 40W lengkap dengan desktop microphone & power supply.",
        "desc_en": "Fixed desktop control station for dispatch operators. 40W VHF/UHF output bundled with desktop microphone and AC/DC power tray.",
        "features": ["Desktop Control", "40W", "VHF/UHF", "Dispatcher Mic", "Economic", "DMR Tier 2"],
        "best_for_id": "Ruang kontrol, security post, reception — dispatcher tetap ekonomis",
        "best_for_en": "Control rooms, guard posts, reception desks — cost-effective fixed dispatch station",
        "iconBg": "linear-gradient(135deg,#059669,#064e3b)"
    },

    # ─── REPEATER (4) — CORRECTED SLR 5300 & SLR 1000 ────────────────────────
    {
        "sku": "MOT-RPT-SLR5300",
        "cat": "Repeater",
        "series": "Site Repeater DMR",
        "model": "MOTOTRBO SLR 5300",
        "unit": "Unit",
        "price_idr": 48500000,
        "price_usd": 2995,
        "desc_id": "Repeater DMR generasi terbaru MOTOTRBO SLR 5300 (1-50W continuous duty, 1U slim rack). Sensitivitas receiver tinggi, konsumsi daya rendah, mendukung Konvensional, IP Site Connect, Capacity Plus, dan Linked Capacity Plus.",
        "desc_en": "Next-generation MOTOTRBO SLR 5300 DMR repeater (1-50W continuous duty, slim 1U rack). High receiver sensitivity, low power consumption, supporting Conventional, IP Site Connect, Capacity Plus, and Linked Capacity Plus.",
        "features": ["1-50W Continuous", "DMR Tier 2 & 3", "IP Site Connect", "Capacity Plus", "Slim 1U Rack", "3A Battery Charger"],
        "best_for_id": "Semua tipe proyek — repeater standar industri APAC skala single site hingga multi-site",
        "best_for_en": "All project scales — industry-standard APAC DMR repeater from single site to multi-site trunking",
        "iconBg": "linear-gradient(135deg,#0056b3,#003875)"
    },
    {
        "sku": "MOT-RPT-SLR8000",
        "cat": "Repeater",
        "series": "High Power Repeater",
        "model": "MOTOTRBO SLR 8000",
        "unit": "Unit",
        "price_idr": 82000000,
        "price_usd": 5060,
        "desc_id": "Repeater modular high-power 100W continuous duty cycle (2U rack) untuk jangkauan RF maksimum di area ekstrem. Mendukung seluruh arsitektur MOTOTRBO hingga Connect Plus / Capacity Max 250 site.",
        "desc_en": "High-power 100W continuous duty modular repeater (2U rack) for maximum wide-area RF coverage. Supports all MOTOTRBO architectures up to 250-site trunking.",
        "features": ["Up to 100W", "2U Modular", "250 Sites Trunking", "All Topologies", "Built-in Preselector"],
        "best_for_id": "Perkebunan sawit, pertambangan terbuka, oil & gas, area sangat luas — daya pancar tertinggi",
        "best_for_en": "Palm oil plantations, open-pit mining, oil & gas, vast remote areas requiring maximum TX power",
        "iconBg": "linear-gradient(135deg,#dc2626,#991b1b)"
    },
    {
        "sku": "MOT-RPT-SLR1000",
        "cat": "Repeater",
        "series": "In-Building DAS / Compact",
        "model": "MOTOTRBO SLR 1000",
        "unit": "Unit",
        "price_idr": 32500000,
        "price_usd": 2005,
        "desc_id": "Repeater compact IP65 fanless (1-10W) MOTOTRBO SLR 1000 untuk cakupan in-building DAS, basement, terowongan, dan dead-zone. Dapat dipasang di dinding/tiang indoor maupun outdoor tanpa rak.",
        "desc_en": "Compact IP65 fanless repeater (1-10W) MOTOTRBO SLR 1000 designed for in-building DAS, basements, tunnels, and dead-spot fill-in. Wall or pole mountable indoor/outdoor.",
        "features": ["1-10W Low Power", "IP65 Weatherproof", "In-Building DAS", "Compact Fanless", "VHF/UHF"],
        "best_for_id": "Gedung bertingkat, basement, tunnel, mall, rumah sakit, mixed area — cakupan indoor DAS & eliminasi blind-spot",
        "best_for_en": "High-rise buildings, basements, tunnels, malls, hospitals, mixed areas — indoor DAS & dead-spot fill-in",
        "iconBg": "linear-gradient(135deg,#0090cc,#0056b3)"
    },
    {
        "sku": "RF-ACC-DUPLEXER",
        "cat": "Repeater",
        "series": "Duplexer & Accessories",
        "model": "Duplexer VHF/UHF Band-Pass",
        "unit": "Unit",
        "price_idr": 6500000,
        "price_usd": 400,
        "desc_id": "Duplexer 6-cavity band-pass/band-reject VHF (136-174MHz) atau UHF (403-527MHz). Insertion loss rendah (<1.5dB), isolasi TX/RX tinggi (>75dB), N-Female connector.",
        "desc_en": "6-cavity band-pass/band-reject duplexer for VHF (136-174MHz) or UHF (403-527MHz). Low insertion loss (<1.5dB), high TX/RX isolation (>75dB), N-Female connectors.",
        "features": ["6-Cavity Band-Pass", "VHF/UHF", "Low Insertion Loss", ">75dB Isolation", "N-Female"],
        "best_for_id": "Semua instalasi repeater — wajib untuk operasi full-duplex satu antena",
        "best_for_en": "All repeater installations — mandatory for single-antenna full-duplex operation",
        "iconBg": "linear-gradient(135deg,#475569,#1e293b)"
    },

    # ─── SOFTWARE (3) ────────────────────────────────────────────────────────
    {
        "sku": "SW-MOT-WAVEPTX",
        "cat": "Software",
        "series": "Dispatch & Control",
        "model": "MOTOTRBO PremierOne / WAVE PTX",
        "unit": "Paket",
        "price_idr": 45000000,
        "price_usd": 2780,
        "desc_id": "Platform dispatch terpadu untuk menghubungkan radio DMR MOTOTRBO, smartphone LTE, dan PC Dispatcher dalam satu ekosistem komunikasi via cloud/gateway.",
        "desc_en": "Unified dispatch platform bridging MOTOTRBO DMR radios, LTE smartphones, and Web/PC Dispatchers in one seamless cloud/gateway ecosystem.",
        "features": ["Web Dispatch", "PTT over Cellular", "DMR Gateway", "GPS Tracking", "Voice Recording", "Cloud/Hybrid"],
        "best_for_id": "Control room, pusat komando — integrasi radio DMR dan LTE satu layar",
        "best_for_en": "Command centers & control rooms — unified DMR radio and LTE PoC dispatch on one screen",
        "iconBg": "linear-gradient(135deg,#0056b3,#003875)"
    },
    {
        "sku": "SW-MOT-RM-SUITE",
        "cat": "Software",
        "series": "Fleet Management",
        "model": "MOTOTRBO Management Suite",
        "unit": "Paket",
        "price_idr": 18500000,
        "price_usd": 1140,
        "desc_id": "Software Radio Management (RM) & System Advisor: remote programming batch, OTAP/Wi-Fi update, monitoring kesehatan repeater (RDAC), dan alarm jaringan.",
        "desc_en": "Radio Management (RM) & System Advisor suite: batch remote programming, OTAP/Wi-Fi firmware updates, repeater diagnostics (RDAC), and network alarms.",
        "features": ["Remote Programming", "OTAP / Wi-Fi Update", "RDAC Monitoring", "Diagnostics", "Multi-Site"],
        "best_for_id": "IT & Radio admin — kelola ratusan radio & repeater dari dashboard terpusat",
        "best_for_en": "IT & Radio administrators — manage hundreds of radios and repeaters from a central dashboard",
        "iconBg": "linear-gradient(135deg,#0090cc,#0056b3)"
    },
    {
        "sku": "SW-RADIOPRO-SYS",
        "cat": "Software",
        "series": "RadioPro Dispatch",
        "model": "RadioPro SysPlan / Dispatch System",
        "unit": "Paket",
        "price_idr": 55000000,
        "price_usd": 3395,
        "desc_id": "Platform dispatch IP untuk MOTOTRBO: Voice Dispatch, GPS AVL Mapping, Emergency Alert, Voice Logging/Archive, Text Messaging, hemat bandwidth (<22KB/s untuk VSAT/Starlink).",
        "desc_en": "IP dispatch software for MOTOTRBO: Voice Dispatch, GPS AVL Mapping, Emergency Alerts, Voice Logging, Text Messaging, ultra-low bandwidth (<22KB/s for VSAT/Starlink).",
        "features": ["50+ Talk Groups", "GPS AVL Mapping", "Voice Recording", "<22KB/s Bandwidth", "Geo-fencing", "Emergency"],
        "best_for_id": "Semua industri — dispatch terpadu kaya fitur, sangat hemat bandwidth Starlink/VSAT",
        "best_for_en": "All industries — full-featured dispatch console optimized for low-bandwidth Starlink/VSAT links",
        "iconBg": "linear-gradient(135deg,#059669,#065f46)"
    },

    # ─── CCTV AVIGILON (11) ──────────────────────────────────────────────────
    {
        "sku": "AVG-CAM-H5PRO-61",
        "cat": "CCTV Avigilon",
        "series": "H5 PRO Multisensor",
        "model": "Avigilon H5 PRO Camera 61MP",
        "unit": "Unit",
        "price_idr": 165000000,
        "price_usd": 10185,
        "desc_id": "Kamera ultra-HD 61MP dengan AI generasi terbaru, Appearance Search, dan cakupan area sangat luas dengan detail forensik maksimal.",
        "desc_en": "Ultra-high-definition 61MP camera with Next-Gen AI analytics, Appearance Search, and maximum forensic detail over vast areas.",
        "features": ["61 MP Ultra HD", "HDSM 2.0", "Wide Coverage", "Self-Learning AI", "Appearance Search"],
        "best_for_id": "Stadion, bandara, pelabuhan, tambang terbuka — satu kamera menggantikan banyak kamera tetap",
        "best_for_en": "Stadiums, airports, seaports, open-pit mines — single camera replacing multiple fixed units",
        "iconBg": "linear-gradient(135deg,#003875,#0056b3)"
    },
    {
        "sku": "AVG-CAM-H6A-DOME8",
        "cat": "CCTV Avigilon",
        "series": "H6A Dome Camera",
        "model": "Avigilon H6A Dome 8MP",
        "unit": "Unit",
        "price_idr": 24500000,
        "price_usd": 1510,
        "desc_id": "Kamera dome 8MP (4K) indoor/outdoor dengan AdaptAI analytics (deteksi kerumunan, suara, penampilan). IP66/67, IK10, FIPS 140-2.",
        "desc_en": "8MP (4K) indoor/outdoor dome camera with AdaptAI video & audio analytics, Appearance Search, IP66/67, IK10 vandal resistance.",
        "features": ["8 MP 4K", "IP66/67 IK10", "AdaptAI Analytics", "Appearance Search", "H.265 SmartCodec", "Audio AI"],
        "best_for_id": "Outdoor umum, parkir, perimeter, mall, mixed area — dome tahan cuaca dengan AI canggih",
        "best_for_en": "General outdoor, parking, perimeters, malls, mixed areas — weather/vandal-resistant AI dome",
        "iconBg": "linear-gradient(135deg,#0056b3,#003875)"
    },
    {
        "sku": "AVG-CAM-H6X-BUL8",
        "cat": "CCTV Avigilon",
        "series": "H6X Bullet Camera",
        "model": "Avigilon H6X Bullet 8MP",
        "unit": "Unit",
        "price_idr": 26800000,
        "price_usd": 1655,
        "desc_id": "Kamera bullet outdoor 8MP dengan IR jarak jauh adaptif, IP66/67, IK10, lensa varifocal motorized, dan AdaptAI analytics untuk perimeter.",
        "desc_en": "8MP outdoor bullet camera with long-range adaptive IR, IP66/67, IK10, motorized varifocal lens, and AdaptAI perimeter analytics.",
        "features": ["8 MP 4K", "Long-Range IR", "IP66/67 IK10", "Motorized Varifocal", "AdaptAI Analytics"],
        "best_for_id": "Perimeter, jalan raya, outdoor terbuka, parkir mall — bullet jarak jauh dengan AI dan IR kuat",
        "best_for_en": "Perimeters, roadways, open yards, mall parking — long-range bullet with powerful IR and AI",
        "iconBg": "linear-gradient(135deg,#0090cc,#005f8a)"
    },
    {
        "sku": "AVG-CAM-H5A-PTZ8",
        "cat": "CCTV Avigilon",
        "series": "H5A Rugged PTZ",
        "model": "Avigilon H5A Rugged PTZ 8MP",
        "unit": "Unit",
        "price_idr": 68000000,
        "price_usd": 4195,
        "desc_id": "Kamera PTZ rugged 8MP dengan 36x optical zoom, rotasi 360 derajat tanpa henti, wiper terintegrasi, IR + white light opsional, IP66/67/68, IK10.",
        "desc_en": "Rugged 8MP PTZ camera with 36x optical zoom, continuous 360° pan, integrated wiper, optional IR/white light, IP66/67/68, IK10.",
        "features": ["8 MP 4K", "36x Optical Zoom", "360° Continuous", "Integrated Wiper", "IP68 IK10", "Auto-Tracking AI"],
        "best_for_id": "Perimeter luas, pelabuhan, bandara, tambang — PTZ tangguh segala cuaca dengan auto-tracking AI",
        "best_for_en": "Wide perimeters, ports, airports, mining — extreme-weather PTZ with AI auto-tracking",
        "iconBg": "linear-gradient(135deg,#dc2626,#7f1d1d)"
    },
    {
        "sku": "AVG-CAM-H5A-THERM",
        "cat": "CCTV Avigilon",
        "series": "H5A Thermal Camera",
        "model": "Avigilon H5A Thermal Camera",
        "unit": "Unit",
        "price_idr": 95000000,
        "price_usd": 5865,
        "desc_id": "Kamera thermal VGA/QVGA untuk deteksi intrusi perimeter jarak jauh dalam gelap total, asap, debu, dan kabut 24/7.",
        "desc_en": "Radiometric/perimeter thermal camera (640x512 / 320x256) for long-range intrusion detection in total darkness, smoke, dust, and fog 24/7.",
        "features": ["Thermal Sensor", "640x512 / 320x256", "Total Darkness", "Smoke/Fog Penetration", "Perimeter AI"],
        "best_for_id": "Perimeter kritis, oil & gas, gardu induk, tambang — deteksi 24/7 tanpa cahaya",
        "best_for_en": "Critical perimeters, oil & gas, substations, mining — 24/7 detection in zero light or smoke",
        "iconBg": "linear-gradient(135deg,#b45309,#78350f)"
    },
    {
        "sku": "AVG-CAM-H5A-MULTI",
        "cat": "CCTV Avigilon",
        "series": "H5A Multisensor 4x8MP",
        "model": "Avigilon H5A Multisensor 4x8MP",
        "unit": "Unit",
        "price_idr": 54000000,
        "price_usd": 3335,
        "desc_id": "Kamera multisensor 32MP (4x8MP) dengan modul lensa yang dapat diatur 180°, 270°, atau 360° menggunakan satu lisensi VMS dan satu kabel PoE+.",
        "desc_en": "32MP (4x8MP) adjustable multisensor camera covering 180°, 270°, or 360° using a single cable drop and single VMS license.",
        "features": ["4x8 MP (32MP)", "180/270/360°", "AI Analytics", "Single PoE+ Drop", "IP66 NEMA 4X"],
        "best_for_id": "Persimpangan, sudut gedung, atrium mall, lobby, mixed area — 1 kamera ganti 4 kamera tetap",
        "best_for_en": "Intersections, building corners, mall atriums, lobbies — 1 camera replaces 4 fixed cameras",
        "iconBg": "linear-gradient(135deg,#7c3aed,#5b21b6)"
    },
    {
        "sku": "AVG-CAM-H5A-FISH",
        "cat": "CCTV Avigilon",
        "series": "H5A Fisheye Camera",
        "model": "Avigilon H5A Fisheye 8/12MP",
        "unit": "Unit",
        "price_idr": 21500000,
        "price_usd": 1325,
        "desc_id": "Kamera panoramic fisheye 12MP 360 derajat dengan client-side de-warping, AI object detection, dan audio opsional tanpa blind spot.",
        "desc_en": "12MP 360° panoramic fisheye camera with client-side de-warping, AI object tracking, and zero blind spots.",
        "features": ["12 MP", "360° Fisheye", "AI Analytics", "Client De-warping", "Low Profile", "IP66/IK10"],
        "best_for_id": "Lobby, ruang terbuka, mall, food court, rumah sakit — kesadaran situasional 360° tanpa blind spot",
        "best_for_en": "Lobbies, open floors, malls, food courts, hospitals — 360° situational awareness with zero blind spots",
        "iconBg": "linear-gradient(135deg,#059669,#065f46)"
    },
    {
        "sku": "AVG-CAM-H6MINI",
        "cat": "CCTV Avigilon",
        "series": "H6 Mini Dome",
        "model": "Avigilon H6 Mini Dome 3/5MP",
        "unit": "Unit",
        "price_idr": 12500000,
        "price_usd": 770,
        "desc_id": "Kamera mini dome indoor kompak 3MP/5MP dengan desain sangat diskret, wide dynamic range, dan analitik AI untuk area komersial.",
        "desc_en": "Ultra-compact 3MP/5MP indoor mini dome with discreet aesthetics, WDR, and built-in AI analytics for commercial interiors.",
        "features": ["3/5 MP", "Ultra Compact", "Wide FOV", "Indoor Discreet", "AI Analytics", "PoE"],
        "best_for_id": "Ritel, hotel, koridor mall, kantor, rumah sakit — kamera indoor estetis dengan AI",
        "best_for_en": "Retail, hotels, mall corridors, offices, hospitals — aesthetic indoor camera with AI",
        "iconBg": "linear-gradient(135deg,#0056b3,#001e4a)"
    },
    {
        "sku": "AVG-CAM-H4VI",
        "cat": "CCTV Avigilon",
        "series": "H4 Video Intercom",
        "model": "Avigilon H4 Video Intercom 3MP",
        "unit": "Unit",
        "price_idr": 22000000,
        "price_usd": 1360,
        "desc_id": "Video intercom 3MP wide-angle dengan echo-cancelling two-way audio, integrasi penuh Avigilon Unity Video & kontrol akses pintu.",
        "desc_en": "3MP wide-angle fisheye video intercom with noise/echo-cancelling two-way audio, direct Avigilon Unity Video & door access integration.",
        "features": ["3 MP Wide", "Face Recognition", "2-Way Audio", "Door Relay", "Unity Integration", "IP66/IK10"],
        "best_for_id": "Pintu masuk utama, ruang server, gerbang VIP, pos keamanan — verifikasi tamu visual & audio",
        "best_for_en": "Main entrances, server rooms, VIP gates, security booths — visual & audio visitor verification",
        "iconBg": "linear-gradient(135deg,#0056b3,#003875)"
    },
    {
        "sku": "AVG-CAM-H4LPC",
        "cat": "CCTV Avigilon",
        "series": "H4 License Plate Capture",
        "model": "Avigilon H4 LPC Camera",
        "unit": "Unit",
        "price_idr": 34000000,
        "price_usd": 2100,
        "desc_id": "Kamera khusus pembaca plat nomor kendaraan (LPR/ANPR) kecepatan tinggi siang/malam dengan iluminasi IR terkalibrasi.",
        "desc_en": "Dedicated License Plate Recognition (LPR/ANPR) camera capturing reflective plates day/night at highway speeds.",
        "features": ["LPR / ANPR", "3 MP Specialized", "Up to 100+ km/h", "Multi-Lane", "High-Power IR", "Unity Watchlist"],
        "best_for_id": "Gerbang parkir mall, tol, pintu masuk pabrik/tambang — pencatatan plat nomor otomatis",
        "best_for_en": "Mall parking gates, toll roads, plant/mine entry gates — automated vehicle license plate capture",
        "iconBg": "linear-gradient(135deg,#b45309,#78350f)"
    },
    {
        "sku": "AVG-CAM-H6SL",
        "cat": "CCTV Avigilon",
        "series": "Unity H6SL",
        "model": "Avigilon Unity H6SL 3-9MP",
        "unit": "Unit",
        "price_idr": 16800000,
        "price_usd": 1035,
        "desc_id": "Lini kamera serbaguna H6SL (Bullet/Dome) 3MP hingga 8MP dengan AI analytics, keamanan siber FIPS 140-2, dan instalasi modular cepat.",
        "desc_en": "Versatile H6SL camera line (Bullet/Dome) 3MP-8MP featuring Next-Gen AI analytics, FIPS 140-2 cybersecurity, and modular mounting.",
        "features": ["3-8 MP", "FIPS 140-2", "Modular Design", "Self-Learning AI", "IP66/67 IK10", "H.265"],
        "best_for_id": "Pemerintahan, perbankan, manufaktur, gedung komersial — standar AI keamanan tinggi",
        "best_for_en": "Government, banking, manufacturing, commercial buildings — cyber-secure AI surveillance",
        "iconBg": "linear-gradient(135deg,#003875,#001e4a)"
    },
    {
        "sku": "AVG-CAM-H5SL",
        "cat": "CCTV Avigilon",
        "series": "H5SL Smart Learning",
        "model": "Avigilon H5SL 1.5-3MP",
        "unit": "Unit",
        "price_idr": 9800000,
        "price_usd": 605,
        "desc_id": "Kamera ekonomis 2MP-5MP dengan Unusual Motion Detection (UMD) dan HDSM SmartCodec untuk deployment skala besar yang hemat biaya.",
        "desc_en": "Value-focused 2MP-5MP camera series with Unusual Motion Detection (UMD) and HDSM SmartCodec for cost-effective volume deployments.",
        "features": ["2-5 MP", "UMD Analytics", "Cost-Effective", "HDSM SmartCodec", "Varifocal Lens"],
        "best_for_id": "Deployment massal, gudang, kampus, hotel — kualitas Avigilon dengan biaya efisien",
        "best_for_en": "High-volume deployments, warehouses, campuses, hotels — Avigilon quality at value pricing",
        "iconBg": "linear-gradient(135deg,#0e7490,#0c4a6e)"
    },

    # ─── CCTV AVA (2) ────────────────────────────────────────────────────────
    {
        "sku": "AVA-CAM-COMPACT5",
        "cat": "CCTV AVA",
        "series": "Ava Compact Dome",
        "model": "Ava Compact Dome 5MP",
        "unit": "Unit",
        "price_idr": 15500000,
        "price_usd": 955,
        "desc_id": "Kamera AI cloud-native Avigilon Alta (Ava) 5MP dengan penyimpanan onboard hingga 120 hari, edge AI video & audio analytics, tanpa butuh server NVR lokal.",
        "desc_en": "Cloud-native Avigilon Alta (Ava) 5MP dome with up to 120-day onboard solid-state storage and edge AI analytics — no local NVR required.",
        "features": ["5 MP", "TPM 2.0", "Edge AI", "Onboard Storage", "Cloud Native", "IP66 IK10"],
        "best_for_id": "Ritel multi-cabang, mall, kantor modern — CCTV cloud-native langsung jalan tanpa NVR",
        "best_for_en": "Multi-branch retail, malls, modern offices — zero-NVR cloud-native AI video security",
        "iconBg": "linear-gradient(135deg,#0056b3,#0090cc)"
    },
    {
        "sku": "AVA-CAM-BULLET4K",
        "cat": "CCTV AVA",
        "series": "Ava Bullet Outdoor",
        "model": "Ava Bullet 4K/5MP",
        "unit": "Unit",
        "price_idr": 19500000,
        "price_usd": 1205,
        "desc_id": "Kamera bullet cloud-native 4K/5MP dengan IR 50m, mikrofon akustik AI, penyimpanan onboard hingga 120 hari, dan manajemen cloud Avigilon Alta Aware.",
        "desc_en": "Cloud-native 4K/5MP outdoor bullet with 50m IR, acoustic AI sensor, up to 120-day onboard retention, and Avigilon Alta Aware cloud management.",
        "features": ["4K / 5 MP", "IR 50m", "Acoustic + Video AI", "Onboard Storage", "Cloud Managed", "IP66/67 PoE+"],
        "best_for_id": "Outdoor cabang, perimeter gudang, parkir — kamera cloud mandiri tahan cuaca",
        "best_for_en": "Branch exteriors, warehouse perimeters, parking lots — standalone weatherproof cloud camera",
        "iconBg": "linear-gradient(135deg,#059669,#0056b3)"
    },

    # ─── AI NVR / CLOUD CONNECTOR / VMS (3) ──────────────────────────────────
    {
        "sku": "AVG-SRV-AINVR",
        "cat": "AI NVR",
        "series": "Avigilon AI NVR",
        "model": "Avigilon AI NVR (Value/Standard/Premium)",
        "unit": "Unit",
        "price_idr": 145000000,
        "price_usd": 8950,
        "desc_id": "Server perekam NVR dengan akselerasi GPU NVIDIA bawaan untuk menjalankan Appearance Search, Face Recognition, dan LPR pada kamera non-analitik maupun analitik.",
        "desc_en": "Turnkey hardened NVR appliance with built-in NVIDIA GPU acceleration for Appearance Search, Facial Recognition, and LPR across streams.",
        "features": ["Server-Side AI", "NVIDIA GPU", "RAID Redundancy", "Appearance Search", "Unity Video Ready", "24TB-120TB"],
        "best_for_id": "Semua skala proyek CCTV — server perekam & pemroses AI terpusat reliabilitas tinggi",
        "best_for_en": "All CCTV project scales — high-availability recording server with centralized GPU AI analytics",
        "iconBg": "linear-gradient(135deg,#003875,#0056b3)"
    },
    {
        "sku": "AVG-ALTA-A500",
        "cat": "Cloud Connector",
        "series": "Avigilon Alta",
        "model": "Avigilon Alta A500 Cloud Connector",
        "unit": "Unit",
        "price_idr": 65000000,
        "price_usd": 4010,
        "desc_id": "Appliance hybrid cloud (8TB/16TB) dengan GPU untuk menghubungkan hingga 25 kamera IP pihak ketiga ke platform cloud Avigilon Alta Aware lengkap dengan analitik AI.",
        "desc_en": "Hybrid cloud appliance (8TB/16TB) with onboard GPU connecting up to 25 third-party ONVIF cameras to Avigilon Alta Aware cloud with full AI.",
        "features": ["8/16 TB Storage", "25 Camera Channels", "Onboard GPU", "Alta Aware Cloud", "ONVIF Bridge", "Zero-Touch"],
        "best_for_id": "Upgrade CCTV lama ke Cloud AI — jadikan kamera ONVIF biasa memiliki AI & akses cloud",
        "best_for_en": "Legacy CCTV cloud migration — upgrade existing ONVIF cameras with Cloud AI & remote access",
        "iconBg": "linear-gradient(135deg,#0090cc,#003875)"
    },
    {
        "sku": "AVG-VMS-UNITY8",
        "cat": "Avigilon Unity Video",
        "series": "VMS Enterprise",
        "model": "Avigilon Unity Video 8 VMS",
        "unit": "Paket",
        "price_idr": 28000000,
        "price_usd": 1730,
        "desc_id": "Lisensi platform Video Management System (VMS) enterprise generasi ke-8 (dahulu ACC). Focus of Attention interface, Appearance Search, LPR, dan federasi multi-site.",
        "desc_en": "Enterprise Video Management System (VMS) v8 platform (formerly ACC). Focus of Attention UI, Appearance Search, LPR, and multi-site federation.",
        "features": ["Focus of Attention UI", "Appearance Search", "Facial Recognition", "Multi-Site Federation", "Unity Cloud"],
        "best_for_id": "Command center enterprise, bandara, tambang, mall — manajemen ratusan hingga ribuan kamera",
        "best_for_en": "Enterprise command centers, airports, mines, malls — managing hundreds to thousands of cameras",
        "iconBg": "linear-gradient(135deg,#003875,#001e4a)"
    },

    # ─── AVANTI ANTENNA (5) ──────────────────────────────────────────────────
    {
        "sku": "AVT-ANT-AVO150",
        "cat": "Avanti Antenna",
        "series": "Yagi VHF",
        "model": "AVO-150 Yagi Antenna VHF",
        "unit": "Unit",
        "price_idr": 3800000,
        "price_usd": 235,
        "desc_id": "Antena directional Yagi VHF (136-174MHz) gain 7dBd bahan aluminium heavy-duty tahan korosi dengan konektor N-Female dan VSWR <1.5.",
        "desc_en": "Heavy-duty corrosion-resistant aluminum VHF directional Yagi antenna (136-174MHz) with 7dBd gain, N-Female connector, VSWR <1.5.",
        "features": ["7 dBd Gain", "VHF 136-174MHz", "Directional Yagi", "N-Female", "Heavy-Duty Aluminum"],
        "best_for_id": "Link repeater ke remote site, koridor jalan tambang, coverage terarah VHF",
        "best_for_en": "Point-to-point repeater links, haul road corridors, directional VHF coverage",
        "iconBg": "linear-gradient(135deg,#003875,#0056b3)"
    },
    {
        "sku": "AVT-ANT-TDJ900D",
        "cat": "Avanti Antenna",
        "series": "Yagi 800/900MHz",
        "model": "TDJ-900D Yagi 800/900MHz",
        "unit": "Unit",
        "price_idr": 4200000,
        "price_usd": 260,
        "desc_id": "Antena Yagi directional high-gain 10dBi untuk pita frekuensi 806-960MHz. Konstruksi aluminium las penuh tahan angin kencang.",
        "desc_en": "10dBi high-gain directional Yagi antenna for 806-960MHz trunking and LTE bands. Welded aluminum construction for high wind loads.",
        "features": ["10 dBi Gain", "806-960MHz", "Dual Band", "N-Female", "Connect Plus Ready"],
        "best_for_id": "Sistem 800/900MHz Connect Plus & penguatan arah sektoral",
        "best_for_en": "800/900MHz trunking systems and directional sector reinforcement",
        "iconBg": "linear-gradient(135deg,#7c3aed,#4c1d95)"
    },
    {
        "sku": "AVT-ANT-AVO350",
        "cat": "Avanti Antenna",
        "series": "Omni VHF/UHF Low",
        "model": "AVO-350DII/B Omni 330-390MHz",
        "unit": "Unit",
        "price_idr": 6200000,
        "price_usd": 385,
        "desc_id": "Antena omnidirectional collinear fiberglass (136-174MHz / 330-390MHz) gain 5.15dBi (3dBd), pola pancaran 360° merata, radome tahan UV & petir.",
        "desc_en": "Fiberglass omnidirectional collinear base antenna (136-174MHz / 330-390MHz) with 3dBd (5.15dBi) gain, 360° coverage, UV-resistant radome.",
        "features": ["3 dBd / 5.15 dBi", "VHF / 350MHz", "Omni 360°", "Fiberglass Radome", "N-Female"],
        "best_for_id": "Antena utama tower repeater VHF — cakupan 360 derajat merata segala arah",
        "best_for_en": "Primary VHF repeater tower antenna — uniform 360-degree omnidirectional coverage",
        "iconBg": "linear-gradient(135deg,#059669,#064e3b)"
    },
    {
        "sku": "AVT-ANT-AVO400",
        "cat": "Avanti Antenna",
        "series": "Omni UHF 400MHz",
        "model": "AVO-400D/DII/E Omni 400MHz",
        "unit": "Unit",
        "price_idr": 6800000,
        "price_usd": 420,
        "desc_id": "Antena omnidirectional fiberglass UHF (400-470MHz) high-gain (5dBd / 7dBd). Dirancang khusus untuk base station & repeater DMR UHF.",
        "desc_en": "High-gain (5dBd / 7dBd) fiberglass omnidirectional UHF base antenna (400-470MHz) engineered for DMR repeater towers.",
        "features": ["5/7 dBd High Gain", "UHF 400-470MHz", "Omni 360°", "Heavy Fiberglass", "N-Female"],
        "best_for_id": "Antena utama tower repeater UHF — jangkauan 360 derajat optimal",
        "best_for_en": "Primary UHF repeater tower antenna — optimal 360-degree coverage",
        "iconBg": "linear-gradient(135deg,#0056b3,#0090cc)"
    },
    {
        "sku": "AVT-ANT-AVO900",
        "cat": "Avanti Antenna",
        "series": "Omni 800/900MHz",
        "model": "AVO-900C Omni 900MHz",
        "unit": "Unit",
        "price_idr": 7200000,
        "price_usd": 445,
        "desc_id": "Antena omnidirectional fiberglass 806-960MHz gain 5dBd untuk sistem trunking 800/900MHz dan multi-site.",
        "desc_en": "5dBd fiberglass omnidirectional base antenna (806-960MHz) for 800/900MHz trunking and multi-site networks.",
        "features": ["5 dBd Gain", "806-960MHz", "Omni 360°", "Trunking Grade", "N-Female"],
        "best_for_id": "Tower repeater 800/900MHz Connect Plus / Capacity Max",
        "best_for_en": "800/900MHz Connect Plus / Capacity Max repeater tower installations",
        "iconBg": "linear-gradient(135deg,#b45309,#78350f)"
    },

    # ─── INFRASTRUCTURE, RF ACCESSORIES, POWER & LICENSES (15 BOM SUB-ITEMS) ──
    {
        "sku": "RF-CAB-78-HELIAX",
        "cat": "RF Accessories & Cable",
        "series": "Low-Loss Feeder Cable",
        "model": "Kabel Coaxial 7/8\" Low-Loss Foam (Andrew/LS)",
        "unit": "Meter",
        "price_idr": 165000,
        "price_usd": 10.5,
        "desc_id": "Kabel feeder utama corrugated copper 7/8 inch low-loss untuk instalasi tower repeater (>25m) lengkap dengan grounding kit & clamp.",
        "desc_en": "7/8-inch corrugated copper low-loss main feeder cable for repeater towers (>25m) including hanger clamps and grounding kit.",
        "features": ["7/8 Inch", "Ultra Low Loss", "Corrugated Copper", "UV Jacket", "Includes Clamps"],
        "best_for_id": "Jalur transmisi RF utama dari ruang perangkat ke antena puncak tower",
        "best_for_en": "Main RF feeder run from equipment shelter to tower-top antenna",
        "iconBg": "linear-gradient(135deg,#334155,#0f172a)"
    },
    {
        "sku": "RF-CAB-12-SUPERFLEX",
        "cat": "RF Accessories & Cable",
        "series": "Indoor DAS & Jumper Cable",
        "model": "Kabel Coaxial 1/2\" Superflex / RG-8 Low-Loss",
        "unit": "Meter",
        "price_idr": 85000,
        "price_usd": 5.5,
        "desc_id": "Kabel coaxial 1/2 inch superflex untuk distribusi DAS in-building, jumper rak, dan tower pendek.",
        "desc_en": "1/2-inch superflex coaxial cable for in-building DAS distribution, rack jumpers, and short mast runs.",
        "features": ["1/2 Inch Superflex", "Indoor/Outdoor", "Low Attenuation", "Flexible Routing"],
        "best_for_id": "Distribusi antena indoor DAS gedung/mall dan kabel jumper repeater",
        "best_for_en": "In-building DAS antenna distribution and repeater rack jumpers",
        "iconBg": "linear-gradient(135deg,#475569,#1e293b)"
    },
    {
        "sku": "RF-CON-NFEMALE-SET",
        "cat": "RF Accessories & Cable",
        "series": "RF Connectors & Jumper",
        "model": "Konektor N-Male/Female 7/8\" + Jumper RG-214 & Grounding Kit",
        "unit": "Set",
        "price_idr": 2400000,
        "price_usd": 148,
        "desc_id": "Paket terminasi feeder per site: 2x Konektor 7/8\" N-Type, 2x Kabel Jumper RG-214/1/2\" Superflex, Grounding Kit, dan Rubber Weatherproofing Tape.",
        "desc_en": "Complete per-site feeder termination kit: 2x 7/8\" N-Type connectors, 2x RG-214/Superflex jumpers, grounding kit, and weatherproofing vulcanizing tape.",
        "features": ["N-Type Silver Plated", "RG-214 Jumpers", " Copper Grounding Kit", "3M Weatherproofing"],
        "best_for_id": "Terminasi kedap air dan rendah rugi-rugi pada setiap site repeater",
        "best_for_en": "Weatherproof, low-VSWR feeder termination for every repeater site",
        "iconBg": "linear-gradient(135deg,#475569,#334155)"
    },
    {
        "sku": "RF-PROT-ARRESTER",
        "cat": "RF Accessories & Cable",
        "series": "Lightning Protection",
        "model": "RF Coaxial Lightning Arrester (PolyPhaser / Diamond)",
        "unit": "Unit",
        "price_idr": 2850000,
        "price_usd": 175,
        "desc_id": "Penangkal petir lini koaksial RF (DC-blocked / gas tube) N-Female ke N-Female untuk melindungi repeater dari induksi petir pada tower.",
        "desc_en": "In-line RF coaxial lightning surge protector (N-Female to N-Female) safeguarding repeaters from tower lightning transients.",
        "features": ["Surge Protection", "VHF/UHF/900MHz", "N-Female", "Replaceable Gas Tube", "Low Insertion Loss"],
        "best_for_id": "Proteksi wajib setiap jalur antena outdoor sebelum masuk ke repeater/duplexer",
        "best_for_en": "Mandatory surge protection on every outdoor antenna feed before repeater/duplexer entry",
        "iconBg": "linear-gradient(135deg,#b45309,#78350f)"
    },
    {
        "sku": "RF-DAS-ANT-CEILING",
        "cat": "RF Accessories & Cable",
        "series": "In-Building DAS Antenna",
        "model": "Indoor Ceiling Omni Antenna + Power Splitter Set (DAS)",
        "unit": "Set",
        "price_idr": 3200000,
        "price_usd": 198,
        "desc_id": "Paket distribusi sinyal indoor per titik: Antena Ceiling Omni Wideband (136-960MHz) + Wilkinson RF Power Splitter/Coupler & konektor N.",
        "desc_en": "Per-node indoor signal distribution set: Wideband Ceiling Omni Antenna (136-960MHz) + low-loss RF Power Splitter/Directional Coupler.",
        "features": ["Wideband 136-960MHz", "Ceiling Mount", "Low PIM Splitter", "N-Female"],
        "best_for_id": "Distribusi sinyal radio di tiap lantai gedung, basement, rumah sakit, dan mall",
        "best_for_en": "In-building radio coverage across floors, basements, hospitals, and shopping malls",
        "iconBg": "linear-gradient(135deg,#0090cc,#0056b3)"
    },
    {
        "sku": "PWR-UPS-ONLINE",
        "cat": "Power & Infrastructure",
        "series": "Backup Power System",
        "model": "Smart Online UPS 1500VA/3000VA + Deep Cycle Battery Pack",
        "unit": "Set",
        "price_idr": 14500000,
        "price_usd": 895,
        "desc_id": "UPS Online Pure Sinewave Rackmount dengan bank baterai eksternal VRLA Deep-Cycle untuk backup operasi repeater 4–24 jam saat listrik PLN padam.",
        "desc_en": "Rackmount True Online Double-Conversion Sinewave UPS with external VRLA Deep-Cycle battery pack for 4–24h repeater backup.",
        "features": ["Online Double Conversion", "Pure Sinewave", "Extended Battery Pack", "SNMP Monitoring", "19\" Rackmount"],
        "best_for_id": "Backup daya kritis untuk setiap site repeater dan ruang server/dispatcher",
        "best_for_en": "Uninterruptible backup power for every repeater site and dispatch server room",
        "iconBg": "linear-gradient(135deg,#059669,#064e3b)"
    },
    {
        "sku": "PWR-SOLAR-OFFGRID",
        "cat": "Power & Infrastructure",
        "series": "Solar Hybrid Power",
        "model": "Industrial Solar Panel Array + MPPT Controller & LiFePO4 Bank",
        "unit": "Paket",
        "price_idr": 42000000,
        "price_usd": 2595,
        "desc_id": "Sistem catu daya tenaga surya otonom (Off-Grid/Hybrid): Panel Monocrystalline, MPPT Charge Controller, Baterai LiFePO4/VRLA, dan Panel Outdoor IP65.",
        "desc_en": "Autonomous Off-Grid/Hybrid Solar Power Kit: Monocrystalline PV array, industrial MPPT controller, LiFePO4/VRLA battery bank, IP65 enclosure.",
        "features": ["Monocrystalline PV", "Industrial MPPT", "Deep-Cycle / LiFePO4", "IP65 Outdoor Cabinet", "24/7 Autonomous"],
        "best_for_id": "Site repeater bukit/remote di tambang dan perkebunan sawit tanpa jaringan listrik PLN",
        "best_for_en": "Remote hilltop repeater sites in mining and plantations without grid power",
        "iconBg": "linear-gradient(135deg,#d97706,#92400e)"
    },
    {
        "sku": "INF-RACK-19U",
        "cat": "Power & Infrastructure",
        "series": "Equipment Enclosure",
        "model": "19\" Standing Close Rack 20U / Outdoor IP55 Cabinet + PDU & Fan",
        "unit": "Unit",
        "price_idr": 8500000,
        "price_usd": 525,
        "desc_id": "Rak server 19 inch (Indoor Close Rack 20U atau Outdoor Pole/Ground Cabinet IP55) lengkap dengan Heavy-Duty PDU, Roof Fan, dan Cagenut.",
        "desc_en": "19-inch equipment rack (20U Indoor perforated rack or IP55 Outdoor shelter cabinet) complete with industrial PDU, cooling fans, and grounding bar.",
        "features": ["19-Inch Standard", "Indoor 20U / Outdoor IP55", "Industrial PDU", "Cooling Fan", "Copper Ground Bar"],
        "best_for_id": "Proteksi fisik dan kerapian instalasi repeater, duplexer, router, dan UPS di setiap site",
        "best_for_en": "Secure housing for repeaters, duplexers, routers, and UPS at every site",
        "iconBg": "linear-gradient(135deg,#334155,#1e293b)"
    },
    {
        "sku": "NET-RTR-MIKROTIK",
        "cat": "Power & Infrastructure",
        "series": "IP Backhaul Networking",
        "model": "MikroTik Industrial Router + Managed PoE Switch (IP Backhaul)",
        "unit": "Set",
        "price_idr": 6500000,
        "price_usd": 400,
        "desc_id": "Perangkat jaringan IP site repeater: Router Gigabit VPN/QoS + Industrial Switch untuk interkoneksi IP Site Connect, Capacity Plus, dan RDAC.",
        "desc_en": "Repeater site IP networking kit: Gigabit VPN/QoS Router + Managed Switch for IP Site Connect, Linked Capacity Plus, and remote RDAC management.",
        "features": ["VPN IPSec Tunnel", "Voice QoS Priority", "Gigabit Ports", "Dual WAN Failover", "Rackmount"],
        "best_for_id": "Interkoneksi antar site repeater (IP Site Connect / LCP) via Fiber, Radio IP, atau Starlink",
        "best_for_en": "Inter-site repeater linking (IPSC / LCP) over Fiber, Microwave, or Starlink/VSAT",
        "iconBg": "linear-gradient(135deg,#0284c7,#0369a1)"
    },
    {
        "sku": "LIC-MOT-IPSC",
        "cat": "Software",
        "series": "Repeater Feature License",
        "model": "MOTOTRBO IP Site Connect License (HKVN4045)",
        "unit": "Lisensi",
        "price_idr": 4500000,
        "price_usd": 278,
        "desc_id": "Lisensi resmi Motorola untuk mengaktifkan fitur IP Site Connect (interkoneksi multi-site via jaringan IP) pada repeater MOTOTRBO.",
        "desc_en": "Official Motorola license key activating IP Site Connect multi-site linking on MOTOTRBO repeaters.",
        "features": ["Multi-Site Roaming", "Up to 15 Sites", "IP Backhaul", "Wide-Area Voice/Data"],
        "best_for_id": "Sistem multi-site IP Site Connect (menghubungkan hingga 15 lokasi repeater)",
        "best_for_en": "Multi-site IP Site Connect networks linking up to 15 repeater locations",
        "iconBg": "linear-gradient(135deg,#0056b3,#003875)"
    },
    {
        "sku": "LIC-MOT-CAPPLUS",
        "cat": "Software",
        "series": "Trunking License",
        "model": "MOTOTRBO Capacity Plus Single-Site License",
        "unit": "Lisensi",
        "price_idr": 12500000,
        "price_usd": 770,
        "desc_id": "Lisensi resmi Motorola untuk mengaktifkan trunking digital Capacity Plus Single-Site (dynamic channel pooling) pada repeater MOTOTRBO.",
        "desc_en": "Official Motorola license key enabling Capacity Plus Single-Site digital trunking (dynamic channel pooling) per repeater.",
        "features": ["Dynamic Trunking", "No Control Channel Overhead", "Up to 16 Voice Paths", "High Capacity"],
        "best_for_id": "Site tunggal dengan trafik pengguna tinggi (>50 radio atau >2 channel per site)",
        "best_for_en": "High-traffic single-site deployments (>50 users or multiple repeaters per site)",
        "iconBg": "linear-gradient(135deg,#7c3aed,#4c1d95)"
    },
    {
        "sku": "LIC-MOT-LCP",
        "cat": "Software",
        "series": "Multi-Site Trunking License",
        "model": "MOTOTRBO Capacity Plus Multi-Site (LCP) License",
        "unit": "Lisensi",
        "price_idr": 24500000,
        "price_usd": 1510,
        "desc_id": "Lisensi resmi Motorola untuk mengaktifkan Linked Capacity Plus (Capacity Plus Multi-Site): kombinasi trunking kapasitas tinggi dan roaming antar site.",
        "desc_en": "Official Motorola license key activating Capacity Plus Multi-Site (Linked Capacity Plus) combining trunking capacity with wide-area multi-site roaming.",
        "features": ["Multi-Site Trunking", "Up to 15 Sites", "Automatic Roaming", "High User Density"],
        "best_for_id": "Proyek multi-site kapasitas besar (tambang, perkebunan, bandara, kawasan industri)",
        "best_for_en": "High-capacity multi-site deployments (mining, plantations, airports, industrial estates)",
        "iconBg": "linear-gradient(135deg,#6d28d9,#4c1d95)"
    },
    {
        "sku": "LIC-MOT-CONPLUS",
        "cat": "Software",
        "series": "Enterprise Trunking Controller",
        "model": "MOTOTRBO Connect Plus / Capacity Max Site Controller & License",
        "unit": "Paket",
        "price_idr": 95000000,
        "price_usd": 5865,
        "desc_id": "Controller & Lisensi Trunking DMR Tier 3 / Connect Plus dengan dedicated control channel, call queuing, dan skalabilitas hingga 250 site.",
        "desc_en": "DMR Tier 3 / Connect Plus Trunking Site Controller & License featuring dedicated control channel, priority call queuing, scaling up to 250 sites.",
        "features": ["DMR Tier 3 / Connect Plus", "Dedicated Control Ch", "Priority Queuing", "Up to 250 Sites"],
        "best_for_id": "Infrastruktur skala besar / nasional dengan ratusan hingga ribuan pengguna radio",
        "best_for_en": "Large-scale mission-critical networks with hundreds to thousands of radio users",
        "iconBg": "linear-gradient(135deg,#dc2626,#991b1b)"
    },
    {
        "sku": "SVC-CDPK-MANDAYS",
        "cat": "Services & Engineering",
        "series": "Professional Engineering Services",
        "model": "Jasa Engineering: Site Survey, Instalasi, Tuning RF, Integrasi & Commissioning (WES)",
        "unit": "Mandays",
        "price_idr": 3500000,
        "price_usd": 216,
        "desc_id": "Layanan engineering profesional bersertifikat CDPK: Site Survey & Propagasi RF, Instalasi Tower/Perangkat, Tuning Duplexer & VSWR, Programming, Uji Terima (FAT/SAT), dan Pelatihan.",
        "desc_en": "Certified CDPK engineering services: RF Site Survey, Tower/Rack Installation, Duplexer & VSWR Tuning, Fleet Programming, FAT/SAT Commissioning, and Handover Training.",
        "features": ["Certified RF Engineers", "Site Survey & Path Loss", "Duplexer/VSWR Tuning", "FAT & SAT Handover", "User Training"],
        "best_for_id": "Implementasi proyek end-to-end berstandar Motorola Solutions Partner",
        "best_for_en": "Turnkey end-to-end project implementation to Motorola Solutions Partner standards",
        "iconBg": "linear-gradient(135deg,#059669,#065f46)"
    }
]

# 3. Define System Bundles (Parent-Child BOM Configurator Recipes)
SYSTEM_BUNDLES = [
    {
        "bundle_id": "SYS-RPT-SLR5300-OUTDOOR",
        "name_id": "Sistem Repeater Outdoor Lengkap — MOTOTRBO SLR 5300 (50W)",
        "name_en": "Complete Outdoor Repeater System — MOTOTRBO SLR 5300 (50W)",
        "category": "Repeater System",
        "desc_id": "Paket lengkap 1 channel repeater outdoor 50W siap operasi (Repeater SLR 5300 + Duplexer + Antena Omni Avanti + Kabel Feeder 7/8\" + Konektor + Lightning Arrester + Rack + UPS).",
        "desc_en": "Turnkey 1-channel 50W outdoor repeater system (SLR 5300 Repeater + Duplexer + Avanti Omni Antenna + 7/8\" Feeder Cable + Connectors + Lightning Arrester + Rack + UPS).",
        "components": [
            {"sku": "MOT-RPT-SLR5300", "role_id": "Unit Utama Repeater 50W", "role_en": "Primary 50W Repeater Unit", "qty_formula": "1", "default_qty": 1, "mandatory": True},
            {"sku": "RF-ACC-DUPLEXER", "role_id": "Duplexer Cavity VHF/UHF", "role_en": "VHF/UHF Band-Pass Duplexer", "qty_formula": "1", "default_qty": 1, "mandatory": True},
            {"sku": "AVT-ANT-AVO400", "role_id": "Antena Base Omni Utama", "role_en": "Primary Omni Base Antenna", "qty_formula": "1", "default_qty": 1, "mandatory": True},
            {"sku": "RF-CAB-78-HELIAX", "role_id": "Kabel Coaxial Feeder 7/8\" (Tinggi Tower + 15m)", "role_en": "7/8\" Low-Loss Feeder Cable (Tower Height + 15m)", "qty_formula": "tower_height + 15", "default_qty": 45, "mandatory": True},
            {"sku": "RF-CON-NFEMALE-SET", "role_id": "Konektor N, Jumper & Grounding Kit", "role_en": "N-Connectors, Jumpers & Grounding Kit", "qty_formula": "1", "default_qty": 1, "mandatory": True},
            {"sku": "RF-PROT-ARRESTER", "role_id": "Penangkal Petir RF Coaxial", "role_en": "RF Coaxial Lightning Arrester", "qty_formula": "1", "default_qty": 1, "mandatory": True},
            {"sku": "INF-RACK-19U", "role_id": "Standing Rack 19\" & Aksesoris", "role_en": "19\" Equipment Rack & PDU", "qty_formula": "1", "default_qty": 1, "mandatory": False},
            {"sku": "PWR-UPS-ONLINE", "role_id": "Sistem Backup UPS + Baterai", "role_en": "Online UPS + Deep-Cycle Battery Backup", "qty_formula": "1", "default_qty": 1, "mandatory": False}
        ]
    },
    {
        "bundle_id": "SYS-RPT-SLR8000-HIGHPOWER",
        "name_id": "Sistem Repeater High-Power — MOTOTRBO SLR 8000 (100W)",
        "name_en": "High-Power Repeater System — MOTOTRBO SLR 8000 (100W)",
        "category": "Repeater System",
        "desc_id": "Paket lengkap repeater 100W continuous duty untuk area tambang/perkebunan luas dengan kabel 7/8\", duplexer high-power, proteksi petir, dan backup daya.",
        "desc_en": "Complete 100W continuous-duty repeater package for wide-area mining/plantations with 7/8\" feeder, duplexer, surge protection, and backup power.",
        "components": [
            {"sku": "MOT-RPT-SLR8000", "role_id": "Unit Utama Repeater 100W", "role_en": "Primary 100W High-Power Repeater", "qty_formula": "1", "default_qty": 1, "mandatory": True},
            {"sku": "RF-ACC-DUPLEXER", "role_id": "Duplexer High-Power Cavity", "role_en": "High-Power Cavity Duplexer", "qty_formula": "1", "default_qty": 1, "mandatory": True},
            {"sku": "AVT-ANT-AVO400", "role_id": "Antena Base Omni High-Gain", "role_en": "High-Gain Omni Base Antenna", "qty_formula": "1", "default_qty": 1, "mandatory": True},
            {"sku": "RF-CAB-78-HELIAX", "role_id": "Kabel Coaxial Feeder 7/8\" (Tinggi Tower + 15m)", "role_en": "7/8\" Low-Loss Feeder Cable (Tower Height + 15m)", "qty_formula": "tower_height + 15", "default_qty": 55, "mandatory": True},
            {"sku": "RF-CON-NFEMALE-SET", "role_id": "Konektor N, Jumper & Grounding Kit", "role_en": "N-Connectors, Jumpers & Grounding Kit", "qty_formula": "1", "default_qty": 1, "mandatory": True},
            {"sku": "RF-PROT-ARRESTER", "role_id": "Penangkal Petir RF Coaxial", "role_en": "RF Coaxial Lightning Arrester", "qty_formula": "1", "default_qty": 1, "mandatory": True},
            {"sku": "INF-RACK-19U", "role_id": "Standing Rack 19\" & Aksesoris", "role_en": "19\" Equipment Rack & PDU", "qty_formula": "1", "default_qty": 1, "mandatory": False},
            {"sku": "PWR-UPS-ONLINE", "role_id": "Sistem Backup UPS + Baterai", "role_en": "Online UPS + Deep-Cycle Battery Backup", "qty_formula": "1", "default_qty": 1, "mandatory": False}
        ]
    },
    {
        "bundle_id": "SYS-DAS-SLR1000-INDOOR",
        "name_id": "Sistem Repeater In-Building DAS — MOTOTRBO SLR 1000",
        "name_en": "In-Building DAS Repeater System — MOTOTRBO SLR 1000",
        "category": "In-Building DAS",
        "desc_id": "Paket cakupan radio indoor gedung bertingkat / mall / rumah sakit (Repeater SLR 1000 + Duplexer + 4 Titik Antena Ceiling DAS + Splitter + Kabel Coaxial 1/2\").",
        "desc_en": "In-building radio distribution package for high-rises / malls / hospitals (SLR 1000 Repeater + Duplexer + 4 Ceiling DAS Antenna Nodes + Splitters + 1/2\" Coax).",
        "components": [
            {"sku": "MOT-RPT-SLR1000", "role_id": "Repeater In-Building SLR 1000", "role_en": "SLR 1000 Compact Repeater", "qty_formula": "1", "default_qty": 1, "mandatory": True},
            {"sku": "RF-ACC-DUPLEXER", "role_id": "Compact Duplexer UHF/VHF", "role_en": "Compact UHF/VHF Duplexer", "qty_formula": "1", "default_qty": 1, "mandatory": True},
            {"sku": "RF-DAS-ANT-CEILING", "role_id": "Titik Antena Ceiling Omni + Splitter DAS", "role_en": "Ceiling Omni Antenna + RF Splitter Set", "qty_formula": "4", "default_qty": 4, "mandatory": True},
            {"sku": "RF-CAB-12-SUPERFLEX", "role_id": "Kabel Distribusi 1/2\" Superflex Indoor", "role_en": "1/2\" Superflex Indoor Distribution Cable", "qty_formula": "100", "default_qty": 100, "mandatory": True},
            {"sku": "PWR-UPS-ONLINE", "role_id": "UPS Backup Daya Indoor", "role_en": "Indoor UPS Power Backup", "qty_formula": "1", "default_qty": 1, "mandatory": False}
        ]
    },
    {
        "bundle_id": "SYS-DISPATCH-CONTROL",
        "name_id": "Sistem Ruang Kontrol & Dispatch Terpadu",
        "name_en": "Integrated Control Room & Dispatch System",
        "category": "Dispatch & Control",
        "desc_id": "Paket ruang komando: RadioPro / WAVE PTX Dispatch + Radio Control Station XiR M8260i + Antena Yagi/Omni + Kabel + UPS.",
        "desc_en": "Command center package: RadioPro / WAVE PTX Dispatch Software + XiR M8260i Desktop Control Station + Antenna + Coax + UPS.",
        "components": [
            {"sku": "SW-RADIOPRO-SYS", "role_id": "Software Dispatch & GPS AVL", "role_en": "Dispatch & GPS AVL Software Suite", "qty_formula": "1", "default_qty": 1, "mandatory": True},
            {"sku": "MOT-MB-M8260I", "role_id": "Radio Control Station Gateway", "role_en": "Desktop Control Station Radio", "qty_formula": "1", "default_qty": 1, "mandatory": True},
            {"sku": "AVT-ANT-AVO150", "role_id": "Antena Base/Yagi Ruang Kontrol", "role_en": "Control Room Base/Yagi Antenna", "qty_formula": "1", "default_qty": 1, "mandatory": True},
            {"sku": "RF-CAB-12-SUPERFLEX", "role_id": "Kabel Coaxial 1/2\" ke Atap", "role_en": "1/2\" Coaxial Run to Roof", "qty_formula": "30", "default_qty": 30, "mandatory": True},
            {"sku": "PWR-UPS-ONLINE", "role_id": "UPS Workstation & Gateway", "role_en": "Workstation & Gateway UPS", "qty_formula": "1", "default_qty": 1, "mandatory": False}
        ]
    },
    {
        "bundle_id": "SYS-CCTV-ENTERPRISE-8CH",
        "name_id": "Paket CCTV AI Enterprise Avigilon (8 Titik Kamera + AI NVR)",
        "name_en": "Avigilon Enterprise AI CCTV Bundle (8 Camera Nodes + AI NVR)",
        "category": "CCTV System",
        "desc_id": "Paket pengawasan video AI: 4x H6A Dome 8MP + 4x H6X Bullet 8MP + 1x Avigilon AI NVR + Lisensi Avigilon Unity Video 8.",
        "desc_en": "Turnkey AI video security bundle: 4x H6A 8MP Domes + 4x H6X 8MP Bullets + 1x Avigilon AI NVR + Avigilon Unity Video 8 VMS.",
        "components": [
            {"sku": "AVG-CAM-H6A-DOME8", "role_id": "Kamera Indoor/Semi-Outdoor AI Dome 8MP", "role_en": "Indoor/Semi-Outdoor 8MP AI Dome Camera", "qty_formula": "4", "default_qty": 4, "mandatory": True},
            {"sku": "AVG-CAM-H6X-BUL8", "role_id": "Kamera Perimeter Outdoor AI Bullet 8MP", "role_en": "Outdoor Perimeter 8MP AI Bullet Camera", "qty_formula": "4", "default_qty": 4, "mandatory": True},
            {"sku": "AVG-SRV-AINVR", "role_id": "Server Perekam Avigilon AI NVR", "role_en": "Avigilon AI NVR Appliance", "qty_formula": "1", "default_qty": 1, "mandatory": True},
            {"sku": "AVG-VMS-UNITY8", "role_id": "Lisensi Avigilon Unity Video 8 VMS", "role_en": "Avigilon Unity Video 8 VMS License", "qty_formula": "1", "default_qty": 1, "mandatory": True}
        ]
    }
]

# 4. Define Industry RF Parameters (10 Verticals)
INDUSTRY_RF_PARAMS = [
    {
        "key": "mining",
        "label_id": "Pertambangan (Mining)",
        "label_en": "Mining & Quarrying",
        "vhf_radius_km": 18.0,
        "uhf_radius_km": 12.0,
        "800_radius_km": 9.0,
        "call_rate": 0.40,
        "terrain_factor": 1.35,
        "recommended_band": "vhf",
        "mandatory_atex": False,
        "mandatory_encryption": False,
        "mandatory_man_down": True,
        "ht_primary_sku": "MOT-HT-R7",
        "ht_secondary_sku": "MOT-HT-P8600I",
        "mobile_sku": "MOT-MB-M8600I"
    },
    {
        "key": "oil_gas",
        "label_id": "Minyak & Gas (Oil & Gas)",
        "label_en": "Oil, Gas & Petrochemical",
        "vhf_radius_km": 20.0,
        "uhf_radius_km": 14.0,
        "800_radius_km": 10.0,
        "call_rate": 0.35,
        "terrain_factor": 1.25,
        "recommended_band": "uhf",
        "mandatory_atex": True,
        "mandatory_encryption": True,
        "mandatory_man_down": True,
        "ht_primary_sku": "MOT-HT-P8600EX",
        "ht_secondary_sku": "MOT-HT-R7",
        "mobile_sku": "MOT-MB-M8600I"
    },
    {
        "key": "palm_oil",
        "label_id": "Perkebunan & Kehutanan (Plantation)",
        "label_en": "Plantation & Forestry",
        "vhf_radius_km": 22.0,
        "uhf_radius_km": 14.0,
        "800_radius_km": 10.0,
        "call_rate": 0.25,
        "terrain_factor": 1.30,
        "recommended_band": "vhf",
        "mandatory_atex": False,
        "mandatory_encryption": False,
        "mandatory_man_down": False,
        "ht_primary_sku": "MOT-HT-R2",
        "ht_secondary_sku": "MOT-HT-P8600I",
        "mobile_sku": "MOT-MB-M8600I"
    },
    {
        "key": "airport",
        "label_id": "Bandara & Pelabuhan (Airport / Seaport)",
        "label_en": "Airport & Seaport Operations",
        "vhf_radius_km": 12.0,
        "uhf_radius_km": 9.0,
        "800_radius_km": 8.0,
        "call_rate": 0.45,
        "terrain_factor": 1.15,
        "recommended_band": "800",
        "mandatory_atex": False,
        "mandatory_encryption": True,
        "mandatory_man_down": False,
        "ht_primary_sku": "MOT-HT-R7",
        "ht_secondary_sku": "MOT-HT-ION",
        "mobile_sku": "MOT-MB-M8668I-800"
    },
    {
        "key": "manufacturing",
        "label_id": "Manufaktur & Pabrik (Manufacturing)",
        "label_en": "Manufacturing & Industrial Plant",
        "vhf_radius_km": 8.0,
        "uhf_radius_km": 7.0,
        "800_radius_km": 6.0,
        "call_rate": 0.30,
        "terrain_factor": 1.40,
        "recommended_band": "uhf",
        "mandatory_atex": False,
        "mandatory_encryption": False,
        "mandatory_man_down": False,
        "ht_primary_sku": "MOT-HT-R2",
        "ht_secondary_sku": "MOT-HT-R7",
        "mobile_sku": "MOT-MB-M8260I"
    },
    {
        "key": "public_safety",
        "label_id": "Keamanan Publik & Darurat (Public Safety)",
        "label_en": "Public Safety & Emergency Services",
        "vhf_radius_km": 15.0,
        "uhf_radius_km": 11.0,
        "800_radius_km": 9.0,
        "call_rate": 0.50,
        "terrain_factor": 1.30,
        "recommended_band": "uhf",
        "mandatory_atex": False,
        "mandatory_encryption": True,
        "mandatory_man_down": True,
        "ht_primary_sku": "MOT-HT-R7",
        "ht_secondary_sku": "MOT-HT-P8600I",
        "mobile_sku": "MOT-MB-M8600I"
    },
    {
        "key": "logistics",
        "label_id": "Logistik & Pergudangan (Logistics)",
        "label_en": "Logistics, Supply Chain & Warehousing",
        "vhf_radius_km": 14.0,
        "uhf_radius_km": 10.0,
        "800_radius_km": 8.0,
        "call_rate": 0.30,
        "terrain_factor": 1.20,
        "recommended_band": "uhf",
        "mandatory_atex": False,
        "mandatory_encryption": False,
        "mandatory_man_down": False,
        "ht_primary_sku": "MOT-HT-R2",
        "ht_secondary_sku": "MOT-HT-TLK100",
        "mobile_sku": "MOT-MB-M8600I"
    },
    {
        "key": "hospital",
        "label_id": "Rumah Sakit & Kesehatan (Hospital)",
        "label_en": "Hospital & Healthcare Campus",
        "vhf_radius_km": 4.0,
        "uhf_radius_km": 3.5,
        "800_radius_km": 3.0,
        "call_rate": 0.25,
        "terrain_factor": 1.60,
        "recommended_band": "uhf",
        "mandatory_atex": False,
        "mandatory_encryption": False,
        "mandatory_man_down": False,
        "ht_primary_sku": "MOT-HT-SL1M",
        "ht_secondary_sku": "MOT-HT-C1200",
        "mobile_sku": "MOT-MB-M8260I"
    },
    {
        "key": "hotel",
        "label_id": "Hotel, Resort & Hospitality",
        "label_en": "Hotel, Resort & Hospitality",
        "vhf_radius_km": 5.0,
        "uhf_radius_km": 4.5,
        "800_radius_km": 4.0,
        "call_rate": 0.25,
        "terrain_factor": 1.50,
        "recommended_band": "uhf",
        "mandatory_atex": False,
        "mandatory_encryption": False,
        "mandatory_man_down": False,
        "ht_primary_sku": "MOT-HT-SL1M",
        "ht_secondary_sku": "MOT-HT-R2",
        "mobile_sku": "MOT-MB-M8260I"
    },
    {
        "key": "mall",
        "label_id": "Mall, Retail & Mixed-Use Building",
        "label_en": "Shopping Mall, Retail & Mixed-Use Complex",
        "vhf_radius_km": 4.5,
        "uhf_radius_km": 4.0,
        "800_radius_km": 3.5,
        "call_rate": 0.30,
        "terrain_factor": 1.55,
        "recommended_band": "uhf",
        "mandatory_atex": False,
        "mandatory_encryption": False,
        "mandatory_man_down": False,
        "ht_primary_sku": "MOT-HT-R2",
        "ht_secondary_sku": "MOT-HT-SL1M",
        "mobile_sku": "MOT-MB-M8260I"
    }
]

# 5. Commercial Config
COMMERCIAL_CONFIG = {
    "usd_to_idr": 16200,
    "ppn_percent": 11,
    "default_margin_percent": 15,
    "default_discount_percent": 0,
    "mandays_rate_idr": 3500000,
    "mandays_rate_usd": 216,
    "company_name": "PT Citradata Purnakharisma (CDPK)",
    "quotation_validity_days": 30,
    "payment_terms_id": "DP 30% saat PO, 60% saat pengiriman barang (Delivery), 10% setelah BAST / Commissioning.",
    "payment_terms_en": "30% Down Payment upon PO, 60% upon Hardware Delivery, 10% upon Commissioning & Handover (BAST).",
    "warranty_terms_id": "Garansi resmi perangkat utama Motorola / Avigilon 12 bulan (1 Tahun) terhadap cacat pabrik.",
    "warranty_terms_en": "Official 12-Month (1 Year) manufacturer warranty for primary Motorola / Avigilon hardware."
}

# Save data/default_knowledge.json
knowledge_payload = {
    "version": "8.0.0-cdpk",
    "app_name": "CDPK System Planner",
    "spreadsheet_id": SPREADSHEET_ID,
    "folder_id": FOLDER_ID,
    "commercial_config": COMMERCIAL_CONFIG,
    "products_catalog": PRODUCTS_CATALOG,
    "system_bundles": SYSTEM_BUNDLES,
    "industry_rf_params": INDUSTRY_RF_PARAMS
}

json_path = os.path.join(DATA_DIR, "default_knowledge.json")
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(knowledge_payload, f, indent=2, ensure_ascii=False)
print(f"[OK] Saved local knowledge bank -> {json_path} ({len(PRODUCTS_CATALOG)} items, {len(SYSTEM_BUNDLES)} bundles)")

# 6. Build 4-Sheet Excel Workbook (Master_Pricelist_CDPK.xlsx)
wb = openpyxl.Workbook()

header_fill = PatternFill(start_color="003875", end_color="003875", fill_type="solid")
header_font = Font(name="Calibri", size=11, bold=True, color="FFFFFF")
thin_border = Border(
    left=Side(style="thin", color="CBD5E1"),
    right=Side(style="thin", color="CBD5E1"),
    top=Side(style="thin", color="CBD5E1"),
    bottom=Side(style="thin", color="CBD5E1")
)

def style_sheet(ws, headers, col_widths):
    ws.append(headers)
    for col_idx, h in enumerate(headers, start=1):
        cell = ws.cell(row=1, column=col_idx)
        cell.fill = header_fill
        cell.font = header_font
        cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
    ws.row_dimensions[1].height = 28
    for col_letter, width in col_widths.items():
        ws.column_dimensions[col_letter].width = width

# Sheet 1: Products_Catalog
ws_prod = wb.active
ws_prod.title = "Products_Catalog"
prod_headers = [
    "SKU", "Category", "Series", "Model_Name", "Unit",
    "Price_IDR", "Price_USD", "Description_ID", "Description_EN",
    "Features", "Best_For_ID", "Best_For_EN", "Icon_Bg"
]
style_sheet(ws_prod, prod_headers, {
    "A": 20, "B": 22, "C": 24, "D": 38, "E": 10,
    "F": 16, "G": 14, "H": 48, "I": 48, "J": 35, "K": 40, "L": 40, "M": 30
})
for p in PRODUCTS_CATALOG:
    ws_prod.append([
        p["sku"], p["cat"], p["series"], p["model"], p["unit"],
        p["price_idr"], p["price_usd"], p["desc_id"], p["desc_en"],
        ", ".join(p["features"]), p["best_for_id"], p["best_for_en"], p["iconBg"]
    ])

# Sheet 2: System_Bundles
ws_bun = wb.create_sheet("System_Bundles")
bun_headers = [
    "Bundle_ID", "Bundle_Name_ID", "Bundle_Name_EN", "Category",
    "Component_SKU", "Role_ID", "Role_EN", "Qty_Formula",
    "Default_Qty", "Mandatory", "Bundle_Desc_ID", "Bundle_Desc_EN"
]
style_sheet(ws_bun, bun_headers, {
    "A": 26, "B": 42, "C": 42, "D": 18, "E": 22,
    "F": 36, "G": 36, "H": 20, "I": 14, "J": 12, "K": 45, "L": 45
})
for b in SYSTEM_BUNDLES:
    for c in b["components"]:
        ws_bun.append([
            b["bundle_id"], b["name_id"], b["name_en"], b["category"],
            c["sku"], c["role_id"], c["role_en"], c["qty_formula"],
            c["default_qty"], "TRUE" if c["mandatory"] else "FALSE",
            b["desc_id"], b["desc_en"]
        ])

# Sheet 3: Industry_RF_Params
ws_ind = wb.create_sheet("Industry_RF_Params")
ind_headers = [
    "Industry_Key", "Label_ID", "Label_EN", "VHF_Radius_Km", "UHF_Radius_Km",
    "800_Radius_Km", "Call_Rate", "Terrain_Factor", "Recommended_Band",
    "Mandatory_ATEX", "Mandatory_Encryption", "Mandatory_ManDown",
    "HT_Primary_SKU", "HT_Secondary_SKU", "Mobile_SKU"
]
style_sheet(ws_ind, ind_headers, {
    "A": 18, "B": 32, "C": 32, "D": 15, "E": 15,
    "F": 15, "G": 12, "F": 15, "H": 15, "I": 18, "J": 15, "K": 18, "L": 18,
    "M": 20, "N": 20, "O": 20
})
for ind in INDUSTRY_RF_PARAMS:
    ws_ind.append([
        ind["key"], ind["label_id"], ind["label_en"],
        ind["vhf_radius_km"], ind["uhf_radius_km"], ind["800_radius_km"],
        ind["call_rate"], ind["terrain_factor"], ind["recommended_band"],
        "TRUE" if ind["mandatory_atex"] else "FALSE",
        "TRUE" if ind["mandatory_encryption"] else "FALSE",
        "TRUE" if ind["mandatory_man_down"] else "FALSE",
        ind["ht_primary_sku"], ind["ht_secondary_sku"], ind["mobile_sku"]
    ])

# Sheet 4: Commercial_Config
ws_cfg = wb.create_sheet("Commercial_Config")
style_sheet(ws_cfg, ["Config_Key", "Config_Value", "Notes"], {"A": 28, "B": 55, "C": 45})
for k, v in COMMERCIAL_CONFIG.items():
    ws_cfg.append([k, v, "Live synced parameter for CDPK System Planner"])

xlsx_path = os.path.join(DATA_DIR, "Master_Pricelist_CDPK.xlsx")
wb.save(xlsx_path)
print(f"[OK] Generated 4-sheet workbook -> {xlsx_path}")

# 7. Upload/Update Google Sheet 1Kp85v81JXeRC5ti-ZXYBChgrj2ztnnwrCHokI02LX6U via Drive v3 API
if os.path.exists(TOKEN_PATH):
    with open(TOKEN_PATH, "r", encoding="utf-8") as f:
        d = json.load(f)
    tok_obj = d.get("token", {})
    refresh_tok = tok_obj.get("refresh_token") if isinstance(tok_obj, dict) else d.get("refresh_token")
    # Refresh token to ensure valid access_token
    refresh_data = urllib.parse.urlencode({
        "client_id": d["client_id"],
        "client_secret": d["client_secret"],
        "refresh_token": refresh_tok,
        "grant_type": "refresh_token"
    }).encode("utf-8")
    req = urllib.request.Request("https://oauth2.googleapis.com/token", data=refresh_data, method="POST")
    with urllib.request.urlopen(req, timeout=15) as resp:
        new_tok = json.loads(resp.read().decode("utf-8"))
    access_token = new_tok["access_token"]

    with open(xlsx_path, "rb") as f:
        xlsx_bytes = f.read()

    upload_url = f"https://www.googleapis.com/upload/drive/v3/files/{SPREADSHEET_ID}?uploadType=media&supportsAllDrives=true"
    up_req = urllib.request.Request(
        upload_url,
        data=xlsx_bytes,
        method="PATCH",
        headers={
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }
    )
    with urllib.request.urlopen(up_req, timeout=30) as up_resp:
        res_json = json.loads(up_resp.read().decode("utf-8"))
        print(f"[OK] Synced 4-sheet Master Pricelist to Google Sheet ID: {res_json.get('id')} ({res_json.get('name')})")
else:
    print(f"[WARN] Token file not found at {TOKEN_PATH}, skipped remote upload.")
