---
title: "FMTCS_DAS_08_System_Architecture_LinkBudget_and_Projects.md"
original_file_name: "FMTCS DAS System Architecture, Link Budget & Project Case Studies.pdf"
drive_file_id: "1wJPXRaITtnFEfL-mwKJSsKp3psDnL0XQ"
drive_view_url: "https://drive.google.com/file/d/1wJPXRaITtnFEfL-mwKJSsKp3psDnL0XQ/view"
mime_type: "text/markdown"
folder_path: "FMTCS Fiber DAS Knowledge Base"
last_modified: "2026-10-17T00:00:00.000Z"
image_reference_note: "Diagram arsitektur sistem kampus multi-gedung, kurva link budget optik/RF, peta lantai penempatan antena data center MY03, dan skematik topologi ring dapat dilihat pada dokumen proyek asli di link di atas."
extracted_at: "2026-10-17T16:00:00.000000+00:00"
---

# FMTCS Fiber DAS: Topologi Sistem, Kalkulasi Link Budget, & Studi Kasus Proyek
## Panduan Arsitektur & Perencanaan Kapasitas Sistem (Bilingual ID / EN)

> 🔗 **Dokumen Asli & Sumber Rekayasa:** FMTCS Solutions Pte. Ltd. (Singapore) / Shanghai FMTCS Communication Information Technology Co., Ltd.  
> 📂 **Folder Knowledge Base:** `FMTCS Fiber DAS Knowledge Base`  
> 🏷️ **Kategori Sistem:** RFoF Architecture, Link Budgeting, Dimensioning Ratios & Reference Projects  
> 📌 **Cakupan Utama:** Topologi Star/Cascade/Ring, Formula Link Budget Optik & RF, Rasio Proyek MY03 Data Center, Portofolio Proyek DayOne & BDC

---

### 1. Perbandingan Topologi Jaringan Serat Optik (Fiber DAS Topologies)

Sistem FMTCS Fiber DAS mendukung tiga konfigurasi arsitektur jaringan optik utama yang dapat disesuaikan dengan tata letak fisik fasilitas dan tingkat ketersediaan (availability tier) yang dipersyaratkan.

```
1. STAR TOPOLOGY (TOPOLOGI BINTANG) - AOMU & DOMU
           +---> [Fiber Strand 1] ---> [ORU #1] ---> [Antenna Grid Floor 1]
           |
 [OMU] ----+---> [Fiber Strand 2] ---> [ORU #2] ---> [Antenna Grid Floor 2]
           |
           +---> [Fiber Strand 3] ---> [ORU #3] ---> [Antenna Grid Floor 3]

2. CASCADE TOPOLOGY (TOPOLOGI KASKADE / DAISY-CHAIN) - DOMU ONLY
 [DOMU] ---> [Fiber Optic] ---> [DORU #1] ---> [Fiber Optic] ---> [DORU #2] ---> [DORU #3]
                                   |                                |                |
                                [Antennas]                       [Antennas]       [Antennas]

3. RESILIENT RING TOPOLOGY (TOPOLOGI CINCIN MANDIRI) - DOMU ONLY
           +-----> [Fiber Loop A] -----> [DORU #1] -----> [DORU #2] -----+
           |                                                              |
        [DOMU]                                                            v
           ^                                                           [DORU #3]
           |                                                              |
           +<----- [Fiber Loop B] <----- [DORU #5] <----- [DORU #4] <-----+
            (Self-Healing Optical Switch: Failover < 50ms upon cable cut)
```

#### Karakteristik Tiap Topologi:
1. **Topologi Bintang (Star Network):**
   - Setiap remote unit (ORU) terhubung langsung ke satu port optik OMU melalui core serat optik terdedikasi (point-to-point).
   - **Kelebihan:** Latensi seragam, isolasi gangguan sempurna (kerusakan satu kabel optik hanya memengaruhi satu zona), mudah dalam pemecahan masalah (troubleshooting).
   - **Kekurangan:** Membutuhkan tarikan kabel serat optik dengan jumlah core terbanyak dari ruang server pusat (MDF) ke setiap lantai (IDF).
   - **Penerapan:** Wajib untuk Analog OMU (AOMU400C) dan ideal untuk gedung bertingkat rendah/sedang dengan riser kabel yang luas.

