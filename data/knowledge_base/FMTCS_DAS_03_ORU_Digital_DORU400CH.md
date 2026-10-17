---
title: "FMTCS_DAS_03_ORU_Digital_DORU400CH.md"
original_file_name: "ORU(Digit） FMTCS-LRFF DORU400CH.RI 20267.01版(1).pdf"
drive_file_id: "1w0z6-8F2qk16wVDWn6Sx9AXOcY2AHuHH"
drive_view_url: "https://drive.google.com/file/d/1w0z6-8F2qk16wVDWn6Sx9AXOcY2AHuHH/view"
mime_type: "text/markdown"
folder_path: "FMTCS Fiber DAS Knowledge Base"
last_modified: "2026-10-17T00:00:00.000Z"
image_reference_note: "Gambar detail modulasi RF digital, kurva PIM3, diagram pengkabelan kaskade/ring, dan panel fisik dapat dilihat pada brosur asli di link di atas."
extracted_at: "2026-10-17T16:00:00.000000+00:00"
---

# FMTCS Digital Optical Remote Unit (DORU400CH.RI / FMTCS-LRF/F)
## Lembar Pengetahuan Teknis & Spesifikasi Rekayasa (Bilingual ID / EN)

> 🔗 **Dokumen Asli & Sumber Rekayasa:** FMTCS Solutions Pte. Ltd. (Singapore) / Shanghai FMTCS Communication Information Technology Co., Ltd.  
> 📂 **Folder Knowledge Base:** `FMTCS Fiber DAS Knowledge Base`  
> 🏷️ **Kategori Sistem:** RF over Fiber (RFoF) Digital Distributed Antenna System (DAS)  
> 📌 **Model Perangkat:** `FMTCS-LRF/F` | **Kode Spesifikasi:** `DORU400CH.RI1`

---

### 1. Ringkasan Eksekutif & Deskripsi Perangkat (Executive Summary & Overview)

#### Bahasa Indonesia
**FMTCS DORU400CH.RI (FMTCS-LRF/F)** adalah unit jarak jauh optik digital (Digital Optical Remote Unit / ORU) berdaya tinggi (High Power / 10 Watt RF Output) yang dirancang untuk memperluas jangkauan radio dua arah pada zona-zona gedung bertingkat, terowongan bawah tanah, area pabrik luas, atau fasilitas data center berskala masif. DORU menerima sinyal digital optik dari DOMU400C, mendemodulasikan kembali ke sinyal digital IF, mengonversikannya menjadi sinyal frekuensi radio (RF) analog murni, dan memperkuatnya hingga daya keluaran terukur **40 ± 2 dBm (10 Watt)**.

Secara bersamaan, DORU menangkap sinyal transmisi lemah dari perangkat handy talky (HT/portable radio) di area cakupan lokalnya, mengonversikannya ke format optik digital, dan mentransmisikannya kembali ke OMU secara lossless. Dilengkapi dengan **Delay Synchronization** (sinkronisasi penundaan waktu), **Optical Cascade Daisy-Chain**, dan dukungan jaringan cincin berkecepatan tinggi (**Ring Network**), perangkat ini mencegah distorsi multipath dan memberikan jangkauan komunikasi sejernih kristal hingga jarak transmisi serat optik **20 km**.

#### English
The **FMTCS DORU400CH.RI (FMTCS-LRF/F)** is an advanced high-power (10W RF) Digital Optical Remote Unit designed for extensive indoor and campus distributed antenna networks. Operating as the field distribution point in the digital RFoF architecture, the DORU receives digitized optical IF signals from the master DOMU, reconstructs the RF waveforms, and boosts downlink power up to **+40 ± 2 dBm (10 Watts)** for distribution into passive coaxial antenna grids.

Concurrently, the DORU's high-sensitivity uplink path receives low-power handset signals, applies digital bandpass filtering, and transmits them back to the master OMU over single-mode optical fiber. Featuring dual optical ports (LC/2), the DORU natively supports **Optical Cascading**, **Star distribution**, and **Self-Healing Ring topologies** with built-in hardware delay synchronization to eliminate overlapping cell distortion.

---

### 2. Arsitektur Internal & Aliran Sinyal RF/Optik (Internal Architecture & RF Flow)

