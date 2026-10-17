# PRD — CDPK System Planner (PRD-New v8.4.0)

> **Nama Aplikasi Resmi:** **CDPK System Planner** *(Solution Sizing, RF Simulation, Commercial Suite & Enterprise Team Collaboration)*  
> **Pemilik / Entitas:** PT Citradata Purnakharisma (CDPK) — Authorized Distributor Motorola Solutions & Avigilon  
> **Versi Saat Ini:** `8.4.0 (Enterprise Production Build)`  
> **Target Bahasa:** Dwi-Bahasa Penuh / Bilingual (**Bahasa Indonesia `ID`** & **English `EN`**)  
> **AI Copilot Engine:** Multi-Model AI Selector (**Google Gemini 3.8 Flash** & **Google Gemini 3.8 Pro**)  
> **Arsitektur & Cloud Hosting:** GitHub (`tech-sol-id`) + Render Cloud Container (Singapore Region) + Google Drive Live API (`drive citradata`)  
> **Kebijakan Keamanan:** [Strict Security Policy & Threat Modeling (AGENTS.md)](file:///Users/adriankansil/Documents/Project%20Calculator%20-%20CDPK/AGENTS.md)  
> **Dokumentasi Terkait:** [PRD-legacy.md](file:///Users/adriankansil/Documents/Project%20Calculator%20-%20CDPK/PRD-legacy.md) | [USER_GUIDE.md](file:///Users/adriankansil/Documents/Project%20Calculator%20-%20CDPK/USER_GUIDE.md)

---

## 1. Visi Produk & Ringkasan Eksekutif

**CDPK System Planner** adalah platform rekayasa sistem komunikasi radio DMR terintegrasi (*end-to-end*) yang memadukan perhitungan teknis propagasi RF, perencanaan kapasitas talkgroup & timeslot, perakitan paket solusi komposit (*Parent-Child BOM*), kalkulasi komersial presisi, kolaborasi tim lintas-divisi (*Product Expert* & *Engineer / Technician*), serta tata kelola pengawasan eksekutif (*Overseer* & *Administrator*) berbasis Google Drive Cloud.

### Pilar Utama Platform (Versi 8.4.0):
1. **Precision Engineering:** Sizing RF geometrik, rekomendasi topologi bertingkat (Conventional, IP Site Connect, Capacity Plus Trunking), kalkulasi node DAS indoor (SLR 1000), estimasi mandays (WES Method), dan simulasi canvas propagasi CloudRF-style.
2. **Modular Product & System Configurator:** Menghitung paket repeater base station (SLR 5300, SLR 8000), radio terminal portabel (R7, P6620i, P8668i), serta konfigurator kustom dinamis dengan pemilihan lisensi (*Licenses*) dan aksesoris (*Accessories*) per produk.
3. **Enterprise Zero-Trust Security & Gatekeeping:**
   - Halaman depan terisolasi 100% (*Zero DOM Leakage*) dengan perlindungan CSS `x-cloak` dan otentikasi wajib sebelum akses workspace.
   - Pembatasan domain korporat ketat: hanya `@citradata.id` dan `@techsolutions.id`.
   - Mekanisme persetujuan wajib (*Admin Pending Approval*) untuk setiap pengguna baru.
4. **Empat Tingkat Peran Pengguna (Four-Tier RBAC):**
   - **👑 Administrator:** Kontrol penuh pengguna, persetujuan akun, akses link folder master Drive & master pricelist, jejak audit, dan ringkasan portofolio.
   - **👁️ Overseer:** Mode pantau eksekutif. Dapat melihat seluruh akun tim (view-only), membuka seluruh dokumen arsip tim, meninjau jejak audit (*audit trail*), serta memantau kepatuhan margin eksekutif, tanpa akses modifikasi akun atau tautan master cloud.
   - **🛠️ Engineer / Technician:** Fokus pada rekayasa teknis, sizing RF, estimasi mandays, kustomisasi BoQ, penyimpanan berkas, dan penerimaan handover.
   - **💼 Product Expert:** Fokus pada penawaran komersial, konfigurasi paket produk, margin & diskon, ekspor quotation, serta handover proyek ke tim engineering.
5. **Kolaborasi Handover & Notifikasi Terpusat:**
   - Serah terima proyek resmi antardivisi dengan riwayat handover (*handover history*) yang tersimpan pada metadata berkas Google Drive.
   - Pusat notifikasi in-app (ikon lonceng kuning dengan penghitung belum dibaca) untuk alert penugasan dan jalan pintas pembukaan proyek.
6. **Executive Portfolio & Margin Guardrails:**
   - Bar ringkasan eksekutif: total pipeline nilai proyek (IDR), rata-rata margin tim, kepatuhan guardrail, dan jumlah proyek berisiko.
   - Kebijakan Guardrail Margin: Peringatan visual otomatis `⚠️ <15%` pada tabel BoQ, konfigurator paket, dan dashboard arsip jika margin berada di bawah standar perusahaan.
7. **Jejak Audit Terdesentralisasi (Tamper-Evident Audit Trail):**
   - Pencatatan otomatis aktivitas login, mutasi pengguna, penyimpanan proyek, pembukaan berkas, serah terima, serta ekspor dokumen PDF/Excel.

---

## 2. Modul Rekayasa Teknis (Engineering & Calculation Engines)

```mermaid
flowchart TD
    In["Input Sizing (Industri, Area km²/Ha, Kontur Medan, User Count, Backhaul, Fitur)"] --> RF["RF Geometry & DMR Capacity Engine"]
    RF --> Topo{"Evaluasi Topologi Otomatis"}
    Topo -->|Luas < 8 km² & User < 60| Opt1["1. Conventional Single-Site (SLR 5300)"]
    Topo -->|Multi-Site Tersebar / Lembah| Opt2["2. IP Site Connect (Multi-Site Link)"]
    Topo -->|User > 120 / Kanal Padat| Opt3["3. Capacity Plus Trunking (Dynamic Slots)"]
    
    RF --> Alloc["Alokasi Otomatis Radio Terminal"]
    Alloc --> HT["85% Handheld Radio (TIA ATEX / Non-ATEX)"]
    Alloc --> Mob["10% Mobile/Base Radio Vehicle"]
    Alloc --> Sup["5% Smart Supervisor Radio"]
    
    RF --> DAS["Kalkulasi Node DAS In-Building (SLR 1000)"]
    RF --> Power["Kalkulasi UPS Backup & Kapasitas Baterai Ah"]
    
    Opt1 & Opt2 & Opt3 & Alloc & DAS & Power --> BoQ["Sinkronisasi Otomatis ke BoQ & Commercial Suite"]
```

### 2.1. Parameter Sizing & Standardisasi Regional APAC
- **Repeater 50W Utama:** Diseragamkan menjadi **`MOTOTRBO SLR 5300`** (menggantikan kode non-resmi legacy).
- **Repeater 1W–10W DAS / In-Building:** Diseragamkan menjadi **`MOTOTRBO SLR 1000`** (IP65 Compact Repeater).
- **Repeater 100W Continuous Duty:** **`MOTOTRBO SLR 8000`**.
- **Radio Portabel Standar:** **`MOTOTRBO R7 Series`** (Display/Non-Display, TIA ATEX opsional) dan **`XiR P6620i / P8668i`**.
- **Kuantitas Radio Dinamis:** Status `"TBD"` dihapus permanen; kuantitas dialokasikan proporsional berdasarkan rasio profil industri dengan input yang dapat disesuaikan pengguna.

### 2.2. Presales Mandays WES Estimator
- Menghitung hari kerja teknis (*Mandays*) berdasarkan kompleksitas medan (*Low, Medium, High*), jumlah site, node DAS, jumlah radio yang diprogram, serta integrasi dispatcher/CCTV.
- Biaya mandays langsung terhubung dengan rate standar perusahaan (`Rp 3.500.000 / Manday`) dan terintegrasi otomatis ke baris jasa engineering pada BoQ.

### 2.3. Simulasi Propagasi Canvas RF
- Mensimulasikan estimasi cakupan sinyal (*Strong, Fair, Weak, Dead Zone*) pada canvas HTML5 interaktif berdasarkan koordinat geografis, daya pancar repeater (Watt), gain antena (dBi), dan redaman kabel/feeder (dB).
- Mendukung ekspor tangkapan peta simulasi ke format PNG beresolusi tinggi.

---

## 3. Modul Komersial & Konfigurator Paket Sistem

### 3.1. Konsep Parent-Child Bill of Materials (BOM)
Setiap paket sistem menghitung komponen utama beserta seluruh sub-item pembentuknya secara otomatis:
- **Paket Repeater Base Station:** Repeater, cavity duplexer (termasuk cavity lab tuning), antena omni/yagi, kabel feeder coaxial 7/8" atau 1/2" per meter tower, lightning arrester grounding kit, rack cabinet 19", dan online UPS.
- **Paket Terminal Radio:** Unit HT, baterai cadangan IMPRES, charger multi-unit 6-way atau single-unit, remote speaker microphone (RSM), earpiece, swivel carry case, dan lisensi enkripsi AES-256.

### 3.2. Konfigurator Paket Kustom Dinamis (Tab 7)
Memungkinkan pengguna merakit produk apa pun dari katalog dengan arsitektur:
1. **Pilihan Produk Utama:** Dropdown pencarian cerdas (misal: `SLR5300`, `R7`, `XiR P6620i`).
2. **Kategori Lisensi (Licenses):** Menyesuaikan otomatis dengan produk yang dipilih (misal: *IP Site Connect License*, *Capacity Plus Single/Multi-Site*, *AES-256 Encryption License*, *Mandown / GPS License*).
3. **Kategori Aksesoris (Accessories):** Menyesuaikan otomatis dengan produk yang dipilih (misal: *IMPRES 2900mAh Battery*, *6-Way Multi-Unit Charger*, *Heavy Duty Noise-Cancelling RSM*, *Cavity Duplexer UHF*).
4. **Kalkulasi Finansial Paket:** COGS Modal, Target Margin %, Harga Jual Klien, dan Tombol Transfer langsung ke BoQ Utama.

### 3.3. Kontrol Komersial & Mode Ekspor
- **Multi-Currency:** Mendukung mata uang **IDR (Rupiah)** dan **USD (US Dollar)** dengan kurs konversi dinamis.
- **Pajak & Diskon:** Diskon per item atau global (%) serta opsi PPN (11%, 12%, atau Non-PKP 0%).
- **2 Format Ekspor Dokumen:**
  1. **Technical BoQ (PDF / Excel):** Menampilkan rincian teknis, spesifikasi, sub-item BOM, dan kuantitas tanpa kolom harga komersial (untuk lampiran teknis tender).
  2. **Commercial Quotation (PDF / Excel):** Menampilkan struktur harga lengkap, diskon, PPN, grand total, syarat pembayaran, rekening resmi, dan masa berlaku penawaran.

---

## 4. Keamanan Sistem & Kontrol Akses (Security & RBAC)

Sesuai standar [CDPK Security Policy (AGENTS.md)](file:///Users/adriankansil/Documents/Project%20Calculator%20-%20CDPK/AGENTS.md):

```mermaid
classDiagram
    class User {
        +String username
        +String email
        +String name
        +String role
        +String status
        +login()
        +register()
    }
    class Administrator {
        +fullAccountManagement()
        +approveUserRegistration()
        +viewMasterDriveFolder()
        +viewMasterSpreadsheet()
        +viewAuditTrail()
        +viewExecutivePortfolio()
    }
    class Overseer {
        +viewAllTeamAccounts()
        +viewAllTeamProjects()
        +viewAuditTrail()
        +viewExecutivePortfolio()
        -editUsers() [DENIED]
        -viewDriveFolderLink() [DENIED]
        -viewPricelistLink() [DENIED]
    }
    class EngineerTechnician {
        +performRFSizing()
        +configureBoQ()
        +saveOwnProjects()
        +receiveHandover()
    }
    class ProductExpert {
        +configureCommercialPricing()
        +buildCustomPackages()
        +exportQuotations()
        +initiateHandover()
    }
    User <|-- Administrator
    User <|-- Overseer
    User <|-- EngineerTechnician
    User <|-- ProductExpert
```

### 4.1. Kebijakan Keamanan Otentikasi
1. **Domain Whitelisting:** Hanya alamat email dengan domain `@citradata.id` dan `@techsolutions.id` yang diizinkan masuk atau mendaftar. Domain publik (`@gmail.com`, `@yahoo.com`) ditolak secara absolut.
2. **Pending Approval Protocol:** Akun yang didaftarkan mandiri otomatis berstatus `pending` dan terkunci hingga diverifikasi dan disetujui secara eksplisit oleh Administrator.
3. **Kriptografi Password:** Menggunakan hashing **PBKDF2 dengan SHA-256** dan *unique cryptographic salt* (100.000 iterasi). Verifikasi password menggunakan `secrets.compare_digest` untuk mencegah serangan timing attack.
4. **Keamanan Sesi:** Menggunakan token acak 256-bit (`secrets.token_urlsafe(32)`) dengan masa berlaku terkelola.
5. **HTTP Security Headers:**
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: SAMEORIGIN`
   - `Referrer-Policy: strict-origin-when-cross-origin`

---

## 5. Kolaborasi Tim, Handover & Notifikasi

### 5.1. Alur Serah Terima Proyek (Handover Workflow)
Fitur handover dirancang khusus untuk memfasilitasi kerja sama antara divisi *Product Expert* (Sales) dan *Engineer / Technician* (Presales):

```mermaid
sequenceDiagram
    participant Sales as Product Expert (Sales)
    participant Server as CDPK Gateway & Drive Engine
    participant GDrive as Google Drive Subfolder (11NLBY...)
    participant Eng as Engineer / Technician
    
    Sales->>Server: Kirim Handover (Pilih Rekan Tim + Catatan Instruksi)
    Server->>GDrive: Update appProperties.collaborators & Simpan Catatan
    Server->>Server: Buat In-App Notification (Tipe: Handover)
    Server->>Server: Catat Event ke Tamper-Evident Audit Trail
    Eng->>Server: Buka Notifikasi (Ikon Lonceng Kuning)
    Eng->>Server: Klik "Buka Proyek" langsung dari Notifikasi
    Server->>GDrive: Fetch Data Proyek (.cdpk.json)
    Server-->>Eng: Render Sizing & BoQ Lengkap di Layar
```

1. **Inisiasi Handover:** Pembuat proyek dapat memilih 1 atau lebih rekan tim aktif, menyertakan catatan khusus (misal: *"Mohon bantu verifikasi tinggi tower dan survei link backhaul"*).
2. **Metadata Drive:** Daftar kolaborator disimpan pada properti Google Drive `appProperties.collaborators`.
3. **Pusat Notifikasi (Yellow Bell):**
   - Terletak di bilah atas aplikasi dengan badge jumlah pesan belum dibaca.
   - Memberikan notifikasi instan dan tombol aksi langsung untuk memuat proyek terkait tanpa harus mencari di arsip.

---

## 6. Tata Kelola Eksekutif: Portofolio, Guardrail & Jejak Audit

### 6.1. Ringkasan Portofolio Eksekutif (Executive Portfolio Summary)
Tersedia bagi **Administrator** dan **Overseer** di bagian atas modal Arsip Proyek:
- **Total Pipeline Nilai Proyek:** Akumulasi total nominal penawaran seluruh proyek tim (format Rupiah IDR).
- **Rata-rata Margin Tim:** Indikator kesehatan profitabilitas tim penjualan.
- **Kepatuhan Guardrail:** Menghitung jumlah proyek yang memenuhi batas aman margin perusahaan ($\ge 15\%$).
- **Perlu Perhatian Margin:** Mendeteksi otomatis proyek dengan margin tipis ($< 15\%$) yang memerlukan peninjauan khusus manajemen.

### 6.2. Kebijakan Guardrail Margin (Margin Guardrail Policy)
- **Standar Ambang Batas:** Minimum **15.0%**.
- **Indikator Visual Peringatan:**
  - **Tabel BoQ (Tab 2):** Input target margin berubah warna menjadi oranye dan memunculkan banner peringatan guardrail.
  - **Konfigurator Paket Kustom (Tab 7):** Slider margin memunculkan pill alert `⚠️ Guardrail Margin: Di bawah standar (<15%)`.
  - **Daftar Berkas Arsip:** Setiap berkas proyek menampilkan badge `⚠️ Margin: X% (<15%)` atau `✓ Margin: X%`.

### 6.3. Jejak Audit Terdesentralisasi (Tamper-Evident Audit Trail)
- Modul backend: `server/audit.py` | Penyimpanan: `data/audit_log.json`.
- Event yang dicatat secara permanen:
  - `login` / `logout` / `register`: Akses autentikasi (Google Workspace / Kredensial) beserta alamat IP.
  - `user_mgmt`: Penambahan akun, perubahan profil, toggle status, persetujuan/penolakan, promosi, dan reset password.
  - `save_project`: Penyimpanan berkas proyek baru atau revisi ke Google Drive.
  - `load_project`: Pembukaan kembali berkas proyek dari Google Drive.
  - `handover`: Serah terima proyek antardivisi beserta daftar penerima dan catatan.
  - `export_pdf` / `export_xlsx`: Pengunduhan dokumen resmi penawaran komersial dan BoQ.

---

## 7. Multi-Model AI Copilot (Google Gemini)

Terhubung ke endpoint AI resmi dengan pemilih model:
1. **Google Gemini 3.8 Flash:** Dirancang untuk inferensi cepat (sub-detik), formulasi parameter sizing dari deskripsi kebutuhan klien, dan penyusunan draf BoQ instan.
2. **Google Gemini 3.8 Pro:** Dirancang untuk penalaran kompleks, analisis tender RKS teknis yang rumit, optimalisasi anggaran (*budget constraints*), dan pembuatan narasi proposal eksekutif komprehensif.

Fitur AI Copilot:
- *Natural Language Prompt-to-Sizing*: Mengubah kalimat klien menjadi konfigurasi radio, repeater, dan topologi otomatis.
- *Bilingual Proposal Narrator*: Menghasilkan bab narasi metodologi teknis penawaran dalam Bahasa Indonesia atau Inggris.
- *State Syncing*: Membaca *state* kalkulasi aktif saat ini sehingga saran AI selalu relevan dengan konteks layar pengguna.

---

## 8. Arsitektur Integrasi Google Drive & Cloud Hosting

### 8.1. Sumber Daya Google Drive Terhubung (`drive citradata`)
- **Master Google Drive Folder:** `1OB_UaNyd65Ccb3lmdwJuw5raufCwhgbS` (Folder Utama CDPK System Planner).
- **Sub-folder Arsip Output:** `11NLBY5EAPLb4q753r1TRVKgYRe0JpO8W` (*Kalkulasi & Penawaran Tim*).
- **Master Spreadsheet Pricelist:** `1Kp85v81JXeRC5ti-ZXYBChgrj2ztnnwrCHokI02LX6U`.
- **Token OAuth2 Terisolasi:** Disimpan di sisi server (`GDRIVE_CITRADATA_CRED`) dengan auto-refresh tanpa melibatkan browser klien.

### 8.2. Spesifikasi Deployment Render Cloud
- **Docker Base Image:** `python:3.11-slim`.
- **Container Port:** `7860`.
- **Region:** `singapore`.
- **Healthcheck Endpoint:** `/health` (mendukung `GET` dan `HEAD`).
- **Keep-Alive:** Workflow GitHub Actions berjalan otomatis berkala untuk mencegah *cold-start sleep* pada tier non-dedicated.

---

## 9. Desain Antarmuka Responsif Mobile & Tablet

Aplikasi dirancang agar dapat diakses optimal di lapangan (*field survey*):
- **Cross-Platform:** Kompatibel penuh dengan smartphone dan tablet (Apple iOS Safari, iPadOS, dan Android Chrome).
- **Responsive Layout:**
  - Header dengan layout fleksibel membungkus logo, pemilih bahasa, pusat notifikasi, info pengguna, dan tombol aksi tanpa terpotong (*no horizontal scroll overflow*).
  - Sentuhan ramah jari (*touch target $\ge 44\text{px}$*).
  - Tabel BoQ dengan pembungkus *horizontal scroll* halus untuk layar sempit.
  - Modal dan drawer dengan tinggi adaptif (`max-h-[92vh]`) dan penutup sentuhan luar (*click outside*).

---

## 10. Struktur Direktori Proyek (Production v8.4.0)

```text
Project Calculator - CDPK/
├── Dockerfile                        # Konfigurasi container Render Cloud (Port 7860)
├── render.yaml                       # Blueprint Render (Region: Singapore)
├── requirements.txt                  # Dependensi Python
├── AGENTS.md                         # Dokumen Kebijakan Keamanan & Tata Kelola Agen
├── PRD-New.md                        # Dokumen Spesifikasi Produk (Dokumen Ini)
├── PRD-legacy.md                     # Arsip spesifikasi versi legacy
├── USER_GUIDE.md                     # Panduan Lengkap Operasional Pengguna
├── README.md                         # Informasi Repositori & Petunjuk Setup
├── app.py                            # Gateway API & Server Aplikasi Utama
├── server/
│   ├── auth.py                       # Autentikasi PBKDF2, Sesi, Google OAuth, & RBAC
│   ├── audit.py                      # Engine Tamper-Evident Audit Trail Logger
│   ├── gdrive_sync.py                # Integrasi Google Drive API & Spreadsheet Reader
│   ├── notifications.py              # In-App Notification Center
│   └── ai_copilot.py                 # Multi-Model Gemini 3.8 Flash & Pro Engine
├── data/
│   ├── audit_log.json                # Log aktivitas audit trail
│   ├── default_knowledge.json        # Cache lokal katalog produk & konfigurasi
│   ├── notifications.json            # Database notifikasi pengguna
│   └── users.json                    # Cache data akun pengguna lokal
└── static/
    ├── index.html                    # Single Page Application Shell (Bilingual, Tailored UI)
    └── js/
        ├── app_core.js               # Alpine.js Controller & State Management
        ├── i18n.js                   # Kamus Bahasa Indonesia (ID) & English (EN)
        ├── exporters.js              # PDF, Excel (.xlsx), & PNG Coverage Exporters
        ├── sizing_engine.js          # Engine Sizing Geometrik RF & Alokasi Perangkat
        ├── catalog_data.js           # Knowledge Bank Produk Motorola & Avigilon
        ├── rf_simulation.js          # Engine Propagasi Canvas HTML5
        ├── mandays_engine.js         # Estimator Hari Kerja Presales (WES)
        └── ai_assistant.js           # Handler Dialog & State Transfer AI Copilot
```
