---
title: "FMTCS_DAS_07_Passive_Splitter_Coupler_Antennas.md"
original_file_name: "Coupler-Splitter & Antennas FMTCS Technical Datasheets 2026.pdf"
drive_file_id: "1qvhI9VQnACAjI_uU6V8E_N-DA6jqmw2Y"
drive_view_url: "https://drive.google.com/file/d/1qvhI9VQnACAjI_uU6V8E_N-DA6jqmw2Y/view"
mime_type: "text/markdown"
folder_path: "FMTCS Fiber DAS Knowledge Base"
last_modified: "2026-10-17T00:00:00.000Z"
image_reference_note: "Gambar pola radiasi antena (horizontal/vertical polar plot), dimensi fisik coupler/splitter, dan foto bracket antena dapat dilihat pada brosur asli di link di atas."
extracted_at: "2026-10-17T16:00:00.000000+00:00"
---

# FMTCS Passive Components: Power Splitter, Directional Coupler & Antennas
## Spesifikasi Komponen Distribusi Koaksial & Antena DAS (Bilingual ID / EN)

> 🔗 **Dokumen Asli & Sumber Rekayasa:** FMTCS Solutions Pte. Ltd. (Singapore) / Shanghai FMTCS Communication Information Technology Co., Ltd.  
> 📂 **Folder Knowledge Base:** `FMTCS Fiber DAS Knowledge Base`  
> 🏷️ **Kategori Sistem:** Passive In-Building RF Distribution System & Antennas  
> 📌 **Perangkat yang Dibahas:**  
> 1. **Power Splitter:** `FMTCS-PD` (`PD400R.M0201` - 2-Way Splitter)  
> 2. **Directional Coupler:** `FMTCS-CP` (`CP400R.M` - 6dB, 10dB, 15dB, 20dB, 30dB)  
> 3. **Indoor Ceiling Omni Antenna:** `FMTCS-ANTI` (`ANTI400R.M01`)  
> 4. **Outdoor Base Omni Antenna:** `FMTCS-ANTG` (`ANTG400R.M01`)  
> 5. **Outdoor Directional Panel Antenna:** `FMTCS-ANTD` (`ANTD400R.M01`)

---

### 1. Ringkasan Eksekutif & Deskripsi Komponen (Executive Summary)

Dalam perancangan sistem distribusi sinyal pasif (Passive Coaxial DAS) setelah unit jarak jauh optik (ORU), pemilihan komponen pembagi daya (power splitter), penggandeng terarah (directional coupler), kabel koaksial 1/2", dan antena memiliki pengaruh langsung terhadap keseragaman kekuatan sinyal terima di seluruh area gedung (uniform coverage).

FMTCS memproduksi rangkaian lengkap komponen pasif UHF (400 ~ 470 MHz) yang dirancang secara terkomputasi (computer-aided design) untuk menjamin nilai VSWR rendah (**≤ 1.5**), ketahanan daya tinggi (**hingga 100 Watt**), impedansi 50 Ohm presisi, dan integritas mekanikal IP53/IP65.

---

### 2. FMTCS Power Splitter (FMTCS-PD / PD400R.M0201)

#### Deskripsi & Fungsi
**FMTCS-PD (PD400R.M0201)** adalah pembagi daya 2-arah (2-Way Wilkinson Power Splitter) yang membagi sinyal RF masuk menjadi dua keluaran dengan rasio daya yang sama rata (50% : 50% atau -3.0 dB teoritis). Perangkat ini digunakan ketika dua cabang kabel koaksial menuju area dengan kebutuhan daya identik (misalnya dua lorong yang simetris).

