# Panduan Rekayasa & Standar Perencanaan Sistem CCTV Surveillance & Video Security
**PT Citradata Purnakharisma (Citradata Group)**
*Dokumen Resmi Bank Knowledge Internal — Divisi Solusi Keamanan Terpadu & Video Security*

---

## 1. Arsitektur Terbuka Multi-Brand (Open Multi-Brand & Universal ONVIF)

PT Citradata Purnakharisma mengadopsi arsitektur terbuka universal untuk seluruh perancangan video surveillance enterprise, industri, pelabuhan, perkantoran, dan fasilitas migas/pertambangan:

### Prioritas Kerjasama Prinsipal:
1. **⭐ Partner Resmi CDPK (Flagship Solutions):**
   - **Pelco (Motorola Solutions):** Lini kamera enterprise tangguh (*Sarix, Spectra Enhanced 8, Esprit Thermal, ExSite Enhanced 2 ATEX*) dan VMS *VideoXpert Enterprise*.
   - **Avigilon Unity (Motorola Solutions):** Platform keamanan cerdas AI terdistribusi (*H5A Bullet, H5A Dome, H5A-PTZ, Multisensor*) dengan analitik terdepan (*Appearance Search, Facial Recognition, Unusual Activity Detection*) dan *Avigilon AI NVR*.
   - **Ava Security (Avigilon Alta Cloud):** Kamera cloud AI native (*Ava Compact Dome, Ava 360 Multisensor, Ava Bullet Telephoto*) dengan penyimpanan on-board hingga 30 hari.
2. **🌐 Brand Pihak Ketiga & Terbuka via Universal ONVIF:**
   - **Milesight:** Pelopor kamera Mini PTZ, Panoramic 180°, dan ATEX Explosion-Proof ramah anggaran dengan kompresi AI H.265+.
   - **VIGI (by TP-Link):** Solusi pengawasan komersial efisien dengan Full-Color Night Vision, SmartVid, dan integrasi mudah.
   - **Axis Communications:** Standar keandalan Eropa dengan teknologi *Zipstream*, *Lightfinder*, dan *Forensic WDR*.
   - **Hanwha Vision (Wisenet):** Kamera cerdas AI chipset Wisenet7 dengan kompresi *WiseStream III*.
   - **Hikvision & Dahua Technology:** Portofolio masif pengawasan perimeter (*ColorVu, DarkFighter, WizMind, AcuSense*).
   - **Bosch Security & Uniview (UNV):** Solusi pengawasan industri dan transportasi publik.
   - **Generic ONVIF Profile S/G/T:** Mode kustom fleksibel untuk integrasi kamera eksisting pelanggan.

---

## 2. Standar DORI & Panjang Fokus Lensa (EN 62676-4)

Standar internasional **EN 62676-4** mendefinisikan densitas piksel minimum pada bidang objek (PPM — *Pixels Per Meter*) untuk menjamin efektivitas pengawasan visual:

### Tingkatan Klasifikasi Forensik DORI:
1. **D — Detection ($\ge 25\text{ PPM}$ / $8\text{ PPF}$):**
   - **Definisi:** Mengidentifikasi keberadaan manusia atau kendaraan dalam scene.
   - **Aplikasi:** Pengawasan perimeter luar, ladang perkebunan, pagar pembatas, area parkir terbuka luas.
2. **O — Observation ($\ge 62\text{ PPM}$ / $19\text{ PPF}$):**
   - **Definisi:** Mengamati detail karakteristik umum subjek (warna pakaian, pola gerakan, jenis kendaraan).
   - **Aplikasi:** Koridor gedung, lobi utama, area bongkar muat barang.
3. **R — Recognition ($\ge 125\text{ PPM}$ / $38\text{ PPF}$):**
   - **Definisi:** Memastikan dengan tingkat kepastian tinggi apakah individu tersebut adalah orang yang pernah dilihat atau dikenal sebelumnya.
   - **Aplikasi:** Pintu masuk kantor, gerbang pos satpam, area kasir, resepsionis.
4. **I — Identification ($\ge 250\text{ PPM}$ / $76\text{ PPF}$):**
   - **Definisi:** Identifikasi forensik positif tanpa keraguan terhadap fitur wajah subjek atau nomor plat kendaraan (*ANPR/LPR*) yang sah sebagai alat bukti hukum di pengadilan.
   - **Aplikasi:** Pintu tol, gerbang akses kontrol biometrik, kasir bank, pos pemeriksaan bea cukai.

