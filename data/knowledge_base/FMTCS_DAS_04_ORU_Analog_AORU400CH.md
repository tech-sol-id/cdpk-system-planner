---
title: "FMTCS_DAS_04_ORU_Analog_AORU400CH.md"
original_file_name: "ORU(Analog） FMTCS-LRFF AORU400CH.RI 20267.01版(1).pdf"
drive_file_id: "11ERsN3tW9-WFk56C-r_2pGWnnNIELI4U"
drive_view_url: "https://drive.google.com/file/d/11ERsN3tW9-WFk56C-r_2pGWnnNIELI4U/view"
mime_type: "text/markdown"
folder_path: "FMTCS Fiber DAS Knowledge Base"
last_modified: "2026-10-17T00:00:00.000Z"
image_reference_note: "Gambar skematik amplifikasi daya analog RF, kurva intermodulasi, dan foto fisik unit sasis dapat dilihat pada brosur teknis asli di link di atas."
extracted_at: "2026-10-17T16:00:00.000000+00:00"
---

# FMTCS Analog Optical Remote Unit (AORU400CH.RI / FMTCS-LRF/F)
## Lembar Pengetahuan Teknis & Spesifikasi Rekayasa (Bilingual ID / EN)

> 🔗 **Dokumen Asli & Sumber Rekayasa:** FMTCS Solutions Pte. Ltd. (Singapore) / Shanghai FMTCS Communication Information Technology Co., Ltd.  
> 📂 **Folder Knowledge Base:** `FMTCS Fiber DAS Knowledge Base`  
> 🏷️ **Kategori Sistem:** RF over Fiber (RFoF) Analog Distributed Antenna System (DAS)  
> 📌 **Model Perangkat:** `FMTCS-LRF/F` | **Kode Spesifikasi:** `AORU400CH.RI1`

---

### 1. Ringkasan Eksekutif & Deskripsi Perangkat (Executive Summary & Overview)

#### Bahasa Indonesia
**FMTCS AORU400CH.RI (FMTCS-LRF/F)** adalah unit jarak jauh optik analog (Analog Optical Remote Unit / ORU) berdaya tinggi (High Power / 10 Watt RF Output) yang mengimplementasikan konversi fotoelektrik analog langsung. Unit ini menerima sinyal cahaya termodulasi dari unit induk analog (AOMU400C.RI), mengonversikannya kembali menjadi sinyal frekuensi radio (RF) analog, dan memperkuatnya melalui modul Power Amplifier linear berdaya tinggi hingga **40 ± 2 dBm (10 Watt)** untuk dicabangkan ke jaringan antena dalam ruangan (indoor antenna grid).

Pada jalur uplink, AORU menerima sinyal radio dari perangkat genggam (walkie-talkie) melalui port RF yang sama, memperkuatnya dengan Low Noise Amplifier (LNA), dan memodulasikannya langsung ke pemancar optik untuk dikirimkan kembali ke AOMU melalui kabel serat optik single-mode. Dengan latensi transmisi yang sangat rendah (**≤ 3 µs**) dan jarak jangkauan optik hingga **8 kilometer**, AORU400CH merupakan solusi optimal untuk fasilitas komersial, gedung perkantoran, dan pusat logistik yang memerlukan sistem distribusi sinyal radio analog/DMR yang bertenaga dengan investasi hemat biaya.

#### English
The **FMTCS AORU400CH.RI (FMTCS-LRF/F)** is an enterprise high-power (10W RF) Analog Optical Remote Unit engineered for two-way radio distributed antenna systems. Utilizing direct optical-to-RF linear photoelectric conversion, the AORU demodulates optical signals transmitted by the analog AOMU, reconstructs the RF carriers, and delivers a robust downlink transmit power of **40 ± 2 dBm (10 Watts)** into distributed passive coaxial networks.

