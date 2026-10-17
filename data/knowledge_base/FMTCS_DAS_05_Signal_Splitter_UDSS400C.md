---
title: "FMTCS_DAS_05_Signal_Splitter_UDSS400C.md"
original_file_name: "Signal Splitter FMTCS-LRF S UDSS400C.M 20264.01版(1).pdf"
drive_file_id: "1OvnDidBIMdFIz5LBMUxe52ho0WLUZpH7"
drive_view_url: "https://drive.google.com/file/d/1OvnDidBIMdFIz5LBMUxe52ho0WLUZpH7/view"
mime_type: "text/markdown"
folder_path: "FMTCS Fiber DAS Knowledge Base"
last_modified: "2026-10-17T00:00:00.000Z"
image_reference_note: "Gambar diagram skematik perutean RF pengupasan sinyal uplink/downlink, tata letak port N-K, dan dimensi fisik sasis 1U dapat dilihat pada brosur asli di link di atas."
extracted_at: "2026-10-17T16:00:00.000000+00:00"
---

# FMTCS Signal Splitter / RF Stripper (UDSS400C.M / FMTCS-LRF/S)
## Lembar Pengetahuan Teknis & Spesifikasi Rekayasa (Bilingual ID / EN)

> 🔗 **Dokumen Asli & Sumber Rekayasa:** FMTCS Solutions Pte. Ltd. (Singapore) / Shanghai FMTCS Communication Information Technology Co., Ltd.  
> 📂 **Folder Knowledge Base:** `FMTCS Fiber DAS Knowledge Base`  
> 🏷️ **Kategori Sistem:** RF Distribution & Signal Equalization Device (Base Station Interface)  
> 📌 **Model Perangkat:** `FMTCS-LRF/S` | **Varian Kode:** `USS400C.M601`, `DSS400C.M601`, `USS400C.M401`, `DSS400C.M401`

---

### 1. Ringkasan Eksekutif & Deskripsi Perangkat (Executive Summary & Overview)

#### Bahasa Indonesia
**FMTCS Signal Splitter (FMTCS-LRF/S / UDSS400C.M)** adalah perangkat distribusi, perataan, dan pengupasan sinyal frekuensi radio (RF Signal Distribution and Equalization Stripper) yang dirancang khusus untuk mengintegrasikan stasiun pemancar induk (Base Station / Repeater) dengan unit induk optik (Optical Master Unit / OMU) dalam sistem Fiber DAS.

Dalam arsitektur Fiber DAS standar, stasiun repeater (seperti Motorola MOTOTRBO SLR 5300 atau SLR 8000) memancarkan daya RF tinggi (antara 25 Watt hingga 50 Watt / +44 dBm s/d +47 dBm). Jika daya sebesar ini langsung dihubungkan ke port input OMU (yang memiliki ambang batas maksimum hanya +10 dBm), sirkuit penerima dan konverter optik OMU akan mengalami saturasi ekstrem (overload) bahkan kerusakan permanen. FMTCS Signal Splitter berfungsi melakukan "pengupasan sinyal kecil" (small-signal stripping) dengan **rugi kopling presisi 30 ± 1 dB (30 dB Couple Loss)** dan rugi sisipan ultra-rendah (**Insertion Loss ≤ 1.0 dB**). Dengan demikian, sinyal teratenuasi secara aman ke level ideal (~0 dBm s/d +5 dBm) untuk disalurkan ke port OMU, sementara port antena tetap dapat menyalurkan daya RF ke sistem antena lokal jika diperlukan.

Tersedia dalam 4 varian konfigurasi:
- **USS400C.M601:** Uplink Signal Splitter dengan **6 Couple Ports** (menghubungkan hingga 6 unit OMU).
- **DSS400C.M601:** Downlink Signal Splitter dengan **6 Couple Ports** (menghubungkan hingga 6 unit OMU).
- **USS400C.M401:** Uplink Signal Splitter dengan **4 Couple Ports**.
- **DSS400C.M401:** Downlink Signal Splitter dengan **4 Couple Ports**.