### Formulasi Matematis DORI & HFoV:
- **Sudut Pandang Horizontal (HFoV dalam Derajat):**
  $$\text{HFoV} = 2 \times \arctan\left(\frac{w_s}{2f}\right) \times \frac{180^\circ}{\pi}$$
- **Lebar Bidang Pandang pada Jarak Target ($W_s$):**
  $$W_s = d \times \frac{w_s}{f}$$
- **Densitas Piksel pada Target (PPM):**
  $$\text{PPM} = \frac{W_{\text{px}}}{W_s} = \frac{W_{\text{px}} \times f}{d \times w_s}$$
- **Jangkauan Jarak Maksimum untuk Target PPM ($d_{\text{max}}$):**
  $$d_{\text{max}} = \frac{W_{\text{px}} \times f}{w_s \times \text{PPM}_{\text{target}}}$$
  *(dengan $W_{\text{px}}$ = resolusi lebar piksel horizontal kamera, $f$ = panjang fokus lensa mm, $w_s$ = lebar sensor optik mm, $d$ = jarak target meter).*

### Tabel Format Sensor Optik Standar:
| Format Sensor | Lebar Sensor ($w_s$) | Tinggi Sensor ($h_s$) | Karakteristik Penggunaan |
| :--- | :---: | :---: | :--- |
| **1/4"** | 3.20 mm | 2.40 mm | Kamera kompak indoor / analog legacy |
| **1/3"** | 4.80 mm | 3.60 mm | Sensor standar dome & bullet komersial |
| **1/2.8"** | 5.12 mm | 3.84 mm | **Standar industri modern** (Sony STARVIS / OmniVision) |
| **1/2.7"** | 5.37 mm | 4.04 mm | Kamera 4MP / 5MP modern |
| **1/2"** | 6.40 mm | 4.80 mm | Kamera outdoor low-light performa tinggi |
| **1/1.8"** | 7.18 mm | 5.32 mm | Sensor 4K Ultra HD & AI Forensic Lightfinder |
| **1"** | 12.80 mm | 9.60 mm | Kamera forensik jarak jauh & ANPR kecepatan tinggi |

---

## 3. Kalkulasi Jarak Kabel Cat6 & PoE Voltage Drop

Transmisi daya listrik DC bersama sinyal data Ethernet melalui kabel twisted-pair menghadapi tahanan jenis tembaga yang menyebabkan penurunan tegangan (*voltage drop*):

### Parameter Kabel Transmisi:
- **Cat6 Solid Bare Copper 23 AWG:** Resistansi loop kabel $R_{\text{loop}} \approx 0.165\,\Omega/\text{meter}$ ($16.5\,\Omega / 100\text{ m}$).
- **Cat5e Solid Bare Copper 24 AWG:** Resistansi loop kabel $R_{\text{loop}} \approx 0.188\,\Omega/\text{meter}$ ($18.8\,\Omega / 100\text{ m}$).
- **Tegangan Output Port Switch (PSE):** 48V – 54V DC (Standar IEEE: 48V untuk af, 54V untuk at/bt).

### Formulasi Drop Tegangan:
$$I = \frac{P_{\text{camera}}}{V_{\text{PSE}}}, \quad V_{\text{drop}} = I \times (d \times R_{\text{meter}}), \quad V_{\text{camera}} = V_{\text{PSE}} - V_{\text{drop}}, \quad P_{\text{loss}} = I^2 \times (d \times R_{\text{meter}})$$

### Batas Minimum Tegangan Operasi IEEE ($V_{\text{min}}$):
- **IEEE 802.3af (PoE 15.4W):** $V_{\text{min}} = 37.0\text{ V DC}$ di terminal kamera.
- **IEEE 802.3at (PoE+ 30.0W):** $V_{\text{min}} = 42.5\text{ V DC}$ di terminal kamera.
- **IEEE 802.3bt (Ultra PoE 60W–90W):** $V_{\text{min}} = 41.1\text{ V DC}$ di terminal kamera.

