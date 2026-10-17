---
title: "FMTCS_DAS_01_OMU_Digital_DOMU400C.md"
original_file_name: "OMU(Digit） FMTCS-LRFN DOMU400C.RI 20267.01版(1).pdf"
drive_file_id: "1SOCDuv10us_7WCvEq7ERt6hYMDqmRzyN"
drive_view_url: "https://drive.google.com/file/d/1SOCDuv10us_7WCvEq7ERt6hYMDqmRzyN/view"
mime_type: "text/markdown"
folder_path: "FMTCS Fiber DAS Knowledge Base"
last_modified: "2026-10-17T00:00:00.000Z"
image_reference_note: "Gambar skematik, diagram blok modulasi optik digital, kurva respon IF, dan foto fisik panel depan/belakang dapat dilihat langsung pada brosur teknis asli di link di atas."
extracted_at: "2026-10-17T16:00:00.000000+00:00"
---

# FMTCS Digital Optical Master Unit (DOMU400C.RI / FMTCS-LRF/N)
## Lembar Pengetahuan Teknis & Spesifikasi Rekayasa (Bilingual ID / EN)

> 🔗 **Dokumen Asli & Sumber Rekayasa:** FMTCS Solutions Pte. Ltd. (Singapore) / Shanghai FMTCS Communication Information Technology Co., Ltd.  
> 📂 **Folder Knowledge Base:** `FMTCS Fiber DAS Knowledge Base`  
> 🏷️ **Kategori Sistem:** RF over Fiber (RFoF) Digital Distributed Antenna System (DAS)  
> 📌 **Model Perangkat:** `FMTCS-LRF/N` | **Kode Spesifikasi:** `DOMU400C.RI1`

---

### 1. Ringkasan Eksekutif & Deskripsi Perangkat (Executive Summary & Overview)

#### Bahasa Indonesia
**FMTCS DOMU400C.RI (FMTCS-LRF/N)** adalah unit induk optik digital (Digital Optical Master Unit / OMU) berkinerja tinggi yang dirancang untuk mendistribusikan sinyal komunikasi radio dua arah (two-way radio) multi-kanal melalui jaringan serat optik single-mode. Perangkat ini memanfaatkan pemrosesan Digital Intermediate Frequency (Digital IF) dan teknologi seleksi frekuensi digital canggih berbasis FPGA/DSP guna mengeliminasi interferensi kanal yang berdekatan (adjacent channel interference), menekan noise intermodulasi, dan mempertahankan Linearitas Dynamic Range yang tinggi.

Satu unit DOMU400C sanggup mengontrol hingga **32 Remote Units (DORU)** secara bersamaan dan mendukung kapasitas hingga **12 kanal pembawa RF (carriers)** secara simultan dalam sistem radio konvensional maupun trunking (seperti Motorola MOTOTRBO Capacity Plus, Capacity Max, TETRA, atau DMR Tier II/III). DOMU400C mendukung topologi jaringan **Bintang (Star)**, **Kaskade (Cascade / Daisy-Chain)**, dan **Cincin Redundan (Self-Healing Ring Network)** dengan jangkauan transmisi optik lossless hingga **20 kilometer**.

#### English
The **FMTCS DOMU400C.RI (FMTCS-LRF/N)** is an enterprise-grade Digital Optical Master Unit (OMU) engineered for high-capacity, mission-critical two-way radio indoor and campus signal distribution. By utilizing cutting-edge digital intermediate frequency (Digital IF) processing and high-precision digital channel filtering, the DOMU400C eliminates adjacent-frequency interference and harmonic distortion, providing superior RF clarity across extensive optical transport distances up to **20 km**.

A single DOMU400C master chassis can aggregate and manage up to **32 Digital Optical Remote Units (DORUs)** across complex multi-story structures or massive industrial facilities. It natively supports up to **12 concurrent RF carrier channels** in both conventional repeater and multi-carrier trunking modes. It features high architectural flexibility supporting **Star, Cascade, and Resilient Ring topologies** with integrated Delay Synchronization and NMS supervision.

---

### 2. Prinsip Kerja & Arsitektur Digital IF (Operating Principle & Digital IF Architecture)

