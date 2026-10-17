// Main Alpine.js Application Controller for CDPK System Planner
window.cdpkSystemPlannerApp = function () {
    return {
        // ─── Global UI & Bilingual State ─────────────────────────────────
        lang: localStorage.getItem('cdpk_lang') || 'id',
        activeWorkspace: 'dmr', // 'dmr' | 'das'
        dasActiveTab: 'boq', // 'conv' | 'link' | 'cov' | 'boq' | 'comm' | 'prod'
        dasHandoffModalOpen: false,
        activeTab: 'sizing', // 'sizing' | 'boq' | 'catalog' | 'mandays' | 'coverage'
        aiModalOpen: false,

        // ─── Module: RFoF DAS by FMTCS Reactive State ────────────────────
        das: {
            // 1. Conversion Inputs
            pSrc: 'dbm',
            pVal: 40,
            gSrc: 'db',
            gVal: 10,
            vSrc: 'vswr',
            vVal: 1.3,
            fSrc: 'dbm',
            fVal: -85,

            // 2. Link Budget & Planner Inputs
            oruOutputDbm: 40,
            cableTypeIndex: 0,
            cableLengthM: 50,
            splittersCount: 1,
            otherLossDb: 1.5,
            antennaGainDbi: 3.0,
            envIndex: 1,
            targetSensitivityDbm: -95,
            fadeMarginDb: 10,
            planAreaM2: 5000,
            planUtilPct: 75,

            // 3. Outdoor Okumura-Hata Inputs
            cov_f: 420,
            cov_d: 5,
            cov_ht: 30,
            cov_hm: 1.5,
            cov_txbs: 47,
            cov_txms: 36,
            cov_gbs: 6,
            cov_gms: 0,
            cov_rxbs: -118,
            cov_rxms: -116,
            cov_flbs: 3,
            cov_flms: 0,

            // 4. Multi-Floor BoQ & Topology Inputs
            archMode: 'digital', // 'digital' | 'analog'
            fiberTopo: 'star',   // 'star' | 'cascade' | 'ring'
            floors: [
                { f: 'Floor 1 / Lobby', q: 12 },
                { f: 'Floor 2 / Office', q: 12 },
                { f: 'Floor 3 / Data Hall', q: 12 },
                { f: 'Basement B1', q: 8 }
            ],
            rep: 2,
            radio: 40,
            outo: 1,
            outd: 1,
            r_oru: 30,
            r_omu: 32,
            r_split: 0.30,
            r_coup: 0.72,
            r_cable: 34,
            customPrices: {},
            customCurrencies: {},
            handoffToken: '',
            qrDataUrl: '',

            // 5. Commissioning Test Report Inputs
            inspector: '',
            commDate: new Date().toISOString().slice(0, 10),
            maxVswr: 1.5,
            minTx: 8.0,
            minRx: -85.0,
            points: [
                { id: 'Floor 1 - Ant A1', vswr: 1.25, tx: 11.5, rx: -68.0, call: 'good' },
                { id: 'Floor 2 - Ant A2', vswr: 1.32, tx: 10.8, rx: -71.0, call: 'good' },
                { id: 'Basement B1 - Ant B1', vswr: 1.28, tx: 11.2, rx: -69.5, call: 'good' }
            ],

            // 6. Product Selector Filter
            prodCatFilter: 'all',
            prodSearch: ''
        },

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
        coverageViewMode: 'grid', // 'grid' | 'gis'
        gisBasemap: 'osm', // 'osm' | 'sat'
        gisMap: null,
        gisTileLayer: null,
        gisOverlayLayers: [],
        gisSites: [],
        isDetectingGps: false,
        gisHeatmapOpacity: 0.50,
        showGisRings: true,
        gisProbe: { active: false, lat: '0', lon: '0', distKm: '0', rssiDbm: 0, marginDb: 0, quality: '', color: '' },
        gisMapClickHandlerSet: false,
        gisMapMouseMoveHandlerSet: false,

        // ─── Module 6: Multi-Model AI Copilot State ──────────────────────
        aiModel: localStorage.getItem('cdpk_ai_model') || 'gemini-3.8-pro', // Exclusively 'gemini-3.8-flash' | 'gemini-3.8-pro'
        aiPrompt: '',
        aiLoading: false,
        aiHistory: [],
        lastExtractedParams: null,
        knowledgeBankStatus: {
            total_documents: 0,
            is_syncing: false,
            last_synced: null,
            recent_documents: []
        },

        // ─── Team Authentication State ──────────────────────────────────
        currentUser: null, // { username, email, name, role, title }
        sessionToken: localStorage.getItem('cdpk_session_token') || '',
        loginModalOpen: false,
        authMode: 'login', // 'login' | 'register'
        loginIdentifier: '',
        loginPassword: '',
        loginError: '',
        loginLoading: false,
        regForm: {
            name: '',
            email: '',
            username: '',
            role: 'engineer',
            title: '',
            password: '',
            confirmPassword: ''
        },
        regLoading: false,
        regError: '',
        regSuccess: '',
        googleClientId: '',
        googleButtonRendered: false,

        // ─── PWA & Mobile Navigation State ──────────────────────────────
        pwaCanInstall: false,
        pwaIsInstalled: false,
        deferredInstallPrompt: null,
        iosInstallGuideOpen: false,
        mobileMenuOpen: false,
        googleDomainMismatch: false,
        gisMobileProbeCollapsed: true,

        // ─── Team User Management State (Admin Only) ────────────────────
        userMgmtModalOpen: false,
        teamUsers: [],
        usersLoading: false,
        usersError: '',
        userSheetUrl: 'https://docs.google.com/spreadsheets/d/1Kp85v81JXeRC5ti-ZXYBChgrj2ztnnwrCHokI02LX6U/edit#gid=78156397',
        newUserModalOpen: false,
        newUserForm: {
            username: '',
            name: '',
            email: '',
            role: 'engineer',
            title: '',
            password: 'cdpk2026!'
        },
        newUserLoading: false,
        newUserError: '',
        editUserModalOpen: false,
        editingUser: null,
        editUserLoading: false,
        editUserError: '',
        resetPwdModalOpen: false,
        resetPwdTarget: null,
        resetPwdInput: 'cdpk2026!',
        resetPwdLoading: false,
        resetPwdError: '',
        changeMyPwdModalOpen: false,
        changeMyPwdInput: '',
        changeMyPwdConfirm: '',
        changeMyPwdLoading: false,
        changeMyPwdError: '',
        resetModalOpen: false,
        toast: {
            show: false,
            message: '',
            type: 'success',
            timer: null
        },
        showToast(message, type = 'success') {
            if (this.toast && this.toast.timer) clearTimeout(this.toast.timer);
            this.toast = {
                show: true,
                message: message,
                type: type,
                timer: setTimeout(() => {
                    if (this.toast) this.toast.show = false;
                }, 3800)
            };
        },

        // ─── Cloud Save & Project Archive State ──────────────────────────
        outputSubfolderId: '11NLBY5EAPLb4q753r1TRVKgYRe0JpO8W',
        isSavingToDrive: false,
        saveSuccessModalOpen: false,
        lastSavedResult: null,
        archiveModalOpen: false,
        archiveActiveTab: 'files', // 'files' | 'audit'
        archiveLoading: false,
        archiveFiles: [],
        archiveSearchQuery: '',
        archiveCreatorFilter: 'all',
        archiveTypeFilter: 'all',
        archiveIsAdmin: false,
        archiveIsOverseer: false,
        archiveCanViewAll: false,
        auditLogs: [],
        auditLoading: false,
        auditActionFilter: 'all',
        auditSearchQuery: '',
        userGuideOpen: false,
        userGuideTab: 'workflow',
        guideSearchQuery: '',
        activeFaqIdx: null,
        jumpFromGuide(tabName, modalToOpen = null) {
            this.userGuideOpen = false;
            if (tabName) this.activeTab = tabName;
            if (modalToOpen === 'archive') this.openArchiveDashboard();
            if (modalToOpen === 'users') this.usersModalOpen = true;
            if (modalToOpen === 'compare') this.compareModalOpen = true;
        },
        compareModalOpen: false,

        // ─── Module 7: Product & System Configurator State ───────────────
        systemPackages: [
            {
                id: 'PKG-1',
                name: 'Paket Repeater Base Station SLR 5300 (Single-Site High Power)',
                category: 'slr', // 'slr' | 'ht'
                mainSku: 'MOT-RPT-SLR5300',
                quantity: 1,
                frequency: 'UHF', // 'VHF' | 'UHF'
                marginPercent: 20,
                slrOptions: {
                    duplexer: true,
                    cavityTuning: true,
                    antennaType: 'omni', // 'omni' | 'yagi'
                    antennaCount: 1,
                    feederType: '78', // '78' | '12'
                    feederMeters: 45,
                    arrester: true,
                    onlineUps: true,
                    upsVa: 1500,
                    rackCabinet: true,
                    ipscLicense: true,
                    engineeringService: true
                },
                htOptions: {
                    extraBattery: true,
                    batteryRatio: 1,
                    chargerType: '6way',
                    chargerCount: 2,
                    rsmMic: true,
                    rsmCount: 10,
                    earpiece: false,
                    earpieceCount: 0,
                    swivelCase: true,
                    swivelCaseCount: 10,
                    aesLicense: false
                }
            },
            {
                id: 'PKG-2',
                name: 'Paket Armada Radio Lapangan MOTOTRBO R7 (Operasional Standar)',
                category: 'ht',
                mainSku: 'MOT-HT-R7',
                quantity: 10,
                frequency: 'UHF',
                marginPercent: 20,
                slrOptions: {
                    duplexer: true,
                    cavityTuning: true,
                    antennaType: 'omni',
                    antennaCount: 1,
                    feederType: '78',
                    feederMeters: 45,
                    arrester: true,
                    onlineUps: true,
                    upsVa: 1500,
                    rackCabinet: true,
                    ipscLicense: true,
                    engineeringService: true
                },
                htOptions: {
                    extraBattery: true,
                    batteryRatio: 1,
                    chargerType: '6way',
                    chargerCount: 2,
                    rsmMic: true,
                    rsmCount: 10,
                    earpiece: false,
                    earpieceCount: 0,
                    swivelCase: true,
                    swivelCaseCount: 10,
                    aesLicense: false
                }
            }
        ],
        activeConfigPkgId: 'PKG-1',
        emailModalOpen: false,
        emailRecipient: '',
        emailClientContact: '',
        emailSubject: '',
        emailNotes: '',

        // ─── In-App Notifications State ──────────────────────────────────
        notifications: [],
        unreadNotificationsCount: 0,
        notificationsOpen: false,
        notificationsLoading: false,

        // ─── Project Handover State ──────────────────────────────────────
        handoverModalOpen: false,
        handoverFile: null,
        handoverTargetUsers: [],
        handoverNote: '',
        handoverLoading: false,
        activeTeamMembers: [],

        // ─── Custom Configurator Mode (Pilih Produk + Lisensi + Aksesoris) ──
        configuratorMode: 'standard', // 'standard' | 'custom'
        customProductSearch: '',
        customConfig: {
            sku: 'MOT-RPT-SLR5300',
            name: 'MOTOTRBO SLR 5300',
            category: 'Repeater',
            unitPriceIdr: 48500000,
            unitPriceUsd: 2995,
            qty: 1,
            licenses: [
                {
                    id: 'lic-init-1',
                    sku: 'LIC-MOT-IPSC',
                    name: 'MOTOTRBO IP Site Connect License (HKVN4045)',
                    priceIdr: 4500000,
                    priceUsd: 280,
                    qty: 1
                }
            ],
            accessories: [
                {
                    id: 'acc-init-1',
                    sku: 'RF-ACC-DUPLEXER',
                    name: 'Duplexer VHF/UHF Band-Pass',
                    priceIdr: 6500000,
                    priceUsd: 400,
                    qty: 1
                },
                {
                    id: 'acc-init-2',
                    sku: 'AVT-ANT-AVO400',
                    name: 'AVO-400D/DII/E Omni 400MHz',
                    priceIdr: 6800000,
                    priceUsd: 420,
                    qty: 1
                }
            ],
            marginPercent: 20
        },

        // ─── Lifecycle Init ──────────────────────────────────────────────
        async init() {
            await this.fetchHealthConfig();
            await this.checkCurrentAuth();
            await this.loadCloudKnowledge(false);
            await this.fetchKnowledgeBankStatus();
            this.syncBoqFromSizing();
            if (this.currentUser) {
                this.fetchNotifications();
                setInterval(() => {
                    if (this.currentUser) this.fetchNotifications();
                }, 30000);
            }

            // PWA Service Worker Registration
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/service-worker.js', { scope: '/' })
                        .then((reg) => console.log('[PWA] Service Worker registered with scope:', reg.scope))
                        .catch((err) => console.warn('[PWA] Service Worker registration failed:', err));
                });
            }

            // PWA Install Prompt & Standalone Mode Detection
            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                this.deferredInstallPrompt = e;
                this.pwaCanInstall = true;
            });

            window.addEventListener('appinstalled', () => {
                this.pwaIsInstalled = true;
                this.pwaCanInstall = false;
                this.deferredInstallPrompt = null;
                this.showToast(this.lang === 'en' ? 'CDPK Planner installed successfully!' : 'CDPK Planner berhasil dipasang di layar utama!', 'success');
            });

            if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
                this.pwaIsInstalled = true;
            }

            // PWA Shortcut URL Handler (?tab=boq / ?tab=coverage / ?tab=ai)
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const qTab = urlParams.get('tab');
                if (qTab && ['sizing', 'boq', 'catalog', 'mandays', 'coverage', 'configurator'].includes(qTab)) {
                    this.activeTab = qTab;
                }
                if (qTab === 'ai') {
                    this.aiModalOpen = true;
                }
            } catch (e) {}

            this.$nextTick(() => {
                this.runCoverageSimulation();
                this.initGoogleAuth();
            });
        },

        async fetchHealthConfig() {
            try {
                const resp = await fetch('/health');
                if (resp.ok) {
                    const data = await resp.json();
                    if (data.google_client_id) {
                        this.googleClientId = data.google_client_id;
                    }
                }
            } catch (e) {
                console.warn('Health check fallback:', e);
            }
        },

        // ─── Authentication Methods ──────────────────────────────────────
        async checkCurrentAuth() {
            if (!this.sessionToken) {
                // If not logged in, auto-show login modal or allow quick demo login
                this.currentUser = null;
                return;
            }
            try {
                const resp = await fetch('/api/auth/me', {
                    headers: { 'Authorization': `Bearer ${this.sessionToken}` }
                });
                if (resp.ok) {
                    const data = await resp.json();
                    this.currentUser = data.user;
                    if (this.currentUser && this.currentUser.name) {
                        this.salesPic = `${this.currentUser.name} (${this.currentUser.title || 'CDPK'})`;
                    }
                } else {
                    this.logout(false);
                }
            } catch (e) {
                console.warn('Auth check fallback:', e);
            }
        },

        async login(identOverride, pwdOverride) {
            const ident = identOverride || this.loginIdentifier;
            const pwd = pwdOverride || this.loginPassword;
            if (!ident || !pwd) {
                this.loginError = this.lang === 'en' ? 'Please enter username and password' : 'Harap masukkan username dan password';
                return;
            }
            this.loginLoading = true;
            this.loginError = '';
            try {
                const resp = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ identifier: ident, password: pwd })
                });
                const data = await resp.json();
                if (resp.ok && data.status === 'ok') {
                    this.sessionToken = data.token;
                    localStorage.setItem('cdpk_session_token', data.token);
                    this.currentUser = data.user;
                    this.loginModalOpen = false;
                    this.loginPassword = '';
                    this.salesPic = `${data.user.name} (${data.user.title || 'CDPK'})`;
                    this.fetchNotifications();
                } else {
                    this.loginError = data.message || (this.lang === 'en' ? 'Invalid credentials' : 'Username atau password salah');
                }
            } catch (e) {
                this.loginError = this.lang === 'en' ? 'Connection error' : 'Kendala koneksi ke server auth';
            } finally {
                this.loginLoading = false;
            }
        },

        async submitRegister() {
            if (!this.regForm.name || !this.regForm.email || !this.regForm.password) {
                this.regError = 'Nama, email perusahaan, dan password wajib diisi.';
                return;
            }
            if (this.regForm.password !== this.regForm.confirmPassword) {
                this.regError = 'Konfirmasi password tidak cocok.';
                return;
            }
            if (this.regForm.password.length < 6) {
                this.regError = 'Password minimal 6 karakter.';
                return;
            }
            this.regLoading = true;
            this.regError = '';
            this.regSuccess = '';
            try {
                const resp = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.regForm)
                });
                const data = await resp.json();
                if (resp.ok && data.status === 'ok') {
                    this.regSuccess = data.message || 'Pendaftaran berhasil diajukan dan sedang menunggu persetujuan Administrator.';
                    this.regForm = { name: '', email: '', username: '', role: 'engineer', title: '', password: '', confirmPassword: '' };
                    setTimeout(() => {
                        this.authMode = 'login';
                        this.loginError = 'Pendaftaran Anda berhasil dikirim dan sedang menunggu persetujuan Administrator. Silakan hubungi Admin untuk aktivasi akun.';
                    }, 3000);
                } else {
                    this.regError = data.message || 'Pendaftaran gagal';
                }
            } catch (e) {
                this.regError = 'Kendala koneksi ke server auth';
            } finally {
                this.regLoading = false;
            }
        },

        initGoogleAuth() {
            if (!this.googleClientId) return;
            const initGIS = () => {
                if (window.google && window.google.accounts && window.google.accounts.id) {
                    try {
                        window.google.accounts.id.initialize({
                            client_id: this.googleClientId,
                            callback: (res) => this.handleGoogleCredentialResponse(res),
                            auto_select: false,
                            itp_support: true,
                            cancel_on_tap_outside: false
                        });
                        const btnEl = document.getElementById('googleSignInBtn');
                        if (btnEl) {
                            window.google.accounts.id.renderButton(btnEl, {
                                type: 'standard',
                                theme: 'outline',
                                size: 'large',
                                width: 320,
                                text: 'signin_with',
                                shape: 'pill'
                            });
                            this.googleButtonRendered = true;
                        }
                    } catch (e) {
                        console.warn('GIS Init Error:', e);
                    }
                } else {
                    setTimeout(initGIS, 500);
                }
            };
            initGIS();
        },

        handleGoogleCredentialResponse(response) {
            if (response && response.credential) {
                this.loginWithGoogleToken(response.credential);
            }
        },

        handleGoogleSignInClick() {
            if (window.google && window.google.accounts && window.google.accounts.id && this.googleClientId) {
                window.google.accounts.id.prompt();
            } else {
                alert(this.lang === 'en'
                    ? 'To enable 1-Click Google Workspace sign-in, configure GOOGLE_CLIENT_ID in your Render environment variables with an authorized OAuth Client ID for this domain.'
                    : 'Untuk mengaktifkan login instan Google Workspace, pastikan GOOGLE_CLIENT_ID telah dikonfigurasi di Environment Variable server Render dengan domain https://cdpk-system-planner.onrender.com.');
            }
        },

        switchGoogleAccount() {
            this.loginError = '';
            this.googleDomainMismatch = false;
            if (window.google && window.google.accounts && window.google.accounts.id) {
                try {
                    window.google.accounts.id.disableAutoSelect();
                } catch (e) {}
                window.google.accounts.id.prompt();
            }
        },

        triggerPwaInstall() {
            const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
            if (isIos && !this.pwaIsInstalled) {
                this.iosInstallGuideOpen = true;
                return;
            }
            if (this.deferredInstallPrompt) {
                this.deferredInstallPrompt.prompt();
                this.deferredInstallPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult && choiceResult.outcome === 'accepted') {
                        this.pwaCanInstall = false;
                    }
                    this.deferredInstallPrompt = null;
                });
            } else {
                this.showToast(this.lang === 'en'
                    ? 'To install, open browser menu (⋮ or Share) and select "Add to Home Screen".'
                    : 'Untuk memasang, buka menu browser (titik tiga atau Bagikan) lalu pilih "Tambah ke Layar Utama".', 'info');
            }
        },

        async loginWithGoogleToken(idToken) {
            this.loginLoading = true;
            this.loginError = '';
            this.googleDomainMismatch = false;
            try {
                const resp = await fetch('/api/auth/google', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id_token: idToken })
                });
                const data = await resp.json();
                if (resp.ok && data.status === 'ok') {
                    this.sessionToken = data.token;
                    localStorage.setItem('cdpk_session_token', data.token);
                    this.currentUser = data.user;
                    this.loginModalOpen = false;
                    this.loginPassword = '';
                    this.salesPic = `${data.user.name} (${data.user.title || 'CDPK'})`;
                    this.fetchNotifications();
                    this.googleDomainMismatch = false;
                } else {
                    this.loginError = data.message || (this.lang === 'en' ? 'Google Workspace login failed' : 'Gagal login akun Google Workspace');
                    if (data.status === 'forbidden' || (data.message && (data.message.includes('citradata.id') || data.message.includes('techsolutions.id') || data.message.includes('domain')))) {
                        this.googleDomainMismatch = true;
                    }
                }
            } catch (e) {
                this.loginError = this.lang === 'en' ? 'Network error during Google auth' : 'Kendala jaringan verifikasi Google Workspace';
            } finally {
                this.loginLoading = false;
            }
        },

        async logout(callApi = true) {
            if (callApi && this.sessionToken) {
                try {
                    await fetch('/api/auth/logout', {
                        method: 'POST',
                        headers: { 'Authorization': `Bearer ${this.sessionToken}` }
                    });
                } catch (e) {}
            }
            this.sessionToken = '';
            this.currentUser = null;
            this.notifications = [];
            this.unreadNotificationsCount = 0;
            this.notificationsOpen = false;
            localStorage.removeItem('cdpk_session_token');
        },

        getRoleBadge(role) {
            if (role === 'admin') return { label: '👑 Administrator', class: 'bg-purple-100 text-purple-700 border border-purple-200' };
            if (role === 'overseer') return { label: '👁️ Overseer', class: 'bg-teal-100 text-teal-800 border border-teal-200' };
            if (role === 'sales') return { label: '💼 Product Expert', class: 'bg-amber-100 text-amber-700 border border-amber-200' };
            return { label: '🛠️ Engineer / Technician', class: 'bg-sky-100 text-sky-700 border border-sky-200' };
        },

        // ─── Team User Management Methods (Admin & Overseer) ────────────
        async openUserManagementModal() {
            if (!this.currentUser || (this.currentUser.role !== 'admin' && this.currentUser.role !== 'overseer')) {
                return;
            }
            this.userMgmtModalOpen = true;
            await this.loadTeamUsers(false);
        },

        async loadTeamUsers(forceSync = false) {
            if (!this.sessionToken) return;
            this.usersLoading = true;
            this.usersError = '';
            try {
                const url = forceSync ? '/api/auth/users?force=1' : '/api/auth/users';
                const resp = await fetch(url, {
                    headers: { 'Authorization': `Bearer ${this.sessionToken}` }
                });
                const data = await resp.json();
                if (resp.ok && data.status === 'ok') {
                    this.teamUsers = data.users || [];
                    if (data.sheet_url) this.userSheetUrl = data.sheet_url;
                } else {
                    this.usersError = data.message || (this.lang === 'en' ? 'Failed loading team users' : 'Gagal memuat data pengguna tim');
                }
            } catch (e) {
                this.usersError = this.lang === 'en' ? 'Connection error loading team users' : 'Kendala koneksi saat memuat pengguna tim';
            } finally {
                this.usersLoading = false;
            }
        },

        async syncUsersFromSheet() {
            if (!this.sessionToken) return;
            this.usersLoading = true;
            this.usersError = '';
            try {
                const resp = await fetch('/api/auth/users/sync', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.sessionToken}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await resp.json();
                if (resp.ok && data.status === 'ok') {
                    this.teamUsers = data.users || [];
                } else {
                    this.usersError = data.message || (this.lang === 'en' ? 'Sync failed' : 'Gagal sinkronisasi data pengguna dari Google Sheet');
                }
            } catch (e) {
                this.usersError = this.lang === 'en' ? 'Connection error syncing from Google Sheet' : 'Kendala koneksi saat sinkronisasi';
            } finally {
                this.usersLoading = false;
            }
        },

        openAddUserForm() {
            this.newUserForm = {
                email: '',
                name: '',
                username: '',
                role: 'engineer',
                title: ''
            };
            this.newUserError = '';
            this.newUserModalOpen = true;
        },

        async submitNewUser() {
            if (!this.newUserForm.email) {
                this.newUserError = this.lang === 'en' ? 'Corporate email is required' : 'Email perusahaan (@citradata.id / @techsolutions.id) wajib diisi';
                return;
            }
            if (!this.newUserForm.username && this.newUserForm.email.includes('@')) {
                this.newUserForm.username = this.newUserForm.email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '_');
            }
            if (!this.newUserForm.name && this.newUserForm.email.includes('@')) {
                this.newUserForm.name = this.newUserForm.email.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ').trim();
            }
            this.newUserLoading = true;
            this.newUserError = '';
            try {
                const resp = await fetch('/api/auth/users', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.sessionToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.newUserForm)
                });
                const data = await resp.json();
                if (resp.ok && data.status === 'ok') {
                    this.newUserModalOpen = false;
                    await this.loadTeamUsers(false);
                } else {
                    this.newUserError = data.message || (this.lang === 'en' ? 'Failed adding user' : 'Gagal menambahkan pengguna');
                }
            } catch (e) {
                this.newUserError = this.lang === 'en' ? 'Connection error saving user' : 'Kendala koneksi saat menyimpan pengguna';
            } finally {
                this.newUserLoading = false;
            }
        },

        startEditUser(u) {
            this.editingUser = JSON.parse(JSON.stringify(u));
            this.editUserError = '';
            this.editUserModalOpen = true;
        },

        async submitEditUser() {
            if (!this.editingUser) return;
            this.editUserLoading = true;
            this.editUserError = '';
            try {
                const resp = await fetch('/api/auth/users/update', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.sessionToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.editingUser)
                });
                const data = await resp.json();
                if (resp.ok && data.status === 'ok') {
                    this.editUserModalOpen = false;
                    this.editingUser = null;
                    await this.loadTeamUsers(false);
                } else {
                    this.editUserError = data.message || (this.lang === 'en' ? 'Failed updating user' : 'Gagal memperbarui pengguna');
                }
            } catch (e) {
                this.editUserError = this.lang === 'en' ? 'Connection error updating user' : 'Kendala koneksi saat memperbarui pengguna';
            } finally {
                this.editUserLoading = false;
            }
        },

        async toggleUserStatus(u) {
            const nextStatus = u.status === 'active' ? (this.lang === 'en' ? 'INACTIVE' : 'NONAKTIF') : (this.lang === 'en' ? 'ACTIVE' : 'AKTIF');
            if (!confirm(this.lang === 'en'
                ? `Change account status for @${u.username} (${u.name}) to ${nextStatus}?`
                : `Ubah status akun @${u.username} (${u.name}) menjadi ${nextStatus}?`)) {
                return;
            }
            try {
                const resp = await fetch('/api/auth/users/toggle-status', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.sessionToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: u.username })
                });
                const data = await resp.json();
                if (resp.ok && data.status === 'ok') {
                    await this.loadTeamUsers(false);
                } else {
                    alert(data.message || (this.lang === 'en' ? 'Failed changing status' : 'Gagal mengubah status pengguna'));
                }
            } catch (e) {
                alert(this.lang === 'en' ? 'Connection error toggling status' : 'Kendala koneksi saat mengubah status');
            }
        },

        async approveUser(u) {
            try {
                const resp = await fetch('/api/auth/users/approve', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.sessionToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: u.username,
                        role: u.role || 'engineer'
                    })
                });
                const data = await resp.json();
                if (resp.ok && data.status === 'ok') {
                    await this.loadTeamUsers(false);
                } else {
                    alert(data.message || 'Gagal menyetujui pendaftaran');
                }
            } catch (e) {
                alert('Kendala koneksi saat menyetujui pendaftaran');
            }
        },

        async deleteUser(u) {
            if (u.username === 'adrian') {
                alert('Akun administrator utama tidak dapat dihapus');
                return;
            }
            if (!confirm(`Hapus pengguna @${u.username} (${u.name} - ${u.email}) secara permanen? Data yang telah dihapus tidak dapat dipulihkan.`)) {
                return;
            }
            try {
                const resp = await fetch('/api/auth/users/delete', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.sessionToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: u.username })
                });
                const data = await resp.json();
                if (resp.ok && data.status === 'ok') {
                    await this.loadTeamUsers(false);
                } else {
                    alert(data.message || 'Gagal menghapus pengguna');
                }
            } catch (e) {
                alert('Kendala koneksi saat menghapus pengguna');
            }
        },

        async rejectUser(u) {
            if (!confirm(`Tolak dan hapus pendaftaran dari @${u.username} (${u.name} - ${u.email})?`)) {
                return;
            }
            try {
                const resp = await fetch('/api/auth/users/reject', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.sessionToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: u.username })
                });
                const data = await resp.json();
                if (resp.ok && data.status === 'ok') {
                    await this.loadTeamUsers(false);
                } else {
                    alert(data.message || 'Gagal menolak pendaftaran');
                }
            } catch (e) {
                alert('Kendala koneksi saat menolak pendaftaran');
            }
        },

        async promoteToAdmin(u) {
            if (!confirm(`Angkat @${u.username} (${u.name}) menjadi Administrator? Pengguna akan memiliki akses penuh ke seluruh pengelolaan sistem dan pengguna.`)) {
                return;
            }
            try {
                const resp = await fetch('/api/auth/users/promote', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.sessionToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: u.username })
                });
                const data = await resp.json();
                if (resp.ok && data.status === 'ok') {
                    await this.loadTeamUsers(false);
                } else {
                    alert(data.message || 'Gagal mengangkat Administrator');
                }
            } catch (e) {
                alert('Kendala koneksi saat mengangkat Administrator');
            }
        },

        async demoteAdmin(u) {
            if (!confirm(`Turunkan peran @${u.username} (${u.name}) dari Administrator menjadi Engineer?`)) {
                return;
            }
            try {
                const resp = await fetch('/api/auth/users/demote', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.sessionToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: u.username })
                });
                const data = await resp.json();
                if (resp.ok && data.status === 'ok') {
                    await this.loadTeamUsers(false);
                } else {
                    alert(data.message || 'Gagal menurunkan peran');
                }
            } catch (e) {
                alert('Kendala koneksi saat menurunkan peran');
            }
        },

        startResetPassword(u) {
            this.resetPwdTarget = JSON.parse(JSON.stringify(u));
            this.resetPwdInput = 'cdpk2026!';
            this.resetPwdError = '';
            this.resetPwdModalOpen = true;
        },

        async submitResetPassword() {
            if (!this.resetPwdTarget || !this.resetPwdInput) return;
            this.resetPwdLoading = true;
            this.resetPwdError = '';
            try {
                const resp = await fetch('/api/auth/users/reset-password', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.sessionToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: this.resetPwdTarget.username,
                        password: this.resetPwdInput
                    })
                });
                const data = await resp.json();
                if (resp.ok && data.status === 'ok') {
                    alert(this.lang === 'en'
                        ? `Password for @${this.resetPwdTarget.username} has been reset and updated in Google Sheet!`
                        : `Password untuk @${this.resetPwdTarget.username} berhasil di-reset dan tersimpan ke Google Sheet!`);
                    this.resetPwdModalOpen = false;
                    this.resetPwdTarget = null;
                } else {
                    this.resetPwdError = data.message || (this.lang === 'en' ? 'Failed resetting password' : 'Gagal me-reset password');
                }
            } catch (e) {
                this.resetPwdError = this.lang === 'en' ? 'Connection error resetting password' : 'Kendala koneksi saat reset password';
            } finally {
                this.resetPwdLoading = false;
            }
        },

        startChangeMyPassword() {
            this.changeMyPwdInput = '';
            this.changeMyPwdConfirm = '';
            this.changeMyPwdError = '';
            this.changeMyPwdLoading = false;
            this.changeMyPwdModalOpen = true;
        },

        async submitChangeMyPassword() {
            if (!this.changeMyPwdInput) {
                this.changeMyPwdError = this.lang === 'en' ? 'New password cannot be empty' : 'Password baru tidak boleh kosong';
                return;
            }
            if (this.changeMyPwdInput.length < 6) {
                this.changeMyPwdError = this.lang === 'en' ? 'Password must be at least 6 characters' : 'Password minimal 6 karakter';
                return;
            }
            if (this.changeMyPwdInput !== this.changeMyPwdConfirm) {
                this.changeMyPwdError = this.lang === 'en' ? 'Password confirmation does not match' : 'Konfirmasi password tidak cocok';
                return;
            }
            this.changeMyPwdLoading = true;
            this.changeMyPwdError = '';
            try {
                const resp = await fetch('/api/auth/change-my-password', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.sessionToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        password: this.changeMyPwdInput
                    })
                });
                const data = await resp.json();
                if (resp.ok && data.status === 'ok') {
                    alert(this.lang === 'en'
                        ? 'Your password has been successfully updated and synced!'
                        : 'Password Anda berhasil diperbarui dan disinkronkan!');
                    this.changeMyPwdModalOpen = false;
                    this.changeMyPwdInput = '';
                    this.changeMyPwdConfirm = '';
                } else {
                    this.changeMyPwdError = data.message || (this.lang === 'en' ? 'Failed updating password' : 'Gagal memperbarui password');
                }
            } catch (e) {
                this.changeMyPwdError = this.lang === 'en' ? 'Connection error' : 'Kendala koneksi';
            } finally {
                this.changeMyPwdLoading = false;
            }
        },


        buildProjectPayload() {
            return {
                projName: this.projName,
                clientName: this.clientName,
                projLocation: this.projLocation,
                salesPic: this.salesPic,
                creatorUsername: this.currentUser ? this.currentUser.username : '',
                creatorName: this.currentUser ? this.currentUser.name : '',
                creatorEmail: this.currentUser ? this.currentUser.email : '',
                lang: this.lang,
                activeWorkspace: this.activeWorkspace,
                exportMode: this.exportMode,
                currency: this.currency,
                exchangeRate: this.exchangeRate,
                sizingInputs: {
                    industry: this.industry,
                    areaInput: this.areaInput,
                    areaUnit: this.areaUnit,
                    userCount: this.userCount,
                    terrain: this.terrain,
                    freqBand: this.freqBand,
                    towerHeight: this.towerHeight,
                    buildingFloors: this.buildingFloors,
                    powerSource: this.powerSource,
                    backupHours: this.backupHours,
                    backhaul: this.backhaul,
                    needAtex: this.needAtex,
                    needDispatch: this.needDispatch,
                    needCctv: this.needCctv,
                    cctvCount: this.cctvCount
                },
                sizingResult: this.sizingResult,
                boqItems: this.boqItems.map(it => ({
                    category: it.category,
                    name: it.name,
                    sku: it.sku,
                    qty: it.qty,
                    unit: it.unit,
                    unitPrice: Math.round(this.getEffectiveUnitPrice(it)),
                    lineTotal: Math.round(this.getLineTotal(it)),
                    notes: it.notes,
                    isBundle: it.isBundle,
                    children: it.children || []
                })),
                commercialTotals: {
                    currency: this.currency,
                    hardwareSubtotal: Math.round(this.hardwareSubtotal),
                    serviceFeeTotal: Math.round(this.serviceFeeTotal),
                    discountPercent: this.discountPercent,
                    discountAmount: Math.round(this.discountAmount),
                    netTaxableSubtotal: Math.round(this.netTaxableSubtotal),
                    ppnPercent: this.ppnPercent,
                    ppnAmount: Math.round(this.ppnAmount),
                    grandTotal: Math.round(this.grandTotal)
                },
                mandaysResult: {
                    totalMandays: this.mandaysResult.totalMandays,
                    calendarDays: this.mandaysResult.calendarDays,
                    tasks: this.mandaysResult.tasks
                },
                systemPackages: this.systemPackages,
                dasState: JSON.parse(JSON.stringify(this.das))
            };
        },

        // ─── Direct Google Drive Project Save Engine ─────────────────────
        async saveToGoogleDrive() {
            if (!this.currentUser) {
                this.loginModalOpen = true;
                return;
            }
            this.isSavingToDrive = true;
            try {
                const payload = this.buildProjectPayload();

                const resp = await fetch('/api/project/save-to-drive', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.sessionToken}`
                    },
                    body: JSON.stringify(payload)
                });
                const resData = await resp.json();
                if (resData.status === 'ok') {
                    this.lastSavedResult = resData;
                    this.saveSuccessModalOpen = true;
                } else {
                    alert(this.lang === 'en' ? 'Failed saving project to Google Drive.' : 'Gagal menyimpan proyek ke Google Drive.');
                }
            } catch (e) {
                console.error('Save to Drive error:', e);
                alert(this.lang === 'en' ? 'Connection error saving to Google Drive.' : 'Kendala koneksi saat menyimpan ke Google Drive.');
            } finally {
                this.isSavingToDrive = false;
            }
        },

        // ─── Cloud Project Archive (Load / Restore) ──────────────────────
        async openProjectArchive() {
            this.archiveModalOpen = true;
            this.archiveActiveTab = 'files';
            this.archiveLoading = true;
            try {
                const resp = await fetch('/api/project/list-drive', {
                    headers: { 'Authorization': `Bearer ${this.sessionToken}` }
                });
                const data = await resp.json();
                this.archiveIsAdmin = !!data.is_admin;
                this.archiveIsOverseer = !!data.is_overseer;
                this.archiveCanViewAll = !!(data.is_admin || data.is_overseer || data.can_view_all);
                this.archiveFiles = (data.files || []).filter(f => f.name.endsWith('.cdpk.json') || f.name.endsWith('.xlsx'));
                if (this.archiveCanViewAll) {
                    this.fetchAuditLogs();
                }
            } catch (e) {
                console.warn('Archive load error:', e);
            } finally {
                this.archiveLoading = false;
            }
        },

        getFilteredArchiveFiles() {
            let files = this.archiveFiles || [];
            if (this.archiveTypeFilter === 'json') {
                files = files.filter(f => f.name.endsWith('.cdpk.json'));
            } else if (this.archiveTypeFilter === 'excel') {
                files = files.filter(f => f.name.endsWith('.xlsx'));
            }

            if (this.archiveCreatorFilter && this.archiveCreatorFilter !== 'all') {
                files = files.filter(f => (f.creator_username || '').toLowerCase() === this.archiveCreatorFilter.toLowerCase());
            }

            if (this.archiveSearchQuery && this.archiveSearchQuery.trim()) {
                const q = this.archiveSearchQuery.toLowerCase().trim();
                files = files.filter(f =>
                    (f.name || '').toLowerCase().includes(q) ||
                    (f.creator_name || '').toLowerCase().includes(q) ||
                    (f.creator_username || '').toLowerCase().includes(q) ||
                    (f.summary || '').toLowerCase().includes(q)
                );
            }
            return files;
        },

        getArchiveCreatorsList() {
            const map = new Map();
            (this.archiveFiles || []).forEach(f => {
                if (f.creator_username) {
                    map.set(f.creator_username, f.creator_name || f.creator_username);
                }
            });
            return Array.from(map.entries()).map(([username, name]) => ({ username, name }));
        },

        getArchiveStats() {
            const files = this.archiveFiles || [];
            const jsonFiles = files.filter(f => f.name.endsWith('.cdpk.json'));
            const xlsxFiles = files.filter(f => f.name.endsWith('.xlsx'));
            const creators = new Set(files.map(f => f.creator_username).filter(Boolean));
            return {
                total: files.length,
                jsonCount: jsonFiles.length,
                xlsxCount: xlsxFiles.length,
                creatorsCount: creators.size
            };
        },

        getPortfolioSummary() {
            const files = this.archiveFiles || [];
            const jsonFiles = files.filter(f => f.name.endsWith('.cdpk.json'));
            let totalPipelineIdr = 0;
            let validMarginCount = 0;
            let marginSum = 0;
            let lowMarginCount = 0;
            let compliantCount = 0;

            jsonFiles.forEach(f => {
                if (f.grand_total) {
                    totalPipelineIdr += Number(f.grand_total);
                }
                if (f.margin_percent !== null && f.margin_percent !== undefined) {
                    const m = Number(f.margin_percent);
                    marginSum += m;
                    validMarginCount++;
                    if (m < 15) {
                        lowMarginCount++;
                    } else {
                        compliantCount++;
                    }
                }
            });

            const avgMargin = validMarginCount > 0 ? (marginSum / validMarginCount).toFixed(1) : '20.0';
            return {
                totalProjects: jsonFiles.length,
                totalPipelineIdr: totalPipelineIdr,
                avgMargin: avgMargin,
                lowMarginCount: lowMarginCount,
                compliantCount: compliantCount,
                hasWarning: lowMarginCount > 0
            };
        },

        async fetchAuditLogs() {
            if (!this.currentUser || (this.currentUser.role !== 'admin' && this.currentUser.role !== 'overseer')) return;
            this.auditLoading = true;
            try {
                const qs = new URLSearchParams({ limit: '150', action: this.auditActionFilter || 'all' });
                const resp = await fetch(`/api/audit/logs?${qs.toString()}`, {
                    headers: { 'Authorization': `Bearer ${this.sessionToken}` }
                });
                const data = await resp.json();
                if (data.status === 'ok') {
                    this.auditLogs = data.logs || [];
                }
            } catch (e) {
                console.warn('Audit fetch error:', e);
            } finally {
                this.auditLoading = false;
            }
        },

        getFilteredAuditLogs() {
            let logs = this.auditLogs || [];
            if (this.auditActionFilter && this.auditActionFilter !== 'all') {
                logs = logs.filter(l => (l.action || '').toLowerCase() === this.auditActionFilter.toLowerCase());
            }
            if (this.auditSearchQuery && this.auditSearchQuery.trim()) {
                const q = this.auditSearchQuery.toLowerCase().trim();
                logs = logs.filter(l =>
                    (l.name || '').toLowerCase().includes(q) ||
                    (l.username || '').toLowerCase().includes(q) ||
                    (l.detail || '').toLowerCase().includes(q) ||
                    (l.action || '').toLowerCase().includes(q) ||
                    (l.ip || '').toLowerCase().includes(q)
                );
            }
            return logs;
        },

        async loadProjectFromDrive(fileId) {
            try {
                const resp = await fetch('/api/project/load-from-drive', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.sessionToken}`
                    },
                    body: JSON.stringify({ file_id: fileId })
                });
                const data = await resp.json();
                if (data.status === 'ok' && data.project) {
                    const p = data.project;
                    this.projName = p.projName || this.projName;
                    this.clientName = p.clientName || this.clientName;
                    this.projLocation = p.projLocation || this.projLocation;
                    if (p.sizingInputs) {
                        const si = p.sizingInputs;
                        this.industry = si.industry || this.industry;
                        this.areaInput = si.areaInput || this.areaInput;
                        this.areaUnit = si.areaUnit || this.areaUnit;
                        this.userCount = si.userCount || this.userCount;
                        this.terrain = si.terrain || this.terrain;
                        this.freqBand = si.freqBand || this.freqBand;
                        this.towerHeight = si.towerHeight || this.towerHeight;
                        this.buildingFloors = si.buildingFloors || this.buildingFloors;
                        this.powerSource = si.powerSource || this.powerSource;
                        this.backupHours = si.backupHours || this.backupHours;
                        this.backhaul = si.backhaul || this.backhaul;
                        this.needAtex = si.needAtex || false;
                        this.needDispatch = si.needDispatch || false;
                        this.needCctv = si.needCctv || false;
                        this.cctvCount = si.cctvCount || 8;
                    }
                    if (p.dasState) {
                        this.das = Object.assign(this.das, p.dasState);
                    }
                    if (p.activeWorkspace) {
                        this.activeWorkspace = p.activeWorkspace;
                    }
                    this.syncBoqFromSizing();
                    this.runCoverageSimulation();
                    this.archiveModalOpen = false;
                    this.activeTab = 'boq';
                    alert(this.lang === 'en' ? 'Project successfully restored from Google Drive!' : 'Proyek berhasil dimuat kembali dari Google Drive!');
                }
            } catch (e) {
                alert(this.lang === 'en' ? 'Error loading project file.' : 'Gagal memuat file proyek.');
            }
        },

        // ─── Multi-Option Solution Comparison Matrix ─────────────────────
        get comparisonOptions() {
            const isEn = this.lang === 'en';
            const s = this.sizingResult;
            const users = s.userCount;

            // Option 1: Conventional DMR (Entry)
            const opt1Sites = s.outdoorSites;
            const opt1Rpt = opt1Sites;
            const opt1Capex = (opt1Rpt * 78050000) + (users * 5400000) + (opt1Sites * 4 * 3500000);

            // Option 2: Capacity Plus Trunking (Recommended)
            const opt2Sites = s.outdoorSites;
            const opt2Rpt = s.totalOutdoorRepeaters;
            const opt2Capex = (opt2Rpt * 78050000) + (opt2Rpt * 12500000) + (users * 14800000) + (s.totalOutdoorRepeaters * 5 * 3500000);

            // Option 3: Turnkey Hybrid (Trunking + In-Building DAS + CCTV AI Avigilon)
            const opt3Capex = opt2Capex + (s.dasNodes > 0 ? s.dasNodes * 60300000 : 60300000) + (8 * 24500000 + 145000000) + (10 * 3500000);

            return [
                {
                    tier: 'opt1',
                    title: this.t('optConventional'),
                    badge: isEn ? 'Budget / Entry-Level' : 'Ekonomis / Standar',
                    badgeColor: 'bg-slate-100 text-slate-800',
                    topology: 'DMR Tier 2 Conventional',
                    repeaters: `${opt1Rpt}x MOTOTRBO SLR 5300`,
                    terminals: `${users}x MOTOTRBO R2 (Workhorse)`,
                    timeSlots: `${opt1Rpt * 2} TDMA Slots`,
                    cctv: isEn ? 'None' : 'Tidak Ada',
                    dispatch: isEn ? 'Basic Desktop Mic' : 'Desktop Mic Sederhana',
                    estCapex: opt1Capex,
                    pros: isEn ? 'Lowest investment, simple maintenance' : 'Investasi paling hemat, pemeliharaan mudah',
                    cons: isEn ? 'Static channel, higher queuing at peak' : 'Kanal statis, antrean saat trafik padat'
                },
                {
                    tier: 'opt2',
                    title: this.t('optCapPlus'),
                    badge: isEn ? 'Recommended (Best Value)' : 'Rekomendasi Utama (Best Value)',
                    badgeColor: 'bg-blue-100 text-blue-900 border border-blue-300 font-extrabold',
                    topology: s.topologyName,
                    repeaters: `${opt2Rpt}x MOTOTRBO SLR 5300`,
                    terminals: `${s.htQty}x ${s.recommendedHtModel} + ${s.mobileQty}x Mobile`,
                    timeSlots: `${s.totalTimeSlots} TDMA Slots`,
                    cctv: isEn ? 'Optional Add-on' : 'Opsional Tambahan',
                    dispatch: 'RadioPro Dispatch & GPS AVL',
                    estCapex: opt2Capex,
                    pros: isEn ? 'Dynamic pooling, zero waiting, crystal audio' : 'Pooling dinamis tanpa antre, audio jernih SINC+',
                    cons: isEn ? 'Requires trunking licenses per repeater' : 'Memerlukan lisensi trunking per repeater'
                },
                {
                    tier: 'opt3',
                    title: this.t('optHybrid'),
                    badge: isEn ? 'Enterprise Turnkey' : 'Solusi Menyeluruh (Turnkey)',
                    badgeColor: 'bg-purple-100 text-purple-900',
                    topology: 'MOTOTRBO LCP + Avigilon Unity Video 8',
                    repeaters: `${opt2Rpt}x SLR 5300 + 1x SLR 1000 DAS`,
                    terminals: `${s.htQty}x MOTOTRBO Ion/R7 + M8600i`,
                    timeSlots: `${s.totalTimeSlots + 2} TDMA Slots`,
                    cctv: '8x Avigilon AI Dome/Bullet + AI NVR',
                    dispatch: 'MOTOTRBO WAVE PTX LTE + RadioPro',
                    estCapex: opt3Capex,
                    pros: isEn ? 'Total voice + AI video + LTE PTX convergence' : 'Konvergensi penuh suara radio + video AI + LTE PoC',
                    cons: isEn ? 'Higher initial CAPEX budget' : 'Investasi modal awal lebih tinggi'
                }
            ];
        },

        // ─── Margin Guardrail ────────────────────────────────────────────
        get effectiveMarginPercent() {
            const baseMargin = Number(this.marginPercent || 15);
            const disc = Number(this.discountPercent || 0);
            return Math.max(-50, baseMargin - disc);
        },

        get isMarginAtRisk() {
            return this.effectiveMarginPercent < 10.0;
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

                    // Sync dedicated RFoF_DAS_FMTCS Google Sheet tab into DAS Engine & BoQ state
                    if (Array.isArray(k.rfof_das_catalog) && k.rfof_das_catalog.length > 0) {
                        this.das.cloudPrices = this.das.cloudPrices || {};
                        this.das.cloudCogs = this.das.cloudCogs || {};
                        k.rfof_das_catalog.forEach((dItem) => {
                            if (dItem.sku) {
                                if (dItem.price_usd > 0) this.das.cloudPrices[dItem.sku] = dItem.price_usd;
                                if (dItem.cogs_usd > 0) this.das.cloudCogs[dItem.sku] = dItem.cogs_usd;
                                if (window.CDPK_DAS_ENGINE && Array.isArray(window.CDPK_DAS_ENGINE.devices)) {
                                    const dev = window.CDPK_DAS_ENGINE.devices.find(x => x.sku === dItem.sku);
                                    if (dev) {
                                        if (dItem.price_usd > 0) dev.defaultPriceUsd = dItem.price_usd;
                                        if (dItem.cogs_usd > 0) dev.cogsUsd = dItem.cogs_usd;
                                    }
                                }
                            }
                        });
                    }
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

        resetSizingInputs() {
            this.resetModalOpen = true;
        },

        resetFormToBlank() {
            this.projName = '';
            this.clientName = '';
            this.projLocation = '';
            this.salesPic = (this.currentUser && this.currentUser.name) ? this.currentUser.name : '';
            this.industry = 'mining';
            this.areaInput = '';
            this.areaUnit = 'km2';
            this.userCount = '';
            this.terrain = 'hilly';
            this.freqBand = 'uhf';
            this.towerHeight = 35;
            this.buildingFloors = '';
            this.powerSource = 'pln_ups';
            this.backupHours = 8;
            this.backhaul = 'fiber';
            this.needAtex = false;
            this.needEncryption = false;
            this.needGps = false;
            this.needManDown = false;
            this.needDispatch = false;
            this.needCctv = false;
            this.cctvCount = 0;
            this.activeTechSlide = 0;
            this.resetDasBoq(true, true);
            this.syncBoqFromSizing();
            this.runCoverageSimulation();
            this.resetModalOpen = false;
            this.showToast(this.t('resetToastBlank') || 'Formulir berhasil dikosongkan. Silakan mulai input rancangan proyek baru Anda!', 'success');
        },

        resetFormToDemo() {
            this.projName = 'Modernisasi Sistem Komunikasi Radio DMR & Keamanan';
            this.clientName = 'PT Nusantara Energi & Pertambangan';
            this.projLocation = 'Kalimantan Timur, Indonesia';
            this.salesPic = (this.currentUser && this.currentUser.name) ? this.currentUser.name : 'Presales Engineering Team — CDPK';
            this.industry = 'mining';
            this.areaInput = 35;
            this.areaUnit = 'km2';
            this.userCount = 120;
            this.terrain = 'hilly';
            this.freqBand = 'uhf';
            this.towerHeight = 35;
            this.buildingFloors = 4;
            this.powerSource = 'pln_ups';
            this.backupHours = 8;
            this.backhaul = 'fiber';
            this.needAtex = false;
            this.needEncryption = false;
            this.needGps = true;
            this.needManDown = true;
            this.needDispatch = true;
            this.needCctv = false;
            this.cctvCount = 8;
            this.activeTechSlide = 0;
            this.resetDasBoq(false, true);
            this.syncBoqFromSizing();
            this.runCoverageSimulation();
            this.resetModalOpen = false;
            this.showToast(this.t('resetToastDemo') || 'Template baseline pertambangan berhasil dimuat ulang.', 'info');
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

        // ─── Module 5: RF Coverage Simulation (60x60 Path Loss Grid & GIS Map) ──
        runCoverageSimulation() {
            const canvas = document.getElementById('cdpkCoverageCanvas');
            if (canvas) {
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
            }
            if (this.coverageViewMode === 'gis') {
                this.$nextTick(() => this.initOrUpdateGisMap());
            }
        },

        initOrUpdateGisMap() {
            if (typeof L === 'undefined') return;
            const mapContainer = document.getElementById('cdpkLeafletMap');
            if (!mapContainer) return;

            const lat = parseFloat(this.covLat) || -1.2379;
            const lon = parseFloat(this.covLon) || 116.8529;

            if (!this.gisMap) {
                this.gisMap = L.map('cdpkLeafletMap', {
                    zoomControl: true,
                    attributionControl: false,
                    scrollWheelZoom: false,
                    tap: false,
                    touchZoom: true
                }).setView([lat, lon], 12);

                this.updateGisTileLayer();
            } else {
                this.gisMap.setView([lat, lon], this.gisMap.getZoom());
                setTimeout(() => { if (this.gisMap) this.gisMap.invalidateSize(); }, 150);
            }

            // Remove existing overlay layers
            if (this.gisOverlayLayers && this.gisOverlayLayers.length > 0) {
                this.gisOverlayLayers.forEach(layer => {
                    try { this.gisMap.removeLayer(layer); } catch (e) {}
                });
            }
            this.gisOverlayLayers = [];

            const s = this.sizingResult;
            const txWatt = Number(this.covTxWatts || 50);
            const txDbm = 10 * Math.log10(txWatt * 1000);
            const antGainDbi = Number(this.covAntGainDbi || 6.5);
            const cableLossDb = Number(this.covCableLossDb || 2.1);
            const towerHeight = Number(s.towerHeight || 35);
            const eirpDbm = txDbm + antGainDbi - cableLossDb;

            // Propagation radii calculation (Okumura-Hata approximation for DMR)
            const terrainFactor = this.terrain === 'mountainous' ? 0.65 : (this.terrain === 'hilly' ? 0.82 : (this.terrain === 'dense' ? 0.75 : 1.15));
            const baseRadiusKm = (eirpDbm / 38) * (towerHeight / 30) * 8.5 * terrainFactor;

            // Multi-tier RF signal zones
            const coreRadiusMeters = Math.max(400, Math.round(baseRadiusKm * 0.25 * 1000));
            const strongRadiusMeters = Math.max(800, Math.round(baseRadiusKm * 0.50 * 1000));
            const fairRadiusMeters = Math.max(1500, Math.round(baseRadiusKm * 0.85 * 1000));
            const fringeRadiusMeters = Math.max(2200, Math.round(baseRadiusKm * 1.25 * 1000));
            const deadRadiusMeters = Math.max(3000, Math.round(baseRadiusKm * 1.60 * 1000));

            const numSites = Math.max(1, Math.min(8, parseInt(s.outdoorSites || 1, 10)));
            const sites = [];

            if (numSites === 1) {
                sites.push({ name: 'Site 1 (Main Base Station)', lat: lat, lon: lon });
            } else {
                const spreadKm = (Math.sqrt(Math.max(10, s.areaKm2)) * 0.35) / 111.32;
                for (let i = 0; i < numSites; i++) {
                    const angle = (2 * Math.PI * i) / numSites - Math.PI / 4;
                    sites.push({
                        name: `Site ${i + 1} (${s.primaryRepeaterModel})`,
                        lat: lat + spreadKm * Math.cos(angle) * 0.8,
                        lon: lon + spreadKm * Math.sin(angle) * 1.1
                    });
                }
            }
            this.gisSites = sites;

            const op = Number(this.gisHeatmapOpacity || 0.50);
            const rings = Boolean(this.showGisRings);

            sites.forEach((site, idx) => {
                // Zone 5: Dead-Zone Outer Limit Contour (Red)
                const deadCircle = L.circle([site.lat, site.lon], {
                    radius: deadRadiusMeters,
                    color: '#ef4444',
                    fillColor: '#ef4444',
                    fillOpacity: op * 0.08,
                    weight: rings ? 1 : 0,
                    dashArray: '3, 6'
                }).addTo(this.gisMap);
                this.gisOverlayLayers.push(deadCircle);

                // Zone 4: Fringe / Marginal Signal (-96..-105 dBm) (Orange)
                const fringeCircle = L.circle([site.lat, site.lon], {
                    radius: fringeRadiusMeters,
                    color: '#ea580c',
                    fillColor: '#f97316',
                    fillOpacity: op * 0.25,
                    weight: rings ? 1.5 : 0,
                    dashArray: '5, 5'
                }).addTo(this.gisMap);
                this.gisOverlayLayers.push(fringeCircle);

                // Zone 3: Fair Coverage (-86..-95 dBm) (Yellow / Amber)
                const fairCircle = L.circle([site.lat, site.lon], {
                    radius: fairRadiusMeters,
                    color: '#d97706',
                    fillColor: '#f59e0b',
                    fillOpacity: op * 0.45,
                    weight: rings ? 1.5 : 0
                }).addTo(this.gisMap);
                this.gisOverlayLayers.push(fairCircle);

                // Zone 2: Strong Coverage (-66..-85 dBm) (Emerald Green)
                const strongCircle = L.circle([site.lat, site.lon], {
                    radius: strongRadiusMeters,
                    color: '#059669',
                    fillColor: '#10b981',
                    fillOpacity: op * 0.65,
                    weight: rings ? 2 : 0
                }).addTo(this.gisMap);
                this.gisOverlayLayers.push(strongCircle);

                // Zone 1: Core Coverage (>= -65 dBm) (Deep Sky Blue)
                const coreCircle = L.circle([site.lat, site.lon], {
                    radius: coreRadiusMeters,
                    color: '#0284c7',
                    fillColor: '#0ea5e9',
                    fillOpacity: op * 0.85,
                    weight: rings ? 2.5 : 0
                }).addTo(this.gisMap);
                this.gisOverlayLayers.push(coreCircle);

                // Site Marker (Draggable for main site)
                const siteIcon = L.divIcon({
                    className: 'cdpk-gis-marker',
                    html: `<div style="background: linear-gradient(135deg, #0284c7, #0369a1); color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 11px; border: 2.5px solid #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.45); cursor: grab;">R${idx + 1}</div>`,
                    iconSize: [30, 30],
                    iconAnchor: [15, 15]
                });

                const marker = L.marker([site.lat, site.lon], { 
                    icon: siteIcon, 
                    draggable: (idx === 0) 
                }).addTo(this.gisMap);

                if (idx === 0) {
                    marker.on('dragend', (e) => {
                        const pos = e.target.getLatLng();
                        this.covLat = parseFloat(pos.lat.toFixed(4));
                        this.covLon = parseFloat(pos.lng.toFixed(4));
                        this.initOrUpdateGisMap();
                        this.showToast(this.lang === 'en' ? `Site moved to ${this.covLat}, ${this.covLon}` : `Posisi site dipindahkan ke ${this.covLat}, ${this.covLon}`, 'info');
                    });
                }

                marker.bindPopup(`
                    <div style="font-family: sans-serif; font-size: 12px; line-height: 1.45; min-width: 200px;">
                        <strong style="color: #0369a1; font-size: 13px;">📡 ${site.name}</strong><br/>
                        <span style="color: #64748b;">Repeater:</span> <strong>${s.primaryRepeaterModel}</strong><br/>
                        <span style="color: #64748b;">TX Power:</span> <strong>${this.covTxWatts} W (EIRP ${eirpDbm.toFixed(1)} dBm)</strong><br/>
                        <span style="color: #64748b;">Tinggi Tower:</span> <strong>${towerHeight} m</strong><br/>
                        <span style="color: #64748b;">Inti Core (≥ -65 dBm):</span> <strong style="color: #0284c7;">~${(coreRadiusMeters/1000).toFixed(1)} km</strong><br/>
                        <span style="color: #64748b;">Radius Kuat (≥ -85 dBm):</span> <strong style="color: #10b981;">~${(strongRadiusMeters/1000).toFixed(1)} km</strong><br/>
                        <span style="color: #64748b;">Batas Fringe (-105 dBm):</span> <strong style="color: #ea580c;">~${(fringeRadiusMeters/1000).toFixed(1)} km</strong>
                    </div>
                `);
                this.gisOverlayLayers.push(marker);
            });

            // Map Click repositioning listener
            if (!this.gisMapClickHandlerSet) {
                this.gisMap.on('click', (e) => {
                    this.covLat = parseFloat(e.latlng.lat.toFixed(4));
                    this.covLon = parseFloat(e.latlng.lng.toFixed(4));
                    this.initOrUpdateGisMap();
                    this.showToast(this.lang === 'en' ? `Site positioned to ${this.covLat}, ${this.covLon}` : `Titik site dipindahkan ke ${this.covLat}, ${this.covLon}`, 'info');
                });
                this.gisMapClickHandlerSet = true;
            }

            // Real-time hover signal strength probe listener
            if (!this.gisMapMouseMoveHandlerSet) {
                this.gisMap.on('mousemove', (e) => {
                    this.updateGisSignalProbe(e.latlng);
                });
                this.gisMap.on('mouseout', () => {
                    this.gisProbe.active = false;
                });
                this.gisMapMouseMoveHandlerSet = true;
            }

            if (this.gisOverlayLayers.length > 0) {
                const group = new L.featureGroup(this.gisOverlayLayers);
                this.gisMap.fitBounds(group.getBounds().pad(0.15));
            }
        },

        updateGisHeatmapOpacity() {
            this.initOrUpdateGisMap();
        },

        applyManualCoords() {
            const lat = parseFloat(this.covLat);
            const lon = parseFloat(this.covLon);
            if (isNaN(lat) || isNaN(lon)) {
                this.showToast(this.lang === 'en' ? 'Invalid latitude or longitude value.' : 'Nilai latitude atau longitude tidak valid.', 'error');
                return;
            }
            this.covLat = parseFloat(lat.toFixed(4));
            this.covLon = parseFloat(lon.toFixed(4));
            this.runCoverageSimulation();
            if (this.coverageViewMode === 'gis') {
                this.initOrUpdateGisMap();
            }
            this.showToast(this.lang === 'en' ? `Coordinates set to ${this.covLat}, ${this.covLon}` : `Koordinat berhasil diterapkan: ${this.covLat}, ${this.covLon}`, 'success');
        },

        detectDeviceGps() {
            if (!navigator.geolocation) {
                this.showToast(this.t('covGpsError') || 'Geolocation tidak didukung browser ini.', 'error');
                return;
            }
            this.isDetectingGps = true;
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    this.isDetectingGps = false;
                    this.covLat = parseFloat(pos.coords.latitude.toFixed(4));
                    this.covLon = parseFloat(pos.coords.longitude.toFixed(4));
                    const accMeters = pos.coords.accuracy ? Math.round(pos.coords.accuracy) : null;
                    this.runCoverageSimulation();
                    if (this.coverageViewMode === 'gis') {
                        this.initOrUpdateGisMap();
                    }
                    const msg = this.lang === 'en'
                        ? `GPS fixed: ${this.covLat}, ${this.covLon}${accMeters ? ` (Accuracy: ±${accMeters}m)` : ''}`
                        : `GPS terhubung: ${this.covLat}, ${this.covLon}${accMeters ? ` (Akurasi: ±${accMeters}m)` : ''}`;
                    this.showToast(msg, 'success');
                },
                (err) => {
                    this.isDetectingGps = false;
                    console.warn('GPS detection error:', err);
                    let errTxt = 'Gagal mendeteksi GPS atau izin lokasi ditolak.';
                    if (err.code === 1) {
                        errTxt = this.lang === 'en' ? 'Location permission denied. Please allow location access in browser/device settings.' : 'Izin lokasi ditolak. Izinkan akses lokasi pada browser atau HP Anda.';
                    } else if (err.code === 2) {
                        errTxt = this.lang === 'en' ? 'Position unavailable. Ensure GPS / Location service is turned on.' : 'Posisi satelit tidak tersedia. Pastikan GPS/Layanan Lokasi di HP telah aktif.';
                    } else if (err.code === 3) {
                        errTxt = this.lang === 'en' ? 'GPS timeout. Please try again in an open-sky area.' : 'Waktu deteksi GPS habis. Silakan coba kembali di area terbuka.';
                    }
                    this.showToast(errTxt, 'error');
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
            );
        },

        updateGisSignalProbe(latlng) {
            if (!latlng || !this.gisSites || this.gisSites.length === 0) return;
            const probeLat = latlng.lat;
            const probeLon = latlng.lng;

            // Find nearest site using spherical distance approximation
            let minDistKm = Infinity;
            this.gisSites.forEach(s => {
                const dLat = (probeLat - s.lat) * 111.32;
                const dLon = (probeLon - s.lon) * 111.32 * Math.cos(((probeLat + s.lat) / 2) * Math.PI / 180);
                const dist = Math.sqrt(dLat * dLat + dLon * dLon);
                if (dist < minDistKm) {
                    minDistKm = dist;
                }
            });

            const dKm = minDistKm;
            const s = this.sizingResult;
            const txWatt = Number(this.covTxWatts || 50);
            const txDbm = 10 * Math.log10(txWatt * 1000);
            const antGainDbi = Number(this.covAntGainDbi || 6.5);
            const cableLossDb = Number(this.covCableLossDb || 2.1);
            const eirpDbm = txDbm + antGainDbi - cableLossDb;
            const towerH = Number(s.towerHeight || 35);
            const freqMhz = this.freqBand === 'vhf' ? 160 : (this.freqBand === '800' ? 850 : 450);

            // Okumura-Hata empirical path loss
            const terrainN = { flat: 2.35, hilly: 3.10, mountainous: 3.70, dense: 3.45, indoor: 3.90, mixed_inout: 3.50 };
            const exp = terrainN[this.terrain] || 3.10;
            const pl0 = 69.55 + 26.16 * Math.log10(freqMhz) - 13.82 * Math.log10(towerH);
            const slope = (44.9 - 6.55 * Math.log10(towerH)) * (exp / 3.0);
            const pl = dKm <= 0.05 ? 35 : (pl0 + slope * Math.log10(Math.max(0.08, dKm)));
            const rssiDbm = Math.round((eirpDbm - pl) * 10) / 10;
            const rxSensDbm = -118; // DMR receiver sensitivity threshold
            const marginDb = Math.round((rssiDbm - rxSensDbm) * 10) / 10;

            let quality = '';
            let color = '';
            if (rssiDbm >= -65) {
                quality = this.lang === 'en' ? 'Excellent (Core)' : 'Sangat Kuat (Core)';
                color = '#0284c7';
            } else if (rssiDbm >= -85) {
                quality = this.lang === 'en' ? 'Strong (Indoor HT)' : 'Kuat (Indoor HT)';
                color = '#10b981';
            } else if (rssiDbm >= -95) {
                quality = this.lang === 'en' ? 'Fair (Outdoor)' : 'Cukup (Outdoor)';
                color = '#f59e0b';
            } else if (rssiDbm >= -105) {
                quality = this.lang === 'en' ? 'Edge / Fringe' : 'Sinyal Lemah / Edge';
                color = '#ea580c';
            } else {
                quality = this.lang === 'en' ? 'Dead Zone' : 'Di Luar Jangkauan';
                color = '#ef4444';
            }

            this.gisProbe = {
                active: true,
                lat: probeLat.toFixed(4),
                lon: probeLon.toFixed(4),
                distKm: dKm.toFixed(2),
                rssiDbm: rssiDbm,
                marginDb: marginDb,
                quality: quality,
                color: color
            };
        },

        updateGisTileLayer() {
            if (!this.gisMap || typeof L === 'undefined') return;
            if (this.gisTileLayer) {
                try { this.gisMap.removeLayer(this.gisTileLayer); } catch (e) {}
            }
            if (this.gisBasemap === 'sat') {
                this.gisTileLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                    maxZoom: 18,
                    attribution: 'Esri World Imagery'
                }).addTo(this.gisMap);
            } else {
                this.gisTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: 'OpenStreetMap'
                }).addTo(this.gisMap);
            }
        },

        setGisBasemap(type) {
            this.gisBasemap = type;
            this.updateGisTileLayer();
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
                    if (this.coverageViewMode === 'gis') {
                        this.initOrUpdateGisMap();
                    }
                }
            } catch (e) {
                console.warn('Geocode error:', e);
            }
        },

        // ─── Module 6: Multi-Model AI Copilot (Gemini 3.8 Flash & Pro) ───
        selectAiModel(modelId) {
            this.aiModel = modelId;
            try {
                localStorage.setItem('cdpk_ai_model', modelId);
            } catch (e) {}

            // If user already ran a prompt and switches between Flash and Pro, automatically re-evaluate the last user prompt with the newly selected model
            if (!this.aiLoading && this.aiHistory.length >= 2) {
                const lastMsg = this.aiHistory[this.aiHistory.length - 1];
                const prevUserMsg = [...this.aiHistory].reverse().find(m => m.role === 'user');
                if (lastMsg && lastMsg.role === 'assistant' && lastMsg.modelId !== modelId && prevUserMsg) {
                    this.aiHistory.pop();
                    this.aiPrompt = prevUserMsg.text;
                    // Remove the duplicate user message before re-sending so history stays clean
                    const lastUserIdx = this.aiHistory.lastIndexOf(prevUserMsg);
                    if (lastUserIdx !== -1) this.aiHistory.splice(lastUserIdx, 1);
                    this.sendAiCopilotMessage();
                }
            }
        },

        clearAiHistory() {
            this.aiHistory = [];
            this.lastExtractedParams = null;
            this.aiPrompt = '';
        },

        setQuickAiPrompt(text) {
            this.aiPrompt = text;
            this.sendAiCopilotMessage();
        },

        async fetchKnowledgeBankStatus() {
            try {
                const resp = await fetch('/api/knowledge/bank/status');
                if (resp.ok) {
                    const data = await resp.json();
                    this.knowledgeBankStatus = {
                        total_documents: data.total_documents || 0,
                        is_syncing: !!data.is_syncing,
                        last_synced: data.last_synced || null,
                        recent_documents: data.recent_documents || []
                    };
                }
            } catch (e) {
                console.warn('Failed fetching knowledge bank status:', e);
            }
        },

        async triggerKnowledgeBankSync() {
            if (this.knowledgeBankStatus.is_syncing) return;
            this.knowledgeBankStatus.is_syncing = true;
            try {
                const resp = await fetch('/api/knowledge/bank/sync', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ force: false, batch_size: 15 })
                });
                const data = await resp.json();
                await this.fetchKnowledgeBankStatus();
            } catch (e) {
                console.warn('Knowledge sync trigger error:', e);
            } finally {
                this.knowledgeBankStatus.is_syncing = false;
            }
        },

        async sendAiCopilotMessage() {
            const promptText = (this.aiPrompt || '').trim();
            if (!promptText || this.aiLoading) return;
            const requestedModel = this.aiModel || 'gemini-3.8-pro';

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
                        model: requestedModel,
                        prompt: promptText,
                        lang: this.lang,
                        state: {
                            industry: this.industry,
                            areaInput: this.areaInput,
                            areaUnit: this.areaUnit,
                            userCount: this.userCount,
                            terrain: this.terrain,
                            freqBand: this.freqBand,
                            buildingFloors: this.buildingFloors,
                            needAtex: this.needAtex,
                            powerSource: this.powerSource,
                            backhaul: this.backhaul
                        }
                    })
                });
                const data = await resp.json();
                this.lastExtractedParams = data.extracted_params || null;
                this.aiHistory.push({
                    role: 'assistant',
                    modelId: data.model || requestedModel,
                    model: data.model_name || (requestedModel === 'gemini-3.8-pro' ? 'Google Gemini 3.8 Pro' : 'Google Gemini 3.8 Flash'),
                    text: data.reply || 'Analysis complete.',
                    extracted: data.extracted_params || null,
                    citations: data.citations || null,
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

        formatAiMarkdown(rawText) {
            if (!rawText) return '';
            let html = String(rawText);

            // 1. Code blocks ```...```
            html = html.replace(/```(?:[a-zA-Z0-9_]+)?\n([\s\S]*?)```/g, (match, code) => {
                return `<pre class="bg-slate-900 text-emerald-400 p-2.5 rounded-lg text-[11px] font-mono overflow-x-auto my-2 leading-tight">${code.trim()}</pre>`;
            });

            // 2. Tables | ... |
            html = html.replace(/((?:\|[^\n]+\|\r?\n)+)/g, (tableText) => {
                const lines = tableText.trim().split('\n').filter(l => l.trim().startsWith('|'));
                if (lines.length < 2) return tableText;
                let tableHtml = '<div class="overflow-x-auto my-2 rounded-lg border border-slate-200 shadow-xs"><table class="w-full text-[11px] border-collapse bg-white">';
                lines.forEach((line, idx) => {
                    const cells = line.split('|').slice(1, -1).map(c => c.trim());
                    if (cells.every(c => c.match(/^:?-+:?$/))) {
                        return; // separator line
                    }
                    if (idx === 0) {
                        tableHtml += '<thead class="bg-slate-100 text-slate-800 font-bold border-b border-slate-200"><tr>';
                        cells.forEach(c => { tableHtml += `<th class="p-2 text-left border-r border-slate-200 last:border-r-0 whitespace-nowrap">${c}</th>`; });
                        tableHtml += '</tr></thead><tbody>';
                    } else {
                        tableHtml += '<tr class="border-b border-slate-100 hover:bg-slate-50 transition">';
                        cells.forEach(c => { tableHtml += `<td class="p-2 text-slate-700 border-r border-slate-100 last:border-r-0">${c}</td>`; });
                        tableHtml += '</tr>';
                    }
                });
                tableHtml += '</tbody></table></div>';
                return tableHtml;
            });

            // 3. Headers
            html = html.replace(/^### (.*$)/gim, '<div class="text-sm font-extrabold text-blue-900 mt-2.5 mb-1 pb-0.5 border-b border-blue-100">$1</div>');
            html = html.replace(/^#### (.*$)/gim, '<div class="font-bold text-slate-900 mt-2 mb-0.5 text-xs flex items-center gap-1">$1</div>');

            // 4. Blockquotes
            html = html.replace(/^> (.*$)/gim, '<div class="border-l-4 border-amber-500 pl-2.5 py-1 text-slate-700 bg-amber-50/70 my-1.5 rounded-r text-[11px]">$1</div>');

            // 5. Bold & inline code
            html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>');
            html = html.replace(/`([^`]+)`/g, '<code class="bg-slate-100 text-blue-800 px-1 py-0.5 rounded text-[11px] font-mono border border-slate-200">$1</code>');

            // 6. Security Policy: Strip links [text](url) to plain bold text (never render external/Drive hyperlinks)
            html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<strong class="font-bold text-slate-900">$1</strong>');
            html = html.replace(/https?:\/\/drive\.google\.com\/[^\s)<"]+/g, '[Internal Knowledge Bank]');

            return html;
        },

        applyAiParamsToApp(extracted, targetTab = 'sizing') {
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
            if (ext.topologyType === 'point_to_point') this.backhaul = 'radio_ip';

            // AI Copilot Auto-Fill Bridge to RFoF DAS by FMTCS
            if (ext.needFiberDas || ext.das || ext.needDas || targetTab === 'das') {
                const flCount = Math.max(1, parseInt(ext.buildingFloors !== undefined ? ext.buildingFloors : this.buildingFloors, 10) || 4);
                const antPerFl = ext.dasAntennasPerFloor || 8;
                this.das.floors = Array.from({ length: flCount }, (_, i) => ({
                    f: (this.lang === 'en' ? 'Floor ' : 'Lantai ') + (i + 1),
                    q: antPerFl
                }));
                if (ext.dasArchMode) this.das.archMode = ext.dasArchMode;
                if (ext.dasFiberTopo) this.das.fiberTopo = ext.dasFiberTopo;
                this.das.rep = ext.dasRepeaters || Math.max(1, (this.sizingResult && this.sizingResult.totalRepeaters) || 2);
                this.das.radio = ext.dasRadios || this.userCount || 40;
            }

            this.syncBoqFromSizing();
            this.runCoverageSimulation();
            this.aiModalOpen = false;
            if (targetTab === 'das') {
                this.activeWorkspace = 'das';
                this.dasActiveTab = 'boq';
                this.showToast(
                    this.lang === 'en'
                        ? 'Applied AI Copilot scenario directly to RFoF Distributed Antenna System.'
                        : 'Skenario AI Copilot berhasil diterapkan langsung ke RFoF Distributed Antenna System.',
                    'success'
                );
            } else {
                this.activeWorkspace = 'dmr';
                this.activeTab = targetTab || 'sizing';
            }
        },

        applyAiExtractedParams(extracted) {
            return this.applyAiParamsToApp(extracted);
        },

        // ─── Module 7: Product & System Configurator Methods ─────────────
        addSystemPackage(type = 'ht') {
            const nextIdx = this.systemPackages.length + 1;
            const pkgId = 'PKG-' + Date.now().toString(36).slice(-4).toUpperCase();
            if (type === 'slr') {
                this.systemPackages.push({
                    id: pkgId,
                    name: `Paket ${nextIdx}: MOTOTRBO SLR 5300 Repeater System`,
                    category: 'slr',
                    mainSku: 'MOT-RPT-SLR5300',
                    quantity: 1,
                    frequency: 'UHF',
                    marginPercent: 20,
                    slrOptions: {
                        duplexer: true,
                        cavityTuning: true,
                        antennaType: 'omni',
                        antennaCount: 1,
                        feederType: '78',
                        feederMeters: 45,
                        arrester: true,
                        onlineUps: true,
                        upsVa: 1500,
                        rackCabinet: true,
                        ipscLicense: true,
                        engineeringService: true
                    },
                    htOptions: {}
                });
            } else {
                this.systemPackages.push({
                    id: pkgId,
                    name: `Paket ${nextIdx}: MOTOTRBO R7 Radio Fleet`,
                    category: 'ht',
                    mainSku: 'MOT-HT-R7',
                    quantity: 6,
                    frequency: 'UHF',
                    marginPercent: 20,
                    slrOptions: {},
                    htOptions: {
                        extraBattery: true,
                        batteryRatio: 1,
                        chargerType: '6way',
                        chargerCount: 1,
                        rsmMic: true,
                        rsmCount: 6,
                        earpiece: false,
                        earpieceCount: 0,
                        swivelCase: true,
                        swivelCaseCount: 6,
                        aesLicense: false
                    }
                });
            }
            this.activeConfigPkgId = pkgId;
        },

        duplicateSystemPackage(pkgId) {
            const src = this.systemPackages.find(p => p.id === pkgId);
            if (!src) return;
            const newId = 'PKG-' + Date.now().toString(36).slice(-4).toUpperCase();
            const clone = JSON.parse(JSON.stringify(src));
            clone.id = newId;
            clone.name = `[Salinan] ${src.name}`;
            this.systemPackages.push(clone);
            this.activeConfigPkgId = newId;
        },

        removeSystemPackage(pkgId) {
            if (this.systemPackages.length <= 1) {
                alert(this.lang === 'en' ? 'At least one system package must remain.' : 'Minimal harus ada 1 paket sistem tersisa.');
                return;
            }
            if (!confirm(this.lang === 'en' ? 'Delete this system package?' : 'Hapus paket sistem ini?')) return;
            this.systemPackages = this.systemPackages.filter(p => p.id !== pkgId);
            if (this.activeConfigPkgId === pkgId && this.systemPackages.length > 0) {
                this.activeConfigPkgId = this.systemPackages[0].id;
            }
        },

        calculatePackageBom(pkg) {
            const isEn = this.lang === 'en';
            const mult = 1.0 + (Number(pkg.marginPercent || 20) / 100.0);
            const items = [];

            // 1. Main Unit
            const mainProd = this.findProductBySku(pkg.mainSku);
            const mainQty = Math.max(1, Number(pkg.quantity || 1));
            const costIdr = mainProd ? Number(mainProd.price_idr || 0) : 0;
            const costUsd = mainProd && mainProd.price_usd ? Number(mainProd.price_usd) : (costIdr / Math.max(1, this.exchangeRate));

            items.push({
                sku: pkg.mainSku,
                name: mainProd ? `${mainProd.model} (${pkg.frequency || 'UHF'})` : pkg.mainSku,
                category: pkg.category === 'slr' ? 'Repeater Base Station' : 'Handy Talky Portable',
                qty: mainQty,
                unit: mainProd ? (mainProd.unit || 'Unit') : 'Unit',
                costIdr: costIdr,
                costUsd: costUsd,
                sellIdr: costIdr * mult,
                sellUsd: costUsd * mult,
                subtotalCostIdr: costIdr * mainQty,
                subtotalSellIdr: costIdr * mult * mainQty,
                subtotalCostUsd: costUsd * mainQty,
                subtotalSellUsd: costUsd * mult * mainQty,
                isMain: true
            });

            // 2. Add-ons
            if (pkg.category === 'slr') {
                const opts = pkg.slrOptions || {};
                // Duplexer
                if (opts.duplexer) {
                    const p = this.findProductBySku('RF-ACC-DUPLEXER');
                    const c = p ? Number(p.price_idr) : 6500000;
                    items.push({
                        sku: 'RF-ACC-DUPLEXER',
                        name: `Duplexer Band-Pass VHF/UHF High-Power 50W (Standard N-Female)`,
                        category: 'RF Filtering',
                        qty: mainQty,
                        unit: 'Unit',
                        costIdr: c,
                        sellIdr: c * mult,
                        subtotalCostIdr: c * mainQty,
                        subtotalSellIdr: c * mult * mainQty
                    });
                }
                // Cavity Tuning
                if (opts.cavityTuning) {
                    const c = 1500000;
                    items.push({
                        sku: 'SVC-CAVITY-TUNING',
                        name: `Jasa Engineering Tuning & Kalibrasi Frekuensi Cavity Duplexer (CDPK Lab)`,
                        category: 'Services & Engineering',
                        qty: mainQty,
                        unit: 'Site',
                        costIdr: c,
                        sellIdr: c * mult,
                        subtotalCostIdr: c * mainQty,
                        subtotalSellIdr: c * mult * mainQty
                    });
                }
                // Antenna
                if (opts.antennaType) {
                    const isOmni = opts.antennaType === 'omni';
                    const antSku = isOmni ? (pkg.frequency === 'VHF' ? 'AVT-ANT-AVO150' : 'AVT-ANT-AVO400') : 'AVT-ANT-TDJ900D';
                    const aProd = this.findProductBySku(antSku);
                    const c = aProd ? Number(aProd.price_idr) : (isOmni ? 6800000 : 4200000);
                    const antCount = Math.max(1, Number(opts.antennaCount || 1)) * mainQty;
                    items.push({
                        sku: antSku,
                        name: isOmni ? `Antena Base Station Omni High Gain Fiberglass (6-9 dBi)` : `Antena Base Directional Yagi (11-13 dBi)`,
                        category: 'Antenna RF',
                        qty: antCount,
                        unit: 'Unit',
                        costIdr: c,
                        sellIdr: c * mult,
                        subtotalCostIdr: c * antCount,
                        subtotalSellIdr: c * mult * antCount
                    });
                }
                // Feeder Cable
                const meters = Math.max(5, Number(opts.feederMeters || 45));
                const is78 = opts.feederType === '78';
                const cabSku = is78 ? 'RF-CAB-78-HELIAX' : 'RF-CAB-12-SUPERFLEX';
                const cProd = this.findProductBySku(cabSku);
                const pricePerMeter = cProd ? Number(cProd.price_idr) : (is78 ? 165000 : 85000);
                const totalMeters = meters * mainQty;
                items.push({
                    sku: cabSku,
                    name: is78 ? `Kabel Coaxial Heliax 7/8" Low-Loss Foam (${meters} meter/run)` : `Kabel Coaxial 1/2" Superflex Low-Loss (${meters} meter/run)`,
                    category: 'RF Cable & Feeder',
                    qty: totalMeters,
                    unit: 'Meter',
                    costIdr: pricePerMeter,
                    sellIdr: pricePerMeter * mult,
                    subtotalCostIdr: pricePerMeter * totalMeters,
                    subtotalSellIdr: pricePerMeter * mult * totalMeters
                });
                // Connectors, Jumpers & Grounding Kit
                const conProd = this.findProductBySku('RF-CON-NFEMALE-SET');
                const conPrice = conProd ? Number(conProd.price_idr) : 2400000;
                items.push({
                    sku: 'RF-CON-NFEMALE-SET',
                    name: `Set Konektor Coaxial N-Male/DIN 7/16 + Jumper RG-214 + Grounding Kit Tower`,
                    category: 'RF Accessories',
                    qty: mainQty,
                    unit: 'Set',
                    costIdr: conPrice,
                    sellIdr: conPrice * mult,
                    subtotalCostIdr: conPrice * mainQty,
                    subtotalSellIdr: conPrice * mult * mainQty
                });
                // Lightning Arrester
                if (opts.arrester) {
                    const arrProd = this.findProductBySku('RF-PROT-ARRESTER');
                    const arrPrice = arrProd ? Number(arrProd.price_idr) : 2850000;
                    items.push({
                        sku: 'RF-PROT-ARRESTER',
                        name: `RF Coaxial Lightning Surge Arrester (PolyPhaser / Diamond Gas Tube)`,
                        category: 'Protection & Grounding',
                        qty: mainQty,
                        unit: 'Unit',
                        costIdr: arrPrice,
                        sellIdr: arrPrice * mult,
                        subtotalCostIdr: arrPrice * mainQty,
                        subtotalSellIdr: arrPrice * mult * mainQty
                    });
                }
                // Online UPS
                if (opts.onlineUps) {
                    const upsProd = this.findProductBySku('PWR-UPS-ONLINE');
                    const upsPrice = upsProd ? Number(upsProd.price_idr) : 14500000;
                    items.push({
                        sku: 'PWR-UPS-ONLINE',
                        name: `Smart Online Double-Conversion UPS ${opts.upsVa || 1500}VA + Battery Bank`,
                        category: 'Power & Infrastructure',
                        qty: mainQty,
                        unit: 'Unit',
                        costIdr: upsPrice,
                        sellIdr: upsPrice * mult,
                        subtotalCostIdr: upsPrice * mainQty,
                        subtotalSellIdr: upsPrice * mult * mainQty
                    });
                }
                // Rack Cabinet
                if (opts.rackCabinet) {
                    const rackProd = this.findProductBySku('INF-RACK-19U');
                    const rackPrice = rackProd ? Number(rackProd.price_idr) : 8500000;
                    items.push({
                        sku: 'INF-RACK-19U',
                        name: `19" Close Rack Standing Cabinet 20U + PDU + Roof Fan Filter`,
                        category: 'Power & Infrastructure',
                        qty: mainQty,
                        unit: 'Unit',
                        costIdr: rackPrice,
                        sellIdr: rackPrice * mult,
                        subtotalCostIdr: rackPrice * mainQty,
                        subtotalSellIdr: rackPrice * mult * mainQty
                    });
                }
                // IPSC License
                if (opts.ipscLicense) {
                    const licProd = this.findProductBySku('LIC-MOT-IPSC');
                    const licPrice = licProd ? Number(licProd.price_idr) : 4500000;
                    items.push({
                        sku: 'LIC-MOT-IPSC',
                        name: `MOTOTRBO IP Site Connect (IPSC) Software License`,
                        category: 'Software & Licenses',
                        qty: mainQty,
                        unit: 'Lisensi',
                        costIdr: licPrice,
                        sellIdr: licPrice * mult,
                        subtotalCostIdr: licPrice * mainQty,
                        subtotalSellIdr: licPrice * mult * mainQty
                    });
                }
                // Engineering Service
                if (opts.engineeringService) {
                    const engProd = this.findProductBySku('SVC-CDPK-MANDAYS');
                    const engPrice = engProd ? Number(engProd.price_idr) : 3500000;
                    const mandaysCount = 3 * mainQty;
                    items.push({
                        sku: 'SVC-CDPK-MANDAYS',
                        name: `Jasa Engineering CDPK: Site Survey, Rigging Tower, RF Alignment & Commissioning`,
                        category: 'Services & Engineering',
                        qty: mandaysCount,
                        unit: 'Mandays',
                        costIdr: engPrice,
                        sellIdr: engPrice * mult,
                        subtotalCostIdr: engPrice * mandaysCount,
                        subtotalSellIdr: engPrice * mult * mandaysCount
                    });
                }
            } else if (pkg.category === 'ht') {
                const opts = pkg.htOptions || {};
                // Extra Battery
                if (opts.extraBattery) {
                    const bQty = Math.max(1, Number(opts.batteryRatio || 1)) * mainQty;
                    const bPrice = 1650000;
                    items.push({
                        sku: 'ACC-MOT-BATTERY-IMPRES',
                        name: `Baterai Cadangan Motorola IMPRES Li-Ion 2850mAh IP68 Submersible`,
                        category: 'HT Accessories',
                        qty: bQty,
                        unit: 'Unit',
                        costIdr: bPrice,
                        sellIdr: bPrice * mult,
                        subtotalCostIdr: bPrice * bQty,
                        subtotalSellIdr: bPrice * mult * bQty
                    });
                }
                // Charger 6-way
                if (opts.chargerType === '6way') {
                    const mucQty = opts.chargerCount !== undefined ? Number(opts.chargerCount) : Math.ceil(mainQty / 6.0);
                    const mucPrice = 8800000;
                    items.push({
                        sku: 'ACC-MOT-MUC-6WAY',
                        name: `6-Way Multi-Unit Rapid Charger (MUC) Rak Display IMPRES Management`,
                        category: 'HT Charging Solutions',
                        qty: mucQty,
                        unit: 'Unit',
                        costIdr: mucPrice,
                        sellIdr: mucPrice * mult,
                        subtotalCostIdr: mucPrice * mucQty,
                        subtotalSellIdr: mucPrice * mult * mucQty
                    });
                }
                // Remote Speaker Mic
                if (opts.rsmMic) {
                    const rsmQty = Number(opts.rsmCount !== undefined ? opts.rsmCount : mainQty);
                    const rsmPrice = 1450000;
                    items.push({
                        sku: 'ACC-MOT-RSM-IP67',
                        name: `Remote Speaker Microphone (RSM) Heavy Duty Windporting IP67 Water-Resistant`,
                        category: 'Audio Accessories',
                        qty: rsmQty,
                        unit: 'Unit',
                        costIdr: rsmPrice,
                        sellIdr: rsmPrice * mult,
                        subtotalCostIdr: rsmPrice * rsmQty,
                        subtotalSellIdr: rsmPrice * mult * rsmQty
                    });
                }
                // Earpiece
                if (opts.earpiece) {
                    const epQty = Number(opts.earpieceCount !== undefined ? opts.earpieceCount : mainQty);
                    const epPrice = 650000;
                    items.push({
                        sku: 'ACC-MOT-EARPIECE-2WIRE',
                        name: `2-Wire Surveillance Acoustic Tube Earpiece with In-Line PTT & Mic`,
                        category: 'Audio Accessories',
                        qty: epQty,
                        unit: 'Unit',
                        costIdr: epPrice,
                        sellIdr: epPrice * mult,
                        subtotalCostIdr: epPrice * epQty,
                        subtotalSellIdr: epPrice * mult * epQty
                    });
                }
                // Swivel Leather Case
                if (opts.swivelCase) {
                    const cQty = Number(opts.swivelCaseCount !== undefined ? opts.swivelCaseCount : mainQty);
                    const cPrice = 750000;
                    items.push({
                        sku: 'ACC-MOT-CASE-SWIVEL',
                        name: `Heavy Duty Hard Leather Carry Case with Swivel Belt Loop Quick-Release`,
                        category: 'Carrying Solutions',
                        qty: cQty,
                        unit: 'Unit',
                        costIdr: cPrice,
                        sellIdr: cPrice * mult,
                        subtotalCostIdr: cPrice * cQty,
                        subtotalSellIdr: cPrice * mult * cQty
                    });
                }
                // AES-256 License
                if (opts.aesLicense) {
                    const lPrice = 1950000;
                    items.push({
                        sku: 'LIC-MOT-AES256',
                        name: `Lisensi Keamanan & Enkripsi Motorola Enhanced AES-256 Bit`,
                        category: 'Software & Licenses',
                        qty: mainQty,
                        unit: 'Lisensi',
                        costIdr: lPrice,
                        sellIdr: lPrice * mult,
                        subtotalCostIdr: lPrice * mainQty,
                        subtotalSellIdr: lPrice * mult * mainQty
                    });
                }
            }

            let totalCostIdr = 0;
            let totalSellIdr = 0;
            items.forEach(it => {
                totalCostIdr += it.subtotalCostIdr || 0;
                totalSellIdr += it.subtotalSellIdr || 0;
            });

            const exchangeRate = Math.max(1, Number(this.exchangeRate || 16200));
            const totalCostUsd = totalCostIdr / exchangeRate;
            const totalSellUsd = totalSellIdr / exchangeRate;

            return {
                items: items,
                totalCostIdr: totalCostIdr,
                totalSellIdr: totalSellIdr,
                totalCostUsd: totalCostUsd,
                totalSellUsd: totalSellUsd,
                mainUnits: mainQty,
                addonCount: Math.max(0, items.length - 1)
            };
        },

        getPackagesGrandSummary() {
            let totalMainUnits = 0;
            let totalAddons = 0;
            let grandCostIdr = 0;
            let grandSellIdr = 0;

            (this.systemPackages || []).forEach(pkg => {
                const bom = this.calculatePackageBom(pkg);
                totalMainUnits += bom.mainUnits || 0;
                totalAddons += bom.addonCount || 0;
                grandCostIdr += bom.totalCostIdr || 0;
                grandSellIdr += bom.totalSellIdr || 0;
            });

            const exchangeRate = Math.max(1, Number(this.exchangeRate || 16200));
            return {
                totalPackages: (this.systemPackages || []).length,
                totalMainUnits: totalMainUnits,
                totalAddons: totalAddons,
                grandCostIdr: grandCostIdr,
                grandSellIdr: grandSellIdr,
                grandCostUsd: grandCostIdr / exchangeRate,
                grandSellUsd: grandSellIdr / exchangeRate
            };
        },

        applyPackagesToBoq() {
            if (!this.systemPackages || this.systemPackages.length === 0) return;
            const isEn = this.lang === 'en';
            let addedCount = 0;

            this.systemPackages.forEach(pkg => {
                const bom = this.calculatePackageBom(pkg);
                if (!bom || bom.items.length === 0) return;

                const children = bom.items.map(it => ({
                    sku: it.sku,
                    name: it.name,
                    category: it.category,
                    qtyPerBundle: it.qty,
                    price_idr: it.costIdr,
                    price_usd: it.costUsd,
                    mandatory: it.isMain === true,
                    enabled: true
                }));

                const bundleRow = {
                    id: 'boq-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
                    isBundle: true,
                    expanded: true,
                    bundle_id: pkg.id,
                    category: pkg.category === 'ht' ? 'Handy Talky Fleet Package' : 'Repeater Base Station Package',
                    sku: pkg.id,
                    name_id: pkg.name,
                    name_en: pkg.name,
                    name: pkg.name,
                    qty: 1,
                    unit: 'Paket Sistem',
                    price_idr: 0,
                    price_usd: 0,
                    notes_id: `Konfigurasi Khusus: ${bom.items.length} item komponen sistem`,
                    notes_en: `Custom Config: ${bom.items.length} system component items`,
                    notes: `Konfigurasi Khusus: ${bom.items.length} item komponen sistem`,
                    children: children
                };

                this.boqItems.push(bundleRow);
                addedCount++;
            });

            this.activeTab = 'boq';
            alert(isEn
                ? `Success! ${addedCount} configured packages have been added to the master BoQ table.`
                : `Berhasil! ${addedCount} Paket Sistem telah diterapkan ke Tabel BoQ Utama.`);
        },

        exportPackagesXlsx() {
            window.CDPK_EXPORTERS.exportPackagesXLSX(this);
        },

        exportPackagesPdf() {
            window.CDPK_EXPORTERS.exportPackagesPDF(this);
        },

        openEmailQuoteModal() {
            this.emailRecipient = '';
            this.emailClientContact = this.clientName || '';
            this.emailSubject = `Penawaran Paket Sistem Telekomunikasi CDPK — ${this.projName || 'Proyek Radio'}`;
            this.emailNotes = '';
            this.emailModalOpen = true;
        },

        sendQuoteEmailMailto() {
            const summary = this.getPackagesGrandSummary();
            const recipient = (this.emailRecipient || '').trim();
            const subject = this.emailSubject || `Penawaran Sistem CDPK — ${this.projName || 'Proyek'}`;

            let bodyLines = [];
            bodyLines.push(`Kepada Yth.`);
            bodyLines.push(`${this.emailClientContact || 'Bpk/Ibu Pimpinan'}`);
            bodyLines.push(`${this.clientName ? this.clientName : ''}`);
            bodyLines.push(``);
            bodyLines.push(`Dengan hormat,`);
            bodyLines.push(`Bersama ini kami dari PT Citra Data Purnama Karya (Citradata Group) menyampaikan rincian penawaran konfigurasi produk & paket sistem radio telekomunikasi:`);
            bodyLines.push(``);
            bodyLines.push(`• Nama Proyek: ${this.projName || 'Radio & Security System'}`);
            bodyLines.push(`• Lokasi: ${this.projLocation || '-'}`);
            bodyLines.push(`• Tanggal: ${new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}`);
            bodyLines.push(``);
            bodyLines.push(`══════════════════════════════════════════════════════`);
            bodyLines.push(`RINGKASAN PAKET SISTEM TERKONFIGURASI:`);
            bodyLines.push(`══════════════════════════════════════════════════════`);

            (this.systemPackages || []).forEach((pkg, idx) => {
                const bom = this.calculatePackageBom(pkg);
                bodyLines.push(`${idx + 1}. ${pkg.name}`);
                bodyLines.push(`   - Unit Utama: ${bom.mainUnits}x ${pkg.mainSku} (${pkg.frequency})`);
                bodyLines.push(`   - Add-on: ${bom.addonCount} item komponen pendukung`);
                bodyLines.push(`   - Subtotal Penawaran: ${this.formatCurrency(this.currency === 'USD' ? bom.totalSellUsd : bom.totalSellIdr)}`);
                bodyLines.push(``);
            });

            bodyLines.push(`══════════════════════════════════════════════════════`);
            bodyLines.push(`GRAND TOTAL PENAWARAN: ${this.formatCurrency(this.currency === 'USD' ? summary.grandSellUsd : summary.grandSellIdr)}`);
            bodyLines.push(`(Harga sebelum PPN ${this.ppnPercent}%)`);
            bodyLines.push(`══════════════════════════════════════════════════════`);
            if (this.emailNotes) {
                bodyLines.push(``);
                bodyLines.push(`Catatan Khusus:`);
                bodyLines.push(`${this.emailNotes}`);
            }
            bodyLines.push(``);
            bodyLines.push(`Ketentuan:`);
            bodyLines.push(`1. Masa berlaku penawaran: 30 hari kalender.`);
            bodyLines.push(`2. Garansi resmi Motorola Solutions sesuai standar pabrikan.`);
            bodyLines.push(`3. Dokumen rincian BoQ teknis & spreadsheet lampiran dapat kami kirimkan terlampir.`);
            bodyLines.push(``);
            bodyLines.push(`Hormat kami,`);
            bodyLines.push(`${this.salesPic || (this.currentUser ? this.currentUser.name : 'Presales & Solutions Architect')}`);
            bodyLines.push(`PT Citra Data Purnama Karya (Citradata Group)`);
            bodyLines.push(`Motorola Solutions & Avigilon Elite Partner`);

            const fullBody = bodyLines.join('\n');
            const mailtoUrl = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fullBody)}`;

            window.location.href = mailtoUrl;
        },

        // ─── In-App Notifications Methods ────────────────────────────────
        async fetchNotifications() {
            if (!this.sessionToken) return;
            try {
                const resp = await fetch('/api/notifications', {
                    headers: { 'Authorization': `Bearer ${this.sessionToken}` }
                });
                if (resp.ok) {
                    const data = await resp.json();
                    this.notifications = data.notifications || [];
                    this.unreadNotificationsCount = data.unread_count || 0;
                }
            } catch (e) {
                console.warn('Notifications fetch error:', e);
            }
        },

        toggleNotifications() {
            this.notificationsOpen = !this.notificationsOpen;
            if (this.notificationsOpen) {
                this.fetchNotifications();
            }
        },

        async markNotificationRead(notif) {
            if (!notif) return;
            try {
                await fetch('/api/notifications/mark-read', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.sessionToken}`
                    },
                    body: JSON.stringify({ notif_id: notif.id })
                });
                notif.is_read = true;
                notif.read = true;
                this.unreadNotificationsCount = Math.max(0, this.unreadNotificationsCount - 1);
            } catch (e) {
                console.warn('Mark read error:', e);
            }
        },

        async markAllNotificationsRead() {
            try {
                await fetch('/api/notifications/mark-read', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.sessionToken}`
                    },
                    body: JSON.stringify({})
                });
                this.notifications.forEach(n => { n.is_read = true; n.read = true; });
                this.unreadNotificationsCount = 0;
            } catch (e) {
                console.warn('Mark all read error:', e);
            }
        },

        async handleNotificationAction(notif) {
            this.notificationsOpen = false;
            this.markNotificationRead(notif);
            if (notif.action === 'load_project' && notif.data && notif.data.file_id) {
                await this.loadProjectFromDrive(notif.data.file_id);
                this.activeTab = 'boq';
            } else if (notif.type === 'pending_user') {
                this.openUserManagementModal();
            }
        },

        // ─── Project Handover / Sharing Methods ──────────────────────────
        async openHandoverModal(file) {
            this.handoverFile = file;
            this.handoverTargetUsers = [];
            this.handoverNote = '';
            this.handoverModalOpen = true;
            this.handoverLoading = true;
            try {
                const resp = await fetch('/api/team/active-members', {
                    headers: { 'Authorization': `Bearer ${this.sessionToken}` }
                });
                if (resp.ok) {
                    const data = await resp.json();
                    const curUser = (this.currentUser ? this.currentUser.username : '').toLowerCase();
                    this.activeTeamMembers = (data.members || []).filter(m => (m.username || '').toLowerCase() !== curUser);
                }
            } catch (e) {
                console.warn('Fetch active members error:', e);
            } finally {
                this.handoverLoading = false;
            }
        },

        toggleHandoverTarget(username) {
            const idx = this.handoverTargetUsers.indexOf(username);
            if (idx >= 0) {
                this.handoverTargetUsers.splice(idx, 1);
            } else {
                this.handoverTargetUsers.push(username);
            }
        },

        async submitHandover() {
            if (!this.handoverFile || this.handoverTargetUsers.length === 0) {
                alert('Pilih minimal 1 rekan tim penerima proyek.');
                return;
            }
            this.handoverLoading = true;
            try {
                const payload = {
                    file_id: this.handoverFile.id,
                    project_name: this.handoverFile.summary || this.handoverFile.name,
                    client_name: (this.handoverFile.appProperties && this.handoverFile.appProperties.client_name) || this.clientName || 'Klien',
                    target_usernames: this.handoverTargetUsers,
                    note: this.handoverNote
                };
                const resp = await fetch('/api/project/handover', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.sessionToken}`
                    },
                    body: JSON.stringify(payload)
                });
                const res = await resp.json();
                if (res.status === 'ok') {
                    alert('Berhasil! ' + res.message);
                    this.handoverModalOpen = false;
                    await this.openProjectArchive();
                } else {
                    alert('Gagal handover: ' + (res.message || 'Terjadi kesalahan'));
                }
            } catch (e) {
                alert('Koneksi gagal saat handover proyek: ' + e);
            } finally {
                this.handoverLoading = false;
            }
        },

        // ─── Custom Configurator Methods ─────────────────────────────────
        getAvailableProducts() {
            const allowedCats = ['Repeater', 'Handy Talky', 'Base Station / Mobile', 'CCTV Avigilon', 'CCTV AVA', 'AI NVR', 'Cloud Connector'];
            const catalog = this.productsCatalog || [];
            return catalog.filter(p => allowedCats.includes(p.cat) || (!p.cat.includes('License') && !p.cat.includes('Accessory') && !p.cat.includes('Software') && !p.sku.startsWith('LIC-') && !p.sku.startsWith('RF-') && !p.sku.startsWith('AVT-')));
        },

        getCompatibleLicenses(productSku) {
            const catalog = this.productsCatalog || [];
            const sku = (productSku || this.customConfig.sku || '').toUpperCase();

            let compatible = [];
            if (sku.includes('SLR') || sku.includes('RPT') || sku.includes('DR3000')) {
                compatible = catalog.filter(p => p.sku.startsWith('LIC-MOT-') || p.sku.startsWith('SW-'));
            } else if (sku.includes('R7') || sku.includes('R2') || sku.includes('P86') || sku.includes('HT')) {
                compatible = [
                    { sku: 'LIC-R7-SINC', model: 'MOTOTRBO R7 SINC+ Noise Cancellation License', price_idr: 1200000, price_usd: 75, unit: 'License' },
                    { sku: 'LIC-R7-WIFI-BT', model: 'MOTOTRBO R7 Wi-Fi & Bluetooth Activation License', price_idr: 1800000, price_usd: 110, unit: 'License' },
                    { sku: 'LIC-R7-MANDOWN', model: 'MOTOTRBO R7 Man-Down Safety Option License', price_idr: 2200000, price_usd: 135, unit: 'License' },
                    { sku: 'LIC-R7-AES256', model: 'MOTOTRBO AES-256 Enhanced Privacy Encryption License', price_idr: 3500000, price_usd: 215, unit: 'License' }
                ];
            } else {
                compatible = catalog.filter(p => p.cat === 'Software' || p.sku.startsWith('LIC-'));
            }
            return compatible;
        },

        getCompatibleAccessories(productSku) {
            const catalog = this.productsCatalog || [];
            const sku = (productSku || this.customConfig.sku || '').toUpperCase();

            let compatible = [];
            if (sku.includes('SLR') || sku.includes('RPT') || sku.includes('DR3000')) {
                compatible = catalog.filter(p => p.cat === 'RF Accessories & Cable' || p.cat === 'Avanti Antenna' || p.cat === 'Power & Infrastructure' || p.sku === 'RF-ACC-DUPLEXER');
            } else if (sku.includes('R7') || sku.includes('R2') || sku.includes('P86') || sku.includes('HT')) {
                compatible = [
                    { sku: 'ACC-R7-BATT-IMPRES', model: 'Motorola PMNN4807 IMPRES Li-Ion 2200mAh IP68 Battery', price_idr: 1650000, price_usd: 100, unit: 'Unit' },
                    { sku: 'ACC-R7-RSM-IP68', model: 'Motorola PMMN4140 Remote Speaker Mic IP68', price_idr: 1950000, price_usd: 120, unit: 'Unit' },
                    { sku: 'ACC-R7-MUC-6WAY', model: 'Motorola PMPN4284 Multi-Unit 6-Pocket IMPRES Charger', price_idr: 9500000, price_usd: 585, unit: 'Unit' },
                    { sku: 'ACC-R7-EARPIECE', model: 'Surveillance Earpiece with Acoustic Tube', price_idr: 850000, price_usd: 52, unit: 'Unit' },
                    { sku: 'ACC-R7-HOLSTER', model: 'Heavy Duty Hard Leather Carry Case with Swivel Belt Loop', price_idr: 650000, price_usd: 40, unit: 'Unit' }
                ];
            } else {
                compatible = catalog.filter(p => p.cat.includes('Accessories') || p.cat.includes('Antenna') || p.cat.includes('Power'));
            }
            return compatible;
        },

        onCustomProductSelect(prod) {
            if (!prod) return;
            this.customConfig.sku = prod.sku;
            this.customConfig.name = prod.model || prod.sku;
            this.customConfig.category = prod.cat || 'Custom Device';
            this.customConfig.unitPriceIdr = prod.price_idr || 0;
            this.customConfig.unitPriceUsd = prod.price_usd || Math.round((prod.price_idr || 0) / this.exchangeRate);

            const compLic = this.getCompatibleLicenses(prod.sku);
            if (compLic.length > 0) {
                this.customConfig.licenses = [{
                    id: 'lic-' + Date.now(),
                    sku: compLic[0].sku,
                    name: compLic[0].model || compLic[0].sku,
                    priceIdr: compLic[0].price_idr || 0,
                    priceUsd: compLic[0].price_usd || 0,
                    qty: 1
                }];
            } else {
                this.customConfig.licenses = [];
            }

            const compAcc = this.getCompatibleAccessories(prod.sku);
            if (compAcc.length > 0) {
                this.customConfig.accessories = [
                    {
                        id: 'acc-' + Date.now() + '-1',
                        sku: compAcc[0].sku,
                        name: compAcc[0].model || compAcc[0].sku,
                        priceIdr: compAcc[0].price_idr || 0,
                        priceUsd: compAcc[0].price_usd || 0,
                        qty: 1
                    }
                ];
                if (compAcc.length > 1) {
                    this.customConfig.accessories.push({
                        id: 'acc-' + Date.now() + '-2',
                        sku: compAcc[1].sku,
                        name: compAcc[1].model || compAcc[1].sku,
                        priceIdr: compAcc[1].price_idr || 0,
                        priceUsd: compAcc[1].price_usd || 0,
                        qty: 1
                    });
                }
            } else {
                this.customConfig.accessories = [];
            }
        },

        addCustomLicense(item) {
            const itemObj = item || {
                sku: 'LIC-CUSTOM-' + Date.now(),
                model: 'Lisensi Tambahan Baru',
                price_idr: 2500000,
                price_usd: 150
            };
            this.customConfig.licenses.push({
                id: 'lic-' + Date.now() + '-' + Math.random().toString(36).slice(2, 5),
                sku: itemObj.sku,
                name: itemObj.model || itemObj.sku,
                priceIdr: itemObj.price_idr || 0,
                priceUsd: itemObj.price_usd || 0,
                qty: 1
            });
        },

        removeCustomLicense(index) {
            this.customConfig.licenses.splice(index, 1);
        },

        addCustomAccessory(item) {
            const itemObj = item || {
                sku: 'ACC-CUSTOM-' + Date.now(),
                model: 'Aksesoris Tambahan Baru',
                price_idr: 1500000,
                price_usd: 95
            };
            this.customConfig.accessories.push({
                id: 'acc-' + Date.now() + '-' + Math.random().toString(36).slice(2, 5),
                sku: itemObj.sku,
                name: itemObj.model || itemObj.sku,
                priceIdr: itemObj.price_idr || 0,
                priceUsd: itemObj.price_usd || 0,
                qty: 1
            });
        },

        removeCustomAccessory(index) {
            this.customConfig.accessories.splice(index, 1);
        },

        getCustomConfigSummary() {
            const cfg = this.customConfig;
            const mult = 1.0 + (Number(cfg.marginPercent || 20) / 100.0);
            const prodCostIdr = (Number(cfg.unitPriceIdr) || 0) * (Number(cfg.qty) || 1);
            const prodCostUsd = (Number(cfg.unitPriceUsd) || 0) * (Number(cfg.qty) || 1);

            let licCostIdr = 0;
            let licCostUsd = 0;
            (cfg.licenses || []).forEach(l => {
                licCostIdr += (Number(l.priceIdr) || 0) * (Number(l.qty) || 1);
                licCostUsd += (Number(l.priceUsd) || 0) * (Number(l.qty) || 1);
            });

            let accCostIdr = 0;
            let accCostUsd = 0;
            (cfg.accessories || []).forEach(a => {
                accCostIdr += (Number(a.priceIdr) || 0) * (Number(a.qty) || 1);
                accCostUsd += (Number(a.priceUsd) || 0) * (Number(a.qty) || 1);
            });

            const totalCostIdr = prodCostIdr + licCostIdr + accCostIdr;
            const totalCostUsd = prodCostUsd + licCostUsd + accCostUsd;
            const sellPriceIdr = Math.round(totalCostIdr * mult);
            const sellPriceUsd = Math.round(totalCostUsd * mult);
            const grossProfitIdr = sellPriceIdr - totalCostIdr;

            return {
                prodCostIdr,
                prodCostUsd,
                licCostIdr,
                licCostUsd,
                accCostIdr,
                accCostUsd,
                totalCostIdr,
                totalCostUsd,
                sellPriceIdr,
                sellPriceUsd,
                grossProfitIdr,
                totalItemsCount: (Number(cfg.qty) || 1) + (cfg.licenses || []).length + (cfg.accessories || []).length
            };
        },

        transferCustomToBoq() {
            const summary = this.getCustomConfigSummary();
            const cfg = this.customConfig;

            const children = [
                {
                    sku: cfg.sku,
                    name: cfg.name,
                    category: cfg.category,
                    qtyPerBundle: Number(cfg.qty) || 1,
                    price_idr: Number(cfg.unitPriceIdr) || 0,
                    price_usd: Number(cfg.unitPriceUsd) || 0,
                    mandatory: true,
                    enabled: true
                }
            ];

            (cfg.licenses || []).forEach(l => {
                children.push({
                    sku: l.sku,
                    name: l.name,
                    category: 'Software / License',
                    qtyPerBundle: Number(l.qty) || 1,
                    price_idr: Number(l.priceIdr) || 0,
                    price_usd: Number(l.priceUsd) || 0,
                    mandatory: false,
                    enabled: true
                });
            });

            (cfg.accessories || []).forEach(a => {
                children.push({
                    sku: a.sku,
                    name: a.name,
                    category: 'Accessories & Hardware',
                    qtyPerBundle: Number(a.qty) || 1,
                    price_idr: Number(a.priceIdr) || 0,
                    price_usd: Number(a.priceUsd) || 0,
                    mandatory: false,
                    enabled: true
                });
            });

            const bundleRow = {
                id: 'boq-cust-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
                isBundle: true,
                expanded: true,
                bundle_id: 'CUSTOM-' + cfg.sku,
                category: 'Paket Kustom Terkonfigurasi',
                sku: 'CUST-' + cfg.sku,
                name_id: 'Paket Kustom: ' + cfg.name + ' (' + (Number(cfg.qty) || 1) + ' Unit + ' + (cfg.licenses.length + cfg.accessories.length) + ' Add-on)',
                name_en: 'Custom Package: ' + cfg.name + ' (' + (Number(cfg.qty) || 1) + ' Unit + ' + (cfg.licenses.length + cfg.accessories.length) + ' Add-ons)',
                name: 'Paket Kustom: ' + cfg.name,
                qty: 1,
                unit: 'Paket',
                price_idr: summary.totalCostIdr,
                price_usd: summary.totalCostUsd,
                notes_id: `Konfigurasi Khusus: 1x ${cfg.name}, ${cfg.licenses.length} lisensi, ${cfg.accessories.length} aksesoris. Margin ${cfg.marginPercent}%.`,
                notes_en: `Custom Config: 1x ${cfg.name}, ${cfg.licenses.length} licenses, ${cfg.accessories.length} accessories. Margin ${cfg.marginPercent}%.`,
                notes: `Konfigurasi Khusus: 1x ${cfg.name}, ${cfg.licenses.length} lisensi, ${cfg.accessories.length} aksesoris.`,
                children: children
            };

            this.boqItems.push(bundleRow);
            this.activeTab = 'boq';
            alert(`Berhasil! Paket Kustom "${cfg.name}" dengan ${children.length} rincian komponen telah dimasukkan ke Tabel BoQ Utama.`);
        },

        // ─── Document Exporters & Client Audit Logging ───────────────────
        async recordClientAuditEvent(action, detail, metadata = {}) {
            try {
                if (!this.sessionToken) return;
                await fetch('/api/audit/log', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.sessionToken}`
                    },
                    body: JSON.stringify({ action, detail, metadata })
                });
            } catch (e) {
                console.warn('Audit record warning:', e);
            }
        },

        exportPdf() {
            this.recordClientAuditEvent('export_pdf', `Ekspor Dokumen Penawaran PDF Resmi: "${this.projName}" (Klien: ${this.clientName})`, {
                project: this.projName,
                client: this.clientName,
                grandTotal: this.commercialTotals ? this.commercialTotals.grandTotal : 0
            });
            window.CDPK_EXPORTERS.exportBoqPDF(this);
        },

        exportXlsx() {
            this.recordClientAuditEvent('export_xlsx', `Ekspor Lembar Kerja BoQ Excel (.xlsx): "${this.projName}" (Klien: ${this.clientName})`, {
                project: this.projName,
                client: this.clientName,
                grandTotal: this.commercialTotals ? this.commercialTotals.grandTotal : 0
            });
            window.CDPK_EXPORTERS.exportBoqXLSX(this);
        },

        exportCoveragePng() {
            this.recordClientAuditEvent('export_coverage', `Ekspor Peta Simulasi Jangkauan RF (PNG): "${this.projName}"`, {
                project: this.projName,
                location: this.covSearchLocation
            });
            window.CDPK_EXPORTERS.exportCoveragePNG('cdpkCoverageCanvas', this.projName);
        },

        // ─── Module: RFoF DAS by FMTCS Methods & Two-Way Bridges ───────────────
        dasT(key) {
            if (window.CDPK_DAS_ENGINE && window.CDPK_DAS_ENGINE.i18n) {
                const lang = this.lang || 'id';
                const dict = window.CDPK_DAS_ENGINE.i18n[lang] || window.CDPK_DAS_ENGINE.i18n['id'];
                if (dict && dict[key] !== undefined) return dict[key];
                const fallback = window.CDPK_DAS_ENGINE.i18n['en'];
                if (fallback && fallback[key] !== undefined) return fallback[key];
            }
            return key;
        },

        getDasBoqResult() {
            if (window.CDPK_DAS_ENGINE && typeof window.CDPK_DAS_ENGINE.calcDasBoq === 'function') {
                return window.CDPK_DAS_ENGINE.calcDasBoq(this.das, this.exchangeRate);
            }
            return {
                items: [],
                quantities: {
                    antIndoorQty: 0, oruQty: 0, omuQty: 0, repQty: 0,
                    combQty: 0, muxQty: 0, sigSplitQty: 0, pwrSplitQty: 0, couplerQty: 0,
                    cableQty: 0, connQty: 0, fiberQty: 0, antOutOmniQty: 0, antOutDirQty: 0, radioQty: 0
                },
                totals: {
                    totalCogsUsd: 0, totalCogsIdr: 0, totalSellUsd: 0, totalSellIdr: 0,
                    totalMarginUsd: 0, totalMarginIdr: 0, overallMarginPct: 0, marginGuardrailPassed: true
                }
            };
        },

        getDasTopologySvg() {
            if (window.CDPK_DAS_ENGINE && typeof window.CDPK_DAS_ENGINE.buildDasTopologySVG === 'function') {
                return window.CDPK_DAS_ENGINE.buildDasTopologySVG(this.getDasBoqResult(), this.das.archMode, this.das.fiberTopo, this.das.floors, this.lang);
            }
            return '';
        },

        getDasLinkBudgetResult() {
            if (window.CDPK_DAS_ENGINE && typeof window.CDPK_DAS_ENGINE.calcDasLinkBudget === 'function') {
                return window.CDPK_DAS_ENGINE.calcDasLinkBudget(this.das);
            }
            return { isValid: false, chain: [], healthStatus: 'bad', radiusM: 0, coverageAreaM2: 0 };
        },

        getDasPlannerResult() {
            if (window.CDPK_DAS_ENGINE && typeof window.CDPK_DAS_ENGINE.calcAntennaPlanner === 'function') {
                const lb = this.getDasLinkBudgetResult();
                return window.CDPK_DAS_ENGINE.calcAntennaPlanner(this.das.planAreaM2, lb.radiusM, this.das.planUtilPct);
            }
            return { recommendedAntennas: 0, countWithMargin: 0, gridSpacingM: 0, areaM2: 0 };
        },

        getDasOutdoorResult() {
            if (window.CDPK_DAS_ENGINE && typeof window.CDPK_DAS_ENGINE.calcOkumuraHataOutdoor === 'function') {
                return window.CDPK_DAS_ENGINE.calcOkumuraHataOutdoor(this.das);
            }
            return { isValid: false, results: [] };
        },

        getDasPowerConvResult() {
            if (window.CDPK_DAS_ENGINE && typeof window.CDPK_DAS_ENGINE.calcPowerConversion === 'function') {
                return window.CDPK_DAS_ENGINE.calcPowerConversion(this.das.pSrc, this.das.pVal);
            }
            return {};
        },

        getDasGainConvResult() {
            if (window.CDPK_DAS_ENGINE && typeof window.CDPK_DAS_ENGINE.calcGainConversion === 'function') {
                return window.CDPK_DAS_ENGINE.calcGainConversion(this.das.gSrc, this.das.gVal);
            }
            return {};
        },

        getDasVswrConvResult() {
            if (window.CDPK_DAS_ENGINE && typeof window.CDPK_DAS_ENGINE.calcVswrConversion === 'function') {
                return window.CDPK_DAS_ENGINE.calcVswrConversion(this.das.vSrc, this.das.vVal);
            }
            return {};
        },

        getDasFieldConvResult() {
            if (window.CDPK_DAS_ENGINE && typeof window.CDPK_DAS_ENGINE.calcFieldMeterConversion === 'function') {
                return window.CDPK_DAS_ENGINE.calcFieldMeterConversion(this.das.fSrc, this.das.fVal);
            }
            return {};
        },

        canAccessDasEstimator() {
            if (!this.currentUser) return false;
            const role = (this.currentUser.role || '').toLowerCase();
            // Full Commercial BoQ & Estimator is open to Admin, Overseer, and Product Expert (Sales)
            return role === 'admin' || role === 'overseer' || role === 'sales';
        },

        getDasItemPrice(it) {
            if (!it) return 0;
            if (this.currency === 'USD') {
                return Math.round((Number(it.unitPriceUsd) || 0) * 100) / 100;
            }
            return Math.round(Number(it.unitPriceIdr) || 0);
        },

        setDasItemPrice(it, rawVal) {
            if (!it || !this.das) return;
            const val = parseFloat(rawVal);
            if (!isFinite(val) || val < 0) return;
            if (!this.das.customPrices) this.das.customPrices = {};
            if (!this.das.customCurrencies) this.das.customCurrencies = {};
            const usdVal = this.currency === 'USD' ? val : (val / (this.exchangeRate || 16200));
            this.das.customPrices[it.key] = Math.round(usdVal * 100) / 100;
            this.das.customCurrencies[it.key] = 'USD';
        },

        resetDasBoq(toZero = true, silent = false) {
            if (!this.das) return;
            if (toZero) {
                this.das.floors = [
                    { f: this.lang === 'en' ? 'Floor 1 / Zone 1' : 'Lantai 1 / Zona 1', q: 0 }
                ];
                this.das.rep = 0;
                this.das.radio = 0;
                this.das.outo = 0;
                this.das.outd = 0;
                this.das.customPrices = {};
                this.das.customCurrencies = {};
                if (!silent) {
                    this.showToast(
                        this.lang === 'en'
                            ? 'RFoF DAS floor zones, equipment quantities, and custom prices have been reset to 0.'
                            : 'Seluruh jumlah perangkat, zona lantai, dan kustomisasi harga RFoF DAS telah di-reset ke 0.',
                        'success'
                    );
                }
            } else {
                this.das.archMode = 'digital';
                this.das.fiberTopo = 'star';
                this.das.floors = [
                    { f: 'Basement 1', q: 4 },
                    { f: 'Floor 1 / Lobby', q: 12 },
                    { f: 'Floor 2 / Office', q: 16 },
                    { f: 'Floor 3 / Data Hall', q: 12 }
                ];
                this.das.rep = 2;
                this.das.radio = 20;
                this.das.outo = 1;
                this.das.outd = 1;
                this.das.r_oru = 30;
                this.das.r_omu = 32;
                this.das.r_split = 0.30;
                this.das.r_coup = 0.72;
                this.das.r_cable = 34;
                this.das.customPrices = {};
                this.das.customCurrencies = {};
                if (!silent) {
                    this.showToast(
                        this.lang === 'en'
                            ? 'Loaded standard 4-floor RFoF DAS reference baseline (44 indoor antennas).'
                            : 'Template standar RFoF DAS 4 lantai (44 antena indoor) berhasil dimuat.',
                        'info'
                    );
                }
            }
        },

        resetDasOutdoor(toZero = true) {
            if (!this.das) return;
            if (toZero) {
                this.das.cov_f = 0;
                this.das.cov_d = 0;
                this.das.cov_ht = 0;
                this.das.cov_hm = 0;
                this.das.cov_txbs = 0;
                this.das.cov_txms = 0;
                this.das.cov_gbs = 0;
                this.das.cov_gms = 0;
                this.das.cov_rxbs = 0;
                this.das.cov_rxms = 0;
                this.das.cov_flbs = 0;
                this.das.cov_flms = 0;
                this.showToast(
                    this.lang === 'en'
                        ? 'Outdoor Okumura-Hata simulation inputs have been cleared to 0.'
                        : 'Seluruh isian simulasi propagasi Outdoor Okumura-Hata telah dikosongkan (0).',
                    'success'
                );
            } else {
                this.das.cov_f = 420;
                this.das.cov_d = 5;
                this.das.cov_ht = 30;
                this.das.cov_hm = 1.5;
                this.das.cov_txbs = 47;
                this.das.cov_txms = 36;
                this.das.cov_gbs = 6;
                this.das.cov_gms = 0;
                this.das.cov_rxbs = -118;
                this.das.cov_rxms = -116;
                this.das.cov_flbs = 3;
                this.das.cov_flms = 0;
                this.showToast(
                    this.lang === 'en'
                        ? 'Restored default Okumura-Hata outdoor propagation parameters (420 MHz, 5 km, 50W BS).'
                        : 'Parameter standar simulasi propagasi Okumura-Hata (420 MHz, 5 km, 50W BS) berhasil dimuat.',
                    'info'
                );
            }
        },

        resetDasLinkBudget(toZero = true) {
            if (!this.das) return;
            if (toZero) {
                this.das.oruOutputDbm = 0;
                this.das.cableLengthM = 0;
                this.das.splittersCount = 0;
                this.das.otherLossDb = 0;
                this.das.antennaGainDbi = 0;
                this.das.targetSensitivityDbm = 0;
                this.das.fadeMarginDb = 0;
                this.das.planAreaM2 = 0;
                this.das.planUtilPct = 0;
                this.showToast(
                    this.lang === 'en'
                        ? 'Link Budget & Antenna Planner inputs cleared to 0.'
                        : 'Isian Link Budget & Perencana Antena telah dikosongkan (0).',
                    'success'
                );
            } else {
                this.das.oruOutputDbm = 40;
                this.das.cableTypeIndex = 0;
                this.das.cableLengthM = 50;
                this.das.splittersCount = 1;
                this.das.otherLossDb = 1.5;
                this.das.antennaGainDbi = 3.0;
                this.das.envIndex = 1;
                this.das.targetSensitivityDbm = -95;
                this.das.fadeMarginDb = 10;
                this.das.planAreaM2 = 5000;
                this.das.planUtilPct = 75;
                this.showToast(
                    this.lang === 'en'
                        ? 'Restored default Link Budget & Antenna Planner parameters.'
                        : 'Parameter standar Link Budget & Planner Antena berhasil dimuat.',
                    'info'
                );
            }
        },

        resetDasConverters(toZero = true) {
            if (!this.das) return;
            if (toZero) {
                this.das.pVal = 0;
                this.das.gVal = 0;
                this.das.vVal = 1.0;
                this.das.fVal = 0;
            } else {
                this.das.pSrc = 'dbm';
                this.das.pVal = 40;
                this.das.gSrc = 'db';
                this.das.gVal = 10;
                this.das.vSrc = 'vswr';
                this.das.vVal = 1.3;
                this.das.fSrc = 'dbm';
                this.das.fVal = -85;
            }
        },

        addDasFloor() {
            if (!Array.isArray(this.das.floors)) this.das.floors = [];
            const nextIdx = this.das.floors.length + 1;
            const floorName = this.lang === 'en' ? `Floor ${nextIdx}` : `Lantai ${nextIdx}`;
            this.das.floors.push({ f: floorName, q: 8 });
        },

        removeDasFloor(idx) {
            if (Array.isArray(this.das.floors) && this.das.floors.length > 1) {
                this.das.floors.splice(idx, 1);
            }
        },

        applyPlannerToDasBoq() {
            const pl = this.getDasPlannerResult();
            const totalAnt = pl.countWithMargin || pl.recommendedAntennas || 8;
            const numFloors = Math.max(1, (this.das.floors && this.das.floors.length) || 1);
            const antPerFloor = Math.max(1, Math.round(totalAnt / numFloors));
            if (!Array.isArray(this.das.floors) || this.das.floors.length === 0) {
                this.das.floors = [{ f: this.lang === 'en' ? 'Floor 1' : 'Lantai 1', q: totalAnt }];
            } else {
                this.das.floors.forEach((fl) => {
                    fl.q = antPerFloor;
                });
            }
            this.dasActiveTab = 'boq';
            this.showToast(
                this.lang === 'en'
                    ? `Applied ${totalAnt} antennas (${antPerFloor}/floor) from Planner to DAS BoQ.`
                    : `Menerapkan ${totalAnt} antena (${antPerFloor}/lantai) dari Planner ke BoQ DAS.`,
                'success'
            );
        },

        addDasCommPoint() {
            if (!Array.isArray(this.das.points)) this.das.points = [];
            const nextIdx = this.das.points.length + 1;
            this.das.points.push({
                id: `Antenna Point #${nextIdx}`,
                vswr: 1.25,
                tx: 10.5,
                rx: -70.0,
                call: 'good'
            });
        },

        removeDasCommPoint(idx) {
            if (Array.isArray(this.das.points) && this.das.points.length > 1) {
                this.das.points.splice(idx, 1);
            }
        },

        populateCommPointsFromFloors() {
            const newPoints = [];
            (this.das.floors || []).forEach(fl => {
                const q = Math.min(20, Math.max(1, parseInt(fl.q, 10) || 1));
                for (let i = 1; i <= q; i++) {
                    newPoints.push({
                        id: `${fl.f} - Ant #${i}`,
                        vswr: Number((1.18 + (Math.random() * 0.18)).toFixed(2)),
                        tx: Number((10.0 + (Math.random() * 1.5)).toFixed(1)),
                        rx: Number((-72.0 + (Math.random() * 6.0)).toFixed(1)),
                        call: 'good'
                    });
                }
            });
            if (newPoints.length > 0) {
                this.das.points = newPoints;
                this.showToast(
                    this.lang === 'en'
                        ? `Generated ${newPoints.length} test points from floor zones.`
                        : `Berhasil membuat ${newPoints.length} titik uji dari zona lantai.`,
                    'info'
                );
            }
        },

        exportDasCommPdf() {
            if (window.CDPK_DAS_ENGINE && typeof window.CDPK_DAS_ENGINE.exportCommissioningPdf === 'function') {
                const meta = {
                    projectName: this.projName || 'Proyek DAS FMTCS',
                    technician: this.das.inspector || (this.currentUser ? this.currentUser.name : 'Lead RF Engineer'),
                    customer: this.clientName || 'Building Management'
                };
                window.CDPK_DAS_ENGINE.exportCommissioningPdf(this.das, meta, this.lang);
                this.showToast(
                    this.lang === 'en' ? 'Commissioning SAT Report PDF generated successfully!' : 'Dokumen Berita Acara Uji Terima (SAT) PDF berhasil dibuat!',
                    'success'
                );
            }
        },

        exportDasBoqCsv() {
            if (window.CDPK_DAS_ENGINE && typeof window.CDPK_DAS_ENGINE.exportDasCsv === 'function') {
                const state = {
                    proj: this.projName,
                    by: this.currentUser ? this.currentUser.name : 'CDPK Presales',
                    kurs: this.exchangeRate
                };
                window.CDPK_DAS_ENGINE.exportDasCsv(state, this.getDasBoqResult(), this.lang);
                this.showToast(
                    this.lang === 'en' ? 'DAS BoQ exported to CSV successfully.' : 'Lembar BoQ DAS berhasil diekspor ke CSV.',
                    'success'
                );
            }
        },

        generateDasHandoffQr() {
            if (window.CDPK_DAS_ENGINE && typeof window.CDPK_DAS_ENGINE.encodeHandoffToken === 'function') {
                const payload = {
                    proj: this.projName,
                    client: this.clientName,
                    archMode: this.das.archMode,
                    fiberTopo: this.das.fiberTopo,
                    floors: this.das.floors,
                    rep: this.das.rep,
                    radio: this.das.radio,
                    ts: Date.now()
                };
                const token = window.CDPK_DAS_ENGINE.encodeHandoffToken(payload);
                this.das.handoffToken = token;
                this.das.qrDataUrl = window.CDPK_DAS_ENGINE.generateQRCodeDataURL(token, 4, 8);
                this.dasHandoffModalOpen = true;
            }
        },

        importDasHandoffToken(tokenStr) {
            const tok = (tokenStr || this.das.handoffToken || '').trim();
            if (!tok) {
                alert(this.lang === 'en' ? 'Please provide a valid handoff token string.' : 'Silakan masukkan kode token handoff yang valid.');
                return;
            }
            if (window.CDPK_DAS_ENGINE && typeof window.CDPK_DAS_ENGINE.decodeHandoffToken === 'function') {
                const res = window.CDPK_DAS_ENGINE.decodeHandoffToken(tok);
                if (res.valid && res.payload) {
                    const p = res.payload;
                    if (p.archMode) this.das.archMode = p.archMode;
                    if (p.fiberTopo) this.das.fiberTopo = p.fiberTopo;
                    if (Array.isArray(p.floors)) this.das.floors = p.floors;
                    if (p.rep !== undefined) this.das.rep = p.rep;
                    if (p.radio !== undefined) this.das.radio = p.radio;
                    this.showToast(
                        this.lang === 'en' ? 'DAS configuration imported successfully!' : 'Konfigurasi DAS berhasil diimpor!',
                        'success'
                    );
                    this.dasHandoffModalOpen = false;
                } else {
                    const err = res.error || (this.lang === 'en' ? 'Invalid token' : 'Token tidak valid');
                    alert(this.lang === 'en' ? `Import failed: ${err}` : `Gagal mengimpor: ${err}`);
                }
            }
        },

        // ─── Two-Way Bridge 1: DMR Sizing -> RFoF DAS by FMTCS ─────────────────
        expandDmrToRfofDas() {
            const floorsCount = Math.max(1, parseInt(this.buildingFloors, 10) || 4);
            const currentFloors = Array.isArray(this.das.floors) ? this.das.floors : [];
            if (currentFloors.length !== floorsCount) {
                const newFloors = [];
                for (let i = 1; i <= floorsCount; i++) {
                    newFloors.push({
                        f: this.lang === 'en' ? `Floor ${i}` : `Lantai ${i}`,
                        q: Math.max(4, Math.round(Number(this.areaInput || 35) * 10 / floorsCount)) || 8
                    });
                }
                this.das.floors = newFloors;
            }
            this.das.rep = Math.max(1, (this.sizingResult && (this.sizingResult.totalRepeaters || this.sizingResult.totalOutdoorRepeaters)) || 2);
            this.das.radio = Math.max(10, parseInt(this.userCount, 10) || 40);
            this.activeWorkspace = 'das';
            this.dasActiveTab = 'boq';
            this.showToast(
                this.lang === 'en'
                    ? `Transferred ${floorsCount} floors, ${this.das.rep} repeater(s), and ${this.das.radio} users into RFoF DAS by FMTCS.`
                    : `Berhasil mentransfer ${floorsCount} lantai, ${this.das.rep} repeater, dan ${this.das.radio} user ke RFoF DAS by FMTCS.`,
                'success'
            );
        },

        // ─── Two-Way Bridge 2: RFoF DAS BoQ -> DMR Master BoQ ─────────────────
        injectDasBoqToMasterBoq() {
            const dasBoq = this.getDasBoqResult();
            const items = (dasBoq && dasBoq.items) || [];
            if (items.length === 0) {
                alert(this.lang === 'en' ? 'No DAS items to inject.' : 'Tidak ada item DAS untuk dimasukkan.');
                return;
            }

            let injectedCount = 0;
            items.forEach(it => {
                if (!it.qty || it.qty <= 0) return;
                // Exclude general repeater and subscriber radio if already present in DMR Master BoQ
                const isRepeaterOrRadio = it.key === 'rep' || it.key === 'radio' || it.sku === 'MOT-RPT-SLR5300' || it.sku === 'MOT-HT-R7';
                if (isRepeaterOrRadio && this.boqItems.some(b => b.sku === it.sku)) {
                    return;
                }

                const existingIdx = this.boqItems.findIndex(b => b.sku === it.sku);
                const nameId = (it.name && it.name.id) || it.name || it.model;
                const nameEn = (it.name && it.name.en) || it.name || it.model;
                const unitPriceIdr = Math.round(it.unitPriceIdr || (it.unitPriceUsd * this.exchangeRate));
                const unitPriceUsd = Math.round((it.unitPriceUsd || (unitPriceIdr / this.exchangeRate)) * 100) / 100;
                const cogsIdr = Math.round(it.cogsIdr || (it.cogsUsd * this.exchangeRate));
                const cogsUsd = Math.round((it.cogsUsd || 0) * 100) / 100;

                const boqRow = {
                    id: 'boq-das-' + it.sku + '-' + Date.now().toString(36),
                    isBundle: false,
                    expanded: false,
                    category: 'FMTCS-DAS',
                    sku: it.sku,
                    model: it.model,
                    name_id: nameId,
                    name_en: nameEn,
                    name: this.lang === 'en' ? nameEn : nameId,
                    qty: it.qty,
                    unit: it.unit || 'Unit',
                    price_idr: unitPriceIdr,
                    price_usd: unitPriceUsd,
                    cogs_idr: cogsIdr,
                    cogs_usd: cogsUsd,
                    marginPct: it.marginPct || 25,
                    notes_id: `Komponen RFoF DAS FMTCS (${it.model})`,
                    notes_en: `FMTCS RFoF DAS Component (${it.model})`,
                    notes: this.lang === 'en' ? `FMTCS RFoF DAS Component (${it.model})` : `Komponen RFoF DAS FMTCS (${it.model})`,
                    children: []
                };

                if (existingIdx >= 0) {
                    this.boqItems[existingIdx] = boqRow;
                } else {
                    this.boqItems.push(boqRow);
                }
                injectedCount++;
            });

            this.activeWorkspace = 'dmr';
            this.activeTab = 'boq';
            this.showToast(
                this.lang === 'en'
                    ? `Successfully injected ${injectedCount} FMTCS DAS items into DMR Master BoQ.`
                    : `Berhasil menambahkan ${injectedCount} komponen DAS FMTCS ke BoQ Utama DMR.`,
                'success'
            );
        }
    };
};
