# PRD — Legacy System Analysis: DMSC-I System Planner Toolkit (v7.4)

> **File Sumber:** `legacy/DMSC-I_Toolkit_v7_4.html`  
> **Pemilik / Entitas:** PT Citradata Purnakharisma (Authorized Distributor Motorola Solutions)  
> **Versi Terdeteksi di Kode:** File bernama `v7.4`, `<title>` menampilkan `v7.1`, Header menampilkan `v7.0`, Footer menampilkan `v6.3`, dan PDF/XLSX Footer menampilkan `v4.0`.  
> **Arsitektur:** Monolithic Single-File HTML SPA (~5.572 baris, 481 KB).

---

## 1. Executive Summary & Tujuan Aplikasi
**DMSC-I System Planner Toolkit** adalah aplikasi internal *pre-sales engineering* dan *system sizing* berbasis web (client-side SPA) yang dirancang untuk membantu tim Presales dan Sales **PT Citradata Purnakharisma** dalam:
1. Menghitung kebutuhan infrastruktur komunikasi radio dua arah (**Motorola Solutions MOTOTRBO DMR**) berdasarkan luas area, industri, kontur geografis (terrain), dan jumlah pengguna.
2. Menentukan topologi sistem yang tepat (*Direct Conventional, IP Site Connect, Capacity Plus Single/Multi-Site, Capacity Max*).
3. Menyajikan katalog produk serta sistem pencari & pemberi rekomendasi pintar (*intelligent product recommendation engine*) untuk lini produk Radio (Motorola), CCTV (Avigilon & AVA), VMS, AI NVR, dan Antena (Avanti).
4. Menghasilkan draf **Bill of Quantity (BoQ)** indikatif secara instan.
5. Menghitung beban kerja tim Presales (**Presales Mandays Estimator**) menggunakan metode **Weighted Effort Score (WES)**.
6. Mensimulasikan propagasi sinyal RF (**RF Coverage Simulation**) secara visual di atas HTML5 Canvas menggunakan model *Log-Distance Path Loss* (aproksimasi *Longley-Rice*) beserta deteksi *dead zone* dan *link budget*.
7. Mengekspor seluruh laporan ke format dokumen siap saji (**PDF, XLSX, PNG, dan DOCX**).

---

## 2. Arsitektur Teknis & Dependency Stack

Aplikasi dibangun sebagai **100% Client-Side Single-File Application** tanpa backend internal:

| Komponen / Library | Versi / Sumber CDN | Fungsi dalam Aplikasi |
| :--- | :--- | :--- |
| **Tailwind CSS** | `cdn.tailwindcss.com` | Styling layout responsif dan utility classes, dikombinasikan dengan custom CSS *Glassmorphism* (`.glass`, `.glass-sm`, `.glass-dark`). |
| **Alpine.js** | `3.x.x` (`unpkg.com`) | Reactive state management utama (`x-data="app()"`), tab routing (`view`), data binding form, dan rendering list/template. |
| **jsPDF & AutoTable** | `2.5.1` & `3.8.2` (`cdnjs`) | Pembuatan dokumen PDF client-side untuk BoQ, Mandays WES Report, dan RF Coverage Simulation Report. |
| **SheetJS (xlsx)** | `0.18.5` (`cdnjs`) | Ekspor tabel BoQ dan rincian perhitungan Mandays ke file Excel (`.xlsx`). |
| **Docx.js** | `8.5.0` (`unpkg.com`) | Pembuatan laporan RF Coverage Simulation dalam format Microsoft Word (`.docx`) lengkap dengan tabel dan embed gambar *canvas*. |
| **OpenStreetMap Nominatim API** | REST API Publik | Satu-satunya koneksi jaringan eksternal runtime: melakukan *geocoding* nama kota/lokasi di Indonesia menjadi koordinat `Latitude` dan `Longitude`. |
| **Google Fonts** | `DM Sans` & `Space Grotesk` | Tipografi utama antarmuka. |
| **Embedded Assets** | Base64 PNG (`_LOGO_B64`) | Logo PT Citradata Purnakharisma yang di-encode langsung di dalam state JavaScript (~60 KB per definisi). |

---

## 3. Peta Alur Pengguna (Application Flow & Navigation)

Aplikasi memiliki **6 modul utama (Tab View)** yang dikontrol oleh state `view` di dalam Alpine.js:

```mermaid
flowchart TD
    Start([User Membuka Aplikasi]) --> Tab1[1. Tab: Sizing]
    
    subgraph Core Sizing Flow
        Tab1 -->|Input Parameter Proyek & Additional Info| Calc[Klik 'GENERATE SOLUTION' -> calculate()]
        Calc --> RF[Engine 1: RF Geometry & Mixed Split]
        Calc --> Cap[Engine 2: DMR Capacity & Timeslot]
        Calc --> Topo[Engine 3: Multi-Factor Topology Decision]
        Calc --> Term[Engine 4: Dynamic Radio & Power Calc]
        RF & Cap & Topo & Term --> OutCarousel[Render 8 Kartu Analisis Teknis & SVG]
    end

    OutCarousel -->|Data Tersimpan di State `results`| Tab4[4. Tab: Bill of Quantity]
    OutCarousel -->|Klik 'Isi Otomatis' -> mdAutoFill()| Tab5[5. Tab: Mandays]
    OutCarousel -->|Auto-pass Sites, Radius, Band, Lokasi| Tab6[6. Tab: Coverage Sim]

    Tab2[2. Tab: Product Catalog] <-->|Browse 28 Produk di 10 Kategori| Tab3[3. Tab: Rekomendasi]
    Tab3 -->|Search + Synonym Expand + Env Profile Scoring| OutRec[Skor Kecocokan Produk 0-100%]

    Tab4 -->|Export| ExpBOQ([PDF / XLSX BoQ])
    Tab5 -->|WES Formula: MD = WES*PSF/K + B| ExpMD([PDF / XLSX Mandays])
    Tab6 -->|Nominatim Geocode + 60x60 Grid Canvas| ExpCov([PNG / PDF / DOCX Coverage])
```

---

## 4. Bedah Detail Modul, Algoritma, dan Bank Knowledge

### 4.1. Modul 1: Project Sizing (`view === 'sizing'`)

#### A. Parameter Input (`form`)
1. **Informasi Klien:** Nama Klien (`client`), Lokasi (`location` — otomatis men-trigger `geocodeLocation()` saat diubah), Tipe Proyek (`projectType`: *greenfield, expansion, replacement, upgrade*).
2. **Area & Industri:**
   - Pilihan Industri (`industry` — 19 sub-kategori yang terbagi menjadi *Outdoor*, *Indoor*, *Mixed Indoor+Outdoor*, dan *Public/Government*).
   - Luas Area dalam Hektar (`area`).
   - Kondisi Lingkungan / Terrain (`terrain`: *open, coastal, hilly, forest, urban, indoor, mixed_inout, underground*).
3. **Kebutuhan Pengguna:** Jumlah User (`userCount`), Kepadatan Trafik (`trafficDensity`: *low, medium, high, critical*), Prioritas Proyek (`priority`: *coverage, capacity, reliability, cost, safety*).
4. **Additional Info (Opsional - Accordion):**
   - *Infrastruktur Existing:* Jumlah Tower Existing (`existingTowers`), Tinggi Tower rata-rata (`towerHeight`, default 40m jika outdoor), Sistem Radio Existing (`existingSystem`).
   - *Backhaul & Konektivitas:* Node Starlink Existing (`starlinkNodes`), Tipe Backhaul (`backhaul`: *fiber, starlink, lte, microwave, none*), Sumber Daya Listrik (`power`: *pln_stable, pln_unstable, genset, solar, none*).
   - *Compliance & Fitur:* Kebutuhan Compliance (`compliance`: *atex, ip67, milstd, aes, p25, none*), Fitur Prioritas (`features`: *gps, data, video, lte_int, dispatcher*), Catatan (`notes`).

#### B. Bank Knowledge: Parameter RF Industri (`INDUSTRY`)
Setiap industri memiliki konfigurasi frekuensi, radius dasar (`baseR` dalam km untuk outdoor, atau km-ekuivalen per zona untuk indoor), dan faktor redaman vegetasi/clutter (`veg`):

* **Outdoor / Wide Area:**
  * `Agriculture`: Band VHF | `baseR: 9.0 km` | `veg: 0.80`
  * `Mining`: Band VHF | `baseR: 7.0 km` | `veg: 0.70`
  * `OilGas`: Band UHF | `baseR: 6.0 km` | `veg: 0.68`
  * `Utility`: Band VHF | `baseR: 7.5 km` | `veg: 0.78`
  * `Port`: Band VHF | `baseR: 8.0 km` | `veg: 0.85`
  * `Airport`: Band UHF | `baseR: 7.0 km` | `veg: 0.87`
* **Indoor / Urban (`outdoor: false`):**
  * `Manufacturer`: Band UHF | `baseR: 0.35 km-eq` | `veg: 0.60`
  * `Enterprise`: Band UHF | `baseR: 0.45 km-eq` | `veg: 0.70`
  * `Hospital`: Band UHF | `baseR: 0.38 km-eq` | `veg: 0.65`
  * `Hotel`: Band UHF | `baseR: 0.45 km-eq` | `veg: 0.72`
  * `Retail`: Band UHF | `baseR: 0.40 km-eq` | `veg: 0.68`
