// Main Alpine.js Application Controller for CDPK System Planner
window.cdpkSystemPlannerApp = function () {
    return {
        // ─── Global UI & Bilingual State ─────────────────────────────────
        lang: localStorage.getItem('cdpk_lang') || 'id',
        activeTab: 'sizing', // 'sizing' | 'boq' | 'catalog' | 'mandays' | 'coverage'
        aiModalOpen: false,

        // ─── Cloud Sync State (Google Drive & Master Pricelist) ──────────
        syncStatus: 'ok',
        syncSource: 'google_drive_live',
        lastSyncTime: '',
        isSyncing: false,
        driveFolderId: '1OB_UaNyd65Ccb3lmdwJuw5raufCwhgbS',
        masterSheetId: '1Kp85v81JXeRC5ti-ZXYBChgrj2ztnnwrCHokI02LX6U',
        folderFiles: [],

        // ─── Knowledge Bank Data (Loaded from /api/knowledge) ────────────
        productsCatalog: [],
        systemBundles: [],
        industryParams: [],
        commercialConfig: {
            usd_to_idr: 16200,
            ppn_percent: 11,
            default_margin_percent: 0,
            default_discount_percent: 0,
            mandays_rate_idr: 3500000
        },

        // ─── Project Metadata ────────────────────────────────────────────
        projName: 'Modernisasi Sistem Komunikasi Radio DMR & Keamanan',
        clientName: 'PT Nusantara Energi & Pertambangan',
        projLocation: 'Kalimantan Timur, Indonesia',
        salesPic: 'Presales Engineering Team — CDPK',

        // ─── Module 1: Sizing Inputs ─────────────────────────────────────
        industry: 'mining',
        areaInput: 35,
        areaUnit: 'km2', // 'km2' | 'ha'
        userCount: 120,
        terrain: 'hilly', // 'flat' | 'hilly' | 'mountainous' | 'dense' | 'indoor' | 'mixed_inout'
        freqBand: 'uhf', // 'vhf' | 'uhf' | '800'
        towerHeight: 35,
        buildingFloors: 4,
        powerSource: 'pln_ups', // 'pln_ups' | 'solar' | 'genset_ups'
        backupHours: 8,
        backhaul: 'fiber', // 'fiber' | 'radio_ip' | 'starlink'
        needAtex: false,
        needEncryption: false,
        needGps: true,
        needManDown: true,
        needDispatch: true,
        needCctv: false,
        cctvCount: 8,
        activeTechSlide: 0,

        // ─── Module 2: BoQ & System Pricing Configurator State ───────────
        exportMode: 'commercial', // 'commercial' | 'technical'
        currency: 'IDR', // 'IDR' | 'USD'
        exchangeRate: 16200,
        discountPercent: 0,
        marginPercent: 0,
        ppnPercent: 11,
        includeMandaysInBoq: true,
        mandaysRateIdr: 3500000,
        boqItems: [],
        selectedBundleToAdd: 'SYS-RPT-SLR5300-OUTDOOR',
        selectedProductSkuToAdd: 'MOT-HT-R7',

        // ─── Module 3: Catalog & Smart Search State ──────────────────────
        catSearchQuery: '',
        catSelectedCategory: 'ALL',

        // ─── Module 4: Mandays Estimator (WES) State ─────────────────────
        mdTeamSize: 3,
        mdSiteComplexity: 'medium', // 'low' | 'medium' | 'high'
        mdCustomAdjustment: 0,

        // ─── Module 5: RF Coverage Simulation State ──────────────────────
        covSearchLocation: 'Balikpapan, Kalimantan Timur',
        covLat: -1.2379,
        covLon: 116.8529,
        covTxWatts: 50,
        covAntGainDbi: 6.5,
        covCableLossDb: 2.1,
        covMetrics: { strongPct: 68, fairPct: 24, weakPct: 8, deadZones: [] },

        // ─── Module 6: Multi-Model AI Copilot State ──────────────────────
        aiModel: 'gemini-3.8-flash', // Exclusively 'gemini-3.8-flash' | 'gemini-3.8-pro'
        aiPrompt: '',
        aiApiKey: localStorage.getItem('cdpk_gemini_key') || '',
        aiLoading: false,
        aiHistory: [],
        lastExtractedParams: null,

        // ─── Lifecycle Init ──────────────────────────────────────────────
        async init() {
            await this.loadCloudKnowledge(false);
            this.syncBoqFromSizing();
            this.$nextTick(() => {
                this.runCoverageSimulation();
            });
        },

        t(key) {
            const dict = window.CDPK_I18N[this.lang] || window.CDPK_I18N.id;
            return dict[key] || key;
        },

        setLang(newLang) {
            this.lang = newLang;
            localStorage.setItem('cdpk_lang', newLang);
            // Update localized bundle/item names in BoQ while keeping user edits
            this.boqItems.forEach((it) => {
                if (it.name_id && it.name_en) {
                    it.name = newLang === 'en' ? it.name_en : it.name_id;
                }
                if (it.notes_id && it.notes_en) {
                    it.notes = newLang === 'en' ? it.notes_en : it.notes_id;
                }
            });
        },

        // ─── Google Drive & Master Pricelist Sync ────────────────────────
        async loadCloudKnowledge(force = false) {
            this.isSyncing = true;
            try {
                const url = force ? '/api/pricing/sync' : '/api/knowledge';
                const opts = force
                    ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ spreadsheet_id: this.masterSheetId, folder_id: this.driveFolderId }) }
                    : { method: 'GET' };
                const resp = await fetch(url, opts);
                const data = await resp.json();
                if (data && data.knowledge) {
                    const k = data.knowledge;
                    this.productsCatalog = k.products_catalog || [];
                    this.systemBundles = k.system_bundles || [];
                    this.industryParams = k.industry_rf_params || [];
                    this.commercialConfig = k.commercial_config || this.commercialConfig;
                    this.exchangeRate = Number(this.commercialConfig.usd_to_idr || 16200);
                    this.ppnPercent = Number(this.commercialConfig.ppn_percent || 11);
                    this.mandaysRateIdr = Number(this.commercialConfig.mandays_rate_idr || 3500000);
                    this.syncStatus = data.status || 'ok';
                    this.syncSource = data.source || 'google_drive_live';
                    this.lastSyncTime = data.last_sync ? new Date(data.last_sync).toLocaleTimeString() : new Date().toLocaleTimeString();
                    this.folderFiles = data.folder_files || [];
                }
            } catch (e) {
                console.warn('Knowledge sync fallback:', e);
                this.syncStatus = 'fallback';
            } finally {
                this.isSyncing = false;
            }
        },

        async syncCloudPricelistNow() {
            await this.loadCloudKnowledge(true);
            // Refresh prices in current BoQ items from newly synced catalog
            const skuMap = {};
            this.productsCatalog.forEach(p => { skuMap[p.sku] = p; });
            this.boqItems.forEach((item) => {
                if (item.isBundle && Array.isArray(item.children)) {
                    item.children.forEach((sub) => {
                        if (skuMap[sub.sku]) {
                            sub.price_idr = skuMap[sub.sku].price_idr;
                            sub.price_usd = skuMap[sub.sku].price_usd;
                        }
                    });
                } else if (skuMap[item.sku]) {
                    item.price_idr = skuMap[item.sku].price_idr;
                    item.price_usd = skuMap[item.sku].price_usd;
                }
            });
        },

        findProductBySku(sku) {
            return this.productsCatalog.find(p => p.sku === sku) || null;
        },

        // ─── Module 1: Sizing Engine Computed Result ─────────────────────
        get sizingResult() {
            const isEn = this.lang === 'en';
            const areaKm2 = this.areaUnit === 'ha' ? (Number(this.areaInput || 1) / 100.0) : Number(this.areaInput || 1);
            const users = Math.max(1, parseInt(this.userCount || 1, 10));
            const floors = Math.max(1, parseInt(this.buildingFloors || 1, 10));
            const towerM = Math.max(5, parseInt(this.towerHeight || 30, 10));

            const indObj = this.industryParams.find(i => i.key === this.industry) || {
                key: 'mining',
                label_id: 'Pertambangan (Mining)',
                label_en: 'Mining & Quarrying',
                vhf_radius_km: 18,
                uhf_radius_km: 12,
                '800_radius_km': 9,
                call_rate: 0.35,
                terrain_factor: 1.30,
                ht_primary_sku: 'MOT-HT-R7',
                mobile_sku: 'MOT-MB-M8600I'
            };

            const baseR = this.freqBand === 'vhf'
                ? Number(indObj.vhf_radius_km || 16)
                : (this.freqBand === '800' ? Number(indObj['800_radius_km'] || 8.5) : Number(indObj.uhf_radius_km || 11.5));

            const terrainFactors = {
                flat: 1.0,
                hilly: 1.35,
                mountainous: 1.75,
                dense: 1.45,
                indoor: 2.30,
                mixed_inout: 1.60
            };
            const tMult = terrainFactors[this.terrain] || 1.30;
            const heightGain = Math.pow(towerM / 30.0, 0.32);
            const effRadiusKm = Math.max(1.0, (baseR / tMult) * heightGain);

            // Effective hexagonal cell footprint with 25% overlap
            const cellAreaKm2 = Math.PI * Math.pow(effRadiusKm, 2) * 0.75;

            let outdoorSites = 1;
            let dasNodes = 0;

            if (this.terrain === 'indoor') {
                outdoorSites = 0;
                dasNodes = Math.max(1, Math.ceil(floors / 4.0));
            } else if (this.terrain === 'mixed_inout') {
                const outdoorArea = Math.max(0.5, areaKm2 * 0.75);
                outdoorSites = Math.max(1, Math.ceil(outdoorArea / Math.max(0.5, cellAreaKm2)));
                dasNodes = Math.max(1, Math.ceil(floors / 4.0));
            } else {
                outdoorSites = Math.max(1, Math.ceil(areaKm2 / Math.max(0.5, cellAreaKm2)));
                dasNodes = 0;
            }

            // Capacity & TDMA calculation
            const requiredChannels = Math.max(1, Math.ceil(users / 35.0));
            const rptPerSite = Math.max(1, Math.ceil(requiredChannels / 2.0));
            const totalOutdoorRepeaters = outdoorSites * rptPerSite;
            const totalTimeSlots = (totalOutdoorRepeaters + dasNodes) * 2;

            // Topology Decision Matrix
            const effectiveSiteCount = Math.max(1, outdoorSites + (dasNodes > 0 && outdoorSites === 0 ? 1 : 0));
            let topologyKey = 'conventional';
            let topologyName = isEn ? 'Conventional DMR (Single-Site)' : 'DMR Konvensional (Single-Site)';
            if (effectiveSiteCount === 1 && rptPerSite === 1) {
                topologyKey = 'conventional';
                topologyName = isEn ? 'Conventional DMR Single-Site (2 TDMA Slots)' : 'DMR Konvensional Single-Site (2 Slot TDMA)';
            } else if (effectiveSiteCount === 1 && rptPerSite > 1) {
                topologyKey = 'cap_plus';
                topologyName = 'MOTOTRBO Capacity Plus (Single-Site Trunking)';
            } else if (effectiveSiteCount > 1 && rptPerSite === 1 && users <= 120) {
                topologyKey = 'ipsc';
                topologyName = 'MOTOTRBO IP Site Connect (Multi-Site Roaming)';
            } else if (effectiveSiteCount <= 15 && users <= 1500) {
                topologyKey = 'lcp';
                topologyName = 'MOTOTRBO Linked Capacity Plus (Multi-Site Trunking)';
            } else {
                topologyKey = 'connect_plus';
                topologyName = 'MOTOTRBO Connect Plus / Capacity Max (Enterprise Trunking)';
            }

            // Standardized Repeater Selection (MOTOTRBO SLR 5300 / SLR 8000 / SLR 1000)
            const useHighPower100W = (areaKm2 >= 150 && (this.industry === 'mining' || this.industry === 'palm_oil'));
            const primaryRepeaterSku = this.terrain === 'indoor'
                ? 'MOT-RPT-SLR1000'
                : (useHighPower100W ? 'MOT-RPT-SLR8000' : 'MOT-RPT-SLR5300');
            const primaryRepeaterModel = this.terrain === 'indoor'
                ? 'MOTOTRBO SLR 1000 (10W IP65 DAS)'
                : (useHighPower100W ? 'MOTOTRBO SLR 8000 (100W High-Power)' : 'MOTOTRBO SLR 5300 (50W Continuous)');

            // Dynamic Subscriber Radio Selection & Auto-Allocation (85% HT / 15% Mobile)
            let htSku = indObj.ht_primary_sku || 'MOT-HT-R7';
            if (this.needAtex || this.industry === 'oil_gas') {
                htSku = 'MOT-HT-P8600EX';
            }
            const htProd = this.findProductBySku(htSku);
            const recommendedHtModel = htProd ? htProd.model : (this.needAtex ? 'XiR P8600 Ex Series' : 'MOTOTRBO R7');

            const mobSku = this.freqBand === '800' ? 'MOT-MB-M8668I-800' : (indObj.mobile_sku || 'MOT-MB-M8600I');
            const mobProd = this.findProductBySku(mobSku);
            const recommendedMobileModel = mobProd ? mobProd.model : 'MOTOTRBO XiR M8600i Series';

            const htQty = Math.ceil(users * 0.85);
            const mobileQty = Math.max(0, users - htQty);

            // Power, UPS & Solar Sizing
            const rptWattsEach = useHighPower100W ? 240 : 145;
            const sitePowerWatts = (rptPerSite * rptWattsEach) + 55; // +55W router/switch/sensors
            const upsRecommendedVA = sitePowerWatts <= 450 ? 1500 : 3000;
            const backupH = Math.max(2, Number(this.backupHours || 8));
            const batteryAh = Math.ceil((sitePowerWatts * backupH) / (12.0 * 0.80));
            const solarWp = Math.ceil((sitePowerWatts * 24) / (4.2 * 0.75));
            const coaxMetersPerSite = towerM + 15;
            const bandwidthKbps = effectiveSiteCount * rptPerSite * 75;

            const terrainLabels = {
                flat: this.t('terrainFlat'),
                hilly: this.t('terrainHilly'),
                mountainous: this.t('terrainMountain'),
                dense: this.t('terrainDense'),
                indoor: this.t('terrainIndoor'),
                mixed_inout: this.t('terrainMixed')
            };

            const resObj = {
                areaKm2,
                userCount: users,
                freqBand: this.freqBand,
                towerHeight: towerM,
                industryLabel: isEn ? (indObj.label_en || indObj.label_id) : indObj.label_id,
                terrainLabel: terrainLabels[this.terrain] || this.terrain,
                effRadiusKm,
                outdoorSites,
                rptPerSite,
                totalOutdoorRepeaters,
                dasNodes,
                requiredChannels,
                totalTimeSlots,
                topologyKey,
                topologyName,
                useHighPower100W,
                primaryRepeaterSku,
                primaryRepeaterModel,
                htSku,
                recommendedHtModel,
                mobSku,
                recommendedMobileModel,
                htQty,
                mobileQty,
                sitePowerWatts,
                upsRecommendedVA,
                backupHours: backupH,
                batteryAh,
                solarWp,
                powerSource: this.powerSource,
                coaxMetersPerSite,
                backhaul: this.backhaul,
                bandwidthKbps,
                needAtex: this.needAtex || this.industry === 'oil_gas'
            };

            resObj.techSlides = window.CDPK_ENGINES.generateTechAnalysisSlides(resObj, this.lang);
            resObj.topoSvg = window.CDPK_ENGINES.buildTopoSVG(topologyName, Math.max(1, outdoorSites), rptPerSite, this.backhaul, dasNodes, this.lang);
            resObj.covSvg = window.CDPK_ENGINES.buildCovSVG(effRadiusKm, Math.max(1, outdoorSites), areaKm2, this.freqBand, this.terrain, this.lang);
            return resObj;
        },

        // ─── Module 2: Auto-Populate BoQ with Composite System Bundles ───
        buildBundleRow(bundleId, qty, customTowerHeight) {
            const b = this.systemBundles.find(x => x.bundle_id === bundleId);
            const isEn = this.lang === 'en';
            const towerH = customTowerHeight || Number(this.towerHeight || 35);
            if (!b) return null;

            const children = (b.components || []).map((comp) => {
                const prod = this.findProductBySku(comp.sku) || {};
                // Evaluate dynamic quantity formula (e.g. "tower_height + 15")
                let subQty = Number(comp.default_qty || 1);
                if (String(comp.qty_formula || '').includes('tower_height')) {
                    subQty = towerH + 15;
                }
                // Match antenna to selected frequency band automatically
                let effSku = comp.sku;
                let effModel = prod.model || comp.sku;
                if (comp.sku.startsWith('AVT-ANT-AVO')) {
                    if (this.freqBand === 'vhf') {
                        effSku = 'AVT-ANT-AVO350';
                    } else if (this.freqBand === '800') {
                        effSku = 'AVT-ANT-AVO900';
                    } else {
                        effSku = 'AVT-ANT-AVO400';
                    }
                    const bandAnt = this.findProductBySku(effSku);
                    if (bandAnt) effModel = bandAnt.model;
                }
                const finalProd = this.findProductBySku(effSku) || prod;
                return {
                    sku: effSku,
                    model: effModel,
                    role_id: comp.role_id,
                    role_en: comp.role_en,
                    unit: finalProd.unit || 'Unit',
                    qtyPerBundle: subQty,
                    price_idr: Number(finalProd.price_idr || 0),
                    price_usd: Number(finalProd.price_usd || 0),
                    mandatory: comp.mandatory !== false,
                    enabled: true
                };
            });

            return {
                id: 'boq-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
                isBundle: true,
                expanded: false,
                bundle_id: b.bundle_id,
                category: b.category || 'Repeater System',
                sku: b.bundle_id,
                name_id: b.name_id,
                name_en: b.name_en,
                name: isEn ? b.name_en : b.name_id,
                qty: Math.max(1, qty),
                unit: 'Set Sistem',
                price_idr: 0, // Dynamically summed from active children
                price_usd: 0,
                notes_id: `Paket sistem lengkap siap operasi (${children.length} sub-komponen BOM)`,
                notes_en: `Complete turnkey system package (${children.length} BOM sub-components)`,
                notes: isEn
                    ? `Complete turnkey system package (${children.length} BOM sub-components)`
                    : `Paket sistem lengkap siap operasi (${children.length} sub-komponen BOM)`,
                children: children
            };
        },

        buildProductRow(sku, qty, notesId, notesEn) {
            const p = this.findProductBySku(sku);
            const isEn = this.lang === 'en';
            if (!p) return null;
            return {
                id: 'boq-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
                isBundle: false,
                expanded: false,
                category: p.cat,
                sku: p.sku,
                name_id: p.model,
                name_en: p.model,
                name: p.model,
                qty: Math.max(1, qty),
                unit: p.unit || 'Unit',
                price_idr: Number(p.price_idr || 0),
                price_usd: Number(p.price_usd || 0),
                notes_id: notesId || p.best_for_id || '',
                notes_en: notesEn || p.best_for_en || '',
                notes: isEn ? (notesEn || p.best_for_en || '') : (notesId || p.best_for_id || ''),
                children: []
            };
        },

        syncBoqFromSizing() {
            const s = this.sizingResult;
            const newBoq = [];

            // 1. Outdoor Repeater System Bundle(s) — MOTOTRBO SLR 5300 or SLR 8000
            if (s.totalOutdoorRepeaters > 0) {
                const bundleId = s.useHighPower100W ? 'SYS-RPT-SLR8000-HIGHPOWER' : 'SYS-RPT-SLR5300-OUTDOOR';
                const rptBundle = this.buildBundleRow(bundleId, s.totalOutdoorRepeaters, s.towerHeight);
                if (rptBundle) {
                    rptBundle.expanded = true; // Auto-expand first bundle so user immediately sees the composite BOM!
                    newBoq.push(rptBundle);
                }
            }

            // 2. In-Building DAS Repeater System Bundle(s) — MOTOTRBO SLR 1000
            if (s.dasNodes > 0) {
                const dasBundle = this.buildBundleRow('SYS-DAS-SLR1000-INDOOR', s.dasNodes, s.towerHeight);
                if (dasBundle) newBoq.push(dasBundle);
            }

            // 3. Topology Licenses & Multi-Site Backhaul Networking
            if (s.topologyKey === 'ipsc' && s.totalOutdoorRepeaters > 0) {
                const lic = this.buildProductRow('LIC-MOT-IPSC', s.totalOutdoorRepeaters, 'Lisensi interkoneksi multi-site IP Site Connect', 'IP Site Connect multi-site linking license');
                if (lic) newBoq.push(lic);
            } else if (s.topologyKey === 'cap_plus') {
                const lic = this.buildProductRow('LIC-MOT-CAPPLUS', s.totalOutdoorRepeaters, 'Lisensi trunking Capacity Plus Single-Site', 'Capacity Plus Single-Site trunking license');
                if (lic) newBoq.push(lic);
            } else if (s.topologyKey === 'lcp') {
                const lic = this.buildProductRow('LIC-MOT-LCP', s.totalOutdoorRepeaters, 'Lisensi trunking multi-site Linked Capacity Plus (LCP)', 'Linked Capacity Plus (LCP) multi-site trunking license');
                if (lic) newBoq.push(lic);
            } else if (s.topologyKey === 'connect_plus') {
                const lic = this.buildProductRow('LIC-MOT-CONPLUS', Math.max(1, s.outdoorSites), 'Controller & Lisensi Trunking Connect Plus / Capacity Max', 'Connect Plus / Capacity Max Trunking Controller & License');
                if (lic) newBoq.push(lic);
            }

            if (s.outdoorSites > 1) {
                const rtr = this.buildProductRow('NET-RTR-MIKROTIK', s.outdoorSites, 'Router VPN & Switch IP Backhaul antar-site', 'Inter-site IP Backhaul VPN Router & Managed Switch');
                if (rtr) newBoq.push(rtr);
            }

            // 4. Solar Off-Grid Kit if selected
            if (this.powerSource === 'solar' && s.outdoorSites > 0) {
                const sol = this.buildProductRow('PWR-SOLAR-OFFGRID', s.outdoorSites, `Sistem Solar Off-Grid otonom (${s.solarWp} Wp per site)`, `Autonomous Solar Off-Grid Power System (${s.solarWp} Wp/site)`);
                if (sol) newBoq.push(sol);
            }

            // 5. Auto-Allocated Subscriber Radios (85% HT + 15% Mobile — No more "TBD"!)
            if (s.htQty > 0) {
                const htRow = this.buildProductRow(
                    s.htSku,
                    s.htQty,
                    `Alokasi otomatis 85% dari ${s.userCount} user (${s.needAtex ? 'Bersertifikat ATEX' : 'Standar Industri'})`,
                    `Auto-allocated 85% of ${s.userCount} users (${s.needAtex ? 'ATEX Certified' : 'Industrial Grade'})`
                );
                if (htRow) newBoq.push(htRow);
            }
            if (s.mobileQty > 0) {
                const mobRow = this.buildProductRow(
                    s.mobSku,
                    s.mobileQty,
                    `Alokasi otomatis 15% dari ${s.userCount} user (Kendaraan / Base Station)`,
                    `Auto-allocated 15% of ${s.userCount} users (Vehicle / Fixed Base)`
                );
                if (mobRow) newBoq.push(mobRow);
            }

            // 6. Optional Dispatch Control Room Bundle
            if (this.needDispatch) {
                const disp = this.buildBundleRow('SYS-DISPATCH-CONTROL', 1, s.towerHeight);
                if (disp) newBoq.push(disp);
            }

            // 7. Optional Avigilon AI CCTV Bundle
            if (this.needCctv && this.cctvCount > 0) {
                const cctvSets = Math.max(1, Math.ceil(this.cctvCount / 8.0));
                const cctvBun = this.buildBundleRow('SYS-CCTV-ENTERPRISE-8CH', cctvSets, s.towerHeight);
                if (cctvBun) newBoq.push(cctvBun);
            }

            this.boqItems = newBoq;
        },

        addSelectedBundleToBoq() {
            const row = this.buildBundleRow(this.selectedBundleToAdd, 1, this.sizingResult.towerHeight);
            if (row) {
                row.expanded = true;
                this.boqItems.push(row);
            }
        },

        addProductSkuToBoq(sku) {
            const targetSku = sku || this.selectedProductSkuToAdd;
            const existing = this.boqItems.find(x => !x.isBundle && x.sku === targetSku);
            if (existing) {
                existing.qty = Number(existing.qty || 1) + 1;
                return;
            }
            const row = this.buildProductRow(targetSku, 1);
            if (row) this.boqItems.push(row);
        },

        removeBoqItem(index) {
            this.boqItems.splice(index, 1);
        },

        // ─── Commercial Pricing Math (Parent-Child BOM + Markup/Discount/PPN) ─
        convertPrice(priceIdr, priceUsd) {
            const marginMult = 1.0 + (Number(this.marginPercent || 0) / 100.0);
            if (this.currency === 'USD') {
                const baseUsd = priceUsd ? Number(priceUsd) : (Number(priceIdr || 0) / Math.max(1, Number(this.exchangeRate || 16200)));
                return baseUsd * marginMult;
            }
            return Number(priceIdr || 0) * marginMult;
        },

        getEffectiveUnitPrice(item) {
            if (item.isBundle && Array.isArray(item.children)) {
                return item.children
                    .filter(c => c.enabled !== false)
                    .reduce((acc, sub) => acc + (this.convertPrice(sub.price_idr, sub.price_usd) * Number(sub.qtyPerBundle || 1)), 0);
            }
            return this.convertPrice(item.price_idr, item.price_usd);
        },

        getLineTotal(item) {
            return this.getEffectiveUnitPrice(item) * Math.max(0, Number(item.qty || 0));
        },

        get hardwareSubtotal() {
            return this.boqItems.reduce((sum, it) => sum + this.getLineTotal(it), 0);
        },

        get serviceFeeTotal() {
            if (!this.includeMandaysInBoq) return 0;
            const unitRate = this.convertPrice(this.mandaysRateIdr, this.mandaysRateIdr / Math.max(1, this.exchangeRate));
            return unitRate * this.mandaysResult.totalMandays;
        },

        get grossSubtotal() {
            return this.hardwareSubtotal + this.serviceFeeTotal;
        },

        get discountAmount() {
            const pct = Math.min(100, Math.max(0, Number(this.discountPercent || 0)));
            return this.grossSubtotal * (pct / 100.0);
        },

        get netTaxableSubtotal() {
            return Math.max(0, this.grossSubtotal - this.discountAmount);
        },

        get ppnAmount() {
            const pct = Math.max(0, Number(this.ppnPercent || 0));
            return this.netTaxableSubtotal * (pct / 100.0);
        },

        get grandTotal() {
            return this.netTaxableSubtotal + this.ppnAmount;
        },

        formatCurrency(val) {
            const n = Number(val || 0);
            if (this.currency === 'USD') {
                return 'US$ ' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            }
            return 'Rp ' + Math.round(n).toLocaleString('id-ID');
        },

        // ─── Module 3: Smart Catalog Search & Filtering ──────────────────
        get catalogCategories() {
            const cats = new Set();
            this.productsCatalog.forEach(p => { if (p.cat) cats.add(p.cat); });
            return ['ALL', ...Array.from(cats)];
        },

        get filteredCatalog() {
            const q = (this.catSearchQuery || '').trim().toLowerCase();
            return this.productsCatalog.filter((p) => {
                if (this.catSelectedCategory !== 'ALL' && p.cat !== this.catSelectedCategory) {
                    return false;
                }
                if (!q) return true;
                const haystack = `${p.sku} ${p.cat} ${p.series} ${p.model} ${p.desc_id} ${p.desc_en} ${p.best_for_id} ${p.best_for_en} ${(p.features || []).join(' ')}`.toLowerCase();
                return q.split(/\s+/).every(token => haystack.includes(token));
            });
        },

        // ─── Module 4: Mandays Estimator (WES Method) ────────────────────
        get mandaysResult() {
            const s = this.sizingResult;
            const isEn = this.lang === 'en';
            const compMult = { low: 0.85, medium: 1.0, high: 1.30 }[this.mdSiteComplexity] || 1.0;

            const surveyDays = Math.max(2, Math.ceil((s.outdoorSites * 1.5 + (s.dasNodes > 0 ? 1.5 : 0)) * compMult));
            const installOutdoorDays = Math.ceil(s.totalOutdoorRepeaters * 2.5 * compMult);
            const installDasDays = Math.ceil(s.dasNodes * 3.0 * compMult);
            const programmingDays = Math.max(1, Math.ceil(s.userCount / 60.0));
            const dispatchCctvDays = (this.needDispatch ? 2 : 0) + (this.needCctv ? Math.ceil(this.cctvCount / 4.0) : 0);
            const commissioningDays = Math.max(2, Math.ceil((s.outdoorSites + (s.dasNodes > 0 ? 1 : 0)) * 1.0));

            const rawTotal = surveyDays + installOutdoorDays + installDasDays + programmingDays + dispatchCctvDays + commissioningDays + Number(this.mdCustomAdjustment || 0);
            const totalMandays = Math.max(3, rawTotal);
            const team = Math.max(1, parseInt(this.mdTeamSize || 3, 10));
            const calendarDays = Math.max(2, Math.ceil(totalMandays / Math.min(team, 4)) + 1);

            const tasks = [
                {
                    phase: isEn ? '1. RF Site Survey, Propagation & LOS Test' : '1. Site Survey RF, Uji Propagasi & Line-of-Sight',
                    desc: isEn ? `Field survey across ${s.outdoorSites} outdoor site(s) & ${s.dasNodes} indoor DAS zone(s)` : `Survey lapangan pada ${s.outdoorSites} site outdoor & ${s.dasNodes} area indoor DAS`,
                    mandays: surveyDays
                },
                {
                    phase: isEn ? '2. Outdoor Repeater, Duplexer & Feeder Installation' : '2. Instalasi Repeater Outdoor SLR 5300, Duplexer & Kabel 7/8"',
                    desc: `${s.totalOutdoorRepeaters}x ${s.primaryRepeaterModel} + ${s.coaxMetersPerSite}m Coax/site + VSWR Tuning`,
                    mandays: installOutdoorDays
                },
                {
                    phase: isEn ? '3. In-Building DAS (MOTOTRBO SLR 1000 & Splitters)' : '3. Instalasi In-Building DAS (MOTOTRBO SLR 1000 & Antena Indoor)',
                    desc: s.dasNodes > 0 ? `${s.dasNodes}x MOTOTRBO SLR 1000 + Ceiling Antennas` : (isEn ? 'Not required (Outdoor only)' : 'Tidak diperlukan (Khusus Outdoor)'),
                    mandays: installDasDays
                },
                {
                    phase: isEn ? '4. Fleet Codeplug Programming & OTAP Setup' : '4. Programming Codeplug Radio User (HT & Mobile)',
                    desc: `${s.userCount} Units (${s.htQty} HT + ${s.mobileQty} Mobile)`,
                    mandays: programmingDays
                },
                {
                    phase: isEn ? '5. Control Room Dispatch & AI CCTV Integration' : '5. Integrasi Ruang Kontrol Dispatch & CCTV AI',
                    desc: `${this.needDispatch ? 'RadioPro/WAVE PTX Dispatch' : '-'} ${this.needCctv ? `+ ${this.cctvCount} CCTV AI` : ''}`,
                    mandays: dispatchCctvDays
                },
                {
                    phase: isEn ? '6. FAT, SAT Commissioning & User Handover Training' : '6. Uji Terima (FAT/SAT), Commissioning & Pelatihan Operator',
                    desc: isEn ? 'End-to-end acceptance testing & BAST documentation' : 'Pengujian penerimaan sistem & dokumentasi BAST resmi',
                    mandays: commissioningDays
                }
            ];

            return {
                tasks,
                totalMandays,
                calendarDays,
                totalCostIdr: totalMandays * this.mandaysRateIdr
            };
        },

        // ─── Module 5: RF Coverage Simulation (60x60 Path Loss Grid) ─────
        runCoverageSimulation() {
            const canvas = document.getElementById('cdpkCoverageCanvas');
            if (!canvas) return;
            const s = this.sizingResult;
            this.covMetrics = window.CDPK_ENGINES.renderCoverageSimulationCanvas(canvas, {
                terrain: this.terrain,
                freqBand: this.freqBand,
                txWatts: this.covTxWatts,
                antennaGainDbi: this.covAntGainDbi,
                cableLossDb: this.covCableLossDb,
                sites: Math.max(1, s.outdoorSites),
                areaKm2: s.areaKm2,
                towerHeight: s.towerHeight
            });
        },

        async geocodeLocation() {
            if (!this.covSearchLocation) return;
            try {
                const q = encodeURIComponent(this.covSearchLocation);
                const r = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${q}&limit=1`);
                const d = await r.json();
                if (d && d.length > 0) {
                    this.covLat = parseFloat(d[0].lat).toFixed(4);
                    this.covLon = parseFloat(d[0].lon).toFixed(4);
                    this.projLocation = d[0].display_name.split(',').slice(0, 3).join(',');
                    this.runCoverageSimulation();
                }
            } catch (e) {
                console.warn('Geocode error:', e);
            }
        },

        // ─── Module 6: Multi-Model AI Copilot (Gemini 3.8 Flash & Pro) ───
        setQuickAiPrompt(text) {
            this.aiPrompt = text;
            this.sendAiCopilotMessage();
        },

        async sendAiCopilotMessage() {
            const promptText = (this.aiPrompt || '').trim();
            if (!promptText || this.aiLoading) return;

            if (this.aiApiKey) {
                localStorage.setItem('cdpk_gemini_key', this.aiApiKey);
            }

            this.aiHistory.push({
                role: 'user',
                text: promptText,
                time: new Date().toLocaleTimeString()
            });
            this.aiPrompt = '';
            this.aiLoading = true;

            try {
                const resp = await fetch('/api/ai/copilot', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        model: this.aiModel,
                        prompt: promptText,
                        lang: this.lang,
                        api_key: this.aiApiKey,
                        state: {
                            industry: this.industry,
                            areaInput: this.areaInput,
                            areaUnit: this.areaUnit,
                            userCount: this.userCount,
                            terrain: this.terrain,
                            freqBand: this.freqBand,
                            buildingFloors: this.buildingFloors,
                            needAtex: this.needAtex
                        }
                    })
                });
                const data = await resp.json();
                this.lastExtractedParams = data.extracted_params || null;
                this.aiHistory.push({
                    role: 'assistant',
                    model: data.model_name || this.aiModel,
                    text: data.reply || 'Analysis complete.',
                    extracted: data.extracted_params || null,
                    metrics: data.summary_metrics || null,
                    time: new Date().toLocaleTimeString()
                });
            } catch (e) {
                this.aiHistory.push({
                    role: 'assistant',
                    model: this.aiModel,
                    text: this.lang === 'en' ? 'Connection error while contacting AI Copilot.' : 'Terjadi kendala koneksi saat menghubungi AI Copilot.',
                    time: new Date().toLocaleTimeString()
                });
            } finally {
                this.aiLoading = false;
            }
        },

        applyAiParamsToApp(extracted) {
            const ext = extracted || this.lastExtractedParams;
            if (!ext) return;
            if (ext.industry) this.industry = ext.industry;
            if (ext.areaInput !== undefined) this.areaInput = ext.areaInput;
            if (ext.areaUnit) this.areaUnit = ext.areaUnit;
            if (ext.userCount !== undefined) this.userCount = ext.userCount;
            if (ext.terrain) this.terrain = ext.terrain;
            if (ext.freqBand) this.freqBand = ext.freqBand;
            if (ext.buildingFloors !== undefined) this.buildingFloors = ext.buildingFloors;
            if (ext.needAtex !== undefined) this.needAtex = ext.needAtex;
            if (ext.powerSource) this.powerSource = ext.powerSource;
            if (ext.backhaul) this.backhaul = ext.backhaul;

            this.syncBoqFromSizing();
            this.runCoverageSimulation();
            this.aiModalOpen = false;
            this.activeTab = 'boq';
        },

        // ─── Document Exporters ──────────────────────────────────────────
        exportPdf() {
            window.CDPK_EXPORTERS.exportBoqPDF(this);
        },

        exportXlsx() {
            window.CDPK_EXPORTERS.exportBoqXLSX(this);
        },

        exportCoveragePng() {
            window.CDPK_EXPORTERS.exportCoveragePNG('cdpkCoverageCanvas', this.projName);
        }
    };
};