### Rekomendasi Jarak & Aksesoris Transmisi:
1. **$d \le 100\text{ meter}$:** Sesuai standar IEEE 802.3u/ab. Kabel Cat6 STP langsung dari switch PoE ke kamera.
2. **$101\text{ m} \le d \le 250\text{ meter}$:** Melebihi standar jangkauan tembaga Ethernet. Wajib menyertakan unit **`EXT-POE-IND-250M`** (*Industrial Long-Reach PoE Extender IP67*).
3. **$d > 250\text{ meter}$:** Sinyal Ethernet tembaga tidak stabil dan drop tegangan terlalu besar. Wajib menggunakan transmisi Fiber Optik dengan **`FMC-IND-POE-SFP`** (*Industrial Gigabit PoE+ Fiber Media Converter*) dan kabel Drop Core Single-Mode FO.
4. **Alarm Undervoltage:** Jika $V_{\text{camera}} < V_{\text{min}}$, sistem wajib memberikan peringatan keras bahwa kamera berisiko mengalami *boot-loop*, IR LED berkedip, atau koneksi terputus saat malam hari.

---

## 4. Universal Throughput Bandwidth & Estimasi Storage NVR

### Bitrate Rata-Rata Berdasarkan Resolusi & Kompresi:
- **1080p Full HD (2MP):** H.264 ~ 4.0 Mbps | H.265 ~ 2.0 Mbps | SmartCodec ~ 1.2 Mbps
- **4MP QHD (2560x1440):** H.264 ~ 7.0 Mbps | H.265 ~ 3.5 Mbps | SmartCodec ~ 2.0 Mbps
- **5MP Super HD:** H.264 ~ 9.0 Mbps | H.265 ~ 4.5 Mbps | SmartCodec ~ 2.6 Mbps
- **4K UHD (8MP, 3840x2160):** H.264 ~ 15.0 Mbps | H.265 ~ 7.5 Mbps | SmartCodec ~ 4.2 Mbps
- **12MP Panoramic / 360°:** H.264 ~ 22.0 Mbps | H.265 ~ 11.0 Mbps | SmartCodec ~ 6.0 Mbps
- **Thermal Radiometrik:** H.264 ~ 3.0 Mbps | H.265 ~ 1.5 Mbps | SmartCodec ~ 1.0 Mbps

### Formulasi Laju Data & Kebutuhan Storage:
- **Total Throughput Bandwidth Bersih (Mbps):**
  $$\text{Throughput} = \sum_{i=1}^{N} \left( \text{Bitrate}_i \times \text{Jumlah Kamera}_i \right)$$
- **Peak Bandwidth (+20% Headroom):** Untuk antisipasi surge gerakan/noise malam hari.
  $$\text{Peak Mbps} = \text{Throughput} \times 1.20$$
- **Laju Data Harian (GB/hari):**
  $$\text{Data Harian (GB)} = \frac{\text{Throughput (Mbps)} \times 10^6 \times 3600 \times 24}{8 \times 10^9} \approx 10.8 \times \text{Throughput (Mbps)}$$
- **Total Storage Terproteksi (TB Usable):**
  $$\text{Storage (TB)} = \frac{\text{Data Harian (GB)} \times \text{Hari Retensi}}{1000} \times (1 + \text{Overhead RAID}) \times 1.20\text{ (Safety Factor)}$$
  *(Overhead RAID: RAID 5 = +20%, RAID 6 = +30%, RAID 10 = +100%).*

### Standar Sizing Hard Disk & Chassis NVR:
- **Ukuran HDD Surveillance Enterprise:** 4TB, 8TB, 12TB, 16TB, 20TB (WD Purple Pro / Seagate SkyHawk AI, MTBF 2.0M jam, URE $<10^{-15}$).
- **Kapasitas Sasis NVR:**
  - $\le 4\text{ Drive}$: 4-Bay NVR (hingga 80 TB gross).
  - $5 - 8\text{ Drive}$: 8-Bay 2U Rackmount NVR (hingga 160 TB gross).
  - $9 - 16\text{ Drive}$: 16-Bay 3U Rackmount NVR (hingga 320 TB gross).
  - $> 16\text{ Drive}$: 24-Bay 4U Enterprise Storage Array / SAN Expansion.

---

## 5. PoE Power Budget & Sizing Industrial Managed Switch

### Klasifikasi Beban Daya Kamera:
- **IEEE 802.3af (PoE Standar):** Daya port hingga 15.4W (beban kamera $\le 12.95\text{W}$). Cocok untuk dome indoor reguler dan bullet compact.
- **IEEE 802.3at (PoE+ High Power):** Daya port hingga 30.0W (beban kamera $\le 25.5\text{W}$). Cocok untuk bullet outdoor dengan Smart IR, varifocal bermotor, dan pemanas/blower.
- **IEEE 802.3bt (Ultra PoE / Type 3-4):** Daya port 60W – 90W (beban kamera $\le 71\text{W}$). Wajib untuk kamera PTZ Speed Dome jarak jauh, bispectral thermal wiper, dan explosion-proof ATEX.