* **Public / Government (`outdoor: true`):**
  * `PublicSafety`: Band VHF | `baseR: 10.0 km` | `veg: 0.90`
  * `Transportation`: Band UHF | `baseR: 5.5 km` | `veg: 0.78`
  * `Military`: Band VHF | `baseR: 10.0 km` | `veg: 0.85`
  * `Government`: Band UHF | `baseR: 5.0 km` | `veg: 0.80`
* **Mixed Indoor + Outdoor (`mixed: true`, seluruhnya Band UHF):**
  * `MallMixed`: Indoor 65% (`baseR: 0.40`, `veg: 0.68`, `4 lantai`) + Outdoor 35% (`baseR: 1.5`, `veg: 0.85`, `mountH: 12m`).
  * `AirportMixed`: Indoor 40% (`baseR: 0.45`, `veg: 0.72`, `3 lantai`) + Outdoor 60% (`baseR: 2.5`, `veg: 0.90`, `mountH: 20m`).
  * `HospitalMixed`: Indoor 80% (`baseR: 0.38`, `veg: 0.65`, `6 lantai`) + Outdoor 20% (`baseR: 1.2`, `veg: 0.85`, `mountH: 10m`).
  * `StadiumMixed`: Indoor 50% (`baseR: 0.35`, `veg: 0.60`, `3 lantai`) + Outdoor 50% (`baseR: 2.0`, `veg: 0.88`, `mountH: 15m`).

#### C. Bank Knowledge: Faktor Terrain (`TERRAIN`)
| Key Terrain | Faktor Pengali (`f`) | Persentase Reduksi (`r`) | Label |
| :--- | :---: | :---: | :--- |
| `open` | `1.00` | 0% | Open/Flat |
| `coastal` | `1.05` | 0% | Coastal |
| `hilly` | `0.72` | 28% | Hilly |
| `forest` | `0.58` | 42% | Dense Vegetation |
| `urban` | `0.65` | 35% | Urban/Dense |
| `indoor` | `1.00` | 0% | Indoor |
| `mixed_inout` | `0.85` | 15% | Mixed Indoor+Outdoor |
| `underground` | `0.78` | 22% | Underground |

#### D. Rumus & Algoritma Sizing (`calculate()`)
1. **Perhitungan Radius & Cakupan Geometri (Standar Outdoor/Indoor):**
   - **Tower Height Factor:** $\text{towerF} = \min(2.0, \max(0.6, \sqrt{H_{\text{tower}} / 40}))$ untuk outdoor; `1.0` untuk indoor.
   - **Effective Radius per Site (km):** $R_{\text{eff}} = \text{baseR} \times \text{towerF} \times f_{\text{terrain}} \times \text{veg}$.
   - **Coverage per Site (Ha):** $\text{covPerSite} = \pi \times (R_{\text{eff}})^2 \times 100$.
   - **Effective Coverage dengan Overlap 20% (Ha):** $\text{effCov} = \text{covPerSite} \times 0.80$.
   - **Raw Sites:** $\text{rawSites} = \max(1, \lceil \text{Area} / \text{effCov} \rceil)$, dibatasi maksimum 999 site.
   - **Traffic Uplift pada Site:** Jika `trafficDensity === 'high'` dikali `1.2`; jika `'critical'` dikali `1.5`.
   - **Operational Sites Adjustment (Khusus Outdoor Luas & Starlink):**
     - Area > 10.000 Ha $\rightarrow$ min. 5 site; Area > 5.000 Ha $\rightarrow$ min. 4 site; Area > 2.000 Ha $\rightarrow$ min. 3 site; Area > 500 Ha $\rightarrow$ min. 2 site.
     - Jika ada node Starlink (`stN > 0`), min. site = $\lceil \text{stN} / 3 \rceil$.
   - **Site Baru (`newSites`):** $\max(0, \text{rawSites} - \min(\text{existingTowers}, \text{rawSites}))$.