```
        FIBER OPTIC TRUNK (FROM DOMU400C / ADJACENT DORU)
                     || (Single-Mode Fiber 1310/1550nm)
                     v
+--------------------+--------------------------------------------------------------------+
| FMTCS DORU400CH.RI DIGITAL OPTICAL REMOTE UNIT (2U 19" Rack / Wall Mount)               |
|                                                                                         |
|  [ Dual Optical Transceivers: OPT-IN & OPT-OUT (LC/2) ]                                 |
|         |                                                                               |
|         v (Digital Optical Demodulator)                                                 |
|  [ High-Speed DAC ] -> [ Digital IF Filter ] -> [ Gain Control ATT (30dB/1dB) ]         |
|                                                               |                         |
|                                                               v                         |
|                                                  [ 10W Solid-State Power Amp (PA) ]     |
|                                                               |                         |
|                                                               v                         |
|  [ Internal Duplexer / Isolator ] <---------------------------+                         |
|         |                                                                               |
|         v                                                                               |
|  [ Single Port RF-OUT (N-Female 50 Ohm) ] =================> TO PASSIVE ANTENNA GRID    |
|         |                                                    (Coax 1/2", Couplers,      |
|         | (Uplink Receive from HTs: -107 dBm to 0 dBm)        Splitters & ANTI Antennas)|
|         v                                                                               |
|  [ Low Noise Amplifier (NF ≤ 5dB, Gain ≥ 50dB) ]                                        |
|         |                                                                               |
|         v                                                                               |
|  [ High-Speed ADC ] -> [ Digital Delay Synchronization Engine ]                         |
|         |                                                                               |
|         v                                                                               |
|  [ Upstream Optical Modulator Laser ] ===> (Back to DOMU400C via Optical Link)         |
+-----------------------------------------------------------------------------------------+
```

---

### 3. Lembar Spesifikasi Teknis Lengkap (Comprehensive Technical Specifications)

| Parameter Teknis (Technical Specification) | Nilai Uplink (Uplink Value) | Nilai Downlink (Downlink Value) | Catatan Rekayasa (Engineering Notes) |
|---|---|---|---|
| **Rentang Frekuensi Operasi (Frequency Range)** | 410 ~ 440 MHz *(Customizable 350-470 MHz)* | 410 ~ 440 MHz *(Customizable 350-470 MHz)* | Alokasi kanal disesuaikan per izin frekuensi |
| **Penguatan RF Sistem (RF Gain)** | **≥ 50 dB** | **≥ 50 dB** | Penguatan linier daya tinggi |
| **Daya Keluaran Terukur (Output Power)** | **-10 ± 2 dBm** (menuju optik) | **40 ± 2 dBm (10.0 Watt)** | Daya RF tinggi untuk men-drive hingga 32 antena |
| **Maksimum Daya Masukan RF (Max RF Input)** | **0 dBm** | Sesuai level optik OMU | Dilengkapi proteksi ALC jika input terlalu besar |
| **Noise Figure (NF)** | **≤ 5.0 dB** | — | Sensitivitas penerimaan sinyal HT sangat peka |
| **Emisi Palsu Luar Pita (Out-of-Band Spurious)**| 9 kHz ~ 1 GHz: **≤ -36 dBm / 100 kHz**<br>1 GHz ~ 12.75 GHz: **≤ -30 dBm / 1 MHz** | Sesuai standar emisi internasional ITU-R |
| **Intermodulasi Pasif / Orde-3 (PIM3)** | **≤ -50 dBc** | **≤ -45 dBc** | Linearitas tinggi, bebas gangguan intermodulasi |
| **Penundaan Transmisi (Transmission Delay)** | **≤ 15 µs** | **≤ 15 µs** | Dilengkapi sinkronisasi penundaan (delay sync) |
| **Pergeseran Frekuensi (Frequency Offset)** | **≤ 5 × 10⁻⁸** | **≤ 5 × 10⁻⁸** | Referensi clock digital presisi tinggi |
| **Rentang & Langkah Pengaturan Gain (Gain Range)**| **30 dB / 1 dB per step** | **30 dB / 1 dB per step** | Pengaturan independen via panel LCD / CPS |
| **Linearitas Pengaturan Gain (Linearity)** | 0 ~ 20 dB: ±1.0 dB<br>20 ~ 25 dB: ±1.5 dB | Menjamin kalibrasi link budget akurat |
| **Panjang Gelombang Optik (Wavelength)** | 1310 nm / 1550 nm | 1310 nm / 1550 nm | Transceiver optik single-mode WDM |
| **Passband Ripple (Kerataan Respon Frekuensi)**| **≤ 3.0 dB** | **≤ 3.0 dB** | Respon amplitudo seragam di seluruh kanal |
| **Isolasi Antar Port (Isolation)** | **≥ 90 dB** | **≥ 90 dB** | Perlindungan isolasi internal sangat tinggi |
| **Impedansi Karakteristik RF (RF Impedance)** | 50 ± 2 Ω | 50 ± 2 Ω | Standar transmisi koaksial RF |
| **Tipe & Jumlah Konektor RF (RF Connector)** | **1x N-K (N-Female)** | **1x N-K (N-Female)** | Port duplexed tunggal untuk Tx & Rx antena |
| **Tipe & Jumlah Konektor Optik (Fiber Conn.)** | **2x LC Duplex (OPT1, OPT2)**| **2x LC Duplex (OPT1, OPT2)**| Mendukung input optik & kaskade/daisy chain |
| **Voltage Standing Wave Ratio (VSWR)** | **≤ 1.5 : 1** | **≤ 1.5 : 1** | Return loss ≥14 dB ke jaringan feeder |
| **MTBF (Mean Time Between Failures)** | **≥ 10,000 jam** (operasi kontinu) | **≥ 10,000 jam** | Dirancang untuk operasi non-stop data center |
| **Tingkat Proteksi Ingress (Protection Level)** | **IP30** | **IP30** | Sasis tertutup dengan sistem disipasi panas pasif/aktif |
| **Dimensi Fisik (Chassis Dimensions)** | 19 Inci Rack Mount, Tinggi **2U** | 19 Inci Rack Mount, Tinggi **2U** | Dapat dipasang pada rak 19" atau wall-bracket |
| **Metode Instalasi (Installation Method)** | Cabinet / Wall-Mounted | Cabinet / Wall-Mounted | Rak telekomunikasi lantai atau dinding IDF |
| **Suhu Operasional (Operating Temperature)** | **-25°C ~ +55°C** | **-25°C ~ +55°C** | Tahan rentang temperatur industri ekstrem |
| **Kelembapan Relatif (Operating Humidity)** | ≤ 95% Non-kondensasi | ≤ 95% Non-kondensasi | Tahan kelembapan tinggi iklim tropis |
| **Tegangan Catu Daya (Power Supply)** | 216 ~ 253 VAC, 50 Hz (Type F) | 216 ~ 253 VAC, 50 Hz (Type F) | Input AC fase tunggal dengan grounding aman |
| **Antarmuka Tampilan (Display Mode)** | **LCD Display & LED Indicators** | **LCD Display & LED Indicators** | Pembacaan daya RF & optik real-time di panel |
| **Mode Pengaturan (Settings Mode)** | CPS & Local Keypad | CPS & Local Keypad | Customer Programming Software & menu tombol |
| **Fungsi Tambahan (Additional Functions)** | **Monitoring / Delay Sync / Fiber Cascade** | Monitoring / Delay Sync / Fiber Cascade | Supervisi terpusat & perutean kaskade optik |
| **Kapasitas Kanal Sistem (Channel Capacity)** | Hingga 12 Kanal (≤12 Carriers) | Hingga 12 Kanal (≤12 Carriers) | Mendukung sistem multi-carrier trunking DMR/TETRA |
| **Dukungan Sistem Kluster (Trunking Support)** | Ya (Cluster system support: Y) | Ya (Cluster system support: Y) | Kompatibel penuh dengan radio cluster |
| **Mode Struktur Topologi Serat (Fiber Mode)** | **Cascade / Star / Ring Network** | **Cascade / Star / Ring Network** | Jaringan cincin redundan mandiri |
| **Jarak Maksimum Koneksi ORU (Max Distance)**| **≤ 20 km** | **≤ 20 km** | Jarak jangkauan terjauh dalam kelasnya |

