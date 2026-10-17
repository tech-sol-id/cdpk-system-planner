---
title: "FMTCS_DAS_09_Installation_and_Commissioning_Guide.md"
original_file_name: "FMTCS_Two-Way_Radio_System_Installation_and_Commissioning_Training_EN.pptx"
drive_file_id: "1ZxBBf2ofd1aVxmnDri0ujBO_p-UgAeZF"
drive_view_url: "https://drive.google.com/file/d/1ZxBBf2ofd1aVxmnDri0ujBO_p-UgAeZF/view"
mime_type: "text/markdown"
folder_path: "FMTCS Fiber DAS Knowledge Base"
last_modified: "2026-10-17T00:00:00.000Z"
image_reference_note: "Foto contoh terminasi konektor koaksial yang benar vs salah, diagram koneksi instrumen ukur Sitemaster, tabel acceptance report, dan alur commissioning 4 tahap dapat dilihat pada slide training resmi di link di atas."
extracted_at: "2026-10-17T16:00:00.000000+00:00"
---

# FMTCS Two-Way Radio & Fiber DAS: Panduan Instalasi, Komisioning, & Troubleshooting
## Standar Konstruksi Lapangan, Pengujian VSWR, Kriteria Penerimaan, & Matriks Gangguan (Bilingual ID / EN)

> 🔗 **Dokumen Asli & Sumber Rekayasa:** FMTCS Technical Training Center / FMTCS Solutions Sdn. Bhd. (Malaysia)  
> 📂 **Folder Knowledge Base:** `FMTCS Fiber DAS Knowledge Base`  
> 🏷️ **Kategori Sistem:** Field Construction Standards, Commissioning Workflow & Troubleshooting  
> 📌 **Referensi Pelatihan:** Modul Pelatihan Resmi *FMTCS Two-Way Radio System Installation and Commissioning Training* (Slide 1 ~ 30)

---

### 1. Standar Konstruksi & Instalasi Sistem Feeder-Antena (Antenna-Feeder Construction Standards)

Kualitas instalasi fisik sistem feeder dan antena menentukan **90% performa jangkauan sinyal** dan keandalan sistem radio. Kegagalan pemasangan feeder merupakan penyebab utama tingginya nilai VSWR dan distorsi audio.