2. **Topologi Kaskade (Cascade / Daisy-Chain):**
   - Sinyal optik ditransmisikan dari DOMU ke DORU pertama, kemudian diteruskan ke DORU berikutnya menggunakan port optik kedua (`OPT2`) melalui serat optik yang sama.
   - **Kelebihan:** Menghemat penarikan kabel serat optik utama. Sangat ideal untuk struktur linier seperti terowongan kabel bawah tanah, terowongan jalan tol/kereta, dan gedung bertingkat tinggi dengan riser tunggal.
   - **Penerapan:** Khusus Digital OMU (DOMU400C + DORU400CH), maksimal hingga 8 kaskade per cabang optik.

3. **Topologi Cincin Redundan (Self-Healing Ring Network):**
   - Unit-unit remote DORU dihubungkan membentuk cincin tertutup kembali ke unit DOMU induk.
   - **Kelebihan:** Keandalan tingkat tinggi (Carrier-Grade Resiliency). Jika terjadi putus kabel serat optik (fiber cut) di titik mana pun, modul optik bypass secara otomatis membalikkan arah transmisi dalam waktu **< 50 milidetik**, sehingga tidak ada area cakupan radio yang kehilangan sinyal.
   - **Penerapan:** Fasilitas Tier III / Tier IV Data Center, kilang minyak dan gas (petrochemical plants), bandar udara, dan instalasi militer/keamanan nasional.

---

### 2. Formula Rekayasa & Kalkulasi Link Budget (Engineering Formulas & Link Budgeting)

Perancangan RFoF DAS melibatkan dua domain perhitungan: **Domain Optik (Optical Link Budget)** dan **Domain RF Koaksial (RF Link Budget)**.

#### A. Perhitungan Link Budget Optik (Optical Link Budget):
Tingkat daya optik yang diterima oleh fotodioda penerima pada ORU dihitung dengan formula:
$$P_{Rx\_optik}	ext{ (dBm)} = P_{Tx\_optik}	ext{ (dBm)} - A_{total}$$
Di mana total redaman optik ($A_{total}$) adalah:
$$A_{total} = (lpha_{fiber} 	imes L) + (N_{splice} 	imes L_{splice}) + (N_{conn} 	imes L_{conn}) + M_{safety}$$

- $P_{Tx\_optik}$ = Daya keluaran laser pemancar OMU (nominal $+0 	ext{ dBm}$ s/d $+3 	ext{ dBm}$).
- $lpha_{fiber}$ = Koefisien redaman kabel serat optik single-mode ($0.35	ext{ dB/km}$ pada panjang gelombang $1310	ext{ nm}$; $0.22	ext{ dB/km}$ pada $1550	ext{ nm}$).
- $L$ = Jarak fisik kabel optik (dalam kilometer).
- $L_{splice}$ = Redaman sambungan fusi (fusion splice), tipikal $\le 0.05	ext{ dB}$ per sambungan.
- $L_{conn}$ = Redaman konektor ferrule LC/UPC, tipikal $\le 0.25	ext{ dB}$ per pasang.
- $M_{safety}$ = Margin penuaan sistem dan tekukan serat (safety design margin), direkomendasikan **$2.0 \sim 3.0	ext{ dB}$**.
- **Ambang Penerimaan:** Daya optik terima $P_{Rx\_optik}$ pada unit DORU harus berada dalam rentang dinamis linier: **$-15	ext{ dBm} \le P_{Rx\_optik} \le +3	ext{ dBm}$**.

#### B. Perhitungan Link Budget RF Koaksial (Downlink RF Link Budget):
Daya pancar terukur pada setiap antena dalam ruangan (Indoor Antenna EIRP) dihitung dari daya keluaran ORU dikurangi seluruh redaman pasif:
$$P_{ant}	ext{ (dBm)} = P_{ORU\_Tx}	ext{ (dBm)} - L_{coax} - \sum L_{splitter} - \sum L_{coupler} + G_{ant}$$