#### Spesifikasi Teknis Power Splitter:
| Parameter Teknis (Parameter) | Nilai Spesifikasi (Value) | Catatan Rekayasa (Engineering Notes) |
|---|---|---|
| **Model Perangkat (Model)** | **FMTCS-PD** | Kode Spesifikasi: `PD400R.M0201` |
| **Rentang Frekuensi (Frequency Range)** | **400 ~ 470 MHz** | Pita frekuensi penuh UHF |
| **Jumlah Jalur Percabangan (Ways)** | **2-Way Splitter** | 1 Port Input, 2 Port Output |
| **Rugi Sisipan Maksimum (Insertion Loss)** | **≤ 3.3 dB** | Termasuk rugi pembagian daya teoritis 3.0 dB + rugi dielektrik 0.3 dB |
| **Penyimpangan Rasio Pembagian (Balance)** | **NA (Equal Ratio)** | Pembagian daya seimbang 50% / 50% |
| **Kapasitas Daya Maksimum (Max Power)** | **100 Watt** | Tahan terhadap lonjakan daya tinggi |
| **Impedansi Karakteristik (Impedance)** | **50 ± 2 Ω** | Saluran transmisi koaksial RF standar |
| **Voltage Standing Wave Ratio (VSWR)** | **≤ 1.5 : 1** | Return loss ≥14 dB |
| **Tipe Konektor RF (RF Connector)** | **N-K (N-Female 50-Ohm)** | Tiga port N-Female |
| **Tingkat Proteksi (Protection Level)** | **IP53** | Tahan debu dan cipratan air indoor |
| **Metode Pemasangan (Installation)** | Cable Tray / Wall Mount | Dipasang pada jalur kabel tray atau dinding |
| **Suhu Operasional (Operating Temp)** | **-25°C ~ +55°C** | Lingkungan gedung non-AC & semi-terbuka |
| **Kelembapan Relatif (Operating Humidity)**| **≤ 95%** | Tahan kelembapan tinggi |
| **MTBF (Mean Time Between Failures)** | **≥ 30,000 jam** | Komponen pasif berkeandalan tinggi |

---

### 3. FMTCS Directional Coupler (FMTCS-CP / CP400R.M)

#### Deskripsi & Fungsi
**FMTCS-CP (CP400R.M)** adalah penggandeng terarah (Directional Coupler) yang membagi daya RF dengan rasio tidak seimbang (unequal power ratio). Sinyal utama dialirkan ke port keluaran utama (Output Port) dengan rugi sisipan minimal, sementara sebagian kecil daya disadap ke port kopling (Coupled Port) untuk menyuplai satu antena lokal. Dengan menata nilai kopling yang semakin kecil (misal: 20dB di dekat ORU, 15dB di tengah, 10dB dan 6dB di ujung), kekuatan radiasi di setiap antena dalam satu deretan koridor dapat dibuat seragam secara sempurna.

```
       [RF Input from ORU] ---> [Input Port] 
                                      |
                                      +--- (Coupled Branch: -6/-10/-15/-20/-30 dB) ---> [To Indoor Antenna]
                                      |
                                      +--- (Main Through Line: Low Insertion Loss) ---> [To Next Coupler]
```

#### Spesifikasi Nilai Kopling & Rugi Sisipan:
| Kode Spesifikasi (Spec Code) | Nilai Kopling Nominal (Coupling) | Rugi Sisipan Jalur Utama (Insertion Loss) | Toleransi Kopling |
|---|---|---|---|
| **CP400R.M0601** | **6 dB** | **≤ 1.8 dB** | ±1.0 dB |
| **CP400R.M1001** | **10 dB** | **≤ 1.2 dB** | ±1.0 dB |
| **CP400R.M1501** | **15 dB** | **≤ 0.5 dB** | ±1.0 dB |
| **CP400R.M2001** | **20 dB** | **≤ 0.5 dB** | ±1.0 dB |
| **CP400R.M3001** | **30 dB** | **≤ 0.3 dB** | ±1.0 dB |

#### Spesifikasi Mekanikal & Elektrikal Umum:
- **Rentang Frekuensi:** 400 ~ 470 MHz
- **Kapasitas Daya:** 100 Watt
- **Impedansi:** 50 ± 2 Ω | **VSWR:** ≤ 1.5
- **Tipe Konektor:** N-K (N-Female)
- **Tingkat Proteksi:** IP53 (Pemasangan outdoor memerlukan box panel kedap air / waterproof enclosure)
- **Pemasangan:** Cable Tray / Wall Mount | **MTBF:** ≥ 30,000 jam

---

### 4. Rangkaian Antena DAS FMTCS (Indoor & Outdoor Antennas)