#### Tabel Standar Esensial Instalasi Feeder-Antena & Perangkat (Tabel Resmi Pelatihan Slide 11):
| Butir Instalasi (Item) | Persyaratan Teknis (Technical Requirements) | Masalah yang Sering Terjadi (Common Issues) | Kriteria Penerimaan (Acceptance Criteria) |
|---|---|---|---|
| **Antena Dalam Ruangan (Indoor Antenna ANTI)** | Dipasang mendatar (level), pancaran menghadap ke bawah; jarak bebas **> 30 cm** dari struktur logam; terpasang kokoh pada plafon gipsum / acoustic tile. | Pemasangan miring, terlalu dekat dengan ducting/struktur logam, atau kendur sehingga pancaran tidak merata. | **Kemiringan bidang (Levelness) < 5°**; jarak ke logam terverifikasi >30 cm. |
| **Penarikan Kabel Feeder (Feeder Cable Routing)** | Radius lengkungan **> 10× diameter kabel** (>125 mm untuk 1/2"); ditarik rapi secara horizontal/vertikal; jarak klem pengikat kabel (cable ties) seragam. | Tekukan tajam (<90°), kabel terpelintir (twisting), berada dalam satu konduit dengan kabel listrik AC, atau tanpa label. | **Tidak ada kabel terpelintir**; terpisah dari jalur kabel tegangan tinggi; label terpasang di kedua ujung. |
| **Perakitan Konektor (Connector Assembly)** | Pemotongan pipa luar bersih; penyolderan/pin tengah kokoh; dilapisi **minimal 3 lapis pita kedap air (waterproof tape)**; torsi pengencangan pas. | Insulasi kedap air kurang; pin tengah konduktor terlalu panjang/terlalu pendek; serpihan logam masuk ke dielektrik. | **VSWR Terukur < 1.5 : 1** pada seluruh rentang frekuensi kerja. |
| **Instalasi Perangkat Kabinet (Cabinet Equipment)** | Susunan perangkat dalam rak logis; sirkulasi ventilasi cukup (**≥15 cm di belakang kabinet**); perutean kabel jumper dan power rapi. | Jumper tertekuk/terikat kencang; kabel listrik semrawut; identifikasi port tidak jelas. | Tata letak logis; **jarak ventilasi ≥15 cm**; label port dan perangkat terbaca jelas. |
| **Komponen Pasif (Splitter / Coupler)** | Terpasang kuat pada tray kabel atau dinding; arah port benar (IN / OUT / COUPLED); wajib waterproofing jika semi-outdoor. | Komponen tergantung di udara tanpa penopang; port tertukar; port tidak terpakai dibiarkan terbuka (tanpa beban 50Ω). | Terpasang kokoh pada braket; port tidak terpakai diterminasi dummy load; label port jelas. |
| **Proteksi Petir & Arde (Lightning & Grounding)**| Arrester dipasang pada feeder luar ruangan; **resistansi pentanahan (grounding) < 4 Ω**; penampang kabel arde tembaga **≥ 16 mm²**. | Tidak ada surge arrester; koneksi arde longgar/berkarat; kabel arde terlalu kecil. | **Tahanan Arde Terukur < 4.0 Ω**; kabel tembaga ≥16 mm² terpasang solid. |

---

### 2. Analisis Kesalahan Konektor Koaksial & Feeder (Coaxial Connector Assembly Pitfalls)

Berdasarkan investigasi lapangan FMTCS (Slide 15), dua kesalahan paling fatal yang sering dilakukan teknisi lapangan adalah:

```
KASUS KESALAHAN 1: PIN TENGAH TERLALU PENDEK / TERLALU PANJANG (INSUFFICIENT CENTER CONDUCTOR)
 [Outer Jacketing]    [Corrugated Copper]    [Dielectric Foam]    [Inner Pin]
 +---------------+    +-----------------+    +---------------+    +----+
 |               |    |                 |    |               |    |    |  <-- Pin tengah kurang masuk ke soket
 +---------------+    +-----------------+    +---------------+    +----+
 Akibat: Kontak pin N-Male pada soket N-Female longgar. Menyebabkan resistansi kontak melonjak,
         intermittent signal (suara kresek-kresek), VSWR > 2.0, dan potensi arching listrik pada RF daya tinggi.

KASUS KESALAHAN 2: TEKUKAN KABEL FEEDER MELEBIHI 90 DERAJAT (SHARP BEND RADIUS < 10x DIAMETER)
                                   \  <-- Tekukan patah (radius < 50mm)
                  /
                 /
 Akibat: Pipa tembaga luar peyot / terjepit, busa dielektrik bergeser, impedansi karakteristik lokal
         berubah drastis dari 50 Ohm menjadi ~30 Ohm. Menghasilkan refleksi gelombang berdiri ekstrem (VSWR spike).
         Kabel yang telah peyot TIDAK BISA DIPERBAIKI dan WAJIB DIGANTI BARU.
```

#### Aturan Tiga Lapis Kedap Air (3-Layer Weatherproofing Standard):
Untuk setiap sambungan konektor di luar ruangan (outdoor) atau di area semi-basah (shaft basah):
1. **Lapisan 1 (Inner):** Lapisan isolasi listrik vinil (PVC Electrical Tape) dibalut rapat dari bawah ke atas dengan tumpang tindih 50% untuk melindungi ulir konektor.
2. **Lapisan 2 (Middle):** Lapisan pita karet mastik kedap air (Butyl Rubber Mastic Tape) yang ditarik hingga memanjang dan ditekan kuat agar menyatu membungkus seluruh sambungan secara hermetis.
3. **Lapisan 3 (Outer):** Lapisan ganda pita vinil tahan sinar UV (UV-Resistant PVC Tape) dibalut dari bawah ke atas dan diikat dengan kabel ties tahan cuaca di kedua ujungnya untuk mencegah pengelupasan akibat radiasi matahari.

---

### 3. Alur Komisioning Terstandarisasi 4 Tahap (4-Step Standard Commissioning Workflow)

Setiap proyek Fiber DAS FMTCS wajib melewati 4 tahap komisioning berurutan (Slide 21 & 29):

```
+-----------------------------------------------------------------------------------------+
| EMPAT TAHAP KOMISIONING SISTEM TERSTANDARISASI (STANDARDIZED COMMISSIONING WORKFLOW)    |
|                                                                                         |
|  [ TAHAP 1: KONFIGURASI PARAMETER (PARAMETER CONFIGURATION) ]                           |
|    - Pengecekan lisensi frekuensi, programming codeplug repeater & terminal via CPS.    |
|    - Penyetelan Channel, Color Code, Time Slot (TS1/TS2), dan Talkgroup IDs.            |
|                                     |                                                   |
|                                     v                                                   |
|  [ TAHAP 2: PENGUJIAN DAYA & LEVEL (POWER & OPTICAL LEVEL TESTING) ]                    |
|    - Pengukuran output RF repeater (25-50W) dengan Wattmeter / Power Attenuator.        |
|    - Pengukuran daya optik transmisi OMU dan penerimaan ORU (target: -3 s/d -10 dBm).   |
|    - Penyetelan Downlink/Uplink ATT pada OMU dan ORU panel.                             |
|                                     |                                                   |
|                                     v                                                   |
|  [ TAHAP 3: PENGUJIAN CAKUPAN SINYAL (COVERAGE FIELD-STRENGTH TESTING) ]                |
|    - Uji jalan (Walk Test) menggunakan Field Strength Meter / Scanner di seluruh lantai.|
|    - Verifikasi level sinyal (RSSI) di area kritis: ruang server, lift, tangga darurat. |
|    - Ambang batas penerimaan: ≥ -95 dBm pada ≥ 95% total area lantai.                   |
|                                     |                                                   |
|                                     v                                                   |
|  [ TAHAP 4: VERIFIKASI PANGGILAN SUARA (VOICE CALL VERIFICATION) ]                      |
|    - Uji panggilan individu (Private Call) dan panggilan grup (Group Call).             |
|    - Evaluasi kejernihan audio (DAQ ≥ 3.4): tidak ada suara putus-putus atau delay.    |
|    - Pembuatan Berita Acara Penerimaan (Acceptance Report) & penguncian Engineering Lock|
+-----------------------------------------------------------------------------------------+
```

#### Tabel Parameter Standar Komisioning Sistem (Tabel Resmi Pelatihan Slide 21):
| Parameter Sistem | Konfigurasi Pengaturan (Setup) | Nilai Tipikal (Typical Value) | Catatan Operasional (Operational Note) |
|---|---|---|---|
| **Frekuensi TX / RX** | Sesuai izin frekuensi Kominfo/MCMC | 400 ~ 470 MHz (Duplex Mode) | Pemancar & penerima bekerja pada frekuensi berbeda |
| **Daya Pancar Repeater** | Sesuai desain cakupan | 25 ~ 50 Watt | Tidak boleh melebihi batas izin frekuensi |
| **Color Code / CTCSS** | Disetel per rancangan kanal | Color Code 1 ~ 15 | Seluruh perangkat pada kanal yang sama wajib identik |
| **Alokasi Kanal Radio** | Dibagi per grup area / divisi kerja| 4 ~ 16 Kanal | Sediakan kanal cadangan untuk ekspansi masa depan |
| **Mode Digital Sinyal** | DMR Tier II; atur TS1 dan TS2 | 2-Slot TDMA | Menggandakan kapasitas panggilan dalam 1 frekuensi fisik |
| **Level Input RF OMU** | Diatur via Stripper & Attenuator | **0 ± 10 dBm (Ideal: +2 ~ +5 dBm)** | Melebihi +10 dBm memicu alarm Downlink Over-Power |
| **Level Daya ORU** | Penyetelan ATT Downlink / Uplink | **Output RF +40 dBm (10W)** | Seimbangkan gain agar tidak timbul self-oscillation |

---

### 4. Komisioning Unit Induk (DOMU) & Unit Remote (DORU)

#### Prosedur Komisioning DOMU400C (Slide 24 & 25):
1. **Inspeksi Sambungan Fisik:**
   - Verifikasi arde sasis terhubung kokoh (<4 Ω).
   - Pastikan port `RF-IN` terhubung ke port Couple Signal Splitter (level input terukur 0 ~ +5 dBm).
   - Pasang kabel patch cord serat optik LC-UPC ke port `OPT1` s/d `OPT4`.
2. **Pengaturan Parameter Panel Lokal:**
   - Masuk ke menu tampilan LCD menggunakan tombol navigasi.
   - Periksa pembacaan daya optik pada setiap port optik yang aktif (rentang normal: 0 s/d +3 dBm).
   - Atur redaman downlink (Downlink ATT) hingga daya transmisi optik berada pada titik kerja optimal.
   - Verifikasi indikator LED: **Semua LED port optik yang aktif wajib berwarna HIJAU**, tidak boleh ada indikator MERAH menyala.
3. **Penyelesaian:**
   - Aktifkan menu **Engineering Commissioning Lock** untuk mengunci seluruh parameter.

#### Prosedur Komisioning DORU400CH (Slide 26 & 27):
1. **Inspeksi Pra-Power On:**
   - Ukur nilai VSWR jaringan feeder dari port `RF-OUT` DORU menggunakan Sitemaster. **Nilai VSWR wajib < 1.5**.
   - Periksa penerimaan cahaya pada kabel patch cord optik dari OMU menggunakan Optical Power Meter sebelum dicolokkan ke port `OPT-IN`.
2. **Penyetelan Parameter & Proteksi:**
   - Nyalakan saklar catu daya AC.
   - Pada layar LCD DORU, periksa status modul: pastikan tidak ada alarm "Receive No Light" dan daya optik terima terbaca normal (-3 s/d -10 dBm).
   - Atur nilai **Uplink ATT** pada menu `Real-Time Parameter Settings` agar tidak menimbulkan derau lantai (noise floor rise) pada receiver repeater.
   - Masuk ke menu `Alarm Enable Settings`, aktifkan alarm: **No Optical Receive**, **Uplink Over-Power**, dan **VSWR Alarm**.
   - **PILIH MENU "SAVE CONFIGURATION"** agar seluruh parameter tersimpan permanen.
   - Aktifkan **Engineering Lock**.

---

### 5. Matriks Pemecahan Masalah Komprehensif (FMTCS Troubleshooting Matrix)

Berdasarkan Panduan Resmi *FMTCS Troubleshooting Manual* (Slide 28):

> ⚠️ **Empat Prinsip Utama Troubleshooting:**  
> 1. *Cek Catu Daya sebelum Sinyal (Power before signal)*  
> 2. *Cek Perangkat Inti sebelum Terminal Radio (Core equipment before terminals)*  
> 3. *Cek Parameter Konfigurasi sebelum Mengganti Perangkat Keras (Parameters before hardware)*  
> 4. *Mulai dari yang Sederhana ke yang Kompleks (Simple before complex)*

| Gejala Gangguan (Fault Symptom) | Kemungkinan Penyebab (Likely Cause) | Metode Diagnosa (Troubleshooting Method) | Tindakan Korektif (Corrective Action) |
|---|---|---|---|
| **Tidak ada sinyal / Daerah Buta Sinyal (Coverage Dead Zone)** | Titik antena kurang; kabel feeder terlalu panjang/redaman tinggi; atau daya pemancar repeater/ORU terlalu kecil. | Gunakan Field Strength Meter untuk memetakan level sinyal terima (RSSI) per ruangan. | Tambah titik antena ceiling (ANTI); naikkan daya pancar ORU (kurangi downlink ATT); periksa sambungan kabel feeder. |
| **Suara kemerosok / Panggilan Terputus-putus (Noisy / Intermittent Audio)** | Kontak konektor koaksial buruk (pin kendor); nilai VSWR tinggi (>1.5); atau ada interferensi frekuensi sekanal (co-channel). | Ukur VSWR jaringan kabel menggunakan Sitemaster; gunakan Spectrum Analyzer untuk memindai interferensi frekuensi liar. | Rakit ulang konektor koaksial yang rusak; ganti segmen kabel yang terjepit/peyot; ubah alokasi frekuensi bila ada interferensi eksternal. |
| **Repeater Tidak Menyala / Mati Total (Repeater will not start)** | Kerusakan sumber listrik AC; sekring putus; atau proteksi suhu termal akibat kipas mati. | Ukur tegangan stopkontak dengan Multimeter digital; periksa sekring dan status kipas pendingin di belakang unit. | Ganti kabel power / sekring cadangan; perbaiki sirkulasi udara kabinet; bersihkan filter debu kipas pendingin. |
| **Komunikasi Satu Arah (One-Way Communication Only)** | Ketidakcocokan pasangan frekuensi Tx/Rx; perbedaan parameter Color Code / CTCSS; atau kerusakan antena penerima. | Verifikasi parameter frekuensi dan CTCSS pada repeater, OMU, dan radio handy talky menggunakan software CPS. | Samakan parameter CTCSS / Color Code di seluruh armada radio; lakukan pengujian loopback antena. |
| **Interferensi Lintas Kanal / Suara Bocor (Cross-talk / Channel Interference)** | Alokasi kanal tidak terencana; tidak mengaktifkan CTCSS/Color Code; atau interferensi kanal yang berdekatan. | Analisis okupansi spektrum frekuensi dengan RF Explorer / Spectrum Analyzer; audit konfigurasi codeplug terminal. | Terapkan Color Code digital unik pada setiap grup; pasang cavity bandpass filter tambahan jika terjadi desensitisasi. |
| **Alarm "Receive No Light" pada ORU / OMU** | Kabel serat optik putus (fiber cut); konektor LC kotor; atau modul laser optik rusak/tidak menancap sempurna. | Periksa kabel patch cord dengan Visual Fault Locator (laser merah pen); ukur daya optik dengan Optical Power Meter. | Bersihkan ferrule konektor LC dengan optical cleaning pen; ganti kabel patch cord serat optik; perbaiki sambungan fusi serat optik. |
| **Alarm "Downlink Input Over-Power" pada OMU** | Output pemancar base station terlalu besar atau Signal Splitter UDSS400C belum terpasang. | Ukur daya RF masukan ke port RF-IN OMU dengan RF Power Meter. | Pasang atau periksa Signal Splitter UDSS400C (-30dB); tambahkan fixed RF attenuator pad 5~10 dB. |
| **Alarm "VSWR Alarm" pada ORU** | Kerusakan pada jaringan kabel feeder antena dalam ruangan; konektor lepas; atau port coupler tidak diterminasi. | Ukur nilai VSWR port demi port dari sasis ORU ke arah jaringan feeder menggunakan Sitemaster. | Periksa setiap cabang kabel; kencangkan konektor; pastikan seluruh port splitter/coupler yang tidak digunakan telah dipasang beban 50Ω. |

---

### 6. Lembar Checklist Berita Acara Serah Terima (Handover Acceptance Checklist)

Sebelum pekerjaan dinyatakan selesai (100% Final Acceptance), tim proyek CDPK wajib memverifikasi dan menandatangani checklist berikut:

- [ ] **Uji Kelistrikan & Grounding:** Resistansi arde seluruh kabinet OMU, ORU, dan Repeater terukur **< 4.0 Ω**.
- [ ] **Uji VSWR Sistem:** Seluruh segmen feeder dan antena terukur **VSWR < 1.5 : 1** pada rentang 400 ~ 470 MHz.
- [ ] **Uji Daya Optik:** Seluruh link serat optik terhubung normal tanpa alarm merah, redaman optik terukur **< 10 dB**.
- [ ] **Uji Daya Pancar RF:** Daya pancar Downlink ORU stabil pada **+40 ± 2 dBm (10W)**.
- [ ] **Pemberian Label (Labeling):** Seluruh kabel feeder, patch cord serat optik, coupler, splitter, dan antena telah diberi label tahan cuaca sesuai diagram skematik (as-built drawing).
- [ ] **Uji Cakupan (Walk Test):** Level sinyal radio mencapai **≥ -95 dBm pada ≥ 95% total area lantai gedung**.
- [ ] **Uji Kualitas Suara (Audio Clarity Test):** Panggilan suara individu dan grup menghasilkan audio bersih tanpa gaung/noise (**DAQ ≥ 3.4**).
- [ ] **Penguncian Sistem:** Seluruh menu OMU dan ORU telah dikunci dengan **Engineering Commissioning Lock**.
- [ ] **Dokumentasi As-Built:** Laporan pengujian VSWR, peta peletakan antena, dan file backup parameter CPS telah diarsipkan.