2. **Algoritma Khusus Mixed Indoor + Outdoor (`ic.mixed === true`):**
   - Area dipecah: $\text{Area}_{\text{in}} = \text{Area} \times \text{indoorFrac}$ dan $\text{Area}_{\text{out}} = \text{Area} \times \text{outdoorFrac}$.
   - **Komponen Indoor (DAS / Leaky Feeder):**
     - $R_{\text{eff,in}} = \text{indoorBaseR} \times \text{indoorVeg}$
     - $\text{effCovZone} = (\pi \times R_{\text{eff,in}}^2 \times 100) \times 0.75$ (overlap 25%)
     - $\text{indoorZones} = \lceil \text{Area}_{\text{in}} / \text{effCovZone} \rceil$
     - $\text{indoorReps} = \text{indoorZones} \times \text{floorsTypical}$ (1 repeater per lantai per zona horizontal)
   - **Komponen Outdoor (Building-Mount):**
     - $\text{mountTF} = \min(1.4, \max(0.5, \sqrt{\text{outdoorMountH} / 40}))$
     - $R_{\text{eff,out}} = \text{outdoorBaseR} \times \text{mountTF} \times \text{outdoorVeg} \times 0.65$ (koreksi urban clutter)
     - $\text{effCovOut} = (\pi \times R_{\text{eff,out}}^2 \times 100) \times 0.80$
     - $\text{outdoorSites} = \lceil \text{Area}_{\text{out}} / \text{effCovOut} \rceil$
   - **Total Mixed:** $\text{totalSites} = \text{indoorZones} + \text{outdoorSites}$, dan $\text{totalRepeaters} = \max(\text{indoorReps} + \text{outdoorReps}, \lceil \text{User} / 130 \times 1.2 \rceil)$. Topologi selalu dikunci ke `IP Site Connect (Mixed In-Building + Outdoor)` dengan repeater `MOTOTRBO SLR 5300`.

3. **Perhitungan Kapasitas DMR (`capacityCalc`):**
   - Asumsi dasar DMR: 1 Repeater = 2 Timeslot; 1 Timeslot $\approx$ 65 User $\rightarrow$ **130 User / Repeater**.
   - **Headroom:** $+20\%$ ($\times 1.20$).
   - $\text{repFinal} = \lceil (\text{User} / 130) \times 1.20 \rceil$.
   - **Traffic Multiplier pada Kapasitas:** Jika `high` $\times 1.15$; jika `critical` $\times 1.35$.
   - **Aturan Minimum Trunking:** Jika $\text{User} \ge 80$, sistem membutuhkan trunking dengan minimal **3 repeater** (`MIN_TRUNKING_REPEATERS = 3`).
   - **Total Repeater Akhir:** $\text{repTotal} = \max(\text{repFinal}, \text{rawSites})$, dan $\text{timeslotsTotal} = \text{repTotal} \times 2$.

4. **Pohon Keputusan Topologi (`effectiveSystem`) & Pemilihan Perangkat:**
   - **Capacity Max (DMR Tier III):** Jika $\text{effSites} > 10$, atau $\text{User} > 1000$ (atau $>800$ single-site), atau *Mission Critical* ($\text{effSites} \ge 3$ atau $\text{User} \ge 200$), atau $\text{Area} > 5000\text{ Ha}$ dengan trafik *critical*.
     - *Repeater:* `MOTOTRBO SLR 8000 High Power` (jika Area > 10.000 Ha atau Site > 5) atau `MOTOTRBO SLR 5500`.
     - *Gateway:* `Capacity Max Zone Controller + Prime Sites (Redundant)`.
   - **Capacity Plus (Multi-Site) / Linked Capacity Plus:** Jika multi-site ($\ge 3$ site dengan $>200$ user dan ada backhaul, atau $\ge 2$ site dengan $>400$ user).
     - *Repeater:* `MOTOTRBO SLR 8000 High Power` (Area > 5.000 Ha) atau `MOTOTRBO SLR 5500`.
     - *Gateway:* `MOTOTRBO WAVE PTX + SmartPTX Dispatcher`.
   - **IP Site Connect:** Jika $2 \le \text{effSites} \le 10$ dan bukan trunking kapasitas tinggi.
     - *Repeater:* `MOTOTRBO SLR 8000 High Power` (Area > 5.000 Ha) atau `MOTOTRBO SLR 5500`.
     - *Gateway:* `MOTOTRBO WAVE PTX + SmartPTX Dispatcher` (>3 site) atau `MOTOTRBO SmartPTX Dispatcher`.
   - **Capacity Plus (Single-Site):** Jika 1 site dan $80 \le \text{User} \le 800$.
     - *Repeater:* `MOTOTRBO SLR 5500` ($\ge 4$ rep) atau `MOTOTRBO SLR 5300`.
   - **Direct Conventional:** Jika 1 site dan $<80$ user.
     - *Repeater:* `MOTOTRBO SLR 5500` ($H_{\text{tower}} \ge 60\text{m}$) atau `MOTOTRBO SLR 5300`.
   - **Pure Indoor Override:** Menjadi `Conventional In-Building` (1 site) atau `IP Site Connect (In-Building)` (>1 site) dengan `MOTOTRBO SLR 5300`.