```
        BASE STATION RACK (MDF)                         OPTICAL FIBER DISTRIBUTION (ODF)
+------------------------------------+             +--------------------------------------+
| Repeaters (e.g., SLR 5300 x3..12)  |             | Single-Mode Fiber (9/125 µm SMF)     |
|   [Tx Multi-Channel Combiner]      |             | 1310 nm / 1550 nm WDM                |
|   [Rx Multi-Channel Divider]       |             +--------------------------------------+
+-----------------+------------------+                                ||
                  | (RF Coax 50 Ohm)                                  || (Up to 20 km)
                  v                                                   v
+-----------------+------------------+             +------------------+-------------------+
| Signal Splitter (FMTCS-LRF/S)      |             | Digital ORUs (DORU400CH.RI)          |
|   Downlink Stripper (-30dB)        |             |   ORU #1, ORU #2 ... ORU #32         |
|   Uplink Combiner                  |             |   [Star / Cascade / Ring Loop]       |
+-----------------+------------------+             +------------------+-------------------+
                  |                                                   ^
                  v (0 to +10 dBm)                                    | (Optical Transmit)
+-----------------+---------------------------------------------------+-------------------+
| FMTCS DOMU400C.RI DIGITAL OPTICAL MASTER UNIT (2U 19" Rack)                             |
|                                                                                         |
|  [ Downlink RF Input ] -> [ RF Attenuator (0-10dB) ] -> [ ADC: RF to Digital IF ]       |
|                                                               |                         |
|                                                               v                         |
|  [ Delay Sync DSP Engine ] <---------------------> [ Digital Channel Filter / DSP ]     |
|                                                               |                         |
|                                                               v                         |
|  [ Uplink RF Output ]  <- [ DAC: Digital IF to RF ] <- [ Optical Rx: Multi-Channel ]    |
|                                                               ^                         |
|                                                               | (1310/1550nm Laser Tx)  |
|  [ Optical Transceiver Array: 4x LC Ports ] ------------------+                         |
|  [ Local NMS / LCD Panel ] <-> [ Microcontroller / CPS Management Interface ]          |
+-----------------------------------------------------------------------------------------+
```

1. **Downlink Path (Base Station -> Terminal):**
   - Sinyal RF dari Base Station / Repeater (yang telah digabungkan lewat Combiner BCFH400x dan diturunkan dayanya oleh Signal Splitter UDSS400C ke level input nominal 0 hingga +10 dBm) masuk ke port RF N-K DOMU.
   - Sinyal disampling oleh konverter analog-ke-digital (High-Speed ADC) menjadi format Digital Intermediate Frequency (Digital IF).
   - Mesin DSP melakukan penyaringan kanal digital (digital band-pass / channel filtering) untuk menekan noise di luar pita frekuensi yang dialokasikan.
   - Sinyal digital IF dimodulasikan ke dalam sinyal laser optik (1310 nm / 1550 nm) dan ditransmisikan melalui 4 port LC optik menuju remote unit (DORU).

2. **Uplink Path (Terminal -> Base Station):**
   - Sinyal optik uplink dari 32 unit DORU diterima oleh detektor foto optik DOMU.
   - Sinyal digital IF didemodulasikan, disinkronisasikan penundaannya (Delay Synchronization) agar sinyal dari beberapa remote unit tidak mengalami distorsi fase (delay spread/multipath fading).
   - Digital-to-Analog Converter (DAC) merekonstruksi sinyal RF uplink murni dan meneruskannya ke port RF Uplink N-K menuju Receiver Multicoupler / Multiplexer (PDJF400x) repeater.

---

### 3. Lembar Spesifikasi Teknis Lengkap (Comprehensive Technical Specifications)