#### English
The **FMTCS Signal Splitter (FMTCS-LRF/S / UDSS400C.M)** is a specialized RF distribution and equalization unit engineered to interface high-power Base Station Repeaters with Optical Master Units (OMU) in fiber-optic distributed antenna systems.

High-power repeaters transmit at 25W–50W (+44 to +47 dBm), which exceeds the safe input limit of optical transceivers (+10 dBm max). The FMTCS Signal Splitter strips off calibrated small-signal samples with a precision **30 ± 1 dB coupling attenuation**, feeding safe power levels directly into the OMU without loading the repeater's power amplifier. With negligible through-path insertion loss (**≤ 1.0 dB**), excellent port isolation, and **50W continuous RF power handling**, it protects base station transmitters from standing-wave reflections and ensures multi-carrier intermodulation suppression.

---

### 2. Diagram Koneksi Stasiun Induk (Base Station Interconnection Diagram)

```
+-----------------------------------------------------------------------------------------+
| BASE STATION REPEATER RACK (MDF)                                                        |
|                                                                                         |
|  [ Repeater 1 Tx ] ----+                                                                |
|  [ Repeater 2 Tx ] ----+---> [ RF Combiner BCFH4008 ]                                   |
|  [ Repeater 3 Tx ] ----+            |                                                   |
|                                     v (Tx Combined High Power: +47 dBm / 50W)           |
|                 +-------------------+--------------------+                              |
|                 | FMTCS DOWNLINK SIGNAL SPLITTER (DSS)   |                              |
|                 | Model: FMTCS-LRF/S (DSS400C.M601)      |                              |
|                 |  [ Through Port / Ant ] ---------------> (To Local Base Antenna/Load) |
|                 |  [ Couple Loss: 30 dB ]                |                              |
|                 +----+-------+-------+-------+----+------+                              |
|                      |       |       |       |    |                                     |
|                      | (Coupled Downlink Ports: ~+17 dBm -> with 10dB ATT = +7 dBm safe)|
|                      v       v       v       v    v                                     |
|                   Port 1   Port 2  Port 3  ...  Port 6                                  |
|                      |                                                                  |
|                      v (Safe RF Downlink Input)                                         |
|                 [ DOMU400C #1 Port RF-IN ]                                              |
|                                                                                         |
|                 [ DOMU400C #1 Port RF-OUT (Uplink) ]                                    |
|                      |                                                                  |
|                      v                                                                  |
|                   Port 1   Port 2  Port 3  ...  Port 6                                  |
|                      |       |       |       |    |                                     |
|                 +----+-------+-------+-------+----+------+                              |
|                 | FMTCS UPLINK SIGNAL SPLITTER (USS)     |                              |
|                 | Model: FMTCS-LRF/S (USS400C.M601)      |                              |
|                 |  [ Combined Uplink RF Port ]           |                              |
|                 +-------------------+--------------------+                              |
|                                     |                                                   |
|                                     v (Clean Balanced Uplink Carriers)                  |
|                             [ RF Multiplexer PDJF4008 ]                                 |
|                                     |                                                   |
|                                     +---> [ Repeater 1 Rx ]                             |
|                                     +---> [ Repeater 2 Rx ]                             |
|                                     +---> [ Repeater 3 Rx ]                             |
+-----------------------------------------------------------------------------------------+
```

---

### 3. Lembar Spesifikasi Teknis Lengkap (Comprehensive Technical Specifications)