5. **Pemilihan Radio Terminal Dinamis (`radioLib` + Overrides):**
   - Dimulai dari pemetaan default per industri (`radioLib`), lalu dimodifikasi secara dinamis oleh skenario:
     - **Compliance ATEX:** Mengganti radio lapangan utama dengan `XiR P8600 Ex Series`.
     - **Compliance P25:** Menambahkan `MOTOTRBO XiR P8600i Series` di urutan pertama.
     - **Outdoor Luas (> 500 Ha):** Otomatis menambahkan radio mobile kendaraan (`MOTOTRBO XiR M8668i` untuk >5.000 Ha, atau `XiR M8600i Series`).
     - **Multi-site atau > 200 User:** Menambahkan `MOTOTRBO XiR P8600i Series` (kecuali ATEX).
     - **User > 50:** Memastikan supervisor mendapat smart radio `MOTOTRBO Ion`.
     - **Area Sangat Luas (> 3.000 Ha) atau > 5 Site:** Menambahkan `Motorola TLK 100` sebagai *LTE Nationwide Fallback*.

6. **Perhitungan Kebutuhan Daya Listrik (`powerCalc`):**
   - *Peta Konsumsi Repeater (Idle / TX):*
     - `SLR 5300`: Idle 45W, TX 100W
     - `SLR 5500`: Idle 60W, TX 130W
     - `SLR 8000`: Idle 80W, TX 200W
     - `SLR 8000 High Power`: Idle 100W, TX 250W
     - `SLR 1000`: Idle 30W, TX 70W
   - *Duty Cycle Rata-rata:* $W_{\text{avg}} = \text{round}(W_{\text{idle}} \times 0.70 + W_{\text{TX}} \times 0.30)$.
   - *Beban Tambahan (Switch/Router/Fan):* $60\text{W}$ untuk multi-site, $30\text{W}$ untuk single-site.
   - *Kalkulasi Solar Off-Grid (jika `power === 'solar'`):*
     - $\text{Panel (Wp)} = \text{round}(W_{\text{site}} \times 3 / 0.8)$ (asumsi 3 jam matahari efektif, efisiensi 80%).
     - $\text{Baterai (Ah @ 12V)} = \text{round}(W_{\text{site}} \times 72 / 12 / 0.8)$ (autonomy 3 hari / 72 jam, DoD 80%, LiFePO4).
   - *Kalkulasi UPS:* $\text{UPS (VA)} = \text{round}((W_{\text{site}} / 0.8) \times 1.3)$ (Power Factor 0.8, margin +30%).

---

### 4.2. Modul 2 & 3: Product Catalog & Rekomendasi Pintar (`catalog` & `recommend`)

#### A. Isi Bank Data Katalog (`productCatalog`)
Terdapat **28 item produk** yang terbagi ke dalam **10 kategori** (Catatan: *Seluruh data spesifikasi produk bersifat statis/hardcoded dan TIDAK memiliki atribut harga*):
1. **Handy Talky (8 produk):** `Motorola TLK 100`, `MOTOTRBO R2`, `MOTOTRBO R7`, `XiR P8600 Ex Series`, `MOTOTRBO XiR C1000/C2000 Series`, `MOTOTRBO Ion`, `MOTOTRBO SL1M`, `MOTOTRBO XiR P8600i Series`.
2. **Base Station / Mobile (4 produk):** `MOTOTRBO DR3000 Series`, `MOTOTRBO XiR M8600i Series`, `MOTOTRBO XiR M8668i`, `MOTOTRBO XiR M8260i`.
3. **Repeater (4 produk):** `MOTOTRBO SLR5500 Series`, `MOTOTRBO SLR8000 Series`, `MOTOTRBO CLR Series` (tertulis CLR Series untuk 1W In-Building DAS), `Duplexer VHF/UHF Band-Pass`.
4. **Software (3 produk):** `MOTOTRBO PremierOne / WAVE PTX`, `MOTOTRBO Management Suite`, `RadioPro SysPlan / Dispatch System`.
5. **CCTV Avigilon (10 produk):** `Avigilon H5 PRO Camera 61MP`, `Avigilon H6A Dome 8MP`, `Avigilon H6X Bullet 8MP`, `Avigilon H5A Rugged PTZ 8MP`, `Avigilon H5A Thermal Camera`, `Avigilon H5A Multisensor 4x8MP`, `Avigilon H5A Fisheye 8/12MP`, `Avigilon H6 Mini Dome 3/5MP`, `Avigilon H4 Video Intercom 3MP`, `Avigilon H4 LPC Camera`, `Avigilon Unity H6SL 3-9MP`, `Avigilon H5SL 1.5-3MP` *(Total 12 produk di kategori CCTV Avigilon, sehingga total seluruh katalog adalah **30 item produk**)*.
6. **CCTV AVA (2 produk):** `Ava Compact Dome 5MP`, `Ava Bullet 4K/5MP`.
7. **AI NVR (1 produk):** `Avigilon AI NVR (Value/Standard/Premium)`.
8. **Cloud Connector (1 produk):** `Avigilon Alta A500 Cloud Connector`.
9. **Avigilon Unity Video (1 produk):** `Avigilon Unity Video 8 VMS`.
10. **Avanti Antenna (5 produk):** `AVO-150 Yagi Antenna VHF`, `TDJ-900D Yagi 800/900MHz`, `AVO-350DII/B Omni 330-390MHz`, `AVO-400D/DII/E Omni 400MHz`, `AVO-900C Omni 900MHz`.

