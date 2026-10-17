---
title: "FMTCS_DAS_02_OMU_Analog_AOMU400C.md"
original_file_name: "OMU(Analog） FMTCS-LRFN AOMU400C.RI 20267.01版(1).pdf"
drive_file_id: "1ycAQS1VSPyY2bO67xhPqTryse_iAVlv3"
drive_view_url: "https://drive.google.com/file/d/1ycAQS1VSPyY2bO67xhPqTryse_iAVlv3/view"
mime_type: "text/markdown"
folder_path: "FMTCS Fiber DAS Knowledge Base"
last_modified: "2026-10-17T00:00:00.000Z"
image_reference_note: "Gambar skematik konversi fotoelektrik analog, tata letak port kabinet, dan foto fisik panel dapat dilihat langsung pada dokumen asli di link di atas."
extracted_at: "2026-10-17T16:00:00.000000+00:00"
---

# FMTCS Analog Optical Master Unit (AOMU400C.RI / FMTCS-LRF/N)
## Lembar Pengetahuan Teknis & Spesifikasi Rekayasa (Bilingual ID / EN)

> 🔗 **Dokumen Asli & Sumber Rekayasa:** FMTCS Solutions Pte. Ltd. (Singapore) / Shanghai FMTCS Communication Information Technology Co., Ltd.  
> 📂 **Folder Knowledge Base:** `FMTCS Fiber DAS Knowledge Base`  
> 🏷️ **Kategori Sistem:** RF over Fiber (RFoF) Analog Distributed Antenna System (DAS)  
> 📌 **Model Perangkat:** `FMTCS-LRF/N` | **Kode Spesifikasi:** `AOMU400C.RI1`

---

### 1. Ringkasan Eksekutif & Deskripsi Perangkat (Executive Summary & Overview)

#### Bahasa Indonesia
**FMTCS AOMU400C.RI (FMTCS-LRF/N)** adalah unit induk optik analog (Analog Optical Master Unit / OMU) yang menerapkan teknologi modulasi konversi fotoelektrik analog langsung (direct optical-to-RF photoelectric conversion). Perangkat ini dirancang secara khusus untuk sistem komunikasi radio dua arah (two-way radio) yang membutuhkan solusi perluasan sinyal yang ekonomis, memiliki latensi transmisi ultra-rendah (ultra-low latency), dan implementasi plug-and-play yang andal.

AOMU400C sanggup mengoperasikan hingga **4 Remote Units Analog (AORU)** dalam topologi **Bintang (Star)** murni dengan jangkauan transmisi optik hingga **8 kilometer**. Unit ini mampu melewatkan hingga **8 kanal pembawa RF (carriers)** secara simultan dengan rentang frekuensi broadband 410 ~ 470 MHz. Dengan desain sirkuit analog yang sederhana tanpa konversi digital yang kompleks, AOMU400C menawarkan keandalan tinggi, konsumsi daya rendah, dan efisiensi biaya investasi (CAPEX) yang sangat menarik untuk gedung bertingkat tunggal/ganda, gudang logistik, atau kompleks perkantoran komersial berskala menengah.

#### English
The **FMTCS AOMU400C.RI (FMTCS-LRF/N)** is a cost-effective Analog Optical Master Unit engineered for two-way radio indoor coverage systems. Adopting direct linear RFoF (Radio Frequency over Fiber) photoelectric conversion technology, the AOMU400C converts incoming RF carrier signals directly into modulated laser light without intermediate digitization, achieving near-zero processing latency and high power efficiency.

Designed for small-to-medium enterprise facilities, a single AOMU400C master unit connects up to **4 Analog Optical Remote Units (AORUs)** in a point-to-multipoint **Star topology** with transmission distances up to **8 km**. It handles up to **8 concurrent RF carriers** across 410 ~ 470 MHz, supporting both conventional DMR/FM repeaters and trunked dispatching systems.

---

### 2. Prinsip Kerja & Diagram Blok Analog RFoF (Operating Principle & Analog Architecture)

