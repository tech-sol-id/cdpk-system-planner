---
title: "FMTCS_DAS_06_Combiner_Multiplexer_Duplexer.md"
original_file_name: "Combiner, Multiplexer, Duplexer FMTCS Technical Datasheets 2026.pdf"
drive_file_id: "1DCEGRIFne-nrydRYDwMiOubICICcqxQi"
drive_view_url: "https://drive.google.com/file/d/1DCEGRIFne-nrydRYDwMiOubICICcqxQi/view"
mime_type: "text/markdown"
folder_path: "FMTCS Fiber DAS Knowledge Base"
last_modified: "2026-10-17T00:00:00.000Z"
image_reference_note: "Gambar kurva isolasi port, skematik cavity resonator, dan tata letak port kabinet dapat dilihat langsung pada berkas PDF asli di link di atas."
extracted_at: "2026-10-17T16:00:00.000000+00:00"
---

# FMTCS RF Combiner, Receiver Multiplexer, & Cavity Duplexer
## Panduan Rekayasa Sub-Sistem Base Station (Bilingual ID / EN)

> 🔗 **Dokumen Asli & Sumber Rekayasa:** FMTCS Solutions Pte. Ltd. (Singapore) / Shanghai FMTCS Communication Information Technology Co., Ltd.  
> 📂 **Folder Knowledge Base:** `FMTCS Fiber DAS Knowledge Base`  
> 🏷️ **Kategori Sistem:** RF Combining, Filtering, and Multicoupling Infrastructure  
> 📌 **Perangkat yang Dibahas:**  
> 1. **RF Combiner:** `FMTCS-CFH` (`BCFH4002.RI1`, `BCFH4004.RI1`, `BCFH4008.RI1`)  
> 2. **Receiver Multiplexer:** `FMTCS--DJF` (`PDJF4002.M01`, `PDJF4004.M01`, `PDJF4008.M01`)  
> 3. **Cavity Duplexer:** `FMTCS-SGQ` (`DSGQ400C.RI1`)

---

### 1. Ringkasan Eksekutif & Deskripsi Perangkat (Executive Summary & Overview)

Sub-sistem penggabung (combining) dan pemisah (multicoupling) RF merupakan tulang punggung perangkat keras pada stasiun pemancar induk (Base Station / Master Rack). Ketika sebuah sistem komunikasi radio multi-kanal (misalnya sistem trunking Motorola MOTOTRBO beranggotakan 2 hingga 8 unit repeater SLR 5300) dihubungkan ke infrastruktur antena atau sistem Fiber DAS OMU, perangkat penggabung dan pemisah sinyal berkualitas tinggi mutlak dibutuhkan untuk:
1. Mencegah intermodulasi antar-pemancar (Transmitter Intermodulation Distortion / IMD).
2. Menyediakan isolasi port yang tinggi guna melindungi modul final power amplifier repeater.
3. Mengurangi jumlah kabel feeder dan antena utama menjadi satu jalur terpusat.

---

### 2. FMTCS RF Combiner (FMTCS-CFH / BCFH400x.RI)

#### Deskripsi Perangkat
**FMTCS-CFH** adalah penggabung RF pasif pita lebar (Passive Broadband RF Combiner) yang menggabungkan sinyal transmisi pemancar (Tx) dari 2, 4, atau 8 repeater ke dalam 1 port keluaran tunggal. Perangkat ini dilengkapi dengan sirkuit isolasi balik (reverse isolation) berkinerja tinggi (**≥ 45 dB**) untuk mencegah sinyal dari satu repeater bocor ke repeater lainnya, sehingga melindungi power amplifier repeater dari kerusakan akibat reflected power atau produk intermodulasi.

```
 [Repeater 1 Tx: 412.0 MHz] ---> [Input Port 1] --+
 [Repeater 2 Tx: 413.5 MHz] ---> [Input Port 2] --+--> [FMTCS-CFH/8] ---> [Single Combined Tx Output]
 [Repeater 3 Tx: 415.0 MHz] ---> [Input Port 3] --+   (Isolation ≥ 45dB)     (To Duplexer / OMU Stripper)
 ... (Up to 8 Repeaters)    ---> [Input Port 8] --+
```