| Parameter Teknis (Specification Parameter) | Nilai Uplink (Uplink Value) | Nilai Downlink (Downlink Value) | Catatan Rekayasa (Engineering Notes) |
|---|---|---|---|
| **Rentang Frekuensi Operasi (Frequency Range)** | 410 ~ 440 MHz *(Customizable 350-470 MHz)* | 410 ~ 440 MHz *(Customizable 350-470 MHz)* | Disesuaikan dengan alokasi izin frekuensi MCMC / Kominfo |
| **Kapasitas Kanal RF (Channel Capacity)** | Hingga 12 Kanal (≤12 Carriers) | Hingga 12 Kanal (≤12 Carriers) | Mendukung sistem konvensional & DMR Trunking Cluster |
| **Kapasitas Akses Remote (Max ORU Access)** | **32 Unit DORU** | **32 Unit DORU** | Didistribusikan via 4 port optik (hingga 8 kaskade per port) |
| **Maksimum Daya Masukan RF (Max RF Input)** | Sesuai level terima ORU | **10 ± 2 dBm** | Wajib menggunakan Signal Splitter UDSS400C jika dari repeater 50W |
| **Rentang Pengaturan Gain (Gain Range/Step)** | 10 dB / 1 dB per step | 10 dB / 1 dB per step | Dapat dikonfigurasi via tombol LCD panel atau software CPS |
| **Linearitas Pengaturan Gain (Linearity)** | 0 ~ 10 dB: ±1.0 dB | 0 ~ 10 dB: ±1.0 dB | Menjamin stabilitas amplifikasi linear |
| **Panjang Gelombang Optik (Wavelength)** | 1310 nm / 1550 nm WDM | 1310 nm / 1550 nm WDM | Single-mode optical fiber core (9/125 µm) |
| **Impedansi Karakteristik RF (RF Impedance)** | 50 ± 2 Ω | 50 ± 2 Ω | Standar sistem telekomunikasi RF |
| **Tipe & Jumlah Konektor RF (RF Connectors)** | 1x N-K (N-Female) | 1x N-K (N-Female) | N-Female 50-Ohm chassis mount |
| **Tipe & Jumlah Konektor Optik (Fiber Conn.)** | 4x LC Duplex | 4x LC Duplex | Mendukung koneksi serat optik LC-UPC single-mode |
| **Jarak Maksimum Transmisi Optik (Max Distance)**| **≤ 20 km** | **≤ 20 km** | Redaman transmisi optik tipikal ≤0.35 dB/km (1310nm) |
| **Voltage Standing Wave Ratio (VSWR)** | ≤ 1.5 : 1 | ≤ 1.5 : 1 | Return loss ≥14 dB |
| **Mode Topologi Serat Optik (Fiber Topology)** | **Cascade / Star / Ring Network** | **Cascade / Star / Ring Network** | Mendukung loop self-healing berkecepatan tinggi |
| **Fitur Pemantauan Tambahan (Features)** | Monitoring, Delay Sync, Lock | Monitoring, Delay Sync, Lock | Dilengkapi fungsi Engineering Commissioning Lock |
| **MTBF (Mean Time Between Failures)** | ≥ 8,000 jam (operasional 24/7) | ≥ 8,000 jam | Keandalan standar telekomunikasi industri |
| **Tingkat Proteksi Ingress (Protection Level)** | IP30 (Indoor Cabinet) | IP30 (Indoor Cabinet) | Dilindungi dari partikel debu padat >2.5 mm |
| **Dimensi Fisik (Chassis Form Factor)** | 19 Inci Rack Mount, Tinggi **2U** | 19 Inci Rack Mount, Tinggi **2U** | 482 mm (W) × 88 mm (H) × 350 mm (D) |
| **Metode Instalasi (Installation)** | Cabinet / Rack Mount 19" | Cabinet / Rack Mount 19" | Membutuhkan ventilasi sirkulasi udara ≥15 cm |
| **Suhu Operasional (Operating Temp)** | -5°C ~ +45°C | -5°C ~ +45°C | Ruang server berpendingin udara (HVAC) |
| **Kelembapan Relatif (Operating Humidity)** | ≤ 80% Non-kondensasi | ≤ 80% Non-kondensasi | Lingkungan terkontrol data center / base station |
| **Tegangan Catu Daya (Power Supply)** | 216 ~ 253 VAC, 50 Hz (Type F) | 216 ~ 253 VAC, 50 Hz (Type F) | Kompatibel dengan stopkontak standar Schuko / UPS Online |
| **Antarmuka Tampilan & Setting (UI / Settings)**| Layar LCD + Indikator LED | Layar LCD + Indikator LED | CPS (Customer Programming Software) & Local Keypad |