Simultaneously, the AORU captures low-level mobile radio signals in the reverse direction, amplifies them via an ultra-low-noise receiver front-end, and transmits optical signals back to the master AOMU. Operating in a point-to-point **Star topology** over distances up to **8 km**, the AORU provides ultra-low transmission latency (**≤ 3 µs**), high reliability, and exceptional economic efficiency for medium-scale enterprise venues.

---

### 2. Lembar Spesifikasi Teknis Lengkap (Comprehensive Technical Specifications)

| Parameter Teknis (Technical Specification) | Nilai Uplink (Uplink Value) | Nilai Downlink (Downlink Value) | Catatan Rekayasa (Engineering Notes) |
|---|---|---|---|
| **Rentang Frekuensi Operasi (Frequency Range)** | 410 ~ 440 MHz *(Customizable 350-470 MHz)* | 410 ~ 440 MHz *(Customizable 350-470 MHz)* | Disesuaikan dengan lisensi frekuensi pelanggan |
| **Penguatan RF Sistem (RF Gain)** | **≥ 50 dB** | **≥ 50 dB** | Penguatan sinyal daya tinggi |
| **Daya Keluaran Terukur (Output Power)** | **-10 ± 2 dBm** (ke optik) | **40 ± 2 dBm (10.0 Watt)** | Men-drive puluhan antena langit-langit (ceiling) |
| **Maksimum Daya Masukan RF (Max RF Input)** | **0 dBm** | Sesuai level optik OMU | Proteksi over-input otomatis |
| **Noise Figure (NF)** | **≤ 5.0 dB** | — | Menjaga sensitivitas penerima radio |
| **Emisi Palsu Luar Pita (Spurious Emissions)**| 9 kHz ~ 1 GHz: **≤ -36 dBm / 100 kHz**<br>1 GHz ~ 12.75 GHz: **≤ -30 dBm / 1 MHz** | Sesuai standar kompatibilitas elektromagnetik |
| **Intermodulasi Pasif Orde-3 (PIM3)** | **≤ -50 dBc** | **≤ -45 dBc** | Menjaga kebersihan spektrum radio |
| **Penundaan Transmisi (Transmission Delay)** | **≤ 3 µs (Ultra Rendah)** | **≤ 3 µs (Ultra Rendah)** | Konversi analog murni tanpa buffer digital |
| **Rentang & Langkah Pengaturan Gain (Gain Range)**| **31 dB / 1 dB per step** | **31 dB / 1 dB per step** | Kalibrasi level daya sangat fleksibel |
| **Linearitas Pengaturan Gain (Linearity)** | 0 ~ 20 dB: ±1.0 dB<br>20 ~ 25 dB: ±1.5 dB | Akurasi langkah atenuasi tinggi |
| **Panjang Gelombang Optik (Wavelength)** | 1310 nm / 1550 nm | 1310 nm / 1550 nm | Serat optik single-mode 9/125 µm |
| **Passband Ripple (Kerataan Frekuensi)** | **≤ 3.0 dB** | **≤ 3.0 dB** | Distribusi daya merata di seluruh kanal |
| **Isolasi Port (Port Isolation)** | **≥ 85 dB** | **≥ 85 dB** | Isolasi solid antara jalur Tx dan Rx |
| **Impedansi Karakteristik RF (RF Impedance)** | 50 ± 2 Ω | 50 ± 2 Ω | Standar transmisi koaksial RF 50-Ohm |
| **Tipe & Jumlah Konektor RF (RF Connector)** | **1x N-K (N-Female)** | **1x N-K (N-Female)** | Port N-Female tunggal terhubung ke feeder |
| **Tipe & Jumlah Konektor Optik (Fiber Conn.)** | **1x LC Duplex** | **1x LC Duplex** | Sambungan optik langsung ke master AOMU |
| **Voltage Standing Wave Ratio (VSWR)** | **≤ 1.5 : 1** | **≤ 1.5 : 1** | Return loss ≥14 dB |
| **MTBF (Mean Time Between Failures)** | **≥ 8,000 jam** | **≥ 8,000 jam** | Operasi industri 24 jam nonstop |
| **Tingkat Proteksi Ingress (Protection Level)** | **IP30** | **IP30** | Sasis rak dalam ruangan |
| **Dimensi Fisik (Form Factor)** | 19 Inci Rack Mount, Tinggi **2U** | 19 Inci Rack Mount, Tinggi **2U** | Pemasangan rak standar atau dinding IDF |
| **Metode Instalasi (Installation Method)** | Cabinet Installation | Cabinet Installation | Rak 19" atau wall-mount bracket |
| **Suhu Operasional (Operating Temperature)** | **-25°C ~ +55°C** | **-25°C ~ +55°C** | Suhu operasional luas untuk lingkungan tropis |
| **Kelembapan Relatif (Operating Humidity)** | ≤ 95% Non-kondensasi | ≤ 95% Non-kondensasi | Tahan terhadap kelembapan tinggi |
| **Tegangan Catu Daya (Power Supply)** | 216 ~ 253 VAC, 50 Hz (Type F) | 216 ~ 253 VAC, 50 Hz (Type F) | Sumber daya AC standar 220V/230V |
| **Antarmuka Tampilan (Display Mode)** | Lampu Indikator LED | Lampu Indikator LED | Status daya, status optik, dan alarm |
| **Mode Pengaturan (Settings Mode)** | CPS (Customer Programming Software)| CPS (Customer Programming Software)| Koneksi USB/Serial ke software konfigurasi |
| **Fungsi Tambahan (Additional Functions)** | Tidak ada (None) | Tidak ada (None) | Desain murni, minim kompleksitas |
| **Kapasitas Kanal Sistem (Channel Capacity)** | Hingga 8 Kanal (≤8 Carriers) | Hingga 8 Kanal (≤8 Carriers) | Mendukung sistem repeater multi-kanal |
| **Dukungan Sistem Kluster (Trunking Support)** | Ya (Cluster system support: Y) | Ya (Cluster system support: Y) | Kompatibel dengan sistem trunking DMR/FM |
| **Mode Struktur Topologi Serat (Fiber Mode)** | **Topologi Bintang (Star Mode)** | **Topologi Bintang (Star Mode)** | Jalur serat terdedikasi langsung ke AOMU |
| **Jarak Maksimum Koneksi ORU (Max Distance)**| **≤ 8 km** | **≤ 8 km** | Jarak transmisi serat optik hingga 8 km |