#### B. Algoritma Pencarian & Rekomendasi (`runSearch()`)
1. **Tokenisasi & N-Gram:** Memecah kueri pencarian menjadi *unigram*, *bigram* (2 kata), dan *trigram* (3 kata).
2. **Ekspansi Sinonim (`synonymMap`):** Memetakan **37 kata kunci Bahasa Indonesia** ke terminologi teknis Bahasa Inggris (contoh: `"tahan air"` $\rightarrow$ `["IP68", "IP67", "IP66", "weatherproof", "rugged"]`; `"plat nomor"` $\rightarrow$ `["LPC", "LPR", "license plate"]`).
3. **Word-Boundary Matching (`wMatch`):** Menggunakan RegExp boundary agar kata pendek seperti `"ip"` tidak salah mencocokkan `"IP Site Connect"` secara sembarangan.
4. **Bobot Pencocokan Teks (`rawScore`):**
   - Cocok di Nama Model/Series: **+50 poin** (frasa) / **+35 poin** (kata tunggal).
   - Cocok di Fitur (`features`): **+40 poin** (frasa) / **+25 poin** (kata tunggal).
   - Cocok di Deskripsi / Best For: **+25 poin** (frasa) / **+15 poin** (kata tunggal).
5. **Profil Lingkungan (`envProfiles`):** Memberikan **+18 poin bonus** untuk setiap tag yang sesuai dengan filter lingkungan (*outdoor, indoor, mixed, hazardous, vehicle, enterprise*) dan mengurangi **-28 poin penalti** untuk setiap tag yang bertentangan (misal: memilih *indoor* memberi penalti pada `atex`, `100w`, `high power`).
6. **Normalisasi Skor Akhir (`finalScore`):** Диkonversi ke skala `0–100%` dengan rumus $\text{textScore} + 0.3 \times \text{envBonus} - 0.4 \times \text{envPenalty}$. Produk dengan skor $\ge 18\%$ ditampilkan, dan jika hasil $< 3$ produk, sistem mencari *Similar Products* dari kategori lain.

---