---

### 4. Detail Antarmuka Fisik & Indikator (Physical Interfaces & Indicators)

#### Panel Depan (Front Panel):
1. **Layar LCD Display:** Menampilkan parameter operasi real-time: status koneksi optik, daya optik terima (Rx Optical Power dalam dBm), daya RF input/output, nilai redaman ATT (dB), status alarm (ALC, VSWR, Over-power).
2. **Tombol Navigasi Menu (UP, DOWN, ESC, ENTER):** Untuk memilih bahasa (English / Chinese), konfigurasi attenuator (ATT + / -), dan mengaktifkan Engineering Lock.
3. **Indikator Status LED:**
   - **PWR (Hijau):** Catu daya normal.
   - **RUN (Hijau Berkedip):** CPU DSP beroperasi normal.
   - **OPT 1 - OPT 4 (Hijau/Merah):** Status koneksi serat optik untuk masing-masing port. Hijau = Link optik terhubung normal; Merah = Optical signal loss / "Receive No Light".
   - **ALM (Merah):** Alarm sistem (Downlink Over-Power, VSWR tinggi, atau temperatur berlebih).
4. **Port Komisi Lokal RJ45 (ETH/CPS):** Port Ethernet 10/100M untuk koneksi kabel LAN lurus (straight-through cable) ke PC teknisi untuk konfigurasi via software CPS atau Web GUI.

#### Panel Belakang (Rear Panel):
1. **RF-IN (Downlink Input - N-K):** Port input RF sinyal downlink dari Signal Splitter / Base Station Transmitter.
2. **RF-OUT (Uplink Output - N-K):** Port output RF sinyal uplink menuju Receiver Multicoupler / Base Station Receiver.
3. **OPT1, OPT2, OPT3, OPT4 (LC Duplex):** 4 pasang port transceiver serat optik single-mode LC-UPC.
4. **Terminal Grounding (GND):** Baut arde tembaga untuk koneksi kabel tembaga grounding (minimal 16 mm², resistansi arde <4 Ω).
5. **AC Power Inlet & Saklar:** Soket IEC C14 dengan sekring pengaman terintegrasi dan saklar ON/OFF.

---

### 5. Aturan Komisioning & Praktik Terbaik Rekayasa (Commissioning & Engineering Best Practices)

1. **Proteksi Arde & Keamanan (Grounding & Safety):**
   - Pastikan baut sasis OMU terhubung kuat ke busbar arde ruangan telekomunikasi dengan nilai tahanan tanah (grounding resistance) **wajib < 4 Ω**.
   - Berikan jarak bebas ventilasi (ventilation clearance) minimal **15 cm** di belakang kabinet agar sirkulasi kipas pendingin tidak terhambat.

2. **Pengaturan Redaman Input Downlink (Downlink ATT Tuning):**
   - Sebelum menyalakan OMU, ukur daya masukan dari Signal Splitter (UDSS400C) menggunakan RF Power Meter.
   - Daya masukan RF Downlink ke port RF-IN OMU tidak boleh melebihi **+10 dBm** (level optimal: **0 dBm s/d +5 dBm**). Jika daya repeater terlalu kuat, atur attenuator internal atau pasang fixed RF attenuator eksternal untuk menghindari kerusakan sirkuit ADC / over-power alarm.

3. **Verifikasi Tautan Optik (Optical Link Verification):**
   - Sebelum mencolokkan kabel patch cord LC ke OMU, bersihkan ujung ferrule serat optik dengan Optical Cleaning Pen / Alcohol Wipe.
   - Periksa daya optik laser menggunakan Optical Power Meter (rentang normal: -3 dBm s/d +3 dBm).
   - Pastikan remote unit (DORU) berhasil mengunci (lock) sinyal optik tanpa alarm "Receive No Light".

4. **Kunci Rekayasa (Engineering Lock):**
   - Setelah seluruh parameter gain dan threshold alarm selesai disetel, selalu aktifkan menu **Engineering Commissioning Lock** untuk mencegah perubahan parameter yang tidak disengaja akibat penekanan tombol lokal.