- $P_{ORU\_Tx}$ = Daya keluaran RF Downlink DORU400CH = **$+40	ext{ dBm}$ (10 Watt)**.
- $L_{coax}$ = Panjang kabel koaksial 1/2" (HCAAYZ-50-12) $	imes 0.048	ext{ dB/m}$ pada frekuensi 450 MHz.
- $L_{splitter}$ = Rugi sisipan splitter 2-way ($3.3	ext{ dB}$).
- $L_{coupler}$ = Nilai kopling terarah ($6	ext{ dB}, 10	ext{ dB}, 15	ext{ dB}, 20	ext{ dB}$) atau rugi sisipan jalur tembus ($0.5 \sim 1.8	ext{ dB}$).
- $G_{ant}$ = Penguatan antena langit-langit (ANTI400R) = **$+3	ext{ dBi}$**.
- **Target Daya Radiasi Antena ($P_{ant}$):** Dalam gedung kantor atau data center, daya efektif tiap antena ditargetkan berkisar antara **$+10	ext{ dBm}$ hingga $+15	ext{ dBm}$ per carrier** agar tidak menimbulkan interferensi saturasi pada radio genggam yang melintas tepat di bawah antena.

#### C. Model Propagasi Dalam Ruangan (Indoor Log-Distance Path Loss Model):
Kekuatan sinyal yang diterima oleh handy talky ($P_{Rx\_HT}$) pada jarak $d$ meter dari antena langit-langit dihitung dengan:
$$PL(d)	ext{ [dB]} = PL(d_0) + 10 \cdot n \cdot \log_{10}\left(rac{d}{d_0}
ight) + X_\sigma + \sum FAF$$
$$P_{Rx\_HT}	ext{ (dBm)} = P_{ant}	ext{ (dBm)} - PL(d) + G_{HT}$$

- $PL(d_0)$ = Free-space path loss pada jarak referensi $d_0 = 1	ext{ meter}$ ($35.5	ext{ dB}$ pada 450 MHz).
- $n$ = Eksponen rugi lintasan (Path loss exponent): $n = 1.8$ untuk koridor bebas pandang (LoS); $n = 3.0 \sim 3.8$ untuk ruang kantor berdinding gipsum/partisi; $n = 4.2 \sim 5.0$ untuk ruang server berdinding beton bertulang dan rak server logam padat.
- $FAF$ = Floor/Wall Attenuation Factor ($3	ext{ dB}$ untuk gipsum, $10\sim 15	ext{ dB}$ untuk kaca tebal/tembok bata, $20\sim 30	ext{ dB}$ untuk pintu besi/beton bunker).
- $G_{HT}$ = Penguatan antena portable radio (tipikal $0	ext{ dBi}$).
- **Kriteria Kualitas Cakupan (Acceptance Criteria):** Kekuatan sinyal terima pada handy talky di **≥ 95% area gedung** harus mencapai **$\ge -95	ext{ dBm}$ (DMR Digital Clarity)**, dengan ambang batas minimal mutlak **$-105	ext{ dBm}$** untuk audio DAQ 3.4.

---

### 3. Studi Kasus Referensi: Proyek Fasilitas Data Center MY03 (MY03 Reference Ratios)

Berdasarkan data BoQ resmi (*Quotation FMTCS/2026/0320001*), proyek data center skala mega **MY03 Data Center** (kompleks multiterdiri dari lantai Basement/Ground, Server Halls, Utility & Rooftop) menggunakan arsitektur Fiber DAS Digital FMTCS sebagai berikut:

#### Komposisi Perangkat Keras Proyek MY03:
| Komponen Perangkat (Equipment Name) | Model / Tipe | Jumlah (Qty) | Satuan | Fungsi dalam Sistem |
|---|---|---|---|---|
| **Base Station Repeater** | Motorola MOTOTRBO SLR 5300 | 3 | Unit | 3 kanal RF repeater (DMR Tier II / Trunking) |
| **8-Channel RF Combiner** | FMTCS-CFH/8 (BCFH4008.RI) | 1 | Unit | Penggabung 3 kanal pemancar Tx repeater |
| **8-Way Receiver Multiplexer** | FMTCS--DJF/8 (PDJF4008.M) | 1 | Unit | Pemisah sinyal penerima Rx ke 3 repeater |
| **Cavity Duplexer** | FMTCS-SGQ (DSGQ400C.RI) | 1 | Unit | Duplekser antena utama stasiun induk |
| **Downlink Signal Splitter** | FMTCS-LRF/S (DSS400C.M601) | 1 | Unit | Penurun daya Tx 30dB ke port OMU |
| **Uplink Signal Splitter** | FMTCS-LRF/S (USS400C.M601) | 1 | Unit | Penyearah sinyal uplink dari OMU |
| **Digital Optical Master Unit (DOMU)** | **DOMU400C.RI (FMTCS-LRF/N)** | **2** | **Unit** | **Unit induk optik digital pusat (MDF)** |
| **Digital Optical Remote Unit (DORU)** | **DORU400CH.RI (FMTCS-LRF/F)** | **18** | **Unit** | **Unit jarak jauh optik 10W di setiap zona/lantai** |
| **Indoor Ceiling Omni Antenna** | **FMTCS-ANTI (ANTI400R.M01)** | **575** | **Unit** | **Antena langit-langit omni 3 dBi dalam ruangan** |
| **2-Way Wilkinson Power Splitter** | **FMTCS-PD (PD400R.M0201)** | **172** | **Unit** | **Pembagi daya simetris 2-cabang** |
| **Directional Coupler (6/10/15/20/30dB)**| **FMTCS-CP (CP400R.M)** | **415** | **Unit** | **Penggandeng terarah untuk pemerataan sinyal** |
| **Outdoor Omni Antenna (Base/Yard)** | FMTCS-ANTG (ANTG400R.M01) | 4 | Unit | Antena omni luar ruang 5 dBi (rooftop/yard) |
| **Outdoor Directional Panel Antenna** | FMTCS-ANTD (ANTD400R.M01) | 8 | Unit | Antena pengarah outdoor 2 dBi perimeter/loading |
| **Kabel Koaksial Feeder 1/2"** | HCAAYZ-50-12 | **19,600** | **Meter** | **Kabel distribusi RF berrugi-rendah 50-Ohm** |
| **Konektor RF N-Male / N-Female** | NJ-1/2, N-KK, NJW | **3,300** | **Pcs** | **Konektor terminasi feeder & jumper** |
| **Kabel Jumper Koaksial 1.5m** | SYV-50-3 | 30 | Unit | Jumper koneksi antar perangkat dalam rak |
| **Kabel Patch Cord Serat Optik LC-LC** | MNOFHC-SMD-50 (5m) | 42 | Pcs | Patch cord optik single-mode ODF ke OMU/ORU |
| **Perangkat Lunak NMS / Monitoring**| FMTCS-OCC | 1 | Paket | Software monitoring terpusat OMU & ORU |
| **Perangkat Handy Talky (Terminals)**| Motorola R5 | 60 | Unit | Radio genggam operasional teknisi data center |
| **Radio Bergerak / Mobile Radio** | Motorola M6660i | 1 | Unit | Radio kontrol stasiun / ruang security |
| **Sistem Dispatching Konsol Terpusat**| TRBOnet Enterprise v6.4 | 1 | Paket | Server suara, rekaman suara, GPS & dispatch |

---

### 4. Rasio Desain Perencanaan Rekayasa (CDPK Engineering Dimensioning Ratios)

Berdasarkan analisis empiris proyek MY03 Data Center di atas, aturan praktis (rules of thumb) rasio komponen untuk perencanaan proyek CDPK System Planner adalah sebagai berikut:

$$egin{aligned}
	ext{Rasio Antena per DORU} &= rac{575	ext{ Antena}}{18	ext{ DORU}} pprox \mathbf{31.94 pprox 32	ext{ Antena / DORU}} \
	ext{Rasio Splitter per Antena} &= rac{172	ext{ Splitter}}{575	ext{ Antena}} pprox \mathbf{0.30	ext{ Splitter / Antena}} \quad (1	ext{ Splitter per } 3.34	ext{ Antena}) \
	ext{Rasio Coupler per Antena} &= rac{415	ext{ Coupler}}{575	ext{ Antena}} pprox \mathbf{0.72	ext{ Coupler / Antena}} \quad (1	ext{ Coupler per } 1.38	ext{ Antena}) \
	ext{Panjang Kabel Feeder per Antena} &= rac{19,600	ext{ m}}{575	ext{ Antena}} pprox \mathbf{34.08	ext{ meter Coax 1/2" per Antena}} \
	ext{Jumlah Konektor RF per Antena} &= rac{3,300	ext{ Konektor}}{575	ext{ Antena}} pprox \mathbf{5.74	ext{ Konektor N-Type per Antena}} \
	ext{Rasio Pasif per DORU} &= rac{172 + 415}{18} pprox \mathbf{32.6	ext{ Unit Komponen Pasif (Splitter+Coupler) per DORU}}
\end{aligned}$$

#### Tabel Pedoman Cepat Dimensi Fasilitas Baru (Quick Planning Guideline):
| Luas Bangunan / Karakteristik Fasilitas | Estimasi Kebutuhan DORU | Estimasi Antena Indoor | Estimasi Kabel Coax 1/2" | Estimasi Splitter + Coupler |
|---|---|---|---|---|
| **Kecil (Gedung 3-5 Lantai, Luas ~10,000 m²)** | 1 ~ 2 DORU (atau 1 AOMU+2 AORU) | 30 ~ 60 Antena | 1,000 ~ 2,000 m | 10 Splitter + 25 Coupler |
| **Menengah (Gedung 10-15 Lantai, Luas ~35,000 m²)** | 4 ~ 6 DORU (1 DOMU) | 120 ~ 180 Antena | 4,000 ~ 6,000 m | 40 Splitter + 90 Coupler |
| **Besar (Kampus Industri / DC, Luas ~100,000 m²)**| 12 ~ 18 DORU (1-2 DOMU) | 400 ~ 600 Antena | 14,000 ~ 20,000 m | 150 Splitter + 350 Coupler |
| **Mega Campus (Kawasan Terpadu, Luas >250,000 m²)**| 24 ~ 32 DORU (2 DOMU) | 800 ~ 1,000 Antena| 28,000 ~ 35,000 m | 250 Splitter + 600 Coupler |

---

### 5. Portofolio Proyek Internasional FMTCS (Real Project References)

FMTCS telah mengimplementasikan sistem RF over Fiber DAS pada fasilitas mission-critical bertaraf internasional:

| Nama Proyek (Project Name) | Lokasi Fasilitas | Nilai Proyek (Scale) | Arsitektur Solusi (Delivered Solution) |
|---|---|---|---|
| **DayOne Malaysia Data Center** | Nusajaya Tech Park, Johor, Malaysia | **$2,526,000 USD** | Centralized Integrated Campus Fiber DAS (Multi-Hall DC, Ring Network Resiliency) |
| **Indonesia DayOne Data Center** | Jakarta / Karawang, Indonesia | **$740,000 USD** | Centralized Integrated Campus Fiber DAS (Hyperscale DC Rigs) |
| **Thailand BDC Data Center** | Bangkok, Thailand | **$300,000 USD** | Centralized Integrated Campus Fiber DAS (Multi-Building Riser Infrastructure) |
| **Thailand DayOne Data Center** | Bangkok Industrial Zone, Thailand | **$200,000 USD** | Centralized Integrated Campus System |
| **Hong Kong Tsuen Wan DayOne DC** | Tsuen Wan, Hong Kong SAR | **$150,000 USD** | Single Super High-Rise Indoor Coverage (High-Density RF Riser) |
| **Malaysia BDC Data Center** | Kuala Lumpur, Malaysia | **$88,000 USD** | Single Super High-Rise Multi-Floor Coverage |