#### Spesifikasi Teknis FMTCS-CFH Combiner:
| Parameter Spesifikasi (Specification) | Varian 2-Port (BCFH4002) | Varian 4-Port (BCFH4004) | Varian 8-Port (BCFH4008) |
|---|---|---|---|
| **Rentang Frekuensi (Frequency Range)** | 410 ~ 440 MHz | 410 ~ 440 MHz | 410 ~ 440 MHz *(Customizable)* |
| **Tipe Penggabung (Combining Type)** | Pasif Pita Lebar (Passive Broadband) | Pasif Pita Lebar | Pasif Pita Lebar |
| **Akses Kanal RF (RF Carrier Access)** | 2 Kanal | 4 Kanal | **8 Kanal Pembawa** |
| **Port Masukan / Keluaran (Ports)** | 2 Input / 1 Output | 4 Input / 1 Output | **8 Input / 1 Output** |
| **Isolasi Port Balik (Isolation Loss)** | **≥ 45 dB** | **≥ 45 dB** | **≥ 45 dB** |
| **Rugi Sisipan Maksimum (Insertion Loss)** | **≤ 4.0 dB** | **≤ 7.5 dB** | **≤ 11.0 dB** |
| **Kapasitas Daya Masukan Maksimum** | 50 W per port masukan | 50 W per port masukan | **50 W per port masukan** |
| **Impedansi Karakteristik (Impedance)**| 50 ± 2 Ω | 50 ± 2 Ω | 50 ± 2 Ω |
| **Voltage Standing Wave Ratio (VSWR)** | ≤ 1.5 : 1 | ≤ 1.5 : 1 | ≤ 1.5 : 1 |
| **Tipe Konektor RF (RF Connectors)** | N-K (N-Female) | N-K (N-Female) | N-K (N-Female) |
| **Dimensi Fisik (Form Factor)** | Rak 19 Inci, **2U** | Rak 19 Inci, **2U** | Rak 19 Inci, **2U** |
| **Tingkat Proteksi (Protection Level)** | IP30 | IP30 | IP30 |
| **Suhu Operasional (Operating Temp)** | -25°C ~ +55°C | -25°C ~ +55°C | -25°C ~ +55°C |
| **MTBF (Mean Time Between Failures)** | ≥ 30,000 jam | ≥ 30,000 jam | ≥ 30,000 jam |

---

### 3. FMTCS Receiver Multiplexer / Multicoupler (FMTCS--DJF / PDJF400x.M)

#### Deskripsi Perangkat
**FMTCS--DJF** adalah pemisah sinyal penerima (Receiver Multicoupler / Multiplexer) pasif pita lebar yang bertugas membagi sinyal RF uplink yang ditangkap oleh antena utama (atau dari port uplink OMU) ke 2, 4, atau 8 unit penerima repeater (Rx). Menggunakan teknologi kopling pita lebar seimbang, perangkat ini menjaga keseimbangan fase dan amplitudo pada setiap port receiver tanpa menimbulkan noise aktif.

```
                                               +---> [Port 1] ---> [Repeater 1 Rx]
 [Combined Uplink Signal]                      +---> [Port 2] ---> [Repeater 2 Rx]
 (From Duplexer / OMU USS) ---> [FMTCS-DJF/8] -+---> [Port 3] ---> [Repeater 3 Rx]
                               (Isolation ≥18dB)
                                               +---> [Port 8] ---> [Repeater 8 Rx]
```

#### Spesifikasi Teknis FMTCS--DJF Multiplexer:
| Parameter Spesifikasi (Specification) | Varian 2-Port (PDJF4002) | Varian 4-Port (PDJF4004) | Varian 8-Port (PDJF4008) |
|---|---|---|---|
| **Rentang Frekuensi (Frequency Range)** | 370 ~ 470 MHz | 370 ~ 470 MHz | **370 ~ 470 MHz (Broadband)** |
| **Tipe Perangkat (Multiplexing Type)** | Pasif Pita Lebar | Pasif Pita Lebar | Pasif Pita Lebar |
| **Jumlah Kanal Penerima (RF Carriers)** | 2 Kanal | 4 Kanal | **8 Kanal Pembawa** |
| **Port Masukan / Keluaran (Ports)** | 1 Input / 2 Output | 1 Input / 4 Output | **1 Input / 8 Output** |
| **Isolasi Antar Port (Isolation Loss)** | **≥ 18 dB** | **≥ 18 dB** | **≥ 18 dB** |
| **Rugi Sisipan Maksimum (Insertion Loss)**| **≤ 3.5 dB** | **≤ 6.5 dB** | **≤ 9.5 dB** |
| **Kapasitas Daya Maksimum (Max Power)** | 1 Watt per port masukan| 1 Watt per port masukan| 1 Watt per port masukan |
| **Impedansi Karakteristik (Impedance)**| 50 ± 2 Ω | 50 ± 2 Ω | 50 ± 2 Ω |
| **Voltage Standing Wave Ratio (VSWR)** | ≤ 1.5 : 1 | ≤ 1.5 : 1 | ≤ 1.5 : 1 |
| **Tipe Konektor RF (RF Connectors)** | N-K (N-Female) | N-K (N-Female) | N-K (N-Female) |
| **Dimensi Fisik (Form Factor)** | Rak 19 Inci, **1U** | Rak 19 Inci, **1U** | Rak 19 Inci, **1U** |
| **Tingkat Proteksi (Protection Level)** | IP30 | IP30 | IP30 |
| **Suhu Operasional (Operating Temp)** | -25°C ~ +55°C | -25°C ~ +55°C | -25°C ~ +55°C |
| **MTBF (Mean Time Between Failures)** | ≥ 30,000 jam | ≥ 30,000 jam | ≥ 30,000 jam |