### 4.3. Modul 4: Bill of Quantity (`view === 'boq'`)
- Menyusun daftar perangkat secara otomatis dari hasil Sizing:
  1. **Repeater / Base Station:** Qty = `repTotal`.
  2. **Handheld Terminal:** 1 baris untuk setiap jenis radio yang direkomendasikan, namun **Qty diisi `"TBD"`** (karena rasio pembagian jumlah user ke tiap tipe radio belum ditentukan di Sizing).
  3. **Duplexer:** Qty = `repTotal` (1 unit per repeater).
  4. **Antenna System:** Qty = `rawSites` (DAS Indoor + Outdoor untuk mixed, High-Gain Omni + Coax 7/8" untuk outdoor, atau Indoor Antenna untuk indoor).
  5. **Dispatcher / Software:** Qty = `1` (jika ada gateway).
  6. **Backhaul Equipment:** Qty = `newSites` (Starlink Business Node / Fiber Optic Link / IP Backhaul Device).
  7. **Power System:** Qty = `rawSites` (jika listrik tidak stabil, belum ada, atau solar).
  8. **Tower / Mast:** Qty = `newSites` (Self-Supporting Tower/Monopole untuk outdoor, atau Indoor Mounting Kit).
  9. **Lightning Protection:** Qty = `rawSites` (Lightning Arrester + Grounding Kit).
- **Keterbatasan Utama di Legacy:** Hanya menghitung jumlah fisik unit (**tanpa kolom Harga Satuan, Diskon, Pajak/PPN, maupun Total Harga Proyek**).
- **Fitur Ekspor:** Menghasilkan file PDF berformat surat resmi PT Citradata Purnakharisma (lengkap dengan nomor referensi otomatis `REF-YYYYMMDD-HHMM` dan masa berlaku 30 hari) serta file Excel (`.xlsx`).

---

### 4.4. Modul 5: Presales Mandays Estimator (`view === 'mandays'`)
Menghitung estimasi hari kerja (*Mandays*) tim Presales menggunakan metode **Weighted Effort Score (WES)**:

$$\text{WES} = (S \times 0.4) + (D \times 0.2) + (I \times 0.3) + (A \times 0.1)$$

$$\text{Total Mandays (MD)} = \left(\frac{\text{WES} \times \text{PSF}}{K}\right) + B$$

1. **Komponen $S$ — System Scale (Bobot 40%):**
   - Poin Repeater: $(\text{SLR 1000} \times 1.5) + (\text{SLR 5000} \times 2.5) + (\text{SLR 8000} \times 4.5)$.
   - Dikalikan *Mode Multiplier (`ms`)*: `Conventional` ($\times 1.0$), `IPSC` ($\times 1.3$), `CapPlus` ($\times 1.8$), `CapMax` ($\times 2.5$).
2. **Komponen $D$ — Device Complexity (Bobot 20%):**
   - $(\text{Handheld} + \text{Mobile}) / 100 + \text{Programming Level Bonus}$ (`0` untuk Standard, `1` untuk Custom per group/zone, `2` untuk Fully custom + advanced features).
3. **Komponen $I$ — Integration & Software (Bobot 30%):**
   - Penjumlahan poin dari opsi yang dicentang: `WireGuard/VPN` (+2), `Dispatcher/Console` (+4), `Third-Party API` (+5), `Starlink/VSAT` (+2), `DAS/Leaky Feeder` (+3), `LTE/WAVE PTX` (+3), `MOTOTRBO Gateway/Analog Bridge` (+2), plus input poin manual `Others` (0–20 poin).
4. **Komponen $A$ — Administrative / Reporting (Bobot 10%):**
   - Pilihan level: `1` (Desk Study Saja), `2` (Proposal Teknis Formal), `3` (Presentasi ke Klien), `4` (Full Site Survey), `5` (Dokumen Tender Lengkap).
5. **Parameter Kalibrasi:**
   - **PSF (Principal Sync Factor):** `1.0` (Standard Order) atau `1.2` (Special / Motorola Approval).
   - **$K$ (Konstanta Produktivitas):** Slider `3.0` s/d `10.0` (default `5.0`).
   - **$B$ (Buffer Days):** Slider `0.0` s/d `3.0` hari (default `1.0`).
   - **Jumlah Presales:** Slider `1` s/d `5` orang.
6. **Output & Klasifikasi:**
   - Membagi distribusi pekerjaan secara proporsional ke 5 aktivitas (*Desain Sistem RF, Pemrograman Perangkat, Integrasi & Testing, Dokumen & Presentasi, Koordinasi & Revisi*).
   - Klasifikasi kompleksitas: $\le 3\text{ MD}$ (*Rendah*), $\le 7\text{ MD}$ (*Sedang*), $\le 14\text{ MD}$ (*Tinggi*), $> 14\text{ MD}$ (*Sangat Tinggi*).
   - Dilengkapi tombol **Isi Otomatis (`mdAutoFill()`)** yang menyalin hasil dari tab Sizing.

---

### 4.5. Modul 6: RF Coverage Simulation (`view === 'sysplan'`)
Simulasi propagasi sinyal radio di atas elemen `<canvas id="covCanvas" width="1200" height="600">` tanpa ketergantungan pada tile server peta eksternal (menghindari masalah blokir CORS saat ekspor gambar):

1. **Parameter Fisika & Link Budget:**
   - **TX Power ($P_{\text{TX}}$):** `50 dBm` (100W) untuk SLR 8000, `37 dBm` (5W) untuk SLR 1000, `47 dBm` (50W) untuk SLR 5300/5500.
   - **Antenna Gain ($G_{\text{TX}}$):** `3 dBd` (VHF) atau `5 dBd` (UHF).
   - **Cable Loss ($L_{\text{cable}}$):** `3 dB` jika $H_{\text{tower}} > 30\text{m}$, selain itu `2 dB`.
   - **EIRP:** $P_{\text{TX}} + G_{\text{TX}} - L_{\text{cable}}$.
   - **RX Sensitivity ($S_{\text{RX}}$):** `-117 dBm` (standar DMR) dengan RX Antenna Gain `3 dBd`.
   - **Tower Height Gain ($G_{\text{tower}}$):** $20 \log_{10}(\max(H_{\text{tower}}, 5) / 10)$.
   - **Path Loss Exponent ($n$):** `open: 2.2`, `coastal: 1.9`, `hilly: 3.4`, `urban: 3.7`, `forest: 4.0`, `indoor: 4.5`, `underground: 5.0` (default `3.0`).
   - **Fade Margin ($M_{\text{fade}}$):** `8 dB` (open/coastal), `14 dB` (forest/urban), `10 dB` (lainnya).
   - **Frekuensi ($f$):** `155 MHz` (VHF) atau `440 MHz` (UHF).
   - **Reference Path Loss ($PL(d_0)$ pada $d_0 = 0.1\text{ km}$):**
     $$PL(d_0) = 20\log_{10}(100) + 20\log_{10}(f_{\text{MHz}}) + 20\log_{10}\left(\frac{4\pi}{300}\right) + 30$$
   - **Rumus RSSI pada jarak $d$ (km):**
     $$\text{RSSI}(d) = \text{EIRP} - \left(PL(d_0) + 10 \cdot n \cdot \log_{10}\left(\frac{d}{d_0}\right)\right) + G_{\text{tower}} + G_{\text{RX}} - M_{\text{fade}}$$
2. **Grid Rendering & Dead Zone Clustering:**
   - Membagi area menjadi matriks **60 × 60 titik (3.600 sampel)**, menghitung RSSI terbaik dari seluruh posisi site repeater, lalu menggambar 4 mode visualisasi (*Signal Strength Smooth Heatmap* dengan interpolasi bilinear offscreen canvas, *RSSI Estimate*, *Contour Lines*, dan *Binary Coverage Zones*) di atas 4 pilihan background (*Dark CloudRF-style, Topographic Grid, Satellite-Style, Terrain Relief*).
   - Mengelompokkan (*clustering*) titik-titik dengan $\text{RSSI} < -100\text{ dBm}$ yang berdekatan (radius $< 0.25 \times R_{\text{eff}}$) menjadi daftar **Dead Zone** lengkap dengan koordinat Lat/Lng dan tingkat keparahan (*Critical, Severe, Moderate*).

---

## 5. Temuan Audit Kode, Bug, & Inkonsistensi pada Versi Legacy

Dari hasil pembedahan kode baris demi baris pada `DMSC-I_Toolkit_v7_4.html`, ditemukan sejumlah masalah teknis dan inkonsistensi data yang **wajib diperbaiki** pada pembuatan ulang aplikasi (PRD-New):

1. **Duplikasi Kode Masif (~1.500 Baris Kode Kembar):**
   - Di dalam objek `app()`, fungsi `_getDocMeta()`, `exportPDF()`, `exportXLSX()`, state rekomendasi, fungsi `debounceSearch()`, `runSearch()`, `sortResults()`, getter `catalogCategories`, `filteredProducts`, массив `productCatalog` (30 produk), properti `_LOGO_B64`, dan fungsi `_captureMapImage()` **didefinisikan dua kali secara identik** (baris `2913–3726` dan diulang kembali pada baris `4283–5558`). Di JavaScript, definisi kedua akan menimpa definisi pertama dan memperbesar ukuran file secara sia-sia hingga ~35%.
2. **Inkonsistensi Penamaan Model Produk Antara Engine Sizing, Mandays, dan Katalog:**
   - Engine Sizing merekomendasikan repeater **`MOTOTRBO SLR 5300`** (untuk indoor, mixed, dan single-site) serta di Mandays terdapat input **`MOTOTRBO SLR 1000`**, namun di `productCatalog` yang terdaftar hanya **`MOTOTRBO SLR5500 Series`**, **`MOTOTRBO SLR8000 Series`**, dan **`MOTOTRBO CLR Series`** (padahal di dunia nyata Motorola, CLR Series adalah radio *Portable/Handheld* komersial ultra-kecil, sedangkan repeater 1W untuk in-building/outdoor kompak adalah **SLR 1000**).
   - Di kawasan APAC (termasuk Indonesia), seri repeater MOTOTRBO 50W menggunakan penamaan **SLR 5300** (sedangkan SLR 5500 adalah penamaan pasar EMEA, dan SLR 5700 untuk pasar Amerika Utara). Di aplikasi legacy, penamaan `SLR 5300` dan `SLR 5500` tercampur aduk.
   - Pada fungsi `buildTopoSVG()` baris `2798`, terdapat referensi variabel `effSites` yang tidak didefinisikan di dalam scope parameter fungsi `buildTopoSVG(topo, sites, stN, bh)` (seharusnya menggunakan parameter `sites`), yang berpotensi memicu `ReferenceError` saat kondisi tertentu terpenuhi.
3. **Inkonsistensi Nomor Versi:**
   - Satu file yang sama mencantumkan 5 nomor versi berbeda: `v7.4` (nama file), `v7.1` (tag `<title>` dan HUD canvas), `v7.0` (header navbar), `v6.3` (footer halaman), dan `v4.0` (footer ekspor PDF dan XLSX).
4. **Ketidaksinkronan Terrain pada Simulasi Coverage untuk Mode Mixed:**
   - Pada `_buildCoverageCanvas()`, objek `terrainN` tidak memiliki key `mixed_inout`, sehingga jika user memilih terrain `mixed_inout`, eksponen path loss jatuh ke fallback default `3.0`.
5. **Ketiadaan Kuantitas (Qty) Radio Handheld di BoQ & Ketiadaan Sistem Harga:**
   - Seluruh baris radio di BoQ berstatus `"TBD"` sehingga tidak terhitung dalam `TOTAL UNIT PENAWARAN`, dan belum ada mekanisme kalkulasi harga (Unit Price, Extended Price, Diskon, PPN, Multi-Currency IDR/USD) maupun sinkronisasi ke sumber data eksternal.
