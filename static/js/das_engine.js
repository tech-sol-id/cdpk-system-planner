/**
 * CDPK System Planner Enterprise - Standalone Modular FMTCS Fiber DAS Frontend Engine
 * Phase 3 Implementation: High-Precision RF Calculators, Link Budget, Okumura-Hata Outdoor Coverage,
 * Intelligent BoQ Sizing Engine, Topology Visualizer & Commissioning Quality Suite.
 *
 * Exposes: window.CDPK_DAS_ENGINE
 * Supported Languages: English ('en') & Bahasa Indonesia ('id') strictly. (Chinese 'zh' excluded).
 *
 * (c) 2026 PT Citra Data Purnama Karya (CDPK). All Rights Reserved.
 */
(function(global) {
    "use strict";

    /* =========================================================================
     * 1. CORE CONSTANTS, I18N DICTIONARY & COMPONENT CATALOG
     * ========================================================================= */

    var log10 = function(x) {
        return Math.log(x) / Math.LN10;
    };

    /**
     * cyrb53 (c) 2018 bryc (github.com/bryc)
     * High-speed, deterministic 53-bit hash algorithm for handoff verification
     */
    function cyrb53(str, seed) {
        seed = seed || 0;
        var h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
        for (var i = 0, ch; i < str.length; i++) {
            ch = str.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
        h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
        h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
        h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
        return 4294967296 * (2097151 & h2) + (h1 >>> 0);
    }

    /**
     * Cross-platform UTF-8 Base64 Encoder / Decoder
     */
    function b64enc(str) {
        if (typeof btoa !== 'undefined') {
            try {
                return btoa(unescape(encodeURIComponent(str)));
            } catch (e) {}
        }
        if (typeof Buffer !== 'undefined') {
            return Buffer.from(str, 'utf-8').toString('base64');
        }
        return '';
    }

    function b64dec(b64) {
        if (typeof atob !== 'undefined') {
            try {
                return decodeURIComponent(escape(atob(b64)));
            } catch (e) {}
        }
        if (typeof Buffer !== 'undefined') {
            return Buffer.from(b64, 'base64').toString('utf-8');
        }
        return '';
    }

    /**
     * Number & String Formatting Utilities
     */
    function fmt(x, dp) {
        if (!isFinite(x) || x === null || x === undefined) return "—";
        if (x === 0) return "0";
        var a = Math.abs(x), s;
        if (a < 0.001 || a >= 1e7) {
            return x.toExponential(3);
        }
        if (dp == null) {
            dp = (a < 1 ? 4 : (a < 10 ? 3 : (a < 1000 ? 2 : 1)));
        }
        s = x.toFixed(dp);
        if (s.indexOf(".") > -1) {
            s = s.replace(/0+$/, "").replace(/\.$/, "");
        }
        var p = s.split(".");
        p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return p.join(".");
    }

    function fmtInt(x) {
        if (!isFinite(x) || x === null || x === undefined) return "—";
        return Math.round(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function fmtMoney(x, cur) {
        if (!isFinite(x) || x === null || x === undefined) return "—";
        if (cur === "IDR") return "Rp " + fmtInt(Math.round(x));
        return "$ " + fmt(x, 2);
    }

    function esc(s) {
        return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    function csvq(s) {
        s = (s == null ? "" : String(s));
        return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    }

    /* =========================================================================
     * 2. COMPLETE BILINGUAL I18N DICTIONARY (ID & EN ONLY)
     * ========================================================================= */
    var I18N = {
        en: {
            tab_conv: "Conversions",
            tab_link: "Link Budget",
            tab_boq: "BoQ Estimator",
            tab_comm: "Commissioning",
            tab_prod: "Products",
            tab_cov: "Outdoor Coverage",
            tab_boqd: "BoQ Design",
            eyebrow: "Technical reference · DAS / RFoF",
            h1: "RF conversions for FMTCS DAS System",
            lede: "Live calculators and reference tables for the units used most when designing, quoting and commissioning two-way DAS & RF-over-Fiber systems. Type in any field — the others update automatically.",
            p_title: "Power — dBm ⇄ mW ⇄ Watt",
            p_tag: "most used",
            p_l1: "Power (dBm)",
            p_l2: "Power (milliwatt)",
            p_l3: "Power (watt)",
            p_note: "mW = 10<sup>(dBm/10)</sup> · W = mW ÷ 1000. <b>0 dBm = 1 mW</b>, <b>30 dBm = 1 W</b>; +10 dB = ×10, +3 dB ≈ ×2.",
            g_title: "Gain / Loss — dB ⇄ ratio",
            g_tag: "link budget",
            g_l1: "Value (dB)",
            g_l2: "Power ratio (×)",
            g_l3: "Voltage ratio (×)",
            g_note: "Positive dB = gain, negative = loss. Along a chain, dB values simply <b>add up</b>.",
            v_title: "Matching — VSWR ⇄ Return Loss",
            v_tag: "commissioning",
            v_l1: "VSWR (≥ 1)",
            v_l2: "Return Loss",
            v_note: "Closer to <b>1.0</b> is better. FMTCS devices are all rated <b>VSWR ≤ 1.5</b> (RL ≥ 14 dB).",
            u_title: "Meter — dBµV ⇄ dBm (50Ω)",
            u_tag: "field",
            u_l1: "Level (dBµV)",
            u_l2: "Level (dBm)",
            u_note: "For 50 ohm: dBm = dBµV − 107. Aligns field-meter (dBµV) readings with radio sensitivity (dBm).",
            s1_t: "Quick power table",
            s3_t: "VSWR / Return Loss table",
            s3_h: "matching quality",
            cap_power: "+3 dB ≈ power ×2 · +10 dB = power ×10 · −3 dB ≈ power ÷2",
            cap_vswr: "Γ = (VSWR−1)/(VSWR+1) · RL = −20·log(Γ)",
            foot1: "Internal reference tool — Citradata / FMTCS DAS. Defaults from real FMTCS datasheets; verify per project.",
            cov_eyebrow: "Outdoor macro coverage · VHF/UHF",
            cov_h1: "Outdoor Coverage (Okumura–Hata)",
            cov_lede: "Estimate outdoor path loss and up/down link margins from a base/repeater to a handheld, using the Okumura–Hata model. Empty fields show a hint; fill all to compute. A margin above 0 dB means covered at that distance.",
            cov_in_title: "Parameters (fill all)",
            cov_out_t: "Coverage result",
            cov_hint: "Fill all parameters above to see the result.",
            bq_floor_ph: "Floor / zone name",
            cov_f: "Frequency (MHz)",
            cov_d: "Test distance (km)",
            cov_ht: "BS antenna height (m)",
            cov_hm: "HT antenna height (m)",
            cov_txbs: "BS TX power (dBm)",
            cov_txms: "HT TX power (dBm)",
            cov_gbs: "BS antenna gain (dBi)",
            cov_gms: "HT antenna gain (dBi)",
            cov_rxbs: "BS sensitivity (dBm)",
            cov_rxms: "HT sensitivity (dBm)",
            cov_flbs: "BS feeder loss (dB)",
            cov_flms: "HT feeder loss (dB)",
            cov_f_ph: "150–200 (VHF) or 400–1500 (UHF)",
            cov_d_ph: "e.g. 5",
            cov_ht_ph: "e.g. 25",
            cov_hm_ph: "e.g. 1.5",
            cov_txbs_ph: "e.g. 47",
            cov_txms_ph: "e.g. 37",
            cov_gbs_ph: "e.g. 5",
            cov_gms_ph: "e.g. 3",
            cov_rxbs_ph: "e.g. -95",
            cov_rxms_ph: "e.g. -95",
            cov_flbs_ph: "e.g. 3",
            cov_flms_ph: "e.g. 1",
            cov_th: ["Environment", "Path loss (dB)", "Uplink (dB)", "Downlink (dB)", "Status", "Max dist (km)"],
            cov_env: {
                urbanS: "Urban (small/med)",
                urbanL: "Urban (large)",
                subS: "Suburban (small/med)",
                subL: "Suburban (large)",
                openS: "Open area (small/med)",
                openL: "Open area (large)"
            },
            cov_cap: "Okumura–Hata: L = 69.55 + 26.16·log f − 13.82·log ht − α(hm) + (44.9 − 6.55·log ht)·log d. Suburban/open corrections follow your Excel model. Planning estimate — confirm with a site survey.",
            th_power: ["dBm", "milliwatt (mW)", "watt (W)", "Field context"],
            th_vswr: ["VSWR", "Return Loss (dB)", "Γ", "% reflected", "Rating"],
            c: {
                power: "power",
                voltage: "voltage",
                refl: "reflected",
                gain: "gain",
                loss: "loss",
                none: "no change",
                pass: "pass",
                border: "borderline",
                fail: "fail",
                invalid: "enter a valid number",
                vge1: "VSWR must be ≥ 1",
                rlge0: "RL must be ≥ 0"
            },
            lb_eyebrow: "Downlink coverage · planning estimate",
            lb_h1: "DAS Link Budget",
            lb_lede: "Trace the signal from ORU output through the passive network to the antenna, and estimate coverage per antenna. Defaults come from FMTCS DORU/ANTI datasheets.",
            lb_in_title: "Signal chain (downlink)",
            lb_oru: "ORU output power",
            lb_cable: "Coax cable",
            lb_len: "Cable length",
            lb_nsplit: "2-way splitters in path",
            lb_other: "Other loss (connectors/coupler)",
            lb_antg: "Antenna gain",
            lb_cov_title: "Coverage estimate",
            lb_env: "Environment",
            lb_target: "Target signal (radio sensitivity)",
            lb_margin: "Fade + body margin",
            lb_chain_t: "Signal chain result",
            lb_chain_h: "level at each stage",
            lb_cap: "ORU output 40±2 dBm (DORU400CH) · Indoor antenna 3 dBi (ANTI400R) · 2-way splitter 3.3 dB (FMTCS-PD). Coverage is a planning estimate — confirm with a site survey.",
            th_chain: ["Stage", "dB", "Level (dBm)"],
            lb_st_oru: "ORU output",
            lb_st_cable: "Coax cable loss",
            lb_st_split: "Splitter loss",
            lb_st_other: "Other loss",
            lb_st_antin: "Antenna input",
            lb_st_gain: "Antenna gain",
            lb_st_eirp: "EIRP (radiated)",
            lb_s_antin: "Antenna input",
            lb_s_eirp: "EIRP",
            lb_s_radius: "Coverage radius",
            lb_s_area: "Area / antenna",
            lb_h_good: "Antenna input power is in the healthy range (−5 to +20 dBm).",
            lb_h_hi: "Antenna input power is high (> 20 dBm) — add distribution loss or split further.",
            lb_h_lo: "Antenna input power is low (< −5 dBm) — reduce loss or add an amplifier/ORU.",
            env_open: "Open / line-of-sight",
            env_office: "Office / light walls",
            env_dense: "Dense / industrial",
            env_under: "Underground / tunnel",
            bq_eyebrow: "Quantity & cost estimate",
            bq_h1: "BoQ Estimator",
            bq_lede: "Estimate the main equipment quantities for a DAS project from the number of antenna points. Ratios default to the real MY03 data-center project and are fully editable.",
            bq_in_title: "Project size",
            bq_ant: "Indoor antenna points",
            bq_rep: "Repeaters (channels)",
            bq_radio: "Two-way radios",
            bq_outo: "Outdoor omni antennas",
            bq_outd: "Outdoor directional antennas",
            bq_ratio_title: "Design ratios",
            bq_ratio_tag: "editable",
            bq_r_oru: "Antennas per ORU",
            bq_r_omu: "ORU per OMU (digital)",
            bq_r_split: "Splitters per antenna",
            bq_r_coup: "Couplers per antenna",
            bq_r_cable: "Cable per antenna",
            bq_out_t: "Estimated Bill of Quantities",
            bq_out_h: "enter unit price for amount",
            bq_print: "Print / Save PDF",
            bq_cap: "Ratios derived from reference project MY03 (575 antennas, 18 ORU). Prices are entered by you — no prices are stored in the tool.",
            th_boq: ["Item", "Model", "Qty", "Unit price", "Cur", "Amount (USD)", "Amount (Rp)"],
            bq_cur: "Currency",
            bq_kurs: "Rate (Rp per 1 USD)",
            bq_showrp: "Show Rupiah conversion",
            bq_lock_title: "Estimator access only",
            bq_lock_desc: "The pricing, ratios and priced BoQ are for the estimator. Enter the estimator access code to open them.",
            bq_lock_lbl: "Access code",
            bq_wrong: "Wrong code — try again.",
            bq_unlock: "Unlock",
            bq_relock: "→ Lock again",
            bq_design_t: "Design input",
            bq_design_tag: "open · designer",
            bq_proj: "Project / building",
            bq_by: "Designed by",
            bq_set_t: "Estimator settings",
            bq_h1d: "BoQ Design Input",
            bq_ledd: "Enter the project design and per-floor antenna breakdown, then export a design code to send to the estimator. Pricing is done in the estimator version.",
            bq_noted: "Fill the numbers and the per-floor breakdown, then press Export and send the code (WhatsApp/email) to the estimator, who prices the BoQ.",
            bq_export: "Export design code",
            bq_copy: "Copy",
            bq_load: "Load code",
            bq_token_ph: "Paste the design code here to load, or press Export to generate one…",
            bq_design_note: "The designer fills these numbers and presses Export, then sends the code (WhatsApp/email) to the estimator. The estimator pastes it, presses Load, then unlocks below to price the BoQ. No estimator code is needed to export.",
            bq_msg_exported: "Design code generated — copy it and send to the estimator.",
            bq_msg_copied: "Copied to clipboard.",
            bq_msg_copyfail: "Select the text and copy manually (Ctrl/Cmd+C).",
            bq_msg_loaded: "Design loaded — unlock below to compute the BoQ.",
            bq_msg_bad: "Invalid or corrupted code — make sure you pasted the whole thing.",
            bq_msg_empty: "Paste a design code first.",
            pl_t: "Antenna-count planner",
            pl_h: "area → antennas",
            pl_in: "Coverage inputs",
            pl_out: "Antennas needed",
            pl_area: "Total floor area",
            pl_r: "Coverage radius / antenna",
            pl_util: "Usable area factor",
            pl_use: "→ Use in BoQ",
            pl_note: "Antennas ≈ area ÷ (π·r² × usable factor), rounded up. Rough planning figure — confirm with a site survey.",
            pl_s_ant: "Antennas",
            pl_s_per: "Area / antenna",
            th_floors: ["Floor / zone", "Indoor antennas", ""],
            bq_floors_t: "Per-floor / zone breakdown",
            bq_floor_add: "+ Floor",
            bq_floors_total: "Total antennas",
            pl_proj: "Project name (optional)",
            pl_export: "Export design code",
            pl_token_ph: "Design code appears here — send it to the estimator.",
            pl_msg_exported: "Design code created — copy or QR it to the estimator.",
            bq_qr: "QR code",
            bq_res_export: "Export BoQ result code",
            bq_csv: "Export CSV (Excel)",
            bq_res_t: "BoQ result (received)",
            bq_drive_btn: "Save to shared Drive",
            bq_drive_cfg: "Drive setup",
            bq_drive_savecfg: "Save setup",
            bq_drive_help: "One-time setup. Paste the Web App URL and the shared password from your Apps Script deployment. Stored only in this browser.",
            bq_drive_url: "Web App URL",
            bq_drive_secret: "Shared password",
            bq_drive_sending: "Sending to Drive…",
            bq_drive_sent: "Sent. Open the shared Drive folder to confirm the file arrived.",
            bq_drive_err: "Could not send. Check the Web App URL and your internet connection.",
            bq_drive_nourl: "Set the Web App URL first (Drive setup).",
            bq_drive_cfgsaved: "Setup saved in this browser.",
            guide_btn: "Guide",
            guide_title: "User Guide — Estimator",
            guide_html: "<h4>Open the app</h4><p>Open the web address on any browser or iPhone. Switch language (EN/ID) and theme at the top right. After opening once, it works offline.</p><h4>Conversions</h4><p>Type in any field; the others update automatically: dBm ↔ mW ↔ W, gain/loss dB, VSWR ↔ Return Loss, dBµV ↔ dBm.</p><h4>Link Budget &amp; Planner</h4><p>Fill the chain parameters. In the Planner, enter area, antenna radius and utilisation to get the antenna count, then send it to the BoQ.</p><h4>Coverage</h4><p>Fill frequency, distance, heights, power, gain and loss. Read path loss, up/down margin, pass/fail and max distance per environment.</p><h4>BoQ (Estimator)</h4><ul><li>Unlock with the access code.</li><li>Enter antennas per floor/zone; the total is automatic.</li><li>Adjust design ratios; devices (ORU, OMU, splitter, coupler, cable) are computed.</li><li>Enter prices in USD or IDR, set the rate, tick “Show Rupiah”, read the totals.</li><li>Export CSV, or Save/Load a project in this browser.</li></ul><h4>Save to shared Drive</h4><p>Click “Save to shared Drive” to send the BoQ (.csv + .json) to the team Drive folder. Works from the web address only; check the folder once to confirm.</p><h4>Send result to sales</h4><p>Use “Export BoQ result code” or its QR code to hand the finished BoQ to sales.</p><h4>Commissioning &amp; Products</h4><p>Log field test points (VSWR, Tx, Rx, pass/fail) and print a report. Products is the FMTCS device catalogue.</p><h4>On iPhone</h4><p>Open via the web address, not a file sent by chat.</p>",
            bq_save: "Save project",
            bq_loadproj: "Load",
            bq_delproj: "Delete",
            bq_pname_ph: "Project name to save…",
            bq_msg_res_exported: "BoQ result code placed in the box above — copy or QR it to sales.",
            bq_msg_res_loaded: "BoQ result loaded — shown below (read-only).",
            bq_pmsg_saved: "Project saved.",
            bq_pmsg_loaded: "Project loaded.",
            bq_pmsg_deleted: "Project deleted.",
            bq_pmsg_name: "Type a project name first.",
            bq_pmsg_pick: "Pick a project first.",
            qr_note: "Scan with a phone camera to read this code.",
            qr_toobig: "Code too long for a QR — use Copy instead.",
            bq_total: "TOTAL",
            bq_i_oru: "ORU (digital)",
            bq_i_omu: "OMU (digital)",
            bq_i_split: "Splitter (2-way)",
            bq_i_coup: "Coupler",
            bq_i_sig: "Signal Splitter (UL+DL)",
            bq_i_comb: "Combiner",
            bq_i_mux: "Multiplexer",
            bq_i_ant: "Indoor Antenna",
            bq_i_outo: "Outdoor Omni Antenna",
            bq_i_outd: "Outdoor Directional Antenna",
            bq_i_cable: 'Coax cable 1/2"',
            bq_i_conn: "RF Connector",
            bq_i_fiber: "Fiber patch cord",
            bq_i_rep: "Repeater",
            bq_i_radio: "Two-way radio",
            cm_eyebrow: "Acceptance test · field report",
            cm_h1: "Commissioning Test Report",
            cm_lede: "Record VSWR, transmit power, received signal and call quality per point. Each point is auto-scored against the criteria; print a signable acceptance report.",
            cm_hdr_title: "Project details",
            cm_proj: "Project / building",
            cm_loc: "Location",
            cm_date: "Test date",
            cm_tech: "Technician",
            cm_crit_title: "Acceptance criteria",
            cm_c_vswr: "Max VSWR",
            cm_c_tx: "Min TX power",
            cm_c_rx: "Min Rx signal",
            cm_pts_t: "Test points",
            cm_add: "+ Add point",
            cm_print: "Print / Save report",
            cm_clear: "Clear all",
            cm_cap: "Pass rule: VSWR ≤ limit AND TX ≥ min AND Rx ≥ min AND call quality not Poor. Entries are saved in this browser only.",
            th_comm: ["#", "Point / Antenna", "VSWR", "TX (dBm)", "Rx (dBm)", "Call", "Result", ""],
            cm_call_good: "Good",
            cm_call_fair: "Fair",
            cm_call_poor: "Poor",
            cm_sum: function(p, t) { return p + " / " + t + " pass"; },
            cm_overall_pass: "OVERALL: PASS",
            cm_overall_fail: "OVERALL: FAIL",
            cm_overall_none: "no points yet",
            cm_rep_title: "COMMISSIONING / ACCEPTANCE TEST REPORT",
            cm_sign_tech: "Technician",
            cm_sign_cust: "Customer / Witness",
            pr_eyebrow: "Product knowledge · 13 variants",
            pr_h1: "FMTCS DAS Product Selector",
            pr_lede: "Key specifications for every FMTCS DAS device, grouped by role. OMU and ORU are shown in both Analog and Digital variants so you can pick the right option.",
            cat_active: "Active — optical units",
            cat_passive: "Passive — RF network",
            cat_ant: "Antennas",
            sl: {
                freq: "Frequency",
                gain: "Gain",
                maxpower: "Max power",
                il: "Insertion loss",
                iso: "Isolation",
                vswr: "VSWR",
                conn: "RF connector",
                maxoru: "Max ORU",
                outp: "Output power (DL)",
                rfgain: "RF gain",
                nf: "Noise figure",
                dist: "Max fiber distance",
                chcap: "Channel capacity",
                coupling: "Coupling",
                coupleloss: "Couple loss",
                beam: "H beamwidth",
                ip: "Protection",
                gadj: "Gain adjust",
                fiber: "Fiber topology",
                ports: "Ports",
                dir: "Direction"
            },
            ty_d: "Digital",
            ty_a: "Analog",
            cogs_label: "COGS (Cost)",
            margin_label: "Gross Margin",
            margin_guardrail_warn: "Gross margin is below 15% minimum enterprise threshold!",
            arch_mode: "Architecture Mode",
            arch_digital: "Digital C-RAN DAS (DOMU / DORU)",
            arch_analog: "Analog Direct RFoF (AOMU / AORU)",
            topo_label: "Fiber Distribution Topology",
            topo_star: "Star Topology (Direct Home-Run)",
            topo_cascade: "Cascade / Daisy-Chain Topology",
            topo_ring: "Redundant Optical Ring (Self-Healing)"
        },
        id: {
            tab_conv: "Konversi",
            tab_link: "Link Budget",
            tab_boq: "Estimasi BoQ",
            tab_comm: "Commissioning",
            tab_prod: "Produk",
            tab_cov: "Cakupan Outdoor",
            tab_boqd: "Desain BoQ",
            eyebrow: "Alat referensi teknis · DAS / RFoF",
            h1: "Konversi RF untuk Sistem DAS FMTCS",
            lede: "Kalkulator hidup dan tabel referensi untuk satuan yang paling sering dipakai saat merancang, menawarkan dan meng-commissioning sistem DAS & RF-over-Fiber dua arah. Ketik di kolom mana pun — kolom lain menyesuaikan otomatis.",
            p_title: "Daya — dBm ⇄ mW ⇄ Watt",
            p_tag: "paling sering",
            p_l1: "Daya (dBm)",
            p_l2: "Daya (miliwatt)",
            p_l3: "Daya (watt)",
            p_note: "mW = 10<sup>(dBm/10)</sup> · W = mW ÷ 1000. <b>0 dBm = 1 mW</b>, <b>30 dBm = 1 W</b>; +10 dB = ×10, +3 dB ≈ ×2.",
            g_title: "Gain / Rugi — dB ⇄ rasio",
            g_tag: "link budget",
            g_l1: "Nilai (dB)",
            g_l2: "Rasio daya (×)",
            g_l3: "Rasio tegangan (×)",
            g_note: "dB positif = penguatan, negatif = rugi. Dalam satu rantai, dB tinggal <b>dijumlah</b>.",
            v_title: "Matching — VSWR ⇄ Return Loss",
            v_tag: "commissioning",
            v_l1: "VSWR (≥ 1)",
            v_l2: "Return Loss",
            v_note: "Makin dekat <b>1.0</b> makin baik. Semua perangkat FMTCS ber-rating <b>VSWR ≤ 1.5</b> (RL ≥ 14 dB).",
            u_title: "Alat ukur — dBµV ⇄ dBm (50Ω)",
            u_tag: "lapangan",
            u_l1: "Level (dBµV)",
            u_l2: "Level (dBm)",
            u_note: "Untuk 50 ohm: dBm = dBµV − 107. Menyamakan baca field meter (dBµV) dengan sensitivitas radio (dBm).",
            s1_t: "Tabel daya cepat",
            s3_t: "Tabel VSWR / Return Loss",
            s3_h: "mutu matching",
            cap_power: "+3 dB ≈ daya ×2 · +10 dB = daya ×10 · −3 dB ≈ daya ÷2",
            cap_vswr: "Γ = (VSWR−1)/(VSWR+1) · RL = −20·log(Γ)",
            foot1: "Alat referensi internal — Citradata / FMTCS DAS. Nilai default dari datasheet asli FMTCS; verifikasi per proyek.",
            cov_eyebrow: "Cakupan makro outdoor · VHF/UHF",
            cov_h1: "Cakupan Outdoor (Okumura–Hata)",
            cov_lede: "Perkirakan rugi lintasan outdoor dan margin uplink/downlink dari base/repeater ke HT memakai model Okumura–Hata. Kolom kosong menampilkan petunjuk; isi semua untuk menghitung. Margin di atas 0 dB berarti tercakup pada jarak itu.",
            cov_in_title: "Parameter (isi semua)",
            cov_out_t: "Hasil cakupan",
            cov_hint: "Isi semua parameter di atas untuk melihat hasil.",
            bq_floor_ph: "Nama lantai / zona",
            cov_f: "Frekuensi (MHz)",
            cov_d: "Jarak uji (km)",
            cov_ht: "Tinggi antena BS (m)",
            cov_hm: "Tinggi antena HT (m)",
            cov_txbs: "Daya pancar BS (dBm)",
            cov_txms: "Daya pancar HT (dBm)",
            cov_gbs: "Gain antena BS (dBi)",
            cov_gms: "Gain antena HT (dBi)",
            cov_rxbs: "Sensitivitas BS (dBm)",
            cov_rxms: "Sensitivitas HT (dBm)",
            cov_flbs: "Rugi feeder BS (dB)",
            cov_flms: "Rugi feeder HT (dB)",
            cov_f_ph: "150–200 (VHF) atau 400–1500 (UHF)",
            cov_d_ph: "mis. 5",
            cov_ht_ph: "mis. 25",
            cov_hm_ph: "mis. 1.5",
            cov_txbs_ph: "mis. 47",
            cov_txms_ph: "mis. 37",
            cov_gbs_ph: "mis. 5",
            cov_gms_ph: "mis. 3",
            cov_rxbs_ph: "mis. -95",
            cov_rxms_ph: "mis. -95",
            cov_flbs_ph: "mis. 3",
            cov_flms_ph: "mis. 1",
            cov_th: ["Lingkungan", "Rugi lintasan (dB)", "Uplink (dB)", "Downlink (dB)", "Status", "Jarak maks (km)"],
            cov_env: {
                urbanS: "Urban (kecil/sedang)",
                urbanL: "Urban (besar)",
                subS: "Suburban (kecil/sedang)",
                subL: "Suburban (besar)",
                openS: "Area terbuka (kecil/sedang)",
                openL: "Area terbuka (besar)"
            },
            cov_cap: "Okumura–Hata: L = 69,55 + 26,16·log f − 13,82·log ht − α(hm) + (44,9 − 6,55·log ht)·log d. Koreksi suburban/open mengikuti model Excel Anda. Estimasi perencanaan — pastikan dengan site survey.",
            th_power: ["dBm", "miliwatt (mW)", "watt (W)", "Konteks lapangan"],
            th_vswr: ["VSWR", "Return Loss (dB)", "Γ", "% pantul", "Nilai"],
            c: {
                power: "daya",
                voltage: "tegangan",
                refl: "pantul",
                gain: "penguatan",
                loss: "pelemahan",
                none: "tanpa perubahan",
                pass: "lulus",
                border: "batas",
                fail: "tidak lulus",
                invalid: "masukkan angka valid",
                vge1: "VSWR harus ≥ 1",
                rlge0: "RL harus ≥ 0"
            },
            lb_eyebrow: "Cakupan downlink · estimasi perencanaan",
            lb_h1: "Link Budget DAS",
            lb_lede: "Telusuri sinyal dari output ORU melewati jaringan pasif hingga antena, lalu perkirakan cakupan per antena. Nilai default dari datasheet FMTCS DORU/ANTI.",
            lb_in_title: "Rantai sinyal (downlink)",
            lb_oru: "Daya output ORU",
            lb_cable: "Kabel coax",
            lb_len: "Panjang kabel",
            lb_nsplit: "Splitter 2 arah di jalur",
            lb_other: "Rugi lain (konektor/coupler)",
            lb_antg: "Gain antena",
            lb_cov_title: "Estimasi cakupan",
            lb_env: "Lingkungan",
            lb_target: "Sinyal target (sensitivitas radio)",
            lb_margin: "Margin fade + tubuh",
            lb_chain_t: "Hasil rantai sinyal",
            lb_chain_h: "level tiap tahap",
            lb_cap: "Output ORU 40±2 dBm (DORU400CH) · Antena indoor 3 dBi (ANTI400R) · Splitter 2 arah 3.3 dB (FMTCS-PD). Cakupan hanya estimasi perencanaan — pastikan dengan site survey.",
            th_chain: ["Tahap", "dB", "Level (dBm)"],
            lb_st_oru: "Output ORU",
            lb_st_cable: "Rugi kabel coax",
            lb_st_split: "Rugi splitter",
            lb_st_other: "Rugi lain",
            lb_st_antin: "Input antena",
            lb_st_gain: "Gain antena",
            lb_st_eirp: "EIRP (terpancar)",
            lb_s_antin: "Input antena",
            lb_s_eirp: "EIRP",
            lb_s_radius: "Radius cakupan",
            lb_s_area: "Luas / antena",
            lb_h_good: "Daya input antena dalam rentang sehat (−5 s/d +20 dBm).",
            lb_h_hi: "Daya input antena tinggi (> 20 dBm) — tambah rugi distribusi atau pecah lagi.",
            lb_h_lo: "Daya input antena rendah (< −5 dBm) — kurangi rugi atau tambah penguat/ORU.",
            env_open: "Terbuka / line-of-sight",
            env_office: "Kantor / dinding ringan",
            env_dense: "Padat / industri",
            env_under: "Bawah tanah / terowongan",
            bq_eyebrow: "Estimasi kuantitas & biaya",
            bq_h1: "Estimasi BoQ",
            bq_lede: "Perkirakan kuantitas perangkat utama proyek DAS dari jumlah titik antena. Rasio default mengikuti proyek data center MY03 dan bisa diubah sepenuhnya.",
            bq_in_title: "Ukuran proyek",
            bq_ant: "Titik antena indoor",
            bq_rep: "Repeater (kanal)",
            bq_radio: "Radio dua arah",
            bq_outo: "Antena outdoor omni",
            bq_outd: "Antena outdoor direksional",
            bq_ratio_title: "Rasio desain",
            bq_ratio_tag: "bisa diubah",
            bq_r_oru: "Antena per ORU",
            bq_r_omu: "ORU per OMU (digital)",
            bq_r_split: "Splitter per antena",
            bq_r_coup: "Coupler per antena",
            bq_r_cable: "Kabel per antena",
            bq_out_t: "Perkiraan Bill of Quantities",
            bq_out_h: "isi harga satuan untuk nilai",
            bq_print: "Cetak / Simpan PDF",
            bq_cap: "Rasio dari proyek referensi MY03 (575 antena, 18 ORU). Harga Anda isi sendiri — tidak ada harga tersimpan di alat ini.",
            th_boq: ["Item", "Model", "Qty", "Harga satuan", "Mata uang", "Nilai (USD)", "Nilai (Rp)"],
            bq_cur: "Mata uang",
            bq_kurs: "Kurs (Rp per 1 USD)",
            bq_showrp: "Tampilkan konversi Rupiah",
            bq_lock_title: "Akses estimator saja",
            bq_lock_desc: "Harga, rasio, dan BoQ berharga adalah milik estimator. Masukkan kode akses estimator untuk membukanya.",
            bq_lock_lbl: "Kode akses",
            bq_wrong: "Kode salah — coba lagi.",
            bq_unlock: "Buka",
            bq_relock: "→ Kunci lagi",
            bq_design_t: "Input desain",
            bq_design_tag: "terbuka · designer",
            bq_proj: "Proyek / gedung",
            bq_by: "Dibuat oleh",
            bq_set_t: "Setelan estimator",
            bq_h1d: "Input Desain BoQ",
            bq_ledd: "Isi desain proyek dan rincian antena per lantai, lalu export kode desain untuk dikirim ke estimator. Perhitungan harga ada di versi estimator.",
            bq_noted: "Isi angka dan rincian per lantai, lalu tekan Export dan kirim kodenya (WhatsApp/email) ke estimator untuk dihitung harga BoQ-nya.",
            bq_export: "Export kode desain",
            bq_copy: "Salin",
            bq_load: "Muat kode",
            bq_token_ph: "Tempel kode desain di sini untuk memuat, atau tekan Export untuk membuat…",
            bq_design_note: "Designer mengisi angka ini lalu tekan Export, kirim kodenya (WhatsApp/email) ke estimator. Estimator menempel kode, tekan Muat, lalu buka kunci di bawah untuk menghitung harga BoQ. Export tidak perlu kode estimator.",
            bq_msg_exported: "Kode desain dibuat — salin dan kirim ke estimator.",
            bq_msg_copied: "Tersalin ke clipboard.",
            bq_msg_copyfail: "Blok teksnya lalu salin manual (Ctrl/Cmd+C).",
            bq_msg_loaded: "Desain dimuat — buka kunci di bawah untuk menghitung BoQ.",
            bq_msg_bad: "Kode tidak valid atau rusak — pastikan tersalin utuh.",
            bq_msg_empty: "Tempel kode desain dulu.",
            pl_t: "Planner jumlah antena",
            pl_h: "luas → antena",
            pl_in: "Input cakupan",
            pl_out: "Antena dibutuhkan",
            pl_area: "Luas lantai total",
            pl_r: "Radius cakupan / antena",
            pl_util: "Faktor luas terpakai",
            pl_use: "→ Pakai di BoQ",
            pl_note: "Antena ≈ luas ÷ (π·r² × faktor terpakai), dibulatkan ke atas. Angka perencanaan kasar — pastikan dengan site survey.",
            pl_s_ant: "Antena",
            pl_s_per: "Luas / antena",
            th_floors: ["Lantai / zona", "Antena indoor", ""],
            bq_floors_t: "Rincian per lantai / zona",
            bq_floor_add: "+ Lantai",
            bq_floors_total: "Total antena",
            pl_proj: "Nama proyek (opsional)",
            pl_export: "Export kode desain",
            pl_token_ph: "Kode desain muncul di sini — kirim ke estimator.",
            pl_msg_exported: "Kode desain dibuat — salin atau QR ke estimator.",
            bq_qr: "Kode QR",
            bq_res_export: "Export kode hasil BoQ",
            bq_csv: "Export CSV (Excel)",
            bq_res_t: "Hasil BoQ (diterima)",
            bq_drive_btn: "Simpan ke Shared Drive",
            bq_drive_cfg: "Setelan Drive",
            bq_drive_savecfg: "Simpan setelan",
            bq_drive_help: "Setelan sekali saja. Tempel URL Web App dan kata sandi bersama dari deployment Apps Script Anda. Tersimpan hanya di browser ini.",
            bq_drive_url: "URL Web App",
            bq_drive_secret: "Kata sandi bersama",
            bq_drive_sending: "Mengirim ke Drive…",
            bq_drive_sent: "Terkirim. Buka folder Shared Drive untuk memastikan file sudah masuk.",
            bq_drive_err: "Gagal mengirim. Periksa URL Web App dan koneksi internet Anda.",
            bq_drive_nourl: "Isi URL Web App dulu (Setelan Drive).",
            bq_drive_cfgsaved: "Setelan tersimpan di browser ini.",
            guide_btn: "Panduan",
            guide_title: "Panduan Pemakaian — Estimator",
            guide_html: "<h4>Membuka aplikasi</h4><p>Buka alamat web di browser apa pun atau iPhone. Ganti bahasa (EN/ID) dan tema di pojok kanan atas. Setelah dibuka sekali, bisa dipakai offline.</p><h4>Konversi</h4><p>Ketik di salah satu kolom; kolom lain terisi otomatis: dBm ↔ mW ↔ W, gain/loss dB, VSWR ↔ Return Loss, dBµV ↔ dBm.</p><h4>Link Budget &amp; Planner</h4><p>Isi parameter rantai. Di Planner, isi luas area, radius antena, dan utilisasi untuk mendapat jumlah antena, lalu kirim ke BoQ.</p><h4>Coverage</h4><p>Isi frekuensi, jarak, tinggi antena, daya, gain, dan loss. Baca path loss, margin up/down, lulus/tidak, dan jarak maksimum per lingkungan.</p><h4>BoQ (Estimator)</h4><ul><li>Buka kunci dengan kode akses.</li><li>Isi antena per lantai/zona; total otomatis.</li><li>Atur rasio desain; perangkat (ORU, OMU, splitter, coupler, kabel) dihitung otomatis.</li><li>Isi harga USD atau IDR, isi kurs, centang “Tampilkan konversi Rupiah”, baca total.</li><li>Export CSV, atau Simpan/Muat proyek di browser ini.</li></ul><h4>Simpan ke Shared Drive</h4><p>Klik “Simpan ke Shared Drive” untuk mengirim BoQ (.csv + .json) ke folder Drive tim. Hanya jalan dari alamat web; cek folder sekali untuk memastikan.</p><h4>Kirim hasil ke sales</h4><p>Gunakan “Export kode hasil BoQ” atau QR code-nya untuk menyerahkan BoQ ke sales.</p><h4>Commissioning &amp; Products</h4><p>Catat titik uji lapangan (VSWR, Tx, Rx, lulus/tidak) dan cetak laporan. Products adalah katalog perangkat FMTCS.</p><h4>Di iPhone</h4><p>Buka lewat alamat web, bukan file yang dikirim via chat.</p>",
            bq_save: "Simpan proyek",
            bq_loadproj: "Muat",
            bq_delproj: "Hapus",
            bq_pname_ph: "Nama proyek untuk disimpan…",
            bq_msg_res_exported: "Kode hasil BoQ ada di kotak atas — salin atau QR ke sales.",
            bq_msg_res_loaded: "Hasil BoQ dimuat — tampil di bawah (baca-saja).",
            bq_pmsg_saved: "Proyek disimpan.",
            bq_pmsg_loaded: "Proyek dimuat.",
            bq_pmsg_deleted: "Proyek dihapus.",
            bq_pmsg_name: "Ketik nama proyek dulu.",
            bq_pmsg_pick: "Pilih proyek dulu.",
            qr_note: "Pindai dengan kamera HP untuk membaca kode ini.",
            qr_toobig: "Kode terlalu panjang untuk QR — gunakan Salin.",
            bq_total: "TOTAL",
            bq_i_oru: "ORU (digital)",
            bq_i_omu: "OMU (digital)",
            bq_i_split: "Splitter (2 arah)",
            bq_i_coup: "Coupler",
            bq_i_sig: "Signal Splitter (UL+DL)",
            bq_i_comb: "Combiner",
            bq_i_mux: "Multiplexer",
            bq_i_ant: "Antena Indoor",
            bq_i_outo: "Antena Outdoor Omni",
            bq_i_outd: "Antena Outdoor Direksional",
            bq_i_cable: 'Kabel coax 1/2"',
            bq_i_conn: "Konektor RF",
            bq_i_fiber: "Fiber patch cord",
            bq_i_rep: "Repeater",
            bq_i_radio: "Radio dua arah",
            cm_eyebrow: "Uji terima · laporan lapangan",
            cm_h1: "Laporan Commissioning",
            cm_lede: "Catat VSWR, daya pancar, sinyal terima dan kualitas panggilan per titik. Tiap titik dinilai otomatis terhadap kriteria; cetak berita acara siap tanda tangan.",
            cm_hdr_title: "Data proyek",
            cm_proj: "Proyek / gedung",
            cm_loc: "Lokasi",
            cm_date: "Tanggal uji",
            cm_tech: "Teknisi",
            cm_crit_title: "Kriteria uji terima",
            cm_c_vswr: "VSWR maks",
            cm_c_tx: "TX power min",
            cm_c_rx: "Sinyal Rx min",
            cm_pts_t: "Titik uji",
            cm_add: "+ Tambah titik",
            cm_print: "Cetak / Simpan laporan",
            cm_clear: "Hapus semua",
            cm_cap: "Aturan lulus: VSWR ≤ batas DAN TX ≥ min DAN Rx ≥ min DAN kualitas panggilan bukan Buruk. Data tersimpan di browser ini saja.",
            th_comm: ["#", "Titik / Antena", "VSWR", "TX (dBm)", "Rx (dBm)", "Panggilan", "Hasil", ""],
            cm_call_good: "Baik",
            cm_call_fair: "Cukup",
            cm_call_poor: "Buruk",
            cm_sum: function(p, t) { return p + " / " + t + " lulus"; },
            cm_overall_pass: "KESELURUHAN: LULUS",
            cm_overall_fail: "KESELURUHAN: TIDAK LULUS",
            cm_overall_none: "belum ada titik",
            cm_rep_title: "BERITA ACARA / LAPORAN UJI TERIMA COMMISSIONING",
            cm_sign_tech: "Teknisi",
            cm_sign_cust: "Pelanggan / Saksi",
            pr_eyebrow: "Product knowledge · 13 varian",
            pr_h1: "Product Selector DAS FMTCS",
            pr_lede: "Spesifikasi utama setiap perangkat DAS FMTCS, dikelompokkan per fungsi. OMU dan ORU ditampilkan dalam varian Analog dan Digital agar mudah memilih opsi yang tepat.",
            cat_active: "Aktif — unit optik",
            cat_passive: "Pasif — jaringan RF",
            cat_ant: "Antena",
            sl: {
                freq: "Frekuensi",
                gain: "Gain",
                maxpower: "Daya maks",
                il: "Rugi sisipan",
                iso: "Isolasi",
                vswr: "VSWR",
                conn: "Konektor RF",
                maxoru: "ORU maks",
                outp: "Daya output (DL)",
                rfgain: "RF gain",
                nf: "Noise figure",
                dist: "Jarak serat maks",
                chcap: "Kapasitas kanal",
                coupling: "Coupling",
                coupleloss: "Couple loss",
                beam: "Beamwidth H",
                ip: "Proteksi",
                gadj: "Gain adjust",
                fiber: "Topologi serat",
                ports: "Port",
                dir: "Arah"
            },
            ty_d: "Digital",
            ty_a: "Analog",
            cogs_label: "HPP (Modal)",
            margin_label: "Margin Kotor",
            margin_guardrail_warn: "Margin kotor di bawah batas minimal 15%!",
            arch_mode: "Mode Arsitektur",
            arch_digital: "Digital C-RAN DAS (DOMU / DORU)",
            arch_analog: "Analog Direct RFoF (AOMU / AORU)",
            topo_label: "Topologi Distribusi Fiber Optik",
            topo_star: "Topologi Star (Direct Home-Run)",
            topo_cascade: "Topologi Cascade / Daisy-Chain",
            topo_ring: "Topologi Redundant Ring (Self-Healing)"
        }
    };

    /* =========================================================================
     * 3. FMTCS DAS PRODUCTS & ACCESSORIES CATALOG (13 Devices + 3 Acc)
     * ========================================================================= */
    var DEVICES = [
        {
            sku: "FMTCS-OMU-DIG",
            model: "DOMU400C.RI",
            fullModel: "FMTCS-LRF/N · DOMU400C.RI",
            category: "active",
            type: "digital",
            name: {
                en: "DOMU400C.RI Optical Master Unit (Digital C-RAN)",
                id: "DOMU400C.RI Optical Master Unit (Digital C-RAN)"
            },
            description: {
                en: "Digital Optical Master Unit supporting up to 32 Digital Remote Units (ORU) via Star, Cascade, or Ring optical topologies.",
                id: "Optical Master Unit Digital mendukung hingga 32 Unit Remote Digital (ORU) dengan topologi fiber Star, Cascade, atau Ring."
            },
            unit: "Unit",
            priceUsd: 4500.0,
            costUsd: 3150.0,
            specs: {
                freq: "410–440 MHz",
                maxoru: "32",
                gadj: "10 dB / 1 dB",
                dist: "≤ 20 km",
                chcap: "≤ 12",
                fiber: "Star / Cascade / Ring",
                conn: "N-K",
                vswr: "≤ 1.5"
            }
        },
        {
            sku: "FMTCS-OMU-ANA",
            model: "AOMU400C.RI",
            fullModel: "FMTCS-LRF/N · AOMU400C.RI",
            category: "active",
            type: "analog",
            name: {
                en: "AOMU400C.RI Optical Master Unit (Analog Direct RFoF)",
                id: "AOMU400C.RI Optical Master Unit (Analog Direct RFoF)"
            },
            description: {
                en: "Analog Optical Master Unit supporting up to 4 Analog Remote Units (ORU) via direct Star optical links.",
                id: "Optical Master Unit Analog mendukung hingga 4 Unit Remote Analog (ORU) via link fiber Star point-to-point."
            },
            unit: "Unit",
            priceUsd: 2800.0,
            costUsd: 1950.0,
            specs: {
                freq: "410–470 MHz",
                maxoru: "4",
                gadj: "31 dB / 1 dB",
                dist: "≤ 8 km",
                chcap: "≤ 8",
                fiber: "Star",
                conn: "N-K",
                vswr: "≤ 1.5"
            }
        },
        {
            sku: "FMTCS-ORU-DIG",
            model: "DORU400CH.RI",
            fullModel: "FMTCS-LRF/F · DORU400CH.RI",
            category: "active",
            type: "digital",
            name: {
                en: "DORU400CH.RI Optical Remote Unit (Digital 10W)",
                id: "DORU400CH.RI Optical Remote Unit (Digital 10W)"
            },
            description: {
                en: "High-power 10W (40±2 dBm) Digital Optical Remote Unit for wide in-building and tunnel coverage.",
                id: "Optical Remote Unit Digital daya tinggi 10W (40±2 dBm) untuk cakupan gedung bertingkat dan terowongan."
            },
            unit: "Unit",
            priceUsd: 3200.0,
            costUsd: 2250.0,
            specs: {
                freq: "410–440 MHz",
                outp: "40±2 dBm (≈10 W)",
                rfgain: "≥ 50 dB",
                nf: "≤ 5 dB",
                iso: "≥ 90 dB",
                dist: "≤ 20 km",
                vswr: "≤ 1.5",
                conn: "N-K"
            }
        },
        {
            sku: "FMTCS-ORU-ANA",
            model: "AORU400CH.RI",
            fullModel: "FMTCS-LRF/F · AORU400CH.RI",
            category: "active",
            type: "analog",
            name: {
                en: "AORU400CH.RI Optical Remote Unit (Analog 10W)",
                id: "AORU400CH.RI Optical Remote Unit (Analog 10W)"
            },
            description: {
                en: "High-power 10W (40±2 dBm) Analog Optical Remote Unit for economic point-to-point RF-over-Fiber expansion.",
                id: "Optical Remote Unit Analog 10W (40±2 dBm) untuk ekspansi RF-over-Fiber ekonomis point-to-point."
            },
            unit: "Unit",
            priceUsd: 1950.0,
            costUsd: 1350.0,
            specs: {
                freq: "410–440 MHz",
                outp: "40±2 dBm (≈10 W)",
                rfgain: "≥ 50 dB",
                nf: "≤ 5 dB",
                iso: "≥ 85 dB",
                dist: "≤ 8 km",
                vswr: "≤ 1.5",
                conn: "N-K"
            }
        },
        {
            sku: "FMTCS-PAS-CFH8",
            model: "FMTCS-CFH (2/4/8)",
            fullModel: "FMTCS-CFH (2/4/8)",
            category: "passive",
            name: {
                en: "Combiner (TX Cavity Combiner 2/4/8 Port)",
                id: "Combiner (TX Cavity Combiner 2/4/8 Port)"
            },
            description: {
                en: "Transmitter cavity combiner with high isolation (≥ 45 dB) for combining multiple repeater TX channels into one antenna/feeder.",
                id: "Cavity combiner pemancar dengan isolasi tinggi (≥ 45 dB) untuk menggabungkan banyak kanal TX repeater ke satu kabel/antena."
            },
            unit: "Unit",
            priceUsd: 1200.0,
            costUsd: 840.0,
            specs: {
                freq: "410–440 MHz",
                il: "2p ≤4.0 / 4p ≤7.5 / 8p ≤11.0 dB",
                iso: "≥ 45 dB",
                maxpower: "50 W / port",
                vswr: "≤ 1.5",
                conn: "N-K"
            }
        },
        {
            sku: "FMTCS-PAS-DJF8",
            model: "FMTCS-DJF (2/4/8)",
            fullModel: "FMTCS-DJF (2/4/8)",
            category: "passive",
            name: {
                en: "Multiplexer (RX Multicoupler / Divider 2/4/8 Port)",
                id: "Multiplexer (RX Multicoupler / Divider 2/4/8 Port)"
            },
            description: {
                en: "Receiver multicoupler/divider for distributing received RF signals from DAS to multiple repeater RX ports.",
                id: "Receiver multicoupler/divider untuk mendistribusikan sinyal RX dari sistem DAS ke beberapa repeater."
            },
            unit: "Unit",
            priceUsd: 950.0,
            costUsd: 665.0,
            specs: {
                freq: "370–470 MHz",
                il: "2p ≤3.5 / 4p ≤6.5 / 8p ≤9.5 dB",
                iso: "≥ 18 dB",
                maxpower: "1 W / port",
                vswr: "≤ 1.5",
                conn: "N-K"
            }
        },
        {
            sku: "FMTCS-PAS-SGQ",
            model: "DSGQ400C.RI",
            fullModel: "FMTCS-SGQ · DSGQ400C.RI",
            category: "passive",
            name: {
                en: "DSGQ400C.RI Base Station Duplexer",
                id: "DSGQ400C.RI Base Station Duplexer"
            },
            description: {
                en: "High-isolation cavity duplexer (≥ 80 dB) enabling simultaneous transmit and receive on a single antenna port.",
                id: "Duplexer rongga berisolasi tinggi (≥ 80 dB) memungkinkan transmisi dan penerimaan simultan pada satu port antena."
            },
            unit: "Unit",
            priceUsd: 650.0,
            costUsd: 450.0,
            specs: {
                freq: "410–440 MHz",
                il: "≤ 2.5 dB",
                iso: "≥ 80 dB",
                maxpower: "50 W",
                chcap: "≤ 12",
                vswr: "≤ 1.5",
                conn: "N-K"
            }
        },
        {
            sku: "FMTCS-PAS-UDSS",
            model: "UDSS400C",
            fullModel: "FMTCS-LRF/S · UDSS400C",
            category: "passive",
            name: {
                en: "UDSS400C Signal Splitter (UL/DL Separator)",
                id: "UDSS400C Signal Splitter (Pemisah UL/DL)"
            },
            description: {
                en: "Precision uplink/downlink signal separator with 30±1 dB coupling loss and low insertion loss (≤ 1.0 dB).",
                id: "Pemisah sinyal uplink/downlink presisi dengan rugi kopling 30±1 dB dan rugi sisipan rendah (≤ 1.0 dB)."
            },
            unit: "Unit",
            priceUsd: 450.0,
            costUsd: 310.0,
            specs: {
                freq: "350–470 MHz",
                coupleloss: "30±1 dB",
                il: "≤ 1.0 dB",
                ports: "4 / 6",
                maxpower: "50 W",
                vswr: "≤ 1.5",
                conn: "N-K"
            }
        },
        {
            sku: "FMTCS-PAS-PD2",
            model: "PD400R.M",
            fullModel: "FMTCS-PD · PD400R.M",
            category: "passive",
            name: {
                en: "PD400R.M Power Splitter (2-Way)",
                id: "PD400R.M Power Splitter (2 Arah)"
            },
            description: {
                en: "Low-loss 2-way reactive power divider (≤ 3.3 dB insertion loss) rated up to 100W.",
                id: "Pembagi daya reaktif 2 arah rendah rugi (≤ 3.3 dB) berkapasitas hingga 100W."
            },
            unit: "Unit",
            priceUsd: 45.0,
            costUsd: 28.0,
            specs: {
                freq: "400–470 MHz",
                il: "≤ 3.3 dB (2-way)",
                maxpower: "100 W",
                vswr: "≤ 1.5",
                conn: "N-K"
            }
        },
        {
            sku: "FMTCS-PAS-CP",
            model: "CP400R.M",
            fullModel: "FMTCS-CP · CP400R.M",
            category: "passive",
            name: {
                en: "CP400R.M Directional Coupler (6/10/15/20 dB)",
                id: "CP400R.M Directional Coupler (6/10/15/20 dB)"
            },
            description: {
                en: "Directional tap coupler available in 6, 10, 15, or 20 dB coupling values for line tapping across floors.",
                id: "Directional tap coupler dengan pilihan 6, 10, 15, atau 20 dB untuk penyadapan sinyal antar lantai."
            },
            unit: "Unit",
            priceUsd: 55.0,
            costUsd: 35.0,
            specs: {
                freq: "400–470 MHz",
                coupling: "6 / 10 / 15 / 20 dB",
                il: "6dB ≤1.8 · 10dB ≤1.2 · 15/20dB ≤0.5 dB",
                maxpower: "100 W",
                vswr: "≤ 1.5",
                conn: "N-K"
            }
        },
        {
            sku: "FMTCS-ANT-INDOOR",
            model: "ANTI400R.M",
            fullModel: "FMTCS-ANTI · ANTI400R.M",
            category: "ant",
            name: {
                en: "ANTI400R.M Indoor Omni Ceiling Antenna (3 dBi)",
                id: "ANTI400R.M Antena Indoor Omni Plafon (3 dBi)"
            },
            description: {
                en: "Aesthetic low-profile 360° omni ceiling mount antenna with 3±1 dBi gain and IP53 environmental rating.",
                id: "Antena plafon omni 360° profil rendah dengan gain 3±1 dBi dan proteksi IP53."
            },
            unit: "Unit",
            priceUsd: 35.0,
            costUsd: 22.0,
            specs: {
                freq: "400–470 MHz",
                gain: "3±1 dBi",
                beam: "360°",
                maxpower: "100 W",
                ip: "IP53",
                vswr: "≤ 1.5",
                conn: "N-K"
            }
        },
        {
            sku: "FMTCS-ANT-OUTOMNI",
            model: "ANTG400R.M",
            fullModel: "FMTCS-ANTG · ANTG400R.M",
            category: "ant",
            name: {
                en: "ANTG400R.M Outdoor Omni Antenna (4 dBi)",
                id: "ANTG400R.M Antena Outdoor Omni (4 dBi)"
            },
            description: {
                en: "Heavy-duty outdoor fiberglass omni antenna with 4±1 dBi gain and IP65 weatherproof rating.",
                id: "Antena outdoor omni fiberglass tangguh dengan gain 4±1 dBi dan proteksi cuaca IP65."
            },
            unit: "Unit",
            priceUsd: 120.0,
            costUsd: 80.0,
            specs: {
                freq: "400–470 MHz",
                gain: "4±1 dBi",
                beam: "360°",
                maxpower: "100 W",
                ip: "IP65",
                vswr: "≤ 1.5",
                conn: "N-K"
            }
        },
        {
            sku: "FMTCS-ANT-OUTDIR",
            model: "ANTD400R.M",
            fullModel: "FMTCS-ANTD · ANTD400R.M",
            category: "ant",
            name: {
                en: "ANTD400R.M Outdoor Directional Antenna (80°)",
                id: "ANTD400R.M Antena Outdoor Direksional (80°)"
            },
            description: {
                en: "Weatherproof directional panel antenna with 80° horizontal beamwidth for targeted perimeter and courtyard coverage.",
                id: "Antena panel direksional tahan cuaca dengan lebar sudut 80° untuk cakupan perimeter dan area terbuka."
            },
            unit: "Unit",
            priceUsd: 150.0,
            costUsd: 100.0,
            specs: {
                freq: "400–470 MHz",
                gain: "1.5±1 dBi / 7 dBi",
                beam: "80°",
                maxpower: "100 W",
                ip: "IP65",
                vswr: "≤ 1.5",
                conn: "N-K"
            }
        },
        {
            sku: "FMTCS-CAB-COAX12",
            model: "HCAAYZ-50-12",
            fullModel: 'HCAAYZ-50-12 (1/2" Coaxial Cable)',
            category: "cable",
            name: {
                en: '1/2" Low-Loss RF Feeder Coax Cable',
                id: 'Kabel Feeder Koaksial Low-Loss 1/2"'
            },
            description: {
                en: "50-ohm corrugated copper coaxial cable with 6.5 dB/100m attenuation at UHF frequencies.",
                id: "Kabel koaksial tembaga 50 ohm dengan redaman 6.5 dB/100m pada frekuensi UHF."
            },
            unit: "Meter",
            priceUsd: 2.50,
            costUsd: 1.65,
            specs: {
                attenuation: "6.5 dB / 100m @ 450MHz",
                impedance: "50 Ohm",
                vswr: "≤ 1.15"
            }
        },
        {
            sku: "FMTCS-ACC-NK",
            model: "N-K",
            fullModel: 'N-K 1/2" Connector (Male / Female)',
            category: "accessory",
            name: {
                en: 'RF Coaxial Connector N-K for 1/2" Feeder',
                id: 'Konektor Koaksial RF N-K untuk Feeder 1/2"'
            },
            description: {
                en: "Precision 50-ohm N-type connector with waterproof IP68 sealing.",
                id: "Konektor tipe-N 50 ohm presisi dengan proteksi kedap air IP68."
            },
            unit: "Pcs",
            priceUsd: 6.00,
            costUsd: 3.80,
            specs: {
                freq: "DC–6 GHz",
                vswr: "≤ 1.15",
                ip: "IP68"
            }
        },
        {
            sku: "FMTCS-ACC-FIBER",
            model: "LC-LC",
            fullModel: "LC-LC Single-Mode Duplex Patch Cord",
            category: "accessory",
            name: {
                en: "Fiber Optic Patch Cord LC-LC Duplex 9/125 SM",
                id: "Patch Cord Fiber Optik LC-LC Duplex 9/125 SM"
            },
            description: {
                en: "G.652D single-mode duplex fiber patch cord for optical links between OMU, splice trays, and ORUs.",
                id: "Kabel patch cord fiber optik single-mode G.652D duplex untuk link optik OMU dan ORU."
            },
            unit: "Pcs",
            priceUsd: 15.00,
            costUsd: 9.50,
            specs: {
                fiber: "G.652D Single Mode 9/125",
                il: "≤ 0.2 dB",
                rl: "≥ 55 dB"
            }
        }
    ];

    var CABLES = [
        { id: "coax_12", name: '1/2" (HCAAYZ-50-12)', lossPer100m: 6.5, v: 6.5 },
        { id: "coax_78", name: '7/8"', lossPer100m: 3.5, v: 3.5 },
        { id: "coax_114", name: '1-1/4"', lossPer100m: 2.6, v: 2.6 }
    ];

    var ENVS = [
        { id: "env_office", key: "env_office", name: { en: "Office / light walls", id: "Kantor / dinding ringan" }, n: 4.5 },
        { id: "env_dense", key: "env_dense", name: { en: "Dense / industrial", id: "Padat / industri" }, n: 5.0 },
        { id: "env_under", key: "env_under", name: { en: "Underground / tunnel", id: "Bawah tanah / terowongan" }, n: 5.5 },
        { id: "env_open", key: "env_open", name: { en: "Open / line-of-sight", id: "Terbuka / line-of-sight" }, n: 2.8 }
    ];

    var powerRows = [
        { dbm: "−90", mw: "1×10⁻⁹", w: "—", ctx: { en: "radio sensitivity threshold", id: "ambang sensitivitas radio" } },
        { dbm: "0", mw: "1", w: "0.001", ctx: { en: "1 mW reference", id: "referensi 1 mW" } },
        { dbm: "20", mw: "100", w: "0.1", ctx: { en: "100 mW", id: "100 mW" } },
        { dbm: "30", mw: "1,000", w: "1", ctx: { en: "1 W reference", id: "referensi 1 W" } },
        { dbm: "37", mw: "5,012", w: "5", ctx: { en: "handheld full power", id: "HT daya penuh" } },
        { dbm: "40", mw: "10,000", w: "10", ctx: { en: "ORU output (DL)", id: "output ORU (DL)" } },
        { dbm: "44", mw: "25,119", w: "25", ctx: { en: "mobile radio 25 W", id: "mobile radio 25 W" } },
        { dbm: "47", mw: "50,119", w: "50", ctx: { en: "combiner/duplex max/port", id: "combiner/duplex maks/port" } }
    ];

    var vswrRows = [
        { vswr: "1.00", rl: "∞", g: "0.000", refl: "0%", v: "good", l: { en: "ideal", id: "ideal" } },
        { vswr: "1.20", rl: "20.8", g: "0.091", refl: "0.8%", v: "good", l: { en: "excellent", id: "sangat baik" } },
        { vswr: "1.50", rl: "14.0", g: "0.200", refl: "4.0%", v: "good", l: { en: "pass limit (FMTCS)", id: "ambang lulus (FMTCS)" } },
        { vswr: "1.70", rl: "11.7", g: "0.259", refl: "6.7%", v: "warn", l: { en: "borderline", id: "batas" } },
        { vswr: "2.00", rl: "9.5", g: "0.333", refl: "11.1%", v: "warn", l: { en: "check needed", id: "perlu cek" } },
        { vswr: "2.50", rl: "7.4", g: "0.429", refl: "18.4%", v: "bad", l: { en: "poor", id: "buruk" } }
    ];

    /* =========================================================================
     * 4. PURE DETERMINISTIC RF CALCULATION ENGINES
     * ========================================================================= */

    /**
     * Power Conversion: dBm <-> mW <-> Watt <-> dBW
     */
    function calcPowerConversion(src, val) {
        var numVal = parseFloat(val);
        if (!isFinite(numVal)) {
            return { dbm: NaN, mw: NaN, w: NaN, dbw: NaN, isValid: false };
        }
        var dbm;
        if (src === "dbm") {
            dbm = numVal;
        } else if (src === "mw") {
            dbm = (numVal > 0) ? 10 * log10(numVal) : NaN;
        } else if (src === "w") {
            dbm = (numVal > 0) ? 10 * log10(numVal * 1000) : NaN;
        } else if (src === "dbw") {
            dbm = numVal + 30;
        } else {
            dbm = NaN;
        }

        if (!isFinite(dbm)) {
            return { dbm: NaN, mw: NaN, w: NaN, dbw: NaN, isValid: false };
        }

        var mw = Math.pow(10, dbm / 10);
        var w = mw / 1000;
        var dbw = dbm - 30;

        return {
            dbm: dbm,
            mw: mw,
            w: w,
            dbw: dbw,
            isValid: true,
            formatted: {
                dbm: fmt(dbm, 2),
                mw: fmt(mw),
                w: fmt(w),
                dbw: fmt(dbw, 2)
            }
        };
    }

    /**
     * Gain / Loss Conversion: dB <-> Power Ratio <-> Voltage Ratio
     */
    function calcGainConversion(src, val) {
        var numVal = parseFloat(val);
        if (!isFinite(numVal)) {
            return { db: NaN, pr: NaN, vr: NaN, type: "none", isValid: false };
        }
        var db;
        if (src === "db") {
            db = numVal;
        } else if (src === "pr") {
            db = (numVal > 0) ? 10 * log10(numVal) : NaN;
        } else if (src === "vr") {
            db = (numVal > 0) ? 20 * log10(numVal) : NaN;
        } else {
            db = NaN;
        }

        if (!isFinite(db)) {
            return { db: NaN, pr: NaN, vr: NaN, type: "none", isValid: false };
        }

        var pr = Math.pow(10, db / 10);
        var vr = Math.pow(10, db / 20);
        var type = db > 0 ? "gain" : (db < 0 ? "loss" : "none");

        return {
            db: db,
            pr: pr,
            vr: vr,
            type: type,
            isValid: true,
            formatted: {
                db: fmt(db, 2),
                pr: fmt(pr),
                vr: fmt(vr)
            }
        };
    }

    /**
     * Matching: VSWR <-> Return Loss (dB) <-> Gamma (Reflection Coeff) <-> % Reflected
     */
    function calcVswrConversion(src, val) {
        var numVal = parseFloat(val);
        if (!isFinite(numVal)) {
            return { vswr: NaN, rl: NaN, gamma: NaN, reflectedPct: NaN, rating: "bad", isValid: false, error: "invalid" };
        }
        var vswr, gamma, rl;
        if (src === "vswr") {
            vswr = numVal;
            if (vswr < 1) {
                return { vswr: NaN, rl: NaN, gamma: NaN, reflectedPct: NaN, rating: "bad", isValid: false, error: "vge1" };
            }
            gamma = (vswr - 1) / (vswr + 1);
            rl = (gamma > 0) ? -20 * log10(gamma) : Infinity;
        } else if (src === "rl") {
            rl = numVal;
            if (rl < 0) {
                return { vswr: NaN, rl: NaN, gamma: NaN, reflectedPct: NaN, rating: "bad", isValid: false, error: "rlge0" };
            }
            gamma = Math.pow(10, -rl / 20);
            vswr = (gamma >= 1) ? Infinity : (1 + gamma) / (1 - gamma);
        } else {
            return { vswr: NaN, rl: NaN, gamma: NaN, reflectedPct: NaN, rating: "bad", isValid: false, error: "invalid" };
        }

        var reflectedPct = gamma * gamma * 100;
        var rating = vswr <= 1.5 ? "good" : (vswr <= 2.0 ? "warn" : "bad");

        return {
            vswr: vswr,
            rl: rl,
            gamma: gamma,
            reflectedPct: reflectedPct,
            rating: rating,
            isValid: true,
            error: null,
            formatted: {
                vswr: fmt(vswr, 3),
                rl: isFinite(rl) ? fmt(rl, 1) : "∞",
                gamma: fmt(gamma, 3),
                reflectedPct: fmt(reflectedPct, 2)
            }
        };
    }

    /**
     * Field Meter Conversion: dBµV <-> dBm @ 50 Ohm + mW
     */
    function calcFieldMeterConversion(src, val) {
        var numVal = parseFloat(val);
        if (!isFinite(numVal)) {
            return { dbuv: NaN, dbm: NaN, mw: NaN, isValid: false };
        }
        var dbuv, dbm;
        if (src === "dbuv") {
            dbuv = numVal;
            dbm = dbuv - 107;
        } else if (src === "dbm") {
            dbm = numVal;
            dbuv = dbm + 107;
        } else {
            return { dbuv: NaN, dbm: NaN, mw: NaN, isValid: false };
        }

        var mw = Math.pow(10, dbm / 10);

        return {
            dbuv: dbuv,
            dbm: dbm,
            mw: mw,
            isValid: true,
            formatted: {
                dbuv: fmt(dbuv, 2),
                dbm: fmt(dbm, 2),
                mw: fmt(mw)
            }
        };
    }

    /**
     * DAS Link Budget Engine
     * Calculates signal levels stage-by-stage from ORU down to antenna EIRP and indoor coverage area
     */
    function calcDasLinkBudget(params) {
        var p = params || {};
        var oru = parseFloat(p.oruOutputDbm != null ? p.oruOutputDbm : 40);
        var len = parseFloat(p.cableLengthM != null ? p.cableLengthM : 50);
        var ns = parseFloat(p.splittersCount != null ? p.splittersCount : 1);
        var other = parseFloat(p.otherLossDb != null ? p.otherLossDb : 1.5);
        var antg = parseFloat(p.antennaGainDbi != null ? p.antennaGainDbi : 3.0);
        var target = parseFloat(p.targetSensitivityDbm != null ? p.targetSensitivityDbm : -95);
        var margin = parseFloat(p.fadeMarginDb != null ? p.fadeMarginDb : 10);

        var cIdx = parseInt(p.cableTypeIndex, 10);
        if (isNaN(cIdx) || cIdx < 0 || cIdx >= CABLES.length) cIdx = 0;
        var cableRate = CABLES[cIdx].v;

        var eIdx = parseInt(p.envIndex, 10);
        if (isNaN(eIdx) || eIdx < 0 || eIdx >= ENVS.length) eIdx = 0;
        var n = ENVS[eIdx].n;

        if ([oru, len, ns, other, antg, target, margin, cableRate, n].some(function(x) { return !isFinite(x); })) {
            return { isValid: false, chain: [], healthStatus: "bad", radiusM: 0, coverageAreaM2: 0 };
        }

        var cableLoss = (len / 100) * cableRate;
        var splitLoss = ns * 3.3;
        var totalPassiveLoss = cableLoss + splitLoss + other;
        var antin = oru - totalPassiveLoss;
        var eirp = antin + antg;

        // Stage-by-stage signal chain
        var chain = [
            { stageKey: "lb_st_oru", deltaDb: 0, levelDbm: oru, type: "lvl" },
            { stageKey: "lb_st_cable", deltaDb: -cableLoss, levelDbm: oru - cableLoss, type: "neg" },
            { stageKey: "lb_st_split", deltaDb: -splitLoss, levelDbm: oru - cableLoss - splitLoss, type: "neg" },
            { stageKey: "lb_st_other", deltaDb: -other, levelDbm: antin, type: "neg" },
            { stageKey: "lb_st_antin", deltaDb: 0, levelDbm: antin, type: "lvl" },
            { stageKey: "lb_st_gain", deltaDb: antg, levelDbm: eirp, type: "pos" },
            { stageKey: "lb_st_eirp", deltaDb: 0, levelDbm: eirp, type: "lvl" }
        ];

        // Coverage estimation: PL(d) = 24.8 + 10*n*log10(d)
        // EIRP - PLmax - margin = target => PLmax = EIRP - margin - target
        var PLmax = eirp - margin - target;
        var radiusM = Math.pow(10, (PLmax - 24.8) / (10 * n));
        if (!isFinite(radiusM) || radiusM < 0) radiusM = 0;
        var coverageAreaM2 = Math.PI * radiusM * radiusM;

        var healthStatus, healthVerdictKey;
        if (antin > 20) {
            healthStatus = "warn";
            healthVerdictKey = "lb_h_hi";
        } else if (antin < -5) {
            healthStatus = "bad";
            healthVerdictKey = "lb_h_lo";
        } else {
            healthStatus = "good";
            healthVerdictKey = "lb_h_good";
        }

        return {
            isValid: true,
            oruOutputDbm: oru,
            cableLoss: cableLoss,
            splitLoss: splitLoss,
            otherLossDb: other,
            totalPassiveLoss: totalPassiveLoss,
            antennaInputPower: antin,
            antennaGainDbi: antg,
            eirp: eirp,
            targetSensitivityDbm: target,
            fadeMarginDb: margin,
            n: n,
            radiusM: radiusM,
            coverageAreaM2: coverageAreaM2,
            healthStatus: healthStatus,
            healthVerdictKey: healthVerdictKey,
            chain: chain,
            formatted: {
                antennaInputPower: fmt(antin, 1),
                eirp: fmt(eirp, 1),
                radiusM: radiusM >= 1000 ? fmt(radiusM / 1000, 2) + " km" : fmt(radiusM, 0) + " m",
                coverageAreaM2: coverageAreaM2 >= 10000 ? fmt(coverageAreaM2 / 10000, 2) + " ha" : fmt(coverageAreaM2, 0) + " m²"
            }
        };
    }

    /**
     * Antenna Count Planner
     * area -> antennas based on radius and utilization factor
     */
    function calcAntennaPlanner(areaM2, radiusM, utilPct) {
        var area = parseFloat(areaM2);
        var r = parseFloat(radiusM);
        var util = parseFloat(utilPct);
        if (util > 1) util = util / 100;

        if (!(area > 0) || !(r > 0) || !(util > 0)) {
            return {
                areaM2: 0,
                radiusM: 0,
                utilFactor: 0,
                areaPerAntenna: 0,
                totalAntennas: 0,
                recommendedAntennas: 0,
                countWithMargin: 0,
                gridSpacingM: 0,
                isValid: false,
                formatted: {
                    totalAntennas: "0",
                    areaPerAntenna: "0 m²"
                }
            };
        }

        var rawPer = Math.PI * r * r;
        var per = rawPer * util;
        var rawN = Math.max(1, Math.ceil(area / rawPer));
        var n = Math.max(1, Math.ceil(area / per));
        var gridSpacingM = Math.round(Math.sqrt(per) * 10) / 10;

        return {
            areaM2: area,
            radiusM: r,
            utilFactor: util,
            areaPerAntenna: per,
            totalAntennas: n,
            recommendedAntennas: rawN,
            countWithMargin: n,
            gridSpacingM: gridSpacingM,
            isValid: true,
            formatted: {
                totalAntennas: fmtInt(n),
                areaPerAntenna: fmtInt(per) + " m²"
            }
        };
    }

    /**
     * Okumura-Hata Outdoor Propagation Model
     * Calculates path loss, uplink and downlink link margins, pass/fail, and maximum coverage distance
     */
    function calcOkumuraHataOutdoor(params) {
        var P = params || {};
        var freq = parseFloat(P.freq != null ? P.freq : P.cov_f);
        var dist = parseFloat(P.dist != null ? P.dist : P.cov_d);
        var bsHeight = parseFloat(P.bsHeight != null ? P.bsHeight : P.cov_ht);
        var htHeight = parseFloat(P.htHeight != null ? P.htHeight : P.cov_hm);
        var bsTxDbm = parseFloat(P.bsTxDbm != null ? P.bsTxDbm : P.cov_txbs);
        var htTxDbm = parseFloat(P.htTxDbm != null ? P.htTxDbm : P.cov_txms);
        var bsGainDbi = parseFloat(P.bsGainDbi != null ? P.bsGainDbi : P.cov_gbs);
        var htGainDbi = parseFloat(P.htGainDbi != null ? P.htGainDbi : P.cov_gms);
        var bsRxSensDbm = parseFloat(P.bsRxSensDbm != null ? P.bsRxSensDbm : P.cov_rxbs);
        var htRxSensDbm = parseFloat(P.htRxSensDbm != null ? P.htRxSensDbm : P.cov_rxms);
        var bsFeederLossDb = parseFloat(P.bsFeederLossDb != null ? P.bsFeederLossDb : P.cov_flbs);
        var htFeederLossDb = parseFloat(P.htFeederLossDb != null ? P.htFeederLossDb : P.cov_flms);

        if ([freq, dist, bsHeight, htHeight, bsTxDbm, htTxDbm, bsGainDbi, htGainDbi, bsRxSensDbm, htRxSensDbm, bsFeederLossDb, htFeederLossDb].some(function(x) { return !isFinite(x); })) {
            return { isValid: false, results: [] };
        }
        if (!(freq > 0) || !(dist > 0) || !(bsHeight > 0) || !(htHeight > 0)) {
            return { isValid: false, results: [] };
        }

        var pObj = {
            cov_f: freq, cov_d: dist, cov_ht: bsHeight, cov_hm: htHeight,
            cov_txbs: bsTxDbm, cov_txms: htTxDbm, cov_gbs: bsGainDbi, cov_gms: htGainDbi,
            cov_rxbs: bsRxSensDbm, cov_rxms: htRxSensDbm, cov_flbs: bsFeederLossDb, cov_flms: htFeederLossDb
        };

        function covPL(env, dd, pIn) {
            var lf = log10(pIn.cov_f), lht = log10(pIn.cov_ht);
            var aS = (1.11 * lf - 0.7) * pIn.cov_hm - (1.56 * lf - 0.8);
            var aL = (pIn.cov_f <= 200) ? (8.29 * Math.pow(log10(1.54 * pIn.cov_hm), 2) - 1.1) : (3.2 * Math.pow(log10(11.75 * pIn.cov_hm), 2) - 4.97);
            var baseS = 69.55 + 26.16 * lf - 13.82 * lht - aS + (44.9 - 6.55 * lht) * log10(dd);
            var baseL = 69.55 + 26.16 * lf - 13.82 * lht - aL + (44.9 - 6.55 * lht) * log10(dd);
            var Ks = 1.77 * lf * lf - 5.57 * lf - 0.56 * (dd - 10) + 0.04 * dd * dd;
            var Qo = 4.78 * lf * lf - 18.33 * lf + 40.94;
            if (env === "urbanS") return baseS;
            if (env === "urbanL") return baseL;
            if (env === "subS") return baseS - Ks;
            if (env === "subL") return baseL - Ks;
            if (env === "openS") return baseS - Qo;
            return baseL - Qo;
        }

        function covMargins(pIn, PL) {
            return {
                up: pIn.cov_txms + pIn.cov_gms - pIn.cov_flms - PL + pIn.cov_gbs - pIn.cov_flbs - pIn.cov_rxbs,
                down: pIn.cov_txbs + pIn.cov_gbs - pIn.cov_flbs - PL + pIn.cov_gms - pIn.cov_flms - pIn.cov_rxms
            };
        }

        function covMaxDist(env, pIn) {
            var last = 0;
            for (var dd = 0.1; dd <= 100.0001; dd += 0.1) {
                var m = covMargins(pIn, covPL(env, dd, pIn));
                if (Math.min(m.up, m.down) >= 0) last = dd;
                else break;
            }
            return last;
        }

        var envList = [
            { key: "urbanS", name: { en: "Urban (Small / Medium City)", id: "Perkotaan Padat (Kecil / Sedang)" } },
            { key: "urbanL", name: { en: "Urban Metropolitan (Large City)", id: "Metropolitan / Gedung Tinggi (Besar)" } },
            { key: "subS", name: { en: "Suburban / Industrial Park (Small/Med)", id: "Suburban / Kawasan Industri (Sedang)" } },
            { key: "subL", name: { en: "Suburban / Commercial Zone (Large)", id: "Suburban / Area Komersial (Besar)" } },
            { key: "openS", name: { en: "Open / Rural / Mining Area (Small/Med)", id: "Area Terbuka / Tambang / Perkebunan" } },
            { key: "openL", name: { en: "Open / Flat Terrain (Large)", id: "Area Terbuka Datar / Pesisir (Luas)" } }
        ];

        var results = envList.map(function(e) {
            var PL = covPL(e.key, pObj.cov_d, pObj);
            var m = covMargins(pObj, PL);
            var minM = Math.min(m.up, m.down);
            var pass = m.up > 0 && m.down > 0;
            var status = minM >= 10 ? "good" : (minM >= 0 ? "warn" : "bad");
            var md = covMaxDist(e.key, pObj);
            var mdStr = md <= 0 ? "0" : (md >= 100 ? "≥ 100" : fmt(md, 1));
            return {
                key: e.key,
                envKey: e.key,
                name: e.name,
                pathLoss: PL,
                uplinkMargin: m.up,
                upMargin: m.up,
                downlinkMargin: m.down,
                downMargin: m.down,
                pass: pass,
                status: status,
                maxDistKm: md,
                maxDistStr: mdStr,
                formatted: {
                    pl: fmt(PL, 1) + " dB",
                    pathLoss: fmt(PL, 1),
                    upMargin: (m.up >= 0 ? "+" : "") + fmt(m.up, 1) + " dB",
                    uplinkMargin: fmt(m.up, 1),
                    downMargin: (m.down >= 0 ? "+" : "") + fmt(m.down, 1) + " dB",
                    downlinkMargin: fmt(m.down, 1),
                    maxDist: mdStr + " km"
                }
            };
        });

        return {
            isValid: true,
            params: pObj,
            results: results
        };
    }

    /**
     * Enterprise DAS BoQ Sizing & Financial Engine
     * Generates complete bill of quantities, COGS, margin guardrails, and currency conversions
     */
    function calcDasBoq(state, exchangeRate) {
        var s = state || {};
        var kurs = parseFloat(exchangeRate);
        if (!isFinite(kurs) || kurs <= 0) kurs = 16200.0;

        // Determine indoor antenna points
        var ant = 0;
        var floors = Array.isArray(s.floors) ? s.floors : [];
        if (floors.length > 0) {
            floors.forEach(function(r) {
                var q = parseFloat(r.q);
                if (isFinite(q) && q > 0) ant += q;
            });
        } else if (s.ant != null) {
            ant = parseFloat(s.ant) || 0;
            floors = [{ f: "General", q: ant }];
        }

        var rep = s.rep === "" || s.rep == null ? 0 : Math.max(0, parseFloat(s.rep) || 0);
        var radio = s.radio === "" || s.radio == null ? 0 : Math.max(0, parseFloat(s.radio) || 0);
        var outo = s.outo === "" || s.outo == null ? 0 : Math.max(0, parseFloat(s.outo) || 0);
        var outd = s.outd === "" || s.outd == null ? 0 : Math.max(0, parseFloat(s.outd) || 0);

        var archMode = s.archMode === "analog" ? "analog" : "digital";
        var fiberTopo = s.fiberTopo === "ring" ? "ring" : (s.fiberTopo === "cascade" ? "cascade" : "star");

        // Design Ratios
        var r_oru = parseFloat(s.r_oru != null ? s.r_oru : (archMode === "analog" ? 16 : 32));
        var r_omu = parseFloat(s.r_omu != null ? s.r_omu : (archMode === "analog" ? 4 : 32));
        var r_split = parseFloat(s.r_split != null ? s.r_split : 0.45);
        var r_coup = parseFloat(s.r_coup != null ? s.r_coup : 0.25);
        var r_cable = parseFloat(s.r_cable != null ? s.r_cable : 25.0);

        // Core equipment counts
        var oruQty = ant > 0 ? Math.ceil(ant / Math.max(r_oru, 1)) : 0;
        var omuQty = oruQty > 0 ? Math.ceil(oruQty / Math.max(r_omu, 1)) : 0;
        var sigSplitQty = omuQty * 2;
        var combQty = rep > 0 ? Math.max(1, Math.ceil(rep / 8)) : 0;
        var muxQty = rep > 0 ? Math.max(1, Math.ceil(rep / 8)) : 0;
        var pwrSplitQty = Math.round(ant * r_split);
        var couplerQty = Math.round(ant * r_coup);
        var cableQty = Math.round(ant * r_cable);
        var connQty = Math.round(ant * 6);

        // Fiber multiplier depends on topology
        var fiberMultiplier = fiberTopo === "ring" ? 3.0 : (fiberTopo === "cascade" ? 2.5 : 2.3);
        var fiberQty = Math.round(oruQty * fiberMultiplier);

        var antIndoorQty = Math.round(ant);
        var antOutOmniQty = Math.round(outo);
        var antOutDirQty = Math.round(outd);
        var repQty = Math.round(rep);
        var radioQty = Math.round(radio);

        // Map SKU and hardware specifics
        var omuModel = archMode === "analog" ? "AOMU400C.RI" : "DOMU400C.RI";
        var omuSku = archMode === "analog" ? "FMTCS-OMU-ANA" : "FMTCS-OMU-DIG";
        var omuPriceDefault = archMode === "analog" ? 2800.0 : 4500.0;
        var omuCostDefault = archMode === "analog" ? 1950.0 : 3150.0;

        var oruModel = archMode === "analog" ? "AORU400CH.RI" : "DORU400CH.RI";
        var oruSku = archMode === "analog" ? "FMTCS-ORU-ANA" : "FMTCS-ORU-DIG";
        var oruPriceDefault = archMode === "analog" ? 1950.0 : 3200.0;
        var oruCostDefault = archMode === "analog" ? 1350.0 : 2250.0;

        var rawItems = [
            { key: "bq_i_ant", sku: "FMTCS-ANT-INDOOR", model: "ANTI400R.M", name: { en: "Indoor Omni Ceiling Antenna", id: "Antena Indoor Omni Plafon" }, qty: antIndoorQty, unit: "Unit", defaultPriceUsd: 35.0, cogsUsd: 22.0 },
            { key: "bq_i_oru", sku: oruSku, model: oruModel, name: { en: "Optical Remote Unit (10W)", id: "Optical Remote Unit (10W)" }, qty: oruQty, unit: "Unit", defaultPriceUsd: oruPriceDefault, cogsUsd: oruCostDefault },
            { key: "bq_i_omu", sku: omuSku, model: omuModel, name: { en: "Optical Master Unit", id: "Optical Master Unit" }, qty: omuQty, unit: "Unit", defaultPriceUsd: omuPriceDefault, cogsUsd: omuCostDefault },
            { key: "bq_i_sig", sku: "FMTCS-PAS-UDSS", model: "UDSS400C", name: { en: "Signal Splitter (UL/DL Separator)", id: "Signal Splitter (Pemisah UL/DL)" }, qty: sigSplitQty, unit: "Unit", defaultPriceUsd: 450.0, cogsUsd: 310.0 },
            { key: "bq_i_split", sku: "FMTCS-PAS-PD2", model: "PD400R.M", name: { en: "Power Splitter (2-Way)", id: "Power Splitter (2 Arah)" }, qty: pwrSplitQty, unit: "Unit", defaultPriceUsd: 45.0, cogsUsd: 28.0 },
            { key: "bq_i_coup", sku: "FMTCS-PAS-CP", model: "CP400R.M", name: { en: "Directional Coupler (Tap)", id: "Directional Coupler (Penyadap)" }, qty: couplerQty, unit: "Unit", defaultPriceUsd: 55.0, cogsUsd: 35.0 },
            { key: "bq_i_comb", sku: "FMTCS-PAS-CFH8", model: "FMTCS-CFH (2/4/8)", name: { en: "TX Cavity Combiner (8-Port)", id: "TX Cavity Combiner (8-Port)" }, qty: combQty, unit: "Unit", defaultPriceUsd: 1200.0, cogsUsd: 840.0 },
            { key: "bq_i_mux", sku: "FMTCS-PAS-DJF8", model: "FMTCS-DJF (2/4/8)", name: { en: "RX Multicoupler / Divider (8-Port)", id: "RX Multicoupler / Divider (8-Port)" }, qty: muxQty, unit: "Unit", defaultPriceUsd: 950.0, cogsUsd: 665.0 },
            { key: "bq_i_outo", sku: "FMTCS-ANT-OUTOMNI", model: "ANTG400R.M", name: { en: "Outdoor Omni Antenna (4 dBi)", id: "Antena Outdoor Omni (4 dBi)" }, qty: antOutOmniQty, unit: "Unit", defaultPriceUsd: 120.0, cogsUsd: 80.0 },
            { key: "bq_i_outd", sku: "FMTCS-ANT-OUTDIR", model: "ANTD400R.M", name: { en: "Outdoor Directional Antenna (80°)", id: "Antena Outdoor Direksional (80°)" }, qty: antOutDirQty, unit: "Unit", defaultPriceUsd: 150.0, cogsUsd: 100.0 },
            { key: "bq_i_cable", sku: "FMTCS-CAB-COAX12", model: "HCAAYZ-50-12", name: { en: 'Coaxial Feeder Cable 1/2"', id: 'Kabel Feeder Koaksial 1/2"' }, qty: cableQty, unit: "Meter", defaultPriceUsd: 2.50, cogsUsd: 1.65 },
            { key: "bq_i_conn", sku: "FMTCS-ACC-NK", model: "N-K", name: { en: 'RF Coaxial Connector N-K 1/2"', id: 'Konektor Koaksial RF N-K 1/2"' }, qty: connQty, unit: "Pcs", defaultPriceUsd: 6.00, cogsUsd: 3.80 },
            { key: "bq_i_fiber", sku: "FMTCS-ACC-FIBER", model: "LC-LC", name: { en: "Fiber Patch Cord Duplex LC-LC SM", id: "Kabel Fiber Patch Cord Duplex LC-LC SM" }, qty: fiberQty, unit: "Pcs", defaultPriceUsd: 15.00, cogsUsd: 9.50 },
            { key: "bq_i_rep", sku: "MOT-RPT-SLR5300", model: "SLR 5300", name: { en: "Base Station Repeater (MOTOTRBO)", id: "Repeater Base Station (MOTOTRBO)" }, qty: repQty, unit: "Unit", defaultPriceUsd: 2850.0, cogsUsd: 2100.0 },
            { key: "bq_i_radio", sku: "MOT-HT-R2", model: "MOTOTRBO R2", name: { en: "Two-Way Radio DMR Handheld", id: "Radio Komunikasi Dua Arah DMR" }, qty: radioQty, unit: "Unit", defaultPriceUsd: 335.0, cogsUsd: 240.0 }
        ];

        var customPrices = s.customPrices || {};
        var customCurs = s.customCurrencies || {};
        var cloudPrices = s.cloudPrices || {};
        var cloudCogs = s.cloudCogs || {};

        var totalCogsUsd = 0;
        var totalSellUsd = 0;
        var totalSellIdr = 0;

        var items = rawItems.map(function(item) {
            var cur = customCurs[item.key] || customCurs[item.sku] || "USD";
            var basePriceUsd = cloudPrices[item.sku] != null ? parseFloat(cloudPrices[item.sku]) : (cloudPrices[item.key] != null ? parseFloat(cloudPrices[item.key]) : item.defaultPriceUsd);
            var baseCogsUsd = cloudCogs[item.sku] != null ? parseFloat(cloudCogs[item.sku]) : (cloudCogs[item.key] != null ? parseFloat(cloudCogs[item.key]) : item.cogsUsd);

            var userPrice = customPrices[item.key] != null ? parseFloat(customPrices[item.key]) : (customPrices[item.sku] != null ? parseFloat(customPrices[item.sku]) : basePriceUsd);
            if (!isFinite(userPrice) || userPrice < 0) userPrice = basePriceUsd;

            var unitPriceUsd = (cur === "IDR") ? userPrice / kurs : userPrice;
            var unitPriceIdr = (cur === "IDR") ? userPrice : userPrice * kurs;

            var lineSellUsd = item.qty * unitPriceUsd;
            var lineSellIdr = item.qty * unitPriceIdr;

            var lineCogsUsd = item.qty * baseCogsUsd;
            var lineCogsIdr = lineCogsUsd * kurs;

            var lineMarginUsd = lineSellUsd - lineCogsUsd;
            var marginPct = lineSellUsd > 0 ? (lineMarginUsd / lineSellUsd) * 100 : 0;
            var marginWarning = marginPct < 15.0;

            totalCogsUsd += lineCogsUsd;
            totalSellUsd += lineSellUsd;
            totalSellIdr += lineSellIdr;

            return {
                key: item.key,
                sku: item.sku,
                model: item.model,
                name: item.name,
                qty: item.qty,
                unit: item.unit,
                currency: cur,
                unitPrice: userPrice,
                unitPriceUsd: unitPriceUsd,
                unitPriceIdr: unitPriceIdr,
                cogsUsd: item.cogsUsd,
                cogsIdr: item.cogsUsd * kurs,
                lineCogsUsd: lineCogsUsd,
                lineCogsIdr: lineCogsIdr,
                lineSellUsd: lineSellUsd,
                lineSellIdr: lineSellIdr,
                lineMarginUsd: lineMarginUsd,
                marginPct: marginPct,
                marginWarning: marginWarning,
                formatted: {
                    unitPrice: cur === "IDR" ? fmtMoney(userPrice, "IDR") : fmtMoney(userPrice, "USD"),
                    lineSellUsd: fmtMoney(lineSellUsd, "USD"),
                    lineSellIdr: fmtMoney(lineSellIdr, "IDR"),
                    marginPct: fmt(marginPct, 1) + "%"
                }
            };
        });

        var totalCogsIdr = totalCogsUsd * kurs;
        var totalMarginUsd = totalSellUsd - totalCogsUsd;
        var totalMarginIdr = totalSellIdr - totalCogsIdr;
        var overallMarginPct = totalSellUsd > 0 ? (totalMarginUsd / totalSellUsd) * 100 : 0;
        var marginGuardrailPassed = overallMarginPct >= 15.0;

        return {
            archMode: archMode,
            fiberTopo: fiberTopo,
            exchangeRate: kurs,
            floors: floors,
            quantities: {
                antIndoorQty: antIndoorQty,
                oruQty: oruQty,
                omuQty: omuQty,
                sigSplitQty: sigSplitQty,
                combQty: combQty,
                muxQty: muxQty,
                pwrSplitQty: pwrSplitQty,
                couplerQty: couplerQty,
                cableQty: cableQty,
                connQty: connQty,
                fiberQty: fiberQty,
                antOutOmniQty: antOutOmniQty,
                antOutDirQty: antOutDirQty,
                repQty: repQty,
                radioQty: radioQty
            },
            ratios: {
                r_oru: r_oru,
                r_omu: r_omu,
                r_split: r_split,
                r_coup: r_coup,
                r_cable: r_cable
            },
            items: items,
            totals: {
                totalCogsUsd: totalCogsUsd,
                totalCogsIdr: totalCogsIdr,
                totalSellUsd: totalSellUsd,
                totalSellIdr: totalSellIdr,
                totalMarginUsd: totalMarginUsd,
                totalMarginIdr: totalMarginIdr,
                overallMarginPct: overallMarginPct,
                marginGuardrailPassed: marginGuardrailPassed
            },
            formatted: {
                totalSellUsd: fmtMoney(totalSellUsd, "USD"),
                totalSellIdr: fmtMoney(totalSellIdr, "IDR"),
                totalCogsUsd: fmtMoney(totalCogsUsd, "USD"),
                totalMarginUsd: fmtMoney(totalMarginUsd, "USD"),
                overallMarginPct: fmt(overallMarginPct, 1) + "%"
            }
        };
    }

    /* =========================================================================
     * 5. HIGH-CONTRAST SVG TOPOLOGY ARCHITECTURE BUILDER
     * ========================================================================= */
    function buildDasTopologySVG(boqResult, archMode, fiberTopo, floors, lang) {
        var isEn = lang === "en";
        var b = boqResult && boqResult.quantities ? boqResult.quantities : {
            antIndoorQty: 100, oruQty: 4, omuQty: 1, repQty: 2,
            combQty: 1, muxQty: 1, sigSplitQty: 2, pwrSplitQty: 45, couplerQty: 25, cableQty: 2500, fiberQty: 10
        };
        var mode = archMode === "analog" ? "analog" : "digital";
        var topo = fiberTopo === "ring" ? "ring" : (fiberTopo === "cascade" ? "cascade" : "star");

        var archTitle = mode === "analog" ? (isEn ? "ANALOG RF-OVER-FIBER (AOMU / AORU)" : "ANALOG DIRECT RF-OVER-FIBER (AOMU / AORU)") : (isEn ? "DIGITAL C-RAN FIBER DAS (DOMU / DORU)" : "DIGITAL C-RAN FIBER DAS (DOMU / DORU)");
        var topoBadge = topo === "ring" ? (isEn ? "OPTICAL REDUNDANT RING (SELF-HEALING)" : "TOPOLOGI RING OPTIK REDUNDAN (SELF-HEALING)") : (topo === "cascade" ? (isEn ? "OPTICAL CASCADE / DAISY-CHAIN" : "TOPOLOGI CASCADE / DAISY-CHAIN") : (isEn ? "OPTICAL STAR TOPOLOGY (HOME-RUN)" : "TOPOLOGI STAR FIBER OPTIK (HOME-RUN)"));

        var omuName = mode === "analog" ? "AOMU400C.RI" : "DOMU400C.RI";
        var oruName = mode === "analog" ? "AORU400CH.RI" : "DORU400CH.RI";

        // Display up to 3 floors
        var fArr = Array.isArray(floors) && floors.length > 0 ? floors.slice(0, 3) : [{ f: "Floor 3", q: 35 }, { f: "Floor 2", q: 35 }, { f: "Floor 1", q: 30 }];

        var svg = `
        <svg viewBox="0 0 960 490" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:linear-gradient(180deg,#070d18 0%,#0f172a 100%);border-radius:12px;border:1px solid #1e293b;font-family:'Segoe UI',Roboto,-apple-system,sans-serif;">
            <defs>
                <linearGradient id="hdrGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="#003875"/>
                    <stop offset="100%" stop-color="#0284c7"/>
                </linearGradient>
                <linearGradient id="rfGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#1e293b"/>
                    <stop offset="100%" stop-color="#0f172a"/>
                </linearGradient>
                <linearGradient id="omuGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#0369a1"/>
                    <stop offset="100%" stop-color="#0c4a6e"/>
                </linearGradient>
                <linearGradient id="oruGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#047857"/>
                    <stop offset="100%" stop-color="#064e3b"/>
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>

            <!-- Top Header Banner -->
            <rect x="20" y="16" width="920" height="52" rx="10" fill="url(#hdrGrad)" stroke="#38bdf8" stroke-width="1.2"/>
            <text x="480" y="38" text-anchor="middle" fill="#ffffff" font-size="14.5" font-weight="700" letter-spacing="0.5">RFoF DAS by FMTCS — RF OVER FIBER DISTRIBUTED ANTENNA SYSTEM</text>
            <text x="480" y="55" text-anchor="middle" fill="#bae6fd" font-size="11" font-weight="600">${archTitle} • ${topoBadge}</text>

            <!-- Section Labels -->
            <text x="85" y="90" fill="#94a3b8" font-size="10" font-weight="700" letter-spacing="1">1. RF HEADEND</text>
            <text x="250" y="90" fill="#38bdf8" font-size="10" font-weight="700" letter-spacing="1">2. OPTICAL MASTER</text>
            <text x="480" y="90" fill="#2dd4bf" font-size="10" font-weight="700" letter-spacing="1">3. FIBER BACKBONE (${topo.toUpperCase()})</text>
            <text x="690" y="90" fill="#34d399" font-size="10" font-weight="700" letter-spacing="1">4. REMOTE NODES</text>
            <text x="860" y="90" fill="#fbbf24" font-size="10" font-weight="700" letter-spacing="1">5. COVERAGE</text>

            <!-- 1. BASE STATION / HEADEND -->
            <g transform="translate(25, 105)">
                <!-- Repeaters -->
                <rect x="0" y="0" width="120" height="54" rx="8" fill="url(#rfGrad)" stroke="#64748b" stroke-width="1.5"/>
                <text x="60" y="20" text-anchor="middle" fill="#38bdf8" font-size="10" font-weight="700">BASE REPEATERS</text>
                <text x="60" y="36" text-anchor="middle" fill="#f8fafc" font-size="9.5" font-weight="600">${b.repQty}x SLR 5300</text>
                <text x="60" y="47" text-anchor="middle" fill="#94a3b8" font-size="8">${b.repQty * 2} TDMA Slots (400MHz)</text>

                <!-- Combiner / Multicoupler -->
                <rect x="0" y="70" width="120" height="54" rx="8" fill="url(#rfGrad)" stroke="#f97316" stroke-width="1.5"/>
                <text x="60" y="90" text-anchor="middle" fill="#fb923c" font-size="9.5" font-weight="700">TX COMB / RX MUX</text>
                <text x="60" y="105" text-anchor="middle" fill="#f8fafc" font-size="9">${b.combQty}x CFH8 &amp; ${b.muxQty}x DJF8</text>
                <text x="60" y="117" text-anchor="middle" fill="#fdba74" font-size="8">Cavity Iso ≥ 45 dB</text>

                <!-- Signal Splitter UDSS -->
                <rect x="0" y="140" width="120" height="50" rx="8" fill="url(#rfGrad)" stroke="#a855f7" stroke-width="1.5"/>
                <text x="60" y="160" text-anchor="middle" fill="#c084fc" font-size="9.5" font-weight="700">SIGNAL SPLITTER</text>
                <text x="60" y="176" text-anchor="middle" fill="#f8fafc" font-size="9">${b.sigSplitQty}x UDSS400C (UL/DL)</text>

                <!-- Connecting RF Lines -->
                <line x1="60" y1="54" x2="60" y2="70" stroke="#f97316" stroke-width="2"/>
                <line x1="60" y1="124" x2="60" y2="140" stroke="#f97316" stroke-width="2"/>
                <line x1="120" y1="165" x2="190" y2="165" stroke="#f97316" stroke-width="2.5"/>
                <text x="155" y="158" text-anchor="middle" fill="#fb923c" font-size="8" font-weight="600">RF 50Ω</text>
            </g>

            <!-- 2. OPTICAL MASTER UNIT (OMU) -->
            <g transform="translate(190, 210)">
                <rect x="0" y="0" width="125" height="110" rx="10" fill="url(#omuGrad)" stroke="#38bdf8" stroke-width="2" filter="url(#glow)"/>
                <rect x="10" y="10" width="105" height="22" rx="5" fill="#075985"/>
                <text x="62" y="25" text-anchor="middle" fill="#ffffff" font-size="10.5" font-weight="700">${b.omuQty}x OMU</text>
                <text x="62" y="47" text-anchor="middle" fill="#e0f2fe" font-size="10" font-weight="600">${omuName}</text>
                <text x="62" y="62" text-anchor="middle" fill="#bae6fd" font-size="8.5">${mode === 'analog' ? 'Cap: ≤ 4 ORU' : 'Cap: ≤ 32 ORU'}</text>
                <text x="62" y="75" text-anchor="middle" fill="#bae6fd" font-size="8.5">WDM 1310/1550nm</text>
                <text x="62" y="96" text-anchor="middle" fill="#7dd3fc" font-size="8" font-weight="700">OPTICAL REACH ≤ 20KM</text>
            </g>

            <!-- 3. FIBER OPTIC DISTRIBUTION PATHS -->
            <g stroke="#06b6d4" stroke-width="2.5" fill="none" filter="url(#glow)">
                ${topo === 'ring' ? `
                    <!-- Ring Topology Path -->
                    <path d="M 315 240 C 400 180, 520 180, 620 220 C 580 340, 420 360, 315 285" stroke-dasharray="6,4"/>
                    <circle cx="470" cy="190" r="4" fill="#22d3ee"/>
                    <circle cx="470" cy="335" r="4" fill="#22d3ee"/>
                ` : (topo === 'cascade' ? `
                    <!-- Cascade Topology Path -->
                    <path d="M 315 265 L 620 265"/>
                    <path d="M 680 230 L 680 180"/>
                    <path d="M 680 300 L 680 350"/>
                ` : `
                    <!-- Star Topology Path -->
                    <path d="M 315 240 C 420 200, 500 190, 620 180"/>
                    <path d="M 315 265 L 620 265"/>
                    <path d="M 315 290 C 420 330, 500 340, 620 350"/>
                `)}
            </g>
            <text x="470" y="258" text-anchor="middle" fill="#67e8f9" font-size="9" font-weight="700" letter-spacing="0.5">SMF G.652D (${b.fiberQty}x LC-LC)</text>

            <!-- 4. OPTICAL REMOTE UNITS (ORU) -->
            <!-- ORU Node 1 (Upper Floor) -->
            <g transform="translate(620, 150)">
                <rect x="0" y="0" width="115" height="58" rx="8" fill="url(#oruGrad)" stroke="#34d399" stroke-width="1.8"/>
                <text x="57" y="18" text-anchor="middle" fill="#ffffff" font-size="10" font-weight="700">ORU #1</text>
                <text x="57" y="33" text-anchor="middle" fill="#d1fae5" font-size="9">${oruName}</text>
                <text x="57" y="48" text-anchor="middle" fill="#6ee7b7" font-size="8.5" font-weight="600">40 dBm (10W DL)</text>
            </g>

            <!-- ORU Node 2 (Middle Floor) -->
            <g transform="translate(620, 235)">
                <rect x="0" y="0" width="115" height="58" rx="8" fill="url(#oruGrad)" stroke="#34d399" stroke-width="1.8"/>
                <text x="57" y="18" text-anchor="middle" fill="#ffffff" font-size="10" font-weight="700">ORU #2</text>
                <text x="57" y="33" text-anchor="middle" fill="#d1fae5" font-size="9">${oruName}</text>
                <text x="57" y="48" text-anchor="middle" fill="#6ee7b7" font-size="8.5" font-weight="600">40 dBm (10W DL)</text>
            </g>

            <!-- ORU Node 3 (Lower Floor) -->
            <g transform="translate(620, 320)">
                <rect x="0" y="0" width="115" height="58" rx="8" fill="url(#oruGrad)" stroke="#34d399" stroke-width="1.8"/>
                <text x="57" y="18" text-anchor="middle" fill="#ffffff" font-size="10" font-weight="700">ORU #3 … #${b.oruQty}</text>
                <text x="57" y="33" text-anchor="middle" fill="#d1fae5" font-size="9">${oruName}</text>
                <text x="57" y="48" text-anchor="middle" fill="#6ee7b7" font-size="8.5" font-weight="600">40 dBm (10W DL)</text>
            </g>

            <!-- Coax Feeders to Floors -->
            <g stroke="#f97316" stroke-width="2" fill="none">
                <line x1="735" y1="180" x2="800" y2="180"/>
                <line x1="735" y1="265" x2="800" y2="265"/>
                <line x1="735" y1="350" x2="800" y2="350"/>
            </g>

            <!-- 5. IN-BUILDING ANTENNA COVERAGE (Floors) -->
            <!-- Floor 3 -->
            <g transform="translate(800, 150)">
                <rect x="0" y="0" width="135" height="58" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
                <text x="67" y="18" text-anchor="middle" fill="#fbbf24" font-size="10" font-weight="700">${fArr[0] ? fArr[0].f : 'FLOOR 3'}</text>
                <text x="67" y="33" text-anchor="middle" fill="#ffffff" font-size="9">${fArr[0] ? fArr[0].q : '35'}x ANTI400R Omni</text>
                <text x="67" y="48" text-anchor="middle" fill="#cbd5e1" font-size="8">Splitters &amp; Couplers</text>
            </g>

            <!-- Floor 2 -->
            <g transform="translate(800, 235)">
                <rect x="0" y="0" width="135" height="58" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
                <text x="67" y="18" text-anchor="middle" fill="#fbbf24" font-size="10" font-weight="700">${fArr[1] ? fArr[1].f : 'FLOOR 2'}</text>
                <text x="67" y="33" text-anchor="middle" fill="#ffffff" font-size="9">${fArr[1] ? fArr[1].q : '35'}x ANTI400R Omni</text>
                <text x="67" y="48" text-anchor="middle" fill="#cbd5e1" font-size="8">Splitters &amp; Couplers</text>
            </g>

            <!-- Floor 1 -->
            <g transform="translate(800, 320)">
                <rect x="0" y="0" width="135" height="58" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
                <text x="67" y="18" text-anchor="middle" fill="#fbbf24" font-size="10" font-weight="700">${fArr[2] ? fArr[2].f : 'FLOOR 1'}</text>
                <text x="67" y="33" text-anchor="middle" fill="#ffffff" font-size="9">${fArr[2] ? fArr[2].q : '30'}x ANTI400R Omni</text>
                <text x="67" y="48" text-anchor="middle" fill="#cbd5e1" font-size="8">Splitters &amp; Couplers</text>
            </g>

            <!-- Bottom Legend & Health Badge -->
            <rect x="25" y="425" width="910" height="42" rx="8" fill="#0f172a" stroke="#33414c" stroke-width="1"/>
            <!-- Legend Items -->
            <circle cx="50" cy="446" r="5" fill="#f97316"/>
            <text x="62" y="450" fill="#94a3b8" font-size="9.5">RF 50Ω Coax Feeder</text>

            <circle cx="215" cy="446" r="5" fill="#06b6d4"/>
            <text x="227" y="450" fill="#94a3b8" font-size="9.5">Optical Fiber Link (SMF)</text>

            <circle cx="400" cy="446" r="5" fill="#10b981"/>
            <text x="412" y="450" fill="#94a3b8" font-size="9.5">Optical Remote Unit (10W)</text>

            <circle cx="595" cy="446" r="5" fill="#f59e0b"/>
            <text x="607" y="450" fill="#94a3b8" font-size="9.5">Indoor Omni Antennas</text>

            <!-- Health Summary Badge -->
            <rect x="760" y="432" width="165" height="28" rx="6" fill="#064e3b" stroke="#10b981" stroke-width="1"/>
            <text x="842" y="450" text-anchor="middle" fill="#34d399" font-size="9.5" font-weight="700">SYSTEM VSWR ≤ 1.5 (PASS)</text>
        </svg>
        `;
        return svg;
    }

    /* =========================================================================
     * 6. HANDOFF TOKEN SERIALIZER & EMBEDDED QR GENERATOR
     * ========================================================================= */
//---------------------------------------------------------------------
//
// QR Code Generator for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//  http://www.opensource.org/licenses/mit-license.php
//
// The word 'QR Code' is registered trademark of
// DENSO WAVE INCORPORATED
//  http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------

var qrcode = function() {

  //---------------------------------------------------------------------
  // qrcode
  //---------------------------------------------------------------------

  /**
   * qrcode
   * @param typeNumber 1 to 40
   * @param errorCorrectionLevel 'L','M','Q','H'
   */
  var qrcode = function(typeNumber, errorCorrectionLevel) {

    var PAD0 = 0xEC;
    var PAD1 = 0x11;

    var _typeNumber = typeNumber;
    var _errorCorrectionLevel = QRErrorCorrectionLevel[errorCorrectionLevel];
    var _modules = null;
    var _moduleCount = 0;
    var _dataCache = null;
    var _dataList = [];

    var _this = {};

    var makeImpl = function(test, maskPattern) {

      _moduleCount = _typeNumber * 4 + 17;
      _modules = function(moduleCount) {
        var modules = new Array(moduleCount);
        for (var row = 0; row < moduleCount; row += 1) {
          modules[row] = new Array(moduleCount);
          for (var col = 0; col < moduleCount; col += 1) {
            modules[row][col] = null;
          }
        }
        return modules;
      }(_moduleCount);

      setupPositionProbePattern(0, 0);
      setupPositionProbePattern(_moduleCount - 7, 0);
      setupPositionProbePattern(0, _moduleCount - 7);
      setupPositionAdjustPattern();
      setupTimingPattern();
      setupTypeInfo(test, maskPattern);

      if (_typeNumber >= 7) {
        setupTypeNumber(test);
      }

      if (_dataCache == null) {
        _dataCache = createData(_typeNumber, _errorCorrectionLevel, _dataList);
      }

      mapData(_dataCache, maskPattern);
    };

    var setupPositionProbePattern = function(row, col) {

      for (var r = -1; r <= 7; r += 1) {

        if (row + r <= -1 || _moduleCount <= row + r) continue;

        for (var c = -1; c <= 7; c += 1) {

          if (col + c <= -1 || _moduleCount <= col + c) continue;

          if ( (0 <= r && r <= 6 && (c == 0 || c == 6) )
              || (0 <= c && c <= 6 && (r == 0 || r == 6) )
              || (2 <= r && r <= 4 && 2 <= c && c <= 4) ) {
            _modules[row + r][col + c] = true;
          } else {
            _modules[row + r][col + c] = false;
          }
        }
      }
    };

    var getBestMaskPattern = function() {

      var minLostPoint = 0;
      var pattern = 0;

      for (var i = 0; i < 8; i += 1) {

        makeImpl(true, i);

        var lostPoint = QRUtil.getLostPoint(_this);

        if (i == 0 || minLostPoint > lostPoint) {
          minLostPoint = lostPoint;
          pattern = i;
        }
      }

      return pattern;
    };

    var setupTimingPattern = function() {

      for (var r = 8; r < _moduleCount - 8; r += 1) {
        if (_modules[r][6] != null) {
          continue;
        }
        _modules[r][6] = (r % 2 == 0);
      }

      for (var c = 8; c < _moduleCount - 8; c += 1) {
        if (_modules[6][c] != null) {
          continue;
        }
        _modules[6][c] = (c % 2 == 0);
      }
    };

    var setupPositionAdjustPattern = function() {

      var pos = QRUtil.getPatternPosition(_typeNumber);

      for (var i = 0; i < pos.length; i += 1) {

        for (var j = 0; j < pos.length; j += 1) {

          var row = pos[i];
          var col = pos[j];

          if (_modules[row][col] != null) {
            continue;
          }

          for (var r = -2; r <= 2; r += 1) {

            for (var c = -2; c <= 2; c += 1) {

              if (r == -2 || r == 2 || c == -2 || c == 2
                  || (r == 0 && c == 0) ) {
                _modules[row + r][col + c] = true;
              } else {
                _modules[row + r][col + c] = false;
              }
            }
          }
        }
      }
    };

    var setupTypeNumber = function(test) {

      var bits = QRUtil.getBCHTypeNumber(_typeNumber);

      for (var i = 0; i < 18; i += 1) {
        var mod = (!test && ( (bits >> i) & 1) == 1);
        _modules[Math.floor(i / 3)][i % 3 + _moduleCount - 8 - 3] = mod;
      }

      for (var i = 0; i < 18; i += 1) {
        var mod = (!test && ( (bits >> i) & 1) == 1);
        _modules[i % 3 + _moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
      }
    };

    var setupTypeInfo = function(test, maskPattern) {

      var data = (_errorCorrectionLevel << 3) | maskPattern;
      var bits = QRUtil.getBCHTypeInfo(data);

      // vertical
      for (var i = 0; i < 15; i += 1) {

        var mod = (!test && ( (bits >> i) & 1) == 1);

        if (i < 6) {
          _modules[i][8] = mod;
        } else if (i < 8) {
          _modules[i + 1][8] = mod;
        } else {
          _modules[_moduleCount - 15 + i][8] = mod;
        }
      }

      // horizontal
      for (var i = 0; i < 15; i += 1) {

        var mod = (!test && ( (bits >> i) & 1) == 1);

        if (i < 8) {
          _modules[8][_moduleCount - i - 1] = mod;
        } else if (i < 9) {
          _modules[8][15 - i - 1 + 1] = mod;
        } else {
          _modules[8][15 - i - 1] = mod;
        }
      }

      // fixed module
      _modules[_moduleCount - 8][8] = (!test);
    };

    var mapData = function(data, maskPattern) {

      var inc = -1;
      var row = _moduleCount - 1;
      var bitIndex = 7;
      var byteIndex = 0;
      var maskFunc = QRUtil.getMaskFunction(maskPattern);

      for (var col = _moduleCount - 1; col > 0; col -= 2) {

        if (col == 6) col -= 1;

        while (true) {

          for (var c = 0; c < 2; c += 1) {

            if (_modules[row][col - c] == null) {

              var dark = false;

              if (byteIndex < data.length) {
                dark = ( ( (data[byteIndex] >>> bitIndex) & 1) == 1);
              }

              var mask = maskFunc(row, col - c);

              if (mask) {
                dark = !dark;
              }

              _modules[row][col - c] = dark;
              bitIndex -= 1;

              if (bitIndex == -1) {
                byteIndex += 1;
                bitIndex = 7;
              }
            }
          }

          row += inc;

          if (row < 0 || _moduleCount <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }
    };

    var createBytes = function(buffer, rsBlocks) {

      var offset = 0;

      var maxDcCount = 0;
      var maxEcCount = 0;

      var dcdata = new Array(rsBlocks.length);
      var ecdata = new Array(rsBlocks.length);

      for (var r = 0; r < rsBlocks.length; r += 1) {

        var dcCount = rsBlocks[r].dataCount;
        var ecCount = rsBlocks[r].totalCount - dcCount;

        maxDcCount = Math.max(maxDcCount, dcCount);
        maxEcCount = Math.max(maxEcCount, ecCount);

        dcdata[r] = new Array(dcCount);

        for (var i = 0; i < dcdata[r].length; i += 1) {
          dcdata[r][i] = 0xff & buffer.getBuffer()[i + offset];
        }
        offset += dcCount;

        var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
        var rawPoly = qrPolynomial(dcdata[r], rsPoly.getLength() - 1);

        var modPoly = rawPoly.mod(rsPoly);
        ecdata[r] = new Array(rsPoly.getLength() - 1);
        for (var i = 0; i < ecdata[r].length; i += 1) {
          var modIndex = i + modPoly.getLength() - ecdata[r].length;
          ecdata[r][i] = (modIndex >= 0)? modPoly.getAt(modIndex) : 0;
        }
      }

      var totalCodeCount = 0;
      for (var i = 0; i < rsBlocks.length; i += 1) {
        totalCodeCount += rsBlocks[i].totalCount;
      }

      var data = new Array(totalCodeCount);
      var index = 0;

      for (var i = 0; i < maxDcCount; i += 1) {
        for (var r = 0; r < rsBlocks.length; r += 1) {
          if (i < dcdata[r].length) {
            data[index] = dcdata[r][i];
            index += 1;
          }
        }
      }

      for (var i = 0; i < maxEcCount; i += 1) {
        for (var r = 0; r < rsBlocks.length; r += 1) {
          if (i < ecdata[r].length) {
            data[index] = ecdata[r][i];
            index += 1;
          }
        }
      }

      return data;
    };

    var createData = function(typeNumber, errorCorrectionLevel, dataList) {

      var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectionLevel);

      var buffer = qrBitBuffer();

      for (var i = 0; i < dataList.length; i += 1) {
        var data = dataList[i];
        buffer.put(data.getMode(), 4);
        buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber) );
        data.write(buffer);
      }

      // calc num max data.
      var totalDataCount = 0;
      for (var i = 0; i < rsBlocks.length; i += 1) {
        totalDataCount += rsBlocks[i].dataCount;
      }

      if (buffer.getLengthInBits() > totalDataCount * 8) {
        throw 'code length overflow. ('
          + buffer.getLengthInBits()
          + '>'
          + totalDataCount * 8
          + ')';
      }

      // end code
      if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
        buffer.put(0, 4);
      }

      // padding
      while (buffer.getLengthInBits() % 8 != 0) {
        buffer.putBit(false);
      }

      // padding
      while (true) {

        if (buffer.getLengthInBits() >= totalDataCount * 8) {
          break;
        }
        buffer.put(PAD0, 8);

        if (buffer.getLengthInBits() >= totalDataCount * 8) {
          break;
        }
        buffer.put(PAD1, 8);
      }

      return createBytes(buffer, rsBlocks);
    };

    _this.addData = function(data, mode) {

      mode = mode || 'Byte';

      var newData = null;

      switch(mode) {
      case 'Numeric' :
        newData = qrNumber(data);
        break;
      case 'Alphanumeric' :
        newData = qrAlphaNum(data);
        break;
      case 'Byte' :
        newData = qr8BitByte(data);
        break;
      case 'Kanji' :
        newData = qrKanji(data);
        break;
      default :
        throw 'mode:' + mode;
      }

      _dataList.push(newData);
      _dataCache = null;
    };

    _this.isDark = function(row, col) {
      if (row < 0 || _moduleCount <= row || col < 0 || _moduleCount <= col) {
        throw row + ',' + col;
      }
      return _modules[row][col];
    };

    _this.getModuleCount = function() {
      return _moduleCount;
    };

    _this.make = function() {
      if (_typeNumber < 1) {
        var typeNumber = 1;

        for (; typeNumber < 40; typeNumber++) {
          var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, _errorCorrectionLevel);
          var buffer = qrBitBuffer();

          for (var i = 0; i < _dataList.length; i++) {
            var data = _dataList[i];
            buffer.put(data.getMode(), 4);
            buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber) );
            data.write(buffer);
          }

          var totalDataCount = 0;
          for (var i = 0; i < rsBlocks.length; i++) {
            totalDataCount += rsBlocks[i].dataCount;
          }

          if (buffer.getLengthInBits() <= totalDataCount * 8) {
            break;
          }
        }

        _typeNumber = typeNumber;
      }

      makeImpl(false, getBestMaskPattern() );
    };

    _this.createTableTag = function(cellSize, margin) {

      cellSize = cellSize || 2;
      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;

      var qrHtml = '';

      qrHtml += '<table style="';
      qrHtml += ' border-width: 0px; border-style: none;';
      qrHtml += ' border-collapse: collapse;';
      qrHtml += ' padding: 0px; margin: ' + margin + 'px;';
      qrHtml += '">';
      qrHtml += '<tbody>';

      for (var r = 0; r < _this.getModuleCount(); r += 1) {

        qrHtml += '<tr>';

        for (var c = 0; c < _this.getModuleCount(); c += 1) {
          qrHtml += '<td style="';
          qrHtml += ' border-width: 0px; border-style: none;';
          qrHtml += ' border-collapse: collapse;';
          qrHtml += ' padding: 0px; margin: 0px;';
          qrHtml += ' width: ' + cellSize + 'px;';
          qrHtml += ' height: ' + cellSize + 'px;';
          qrHtml += ' background-color: ';
          qrHtml += _this.isDark(r, c)? '#000000' : '#ffffff';
          qrHtml += ';';
          qrHtml += '"/>';
        }

        qrHtml += '</tr>';
      }

      qrHtml += '</tbody>';
      qrHtml += '</table>';

      return qrHtml;
    };

    _this.createSvgTag = function(cellSize, margin, alt, title) {

      var opts = {};
      if (typeof arguments[0] == 'object') {
        // Called by options.
        opts = arguments[0];
        // overwrite cellSize and margin.
        cellSize = opts.cellSize;
        margin = opts.margin;
        alt = opts.alt;
        title = opts.title;
      }

      cellSize = cellSize || 2;
      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;

      // Compose alt property surrogate
      alt = (typeof alt === 'string') ? {text: alt} : alt || {};
      alt.text = alt.text || null;
      alt.id = (alt.text) ? alt.id || 'qrcode-description' : null;

      // Compose title property surrogate
      title = (typeof title === 'string') ? {text: title} : title || {};
      title.text = title.text || null;
      title.id = (title.text) ? title.id || 'qrcode-title' : null;

      var size = _this.getModuleCount() * cellSize + margin * 2;
      var c, mc, r, mr, qrSvg='', rect;

      rect = 'l' + cellSize + ',0 0,' + cellSize +
        ' -' + cellSize + ',0 0,-' + cellSize + 'z ';

      qrSvg += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"';
      qrSvg += !opts.scalable ? ' width="' + size + 'px" height="' + size + 'px"' : '';
      qrSvg += ' viewBox="0 0 ' + size + ' ' + size + '" ';
      qrSvg += ' preserveAspectRatio="xMinYMin meet"';
      qrSvg += (title.text || alt.text) ? ' role="img" aria-labelledby="' +
          escapeXml([title.id, alt.id].join(' ').trim() ) + '"' : '';
      qrSvg += '>';
      qrSvg += (title.text) ? '<title id="' + escapeXml(title.id) + '">' +
          escapeXml(title.text) + '</title>' : '';
      qrSvg += (alt.text) ? '<description id="' + escapeXml(alt.id) + '">' +
          escapeXml(alt.text) + '</description>' : '';
      qrSvg += '<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>';
      qrSvg += '<path d="';

      for (r = 0; r < _this.getModuleCount(); r += 1) {
        mr = r * cellSize + margin;
        for (c = 0; c < _this.getModuleCount(); c += 1) {
          if (_this.isDark(r, c) ) {
            mc = c*cellSize+margin;
            qrSvg += 'M' + mc + ',' + mr + rect;
          }
        }
      }

      qrSvg += '" stroke="transparent" fill="black"/>';
      qrSvg += '</svg>';

      return qrSvg;
    };

    _this.createDataURL = function(cellSize, margin) {

      cellSize = cellSize || 2;
      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;

      var size = _this.getModuleCount() * cellSize + margin * 2;
      var min = margin;
      var max = size - margin;

      return createDataURL(size, size, function(x, y) {
        if (min <= x && x < max && min <= y && y < max) {
          var c = Math.floor( (x - min) / cellSize);
          var r = Math.floor( (y - min) / cellSize);
          return _this.isDark(r, c)? 0 : 1;
        } else {
          return 1;
        }
      } );
    };

    _this.createImgTag = function(cellSize, margin, alt) {

      cellSize = cellSize || 2;
      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;

      var size = _this.getModuleCount() * cellSize + margin * 2;

      var img = '';
      img += '<img';
      img += '\u0020src="';
      img += _this.createDataURL(cellSize, margin);
      img += '"';
      img += '\u0020width="';
      img += size;
      img += '"';
      img += '\u0020height="';
      img += size;
      img += '"';
      if (alt) {
        img += '\u0020alt="';
        img += escapeXml(alt);
        img += '"';
      }
      img += '/>';

      return img;
    };

    var escapeXml = function(s) {
      var escaped = '';
      for (var i = 0; i < s.length; i += 1) {
        var c = s.charAt(i);
        switch(c) {
        case '<': escaped += '&lt;'; break;
        case '>': escaped += '&gt;'; break;
        case '&': escaped += '&amp;'; break;
        case '"': escaped += '&quot;'; break;
        default : escaped += c; break;
        }
      }
      return escaped;
    };

    var _createHalfASCII = function(margin) {
      var cellSize = 1;
      margin = (typeof margin == 'undefined')? cellSize * 2 : margin;

      var size = _this.getModuleCount() * cellSize + margin * 2;
      var min = margin;
      var max = size - margin;

      var y, x, r1, r2, p;

      var blocks = {
        '██': '█',
        '█ ': '▀',
        ' █': '▄',
        '  ': ' '
      };

      var blocksLastLineNoMargin = {
        '██': '▀',
        '█ ': '▀',
        ' █': ' ',
        '  ': ' '
      };

      var ascii = '';
      for (y = 0; y < size; y += 2) {
        r1 = Math.floor((y - min) / cellSize);
        r2 = Math.floor((y + 1 - min) / cellSize);
        for (x = 0; x < size; x += 1) {
          p = '█';

          if (min <= x && x < max && min <= y && y < max && _this.isDark(r1, Math.floor((x - min) / cellSize))) {
            p = ' ';
          }

          if (min <= x && x < max && min <= y+1 && y+1 < max && _this.isDark(r2, Math.floor((x - min) / cellSize))) {
            p += ' ';
          }
          else {
            p += '█';
          }

          // Output 2 characters per pixel, to create full square. 1 character per pixels gives only half width of square.
          ascii += (margin < 1 && y+1 >= max) ? blocksLastLineNoMargin[p] : blocks[p];
        }

        ascii += '\n';
      }

      if (size % 2 && margin > 0) {
        return ascii.substring(0, ascii.length - size - 1) + Array(size+1).join('▀');
      }

      return ascii.substring(0, ascii.length-1);
    };

    _this.createASCII = function(cellSize, margin) {
      cellSize = cellSize || 1;

      if (cellSize < 2) {
        return _createHalfASCII(margin);
      }

      cellSize -= 1;
      margin = (typeof margin == 'undefined')? cellSize * 2 : margin;

      var size = _this.getModuleCount() * cellSize + margin * 2;
      var min = margin;
      var max = size - margin;

      var y, x, r, p;

      var white = Array(cellSize+1).join('██');
      var black = Array(cellSize+1).join('  ');

      var ascii = '';
      var line = '';
      for (y = 0; y < size; y += 1) {
        r = Math.floor( (y - min) / cellSize);
        line = '';
        for (x = 0; x < size; x += 1) {
          p = 1;

          if (min <= x && x < max && min <= y && y < max && _this.isDark(r, Math.floor((x - min) / cellSize))) {
            p = 0;
          }

          // Output 2 characters per pixel, to create full square. 1 character per pixels gives only half width of square.
          line += p ? white : black;
        }

        for (r = 0; r < cellSize; r += 1) {
          ascii += line + '\n';
        }
      }

      return ascii.substring(0, ascii.length-1);
    };

    _this.renderTo2dContext = function(context, cellSize) {
      cellSize = cellSize || 2;
      var length = _this.getModuleCount();
      for (var row = 0; row < length; row++) {
        for (var col = 0; col < length; col++) {
          context.fillStyle = _this.isDark(row, col) ? 'black' : 'white';
          context.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
      }
    }

    return _this;
  };

  //---------------------------------------------------------------------
  // qrcode.stringToBytes
  //---------------------------------------------------------------------

  qrcode.stringToBytesFuncs = {
    'default' : function(s) {
      var bytes = [];
      for (var i = 0; i < s.length; i += 1) {
        var c = s.charCodeAt(i);
        bytes.push(c & 0xff);
      }
      return bytes;
    }
  };

  qrcode.stringToBytes = qrcode.stringToBytesFuncs['default'];

  //---------------------------------------------------------------------
  // qrcode.createStringToBytes
  //---------------------------------------------------------------------

  /**
   * @param unicodeData base64 string of byte array.
   * [16bit Unicode],[16bit Bytes], ...
   * @param numChars
   */
  qrcode.createStringToBytes = function(unicodeData, numChars) {

    // create conversion map.

    var unicodeMap = function() {

      var bin = base64DecodeInputStream(unicodeData);
      var read = function() {
        var b = bin.read();
        if (b == -1) throw 'eof';
        return b;
      };

      var count = 0;
      var unicodeMap = {};
      while (true) {
        var b0 = bin.read();
        if (b0 == -1) break;
        var b1 = read();
        var b2 = read();
        var b3 = read();
        var k = String.fromCharCode( (b0 << 8) | b1);
        var v = (b2 << 8) | b3;
        unicodeMap[k] = v;
        count += 1;
      }
      if (count != numChars) {
        throw count + ' != ' + numChars;
      }

      return unicodeMap;
    }();

    var unknownChar = '?'.charCodeAt(0);

    return function(s) {
      var bytes = [];
      for (var i = 0; i < s.length; i += 1) {
        var c = s.charCodeAt(i);
        if (c < 128) {
          bytes.push(c);
        } else {
          var b = unicodeMap[s.charAt(i)];
          if (typeof b == 'number') {
            if ( (b & 0xff) == b) {
              // 1byte
              bytes.push(b);
            } else {
              // 2bytes
              bytes.push(b >>> 8);
              bytes.push(b & 0xff);
            }
          } else {
            bytes.push(unknownChar);
          }
        }
      }
      return bytes;
    };
  };

  //---------------------------------------------------------------------
  // QRMode
  //---------------------------------------------------------------------

  var QRMode = {
    MODE_NUMBER :    1 << 0,
    MODE_ALPHA_NUM : 1 << 1,
    MODE_8BIT_BYTE : 1 << 2,
    MODE_KANJI :     1 << 3
  };

  //---------------------------------------------------------------------
  // QRErrorCorrectionLevel
  //---------------------------------------------------------------------

  var QRErrorCorrectionLevel = {
    L : 1,
    M : 0,
    Q : 3,
    H : 2
  };

  //---------------------------------------------------------------------
  // QRMaskPattern
  //---------------------------------------------------------------------

  var QRMaskPattern = {
    PATTERN000 : 0,
    PATTERN001 : 1,
    PATTERN010 : 2,
    PATTERN011 : 3,
    PATTERN100 : 4,
    PATTERN101 : 5,
    PATTERN110 : 6,
    PATTERN111 : 7
  };

  //---------------------------------------------------------------------
  // QRUtil
  //---------------------------------------------------------------------

  var QRUtil = function() {

    var PATTERN_POSITION_TABLE = [
      [],
      [6, 18],
      [6, 22],
      [6, 26],
      [6, 30],
      [6, 34],
      [6, 22, 38],
      [6, 24, 42],
      [6, 26, 46],
      [6, 28, 50],
      [6, 30, 54],
      [6, 32, 58],
      [6, 34, 62],
      [6, 26, 46, 66],
      [6, 26, 48, 70],
      [6, 26, 50, 74],
      [6, 30, 54, 78],
      [6, 30, 56, 82],
      [6, 30, 58, 86],
      [6, 34, 62, 90],
      [6, 28, 50, 72, 94],
      [6, 26, 50, 74, 98],
      [6, 30, 54, 78, 102],
      [6, 28, 54, 80, 106],
      [6, 32, 58, 84, 110],
      [6, 30, 58, 86, 114],
      [6, 34, 62, 90, 118],
      [6, 26, 50, 74, 98, 122],
      [6, 30, 54, 78, 102, 126],
      [6, 26, 52, 78, 104, 130],
      [6, 30, 56, 82, 108, 134],
      [6, 34, 60, 86, 112, 138],
      [6, 30, 58, 86, 114, 142],
      [6, 34, 62, 90, 118, 146],
      [6, 30, 54, 78, 102, 126, 150],
      [6, 24, 50, 76, 102, 128, 154],
      [6, 28, 54, 80, 106, 132, 158],
      [6, 32, 58, 84, 110, 136, 162],
      [6, 26, 54, 82, 110, 138, 166],
      [6, 30, 58, 86, 114, 142, 170]
    ];
    var G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0);
    var G18 = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0);
    var G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1);

    var _this = {};

    var getBCHDigit = function(data) {
      var digit = 0;
      while (data != 0) {
        digit += 1;
        data >>>= 1;
      }
      return digit;
    };

    _this.getBCHTypeInfo = function(data) {
      var d = data << 10;
      while (getBCHDigit(d) - getBCHDigit(G15) >= 0) {
        d ^= (G15 << (getBCHDigit(d) - getBCHDigit(G15) ) );
      }
      return ( (data << 10) | d) ^ G15_MASK;
    };

    _this.getBCHTypeNumber = function(data) {
      var d = data << 12;
      while (getBCHDigit(d) - getBCHDigit(G18) >= 0) {
        d ^= (G18 << (getBCHDigit(d) - getBCHDigit(G18) ) );
      }
      return (data << 12) | d;
    };

    _this.getPatternPosition = function(typeNumber) {
      return PATTERN_POSITION_TABLE[typeNumber - 1];
    };

    _this.getMaskFunction = function(maskPattern) {

      switch (maskPattern) {

      case QRMaskPattern.PATTERN000 :
        return function(i, j) { return (i + j) % 2 == 0; };
      case QRMaskPattern.PATTERN001 :
        return function(i, j) { return i % 2 == 0; };
      case QRMaskPattern.PATTERN010 :
        return function(i, j) { return j % 3 == 0; };
      case QRMaskPattern.PATTERN011 :
        return function(i, j) { return (i + j) % 3 == 0; };
      case QRMaskPattern.PATTERN100 :
        return function(i, j) { return (Math.floor(i / 2) + Math.floor(j / 3) ) % 2 == 0; };
      case QRMaskPattern.PATTERN101 :
        return function(i, j) { return (i * j) % 2 + (i * j) % 3 == 0; };
      case QRMaskPattern.PATTERN110 :
        return function(i, j) { return ( (i * j) % 2 + (i * j) % 3) % 2 == 0; };
      case QRMaskPattern.PATTERN111 :
        return function(i, j) { return ( (i * j) % 3 + (i + j) % 2) % 2 == 0; };

      default :
        throw 'bad maskPattern:' + maskPattern;
      }
    };

    _this.getErrorCorrectPolynomial = function(errorCorrectLength) {
      var a = qrPolynomial([1], 0);
      for (var i = 0; i < errorCorrectLength; i += 1) {
        a = a.multiply(qrPolynomial([1, QRMath.gexp(i)], 0) );
      }
      return a;
    };

    _this.getLengthInBits = function(mode, type) {

      if (1 <= type && type < 10) {

        // 1 - 9

        switch(mode) {
        case QRMode.MODE_NUMBER    : return 10;
        case QRMode.MODE_ALPHA_NUM : return 9;
        case QRMode.MODE_8BIT_BYTE : return 8;
        case QRMode.MODE_KANJI     : return 8;
        default :
          throw 'mode:' + mode;
        }

      } else if (type < 27) {

        // 10 - 26

        switch(mode) {
        case QRMode.MODE_NUMBER    : return 12;
        case QRMode.MODE_ALPHA_NUM : return 11;
        case QRMode.MODE_8BIT_BYTE : return 16;
        case QRMode.MODE_KANJI     : return 10;
        default :
          throw 'mode:' + mode;
        }

      } else if (type < 41) {

        // 27 - 40

        switch(mode) {
        case QRMode.MODE_NUMBER    : return 14;
        case QRMode.MODE_ALPHA_NUM : return 13;
        case QRMode.MODE_8BIT_BYTE : return 16;
        case QRMode.MODE_KANJI     : return 12;
        default :
          throw 'mode:' + mode;
        }

      } else {
        throw 'type:' + type;
      }
    };

    _this.getLostPoint = function(qrcode) {

      var moduleCount = qrcode.getModuleCount();

      var lostPoint = 0;

      // LEVEL1

      for (var row = 0; row < moduleCount; row += 1) {
        for (var col = 0; col < moduleCount; col += 1) {

          var sameCount = 0;
          var dark = qrcode.isDark(row, col);

          for (var r = -1; r <= 1; r += 1) {

            if (row + r < 0 || moduleCount <= row + r) {
              continue;
            }

            for (var c = -1; c <= 1; c += 1) {

              if (col + c < 0 || moduleCount <= col + c) {
                continue;
              }

              if (r == 0 && c == 0) {
                continue;
              }

              if (dark == qrcode.isDark(row + r, col + c) ) {
                sameCount += 1;
              }
            }
          }

          if (sameCount > 5) {
            lostPoint += (3 + sameCount - 5);
          }
        }
      };

      // LEVEL2

      for (var row = 0; row < moduleCount - 1; row += 1) {
        for (var col = 0; col < moduleCount - 1; col += 1) {
          var count = 0;
          if (qrcode.isDark(row, col) ) count += 1;
          if (qrcode.isDark(row + 1, col) ) count += 1;
          if (qrcode.isDark(row, col + 1) ) count += 1;
          if (qrcode.isDark(row + 1, col + 1) ) count += 1;
          if (count == 0 || count == 4) {
            lostPoint += 3;
          }
        }
      }

      // LEVEL3

      for (var row = 0; row < moduleCount; row += 1) {
        for (var col = 0; col < moduleCount - 6; col += 1) {
          if (qrcode.isDark(row, col)
              && !qrcode.isDark(row, col + 1)
              &&  qrcode.isDark(row, col + 2)
              &&  qrcode.isDark(row, col + 3)
              &&  qrcode.isDark(row, col + 4)
              && !qrcode.isDark(row, col + 5)
              &&  qrcode.isDark(row, col + 6) ) {
            lostPoint += 40;
          }
        }
      }

      for (var col = 0; col < moduleCount; col += 1) {
        for (var row = 0; row < moduleCount - 6; row += 1) {
          if (qrcode.isDark(row, col)
              && !qrcode.isDark(row + 1, col)
              &&  qrcode.isDark(row + 2, col)
              &&  qrcode.isDark(row + 3, col)
              &&  qrcode.isDark(row + 4, col)
              && !qrcode.isDark(row + 5, col)
              &&  qrcode.isDark(row + 6, col) ) {
            lostPoint += 40;
          }
        }
      }

      // LEVEL4

      var darkCount = 0;

      for (var col = 0; col < moduleCount; col += 1) {
        for (var row = 0; row < moduleCount; row += 1) {
          if (qrcode.isDark(row, col) ) {
            darkCount += 1;
          }
        }
      }

      var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
      lostPoint += ratio * 10;

      return lostPoint;
    };

    return _this;
  }();

  //---------------------------------------------------------------------
  // QRMath
  //---------------------------------------------------------------------

  var QRMath = function() {

    var EXP_TABLE = new Array(256);
    var LOG_TABLE = new Array(256);

    // initialize tables
    for (var i = 0; i < 8; i += 1) {
      EXP_TABLE[i] = 1 << i;
    }
    for (var i = 8; i < 256; i += 1) {
      EXP_TABLE[i] = EXP_TABLE[i - 4]
        ^ EXP_TABLE[i - 5]
        ^ EXP_TABLE[i - 6]
        ^ EXP_TABLE[i - 8];
    }
    for (var i = 0; i < 255; i += 1) {
      LOG_TABLE[EXP_TABLE[i] ] = i;
    }

    var _this = {};

    _this.glog = function(n) {

      if (n < 1) {
        throw 'glog(' + n + ')';
      }

      return LOG_TABLE[n];
    };

    _this.gexp = function(n) {

      while (n < 0) {
        n += 255;
      }

      while (n >= 256) {
        n -= 255;
      }

      return EXP_TABLE[n];
    };

    return _this;
  }();

  //---------------------------------------------------------------------
  // qrPolynomial
  //---------------------------------------------------------------------

  function qrPolynomial(num, shift) {

    if (typeof num.length == 'undefined') {
      throw num.length + '/' + shift;
    }

    var _num = function() {
      var offset = 0;
      while (offset < num.length && num[offset] == 0) {
        offset += 1;
      }
      var _num = new Array(num.length - offset + shift);
      for (var i = 0; i < num.length - offset; i += 1) {
        _num[i] = num[i + offset];
      }
      return _num;
    }();

    var _this = {};

    _this.getAt = function(index) {
      return _num[index];
    };

    _this.getLength = function() {
      return _num.length;
    };

    _this.multiply = function(e) {

      var num = new Array(_this.getLength() + e.getLength() - 1);

      for (var i = 0; i < _this.getLength(); i += 1) {
        for (var j = 0; j < e.getLength(); j += 1) {
          num[i + j] ^= QRMath.gexp(QRMath.glog(_this.getAt(i) ) + QRMath.glog(e.getAt(j) ) );
        }
      }

      return qrPolynomial(num, 0);
    };

    _this.mod = function(e) {

      if (_this.getLength() - e.getLength() < 0) {
        return _this;
      }

      var ratio = QRMath.glog(_this.getAt(0) ) - QRMath.glog(e.getAt(0) );

      var num = new Array(_this.getLength() );
      for (var i = 0; i < _this.getLength(); i += 1) {
        num[i] = _this.getAt(i);
      }

      for (var i = 0; i < e.getLength(); i += 1) {
        num[i] ^= QRMath.gexp(QRMath.glog(e.getAt(i) ) + ratio);
      }

      // recursive call
      return qrPolynomial(num, 0).mod(e);
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // QRRSBlock
  //---------------------------------------------------------------------

  var QRRSBlock = function() {

    var RS_BLOCK_TABLE = [

      // L
      // M
      // Q
      // H

      // 1
      [1, 26, 19],
      [1, 26, 16],
      [1, 26, 13],
      [1, 26, 9],

      // 2
      [1, 44, 34],
      [1, 44, 28],
      [1, 44, 22],
      [1, 44, 16],

      // 3
      [1, 70, 55],
      [1, 70, 44],
      [2, 35, 17],
      [2, 35, 13],

      // 4
      [1, 100, 80],
      [2, 50, 32],
      [2, 50, 24],
      [4, 25, 9],

      // 5
      [1, 134, 108],
      [2, 67, 43],
      [2, 33, 15, 2, 34, 16],
      [2, 33, 11, 2, 34, 12],

      // 6
      [2, 86, 68],
      [4, 43, 27],
      [4, 43, 19],
      [4, 43, 15],

      // 7
      [2, 98, 78],
      [4, 49, 31],
      [2, 32, 14, 4, 33, 15],
      [4, 39, 13, 1, 40, 14],

      // 8
      [2, 121, 97],
      [2, 60, 38, 2, 61, 39],
      [4, 40, 18, 2, 41, 19],
      [4, 40, 14, 2, 41, 15],

      // 9
      [2, 146, 116],
      [3, 58, 36, 2, 59, 37],
      [4, 36, 16, 4, 37, 17],
      [4, 36, 12, 4, 37, 13],

      // 10
      [2, 86, 68, 2, 87, 69],
      [4, 69, 43, 1, 70, 44],
      [6, 43, 19, 2, 44, 20],
      [6, 43, 15, 2, 44, 16],

      // 11
      [4, 101, 81],
      [1, 80, 50, 4, 81, 51],
      [4, 50, 22, 4, 51, 23],
      [3, 36, 12, 8, 37, 13],

      // 12
      [2, 116, 92, 2, 117, 93],
      [6, 58, 36, 2, 59, 37],
      [4, 46, 20, 6, 47, 21],
      [7, 42, 14, 4, 43, 15],

      // 13
      [4, 133, 107],
      [8, 59, 37, 1, 60, 38],
      [8, 44, 20, 4, 45, 21],
      [12, 33, 11, 4, 34, 12],

      // 14
      [3, 145, 115, 1, 146, 116],
      [4, 64, 40, 5, 65, 41],
      [11, 36, 16, 5, 37, 17],
      [11, 36, 12, 5, 37, 13],

      // 15
      [5, 109, 87, 1, 110, 88],
      [5, 65, 41, 5, 66, 42],
      [5, 54, 24, 7, 55, 25],
      [11, 36, 12, 7, 37, 13],

      // 16
      [5, 122, 98, 1, 123, 99],
      [7, 73, 45, 3, 74, 46],
      [15, 43, 19, 2, 44, 20],
      [3, 45, 15, 13, 46, 16],

      // 17
      [1, 135, 107, 5, 136, 108],
      [10, 74, 46, 1, 75, 47],
      [1, 50, 22, 15, 51, 23],
      [2, 42, 14, 17, 43, 15],

      // 18
      [5, 150, 120, 1, 151, 121],
      [9, 69, 43, 4, 70, 44],
      [17, 50, 22, 1, 51, 23],
      [2, 42, 14, 19, 43, 15],

      // 19
      [3, 141, 113, 4, 142, 114],
      [3, 70, 44, 11, 71, 45],
      [17, 47, 21, 4, 48, 22],
      [9, 39, 13, 16, 40, 14],

      // 20
      [3, 135, 107, 5, 136, 108],
      [3, 67, 41, 13, 68, 42],
      [15, 54, 24, 5, 55, 25],
      [15, 43, 15, 10, 44, 16],

      // 21
      [4, 144, 116, 4, 145, 117],
      [17, 68, 42],
      [17, 50, 22, 6, 51, 23],
      [19, 46, 16, 6, 47, 17],

      // 22
      [2, 139, 111, 7, 140, 112],
      [17, 74, 46],
      [7, 54, 24, 16, 55, 25],
      [34, 37, 13],

      // 23
      [4, 151, 121, 5, 152, 122],
      [4, 75, 47, 14, 76, 48],
      [11, 54, 24, 14, 55, 25],
      [16, 45, 15, 14, 46, 16],

      // 24
      [6, 147, 117, 4, 148, 118],
      [6, 73, 45, 14, 74, 46],
      [11, 54, 24, 16, 55, 25],
      [30, 46, 16, 2, 47, 17],

      // 25
      [8, 132, 106, 4, 133, 107],
      [8, 75, 47, 13, 76, 48],
      [7, 54, 24, 22, 55, 25],
      [22, 45, 15, 13, 46, 16],

      // 26
      [10, 142, 114, 2, 143, 115],
      [19, 74, 46, 4, 75, 47],
      [28, 50, 22, 6, 51, 23],
      [33, 46, 16, 4, 47, 17],

      // 27
      [8, 152, 122, 4, 153, 123],
      [22, 73, 45, 3, 74, 46],
      [8, 53, 23, 26, 54, 24],
      [12, 45, 15, 28, 46, 16],

      // 28
      [3, 147, 117, 10, 148, 118],
      [3, 73, 45, 23, 74, 46],
      [4, 54, 24, 31, 55, 25],
      [11, 45, 15, 31, 46, 16],

      // 29
      [7, 146, 116, 7, 147, 117],
      [21, 73, 45, 7, 74, 46],
      [1, 53, 23, 37, 54, 24],
      [19, 45, 15, 26, 46, 16],

      // 30
      [5, 145, 115, 10, 146, 116],
      [19, 75, 47, 10, 76, 48],
      [15, 54, 24, 25, 55, 25],
      [23, 45, 15, 25, 46, 16],

      // 31
      [13, 145, 115, 3, 146, 116],
      [2, 74, 46, 29, 75, 47],
      [42, 54, 24, 1, 55, 25],
      [23, 45, 15, 28, 46, 16],

      // 32
      [17, 145, 115],
      [10, 74, 46, 23, 75, 47],
      [10, 54, 24, 35, 55, 25],
      [19, 45, 15, 35, 46, 16],

      // 33
      [17, 145, 115, 1, 146, 116],
      [14, 74, 46, 21, 75, 47],
      [29, 54, 24, 19, 55, 25],
      [11, 45, 15, 46, 46, 16],

      // 34
      [13, 145, 115, 6, 146, 116],
      [14, 74, 46, 23, 75, 47],
      [44, 54, 24, 7, 55, 25],
      [59, 46, 16, 1, 47, 17],

      // 35
      [12, 151, 121, 7, 152, 122],
      [12, 75, 47, 26, 76, 48],
      [39, 54, 24, 14, 55, 25],
      [22, 45, 15, 41, 46, 16],

      // 36
      [6, 151, 121, 14, 152, 122],
      [6, 75, 47, 34, 76, 48],
      [46, 54, 24, 10, 55, 25],
      [2, 45, 15, 64, 46, 16],

      // 37
      [17, 152, 122, 4, 153, 123],
      [29, 74, 46, 14, 75, 47],
      [49, 54, 24, 10, 55, 25],
      [24, 45, 15, 46, 46, 16],

      // 38
      [4, 152, 122, 18, 153, 123],
      [13, 74, 46, 32, 75, 47],
      [48, 54, 24, 14, 55, 25],
      [42, 45, 15, 32, 46, 16],

      // 39
      [20, 147, 117, 4, 148, 118],
      [40, 75, 47, 7, 76, 48],
      [43, 54, 24, 22, 55, 25],
      [10, 45, 15, 67, 46, 16],

      // 40
      [19, 148, 118, 6, 149, 119],
      [18, 75, 47, 31, 76, 48],
      [34, 54, 24, 34, 55, 25],
      [20, 45, 15, 61, 46, 16]
    ];

    var qrRSBlock = function(totalCount, dataCount) {
      var _this = {};
      _this.totalCount = totalCount;
      _this.dataCount = dataCount;
      return _this;
    };

    var _this = {};

    var getRsBlockTable = function(typeNumber, errorCorrectionLevel) {

      switch(errorCorrectionLevel) {
      case QRErrorCorrectionLevel.L :
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
      case QRErrorCorrectionLevel.M :
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
      case QRErrorCorrectionLevel.Q :
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
      case QRErrorCorrectionLevel.H :
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
      default :
        return undefined;
      }
    };

    _this.getRSBlocks = function(typeNumber, errorCorrectionLevel) {

      var rsBlock = getRsBlockTable(typeNumber, errorCorrectionLevel);

      if (typeof rsBlock == 'undefined') {
        throw 'bad rs block @ typeNumber:' + typeNumber +
            '/errorCorrectionLevel:' + errorCorrectionLevel;
      }

      var length = rsBlock.length / 3;

      var list = [];

      for (var i = 0; i < length; i += 1) {

        var count = rsBlock[i * 3 + 0];
        var totalCount = rsBlock[i * 3 + 1];
        var dataCount = rsBlock[i * 3 + 2];

        for (var j = 0; j < count; j += 1) {
          list.push(qrRSBlock(totalCount, dataCount) );
        }
      }

      return list;
    };

    return _this;
  }();

  //---------------------------------------------------------------------
  // qrBitBuffer
  //---------------------------------------------------------------------

  var qrBitBuffer = function() {

    var _buffer = [];
    var _length = 0;

    var _this = {};

    _this.getBuffer = function() {
      return _buffer;
    };

    _this.getAt = function(index) {
      var bufIndex = Math.floor(index / 8);
      return ( (_buffer[bufIndex] >>> (7 - index % 8) ) & 1) == 1;
    };

    _this.put = function(num, length) {
      for (var i = 0; i < length; i += 1) {
        _this.putBit( ( (num >>> (length - i - 1) ) & 1) == 1);
      }
    };

    _this.getLengthInBits = function() {
      return _length;
    };

    _this.putBit = function(bit) {

      var bufIndex = Math.floor(_length / 8);
      if (_buffer.length <= bufIndex) {
        _buffer.push(0);
      }

      if (bit) {
        _buffer[bufIndex] |= (0x80 >>> (_length % 8) );
      }

      _length += 1;
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // qrNumber
  //---------------------------------------------------------------------

  var qrNumber = function(data) {

    var _mode = QRMode.MODE_NUMBER;
    var _data = data;

    var _this = {};

    _this.getMode = function() {
      return _mode;
    };

    _this.getLength = function(buffer) {
      return _data.length;
    };

    _this.write = function(buffer) {

      var data = _data;

      var i = 0;

      while (i + 2 < data.length) {
        buffer.put(strToNum(data.substring(i, i + 3) ), 10);
        i += 3;
      }

      if (i < data.length) {
        if (data.length - i == 1) {
          buffer.put(strToNum(data.substring(i, i + 1) ), 4);
        } else if (data.length - i == 2) {
          buffer.put(strToNum(data.substring(i, i + 2) ), 7);
        }
      }
    };

    var strToNum = function(s) {
      var num = 0;
      for (var i = 0; i < s.length; i += 1) {
        num = num * 10 + chatToNum(s.charAt(i) );
      }
      return num;
    };

    var chatToNum = function(c) {
      if ('0' <= c && c <= '9') {
        return c.charCodeAt(0) - '0'.charCodeAt(0);
      }
      throw 'illegal char :' + c;
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // qrAlphaNum
  //---------------------------------------------------------------------

  var qrAlphaNum = function(data) {

    var _mode = QRMode.MODE_ALPHA_NUM;
    var _data = data;

    var _this = {};

    _this.getMode = function() {
      return _mode;
    };

    _this.getLength = function(buffer) {
      return _data.length;
    };

    _this.write = function(buffer) {

      var s = _data;

      var i = 0;

      while (i + 1 < s.length) {
        buffer.put(
          getCode(s.charAt(i) ) * 45 +
          getCode(s.charAt(i + 1) ), 11);
        i += 2;
      }

      if (i < s.length) {
        buffer.put(getCode(s.charAt(i) ), 6);
      }
    };

    var getCode = function(c) {

      if ('0' <= c && c <= '9') {
        return c.charCodeAt(0) - '0'.charCodeAt(0);
      } else if ('A' <= c && c <= 'Z') {
        return c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
      } else {
        switch (c) {
        case ' ' : return 36;
        case '$' : return 37;
        case '%' : return 38;
        case '*' : return 39;
        case '+' : return 40;
        case '-' : return 41;
        case '.' : return 42;
        case '/' : return 43;
        case ':' : return 44;
        default :
          throw 'illegal char :' + c;
        }
      }
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // qr8BitByte
  //---------------------------------------------------------------------

  var qr8BitByte = function(data) {

    var _mode = QRMode.MODE_8BIT_BYTE;
    var _data = data;
    var _bytes = qrcode.stringToBytes(data);

    var _this = {};

    _this.getMode = function() {
      return _mode;
    };

    _this.getLength = function(buffer) {
      return _bytes.length;
    };

    _this.write = function(buffer) {
      for (var i = 0; i < _bytes.length; i += 1) {
        buffer.put(_bytes[i], 8);
      }
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // qrKanji
  //---------------------------------------------------------------------

  var qrKanji = function(data) {

    var _mode = QRMode.MODE_KANJI;
    var _data = data;

    var stringToBytes = qrcode.stringToBytesFuncs['SJIS'];
    if (!stringToBytes) {
      throw 'sjis not supported.';
    }
    !function(c, code) {
      // self test for sjis support.
      var test = stringToBytes(c);
      if (test.length != 2 || ( (test[0] << 8) | test[1]) != code) {
        throw 'sjis not supported.';
      }
    }('\u53cb', 0x9746);

    var _bytes = stringToBytes(data);

    var _this = {};

    _this.getMode = function() {
      return _mode;
    };

    _this.getLength = function(buffer) {
      return ~~(_bytes.length / 2);
    };

    _this.write = function(buffer) {

      var data = _bytes;

      var i = 0;

      while (i + 1 < data.length) {

        var c = ( (0xff & data[i]) << 8) | (0xff & data[i + 1]);

        if (0x8140 <= c && c <= 0x9FFC) {
          c -= 0x8140;
        } else if (0xE040 <= c && c <= 0xEBBF) {
          c -= 0xC140;
        } else {
          throw 'illegal char at ' + (i + 1) + '/' + c;
        }

        c = ( (c >>> 8) & 0xff) * 0xC0 + (c & 0xff);

        buffer.put(c, 13);

        i += 2;
      }

      if (i < data.length) {
        throw 'illegal char at ' + (i + 1);
      }
    };

    return _this;
  };

  //=====================================================================
  // GIF Support etc.
  //

  //---------------------------------------------------------------------
  // byteArrayOutputStream
  //---------------------------------------------------------------------

  var byteArrayOutputStream = function() {

    var _bytes = [];

    var _this = {};

    _this.writeByte = function(b) {
      _bytes.push(b & 0xff);
    };

    _this.writeShort = function(i) {
      _this.writeByte(i);
      _this.writeByte(i >>> 8);
    };

    _this.writeBytes = function(b, off, len) {
      off = off || 0;
      len = len || b.length;
      for (var i = 0; i < len; i += 1) {
        _this.writeByte(b[i + off]);
      }
    };

    _this.writeString = function(s) {
      for (var i = 0; i < s.length; i += 1) {
        _this.writeByte(s.charCodeAt(i) );
      }
    };

    _this.toByteArray = function() {
      return _bytes;
    };

    _this.toString = function() {
      var s = '';
      s += '[';
      for (var i = 0; i < _bytes.length; i += 1) {
        if (i > 0) {
          s += ',';
        }
        s += _bytes[i];
      }
      s += ']';
      return s;
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // base64EncodeOutputStream
  //---------------------------------------------------------------------

  var base64EncodeOutputStream = function() {

    var _buffer = 0;
    var _buflen = 0;
    var _length = 0;
    var _base64 = '';

    var _this = {};

    var writeEncoded = function(b) {
      _base64 += String.fromCharCode(encode(b & 0x3f) );
    };

    var encode = function(n) {
      if (n < 0) {
        // error.
      } else if (n < 26) {
        return 0x41 + n;
      } else if (n < 52) {
        return 0x61 + (n - 26);
      } else if (n < 62) {
        return 0x30 + (n - 52);
      } else if (n == 62) {
        return 0x2b;
      } else if (n == 63) {
        return 0x2f;
      }
      throw 'n:' + n;
    };

    _this.writeByte = function(n) {

      _buffer = (_buffer << 8) | (n & 0xff);
      _buflen += 8;
      _length += 1;

      while (_buflen >= 6) {
        writeEncoded(_buffer >>> (_buflen - 6) );
        _buflen -= 6;
      }
    };

    _this.flush = function() {

      if (_buflen > 0) {
        writeEncoded(_buffer << (6 - _buflen) );
        _buffer = 0;
        _buflen = 0;
      }

      if (_length % 3 != 0) {
        // padding
        var padlen = 3 - _length % 3;
        for (var i = 0; i < padlen; i += 1) {
          _base64 += '=';
        }
      }
    };

    _this.toString = function() {
      return _base64;
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // base64DecodeInputStream
  //---------------------------------------------------------------------

  var base64DecodeInputStream = function(str) {

    var _str = str;
    var _pos = 0;
    var _buffer = 0;
    var _buflen = 0;

    var _this = {};

    _this.read = function() {

      while (_buflen < 8) {

        if (_pos >= _str.length) {
          if (_buflen == 0) {
            return -1;
          }
          throw 'unexpected end of file./' + _buflen;
        }

        var c = _str.charAt(_pos);
        _pos += 1;

        if (c == '=') {
          _buflen = 0;
          return -1;
        } else if (c.match(/^\s$/) ) {
          // ignore if whitespace.
          continue;
        }

        _buffer = (_buffer << 6) | decode(c.charCodeAt(0) );
        _buflen += 6;
      }

      var n = (_buffer >>> (_buflen - 8) ) & 0xff;
      _buflen -= 8;
      return n;
    };

    var decode = function(c) {
      if (0x41 <= c && c <= 0x5a) {
        return c - 0x41;
      } else if (0x61 <= c && c <= 0x7a) {
        return c - 0x61 + 26;
      } else if (0x30 <= c && c <= 0x39) {
        return c - 0x30 + 52;
      } else if (c == 0x2b) {
        return 62;
      } else if (c == 0x2f) {
        return 63;
      } else {
        throw 'c:' + c;
      }
    };

    return _this;
  };

  //---------------------------------------------------------------------
  // gifImage (B/W)
  //---------------------------------------------------------------------

  var gifImage = function(width, height) {

    var _width = width;
    var _height = height;
    var _data = new Array(width * height);

    var _this = {};

    _this.setPixel = function(x, y, pixel) {
      _data[y * _width + x] = pixel;
    };

    _this.write = function(out) {

      //---------------------------------
      // GIF Signature

      out.writeString('GIF87a');

      //---------------------------------
      // Screen Descriptor

      out.writeShort(_width);
      out.writeShort(_height);

      out.writeByte(0x80); // 2bit
      out.writeByte(0);
      out.writeByte(0);

      //---------------------------------
      // Global Color Map

      // black
      out.writeByte(0x00);
      out.writeByte(0x00);
      out.writeByte(0x00);

      // white
      out.writeByte(0xff);
      out.writeByte(0xff);
      out.writeByte(0xff);

      //---------------------------------
      // Image Descriptor

      out.writeString(',');
      out.writeShort(0);
      out.writeShort(0);
      out.writeShort(_width);
      out.writeShort(_height);
      out.writeByte(0);

      //---------------------------------
      // Local Color Map

      //---------------------------------
      // Raster Data

      var lzwMinCodeSize = 2;
      var raster = getLZWRaster(lzwMinCodeSize);

      out.writeByte(lzwMinCodeSize);

      var offset = 0;

      while (raster.length - offset > 255) {
        out.writeByte(255);
        out.writeBytes(raster, offset, 255);
        offset += 255;
      }

      out.writeByte(raster.length - offset);
      out.writeBytes(raster, offset, raster.length - offset);
      out.writeByte(0x00);

      //---------------------------------
      // GIF Terminator
      out.writeString(';');
    };

    var bitOutputStream = function(out) {

      var _out = out;
      var _bitLength = 0;
      var _bitBuffer = 0;

      var _this = {};

      _this.write = function(data, length) {

        if ( (data >>> length) != 0) {
          throw 'length over';
        }

        while (_bitLength + length >= 8) {
          _out.writeByte(0xff & ( (data << _bitLength) | _bitBuffer) );
          length -= (8 - _bitLength);
          data >>>= (8 - _bitLength);
          _bitBuffer = 0;
          _bitLength = 0;
        }

        _bitBuffer = (data << _bitLength) | _bitBuffer;
        _bitLength = _bitLength + length;
      };

      _this.flush = function() {
        if (_bitLength > 0) {
          _out.writeByte(_bitBuffer);
        }
      };

      return _this;
    };

    var getLZWRaster = function(lzwMinCodeSize) {

      var clearCode = 1 << lzwMinCodeSize;
      var endCode = (1 << lzwMinCodeSize) + 1;
      var bitLength = lzwMinCodeSize + 1;

      // Setup LZWTable
      var table = lzwTable();

      for (var i = 0; i < clearCode; i += 1) {
        table.add(String.fromCharCode(i) );
      }
      table.add(String.fromCharCode(clearCode) );
      table.add(String.fromCharCode(endCode) );

      var byteOut = byteArrayOutputStream();
      var bitOut = bitOutputStream(byteOut);

      // clear code
      bitOut.write(clearCode, bitLength);

      var dataIndex = 0;

      var s = String.fromCharCode(_data[dataIndex]);
      dataIndex += 1;

      while (dataIndex < _data.length) {

        var c = String.fromCharCode(_data[dataIndex]);
        dataIndex += 1;

        if (table.contains(s + c) ) {

          s = s + c;

        } else {

          bitOut.write(table.indexOf(s), bitLength);

          if (table.size() < 0xfff) {

            if (table.size() == (1 << bitLength) ) {
              bitLength += 1;
            }

            table.add(s + c);
          }

          s = c;
        }
      }

      bitOut.write(table.indexOf(s), bitLength);

      // end code
      bitOut.write(endCode, bitLength);

      bitOut.flush();

      return byteOut.toByteArray();
    };

    var lzwTable = function() {

      var _map = {};
      var _size = 0;

      var _this = {};

      _this.add = function(key) {
        if (_this.contains(key) ) {
          throw 'dup key:' + key;
        }
        _map[key] = _size;
        _size += 1;
      };

      _this.size = function() {
        return _size;
      };

      _this.indexOf = function(key) {
        return _map[key];
      };

      _this.contains = function(key) {
        return typeof _map[key] != 'undefined';
      };

      return _this;
    };

    return _this;
  };

  var createDataURL = function(width, height, getPixel) {
    var gif = gifImage(width, height);
    for (var y = 0; y < height; y += 1) {
      for (var x = 0; x < width; x += 1) {
        gif.setPixel(x, y, getPixel(x, y) );
      }
    }

    var b = byteArrayOutputStream();
    gif.write(b);

    var base64 = base64EncodeOutputStream();
    var bytes = b.toByteArray();
    for (var i = 0; i < bytes.length; i += 1) {
      base64.writeByte(bytes[i]);
    }
    base64.flush();

    return 'data:image/gif;base64,' + base64;
  };

  //---------------------------------------------------------------------
  // returns qrcode function.

  return qrcode;
}();

// multibyte support
!function() {

  qrcode.stringToBytesFuncs['UTF-8'] = function(s) {
    // http://stackoverflow.com/questions/18729405/how-to-convert-utf8-string-to-byte-array
    function toUTF8Array(str) {
      var utf8 = [];
      for (var i=0; i < str.length; i++) {
        var charcode = str.charCodeAt(i);
        if (charcode < 0x80) utf8.push(charcode);
        else if (charcode < 0x800) {
          utf8.push(0xc0 | (charcode >> 6),
              0x80 | (charcode & 0x3f));
        }
        else if (charcode < 0xd800 || charcode >= 0xe000) {
          utf8.push(0xe0 | (charcode >> 12),
              0x80 | ((charcode>>6) & 0x3f),
              0x80 | (charcode & 0x3f));
        }
        // surrogate pair
        else {
          i++;
          // UTF-16 encodes 0x10000-0x10FFFF by
          // subtracting 0x10000 and splitting the
          // 20 bits of 0x0-0xFFFFF into two halves
          charcode = 0x10000 + (((charcode & 0x3ff)<<10)
            | (str.charCodeAt(i) & 0x3ff));
          utf8.push(0xf0 | (charcode >>18),
              0x80 | ((charcode>>12) & 0x3f),
              0x80 | ((charcode>>6) & 0x3f),
              0x80 | (charcode & 0x3f));
        }
      }
      return utf8;
    }
    return toUTF8Array(s);
  };

}();

(function (factory) {
  if (typeof define === 'function' && define.amd) {
      define([], factory);
  } else if (typeof exports === 'object') {
      module.exports = factory();
  }
}(function () {
    return qrcode;
}));

    /**
     * Encode Handoff Token: FMTCSDAS1-<b64>-<checksum>
     */
    function encodeHandoffToken(payload) {
        if (!payload || typeof payload !== "object") return "";
        var jsonStr = JSON.stringify(payload);
        var body = b64enc(jsonStr);
        var chk = cyrb53(body) % 100000;
        return "FMTCSDAS1-" + body + "-" + chk;
    }

    /**
     * Decode Handoff Token: verifies checksum and extracts payload
     */
    function decodeHandoffToken(token) {
        if (!token || typeof token !== "string") {
            return { valid: false, error: "Empty or invalid token string" };
        }
        var m = token.trim().match(/^FMTCSDAS1-([A-Za-z0-9+/=]+)-(\d+)$/);
        if (!m) {
            return { valid: false, error: "Invalid token format structure" };
        }
        var body = m[1];
        var expectedChk = parseInt(m[2], 10);
        var actualChk = cyrb53(body) % 100000;

        if (actualChk !== expectedChk) {
            return { valid: false, error: "Checksum verification failed" };
        }

        try {
            var jsonStr = b64dec(body);
            var payload = JSON.parse(jsonStr);
            return { valid: true, payload: payload };
        } catch (e) {
            return { valid: false, error: "Malformed JSON payload: " + e.message };
        }
    }

    /**
     * Generate QR Code Data URL (100% Offline via Embedded Kazuhiko Arase Generator)
     */
    function generateQRCodeDataURL(text, cellSize, margin) {
        if (!text) return "";
        try {
            var qr = qrcode(0, "L");
            qr.addData(text);
            qr.make();
            return qr.createDataURL(cellSize || 4, margin || 10);
        } catch (e) {
            return "";
        }
    }

    /* =========================================================================
     * 7. CSV EXPORTER & COMMISSIONING ACCEPTANCE PDF REPORT ENGINE
     * ========================================================================= */

    /**
     * Export DAS BoQ to Clean UTF-8 CSV
     */
    function exportDasCsv(state, boqResult, lang) {
        var isEn = lang === "en";
        var s = state || {};
        var b = boqResult || calcDasBoq(s, s.kurs || 16200);
        var kurs = b.exchangeRate || 16200;

        var projName = s.proj || s.projectName || "FMTCS_DAS_Project";
        var byName = s.by || s.designer || "CDPK System Planner";
        var dateStr = new Date().toISOString().slice(0, 10);

        var meta = [
            ["Project", projName],
            ["Designed By", byName],
            ["Date", dateStr],
            ["Architecture Mode", b.archMode.toUpperCase()],
            ["Fiber Topology", b.fiberTopo.toUpperCase()],
            ["Rate (IDR per 1 USD)", kurs],
            []
        ];

        var floorRows = [["Floor / Zone", "Indoor Antennas"]];
        if (Array.isArray(b.floors)) {
            b.floors.forEach(function(f) {
                floorRows.push([f.f || "Zone", f.q || 0]);
            });
        }
        floorRows.push(["Total Antennas", b.quantities ? b.quantities.antIndoorQty : 0]);
        floorRows.push([]);

        var boqHeaders = ["Item", "Model", "SKU", "Qty", "Unit", "Unit Price (USD)", "Unit Price (IDR)", "Amount (USD)", "Amount (IDR)", "COGS (USD)", "Margin (USD)", "Margin (%)"];
        var itemRows = [boqHeaders];

        (b.items || []).forEach(function(it) {
            var nameStr = isEn ? it.name.en : it.name.id;
            itemRows.push([
                nameStr,
                it.model,
                it.sku,
                it.qty,
                it.unit,
                Math.round(it.unitPriceUsd * 100) / 100,
                Math.round(it.unitPriceIdr),
                Math.round(it.lineSellUsd * 100) / 100,
                Math.round(it.lineSellIdr),
                Math.round(it.lineCogsUsd * 100) / 100,
                Math.round(it.lineMarginUsd * 100) / 100,
                fmt(it.marginPct, 1) + "%"
            ]);
        });

        var totals = b.totals || {};
        itemRows.push([]);
        itemRows.push([
            "TOTAL", "", "", "", "", "", "",
            Math.round(totals.totalSellUsd * 100) / 100,
            Math.round(totals.totalSellIdr),
            Math.round(totals.totalCogsUsd * 100) / 100,
            Math.round(totals.totalMarginUsd * 100) / 100,
            fmt(totals.overallMarginPct, 1) + "%"
        ]);

        var allLines = [];
        meta.forEach(function(r) { allLines.push(r.map(csvq).join(",")); });
        floorRows.forEach(function(r) { allLines.push(r.map(csvq).join(",")); });
        itemRows.forEach(function(r) { allLines.push(r.map(csvq).join(",")); });

        var csvText = "\uFEFF" + allLines.join("\r\n");

        // If running in browser environment, trigger download
        if (typeof document !== "undefined" && typeof URL !== "undefined") {
            try {
                var blob = new Blob([csvText], { type: "text/csv;charset=utf-8" });
                var url = URL.createObjectURL(blob);
                var a = document.createElement("a");
                a.href = url;
                a.download = projName.replace(/[^\w\-]+/g, "_") + "_FMTCS_BoQ.csv";
                document.body.appendChild(a);
                a.click();
                setTimeout(function() {
                    URL.revokeObjectURL(url);
                    a.remove();
                }, 600);
            } catch (e) {}
        }

        return csvText;
    }

    /**
     * Export Official PT Citra Data Purnama Karya / FMTCS Commissioning Acceptance PDF
     * Generates a signable formal test report using jsPDF and autoTable
     */
    function exportCommissioningPdf(commState, projectMeta, lang) {
        var isEn = lang === "en";
        var cState = commState || {};
        var meta = projectMeta || {};

        if (typeof window === "undefined" || !window.jspdf || !window.jspdf.jsPDF) {
            return null;
        }

        var jsPDF = window.jspdf.jsPDF;
        var doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

        // Colors
        var primaryBlue = [0, 56, 117]; // #003875
        var darkSlate = [15, 23, 42];
        var textMuted = [100, 116, 139];

        // 1. Header Banner
        doc.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
        doc.rect(0, 0, 210, 28, "F");

        // Optional Logo from CDPK Global
        if (window.CDPK_LOGO_B64) {
            try {
                doc.addImage(window.CDPK_LOGO_B64, "PNG", 12, 4, 32, 17);
            } catch (e) {}
        }

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(13);
        doc.setFont("helvetica", "bold");
        var docTitle = isEn
            ? "FMTCS FIBER DAS — COMMISSIONING & ACCEPTANCE REPORT"
            : "PT CITRA DATA PURNAMA KARYA — BERITA ACARA UJI TERIMA DAS";
        doc.text(docTitle, 50, 12);

        doc.setFontSize(8.5);
        doc.setFont("helvetica", "normal");
        var subtitle = isEn
            ? "In-Building Two-Way Radio Distributed Antenna System • Site Acceptance Test (SAT)"
            : "Sistem Distribusi Sinyal Radio Komunikasi Gedung • Uji Terima Lapangan Resmi";
        doc.text(subtitle, 50, 19);

        // 2. Project Metadata Block
        doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        doc.text(isEn ? "PROJECT & ACCEPTANCE DETAILS" : "DATA PROYEK & PENGUJIAN", 14, 36);

        var projRows = [
            [
                (isEn ? "Project / Building: " : "Proyek / Gedung: ") + (meta.projectName || meta.proj || "FMTCS Tower"),
                (isEn ? "Test Date: " : "Tanggal Uji: ") + (meta.testDate || meta.date || new Date().toISOString().slice(0, 10))
            ],
            [
                (isEn ? "Location: " : "Lokasi: ") + (meta.location || meta.loc || "Jakarta"),
                (isEn ? "Lead Technician: " : "Teknisi Utama: ") + (meta.technician || meta.tech || "CDPK Field Team")
            ],
            [
                (isEn ? "Client / Witness: " : "Pelanggan / Saksi: ") + (meta.customer || "-"),
                (isEn ? "Standard: " : "Standar Acuan: ") + "FMTCS DAS Engineering Specs v4.2"
            ]
        ];

        doc.autoTable({
            startY: 38,
            body: projRows,
            theme: "plain",
            styles: { fontSize: 8.2, cellPadding: 1.2, textColor: darkSlate },
            columnStyles: { 0: { cellWidth: 100 }, 1: { cellWidth: 80 } }
        });

        // 3. Acceptance Criteria Box
        var critY = doc.lastAutoTable.finalY + 3;
        var maxVswr = parseFloat(cState.maxVswr != null ? cState.maxVswr : 1.5);
        var minTx = parseFloat(cState.minTx != null ? cState.minTx : 37.0);
        var minRx = parseFloat(cState.minRx != null ? cState.minRx : -95.0);

        doc.setFillColor(241, 245, 249);
        doc.setDrawColor(203, 213, 225);
        doc.roundedRect(14, critY, 182, 16, 2, 2, "FD");

        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
        doc.text(isEn ? "TECHNICAL ACCEPTANCE PASS CRITERIA:" : "KRITERIA BATAS LULUS UJI TEKNIS:", 18, critY + 5);

        doc.setFont("helvetica", "normal");
        doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
        var critText = isEn
            ? `• VSWR ≤ ${maxVswr.toFixed(2)}    • TX Power ≥ ${minTx.toFixed(0)} dBm    • Rx Signal ≥ ${minRx.toFixed(0)} dBm    • Call Quality ≠ Poor`
            : `• VSWR ≤ ${maxVswr.toFixed(2)}    • Daya TX ≥ ${minTx.toFixed(0)} dBm    • Sinyal Rx ≥ ${minRx.toFixed(0)} dBm    • Kualitas Suara ≠ Buruk`;
        doc.text(critText, 18, critY + 11);

        // 4. Test Points Table
        var tableY = critY + 20;
        var rawPoints = Array.isArray(cState.points) ? cState.points : (cState.commPts || []);
        var tableHead = isEn
            ? [["#", "Point / Antenna ID", "VSWR", "TX (dBm)", "Rx (dBm)", "Voice Call", "Verdict"]]
            : [["#", "Titik / Antena", "VSWR", "TX (dBm)", "Rx (dBm)", "Kualitas Suara", "Hasil"]];

        var passCount = 0;
        var totalPoints = rawPoints.length;

        var tableBody = rawPoints.map(function(p, i) {
            var v = parseFloat(p.vswr);
            var t = parseFloat(p.tx);
            var r = parseFloat(p.rx);
            var call = p.call || "good";
            var ok = (isFinite(v) && v <= maxVswr) && (isFinite(t) && t >= minTx) && (isFinite(r) && r >= minRx) && (call !== "poor");
            if (ok) passCount++;

            var callDisp = call === "good" ? (isEn ? "Good" : "Baik") : (call === "fair" ? (isEn ? "Fair" : "Cukup") : (isEn ? "Poor" : "Buruk"));
            var verdictDisp = ok ? (isEn ? "PASS" : "LULUS") : (isEn ? "FAIL" : "TIDAK LULUS");

            return [
                String(i + 1),
                p.id || ("A" + (i + 1)),
                isFinite(v) ? fmt(v, 2) : "—",
                isFinite(t) ? fmt(t, 1) : "—",
                isFinite(r) ? fmt(r, 1) : "—",
                callDisp,
                verdictDisp
            ];
        });

        doc.autoTable({
            startY: tableY,
            head: tableHead,
            body: tableBody,
            theme: "grid",
            headStyles: { fillColor: primaryBlue, textColor: 255, fontSize: 8.2, fontStyle: "bold" },
            bodyStyles: { fontSize: 8, cellPadding: 2, textColor: darkSlate },
            columnStyles: {
                0: { halign: "center", cellWidth: 10 },
                1: { fontStyle: "bold", cellWidth: 40 },
                2: { halign: "right", cellWidth: 22 },
                3: { halign: "right", cellWidth: 24 },
                4: { halign: "right", cellWidth: 24 },
                5: { halign: "center", cellWidth: 32 },
                6: { halign: "center", fontStyle: "bold", cellWidth: 30 }
            },
            didParseCell: function(data) {
                if (data.section === "body" && data.column.index === 6) {
                    var txt = String(data.cell.raw || "");
                    if (txt.includes("PASS") || txt.includes("LULUS")) {
                        data.cell.styles.fillColor = [220, 252, 231];
                        data.cell.styles.textColor = [21, 128, 61];
                    } else {
                        data.cell.styles.fillColor = [254, 226, 226];
                        data.cell.styles.textColor = [185, 28, 28];
                    }
                }
            }
        });

        // 5. Overall Verdict Banner
        var verdictY = doc.lastAutoTable.finalY + 5;
        if (verdictY > 235) {
            doc.addPage();
            verdictY = 20;
        }

        var allPassed = totalPoints > 0 && passCount === totalPoints;
        doc.setFillColor(allPassed ? 220 : 254, allPassed ? 252 : 226, allPassed ? 231 : 226);
        doc.setDrawColor(allPassed ? 34 : 220, allPassed ? 197 : 38, allPassed ? 94 : 38);
        doc.roundedRect(14, verdictY, 182, 14, 2, 2, "FD");

        doc.setFontSize(9.5);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(allPassed ? 21 : 185, allPassed ? 128 : 28, allPassed ? 61 : 28);
        var overallText = allPassed
            ? (isEn ? `OVERALL VERDICT: PASSED (${passCount}/${totalPoints} Test Points Validated)` : `KESELURUHAN: LULUS (${passCount}/${totalPoints} Titik Uji Memenuhi Spesifikasi Teknis)`)
            : (isEn ? `OVERALL VERDICT: ACTION REQUIRED (${passCount}/${totalPoints} Passed — Tuning Required)` : `KESELURUHAN: PERLU TINDAK LANJUT (${passCount}/${totalPoints} Lulus — Perlu Tuning/Remediasi)`);
        doc.text(overallText, 105, verdictY + 8.5, { align: "center" });

        // 6. Signature Acceptance Section
        var signY = verdictY + 22;
        if (signY > 240) {
            doc.addPage();
            signY = 25;
        }

        doc.setFontSize(8.5);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);

        // Left: Certified Engineer
        doc.text(isEn ? "TESTED & COMMISSIONED BY:" : "DISERAHKAN OLEH (PELAKSANA PENGUJIAN):", 18, signY);
        doc.setFont("helvetica", "normal");
        doc.text("PT Citra Data Purnama Karya", 18, signY + 5);
        doc.line(18, signY + 28, 85, signY + 28);
        doc.text((meta.technician || "Lead RF Engineer") + " (Signature & Date)", 18, signY + 33);

        // Right: Customer Witness
        doc.setFont("helvetica", "bold");
        doc.text(isEn ? "WITNESSED & ACCEPTED BY:" : "DITERIMA OLEH (PELANGGAN / SAKSI):", 125, signY);
        doc.setFont("helvetica", "normal");
        doc.text(meta.customer || (isEn ? "Building Management / Client" : "Manajemen Gedung / Klien"), 125, signY + 5);
        doc.line(125, signY + 28, 192, signY + 28);
        doc.text(isEn ? "Authorized Representative (Signature & Date)" : "Perwakilan Berwenang (Tanda Tangan & Tanggal)", 125, signY + 33);

        // Footer note
        doc.setFontSize(7.5);
        doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
        doc.text("CDPK System Planner Enterprise • PT Citra Data Purnama Karya • FMTCS Distributed Antenna Systems", 105, 287, { align: "center" });

        var filename = (meta.projectName || "FMTCS_Commissioning").replace(/[^\w\-]+/g, "_") + "_SAT_Report.pdf";
        doc.save(filename);

        return doc;
    }

    /* =========================================================================
     * 8. EXPOSE GLOBAL WINDOW OBJECT
     * ========================================================================= */
    var CDPK_DAS_ENGINE = {
        version: "8.5.0",
        i18n: I18N,
        devices: DEVICES,
        cables: CABLES,
        envs: ENVS,
        powerRows: powerRows,
        vswrRows: vswrRows,

        // Core Calculation Functions
        calcPowerConversion: calcPowerConversion,
        calcGainConversion: calcGainConversion,
        calcVswrConversion: calcVswrConversion,
        calcFieldMeterConversion: calcFieldMeterConversion,
        calcDasLinkBudget: calcDasLinkBudget,
        calcAntennaPlanner: calcAntennaPlanner,
        calcOkumuraHataOutdoor: calcOkumuraHataOutdoor,
        calcDasBoq: calcDasBoq,

        // SVG Visualizer
        buildDasTopologySVG: buildDasTopologySVG,

        // Tokens & QR
        encodeHandoffToken: encodeHandoffToken,
        decodeHandoffToken: decodeHandoffToken,
        generateQRCodeDataURL: generateQRCodeDataURL,

        // Exporters
        exportDasCsv: exportDasCsv,
        exportCommissioningPdf: exportCommissioningPdf,

        // Helpers
        cyrb53: cyrb53,
        fmt: fmt,
        fmtInt: fmtInt,
        fmtMoney: fmtMoney
    };

    if (typeof window !== "undefined") {
        window.CDPK_DAS_ENGINE = CDPK_DAS_ENGINE;
    }
    if (typeof module !== "undefined" && module.exports) {
        module.exports = CDPK_DAS_ENGINE;
    }
    global.CDPK_DAS_ENGINE = CDPK_DAS_ENGINE;

})(typeof window !== "undefined" ? window : (typeof global !== "undefined" ? global : this));
