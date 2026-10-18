/**
 * CDPK System Planner Enterprise - Open Multi-Brand CCTV Surveillance & NVR Planner Engine
 * Sesuai Bagian 12.1 di PRD-New.md (Fase 1: Modul CCTV Surveillance & NVR Planner)
 *
 * Mendukung katalog bawaan flagship CDPK (Pelco & Avigilon dari Motorola Solutions),
 * brand terkemuka industri (Axis, Hanwha Vision, Hikvision, Dahua, Bosch, Uniview),
 * serta kamera kustom Generic ONVIF.
 *
 * Exposes: window.CDPK_CCTV_ENGINE
 * Supported Languages: English ('en') & Bahasa Indonesia ('id') strictly.
 *
 * (c) 2026 PT Citradata Purnakharisma (CDPK). All Rights Reserved.
 */
(function (global) {
    "use strict";

    /* =========================================================================
     * 1. CORE CONSTANTS, CODECS, RESOLUTIONS & I18N DICTIONARY
     * ========================================================================= */

    var VERSION = "8.6.0";

    var I18N = {
        id: {
            cctvTitle: "Video Security & CCTV Surveillance Planner",
            cctvSubtitle: "Open Multi-Brand & Universal ONVIF Sizing Suite (Pelco, Avigilon, Axis, Hanwha, Hikvision, Dahua, Bosch, Uniview)",
            tabPlanner: "1. Sizing Kamera & Storage NVR",
            tabPoe: "2. Daya PoE & Sizing Switch",
            tabBoq: "3. BoQ CCTV & Bridge Utama",
            tabCatalog: "4. Katalog Kamera Multi-Brand",
            addCameraGroup: "Tambah Grup Kamera",
            addPresetCamera: "Pilih dari Preset Brand",
            customCameraBuilder: "Konfigurator Kamera Kustom (ONVIF)",
            brandLabel: "Merk / Brand",
            modelLabel: "Model / Tipe",
            resolutionLabel: "Resolusi Sensor",
            fpsLabel: "Frame Rate (FPS)",
            codecLabel: "Format Kompresi",
            sceneLabel: "Kompleksitas Gerakan (Scene)",
            bitrateLabel: "Bitrate per Kamera (Mbps)",
            poeClassLabel: "Kelas Daya PoE",
            poeWattLabel: "Konsumsi PoE (Watt)",
            qtyLabel: "Jumlah Kamera (Qty)",
            priceUsdLabel: "Harga Satuan (USD)",
            priceIdrLabel: "Harga Satuan (IDR)",
            retentionLabel: "Masa Retensi Rekaman (Hari)",
            recordingHoursLabel: "Jam Rekam per Hari",
            raidLabel: "Konfigurasi RAID NVR",
            overheadLabel: "Overhead Safety Factor (%)",
            diskSizeLabel: "Ukuran Hard Disk Enterprise",
            vmsBrandLabel: "Software VMS & Lisensi",
            throughputTotal: "Total Throughput Jaringan",
            peakThroughput: "Peak Bandwidth (+20% Headroom)",
            rawStorage: "Kapasitas Storage Bersih",
            requiredStorage: "Total Storage Diperlukan (RAID + Safety)",
            hddCountNeeded: "Kebutuhan Hard Disk",
            nvrChassis: "Rekomendasi Sasis NVR / Server",
            poeTotalDemand: "Total Daya PoE Kamera",
            poeBudgetRecommended: "Rekomendasi Power Budget Switch (+20%)",
            switchPortsNeeded: "Jumlah Port Kamera + Uplink",
            recommendedSwitch: "Rekomendasi Industrial Switch",
            injectToMasterBoq: "Kirim ke BoQ Utama (DMR)",
            exportCsv: "Ekspor CSV",
            copySummary: "Salin Ringkasan Teknis",
            resetCctv: "Reset Konfigurasi CCTV",
            customBadge: "Kamera Kustom",
            flagshipBadge: "CDPK Flagship",
            thirdPartyBadge: "Third-Party Brand",
            onvifBadge: "Universal ONVIF"
        },
        en: {
            cctvTitle: "Video Security & CCTV Surveillance Planner",
            cctvSubtitle: "Open Multi-Brand & Universal ONVIF Sizing Suite (Pelco, Avigilon, Axis, Hanwha, Hikvision, Dahua, Bosch, Uniview)",
            tabPlanner: "1. Camera Sizing & NVR Storage",
            tabPoe: "2. PoE Power & Switch Sizing",
            tabBoq: "3. CCTV BoQ & Master Bridge",
            tabCatalog: "4. Multi-Brand Camera Catalog",
            addCameraGroup: "Add Camera Group",
            addPresetCamera: "Add from Brand Preset",
            customCameraBuilder: "Custom Camera Builder (ONVIF)",
            brandLabel: "Brand / Manufacturer",
            modelLabel: "Model / Series",
            resolutionLabel: "Sensor Resolution",
            fpsLabel: "Frame Rate (FPS)",
            codecLabel: "Compression Codec",
            sceneLabel: "Scene Motion Activity",
            bitrateLabel: "Bitrate per Camera (Mbps)",
            poeClassLabel: "PoE Power Class",
            poeWattLabel: "PoE Consumption (Watts)",
            qtyLabel: "Camera Quantity (Qty)",
            priceUsdLabel: "Unit Price (USD)",
            priceIdrLabel: "Unit Price (IDR)",
            retentionLabel: "Recording Retention (Days)",
            recordingHoursLabel: "Recording Hours per Day",
            raidLabel: "NVR RAID Configuration",
            overheadLabel: "Overhead Safety Factor (%)",
            diskSizeLabel: "Enterprise Hard Drive Capacity",
            vmsBrandLabel: "VMS Software & Licensing",
            throughputTotal: "Total Network Throughput",
            peakThroughput: "Peak Bandwidth (+20% Headroom)",
            rawStorage: "Raw Net Storage",
            requiredStorage: "Total Required Storage (RAID + Safety)",
            hddCountNeeded: "Hard Drives Required",
            nvrChassis: "Recommended NVR / Server Chassis",
            poeTotalDemand: "Total Camera PoE Demand",
            poeBudgetRecommended: "Recommended Switch PoE Budget (+20%)",
            switchPortsNeeded: "Camera Ports + Uplink Count",
            recommendedSwitch: "Recommended Industrial Switch",
            injectToMasterBoq: "Inject to Master BoQ (DMR)",
            exportCsv: "Export CSV",
            copySummary: "Copy Engineering Summary",
            resetCctv: "Reset CCTV Configuration",
            customBadge: "Custom Camera",
            flagshipBadge: "CDPK Flagship",
            thirdPartyBadge: "Third-Party Brand",
            onvifBadge: "Universal ONVIF"
        }
    };

    var BRANDS = [
        // ─── PARTNER RESMI CDPK (PRIORITAS DISTRIBUTOR) ─────────────────────
        { id: "pelco", name: "Pelco (Motorola Solutions)", partnerTier: "official", type: "flagship", flag: "⭐ Partner Resmi CDPK" },
        { id: "avigilon", name: "Avigilon Unity (Motorola Solutions)", partnerTier: "official", type: "flagship", flag: "⭐ Partner Resmi CDPK" },
        { id: "ava", name: "Ava Security (Avigilon Alta Cloud)", partnerTier: "official", type: "flagship", flag: "⭐ Partner Resmi CDPK" },

        // ─── BRAND PIHAK KETIGA / OPEN ONVIF ────────────────────────────────
        { id: "milesight", name: "Milesight", partnerTier: "thirdparty", type: "thirdparty", flag: "🌐 Open Brand (ONVIF)" },
        { id: "vigi", name: "VIGI (by TP-Link)", partnerTier: "thirdparty", type: "thirdparty", flag: "🌐 Open Brand (ONVIF)" },
        { id: "axis", name: "Axis Communications", partnerTier: "thirdparty", type: "thirdparty", flag: "🌐 Open Brand (ONVIF)" },
        { id: "hanwha", name: "Hanwha Vision (Wisenet)", partnerTier: "thirdparty", type: "thirdparty", flag: "🌐 Open Brand (ONVIF)" },
        { id: "hikvision", name: "Hikvision", partnerTier: "thirdparty", type: "thirdparty", flag: "🌐 Open Brand (ONVIF)" },
        { id: "dahua", name: "Dahua Technology", partnerTier: "thirdparty", type: "thirdparty", flag: "🌐 Open Brand (ONVIF)" },
        { id: "bosch", name: "Bosch Security", partnerTier: "thirdparty", type: "thirdparty", flag: "🌐 Open Brand (ONVIF)" },
        { id: "uniview", name: "Uniview (UNV)", partnerTier: "thirdparty", type: "thirdparty", flag: "🌐 Open Brand (ONVIF)" },
        { id: "generic_onvif", name: "Generic ONVIF / Custom", partnerTier: "thirdparty", type: "custom", flag: "⚙️ Custom/ONVIF" }
    ];

    var SENSOR_FORMATS = [
        { id: "1_4", label: "1/4\" (3.2 x 2.4 mm)", widthMm: 3.2, heightMm: 2.4 },
        { id: "1_3", label: "1/3\" (4.8 x 3.6 mm)", widthMm: 4.8, heightMm: 3.6 },
        { id: "1_2_8", label: "1/2.8\" (5.12 x 3.84 mm - Standar Industri)", widthMm: 5.12, heightMm: 3.84 },
        { id: "1_2_7", label: "1/2.7\" (5.37 x 4.04 mm)", widthMm: 5.37, heightMm: 4.04 },
        { id: "1_2", label: "1/2\" (6.4 x 4.8 mm)", widthMm: 6.4, heightMm: 4.8 },
        { id: "1_1_8", label: "1/1.8\" (7.2 x 5.4 mm - Low Light / 4K UHD)", widthMm: 7.2, heightMm: 5.4 },
        { id: "1_inch", label: "1\" (12.8 x 9.6 mm - Ultra High-End)", widthMm: 12.8, heightMm: 9.6 }
    ];

    var DORI_STANDARDS = {
        detection: {
            ppm: 25,
            label_id: "Deteksi (Detection >= 25 PPM)",
            label_en: "Detection (>= 25 PPM)",
            desc_id: "Mengetahui keberadaan manusia atau kendaraan dalam frame secara andal.",
            desc_en: "Reliably detect the presence of a person or vehicle in frame."
        },
        observation: {
            ppm: 62,
            label_id: "Observasi (Observation >= 62 PPM)",
            label_en: "Observation (>= 62 PPM)",
            desc_id: "Mengamati rincian umum seperti warna pakaian dan arah pergerakan objek.",
            desc_en: "Observe characteristic details such as clothing color and direction."
        },
        recognition: {
            ppm: 125,
            label_id: "Pengenalan (Recognition >= 125 PPM)",
            label_en: "Recognition (>= 125 PPM)",
            desc_id: "Menentukan dengan kepastian tinggi apakah individu tersebut pernah dilihat sebelumnya.",
            desc_en: "Determine with high certainty whether the individual has been seen before."
        },
        identification: {
            ppm: 250,
            label_id: "Identifikasi Forensik (Identification >= 250 PPM)",
            label_en: "Identification (>= 250 PPM)",
            desc_id: "Identifikasi forensik positif wajah dan pelat nomor kendaraan tanpa keraguan legal.",
            desc_en: "Positive forensic facial and license plate identification beyond legal doubt."
        }
    };

    var RESOLUTIONS = [
        { id: "1080p", label: "1080p FHD (2.0 MP / 1920x1080)", mp: 2.07 },
        { id: "4MP", label: "4MP QHD (4.0 MP / 2560x1440)", mp: 3.68 },
        { id: "5MP", label: "5MP Super HD (5.0 MP / 2592x1944)", mp: 5.04 },
        { id: "4K", label: "4K UHD 8MP (8.3 MP / 3840x2160)", mp: 8.29 },
        { id: "12MP", label: "12MP Panoramic / Multisensor", mp: 12.0 },
        { id: "thermal", label: "Bispectral Thermal (VGA/Radiometric + 2MP)", mp: 0.35 }
    ];

    var CODECS = [
        { id: "H.264", label: "H.264 (Standard AVC)", savingFactor: 1.0 },
        { id: "H.265", label: "H.265 (HEVC High Efficiency)", savingFactor: 0.55 },
        { id: "SmartCodec", label: "SmartCodec / Zipstream / WiseStream / HDSM (AI Dynamic GOP)", savingFactor: 0.33 }
    ];

    var SCENE_MOTIONS = [
        { id: "low", label_id: "Rendah (Koridor, Kantor, Malam Statis)", label_en: "Low (Corridor, Office, Static Night)", factor: 0.70 },
        { id: "medium", label_id: "Sedang (Lobi Gedung, Parkiran, Gudang)", label_en: "Medium (Building Lobby, Parking, Warehouse)", factor: 1.00 },
        { id: "high", label_id: "Tinggi (Lalu Lintas Cepat, Kasino, Pohon Berangin)", label_en: "High (Heavy Traffic, Casino, Wind Foliage)", factor: 1.35 }
    ];

    var POE_CLASSES = {
        af: { standard: "IEEE 802.3af (PoE)", pseWatts: 15.4, pdMaxWatts: 12.95, label: "802.3af PoE (15.4W)" },
        at: { standard: "IEEE 802.3at (PoE+)", pseWatts: 30.0, pdMaxWatts: 25.5, label: "802.3at PoE+ (30W)" },
        bt_type3: { standard: "IEEE 802.3bt Type 3", pseWatts: 60.0, pdMaxWatts: 51.0, label: "802.3bt Type 3 (60W)" },
        bt_type4: { standard: "IEEE 802.3bt Type 4", pseWatts: 90.0, pdMaxWatts: 71.3, label: "802.3bt Type 4 (90W)" }
    };

    /* =========================================================================
     * 2. CURATED MULTI-BRAND CAMERA PRESET CATALOG
     * ========================================================================= */

    var PRESETS = [
        // ─── PELCO (MOTOROLA SOLUTIONS) ──────────────────────────────────────
        {
            sku: "PEL-CAM-SPEC8-4MP",
            brand: "pelco",
            brandName: "Pelco",
            model: "Spectra Enhanced 8 PTZ 4MP 30x",
            formFactor: "ptz",
            resolution: "4MP",
            defaultFps: 30,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 2.4,
            poeClass: "bt_type4",
            poeWatts: 70.0,
            unitPriceUsd: 3450,
            unitPriceIdr: 55200000,
            cogsUsd: 2580,
            cogsIdr: 41280000,
            marginPct: 25.2,
            features: ["4MP 30x Zoom", "Smart Analytics", "802.3bt Class 8 (70W)", "Pelco Smart Compression", "IP67 / IK10", "FIPS-140-2"],
            desc_id: "Kamera PTZ High-End Pelco Spectra Enhanced 8 resolusi 4MP, 30x Optical Zoom, Smart Analytics powered by Motorola Solutions, daya PoE++ 802.3bt 70W max.",
            desc_en: "Pelco Spectra Enhanced 8 PTZ 4MP camera, 30x Optical Zoom, Smart Analytics powered by Motorola Solutions, 802.3bt PoE++ 70W max."
        },
        {
            sku: "PEL-CAM-SARIX-MULTI-12MP",
            brand: "pelco",
            brandName: "Pelco",
            model: "Sarix Multi Enhanced 12MP (3x4MP)",
            formFactor: "multisensor",
            resolution: "12MP",
            defaultFps: 25,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 5.5,
            poeClass: "bt_type3",
            poeWatts: 45.0,
            unitPriceUsd: 2850,
            unitPriceIdr: 45600000,
            cogsUsd: 2130,
            cogsIdr: 34080000,
            marginPct: 25.3,
            features: ["12MP Multi-Head", "180/270/360 Coverage", "Smart Analytics", "802.3bt 45W", "SureVision WDR"],
            desc_id: "Kamera multi-sensor panorama Pelco Sarix Multi Enhanced 12MP (3 sensor 4MP independen), analitik AI terintegrasi, 802.3bt 45W.",
            desc_en: "Pelco Sarix Multi Enhanced 12MP (3x 4MP sensors) multi-directional panoramic camera with AI analytics, 802.3bt 45W."
        },
        {
            sku: "PEL-CAM-EXSITE-BUL-8MP",
            brand: "pelco",
            brandName: "Pelco",
            model: "ExSite Pro Bullet 4K 8MP ATEX Explosion-Proof",
            formFactor: "hazloc",
            resolution: "4K",
            defaultFps: 25,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 4.2,
            poeClass: "at",
            poeWatts: 25.0,
            unitPriceUsd: 4600,
            unitPriceIdr: 73600000,
            cogsUsd: 3450,
            cogsIdr: 55200000,
            marginPct: 25.0,
            features: ["ATEX / IECEx Zone 1/21", "4K UHD 8MP", "AISI 316L Stainless Steel", "Smart Analytics", "Elevate Cloud", "802.3at PoE+"],
            desc_id: "Kamera anti-ledakan bersertifikasi ATEX/IECEx Zone 1 & 21 untuk area Migas/Petrokimia, bodi stainless steel 316L, resolusi 4K 8MP, PoE+ 25W.",
            desc_en: "Explosion-proof ATEX/IECEx Zone 1 & 21 camera for Oil & Gas/Petrochemical sites, 316L stainless steel, 4K 8MP, 802.3at PoE+ 25W."
        },
        {
            sku: "PEL-CAM-SARIX-PRO4-DOME",
            brand: "pelco",
            brandName: "Pelco",
            model: "Sarix Professional 4 Dome 4MP IR",
            formFactor: "dome",
            resolution: "4MP",
            defaultFps: 25,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 2.2,
            poeClass: "af",
            poeWatts: 12.0,
            unitPriceUsd: 680,
            unitPriceIdr: 10880000,
            cogsUsd: 510,
            cogsIdr: 8160000,
            marginPct: 25.0,
            features: ["4MP Pro Dome", "Smart Compression", "IR 40m", "WDR 130dB", "IP67 / IK10", "802.3af PoE"],
            desc_id: "Kamera fixed dome Pelco Sarix Professional 4 resolusi 4MP, True WDR, Smart Compression H.265, infrared 40 meter, PoE 802.3af 12W.",
            desc_en: "Pelco Sarix Professional 4 Fixed Dome 4MP camera, True WDR, Smart Compression H.265, 40m IR, 802.3af PoE 12W."
        },
        {
            sku: "PEL-CAM-SARIX-VAL-BUL2",
            brand: "pelco",
            brandName: "Pelco",
            model: "Sarix Value Bullet 1080p 2MP IR",
            formFactor: "bullet",
            resolution: "1080p",
            defaultFps: 25,
            defaultCodec: "H.265",
            nominalBitrateMbps: 1.8,
            poeClass: "af",
            poeWatts: 7.5,
            unitPriceUsd: 340,
            unitPriceIdr: 5440000,
            cogsUsd: 255,
            cogsIdr: 4080000,
            marginPct: 25.0,
            features: ["1080p 2MP", "H.265", "IR 30m", "IP66 Weatherproof", "802.3af PoE 7.5W"],
            desc_id: "Kamera bullet entry-level andal Pelco Sarix Value 2MP 1080p, perlindungan cuaca IP66, infrared 30m, hemat daya PoE 802.3af 7.5W.",
            desc_en: "Pelco Sarix Value Bullet 1080p 2MP camera, IP66 weatherproof, 30m IR, low power 802.3af PoE 7.5W."
        },
        {
            sku: "PEL-CAM-ESPRIT-COMP-THERM",
            brand: "pelco",
            brandName: "Pelco",
            model: "Esprit Compact Bispectral Thermal & Visible PTZ",
            formFactor: "thermal",
            resolution: "thermal",
            defaultFps: 25,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 3.2,
            poeClass: "bt_type3",
            poeWatts: 60.0,
            unitPriceUsd: 8200,
            unitPriceIdr: 131200000,
            cogsUsd: 6150,
            cogsIdr: 98400000,
            marginPct: 25.0,
            features: ["Bispectral Thermal + Optical", "VGA 640x512 Radiometric", "Optical 1080p 30x", "Continuous Pan", "802.3bt 60W"],
            desc_id: "Kamera PTZ bispectral termal Pelco Esprit Compact dengan sensor termal radiometrik VGA 640x512 dan sensor optik 1080p 30x, PoE++ 60W.",
            desc_en: "Pelco Esprit Compact Bispectral Thermal PTZ camera with VGA 640x512 radiometric sensor and 1080p 30x optical camera, 802.3bt 60W."
        },

        // ─── AVIGILON (MOTOROLA SOLUTIONS) ───────────────────────────────────
        {
            sku: "AVG-CAM-H6A-DOME8",
            brand: "avigilon",
            brandName: "Avigilon",
            model: "Avigilon Unity H6A Dome 8MP 4K",
            formFactor: "dome",
            resolution: "4K",
            defaultFps: 25,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 3.8,
            poeClass: "at",
            poeWatts: 13.0,
            unitPriceUsd: 1510,
            unitPriceIdr: 24500000,
            cogsUsd: 1130,
            cogsIdr: 18080000,
            marginPct: 26.2,
            features: ["4K 8MP", "Next-Gen Video Analytics", "Auditory Analytics", "SmartCodec HDSM", "802.3at PoE+"],
            desc_id: "Kamera dome Avigilon Unity H6A resolusi 4K 8MP dengan Next-Gen Video Analytics (klasifikasi objek mendalam), HDSM SmartCodec, PoE+ 13W.",
            desc_en: "Avigilon Unity H6A 4K 8MP Dome camera with Next-Gen Video Analytics (deep object classification), HDSM SmartCodec, PoE+ 13W."
        },
        {
            sku: "AVG-CAM-H6X-BUL8",
            brand: "avigilon",
            brandName: "Avigilon",
            model: "Avigilon Unity H6X Bullet 8MP 4K",
            formFactor: "bullet",
            resolution: "4K",
            defaultFps: 25,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 3.9,
            poeClass: "at",
            poeWatts: 15.0,
            unitPriceUsd: 1655,
            unitPriceIdr: 26800000,
            cogsUsd: 1240,
            cogsIdr: 19840000,
            marginPct: 26.0,
            features: ["4K 8MP", "IP66/67/68 & IK10", "Adaptive IR 70m", "Next-Gen Analytics", "802.3at PoE+"],
            desc_id: "Kamera bullet outdoor tangguh Avigilon Unity H6X resolusi 4K 8MP, infrared adaptif 70m, proteksi IP66/67/68 dan IK10, PoE+ 15W.",
            desc_en: "Avigilon Unity H6X Rugged Outdoor Bullet 4K 8MP camera, adaptive IR 70m, IP66/67/68 and IK10 ratings, 802.3at PoE+ 15W."
        },
        {
            sku: "AVG-CAM-H5A-PTZ8",
            brand: "avigilon",
            brandName: "Avigilon",
            model: "Avigilon Unity H5A Rugged PTZ 8MP 36x",
            formFactor: "ptz",
            resolution: "4K",
            defaultFps: 30,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 4.5,
            poeClass: "bt_type3",
            poeWatts: 60.0,
            unitPriceUsd: 4195,
            unitPriceIdr: 68000000,
            cogsUsd: 3140,
            cogsIdr: 50240000,
            marginPct: 26.1,
            features: ["4K 8MP 36x Zoom", "Next-Gen Analytics & Auto-Tracking", "Built-in Wiper", "802.3bt 60W"],
            desc_id: "Kamera PTZ tangguh Avigilon H5A 8MP 4K dengan 36x zoom, auto-tracking analitik objek, wiper terintegrasi, PoE++ 802.3bt 60W.",
            desc_en: "Avigilon H5A Rugged PTZ 8MP 4K with 36x zoom, next-gen auto-tracking analytics, integrated wiper, 802.3bt 60W."
        },
        {
            sku: "AVG-CAM-H5A-THERM",
            brand: "avigilon",
            brandName: "Avigilon",
            model: "Avigilon Unity H5A Thermal VGA Radiometric",
            formFactor: "thermal",
            resolution: "thermal",
            defaultFps: 25,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 1.2,
            poeClass: "af",
            poeWatts: 9.0,
            unitPriceUsd: 5865,
            unitPriceIdr: 95000000,
            cogsUsd: 4390,
            cogsIdr: 70240000,
            marginPct: 26.1,
            features: ["Thermal Radiometric VGA", "Perimeter Detection", "High-Temp Flare/Substation Monitoring", "802.3af PoE"],
            desc_id: "Kamera termal radiometrik Avigilon H5A dengan deteksi perimeter jarak jauh dan pemantauan suhu aset penting, PoE 802.3af 9W.",
            desc_en: "Avigilon H5A Radiometric Thermal camera for long-range perimeter intrusion and critical asset temperature monitoring, 802.3af 9W."
        },
        // ─── AVA SECURITY (AVIGILON ALTA CLOUD) ──────────────────────────────
        {
            sku: "AVA-CAM-COMPACT5",
            brand: "ava",
            brandName: "Ava (Avigilon Alta)",
            partnerTier: "official",
            model: "Ava Compact Dome 5MP Cloud-AI",
            formFactor: "dome",
            envClass: "indoor",
            sensorFormat: "1_2_8",
            focalLengthMm: 3.2,
            resolution: "5MP",
            defaultFps: 20,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 2.2,
            poeClass: "af",
            poeWatts: 8.0,
            unitPriceUsd: 955,
            unitPriceIdr: 15500000,
            cogsUsd: 715,
            cogsIdr: 11440000,
            marginPct: 26.2,
            features: ["5MP Sensor", "Onboard Storage 30 Days", "Cloud-Native AI", "Microphone Array", "802.3af PoE"],
            desc_id: "Kamera cloud-native Ava Compact Dome 5MP dengan penyimpanan onboard 30 hari, array mikrofon audio AI, PoE 802.3af 8W.",
            desc_en: "Ava Compact Dome 5MP cloud-native camera with 30-day onboard SSD, AI directional microphone array, 802.3af 8W."
        },
        {
            sku: "AVA-CAM-BULLET-4K",
            brand: "ava",
            brandName: "Ava (Avigilon Alta)",
            partnerTier: "official",
            model: "Ava Cloud Quad Bullet 4K AI Outdoor",
            formFactor: "bullet",
            envClass: "outdoor",
            sensorFormat: "1_1_8",
            focalLengthMm: 4.5,
            resolution: "4K",
            defaultFps: 25,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 3.5,
            poeClass: "at",
            poeWatts: 14.0,
            unitPriceUsd: 1480,
            unitPriceIdr: 23680000,
            cogsUsd: 1110,
            cogsIdr: 17760000,
            marginPct: 25.0,
            features: ["4K 8MP Cloud AI", "Onboard Storage 60 Days", "Directional Audio", "IK10 / IP67", "802.3at PoE+"],
            desc_id: "Kamera bullet cloud-native Ava Alta 4K dengan penyimpanan terdistribusi SSD 60 hari, AI analitik terpadu, audio directional, PoE+ 14W.",
            desc_en: "Ava Alta 4K Cloud-native Bullet camera with 60-day onboard SSD, integrated AI analytics, directional audio, 802.3at PoE+ 14W."
        },

        // ─── AXIS COMMUNICATIONS ─────────────────────────────────────────────
        {
            sku: "AXIS-CAM-P1468-LE",
            brand: "axis",
            brandName: "Axis",
            model: "Axis P1468-LE 4K 8MP Bullet (ARTPEC-8)",
            formFactor: "bullet",
            resolution: "4K",
            defaultFps: 25,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 3.5,
            poeClass: "at",
            poeWatts: 13.0,
            unitPriceUsd: 1290,
            unitPriceIdr: 20640000,
            cogsUsd: 960,
            cogsIdr: 15360000,
            marginPct: 25.6,
            features: ["4K 8MP", "ARTPEC-8 Deep Learning", "Zipstream H.265", "OptimizedIR 40m", "802.3at PoE+"],
            desc_id: "Kamera bullet outdoor 4K 8MP Axis P1468-LE dengan chip ARTPEC-8 berbasis Deep Learning Processing Unit (DLPU), Zipstream H.265, PoE+ 13W.",
            desc_en: "Axis P1468-LE 4K 8MP outdoor bullet with ARTPEC-8 deep learning processing unit, Zipstream H.265, 802.3at PoE+ 13W."
        },
        {
            sku: "AXIS-CAM-M3216-LVE",
            brand: "axis",
            brandName: "Axis",
            model: "Axis M3216-LVE 4MP Dome (Zipstream)",
            formFactor: "dome",
            resolution: "4MP",
            defaultFps: 25,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 1.9,
            poeClass: "af",
            poeWatts: 6.5,
            unitPriceUsd: 610,
            unitPriceIdr: 9760000,
            cogsUsd: 455,
            cogsIdr: 7280000,
            marginPct: 25.4,
            features: ["4MP Resolution", "Forensic WDR", "Zipstream", "IK10 Vandal-Proof", "802.3af PoE"],
            desc_id: "Kamera dome vandal-proof Axis M3216-LVE 4MP, Forensic WDR, Zipstream hemat bandwidth, hemat daya 802.3af 6.5W.",
            desc_en: "Axis M3216-LVE 4MP vandal-resistant dome, Forensic WDR, bandwidth-efficient Zipstream, 802.3af 6.5W."
        },
        {
            sku: "AXIS-CAM-Q6135-LE",
            brand: "axis",
            brandName: "Axis",
            model: "Axis Q6135-LE 1080p PTZ 32x Zoom",
            formFactor: "ptz",
            resolution: "1080p",
            defaultFps: 30,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 2.2,
            poeClass: "bt_type3",
            poeWatts: 51.0,
            unitPriceUsd: 2780,
            unitPriceIdr: 44480000,
            cogsUsd: 2080,
            cogsIdr: 33280000,
            marginPct: 25.2,
            features: ["1080p 32x Zoom", "OptimizedIR 250m", "Speed Dry Wiper", "802.3bt 51W"],
            desc_id: "Kamera PTZ outdoor berkecepatan tinggi Axis Q6135-LE resolusi 1080p 32x zoom, infrared 250m, fungsi Speed Dry, PoE++ 51W.",
            desc_en: "Axis Q6135-LE high-speed outdoor PTZ 1080p 32x zoom, 250m IR, Speed Dry function, 802.3bt 51W."
        },

        // ─── HANWHA VISION (WISENET) ─────────────────────────────────────────
        {
            sku: "HWH-CAM-XNV-8081R",
            brand: "hanwha",
            brandName: "Hanwha Vision",
            model: "Hanwha Wisenet XNV-8081R 4K 8MP AI Dome",
            formFactor: "dome",
            resolution: "4K",
            defaultFps: 25,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 3.4,
            poeClass: "at",
            poeWatts: 14.0,
            unitPriceUsd: 1050,
            unitPriceIdr: 16800000,
            cogsUsd: 785,
            cogsIdr: 12560000,
            marginPct: 25.2,
            features: ["4K 8MP", "WiseStream III", "AI Object Classification", "Modular Structure", "802.3at PoE+"],
            desc_id: "Kamera dome Hanwha Wisenet XNV-8081R 4K 8MP dengan WiseStream III, AI deteksi orang & kendaraan, PoE+ 14W.",
            desc_en: "Hanwha Wisenet XNV-8081R 4K 8MP AI Dome with WiseStream III, deep-learning object classification, 802.3at PoE+ 14W."
        },
        {
            sku: "HWH-CAM-XNO-6080R",
            brand: "hanwha",
            brandName: "Hanwha Vision",
            model: "Hanwha Wisenet XNO-6080R 2MP Bullet IR",
            formFactor: "bullet",
            resolution: "1080p",
            defaultFps: 30,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 1.6,
            poeClass: "af",
            poeWatts: 9.0,
            unitPriceUsd: 520,
            unitPriceIdr: 8320000,
            cogsUsd: 390,
            cogsIdr: 6240000,
            marginPct: 25.0,
            features: ["1080p 2MP", "WiseStream II", "IR 50m", "WDR 150dB", "802.3af PoE"],
            desc_id: "Kamera bullet outdoor Hanwha Wisenet 2MP 1080p dengan WiseStream II, infrared 50m, WDR 150dB, PoE 802.3af 9W.",
            desc_en: "Hanwha Wisenet XNO-6080R 2MP 1080p bullet camera, WiseStream II, 50m IR, 150dB WDR, 802.3af 9W."
        },
        {
            sku: "HWH-CAM-XNP-6400RW",
            brand: "hanwha",
            brandName: "Hanwha Vision",
            model: "Hanwha Wisenet XNP-6400RW 2MP PTZ 40x Wiper",
            formFactor: "ptz",
            resolution: "1080p",
            defaultFps: 30,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 2.1,
            poeClass: "bt_type3",
            poeWatts: 65.0,
            unitPriceUsd: 2950,
            unitPriceIdr: 47200000,
            cogsUsd: 2210,
            cogsIdr: 35360000,
            marginPct: 25.1,
            features: ["1080p 40x Zoom", "Built-in Wiper", "AI Auto Tracking", "802.3bt 65W"],
            desc_id: "Kamera PTZ outdoor Hanwha 2MP 40x zoom optik dengan wiper pembersih lensa otomatis, AI auto tracking, PoE++ 65W.",
            desc_en: "Hanwha XNP-6400RW 2MP 40x PTZ camera with built-in lens wiper, AI auto-tracking, 802.3bt 65W."
        },

        // ─── HIKVISION ───────────────────────────────────────────────────────
        {
            sku: "HIK-CAM-DS2CD2387G2",
            brand: "hikvision",
            brandName: "Hikvision",
            model: "Hikvision ColorVu Pro Turret 4K 8MP",
            formFactor: "dome",
            resolution: "4K",
            defaultFps: 25,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 3.5,
            poeClass: "af",
            poeWatts: 8.5,
            unitPriceUsd: 390,
            unitPriceIdr: 6240000,
            cogsUsd: 290,
            cogsIdr: 4640000,
            marginPct: 25.6,
            features: ["4K 8MP 24/7 Color", "ColorVu F1.0", "AcuSense H.265+", "IP67", "802.3af PoE"],
            desc_id: "Kamera turret outdoor Hikvision ColorVu Pro resolusi 4K 8MP warna 24/7 dengan bukaan F1.0, AcuSense klasifikasi manusia/kendaraan, PoE 8.5W.",
            desc_en: "Hikvision ColorVu Pro 4K 8MP 24/7 full-color turret camera, F1.0 super aperture, AcuSense human/vehicle classification, 802.3af 8.5W."
        },
        {
            sku: "HIK-CAM-DS2CD2147G2",
            brand: "hikvision",
            brandName: "Hikvision",
            model: "Hikvision ColorVu Pro Dome 4MP",
            formFactor: "dome",
            resolution: "4MP",
            defaultFps: 25,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 2.1,
            poeClass: "af",
            poeWatts: 6.5,
            unitPriceUsd: 280,
            unitPriceIdr: 4480000,
            cogsUsd: 210,
            cogsIdr: 3360000,
            marginPct: 25.0,
            features: ["4MP Full Color", "AcuSense AI", "IK10 Vandal", "802.3af PoE 6.5W"],
            desc_id: "Kamera dome vandal-proof Hikvision 4MP ColorVu AcuSense, gambar berwarna tajam 24/7, hemat daya PoE 802.3af 6.5W.",
            desc_en: "Hikvision ColorVu AcuSense 4MP vandal dome camera, 24/7 colorful monitoring, low power 802.3af 6.5W."
        },
        {
            sku: "HIK-CAM-DS2DF8C442IXS",
            brand: "hikvision",
            brandName: "Hikvision",
            model: "Hikvision Ultra DarkFighter PTZ 4MP 42x",
            formFactor: "ptz",
            resolution: "4MP",
            defaultFps: 30,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 3.2,
            poeClass: "bt_type3",
            poeWatts: 60.0,
            unitPriceUsd: 2450,
            unitPriceIdr: 39200000,
            cogsUsd: 1830,
            cogsIdr: 29280000,
            marginPct: 25.3,
            features: ["4MP 42x Optical Zoom", "DarkFighter Ultra Low-Light", "Laser IR 500m", "802.3bt 60W"],
            desc_id: "Kamera PTZ industri Hikvision 4MP dengan optical zoom 42x, sensor DarkFighter ultra low-light, laser infrared hingga 500m, PoE++ 60W.",
            desc_en: "Hikvision 4MP 42x optical zoom DarkFighter industrial PTZ, 500m laser IR, ultra low-light, 802.3bt 60W."
        },

        // ─── DAHUA TECHNOLOGY ────────────────────────────────────────────────
        {
            sku: "DHA-CAM-IPC-HDBW5842E",
            brand: "dahua",
            brandName: "Dahua",
            model: "Dahua WizMind 5-Series Dome 4K 8MP",
            formFactor: "dome",
            resolution: "4K",
            defaultFps: 25,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 3.5,
            poeClass: "af",
            poeWatts: 8.5,
            unitPriceUsd: 410,
            unitPriceIdr: 6560000,
            cogsUsd: 305,
            cogsIdr: 4880000,
            marginPct: 25.6,
            features: ["4K 8MP", "WizMind AI Analytics", "Smart H.265+", "IK10/IP67", "802.3af PoE"],
            desc_id: "Kamera dome Dahua WizMind 5-Series 4K 8MP dengan deep learning analytics (face recognition, perimeter protection), Smart H.265+, PoE 8.5W.",
            desc_en: "Dahua WizMind 5-Series 4K 8MP Dome camera with deep learning analytics (face recognition, perimeter), Smart H.265+, 802.3af 8.5W."
        },
        {
            sku: "DHA-CAM-IPC-HFW5442E",
            brand: "dahua",
            brandName: "Dahua",
            model: "Dahua WizMind 5-Series Bullet 4MP",
            formFactor: "bullet",
            resolution: "4MP",
            defaultFps: 25,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 2.1,
            poeClass: "af",
            poeWatts: 7.2,
            unitPriceUsd: 295,
            unitPriceIdr: 4720000,
            cogsUsd: 220,
            cogsIdr: 3520000,
            marginPct: 25.4,
            features: ["4MP Bullet", "WizMind AI", "Starlight+", "IR 50m", "802.3af PoE"],
            desc_id: "Kamera bullet Dahua WizMind 4MP Starlight+, analitik proteksi perimeter cerdas, infrared 50m, hemat daya PoE 802.3af 7.2W.",
            desc_en: "Dahua WizMind 4MP Starlight+ bullet camera, smart perimeter protection, 50m IR, 802.3af 7.2W."
        },
        {
            sku: "DHA-CAM-SD6AL445XA",
            brand: "dahua",
            brandName: "Dahua",
            model: "Dahua Ultra PTZ 4MP 45x Laser IR",
            formFactor: "ptz",
            resolution: "4MP",
            defaultFps: 30,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 3.2,
            poeClass: "bt_type4",
            poeWatts: 70.0,
            unitPriceUsd: 2600,
            unitPriceIdr: 41600000,
            cogsUsd: 1950,
            cogsIdr: 31200000,
            marginPct: 25.0,
            features: ["4MP 45x Zoom", "Laser IR 500m", "Hi-PoE / 802.3bt 70W", "Auto-Tracking 3.0"],
            desc_id: "Kamera PTZ kelas berat Dahua Ultra Series 4MP dengan 45x zoom optik, laser IR 500m, auto tracking cerdas, PoE++ 70W.",
            desc_en: "Dahua Ultra Series heavy-duty 4MP 45x optical zoom PTZ with 500m laser IR, auto-tracking 3.0, 802.3bt 70W."
        },

        // ─── BOSCH SECURITY ──────────────────────────────────────────────────
        {
            sku: "BOS-CAM-FLEX8000I-4K",
            brand: "bosch",
            brandName: "Bosch",
            model: "Bosch FLEXIDOME IP starlight 8000i 4K",
            formFactor: "dome",
            resolution: "4K",
            defaultFps: 30,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 3.6,
            poeClass: "at",
            poeWatts: 14.0,
            unitPriceUsd: 1890,
            unitPriceIdr: 30240000,
            cogsUsd: 1415,
            cogsIdr: 22640000,
            marginPct: 25.1,
            features: ["4K 8MP", "Intelligent Video Analytics (IVA)", "Wireless Remote Commissioning", "802.3at PoE+"],
            desc_id: "Kamera dome premium Bosch FLEXIDOME 8000i 4K 8MP starlight, Intelligent Video Analytics terintegrasi, komisioning nirkabel via tablet, PoE+ 14W.",
            desc_en: "Bosch FLEXIDOME IP starlight 8000i 4K dome with built-in Intelligent Video Analytics (IVA), wireless commissioning, 802.3at PoE+ 14W."
        },
        {
            sku: "BOS-CAM-AUTODOME-7000I",
            brand: "bosch",
            brandName: "Bosch",
            model: "Bosch AUTODOME IP 7000i PTZ 1080p 30x",
            formFactor: "ptz",
            resolution: "1080p",
            defaultFps: 30,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 2.3,
            poeClass: "bt_type3",
            poeWatts: 60.0,
            unitPriceUsd: 3250,
            unitPriceIdr: 52000000,
            cogsUsd: 2430,
            cogsIdr: 38880000,
            marginPct: 25.2,
            features: ["1080p 30x Zoom", "Starlight Low-Light", "Intelligent Tracking", "802.3bt 60W"],
            desc_id: "Kamera PTZ berkecepatan tinggi Bosch AUTODOME 7000i 1080p 30x zoom dengan tracking objek bergerak otomatis cerdas, PoE++ 60W.",
            desc_en: "Bosch AUTODOME IP 7000i high-speed PTZ 1080p 30x zoom with intelligent object tracking, 802.3bt 60W."
        },

        // ─── UNIVIEW (UNV) ───────────────────────────────────────────────────
        {
            sku: "UNV-CAM-IPC2324",
            brand: "uniview",
            brandName: "Uniview",
            model: "Uniview Prime-I 4MP Bullet LightHunter",
            formFactor: "bullet",
            resolution: "4MP",
            defaultFps: 25,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 2.0,
            poeClass: "af",
            poeWatts: 6.0,
            unitPriceUsd: 210,
            unitPriceIdr: 3360000,
            cogsUsd: 155,
            cogsIdr: 2480000,
            marginPct: 26.2,
            features: ["4MP Bullet", "LightHunter Technology", "Ultra 265", "IR 50m", "802.3af PoE"],
            desc_id: "Kamera bullet Uniview Prime-I 4MP dengan teknologi LightHunter ultra-low light, kompresi Ultra 265, PoE 802.3af 6W.",
            desc_en: "Uniview Prime-I 4MP bullet camera with LightHunter ultra-low light, Ultra 265 compression, 802.3af 6W."
        },
        {
            sku: "UNV-CAM-IPC6858",
            brand: "uniview",
            brandName: "Uniview",
            model: "Uniview OmniView 4K Multi-Sensor 180°",
            formFactor: "multisensor",
            resolution: "4K",
            defaultFps: 25,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 4.8,
            poeClass: "at",
            poeWatts: 21.0,
            unitPriceUsd: 1150,
            unitPriceIdr: 18400000,
            cogsUsd: 860,
            cogsIdr: 13760000,
            marginPct: 25.2,
            features: ["4K 8MP 180° Panoramic", "4-in-1 Seamless Stitching", "Ultra 265", "802.3at PoE+"],
            desc_id: "Kamera panorama 180° 4K 8MP Uniview OmniView multi-sensor dengan penggabungan gambar mulus, PoE+ 21W.",
            desc_en: "Uniview OmniView 4K 8MP 180° panoramic multi-sensor camera with seamless image stitching, 802.3at PoE+ 21W."
        },

        // ─── GENERIC ONVIF & CUSTOM PRESETS ──────────────────────────────────
        {
            sku: "ONV-CAM-GENERIC-1080P",
            brand: "generic_onvif",
            brandName: "Generic ONVIF",
            model: "Universal ONVIF Profile S/T 1080p FHD",
            formFactor: "bullet",
            resolution: "1080p",
            defaultFps: 25,
            defaultCodec: "H.265",
            nominalBitrateMbps: 2.0,
            poeClass: "af",
            poeWatts: 7.0,
            unitPriceUsd: 180,
            unitPriceIdr: 2880000,
            cogsUsd: 135,
            cogsIdr: 2160000,
            marginPct: 25.0,
            features: ["1080p 2MP", "ONVIF Profile S & T", "H.265 / H.264", "802.3af PoE"],
            desc_id: "Kamera IP standar industri Universal ONVIF Profile S & T resolusi 1080p 2MP, kompresi H.265, PoE 802.3af 7W.",
            desc_en: "Universal ONVIF Profile S & T compliant 1080p 2MP IP camera, H.265/H.264, 802.3af PoE 7W."
        },
        {
            sku: "ONV-CAM-GENERIC-4MP",
            brand: "generic_onvif",
            brandName: "Generic ONVIF",
            model: "Universal ONVIF Profile S/T/M 4MP QHD",
            formFactor: "dome",
            resolution: "4MP",
            defaultFps: 25,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 2.3,
            poeClass: "af",
            poeWatts: 9.0,
            unitPriceUsd: 260,
            unitPriceIdr: 4160000,
            cogsUsd: 195,
            cogsIdr: 3120000,
            marginPct: 25.0,
            features: ["4MP QHD", "ONVIF Profile S/T/M", "Smart H.265", "802.3af PoE"],
            desc_id: "Kamera IP standar Universal ONVIF Profile S/T/M resolusi 4MP, Smart H.265, konsumsi daya hemat 802.3af 9W.",
            desc_en: "Universal ONVIF Profile S/T/M 4MP camera, Smart H.265 compression, 802.3af PoE 9W."
        },
        {
            sku: "ONV-CAM-GENERIC-4K",
            brand: "generic_onvif",
            brandName: "Generic ONVIF",
            model: "Universal ONVIF Profile S/T/M 4K 8MP",
            formFactor: "bullet",
            resolution: "4K",
            defaultFps: 25,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 4.2,
            poeClass: "at",
            poeWatts: 14.0,
            unitPriceUsd: 380,
            unitPriceIdr: 6080000,
            cogsUsd: 285,
            cogsIdr: 4560000,
            marginPct: 25.0,
            features: ["4K UHD 8MP", "ONVIF Profile S/T/M", "Smart H.265", "802.3at PoE+"],
            desc_id: "Kamera IP standar Universal ONVIF Profile S/T/M resolusi 4K UHD 8MP, Smart H.265, daya 802.3at PoE+ 14W.",
            desc_en: "Universal ONVIF Profile S/T/M 4K UHD 8MP camera, Smart H.265, 802.3at PoE+ 14W."
        },

        // ─── MILESIGHT ───────────────────────────────────────────────────────
        {
            sku: "MS-CAM-C8165-PB",
            brand: "milesight",
            brandName: "Milesight",
            partnerTier: "thirdparty",
            model: "Milesight 4K H.265+ AI Motorized Pro Bullet",
            formFactor: "bullet",
            envClass: "outdoor",
            sensorFormat: "1_2_8",
            focalLengthMm: 4.0,
            resolution: "4K",
            defaultFps: 25,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 3.4,
            poeClass: "at",
            poeWatts: 10.0,
            unitPriceUsd: 450,
            unitPriceIdr: 7200000,
            cogsUsd: 335,
            cogsIdr: 5360000,
            marginPct: 25.6,
            features: ["4K 8MP", "AI Video Analytics", "Motorized Zoom 2.8-12mm", "IP67 / IK10", "802.3at PoE+"],
            desc_id: "Kamera bullet outdoor profesional Milesight 4K 8MP dengan lensa motorized zoom 2.8-12mm, analitik AI cerdas, IP67/IK10, PoE+ 10W.",
            desc_en: "Milesight 4K 8MP Pro Bullet camera with motorized zoom 2.8-12mm, embedded AI video analytics, IP67/IK10, 802.3at PoE+ 10W."
        },
        {
            sku: "MS-CAM-C5375-PB",
            brand: "milesight",
            brandName: "Milesight",
            partnerTier: "thirdparty",
            model: "Milesight 5MP Vandal-Proof Mini Dome",
            formFactor: "dome",
            envClass: "outdoor",
            sensorFormat: "1_2_8",
            focalLengthMm: 2.8,
            resolution: "5MP",
            defaultFps: 25,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 2.3,
            poeClass: "af",
            poeWatts: 6.0,
            unitPriceUsd: 280,
            unitPriceIdr: 4480000,
            cogsUsd: 210,
            cogsIdr: 3360000,
            marginPct: 25.0,
            features: ["5MP Super HD", "Smart IR II 30m", "140dB Super WDR", "IK10 Vandal", "802.3af PoE"],
            desc_id: "Kamera mini dome vandal-proof Milesight 5MP dengan perlindungan benturan IK10, Smart IR II 30m, 140dB Super WDR, PoE 802.3af 6W.",
            desc_en: "Milesight 5MP Vandal-proof Mini Dome camera, IK10 impact protection, Smart IR II 30m, 140dB Super WDR, 802.3af PoE 6W."
        },
        {
            sku: "MS-CAM-C4461-X30PB",
            brand: "milesight",
            brandName: "Milesight",
            partnerTier: "thirdparty",
            model: "Milesight 4MP 30x Speed Dome PTZ",
            formFactor: "ptz",
            envClass: "outdoor",
            sensorFormat: "1_2_8",
            focalLengthMm: 4.7,
            resolution: "4MP",
            defaultFps: 30,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 2.9,
            poeClass: "at",
            poeWatts: 24.0,
            unitPriceUsd: 1150,
            unitPriceIdr: 18400000,
            cogsUsd: 860,
            cogsIdr: 13760000,
            marginPct: 25.2,
            features: ["4MP 30x Optical Zoom", "AI Auto Tracking", "Smart IR 180m", "IP66 Weatherproof", "802.3at PoE+"],
            desc_id: "Kamera PTZ outdoor Milesight 4MP dengan pembesaran optik 30x, pelacakan otomatis AI (Auto Tracking), IR 180 meter, PoE+ 24W.",
            desc_en: "Milesight 4MP 30x Optical Zoom Speed Dome PTZ with AI Auto Tracking, Smart IR 180m, IP66 weatherproof, 802.3at PoE+ 24W."
        },
        {
            sku: "MS-CAM-C8266-FPC",
            brand: "milesight",
            brandName: "Milesight",
            partnerTier: "thirdparty",
            model: "Milesight 4K AI Color+ 180° Panoramic Dome",
            formFactor: "multisensor",
            envClass: "outdoor",
            sensorFormat: "1_1_8",
            focalLengthMm: 2.8,
            resolution: "4K",
            defaultFps: 25,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 3.8,
            poeClass: "at",
            poeWatts: 12.0,
            unitPriceUsd: 560,
            unitPriceIdr: 8960000,
            cogsUsd: 420,
            cogsIdr: 6720000,
            marginPct: 25.0,
            features: ["4K 8MP Panoramic 180°", "Color+ 24/7 Color", "Dual Sensor Stitching", "IP67 / IK10", "802.3at"],
            desc_id: "Kamera panorama 180 derajat Milesight 4K dengan teknologi penggabungan dua sensor tanpa distorsi, gambar berwarna 24/7 Color+, PoE+ 12W.",
            desc_en: "Milesight 4K 180-degree panoramic camera with dual-sensor seamless stitching, 24/7 full-color monitoring, 802.3at PoE+ 12W."
        },
        {
            sku: "MS-CAM-C2964-FE",
            brand: "milesight",
            brandName: "Milesight",
            partnerTier: "thirdparty",
            model: "Milesight 2MP AI 12x Mini PTZ Bullet",
            formFactor: "ptz",
            envClass: "outdoor",
            sensorFormat: "1_2_8",
            focalLengthMm: 5.3,
            resolution: "1080p",
            defaultFps: 30,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 1.9,
            poeClass: "at",
            poeWatts: 16.0,
            unitPriceUsd: 480,
            unitPriceIdr: 7680000,
            cogsUsd: 360,
            cogsIdr: 5760000,
            marginPct: 25.0,
            features: ["1080p 2MP", "12x Optical Zoom", "AI Human/Vehicle Detection", "WDR 140dB", "802.3at"],
            desc_id: "Kamera mini PTZ format bullet Milesight 2MP dengan optical zoom 12x, pan 360 derajat tak terbatas, klasifikasi AI manusia/kendaraan, PoE+ 16W.",
            desc_en: "Milesight 2MP Mini PTZ Bullet camera with 12x optical zoom, 360 endless pan, AI human/vehicle detection, 802.3at PoE+ 16W."
        },

        // ─── VIGI (BY TP-LINK) ───────────────────────────────────────────────
        {
            sku: "VIGI-CAM-C340-W",
            brand: "vigi",
            brandName: "VIGI",
            partnerTier: "thirdparty",
            model: "VIGI C340-W 4MP Outdoor Full-Color Bullet",
            formFactor: "bullet",
            envClass: "outdoor",
            sensorFormat: "1_3",
            focalLengthMm: 4.0,
            resolution: "4MP",
            defaultFps: 25,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 2.4,
            poeClass: "af",
            poeWatts: 7.0,
            unitPriceUsd: 135,
            unitPriceIdr: 2160000,
            cogsUsd: 100,
            cogsIdr: 1600000,
            marginPct: 25.9,
            features: ["4MP Super-HD", "24/7 Full-Color F1.6", "Smart Detection", "IP67 Weatherproof", "802.3af PoE 7W"],
            desc_id: "Kamera bullet outdoor komersial VIGI C340 4MP dengan lensa aperture besar F1.6 untuk gambar berwarna 24/7, deteksi manusia cerdas, PoE 7W.",
            desc_en: "VIGI C340-W 4MP outdoor commercial bullet camera with large F1.6 aperture for 24/7 full-color, smart human detection, 802.3af PoE 7W."
        },
        {
            sku: "VIGI-CAM-C440-I",
            brand: "vigi",
            brandName: "VIGI",
            partnerTier: "thirdparty",
            model: "VIGI C440-I 4MP Turret Dome IR",
            formFactor: "dome",
            envClass: "indoor",
            sensorFormat: "1_3",
            focalLengthMm: 2.8,
            resolution: "4MP",
            defaultFps: 25,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 2.2,
            poeClass: "af",
            poeWatts: 6.5,
            unitPriceUsd: 120,
            unitPriceIdr: 1920000,
            cogsUsd: 90,
            cogsIdr: 1440000,
            marginPct: 25.0,
            features: ["4MP HD", "Human & Vehicle Classification", "Smart IR 30m", "IK10 Vandal", "802.3af PoE"],
            desc_id: "Kamera turret dome VIGI C440 4MP dengan klasifikasi manusia dan kendaraan, Smart IR 30m, perlindungan benturan IK10, PoE 6.5W.",
            desc_en: "VIGI C440-I 4MP turret dome camera with human & vehicle classification, Smart IR 30m, IK10 vandal resistance, 802.3af PoE 6.5W."
        },
        {
            sku: "VIGI-CAM-C540-PTZ",
            brand: "vigi",
            brandName: "VIGI",
            partnerTier: "thirdparty",
            model: "VIGI C540 Outdoor Pan/Tilt 4MP Camera",
            formFactor: "ptz",
            envClass: "outdoor",
            sensorFormat: "1_3",
            focalLengthMm: 4.0,
            resolution: "4MP",
            defaultFps: 25,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 2.6,
            poeClass: "at",
            poeWatts: 14.0,
            unitPriceUsd: 240,
            unitPriceIdr: 3840000,
            cogsUsd: 180,
            cogsIdr: 2880000,
            marginPct: 25.0,
            features: ["4MP Pan/Tilt", "Auto-Tracking", "Full-Color 30m", "Two-Way Audio", "802.3at PoE+"],
            desc_id: "Kamera pan/tilt outdoor VIGI C540 resolusi 4MP dengan auto-tracking objek, night vision berwarna 30m, audio dua arah, PoE+ 14W.",
            desc_en: "VIGI C540 4MP outdoor pan/tilt camera with AI auto-tracking, full-color night vision 30m, two-way audio, 802.3at PoE+ 14W."
        },
        {
            sku: "VIGI-CAM-C385-4K",
            brand: "vigi",
            brandName: "VIGI",
            partnerTier: "thirdparty",
            model: "VIGI C385 4K 8MP Ultra HD Outdoor Bullet",
            formFactor: "bullet",
            envClass: "outdoor",
            sensorFormat: "1_2_8",
            focalLengthMm: 4.0,
            resolution: "4K",
            defaultFps: 25,
            defaultCodec: "SmartCodec",
            nominalBitrateMbps: 3.6,
            poeClass: "af",
            poeWatts: 9.0,
            unitPriceUsd: 210,
            unitPriceIdr: 3360000,
            cogsUsd: 155,
            cogsIdr: 2480000,
            marginPct: 26.2,
            features: ["4K 8MP UHD", "F1.0 Full-Color", "Smart Coding H.265+", "IP67 Weatherproof", "802.3af PoE"],
            desc_id: "Kamera bullet outdoor VIGI C385 resolusi 4K UHD 8MP, bukaan super F1.0 penuh warna malam hari, kompresi Smart Coding H.265+, PoE 9W.",
            desc_en: "VIGI C385 4K UHD 8MP outdoor bullet camera, super F1.0 full-color aperture, Smart Coding H.265+, IP67 weatherproof, 802.3af PoE 9W."
        }
    ];

    /* =========================================================================
     * 3. HARDWARE CATALOG: NVR, SERVERS, STORAGE HDDS, SWITCHES & LICENSES
     * ========================================================================= */

    var NVR_MODELS = [
        {
            sku: "NVR-PEL-VX-E8",
            brand: "pelco",
            model: "Pelco VideoXpert Enterprise NVR 8-Bay 2U",
            bays: 8,
            maxChannels: 64,
            maxThroughputMbps: 700,
            raidSupported: ["RAID 5", "RAID 6"],
            unitPriceUsd: 7400,
            unitPriceIdr: 118400000,
            cogsUsd: 5550,
            cogsIdr: 88800000,
            marginPct: 25.0,
            desc_id: "Server NVR Enterprise Pelco VideoXpert sasis 2U 8-Bay hot-swap (hingga 160TB), RAID 5/6 hardware, dual 10GbE uplink, catu daya redundan.",
            desc_en: "Pelco VideoXpert Enterprise NVR 2U 8-Bay hot-swap chassis (up to 160TB), hardware RAID 5/6, dual 10GbE SFP+, redundant PSU."
        },
        {
            sku: "NVR-PEL-VX-P4",
            brand: "pelco",
            model: "Pelco VideoXpert Pro Server 4-Bay 1U",
            bays: 4,
            maxChannels: 32,
            maxThroughputMbps: 450,
            raidSupported: ["RAID 5"],
            unitPriceUsd: 4200,
            unitPriceIdr: 67200000,
            cogsUsd: 3150,
            cogsIdr: 50400000,
            marginPct: 25.0,
            desc_id: "Server NVR Pelco VideoXpert Pro sasis 1U 4-Bay (hingga 80TB), RAID 5 hardware, dual Gigabit Ethernet, performa rekaman stabil.",
            desc_en: "Pelco VideoXpert Pro 1U 4-Bay Server (up to 80TB), hardware RAID 5, dual GbE, reliable recording engine."
        },
        {
            sku: "NVR-AVG-AINVR-16B",
            brand: "avigilon",
            model: "Avigilon AI NVR 16-Bay 3U High-Density Server",
            bays: 16,
            maxChannels: 128,
            maxThroughputMbps: 1500,
            raidSupported: ["RAID 6", "RAID 5"],
            unitPriceUsd: 9800,
            unitPriceIdr: 156800000,
            cogsUsd: 7350,
            cogsIdr: 117600000,
            marginPct: 25.0,
            desc_id: "Server AI NVR Avigilon Unity sasis 3U 16-Bay hot-swap (hingga 320TB), akselerasi GPU analitik AI sisi server, RAID 6 hardware, dual PSU.",
            desc_en: "Avigilon Unity AI NVR 3U 16-Bay hot-swap storage server (up to 320TB), server-side AI analytics GPU, hardware RAID 6, dual PSU."
        },
        {
            sku: "NVR-AVG-STD-8B",
            brand: "avigilon",
            model: "Avigilon Unity NVR Standard 8-Bay 2U",
            bays: 8,
            maxChannels: 64,
            maxThroughputMbps: 650,
            raidSupported: ["RAID 5", "RAID 6"],
            unitPriceUsd: 5600,
            unitPriceIdr: 89600000,
            cogsUsd: 4200,
            cogsIdr: 67200000,
            marginPct: 25.0,
            desc_id: "NVR Avigilon Unity Standard 2U 8-Bay hot-swap (hingga 160TB), RAID 5/6, performa optimal untuk kamera Avigilon Unity H6A/H6X.",
            desc_en: "Avigilon Unity Standard NVR 2U 8-Bay hot-swap (up to 160TB), RAID 5/6, optimized for Unity H6A/H6X camera streams."
        },
        {
            sku: "NVR-IND-UNI-4B",
            brand: "generic_onvif",
            model: "Universal Industrial NVR 16-Channel 4-Bay (1U)",
            bays: 4,
            maxChannels: 16,
            maxThroughputMbps: 320,
            raidSupported: ["RAID 5", "RAID 0/1"],
            unitPriceUsd: 1850,
            unitPriceIdr: 29600000,
            cogsUsd: 1380,
            cogsIdr: 22080000,
            marginPct: 25.4,
            desc_id: "NVR Industrial Universal 16-Channel 4-Bay rackmount 1U, mendukung kamera ONVIF multi-brand hingga 4K, RAID 5.",
            desc_en: "Universal Industrial 16-Channel 4-Bay 1U rackmount NVR, multi-brand ONVIF 4K cameras support, RAID 5."
        },
        {
            sku: "NVR-IND-UNI-8B",
            brand: "generic_onvif",
            model: "Universal Industrial NVR 32/64-Channel 8-Bay (2U)",
            bays: 8,
            maxChannels: 64,
            maxThroughputMbps: 640,
            raidSupported: ["RAID 5", "RAID 6"],
            unitPriceUsd: 3200,
            unitPriceIdr: 51200000,
            cogsUsd: 2400,
            cogsIdr: 38400000,
            marginPct: 25.0,
            desc_id: "NVR Industrial Universal 32/64-Channel 8-Bay rackmount 2U, RAID 5/6 hardware, dual gigabit LAN, catu daya ganda.",
            desc_en: "Universal Industrial 32/64-Channel 8-Bay 2U rackmount NVR, hardware RAID 5/6, dual LAN, dual redundant power supply."
        },
        {
            sku: "NVR-IND-UNI-16B",
            brand: "generic_onvif",
            model: "Universal Enterprise Video Storage Server 16-Bay (3U)",
            bays: 16,
            maxChannels: 128,
            maxThroughputMbps: 1200,
            raidSupported: ["RAID 6", "RAID 5"],
            unitPriceUsd: 5800,
            unitPriceIdr: 92800000,
            cogsUsd: 4350,
            cogsIdr: 69600000,
            marginPct: 25.0,
            desc_id: "Server Storage Pengawasan Video Universal 128-Channel 16-Bay 3U, RAID 6 hardware, dual 10GbE SFP+ uplink, throughput hingga 1200 Mbps.",
            desc_en: "Universal Enterprise Video Storage Server 128-Channel 16-Bay 3U, hardware RAID 6, dual 10GbE SFP+, up to 1200 Mbps throughput."
        },
        {
            sku: "NVR-IND-UNI-24B",
            brand: "generic_onvif",
            model: "High-Density SAN Video Storage 24-Bay (4U)",
            bays: 24,
            maxChannels: 256,
            maxThroughputMbps: 2000,
            raidSupported: ["RAID 6", "RAID 60"],
            unitPriceUsd: 8900,
            unitPriceIdr: 142400000,
            cogsUsd: 6675,
            cogsIdr: 106800000,
            marginPct: 25.0,
            desc_id: "Storage SAN Video High-Density 24-Bay 4U untuk infrastruktur skala besar (hingga 480TB), pengontrol redundan, RAID 6+Hot Spare.",
            desc_en: "High-Density SAN Video Storage 24-Bay 4U for mega infrastructures (up to 480TB), redundant controllers, RAID 6+Hot Spare."
        }
    ];

    var HDD_MODELS = [
        {
            sku: "HDD-SURV-4TB",
            sizeTb: 4,
            model: "Enterprise 4TB Surveillance SATA 6Gb/s 7200 RPM",
            unitPriceUsd: 135,
            unitPriceIdr: 2160000,
            cogsUsd: 100,
            cogsIdr: 1600000,
            marginPct: 25.9
        },
        {
            sku: "HDD-SURV-8TB",
            sizeTb: 8,
            model: "Enterprise 8TB Surveillance SATA 6Gb/s 7200 RPM",
            unitPriceUsd: 240,
            unitPriceIdr: 3840000,
            cogsUsd: 180,
            cogsIdr: 2880000,
            marginPct: 25.0
        },
        {
            sku: "HDD-SURV-12TB",
            sizeTb: 12,
            model: "Enterprise 12TB Surveillance SATA 6Gb/s 7200 RPM",
            unitPriceUsd: 350,
            unitPriceIdr: 5600000,
            cogsUsd: 260,
            cogsIdr: 4160000,
            marginPct: 25.7
        },
        {
            sku: "HDD-SURV-16TB",
            sizeTb: 16,
            model: "Enterprise 16TB Surveillance SATA 6Gb/s 7200 RPM",
            unitPriceUsd: 460,
            unitPriceIdr: 7360000,
            cogsUsd: 345,
            cogsIdr: 5520000,
            marginPct: 25.0
        },
        {
            sku: "HDD-SURV-20TB",
            sizeTb: 20,
            model: "Enterprise 20TB Surveillance SATA 6Gb/s 7200 RPM",
            unitPriceUsd: 580,
            unitPriceIdr: 9280000,
            cogsUsd: 435,
            cogsIdr: 6960000,
            marginPct: 25.0
        }
    ];

    var SWITCH_MODELS = [
        {
            sku: "SW-IND-8P-POE",
            ports: 8,
            poeBudgetWatts: 120,
            formFactor: "din",
            model: "Industrial 8-Port Gigabit PoE+ DIN-Rail Switch (120W Budget)",
            uplinks: "2x 1G SFP",
            unitPriceUsd: 420,
            unitPriceIdr: 6720000,
            cogsUsd: 310,
            cogsIdr: 4960000,
            marginPct: 26.2,
            desc_id: "Switch industri unmanaged DIN-Rail 8 port Gigabit PoE+ (802.3at 30W), total daya 120W, 2 port uplink SFP, temperatur operasi -40C hingga +75C.",
            desc_en: "Industrial DIN-Rail 8-Port Gigabit PoE+ switch (802.3at 30W), 120W power budget, 2x 1G SFP uplinks, operating temp -40C to +75C."
        },
        {
            sku: "SW-IND-16P-POE",
            ports: 16,
            poeBudgetWatts: 250,
            formFactor: "rack",
            model: "Industrial 16-Port Gigabit PoE+ Managed Switch (250W Budget)",
            uplinks: "2x 10G SFP+",
            unitPriceUsd: 780,
            unitPriceIdr: 12480000,
            cogsUsd: 585,
            cogsIdr: 9360000,
            marginPct: 25.0,
            desc_id: "Switch industri managed 16 port Gigabit PoE+, total daya 250W, 2 port uplink 10G SFP+, fitur VLAN & QoS CCTV terkonfigurasi.",
            desc_en: "Industrial Managed 16-Port Gigabit PoE+ switch, 250W power budget, 2x 10G SFP+ uplinks, CCTV QoS & VLAN enabled."
        },
        {
            sku: "SW-IND-24P-POE",
            ports: 24,
            poeBudgetWatts: 370,
            formFactor: "rack",
            model: "Industrial 24-Port Gigabit Managed PoE+ Switch (370W Budget)",
            uplinks: "4x 10G SFP+",
            unitPriceUsd: 1150,
            unitPriceIdr: 18400000,
            cogsUsd: 860,
            cogsIdr: 13760000,
            marginPct: 25.2,
            desc_id: "Switch industri managed 24 port Gigabit PoE+ (370W), 4 port uplink 10G SFP+, sasis 19\" 1U rackmount, perlindungan lonjakan petir 6kV.",
            desc_en: "Industrial Managed 24-Port Gigabit PoE+ switch (370W budget), 4x 10G SFP+ uplinks, 19\" 1U rackmount, 6kV surge protection."
        },
        {
            sku: "SW-IND-48P-POE",
            ports: 48,
            poeBudgetWatts: 740,
            formFactor: "rack",
            model: "Industrial 48-Port Gigabit Managed PoE+ Switch (740W Budget)",
            uplinks: "4x 10G SFP+",
            unitPriceUsd: 1980,
            unitPriceIdr: 31680000,
            cogsUsd: 1485,
            cogsIdr: 23760000,
            marginPct: 25.0,
            desc_id: "Switch industri managed kapasitas tinggi 48 port Gigabit PoE+ (740W power budget), 4 port 10G SFP+, dual power supply redundan.",
            desc_en: "High-density Industrial Managed 48-Port Gigabit PoE+ switch (740W budget), 4x 10G SFP+ uplinks, redundant power supply."
        },
        {
            sku: "SW-IND-8P-BT",
            ports: 8,
            poeBudgetWatts: 480,
            formFactor: "rack",
            model: "Industrial 8-Port Ultra PoE++ 802.3bt Switch (480W Budget, 90W/Port)",
            uplinks: "2x 10G SFP+",
            unitPriceUsd: 890,
            unitPriceIdr: 14240000,
            cogsUsd: 665,
            cogsIdr: 10640000,
            marginPct: 25.3,
            desc_id: "Switch industri khusus kamera berat PTZ/Thermal 8-Port 802.3bt PoE++ (hingga 90W per port), total power budget 480W, 2 port 10G SFP+.",
            desc_en: "Heavy-duty Industrial 8-Port 802.3bt PoE++ switch (up to 90W/port) for PTZ & thermal cameras, 480W budget, 2x 10G SFP+ uplinks."
        }
    ];

    var VMS_LICENSES = {
        pelco_videoxpert: {
            sku: "LIC-VMS-PELCO-VX",
            name_id: "Lisensi Kamera Pelco VideoXpert Enterprise (per Channel)",
            name_en: "Pelco VideoXpert Enterprise Camera Channel License",
            unitPriceUsd: 140,
            unitPriceIdr: 2240000,
            cogsUsd: 105,
            cogsIdr: 1680000,
            marginPct: 25.0
        },
        avigilon_unity: {
            sku: "LIC-VMS-AVG-UNITY",
            name_id: "Lisensi Kamera Avigilon Unity Video 8 Enterprise (per Channel)",
            name_en: "Avigilon Unity Video 8 Enterprise Camera Channel License",
            unitPriceUsd: 165,
            unitPriceIdr: 2640000,
            cogsUsd: 125,
            cogsIdr: 2000000,
            marginPct: 24.2
        },
        axis_acs: {
            sku: "LIC-VMS-AXIS-ACS",
            name_id: "Lisensi Perangkat Axis Camera Station Core (per Device)",
            name_en: "Axis Camera Station Core Device License",
            unitPriceUsd: 110,
            unitPriceIdr: 1760000,
            cogsUsd: 80,
            cogsIdr: 1280000,
            marginPct: 27.3
        },
        hanwha_wave: {
            sku: "LIC-VMS-HWH-WAVE",
            name_id: "Lisensi Kamera Hanwha Wisenet WAVE VMS (per Channel)",
            name_en: "Hanwha Wisenet WAVE VMS IP Channel License",
            unitPriceUsd: 95,
            unitPriceIdr: 1520000,
            cogsUsd: 70,
            cogsIdr: 1120000,
            marginPct: 26.3
        },
        generic_onvif: {
            sku: "LIC-VMS-GEN-ONVIF",
            name_id: "Lisensi Universal ONVIF VMS Channel Base",
            name_en: "Universal ONVIF VMS Base Channel License",
            unitPriceUsd: 75,
            unitPriceIdr: 1200000,
            cogsUsd: 55,
            cogsIdr: 880000,
            marginPct: 26.7
        }
    };

    var ACCESSORIES = [
        {
            sku: "EXT-POE-IND-250M",
            model: "Industrial Long-Range PoE Extender (250m)",
            unitPriceUsd: 110,
            unitPriceIdr: 1760000,
            cogsUsd: 80,
            cogsIdr: 1280000,
            marginPct: 27.3,
            desc_id: "Extender PoE Industri jarak jauh hingga 250m (10/100Mbps), mendukung daya 802.3at hingga 25W pada jarak 200m, proteksi petir 6kV.",
            desc_en: "Industrial Long-Range PoE Extender up to 250m (10/100Mbps), supports 802.3at power up to 25W at 200m, 6kV surge protection."
        },
        {
            sku: "FMC-IND-POE-SFP",
            model: "Industrial Gigabit PoE+ Fiber Media Converter (30W)",
            unitPriceUsd: 185,
            unitPriceIdr: 2960000,
            cogsUsd: 135,
            cogsIdr: 2160000,
            marginPct: 27.0,
            desc_id: "Media Converter Industri 1x RJ45 Gigabit PoE+ (30W) ke 1x SFP Slot 100/1000Base-X untuk transmisi fiber optik jarak jauh (>250m hingga 20km).",
            desc_en: "Industrial Gigabit PoE+ Media Converter 1x RJ45 (30W) to 1x SFP 100/1000Base-X for long-distance fiber transmission (>250m up to 20km)."
        },
        {
            sku: "AVG-AI-APPLIANCE-8P",
            model: "Avigilon AI Appliance 8-Port (VMA-AIE2-8P)",
            unitPriceUsd: 3600,
            unitPriceIdr: 57600000,
            cogsUsd: 2700,
            cogsIdr: 43200000,
            marginPct: 25.0,
            desc_id: "Appliance akselerasi AI Avigilon 8-Channel untuk menambahkan analitik cerdas generasi berikutnya (Appearance Search, deteksi wajah/kendaraan) ke kamera pihak ketiga non-Avigilon.",
            desc_en: "Avigilon 8-Channel AI Appliance adding Next-Generation Video Analytics (Appearance Search, face/vehicle detection) to non-Avigilon third-party cameras."
        },
        {
            sku: "AVG-COMM-CAM-LIC",
            model: "Avigilon Unity Third-Party Camera Channel License",
            unitPriceUsd: 175,
            unitPriceIdr: 2800000,
            cogsUsd: 130,
            cogsIdr: 2080000,
            marginPct: 25.7,
            desc_id: "Lisensi integrasi kamera ONVIF pihak ketiga ke VMS Avigilon Unity Video 8.",
            desc_en: "Third-party ONVIF camera integration channel license for Avigilon Unity Video 8."
        },
        {
            sku: "PEL-VX-1C-COMM",
            model: "Pelco VideoXpert Third-Party ONVIF Camera License",
            unitPriceUsd: 140,
            unitPriceIdr: 2240000,
            cogsUsd: 105,
            cogsIdr: 1680000,
            marginPct: 25.0,
            desc_id: "Lisensi integrasi kanal kamera pihak ketiga (ONVIF Profile S/T) pada VMS Pelco VideoXpert Enterprise / Pro.",
            desc_en: "Third-party ONVIF camera integration channel license for Pelco VideoXpert Enterprise / Pro VMS."
        }
    ];

    /* =========================================================================
     * 4. DETERMINISTIC CALCULATION FUNCTIONS
     * ========================================================================= */

    /**
     * Kalkulator Standar DORI (EN 62676-4)
     * Menghitung HFoV, scene width, PPM di jarak target, serta jarak jangkauan maksimum untuk:
     * D (Detection 25 ppm), O (Observation 62 ppm), R (Recognition 125 ppm), I (Identification 250 ppm)
     */
    function calcDori(opts) {
        opts = opts || {};
        var distance = Math.max(0.5, parseFloat(opts.distanceMeters) || 15.0);
        var focal = Math.max(1.0, parseFloat(opts.focalLengthMm) || 4.0);

        // Sensor width (mm)
        var sensorWidth = 5.12; // default 1/2.8"
        if (opts.sensorWidthMm && parseFloat(opts.sensorWidthMm) > 0) {
            sensorWidth = parseFloat(opts.sensorWidthMm);
        } else if (opts.sensorFormat) {
            for (var i = 0; i < SENSOR_FORMATS.length; i++) {
                if (SENSOR_FORMATS[i].id === opts.sensorFormat) {
                    sensorWidth = SENSOR_FORMATS[i].widthMm;
                    break;
                }
            }
        }

        // Horizontal resolution in pixels
        var widthPx = 2560; // default 4MP
        var res = opts.resolution || "4MP";
        if (opts.customWidthPx && parseInt(opts.customWidthPx, 10) > 0) {
            widthPx = parseInt(opts.customWidthPx, 10);
        } else {
            switch (res) {
                case "1080p": widthPx = 1920; break;
                case "4MP": widthPx = 2560; break;
                case "5MP": widthPx = 2592; break;
                case "4K": widthPx = 3840; break;
                case "12MP": widthPx = 4000; break;
                case "thermal": widthPx = 640; break;
                default: widthPx = 2560; break;
            }
        }

        // Horizontal Field of View (HFoV) in radians and degrees
        var hfovRad = 2.0 * Math.atan(sensorWidth / (2.0 * focal));
        var hfovDeg = Math.round((hfovRad * (180.0 / Math.PI)) * 10) / 10;

        // Scene width at distance d (meters)
        var sceneWidthM = Math.round((distance * (sensorWidth / focal)) * 100) / 100;

        // Current Pixels Per Meter (PPM) at target distance d
        var currentPpm = Math.round((widthPx / Math.max(0.01, sceneWidthM)) * 10) / 10;

        // Maximum distances for DORI thresholds
        var maxDetectM = Math.round(((widthPx * focal) / (25.0 * sensorWidth)) * 10) / 10;
        var maxObserveM = Math.round(((widthPx * focal) / (62.0 * sensorWidth)) * 10) / 10;
        var maxRecognizeM = Math.round(((widthPx * focal) / (125.0 * sensorWidth)) * 10) / 10;
        var maxIdentifyM = Math.round(((widthPx * focal) / (250.0 * sensorWidth)) * 10) / 10;

        var currentTier = "detection";
        var currentTierLabel_id = "Deteksi (Detection >= 25 PPM)";
        var currentTierLabel_en = "Detection (>= 25 PPM)";
        var tierClass = "text-sky-400 bg-sky-900/30 border-sky-500/40";

        if (currentPpm >= 250) {
            currentTier = "identification";
            currentTierLabel_id = "Identifikasi Forensik (Identification >= 250 PPM)";
            currentTierLabel_en = "Forensic Identification (>= 250 PPM)";
            tierClass = "text-emerald-400 bg-emerald-900/30 border-emerald-500/40";
        } else if (currentPpm >= 125) {
            currentTier = "recognition";
            currentTierLabel_id = "Pengenalan Wajah (Recognition >= 125 PPM)";
            currentTierLabel_en = "Facial Recognition (>= 125 PPM)";
            tierClass = "text-teal-400 bg-teal-900/30 border-teal-500/40";
        } else if (currentPpm >= 62) {
            currentTier = "observation";
            currentTierLabel_id = "Observasi (Observation >= 62 PPM)";
            currentTierLabel_en = "Observation (>= 62 PPM)";
            tierClass = "text-amber-400 bg-amber-900/30 border-amber-500/40";
        } else if (currentPpm >= 25) {
            currentTier = "detection";
            currentTierLabel_id = "Deteksi Objek (Detection >= 25 PPM)";
            currentTierLabel_en = "Object Detection (>= 25 PPM)";
            tierClass = "text-blue-400 bg-blue-900/30 border-blue-500/40";
        } else {
            currentTier = "insufficient";
            currentTierLabel_id = "Di Bawah Standar (< 25 PPM - Gambar Buram)";
            currentTierLabel_en = "Substandard (< 25 PPM - Blurred Image)";
            tierClass = "text-rose-400 bg-rose-900/30 border-rose-500/40";
        }

        return {
            distanceMeters: distance,
            focalLengthMm: focal,
            sensorWidthMm: sensorWidth,
            widthPx: widthPx,
            hfovDeg: hfovDeg,
            sceneWidthM: sceneWidthM,
            currentPpm: currentPpm,
            currentTier: currentTier,
            currentTierLabel_id: currentTierLabel_id,
            currentTierLabel_en: currentTierLabel_en,
            tierClass: tierClass,
            maxDetectM: maxDetectM,
            maxObserveM: maxObserveM,
            maxRecognizeM: maxRecognizeM,
            maxIdentifyM: maxIdentifyM
        };
    }

    /**
     * Kalkulator Jarak Kabel Cat6 & PoE Voltage Drop
     * Menghitung loop resistance, voltage drop, tegangan bersih di kamera,
     * serta rekomendasi PoE Extender (>100m) atau Fiber Media Converter (>250m).
     */
    function calcCableDrop(opts) {
        opts = opts || {};
        var length = Math.max(1, parseFloat(opts.cableLengthMeters) || 60);
        var watts = Math.max(1.0, parseFloat(opts.deviceWatts) || 15.0);
        var pseVolts = Math.max(44.0, parseFloat(opts.pseVoltage) || 54.0);
        var cableCat = opts.cableCategory || "cat6";

        var resPerMeter = (cableCat === "cat5e") ? 0.188 : 0.165;
        var totalLoopResistance = Math.round((length * resPerMeter) * 100) / 100;

        var currentAmps = watts / pseVolts;
        var voltageDrop = Math.round((currentAmps * totalLoopResistance) * 100) / 100;
        var voltageAtCamera = Math.round((pseVolts - voltageDrop) * 100) / 100;
        var powerLossCableWatts = Math.round((Math.pow(currentAmps, 2) * totalLoopResistance) * 100) / 100;
        var totalDrawWatts = Math.round((watts + powerLossCableWatts) * 100) / 100;

        var minVoltsRequired = (watts > 30.0) ? 41.1 : ((watts > 15.4) ? 42.5 : 37.0);
        var isUnderVoltage = voltageAtCamera < minVoltsRequired;

        var status = "normal";
        var statusLabel_id = "Normal (Standar Cat6 UTP <= 100m)";
        var statusLabel_en = "Normal (Standard Cat6 UTP <= 100m)";
        var statusClass = "text-emerald-400 bg-emerald-900/30 border-emerald-500/40";
        var recommendedAccessory = null;
        var recommendationText_id = "Jarak transmisi dan stabilitas tegangan berada dalam standar aman IEEE 802.3.";
        var recommendationText_en = "Transmission distance and voltage stability are within IEEE 802.3 safe limits.";

        if (length > 250) {
            status = "critical_fiber";
            statusLabel_id = "Kritis (> 250m: Melampaui Batas Fisik Tembaga UTP)";
            statusLabel_en = "Critical (> 250m: Exceeds Copper Physical Limit)";
            statusClass = "text-rose-400 bg-rose-900/40 border-rose-500/50";
            recommendedAccessory = "fmc_poe";
            recommendationText_id = "Jarak kabel melampaui kemampuan fisik tembaga Ethernet. Wajib menggunakan Industrial PoE Fiber Media Converter + Drop Core Fiber Optic Single-Mode untuk mencegah hilangnya paket data dan voltage drop ekstrem.";
            recommendationText_en = "Distance exceeds copper Ethernet physics limit. Industrial PoE Fiber Media Converter + Single-Mode Fiber Optic cable is required for reliable zero-loss transmission.";
        } else if (length > 100) {
            status = "warning_extender";
            statusLabel_id = "Peringatan (> 100m: Di Luar Standar Cat6)";
            statusLabel_en = "Warning (> 100m: Beyond Cat6 Standard)";
            statusClass = "text-amber-400 bg-amber-900/30 border-amber-500/40";
            recommendedAccessory = "poe_extender";
            recommendationText_id = "Jarak kabel melebihi batas 100 meter. Rekomendasi: Pasang Industrial Long-Reach PoE Extender (hingga 250m) atau aktifkan fitur CCTV ePoE (10-100Mbps) pada switch industri.";
            recommendationText_en = "Cable distance exceeds 100m limit. Recommendation: Install Industrial Long-Reach PoE Extender (up to 250m) or activate CCTV ePoE mode (10-100Mbps).";
        }

        if (isUnderVoltage) {
            status = "critical_voltage";
            statusLabel_id = "Bahaya: Undervoltage Terdeteksi!";
            statusLabel_en = "Danger: Undervoltage Detected!";
            statusClass = "text-rose-400 bg-rose-900/40 border-rose-500/50";
            recommendationText_id += " PERHATIAN: Tegangan di terminal kamera (" + voltageAtCamera + "V) berada di bawah ambang batas minimum (" + minVoltsRequired + "V). Kamera berisiko reboot berulang atau padam saat beban puncak (IR malam / motor PTZ berputar)!";
            recommendationText_en += " WARNING: Camera terminal voltage (" + voltageAtCamera + "V) is below minimum threshold (" + minVoltsRequired + "V). Camera risks cyclic reboot or shutdown under peak IR/PTZ motor load!";
        }

        return {
            cableLengthMeters: length,
            deviceWatts: watts,
            pseVoltage: pseVolts,
            totalLoopResistance: totalLoopResistance,
            voltageDrop: voltageDrop,
            voltageAtCamera: voltageAtCamera,
            minVoltsRequired: minVoltsRequired,
            powerLossCableWatts: powerLossCableWatts,
            totalDrawWatts: totalDrawWatts,
            isUnderVoltage: isUnderVoltage,
            status: status,
            statusLabel_id: statusLabel_id,
            statusLabel_en: statusLabel_en,
            statusClass: statusClass,
            recommendedAccessory: recommendedAccessory,
            recommendationText_id: recommendationText_id,
            recommendationText_en: recommendationText_en
        };
    }

    /**
     * Mesin Audit Interoperabilitas & Kompatibilitas Multi-Brand
     * Memeriksa konfigurasi armada kamera terhadap platform VMS dan switch:
     * - Kebutuhan lisensi channel third-party pada VMS Avigilon/Pelco
     * - Kebutuhan Avigilon AI Appliance untuk kamera pihak ketiga
     * - Ketidakcocokan format SmartCodec proprietary (Hikvision/Dahua/VIGI/Milesight)
     * - Proteksi kelebihan daya PoE 802.3bt
     */
    function auditInteroperability(cameraFleet, selectedVms, poeResult) {
        cameraFleet = Array.isArray(cameraFleet) ? cameraFleet : [];
        selectedVms = selectedVms || "pelco_videoxpert";
        poeResult = poeResult || {};

        var totalCameras = 0;
        var brandCounts = {};
        var thirdPartyCount = 0;
        var thirdPartyBrands = [];
        var proprietarySmartCodecs = [];
        var btHighPowerCount = 0;

        for (var i = 0; i < cameraFleet.length; i++) {
            var g = cameraFleet[i];
            var q = parseInt(g.qty, 10) || 0;
            totalCameras += q;
            var bId = g.brand || "generic_onvif";
            brandCounts[bId] = (brandCounts[bId] || 0) + q;

            var isOfficial = (bId === "pelco" || bId === "avigilon" || bId === "ava");
            if (!isOfficial && q > 0) {
                thirdPartyCount += q;
                var bName = g.brandName || bId;
                if (thirdPartyBrands.indexOf(bName) === -1) {
                    thirdPartyBrands.push(bName);
                }
            }

            if (g.codec === "SmartCodec" && (bId === "hikvision" || bId === "dahua" || bId === "vigi" || bId === "milesight" || bId === "axis" || bId === "hanwha")) {
                var codecBrand = g.brandName || bId;
                if (proprietarySmartCodecs.indexOf(codecBrand) === -1) {
                    proprietarySmartCodecs.push(codecBrand);
                }
            }

            if (g.poeClass === "bt_type3" || g.poeClass === "bt_type4" || (g.poeWatts && g.poeWatts > 30.0)) {
                btHighPowerCount += q;
            }
        }

        var alerts = [];

        // Rule 1: VMS Third-Party Licensing
        if (selectedVms === "avigilon_unity" && thirdPartyCount > 0) {
            alerts.push({
                id: "avg_third_party_license",
                level: "warning",
                badge_id: "Lisensi Diperlukan",
                badge_en: "License Required",
                title_id: "Kebutuhan Lisensi Kamera Third-Party Avigilon Unity",
                title_en: "Avigilon Unity Third-Party Camera License Required",
                desc_id: "Terdapat " + thirdPartyCount + " kamera non-Avigilon (" + thirdPartyBrands.join(", ") + ") dalam armada. VMS Avigilon Unity mewajibkan lisensi channel third-party (AVG-COMM-CAM-LIC) agar stream ONVIF Profile S/T dapat didaftarkan dan direkam secara legal.",
                desc_en: "Fleet contains " + thirdPartyCount + " non-Avigilon cameras (" + thirdPartyBrands.join(", ") + "). Avigilon Unity requires third-party channel licenses (AVG-COMM-CAM-LIC) to register and record ONVIF Profile S/T streams.",
                actionType: "add_avg_license",
                actionPayload: thirdPartyCount,
                actionLabel_id: "➕ Tambah " + thirdPartyCount + "x Lisensi Avigilon ke BoQ",
                actionLabel_en: "➕ Add " + thirdPartyCount + "x Avigilon Licenses to BoQ"
            });
        } else if (selectedVms === "pelco_videoxpert" && thirdPartyCount > 0) {
            alerts.push({
                id: "pelco_third_party_license",
                level: "warning",
                badge_id: "Lisensi Diperlukan",
                badge_en: "License Required",
                title_id: "Kebutuhan Lisensi Kanal ONVIF Pelco VideoXpert",
                title_en: "Pelco VideoXpert ONVIF Channel License Required",
                desc_id: "Terdapat " + thirdPartyCount + " kamera non-Pelco (" + thirdPartyBrands.join(", ") + "). Pelco VideoXpert mewajibkan lisensi integrasi kamera pihak ketiga (PEL-VX-1C-COMM) per-channel untuk menjamin dukungan driver resmi.",
                desc_en: "Fleet contains " + thirdPartyCount + " non-Pelco cameras (" + thirdPartyBrands.join(", ") + "). Pelco VideoXpert requires third-party ONVIF integration licenses (PEL-VX-1C-COMM) per channel for official driver support.",
                actionType: "add_pelco_license",
                actionPayload: thirdPartyCount,
                actionLabel_id: "➕ Tambah " + thirdPartyCount + "x Lisensi Pelco ke BoQ",
                actionLabel_en: "➕ Add " + thirdPartyCount + "x Pelco Licenses to BoQ"
            });
        }

        // Rule 2: Avigilon AI Appliance Blocker for Third-Party Cameras
        if (selectedVms === "avigilon_unity" && thirdPartyCount > 0) {
            var neededAppliances = Math.max(1, Math.ceil(thirdPartyCount / 8.0));
            alerts.push({
                id: "avg_ai_appliance_blocker",
                level: "blocker",
                badge_id: "Blocker AI Analitik",
                badge_en: "AI Analytics Blocker",
                title_id: "Kamera Pihak Ketiga Membutuhkan Avigilon AI Appliance untuk Next-Gen Analytics",
                title_en: "Third-Party Cameras Require Avigilon AI Appliance for Next-Gen Analytics",
                desc_id: "Kamera pihak ketiga (" + thirdPartyBrands.join(", ") + ") hanya dapat mengirimkan video streaming mentah via ONVIF tanpa metadata analitik cerdas. Jika proyek membutuhkan Avigilon Next-Gen Analytics (Appearance Search, klasifikasi orang/kendaraan, deteksi pelat nomor), Anda WAJIB menambahkan Avigilon AI Appliance (VMA-AIE2-8P/16P).",
                desc_en: "Third-party cameras (" + thirdPartyBrands.join(", ") + ") only provide raw video streams via ONVIF without native metadata. If project requires Avigilon Next-Gen Analytics (Appearance Search, human/vehicle classification, license plate), you MUST add an Avigilon AI Appliance (VMA-AIE2-8P/16P).",
                actionType: "add_ai_appliance",
                actionPayload: neededAppliances,
                actionLabel_id: "➕ Tambah " + neededAppliances + "x Avigilon AI Appliance ke BoQ",
                actionLabel_en: "➕ Add " + neededAppliances + "x Avigilon AI Appliance to BoQ"
            });
        }

        // Rule 3: Proprietary SmartCodec Inconsistency
        if (proprietarySmartCodecs.length > 0 && (selectedVms === "pelco_videoxpert" || selectedVms === "avigilon_unity")) {
            var vmsName = selectedVms === "pelco_videoxpert" ? "Pelco VideoXpert" : "Avigilon Unity";
            alerts.push({
                id: "smart_codec_mismatch",
                level: "warning",
                badge_id: "Peringatan Kompresi",
                badge_en: "Compression Warning",
                title_id: "Potensi Stuttering: SmartCodec Proprietary Antar-Merk (" + proprietarySmartCodecs.join(", ") + ")",
                title_en: "Potential Stuttering: Cross-Brand Proprietary SmartCodec (" + proprietarySmartCodecs.join(", ") + ")",
                desc_id: "Fitur kompresi dinamis seperti Hikvision H.265+, Dahua Smart H.265, VIGI Smart Coding, Milesight H.265+, atau Axis Zipstream yang diaktifkan pada kamera pihak ketiga berpotensi menyebabkan frame stuttering atau rekaman korup pada VMS " + vmsName + ". REKOMENDASI: Atur kompresi kamera ke standar H.265 murni atau aktifkan ONVIF Profile T.",
                desc_en: "Proprietary dynamic compression features (such as Hikvision H.265+, Dahua Smart H.265, VIGI Smart Coding, Milesight H.265+, or Axis Zipstream) may cause playback stuttering or dropped frames on " + vmsName + " VMS. RECOMMENDATION: Set cameras to standard H.265 mode or activate ONVIF Profile T.",
                actionType: "switch_to_standard_h265",
                actionPayload: null,
                actionLabel_id: "🔄 Ubah Semua Kamera ke H.265 Standar",
                actionLabel_en: "🔄 Switch All Cameras to Standard H.265"
            });
        }

        // Rule 4: High-Power PoE Ultra (802.3bt) Protection
        if (btHighPowerCount > 0) {
            var hasBtSwitch = false;
            var swList = poeResult.recommendedSwitches || [];
            for (var s = 0; s < swList.length; s++) {
                if (swList[s].sku === "SW-IND-8P-BT" || (swList[s].model && swList[s].model.indexOf("802.3bt") !== -1)) {
                    hasBtSwitch = true;
                    break;
                }
            }

            if (!hasBtSwitch) {
                alerts.push({
                    id: "bt_power_blocker",
                    level: "blocker",
                    badge_id: "Blocker Daya PoE",
                    badge_en: "PoE Power Blocker",
                    title_id: "Kamera Berat 802.3bt (60W-90W) Memerlukan Switch Ultra PoE",
                    title_en: "High-Power 802.3bt Cameras (60W-90W) Require Ultra PoE Switch",
                    desc_id: "Terdapat " + btHighPowerCount + " kamera berdaya tinggi (PTZ/Thermal/ExSite) yang membutuhkan standar 802.3bt Type 3/4. Switch distribusi PoE+ standar (maks 30W/port) TIDAK MAMPU menyalakan kamera ini saat heater, wiper, atau motor PTZ aktif!",
                    desc_en: "There are " + btHighPowerCount + " high-power cameras (PTZ/Thermal/ExSite) requiring 802.3bt Type 3/4 standard. Standard PoE+ switches (max 30W/port) CANNOT power these cameras during heater, wiper, or PTZ movement!",
                    actionType: "add_bt_switch",
                    actionPayload: null,
                    actionLabel_id: "⚡ Alokasikan Switch Industrial 802.3bt",
                    actionLabel_en: "⚡ Allocate Industrial 802.3bt Switch"
                });
            }
        }

        var blockers = alerts.filter(function (a) { return a.level === "blocker"; }).length;
        var warnings = alerts.filter(function (a) { return a.level === "warning"; }).length;
        var info = alerts.filter(function (a) { return a.level === "info"; }).length;

        return {
            summary: {
                totalCameras: totalCameras,
                thirdPartyCount: thirdPartyCount,
                thirdPartyBrands: thirdPartyBrands,
                blockers: blockers,
                warnings: warnings,
                info: info,
                isCompatible: blockers === 0,
                selectedVms: selectedVms
            },
            alerts: alerts
        };
    }

    /**
     * Menghitung bitrate estimasi untuk 1 kamera berdasarkan resolusi, fps, codec, scene motion,
     * atau mengembalikan custom bitrate manual jika diisi.
     */
    function calcBitrate(opts) {
        opts = opts || {};
        var customBitrate = parseFloat(opts.customBitrate) || 0;
        if (customBitrate > 0) {
            return Math.round(customBitrate * 100) / 100;
        }

        var resolution = opts.resolution || "4MP";
        var fps = parseInt(opts.fps, 10) || 25;
        var codec = opts.codec || "SmartCodec";
        var scene = opts.sceneMotion || "medium";

        // Baseline bitrate in Mbps at 30 fps, medium motion, standard H.264
        var baseTable = {
            "1080p": 4.0,
            "4MP": 7.0,
            "5MP": 8.5,
            "4K": 14.0,
            "12MP": 20.0,
            "thermal": 1.6
        };

        var baseH264 = baseTable[resolution] || 7.0;

        // Codec factor
        var codecObj = CODECS.find(function (c) { return c.id === codec; });
        var codecFactor = codecObj ? codecObj.savingFactor : 0.35;

        // Scene motion factor
        var motionObj = SCENE_MOTIONS.find(function (m) { return m.id === scene; });
        var motionFactor = motionObj ? motionObj.factor : 1.0;

        // FPS scaling (non-linear baseline accounting for I-frame overhead: 0.35 + 0.65 * (fps / 30))
        var fpsClamped = Math.max(5, Math.min(60, fps));
        var fpsFactor = 0.35 + (0.65 * (fpsClamped / 30.0));

        var calculated = baseH264 * codecFactor * motionFactor * fpsFactor;
        return Math.max(0.2, Math.round(calculated * 100) / 100);
    }

    /**
     * Universal Bandwidth & Storage Estimator
     * Menghitung total throughput Mbps dan total storage TB gabungan multi-kamera.
     */
    function calcBandwidthAndStorage(cameraGroups, params) {
        cameraGroups = Array.isArray(cameraGroups) ? cameraGroups : [];
        params = params || {};

        var retentionDays = parseInt(params.retentionDays, 10) || 30;
        var recordingHours = parseFloat(params.recordingHoursPerDay) || 24;
        var recordingMode = params.recordingMode || "continuous"; // 'continuous' | 'motion'
        var motionDutyCyclePct = parseFloat(params.motionDutyCyclePct) || 70;
        var effectiveHours = recordingMode === "motion" ? (recordingHours * (motionDutyCyclePct / 100.0)) : recordingHours;
        effectiveHours = Math.max(1, Math.min(24, effectiveHours));

        var raidType = params.raidType || "raid5"; // 'raid0' | 'raid1' | 'raid5' | 'raid6'
        var storageOverheadPct = parseFloat(params.storageOverheadPct) || 20.0; // PRD: 20% safety factor
        var diskSizeTb = parseInt(params.diskSizeTb, 10) || 8;
        var vmsBrand = params.vmsBrand || "pelco_videoxpert";

        var totalCameras = 0;
        var totalThroughputMbps = 0.0;
        var groupDetails = [];

        for (var i = 0; i < cameraGroups.length; i++) {
            var grp = cameraGroups[i];
            var qty = parseInt(grp.qty, 10) || 0;
            if (qty <= 0) continue;

            totalCameras += qty;
            var br = calcBitrate({
                resolution: grp.resolution,
                fps: grp.fps,
                codec: grp.codec,
                sceneMotion: grp.sceneMotion,
                customBitrate: grp.customBitrate
            });

            var groupThroughputMbps = qty * br;
            totalThroughputMbps += groupThroughputMbps;

            // Daily Storage in Gigabytes (GB):
            // Throughput(Mbps) * 1,000,000 bits/s * 3600 s/h * hours / (8 * 1,000,000,000 bits/GB)
            // 1 Mbps continuous 24h = (1e6 * 3600 * 24) / 8e9 = 10.8 GB/day
            var dailyGb = (groupThroughputMbps * 1000000.0 * 3600.0 * effectiveHours) / (8.0 * 1000000000.0);
            var groupRawTb = (dailyGb * retentionDays) / 1000.0;

            groupDetails.push({
                id: grp.id || ("grp-" + i),
                brand: grp.brand || "generic_onvif",
                brandName: grp.brandName || grp.brand,
                model: grp.model || "IP Camera",
                formFactor: grp.formFactor || "bullet",
                resolution: grp.resolution || "4MP",
                qty: qty,
                fps: grp.fps || 25,
                codec: grp.codec || "SmartCodec",
                sceneMotion: grp.sceneMotion || "medium",
                bitrateMbps: br,
                groupThroughputMbps: Math.round(groupThroughputMbps * 100) / 100,
                dailyGb: Math.round(dailyGb * 10) / 10,
                groupRawTb: Math.round(groupRawTb * 100) / 100,
                poeClass: grp.poeClass || "af",
                poeWatts: parseFloat(grp.poeWatts) || 12.0,
                unitPriceUsd: parseFloat(grp.unitPriceUsd) || 0,
                unitPriceIdr: parseFloat(grp.unitPriceIdr) || 0,
                cogsUsd: parseFloat(grp.cogsUsd) || 0,
                marginPct: parseFloat(grp.marginPct) || 25.0
            });
        }

        // Peak throughput with 20% network spike & metadata overhead
        var peakThroughputMbps = Math.round(totalThroughputMbps * 1.20 * 100) / 100;
        totalThroughputMbps = Math.round(totalThroughputMbps * 100) / 100;

        // Raw total storage in Terabytes (TB)
        var dailyTotalGb = (totalThroughputMbps * 1000000.0 * 3600.0 * effectiveHours) / (8.0 * 1000000000.0);
        var rawTotalTb = (dailyTotalGb * retentionDays) / 1000.0;

        // RAID parity overhead percentage
        var raidParityMultiplier = 1.0;
        var parityDrivesCount = 1;
        if (raidType === "raid0") {
            raidParityMultiplier = 1.0;
            parityDrivesCount = 0;
        } else if (raidType === "raid1") {
            raidParityMultiplier = 2.0;
            parityDrivesCount = 1;
        } else if (raidType === "raid5") {
            raidParityMultiplier = 1.20; // 20% typical parity loss
            parityDrivesCount = 1;
        } else if (raidType === "raid6") {
            raidParityMultiplier = 1.30; // 30% dual parity loss
            parityDrivesCount = 2;
        }

        // Safety overhead (default 20% safety factor)
        var safetyMultiplier = 1.0 + (storageOverheadPct / 100.0);

        // Required total storage (gross capacity before parity)
        var requiredStorageTb = rawTotalTb * safetyMultiplier * raidParityMultiplier;
        requiredStorageTb = Math.max(1.0, Math.round(requiredStorageTb * 100) / 100);

        // HDD Drive Sizing
        var selectedHdd = HDD_MODELS.find(function (h) { return h.sizeTb === diskSizeTb; }) || HDD_MODELS[1]; // default 8TB
        var netDataDrives = Math.max(1, Math.ceil((rawTotalTb * safetyMultiplier) / selectedHdd.sizeTb));
        var totalDrivesNeeded = netDataDrives + parityDrivesCount;

        // Minimum drives constraints
        if (raidType === "raid5" && totalDrivesNeeded < 3) totalDrivesNeeded = 3;
        if (raidType === "raid6" && totalDrivesNeeded < 4) totalDrivesNeeded = 4;

        var grossDriveCapacityTb = totalDrivesNeeded * selectedHdd.sizeTb;

        // Recommended NVR Chassis Selection
        var recommendedNvr = null;
        var brandMatchingNvrs = NVR_MODELS.filter(function (n) {
            if (vmsBrand === "pelco_videoxpert") return n.brand === "pelco" || n.brand === "generic_onvif";
            if (vmsBrand === "avigilon_unity") return n.brand === "avigilon" || n.brand === "generic_onvif";
            return true;
        });

        // Find smallest NVR that satisfies bay count and channel count
        for (var n = 0; n < brandMatchingNvrs.length; n++) {
            var cand = brandMatchingNvrs[n];
            if (cand.bays >= totalDrivesNeeded && cand.maxChannels >= totalCameras) {
                recommendedNvr = cand;
                break;
            }
        }
        if (!recommendedNvr) {
            // Default to largest server or generic high density
            recommendedNvr = brandMatchingNvrs[brandMatchingNvrs.length - 1] || NVR_MODELS[NVR_MODELS.length - 1];
        }

        // VMS License Recommendation
        var vmsLicObj = VMS_LICENSES[vmsBrand] || VMS_LICENSES.generic_onvif;

        return {
            totalCameras: totalCameras,
            totalThroughputMbps: totalThroughputMbps,
            peakThroughputMbps: peakThroughputMbps,
            dailyTotalGb: Math.round(dailyTotalGb * 10) / 10,
            rawTotalTb: Math.round(rawTotalTb * 100) / 100,
            requiredStorageTb: requiredStorageTb,
            raidType: raidType,
            storageOverheadPct: storageOverheadPct,
            retentionDays: retentionDays,
            recordingHoursPerDay: recordingHours,
            recordingMode: recordingMode,
            motionDutyCyclePct: motionDutyCyclePct,
            groupDetails: groupDetails,
            recommendedHdd: {
                sku: selectedHdd.sku,
                model: selectedHdd.model,
                sizeTb: selectedHdd.sizeTb,
                dataDrives: netDataDrives,
                parityDrives: parityDrivesCount,
                totalDrives: totalDrivesNeeded,
                grossDriveCapacityTb: grossDriveCapacityTb,
                unitPriceUsd: selectedHdd.unitPriceUsd,
                unitPriceIdr: selectedHdd.unitPriceIdr,
                cogsUsd: selectedHdd.cogsUsd,
                marginPct: selectedHdd.marginPct
            },
            recommendedNvr: recommendedNvr,
            recommendedVms: {
                sku: vmsLicObj.sku,
                name_id: vmsLicObj.name_id,
                name_en: vmsLicObj.name_en,
                vmsBrand: vmsBrand,
                qty: totalCameras,
                unitPriceUsd: vmsLicObj.unitPriceUsd,
                unitPriceIdr: vmsLicObj.unitPriceIdr,
                cogsUsd: vmsLicObj.cogsUsd,
                marginPct: vmsLicObj.marginPct
            }
        };
    }

    /**
     * PoE Power & Industrial Network Switch Sizing
     * Menghitung konsumsi watt PoE, breakdown kelas af/at/bt, dan alokasi switch industrial.
     */
    function calcPoeAndSwitches(cameraGroups, params) {
        cameraGroups = Array.isArray(cameraGroups) ? cameraGroups : [];
        params = params || {};

        var switchReservePct = parseFloat(params.switchReservePct) || 20.0; // default 20% power headroom

        var totalCameras = 0;
        var poeBreakdown = { af: 0, at: 0, bt_type3: 0, bt_type4: 0 };
        var totalActualWatts = 0.0;
        var totalAllocatedPseWatts = 0.0;
        var btCamerasCount = 0;

        for (var i = 0; i < cameraGroups.length; i++) {
            var grp = cameraGroups[i];
            var qty = parseInt(grp.qty, 10) || 0;
            if (qty <= 0) continue;

            totalCameras += qty;
            var poeClass = grp.poeClass || "af";
            var poeWatts = parseFloat(grp.poeWatts) || 12.0;

            if (poeClass === "bt_type3" || poeClass === "bt_type4") {
                btCamerasCount += qty;
            }

            if (poeBreakdown[poeClass] !== undefined) {
                poeBreakdown[poeClass] += qty;
            } else {
                poeBreakdown.af += qty;
            }

            var pseSpec = POE_CLASSES[poeClass] || POE_CLASSES.af;
            totalActualWatts += (qty * poeWatts);
            totalAllocatedPseWatts += (qty * pseSpec.pseWatts);
        }

        totalActualWatts = Math.round(totalActualWatts * 10) / 10;
        totalAllocatedPseWatts = Math.round(totalAllocatedPseWatts * 10) / 10;

        var recommendedBudgetWatts = Math.round(totalAllocatedPseWatts * (1.0 + (switchReservePct / 100.0)));

        // Uplinks & reserve ports: 2 uplinks for NVR / Core Network + 2 spare expansion ports
        var totalPortsNeeded = totalCameras + 4;

        // Switch selection algorithm:
        // If there are high-power 802.3bt cameras (e.g. Spectra 8, PTZ 40x, Thermal),
        // we dedicate a specialized 8-Port 802.3bt Switch (480W).
        var recommendedSwitches = [];
        var standardCameraPorts = totalCameras;

        if (btCamerasCount > 0) {
            var btSwitchModel = SWITCH_MODELS.find(function (s) { return s.sku === "SW-IND-8P-BT"; });
            var btSwitchesQty = Math.max(1, Math.ceil(btCamerasCount / 8.0));
            recommendedSwitches.push({
                sku: btSwitchModel.sku,
                model: btSwitchModel.model,
                ports: btSwitchModel.ports,
                poeBudgetWatts: btSwitchModel.poeBudgetWatts,
                qty: btSwitchesQty,
                unitPriceUsd: btSwitchModel.unitPriceUsd,
                unitPriceIdr: btSwitchModel.unitPriceIdr,
                cogsUsd: btSwitchModel.cogsUsd,
                marginPct: btSwitchModel.marginPct,
                reason_id: "Khusus menyuplai daya kamera berat PTZ/Thermal 802.3bt (hingga 90W/port).",
                reason_en: "Dedicated to power heavy 802.3bt PTZ/Thermal cameras (up to 90W/port)."
            });
            standardCameraPorts = Math.max(0, totalCameras - (btSwitchesQty * 8));
        }

        if (standardCameraPorts > 0 || recommendedSwitches.length === 0) {
            var portsToCover = Math.max(standardCameraPorts, 1) + 2; // +2 uplink
            var stdSwitchModel = null;
            var stdSwitchQty = 1;

            if (portsToCover <= 8) {
                stdSwitchModel = SWITCH_MODELS.find(function (s) { return s.sku === "SW-IND-8P-POE"; });
            } else if (portsToCover <= 16) {
                stdSwitchModel = SWITCH_MODELS.find(function (s) { return s.sku === "SW-IND-16P-POE"; });
            } else if (portsToCover <= 24) {
                stdSwitchModel = SWITCH_MODELS.find(function (s) { return s.sku === "SW-IND-24P-POE"; });
            } else if (portsToCover <= 48) {
                stdSwitchModel = SWITCH_MODELS.find(function (s) { return s.sku === "SW-IND-48P-POE"; });
            } else {
                stdSwitchModel = SWITCH_MODELS.find(function (s) { return s.sku === "SW-IND-48P-POE"; });
                stdSwitchQty = Math.ceil(portsToCover / 48.0);
            }

            if (stdSwitchModel) {
                recommendedSwitches.push({
                    sku: stdSwitchModel.sku,
                    model: stdSwitchModel.model,
                    ports: stdSwitchModel.ports,
                    poeBudgetWatts: stdSwitchModel.poeBudgetWatts,
                    qty: stdSwitchQty,
                    unitPriceUsd: stdSwitchModel.unitPriceUsd,
                    unitPriceIdr: stdSwitchModel.unitPriceIdr,
                    cogsUsd: stdSwitchModel.cogsUsd,
                    marginPct: stdSwitchModel.marginPct,
                    reason_id: "Distribusi kamera standar PoE/PoE+ dengan cadangan port uplink.",
                    reason_en: "Standard PoE/PoE+ camera distribution with uplink port reserves."
                });
            }
        }

        var totalSwitchPortsProvided = 0;
        var totalSwitchBudgetProvided = 0;
        for (var s = 0; s < recommendedSwitches.length; s++) {
            totalSwitchPortsProvided += (recommendedSwitches[s].ports * recommendedSwitches[s].qty);
            totalSwitchBudgetProvided += (recommendedSwitches[s].poeBudgetWatts * recommendedSwitches[s].qty);
        }

        return {
            totalCameras: totalCameras,
            poeBreakdown: poeBreakdown,
            totalActualWatts: totalActualWatts,
            totalAllocatedPseWatts: totalAllocatedPseWatts,
            recommendedBudgetWatts: recommendedBudgetWatts,
            totalPortsNeeded: totalPortsNeeded,
            recommendedSwitches: recommendedSwitches,
            totalSwitchPortsProvided: totalSwitchPortsProvided,
            totalSwitchBudgetProvided: totalSwitchBudgetProvided,
            sparePorts: Math.max(0, totalSwitchPortsProvided - totalCameras)
        };
    }

    /**
     * Menghasilkan item BoQ lengkap untuk CCTV Surveillance yang siap di-inject ke Master BoQ CDPK.
     */
    function calcCctvBoq(cctvState, exchangeRate) {
        cctvState = cctvState || {};
        exchangeRate = parseFloat(exchangeRate) || 16000;

        var bwResult = calcBandwidthAndStorage(cctvState.cameraGroups, {
            retentionDays: cctvState.retentionDays,
            recordingHoursPerDay: cctvState.recordingHoursPerDay,
            recordingMode: cctvState.recordingMode,
            motionDutyCyclePct: cctvState.motionDutyCyclePct,
            raidType: cctvState.raidType,
            storageOverheadPct: cctvState.storageOverheadPct,
            diskSizeTb: cctvState.diskSizeTb,
            vmsBrand: cctvState.vmsBrand
        });

        var poeResult = calcPoeAndSwitches(cctvState.cameraGroups, {
            switchReservePct: cctvState.switchReservePct
        });

        var items = [];

        // 1. Camera Line Items
        var groups = bwResult.groupDetails || [];
        for (var i = 0; i < groups.length; i++) {
            var g = groups[i];
            var pUsd = g.unitPriceUsd || 0;
            var pIdr = g.unitPriceIdr || Math.round(pUsd * exchangeRate);
            var cUsd = g.cogsUsd || Math.round((pUsd * 0.75) * 100) / 100;
            var cIdr = Math.round(cUsd * exchangeRate);

            items.push({
                key: "cam_" + (g.id || i),
                sku: g.sku || ("CAM-" + (g.brand || "GEN").toUpperCase() + "-" + (g.resolution || "4MP")),
                model: g.model,
                brand: g.brand,
                name_id: (g.brandName ? g.brandName + " " : "") + g.model + " (" + g.resolution + ", " + g.codec + ", " + g.bitrateMbps + " Mbps)",
                name_en: (g.brandName ? g.brandName + " " : "") + g.model + " (" + g.resolution + ", " + g.codec + ", " + g.bitrateMbps + " Mbps)",
                qty: g.qty,
                unit: "Unit",
                unitPriceUsd: pUsd,
                unitPriceIdr: pIdr,
                cogsUsd: cUsd,
                cogsIdr: cIdr,
                marginPct: Math.max(15.0, g.marginPct || 25.0),
                category: "CCTV-SURVEILLANCE",
                subCategory: "Camera",
                notes_id: "Kamera pengawas " + g.resolution + " (" + g.fps + " fps, " + g.poeClass.toUpperCase() + " " + g.poeWatts + "W).",
                notes_en: "Surveillance camera " + g.resolution + " (" + g.fps + " fps, " + g.poeClass.toUpperCase() + " " + g.poeWatts + "W)."
            });
        }

        // 2. NVR / Server Line Item
        if (bwResult.recommendedNvr && bwResult.totalCameras > 0) {
            var nvr = bwResult.recommendedNvr;
            var nvrPUsd = nvr.unitPriceUsd || 0;
            var nvrPIdr = nvr.unitPriceIdr || Math.round(nvrPUsd * exchangeRate);
            var nvrCUsd = nvr.cogsUsd || Math.round((nvrPUsd * 0.75) * 100) / 100;
            var nvrCIdr = Math.round(nvrCUsd * exchangeRate);

            items.push({
                key: "nvr_server",
                sku: nvr.sku,
                model: nvr.model,
                brand: nvr.brand,
                name_id: nvr.model + " (Kapasitas " + nvr.bays + " Bay / " + bwResult.raidType.toUpperCase() + ")",
                name_en: nvr.model + " (Capacity " + nvr.bays + " Bays / " + bwResult.raidType.toUpperCase() + ")",
                qty: 1,
                unit: "Unit",
                unitPriceUsd: nvrPUsd,
                unitPriceIdr: nvrPIdr,
                cogsUsd: nvrCUsd,
                cogsIdr: nvrCIdr,
                marginPct: Math.max(15.0, nvr.marginPct || 25.0),
                category: "CCTV-SURVEILLANCE",
                subCategory: "NVR-Storage",
                notes_id: "Sasis NVR/Server perekam " + bwResult.totalCameras + " channel (" + bwResult.totalThroughputMbps + " Mbps throughput).",
                notes_en: "NVR/Server chassis recording " + bwResult.totalCameras + " channels (" + bwResult.totalThroughputMbps + " Mbps throughput)."
            });
        }

        // 3. Enterprise Hard Disk Drives
        if (bwResult.recommendedHdd && bwResult.recommendedHdd.totalDrives > 0 && bwResult.totalCameras > 0) {
            var hdd = bwResult.recommendedHdd;
            var hddPUsd = hdd.unitPriceUsd || 0;
            var hddPIdr = hdd.unitPriceIdr || Math.round(hddPUsd * exchangeRate);
            var hddCUsd = hdd.cogsUsd || Math.round((hddPUsd * 0.75) * 100) / 100;
            var hddCIdr = Math.round(hddCUsd * exchangeRate);

            items.push({
                key: "hdd_drives",
                sku: hdd.sku,
                model: hdd.model,
                name_id: hdd.model + " (Total " + hdd.grossDriveCapacityTb + "TB Gross / " + bwResult.retentionDays + " Hari Retensi)",
                name_en: hdd.model + " (Total " + hdd.grossDriveCapacityTb + "TB Gross / " + bwResult.retentionDays + " Days Retention)",
                qty: hdd.totalDrives,
                unit: "Pcs",
                unitPriceUsd: hddPUsd,
                unitPriceIdr: hddPIdr,
                cogsUsd: hddCUsd,
                cogsIdr: hddCIdr,
                marginPct: Math.max(15.0, hdd.marginPct || 25.0),
                category: "CCTV-SURVEILLANCE",
                subCategory: "Storage-Drive",
                notes_id: hdd.dataDrives + " drive data + " + hdd.parityDrives + " drive paritas (" + bwResult.raidType.toUpperCase() + ").",
                notes_en: hdd.dataDrives + " data drives + " + hdd.parityDrives + " parity drive (" + bwResult.raidType.toUpperCase() + ")."
            });
        }

        // 4. Industrial PoE Switches
        if (poeResult.recommendedSwitches && poeResult.totalCameras > 0) {
            for (var s = 0; s < poeResult.recommendedSwitches.length; s++) {
                var sw = poeResult.recommendedSwitches[s];
                var swPUsd = sw.unitPriceUsd || 0;
                var swPIdr = sw.unitPriceIdr || Math.round(swPUsd * exchangeRate);
                var swCUsd = sw.cogsUsd || Math.round((swPUsd * 0.75) * 100) / 100;
                var swCIdr = Math.round(swCUsd * exchangeRate);

                items.push({
                    key: "switch_" + s,
                    sku: sw.sku,
                    model: sw.model,
                    name_id: sw.model + " (" + sw.ports + "-Port / " + sw.poeBudgetWatts + "W)",
                    name_en: sw.model + " (" + sw.ports + "-Port / " + sw.poeBudgetWatts + "W)",
                    qty: sw.qty,
                    unit: "Unit",
                    unitPriceUsd: swPUsd,
                    unitPriceIdr: swPIdr,
                    cogsUsd: swCUsd,
                    cogsIdr: swCIdr,
                    marginPct: Math.max(15.0, sw.marginPct || 25.0),
                    category: "CCTV-SURVEILLANCE",
                    subCategory: "Network-Switch",
                    notes_id: sw.reason_id,
                    notes_en: sw.reason_en
                });
            }
        }

        // 5. VMS Software Channel Licenses
        if (bwResult.recommendedVms && bwResult.totalCameras > 0) {
            var vms = bwResult.recommendedVms;
            var vmsPUsd = vms.unitPriceUsd || 0;
            var vmsPIdr = vms.unitPriceIdr || Math.round(vmsPUsd * exchangeRate);
            var vmsCUsd = vms.cogsUsd || Math.round((vmsPUsd * 0.75) * 100) / 100;
            var vmsCIdr = Math.round(vmsCUsd * exchangeRate);

            items.push({
                key: "vms_licenses",
                sku: vms.sku,
                model: vms.name_en,
                name_id: vms.name_id,
                name_en: vms.name_en,
                qty: vms.qty,
                unit: "Channel",
                unitPriceUsd: vmsPUsd,
                unitPriceIdr: vmsPIdr,
                cogsUsd: vmsCUsd,
                cogsIdr: vmsCIdr,
                marginPct: Math.max(15.0, vms.marginPct || 25.0),
                category: "CCTV-SURVEILLANCE",
                subCategory: "VMS-License",
                notes_id: "Lisensi integrasi VMS resmi untuk " + vms.qty + " kanal stream video.",
                notes_en: "Official VMS integration license for " + vms.qty + " video streaming channels."
            });
        }

        // 6. Optional Cabling & Connectors (1 roll per 4 cameras)
        if (bwResult.totalCameras > 0) {
            var cableRolls = Math.max(1, Math.ceil(bwResult.totalCameras / 4.0));
            var cablePUsd = 210;
            var cablePIdr = Math.round(cablePUsd * exchangeRate);
            var cableCUsd = 155;
            var cableCIdr = Math.round(cableCUsd * exchangeRate);

            items.push({
                key: "cable_stp_cat6",
                sku: "CBL-CAT6-STP-ROLL",
                model: "Shielded STP Cat6 Cable Roll 305m",
                name_id: "Kabel UTP/STP Cat6 Shielded Outdoor 305m (Anti-Interferensi)",
                name_en: "Outdoor Shielded STP Cat6 Cable 305m Roll (Anti-Interference)",
                qty: cableRolls,
                unit: "Roll",
                unitPriceUsd: cablePUsd,
                unitPriceIdr: cablePIdr,
                cogsUsd: cableCUsd,
                cogsIdr: cableCIdr,
                marginPct: 26.2,
                category: "CCTV-SURVEILLANCE",
                subCategory: "Accessories",
                notes_id: "Kabel jaringan berselubung PE tahan cuaca dan radiasi matahari.",
                notes_en: "Weatherproof PE-jacketed shielded cable for outdoor runs."
            });
        }

        // 7. System Accessories & Integrations (AI Appliance, PoE Extenders, Fiber Media Converters, 3rd-Party Licenses)
        var acc = cctvState.accessories || {};
        var accCatalog = ACCESSORIES || [];
        function findAcc(sku) {
            for (var a = 0; a < accCatalog.length; a++) {
                if (accCatalog[a].sku === sku) return accCatalog[a];
            }
            return null;
        }

        if (acc.aiApplianceQty > 0) {
            var aia = findAcc("AVG-AI-APPLIANCE-8P");
            if (aia) {
                var aiaPUsd = aia.unitPriceUsd || 0;
                var aiaPIdr = aia.unitPriceIdr || Math.round(aiaPUsd * exchangeRate);
                var aiaCUsd = aia.cogsUsd || Math.round((aiaPUsd * 0.75) * 100) / 100;
                var aiaCIdr = Math.round(aiaCUsd * exchangeRate);
                items.push({
                    key: "acc_ai_appliance",
                    sku: aia.sku,
                    model: aia.model,
                    name_id: aia.model + " (Akselerasi AI Kamera Third-Party)",
                    name_en: aia.model + " (AI Acceleration for Third-Party Cameras)",
                    qty: parseInt(acc.aiApplianceQty, 10),
                    unit: "Unit",
                    unitPriceUsd: aiaPUsd,
                    unitPriceIdr: aiaPIdr,
                    cogsUsd: aiaCUsd,
                    cogsIdr: aiaCIdr,
                    marginPct: Math.max(15.0, aia.marginPct || 25.0),
                    category: "CCTV-SURVEILLANCE",
                    subCategory: "AI-Analytics",
                    notes_id: aia.desc_id,
                    notes_en: aia.desc_en
                });
            }
        }

        if (acc.extenderQty > 0) {
            var ext = findAcc("EXT-POE-IND-250M");
            if (ext) {
                var extPUsd = ext.unitPriceUsd || 0;
                var extPIdr = ext.unitPriceIdr || Math.round(extPUsd * exchangeRate);
                var extCUsd = ext.cogsUsd || Math.round((extPUsd * 0.75) * 100) / 100;
                var extCIdr = Math.round(extCUsd * exchangeRate);
                items.push({
                    key: "acc_poe_extender",
                    sku: ext.sku,
                    model: ext.model,
                    name_id: ext.model,
                    name_en: ext.model,
                    qty: parseInt(acc.extenderQty, 10),
                    unit: "Unit",
                    unitPriceUsd: extPUsd,
                    unitPriceIdr: extPIdr,
                    cogsUsd: extCUsd,
                    cogsIdr: extCIdr,
                    marginPct: Math.max(15.0, ext.marginPct || 25.0),
                    category: "CCTV-SURVEILLANCE",
                    subCategory: "Accessories",
                    notes_id: ext.desc_id,
                    notes_en: ext.desc_en
                });
            }
        }

        if (acc.fmcQty > 0) {
            var fmc = findAcc("FMC-IND-POE-SFP");
            if (fmc) {
                var fmcPUsd = fmc.unitPriceUsd || 0;
                var fmcPIdr = fmc.unitPriceIdr || Math.round(fmcPUsd * exchangeRate);
                var fmcCUsd = fmc.cogsUsd || Math.round((fmcPUsd * 0.75) * 100) / 100;
                var fmcCIdr = Math.round(fmcCUsd * exchangeRate);
                items.push({
                    key: "acc_fmc_poe",
                    sku: fmc.sku,
                    model: fmc.model,
                    name_id: fmc.model,
                    name_en: fmc.model,
                    qty: parseInt(acc.fmcQty, 10),
                    unit: "Unit",
                    unitPriceUsd: fmcPUsd,
                    unitPriceIdr: fmcPIdr,
                    cogsUsd: fmcCUsd,
                    cogsIdr: fmcCIdr,
                    marginPct: Math.max(15.0, fmc.marginPct || 25.0),
                    category: "CCTV-SURVEILLANCE",
                    subCategory: "Accessories",
                    notes_id: fmc.desc_id,
                    notes_en: fmc.desc_en
                });
            }
        }

        if (acc.thirdPartyLicenseQty > 0) {
            var licSku = (cctvState.vmsBrand === "avigilon_unity") ? "AVG-COMM-CAM-LIC" : "PEL-VX-1C-COMM";
            var lic = findAcc(licSku);
            if (lic) {
                var licPUsd = lic.unitPriceUsd || 0;
                var licPIdr = lic.unitPriceIdr || Math.round(licPUsd * exchangeRate);
                var licCUsd = lic.cogsUsd || Math.round((licPUsd * 0.75) * 100) / 100;
                var licCIdr = Math.round(licCUsd * exchangeRate);
                items.push({
                    key: "acc_third_party_license",
                    sku: lic.sku,
                    model: lic.model,
                    name_id: lic.model,
                    name_en: lic.model,
                    qty: parseInt(acc.thirdPartyLicenseQty, 10),
                    unit: "Channel",
                    unitPriceUsd: licPUsd,
                    unitPriceIdr: licPIdr,
                    cogsUsd: licCUsd,
                    cogsIdr: licCIdr,
                    marginPct: Math.max(15.0, lic.marginPct || 25.0),
                    category: "CCTV-SURVEILLANCE",
                    subCategory: "VMS-License",
                    notes_id: lic.desc_id,
                    notes_en: lic.desc_en
                });
            }
        }

        // Totals Calculation
        var subtotalUsd = 0;
        var subtotalIdr = 0;
        var totalCogsUsd = 0;
        var totalCogsIdr = 0;

        for (var t = 0; t < items.length; t++) {
            var it = items[t];
            var linePriceUsd = it.unitPriceUsd * it.qty;
            var linePriceIdr = it.unitPriceIdr * it.qty;
            var lineCogsUsd = it.cogsUsd * it.qty;
            var lineCogsIdr = it.cogsIdr * it.qty;

            subtotalUsd += linePriceUsd;
            subtotalIdr += linePriceIdr;
            totalCogsUsd += lineCogsUsd;
            totalCogsIdr += lineCogsIdr;
        }

        var grossProfitUsd = subtotalUsd - totalCogsUsd;
        var grossProfitIdr = subtotalIdr - totalCogsIdr;
        var overallMarginPct = subtotalUsd > 0 ? (grossProfitUsd / subtotalUsd) * 100.0 : 0.0;

        return {
            items: items,
            totals: {
                totalCameras: bwResult.totalCameras,
                subtotalUsd: Math.round(subtotalUsd * 100) / 100,
                subtotalIdr: Math.round(subtotalIdr),
                totalCogsUsd: Math.round(totalCogsUsd * 100) / 100,
                totalCogsIdr: Math.round(totalCogsIdr),
                grossProfitUsd: Math.round(grossProfitUsd * 100) / 100,
                grossProfitIdr: Math.round(grossProfitIdr),
                marginPct: Math.round(overallMarginPct * 10) / 10
            },
            bwResult: bwResult,
            poeResult: poeResult
        };
    }

    /**
     * Ekspor CSV Ringkasan BoQ dan Kalkulasi CCTV
     */
    function exportCctvCsv(cctvState, boqResult, lang) {
        lang = lang || "id";
        var isEn = lang === "en";
        var lines = [];

        lines.push(isEn ? "CDPK SYSTEM PLANNER - CCTV SURVEILLANCE & NVR SIZING REPORT" : "CDPK SYSTEM PLANNER - LAPORAN SIZING CCTV SURVEILLANCE & NVR");
        lines.push(isEn ? "Version,8.6.0" : "Versi,8.6.0");
        lines.push(isEn ? "Generated," + new Date().toISOString() : "Waktu Pembuatan," + new Date().toISOString());
        lines.push("");

        var bw = boqResult.bwResult || {};
        var poe = boqResult.poeResult || {};

        lines.push(isEn ? "--- TECHNICAL SIZING SUMMARY ---" : "--- RINGKASAN TEKNIS SIZING ---");
        lines.push((isEn ? "Total Cameras," : "Total Kamera,") + (bw.totalCameras || 0));
        lines.push((isEn ? "Total Network Throughput (Mbps)," : "Total Throughput Jaringan (Mbps),") + (bw.totalThroughputMbps || 0));
        lines.push((isEn ? "Peak Network Bandwidth (Mbps)," : "Peak Bandwidth (+20%) (Mbps),") + (bw.peakThroughputMbps || 0));
        lines.push((isEn ? "Daily Data Volume (GB/day)," : "Volume Data Harian (GB/hari),") + (bw.dailyTotalGb || 0));
        lines.push((isEn ? "Retention Period (Days)," : "Masa Retensi (Hari),") + (bw.retentionDays || 30));
        lines.push((isEn ? "Raw Net Storage (TB)," : "Kapasitas Bersih (TB),") + (bw.rawTotalTb || 0));
        lines.push((isEn ? "Required Storage with RAID & Safety (TB)," : "Total Storage Diperlukan (TB),") + (bw.requiredStorageTb || 0));
        lines.push((isEn ? "RAID Configuration," : "Konfigurasi RAID,") + (bw.raidType || "RAID 5").toUpperCase());
        lines.push((isEn ? "Hard Drive Model," : "Tipe Hard Disk,") + (bw.recommendedHdd ? bw.recommendedHdd.model : "-"));
        lines.push((isEn ? "Hard Drives Quantity," : "Jumlah Hard Disk,") + (bw.recommendedHdd ? bw.recommendedHdd.totalDrives : 0));
        lines.push((isEn ? "Total PoE Power Demand (Watts)," : "Total Beban Daya PoE (Watt),") + (poe.totalAllocatedPseWatts || 0));
        lines.push((isEn ? "Recommended Switch Power Budget (Watts)," : "Rekomendasi Power Budget Switch (Watt),") + (poe.recommendedBudgetWatts || 0));
        lines.push("");

        lines.push(isEn ? "--- BILL OF QUANTITIES (BoQ) ---" : "--- BILL OF QUANTITIES (BoQ) CCTV ---");
        lines.push(isEn
            ? "SKU,Item Description,Category,Qty,Unit,Unit Price USD,Unit Price IDR,Total USD,Total IDR,Margin %"
            : "SKU,Deskripsi Item,Kategori,Kuantitas,Satuan,Harga Satuan USD,Harga Satuan IDR,Total USD,Total IDR,Margin %");

        var items = boqResult.items || [];
        for (var i = 0; i < items.length; i++) {
            var it = items[i];
            var name = isEn ? (it.name_en || it.name_id) : (it.name_id || it.name_en);
            var totUsd = it.unitPriceUsd * it.qty;
            var totIdr = it.unitPriceIdr * it.qty;
            lines.push([
                '"' + (it.sku || "") + '"',
                '"' + (name || "").replace(/"/g, '""') + '"',
                '"' + (it.category || "") + '"',
                it.qty,
                '"' + (it.unit || "Unit") + '"',
                it.unitPriceUsd,
                it.unitPriceIdr,
                totUsd,
                totIdr,
                it.marginPct + "%"
            ].join(","));
        }

        var csvContent = lines.join("\r\n");
        if (typeof window !== "undefined" && typeof document !== "undefined") {
            var blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
            var url = URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = url;
            a.download = "CDPK_CCTV_Sizing_BoQ_" + Date.now().toString(36) + ".csv";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
        return csvContent;
    }

    /**
     * Menghasilkan teks ringkasan eksekutif untuk proposal atau clipboard
     */
    function generateSummaryText(cctvState, boqResult, lang) {
        lang = lang || "id";
        var isEn = lang === "en";
        var bw = boqResult.bwResult || {};
        var poe = boqResult.poeResult || {};
        var tot = boqResult.totals || {};

        var text = "";
        if (isEn) {
            text += "========================================================\n";
            text += " CDPK SYSTEM PLANNER - CCTV SURVEILLANCE & NVR SUMMARY\n";
            text += "========================================================\n\n";
            text += "1. CAMERA DEPLOYMENT ARCHITECTURE:\n";
            text += "   - Total Camera Channels: " + bw.totalCameras + " Units\n";
            text += "   - Network Throughput (Continuous): " + bw.totalThroughputMbps + " Mbps\n";
            text += "   - Peak Bandwidth (+20% Headroom): " + bw.peakThroughputMbps + " Mbps\n";
            text += "   - Daily Storage Ingestion: " + bw.dailyTotalGb + " GB / day\n\n";
            text += "2. STORAGE & NVR SIZING:\n";
            text += "   - Target Retention Period: " + bw.retentionDays + " Days\n";
            text += "   - Net Raw Storage: " + bw.rawTotalTb + " TB\n";
            text += "   - Total Required Capacity: " + bw.requiredStorageTb + " TB (" + (bw.raidType || "RAID 5").toUpperCase() + " + 20% Overhead)\n";
            text += "   - Enterprise HDDs: " + (bw.recommendedHdd ? bw.recommendedHdd.totalDrives + "x " + bw.recommendedHdd.model : "-") + "\n";
            text += "   - Recording NVR Chassis: " + (bw.recommendedNvr ? bw.recommendedNvr.model : "-") + "\n\n";
            text += "3. POE POWER & SWITCH SIZING:\n";
            text += "   - Total PoE PSE Demand: " + poe.totalAllocatedPseWatts + " Watts\n";
            text += "   - Recommended Switch Power Budget: " + poe.recommendedBudgetWatts + " Watts\n";
            text += "   - PoE Class Breakdown: af (" + poe.poeBreakdown.af + "), at (" + poe.poeBreakdown.at + "), bt3 (" + poe.poeBreakdown.bt_type3 + "), bt4 (" + poe.poeBreakdown.bt_type4 + ")\n";
            text += "   - Recommended Switches: " + (poe.recommendedSwitches ? poe.recommendedSwitches.map(function (s) { return s.qty + "x " + s.model; }).join(" + ") : "-") + "\n\n";
            text += "4. COMMERCIAL ESTIMATION:\n";
            text += "   - Estimated Total: USD " + tot.subtotalUsd.toLocaleString() + " (IDR " + tot.subtotalIdr.toLocaleString() + ")\n";
            text += "   - Overall Gross Margin: " + tot.marginPct + "% (Compliant with CDPK Guardrail >= 15%)\n";
            text += "========================================================\n";
        } else {
            text += "========================================================\n";
            text += " CDPK SYSTEM PLANNER - RINGKASAN CCTV SURVEILLANCE & NVR\n";
            text += "========================================================\n\n";
            text += "1. ARSITEKTUR PENEMPATAN KAMERA:\n";
            text += "   - Total Kamera Terpasang: " + bw.totalCameras + " Titik\n";
            text += "   - Throughput Jaringan (Kontinu): " + bw.totalThroughputMbps + " Mbps\n";
            text += "   - Peak Bandwidth (+20% Cadangan): " + bw.peakThroughputMbps + " Mbps\n";
            text += "   - Volume Data Harian: " + bw.dailyTotalGb + " GB / hari\n\n";
            text += "2. SIZING STORAGE & NVR:\n";
            text += "   - Target Masa Retensi: " + bw.retentionDays + " Hari\n";
            text += "   - Kapasitas Bersih (Raw): " + bw.rawTotalTb + " TB\n";
            text += "   - Total Storage Dibutuhkan: " + bw.requiredStorageTb + " TB (" + (bw.raidType || "RAID 5").toUpperCase() + " + 20% Overhead Safety)\n";
            text += "   - Hard Disk Enterprise: " + (bw.recommendedHdd ? bw.recommendedHdd.totalDrives + "x " + bw.recommendedHdd.model : "-") + "\n";
            text += "   - Sasis Server / NVR: " + (bw.recommendedNvr ? bw.recommendedNvr.model : "-") + "\n\n";
            text += "3. DAYA POE & SIZING SWITCH:\n";
            text += "   - Total Beban PoE Kamera: " + poe.totalAllocatedPseWatts + " Watt\n";
            text += "   - Rekomendasi Power Budget Switch: " + poe.recommendedBudgetWatts + " Watt\n";
            text += "   - Rincian Kelas PoE: af (" + poe.poeBreakdown.af + "), at (" + poe.poeBreakdown.at + "), bt3 (" + poe.poeBreakdown.bt_type3 + "), bt4 (" + poe.poeBreakdown.bt_type4 + ")\n";
            text += "   - Rekomendasi Switch Industrial: " + (poe.recommendedSwitches ? poe.recommendedSwitches.map(function (s) { return s.qty + "x " + s.model; }).join(" + ") : "-") + "\n\n";
            text += "4. ESTIMASI KOMERSIAL:\n";
            text += "   - Estimasi Subtotal: IDR " + tot.subtotalIdr.toLocaleString() + " (USD " + tot.subtotalUsd.toLocaleString() + ")\n";
            text += "   - Margin Keuntungan Kotor: " + tot.marginPct + "% (Memenuhi Guardrail CDPK >= 15%)\n";
            text += "========================================================\n";
        }
        return text;
    }

    /* =========================================================================
     * 5. EXPOSE GLOBAL WINDOW & MODULE OBJECT
     * ========================================================================= */

    var CDPK_CCTV_ENGINE = {
        version: VERSION,
        i18n: I18N,
        brands: BRANDS,
        resolutions: RESOLUTIONS,
        codecs: CODECS,
        sceneMotions: SCENE_MOTIONS,
        poeClasses: POE_CLASSES,
        presets: PRESETS,
        nvrModels: NVR_MODELS,
        hddModels: HDD_MODELS,
        switchModels: SWITCH_MODELS,
        vmsLicenses: VMS_LICENSES,
        sensorFormats: SENSOR_FORMATS,
        doriStandards: DORI_STANDARDS,
        accessories: ACCESSORIES,

        // Calculation API
        calcBitrate: calcBitrate,
        calcBandwidthAndStorage: calcBandwidthAndStorage,
        calcPoeAndSwitches: calcPoeAndSwitches,
        calcDori: calcDori,
        calcCableDrop: calcCableDrop,
        auditInteroperability: auditInteroperability,
        calcCctvBoq: calcCctvBoq,
        exportCctvCsv: exportCctvCsv,
        generateSummaryText: generateSummaryText
    };

    if (typeof window !== "undefined") {
        window.CDPK_CCTV_ENGINE = CDPK_CCTV_ENGINE;
    }
    if (typeof module !== "undefined" && module.exports) {
        module.exports = CDPK_CCTV_ENGINE;
    }
})(typeof window !== "undefined" ? window : this);