---

### 4. Prosedur Operasi & Kalibrasi Lapangan (Field Operation & Calibration Workflow)

1. **Pemeriksaan Pra-Komisioning (Pre-Commissioning Checklist):**
   - **Grounding Listrik:** Pastikan baut arde sasis terhubung ke tanah dengan tahanan **< 4 Ω**.
   - **Sirkulasi Udara:** Jaga jarak bebas ventilasi minimal **≥15 cm** di belakang dan samping unit.
   - **Verifikasi Port RF-OUT:** Hubungkan kabel feeder 1/2" ke port RF-OUT N-Female menggunakan torsi kunci pas yang tepat. Ukur nilai VSWR jaringan antena feeder menggunakan Sitemaster / Antenna Analyzer; nilai VSWR **wajib di bawah 1.5** sebelum daya RF dihidupkan.
   - **Koneksi Port Optik (OPT1 / OPT2):** Hubungkan kabel patch cord LC-UPC dari OMU (atau dari unit ORU sebelumnya jika dalam konfigurasi kaskade).

2. **Pengaturan Parameter Panel Lokal (Local Panel Commissioning):**
   - Tekan tombol menu LCD untuk masuk ke antarmuka pengaturan dan pilih bahasa (English).
   - Masuk ke menu `Real-Time Parameter Settings`:
     - Atur nilai **Uplink ATT** menggunakan tombol `ATT + / -` agar tidak membebani link optik.
     - Periksa pembacaan daya RF Downlink real-time pada layar (target: mendekati +40 dBm pada daya penuh).
   - Masuk ke menu `Alarm Enable Settings`:
     - Aktifkan alarm: **No Optical Receive**, **Uplink Power Overload**, dan **VSWR Alarm**.
   - **PENTING:** Setelah mengubah parameter, selalu pilih **Save Configuration** pada antarmuka agar konfigurasi tersimpan permanen di memori non-volatile dan tidak hilang saat listrik padam.
   - Aktifkan fitur **Engineering Lock** untuk mengunci parameter dari manipulasi pihak yang tidak berwenang.