---

### 4. FMTCS Cavity Duplexer (FMTCS-SGQ / DSGQ400C.RI)

#### Deskripsi Perangkat
**FMTCS-SGQ (DSGQ400C.RI1)** adalah duplekser rongga resonansi (Cavity Duplexer) tipe bandpass yang memungkinkan pemancar (Tx) dan penerima (Rx) repeater berbagi satu jalur transmisi / antena tunggal secara simultan tanpa saling mengganggu. Dengan isolasi Tx-to-Rx yang sangat tinggi (**≥ 80 dB**), duplekser ini secara efektif menekan desensitisasi penerima (receiver desense) yang disebabkan oleh emisi daya tinggi dari pemancar pada frekuensi yang berdekatan.

```
       [Tx Frequency: e.g., 425.0 MHz] ----> [Port TX (Bandpass)] --+
                                                                    |--> [Port ANT (Single Antenna)]
       [Rx Frequency: e.g., 415.0 MHz] <---- [Port RX (Bandpass)] --+   (Tx/Rx Isolation ≥ 80 dB)
```

#### Spesifikasi Teknis FMTCS-SGQ Cavity Duplexer:
| Parameter Teknis (Technical Specification) | Nilai Uplink (Rx Path) | Nilai Downlink (Tx Path) | Catatan Rekayasa (Engineering Notes) |
|---|---|---|---|
| **Rentang Frekuensi Operasi (Frequency Range)** | 410 ~ 440 MHz | 410 ~ 440 MHz | Dituning presisi sesuai pasangan frekuensi proyek |
| **Isolasi Pemancar - Penerima (Isolation)** | **≥ 80 dB** | **≥ 80 dB** | Menghilangkan desensitisasi penerima repeater |
| **Rugi Sisipan (Insertion Loss)** | **≤ 2.5 dB** | **≤ 2.5 dB** | Rugi daya minimal pada rongga cavity |
| **Tipe Duplekser (Duplexer Type)** | **Bandpass Cavity Resonator**| **Bandpass Cavity Resonator**| Selektivitas pita frekuensi sangat tajam |
| **Kapasitas Daya Maksimum (Max Power)** | — | **50 Watt (CW)** | Menahan daya pancar penuh repeater 50W |
| **Impedansi Karakteristik RF (RF Impedance)** | 50 ± 2 Ω | 50 ± 2 Ω | Standar transmisi telekomunikasi |
| **Voltage Standing Wave Ratio (VSWR)** | ≤ 1.5 : 1 | ≤ 1.5 : 1 | Return loss ≥14 dB |
| **Tipe Konektor RF (RF Connectors)** | N-K (N-Female) | N-K (N-Female) | Tiga port: TX, RX, dan ANT (N-Female) |
| **Dimensi Fisik (Form Factor)** | 19 Inci Rack Mount, **2U** | 19 Inci Rack Mount, **2U** | Desain tabung cavity kokoh dan stabil terhadap suhu |
| **Tingkat Proteksi (Protection Level)** | IP30 | IP30 | Pemasangan kabinet indoor |
| **Metode Instalasi (Installation)** | Cabinet Installation | Cabinet Installation | Pemasangan rak 19" standar |
| **Suhu Operasional (Operating Temp)** | -25°C ~ +55°C | -25°C ~ +55°C | Stabilitas frekuensi tinggi terhadap pemuaian termal |
| **Kelembapan Relatif (Operating Humidity)** | ≤ 95% Non-kondensasi | ≤ 95% Non-kondensasi | Tahan terhadap kelembapan tinggi |
| **MTBF (Mean Time Between Failures)** | ≥ 30,000 jam | ≥ 30,000 jam | Komponen pasif bebas perawatan aktif |
| **Kapasitas Kanal Sistem (Channel Capacity)** | Hingga 12 Kanal (≤12 Carriers)| Hingga 12 Kanal (≤12 Carriers)| Mendukung sistem repeater multi-carrier |
| **Dukungan Sistem Kluster (Trunking Support)** | Ya (Cluster support: Y) | Ya (Cluster support: Y) | Kompatibel dengan sistem trunked radio |