### Rekomendasi Port & Switch Industri:
- **Port Requirement:** Jumlah kamera $\times 1.20$ (cadangan +20% untuk ekspansi dan link uplink/NVR).
- **Power Headroom Budget (+20% Safety Factor):** Menjamin switch tidak mengalami pemadaman proteksi saat suhu dingin ekstrem atau seluruh Smart IR menyala serempak.
- **Proteksi Kamera Daya Tinggi (802.3bt):** Jika armada menyertakan kamera berdaya $> 30\text{W}$, sistem otomatis menyertakan switch khusus **Industrial 8-Port 802.3bt Ultra PoE Switch (480W Budget)** agar switch distribusi standar tidak kehabisan daya.

---

## 6. Aturan Audit Interoperabilitas & Kompatibilitas Multi-Brand

Sistem perencanaan CDPK memberlakukan aturan audit otomatis (*Interoperability Audit Rule Engine*) untuk mencegah kegagalan integrasi di lapangan:

### 1. ⛔ BLOCKER: Avigilon AI Appliance Requirement
- **Kondisi:** Pengguna memilih VMS **Avigilon Unity**, namun terdapat kamera dari brand pihak ketiga (Hikvision, Dahua, VIGI, Milesight, Axis, Hanwha, Uniview).
- **Penyebab Teknis:** Algoritma cerdas Avigilon (*Appearance Search, Face Recognition, Unusual Activity Detection*) berjalan di tingkat server/edge proprietary. Stream ONVIF kamera non-Avigilon tidak memiliki metadata analitik tersemat.
- **Solusi Wajib:** Menambahkan hardware akselerator **`AVG-AI-APPLIANCE-8P`** (*Avigilon AI Appliance 8-Channel*) agar stream video kamera non-Avigilon dapat dianalisis AI secara real-time.

### 2. ⛔ BLOCKER: 802.3bt Ultra PoE Power Overload
- **Kondisi:** Armada menyertakan kamera berdaya tinggi ($> 30\text{W}$, misal PTZ Speed Dome atau Thermal ATEX), namun switch PoE yang dipilih hanya kelas 802.3af/at (maksimum 30W per port).
- **Penyebab Teknis:** Switch standar akan langsung mematikan port karena proteksi kelebihan beban saat motor PTZ berputar cepat atau pemanas aktif.
- **Solusi Wajib:** Mengalokasikan unit switch khusus **Industrial 8-Port 802.3bt Ultra PoE Switch (480W Power Budget)**.

### 3. ⚠️ REMINDER: Lisensi Saluran Kamera Pihak Ketiga (Camera Channel License)
- **Kondisi:** Menggunakan VMS enterprise **Pelco VideoXpert** atau **Avigilon Unity** dengan kamera pihak ketiga / ONVIF terbuka.
- **Penyebab Teknis:** VMS tier enterprise membatasi pendaftaran kamera non-partner tanpa lisensi saluran komersial (*VMS Channel License*).
- **Solusi Wajib:** Memasukkan lisensi saluran ke dalam BoQ:
  - Pelco VideoXpert: **`PEL-VX-1C-COMM`** (*Pelco VideoXpert 1-Camera Channel License*).
  - Avigilon Unity: **`AVG-COMM-CAM-LIC`** (*Avigilon Unity Camera Channel License*).

### 4. ⚠️ REMINDER: Proprietary SmartCodec Stuttering Risk
- **Kondisi:** Kamera pihak ketiga disetel menggunakan kompresi eksklusif (*Hikvision H.265+, Dahua Smart H.265, VIGI Smart Coding, Milesight H.265+, Axis Zipstream*) pada VMS Pelco VideoXpert atau Avigilon Unity.
- **Penyebab Teknis:** Variasi interval dinamis I-Frame pada SmartCodec non-standar dapat menyebabkan tampilan video patah-patah (*stuttering*), *frame loss*, atau kegagalan sinkronisasi waktu pada timeline playback VMS enterprise.
- **Solusi Rekomendasi:** Mengubah pengaturan kompresi kamera non-partner ke **H.265 Standar Murni** (*Standard Deterministic H.265*).