```
        BASE STATION REPEATERS (SLR 5300 / M6660i)
                     |
            [ Combiner / Splitter ]
                     |  (RF Downlink 50 Ohm: 0 to +10 dBm)
                     v
+-----------------------------------------------------------------------------------------+
| FMTCS AOMU400C.RI ANALOG OPTICAL MASTER UNIT (2U 19" Rack)                              |
|                                                                                         |
|  [ Downlink RF In ] -> [ Step Attenuator 0-31dB ] -> [ Linear DFB Laser Diode (1310nm) ]|
|                                                                 |                       |
|                                                                 v (4-Way Optical Split) |
|  [ Uplink RF Out ]  <- [ Low Noise Amp (LNA) ]   <- [ PIN Photodiode Array (1550nm) ]   |
|                                                                 ^                       |
+-----------------------------------------------------------------+-----------------------+
                                                                  |
                  +-----------------------------------------------+ (4x LC Ports)
                  |
     +------------+------------+------------+
     | (Fiber 1)  | (Fiber 2)  | (Fiber 3)  | (Fiber 4) - Up to 8 km
     v            v            v            v
  [AORU #1]    [AORU #2]    [AORU #3]    [AORU #4]  (Analog Remote Units in Star Topology)
```

1. **Downlink Path:** Sinyal RF dari repeater melewati attenuator analog linear (rentang pengaturan 31 dB dengan langkah 1 dB). Sinyal RF analog langsung memodulasi arus injeksi dari laser semikonduktor DFB (Distributed Feedback Laser) menghasilkan modulasi intensitas optik (Intensity Modulation / Direct Detection - IM/DD). Sinyal cahaya dibagi menjadi 4 keluaran melalui coupler optik internal dan dikirim via serat optik single-mode ke 4 unit AORU.
2. **Uplink Path:** Sinyal optik dari walkie-talkie yang ditransmisikan kembali oleh unit AORU diterima oleh fotodioda PIN internal. Fotodioda mendeteksi variasi cahaya dan merekonstruksi kembali sinyal arus RF analog yang kemudian diperkuat oleh Low Noise Amplifier (LNA) sebelum disalurkan ke port RF Uplink menuju receiver repeater.

---

### 3. Lembar Spesifikasi Teknis Lengkap (Comprehensive Technical Specifications)