| Parameter Teknis (Specification Parameter) | Nilai Terukur (Measured Value) | Catatan Desain Rekayasa (Engineering Notes) |
|---|---|---|
| **Rentang Frekuensi Operasi (Frequency Range)** | **350 ~ 470 MHz** | Mencakup seluruh pita frekuensi VHF/UHF komersial & instansi |
| **Rugi Kopling Pengupasan (Couple Loss)** | **30 ± 1.0 dB** | Menurunkan daya 50W (+47 dBm) menjadi +17 dBm (dapat diatenuasi ke 0~5 dBm) |
| **Rugi Sisipan Jalur Utama (Insertion Loss)** | **≤ 1.0 dB** | Efisiensi transmisi sangat tinggi pada jalur utama |
| **Kapasitas Daya Maksimum (Max Power Capacity)**| **50 Watt (CW / Continuous Wave)** | Sesuai dengan kapasitas daya keluaran repeater komersial 50W |
| **Impedansi Karakteristik RF (RF Impedance)** | **50 ± 2 Ω** | Menjamin pencocokan impedansi saluran transmisi koaksial |
| **Voltage Standing Wave Ratio (VSWR)** | **≤ 1.5 : 1** | Return loss ≥14 dB, mencegah osilasi daya pantul ke pemancar |
| **Jumlah Port Kopling (Couple Ports)** | **4 Port** atau **6 Port** | Tersedia pilihan 4-port (M401) atau 6-port (M601) per unit sasis |
| **Jumlah Port Antena / Utama (Antenna Ports)** | **1 Port (Main Through)** | Port N-Female berdaya tahan tinggi |
| **Tipe Konektor RF (RF Connectors)** | **N-K (N-Female 50-Ohm)** | Konektor kuningan berlapis nikel/perak untuk daya tahan jangka panjang |
| **MTBF (Mean Time Between Failures)** | **≥ 30,000 jam** | Komponen pasif dengan keandalan operasional sangat tinggi |
| **Tingkat Proteksi Ingress (Protection Level)** | **IP30** | Sasis tertutup untuk pemasangan di dalam kabinet rak 19" |
| **Ukuran Sasis (Chassis Form Factor)** | 19 Inci Rack Mount, Tinggi **1U** | Desain ringkas menghemat ruang kabinet telekomunikasi |
| **Metode Instalasi (Installation Method)** | Cabinet / Rack Installation | Dipasang langsung pada rak 19" dengan sekrup sasis M6 |
| **Suhu Operasional (Operating Temperature)** | **-25°C ~ +55°C** | Dirancang untuk stabilitas termal tanpa memerlukan kipas aktif |
| **Kelembapan Relatif (Operating Humidity)** | ≤ 95% Non-kondensasi | Tahan terhadap lingkungan dengan kelembapan tinggi |
| **Kapasitas Kanal Sistem (Channel Capacity)** | Hingga 12 Kanal (≤12 Carriers) | Mampu memproses sinyal multi-carrier trunking tanpa distorsi |
| **Dukungan Sistem Kluster (Trunking Support)** | Ya (Cluster system support: Y) | Kompatibel penuh dengan DMR Tier II/III, TETRA, dan FM Analog |

---

### 4. Peran Kritis dalam Link Budget Stasiun Induk (Critical Role in Base Station Link Budget)

1. **Perlindungan Terhadap Kerusakan Sirkuit Optik (Damage Protection):**
   Repeater 50W memancarkan daya sebesar $+47	ext{ dBm}$. Ambang batas toleransi optik OMU adalah $+10	ext{ dBm}$ (kerusakan fisik pada photodiode/laser driver terjadi pada $> +13	ext{ dBm}$). Dengan memasang Signal Splitter UDSS400C:
   $$	ext{Level Sinyal Kopling} = +47	ext{ dBm} - 30	ext{ dB} = +17	ext{ dBm}$$
   Dengan menambahkan atenuator variabel OMU (ATT disetel ke 10 dB) atau fixed pad 10 dB, level sinyal yang masuk ke ADC OMU menjadi $+7	ext{ dBm}$ (sangat aman dalam rentang linier $0 \sim +10	ext{ dBm}$).

2. **Terminasi Port Tidak Terpakai (Port Termination Requirement):**
   Jika suatu proyek hanya menggunakan 2 atau 3 port kopling pada splitter 6-port (M601), **semua port kopling yang tidak terhubung ke OMU WAJIB dipasangi RF Dummy Load 50-Ohm (5W, N-Male, VSWR ≤ 1.15)**. Membiarkan port kopling terbuka (open) akan merusak keseragaman impedansi dan menyebabkan lonjakan VSWR sistem di atas 1.5.