#### Tabel Perbandingan Spesifikasi Antena:
| Parameter Teknis (Parameter) | Antena Indoor Omni (ANTI) | Antena Outdoor Omni (ANTG) | Antena Outdoor Direksional (ANTD) |
|---|---|---|---|
| **Model Perangkat (Model)** | **FMTCS-ANTI** | **FMTCS-ANTG** | **FMTCS-ANTD** |
| **Kode Spesifikasi (Spec Code)** | `ANTI400R.M01` | `ANTG400R.M01` | `ANTD400R.M01` |
| **Rentang Frekuensi (Frequency)**| **400 ~ 470 MHz** | **400 ~ 470 MHz** | **400 ~ 470 MHz** |
| **Penguatan Antena (Gain)** | **3 ± 1 dBi** | **4 ± 1 dBi (5 dBi nominal)** | **1.5 ± 1 dBi (2 dBi nominal)** |
| **Pola Radiasi (Radiation)** | **Omnidirectional (Segala Arah)**| **Omnidirectional (Segala Arah)**| **Directional (Sektoral Terarah)** |
| **Polarisasi (Polarization)** | Vertikal | Vertikal | Vertikal |
| **Sudut Pancar Horizontal (HPBW)**| **360°** | **360°** | **80°** (Pancar terfokus ke depan) |
| **Sudut Pancar Vertikal (VPBW)** | **40°** | **90°** | **40°** |
| **Kapasitas Daya Maksimum** | **100 Watt** | **100 Watt** | **100 Watt** |
| **Impedansi Karakteristik** | 50 ± 2 Ω | 50 ± 2 Ω | 50 ± 2 Ω |
| **Voltage Standing Wave Ratio** | **≤ 1.5 : 1** | **≤ 1.5 : 1** | **≤ 1.5 : 1** |
| **Tingkat Proteksi Ingress** | **IP53 (Indoor Ceiling)** | **IP65 (Outdoor Waterproof)** | **IP65 (Outdoor Waterproof)** |
| **Metode Pemasangan (Mounting)** | **Ceiling-Mounted (Plafon)** | **Wall / Pole-Mounted (Tiang)** | **Wall / Pole-Mounted (Dinding/Tiang)** |
| **Braket Tambahan (Mounting Kit)**| Spring clips plafon | Braket tiang klem U-bolt | Braket sudut tilt adjustable |
| **Tipe Konektor RF (Connector)** | **N-K (N-Female)** | **N-K (N-Female)** | **N-K (N-Female)** |
| **Suhu Operasional (Temp)** | -25°C ~ +55°C | **-40°C ~ +55°C** | **-40°C ~ +55°C** |
| **Kelembapan Relatif (Humidity)** | ≤ 95% | ≤ 95% | ≤ 95% |
| **MTBF (Keandalan)** | ≥ 30,000 jam | ≥ 30,000 jam | ≥ 30,000 jam |
| **Aplikasi Terbaik (Best For)** | Ruang kantor, koridor, lobi | Atap gedung (rooftop), yard terbuka | Terowongan, perimeter, loading dock |

---

### 5. Pedoman Instalasi Kabel Koaksial & Perlindungan Petir (Coaxial Feeder & Grounding)

1. **Spesifikasi Kabel Feeder 1/2" (HCAAYZ-50-12):**
   - Kabel koaksial berbusa dielektrik rendah (foam dielectric 50-Ohm 1/2" coaxial cable).
   - Redaman nominal pada frekuensi 450 MHz: **~4.8 dB per 100 meter**.
   - Radius lengkung minimum: **> 125 mm (10x diameter kabel)**. Pelanggaran batas kelengkungan (sharp bend) akan mengubah geometri dielektrik dan melonjakkan VSWR secara permanen.

2. **Perlindungan Terhadap Petir (Surge Protection):**
   - Setiap kabel feeder dari antena luar ruangan (ANTG / ANTD) yang memasuki gedung **wajib dipasangi Penangkal Petir RF Koaksial (Surge Protector CA-23RS)** pada titik penetrasi dinding luar (entry plate).
   - Terminal pembumian arrester harus dihubungkan langsung ke sistem arde gedung dengan kawat tembaga minimal **16 mm²** dan nilai resistansi **< 4 Ω**.