| Parameter Teknis (Technical Parameter) | Nilai Uplink (Uplink Value) | Nilai Downlink (Downlink Value) | Catatan Rekayasa (Engineering Notes) |
|---|---|---|---|
| **Rentang Frekuensi Operasi (Frequency Range)** | 410 ~ 470 MHz | 410 ~ 470 MHz | Cakupan penuh UHF Commercial Band |
| **Kapasitas Kanal RF (Channel Capacity)** | Hingga 8 Kanal (≤8 Carriers) | Hingga 8 Kanal (≤8 Carriers) | Mendukung sistem multi-repeater DMR Tier II |
| **Kapasitas Akses Remote (Max ORU Access)** | **4 Unit AORU** | **4 Unit AORU** | 1 remote unit per port serat optik LC |
| **Maksimum Daya Masukan RF (Max RF Input)** | Sesuai level terima ORU | **10 ± 2 dBm** | Input aman, wajib dicek sebelum power-on |
| **Rentang Pengaturan Gain (Gain Range/Step)** | **31 dB / 1 dB per step** | **31 dB / 1 dB per step** | Fleksibilitas tinggi untuk kalibrasi redaman kabel |
| **Linearitas Pengaturan Gain (Linearity)** | 0 ~ 10 dB: ±1.0 dB | 0 ~ 10 dB: ±1.0 dB | Respon linier pada rentang kerja utama |
| **Panjang Gelombang Optik (Wavelength)** | 1310 nm / 1550 nm | 1310 nm / 1550 nm | Menggunakan serat optik single-mode standar (SMF) |
| **Impedansi Karakteristik RF (RF Impedance)** | 50 ± 2 Ω | 50 ± 2 Ω | Standar impedansi koaksial RF |
| **Tipe & Jumlah Konektor RF (RF Connectors)** | 1x N-K (N-Female) | 1x N-K (N-Female) | Konektor RF N-K presisi tinggi |
| **Tipe & Jumlah Konektor Optik (Fiber Conn.)** | 4x LC Duplex | 4x LC Duplex | 4 port keluaran optik langsung |
| **Jarak Maksimum Transmisi Optik (Max Distance)**| **≤ 8 km** | **≤ 8 km** | Cukup untuk 95% fasilitas komersial & kampus |
| **Mode Topologi Serat Optik (Topology)** | **Topologi Bintang (Star Mode)** | **Topologi Bintang (Star Mode)** | Point-to-multipoint langsung tanpa percabangan optik |
| **Voltage Standing Wave Ratio (VSWR)** | ≤ 1.5 : 1 | ≤ 1.5 : 1 | Return loss ≥14 dB |
| **MTBF (Mean Time Between Failures)** | ≥ 8,000 jam | ≥ 8,000 jam | Keandalan tinggi untuk operasi 24 jam nonstop |
| **Tingkat Proteksi Ingress (Protection Level)** | IP30 | IP30 | Proteksi debu sasis dalam ruangan |
| **Dimensi Fisik (Form Factor)** | 19 Inci Rack Mount, Tinggi **2U** | 19 Inci Rack Mount, Tinggi **2U** | Desain standar kabinet server / telekomunikasi |
| **Metode Instalasi (Installation)** | Cabinet Installation | Cabinet Installation | Pemasangan rak 19" dengan rel sasis |
| **Suhu Operasional (Operating Temp)** | -5°C ~ +45°C | -5°C ~ +45°C | Ruang kontrol / ruang peralatan |
| **Kelembapan Relatif (Operating Humidity)** | ≤ 80% Non-kondensasi | ≤ 80% Non-kondensasi | Ruangan berventilasi baik |
| **Tegangan Catu Daya (Power Supply)** | 216 ~ 253 VAC, 50 Hz (Type F) | 216 ~ 253 VAC, 50 Hz (Type F) | Catu daya AC fase tunggal |
| **Antarmuka Tampilan & Setting (UI / Settings)**| Indikator Lampu LED | Indikator Lampu LED | CPS (Customer Programming Software) via USB/Serial |
| **Dukungan Sistem Kluster (Trunking Support)** | Ya (Cluster system support: Y) | Ya (Cluster system support: Y) | Transparan terhadap modulasi digital DMR/TETRA |

---

### 4. Perbandingan Teknis: AOMU400C (Analog) vs DOMU400C (Digital)

| Fitur / Parameter | Analog OMU (AOMU400C.RI) | Digital OMU (DOMU400C.RI) | Implikasi Desain Rekayasa |
|---|---|---|---|
| **Teknologi Pemrosesan** | Direct Photoelectric RFoF | Digital IF Processing + DSP Filtering | Digital lebih kebal interferensi antar frekuensi |
| **Kapasitas Akses Remote** | 4 Unit ORU | **32 Unit ORU** | Digital unggul mutlak untuk proyek skala besar (kampus/DC) |
| **Jarak Maksimum Serat** | 8 km | **20 km** | Digital cocok untuk fasilitas multi-bangunan jarak jauh |
| **Dukungan Topologi** | Star (Bintang) saja | Star, Cascade, **Self-Healing Ring** | Digital memiliki keandalan tinggi (resilient network) |
| **Latensi Transmisi** | **≤ 3 µs (Ultra Rendah)** | ≤ 15 µs (dengan sinkronisasi delay)| Analog unggul dalam latensi transmisi murni |
| **Kapasitas Kanal RF** | Hingga 8 Kanal | Hingga 12 Kanal | Digital mampu menampung lebih banyak repeater |
| **Antarmuka Pengguna** | Lampu Indikator LED | **Layar LCD Display** + Tombol + LED | Digital memudahkan teknisi memantau langsung di rak |
| **Estimasi Investasi (CAPEX)**| Sangat Ekonomis (Tier 1) | Enterprise / Mission-Critical (Tier 2)| Analog optimal untuk anggaran efisien |