---

### 3. Pedoman Instalasi & Troubleshooting Cepat (Quick Installation & Troubleshooting)

1. **Aturan Instalasi Feeder & Konektor:**
   - Gunakan kabel koaksial berrugi-rendah (low-loss coaxial cable 1/2" seperti HCAAYZ-50-12) dari port RF-OUT menuju splitter dan directional coupler.
   - Sambungkan konektor N-Male dengan torsi standar. Jangan menekuk kabel melebihi radius lentur minimal (minimum bend radius > 10x diameter kabel atau >125 mm).
   - Ukur VSWR sebelum perangkat dinyalakan. Jika VSWR > 1.5, periksa kekencangan konektor, kebersihan pin tengah, dan terminasi beban dummy load pada port coupler yang tidak terpakai.

2. **Indikasi Alarm & Tindakan Perbaikan (Fault Diagnosis):**
   - **Lampu LED Optik Merah ("Receive No Light"):** Sinyal optik dari AOMU terputus atau serat rusak. Periksa kabel patch cord serat optik LC, ukur daya redaman dengan optical power meter, dan pastikan unit AOMU induk telah menyala.
   - **Lampu LED Alarm ALC Menyala:** Daya masukan RF dari portable radio terlalu dekat atau gain disetel terlalu tinggi. Tingkatkan nilai redaman uplink ATT via CPS sebesar 3~5 dB.
   - **Daya Pancar Rendah (Output Under-Power):** Redaman serat optik terlalu tinggi atau nilai downlink ATT disetel terlalu besar. Kurangi nilai redaman downlink atau bersihkan ferrule konektor LC.
