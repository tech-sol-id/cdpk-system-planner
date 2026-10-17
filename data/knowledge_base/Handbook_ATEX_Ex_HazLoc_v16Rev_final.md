---
title: "Handbook_ATEX_Ex_HazLoc_v16Rev_final.docx"
original_file_name: "Handbook_ATEX_Ex_HazLoc_v16Rev_final.docx"
drive_file_id: "1WFt6I4wGrhJZ6DELx6oCAMWHTh21giMo"
drive_view_url: "https://drive.google.com/file/d/1WFt6I4wGrhJZ6DELx6oCAMWHTh21giMo/view"
mime_type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
folder_path: "AI Bank Knowledge/ATEX & Ex Knowledge/"
last_modified: "2026-07-21T09:56:16.997Z"
image_reference_note: "Gambar skematik, diagram blok, kurva grafis, dan foto fisik perangkat dapat dilihat langsung pada file asli di link di atas."
extracted_at: "2026-10-17T17:02:48.576596+00:00"
---

# Handbook_ATEX_Ex_HazLoc_v16Rev_final.docx

> 🔗 **Dokumen Asli (Google Drive):** [Handbook_ATEX_Ex_HazLoc_v16Rev_final.docx](https://drive.google.com/file/d/1WFt6I4wGrhJZ6DELx6oCAMWHTh21giMo/view)
> 📂 **Lokasi Folder:** `AI Bank Knowledge/ATEX & Ex Knowledge/`
> ℹ️ *Catatan AI: Teks dokumen ini adalah salinan lengkap untuk pemrosesan cepat. Untuk diagram, peta sinyal, kurva frekuensi, dan foto produk resolusi tinggi, rujuk langsung ke link dokumen asli.*

---

HANDBOOK

ATEX, Ex, HazLoc &
Intrinsically Safe Devices

Panduan Teknis Explosion Protection untuk Engineer Instrumentasi & Listrik,
HSE, Operasi & Pemeliharaan, serta Procurement

Berbasis IEC/EN 60079 series · ATEX 2014/34/EU & 1999/92/EC · IECEx · NEC 500/505 · CEC

Edisi 2.3 — 2026

FOR INTERNAL USE ONLY

Editor : Adrian Bany Kansil

## Kata Pengantar

Explosion protection adalah disiplin lintas bidang yang menuntut pemahaman simultan atas kimia fisika pembakaran, rekayasa listrik dan instrumentasi, praktik instalasi, serta kerangka regulasi yang berbeda-beda antar yurisdiksi. Seorang engineer yang bekerja di fasilitas migas, petrokimia, farmasi, pertambangan, atau pengolahan debu kerap harus membaca marking peralatan, menilai kesesuaian terhadap hazardous area yang telah diklasifikasikan, dan mempertanggungjawabkan keputusan tersebut dalam dokumen compliance — seluruhnya dalam satu rangkaian pekerjaan yang sama.

Handbook ini disusun untuk menjembatani kebutuhan tersebut. Materi dibangun berjenjang dari fondasi konsep pembakaran dan segitiga ledakan, kerangka regulasi ATEX/IECEx/HazLoc, metodologi klasifikasi area untuk gas dan dust, klasifikasi zat dan peralatan, seluruh metode proteksi utama seri IEC 60079, hingga pembacaan marking, pemilihan, instalasi, inspeksi, serta compliance, manajemen risiko, dan kompetensi personel. Bagian penutup membahas Intrinsically Safe Devices secara khusus karena metode proteksi ini paling banyak dipakai pada instrumentasi lapangan sekaligus paling sering disalahpahami dalam praktik.

Penulisan mengacu pada literatur teknis explosion protection, materi pelatihan kompetensi CompEx dan IECEx CoPC, panduan klasifikasi area, serta rujukan komparatif regulasi internasional. Istilah teknis baku sengaja dipertahankan dalam bahasa aslinya agar pembaca dapat langsung memetakannya ke teks standar dan dokumen sertifikasi yang mereka hadapi di lapangan.

Setiap bab ditutup dengan bagian "Poin Penting" untuk memudahkan peninjauan ulang, dan sebagian besar pembahasan dilengkapi tabel serta contoh pembacaan marking langkah demi langkah. Handbook ini dirancang untuk dibaca berurutan pada penggunaan pertama, dan kemudian dipakai sebagai rujukan cepat per bab pada penggunaan sehari-hari.

## Disclaimer

Handbook ini merupakan panduan teknis dan bahan referensi. Handbook ini TIDAK menggantikan teks standar, kode, atau peraturan resmi mana pun, dan TIDAK menggantikan penilaian profesional engineer bersertifikat atau personel kompeten yang bertanggung jawab atas suatu instalasi.

Standar seri IEC/EN 60079, ATEX Directive 2014/34/EU dan 1999/92/EC, skema IECEx, NEC/NFPA 70 (Article 500/505), CEC, serta regulasi nasional yang berlaku merupakan satu-satunya rujukan yang mengikat secara hukum dan teknis. Nomor klausul, nilai batas, tabel, dan persyaratan yang dikutip dalam handbook ini harus selalu diverifikasi terhadap edisi standar terbaru yang berlaku pada yurisdiksi dan tanggal pelaksanaan pekerjaan, karena isi standar dapat berubah melalui amandemen maupun revisi.

Keputusan mengenai klasifikasi hazardous area, pemilihan peralatan Ex, perhitungan intrinsic safety, desain instalasi, regime inspeksi, serta perbaikan dan overhaul peralatan Ex harus dibuat oleh personel yang memiliki kompetensi terverifikasi (misalnya melalui skema CompEx atau IECEx CoPC) dengan mengacu pada dokumen proyek, data zat aktual, dan kondisi lokasi yang sebenarnya.

Penulis dan penyusun tidak menerima tanggung jawab atas kerugian, kerusakan, cedera, atau ketidaksesuaian regulasi yang timbul dari penggunaan langsung isi handbook ini tanpa verifikasi terhadap standar resmi dan tanpa peninjauan oleh personel kompeten.

## Daftar Isi

PART I

FONDASI: SAINS LEDAKAN & PROTEKSI

Bab 1  ·  Pendahuluan & Konsep Dasar

Bab 2  ·  Kimia & Fisika Ledakan

Bab 3  ·  Strategi Pencegahan Ledakan

## PART I — FONDASI: SAINS LEDAKAN & PROTEKSI

Part I meletakkan dasar ilmiah dan konseptual yang menjadi pijakan seluruh handbook ini. Sebelum membahas kerangka regulasi (Part II), klasifikasi area (Part III), atau metode proteksi (Part V), pembaca perlu memahami tiga hal fundamental: mengapa explosion protection (proteksi ledakan) menjadi disiplin rekayasa tersendiri, bagaimana ledakan terbentuk secara kimia dan fisika, serta strategi umum untuk mencegahnya. Ketiga bab dalam Part I ini — Pendahuluan & Konsep Dasar, Kimia & Fisika Ledakan, dan Strategi Pencegahan Ledakan — membangun kerangka berpikir yang dipakai konsisten di seluruh buku.

### Bab 1  Pendahuluan & Konsep Dasar

#### 1.1  Tujuan Bab

Bab ini bertujuan memperkenalkan disiplin explosion protection kepada pembaca lintas peran — engineer instrumentasi dan listrik, personel HSE (Health, Safety & Environment), tim operasi dan pemeliharaan, procurement, serta tim teknis perangkat Ex. Setelah membaca bab ini, pembaca diharapkan memahami mengapa proteksi ledakan penting secara historis dan industri, mengenali miskonsepsi yang paling sering menimbulkan kesalahan fatal di lapangan, serta mengetahui cara menavigasi dan memanfaatkan handbook ini pada pekerjaan sehari-hari.

#### 1.2  Definisi Awal: Apa yang Dimaksud Explosion Protection

Explosion protection adalah keseluruhan tindakan rekayasa, organisasi, dan prosedural yang bertujuan mencegah terjadinya ledakan pada hazardous area (hazardous area — lokasi di mana atmosfer eksplosif dapat muncul dalam jumlah yang membahayakan keselamatan), atau bila ledakan tidak dapat sepenuhnya dicegah, membatasi dampaknya sampai tingkat yang dapat diterima. Sebuah explosive atmosphere (atmosfer eksplosif) didefinisikan sebagai campuran zat mudah terbakar dalam bentuk gas, uap, kabut (mist), atau debu (dust) dengan udara, pada kondisi atmosferik, yang setelah tersulut akan merambatkan pembakaran ke seluruh campuran yang belum terbakar.

Ledakan (explosion) sendiri adalah reaksi oksidasi yang berlangsung cepat dan tiba-tiba, menghasilkan kenaikan suhu, tekanan, atau keduanya secara bersamaan. Reaksi paling umum adalah reaksi gas, uap, atau debu mudah terbakar dengan oksigen di udara. Secara praktis, sebuah volume sekitar 10 liter atmosfer eksplosif dalam ruang tertutup sudah cukup untuk menimbulkan kerusakan serius pada manusia dan bangunan — angka ini menjelaskan mengapa kebocoran yang tampak kecil pun tidak boleh diabaikan.

#### 1.3  Mengapa Explosion Protection Penting: Sejarah & Industri Terkait

Akar disiplin explosion protection terletak pada industri pertambangan batu bara. Ketika listrik mulai dipakai secara luas pada akhir abad ke-19, kehadiran metana (firedamp) dan debu batu bara di dalam tambang menyebabkan rangkaian ledakan mematikan. Kebutuhan untuk menggunakan peralatan listrik tanpa memicu ledakan mendorong lahirnya konsep dasar proteksi ledakan listrik — termasuk lampu keselamatan dan, kemudian, selungkup flameproof. Sejak itu, disiplin ini berkembang jauh melampaui rekayasa listrik dan kini mencakup peralatan mekanik/non-listrik, instrumentasi, hingga perangkat elektronik portabel.

Saat ini explosion protection menjadi persyaratan wajib di berbagai sektor di mana zat mudah terbakar ditangani, disimpan, atau diproses. Sektor-sektor utama yang terkait mencakup:

Minyak & gas (migas) dan petrokimia — kilang, anjungan lepas pantai, terminal, tangki penyimpanan, unit pengolahan gas; hampir seluruh area proses berpotensi memiliki gas/uap hidrokarbon.

Industri kimia — pabrik pelarut, cat, tinta, bahan perekat, dan proses reaksi yang melibatkan pelarut mudah menguap.

Farmasi — penanganan pelarut organik, pengeringan semprot (spray drying), penggilingan (milling) bahan aktif, dan penanganan serbuk yang menghasilkan debu mudah terbakar.

Pertambangan — tambang batu bara bawah tanah (metana dan debu batu bara), serta pengolahan mineral tertentu (Group I dalam skema Ex).

Pangan, biji-bijian, dan pakan (food/grain) — silo, elevator biji-bijian, penggilingan tepung, penanganan gula, kakao, dan susu bubuk; semuanya menghasilkan debu organik yang dapat meledak.

Pengolahan debu logam & lainnya — serbuk aluminium, magnesium, dan logam lain yang justru sangat energik saat meledak.

Sejarah kecelakaan industri — dari ledakan tambang batu bara, kebakaran kilang, hingga ledakan debu di elevator biji-bijian dan pabrik gula — secara konsisten menunjukkan pola yang sama: sebuah atmosfer eksplosif bertemu dengan sumber penyalaan yang seharusnya dapat dikendalikan. Ledakan debu memiliki karakteristik khas yang berbahaya, yaitu efek sekunder: gelombang tekanan ledakan primer yang kecil dapat mengangkat lapisan debu yang mengendap, membentuk awan debu yang jauh lebih besar, sehingga terjadi ledakan sekunder yang jauh lebih destruktif. Pemahaman atas pola-pola inilah yang menjadi alasan mengapa klasifikasi area, pemilihan peralatan bersertifikat, dan kompetensi personel diatur secara ketat.

#### 1.4  Miskonsepsi & Kesalahan Umum tentang Hazardous Area

Sebagian besar insiden di hazardous area bukan berakar pada kegagalan teknologi yang canggih, melainkan pada kesalahpahaman mendasar. Berikut miskonsepsi yang paling sering dijumpai di lapangan beserta koreksinya:

#### 1.5  Ruang Lingkup & Cara Memakai Handbook Ini

Handbook ini disusun dalam delapan Part dan 24 bab utama ditambah bab khusus Intrinsically Safe Devices, serta Lampiran A–F. Susunannya mengikuti alur logis pekerjaan explosion protection: dari fondasi sains, ke kerangka regulasi, klasifikasi area, klasifikasi zat & peralatan, metode proteksi, marking & instalasi, compliance & kompetensi, hingga penerapan pada perangkat portabel Intrinsically Safe.

Peta ringkas seluruh buku:

Cara membaca yang disarankan bergantung pada peran pembaca. Engineer desain sebaiknya membaca berurutan dari Part I hingga Part VI. Personel HSE dapat memberi penekanan pada Part I, Part III, dan Part VII (risiko & EPD). Procurement dan tim teknis produk akan paling sering merujuk Part IV, Part VI (terutama Bab 19 membaca marking dan Bab 20 pemilihan), serta Part VIII. Personel operasi & pemeliharaan perlu menguasai Part VI (Bab 21 instalasi/inspeksi) dan Part VII (Bab 24 kompetensi).

Sepanjang handbook, istilah teknis baku sengaja dipertahankan dalam bahasa aslinya (mis. hazardous area, source of release, flameproof, intrinsic safety, Equipment Protection Level) dan diberi penjelasan singkat saat pertama kali muncul, lalu dipakai konsisten. Kode marking dan nomor standar ditulis persis sesuai standar (mis. IEC 60079-0, IEC 60079-11, II 2G Ex ib IIC T4 Gb).1,2 Nilai-nilai angka parameter yang ditampilkan bersifat referensi untuk pemahaman; untuk keputusan rekayasa dan sertifikasi, selalu verifikasi ke edisi standar terbaru dan lembar data produk resmi.

Catatan dan Rujukan — Bab 1  Pendahuluan & Konsep Dasar (catatan 1–2)

1.  IEC 60079-0, Explosive atmospheres — Part 0: Equipment — General requirements.

2.  IEC 60079-11, Explosive atmospheres — Part 11: Equipment protection by intrinsic safety "i".

Standar lain yang dirujuk pada tabel dan gambar bab ini:

•  EN 1127-1, Explosive atmospheres — Explosion prevention and protection — Part 1: Basic concepts and methodology.

Pustaka pendukung:

•  Singh, A. K. (2023). Explosion-Proof Equipment in Hazardous Area. Springer. [Berkas: 823211066-Arvind-Kumar-Singh-Explosion-Proof-Equipment-in-Hazardous-Area-Springer-2023.pdf]

•  Linström, H.-J. Basic Concepts for Explosion Protection. [Berkas: 193650475-Basic-Concepts-for-Explosion-Protection.pdf]

•  Kumar, H. Safety in Instrumentation & Control Systems, Unit 1. [Berkas: 886653684-Document-From-Hemanth-s-Kumar.pdf]

•  IESSA. Hazardous Area Course Notes. [Berkas: 793764224-Iessa-Haz-Course-Notes.pdf]

•  R. STAHL. Essential Explosion Protection. [Berkas: 695762365-ex-essential-explosion-protection-rstahl.pdf]

•  Hazardous Areas Technical Guide. [Berkas: 120420138-ATEX.pdf]

### Bab 2  Kimia & Fisika Ledakan

#### 2.1  Tujuan Bab

Bab ini menjelaskan dasar kimia dan fisika yang menentukan apakah, dan seberapa mudah, sebuah zat dapat membentuk atmosfer eksplosif dan tersulut. Parameter-parameter yang dibahas — LEL/UEL, flash point, ignition temperature, MIE, MIC, MESG — bukan sekadar angka akademis: seluruh sistem klasifikasi zona, penggolongan gas group, penetapan temperature class, dan pemilihan metode proteksi di bab-bab berikutnya diturunkan langsung dari parameter-parameter ini. Menguasai bab ini adalah prasyarat untuk memahami mengapa sebuah peralatan diberi marking tertentu.

#### 2.2  Definisi: Api, Ledakan, Deflagrasi, dan Detonasi

Api adalah oksidasi cepat suatu bahan yang melepaskan panas, cahaya, dan berbagai produk reaksi. Ledakan adalah oksidasi yang jauh lebih cepat dan terkurung sehingga menimbulkan lonjakan tekanan mendadak. Dalam konteks explosion protection, dua moda perambatan dibedakan. Deflagrasi (deflagration) adalah perambatan front pembakaran dengan kecepatan di bawah kecepatan suara pada medium yang belum terbakar; inilah moda umum ledakan gas dan debu di industri. Detonasi (detonation) adalah perambatan gelombang reaksi dengan kecepatan supersonik yang digerakkan gelombang kejut, menghasilkan tekanan jauh lebih tinggi. Perancangan proteksi konstruktif (mis. explosion venting dan flame arrester) harus memperhitungkan moda mana yang mungkin terjadi.

#### 2.3  Segitiga Api & Segitiga/Pentagon Ledakan

Konsep paling mendasar dalam proteksi ledakan adalah fire triangle (segitiga api). Agar pembakaran dapat terjadi, tiga unsur harus hadir bersamaan: bahan bakar (fuel), oksigen (oxygen/pengoksidasi), dan sumber penyalaan (ignition source / energi). Bila salah satu sisi dihilangkan, pembakaran tidak dapat terjadi. Prinsip inilah yang menjadi dasar seluruh strategi pencegahan pada Bab 3.

Gambar 2.1 — Segitiga Api (fire triangle): pembakaran hanya terjadi bila bahan bakar, oksigen, dan sumber penyalaan hadir bersamaan. Menghilangkan salah satu sisi memutus segitiga dan mencegah api — prinsip yang menjadi dasar seluruh strategi pencegahan pada Bab 3.

Untuk ledakan (bukan sekadar api menyala di satu titik), diperlukan dua kondisi tambahan sehingga segitiga berkembang menjadi explosion pentagon (pentagon/segitiga ledakan yang diperluas). Dua unsur tambahan itu adalah:

Dispersion (dispersi/pencampuran) — bahan bakar harus tercampur dengan udara dalam rentang konsentrasi yang mudah terbakar (antara LEL dan UEL). Untuk debu, ini berarti debu harus tersuspensi sebagai awan dengan konsentrasi memadai.

Confinement (pengurungan) — campuran berada dalam ruang terkurung (bejana, ruangan, selungkup) sehingga tekanan hasil pembakaran terakumulasi. Tanpa pengurungan, pembakaran cenderung hanya berupa nyala (flash fire) tanpa lonjakan tekanan destruktif.

Kelima unsur — fuel, oxygen, ignition source, dispersion, confinement — membentuk kerangka analisis risiko ledakan. Menghilangkan salah satunya sudah cukup mencegah ledakan; strategi proteksi pada Bab 3 pada dasarnya adalah cara sistematis menyerang satu atau lebih sisi pentagon ini.

Gambar 2.2 — Pentagon Ledakan (explosion pentagon): tiga unsur segitiga api ditambah dispersion (bahan bakar tercampur udara dalam rentang LEL–UEL) dan confinement (campuran berada dalam ruang terkurung). Ledakan hanya terjadi bila kelima unsur hadir bersamaan; memutus satu simpul sudah cukup memutus rantai ledakan.

#### 2.4  Explosion Range: LEL dan UEL

Sebuah gas atau uap hanya dapat meledak bila konsentrasinya di udara berada dalam rentang tertentu, yang disebut explosion range (rentang mudah meledak) atau flammable range. Batas bawahnya adalah LEL (Lower Explosive Limit / batas ledakan bawah) — konsentrasi minimum bahan bakar di udara yang masih dapat merambatkan nyala. Batas atasnya adalah UEL (Upper Explosive Limit / batas ledakan atas) — konsentrasi maksimum yang masih dapat meledak. Keduanya biasanya dinyatakan dalam persen volume (% vol) bahan bakar di udara.

Di bawah LEL, campuran terlalu miskin (too lean) — bahan bakar tidak cukup untuk merambatkan nyala. Di atas UEL, campuran terlalu kaya (too rich) — oksigen tidak cukup. Sebagai contoh klasik, metana memiliki LEL sekitar 5% vol dan UEL sekitar 15% vol; artinya campuran metana 20% vol di udara tidak akan meledak karena berada di atas UEL (kekurangan oksigen). Meskipun demikian, campuran di atas UEL tetap berbahaya, karena bila kemudian bercampur dengan udara segar (mis. saat wadah dibuka atau ventilasi berubah), konsentrasinya dapat turun kembali melewati rentang eksplosif.

Untuk keperluan klasifikasi area, LEL adalah parameter kunci: semakin rendah LEL sebuah zat, semakin sedikit kebocoran yang sudah cukup membentuk atmosfer eksplosif, sehingga zona berbahaya cenderung lebih luas. Detektor gas umumnya dikalibrasi dan menampilkan pembacaan dalam %LEL (mis. alarm pada 20% LEL berarti 20% dari nilai LEL telah tercapai).

#### 2.5  Flash Point

Flash point (titik nyala) adalah suhu terendah suatu cairan mudah terbakar di mana ia melepaskan uap dalam jumlah cukup untuk membentuk campuran yang dapat tersulut (menyambar/flash) di permukaan cairan pada kondisi laboratorium. Parameter ini penting khusus untuk cairan: cairan dengan flash point rendah (mis. bensin, aseton, eter) mudah membentuk atmosfer eksplosif bahkan pada suhu kamar, sedangkan cairan dengan flash point tinggi (mis. minyak diesel, minyak pelumas) baru berbahaya bila dipanaskan melewati flash point-nya.

Sebagai pedoman praktis, cairan dengan flash point tinggi lebih tidak berbahaya dibandingkan cairan dengan flash point rendah pada suhu operasi yang sama. Dalam klasifikasi area, hubungan antara suhu proses/ambien dan flash point cairan menentukan apakah pelepasan cairan perlu diperlakukan sebagai sumber uap mudah terbakar. Perlu diperhatikan: bila cairan ditangani di atas flash point-nya, atau dalam bentuk kabut/semprotan (mist/spray), cairan ber-flash point tinggi pun dapat membentuk atmosfer eksplosif.

#### 2.6  Ignition Temperature & Temperature Class

Ignition temperature (suhu penyalaan / auto-ignition temperature) adalah suhu terendah suatu permukaan panas yang dapat menyalakan campuran gas/uap–udara tanpa perlu percikan atau nyala. Parameter ini sangat penting karena membatasi suhu permukaan maksimum yang boleh dimiliki peralatan yang dipasang di hazardous area: permukaan peralatan tidak boleh mencapai suhu yang dapat menyalakan gas di sekitarnya. Metode uji untuk gas dan uap distandarkan (secara historis dalam IEC 60079-4, kini dalam seri IEC 60079-20-1).3,4

Untuk menyederhanakan pemilihan peralatan, gas dan uap dikelompokkan ke dalam enam temperature class (kelas suhu) T1 hingga T6, berdasarkan ignition temperature-nya. Kelas suhu juga menetapkan suhu permukaan maksimum yang diizinkan untuk peralatan. Semakin tinggi angka (menuju T6), semakin rendah suhu permukaan maksimum yang diizinkan, sehingga peralatan T6 dapat dipakai untuk gas dengan ignition temperature rendah sekalipun. Tabel berikut merangkum hubungannya (mengacu IEC 60079-0):5

Tabel 2.1 — Temperature class dan suhu permukaan maksimum peralatan (mengacu IEC 60079-0). Aturan praktis: peralatan dengan temperature class ‘lebih tinggi’ (mis. T5) boleh dipakai pada aplikasi yang mensyaratkan class ‘lebih rendah’ (mis. T2), tetapi tidak sebaliknya.

Prinsip pemilihan: temperature class peralatan harus sama dengan atau lebih ketat daripada yang disyaratkan gas. Contohnya, gas dengan ignition temperature 220 °C termasuk memerlukan minimal T3; peralatan berlabel T4, T5, atau T6 boleh dipakai karena suhu permukaan maksimumnya lebih rendah, tetapi peralatan T2 (300 °C) tidak boleh. Detail temperature class dibahas lebih lanjut di Bab 13.

#### 2.7  MIE dan Minimum Ignition Current (MIC)

MIE (Minimum Ignition Energy / energi penyalaan minimum) adalah energi terkecil — biasanya dari percikan listrik — yang dapat menyalakan campuran eksplosif pada konsentrasi paling mudah tersulut. MIE dinyatakan dalam satuan energi (milijoule, mJ) dan bervariasi sangat lebar antar zat: gas seperti hidrogen dan asetilena memiliki MIE sangat rendah (orde 0,02 mJ), sedangkan banyak debu organik memerlukan energi jauh lebih besar (orde puluhan hingga ratusan mJ). Semakin rendah MIE, semakin mudah zat tersulut oleh sumber energi kecil seperti percikan elektrostatik.

Konsep yang berkaitan erat adalah MIC (Minimum Igniting Current / arus penyalaan minimum) dan MIC ratio (rasio arus penyalaan minimum). MIC diukur pada rangkaian uji terstandar (IEC 60079-11) dan dinyatakan sebagai rasio terhadap metana sebagai referensi.6 Ignition dari percikan bekerja pada bagian volume campuran yang sangat kecil (‘mikroskopik’), berbeda dengan permukaan panas yang bekerja pada volume ‘makroskopik’. MIC ratio dipakai — bersama MESG di bawah — untuk menggolongkan gas ke dalam gas group IIA, IIB, dan IIC. Parameter MIE dan MIC menjadi dasar rekayasa metode proteksi intrinsic safety (Ex i), yang bekerja dengan membatasi energi listrik di bawah nilai yang dapat menyalakan gas (dibahas mendalam di Bab 18).

#### 2.8  MESG dan Penggolongan Gas Group

MESG (Maximum Experimental Safe Gap / celah aman eksperimental maksimum) adalah lebar celah maksimum antara dua bagian selungkup, sepanjang 25 mm, yang tepat mencegah rambatan nyala dari campuran yang terbakar di dalam selungkup ke campuran di luar, pada kondisi uji terstandar (secara historis IEC 60079-1A).7 Semakin kecil MESG sebuah gas, semakin mudah nyala merambat melalui celah sempit, sehingga semakin sulit dikurung dengan metode flameproof — dan semakin ‘agresif’ penggolongannya.

Berdasarkan MESG (dan/atau MIC ratio), gas dan uap dalam Group II (industri permukaan, di luar tambang) dibagi menjadi tiga subgrup: IIA (paling ‘jinak’, mis. propana, MESG > 0,9 mm), IIB (mis. etilena, MESG antara 0,5 dan 0,9 mm), dan IIC (paling ‘agresif’, mis. hidrogen dan asetilena, MESG ≤ 0,5 mm). Penggolongan berdasarkan MESG hampir berimpit dengan penggolongan berdasarkan MIC ratio. Peralatan yang disertifikasi untuk IIC mencakup pula IIB dan IIA, tetapi tidak sebaliknya. Group I diperuntukkan bagi tambang bawah tanah dengan metana/debu batu bara. Penggolongan gas group dibahas lebih lanjut di Bab 12.

Dua set batas yang berbeda. IEC 60079-20-1 memuat dua kelompok angka yang mudah tertukar, dan kekeliruan membacanya lazim dijumpai pada materi pelatihan. Klausul 4.2 memberi batas definisi penggolongan: Group IIA bila MESG ≥ 0,9 mm, Group IIB bila MESG berada di antara 0,5 mm dan 0,9 mm, dan Group IIC bila MESG ≤ 0,5 mm. Klausul 4.4 memberi hal yang berbeda, yaitu kapan satu penentuan saja sudah memadai untuk menggolongkan zat. Di situ Group IIB disebut pada rentang 0,55 mm sampai 0,9 mm — angka 0,55 inilah yang sering keliru dikutip sebagai batas definisi Group IIB, padahal ia adalah ambang kecukupan pengujian.

Selisih antara kedua angka itu justru menandai pita yang menuntut kehati-hatian. Standar menetapkan bahwa penentuan MESG dan MIC ratio sama-sama diperlukan bila hasilnya jatuh pada pita batas: untuk IIA bila MIC berada antara 0,8 dan 0,9 sehingga perlu dikonfirmasi lewat MESG; untuk IIB bila MIC berada antara 0,45 dan 0,5 sehingga perlu dikonfirmasi lewat MESG; dan untuk IIC bila MESG berada antara 0,5 dan 0,55 mm sehingga perlu dikonfirmasi lewat MIC. Di luar pita-pita itu, satu penentuan sudah cukup.

Tabel 2.2A — Batas penggolongan gas group menurut IEC 60079-20-1:2010 klausul 4.2 sampai 4.4.

Tabel 2.2 — Penggolongan gas group berdasarkan MESG (nilai indikatif; verifikasi ke IEC 60079-20-1 untuk data zat spesifik). Group ‘lebih tinggi’ mencakup yang ‘lebih rendah’: sertifikasi IIC berlaku juga untuk IIB dan IIA.

#### 2.9  Tabel Parameter Rekayasa Ledakan Gas Umum

Tabel berikut merangkum parameter rekayasa ledakan untuk sejumlah gas dan uap yang lazim dijumpai di industri. Nilai-nilai ini bersifat referensi tipikal untuk pemahaman konsep; untuk perhitungan dan sertifikasi, gunakan data dari edisi standar terbaru (IEC 60079-20-1) atau lembar data keselamatan bahan (SDS) yang relevan.

Tabel 2.3 — Parameter rekayasa ledakan gas/uap umum (nilai tipikal referensi). Perhatikan: hidrogen memiliki rentang eksplosif sangat lebar (4–75% vol) dan tergolong IIC yang ‘agresif’; amonia LEL tinggi (15%) sehingga relatif sulit mencapai rentang eksplosif. Verifikasi seluruh angka ke IEC 60079-20-1 sebelum dipakai untuk desain.

#### 2.10  Perbedaan Karakteristik Gas/Uap vs Dust vs Fibres

Meskipun prinsip segitiga/pentagon berlaku universal, perilaku ledakan berbeda nyata antara gas/uap, debu (dust), dan serat (fibres). Perbedaan ini menentukan cara klasifikasi (zona gas 0/1/2 vs zona debu 20/21/22), penggolongan (Group II vs Group III), serta metode proteksi yang sesuai.

Gas dan uap tercampur homogen dengan udara dan langsung membentuk atmosfer eksplosif bila konsentrasinya berada antara LEL dan UEL. Energi penyalaannya umumnya rendah (MIE kecil), sehingga percikan kecil pun berbahaya. Gas cenderung menyebar mengikuti aliran udara dan densitasnya (gas lebih ringan dari udara naik, yang lebih berat mengendap di lantai/parit).

Debu (dust) berperilaku sangat berbeda tergantung apakah ia mengendap sebagai lapisan (layer) atau tersuspensi sebagai awan (cloud). Lapisan debu di atas permukaan panas cenderung membara (smouldering) dan dapat menjadi sumber penyalaan; sedangkan awan debu yang tersuspensi dapat meledak seketika bila tersulut. Ciri khas bahaya debu adalah sifat kumulatif dan efek ledakan sekunder: ledakan awal yang kecil mengangkat lapisan debu di sekitarnya menjadi awan besar, memicu ledakan lanjutan yang jauh lebih dahsyat. Energi penyalaan debu umumnya lebih besar daripada gas, tetapi begitu terbakar, energi yang dilepaskan menghasilkan suhu dan tekanan tinggi. Kehalusan partikel dan luas permukaan total sangat menentukan — semakin halus debu, semakin mudah dan dahsyat ledakannya. Debu juga memiliki dua ignition temperature: satu untuk lapisan (layer/deposit) dan satu untuk awan (cloud), dengan metode uji dan perlakuan suhu permukaan peralatan yang berbeda.

Serat dan flock (fibres/flyings) — seperti serat kapas, linen, atau serpihan tekstil — merupakan padatan mudah terbakar berbentuk memanjang. Serat dapat membentuk lapisan yang mudah membara dan, dalam kondisi tertentu, awan yang mudah tersulut. Dalam sistem HazLoc Amerika Utara, fibres/flyings dikategorikan tersendiri sebagai Class III. Dalam skema IEC/ATEX, penanganan serat umumnya masuk kerangka bahaya debu (Group III), dengan perhatian khusus pada penumpukan dan pembersihan.

Rangkuman perbandingan:

Tabel 2.4 — Perbandingan karakteristik ledakan gas/uap, debu, dan serat. Perbedaan ini mendasari pemisahan sistem klasifikasi zona gas (0/1/2) dan zona debu (20/21/22) yang dibahas di Part III.

Catatan dan Rujukan — Bab 2  Kimia & Fisika Ledakan (catatan 3–7)

3.  IEC 60079-4, Method of test for ignition temperature (ditarik; digantikan seri IEC 60079-20-1).

4.  IEC 60079-20-1, Explosive atmospheres — Part 20-1: Material characteristics for gas and vapour classification — Test methods and data.

5.  IEC 60079-0, Explosive atmospheres — Part 0: Equipment — General requirements.

6.  IEC 60079-11, Explosive atmospheres — Part 11: Equipment protection by intrinsic safety "i".

7.  IEC 60079-1, Explosive atmospheres — Part 1: Equipment protection by flameproof enclosures "d".

Pustaka pendukung:

•  IEC 60079-20-1:2010 (Edisi 1.0) melalui adopsi IS/IEC 60079-20-1:2010, Explosive atmospheres — Part 20-1: Material characteristics for gas and vapour classification — Test methods and data. [Berkas: is.iec.60079.20.1.2010.pdf dan info_iec60079-20-1{ed1.0}b.pdf]

•  Singh, A. K. (2023). Explosion-Proof Equipment in Hazardous Area. Springer. [Berkas: 823211066-Arvind-Kumar-Singh-Explosion-Proof-Equipment-in-Hazardous-Area-Springer-2023.pdf]

•  Linström, H.-J. Basic Concepts for Explosion Protection. [Berkas: 193650475-Basic-Concepts-for-Explosion-Protection.pdf]

•  Kumar, H. Safety in Instrumentation & Control Systems, Unit 1. [Berkas: 886653684-Document-From-Hemanth-s-Kumar.pdf]

•  IESSA. Hazardous Area Course Notes. [Berkas: 793764224-Iessa-Haz-Course-Notes.pdf]

•  R. STAHL. Essential Explosion Protection. [Berkas: 695762365-ex-essential-explosion-protection-rstahl.pdf]

### Bab 3  Strategi Pencegahan Ledakan

#### 3.1  Tujuan Bab

Bab ini menerjemahkan sains dari Bab 2 menjadi strategi rekayasa yang terstruktur. Karena ledakan hanya terjadi bila seluruh unsur pentagon ledakan hadir bersamaan, pencegahan pada dasarnya adalah upaya sistematis untuk menghilangkan atau membatasi satu atau lebih unsur tersebut. Bab ini menyajikan kerangka baku explosion protection — proteksi primer, sekunder, dan konstruktif (tersier) — beserta hirarki pengendalian dan tindakan non-teknis, sebagai peta jalan menuju bab-bab teknis berikutnya (klasifikasi area di Part III dan metode proteksi di Part V).

#### 3.2  Kerangka Umum: Menyerang Sisi Segitiga

Standar dasar EN 1127-1 (‘Explosive atmospheres — Explosion prevention and protection — Part 1: Basic concepts and methodology’) menyusun strategi explosion protection dalam urutan prioritas yang jelas.8 Prioritas pertama selalu menghindari terbentuknya atmosfer eksplosif (menyerang sisi bahan bakar atau, lebih jarang, sisi oksigen). Bila itu tidak dapat sepenuhnya dijamin, prioritas berikutnya adalah menghindari sumber penyalaan (menyerang sisi ignition source). Dan bila kedua hal di atas masih menyisakan risiko, prioritas terakhir adalah membatasi dampak ledakan hingga tingkat yang tidak berbahaya (proteksi konstruktif). Ketiga tingkat inilah yang secara konvensional disebut proteksi primer, sekunder, dan tersier/konstruktif.

#### 3.3  Proteksi Primer (Primary Explosion Protection)

Proteksi primer adalah semua tindakan yang bertujuan mencegah terbentuknya atmosfer eksplosif sejak awal. Ini adalah bentuk proteksi yang paling utama dan paling disukai, karena bila tidak ada atmosfer eksplosif, tidak ada yang dapat meledak — terlepas dari ada tidaknya sumber penyalaan. Tindakan proteksi primer yang lazim meliputi:

Substitusi bahan — mengganti zat mudah terbakar dengan yang tidak/kurang mudah terbakar, atau memakai pelarut ber-flash point tinggi bila memungkinkan.

Membatasi konsentrasi — menjaga konsentrasi bahan bakar tetap di bawah LEL (mis. dengan ventilasi) atau, pada proses tertutup, di atas UEL secara terkendali.

Inerting (inertisasi) — menurunkan kadar oksigen di bawah Limiting Oxygen Concentration (LOC) dengan gas inert seperti nitrogen atau CO₂, sehingga campuran tidak dapat merambatkan nyala (menyerang sisi oksigen).

Ventilasi — ventilasi alami atau paksa untuk mengencerkan dan membuang pelepasan gas/uap sebelum mencapai konsentrasi berbahaya; ventilasi juga memperkecil luas (extent) dan mengubah tipe zona (dibahas di Bab 9).

Pengendalian pelepasan (containment) — desain sistem tertutup, sambungan rapat, sealing yang baik, dan pemeliharaan integritas mekanik untuk mencegah kebocoran menjadi source of release.

Housekeeping untuk debu — pembersihan rutin lapisan debu agar tidak menumpuk dan tidak dapat terangkat menjadi awan; ini adalah proteksi primer terpenting terhadap ledakan debu sekunder.

Proteksi primer tidak selalu dapat menjamin ketiadaan atmosfer eksplosif secara mutlak — misalnya di sekitar sumber pelepasan yang secara inheren melepaskan gas selama operasi normal. Karena itu, klasifikasi area (Part III) justru merupakan pengakuan bahwa atmosfer eksplosif mungkin muncul, dan menuntun kita ke lapis proteksi berikutnya.

#### 3.4  Proteksi Sekunder (Pencegahan Sumber Penyalaan)

Proteksi sekunder adalah tindakan untuk mencegah sumber penyalaan menjadi aktif di tempat dan waktu di mana atmosfer eksplosif dapat hadir. Inilah ranah utama peralatan Ex: metode proteksi seperti flameproof (Ex d), increased safety (Ex e), intrinsic safety (Ex i), pressurization (Ex p), dan encapsulation (Ex m) semuanya adalah cara agar peralatan — khususnya peralatan listrik — tidak menjadi sumber penyalaan. Proteksi sekunder menjadi relevan justru karena proteksi primer tidak dapat sepenuhnya menghilangkan atmosfer eksplosif.

Langkah pertama proteksi sekunder adalah mengenali bahwa sumber penyalaan jauh lebih beragam daripada nyala api terbuka. EN 1127-1 mengidentifikasi 13 jenis sumber penyalaan yang harus dinilai. Yang paling relevan di industri dirangkum berikut:

Tabel 3.1 — Ringkasan jenis sumber penyalaan menurut EN 1127-1. Penilaian risiko ledakan (Bab 22) mengharuskan setiap sumber yang mungkin aktif — pada operasi normal, malfungsi terduga, maupun malfungsi jarang — dievaluasi untuk setiap zona.

Peralatan Ex mengatasi sumber penyalaan dengan salah satu dari empat prinsip proteksi dasar: (1) mencegah campuran eksplosif mencapai bagian yang dapat memicu (mis. pressurization, encapsulation), (2) mengurung dan menahan ledakan internal agar tidak merambat keluar (flameproof), (3) mencegah timbulnya percikan atau suhu berbahaya melalui konstruksi (increased safety), atau (4) membatasi energi listrik di bawah ambang penyalaan (intrinsic safety). Keempat prinsip dan realisasinya sebagai metode proteksi (types of protection) dibahas tuntas di Part V.

#### 3.5  Proteksi Konstruktif / Tersier (Constructional Protection)

Proteksi konstruktif (juga disebut proteksi tersier atau explosion protection by design/mitigation) diterapkan ketika ledakan tidak dapat dijamin tidak terjadi, sehingga fokus bergeser ke pembatasan dampak agar tidak membahayakan manusia dan tidak merambat. Pendekatan ini lazim pada peralatan proses yang menangani debu (silo, filter, mill, dryer, elevator) dan menjadi tema Explosion Protection Document (EPD) serta Dust Hazard Analysis di Part VII. Teknik utamanya:

Explosion-resistant construction (containment) — merancang bejana cukup kuat menahan tekanan ledakan maksimum (explosion pressure-resistant atau pressure-shock-resistant), sehingga ledakan terkurung aman.

Explosion venting (relief) — memasang panel/cakram lepas tekanan (bursting panel) yang membuka pada tekanan tertentu untuk melepaskan tekanan ledakan ke arah aman, mencegah pecahnya bejana.

Explosion suppression — sistem deteksi cepat yang menyemprotkan agen pemadam (suppressant) dalam milidetik untuk memadamkan ledakan yang baru mulai sebelum tekanannya membangun.

Explosion isolation — katup cepat, rotary valve, atau flame arrester yang mencegah nyala dan tekanan merambat melalui pipa/ducting ke peralatan lain (mencegah ledakan sekunder antar unit).

Flame arrester — perangkat celah sempit yang memadamkan nyala yang lewat (prinsip serupa MESG), melindungi tangki dan jalur ventilasi.

Dalam praktik, proteksi konstruktif sering dikombinasikan (mis. venting + isolation) sebagai satu sistem terpadu yang didokumentasikan dalam Explosion Protection Document.

Cakupan kewajiban pemberi kerja menurut Directive 1999/92/EC mencakup lebih dari sekadar menyusun dokumen. Pemberi kerja wajib melakukan penilaian risiko ledakan yang mencakup klasifikasi area, lalu menempuh tindakan yang diperlukan agar keselamatan dan kesehatan pekerja tidak terancam. Tindakan itu bersifat organisasi sekaligus teknis: pelatihan pekerja, sistem izin kerja, penyediaan instruksi kerja, pemasangan tanda peringatan, serta tanggung jawab mengoordinasikan pekerjaan antar-pekerja yang berasal dari pemberi kerja berbeda. Seluruh tindakan yang disyaratkan itu harus diuraikan di dalam Explosion Protection Document.

#### 3.6  Hirarki Pengendalian

Ketiga lapis proteksi di atas selaras dengan hirarki pengendalian (hierarchy of control) yang lazim dalam manajemen risiko keselamatan. Prinsipnya: dahulukan pengendalian yang menghilangkan bahaya di sumbernya, dan jadikan alat pelindung diri sebagai lapis terakhir, bukan yang pertama. Diterapkan pada explosion protection, hirarkinya menjadi:

Tabel 3.2 — Hirarki pengendalian diterapkan pada explosion protection. Pengendalian rekayasa (tingkat 3) adalah tulang punggung teknis, tetapi bergantung pada pengendalian administratif (tingkat 4) agar efektif dan berkelanjutan.

#### 3.7  Tindakan Non-Teknis (Organisasi & Prosedural)

Proteksi teknis hanya efektif bila didukung tindakan non-teknis yang memastikan sistem dirancang, dipasang, dioperasikan, dan dipelihara dengan benar sepanjang umur pakainya. Prasyarat operasi aman peralatan di hazardous area dibangun bersama oleh produsen peralatan Ex, perancang instalasi, dan operator pabrik. Tindakan non-teknis utama meliputi:

Explosion Protection Document (EPD) — dokumen yang mengidentifikasi bahaya ledakan, hasil klasifikasi zona, tindakan proteksi, dan personel bertanggung jawab (diwajibkan pendekatan EU/1999/92/EC; dibahas di Bab 22).9

Instruksi operasi tertulis — prosedur yang diperbarui berkala mengenai cara kerja aman, batasan, dan tindakan bila terjadi penyimpangan.

Sistem izin kerja (permit-to-work) — khususnya hot work permit untuk pekerjaan yang dapat menimbulkan sumber penyalaan di hazardous area.

Pelatihan & kompetensi personel — pelatihan berkala agar personel memahami bagaimana bahaya ledakan timbul dan tindakan pencegahannya; kompetensi formal melalui skema CompEx dan IECEx CoPC (dibahas di Bab 24).

Manajemen perubahan (Management of Change) — memastikan setiap modifikasi proses, zat, atau peralatan dievaluasi ulang terhadap dampaknya pada klasifikasi area dan proteksi.

Inspeksi & pemeliharaan terjadwal — regime inspeksi (visual, close, detailed) sesuai IEC 60079-17 untuk menjaga integritas proteksi sepanjang waktu (Bab 21).10

Housekeeping & pengendalian debu — program pembersihan lapisan debu yang terdokumentasi, sebagai pertahanan utama terhadap ledakan debu sekunder.

Pesan intinya: explosion protection adalah sistem yang menggabungkan rekayasa dan organisasi. Peralatan bersertifikat terbaik pun dapat gagal melindungi bila dipasang salah, tidak diinspeksi, atau dioperasikan oleh personel yang tidak kompeten. Karena itu, kompetensi dan budaya keselamatan (Bab 24) sama pentingnya dengan pemilihan peralatan yang tepat.

Catatan dan Rujukan — Bab 3  Strategi Pencegahan Ledakan (catatan 8–12)

8.  EN 1127-1, Explosive atmospheres — Explosion prevention and protection — Part 1: Basic concepts and methodology.

9.  Directive 1999/92/EC of the European Parliament and of the Council on minimum requirements for improving the safety and health protection of workers potentially at risk from explosive atmospheres (ATEX Workplace Directive).

10.  IEC 60079-17, Explosive atmospheres — Part 17: Electrical installations inspection and maintenance.

Pustaka pendukung:

•  Linström, H.-J. Basic Concepts for Explosion Protection. [Berkas: 193650475-Basic-Concepts-for-Explosion-Protection.pdf]

•  Singh, A. K. (2023). Explosion-Proof Equipment in Hazardous Area. Springer. [Berkas: 823211066-Arvind-Kumar-Singh-Explosion-Proof-Equipment-in-Hazardous-Area-Springer-2023.pdf]

•  R. STAHL. Essential Explosion Protection. [Berkas: 695762365-ex-essential-explosion-protection-rstahl.pdf]

•  Davis, J. (Fike, 2022). Explosion Risk Assessment and Explosion Protection Document (webinar, 5 Mei 2022). [Berkas: 618882413-Fike-Webinar-Explosion-Risk-Assessment-and-Explosion-Protecti.pdf]

•  IESSA. Hazardous Area Course Notes. [Berkas: 793764224-Iessa-Haz-Course-Notes.pdf]

PART II

KERANGKA REGULASI & STANDAR

Bab 4  ·  ATEX (Uni Eropa)

Bab 5  ·  IECEx (Skema Internasional)

Bab 6  ·  HazLoc Amerika Utara (NEC & CEC)11

Bab 7  ·  Peta Standar Global & Kesetaraannya

## PART II — KERANGKA REGULASI & STANDAR

Part I telah meletakkan fondasi ilmiah explosion protection: bagaimana atmosfer eksplosif terbentuk, apa yang menjadi sumber penyalaan, dan strategi umum pencegahan ledakan. Part II beralih dari “mengapa” ke “berdasarkan aturan apa”. Bagian ini memetakan kerangka regulasi dan standar yang mengatur peralatan dan tempat kerja di hazardous area (hazardous area) di berbagai belahan dunia. Pemahaman kerangka ini bukan sekadar urusan hukum; ia menentukan peralatan mana yang boleh dibeli, dokumen apa yang wajib disiapkan, siapa yang bertanggung jawab, dan bagaimana sebuah instalasi dinyatakan sah untuk dioperasikan.

Tiga kerangka besar mendominasi praktik global. Pertama, ATEX — rezim wajib Uni Eropa yang membebani produsen sekaligus pemberi kerja (Bab 4). Kedua, IECEx — skema sertifikasi internasional yang bersifat sukarela namun menjadi “bahasa bersama” dunia Ex (Bab 5). Ketiga, HazLoc Amerika Utara yang berakar pada NEC (National Electrical Code) dan CEC (Canadian Electrical Code) dengan sistem Class/Division serta adopsi sistem Zone (Bab 6). Bab 7 menutup Part II dengan peta standar global dan tabel padanan lintas rezim, sehingga pembaca dapat menerjemahkan satu penandaan ke rezim lain.

Benang merah seluruh Part II adalah seri standar IEC 60079 — kumpulan standar teknis yang menjadi basis hampir semua rezim modern. ATEX mengadopsinya sebagai EN 60079, IECEx menggunakannya secara langsung, dan bahkan NEC 505/506 menyelaraskan diri dengannya.12 Dengan memahami satu fondasi teknis ini, perbedaan antar-rezim menjadi lebih mudah dipahami sebagai variasi administratif, bukan perbedaan prinsip keselamatan.

### Bab 4  Kerangka ATEX (Uni Eropa)

#### 4.1  Tujuan Bab

Bab ini menjelaskan kerangka hukum ATEX yang berlaku di Uni Eropa (dan, dengan modifikasi, di Inggris sebagai UKEX pasca-Brexit). Setelah membaca bab ini, pembaca diharapkan memahami dua directive inti ATEX beserta pembagian tanggung jawabnya, arti CE marking dan penandaan Ex khusus ATEX, kapan Notified Body harus dilibatkan, serta perbedaan mendasar antara kewajiban produsen (manufacturer) dan kewajiban pemberi kerja (employer).

#### 4.2  Asal Istilah & Filosofi ATEX

ATEX adalah singkatan dari frasa Prancis “ATmosphères EXplosibles” (atmosfer eksplosif). Istilah ini kini merujuk pada dua directive Uni Eropa yang mengatur, di satu sisi, produk yang ditujukan untuk digunakan di explosive atmosphere, dan di sisi lain, perlindungan pekerja yang berpotensi terpapar atmosfer semacam itu. ATEX bukan sebuah standar teknis; ia adalah instrumen hukum (directive) yang menetapkan tujuan keselamatan (essential health and safety requirements/EHSR) dan menyerahkan detail teknis pemenuhannya kepada standar harmonisasi (harmonised standards), terutama seri EN 60079.

ATEX termasuk dalam kelompok “New Approach Directives” Uni Eropa. Filosofi New Approach adalah: regulasi menetapkan sasaran keselamatan esensial, sementara cara memenuhinya diserahkan pada standar Eropa yang harmonis. Produk yang dibuat sesuai standar harmonis memperoleh “presumption of conformity” — dianggap memenuhi sasaran keselamatan directive tanpa perlu pembuktian terpisah untuk setiap butir. Pendekatan ini memungkinkan free movement of goods di pasar tunggal Eropa: sekali sebuah produk sah menyandang CE marking dengan pemenuhan ATEX, produk tersebut boleh diperdagangkan di seluruh negara anggota tanpa persyaratan nasional tambahan.

#### 4.3  Dua Pilar ATEX: Directive Produk dan Directive Tempat Kerja

Kerangka ATEX berdiri di atas dua directive yang saling melengkapi. Keduanya sering disebut secara berpasangan karena satu mengatur “benda” (peralatan) dan yang lain mengatur “orang dan tempat” (pekerja di lokasi berisiko). Memisahkan keduanya penting agar tanggung jawab tidak tertukar.

Tabel 4.1 — Dua directive inti ATEX dan pembagian tanggung jawabnya. Angka “114” dan “137” merujuk pada nomor pasal Treaty on the Functioning of the European Union yang menjadi dasar hukum masing-masing directive.

#### 4.4  Directive 2014/34/EU — Kewajiban Produsen

Directive 2014/34/EU (menggantikan directive lama 94/9/EC sejak 20 April 2016) mengatur peralatan, komponen, dan protective systems yang ditujukan untuk digunakan di explosive atmosphere.13,14 Cakupannya luas dan mencakup baik peralatan listrik maupun non-listrik (mekanik) — sebuah ciri khas ATEX yang membedakannya dari banyak rezim lain yang semula hanya mengatur peralatan listrik. Pompa, gearbox, kopling, dan peralatan mekanik yang memiliki sumber penyalaan sendiri pun termasuk dalam cakupan.

Directive membagi peralatan menjadi dua Equipment Group. Group I untuk peralatan yang digunakan di tambang bawah tanah yang berpotensi mengandung firedamp (metana) dan/atau debu batu bara mudah terbakar. Group II untuk peralatan di seluruh industri permukaan lain (migas, kimia, farmasi, pangan, dan sebagainya). Setiap Group dibagi lagi menjadi Category yang menyatakan tingkat proteksi:

Group I: Category M1 (tetap aman dan berfungsi meski atmosfer eksplosif hadir — dua tingkat proteksi independen) dan M2 (dapat di-de-energise bila atmosfer eksplosif muncul).

Group II: Category 1 (proteksi sangat tinggi, untuk area di mana atmosfer eksplosif hadir terus-menerus/lama), Category 2 (proteksi tinggi, untuk kemunculan yang mungkin terjadi), dan Category 3 (proteksi normal, untuk kemunculan jarang dan singkat).

Setiap Category diberi imbuhan huruf yang menyatakan jenis atmosfer: “G” untuk Gas/uap/mist dan “D” untuk Dust (debu). Maka penandaan lengkap kategori berbentuk misalnya II 2G (Group II, Category 2, atmosfer gas) atau II 1D (Group II, Category 1, atmosfer debu). Hubungan antara Category dan zona pemakaian dibahas rinci di Part IV; secara ringkas, Category 1 ↔ Zone 0/20, Category 2 ↔ Zone 1/21, dan Category 3 ↔ Zone 2/22.

Untuk membuktikan pemenuhan directive, produsen menempuh conformity assessment procedure yang tingkat ketatnya bergantung pada Category. Semakin tinggi risiko (Category 1), semakin besar keterlibatan pihak ketiga independen (Notified Body). Prosedur ini mengombinasikan modul-modul penilaian:

Tabel 4.2 — Ikhtisar keterlibatan Notified Body menurut Category. Nama modul mengikuti Decision 768/2008/EC, sedangkan Directive 2014/34/EU sendiri merujuk prosedurnya melalui nomor Annex. Detail dapat berbeda untuk peralatan listrik dan non-listrik.

Panduan resmi Komisi Eropa atas Directive 2014/34/EU menyebut prosedur ini dengan nomor Annex. Untuk peralatan listrik Category 2, prosedur yang tersedia adalah Annex III digabung Annex VI, atau Annex III digabung Annex VII, atau Annex IX. Untuk Category 3, panduan menegaskan bahwa directive tidak mensyaratkan sertifikasi oleh Notified Body: produsen menerapkan Annex VIII (internal control of production), menyusun EU declaration of conformity beserta technical documentation, dan produk tidak boleh membawa nomor Notified Body kecuali bila memakai verifikasi satuan menurut Annex IX.

Apa pun Category-nya, produsen wajib menyusun technical documentation (berkas teknis), menerbitkan EU Declaration of Conformity (pernyataan kesesuaian yang mengikat secara hukum), membubuhkan marking yang benar, dan — untuk Category yang mensyaratkan — menyerahkan berkas tipe ke Notified Body. Berkas teknis harus disimpan dan tersedia bagi otoritas pengawas pasar selama periode yang ditentukan (umumnya 10 tahun setelah unit terakhir diproduksi).

#### 4.5  CE Marking dan Penandaan Ex Khusus ATEX

Peralatan yang memenuhi ATEX menyandang CE marking, tanda umum yang menyatakan pemenuhan seluruh directive Uni Eropa yang berlaku pada produk tersebut (bukan hanya ATEX). Bila sebuah Notified Body terlibat dalam pengawasan produksi, nomor identifikasi empat digit Notified Body dicantumkan tepat setelah CE (misalnya CE 0123).

Selain CE, peralatan ATEX membawa simbol Ex khusus — huruf “Ex” di dalam segi enam (hexagon) — yang menandai bahwa produk ditujukan untuk explosive atmosphere. Di belakangnya menyusul kode Equipment Group dan Category, misalnya rangkaian penandaan:

CE 0123  ⬡ II 2G  Ex db IIC T4 Gb

Bagian “CE 0123 ⬡ II 2G” adalah penandaan spesifik ATEX (CE, Notified Body, simbol Ex-hexagon, Group, Category, huruf G/D). Bagian “Ex db IIC T4 Gb” adalah penandaan teknis menurut standar EN/IEC 60079-0 yang menyatakan jenis proteksi, gas group, temperature class, dan Equipment Protection Level.15 Anatomi lengkap setiap elemen penandaan dibahas pada Part VI (Marking, Pemilihan & Instalasi); di sini cukup dipahami bahwa penandaan ATEX menggabungkan lapisan administratif (CE, Category) dengan lapisan teknis (kode Ex 60079).

#### 4.6  Peran Notified Body

Notified Body adalah lembaga penilai kesesuaian yang ditunjuk (notified) oleh negara anggota Uni Eropa kepada Komisi Eropa untuk melaksanakan tugas penilaian pihak ketiga di bawah directive tertentu. Setiap Notified Body memiliki nomor identifikasi empat digit. Dalam kerangka ATEX, peran utamanya mencakup: melakukan EU-Type Examination (memeriksa dan menerbitkan sertifikat bahwa desain tipe memenuhi EHSR), menilai dan mengawasi sistem mutu produksi (untuk Category yang mewajibkan), serta menyimpan berkas teknis yang diserahkan produsen untuk peralatan Category 2 tertentu.

Penting dibedakan: Notified Body adalah entitas ATEX Eropa, sedangkan padanannya dalam skema IECEx disebut ExCB (Ex Certification Body) dan laboratorium ujinya disebut ExTL (Ex Testing Laboratory). Sebuah organisasi (misalnya sebuah lembaga sertifikasi besar) dapat berperan sekaligus sebagai Notified Body ATEX dan ExCB IECEx, tetapi peran hukumnya berbeda pada masing-masing rezim. Keterlibatan Notified Body tidak diperlukan untuk peralatan Category 3 (produsen menyatakan kesesuaian sendiri melalui internal production control), namun tetap wajib untuk Category 1 dan sebagian besar Category 2 listrik.

#### 4.7  Directive 1999/92/EC — Kewajiban Pemberi Kerja

Jika 2014/34/EU membebani produsen, maka 1999/92/EC membebani pemberi kerja yang mengoperasikan tempat kerja dengan potensi explosive atmosphere.16 Directive ini adalah “minimum requirements” untuk keselamatan dan kesehatan pekerja, dan di Inggris diimplementasikan melalui DSEAR (Dangerous Substances and Explosive Atmospheres Regulations). Kewajiban intinya bersifat manajerial dan operasional, bukan tentang desain produk.

Kewajiban utama pemberi kerja di bawah 1999/92/EC meliputi:

Mencegah terbentuknya explosive atmosphere jika memungkinkan; bila tidak, mencegah penyalaannya; dan bila tetap tidak dapat dihindari, membatasi dampak ledakan (hirarki yang selaras dengan Part I).

Melakukan penilaian risiko ledakan (explosion risk assessment) dan mengklasifikasikan area menjadi zona (Zone 0/1/2 untuk gas, Zone 20/21/22 untuk debu) sesuai frekuensi dan durasi kemunculan atmosfer eksplosif.

Memastikan peralatan yang dipasang di tiap zona memiliki Category yang sesuai — di sinilah kedua directive ATEX bertemu: employer memilih peralatan berkategori yang tepat (produk 2014/34/EU) untuk zona hasil klasifikasinya.

Menyusun dan memelihara Explosion Protection Document (EPD) yang mendokumentasikan identifikasi bahaya, klasifikasi zona, tindakan proteksi, serta prosedur kerja aman. EPD dibahas rinci di Part VII.

Menandai titik masuk ke hazardous area dengan tanda peringatan “Ex” (segitiga “EX”), menetapkan prosedur permit-to-work, pelatihan pekerja, serta koordinasi antar-kontraktor di lokasi yang sama.

Perbedaan sudut pandang inilah yang sering menimbulkan kebingungan di lapangan. Produsen bertanggung jawab bahwa sebuah transmitter tekanan “aman jika dipasang di Zone 1”; tetapi keputusan bahwa titik pemasangan memang Zone 1 — dan bahwa perawatan serta prosedur kerjanya benar — adalah tanggung jawab pemberi kerja. Sertifikat ATEX pada produk tidak pernah menggantikan EPD; keduanya adalah dokumen berbeda dengan pemilik kewajiban berbeda.

#### 4.8  Contoh Aplikasi

Sebuah pabrik pelarut di Eropa hendak memasang pompa transfer dan transmitter level pada tangki toluena. Alur ATEX-nya adalah sebagai berikut. Pertama, sebagai employer (1999/92/EC), pabrik melakukan area classification dan menetapkan bagian dalam tangki sebagai Zone 0, area di sekitar nozzle sebagai Zone 1, dan area lantai sekitarnya sebagai Zone 2, lalu mendokumentasikannya dalam EPD. Kedua, procurement memilih peralatan dengan Category yang sesuai: transmitter level untuk antarmuka Zone 0 harus ber-Category 1G (mis. penandaan II 1G Ex ia IIC T4 Ga), sementara pompa di area Zone 1 memerlukan Category 2G. Ketiga, setiap peralatan yang dibeli telah membawa CE marking dan EU Declaration of Conformity dari produsennya (2014/34/EU) — untuk Category 1 dengan keterlibatan Notified Body. Keempat, instalasi mengikuti EN 60079-14 dan seluruh berkas (sertifikat, gambar zona, EPD) disatukan sebagai bukti kepatuhan yang dapat diperiksa otoritas.

#### 4.9  Poin Penting 27,28

ATEX = dua directive. 2014/34/EU mengatur produk (kewajiban produsen), 1999/92/EC mengatur tempat kerja (kewajiban pemberi kerja). Keduanya bertemu di pemilihan Category untuk zona.

Category = tingkat proteksi. Group I (M1/M2) untuk tambang; Group II (1/2/3, dengan huruf G atau D) untuk industri permukaan. Category memetakan ke zona.

CE + Ex-hexagon. CE marking (kadang dengan nomor Notified Body) menandai kepatuhan hukum; simbol Ex-hexagon plus kode Group/Category menandai peruntukan explosive atmosphere.

Notified Body wajib untuk risiko tinggi. Diperlukan untuk Category 1 dan sebagian besar Category 2 listrik; Category 3 boleh self-declaration.

Sertifikat produk ≠ EPD. Sertifikat ATEX pada peralatan tidak menggantikan kewajiban employer menyusun Explosion Protection Document.

Catatan dan Rujukan — Bab 4  Kerangka ATEX (Uni Eropa) (catatan 13–16)

11.  CSA C22.1, Canadian Electrical Code (CEC), Part I — Section 18 dan Annex J: Hazardous Locations.

12.  NFPA 70 (NEC) Article 505, Zone Classification System for Class I Locations.

13.  Directive 2014/34/EU of the European Parliament and of the Council on equipment and protective systems intended for use in potentially explosive atmospheres (ATEX Equipment Directive).

14.  Directive 94/9/EC (ATEX 95) — directive produk ATEX terdahulu, digantikan oleh 2014/34/EU sejak 20 April 2016.

15.  IEC 60079-0, Explosive atmospheres — Part 0: Equipment — General requirements.

16.  Directive 1999/92/EC of the European Parliament and of the Council on minimum requirements for improving the safety and health protection of workers potentially at risk from explosive atmospheres (ATEX Workplace Directive).

Standar lain yang dirujuk pada tabel dan gambar bab ini:

•  EN 1127-1, Explosive atmospheres — Explosion prevention and protection — Part 1: Basic concepts and methodology.

Pustaka pendukung:

•  European Commission (2016). ATEX 2014/34/EU Guidelines, 1st Edition, April 2016 — panduan resmi penerapan Directive 2014/34/EU. [Berkas: 325845468-Atex-2014-34-Eu-Guidelines-2016-First-Edition.pdf]

•  Directive 1999/92/EC — Potentially Explosive Atmosphere, dokumen acuan Komisi Eropa. [Berkas: 161349468-111010-Directiva-ATEX-1999-92-EC-Doc-134-05-E.pdf]

•  Hazardous Areas Technical Guide. [Berkas: 120420138-ATEX.pdf]

•  Kendall, S. A. (Intertek). HazLoc Guide — European Levels of Protection (white paper). [Berkas: 827604483-HazLoc-Guide-European-Levels-of-Protection.pdf]

•  Ravasi, L. (2020). ATEX – IECEx – EAC Ex (webinar, 15 Mei 2020). [Berkas: 639104099-WF-72-slide-showatexiecexeac-exwebinaren.pdf]

•  Marking for Equipment Installed in ATEX Zones (lembar acuan penandaan, 2017). [Berkas: 443286861-po-atex-2017-en.pdf]

•  International Reference Guide to Hazardous Areas. [Berkas: 218758933-International-Reference-Guide-to-Hazardous-Areas.pdf]

•  R. STAHL. Essential Explosion Protection. [Berkas: 695762365-ex-essential-explosion-protection-rstahl.pdf]

### Bab 5  Skema IECEx (Skema Internasional)

#### 5.1  Tujuan Bab

Bab ini menjelaskan IECEx — skema sertifikasi internasional untuk peralatan, jasa, dan personel Ex. Pembaca akan memahami tiga skema penyusun IECEx (Certified Equipment, Certified Service Facilities, dan Certified Persons/CoPC), bagaimana IECEx bersandar pada seri standar IEC 60079, serta perbedaan mendasar antara IECEx yang sukarela-global dan ATEX yang wajib-regional.

#### 5.2  Apa Itu IECEx dan Filosofinya

IECEx (IEC System for Certification to Standards Relating to Equipment for Use in Explosive Atmospheres) adalah sistem penilaian kesesuaian yang dikelola oleh International Electrotechnical Commission (IEC). Tujuannya, sebagaimana dinyatakan dalam dokumen dasar skema, adalah memfasilitasi perdagangan internasional peralatan Ex dengan menghapus kebutuhan sertifikasi nasional berganda, sembari tetap menjaga tingkat keselamatan yang memadai. Prinsipnya sering diringkas sebagai “one certificate, accepted everywhere” — satu sertifikat yang diuji sekali oleh laboratorium terakreditasi, kemudian diakui lintas negara peserta.

Berbeda dari ATEX yang merupakan kewajiban hukum di wilayah Uni Eropa, IECEx bersifat sukarela (voluntary). Tidak ada undang-undang yang memaksa produsen mengikuti IECEx. Namun karena sertifikat IECEx diterima luas dan dapat “dikonversi” menjadi sertifikat nasional di banyak negara, IECEx secara de facto menjadi tulang punggung perdagangan Ex global. Sebuah laporan uji IECEx (ExTR) sering menjadi basis penerbitan sertifikat ATEX, EAC Ex, maupun sertifikat nasional lain, sehingga menghemat pengujian berulang.

Fondasi teknis IECEx adalah kepercayaan terhadap kompetensi laboratorium dan lembaga sertifikasi peserta. Skema menetapkan aturan operasional (Operational Documents/OD), assessment mutual, dan sistem sertifikat daring (Online Certificate System) yang dapat diverifikasi publik. Setiap sertifikat IECEx memiliki nomor unik yang dapat dicek keasliannya di situs resmi IECEx — sebuah fitur anti-pemalsuan yang tidak selalu ada pada rezim lain.

#### 5.3  Struktur Skema IECEx

IECEx bukan skema tunggal, melainkan payung yang menaungi beberapa skema komplementer. Masing-masing menangani objek berbeda: peralatan, fasilitas jasa, personel, dan pelisensian tanda kesesuaian.

Tabel 5.1 — Skema-skema penyusun IECEx dan keluarannya.

Certified Equipment Scheme adalah yang paling dikenal. Alurnya melibatkan pengujian oleh ExTL (Ex Testing Laboratory) yang menghasilkan ExTR (Ex Test Report), penilaian sistem mutu produsen yang menghasilkan QAR (Quality Assessment Report), dan akhirnya penerbitan CoC (Certificate of Conformity) oleh ExCB (Ex Certification Body). Tiga singkatan ini — ExTR, QAR, CoC — adalah tulang punggung dokumentasi produk IECEx. ExTR bersifat portabel: laporan yang sama dapat dipakai berbagai ExCB untuk menerbitkan sertifikat di rezim berbeda.

Certified Persons Scheme (CoPC) menyatakan bahwa seorang individu kompeten menjalankan tugas tertentu di hazardous area. Kompetensi dipecah menjadi “Unit” — misalnya Unit Ex 001 (menerapkan prinsip dasar proteksi di explosive atmosphere), Unit Ex 002/003/004 (memasang, memeriksa, dan memelihara peralatan Ex), dan seterusnya. CoPC menjadi padanan internasional dari skema pelatihan seperti CompEx; keduanya dibahas lebih dalam pada Part VII (Bab Kompetensi Personel).

#### 5.4  Kaitan dengan Seri Standar IEC 60079

IECEx menyatakan kesesuaian terhadap standar teknis, dan standar itu adalah seri IEC 60079. Seri ini adalah pustaka standar internasional yang mengatur setiap aspek peralatan dan instalasi di explosive gas/dust atmosphere. Memahami peta seri ini memudahkan membaca sertifikat mana pun, karena nomor standar yang dirujuk pada sertifikat langsung menunjukkan jenis proteksi dan cakupannya.

Tabel 5.2 — Peta ringkas seri IEC 60079 yang paling sering dirujuk. Rincian tiap metode proteksi dibahas pada Part V, dan klasifikasi area pada Part III. Nomor sub-bagian dapat bertambah seiring revisi; verifikasi ke edisi standar terbaru.

Karena ATEX mengadopsi seri ini sebagai EN 60079 (dengan nomor identik), sebuah peralatan yang lulus IEC 60079 pada dasarnya telah memenuhi persyaratan teknis EN 60079 yang sama. Inilah alasan teknis mengapa ExTR IECEx dapat menjadi basis sertifikat ATEX: keduanya menguji terhadap teks standar yang sebenarnya sama. Perbedaan tinggal pada lapisan administratif (marking Category, keterlibatan Notified Body, dan EU Declaration of Conformity) yang khas ATEX.

#### 5.5  ATEX vs IECEx

Karena keduanya kerap muncul berdampingan pada satu produk, penting memahami perbedaan dan hubungannya. Banyak peralatan Ex modern membawa penandaan ganda ATEX dan IECEx sekaligus.

Tabel 5.3 — Perbandingan ATEX dan IECEx. Keduanya berbagi fondasi teknis IEC/EN 60079 sehingga saling melengkapi, bukan bersaing.

Secara praktis, keduanya bersifat komplementer. Produsen yang menargetkan pasar global biasanya menyertifikasi produk ke IECEx untuk memperoleh ExTR portabel, lalu menggunakan ExTR itu untuk mendapatkan sertifikat ATEX (untuk pasar Eropa), EAC Ex (untuk pasar Eurasia), dan sertifikat nasional lain. Dengan demikian pengujian fisik cukup dilakukan sekali, sementara sertifikasi administratif dilakukan per-wilayah sesuai kebutuhan pasar.

#### 5.6  Contoh Aplikasi

Sebuah produsen transmitter tekanan hendak menjual produknya ke Eropa, Timur Tengah, dan Asia Tenggara. Strateginya: pertama, produk diuji di sebuah ExTL terhadap IEC 60079-0 dan IEC 60079-11 (intrinsic safety), menghasilkan ExTR dan CoC IECEx dengan penandaan Ex ia IIC T4 Ga.17,18 Kedua, ExTR yang sama diserahkan ke Notified Body Eropa untuk menerbitkan sertifikat ATEX dengan penandaan II 1G Ex ia IIC T4 Ga, sehingga produk boleh membawa CE marking. Ketiga, di negara Asia Tenggara yang menerima IECEx, importir cukup merujuk CoC IECEx (kadang dengan pendaftaran nasional ringan). Hasilnya, satu rangkaian pengujian melahirkan akses ke banyak pasar — inti nilai IECEx bagi produsen.

#### 5.7  Poin Penting

IECEx = sukarela tapi global. Skema IEC yang menghapus sertifikasi nasional berganda; prinsipnya “one certificate, accepted everywhere”.

Tiga skema utama. Certified Equipment (produk), Certified Service Facilities (bengkel), dan Certified Persons/CoPC (personel), plus lisensi tanda kesesuaian.

ExTR–QAR–CoC. Rantai dokumen produk IECEx; ExTR bersifat portabel dan menjadi basis sertifikat rezim lain.

Bersandar pada IEC 60079. Standar teknis identik dengan EN 60079 yang dipakai ATEX; perbedaan tinggal lapisan administratif.

Komplementer dengan ATEX. Uji sekali (IECEx), sertifikasi per-wilayah. Banyak produk membawa penandaan ganda ATEX + IECEx.

Catatan dan Rujukan — Bab 5  Skema IECEx (Skema Internasional) (catatan 17–18)

17.  IEC 60079-0, Explosive atmospheres — Part 0: Equipment — General requirements.

18.  IEC 60079-11, Explosive atmospheres — Part 11: Equipment protection by intrinsic safety "i".

Standar lain yang dirujuk pada tabel dan gambar bab ini:

•  IEC 60079-19, Explosive atmospheres — Part 19: Equipment repair, overhaul and reclamation.

•  IEC 60079-1, Explosive atmospheres — Part 1: Equipment protection by flameproof enclosures "d".

•  IEC 60079-2, Explosive atmospheres — Part 2: Equipment protection by pressurized enclosure "p".

•  IEC 60079-5, Explosive atmospheres — Part 5: Equipment protection by powder filling "q".

•  IEC 60079-7, Explosive atmospheres — Part 7: Equipment protection by increased safety "e".

•  IEC 60079-15, Explosive atmospheres — Part 15: Equipment protection by type of protection "n".

•  IEC 60079-10-1, Explosive atmospheres — Part 10-1: Classification of areas — Explosive gas atmospheres.

•  IEC 60079-14, Explosive atmospheres — Part 14: Electrical installations design, selection and erection.

•  IEC 60079-17, Explosive atmospheres — Part 17: Electrical installations inspection and maintenance.

•  IEC 60079-25, Explosive atmospheres — Part 25: Intrinsically safe electrical systems.

•  Directive 2014/34/EU of the European Parliament and of the Council on equipment and protective systems intended for use in potentially explosive atmospheres (ATEX Equipment Directive).

•  Directive 1999/92/EC of the European Parliament and of the Council on minimum requirements for improving the safety and health protection of workers potentially at risk from explosive atmospheres (ATEX Workplace Directive).

•  ISO 80079-36, Explosive atmospheres — Part 36: Non-electrical equipment for explosive atmospheres — Basic method and requirements.

Pustaka pendukung:

•  Munro, J. IECEx TCD-02 — An IECEx Assessor’s Guide, Ed. 8.1. IEC System for Certification to Standards Relating to Equipment for Use in Explosive Atmospheres (IECEx System). [Berkas: 562187460-IECEx-TCD-02-Scheme-Ed-8-1.pdf]

•  Syed Mohamed, S. F. (2020). Introduction to Basic Hazardous Area (Ex) — Basic to IECEx Requirements. [Berkas: 475076704-000-BASIC-TO-IECEx-REQUIREMENTS-AUGUST-2020.pdf]

•  Ravasi, L. (2020). ATEX – IECEx – EAC Ex (webinar, 15 Mei 2020). [Berkas: 639104099-WF-72-slide-showatexiecexeac-exwebinaren.pdf]

•  International Reference Guide to Hazardous Areas. [Berkas: 218758933-International-Reference-Guide-to-Hazardous-Areas.pdf]

•  Isaksen, S. (2015). IECEx CoPC Unit Ex 001 — Examination Preparation (sesuai IECEx OD 504 v3.0). [Berkas: 836463206-IECEx-CoPC-Unit-001-Version-1-2015-acc-to-OD-504-v3-0.pdf]

### Bab 6  HazLoc Amerika Utara (NEC & CEC)

#### 6.1  Tujuan Bab

Bab ini menjelaskan pendekatan Amerika Utara terhadap hazardous (classified) locations — disingkat HazLoc. Pembaca akan memahami sistem tradisional Class/Division, sistem Group A–G, sistem temperature code, serta sistem Zone yang diadopsi belakangan melalui NEC Article 505 (gas) dan 506 (dust).19 Bab ini juga menyoroti perbedaan filosofis antara pendekatan Amerika Utara dan pendekatan IEC/ATEX, karena inilah sumber banyak kesalahan pemilihan peralatan pada proyek lintas-benua.

#### 6.2  Kerangka Regulasi: NEC, CEC, dan Peran NRTL

Di Amerika Serikat, aturan instalasi listrik di hazardous location diatur oleh NEC (National Electrical Code, yaitu NFPA 70), khususnya Article 500–506.20 Di Kanada berlaku CEC (Canadian Electrical Code) yang secara struktur serupa.21 NEC bukan hukum dengan sendirinya, tetapi diadopsi menjadi hukum oleh yurisdiksi negara bagian/kota, dan penegakannya dilakukan oleh Authority Having Jurisdiction (AHJ) — pejabat inspeksi setempat.

Berbeda dari model Eropa yang mengandalkan sertifikat tipe dan Declaration of Conformity, model Amerika Utara mengandalkan konsep listing dan labelling oleh NRTL (Nationally Recognized Testing Laboratory) — misalnya UL, FM, CSA. Peralatan harus “listed” untuk lokasi tertentu, dan pemilihan/instalasinya harus mengikuti NEC. Filosofi historis Amerika Utara juga menekankan metode robust seperti explosion-proof enclosure dan sistem seal/conduit, berbeda dari kecenderungan Eropa yang lebih beragam metode proteksinya.

#### 6.3  Sistem Class dan Division

Sistem tradisional Amerika Utara mengklasifikasikan lokasi berdasarkan dua sumbu: Class (jenis material berbahaya) dan Division (kemungkinan kehadiran material tersebut). Ini berbeda dari IEC yang menggunakan Zone untuk gas dan debu secara paralel.

Tabel 6.1 — Tiga Class dalam sistem NEC 500. Perhatikan bahwa serat (fibres/flyings) memperoleh Class tersendiri (Class III) — sebuah kategori yang tidak memiliki padanan Zone langsung di sistem IEC.

Setiap Class dibagi menjadi dua Division menurut kemungkinan kehadiran atmosfer berbahaya:

Division 1: material berbahaya hadir dalam kondisi operasi normal, atau sering hadir karena perbaikan/pemeliharaan/kebocoran, atau dapat hadir akibat kegagalan peralatan yang sekaligus menyalakannya. Setara gabungan Zone 0 + Zone 1.

Division 2: material berbahaya biasanya terkurung dan hanya hadir akibat kecelakaan/kegagalan tak lazim; atau hadir hanya di sekitar area Division 1. Setara Zone 2.

Perbedaan penting: sistem Division hanya mengenal dua tingkat, sementara sistem Zone mengenal tiga (0/1/2). Konsekuensinya, Division 1 mencakup dua situasi yang di IEC dipisahkan menjadi Zone 0 dan Zone 1. Inilah mengapa pemetaan Division ↔ Zone tidak sepenuhnya satu-lawan-satu dan memerlukan kehati-hatian (lihat Bab 7).

#### 6.4  Sistem Group A–G

Alih-alih menggunakan gas group IIA/IIB/IIC seperti IEC, NEC 500 memakai huruf Group A–D untuk gas/uap dan E–G untuk debu.22 Pengelompokan didasarkan pada sifat penyalaan material — terutama MESG (Maximum Experimental Safe Gap) dan MIC ratio untuk gas, serta konduktivitas dan sifat debu untuk Class II.

Tabel 6.2 — Group A–G NEC 500 dan padanan indikatif ke gas/dust group IEC. Perhatikan urutan “terbalik”: Group A (asetilena) di NEC adalah yang paling mudah menyala, sedangkan di IEC yang paling ketat adalah IIC. Padanan bersifat indikatif dan harus diverifikasi per-material.

Titik rawan kesalahan: seorang engineer yang terbiasa IEC dapat keliru menganggap “Group A” sebagai yang paling ringan (karena A biasanya “kelas satu/paling aman”), padahal justru sebaliknya — Group A (asetilena) adalah yang paling sulit dilindungi. Perbedaan konvensi penamaan inilah yang membuat tabel padanan lintas-rezim di Bab 7 menjadi krusial.

Sistem temperature code Amerika Utara lebih rinci daripada kelas T1–T6 IEC. Selain enam kelas utama, NEC menambahkan sub-kode yang memberi tingkatan antara, sehingga peralatan dapat ditandai lebih presisi terhadap suhu penyalaan zat tertentu. Tabel berikut adalah daftar lengkap menurut Table 500.8(C).

#### 6.5  Temperature Code (T-Code)

Sama seperti IEC, HazLoc membatasi suhu permukaan maksimum peralatan agar tidak menyalakan atmosfer. Namun sistem T-code Amerika Utara lebih rinci: selain T1–T6, terdapat sub-pembagian seperti T2A, T2B, T2C, T2D, T3A, T3B, T3C. Suhu acuannya identik dengan IEC untuk tingkat utama.

Tabel 6.3A— Temperature code menurut NEC Table 500.8(C). Enam kode utama (T1, T2, T3, T4, T5, T6) berpadanan langsung dengan temperature class IEC; delapan sub-kode sisanya khas NEC dan tidak memiliki padanan IEC. Peralatan bertanda sub-kode tidak boleh diperlakukan setara dengan kode utama di atasnya — T2C misalnya berarti 230 °C, bukan 300 °C.

Satu titik temu yang berguna: NEC mendefinisikan combustible dust sebagai partikel debu berukuran 500 mikron atau kurang — batas yang sama persis dengan combustible dust pada IEC 60079-10-2 yang dibahas di Bab 10. Meskipun kerangka klasifikasinya berbeda, definisi materialnya selaras. Sehingga dapat kita ilustrasikan pada tabel dibawah.

Tabel 6.3B — Temperature code. Kolom kiri (T1–T6) berlaku universal (IEC & NEC); kolom kanan adalah subdivisi tambahan khas NEC 500. Suhu permukaan maksimum peralatan harus lebih rendah daripada ignition temperature gas yang relevan.

#### 6.6  Sistem Zone: NEC Article 505 dan 506

Sejak edisi 1996, NEC memperkenalkan alternatif “Zone system” yang menyelaraskan Amerika Utara dengan IEC. Article 505 mengatur Zone untuk gas (Zone 0/1/2) dan Article 506 mengatur Zone untuk debu (Zone 20/21/22). Sistem ini opsional — perancang boleh memilih pendekatan Division tradisional atau pendekatan Zone — namun keduanya tidak boleh dicampur sembarangan pada area yang sama tanpa pertimbangan khusus.

Dalam sistem Zone Amerika Utara, penandaan peralatan memakai awalan “AEx” (bukan sekadar “Ex”) untuk menandai bahwa peralatan disertifikasi menurut standar Amerika untuk Zone, misalnya:

Class I, Zone 1, AEx db IIC T4 Gb

Perhatikan bahwa penandaan ini menggabungkan unsur Amerika (Class I, Zone 1) dengan unsur bergaya IEC (AEx db IIC T4 Gb, memakai gas group IIC dan temperature class T4). NEC 505 juga mengadopsi gas group IIA/IIB/IIC ala IEC ketika menggunakan sistem Zone, berbeda dari Group A–D pada sistem Division. Selain itu, NEC Article 501.1 mengizinkan peralatan ber-rating Zone dipasang di lokasi Class I Division 2 — sebuah jembatan praktis antar-sistem.23

#### 6.7  Division vs Zone: Perbandingan

Tabel 6.4 — Sistem Division vs Zone di Amerika Utara. Sistem Zone diperkenalkan agar praktik Amerika Utara lebih mudah diselaraskan dengan sertifikasi IEC/ATEX yang dominan secara global.

#### 6.8  Contoh Pembacaan Marking HazLoc

Marking Division: “Class I, Division 1, Groups C & D, T4”. Dibaca: peralatan cocok untuk lokasi dengan gas/uap mudah terbakar (Class I), yang hadir dalam operasi normal (Division 1), dari kelompok etilena (C) dan propana/pelarut umum (D), dengan suhu permukaan maksimum tidak melebihi 135 °C (T4). Karena Division 1, peralatan ini juga sah dipakai di Division 2 untuk group yang sama.

Marking Zone: “Class I, Zone 0, AEx ia IIC T4 Ga”. Dibaca: peralatan untuk gas (Class I), boleh di area yang atmosfer eksplosifnya hadir terus-menerus (Zone 0), disertifikasi menurut standar Amerika sistem Zone (AEx), dengan proteksi intrinsic safety level tertinggi (ia), gas group IIC (mencakup hidrogen/asetilena), temperature class T4, dan EPL Ga. Ini adalah penandaan yang hampir identik strukturnya dengan IECEx/ATEX, hanya berbeda awalan Class I dan “AEx”.

#### 6.9  Poin Penting

Dua sumbu: Class & Division. Class I (gas), II (debu), III (serat); Division 1 (sering hadir) dan Division 2 (jarang). Division 1 ≈ Zone 0 + Zone 1.

Group A–D (gas), E–G (debu). Urutan “terbalik” dari IEC: Group A (asetilena) paling sulit dilindungi, setara IIC. Sumber kesalahan umum lintas-rezim.

T-code lebih rinci. Selain T1–T6, ada subdivisi T2A–T2D, T3A–T3C khas NEC 500. Nilai suhu tingkat utama sama dengan IEC.

Sistem Zone (NEC 505/506). Opsional, menyelaraskan Amerika Utara dengan IEC; penandaan memakai awalan “AEx” dan gas group IIA/IIB/IIC.

Basis listing/NRTL. Kepatuhan dibuktikan lewat listing NRTL (UL/FM/CSA) + instalasi sesuai NEC yang ditegakkan AHJ, bukan Declaration of Conformity.

Catatan dan Rujukan — Bab 6  HazLoc Amerika Utara (NEC & CEC) (catatan 19–23)

19.  NFPA 70 (NEC) Article 505, Zone Classification System for Class I Locations.

20.  NFPA 70, National Electrical Code (NEC). National Fire Protection Association.

21.  CSA C22.1, Canadian Electrical Code (CEC), Part I — Section 18 dan Annex J: Hazardous Locations.

22.  NFPA 70 (NEC) Article 500–504, Hazardous (Classified) Locations — sistem Class/Division.

23.  NFPA 70 (NEC) Article 501, Class I Locations.

Pustaka pendukung:

•  Holt, M. Interpreting the Requirements of Articles 500–516 of the NEC — komentar berilustrasi atas NFPA 70. [Berkas: 331652584-norma-NEC-500.pdf dan 368752157-Interpreting-the-Requirements-of-Articles-500-516-of-the-NEC-en-518452.pdf]

•  Interpreting the Requirements of Articles 500–516 of the NEC. [Berkas: 368752157-Interpreting-the-Requirements-of-Articles-500-516-of-the-NEC-en-518452.pdf]

•  Hazardous Locations eBook — Guide to Explosive Atmospheres. [Berkas: 378007194-Hazloc-eBook.pdf]

•  Intertek. HazLoc FAQs. [Berkas: 827603352-HazLoc-FAQs.pdf]

•  International Reference Guide to Hazardous Areas. [Berkas: 218758933-International-Reference-Guide-to-Hazardous-Areas.pdf]

•  Hazardous Areas Technical Guide. [Berkas: 120420138-ATEX.pdf]

### Bab 7  Peta Standar Global & Kesetaraannya

#### 7.1  Tujuan Bab

Bab ini menyatukan Bab 4–6 ke dalam satu peta global. Pembaca akan melihat bagaimana seri IEC 60079 menjadi fondasi bersama, bagaimana rezim regional (ATEX, NEC/CEC, EAC Ex) dan skema nasional (PESO, INMETRO, KCs, TIIS/Japan-Ex, PCEC) berdiri di atasnya, serta — yang paling praktis — bagaimana menerjemahkan satu penandaan ke rezim lain melalui tabel padanan Zone↔Division dan Category↔EPL.24

#### 7.2  IEC 60079 sebagai Fondasi Bersama dan Adopsi EN

Titik pusat peta standar global adalah seri IEC 60079 (dan pasangan debunya yang kini terintegrasi, sebelumnya seri IEC 61241). Hampir semua rezim modern mengadopsi atau menyelaraskan diri dengannya. Uni Eropa mengadopsinya nyaris kata-per-kata sebagai EN 60079 (harmonised standards di bawah ATEX). Standar debu Eropa yang lebih lama (EN 61241-10/-14) telah digantikan oleh EN 60079-10-2/-14 seiring penyatuan seri. Karena teks teknisnya sama, sebuah peralatan yang memenuhi IEC 60079 pada dasarnya telah memenuhi persyaratan teknis EN 60079.

Konsekuensi penting: perbedaan antar-rezim sebagian besar bersifat administratif (siapa yang menilai, marking apa yang dibubuhkan, dokumen kepatuhan apa yang wajib), bukan perbedaan prinsip keselamatan teknis. Memahami satu fondasi ini menyederhanakan seluruh peta global menjadi variasi di sekeliling inti yang sama.

#### 7.3  NEC/CEC — Amerika Utara

Sebagaimana dibahas di Bab 6, Amerika Serikat (NEC/NFPA 70) dan Kanada (CEC) mempertahankan sistem Class/Division tradisional sekaligus menyediakan jalur Zone (NEC 505/506) yang selaras IEC.25,26 Ini menjadikan Amerika Utara sebagai wilayah “dua-sistem”: proyek lama dan banyak instalasi migas darat masih memakai Division, sementara proyek baru dan multinasional cenderung memakai Zone agar kompatibel dengan sertifikasi global.

#### 7.4  EAC Ex — Uni Ekonomi Eurasia

EAC Ex adalah rezim wajib untuk negara-negara EAEU (Eurasian Economic Union) — Rusia, Belarus, Kazakhstan, Armenia, Kyrgyzstan. Ia menggantikan sistem GOST-R lama. Dasar teknisnya adalah Technical Regulation TR CU 012/2011 (“On safety of equipment for work in explosive environments”), dan standar harmonisnya (seri GOST R yang berbasis IEC 60079). Secara filosofi, EAC Ex dapat dipandang sebagai “ATEX-nya kawasan Eurasia”: wajib, berbasis IEC 60079, dengan marking dan sertifikat sendiri (EAC mark). ExTR IECEx umumnya dapat menjadi basis penerbitan sertifikat EAC Ex, sehingga jalur konversi tersedia.

#### 7.5  Skema Nasional Utama

Di luar tiga rezim besar, banyak negara mempertahankan skema sertifikasi nasional — sebagian besar berbasis IEC 60079 namun dengan pendaftaran/sertifikat lokal yang wajib. Ringkasannya:

Tabel 7.1 — Ikhtisar skema nasional utama. Hampir semua berbasis IEC 60079 dan banyak yang menerima ExTR IECEx sebagai basis sertifikasi. Persyaratan pendaftaran, masa berlaku, dan marking berbeda per-negara; verifikasi ke regulator setempat sebelum ekspor.

#### 7.6  Tabel Padanan Lintas-Rezim

Berikut tabel padanan yang paling sering dibutuhkan di lapangan. Perlu ditegaskan bahwa padanan ini bersifat praktis/indikatif, bukan kesetaraan hukum otomatis: sebuah sertifikat di satu rezim tidak serta-merta berlaku di rezim lain tanpa proses konversi/pendaftaran. Namun tabel ini membantu menerjemahkan tingkat keselamatan agar pemilihan peralatan tidak keliru.

Padanan tingkat area — gas:

Tabel 7.2 — Padanan Zone gas ↔ Category ↔ EPL ↔ Division. Perhatikan: Division 1 mencakup baik Zone 0 maupun Zone 1, sehingga pemetaan Division→Zone bersifat “satu-ke-banyak”.

Padanan tingkat area — debu:

Tabel 7.3 — Padanan Zone debu ↔ Category ↔ EPL ↔ Division (Class II).

Padanan gas group & dust group:

Tabel 7.4 — Padanan gas/dust group IEC ↔ NEC. Perhatikan pembalikan arah: IIC (paling ketat di IEC) memetakan ke Group A & B (paling ketat di NEC). Padanan indikatif; verifikasi per-material.

Padanan penandaan proteksi Amerika (sistem Zone) memakai awalan “AEx”, sedangkan sistem Division memakai frasa deskriptif (mis. “explosion-proof”, “dust-ignition-proof”, “intrinsically safe”). Temperature class T1–T6 berlaku universal di seluruh rezim, sehingga T-code adalah salah satu elemen yang paling mudah diterjemahkan lintas-sistem.

#### 7.7  Strategi Multi-Approval dan Konversi via ExTR

Bagi produsen dan integrator yang beroperasi lintas-benua, strategi paling efisien adalah menjadikan IECEx sebagai poros. Produk diuji sekali di ExTL untuk menghasilkan ExTR, lalu ExTR itu dipakai sebagai basis penerbitan sertifikat ATEX (Eropa), EAC Ex (Eurasia), PESO (India), INMETRO (Brasil), dan sebagainya — masing-masing menambahkan lapisan administratif dan marking lokal tanpa mengulang pengujian fisik. Banyak peralatan Ex premium karenanya membawa penandaan majemuk pada satu label (mis. ATEX + IECEx + IECEx-based national), yang harus dibaca per-baris sesuai rezim tujuan pemakaian.

Bagi pemilik fasilitas (end user), pelajaran praktisnya: selalu cocokkan sertifikat peralatan dengan rezim yang berlaku di lokasi instalasi. Peralatan bersertifikat ATEX tidak otomatis sah dipasang di fasilitas yang tunduk pada NEC Division di Amerika Serikat, dan sebaliknya. Ketika ragu, gunakan tabel padanan untuk memverifikasi bahwa tingkat keselamatan (Category/EPL/Division), group, dan temperature class benar-benar cocok dengan hasil area classification setempat.

#### 7.8  Poin Penting

IEC 60079 = fondasi bersama. Hampir semua rezim (EN/ATEX, NEC 505, EAC Ex, skema nasional) menyelaraskan diri dengannya; perbedaan utama bersifat administratif.

Tiga rezim besar + banyak skema nasional. ATEX (Eropa), NEC/CEC (Amerika Utara), EAC Ex (Eurasia); plus PESO, INMETRO, KCs, TIIS/Japan-Ex, PCEC, UKEX.

Padanan itu indikatif, bukan otomatis sah. Zone 0/1/2 ↔ Category 1/2/3 ↔ EPL Ga/Gb/Gc ↔ Division 1/1/2. Division 1 mencakup Zone 0 + Zone 1.

Waspadai pembalikan group. IIC (paling ketat IEC) ↔ Group A/B (paling ketat NEC). Kekeliruan penamaan adalah sumber salah-pilih peralatan.

ExTR sebagai poros multi-approval. Uji sekali via IECEx, terbitkan banyak sertifikat regional. End user tetap wajib mencocokkan sertifikat dengan rezim lokasi instalasi.

Catatan dan Rujukan — Bab 7  Peta Standar Global & Kesetaraannya (catatan 24–32)

24.  CSA C22.1, Canadian Electrical Code (CEC), Part I — Section 18 dan Annex J: Hazardous Locations.

25.  NFPA 70, National Electrical Code (NEC). National Fire Protection Association.

26.  NFPA 70 (NEC) Article 505, Zone Classification System for Class I Locations.

27.  Directive 2014/34/EU of the European Parliament and of the Council on equipment and protective systems intended for use in potentially explosive atmospheres (ATEX Equipment Directive).

28.  Directive 1999/92/EC of the European Parliament and of the Council on minimum requirements for improving the safety and health protection of workers potentially at risk from explosive atmospheres (ATEX Workplace Directive).

29.  IEC 60079-10-1, Explosive atmospheres — Part 10-1: Classification of areas — Explosive gas atmospheres.

30.  IEC 60079-10-2, Explosive atmospheres — Part 10-2: Classification of areas — Explosive dust atmospheres.

31.  IEC 60079-0, Explosive atmospheres — Part 0: Equipment — General requirements.

32.  IEC 60079-14, Explosive atmospheres — Part 14: Electrical installations design, selection and erection.

Standar lain yang dirujuk pada tabel dan gambar bab ini:

•  NFPA 70 (NEC) Article 500–504, Hazardous (Classified) Locations — sistem Class/Division.

Pustaka pendukung:

•  International Reference Guide to Hazardous Areas. [Berkas: 218758933-International-Reference-Guide-to-Hazardous-Areas.pdf]

•  Ravasi, L. (2020). ATEX – IECEx – EAC Ex (webinar, 15 Mei 2020). [Berkas: 639104099-WF-72-slide-showatexiecexeac-exwebinaren.pdf]

•  Kendall, S. A. (Intertek). HazLoc Guide — European Levels of Protection (white paper). [Berkas: 827604483-HazLoc-Guide-European-Levels-of-Protection.pdf]

•  Intertek. HazLoc FAQs. [Berkas: 827603352-HazLoc-FAQs.pdf]

•  Hazardous Locations eBook — Guide to Explosive Atmospheres. [Berkas: 378007194-Hazloc-eBook.pdf]

PART III

Klasifikasi Area Berbahaya (Hazardous Area Classification)

Bab 8  ·  Prinsip Hazardous Area Classification

Bab 9  ·  Klasifikasi Zona Gas 0, 1, 2

Bab 10  ·  Klasifikasi Zona Debu 20, 21, 22

Bab 11  ·  Metodologi & Dokumentasi Klasifikasi

Rujukan standar: IEC 60079-10-1 (gas) · IEC 60079-10-2 (debu) · IEC 60079-0 · IEC 60079-14 29,30,31,32

Untuk engineer instrumentasi/listrik, HSE, operasi & pemeliharaan, procurement, dan tim teknis perangkat Ex

## PART III — KLASIFIKASI AREA BERBAHAYA

Part I telah membangun fondasi sains ledakan (segitiga ledakan, LEL/UEL, ignition temperature, MIE, flash point, MESG) dan strategi pencegahannya, sementara Part II menata kerangka regulasi global — ATEX, IECEx, dan HazLoc Amerika Utara — beserta padanan antarsistem. Part III menautkan keduanya ke dalam satu kegiatan rekayasa yang paling menentukan dalam desain instalasi Ex: klasifikasi hazardous area (hazardous area classification). Klasifikasi inilah yang menerjemahkan pertanyaan “di mana dan seberapa sering atmosfer eksplosif dapat muncul?” menjadi peta zona yang, pada gilirannya, menentukan kelas peralatan, metode proteksi, dan praktik instalasi yang diuraikan pada Part IV–VI.

Bagian ini terdiri dari empat bab. Bab 8 menetapkan prinsip dan definisi lintas standar serta kerangka IEC 60079-10-1 (gas dan uap) dan IEC 60079-10-2 (debu). Bab 9 membahas zona gas 0, 1, dan 2 secara mendalam — mencakup source of release, grade of release, dan peran ventilasi terhadap tipe serta luas (extent) zona. Bab 10 membahas zona debu 20, 21, dan 22 beserta Dust Hazard Analysis. Bab 11 menyatukan semuanya menjadi metodologi kerja langkah demi langkah, area classification drawing, dan studi kasus industri lengkap dengan contoh penentuan extent.

### Bab 8 — Prinsip Hazardous Area Classification

#### 8.1 Tujuan Bab

Bab ini bertujuan menjelaskan apa yang dimaksud dengan hazardous area classification, mengapa kegiatan ini menjadi titik awal seluruh desain proteksi ledakan, bagaimana definisi hazardous area dirumuskan secara konsisten di berbagai standar dan regulasi (ATEX, IECEx/IEC, dan HazLoc), serta kerangka standar mana yang mengatur metode klasifikasi untuk gas/uap dan untuk debu. Setelah menyelesaikan bab ini, pembaca diharapkan memahami logika dasar yang menghubungkan sifat zat mudah terbakar, sumber pelepasan, dan probabilitas kehadiran atmosfer eksplosif menjadi sebuah zona yang terdefinisi.

#### 8.2 Definisi Area Berbahaya Lintas Standar

Hazardous area (area berbahaya) didefinisikan sebagai area di mana atmosfer eksplosif (explosive atmosphere) hadir, atau dapat diperkirakan hadir, dalam jumlah yang menuntut tindakan pencegahan khusus untuk konstruksi, instalasi, dan penggunaan peralatan. Definisi ini konsisten di seluruh dunia meskipun kalimatnya berbeda-beda antar standar. Yang perlu dipahami sejak awal adalah bahwa “berbahaya” di sini bermakna spesifik: bukan bahaya mekanik, listrik, atau toksik, melainkan semata-mata potensi terbentuknya atmosfer gas, uap, kabut (mist), atau debu yang dapat terbakar bila bertemu sumber penyalaan.

Explosive atmosphere sendiri didefinisikan (IEC 60079-0) sebagai campuran zat mudah terbakar dalam bentuk gas, uap, kabut, atau debu dengan udara, pada kondisi atmosfer, yang setelah penyalaan pembakarannya merambat ke seluruh campuran yang belum terbakar.33 Frasa “pada kondisi atmosfer” penting: klasifikasi standar mengasumsikan tekanan sekitar 0,8–1,1 bar dan suhu −20 °C hingga +60 °C; di luar rentang ini (mis. proses bertekanan tinggi atau kriogenik) diperlukan pertimbangan tambahan.

Beberapa rumusan definisi yang lazim ditemui di lapangan:

Tabel 8.1 — Rumusan definisi hazardous area pada beberapa standar/regulasi (verifikasi kalimat persis ke edisi standar terkini).

#### 8.3 Peran Klasifikasi dalam Desain Keselamatan

Hazardous area classification adalah fondasi dari seluruh strategi proteksi sekunder (menghindari sumber penyalaan) yang telah diperkenalkan pada Part I. Logikanya sederhana namun menentukan: kita tidak dapat memilih peralatan yang aman sebelum mengetahui seberapa sering dan seberapa lama atmosfer eksplosif dapat hadir di suatu titik. Klasifikasi menghasilkan “peta probabilitas” yang kemudian menjadi masukan wajib bagi sejumlah keputusan desain di hilir:

Pemilihan Equipment Protection Level (EPL) dan kategori peralatan — zona menentukan EPL minimum (Ga/Gb/Gc untuk gas, Da/Db/Dc untuk debu) sebagaimana dibahas pada Part IV.

Pemilihan metode proteksi — mis. Ex ia atau Ex d untuk Zona 0/1, Ex n atau Ex ic untuk Zona 2 (Part V).

Aturan instalasi dan inspeksi — IEC 60079-14 (desain & instalasi) dan IEC 60079-17 (inspeksi) mensyaratkan dokumen klasifikasi area sebagai acuan (Part VI).34,35

Prosedur kerja dan izin kerja panas (hot work permit), penempatan sumber penyalaan tetap, rute kendaraan, serta tata letak bangunan dan HVAC.

Karena begitu banyak keputusan bergantung padanya, klasifikasi area yang salah akan merambat menjadi kesalahan sistemik: peralatan yang under-rated dipasang di zona yang lebih berbahaya dari yang diperkirakan, atau sebaliknya biaya membengkak karena over-classification. Standar menegaskan bahwa klasifikasi harus dikerjakan oleh tim multidisiplin — process/plant engineer, instrument/electrical engineer, dan personel keselamatan — bukan oleh satu orang, dan harus ditinjau ulang setiap ada Management of Change.

#### 8.4 Kerangka Standar: IEC 60079-10-1 dan IEC 60079-10-2

Metodologi klasifikasi area dibakukan terutama oleh dua bagian dari seri IEC 60079, yang di Eropa diadopsi sebagai EN 60079-10-1/-10-2 dan menjadi acuan pemenuhan ATEX:

Tabel 8.2 — Standar inti yang membentuk kerangka klasifikasi area.

Di ranah HazLoc Amerika Utara, kegiatan setara dilakukan dengan panduan rekomendasi praktik seperti API RP 500 (sistem Class/Division) dan API RP 505 (sistem Zone), serta NFPA 497 untuk gas/uap dan NFPA 499 untuk debu.36,37,38,39 Prinsip dasarnya sama — mengaitkan probabilitas kehadiran atmosfer eksplosif dengan klasifikasi lokasi — namun terminologi (Division 1/2 vs Zone) dan sebagian pendekatan kuantitatifnya berbeda, sebagaimana diuraikan pada Part II.

#### 8.5 Prinsip Tiga Langkah Klasifikasi

Terlepas dari standar yang dipakai, setiap latihan klasifikasi area menjawab tiga pertanyaan berurutan. Prinsip tiga langkah ini menjadi kerangka pikir yang dipakai konsisten pada Bab 9–11:

Diagram 8.1 — Alur berpikir tiga langkah klasifikasi area

Langkah pertama mengidentifikasi setiap source of release — titik fisik dari mana gas, uap, atau debu dapat lepas ke atmosfer (flens, seal pompa, vent, sampling point, dsb.). Langkah kedua menilai grade of release (continuous, primary, atau secondary) dan memodifikasinya dengan ventilasi untuk menetapkan tipe zona. Langkah ketiga menentukan extent — seberapa jauh zona meluas dari sumber. Bab 9 membedah masing-masing langkah untuk gas.

Poin Penting

Hazardous area classification menerjemahkan probabilitas kehadiran atmosfer eksplosif menjadi peta zona yang menjadi masukan wajib bagi pemilihan peralatan, metode proteksi, dan aturan instalasi.

Definisi hazardous area konsisten lintas standar: area di mana atmosfer eksplosif hadir/mungkin hadir dalam jumlah yang menuntut tindakan pencegahan khusus.

Metodologi dibakukan oleh IEC 60079-10-1 (gas/uap) dan IEC 60079-10-2 (debu); HazLoc memakai API RP 500/505 dan NFPA 497/499.40,41

Klasifikasi dikerjakan oleh tim multidisiplin dan wajib ditinjau ulang pada setiap Management of Change.

Catatan dan Rujukan — Bab 8 (catatan 33–41)

33.  IEC 60079-0, Explosive atmospheres — Part 0: Equipment — General requirements.

34.  IEC 60079-14, Explosive atmospheres — Part 14: Electrical installations design, selection and erection.

35.  IEC 60079-17, Explosive atmospheres — Part 17: Electrical installations inspection and maintenance.

36.  API RP 500, Recommended Practice for Classification of Locations for Electrical Installations at Petroleum Facilities Classified as Class I, Division 1 and Division 2. American Petroleum Institute.

37.  API RP 505, Recommended Practice for Classification of Locations for Electrical Installations at Petroleum Facilities Classified as Class I, Zone 0, Zone 1 and Zone 2. American Petroleum Institute.

38.  NFPA 497, Recommended Practice for the Classification of Flammable Liquids, Gases, or Vapors and of Hazardous (Classified) Locations for Electrical Installations in Chemical Process Areas.

39.  NFPA 499, Recommended Practice for the Classification of Combustible Dusts and of Hazardous (Classified) Locations for Electrical Installations in Chemical Process Areas.

40.  IEC 60079-10-1, Explosive atmospheres — Part 10-1: Classification of areas — Explosive gas atmospheres.

41.  IEC 60079-10-2, Explosive atmospheres — Part 10-2: Classification of areas — Explosive dust atmospheres.

Standar lain yang dirujuk pada tabel dan gambar bab ini:

•  Directive 1999/92/EC of the European Parliament and of the Council on minimum requirements for improving the safety and health protection of workers potentially at risk from explosive atmospheres (ATEX Workplace Directive).

•  NFPA 70 (NEC) Article 500–504, Hazardous (Classified) Locations — sistem Class/Division.

Pustaka pendukung:

•  BS EN 60079-10-1:2015, Explosive atmospheres — Part 10-1: Classification of areas — Explosive gas atmospheres. British Standards Institution. [Berkas: 710477444-BS-60079-10-1-2015-Explosive-atmospheres-Part-10-1.pdf]

•  Bozek, A. IEC 60079-10-1 — Classification of Areas: Explosive Atmospheres. IEEE PCIC. [Berkas: 744219049-iec-60079-10-1-ieee-pcic-proracuni.pdf]

•  Rowe, V. Class I Area Classification — A Practical Approach (API RP 505 Style). [Berkas: 354654267-Area-Classification.pdf]

•  Das, D. Hazardous Area Classification. Indian Oil Corporation Limited. [Berkas: 429619322-Hazardous-Area-Classification.pdf]

•  Nikam, D. K. Hazardous Area Classification (HAC). [Berkas: 17219479-Hazardous-Area-Classification.pdf]

•  Hazardous Area Classification & Equipment Selection (materi presentasi). [Berkas: 564305563-Hazardous-Area-Classification-Equipment-Selection.pdf]

•  Hazardous Area Classification (materi presentasi pengantar). [Berkas: 293976168-Hazardous-Area-Classification-pdf.pdf]

•  Singh, A. K. (2023). Explosion-Proof Equipment in Hazardous Area. Springer. [Berkas: 823211066-Arvind-Kumar-Singh-Explosion-Proof-Equipment-in-Hazardous-Area-Springer-2023.pdf]

### Bab 9 — Klasifikasi Zona Gas: Zona 0, 1, 2

#### 9.1 Tujuan Bab

Bab ini menjelaskan sistem tiga zona untuk gas dan uap (Zona 0, 1, 2) berdasarkan frekuensi dan durasi kehadiran atmosfer gas eksplosif, memperkenalkan konsep source of release dan grade of release sebagai penentu tipe zona, menunjukkan bagaimana ventilasi memodifikasi tipe maupun luas (extent) zona, dan menyajikan pendekatan penentuan extent lengkap dengan diagram zona di sekitar sumber pelepasan.

#### 9.2 Definisi Zona 0, 1, 2 — Frekuensi & Durasi

Sistem zona IEC/ATEX mengklasifikasikan area gas berdasarkan seberapa sering dan seberapa lama atmosfer gas eksplosif diperkirakan hadir. Semakin sering/lama kehadirannya, semakin ketat zona dan semakin tinggi tingkat proteksi peralatan yang dituntut.

Tabel 9.1 — Definisi zona gas. *Angka jam/tahun bersifat indikatif sebagai alat bantu penilaian, bukan ambang hukum; verifikasi ke IEC 60079-10-1 edisi terkini.

Frasa kunci pada tiap definisi menentukan kelasnya. “Terus-menerus/periode panjang/sering” → Zona 0; contoh khas: ruang uap di dalam tangki penyimpanan atap tetap, bagian dalam bejana proses tertutup, dan interior peralatan yang selalu berisi cairan mudah menguap. “Kemungkinan pada operasi normal” → Zona 1; contoh: sekitar seal pompa yang lepas berkala, dekat vent atau sampling point yang rutin dibuka, ruang pompa cairan mudah terbakar dengan ventilasi terbatas. “Tidak mungkin pada operasi normal, dan singkat bila terjadi” → Zona 2; contoh: sekeliling flens perpipaan yang hanya bocor pada kegagalan, area di luar batas Zona 1 sebagai sabuk penyangga.

Perlu ditekankan bahwa area non-berbahaya (non-hazardous / safe area) adalah kategori keempat yang sah dan sering menjadi hasil klasifikasi: area yang, karena tidak ada source of release atau karena ventilasi sangat memadai, tidak diperkirakan mengandung atmosfer eksplosif. Tujuan klasifikasi bukan menjadikan seluruh pabrik “berbahaya”, melainkan membatasi zona seminimal dan seakurat mungkin.

#### 9.3 Source of Release dan Grade of Release

Source of release adalah titik atau lokasi dari mana gas, uap, atau cairan mudah terbakar dapat lepas ke atmosfer sehingga berpotensi membentuk atmosfer eksplosif. Setiap item proses yang berisi zat mudah terbakar dan memiliki kemungkinan lepas — flens, valve, seal pompa dan kompresor, vent, drain, sampling connection, open surface — diperlakukan sebagai source of release dan dinilai satu per satu.

Setiap source of release diberi grade of release menurut seberapa mungkin dan seberapa sering ia melepaskan zat. Grade inilah — sebelum dimodifikasi oleh ventilasi — yang menjadi penentu utama tipe zona:

Tabel 9.2 — Grade of release dan tipe zona yang dihasilkannya (IEC 60079-10-1).

Perhatikan pemetaan alaminya: continuous → Zona 0, primary → Zona 1, secondary → Zona 2. Namun pemetaan ini adalah titik awal, bukan hasil akhir. Ventilasi dapat menurunkan tipe zona (mis. dari yang seharusnya Zona 1 menjadi Zona 2, atau menjadi non-hazardous bila ventilasi sangat kuat dan tersedia andal), atau — bila ventilasi buruk — dapat menaikkannya. Inilah inti pembahasan Sub-bab 9.4.

#### 9.4 Peran Ventilasi: Degree of Dilution & Availability

Ventilasi — pergerakan udara yang mengencerkan dan menghalau zat yang lepas — adalah faktor tunggal paling berpengaruh yang memodifikasi hasil grade of release. IEC 60079-10-1 menilai pengaruh ini melalui dua atribut: degree of dilution (seberapa efektif udara mengencerkan pelepasan) dan availability of ventilation (seberapa andal ventilasi itu tersedia).42 Perlu dicatat bahwa edisi 2015 mengganti istilah edisi sebelumnya "degree of ventilation" beserta notasi VH/VM/VL menjadi "degree of dilution" dengan tingkat high, medium, dan low; dokumen lama dan materi pelatihan yang masih memakai notasi VH/VM/VL merujuk pada edisi 2008.

Degree of dilution dibagi menjadi tiga tingkat yang mencerminkan kemampuan mengendalikan konsentrasi dan mempersingkat persistensi awan:

Tabel 9.3 — Degree of dilution dan pengaruhnya (IEC 60079-10-1).

Availability of ventilation menilai keandalan ketersediaan ventilasi tersebut sepanjang waktu:

Tabel 9.4 — Availability of ventilation (IEC 60079-10-1).

Kombinasi grade of release, degree, dan availability menghasilkan tipe zona akhir. IEC 60079-10-1 menyajikan matriks penentuan tipe zona; ringkasan praktisnya sebagai berikut (nilai NE = non-hazardous/negligible extent, angka menunjukkan tipe zona hasil):

Tabel 9.5 — Tipe zona menurut grade of release, degree of dilution, dan availability of ventilation. Disusun mengikuti Table D.1 IEC 60079-10-1:2015. Notasi "NE" berarti zona yang secara teoretis berukuran dapat diabaikan (negligible extent) pada kondisi normal; tanda "+" berarti "dikelilingi oleh".

Tiga koreksi penting terhadap pemahaman yang lazim keliru terbaca dari tabel ini. Pertama, pada degree of dilution high, hasilnya non-hazardous untuk ketiga tingkat availability — good, fair, maupun poor — bukan hanya ketika availability baik. Kedua, degree of dilution low selalu memperketat klasifikasi dan tidak pernah memperlonggarnya: primary grade menjadi Zona 1 atau bahkan Zona 0, dan secondary grade menjadi Zona 1 bahkan Zona 0. Menuliskan secondary grade dengan dilution low sebagai Zona 2 adalah kesalahan yang berakibat under-classification. Ketiga, pada degree of dilution medium, availability yang menurun tidak mengubah zona inti melainkan menambahkan zona pengelilingnya — Zona 0 dikelilingi Zona 2 pada availability fair, dan dikelilingi Zona 1 pada availability poor.

Satu persyaratan bersifat "shall" perlu diingat saat menilai availability: pada ruang tertutup yang hanya berventilasi alami, availability of ventilation tidak pernah boleh dinilai good. Untuk ventilasi buatan, availability good umumnya menuntut adanya blower cadangan yang menyala otomatis saat terjadi kegagalan; sebagai alternatif, bila kegagalan ventilasi secara otomatis menghentikan proses sehingga pelepasan tidak mungkin terjadi, klasifikasi boleh dinilai pada kondisi ventilasi bekerja dan availability boleh dianggap good.

Implikasi rekayasanya jelas: ventilasi yang baik adalah cara paling ekonomis untuk mengecilkan atau menghilangkan zona. Ruang terbuka dengan angin bebas (ventilasi alami High/Good) sering menghasilkan hanya Zona 2 berdiameter kecil di sekitar flens, sementara ruang tertutup dengan ventilasi buruk dapat menjadikan seluruh ruangan Zona 1 bahkan Zona 0. Karena itu, keputusan meletakkan peralatan di dalam gedung, memasang forced ventilation, atau membuka dinding memiliki konsekuensi langsung terhadap kelas — dan biaya — peralatan Ex yang harus dibeli.

#### 9.5 Penentuan Extent (Luas) Zona

Setelah tipe zona ditetapkan, langkah berikutnya adalah menentukan extent — jarak fisik zona meluas dari source of release. Extent dipengaruhi oleh laju pelepasan, sifat zat (densitas uap relatif terhadap udara, LEL), geometri, dan kecepatan ventilasi. IEC 60079-10-1 menyediakan pendekatan berbasis perhitungan laju pelepasan dan volume terventilasi; standar dan panduan industri (mis. IGEM, EI 15, API RP 505) juga menyediakan gambar generik (point-source diagrams) untuk konfigurasi lazim.43

Kerangka perhitungan extent pada IEC 60079-10-1 mengikuti rantai logika berikut:

1. Hitung laju pelepasan massa Wg (kg/s) dari geometri lubang, tekanan proses, dan sifat zat.

2. Konversikan ke laju pelepasan volumetrik zat murni, lalu ke laju volumetrik minimum udara segar yang dibutuhkan untuk mengencerkan di bawah LEL: (dV/dt)min ≈ Wg / (k · LEL · ρ), dengan k faktor keselamatan (mis. 0,25–0,5) dan ρ densitas zat.

3. Bandingkan dengan laju ventilasi aktual dan jumlah pergantian udara (C, air changes per second) untuk memperoleh volume hipotetis Vz — volume di mana konsentrasi rata-rata berada di atas LEL.

4. Nilai Vz, bersama waktu persistensi t, menetapkan degree of dilution (Vz kecil & t singkat → High) dan memberi indikasi extent zona.

Contoh penentuan extent (ilustratif). Sebuah flens perpipaan propana (C₃H₈) di area terbuka dinilai sebagai secondary grade of release. Diketahui/diasumsikan: laju pelepasan massa akibat kebocoran kecil Wg = 2,5 × 10⁻³ kg/s; LEL propana ≈ 2,0 %vol ≈ 0,038 kg/m³; densitas uap propana ρ ≈ 1,86 kg/m³ (lebih berat dari udara); faktor keselamatan k = 0,25; kecepatan angin uw = 0,5 m/s. Maka laju volumetrik udara minimum untuk pengenceran:

Diagram 9.1 — Perhitungan pengenceran & estimasi extent (ilustratif)

Karena Wg kecil dan ventilasi terbuka mampu menyediakan jauh lebih dari 0,263 m³/s, degree of dilution tergolong Medium–High; hasilnya adalah Zona 2 dengan extent terbatas (orde 1–3 m), memanjang ke arah bawah karena densitas uap propana lebih besar dari udara. Angka ini bersifat ilustratif; extent final harus dihitung dengan persamaan lengkap dan koefisien pada IEC 60079-10-1 edisi berlaku atau ditetapkan dari gambar generik yang sesuai, dan perlu diverifikasi oleh engineer klasifikasi bersertifikat.

#### 9.6 Diagram Zona di Sekitar Source of Release

Bentuk zona di sekitar sumber sangat dipengaruhi densitas uap relatif terhadap udara. Uap lebih berat (propana, bensin, uap heavy hydrocarbon) mengalir turun dan menggenang di lekukan/parit; uap lebih ringan (hidrogen, metana, amonia) naik dan berkumpul di bawah atap/langit-langit. Diagram berikut menggambarkan pola khas sebuah primary source (mis. vent) di area terbuka:

Diagram 9.2 — Zona konsentris di sekitar source of release (skematik)

Zona bersifat konsentris hanya sebagai penyederhanaan; pada praktiknya arah angin dominan, halangan fisik (dinding, tanggul), dan lubang drainase mendistorsi bentuknya. Karena itu area classification drawing (Bab 11) menampilkan extent sebagai kontur, bukan lingkaran sempurna, dan menyertakan potongan vertikal (elevation) untuk memperlihatkan perilaku densitas uap.

Poin Penting

Zona gas ditetapkan dari frekuensi/durasi kehadiran atmosfer: Zona 0 (terus-menerus/sering), Zona 1 (sesekali pada operasi normal), Zona 2 (tidak pada operasi normal & singkat).

Grade of release memetakan awal: continuous→Zona 0, primary→Zona 1, secondary→Zona 2 — sebelum dimodifikasi ventilasi.

Ventilasi (degree High/Medium/Low dan availability Good/Fair/Poor) dapat menurunkan tipe & extent zona, bahkan menjadikan non-hazardous, atau menaikkannya bila buruk.

Extent dihitung dari laju pelepasan, LEL, densitas, dan ventilasi; bentuk zona dipengaruhi densitas uap dan wajib diverifikasi ke IEC 60079-10-1 atau gambar generik yang sesuai.

Catatan dan Rujukan — Bab 9 (catatan 42–43)

42.  IEC 60079-10-1, Explosive atmospheres — Part 10-1: Classification of areas — Explosive gas atmospheres.

43.  API RP 505, Recommended Practice for Classification of Locations for Electrical Installations at Petroleum Facilities Classified as Class I, Zone 0, Zone 1 and Zone 2. American Petroleum Institute.

Pustaka pendukung:

•  BS EN 60079-10-1:2015, Explosive atmospheres — Part 10-1: Classification of areas — Explosive gas atmospheres. British Standards Institution. [Berkas: 710477444-BS-60079-10-1-2015-Explosive-atmospheres-Part-10-1.pdf]

•  Bozek, A. IEC 60079-10-1 — Classification of Areas: Explosive Atmospheres. IEEE PCIC. [Berkas: 744219049-iec-60079-10-1-ieee-pcic-proracuni.pdf]

•  Rowe, V. Class I Area Classification — A Practical Approach (API RP 505 Style). [Berkas: 354654267-Area-Classification.pdf]

•  Das, D. Hazardous Area Classification. Indian Oil Corporation Limited. [Berkas: 429619322-Hazardous-Area-Classification.pdf]

•  Hazardous Area Classification & Equipment Selection (materi presentasi). [Berkas: 564305563-Hazardous-Area-Classification-Equipment-Selection.pdf]

•  Zone and ATEX (materi presentasi; berkas hasil pindaian tanpa lapisan teks). [Berkas: 251698506-Zone-and-ATEX-pdf.pdf]

### Bab 10 — Klasifikasi Zona Debu: Zona 20, 21, 22

#### 10.1 Tujuan Bab

Bab ini menjelaskan klasifikasi area untuk combustible dust (debu mudah terbakar) menurut IEC 60079-10-2: definisi Zona 20, 21, dan 22 serta padanannya dengan zona gas, perbedaan mendasar antara dust cloud (awan debu) dan dust layer (lapisan debu) beserta bahaya masing-masing, kerangka Dust Hazard Analysis (DHA), dan contoh penerapan pada industri yang menangani debu.44

#### 10.2 Definisi Zona 20, 21, 22 & Padanan Zona Gas

Debu diklasifikasikan dengan logika frekuensi/durasi yang sama seperti gas, tetapi dengan penomoran seri 20-an dan objek bahaya berupa awan debu di udara (bukan gas). Padanannya lurus: Zona 20 ↔ Zona 0, Zona 21 ↔ Zona 1, Zona 22 ↔ Zona 2.

Sebelum masuk ke zona, dua definisi dasar IEC 60079-10-2 perlu ditegakkan karena keduanya menentukan apakah suatu material masuk lingkup standar ini. Combustible dust adalah partikel padat halus berukuran nominal 500 µm atau kurang, yang dapat melayang di udara, mengendap karena beratnya sendiri, dapat terbakar atau membara di udara, dan dapat membentuk campuran eksplosif dengan udara pada tekanan atmosfer dan suhu normal. Combustible flyings adalah partikel padat termasuk serat berukuran nominal lebih besar dari 500 µm. Istilah dust dalam standar mencakup keduanya. Batas 500 µm inilah yang kelak memisahkan dust group IIIA dari IIIB dan IIIC pada Bab 12.

Perlu dicatat pula bahwa kondisi atmosfer acuan untuk debu dinyatakan berbeda dari gas. IEC 60079-10-2 memakai acuan 101,3 kPa dan 20 °C, dengan variasi tekanan dan suhu di atas maupun di bawah acuan itu diperbolehkan sepanjang pengaruhnya terhadap sifat eksplosif debu dapat diabaikan. Bandingkan dengan rentang 0,8–1,1 bar dan −20 °C hingga +60 °C yang dipakai untuk gas pada Bab 8.

Satu konsep lagi yang khas debu adalah hybrid mixture — campuran zat mudah terbakar dalam wujud berbeda, yaitu gas atau uap bersama debu di udara. Contoh yang diberikan standar adalah campuran metana, debu batu bara, dan udara. Hybrid mixture menuntut perhatian tersendiri karena kehadiran gas dapat menurunkan energi yang dibutuhkan untuk menyalakan awan debu, sehingga penilaian yang hanya memakai data debu murni bisa meleset.

Tabel 10.1 — Definisi zona debu dan padanannya dengan zona gas (IEC 60079-10-2).

Contoh khas: bagian dalam peralatan yang selalu berisi awan debu (mixer, mill, filter/dust collector, silo saat pengisian) cenderung Zona 20; sekeliling titik transfer dan pengantongan yang menghasilkan awan pada operasi normal cenderung Zona 21; area sekitar peralatan yang hanya berdebu pada kegagalan atau saat pembersihan, atau di luar batas Zona 21, cenderung Zona 22.

Satu catatan penting menyertai definisi Zona 22 pada standar: potensi terbentuknya awan debu eksplosif yang berasal dari lapisan debu juga harus diperhitungkan. Artinya penetapan zona tidak boleh hanya menimbang awan yang terbentuk langsung dari source of release, melainkan juga kemungkinan lapisan yang telah mengendap terangkat kembali menjadi awan. Standar juga mengingatkan bahwa source of release yang kecil namun terus-menerus pun, seiring waktu, mampu membentuk lapisan debu yang berbahaya.

#### 10.3 Dust Cloud vs Dust Layer

Perbedaan paling penting antara bahaya debu dan gas adalah kehadiran dua mekanisme bahaya sekaligus: awan (cloud) yang dapat meledak, dan lapisan (layer) yang dapat menyala di permukaan panas serta — yang lebih berbahaya — dapat terangkat kembali (re-entrainment) menjadi awan sekunder.

Tabel 10.2 — Perbandingan bahaya awan debu dan lapisan debu.

Fenomena secondary explosion menjadikan debu sangat berbahaya: ledakan primer kecil (mis. di dalam sebuah alat) menimbulkan gelombang tekanan yang mengangkat lapisan debu yang telah mengendap di lantai, balok, dan struktur, membentuk awan besar yang lalu tersulut oleh api ledakan primer. Ledakan sekunder inilah yang biasanya menimbulkan korban dan kerusakan struktur terbesar. Karena itu housekeeping (pengendalian akumulasi lapisan debu) diperlakukan sebagai kendali keselamatan berperingkat tinggi, bukan sekadar kebersihan; IEC 60079-10-2 secara eksplisit mengaitkan ketebalan lapisan dan kualitas housekeeping dengan penetapan zona dan penandaan suhu.

Konsekuensi lain: peralatan Ex untuk debu harus menahan masuknya debu (ingress) dan membatasi suhu permukaan agar berada aman di bawah suhu penyalaan baik awan maupun lapisan. Penandaan suhu untuk debu menggunakan nilai suhu aktual (mis. T 120 °C), bukan kelas T1–T6 gas, dan aturan umum menetapkan margin terhadap suhu penyalaan lapisan dengan ketebalan referensi tertentu (lihat Part IV).

#### 10.4 Dust Hazard Analysis (DHA)

Dust Hazard Analysis (DHA) adalah kajian sistematis untuk mengidentifikasi dan mengendalikan bahaya kebakaran, kilas api (flash fire), dan ledakan debu pada suatu fasilitas dan prosesnya. Di ranah Amerika Utara, DHA diwajibkan oleh NFPA 652 (standar payung combustible dust) serta standar sektor NFPA 61 (pertanian/pangan), NFPA 654 (kimia), dan lainnya; di ranah EU/IEC, kajian setara terintegrasi dalam Explosion Risk Assessment dan Explosion Protection Document (EPD) yang dibahas pada Part VII.45,46 Meski instrumennya berbeda nama, keluarannya saling melengkapi klasifikasi area debu.

Elemen inti sebuah DHA mencakup:

Identifikasi material — menentukan apakah debu tergolong combustible/explosible melalui data uji (Kst, Pmax, MIE, MEC, suhu penyalaan awan & lapisan).

Pemetaan proses — mengidentifikasi setiap titik di mana debu ditangani, dihasilkan, atau dapat terakumulasi (source of release debu).

Evaluasi skenario — kebakaran, flash fire, ledakan primer di dalam alat, dan ledakan sekunder akibat lapisan.

Penilaian kecukupan kendali — pencegahan (pengendalian ignition, inertisasi, housekeeping) dan proteksi (venting ledakan, suppression, isolation, containment).

Rencana tindakan & tinjauan berkala — DHA adalah dokumen hidup, ditinjau ulang secara periodik dan pada setiap perubahan proses.

Hasil DHA menjadi masukan langsung bagi klasifikasi zona debu IEC 60079-10-2 dan bagi penetapan Equipment Protection Level serta metode proteksi peralatan di area debu.

#### 10.5 Contoh Industri Penanganan Debu

Tabel 10.3 — Contoh industri, jenis debu, dan zona khas.

Debu logam patut diperhatikan khusus: banyak diantaranya konduktif (grup IIIC) dan memiliki MIE sangat rendah, sehingga menuntut kewaspadaan ekstra terhadap sumber penyalaan elektrostatik dan kualitas ingress protection peralatan.

Poin Penting

Zona debu 20/21/22 berpadanan dengan zona gas 0/1/2 dan ditetapkan dari frekuensi/durasi kehadiran awan debu.

Bahaya debu bersifat ganda: awan (ledakan) dan lapisan (kebakaran permukaan + sumber awan sekunder); ledakan sekunder umumnya paling merusak.

Housekeeping dan pengendalian ketebalan lapisan adalah kendali keselamatan berperingkat tinggi, bukan sekadar kebersihan.

Dust Hazard Analysis (NFPA 652/61/654) atau Explosion Risk Assessment (EU) menjadi masukan bagi klasifikasi IEC 60079-10-2 dan pemilihan peralatan Da/Db/Dc.

Catatan dan Rujukan — Bab 10 (catatan 44–46)

44.  IEC 60079-10-2, Explosive atmospheres — Part 10-2: Classification of areas — Explosive dust atmospheres.

45.  NFPA 652, Standard on the Fundamentals of Combustible Dust.

46.  NFPA 654, Standard for the Prevention of Fire and Dust Explosions from the Manufacturing, Processing, and Handling of Combustible Particulate Solids.

Pustaka pendukung:

•  IEC 60079-10-2:2015, Explosive atmospheres — Part 10-2: Classification of areas — Explosive dust atmospheres (redline version). International Electrotechnical Commission. [Berkas: 809618221-IEC-60079-10-2-2015.pdf]

•  Singh, A. K. (2023). Explosion-Proof Equipment in Hazardous Area. Springer. [Berkas: 823211066-Arvind-Kumar-Singh-Explosion-Proof-Equipment-in-Hazardous-Area-Springer-2023.pdf]

•  Linström, H.-J. Basic Concepts for Explosion Protection. [Berkas: 193650475-Basic-Concepts-for-Explosion-Protection.pdf]

•  Kumar, H. Safety in Instrumentation & Control Systems, Unit 1. [Berkas: 886653684-Document-From-Hemanth-s-Kumar.pdf]

•  IESSA. Hazardous Area Course Notes. [Berkas: 793764224-Iessa-Haz-Course-Notes.pdf]

•  R. STAHL. Essential Explosion Protection. [Berkas: 695762365-ex-essential-explosion-protection-rstahl.pdf]

•  Hazardous Areas Technical Guide. [Berkas: 120420138-ATEX.pdf]

### Bab 11 — Metodologi & Dokumentasi Klasifikasi

#### 11.1 Tujuan Bab

Bab ini menyatukan prinsip Bab 8–10 menjadi prosedur kerja praktis: langkah demi langkah dari identifikasi source of release hingga dokumentasi; isi dan cara membaca sebuah area classification drawing; serta studi kasus industri (kilang, SPBU, dan tangki penyimpanan) yang dilengkapi contoh penentuan extent. Tujuannya memberi pembaca kerangka yang dapat langsung diterapkan dan diaudit.

#### 11.2 Metodologi Langkah demi Langkah

Latihan klasifikasi area yang baik mengikuti urutan terstruktur berikut, konsisten dengan IEC 60079-10-1/-10-2:47

Diagram 11.1 — Alur kerja klasifikasi area (8 langkah)

Dua prinsip menyertai alur ini. Pertama, konservatif namun tidak berlebihan: bila data meragukan, ambil asumsi yang lebih aman, tetapi hindari over-classification yang membebani biaya tanpa manfaat keselamatan. Kedua, jejak keputusan (basis of classification) wajib dicatat — setiap zona harus dapat ditelusuri ke sumber, grade, ventilasi, dan referensi gambar/perhitungan yang dipakai, agar dapat diaudit dan ditinjau ulang.

#### 11.3 Area Classification Drawing

Area classification drawing (gambar klasifikasi area) adalah keluaran utama yang mengkomunikasikan hasil klasifikasi kepada semua disiplin. Sebuah set gambar yang lengkap umumnya memuat:

Denah (plan view) memperlihatkan kontur zona (0/1/2 atau 20/21/22) di sekitar tiap source of release, dengan legenda arsiran/warna baku.

Potongan (elevation/section) memperlihatkan perilaku vertikal zona sesuai densitas uap (turun untuk uap berat, naik untuk uap ringan).

Tabel/register source of release: nomor sumber, deskripsi, zat, grade, ventilasi, tipe zona, extent, dan referensi perhitungan/gambar generik.

Data pendukung: gas/dust group, temperature class yang dituntut, flash point, batas area (battery limit), dan asumsi/kondisi khusus.

Legenda, revisi, tanggal, serta pengesahan oleh personel yang kompeten (lihat Part VII tentang kompetensi).

Konvensi grafis yang lazim (mengacu praktik IEC/EI 15): Zona 0/20 diarsir paling padat (mis. hitam/silang penuh), Zona 1/21 arsir sedang, dan Zona 2/22 arsir tipis atau garis putus-putus. Warna dan pola harus dijelaskan dalam legenda dan konsisten di seluruh proyek.

Diagram 11.2 — Skema area classification drawing (denah)

#### 11.4 Studi Kasus & Contoh Penentuan Extent

Kasus A — Vent tangki atap-tetap (fixed-roof tank) berisi bensin. Ruang uap di dalam tangki adalah continuous grade → Zona 0. Vent di atap melepas uap pada pengisian/pengosongan (thermal & filling breathing) → primary grade → Zona 1 di sekitar mulut vent, dengan Zona 2 sebagai sabuk buffer di luarnya. Karena uap bensin lebih berat dari udara, zona meluas menurun di sisi luar tangki dan dapat menggenang di dalam tanggul (bund). Praktik lazim (EI 15): Zona 1 dalam radius beberapa meter dari vent dan Zona 2 hingga radius lebih besar, dengan tinggi zona di atas atap dan penurunan ke area bund; nilai persis mengikuti gambar generik EI 15/API RP 505.48

Kasus B — Dispenser SPBU (fuel dispensing). Titik pengisian nozzle dan area sekitar dispenser adalah kombinasi source primer dan sekunder. Praktik umum: bagian dalam badan dispenser dan area sangat dekat nozzle diklasifikasikan Zona 1, dikelilingi Zona 2 dengan radius tertentu (tipikal orde 4–5 m secara horizontal dari titik pengisian dan ketinggian rendah di atas permukaan, karena uap bensin lebih berat dari udara), dan sumur/rongga (pit) di bawah permukaan diperlakukan Zona 1 karena uap berat berkumpul. Nilai radius eksak mengacu pada standar/regulasi setempat (mis. EI 15, NFPA 30A) dan perlu diverifikasi.

Kasus C — Ruang pompa cairan mudah terbakar dalam gedung berventilasi buruk. Seal pompa adalah primary grade. Di ruang terbuka ini akan menjadi Zona 1 kecil dikelilingi Zona 2. Namun di dalam gedung tertutup dengan ventilasi Low/Poor, awan bertahan dan tidak terencerkan; sesuai matriks Tabel 9.5, tipe zona dapat naik sehingga seluruh ruangan menjadi Zona 1. Ini mengilustrasikan pengaruh ventilasi: solusi rekayasa yang lazim adalah memasang forced ventilation dengan availability memadai untuk menurunkannya kembali ke Zona 2 dan menekan biaya peralatan.

Contoh penentuan extent kuantitatif (ilustratif) — Kasus B. Untuk source sekunder di dispenser dengan asumsi laju pelepasan uap bensin Wg = 1,0 × 10⁻³ kg/s, LEL ≈ 1,4 %vol ≈ 0,046 kg/m³, k = 0,25:

Diagram 11.3 — Estimasi extent dispenser SPBU (ilustratif)

#### 11.5 Dokumentasi & Pemeliharaan Klasifikasi

Klasifikasi area bukan dokumen sekali jadi. Ia harus dipelihara sebagai bagian dari sistem manajemen keselamatan proses:

Tabel 11.1 — Paket dokumentasi klasifikasi area.

Integrasikan pemeliharaan klasifikasi dengan HAZOP dan Management of Change: setiap penambahan sumber, perubahan zat, modifikasi ventilasi/HVAC, atau perubahan tata letak berpotensi menggeser batas zona dan karena itu menuntut peninjauan ulang gambar, register, dan EPD.

Poin Penting

Metodologi klasifikasi mengikuti 8 langkah: kumpulkan data → identifikasi sumber → grade → ventilasi → tipe zona → extent → dokumentasi → review.

Area classification drawing (denah + potongan) plus register source of release dan basis of classification adalah keluaran yang dapat diaudit.

Studi kasus kilang/SPBU/tangki menunjukkan bahwa densitas uap dan kualitas ventilasi menentukan bentuk, extent, dan bahkan tipe zona.

Klasifikasi adalah dokumen hidup: terintegrasi dengan EPD, HAZOP, dan Management of Change, serta wajib ditinjau ulang pada setiap perubahan.

Catatan dan Rujukan — Bab 11 (catatan 47–49)

47.  IEC 60079-10-1, Explosive atmospheres — Part 10-1: Classification of areas — Explosive gas atmospheres.

48.  API RP 505, Recommended Practice for Classification of Locations for Electrical Installations at Petroleum Facilities Classified as Class I, Zone 0, Zone 1 and Zone 2. American Petroleum Institute.

49.  IEC 60079-0, Explosive atmospheres — Part 0: Equipment — General requirements.

Pustaka pendukung:

•  Singh, A. K. (2023). Explosion-Proof Equipment in Hazardous Area. Springer. [Berkas: 823211066-Arvind-Kumar-Singh-Explosion-Proof-Equipment-in-Hazardous-Area-Springer-2023.pdf]

•  Linström, H.-J. Basic Concepts for Explosion Protection. [Berkas: 193650475-Basic-Concepts-for-Explosion-Protection.pdf]

•  Kumar, H. Safety in Instrumentation & Control Systems, Unit 1. [Berkas: 886653684-Document-From-Hemanth-s-Kumar.pdf]

•  IESSA. Hazardous Area Course Notes. [Berkas: 793764224-Iessa-Haz-Course-Notes.pdf]

•  R. STAHL. Essential Explosion Protection. [Berkas: 695762365-ex-essential-explosion-protection-rstahl.pdf]

•  Hazardous Areas Technical Guide. [Berkas: 120420138-ATEX.pdf]

PART IV & V

Klasifikasi Zat & Peralatan  ·  Metode Proteksi

Bab 12  ·  Klasifikasi Gas & Debu (Gas & Dust Groups)

Bab 13  ·  Kelas Suhu (Temperature Class)

Bab 14  ·  Kategori Peralatan & Equipment Protection Level (EPL)

Bab 15  ·  Ikhtisar Metode Proteksi

Bab 16  ·  Metode Berbasis Kurungan / Isolasi

Bab 17  ·  Metode Berbasis Pencegahan Percikan

Bab 18  ·  Intrinsic Safety — Ex i (Fokus Khusus)

Rujukan standar: IEC 60079-0 · -1 · -2 · -5 · -6 · -7 · -11 · -15 · -18 · -25 · -26 · -14 49

Untuk engineer instrumentasi/listrik, HSE, operasi & pemeliharaan, procurement, dan tim teknis perangkat Ex.

## PART IV — KLASIFIKASI ZAT & PERALATAN

Part III telah menetapkan dimana atmosfer eksplosif dapat muncul dan seberapa sering — melalui pembagian zona gas (0/1/2) dan zona debu (20/21/22). Namun mengetahui zona saja belum cukup untuk memilih peralatan yang benar. Dua pertanyaan berikutnya harus dijawab: zat apa yang hadir (seberapa mudah ia menyala, dan pada suhu berapa), serta seberapa andal peralatan harus tetap aman. Part IV menjawab keduanya melalui tiga kerangka klasifikasi yang saling terkait: klasifikasi zat berdasarkan gas group dan dust group (Bab 12), klasifikasi berdasarkan suhu melalui temperature class (Bab 13), dan klasifikasi tingkat keandalan proteksi peralatan melalui kategori ATEX dan Equipment Protection Level (EPL) (Bab 14).

Ketiga kerangka ini adalah 'tata bahasa' yang membentuk marking peralatan Ex. Setiap kode pada pelat nama — misalnya II 2G Ex db IIC T4 Gb — merupakan gabungan langsung dari zona (Part III), gas group, temperature class, dan EPL yang dibahas di sini, ditambah metode proteksi (Part V). Menguasai Part IV berarti mampu membaca separuh dari sebuah marking dan memahami mengapa peralatan tertentu boleh atau tidak boleh dipasang di suatu area. Pembacaan marking utuh langkah demi langkah dibahas pada Part VI (lihat Bab 19).

### Bab 12 — Klasifikasi Gas & Debu (Gas & Dust Groups)

#### 12.1 Tujuan Bab

Bab ini bertujuan menjelaskan cara zat mudah menyala dikelompokkan menurut karakteristik penyalaannya, mengapa pengelompokan itu penting bagi pemilihan peralatan, dan bagaimana batas antar-grup ditentukan secara kuantitatif melalui parameter fisik seperti MESG (Maximum Experimental Safe Gap) dan MIC ratio (Minimum Igniting Current ratio). Setelah membaca bab ini, pembaca dapat menentukan gas group (IIA/IIB/IIC, serta Group I untuk tambang) dan dust group (IIIA/IIIB/IIIC) untuk suatu aplikasi, memahami hubungan hierarki antar-grup, dan mengaitkannya ke kesesuaian peralatan Ex.

#### 12.2 Mengapa Zat Dikelompokkan

Tidak semua gas dan uap sama mudahnya menyala, dan tidak semua peralatan proteksi sama efektifnya terhadap semua zat. Metode proteksi tertentu bekerja dengan cara yang bergantung pada sifat fisik zat. Sebagai contoh, proteksi flameproof (Ex d) mengandalkan celah sempit pada sambungan selungkup untuk mendinginkan gas hasil ledakan sehingga tidak menyalakan atmosfer di luar; celah yang aman untuk propana ternyata terlalu lebar (berbahaya) untuk hidrogen. Demikian pula proteksi intrinsic safety (Ex i) membatasi energi rangkaian di bawah energi penyalaan minimum (Minimum Ignition Energy, MIE) zat — dan MIE hidrogen jauh lebih rendah daripada MIE propana.

Karena itu, agar peralatan yang disertifikasi pada satu zat dapat digunakan secara sahih untuk zat lain, zat-zat dikelompokkan berdasarkan kesamaan perilaku penyalaannya. Sebuah peralatan diuji dan disertifikasi untuk suatu grup, lalu berlaku untuk semua zat dalam grup tersebut (dan grup yang lebih mudah diproteksi). Pengelompokan ini dibakukan pada IEC 60079-0 (persyaratan umum) dengan data zat pada IEC 60079-20-1 (data karakteristik material untuk klasifikasi gas dan uap).50,51

#### 12.3 Group I, Group II, Group III

Standar IEC/EN 60079 membagi peralatan Ex ke dalam tiga kelompok utama menurut lingkungan penggunaannya:

Group I — peralatan untuk tambang bawah tanah yang rentan terhadap firedamp (metana tambang) dan/atau debu batubara. Group I memiliki persyaratan tambahan (mis. ketahanan terhadap debu batubara dan pembatasan suhu permukaan lebih ketat karena adanya lapisan debu batubara).

Group II — peralatan untuk atmosfer gas dan uap di industri permukaan (surface industries) selain tambang: migas, petrokimia, farmasi, dan sejenisnya. Group II dibagi lagi menjadi IIA, IIB, IIC.

Group III — peralatan untuk atmosfer debu (dust) di industri permukaan. Group III dibagi menjadi IIIA, IIIB, IIIC. (Group III diperkenalkan untuk menggantikan pendekatan lama yang memakai penandaan gas group untuk debu.)

Penting dicatat: peralatan Group II tidak otomatis cocok untuk Group I, dan sebaliknya, karena persyaratan uji dan konstruksinya berbeda. Sebagian besar isi handbook ini berfokus pada Group II dan Group III yang relevan bagi industri permukaan.

#### 12.4 Subdivisi Gas Group II: IIA, IIB, IIC

Group II dibagi menjadi tiga subgrup menurut seberapa mudah gas menyala dan seberapa mudah nyala 'lolos' melalui celah sempit. Urutan bahaya penyalaannya menaik: IIA < IIB < IIC. Artinya IIC (mencakup hidrogen dan asetilena) adalah yang paling sulit diproteksi, sedangkan IIA (mencakup propana, gas alam) paling mudah.

Gambar 12.1 — Hierarki gas group IIA–IIB–IIC. Peralatan yang disertifikasi untuk grup lebih sulit (mis. IIC) otomatis mencakup grup yang lebih mudah (IIB, IIA).

Hierarki ini bersifat inklusif menaik: peralatan yang disertifikasi untuk IIC aman digunakan pada atmosfer IIB dan IIA; peralatan IIB mencakup IIA; tetapi peralatan IIA tidak boleh dipakai pada atmosfer IIB atau IIC. Inilah alasan hidrogen dan asetilena disebut 'kasus terberat' — peralatan yang lolos untuk keduanya lolos untuk hampir semua gas industri.

#### 12.4.1 MESG — Maximum Experimental Safe Gap

MESG (Maximum Experimental Safe Gap, celah aman eksperimental maksimum) adalah lebar celah maksimum pada sambungan sepanjang 25 mm yang masih mampu mencegah perambatan nyala dari campuran eksplosif di dalam selungkup uji standar ke campuran serupa di luarnya, pada kondisi pengujian yang dibakukan. MESG mencerminkan kemampuan celah sempit mendinginkan gas terbakar di bawah suhu penyalaan — parameter inti bagi proteksi flameproof (Ex d).

Gambar 12.2 — Konsep MESG. Nyala di dalam selungkup uji harus padam saat melewati celah sempit sehingga campuran di luar tidak ikut menyala. Makin kecil MESG, makin sulit gas 'ditahan', makin tinggi gruppnya.

Semakin kecil MESG suatu gas, semakin mudah nyalanya menembus celah, dan semakin sulit gas itu diproteksi (grup lebih tinggi). Batas praktis subdivisi Group II menurut MESG (dari IEC 60079-20-1):

Tabel 12.1 — Batas subdivisi Group II berdasarkan MESG dan MIC ratio.

Catatan: nilai batas di atas adalah nilai yang lazim dipakai di praktik klasifikasi; angka dan metode uji definitif harus dirujuk ke edisi terbaru IEC 60079-20-1. Sejumlah gas berada di zona batas dan dapat diklasifikasikan berbeda tergantung parameter dominan (MESG atau MIC ratio).

#### 12.4.2 MIC Ratio — Minimum Igniting Current Ratio

MIC (Minimum Igniting Current) adalah arus minimum yang, saat rangkaian induktif diputus pada apparatus percikan standar, mampu menyalakan campuran gas yang paling mudah menyala. Untuk klasifikasi dipakai MIC ratio, yaitu perbandingan MIC gas yang diuji terhadap MIC metana. Parameter ini penting bagi proteksi intrinsic safety (Ex i), karena Ex i bekerja dengan membatasi energi/arus rangkaian. Seperti pada MESG, makin kecil MIC ratio, makin mudah gas menyala oleh percikan listrik, makin tinggi grup-nya (lihat Tabel 12.1).

MESG dan MIC ratio umumnya konsisten satu sama lain dalam menentukan grup, karena keduanya berakar pada energi penyalaan zat. Bila hasil keduanya berbeda untuk gas di zona batas, klasifikasi mengikuti aturan konservatif pada IEC 60079-20-1.

#### 12.4.3 Contoh Gas per Grup

Tabel 12.2 — Contoh representatif gas/uap per gas group beserta campuran uji baku yang dipakai untuk pengujian. Daftar zat bersifat indikatif dan perlu diverifikasi ke IEC 60079-20-1; komposisi campuran uji dikutip dari IEC 60079-11 Tabel 7.

Beberapa gas memiliki subgrup 'campuran' seperti IIB + H₂ untuk peralatan yang lolos IIB sekaligus hidrogen namun belum penuh IIC — penandaan semacam ini kadang dijumpai pada peralatan tertentu dan harus dibaca sesuai sertifikatnya. Metana permukaan (surface) diklasifikasikan sebagai IIA, sedangkan metana tambang termasuk Group I dengan aturan tersendiri.

#### 12.5 Dust Group: IIIA, IIIB, IIIC

Untuk atmosfer debu, IEC 60079-0 memakai Group III yang dibagi menurut jenis material debu — bukan menurut MESG (yang merupakan konsep gas). Pembagiannya:

Tabel 12.3 — Subdivisi dust group (Group III).

Sebagaimana gas group, dust group juga bersifat inklusif menaik: peralatan bersertifikat IIIC mencakup IIIB dan IIIA; IIIB mencakup IIIA. Debu konduktif (IIIC) paling menantang karena dapat menembus selungkup, menjembatani rangkaian, dan menyebabkan hubung singkat selain risiko penyalaan awan/lapisan debu. Peralatan untuk debu konduktif umumnya membutuhkan tingkat perlindungan masuk (ingress protection) yang tinggi, mis. IP6X (kedap debu).

Perhatikan perbedaan penting antara gas dan debu: pada debu, ingress protection (IP) dan pembatasan suhu permukaan terhadap lapisan debu menjadi faktor sentral, sedangkan pada gas yang menonjol adalah MESG/MIC dan celah selungkup. Karena itu marking debu memuat kode IP dan suhu permukaan aktual (lihat Bab 13).

#### 12.6 Kaitan ke Metode Proteksi dan Pemilihan

Gas/dust group menentukan kecocokan metode proteksi dan parameter desain peralatan. Contoh keterkaitan: peralatan Ex d untuk IIC memakai celah flens lebih sempit/lebih panjang dibanding IIA; barrier intrinsic safety untuk IIC dibatasi pada energi lebih rendah dibanding IIB/IIA. Dalam pemilihan peralatan, gas group pada marking peralatan harus sama atau lebih tinggi dari gas group zat di area (mis. area hidrogen menuntut IIC; peralatan IIB tidak sah).

#### 12.7 Contoh Aplikasi

Kasus A — Kilang LPG (propana/butana). Zat dominan propana dan butana, keduanya IIA. Peralatan bermarking IIA sudah memadai secara grup, tetapi dalam praktik banyak fasilitas menstandarkan pembelian pada IIB atau IIC agar satu jenis peralatan berlaku lintas unit dan memudahkan spare part — ini sah karena grup lebih tinggi mencakup grup lebih rendah.

Kasus B — Unit produksi hidrogen / area baterai. Kehadiran hidrogen memaksa gas group IIC. Semua peralatan listrik di zona terkait wajib bermarking IIC (mis. Ex db IIC atau Ex ia IIC). Peralatan IIB yang kebetulan tersedia di gudang tidak boleh dipasang.

Kasus C — Pabrik gula / silo tepung (debu). Debu gula/tepung bersifat non-konduktif → IIIB. Peralatan bermarking IIIB memadai, dengan perhatian pada IP kedap debu dan suhu permukaan terhadap lapisan debu. Bila di area yang sama terdapat serbuk logam (mis. peralatan pengemas berpelumas logam yang terkelupas), pertimbangkan IIIC.

Catatan dan Rujukan — Bab 12 (catatan 50–51)

50.  IEC 60079-0, Explosive atmospheres — Part 0: Equipment — General requirements.

51.  IEC 60079-20-1, Explosive atmospheres — Part 20-1: Material characteristics for gas and vapour classification — Test methods and data.

Pustaka pendukung:

•  IEC 60079-20-1:2010 (Edisi 1.0) melalui adopsi IS/IEC 60079-20-1:2010, Explosive atmospheres — Part 20-1: Material characteristics for gas and vapour classification — Test methods and data. [Berkas: is.iec.60079.20.1.2010.pdf dan info_iec60079-20-1{ed1.0}b.pdf]

•  Singh, A. K. (2023). Explosion-Proof Equipment in Hazardous Area. Springer. [Berkas: 823211066-Arvind-Kumar-Singh-Explosion-Proof-Equipment-in-Hazardous-Area-Springer-2023.pdf]

•  Linström, H.-J. Basic Concepts for Explosion Protection. [Berkas: 193650475-Basic-Concepts-for-Explosion-Protection.pdf]

•  Kumar, H. Safety in Instrumentation & Control Systems, Unit 1. [Berkas: 886653684-Document-From-Hemanth-s-Kumar.pdf]

•  IESSA. Hazardous Area Course Notes. [Berkas: 793764224-Iessa-Haz-Course-Notes.pdf]

•  R. STAHL. Essential Explosion Protection. [Berkas: 695762365-ex-essential-explosion-protection-rstahl.pdf]

•  Hazardous Areas Technical Guide. [Berkas: 120420138-ATEX.pdf]

### Bab 13 — Kelas Suhu (Temperature Class)

#### 13.1 Tujuan Bab

Bab ini menjelaskan konsep temperature class (kelas suhu) sebagai batas suhu permukaan maksimum peralatan, hubungannya dengan ignition temperature (suhu penyalaan) zat, cara memilih temperature class yang benar, serta perbedaan penandaan suhu untuk gas dan untuk debu. Suhu permukaan yang terlalu panas adalah sumber penyalaan termal — sama bahayanya dengan percikan listrik — sehingga pengendaliannya wajib.

#### 13.2 Definisi dan Prinsip

Maximum surface temperature (suhu permukaan maksimum) adalah suhu tertinggi yang dapat dicapai oleh permukaan mana pun dari peralatan Ex, dalam kondisi operasi terburuk yang diizinkan (termasuk kondisi gangguan yang diperhitungkan), pada suhu ambien acuan (umumnya −20 °C hingga +40 °C kecuali ditandai lain). Prinsip dasarnya sederhana namun mutlak:

Suhu permukaan maksimum peralatan harus lebih rendah dari ignition temperature zat yang hadir di area. Ignition temperature (juga disebut auto-ignition temperature, AIT) adalah suhu terendah yang membuat zat menyala sendiri tanpa sumber api eksternal.

Agar pembeli tidak perlu mengetahui suhu persis tiap produk, IEC 60079-0 membakukan enam temperature class (T1–T6) yang menetapkan batas suhu permukaan maksimum.52 Peralatan cukup diberi kode kelas suhu, dan pemakai mencocokkannya dengan ignition temperature zat di area.

Gambar 13.1 — Temperature class T1–T6 dan batas suhu permukaan maksimum. Suhu permukaan maksimum peralatan harus di bawah ignition temperature gas/uap area.

Tabel 13.1 — Temperature class (IEC 60079-0) dan batas suhu permukaan maksimum.

Perhatikan hubungan hierarkinya: kelas dengan angka lebih tinggi (T6) berarti batas suhu permukaan lebih rendah dan karena itu lebih ketat/lebih aman. Peralatan yang memenuhi T6 otomatis memenuhi T5, T4, ... T1 (karena batas T6 paling rendah). Sebaliknya, peralatan T3 tidak boleh dipakai di area yang menuntut T4.

#### 13.3 Memilih Temperature Class yang Benar

Langkah pemilihan: (1) tentukan semua zat mudah terbakar yang mungkin hadir di area; (2) cari ignition temperature terendah di antara zat-zat tersebut (kasus terburuk); (3) pilih peralatan dengan suhu permukaan maksimum di bawah nilai itu. Karena batas kelas berupa jenjang, peralatan harus memiliki angka kelas suhu sama atau lebih tinggi dari yang dibutuhkan.

Contoh 13-1. Area mengandung uap dengan ignition temperature 240 °C. Peralatan yang aman harus memiliki suhu permukaan maksimum < 240 °C. T3 (200 °C) memenuhi; T2 (300 °C) tidak memenuhi karena 300 °C melampaui 240 °C. Maka minimum kelas yang diperlukan adalah T3; peralatan T4/T5/T6 juga sah karena lebih ketat.

Contoh 13-2. Area kilang berisi campuran hidrokarbon; zat paling kritis memiliki ignition temperature sekitar 204 °C (mis. sebagian bahan bakar berat). Minimum kelas yang dibutuhkan adalah T3. Karena banyak instrumen komersial tersedia sebagai T4 (135 °C), fasilitas kerap menstandarkan pada T4 untuk margin lebih besar dan keseragaman.

Tabel 13.2 — Contoh ignition temperature beberapa zat dan temperature class minimum yang diperlukan (nilai indikatif; verifikasi ke lembar data & IEC 60079-20-1).

Perhatikan bahwa gas yang 'paling mudah menyala' oleh percikan (gas group tinggi) belum tentu memiliki ignition temperature rendah — hidrogen adalah IIC namun ignition temperature-nya tinggi (± 560 °C, hanya butuh T1). Sebaliknya, karbon disulfida menuntut T6. Karena itu gas group dan temperature class adalah dua parameter independen yang keduanya wajib dicocokkan.

#### 13.4 Penandaan Suhu untuk Debu

Untuk atmosfer debu (Group III), sistem T1–T6 tidak dipakai. Sebagai gantinya, marking mencantumkan suhu permukaan maksimum aktual dalam °C, mis. T125 °C atau ditulis 'Tmax 125 °C'. Alasannya, bahaya termal pada debu bergantung pada dua mekanisme berbeda:

Aturan suhu untuk Group I (tambang bawah tanah) berbeda lagi dan tidak memakai kelas T. IEC 60079-0 menetapkan bahwa suhu permukaan maksimum peralatan Group I tidak boleh melampaui 150 °C pada permukaan mana pun yang berpotensi terbentuk lapisan debu batu bara, dan 450 °C pada permukaan yang tidak mungkin terbentuk lapisan debu batu bara — misalnya di dalam selungkup yang terlindung dari debu. Pembedaan ini penting karena lapisan debu batu bara bertindak sebagai insulator sekaligus bahan bakar.

Nilai kelas T1 sampai T6 pada Tabel 13.1 diverifikasi langsung terhadap Tabela 2 IEC 60079-0 dan tercantum sebagai batas "kurang dari atau sama dengan": T1 ≤ 450 °C, T2 ≤ 300 °C, T3 ≤ 200 °C, T4 ≤ 135 °C, T5 ≤ 100 °C, T6 ≤ 85 °C. Standar menambahkan catatan bahwa lebih dari satu kelas suhu dapat ditetapkan untuk suhu ambien berbeda dan sumber pemanasan atau pendinginan eksternal yang berbeda.

Awan debu (dust cloud) — memiliki ignition temperature awan (Minimum Ignition Temperature of a cloud, MIT). Aturan umum: suhu permukaan maksimum peralatan harus ≤ ⅔ (dua per tiga) dari ignition temperature awan debu.

Lapisan debu (dust layer) — debu yang mengendap dapat mengisolasi panas dan menyala pada suhu lebih rendah. Untuk lapisan setebal acuan 5 mm, aturan umum: suhu permukaan maksimum peralatan harus ≤ (ignition temperature lapisan 5 mm − 75 K). Untuk lapisan lebih tebal, batas suhu diturunkan lebih jauh (derating) sesuai kurva pada IEC 60079-14.53

Suhu permukaan yang diizinkan diambil dari nilai terkecil di antara kedua kriteria tersebut. Karena itu, marking debu selalu menyatakan angka suhu aktual agar pemakai dapat membandingkannya langsung dengan MIT awan dan ignition temperature lapisan debu yang relevan di area.

Contoh 13-3. Debu organik dengan ignition temperature awan 450 °C dan ignition temperature lapisan 5 mm sebesar 300 °C. Kriteria awan: ⅔ × 450 = 300 °C. Kriteria lapisan: 300 − 75 = 225 °C. Nilai terkecil = 225 °C, sehingga suhu permukaan maksimum peralatan harus ≤ 225 °C. Peralatan bermarking T125 °C jelas memenuhi; peralatan dengan Tmax 250 °C tidak.

#### 13.5 Faktor yang Mempengaruhi Suhu Permukaan

Suhu permukaan aktual peralatan dipengaruhi beban listrik, disipasi daya, suhu ambien, dan akumulasi debu yang menghambat pendinginan. Karena itu: (a) suhu ambien acuan pada marking (mis. Ta −20 °C…+40 °C) harus dihormati — memasang peralatan di ambien lebih tinggi tanpa penyesuaian dapat membuat suhu permukaan melampaui kelasnya; (b) lapisan debu yang menumpuk dapat menaikkan suhu permukaan secara signifikan, sehingga housekeeping menjadi bagian dari keselamatan; (c) kondisi gangguan (overload) diperhitungkan dalam penetapan suhu permukaan maksimum peralatan bersertifikat.

Asal rentang ambien baku ini dijelaskan IEC 60079-0: meskipun kondisi atmosfer standar memberi rentang suhu atmosfer −20 °C hingga +60 °C, rentang ambien normal untuk peralatan Ex ditetapkan −20 °C hingga +40 °C kecuali dinyatakan dan ditandai lain. Alasannya praktis — mensyaratkan semua peralatan dirancang untuk ambien atas +60 °C akan menimbulkan kendala desain yang tidak perlu. Inilah sebabnya peralatan untuk lokasi panas harus secara khusus ditandai dengan rentang Ta yang lebih luas.

Catatan dan Rujukan — Bab 13 (catatan 52–53)

52.  IEC 60079-0, Explosive atmospheres — Part 0: Equipment — General requirements.

53.  IEC 60079-14, Explosive atmospheres — Part 14: Electrical installations design, selection and erection.

Standar lain yang dirujuk pada tabel dan gambar bab ini:

•  IEC 60079-20-1, Explosive atmospheres — Part 20-1: Material characteristics for gas and vapour classification — Test methods and data.

Pustaka pendukung:

•  ABNT NBR IEC 60079-0:2020, Atmosferas explosivas — Parte 0: Equipamentos — Requisitos gerais (adopsi IEC 60079-0:2017). [Berkas: 658051268-ABNT-IEC-60079-0-2020.pdf]

•  Singh, A. K. (2023). Explosion-Proof Equipment in Hazardous Area. Springer. [Berkas: 823211066-Arvind-Kumar-Singh-Explosion-Proof-Equipment-in-Hazardous-Area-Springer-2023.pdf]

•  Linström, H.-J. Basic Concepts for Explosion Protection. [Berkas: 193650475-Basic-Concepts-for-Explosion-Protection.pdf]

•  Kumar, H. Safety in Instrumentation & Control Systems, Unit 1. [Berkas: 886653684-Document-From-Hemanth-s-Kumar.pdf]

•  IESSA. Hazardous Area Course Notes. [Berkas: 793764224-Iessa-Haz-Course-Notes.pdf]

•  R. STAHL. Essential Explosion Protection. [Berkas: 695762365-ex-essential-explosion-protection-rstahl.pdf]

•  Hazardous Areas Technical Guide. [Berkas: 120420138-ATEX.pdf]

### Bab 14 — Kategori Peralatan & Equipment Protection Level (EPL)

#### 14.1 Tujuan Bab

Bab ini menjelaskan dua sistem yang menyatakan tingkat keandalan proteksi peralatan: kategori peralatan pada kerangka ATEX (1G/2G/3G, 1D/2D/3D, M1/M2) dan Equipment Protection Level (EPL) pada kerangka IEC/IECEx (Ga/Gb/Gc, Da/Db/Dc, Ma/Mb). Keduanya menjawab pertanyaan 'seberapa besar jaminan peralatan tetap tidak menjadi sumber penyalaan' dan dipetakan langsung ke zona. Bab ini menutup Part IV dengan menyatukan zona (Part III), gas/dust group dan temperature class (Bab 12–13), serta tingkat keandalan menjadi kerangka pemilihan.

#### 14.2 Konsep Tingkat Keandalan Proteksi

Filosofi proteksi Ex bertingkat: makin sering dan makin lama atmosfer eksplosif hadir (zona makin berbahaya), makin kecil peluang yang boleh diberikan pada peralatan untuk menjadi sumber penyalaan. Tingkat jaminan itu dinyatakan melalui konsep toleransi gangguan (fault tolerance):

Peralatan tingkat tertinggi harus tetap aman pada operasi normal dan saat terjadi dua gangguan independen (rare malfunction).

Peralatan tingkat menengah harus tetap aman pada operasi normal dan saat terjadi satu gangguan (expected malfunction).

Peralatan tingkat dasar harus tetap aman pada operasi normal saja.

Konsep inilah yang mendasari EPL. IECEx memformalkannya melalui EPL, sedangkan ATEX menyatakannya melalui kategori. Keduanya kompatibel dan saling memetakan.

#### 14.3 Equipment Protection Level (EPL) — IEC/IECEx

EPL diperkenalkan IEC 60079-0 untuk menyatakan tingkat proteksi peralatan berdasarkan kemungkinannya menjadi sumber penyalaan, terlepas dari metode proteksi spesifik yang dipakai.54 Huruf pertama menyatakan lingkungan (G = gas, D = dust/debu, M = mining/tambang), huruf kedua menyatakan tingkat (a tertinggi, b menengah, c dasar):

Tabel 14.1 — Equipment Protection Level (EPL) dan artinya.

EPL memberi keleluasaan: dua peralatan dengan metode proteksi berbeda (mis. Ex d dan Ex ia) dapat memiliki EPL sama (Gb) dan karenanya sama-sama cocok untuk Zona 1. Marking modern IEC/IECEx mencantumkan EPL sebagai sufiks, mis. ... T4 Gb.

#### 14.4 Kategori Peralatan — ATEX

Kerangka ATEX (Directive 2014/34/EU, lihat Part II) memakai istilah Group dan Category.55 Group I untuk tambang, Group II untuk permukaan. Kategori menyatakan tingkat proteksi, dan huruf G (gas) atau D (dust) menyatakan jenis atmosfer:

Tabel 14.2 — Kategori ATEX (Group II permukaan) dan pemetaannya.

Untuk Group I (tambang), ATEX memakai kategori M1 (setara Ma — harus tetap berfungsi aman meski gas muncul) dan M2 (setara Mb — daya diputus saat gas muncul). Kategori ATEX ditulis dalam marking sebagai bagian penanda sebelum 'Ex', mis. II 2G (Group II, kategori 2, gas).

#### 14.5 Pemetaan Zona ↔ EPL ↔ Kategori

Inilah jembatan yang menyatukan Part III dan Part IV. Setiap zona menuntut minimum EPL/kategori tertentu:

Gambar 14.1 — Pemetaan zona ke EPL (IECEx) dan kategori (ATEX), untuk gas dan debu, beserta tingkat keandalan proteksinya.

Tabel 14.3 — Tabel padanan zona, EPL, dan kategori ATEX (gas dan debu).

#### 14.6 Prinsip 'Boleh Turun Zona, Tidak Boleh Naik'

Karena tingkat keandalan bersifat inklusif menaik, peralatan dengan EPL/kategori lebih tinggi boleh digunakan di zona yang lebih ringan, tetapi tidak sebaliknya. Peralatan Ga (Zona 0) boleh dipasang di Zona 1 dan 2; peralatan Gb (Zona 1) boleh di Zona 2 tetapi tidak di Zona 0; peralatan Gc hanya untuk Zona 2. Prinsip ini sering diringkas sebagai 'boleh turun zona, tidak boleh naik zona'. Ia juga alasan banyak fasilitas menstandarkan pembelian pada EPL tertinggi yang praktis, demi keseragaman dan fleksibilitas pemasangan.

Tabel 14.4 — Kesesuaian penggunaan peralatan lintas zona (gas).

#### 14.7 Menyatukan Semua Parameter

Pemilihan peralatan yang benar mensyaratkan empat kecocokan sekaligus, yang semuanya tercermin pada marking (dibahas tuntas di Bab 19–20):

Zona → EPL/kategori. Peralatan harus memiliki EPL yang memenuhi zona (mis. Zona 1 → minimum Gb).

Zat → gas/dust group. Grup peralatan ≥ grup zat (mis. area hidrogen → IIC).

Zat → temperature class. Suhu permukaan maksimum peralatan < ignition temperature zat (mis. → T4).

Lingkungan → metode proteksi & IP/ambien. Metode proteksi (Part V) dan kelas IP/suhu ambien sesuai kondisi fisik area.

Contoh 14-1 — merangkai kebutuhan. Sebuah transmitter akan dipasang di Zona 1 pada area yang mengandung etilena (IIB) dengan ignition temperature ± 425 °C, ambien maksimum 45 °C. Kebutuhan minimum: EPL Gb (Zona 1), gas group IIB atau lebih tinggi, temperature class T2 atau lebih ketat, dan Ta mencakup 45 °C. Peralatan bermarking Ex ib IIC T4 Gb (Ta −20…+60 °C) memenuhi semua: Gb cocok Zona 1; IIC ⊇ IIB; T4 (135 °C) < 425 °C; ambien tercakup. Peralatan tersebut melampaui kebutuhan dan tetap sah dipakai.

Catatan dan Rujukan — Bab 14 (catatan 54–55)

54.  IEC 60079-0, Explosive atmospheres — Part 0: Equipment — General requirements.

55.  Directive 2014/34/EU of the European Parliament and of the Council on equipment and protective systems intended for use in potentially explosive atmospheres (ATEX Equipment Directive).

Pustaka pendukung:

•  Singh, A. K. (2023). Explosion-Proof Equipment in Hazardous Area. Springer. [Berkas: 823211066-Arvind-Kumar-Singh-Explosion-Proof-Equipment-in-Hazardous-Area-Springer-2023.pdf]

•  Linström, H.-J. Basic Concepts for Explosion Protection. [Berkas: 193650475-Basic-Concepts-for-Explosion-Protection.pdf]

•  Kumar, H. Safety in Instrumentation & Control Systems, Unit 1. [Berkas: 886653684-Document-From-Hemanth-s-Kumar.pdf]

•  IESSA. Hazardous Area Course Notes. [Berkas: 793764224-Iessa-Haz-Course-Notes.pdf]

•  R. STAHL. Essential Explosion Protection. [Berkas: 695762365-ex-essential-explosion-protection-rstahl.pdf]

•  Hazardous Areas Technical Guide. [Berkas: 120420138-ATEX.pdf]

## PART V — METODE PROTEKSI (TYPES OF PROTECTION)

Part IV telah menetapkan apa yang harus dicocokkan pada peralatan: zona (EPL/kategori), gas/dust group, dan temperature class. Part V menjawab bagaimana peralatan dibuat aman — yaitu melalui types of protection (metode proteksi) yang dibakukan dalam seri IEC/EN 60079. Setiap metode adalah teknik rekayasa spesifik untuk memastikan peralatan listrik (atau non-listrik) tidak menjadi sumber penyalaan atmosfer eksplosif, dan masing-masing memiliki standar konstruksi, pengujian, serta batas aplikasinya sendiri.

Bab 15 memberi peta besar seluruh metode dan prinsip yang mendasarinya. Bab 16 membahas metode berbasis kurungan/isolasi (Ex d, Ex p, Ex o, Ex q, Ex m). Bab 17 membahas metode berbasis pencegahan percikan (Ex e, Ex n). Bab 18 membahas intrinsic safety (Ex i) secara mendalam sebagai fokus khusus, karena metode inilah yang paling relevan bagi instrumentasi, sistem kendali, dan perangkat genggam — dan menjadi fondasi Part VIII.

### Bab 15 — Ikhtisar Metode Proteksi

#### 15.1 Tujuan Bab

Bab ini memberikan kerangka berpikir untuk seluruh metode proteksi: tiga strategi dasar yang mendasarinya, kode huruf standar, standar IEC 60079 yang mengaturnya, serta pemetaan tiap metode ke zona dan aplikasi tipikal. Tujuannya agar pembaca dapat menempatkan setiap metode (yang dirinci pada Bab 16–18) dalam gambaran besar dan memilih pendekatan yang tepat sejak awal desain.

#### 15.2 Tiga Strategi Dasar

Betapapun banyaknya kode metode, semuanya bersandar pada salah satu (atau kombinasi) dari tiga strategi fundamental untuk memutus 'segitiga ledakan' (bahan bakar + oksigen + sumber penyalaan) pada sisi sumber penyalaan:

Gambar 15.1 — Tiga strategi dasar metode proteksi: mengurung ledakan, memisahkan sumber penyalaan dari atmosfer, dan membatasi energi.

Mengurung / menahan ledakan (containment). Membiarkan atmosfer eksplosif masuk ke peralatan dan bahkan menyala di dalamnya, tetapi mengurung ledakan sehingga tidak merambat ke luar. Perwakilan: Ex d (flameproof).

Memisahkan sumber penyalaan dari atmosfer (segregation/exclusion). Menjaga agar bagian yang panas atau berpercikan tidak pernah bertemu atmosfer eksplosif — dengan tekanan lebih, perendaman, pengisian, enkapsulasi, atau margin konstruksi. Perwakilan: Ex p, Ex o, Ex q, Ex m, Ex e, Ex n.

Membatasi energi (energy limitation). Menjaga energi listrik dan termal rangkaian tetap di bawah ambang yang mampu menyalakan zat, sehingga percikan atau permukaan panas pun tak cukup untuk menyalakan. Perwakilan: Ex i (intrinsic safety).

#### 15.3 Kode Huruf, Standar, dan Zona — Tabel Ikhtisar

Setiap metode ditandai kode huruf setelah 'Ex' (mis. Ex d, Ex ia). Tabel 15.1 adalah peta induk seluruh metode proteksi Group II yang lazim, prinsip kerjanya, standar IEC 60079 yang mengaturnya, EPL yang dicapai, dan zona yang sesuai. Tabel ini menjadi rujukan cepat untuk Bab 16–18.

Tabel 15.1 — Ikhtisar metode proteksi Ex (Group II): kode, prinsip, standar, EPL, dan zona.

Catatan tabel: *Ex p memiliki subtipe (pxb dan pyb → Zona 1; pzc → Zona 2). Ex m memiliki subtipe ma (EPL Ma, Ga, Da), mb (Gb), mc (Gc). *Ex op menyertai metode lain untuk peralatan optik. Kolom 'EPL' menunjukkan tingkat yang umumnya dicapai; sertifikat individu menyatakan EPL definitifnya. Untuk debu (Group III) dikenal metode padanan seperti Ex t (protection by enclosure, IEC 60079-31), Ex pD, Ex mD, dan Ex iD, dengan EPL Da/Db/Dc.56

Prinsip pemilihan cepat dari tabel: untuk Zona 0 pilihan utama adalah Ex ia (dan Ex ma); untuk Zona 1 tersedia banyak pilihan (Ex d, Ex e, Ex p, Ex m, Ex ib, dst.); untuk Zona 2 pilihan paling luas (termasuk Ex n dan Ex ic yang ekonomis).

#### 15.4 Metode Tunggal vs Kombinasi

Banyak peralatan nyata memakai kombinasi metode pada bagian berbeda. Contoh klasik: motor Ex de — badan terminal memakai Ex e (increased safety) sementara ruang yang berpotensi berbusur memakai Ex d (flameproof). Contoh lain: instrumen Ex db [ia] — selungkup utama flameproof, dengan rangkaian keluaran intrinsically safe yang disertifikasi terpisah. Marking mencantumkan setiap metode yang dipakai; membacanya memerlukan pemahaman tiap kode (Bab 16–18) dan aturan pembacaan marking (Bab 19).

#### 15.5 Metode untuk Peralatan Non-Listrik

Sumber penyalaan tidak hanya listrik — gesekan, benturan, permukaan panas mekanis, dan muatan elektrostatik juga dapat menyalakan. Seri IEC/EN ISO 80079-36 dan -37 mengatur proteksi peralatan non-listrik (mis. pompa, gearbox, kopling) dengan konsep serupa: constructional safety (Ex h, menggantikan kode lama c/k/b), flow-restricting enclosure, dan lainnya.57 Prinsip pencocokan zona-EPL-group-temperature tetap berlaku.

Penandaan proteksi non-listrik mengikuti pola yang sama dengan peralatan listrik. ISO 80079-36 memberi contoh seperti «Ex h I Mb» untuk tambang, «Ex h IIB T4 Gb» untuk gas industri permukaan, dan «Ex h IIC 120 °C Da» untuk debu. Huruf h adalah penanda payung; jenis proteksi yang mendasarinya adalah constructional safety "c", control of ignition sources "b" yang diatur ISO 80079-37, dan liquid immersion "k".

Catatan dan Rujukan — Bab 15 (catatan 56–57)

56.  IEC 60079-31, Explosive atmospheres — Part 31: Equipment dust ignition protection by enclosure "t".

57.  ISO 80079-36, Explosive atmospheres — Part 36: Non-electrical equipment for explosive atmospheres — Basic method and requirements.

Pustaka pendukung:

•  BS EN ISO 80079-36:2016, Explosive atmospheres — Part 36: Non-electrical equipment for explosive atmospheres — Basic method and requirements. [Berkas: 713053025-ENG-ISO-80079-36-2016-ATMOSFERAS-EXPLOSIVAS.pdf]

•  Singh, A. K. (2023). Explosion-Proof Equipment in Hazardous Area. Springer. [Berkas: 823211066-Arvind-Kumar-Singh-Explosion-Proof-Equipment-in-Hazardous-Area-Springer-2023.pdf]

•  Linström, H.-J. Basic Concepts for Explosion Protection. [Berkas: 193650475-Basic-Concepts-for-Explosion-Protection.pdf]

•  Kumar, H. Safety in Instrumentation & Control Systems, Unit 1. [Berkas: 886653684-Document-From-Hemanth-s-Kumar.pdf]

•  IESSA. Hazardous Area Course Notes. [Berkas: 793764224-Iessa-Haz-Course-Notes.pdf]

•  R. STAHL. Essential Explosion Protection. [Berkas: 695762365-ex-essential-explosion-protection-rstahl.pdf]

•  Hazardous Areas Technical Guide. [Berkas: 120420138-ATEX.pdf]

### Bab 16 — Metode Berbasis Kurungan / Isolasi

#### 16.1 Tujuan Bab

Bab ini merinci metode yang bekerja dengan mengurung ledakan atau mengisolasi bagian yang berpotensi menyala dari atmosfer eksplosif: flameproof (Ex d), pressurization (Ex p), oil immersion (Ex o), powder filling (Ex q), dan encapsulation (Ex m). Metode-metode ini umumnya cocok untuk peralatan berdaya besar (motor, switchgear, luminaire, pemanas) yang tidak dapat dibuat berenergi rendah.

#### 16.2 Flameproof — Ex d (IEC 60079-1)

Flameproof enclosure (di Amerika Utara: 'explosion-proof') adalah metode di mana selungkup peralatan dirancang menahan tekanan ledakan internal dan mencegah perambatan nyala ke atmosfer sekitarnya. Metode ini menerima kenyataan bahwa gas dapat masuk ke dalam selungkup dan menyala di sana; keselamatan dijamin bukan dengan mencegah ledakan internal, melainkan dengan mengurungnya.

Gambar 16.1 — Ex d flameproof: selungkup kokoh menahan tekanan ledakan; celah flens panjang-sempit (flame path) mendinginkan gas keluar di bawah suhu penyalaan.

Dua fungsi konstruksi menjadi inti Ex d:

1.  Menahan tekanan. Dinding, tutup, dan baut selungkup dirancang menahan tekanan ledakan referensi (dapat mencapai orde ~1 MPa / 10 bar untuk sebagian campuran) tanpa deformasi permanen atau retak — diverifikasi melalui uji overpressure.

2.  Memadamkan nyala pada celah (flame path). Semua sambungan (flens, poros, ulir) membentuk celah dengan lebar maksimum dan panjang minimum tertentu, dihitung agar gas panas yang lolos didinginkan di bawah suhu penyalaan sebelum mencapai atmosfer luar. Dimensi celah bergantung pada gas group (lihat MESG, Bab 12): IIC menuntut celah lebih sempit/panjang dari IIA.

Implikasi lapangan Ex d sangat penting bagi pemeliharaan (Part VI, Bab 21): integritas flame path mutlak dijaga. Menambah cat tebal pada permukaan flens, korosi, goresan, baut yang hilang atau tidak dikencangkan sesuai torsi, dan gasket tidak sesuai dapat merusak celah aman dan meniadakan proteksi. Selungkup Ex d juga umumnya berat dan membutuhkan cable entry bersertifikat (cable gland Ex d atau sealing). Sertifikasi 'X' sering menyertai Ex d untuk kondisi khusus (mis. persyaratan gland atau bahan gasket).

Aplikasi tipikal: motor besar, panel switchgear/kontrol, kotak sambung berdaya, luminaire, pemanas — di Zona 1 dan 2 (EPL Gb). Ex d bukan pilihan utama untuk Zona 0.

#### 16.3 Pressurization — Ex p (IEC 60079-2)

Pressurization menjaga bagian dalam selungkup pada tekanan lebih (overpressure) menggunakan gas pelindung (udara bersih atau gas inert), sehingga atmosfer eksplosif dari luar tidak dapat masuk. Peralatan listrik standar (tidak tersertifikasi Ex) dapat ditempatkan di dalamnya, karena atmosfer eksplosif tak pernah menyentuh bagian aktif.

Gambar 16.2 — Ex p pressurization: tekanan lebih gas pelindung mencegah masuknya atmosfer eksplosif; kebocoran mengalir keluar, bukan ke dalam.

Urutan kerja Ex p: (1) purging — sebelum energisasi, selungkup dibilas dengan gas pelindung sebanyak beberapa kali volumenya untuk mengeluarkan atmosfer eksplosif yang mungkin terjebak; (2) pressurization — tekanan lebih dijaga terhadap tekanan luar; (3) monitoring — sistem kontrol memantau tekanan dan aliran, dan bila tekanan hilang sistem memberi alarm dan/atau memutus daya sesuai zona. Perlu dicatat bahwa purging tidak disyaratkan untuk atmosfer debu eksplosif; pada aplikasi debu, fungsi tekanan lebih adalah mencegah masuknya debu, bukan membilas gas.

Penandaan tingkat proteksi Ex p mengikuti EPL sejak edisi 2014 dan ditulis dengan sufiks: pxb, pyb, dan pzc. Notasi lama tanpa sufiks — px, py, pz — berasal dari edisi sebelumnya dan tidak lagi dipakai pada teks standar berlaku, meskipun masih sering dijumpai pada dokumen proyek dan materi pelatihan lama.

Nilai tekanan lebih minimum bersifat wajib dan berbeda menurut tingkat proteksi. Standar menetapkan tekanan lebih minimum 50 Pa untuk pxb dan pyb, serta 25 Pa untuk pzc, yang harus dipertahankan relatif terhadap tekanan luar pada setiap titik di dalam selungkup bertekanan dan duct terkaitnya di mana kebocoran dapat terjadi.

Tabel 16.1A — Tingkat proteksi pressurization menurut BS EN 60079-2:2014 klausul 3.20–3.23 dan 7.12.

Aplitasi tipikal: ruang analyzer, panel kontrol besar, kabinet komputer/HMI, motor/generator besar, ruang kendali kecil (purged room) — Zona 1 dan 2. Kelemahan: memerlukan pasokan gas pelindung andal dan sistem kontrol/monitoring, sehingga menambah kompleksitas dan pemeliharaan.

#### 16.4 Oil Immersion — Ex o (IEC 60079-6)

Oil immersion merendam bagian listrik yang dapat berbusur atau memanas ke dalam minyak pelindung sehingga busur/percikan terjadi di bawah permukaan minyak dan tidak menyentuh atmosfer eksplosif; minyak juga membantu mendinginkan. Metode ini klasik pada peralatan seperti transformator dan switchgear terendam minyak. Perhatian utama: level minyak, kualitas/dekomposisi minyak, dan pembentukan gas dari busur. Cocok untuk Zona 1 dan 2 (Gb).

#### 16.5 Powder Filling — Ex q (IEC 60079-5)

Powder filling mengubur bagian aktif dalam material pengisi granular (umumnya pasir kuarsa halus). Percikan atau busur yang terjadi di antara butiran pengisi 'terpadamkan' dan energinya terdisipasi, sementara panas tersebar sehingga permukaan luar tetap dingin. Metode ini banyak dipakai pada komponen tanpa bagian bergerak seperti kapasitor, transformator kecil, dan modul elektronik/pengaman. Cocok untuk Zona 1 dan 2 (Gb).

#### 16.6 Encapsulation — Ex m (IEC 60079-18)

Encapsulation membungkus bagian yang dapat menyalakan atmosfer di dalam senyawa/resin (compound) padat sehingga terisolasi total dari atmosfer eksplosif. Karena tidak ada rongga berisi gas, tidak ada ledakan internal yang mungkin. Ex m populer untuk komponen kecil: solenoid, relay, sensor, modul elektronik, pemancar kecil. Subtipe menentukan EPL: ma memberi EPL Ma, Ga, dan Da sehingga sah untuk Zona 0 dan Zona 20; mb (Gb — Zona 1), mc (Gc — Zona 2). Perhatian: keutuhan compound, batas suhu, dan pembatasan energi/komponen di dalamnya.

#### 16.7 Perbandingan Ringkas Metode Kurungan/Isolasi

Tabel 16.1 — Perbandingan metode berbasis kurungan/isolasi.

Catatan dan Rujukan — Bab 16

Pustaka pendukung:

•  IEC 60079-5:2015 (Edisi 4.0, redline), Explosive atmospheres — Part 5: Equipment protection by powder filling "q". [Berkas: 754101914-IEC-60079-5-2015-Edition-4-0-REDLINE.pdf]

•  BS EN 60079-18:2009, Explosive atmospheres — Part 18: Equipment protection by encapsulation "m". [Berkas: 526402057-BS-EN-60079-18-2009.pdf]

•  BS EN 60079-2:2014 (incorporating corrigendum July 2015), Explosive atmospheres — Part 2: Equipment protection by pressurized enclosure "p". British Standards Institution. [Berkas: 752205022-BS-EN-60079-22014-r1.pdf]

•  Singh, A. K. (2023). Explosion-Proof Equipment in Hazardous Area. Springer. [Berkas: 823211066-Arvind-Kumar-Singh-Explosion-Proof-Equipment-in-Hazardous-Area-Springer-2023.pdf]

•  Linström, H.-J. Basic Concepts for Explosion Protection. [Berkas: 193650475-Basic-Concepts-for-Explosion-Protection.pdf]

•  Kumar, H. Safety in Instrumentation & Control Systems, Unit 1. [Berkas: 886653684-Document-From-Hemanth-s-Kumar.pdf]

•  IESSA. Hazardous Area Course Notes. [Berkas: 793764224-Iessa-Haz-Course-Notes.pdf]

•  R. STAHL. Essential Explosion Protection. [Berkas: 695762365-ex-essential-explosion-protection-rstahl.pdf]

•  Hazardous Areas Technical Guide. [Berkas: 120420138-ATEX.pdf]

### Bab 17 — Metode Berbasis Pencegahan Percikan

#### 17.1 Tujuan Bab

Bab ini membahas metode yang mencegah timbulnya sumber penyalaan (busur, percikan, permukaan panas berlebih) melalui kualitas konstruksi dan margin desain pada operasi normal, tanpa mengurung atau mengisolasi secara fisik: increased safety (Ex e) dan type of protection 'n' (Ex n). Metode ini umumnya lebih ringan dan ekonomis, dengan konsekuensi cocok untuk zona yang lebih ringan.

#### 17.2 Increased Safety — Ex e (IEC 60079-7)

Increased safety diterapkan pada peralatan yang secara normal tidak menghasilkan busur, percikan, atau permukaan panas berbahaya. Idenya: memberi margin keselamatan tambahan pada faktor-faktor yang dapat memicu penyalaan, sehingga peluang timbulnya sumber penyalaan ditekan sangat kecil. Ex e tidak memakai celah pemadam (Ex d) atau pembatasan energi (Ex i), melainkan kualitas dan margin konstruksi.

Gambar 17.1 — Ex e increased safety: margin diperbesar pada jarak clearance (lewat udara) dan creepage (rambat permukaan), kualitas koneksi, serta batas suhu.

Persyaratan khas Ex e mencakup:

Jarak clearance dan creepage yang diperbesar. *Clearance* adalah jarak terpendek lewat udara antar-konduktor; *creepage* adalah jarak terpendek sepanjang permukaan isolator. Margin lebih besar mencegah lompatan busur dan tracking.

Kualitas koneksi yang andal — terminal anti-kendur (mencegah percikan akibat sambungan longgar), konektor bersertifikat.

Pembatasan suhu — termasuk perhitungan tE (waktu pemanasan) pada motor, agar suhu tidak melampaui temperature class bahkan saat rotor terkunci (stall) sebelum proteksi bekerja.

Ingress protection memadai dan isolasi berkualitas terjaga.

Aplikasi tipikal: terminal & junction box, motor induksi (sangkar tupai) Ex e, luminaire, transformator, baterai, pemanas — Zona 1 dan 2 (Gb/Gc). Ex e sering dikombinasikan dengan Ex d (mis. motor Ex de: badan terminal Ex e, bagian berbusur Ex d). Karena Ex e mengandalkan operasi normal tanpa busur, ia tidak cocok untuk peralatan yang secara inheren berpercikan (mis. sakelar biasa).

Sejak IEC 60079-7 Edisi 5, increased safety terbagi menjadi dua tingkat proteksi yang perlu dibedakan saat membaca marking maupun menyusun spesifikasi. Level of Protection "eb" memberi EPL Mb atau Gb, sedangkan Level of Protection "ec" memberi EPL Gc. Edisi 5 inilah yang menyatukan dua jalur: proteksi "e" dari Edisi 4 menjadi "eb", sementara type of protection "nA" yang sebelumnya berada di IEC 60079-15 dipindah ke sini dan menjadi "ec".

Perbedaan keduanya bukan sekadar tingkatan zona, melainkan menyangkut komponen apa yang boleh berada di dalamnya. Tingkat "eb" berlaku bagi sambungan, konduktor, belitan, lampu, dan baterai, tetapi tidak mencakup semikonduktor maupun kapasitor elektrolit. Alasannya, kegagalan yang dapat diperkirakan pada komponen elektronik semacam itu berpotensi menimbulkan suhu berlebih atau busur bila jarak pemisah internal tidak diterapkan, sedangkan menerapkan jarak pemisah tersebut umumnya tidak praktis tanpa mengorbankan fungsi komponen. Sebaliknya tingkat "ec" mencakup seluruh item yang sama dan juga membolehkan semikonduktor serta kapasitor elektrolit, karena pada tingkat ini komponen dinilai terhadap kondisi normal dan kejadian yang lazim diperkirakan saja.

Batas tegangan kerjanya pun berbeda: untuk "eb" standar berlaku pada peralatan dengan tegangan pengenal tidak melampaui 11 kV, sedangkan untuk "ec" batasnya 15 kV.

Tabel 17.2 — Dua tingkat proteksi increased safety menurut IEC 60079-7 Edisi 5.0 klausul 1.

#### 17.3 Type of Protection 'n' — Ex n (IEC 60079-15)

Type 'n' dikembangkan khusus untuk Zona 2, mengakui bahwa di zona ini atmosfer eksplosif jarang dan sebentar sehingga persyaratan dapat dilonggarkan dibanding Zona 1. Prinsipnya mirip Ex e (aman pada operasi normal), tetapi dengan tingkat pembuktian/pengujian yang lebih ringan sesuai risiko Zona 2. Ex n memiliki beberapa sub-jenis:

Perubahan penting terjadi pada IEC 60079-15 Edisi 5.0 (2017) dan perlu dipahami siapa pun yang membaca dokumen proyek lama. Cakupan edisi ini menyusut menjadi hanya sealed device "nC", hermetically sealed device "nC", non-incendive component "nC", dan restricted breathing enclosure "nR". Dua sub-jenis yang dahulu paling sering dijumpai telah keluar dari standar ini: type of protection "nA" dihapus dan kini ditetapkan sebagai tingkat proteksi "ec" di bawah IEC 60079-7, sementara enclosed break device "nC" dipindah ke IEC 60079-1:2014 dan kini ditetapkan sebagai tingkat proteksi "dc". Sub-jenis "nL" tidak ada pada edisi berlaku; pembatasan energi kini sepenuhnya berada di ranah Ex ic pada IEC 60079-11.

Konsekuensi praktisnya nyata di lapangan. Peralatan lama bertanda «Ex nA II T3» masih sah selama sertifikatnya berlaku, tetapi peralatan baru dengan fungsi setara akan datang bertanda «Ex ec IIC T3 Gc». Demikian pula «Ex nC» untuk enclosed break kini muncul sebagai «Ex dc». Saat menyusun spesifikasi pengadaan atau memeriksa kesesuaian penggantian, kedua penandaan itu harus diperlakukan sebagai padanan, bukan sebagai metode proteksi yang berbeda.

Tabel 17.1 — Sub-jenis type of protection "n" menurut IEC 60079-15 Edisi 5.0 (2017), beserta sub-jenis yang telah dihapus atau dipindah ke standar lain.

Evolusi standar: sebagian konsep Ex n telah diselaraskan ke penandaan lain pada edisi IEC 60079 terbaru — mis. nA → Ex ec (increased safety level 'c', IEC 60079-7 edisi baru) dan nL → Ex ic (IEC 60079-11).58,59 Karena itu peralatan lama bermarking Ex nA dan peralatan baru Ex ec dapat dijumpai berdampingan; keduanya menyasar Zona 2. Verifikasi selalu ke sertifikat dan edisi standar yang berlaku.

Aplikasi tipikal: instrumentasi, junction box, luminaire, dan peralatan umum di Zona 2 (EPL Gc). Ex n adalah pilihan ekonomis ketika hanya Zona 2 yang terlibat.

#### 17.4 Ex e / Ex n vs Metode Lain

Dibanding Ex d yang berat dan Ex i yang terbatas daya, Ex e dan Ex n menawarkan kesederhanaan dan biaya rendah untuk peralatan yang secara alami tidak berpercikan. Keterbatasannya: bergantung penuh pada kualitas konstruksi dan pemeliharaan (terminal harus tetap kencang, isolasi tak boleh menurun, IP terjaga), dan tidak untuk Zona 0. Untuk Zona 0 hampir selalu diperlukan Ex ia (Bab 18) atau Ex ma.

Catatan dan Rujukan — Bab 17 (catatan 58–59)

58.  IEC 60079-7, Explosive atmospheres — Part 7: Equipment protection by increased safety "e".

59.  IEC 60079-11, Explosive atmospheres — Part 11: Equipment protection by intrinsic safety "i".

Pustaka pendukung:

•  IEC 60079-7:2015 (Edisi 5.0), Explosive atmospheres — Part 7: Equipment protection by increased safety "e". Berkas yang tersedia berupa preview resmi yang memuat scope dan daftar perubahan. [Berkas: info_iec60079-7{ed5.0}en.pdf]

•  IEC 60079-15:2017 (Edisi 5.0), Explosive atmospheres — Part 15: Equipment protection by type of protection "n". International Electrotechnical Commission. [Berkas: IEC-60079-15-2017.pdf]

•  Singh, A. K. (2023). Explosion-Proof Equipment in Hazardous Area. Springer. [Berkas: 823211066-Arvind-Kumar-Singh-Explosion-Proof-Equipment-in-Hazardous-Area-Springer-2023.pdf]

•  Linström, H.-J. Basic Concepts for Explosion Protection. [Berkas: 193650475-Basic-Concepts-for-Explosion-Protection.pdf]

•  Kumar, H. Safety in Instrumentation & Control Systems, Unit 1. [Berkas: 886653684-Document-From-Hemanth-s-Kumar.pdf]

•  IESSA. Hazardous Area Course Notes. [Berkas: 793764224-Iessa-Haz-Course-Notes.pdf]

•  R. STAHL. Essential Explosion Protection. [Berkas: 695762365-ex-essential-explosion-protection-rstahl.pdf]

•  Hazardous Areas Technical Guide. [Berkas: 120420138-ATEX.pdf]

### Bab 18 — Intrinsic Safety — Ex i (Fokus Khusus)

#### 18.1 Tujuan Bab

Bab ini membahas intrinsic safety (Ex i) secara mendalam karena posisinya yang istimewa: ia metode utama dan paling lazim untuk Zona 0, satu-satunya yang aman dikerjakan dalam keadaan berenergi (live maintenance) tanpa hot work permit, dan fondasi bagi hampir seluruh instrumentasi, sistem kendali, dan perangkat genggam Ex (Part VIII). Setelah bab ini, pembaca memahami prinsip pembatasan energi, arti level Ex ia/ib/ic, konsep entity parameters, cara kerja intrinsically safe barrier (Zener dan galvanic), serta cara memverifikasi kesesuaian sebuah loop IS.

#### 18.2 Prinsip Dasar: Membatasi Energi

Berbeda dari semua metode sebelumnya yang mengurung atau mengisolasi sumber penyalaan, intrinsic safety mencegah sumber penyalaan itu ada sejak awal dengan cara membatasi energi listrik dan energi termal dalam rangkaian hingga di bawah nilai yang mampu menyalakan atmosfer eksplosif — baik oleh percikan (spark) maupun oleh efek termal (permukaan panas). Karena energinya memang tak pernah cukup, tak diperlukan selungkup berat atau isolasi fisik.

Agar energi tetap di bawah ambang, tiga besaran dijaga rendah dan tiga sumber penyimpan energi dibatasi:

Tegangan (V) dibatasi — dijepit oleh dioda Zener pada barrier agar tak melampaui nilai aman.

Arus (I) dibatasi — oleh resistor pembatas arus pada barrier.

Daya (P) dibatasi — konsekuensi dari V dan I terbatas, mengendalikan efek termal.

Induktansi tersimpan (L) dibatasi — induktor/kabel menyimpan energi ½·L·I² yang dapat memercik saat rangkaian terputus.

Kapasitansi tersimpan (C) dibatasi — kapasitor/kabel menyimpan energi ½·C·V² yang dapat memercik saat terjadi hubung singkat.

Ambang acuan adalah Minimum Ignition Energy (MIE) dan kurva penyalaan percikan (spark ignition curves) tiap gas group (lihat Bab 12; MIC ratio). Karena MIE gas group IIC (hidrogen, asetilena) paling rendah, batas energi rangkaian IS untuk IIC paling ketat dibanding IIB dan IIA.

#### 18.3 Mengapa Intrinsic Safety Istimewa

Pilihan utama untuk Zona 0. Level Ex ia memenuhi EPL Ga sehingga sah untuk Zona 0 — di mana atmosfer eksplosif hadir terus-menerus/dalam waktu lama. Metode lain yang dapat mencapai EPL Ga adalah encapsulation subtipe ma (Ex ma); lihat Tabel 15.1 dan §16.5.

Aman dikerjakan berenergi. Karena energi rangkaian di bawah ambang penyalaan, kalibrasi dan penyambungan dapat dilakukan tanpa mematikan sistem dan tanpa hot work permit — keunggulan besar untuk pemeliharaan.

Cocok untuk daya rendah. Ideal bagi instrumentasi lapangan: transmitter tekanan/suhu/aliran, sensor, sakelar level, positioner, dan perangkat genggam. Tidak untuk beban daya besar (motor, pemanas) karena batas dayanya rendah.

Keselamatan menyeluruh sistem. Ex i bukan sekadar sifat satu perangkat, melainkan sifat seluruh loop — perangkat lapangan, barrier, dan kabel harus dinilai bersama.

#### 18.4 Level Ex ia / ib / ic dan Kaitannya ke Zona

Intrinsic safety memiliki tiga level yang berbeda pada toleransi gangguan (fault tolerance) — jumlah kegagalan independen yang tetap membuat rangkaian aman. Ini memetakannya langsung ke EPL dan zona:

Gambar 18.2 — Level Ex ia/ib/ic menurut toleransi gangguan dan zona yang dilayani; paralel dengan EPL Ga/Gb/Gc.

Tabel 18.1 — Level intrinsic safety, toleransi gangguan, EPL, dan zona.

Perlu dipahami: Ex ia harus tetap aman meski dua komponen pembatas gagal, sehingga desainnya memakai redundansi (mis. dua dioda Zener paralel, dua resistor). Ex ib aman terhadap satu gangguan; Ex ic hanya untuk operasi normal. Level ini paralel persis dengan EPL Ga/Gb/Gc (Bab 14), sehingga logika 'boleh turun zona, tidak boleh naik' juga berlaku: perangkat Ex ia boleh dipakai di Zona 1 dan 2.

#### 18.4A  Faktor Keamanan 1,5 dan Penilaian Penyalaan Percikan

Sub-bab ini menjelaskan mengapa sebuah rangkaian intrinsically safe tidak dinilai pada nilai kerjanya apa adanya, melainkan pada nilai yang telah dikalikan faktor keamanan; bagaimana faktor tersebut diterapkan terhadap kurva dan tabel penyalaan referensi pada Anexo A IEC 60079-11; bagaimana aturan turunannya membatasi pemilihan komponen keselamatan; dan mengapa faktor ini tidak boleh diterapkan ulang oleh pengguna saat memverifikasi entity parameters pada §18.5.60

Seluruh nilai numerik, nomor klausul, dan aturan pada sub-bab ini dikutip dari ABNT NBR IEC 60079-11:2013, adopsi nasional Brasil atas IEC 60079-11:2011 (Edisi 6).61 Penomoran klausul yang disebut di bawah — Seksi 5.2, 5.3, 5.4, dan klausul 10.1.4.2 — berlaku untuk Edisi 6.

Catatan edisi. IEC telah menerbitkan Edisi 7 dari IEC 60079-11. Berdasarkan panduan perubahan yang diterbitkan CSA Group, Edisi 7 menata ulang penomoran klausul — persyaratan yang pada Edisi 6 berada di Seksi 5.2 sampai 5.4 dan klausul 10.1.4.2 dipetakan ke penomoran baru seperti 5.4.x dan 9.1.2 — sehingga seluruh rujukan klausul pada sub-bab ini harus dipetakan ulang bila Anda bekerja dengan Edisi 7. Prinsip faktor keamanan 1,5 untuk ia dan ib, faktor 1,0 untuk ic, serta kurva dan tabel penyalaan referensi pada Anexo A tidak dibatalkan oleh Edisi 7.

Beberapa persyaratan teknis memang berubah pada Edisi 7 dan perlu diperhatikan bila handbook ini dipakai untuk menilai peralatan terhadap edisi terbaru. Margin 5 K dan 10 K yang disyaratkan IEC 60079-0 pada uji tipe penentuan suhu permukaan kini hanya berlaku untuk tingkat proteksi ic, atau ketika tabel penilaian kelas suhu menurut ukuran komponen kecil tidak dipakai; untuk ia dan ib dengan tabel tersebut, margin itu tidak diterapkan.62 Formula penilaian termal untuk kawat di dalam peralatan intrinsically safe dikoreksi. Pada pengujian induktor, pengaruh suhu layanan terhadap resistansi kumparan kini wajib diperhitungkan agar arus terburuk benar-benar tercakup, sementara efek pemanasan sendiri selama pengujian diabaikan. Peralatan yang sudah bersertifikat terhadap edisi lama perlu diverifikasi ulang terhadap butir-butir ini.

Faktor keamanan (safety factor) dalam konteks intrinsic safety adalah pengali yang diterapkan pada besaran listrik sebuah rangkaian — tegangan atau arus — sebelum besaran itu dibandingkan terhadap batas penyalaan yang ditetapkan standar. Standar menetapkan besarnya faktor menurut tingkat proteksi, dan menetapkannya secara terpisah untuk dua jenis penilaian yang berbeda.

Tabel 18.1A — Faktor keamanan dan kondisi gangguan menurut tingkat proteksi (IEC 60079-11 Seksi 5.2, 5.3, 5.4, dan klausul 10.1.4.2; kolom kondisi gangguan mengikuti klarifikasi resmi IEC 60079-11:2011/ISH3:2016).

Dua kolom terakhir menyimpan pesan yang sering terlewat. Faktor 1,5 hanya berlaku pada penilaian penyalaan percikan (ignition by sparking). Untuk penentuan kelas suhu permukaan, standar menyatakan secara eksplisit bahwa faktor yang diterapkan pada tegangan atau arus adalah 1,0 dalam semua kasus, termasuk untuk ia dan ib. Menerapkan faktor 1,5 pada perhitungan suhu permukaan karena itu keliru dan menghasilkan desain yang terlalu konservatif tanpa dasar normatif.

Perhatikan pula bahwa tingkat ic memakai faktor 1,0 untuk kedua jenis penilaian. Hal ini bukan sekadar praktik lapangan melainkan ketentuan yang ditegaskan IEC melalui interpretation sheet resmi IEC 60079-11:2011/ISH3:2016, yang menyatakan bahwa untuk tingkat ic berlaku faktor keamanan 1,0 tanpa kondisi gangguan, dan bahwa pada uji penyalaan percikan tingkat ic dinilai tanpa countable maupun non-countable fault. Dokumen yang sama menegaskan bahwa Seksi 5.2 dan 5.3 — yang mengatur faktor 1,5 beserta kondisi gangguan untuk ia dan ib — tidak berlaku bagi ic. Konsekuensinya, perangkat ic memiliki margin penyalaan yang lebih tipis secara desain, dan justru karena itu penerapannya dibatasi pada Zona 2 — tempat atmosfer eksplosif tidak diperkirakan hadir pada operasi normal. Menaikkan perangkat ic ke Zona 1 tidak sah, dan alasannya bukan formalitas penandaan melainkan perbedaan nyata pada margin yang dipakai saat perangkat itu dinilai.

Perbedaan ini menyimpan konsekuensi desain yang sering terlewat. Pada ia dan ib, penilaian dilakukan dengan menerapkan non-countable fault — kegagalan yang tidak perlu dihitung satu per satu karena dianggap selalu mungkin terjadi — di samping countable fault sesuai tingkatnya. Pada ic, tidak satu pun dari keduanya diterapkan. Artinya rangkaian ic dinilai murni pada kondisi kerjanya, sehingga margin terhadap penyalaan jauh lebih tipis daripada yang tampak dari sekadar perbedaan angka faktor 1,5 versus 1,0.

#### 18.4A.1  Kurva dan Tabel Penyalaan Referensi (Anexo A)

Batas penyalaan tidak dihitung secara teoretis melainkan ditetapkan secara eksperimental memakai spark test apparatus (aparelho de faiscamento) — perangkat baku dengan kontak berputar yang membangkitkan percikan pada rangkaian uji di dalam campuran gas uji. Klausul 10.1.4.1 menetapkan kondisi pengujiannya, antara lain jumlah putaran pemegang kontak: 400 putaran untuk rangkaian arus searah (200 putaran tiap polaritas), 1.000 putaran untuk rangkaian arus bolak-balik, dan 400 putaran untuk rangkaian kapasitif.

Hasil percobaan itu dibakukan menjadi kurva dan tabel pada Anexo A. Figura A.1 sampai A.6 memuat kurva penyalaan untuk rangkaian resistif, kapasitif, dan induktif pada tiap grup; Tabela A.1 memuat batas arus hubung singkat terhadap tegangan; Tabela A.2 memuat batas kapasitansi. Setiap kurva figur diberi label energi penyalaan minimum campuran uji grup yang bersangkutan.

Tabel 18.1B — Energi penyalaan minimum campuran uji per grup, sebagaimana tercantum pada kurva Figura A.3 sampai A.6 IEC 60079-11.

Urutan ini berbanding terbalik dengan tingkat kesulitan proteksi dan konsisten dengan hierarki gas group pada Bab 12: IIC menuntut pembatasan energi sekitar delapan kali lebih ketat daripada IIA dan sekitar tiga belas kali lebih ketat daripada Group I. Inilah alasan mengapa barrier yang disertifikasi IIC otomatis sah untuk IIB dan IIA, tetapi tidak sebaliknya.

Tabela A.1 disajikan dalam dua kolom faktor keamanan untuk tiap grup — ×1 dan ×1,5 — sehingga penilai dapat langsung membaca batas yang sesuai dengan tingkat proteksi yang dinilai. Cuplikan berikut memuat titik tegangan yang lazim dijumpai pada instalasi IS.

Tabel 18.1C — Cuplikan Tabela A.1 IEC 60079-11: batas arus hubung singkat yang diizinkan (mA) terhadap tegangan, untuk rangkaian resistif. Tabel asli mencakup rentang 5,6 V hingga 100 V dengan langkah sehalus 0,1–0,2 V; gunakan tabel lengkap pada standar untuk pekerjaan nyata.

Pola tabel memperlihatkan dua hal. Pertama, batas arus turun tajam seiring naiknya tegangan — pada IIC, menaikkan tegangan dari 20 V ke 30 V memangkas arus yang diizinkan dari 464 mA menjadi 152 mA. Inilah sebabnya barrier IS lazim dirancang pada tegangan rendah, dan mengapa menaikkan tegangan suplai sebuah loop IS berdampak jauh lebih besar daripada yang diduga. Kedua, kolom ×1,5 selalu bernilai dua pertiga kolom ×1 — hubungan yang menjadi dasar aturan derating pada §18.4A.3.

Rangkaian kapasitif dinilai dengan cara yang berbeda. Untuk kapasitor, faktor keamanan 1,5 tidak diterapkan pada nilai kapasitansinya melainkan pada tegangannya — klausul 10.1.4.2 a) 2) menyatakan bahwa untuk rangkaian kapasitif, tegangan dinaikkan menjadi 1,5 kali tegangan gangguan. Konsekuensinya, kolom ×1,5 pada Tabela A.2 bukan dua pertiga kolom ×1, melainkan nilai kurva yang dibaca pada tegangan 1,5 kali lipat. Sebagai contoh, batas kapasitansi IIC pada 20 V kolom ×1,5 adalah 0,220 µF, dan angka yang sama muncul pada baris 30 V kolom ×1 — karena 30 V adalah 1,5 × 20 V. Hubungan ini berlaku konsisten di seluruh tabel dan berguna sebagai pemeriksaan silang saat membaca.

Tabel 18.1D — Cuplikan Tabela A.2 IEC 60079-11: batas kapasitansi yang diizinkan (µF) terhadap tegangan. Tabel asli mencakup rentang 5,0 V hingga 112 V dengan langkah sehalus 0,1 V; gunakan tabel lengkap pada standar untuk pekerjaan nyata.

Perhatikan betapa ketatnya batas kapasitansi pada tegangan yang lazim dipakai instalasi IS. Pada 24 V untuk IIC, kapasitansi yang diizinkan hanya 0,46 µF tanpa faktor keamanan dan 0,125 µF dengan faktor 1,5 — jauh lebih kecil daripada kapasitansi kabel panjang atau kapasitor penyaring pada banyak perangkat. Inilah alasan mengapa Co pada sertifikat barrier menjadi kendala yang sering menentukan panjang maksimum kabel sebuah loop IS, sebagaimana dibahas pada §18.5 dan Contoh 18-1.

#### 18.4A.2  Cara Standar Menerapkan Faktor 1,5

Klausul 10.1.4.2 menerangkan bahwa tujuan penerapan faktor keamanan adalah memastikan uji tipe atau evaluasi dilakukan pada rangkaian yang terbukti lebih mudah menyalakan daripada rangkaian aslinya, atau pada campuran gas yang lebih mudah tersulut daripada campuran acuan. Standar menyediakan dua metode yang dinyatakan setara.

Tabel 18.1E — Dua metode memperoleh faktor keamanan 1,5 menurut IEC 60079-11 klausul 10.1.4.2.

Standar menegaskan bahwa bila faktor 1,0 yang diperlukan, campuran uji yang dipakai adalah campuran acuan pada Tabela 7. Dengan kata lain, perbedaan antara penilaian ia/ib dan penilaian ic pada pengujian fisik terwujud sebagai perbedaan campuran gas di dalam ruang uji, bukan sekadar perbedaan angka di atas kertas.

Ketika penilaian dilakukan lewat tabel, faktor 1,5 dapat diperoleh melalui dua jalur yang setara secara matematis: mengalikan besaran rangkaian dengan 1,5 lalu membandingkannya terhadap kolom ×1, atau membandingkan besaran rangkaian apa adanya terhadap kolom ×1,5. Standar memakai kedua jalur pada contohnya sendiri — pada catatan Anexo A, standar menghitung batas tegangan baterai sebagai 26 V dibagi 1,5 sama dengan 17,3 V, yaitu jalur pembagian kurva. Yang tidak boleh dilakukan adalah menerapkan keduanya sekaligus: mengalikan rangkaian dengan 1,5 lalu membandingkannya ke kolom ×1,5 menghasilkan margin efektif 2,25 kali dan menolak rangkaian yang sebenarnya sah. Kesalahan ini tidak berbahaya dari sisi keselamatan, tetapi menyebabkan penolakan desain yang tidak perlu dan perdebatan yang mahal pada tahap review. Karena itu setiap perhitungan IS sebaiknya menyebut secara eksplisit jalur mana yang dipakai.

#### 18.4A.3  Contoh Penilaian Rangkaian

Kedua contoh berikut memakai rangkaian acuan Figura A.7 IEC 60079-11 (rangkaian induktif sederhana: resistor pembatas 300 Ω minimum, suplai 20 V maksimum, induktansi 100 mH maksimum, beban 1.100 Ω minimum), dengan tegangan suplai dinaikkan ke 22 V sebagai kondisi terburuk sesuai klausul 10.1.4.1 yang mensyaratkan penilaian hingga 110 % tegangan jaringan. Keduanya memakai jalur mengalikan rangkaian dengan 1,5 lalu membandingkan ke kolom ×1.

Contoh 18-2 — kondisi hubung singkat, area gas group IIC. Langkah 1: tetapkan resistor pembatas arus minimum sesuai sertifikat, 300 Ω. Langkah 2: tetapkan tegangan maksimum catu daya pada kondisi terburuk, 22 V. Langkah 3: hitung arus hubung singkat maksimum, 22 V ÷ 300 Ω = 73,3 mA. Langkah 4: terapkan faktor keamanan 1,5, sehingga 73,3 mA × 1,5 = 110 mA. Langkah 5: baca Tabela A.1 pada 22 V untuk Group IIC kolom ×1, yaitu 337 mA. Karena 110 mA jauh di bawah 337 mA, rangkaian dinyatakan intrinsically safe untuk IIC. Sebagai pemeriksaan silang, jalur kedua memberi hasil yang sama: arus rangkaian 73,3 mA apa adanya dibandingkan terhadap kolom ×1,5 pada 22 V, yaitu 224 mA — tetap memenuhi.

Contoh 18-3 — kondisi berbeban dengan induktansi. Rangkaian yang sama kini terhubung ke beban 1.100 Ω dengan induktansi 100 mH. Langkah 1: resistansi total setelah beban terhubung, 300 Ω + 1.100 Ω = 1.400 Ω. Langkah 2: arus maksimum yang mungkin, 22 V ÷ 1.400 Ω = 15,7 mA. Langkah 3: terapkan faktor keamanan 1,5, sehingga 15,7 mA × 1,5 = 23,6 mA. Langkah 4: bandingkan terhadap kurva rangkaian induktif Figura A.6 (Group IIC) untuk induktansi 100 mH pada kurva tegangan yang sesuai; nilai batas yang terbaca adalah sekitar 28 mA. Karena 23,6 mA berada di bawah batas tersebut, rangkaian dinyatakan intrinsically safe.

Perhatikan bahwa margin pada Contoh 18-3 jauh lebih tipis daripada Contoh 18-2 — hanya sekitar 16 persen. Induktansi menyimpan energi yang dilepaskan sekaligus saat rangkaian terputus, sehingga rangkaian induktif hampir selalu menjadi kasus penentu. Perhatikan pula bahwa batas induktif dibaca dari kurva, bukan dari tabel, sehingga ketelitian pembacaannya terbatas; standar sendiri mengingatkan pada klausul 10.1.5.2 bahwa rangkaian yang menyimpan energi pada induktansi sekaligus kapasitansi sulit dinilai dari kurva dan sebaiknya diuji langsung.

#### 18.4A.4  Aturan Dua Pertiga untuk Komponen Keselamatan

Faktor 1,5 tidak berhenti pada penilaian rangkaian; ia turun menjadi aturan pemilihan komponen. Karena membagi dengan 1,5 sama dengan mengalikan dengan dua pertiga, komponen yang keselamatan bergantung padanya — dioda Zener pembatas tegangan, resistor pembatas arus, dan sekering pada sebuah barrier — tidak boleh bekerja melampaui dua pertiga rating komersialnya.

Tabel 18.1F — Penerapan aturan dua pertiga pada komponen keselamatan.

Aturan ini berlaku pada kondisi gangguan, bukan hanya pada operasi normal — justru pada saat gangguan itulah komponen keselamatan menanggung beban terbesar. Sebuah resistor pembatas arus pada Zener barrier mendisipasi daya jauh lebih besar ketika keluarannya terhubung singkat daripada saat loop bekerja normal; rating komponen harus dipilih terhadap kondisi terburuk tersebut, lalu diturunkan lagi ke dua pertiga.

Untuk tingkat ia, aturan dua pertiga bekerja bersama redundansi. Karena rangkaian harus tetap aman setelah dua kegagalan independen, komponen pembatas digandakan — lazimnya tiga dioda Zener dipasang sehingga kegagalan dua di antaranya masih menyisakan satu yang berfungsi — dan setiap dioda tetap harus memenuhi batas dua pertiga. Duplikasi menjawab toleransi gangguan; derating menjawab faktor keamanan. Keduanya wajib dipenuhi bersamaan, dan inilah yang membuat barrier bersertifikat ia lebih mahal dan lebih besar secara fisik daripada padanannya yang ib.

#### 18.4A.5  Hubungan ke Entity Parameters — Jangan Terapkan Ulang

Bagian ini adalah konsekuensi praktis terpenting dari seluruh sub-bab, sekaligus sumber kesalahpahaman yang lazim di lapangan. Nilai Uo, Io, Po, Lo, dan Co yang tercetak pada sertifikat sebuah associated apparatus adalah hasil akhir dari proses penilaian yang baru saja diuraikan. Faktor keamanan, aturan dua pertiga, dan analisis toleransi gangguan seluruhnya sudah diperhitungkan oleh laboratorium uji dan badan sertifikasi ketika angka tersebut ditetapkan. Entity parameters adalah keluaran dari penilaian, bukan masukan yang masih menunggu faktor keamanan.

Karena itu, ketika pengguna memverifikasi kecocokan sebuah loop dengan kelima pertidaksamaan pada §18.5 — Uo ≤ Ui, Io ≤ Ii, Po ≤ Pi, Lo ≥ Li + Lc, Co ≥ Ci + Cc — perbandingan dilakukan pada nilai sertifikat apa adanya. Mengalikan Uo atau Io dengan 1,5 sebelum membandingkannya adalah penerapan ganda dan tidak benar. Demikian pula, kecocokan yang gagal tidak dapat diselamatkan dengan berargumen bahwa faktor keamanan sudah terkandung di dalamnya — margin itu memang sudah dipakai, dan tidak tersedia lagi untuk dibelanjakan oleh pengguna.

Ringkasnya, ada pembagian peran yang tegas. Faktor keamanan adalah urusan perancang dan badan sertifikasi pada saat menetapkan entity parameters. Pengguna di lapangan bekerja pada tingkat entity parameters, dan tanggung jawabnya adalah memastikan kelima pertidaksamaan terpenuhi dengan angka sertifikat apa adanya, termasuk memasukkan kontribusi kabel Lc dan Cc. Pemahaman ini juga menjelaskan mengapa mengganti komponen loop dengan komponen tak bersertifikat membatalkan keselamatan secara total: komponen tersebut tidak pernah melewati penilaian faktor keamanan maupun aturan dua pertiga, sehingga tidak ada dasar untuk mengetahui perilakunya pada kondisi gangguan.

#### 18.5 Entity Parameters — 'Bahasa' Kecocokan IS

Karena keselamatan IS adalah sifat sistem, harus ada cara memastikan bahwa perangkat lapangan, barrier, dan kabel cocok satu sama lain. Caranya melalui entity parameters — sekumpulan angka yang dicantumkan pada sertifikat setiap perangkat IS. Konsepnya membagi peran menjadi dua sisi: Perlu diingat bahwa seluruh angka entity parameters sudah memuat faktor keamanan 1,5 dan analisis kondisi gangguan; perbandingan di bawah ini dilakukan pada nilai sertifikat apa adanya, tanpa menerapkan faktor apa pun lagi (lihat §18.4A.5).

Associated apparatus (biasanya barrier di safe area) — perangkat yang membatasi dan menyuplai energi. Parameternya bertanda 'o' (output): Uo (tegangan maks. keluar), Io (arus maks. keluar), Po (daya maks. keluar), serta Lo dan Co (induktansi & kapasitansi eksternal maksimum yang boleh terhubung).

Intrinsically safe apparatus (perangkat lapangan di hazardous area) — perangkat yang menerima energi. Parameternya bertanda 'i' (input): Ui (tegangan maks. yang aman diterima), Ii (arus maks.), Pi (daya maks.), serta Li dan Ci (induktansi & kapasitansi internal perangkat).

Kabel yang menghubungkan keduanya juga menyimpan energi, sehingga induktansi dan kapasitansi kabel (Lc, Cc) harus diperhitungkan. Kesesuaian sebuah loop IS diverifikasi dengan memenuhi lima pertidaksamaan berikut:

Gambar 18.1 — Loop intrinsic safety: barrier (Zener/galvanic) di safe area membatasi energi ke perangkat lapangan di hazardous area. Kecocokan diverifikasi lewat entity parameters.

Tabel 18.2 — Aturan kecocokan entity parameters (harus dipenuhi semua).

Contoh 18-1 — verifikasi loop. Barrier: Uo = 28 V, Io = 93 mA, Po = 0,65 W, Lo = 2,4 mH, Co = 83 nF. Transmitter: Ui = 30 V, Ii = 100 mA, Pi = 0,8 W, Li = 0 mH, Ci = 5 nF. Kabel 100 m dengan Lc = 100 m × 1 µH/m = 0,1 mH dan Cc = 100 m × 0,2 nF/m = 20 nF. Pemeriksaan: Uo 28 ≤ Ui 30 ✔; Io 93 ≤ Ii 100 ✔; Po 0,65 ≤ Pi 0,8 ✔; Lo 2,4 mH ≥ Li+Lc = 0 + 0,1 = 0,1 mH ✔; Co 83 nF ≥ Ci+Cc = 5 + 20 = 25 nF ✔. Semua terpenuhi → loop sah secara intrinsically safe. Jika, misalnya, panjang kabel dinaikkan hingga Cc melampaui (Co − Ci), loop menjadi tidak sah dan harus dipendekkan atau memakai kabel berkapasitansi lebih rendah.

Selain metode entity, dikenal pula konsep FISCO (Fieldbus Intrinsically Safe Concept) untuk sistem fieldbus, yang menyederhanakan verifikasi dengan menetapkan parameter baku bagi segmen fieldbus IS.

#### 18.6 Intrinsically Safe Barrier: Zener vs Galvanic

Jantung sistem IS adalah barrier — perangkat di safe area yang menjamin energi ke hazardous area tetap terbatas walau terjadi gangguan di sisi safe area (mis. tegangan liar). Ada dua tipe utama:

#### 18.6.1 Zener Barrier (shunt-diode barrier)

Zener barrier terdiri dari sekering (fuse), resistor pembatas arus, dan dioda Zener yang menjepit tegangan ke bumi. Bila tegangan di sisi input naik melebihi ambang, Zener menghantar dan sekering putus, memutus energi berlebih. Ciri dan konsekuensinya:

Sederhana dan murah, tanpa isolasi galvanis antara safe dan hazardous area.

Membutuhkan sistem pembumian IS (IS earth) berkualitas tinggi — resistansi bumi sangat rendah (umumnya < 1 Ω) wajib, karena Zener mengalirkan arus lebih ke bumi. Kegagalan bumi meniadakan proteksi.

Rentan terhadap masalah ground loop dan memerlukan referensi bumi yang sama.

#### 18.6.2 Galvanic Isolated Barrier (isolator)

Galvanic barrier memisahkan sisi safe dan hazardous secara galvanis (melalui transformator/optocoupler), sekaligus membatasi energi. Ciri dan konsekuensinya:

Tidak memerlukan pembumian IS khusus — menghilangkan masalah ground loop dan menyederhanakan instalasi.

Memberi isolasi yang meningkatkan kekebalan sinyal dan keselamatan; mendukung berbagai jenis sinyal (analog, digital, RTD, thermocouple).

Lebih mahal dan memerlukan catu daya, tetapi kini menjadi pilihan dominan pada instalasi modern karena keandalan dan kemudahannya.

Tabel 18.3 — Perbandingan Zener barrier vs galvanic isolated barrier.

#### 18.7 Sistem IS dan Dokumentasi Loop

Karena keselamatan IS adalah sifat sistem, IEC 60079-25 mengatur *intrinsically safe systems* — yakni kombinasi perangkat yang saling terhubung dan dinilai bersama, bukan hanya per komponen.63 Verifikasi dan pemeliharaan IS mensyaratkan dokumentasi loop (loop documentation / descriptive system document) yang lengkap. Elemen yang perlu didokumentasikan:

Identitas dan sertifikat setiap perangkat (perangkat lapangan dan barrier), termasuk level (ia/ib/ic), gas group, dan temperature class.

Entity parameters tiap perangkat (Uo/Io/Po/Lo/Co dan Ui/Ii/Pi/Li/Ci).

Data kabel: panjang, induktansi & kapasitansi per satuan panjang, sehingga Lc dan Cc dapat dihitung.

Hasil perhitungan verifikasi kelima pertidaksamaan entity (lihat Tabel 18.2) untuk setiap loop.

Skema loop, penandaan kabel/terminal IS (lazimnya berwarna biru muda), pemisahan fisik dari sirkuit non-IS, dan pengaturan pembumian IS (untuk Zener barrier).

Praktik instalasi penting (dirinci pada Part VI): pisahkan kabel IS dari non-IS (jarak/segregasi), gunakan penandaan biru, jaga integritas barrier, dan jangan mengganti komponen loop tanpa mengulang verifikasi entity. Setiap perubahan (mis. memperpanjang kabel, mengganti transmitter) berpotensi membatalkan kesahihan IS dan harus melalui verifikasi ulang serta Management of Change.

#### 18.8 Batasan dan Kesalahan Umum

Daya rendah: IS tak cocok untuk beban besar. Jangan memaksakan IS pada peralatan berdaya tinggi.

Mengabaikan kabel: lupa memasukkan Lc/Cc kabel adalah kesalahan klasik yang membuat loop tampak sah padahal tidak — terutama pada kabel panjang atau berkapasitansi tinggi.

Pembumian Zener buruk: memakai Zener barrier tanpa IS earth yang benar meniadakan proteksi.

Mencampur komponen non-tersertifikasi: menyisipkan perangkat/indikator tak bersertifikat ke loop IS membatalkan keselamatan.

Perubahan tanpa verifikasi ulang: mengganti transmitter atau menambah panjang kabel tanpa menghitung ulang entity parameters.

Catatan menuju Part VIII. Karena karakteristiknya — Zona 0, aman berenergi, daya rendah, berbasis sistem — intrinsic safety adalah metode yang mendasari perangkat mobile/genggam Ex (radio, smartphone, tablet, alat ukur portabel, kamera). Studi kasus perangkat Zona 1 (Ex ib) vs Zona 2 (Ex ic), telemetri, lone worker protection, dan integrasi sensor eksternal dibahas pada Part VIII (Bab 25).

Catatan dan Rujukan — Bab 18 (catatan 60–63)

60.  IEC 60079-11, Explosive atmospheres — Part 11: Equipment protection by intrinsic safety "i".

61.  ABNT NBR IEC 60079-11:2013, Atmosferas explosivas — Parte 11: Proteção de equipamento por segurança intrínseca "i". Adopsi nasional Brasil atas IEC 60079-11:2011 (Edisi 6). Associação Brasileira de Normas Técnicas.

62.  IEC 60079-0, Explosive atmospheres — Part 0: Equipment — General requirements.

63.  IEC 60079-25, Explosive atmospheres — Part 25: Intrinsically safe electrical systems.

Pustaka pendukung:

•  IEC 60079-11:2011/ISH3:2016, Interpretation Sheet 3 — Explosive atmospheres, Part 11: Equipment protection by intrinsic safety "i". International Electrotechnical Commission. [Berkas: 634092666-IEC-60079-11-Interpretation-Sheet.pdf]

•  Singh, A. K. (2023). Explosion-Proof Equipment in Hazardous Area. Springer. [Berkas: 823211066-Arvind-Kumar-Singh-Explosion-Proof-Equipment-in-Hazardous-Area-Springer-2023.pdf]

•  Linström, H.-J. Basic Concepts for Explosion Protection. [Berkas: 193650475-Basic-Concepts-for-Explosion-Protection.pdf]

•  Kumar, H. Safety in Instrumentation & Control Systems, Unit 1. [Berkas: 886653684-Document-From-Hemanth-s-Kumar.pdf]

•  IESSA. Hazardous Area Course Notes. [Berkas: 793764224-Iessa-Haz-Course-Notes.pdf]

•  R. STAHL. Essential Explosion Protection. [Berkas: 695762365-ex-essential-explosion-protection-rstahl.pdf]

•  Hazardous Areas Technical Guide. [Berkas: 120420138-ATEX.pdf]

PART VI

Marking, Pemilihan & Instalasi

Bab 19  ·  Membaca Penandaan Peralatan Ex (Marking)

Bab 20  ·  Pemilihan Peralatan yang Tepat (Equipment Selection)

Bab 21  ·  Instalasi, Inspeksi & Pemeliharaan

Rujukan teknis untuk engineer instrumentasi/listrik, HSE, operasi & pemeliharaan,

procurement, dan tim teknis perangkat Ex

## PART VI — MARKING, PEMILIHAN & INSTALASI

Part VI menautkan seluruh teori pada Part I–V ke praktik lapangan. Setelah memahami sains ledakan (Part I), kerangka regulasi (Part II), klasifikasi area (Part III), klasifikasi zat & peralatan (Part IV), dan metode proteksi (Part V), langkah berikutnya adalah membaca penandaan (marking) peralatan Ex secara benar, memilih peralatan yang tepat untuk suatu zona, lalu memasang, menginspeksi, dan memeliharanya sesuai standar. Tiga bab dalam Part ini — Bab 19 (Marking), Bab 20 (Equipment Selection), dan Bab 21 (Instalasi/Inspeksi/Pemeliharaan) — merupakan inti pekerjaan sehari-hari personel yang bersertifikat kompetensi (mis. CompEx atau IECEx CoPC).

Kesalahan pada tahap ini adalah penyebab paling umum hilangnya integritas proteksi ledakan (loss of Ex integrity) di lapangan: salah baca marking sehingga salah memilih peralatan, glanda kabel yang keliru, celah flameproof yang rusak, atau earthing yang tidak kontinu. Karena itu Part VI menekankan langkah kerja yang dapat diperiksa (auditable), lengkap dengan quick reference card pembacaan marking dan checklist inspeksi.

### Bab 19 — Membaca Penandaan Peralatan Ex (Marking)

#### 19.1 Tujuan Bab

Bab ini bertujuan agar pembaca dapat: (a) mengenali seluruh elemen penandaan (marking) pada label peralatan Ex, baik format ATEX maupun IECEx; (b) membaca sebuah kode marking langkah demi langkah dan menerjemahkannya menjadi persyaratan area yang dilayani; (c) memahami penandaan Amerika Utara (NEC/CEC) dan bagaimana peralatan multi-approval ditandai; serta (d) mengenali arti sufiks sertifikat 'X' dan 'U'.64 Marking adalah 'paspor' peralatan: ia menyatakan untuk zona apa, gas/dust group apa, dan suhu apa peralatan tersebut boleh dipasang. Membaca marking secara keliru berpotensi menempatkan peralatan yang tidak sesuai di hazardous area.

#### 19.2 Definisi & Dasar Standar

Marking (penandaan) adalah kumpulan simbol, huruf, dan angka yang dicetak permanen pada pelat nama (nameplate) peralatan Ex, yang menyatakan kesesuaian peralatan dengan satu atau lebih metode proteksi ledakan beserta batasan penggunaannya. Persyaratan penandaan umum diatur dalam IEC 60079-0 (persyaratan umum peralatan Ex), dilengkapi oleh standar tipe proteksi masing-masing (mis. IEC 60079-1 untuk Ex d, IEC 60079-11 untuk Ex i, IEC 60079-7 untuk Ex e).65,66,67,68

Di wilayah Uni Eropa, penandaan tambahan diwajibkan oleh ATEX Directive 2014/34/EU: tanda CE, nomor Notified Body, simbol proteksi ledakan spesifik komunitas (heksagon 'Ex' — sering disebut Epsilon-x), serta equipment group dan category (lihat Part II, Bab 4).69 Skema IECEx tidak mewajibkan CE, namun memakai inti kode IEC yang identik. Dengan demikian, satu label sering memuat 'lapisan' penandaan ATEX di atas inti IEC yang universal.

#### 19.3 Anatomi Marking ATEX/IECEx

Sebuah label Ex tipikal memuat beberapa kelompok informasi yang dibaca berurutan dari kiri ke kanan. Tabel 19.1 memerinci elemen-elemen tersebut beserta contoh nilainya.

Tabel 19.1 — Elemen penandaan (marking) pada label peralatan Ex dan artinya.

Gambar 19.1 — Anatomi marking «II 2G Ex ib IIC T4 Gb»: blok ATEX (II 2G) menambahi inti IEC (Ex ib IIC T4 Gb) yang berlaku universal.

#### 19.4 Contoh Pembacaan Langkah demi Langkah: «II 2G Ex ib IIC T4 Gb»

Berikut cara membaca marking di atas secara sistematis. Urutan ini adalah 'algoritma' yang sama untuk setiap label Ex.

Langkah 1 — Equipment Group «II». Angka Romawi II menyatakan peralatan untuk industri permukaan (surface industries) — bukan tambang bawah tanah (Group I). Ini menentukan seri gas group yang berlaku (IIA/IIB/IIC), bukan Group I metana.

Langkah 2 — Category «2G». Angka 2 menyatakan kategori proteksi tingkat menengah; huruf G menyatakan atmosfer gas/uap. Menurut pemetaan ATEX, Category 2G ditujukan untuk Zona 1 (dan juga sah untuk Zona 2). Ini adalah bagian penandaan ATEX.

Langkah 3 — Kode «Ex». Menyatakan bahwa peralatan mengikuti satu atau lebih metode proteksi ledakan sesuai seri IEC/EN 60079.

Langkah 4 — Type of protection «ib». Metode proteksi adalah intrinsic safety level ib (pembatasan energi; lihat Part V, Bab 18). Level ib mentoleransi satu gangguan (one fault) dan sesuai untuk Zona 1.

Langkah 5 — Gas Group «IIC». Peralatan disertifikasi untuk gas group IIC, kelompok paling ketat (mis. hidrogen, asetilena — MESG terkecil). Karena hierarki gas group bersifat menurun, peralatan IIC juga sah untuk area IIB dan IIA.

Langkah 6 — Temperature Class «T4». Suhu permukaan maksimum peralatan tidak melampaui 135 °C (batas T4). Ini harus lebih rendah daripada suhu penyalaan (ignition temperature) gas yang hadir di area.

Langkah 7 — EPL «Gb». Equipment Protection Level Gb = tingkat proteksi 'tinggi' untuk gas, menautkan peralatan secara langsung ke Zona 1. EPL adalah 'bahasa' IEC yang setara dengan Category ATEX 2G.

Kesimpulan pembacaan: peralatan «II 2G Ex ib IIC T4 Gb» adalah peralatan industri permukaan, intrinsically safe level ib, sah dipasang di Zona 1 (dan Zona 2) untuk semua gas group hingga IIC, selama suhu penyalaan gas di area lebih tinggi dari 135 °C dan suhu ambien berada dalam rentang yang tertera pada label.

Catatan verifikasi: nilai batas suhu tiap temperature class dan pemetaan Category↔Zona↔EPL harus selalu dicek ulang terhadap edisi standar terbaru (IEC 60079-0 untuk penandaan; IEC 60079-14 untuk pemilihan).70 Angka pada handbook ini mengikuti praktik standar yang berlaku umum.

#### 19.5 Penandaan Amerika Utara (NEC/CEC)

Amerika Utara memakai dua sistem yang berjalan berdampingan (lihat Part II, Bab 6). Peralatan ditandai berbeda tergantung sistem yang diikuti.

#### 19.5.1 Sistem Division (NEC 500 / CEC Section 18 lama)

Penandaan Division berbasis Class–Division–Group. Contoh: «Class I, Division 1, Groups C & D, T3». Dibaca sebagai berikut:

Class I — bahaya berupa gas/uap mudah terbakar (Class II = debu; Class III = serat/flyings).

Division 1 — atmosfer eksplosif hadir pada kondisi operasi normal (Division 2 = hanya pada kondisi abnormal).

Groups C & D — kelompok gas Amerika (A=asetilena, B=hidrogen, C=etilena, D=propana/bensin; E/F/G untuk debu).

T-code T3 — batas suhu permukaan ≤ 200 °C (skema T-code NEC sedikit berbeda dari T-class IEC).

Perbedaan filosofis penting: sistem Division tidak memakai konsep EPL dan menganggap peralatan 'explosion-proof' (setara flameproof) atau 'intrinsically safe' sebagai konstruksi utama. Metode proteksi tidak selalu tercetak eksplisit seperti pada IEC.

#### 19.5.2 Sistem Zone (NEC Article 505/506)

Sejak adopsi sistem Zone, NEC 505 (gas) dan 506 (debu) memakai penandaan yang sangat mirip IEC.71 Contoh: «Class I, Zone 1, AEx ib IIC T4». Perhatikan awalan 'A' pada 'AEx' yang menandai varian Amerika dari kode Ex; sisanya (ib IIC T4) identik dengan IEC. Sistem Zone memudahkan harmonisasi global dan menjadi jembatan bagi peralatan yang ingin dipasarkan lintas wilayah.

Gambar 19.2 — Perbandingan penandaan Amerika Utara: sistem Division (NEC 500) versus sistem Zone (NEC 505) yang konvergen dengan IEC/ATEX.

Tabel 19.2 — Ringkasan perbedaan penandaan Division vs Zone di Amerika Utara.

#### 19.6 Peralatan Multi-Approval

Banyak produsen menyertifikasi satu produk untuk beberapa skema sekaligus (ATEX + IECEx + NEC/UL/CSA + skema nasional seperti INMETRO, PESO, EAC). Nameplate lalu memuat beberapa baris penandaan, satu per skema, sering dengan beberapa nomor sertifikat. Membaca peralatan multi-approval berarti: (1) mengidentifikasi baris yang relevan dengan wilayah/otoritas tempat peralatan dipasang; (2) memastikan seluruh baris konsisten (mis. semua menunjuk Zona 1, IIC, T4); dan (3) mengacu ke sertifikat serta instruksi pabrikan yang benar untuk kondisi khusus.

#### 19.7 Sufiks Sertifikat 'X' dan 'U'

Dua huruf pada akhir nomor sertifikat sering menimbulkan kebingungan namun sangat penting:

Sufiks «X» — Specific Conditions of Use. Sertifikat memuat 'kondisi khusus penggunaan' yang wajib dipatuhi agar proteksi tetap sah — mis. batasan jenis kabel, torsi pengencangan, waktu tunggu setelah pemasangan, atau perlindungan mekanik tambahan. Peralatan ber-'X' tetap dapat digunakan langsung, tetapi hanya jika kondisi tersebut dipenuhi.

Sufiks «U» — Ex Component. Menandai komponen Ex (mis. selungkup kosong, glanda, terminal) yang bukan peralatan lengkap dan tidak boleh dipakai sendiri. Komponen 'U' memerlukan sertifikasi lanjutan setelah dirakit menjadi peralatan jadi (mis. frame kabel yang perlu dilas dulu, lalu disertifikasi ulang).

Sumber lapangan menegaskan hal ini: pada produk penyegel kabel (cable transit), frame ber-sufiks 'U' harus disertifikasi kembali setelah pengelasan; sedangkan sufiks 'X' menandai kondisi khusus seperti 'hanya kabel untuk instalasi tetap' atau 'siap pakai paling cepat 24 jam setelah pengencangan sesuai manual Ex'.

#### 19.8 Quick Reference Card — Pembacaan Marking

Kartu ringkas berikut dapat dicetak dan dibawa ke lapangan. Baca marking dari kiri ke kanan; setiap kolom menjawab satu pertanyaan.

Tabel 19.3 — Quick Reference Card pembacaan marking Ex (untuk penggunaan lapangan).

#### Poin Penting

Marking dibaca berurutan kiri→kanan; blok ATEX (II, category) menambahi inti IEC (Ex, type of protection, group, T-class, EPL) yang berlaku universal.

EPL (Ga/Gb/Gc, Da/Db/Dc) menautkan peralatan langsung ke zona: a→Zona 0/20, b→Zona 1/21, c→Zona 2/22.

Gas group bersifat inklusif menurun: peralatan IIC sah untuk IIB dan IIA; temperature class harus selalu di bawah suhu penyalaan gas di area.

Sistem Amerika Division (NEC 500) berbeda konsep dari Zone (NEC 505); banyak peralatan modern multi-approval dengan beberapa baris penandaan.72

Sufiks 'X' = kondisi khusus penggunaan yang wajib dipatuhi; 'U' = komponen Ex yang perlu sertifikasi lanjutan dan tidak dipakai sendiri.

Selalu verifikasi batas nilai (T-class, Ta) dan pemetaan zona terhadap edisi standar terbaru IEC 60079-0/-14.

Catatan dan Rujukan — Bab 19 (catatan 64–72)

64.  CSA C22.1, Canadian Electrical Code (CEC), Part I — Section 18 dan Annex J: Hazardous Locations.

65.  IEC 60079-0, Explosive atmospheres — Part 0: Equipment — General requirements.

66.  IEC 60079-1, Explosive atmospheres — Part 1: Equipment protection by flameproof enclosures "d".

67.  IEC 60079-11, Explosive atmospheres — Part 11: Equipment protection by intrinsic safety "i".

68.  IEC 60079-7, Explosive atmospheres — Part 7: Equipment protection by increased safety "e".

69.  Directive 2014/34/EU of the European Parliament and of the Council on equipment and protective systems intended for use in potentially explosive atmospheres (ATEX Equipment Directive).

70.  IEC 60079-14, Explosive atmospheres — Part 14: Electrical installations design, selection and erection.

71.  NFPA 70 (NEC) Article 505, Zone Classification System for Class I Locations.

72.  NFPA 70 (NEC) Article 500–504, Hazardous (Classified) Locations — sistem Class/Division.

Standar lain yang dirujuk pada tabel dan gambar bab ini:

•  IEC 60529, Degrees of protection provided by enclosures (IP Code).

Pustaka pendukung:

•  Singh, A. K. (2023). Explosion-Proof Equipment in Hazardous Area. Springer. [Berkas: 823211066-Arvind-Kumar-Singh-Explosion-Proof-Equipment-in-Hazardous-Area-Springer-2023.pdf]

•  Linström, H.-J. Basic Concepts for Explosion Protection. [Berkas: 193650475-Basic-Concepts-for-Explosion-Protection.pdf]

•  Kumar, H. Safety in Instrumentation & Control Systems, Unit 1. [Berkas: 886653684-Document-From-Hemanth-s-Kumar.pdf]

•  IESSA. Hazardous Area Course Notes. [Berkas: 793764224-Iessa-Haz-Course-Notes.pdf]

•  R. STAHL. Essential Explosion Protection. [Berkas: 695762365-ex-essential-explosion-protection-rstahl.pdf]

•  Hazardous Areas Technical Guide. [Berkas: 120420138-ATEX.pdf]

### Bab 20 — Pemilihan Peralatan yang Tepat (Equipment Selection)

#### 20.1 Tujuan Bab

Bab ini menyajikan metodologi memilih peralatan Ex yang benar untuk suatu lokasi. Tujuannya agar pembaca dapat mencocokkan hasil klasifikasi area (zona, gas/dust group, suhu penyalaan) dengan marking peralatan (EPL/kategori, group, temperature class), sekaligus mempertimbangkan faktor lingkungan (IP rating, suhu ambien, korosi, beban mekanik). Pemilihan yang tepat adalah 'jembatan' antara klasifikasi area (Part III) dan instalasi (Bab 21): peralatan yang salah pilih akan tetap salah meskipun dipasang dengan sempurna.

Prinsip pemilihan diatur terutama dalam IEC 60079-14 (desain, pemilihan, dan pemasangan instalasi listrik di hazardous area), yang menerjemahkan hasil klasifikasi menjadi persyaratan peralatan.73

#### 20.2 Enam Parameter Pencocokan

Pemilihan peralatan Ex dilakukan dengan mencocokkan enam parameter berikut secara bersamaan. Kegagalan pada satu parameter saja membuat peralatan tidak sesuai.

Tabel 20.1 — Enam parameter yang harus dicocokkan dalam pemilihan peralatan Ex.

#### 20.3 Mencocokkan Zona ↔ EPL / Kategori

Langkah pertama dan paling menentukan adalah mencocokkan zona dengan Equipment Protection Level (EPL) atau kategori ATEX. Tabel 20.2 memberikan pemetaan baku (lihat juga Part IV, Bab 14).

Tabel 20.2 — Pemetaan zona ke EPL (IECEx) dan kategori (ATEX) untuk gas dan debu.

#### 20.4 Prinsip “Boleh Turun Zona, Tidak Boleh Naik”

Ini adalah aturan emas pemilihan peralatan. Peralatan dengan EPL lebih tinggi (proteksi lebih kuat) selalu boleh digunakan di zona yang lebih ringan, tetapi tidak sebaliknya. Secara formal:

Boleh: peralatan Ga (Zona 0) → dipasang di Zona 1 atau Zona 2; peralatan Gb (Zona 1) → dipasang di Zona 2. Peralatan 'over-specified' aman karena marginnya lebih besar.

Tidak boleh: peralatan Gc (Zona 2) → dipasang di Zona 1 atau Zona 0; peralatan Gb → dipasang di Zona 0. Peralatan 'under-specified' tidak memiliki margin proteksi yang disyaratkan zona lebih berat.

Gambar 20.1 — Prinsip “boleh turun zona, tidak boleh naik”: peralatan dengan EPL lebih tinggi sah di zona yang lebih ringan, tidak sebaliknya.

Aturan setara berlaku untuk gas group (IIC boleh menggantikan IIB dan IIA — bukan sebaliknya) dan dust group (IIIC boleh menggantikan IIIB dan IIIA). Untuk temperature class, kelas dengan suhu lebih rendah 'lebih aman': T6 (≤85 °C) boleh menggantikan T5…T1; T4 boleh menggantikan T3…T1, tetapi tidak boleh menggantikan T5/T6.

Catatan penting untuk debu: berbeda dari gas, dust group tidak sepenuhnya 'inklusif menurun'. Debu konduktif (Group IIIC) menuntut peralatan Group IIIC; peralatan yang hanya disertifikasi untuk IIIB (debu non-konduktif) tidak sah untuk area dengan debu konduktif. Sebaliknya peralatan IIIC sah untuk IIIB dan IIIA. Selalu perhatikan resistivitas debu dan ketebalan lapisan pada penentuan suhu.

#### 20.5 Mencocokkan Temperature Class & Suhu Ambien

Dua besaran suhu harus dibedakan dengan tegas: temperature class (suhu permukaan maksimum peralatan) dan suhu ambien (suhu lingkungan tempat peralatan dipasang).

#### 20.5.1 Temperature Class vs Suhu Penyalaan

Suhu permukaan maksimum peralatan (dinyatakan oleh temperature class) harus lebih rendah daripada suhu penyalaan (ignition temperature) gas/uap yang mungkin hadir. Untuk debu, batas suhu permukaan dibatasi oleh dua kriteria: dua pertiga (2/3) suhu penyalaan awan debu, dan suhu penyalaan lapisan debu dikurangi 75 K (untuk lapisan hingga 5 mm). Tabel 20.3 mengingatkan batas T-class.

Tabel 20.3 — Batas temperature class (IEC) dan contoh kesesuaian. Nilai ignition temperature bersifat indikatif; verifikasi ke data zat.

#### 20.5.2 Suhu Ambien (Ta)

Sertifikasi berlaku untuk rentang suhu ambien standar (umumnya −20 °C…+40 °C) kecuali label menyatakan lain (mis. Ta −40 °C…+60 °C). Bila lokasi lebih panas dari batas atas Ta, suhu permukaan aktual peralatan dapat melampaui temperature class-nya — proteksi tidak lagi sah. Bila lebih dingin dari batas bawah, material (mis. plastik, gasket) dapat menjadi getas. Selalu pastikan suhu ambien lokasi berada di dalam rentang Ta yang tertera.

#### 20.6 Faktor Lingkungan: IP Rating, Korosi & Mekanik

Selain kesesuaian Ex, peralatan harus bertahan terhadap lingkungan fisik agar integritas proteksi tidak menurun sepanjang umur pakai.

IP rating (IEC 60529).74 Angka pertama = proteksi terhadap benda padat/debu (0–6); angka kedua = terhadap air (0–8/9K). Untuk area debu (Zona 20/21/22), proteksi debu tinggi (IP6X 'dust-tight' atau minimal IP5X) menjadi bagian integral dari proteksi Ex tipe 't' (enclosure). Lingkungan basah/wash-down menuntut IPX5/IPX6.

Korosi. Lingkungan pesisir, H₂S, atau bahan kimia menuntut material tahan korosi (stainless steel 316, paduan khusus) atau pelapisan. Korosi pada permukaan flens flameproof (Ex d) dapat merusak celah (flame path) dan menghilangkan proteksi.

Beban mekanik & impact. IEC 60079-0 menetapkan uji ketahanan benturan (impact) dan proteksi mekanik.75 Pada Zona 0/20 dan EPL tinggi, ketahanan mekanik lebih ketat. Perangkat genggam menuntut ketahanan jatuh dan getaran.

Getaran, radiasi UV, dan bahan kimia proses. Getaran dapat mengendurkan terminasi; UV menua material non-logam; pelarut dapat merusak encapsulation (Ex m). Faktor-faktor ini masuk dalam penilaian pemilihan.

#### 20.7 Contoh Kasus Pemilihan

Kasus: transmitter tekanan untuk sistem pemipaan gas alam pada platform lepas pantai. Hasil klasifikasi: Zona 1, gas group IIA/IIB (metana dominan, kemungkinan sedikit H₂S), suhu penyalaan metana ~537 °C, suhu ambien −10 °C…+55 °C, lingkungan korosif (garam laut), potensi semprotan air.

Penalaran pemilihan:

Zona 1 → butuh EPL Gb (Category 2G) atau lebih tinggi. Transmitter intrinsically safe «Ex ib» memenuhi (Gb).

Gas group → IIB memadai, tetapi memilih «IIC» memberi margin dan fleksibilitas (IIC ⊇ IIB ⊇ IIA).

Temperature class → karena ignition metana tinggi, T4 (≤135 °C) sudah lebih dari cukup; T4 dipilih sebagai standar umum.

Suhu ambien → butuh label Ta yang mencakup +55 °C, mis. Ta −20 °C…+60 °C. Verifikasi label; jangan asumsikan default +40 °C.

Lingkungan → pilih housing SS316, minimal IP66/IP67 untuk semprotan/garam.

Hasil: transmitter «II 2G Ex ib IIC T4 Gb, Ta −20…+60 °C, IP66/67, SS316». Peralatan ini juga sah bila kelak dipindah ke area Zona 2 (turun zona), tetapi tidak boleh dipakai di Zona 0 tanpa peralatan ber-EPL Ga (Ex ia).

#### Poin Penting

Pilih peralatan dengan mencocokkan enam parameter sekaligus: zona↔EPL/kategori, gas/dust group, temperature class, suhu ambien (Ta), IP rating, dan ketahanan mekanik/korosi.

Aturan emas: 'boleh turun zona, tidak boleh naik' — EPL lebih tinggi (Ga) sah di zona lebih ringan, tidak sebaliknya.

Gas group inklusif menurun (IIC⊇IIB⊇IIA); untuk debu perhatikan bahwa Group IIIC (debu konduktif) tidak dapat digantikan peralatan IIIB.

Temperature class harus di bawah suhu penyalaan zat; suhu ambien aktual harus di dalam rentang Ta yang tertera pada label — jangan asumsikan default −20…+40 °C.

IP rating, material tahan korosi, dan ketahanan mekanik adalah bagian integral proteksi jangka panjang, bukan sekadar pilihan tambahan.

Pemilihan yang benar diatur IEC 60079-14; dokumentasikan penalaran pemilihan agar dapat diaudit.

Catatan dan Rujukan — Bab 20 (catatan 73–75)

73.  IEC 60079-14, Explosive atmospheres — Part 14: Electrical installations design, selection and erection.

74.  IEC 60529, Degrees of protection provided by enclosures (IP Code).

75.  IEC 60079-0, Explosive atmospheres — Part 0: Equipment — General requirements.

Pustaka pendukung:

•  Singh, A. K. (2023). Explosion-Proof Equipment in Hazardous Area. Springer. [Berkas: 823211066-Arvind-Kumar-Singh-Explosion-Proof-Equipment-in-Hazardous-Area-Springer-2023.pdf]

•  Linström, H.-J. Basic Concepts for Explosion Protection. [Berkas: 193650475-Basic-Concepts-for-Explosion-Protection.pdf]

•  Kumar, H. Safety in Instrumentation & Control Systems, Unit 1. [Berkas: 886653684-Document-From-Hemanth-s-Kumar.pdf]

•  IESSA. Hazardous Area Course Notes. [Berkas: 793764224-Iessa-Haz-Course-Notes.pdf]

•  R. STAHL. Essential Explosion Protection. [Berkas: 695762365-ex-essential-explosion-protection-rstahl.pdf]

### Bab 21 — Instalasi, Inspeksi & Pemeliharaan

#### 21.1 Tujuan Bab

Bab ini menjelaskan bagaimana peralatan Ex yang telah dipilih dengan benar dipasang, diinspeksi, dan dipelihara agar integritas proteksi ledakan bertahan sepanjang umur pakai. Dua standar menjadi tulang punggung: IEC 60079-14 (desain, pemilihan & pemasangan instalasi listrik) dan IEC 60079-17 (inspeksi & pemeliharaan).76,77 Bab ini juga membahas integritas mekanik & flens (mengacu praktik CompEx EX11), serta sistem kabel, sealing, dan earthing/bonding. Diakhiri dengan checklist inspeksi yang dapat langsung dipakai.

Prinsip pemandu: sertifikasi pabrikan hanya menjamin peralatan 'apa adanya'. Integritas proteksi di lapangan ditentukan oleh kualitas pemasangan dan kedisiplinan inspeksi/pemeliharaan. Banyak insiden bermula bukan dari cacat peralatan, melainkan dari glanda yang keliru, flens yang terkorosi, atau earthing yang terputus.

#### 21.2 Desain & Instalasi menurut IEC 60079-14

IEC 60079-14 menetapkan bahwa instalasi harus dirancang oleh personel yang memahami klasifikasi area dan tipe proteksi. Prasyarat instalasi mencakup: dokumentasi klasifikasi area (area classification drawing), daftar peralatan beserta marking, serta instruksi pabrikan (termasuk kondisi khusus 'X'). Elemen instalasi yang paling menentukan diuraikan berikut.

Gambar 21.1 — Elemen instalasi Ex menurut IEC 60079-14: cable entry (glanda), sealing, serta sistem earthing/bonding.

#### 21.2.1 Sistem Kabel (Cabling)

Pemilihan dan pemasangan kabel harus sesuai tipe proteksi peralatan dan zona. Beberapa persyaratan pokok:

Jenis kabel sesuai aplikasi: berarmour (SWA), berperisai (braided), atau di dalam conduit, tergantung kebutuhan proteksi mekanik dan metode instalasi setempat.

Sirkuit intrinsically safe (IS) harus dipisahkan (segregasi) dari sirkuit non-IS; kabel IS lazim diberi selubung/inti berwarna biru muda agar mudah dikenali dan tidak tercampur.

Radius tekuk (bending radius), fiksasi, dan penyangga kabel harus memadai untuk mencegah tegangan tarik pada terminasi dan kerusakan isolasi.

Kabel tidak boleh menimbulkan 'jalur' yang memungkinkan gas berpindah antar-area (mis. melalui rongga conduit) tanpa sealing yang sesuai.

#### 21.2.2 Glanda Kabel & Sealing

Cable gland (glanda) adalah titik masuk kabel ke selungkup dan merupakan salah satu sumber kegagalan paling umum. Persyaratan utama:

Glanda harus bersertifikat dan sesuai tipe proteksi selungkup. Untuk selungkup flameproof (Ex d), sering diperlukan barrier gland atau sealing gland (dengan compound) bila kabel tidak berisi (non-filled) atau bila volume/diameter tertentu terlampaui, agar nyala tidak merambat melalui interstis kabel.

Semua lubang masuk yang tidak dipakai harus ditutup dengan stopping plug (blanking element) bersertifikat sesuai tipe proteksi — bukan sekadar baut biasa. Ini mempertahankan tingkat IP dan integritas Ex d/Ex e.

Untuk increased safety (Ex e), glanda harus menjaga tingkat IP terminal chamber dan clamping kabel yang benar.

Untuk kondisi khusus 'X' (mis. pada cable transit), waktu tunggu setelah pengencangan (mis. 24 jam agar compound mengeras) dan jenis kabel yang diizinkan harus dipatuhi sesuai manual Ex pabrikan.

Pemilihan glanda memperhitungkan: material selungkup, diameter & konstruksi kabel, tingkat IP yang dibutuhkan, jenis proteksi (Ex d vs Ex e), dan lingkungan (korosi). Torsi pengencangan harus mengikuti spesifikasi pabrikan.

#### 21.2.3 Earthing & Bonding

Sistem pembumian (earthing) dan penyetaraan potensial (bonding) mencegah beda potensial berbahaya dan percikan, sekaligus menjadi bagian dari beberapa tipe proteksi. Poin penting:

Kontinuitas earthing/bonding harus terjaga di seluruh instalasi; sambungan harus tahan korosi dan diperiksa berkala.

Terminal earth eksternal dan internal harus digunakan sesuai desain peralatan (mis. pada motor Ex e/Ex d).

Untuk sistem intrinsically safe, earth barrier (mis. Zener barrier) memiliki koneksi IS earth khusus yang tidak boleh dilepas tanpa lebih dulu memutus rangkaian hazardous area; IS earth umumnya dipisahkan dan diacu ke titik ekuipotensial tunggal sesuai dokumentasi loop.

Resistansi isolasi dan resistansi loop pembumian diverifikasi saat commissioning dan inspeksi (mis. isolasi diukur pada 500 V dengan nilai minimum sesuai dokumentasi pengguna).

#### 21.3 Integritas Mekanik & Flens (Flameproof Joint)

Untuk peralatan flameproof (Ex d), proteksi bergantung sepenuhnya pada 'flame path' — celah panjang-sempit pada sambungan flens, ulir, atau poros yang mendinginkan gas terbakar hingga aman sebelum keluar (lihat Part V, Bab 16). Integritas mekanik flens karena itu bersifat kritis dan menjadi fokus khusus kompetensi CompEx EX11 (mechanical/flange integrity).

Parameter flameproof joint yang harus dijaga (nilai spesifik ditetapkan oleh sertifikat/standar IEC 60079-1 dan harus diverifikasi ke dokumen tersebut):78

Tabel 21.1 — Parameter integritas flameproof joint (Ex d) dan praktik pemeliharaannya (verifikasi angka ke IEC 60079-1 & sertifikat).

Aturan praktik lapangan yang ditegaskan pelatihan: saat merakit kembali selungkup flameproof, seluruh sambungan harus dibersihkan menyeluruh dan boleh diberi lapisan tipis gemuk yang sesuai untuk mencegah korosi dan membantu ketahanan cuaca; hanya scraper non-logam dan cairan pembersih non-korosif yang boleh dipakai membersihkan flens. Baut, sekrup, dan bagian yang menjadi sandaran tipe proteksi hanya boleh diganti dengan bagian serupa sesuai desain pabrikan.

#### 21.4 Inspeksi menurut IEC 60079-17

IEC 60079-17 mengatur inspeksi dan pemeliharaan. Kerangkanya membedakan dua dimensi: grade of inspection (kedalaman) dan type of inspection (kapan/frekuensi).

Gambar 21.2 — Kerangka inspeksi IEC 60079-17: grade (visual/close/detailed) menetapkan kedalaman; type (initial/periodic/sample/continuous) menetapkan waktu.

#### 21.4.1 Grade of Inspection: Visual, Close, Detailed

Tabel 1–4 pada IEC 60079-17 memerinci butir pemeriksaan untuk tiap grade. Definisi ketiganya:

Visual inspection. Inspeksi yang mengidentifikasi cacat yang tampak oleh mata — mis. baut hilang, kerusakan nyata — tanpa alat akses atau perkakas, tanpa membuka selungkup, dan tanpa mematikan daya. Dapat dilakukan dari lantai atau platform tetap; teropong/kamera termal boleh membantu.

Close inspection. Mencakup seluruh aspek visual, ditambah cacat yang hanya tampak dengan alat akses (mis. tangga) dan perkakas — misalnya memeriksa kekencangan glanda dari dekat. Umumnya masih dapat dilakukan dengan peralatan energized.

Detailed inspection. Mencakup seluruh aspek close, ditambah cacat yang hanya tampak dengan membuka selungkup dan/atau menggunakan perkakas serta alat uji — mis. terminasi kendor. Umumnya menuntut peralatan diisolasi (dimatikan) dan sering memerlukan izin kerja (PTW).

Contoh penerapan: pembongkaran glanda kabel flameproof saat inspeksi termasuk detailed inspection; pemeriksaan bahwa tidak ada modifikasi tak sah pada lampu Ex e cukup lewat visual inspection; pemeriksaan bahwa koneksi listrik kencang pada instalasi IS termasuk close/detailed.

#### 21.4.2 Type of Inspection & Interval

Empat tipe inspeksi dikenal: initial, periodic, sample, dan continuous supervision.

Tabel 21.2 — Tipe inspeksi menurut IEC 60079-17 dan pertimbangan interval.

Ketentuan interval perlu dibaca dengan cermat karena mudah disalahpahami. Yang bersifat normatif pada IEC 60079-17 adalah batas tiga tahun: interval antar-inspeksi periodik tidak boleh melampaui tiga tahun tanpa dilakukan dan didokumentasikannya risk assessment yang berbasis jenis peralatan, lokasi, lingkungan, dan riwayat inspeksi sebelumnya, dan risk assessment itu harus dikerjakan oleh independent expert. Kata "independent" di sini tidak harus berarti pihak atau badan di luar organisasi pengguna. Angka-angka lain yang lazim beredar — misalnya close inspection setiap 12 bulan untuk peralatan bergerak, atau detailed inspection setiap 6 bulan untuk selungkup yang sering dibuka — tidak muncul sebagai ketentuan pada edisi berlaku dan berasal dari edisi lama atau praktik industri; angka semacam itu boleh dipakai sebagai pedoman internal, tetapi jangan dikutip sebagai persyaratan standar. Interval final ditentukan lewat penilaian faktor: paparan getaran, korosi dan lingkungan, kompetensi personel, serta kemungkinan modifikasi atau pemeliharaan yang tidak sesuai.

#### 21.5 Pemeliharaan & Kompetensi Personel

Pemeliharaan (IEC 60079-17) menuntut agar integritas tipe proteksi dijaga: suku cadang harus sesuai dokumentasi keselamatan, dan perubahan yang berdampak pada keselamatan tidak boleh dilakukan tanpa otorisasi. Untuk rangkaian intrinsically safe, pemeliharaan komponen di area non-berbahaya (mis. barrier) dibatasi pada pemutusan/penggantian; koneksi earth barrier tidak boleh dilepas sebelum rangkaian hazardous area diputus.

Personel yang melakukan inspeksi/pemeliharaan harus kompeten: memahami klasifikasi area/EPL dan implikasinya, menguasai persyaratan teknis peralatan Ex, serta memahami perbedaan visual/close/detailed. Kompetensi diverifikasi berkala (interval tidak melebihi 5 tahun) melalui skema seperti CompEx (EX01–EX04, EX11) atau IECEx CoPC (dibahas mendalam pada Part VII, Bab 24).

#### 21.6 Checklist Inspeksi (Ringkas)

Checklist berikut memadukan butir umum IEC 60079-17. Sesuaikan grade (visual/close/detailed) dengan tipe proteksi dan jadwal. Tandai 'OK / Tidak / N-A' untuk tiap butir dan catat tindakan.

Tabel 21.3 — Checklist inspeksi peralatan Ex (ringkas) berdasar IEC 60079-17. Grade minimum bersifat indikatif.

#### Poin Penting

Integritas proteksi ledakan ditentukan oleh kualitas instalasi (IEC 60079-14) dan kedisiplinan inspeksi/pemeliharaan (IEC 60079-17), bukan hanya sertifikasi pabrikan.

Glanda kabel yang benar, stopping plug bersertifikat pada lubang tak terpakai, dan sealing/barrier gland (khusus Ex d) adalah titik kritis instalasi.

Earthing/bonding harus kontinu; sirkuit intrinsically safe dipisahkan dari non-IS dan diberi tanda (lazim biru), dengan IS earth sesuai dokumentasi loop.

Untuk flameproof (Ex d), flame path (gap, panjang, kebersihan, bebas korosi/cat) wajib dijaga; bersihkan hanya dengan scraper non-logam dan cairan non-korosif; ganti baut hanya dengan yang sesuai desain.

Grade inspeksi: visual (mata, tanpa alat/buka), close (dengan alat akses), detailed (buka selungkup, isolasi & alat uji). Type: initial, periodic, sample, continuous.

Interval acuan: fixed ≤ 3 tahun, movable ≤ 12 bulan (close), enclosure sering dibuka ≤ 6 bulan (detailed) — verifikasi ke IEC 60079-17 terbaru dan sesuaikan dengan penilaian risiko.

Inspeksi/pemeliharaan hanya oleh personel kompeten (CompEx/IECEx CoPC); kompetensi diverifikasi berkala (≤ 5 tahun).

Catatan dan Rujukan — Bab 21 (catatan 76–78)

76.  IEC 60079-14, Explosive atmospheres — Part 14: Electrical installations design, selection and erection.

77.  IEC 60079-17, Explosive atmospheres — Part 17: Electrical installations inspection and maintenance.

78.  IEC 60079-1, Explosive atmospheres — Part 1: Equipment protection by flameproof enclosures "d".

Pustaka pendukung:

•  IEC 60079-17 Edition 6, Explosive atmospheres — Part 17: Electrical installations inspection and maintenance. [Berkas: 698213096-IEC60079-17-Edition-6-1.pdf]

•  Singh, A. K. (2023). Explosion-Proof Equipment in Hazardous Area. Springer. [Berkas: 823211066-Arvind-Kumar-Singh-Explosion-Proof-Equipment-in-Hazardous-Area-Springer-2023.pdf]

•  Linström, H.-J. Basic Concepts for Explosion Protection. [Berkas: 193650475-Basic-Concepts-for-Explosion-Protection.pdf]

•  Kumar, H. Safety in Instrumentation & Control Systems, Unit 1. [Berkas: 886653684-Document-From-Hemanth-s-Kumar.pdf]

•  IESSA. Hazardous Area Course Notes. [Berkas: 793764224-Iessa-Haz-Course-Notes.pdf]

•  R. STAHL. Essential Explosion Protection. [Berkas: 695762365-ex-essential-explosion-protection-rstahl.pdf]

PART VII

Compliance, Risiko & Kompetensi

Bab 22  ·  Penilaian Risiko & Explosion Protection Document (EPD)

Bab 23  ·  Sertifikasi Produk & Sistem Mutu

Bab 24  ·  Kompetensi Personel (CompEx & IECEx CoPC)

Rujukan teknis untuk engineer instrumentasi/listrik, HSE, operasi & pemeliharaan,

procurement, dan tim teknis perangkat Ex

## PART VII — COMPLIANCE, RISIKO & KOMPETENSI

Part I–VI telah membahas sains ledakan, kerangka regulasi, klasifikasi area, klasifikasi zat & peralatan, metode proteksi, hingga marking, pemilihan, dan instalasi. Semua elemen teknis tersebut hanya menghasilkan keselamatan nyata bila diikat oleh tiga pilar tata kelola: penilaian risiko yang terdokumentasi, sertifikasi produk yang sahih, dan personel yang kompeten. Part VII membahas ketiga pilar ini.

Bab 22 menempatkan seluruh keputusan teknis ke dalam kerangka manajemen risiko — Explosion Risk Assessment ala Uni Eropa yang bermuara pada Explosion Protection Document (EPD), Dust Hazard Analysis (DHA) ala Amerika Serikat, serta integrasinya dengan HAZOP dan Management of Change (MoC). Bab 23 menjelaskan bagaimana sebuah produk Ex memperoleh sertifikat: alur Type Examination, peran laboratorium uji dan badan sertifikasi, arti sufiks 'X' dan 'U', serta sistem mutu produksi yang menjaga sertifikat tetap sahih. Bab 24 menutup dengan faktor manusia: skema kompetensi CompEx dan IECEx CoPC, peran dan tanggung jawab tiap pihak, budaya keselamatan, dan kesalahan umum di lapangan.

Prinsip yang menyatukan Part VII: kepatuhan (compliance) bukan pekerjaan sekali jadi, melainkan siklus hidup — dinilai, didokumentasikan, diverifikasi, dan ditinjau ulang sepanjang umur instalasi.

### Bab 22 — Penilaian Risiko & Explosion Protection Document (EPD)

#### 22.1 Tujuan Bab

Setelah menyelesaikan bab ini, pembaca diharapkan mampu: (a) membedakan dua kelompok regulasi keselamatan ledakan — regulasi bagi pemilik fasilitas (safe plant) dan regulasi bagi produsen peralatan (safe equipment); (b) menjalankan langkah-langkah Explosion Risk Assessment (penilaian risiko ledakan) sesuai pendekatan Uni Eropa; (c) menyusun dan membaca Explosion Protection Document (EPD) sebagaimana diwajibkan ATEX 1999/92/EC dan diterapkan di Britania Raya melalui DSEAR; (d) menjelaskan metodologi Dust Hazard Analysis (DHA) menurut kerangka NFPA 652/654/61; dan (e) mengaitkan penilaian risiko ledakan dengan HAZOP dan Management of Change.79,80

#### 22.2 Definisi & Kerangka Regulasi

Penilaian risiko ledakan (explosion risk assessment) adalah proses sistematis untuk mengidentifikasi di mana atmosfer eksplosif dapat terbentuk, seberapa sering dan seberapa lama, sumber penyalaan (ignition source) apa yang mungkin hadir, serta seberapa besar konsekuensinya — lalu menetapkan tindakan pengendalian sampai risiko sisa (residual risk) berada pada tingkat yang dapat diterima. Hasilnya dirangkum dalam sebuah dokumen formal.

Regulasi keselamatan ledakan di dunia jatuh ke dalam dua kelompok yang saling melengkapi. Memisahkan keduanya penting agar tidak tertukar antara kewajiban pemberi kerja dan kewajiban produsen (lihat pula Part II, Bab 4–6).

Tabel 22.1 — Dua kelompok regulasi keselamatan ledakan dan sasarannya.

Bab ini berfokus pada kelompok safe plant — kewajiban penilaian dan dokumentasi risiko yang dibebankan kepada pemilik fasilitas. Kelompok safe equipment (sertifikasi produk) dibahas pada Bab 23.

#### 22.3 Explosion Risk Assessment (Pendekatan Uni Eropa)

Di Uni Eropa, Directive 1999/92/EC (ATEX 153, 'Workers Directive') mewajibkan pemberi kerja yang prosesnya dapat menimbulkan atmosfer eksplosif untuk melakukan analisis risiko dan membuktikan kepatuhan melalui penilaian risiko yang terdokumentasi. Standar teknis pendukungnya adalah seri EN 1127-1 (konsep dasar & metodologi pencegahan dan proteksi ledakan) bersama seri IEC/EN 60079 untuk klasifikasi area dan pemilihan peralatan.81

Alur penilaian bersifat berulang (iteratif): setiap kali tindakan pengendalian ditambah atau proses berubah, langkah-langkah diulang untuk memastikan risiko sisa tetap dapat diterima. Gambar 22.1 meringkas alurnya.

Gambar 22.1 — Alur Explosion Risk Assessment yang bermuara pada penyusunan EPD; loop kuning menandakan tinjauan berkala dan Management of Change.

#### 22.3.1 Identifikasi zat & pembentukan atmosfer eksplosif

Langkah pertama adalah mendata seluruh zat mudah terbakar (flammable substance) yang hadir — gas, uap, mist, atau debu (dust) — beserta parameter rekayasa ledakannya: batas mudah terbakar bawah dan atas (LEL/UEL, Lower/Upper Explosive Limit), flash point (titik nyala), suhu penyalaan (ignition temperature), energi penyalaan minimum (MIE, Minimum Ignition Energy), dan untuk debu ditambah nilai Kst serta Pmax. Parameter ini menentukan gas group, temperature class, dan kemudahan penyalaan (lihat Part IV, Bab 12–13).

Selanjutnya dinilai kemungkinan terbentuknya atmosfer eksplosif: apakah zat dapat lepas ke udara pada konsentrasi antara LEL dan UEL, dari sumber pelepasan (source of release) mana, dengan grade of release apa (continuous, primary, secondary), dan bagaimana peran ventilasi. Hasil tahap ini adalah klasifikasi area menjadi zona (lihat Part III).

#### 22.3.2 Identifikasi sumber penyalaan — 13 sumber EN 1127-1

Atmosfer eksplosif hanya membahayakan bila bertemu sumber penyalaan yang cukup energik. EN 1127-1 mengenali 13 jenis sumber penyalaan yang harus ditinjau satu per satu terhadap setiap zona. Meninjau seluruh 13 kategori secara terstruktur mencegah sumber penyalaan 'tersembunyi' terlewat.

Tabel 22.2 — Tiga belas sumber penyalaan menurut EN 1127-1 (dikelompokkan; urutan penomoran dapat berbeda antar-edisi — verifikasi ke edisi terbaru).

Contoh praktis yang sering muncul: percikan mekanis dari sudu (impeller) yang patah dan beradu dengan rumah logam pada fan atau hammermill; panas gesekan pada bearing bucket elevator dan screw conveyor; percikan spark discharge dari listrik statis pada operator, drum logam, atau tanker truck yang tak di-bonding; serta panas hot-work (pengelasan) saat pemeliharaan. Karena itu hot-work permit dan bonding/earthing menjadi kendali wajib.

#### 22.3.3 Evaluasi risiko: Likelihood × Severity

Setelah zona dan sumber penyalaan dipetakan, risiko tiap skenario dievaluasi sebagai fungsi dari kemungkinan (likelihood) dan keparahan (severity). Likelihood mempertimbangkan potensi hadirnya atmosfer eksplosif sekaligus potensi hadirnya sumber penyalaan efektif pada waktu yang sama; severity mempertimbangkan besarnya konsekuensi terhadap manusia, aset, dan lingkungan — termasuk potensi rambatan ledakan (deflagration propagation) ke unit lain yang terhubung lewat ducting atau conveyor. Matriks risiko kualitatif membantu memberi peringkat dan memprioritaskan tindakan (Gambar 22.2).

Gambar 22.2 — Contoh matriks risiko kualitatif Likelihood × Severity untuk memberi peringkat prioritas tindakan pengendalian.

Skenario 'What-If' dikembangkan untuk tiap titik bahaya: parameter operasi aman, safeguard/engineering control yang telah ada dan yang bisa ditambah, peralatan dan hunian di sekitar titik bahaya, unit yang terhubung, serta potensi rantai kejadian. Tindakan kemudian disusun mengikuti hirarki pengendalian (lihat Part I, Bab 3): pencegahan terbentuknya atmosfer eksplosif → penghilangan sumber penyalaan (termasuk pemilihan peralatan Ex yang tepat) → mitigasi konstruktif (explosion venting, suppression, isolation, containment).

#### 22.4 Explosion Protection Document (EPD) / DSEAR

Explosion Protection Document (EPD) adalah dokumen formal yang membuktikan bahwa risiko ledakan telah dinilai dan bahwa tindakan teknis serta organisatoris yang memadai telah diterapkan dan didokumentasikan. ATEX 1999/92/EC mewajibkan setiap pemberi kerja yang prosesnya dapat menimbulkan atmosfer eksplosif untuk menyusun dan memelihara EPD. Di Britania Raya, kewajiban setara diatur oleh DSEAR (Dangerous Substances and Explosive Atmospheres Regulations), yang bekerja berdampingan dengan COSHH untuk aspek zat berbahaya bagi kesehatan.

EPD bukan dokumen statis: ia ditinjau ulang secara berkala dan setiap kali terjadi perubahan pada zat, proses, peralatan, atau tata letak. Isi minimum EPD dirangkum pada Tabel 22.3.

Tabel 22.3 — Elemen minimum yang harus dimuat sebuah Explosion Protection Document (ringkasan persyaratan ATEX 1999/92/EC).

#### 22.4.1 Template ringkas struktur EPD

Template berikut memberi kerangka bagian-bagian sebuah EPD yang lengkap. Judul bagian dapat disesuaikan dengan kebijakan mutu organisasi, namun substansi tiap bagian sebaiknya dipertahankan agar dokumen memenuhi persyaratan regulasi.

Tabel 22.4 — Template ringkas struktur Explosion Protection Document (EPD).

#### 22.5 Dust Hazard Analysis (Pendekatan Amerika Serikat — NFPA)

Di Amerika Serikat tidak ada satu regulasi federal tunggal yang setara EPD; sebagai gantinya, kepatuhan dibangun di atas standar konsensus NFPA yang, bersama OSHA General Duty Clause, menjadi acuan praktik yang diakui. Instrumen kuncinya adalah Dust Hazard Analysis (DHA) — analisis sistematis bahaya kebakaran, deflagrasi (deflagration), dan ledakan pada proses yang menangani debu mudah terbakar (combustible dust).

NFPA 652 (Standard on the Fundamentals of Combustible Dust) berperan sebagai standar induk yang mewajibkan DHA dan menetapkan kerangka dasarnya; standar sektoral melengkapi sesuai jenis material dan industri. Bila terjadi konflik, standar komoditas/industri spesifik umumnya diberi prioritas di atas standar induk.

Tabel 22.5 — Peta ringkas standar NFPA untuk bahaya debu; NFPA 652 sebagai induk, NFPA 654/61 sebagai standar sektor yang paling sering dirujuk.

Proses DHA menempuh alur yang paralel dengan explosion risk assessment ala EU, namun berpusat pada karakterisasi debu dan titik-titik penanganannya (Gambar 22.3). Hasil uji laboratorium debu — antara lain Kst (indeks laju kenaikan tekanan), Pmax (tekanan ledakan maksimum), dan MIE — menentukan apakah debu tergolong eksplosif dan seberapa parah konsekuensinya.

Gambar 22.3 — Alur Dust Hazard Analysis (DHA) menurut kerangka NFPA 652; kotak hijau menegaskan sifat DHA sebagai program berkelanjutan.

DHA bukan kegiatan sekali jalan: NFPA mewajibkan tinjauan dan pemutakhiran berkala (umumnya dengan interval maksimum lima tahun) dan setiap kali ada perubahan proses — sekali lagi menautkan analisis risiko ke Management of Change. Perlu diverifikasi ke edisi NFPA 652/654/61 terbaru untuk interval, ambang, dan definisi yang berlaku.

#### 22.6 Integrasi dengan HAZOP & Management of Change

Penilaian risiko ledakan tidak berdiri sendiri. Ia paling efektif ketika ditautkan ke dua proses manajemen proses yang lebih luas: HAZOP dan Management of Change (MoC).

HAZOP — HAZOP (Hazard and Operability Study) meninjau penyimpangan proses (deviation) menggunakan guideword (misal MORE, LESS, NO, REVERSE) terhadap parameter seperti aliran, tekanan, suhu, dan level. Penyimpangan yang dapat menciptakan atmosfer eksplosif atau sumber penyalaan (misal overpressure, kebocoran, kegagalan inerting/pemanas berlebih) menjadi input langsung bagi explosion risk assessment, EPD, dan DHA.

Management of Change — Management of Change (MoC) memastikan setiap perubahan zat, proses, peralatan, perangkat lunak kendali, atau tata letak dievaluasi ulang terhadap dampaknya pada klasifikasi zona, kesesuaian peralatan Ex, dan sumber penyalaan — sebelum perubahan diterapkan. MoC adalah mekanisme yang menjaga EPD dan DHA tetap mutakhir sepanjang umur instalasi.

Alur yang sehat: temuan HAZOP → memperbarui penilaian risiko ledakan → memperbarui EPD/DHA → perubahan apa pun berikutnya melewati MoC → memicu tinjauan ulang. Loop inilah yang mengubah kepatuhan dari 'dokumen di rak' menjadi sistem yang hidup.

#### 22.7 Studi Kasus: Dust Collector pada Lini Penggilingan

Sebuah pabrik pengolahan pangan mengoperasikan hammermill yang terhubung ke sebuah dust collector melalui ducting. DHA mengidentifikasi debu produk sebagai combustible dust (Kst > 0, MIE rendah). Skenario What-If: percikan mekanis dari benda asing logam yang masuk hammermill dapat menyalakan awan debu; ledakan lalu merambat lewat ducting ke dust collector (deflagration propagation) dan berpotensi ledakan sekunder dari lapisan debu yang terangkat. Peringkat risiko: Likelihood 'Sesekali' × Severity 'Katastropik' → kategori tinggi (tak dapat diterima).

Tindakan yang ditetapkan dan didokumentasikan dalam EPD/DHA: magnetic separator + pemisah benda asing di hulu (pencegahan sumber penyalaan); explosion venting pada dust collector dan chemical isolation/rotary valve pada ducting (mitigasi & pencegahan rambatan); pemilihan peralatan listrik sesuai zona 20/21/22 di dalam dan sekitar collector (lihat Part IV & VI); housekeeping ketat untuk mencegah akumulasi lapisan debu; hot-work permit dan bonding/earthing. Setiap modifikasi collector di masa depan melewati MoC yang memicu pemutakhiran DHA.

Catatan dan Rujukan — Bab 22 (catatan 79–81)

79.  Directive 1999/92/EC of the European Parliament and of the Council on minimum requirements for improving the safety and health protection of workers potentially at risk from explosive atmospheres (ATEX Workplace Directive).

80.  NFPA 652, Standard on the Fundamentals of Combustible Dust.

81.  EN 1127-1, Explosive atmospheres — Explosion prevention and protection — Part 1: Basic concepts and methodology.

Standar lain yang dirujuk pada tabel dan gambar bab ini:

•  Directive 2014/34/EU of the European Parliament and of the Council on equipment and protective systems intended for use in potentially explosive atmospheres (ATEX Equipment Directive).

•  CSA C22.1, Canadian Electrical Code (CEC), Part I — Section 18 dan Annex J: Hazardous Locations.

•  IEC 60079-10-1, Explosive atmospheres — Part 10-1: Classification of areas — Explosive gas atmospheres.

•  IEC 60079-17, Explosive atmospheres — Part 17: Electrical installations inspection and maintenance.

•  NFPA 654, Standard for the Prevention of Fire and Dust Explosions from the Manufacturing, Processing, and Handling of Combustible Particulate Solids.

Pustaka pendukung:

•  EIGA / IGC Doc 134/05, Potentially Explosive Atmosphere — panduan industri gas atas Directive 1999/92/EC. Dokumen ini merupakan interpretasi industri, bukan teks directive. [Berkas: 161349468-111010-Directiva-ATEX-1999-92-EC-Doc-134-05-E.pdf]

•  Singh, A. K. (2023). Explosion-Proof Equipment in Hazardous Area. Springer. [Berkas: 823211066-Arvind-Kumar-Singh-Explosion-Proof-Equipment-in-Hazardous-Area-Springer-2023.pdf]

•  Linström, H.-J. Basic Concepts for Explosion Protection. [Berkas: 193650475-Basic-Concepts-for-Explosion-Protection.pdf]

•  Kumar, H. Safety in Instrumentation & Control Systems, Unit 1. [Berkas: 886653684-Document-From-Hemanth-s-Kumar.pdf]

•  IESSA. Hazardous Area Course Notes. [Berkas: 793764224-Iessa-Haz-Course-Notes.pdf]

•  R. STAHL. Essential Explosion Protection. [Berkas: 695762365-ex-essential-explosion-protection-rstahl.pdf]

### Bab 23 — Sertifikasi Produk & Sistem Mutu

#### 23.1 Tujuan Bab

Bab ini bertujuan agar pembaca dapat: (a) menjelaskan prinsip conformity assessment (penilaian kesesuaian) untuk peralatan Ex; (b) mengurai alur sertifikasi dari pengajuan pabrikan hingga terbitnya sertifikat, termasuk peran laporan uji ExTR; (c) membedakan skema IECEx dan ATEX serta padanan istilahnya; (d) menafsirkan sufiks 'X' dan 'U' pada nomor sertifikat; dan (e) mengenali peran Notified Body, ExCB, dan ExTL beserta fungsi sistem mutu (QAN/QAR) dalam menjaga validitas sertifikat.

#### 23.2 Definisi & Prinsip Conformity Assessment

Sertifikasi produk Ex adalah proses pihak ketiga yang independen untuk memverifikasi bahwa sebuah peralatan atau sistem proteksi memenuhi persyaratan keselamatan yang berlaku — di Uni Eropa berupa Essential Health and Safety Requirements (EHSR) ATEX 2014/34/EU, dan secara internasional berupa seri standar IEC 60079.82 Verifikasi ini menghasilkan sertifikat dan mengizinkan produk diberi marking yang sah (lihat anatomi marking di Part VI, Bab 19).

Prinsipnya bertumpu pada dua pilar yang saling melengkapi: (1) kesesuaian desain — produk contoh diuji dan dievaluasi terhadap standar; dan (2) kesesuaian produksi — sistem mutu pabrikan diaudit agar setiap unit yang diproduksi identik dengan contoh yang telah disertifikasi. Sertifikat tanpa sistem mutu yang diawasi tidak menjamin konsistensi produksi.

#### 23.3 Alur Type Examination & ExTR

Alur umum sertifikasi ditunjukkan pada Gambar 23.1. Pabrikan menyerahkan sampel produk beserta berkas teknis (technical documentation) dan gambar desain. Laboratorium uji melakukan pengujian dan evaluasi teknis terhadap standar IEC 60079 yang relevan (misalnya -0 persyaratan umum, -1 flameproof Ex d, -7 increased safety Ex e, -11 intrinsic safety Ex i). Hasil pengujian direkam dalam sebuah laporan uji formal, lalu badan sertifikasi menilai laporan itu dan menerbitkan sertifikat.

Gambar 23.1 — Alur sertifikasi produk Ex, dari pengajuan pabrikan hingga surveilans sistem mutu; berlaku serupa untuk skema IECEx maupun ATEX.

ExTR (Ex Test Report) adalah laporan uji terstandardisasi dalam skema IECEx yang merekam hasil pengujian terhadap tiap klausul standar. Karena formatnya seragam secara internasional, ExTR dapat diterima antar-negara dan antar-badan sertifikasi anggota IECEx, sehingga menghindari pengujian ulang — inilah inti nilai IECEx sebagai skema global (lihat Part II, Bab 5).

#### 23.4 Skema IECEx vs ATEX: Padanan Istilah

Dua skema utama beroperasi berdampingan. IECEx bersifat sukarela dan global; ATEX bersifat wajib untuk pasar Uni Eropa. Keduanya memakai landasan teknis yang sama (IEC/EN 60079) sehingga banyak istilahnya berpadanan, meski dokumen dan badan yang menerbitkannya berbeda.

Tabel 23.1 — Padanan istilah dan dokumen antara skema IECEx dan ATEX.

Banyak produk membawa multi-approval (IECEx + ATEX, sering ditambah sertifikasi Amerika Utara). Prinsip pembacaannya: tiap skema punya nomor sertifikat dan penandaan sendiri, namun inti proteksi (tipe proteksi, gas group, temperature class, EPL) harus konsisten antar-skema.

#### 23.5 Sertifikat 'X' (Kondisi Khusus) & 'U' (Komponen)

Nomor sertifikat Ex sering berakhiran huruf X atau U. Dua sufiks ini mengubah cara peralatan boleh digunakan dan wajib dipahami oleh designer, installer, maupun inspector.

Tabel 23.2 — Arti sufiks 'X' dan 'U' pada nomor sertifikat Ex.

Contoh pembacaan nomor sertifikat (skematik): «IECEx ABC 16.0001X» — diterbitkan skema IECEx oleh ExCB berkode ABC, tahun 2016, urutan 0001, dengan sufiks X yang berarti ada kondisi khusus penggunaan yang harus dipatuhi. Padanan ATEX: «ABC 16 ATEX 0044X», di mana empat digit sesudah 'ATEX' adalah nomor sertifikat dan angka setelah nama badan adalah nomor Notified Body. Selalu rujuk teks sertifikat untuk isi kondisi khusus; jangan berasumsi dari nomor saja.

#### 23.6 Peran Notified Body / ExCB / ExTL

Rantai sertifikasi melibatkan beberapa jenis badan dengan peran berbeda. Memisahkan peran ini penting agar pengguna tahu dokumen apa datang dari siapa dan apa artinya bagi keabsahan produk.

Tabel 23.3 — Peran badan-badan dalam rantai sertifikasi Ex.

#### 23.7 Sistem Mutu Produksi (QAN / QAR) & Surveilans

Sertifikat desain hanya membuktikan bahwa contoh produk memenuhi standar. Agar setiap unit produksi tetap konsisten, pabrikan wajib menjalankan sistem mutu (quality system) yang diaudit pihak ketiga. Dalam IECEx, audit ini menghasilkan QAR (Quality Assessment Report) dan pemeliharaan sertifikat mutu (QMS). Dalam ATEX, pabrikan menotifikasi sistem mutunya melalui QAN (Quality Assurance Notification) sesuai modul yang dipilih (mis. Module D untuk production quality assurance).

Surveilans berkala oleh badan sertifikasi menjaga validitas sertifikat: bila sistem mutu menurun atau desain berubah tanpa evaluasi ulang, sertifikat dapat dibekukan atau dicabut. Bagi procurement dan engineer, ini berarti: memverifikasi bahwa sertifikat masih berlaku dan sesuai edisi standar terbaru sama pentingnya dengan sekadar melihat marking di nameplate.

Catatan dan Rujukan — Bab 23 (catatan 82–82)

82.  Directive 2014/34/EU of the European Parliament and of the Council on equipment and protective systems intended for use in potentially explosive atmospheres (ATEX Equipment Directive).

Pustaka pendukung:

•  Singh, A. K. (2023). Explosion-Proof Equipment in Hazardous Area. Springer. [Berkas: 823211066-Arvind-Kumar-Singh-Explosion-Proof-Equipment-in-Hazardous-Area-Springer-2023.pdf]

•  Linström, H.-J. Basic Concepts for Explosion Protection. [Berkas: 193650475-Basic-Concepts-for-Explosion-Protection.pdf]

•  Kumar, H. Safety in Instrumentation & Control Systems, Unit 1. [Berkas: 886653684-Document-From-Hemanth-s-Kumar.pdf]

•  IESSA. Hazardous Area Course Notes. [Berkas: 793764224-Iessa-Haz-Course-Notes.pdf]

•  R. STAHL. Essential Explosion Protection. [Berkas: 695762365-ex-essential-explosion-protection-rstahl.pdf]

### Bab 24 — Kompetensi Personel (CompEx & IECEx CoPC)

#### 24.1 Tujuan Bab

Bab ini bertujuan agar pembaca dapat: (a) menjelaskan mengapa kompetensi personel adalah pengendali risiko yang sama pentingnya dengan peralatan bersertifikat; (b) mengenali struktur skema kompetensi CompEx (unit EX01–EX04 dan EX11) serta IECEx CoPC (Unit Ex 001+); (c) memetakan peran dan tanggung jawab designer, installer, inspector, dan dutyholder; dan (d) mengidentifikasi ciri budaya keselamatan yang sehat serta kesalahan umum di lapangan yang merusak integritas proteksi ledakan.

#### 24.2 Definisi & Mengapa Kompetensi Penting

Kompetensi (competency) adalah kombinasi pengetahuan (knowledge), keterampilan (skill), dan pengalaman yang memampukan seseorang menjalankan tugasnya di hazardous area dengan aman dan benar. Peralatan Ex yang tersertifikasi dengan sempurna tetap dapat gagal bila dipasang, diperiksa, atau dirawat oleh personel yang tidak kompeten — misalnya flameproof path yang tergores, cable gland yang salah pilih, atau baut enclosure yang tak dikencangkan sesuai torsi. Karena itu banyak yurisdiksi dan standar (mis. IEC 60079-14 dan -17) mensyaratkan pekerjaan Ex dilakukan oleh 'responsible person' dan 'operative' yang kompeten.83

Kompetensi dibuktikan melalui skema penilaian pihak ketiga. Dua skema paling dikenal adalah CompEx (berbasis Britania Raya, diakui global) dan IECEx CoPC (Certificate of Personnel Competence). Keduanya menggabungkan penilaian teori dan praktik.

#### 24.3 Skema CompEx (Unit EX01–EX04 & EX11)

CompEx adalah skema penilaian kompetensi bagi personel yang bekerja pada instalasi listrik dan mekanis di hazardous area. Rangkaian inti untuk personel listrik mencakup preparasi, instalasi, inspeksi, dan pemeliharaan berbagai tipe proteksi; unit mekanis (EX11) menangani integritas sambungan flange. Peserta umumnya adalah electrical engineer, supervisor, dan teknisi instrumentasi/listrik yang menangani instalasi di hazardous area.

Tabel 24.1 — Unit inti skema CompEx untuk personel listrik dan mekanis (nomenklatur dapat berbeda antar-edisi; verifikasi ke skema CompEx terbaru).

Rangkaian pelatihan CompEx biasanya menggabungkan teori area classification, properti zat mudah terbakar, grouping & temperature classification, equipment selection, dan marking, dengan praktik langsung (site/practical training) seperti pemasangan dan perawatan gland Ex d/Ex e serta motor Ex d/Ex e. Penilaian praktik inilah yang membedakan sertifikasi kompetensi dari sekadar kursus awareness.

#### 24.4 Skema IECEx CoPC (Unit Ex 001+)

IECEx CoPC (Certificate of Personnel Competence) adalah skema kompetensi internasional di bawah sistem IECEx. Persyaratan tiap unit ditetapkan dalam dokumen IECEx OD 504.84 Unit Ex 001 adalah unit dasar — 'apply basic principles of protection in explosive atmospheres' — yang menuntut pemahaman properti zat mudah terbakar, kondisi terbentuknya ledakan, istilah combustion/ignition/propagation, explosive range (LEL/UEL), parameter zat (flash point, dsb.), serta 13 sumber penyalaan EN 1127-1.85 Unit-unit berikutnya menangani peran spesifik.

Tabel 24.2 — Struktur unit IECEx CoPC (contoh; nomor & judul unit merujuk IECEx OD 504 — verifikasi edisi terbaru untuk daftar resmi).

Baik CompEx maupun IECEx CoPC menuntut penyegaran/re-assessment berkala (umumnya tiap beberapa tahun) untuk mempertahankan status kompetensi — mencerminkan bahwa kompetensi harus dipelihara, bukan sekadar diperoleh.

#### 24.5 Peran & Tanggung Jawab

Keselamatan hazardous area adalah rantai tanggung jawab. Dutyholder (pemberi kerja/operator) memikul tanggung jawab hukum tertinggi, namun mendelegasikan tugas teknis kepada peran-peran yang kompeten. Gambar 24.1 memetakan rantai ini, dan Tabel 24.3 merinci tanggung jawab tiap peran.

Gambar 24.1 — Rantai kompetensi dan tanggung jawab personel Ex; dutyholder di puncak, ditopang oleh kompetensi CompEx/IECEx CoPC pada tiap peran.

Tabel 24.3 — Peran dan tanggung jawab dalam siklus hidup instalasi Ex.

#### 24.6 Budaya Keselamatan

Skema kompetensi dan sertifikat hanya efektif bila ditopang budaya keselamatan (safety culture) yang sehat. Cirinya antara lain: kepemimpinan yang menempatkan keselamatan di atas jadwal dan biaya; pelaporan nyaris-celaka (near-miss) tanpa rasa takut disalahkan (just culture); permit-to-work yang benar-benar dijalankan, bukan formalitas; disiplin MoC sebelum perubahan apa pun; serta pembelajaran dari insiden industri (mis. tragedi debu di industri gula dan pangan) yang diterjemahkan menjadi tindakan konkret. Budaya yang matang memandang setiap penyimpangan kecil — gland longgar, sertifikat kedaluwarsa, housekeeping buruk — sebagai sinyal yang harus ditindaklanjuti, bukan diabaikan.

#### 24.7 Kesalahan Umum di Lapangan

Sebagian besar kegagalan proteksi ledakan bukan karena peralatan yang salah desain, melainkan karena kesalahan manusia pada tahap instalasi, inspeksi, atau pemeliharaan. Berikut kesalahan yang paling sering ditemui beserta konsekuensinya.

Tabel 24.4 — Kesalahan umum di lapangan yang merusak integritas proteksi ledakan.

### Penutup Part VII

Part VII menutup lingkaran dari teori ke tata kelola. Bab 22 menuntun proses menilai dan mendokumentasikan risiko ledakan — Explosion Risk Assessment dan EPD ala Uni Eropa, Dust Hazard Analysis ala Amerika Serikat, serta integrasinya dengan HAZOP dan Management of Change. Bab 23 menjelaskan bagaimana produk memperoleh dan mempertahankan sertifikat, dari Type Examination dan ExTR hingga sistem mutu QAN/QAR, serta arti sufiks 'X' dan 'U'. Bab 24 menegaskan bahwa manusia yang kompeten — dibuktikan lewat CompEx dan IECEx CoPC — dan budaya keselamatan yang sehat adalah penentu akhir apakah seluruh sistem proteksi bekerja di dunia nyata.

Benang merah ketiga bab: kepatuhan adalah siklus hidup. Risiko dinilai, didokumentasikan, diverifikasi lewat sertifikasi dan inspeksi, lalu ditinjau ulang melalui MoC setiap kali ada perubahan. Part VIII berikutnya menerapkan seluruh kerangka ini pada kelas produk yang makin penting: perangkat Intrinsically Safe di lapangan.

Catatan dan Rujukan — Bab 24 (catatan 83–85)

83.  IEC 60079-14, Explosive atmospheres — Part 14: Electrical installations design, selection and erection.

84.  IECEx OD 504, IECEx Scheme for Certification of Personnel Competence for Explosive Atmospheres — Requirements and Units of Competence.

85.  EN 1127-1, Explosive atmospheres — Explosion prevention and protection — Part 1: Basic concepts and methodology.

Standar lain yang dirujuk pada tabel dan gambar bab ini:

•  IEC 60079-17, Explosive atmospheres — Part 17: Electrical installations inspection and maintenance.

•  IEC 60079-19, Explosive atmospheres — Part 19: Equipment repair, overhaul and reclamation.

•  Directive 1999/92/EC of the European Parliament and of the Council on minimum requirements for improving the safety and health protection of workers potentially at risk from explosive atmospheres (ATEX Workplace Directive).

•  IEC 60079-10-1, Explosive atmospheres — Part 10-1: Classification of areas — Explosive gas atmospheres.

•  IEC 60079-10, Explosive atmospheres — Part 10: Classification of areas (seri; lihat -10-1 dan -10-2).

Pustaka pendukung:

•  Singh, A. K. (2023). Explosion-Proof Equipment in Hazardous Area. Springer. [Berkas: 823211066-Arvind-Kumar-Singh-Explosion-Proof-Equipment-in-Hazardous-Area-Springer-2023.pdf]

•  Linström, H.-J. Basic Concepts for Explosion Protection. [Berkas: 193650475-Basic-Concepts-for-Explosion-Protection.pdf]

•  Kumar, H. Safety in Instrumentation & Control Systems, Unit 1. [Berkas: 886653684-Document-From-Hemanth-s-Kumar.pdf]

•  IESSA. Hazardous Area Course Notes. [Berkas: 793764224-Iessa-Haz-Course-Notes.pdf]

•  R. STAHL. Essential Explosion Protection. [Berkas: 695762365-ex-essential-explosion-protection-rstahl.pdf]

PART VIII

Intrinsically Safe Devices

Bab 25  ·  Perangkat Mobile Ex di Lapangan

Lampiran A–F  ·  Glosarium, Padanan, Standar, Drawing/EPD, Marking, FAQ

Rujukan teknis untuk engineer instrumentasi/listrik, HSE, operasi & pemeliharaan,

procurement, dan tim teknis perangkat Ex

## PART VIII — INTRINSICALLY SAFE DEVICES

Part I hingga Part VII telah membangun seluruh kerangka teknis proteksi ledakan: sains ledakan (Part I), kerangka regulasi ATEX/IECEx/HazLoc (Part II), klasifikasi hazardous area (Part III), klasifikasi zat dan peralatan (Part IV), metode proteksi termasuk intrinsic safety Ex i (Part V), marking–pemilihan–instalasi (Part VI), serta compliance, risiko, dan kompetensi (Part VII). Part VIII menutup handbook dengan penerapan yang paling kasat mata bagi personel lapangan: perangkat mobile — smartphone, tablet, kamera, detektor gas pribadi, dan radio — yang aman dibawa ke dalam hazardous area.

Bab 25 menjelaskan mengapa intrinsic safety (proteksi berbasis pembatasan energi) adalah satu-satunya metode praktis untuk perangkat genggam, membandingkan perangkat berklas Zona 1 (Ex ib) dengan Zona 2 (Ex ic) melalui studi kasus, membahas telemetri, lone worker protection, dan integrasi sensor eksternal via Bluetooth, lalu menyediakan checklist pemilihan perangkat sesuai zona pelanggan. Setelah Bab 25, Lampiran A–F menyediakan referensi cepat: glosarium, tabel padanan lengkap antar-sistem, daftar standar rujukan, contoh area classification drawing dan template Explosion Protection Document (EPD), quick reference card pembacaan marking, serta FAQ HazLoc.

Prinsip yang menyatukan Part VIII: peralatan mobile tidak mengubah zona — ia harus dipilih agar cocok dengan zona yang telah ditetapkan. Semua aturan pemilihan pada Part VI tetap berlaku, dengan tambahan pertimbangan khas perangkat bergerak seperti baterai, pengisian daya, dan antarmuka nirkabel.

### Bab 25 — Perangkat Mobile Ex di Lapangan (Intrinsically Safe Devices)

#### 25.1 Tujuan Bab

Setelah menyelesaikan bab ini, pembaca diharapkan mampu: (a) menjelaskan alasan teknis mengapa intrinsic safety menjadi metode proteksi untuk perangkat genggam dan portabel; (b) membedakan perangkat berklas Zona 1 (Ex ib) dan Zona 2 (Ex ic) beserta implikasi penggunaannya; (c) memahami fungsi telemetri, lone worker protection, dan integrasi sensor eksternal pada perangkat mobile Ex; (d) mengenali aspek baterai, pengisian, dan aksesori yang memengaruhi sertifikasi; dan (e) menggunakan checklist pemilihan perangkat mobile sesuai zona, gas group, dan temperature class pelanggan.

#### 25.2 Definisi & Ruang Lingkup

Perangkat mobile Ex (Ex mobile device) adalah peralatan elektronik portabel atau genggam bersertifikat untuk dioperasikan di hazardous area — mencakup smartphone, tablet, feature phone, kamera, senter (torch), pembaca RFID/barcode, radio komunikasi, tablet komputer, hingga detektor gas portabel. Karena perangkat ini dipegang, dipindahkan, dan digunakan langsung oleh operator, ukuran, bobot, dan ergonomi menjadi kendala desain yang menentukan metode proteksi yang layak dipakai.

Ruang lingkup Bab 25 dibatasi pada perangkat elektronik daya rendah yang dibawa personel. Peralatan proses tetap (fixed) seperti transmitter dan analyzer telah dibahas pada Part V–VI; prinsip intrinsic safety-nya identik (lihat Bab 18), tetapi tantangan mekanis perangkat mobile berbeda — terutama baterai, pengisian daya, dan konektivitas nirkabel.

#### 25.3 Mengapa Intrinsic Safety adalah Metode untuk Perangkat Genggam

Metode proteksi berbasis kurungan/isolasi (Bab 16) — terutama flameproof Ex d — mengandalkan enclosure kokoh yang menahan tekanan ledakan internal dan mendinginkan gas buang lewat celah flame path. Pendekatan ini menghasilkan peralatan yang berat dan tebal: cocok untuk motor, junction box, dan luminaire tetap, tetapi tidak praktis untuk perangkat yang harus digenggam selama berjam-jam. Selain itu, enclosure Ex d tidak boleh dibuka saat energize di hazardous area — bertentangan dengan kebutuhan mengganti baterai atau kartu di lapangan.

Intrinsic safety (Ex i) mengambil pendekatan berlawanan: alih-alih menahan ledakan, ia memastikan rangkaian tidak pernah mampu memicunya. Energi listrik dan termal dibatasi di bawah ambang minimum ignition energy (MIE) dan suhu penyalaan zat yang relevan, baik pada kondisi normal maupun kondisi kesalahan (fault) yang ditentukan. Karena keamanan berasal dari keterbatasan energi — bukan dari massa enclosure — perangkat dapat dibuat kecil, ringan, dan ergonomis. Inilah alasan fundamental mengapa hampir seluruh smartphone, tablet, dan detektor gas Ex di pasaran menggunakan intrinsic safety (Ex ia/ib/ic), bukan Ex d.

Gambar 25.1 — Perbandingan filosofi proteksi: kurungan (Ex d) yang berat vs pembatasan energi (Ex i) yang memungkinkan perangkat genggam ringan.

Tabel 25.1 — Mengapa intrinsic safety menjadi metode proteksi untuk perangkat genggam.

Catatan: sebagian perangkat mobile menggabungkan intrinsic safety dengan encapsulation (Ex m) pada modul tertentu (mis. baterai) dan increased safety (Ex e) pada terminal, sehingga marking lengkapnya dapat berisi kombinasi tipe proteksi. Prinsip pembatas energi tetap menjadi inti keamanan perangkat.

#### 25.4 Studi Kasus: Perangkat Zona 1 vs Zona 2 (Ex ib vs Ex ic)

Pembeda paling penting saat procurement perangkat mobile adalah level intrinsic safety-nya, yang menentukan zona penggunaan. Tiga level Ex i telah diperkenalkan pada Bab 18 dan dirangkum kembali di sini dalam konteks perangkat genggam:

Ex ia (EPL Ga) — aman pada kondisi normal dan dengan dua kesalahan (2 faults); boleh dipakai hingga Zona 0. Jarang diperlukan untuk perangkat genggam kecuali untuk masuk ke ruang terbatas berisiko sangat tinggi.

Ex ib (EPL Gb) — aman pada kondisi normal dan dengan satu kesalahan (1 fault); boleh dipakai hingga Zona 1. Ini adalah kelas paling umum untuk smartphone/tablet industri karena mencakup mayoritas area proses migas dan petrokimia.

Ex ic (EPL Gc) — aman pada kondisi normal saja (tanpa fault tambahan); hanya untuk Zona 2. Menggunakan faktor keamanan lebih rendah sehingga perangkat bisa lebih murah/ringan, tetapi terbatas pada area yang jarang berbahaya.

Gambar 25.2 — Perbandingan perangkat Zona 1 (Ex ib IIC T4 Gb) dan Zona 2 (Ex ic IIC T4 Gc): toleransi kesalahan, faktor keamanan, dan area penggunaan.

Perbedaan inti terletak pada toleransi kesalahan dan faktor keamanan penyalaan yang diterapkan saat penilaian rangkaian menurut IEC 60079-11.86 Ex ib mensyaratkan margin lebih besar (mis. faktor 1,5 pada kurva penyalaan) dan tetap aman meski satu komponen gagal; Ex ic memakai margin 1,0 dan hanya dinilai aman pada kondisi normal. Konsekuensi praktisnya diringkas berikut:

Tabel 25.2 — Perbandingan teknis perangkat Ex ib vs Ex ic (temperature class & gas group ilustratif).

Aturan pemilihan mengikuti prinsip Part VI: «boleh turun zona, tidak boleh naik». Perangkat Ex ib (Gb) sah dipakai di Zona 2, tetapi perangkat Ex ic (Gc) tidak boleh dibawa ke Zona 1. Karena itu, bila pelanggan mengoperasikan campuran Zona 1 dan Zona 2, memilih perangkat Ex ib yang lebih tinggi memberi fleksibilitas satu-perangkat untuk seluruh area — kerap lebih hemat daripada mengelola dua populasi perangkat.

Contoh pembacaan marking langkah demi langkah untuk sebuah smartphone Ex ber-marking «Ex II 2G Ex ib IIC T4 Gb»:

Tabel 25.3 — Pembacaan marking perangkat mobile Ex ib IIC T4 Gb, segmen demi segmen.

Verifikasi akhir: cocokkan T4 dan IIC dengan zat pada area pelanggan. Bila area mengandung karbon disulfida (CS₂, suhu penyalaan ~90 °C, butuh T6) atau gas dengan suhu penyalaan di bawah 135 °C, perangkat T4 tidak memadai meskipun gas group dan EPL sudah benar.

#### 25.5 Telemetri, Lone Worker Protection & Integrasi Sensor Eksternal

Nilai perangkat mobile Ex modern tidak berhenti pada komunikasi suara. Perangkat menjadi simpul (node) dalam ekosistem connected worker yang menaikkan keselamatan sekaligus produktivitas. Gambar 25.3 memetakan fungsi-fungsi utama di sekitar perangkat genggam.

Gambar 25.3 — Ekosistem perangkat mobile Ex: telemetri, lone worker protection, sensor Bluetooth, komunikasi, dokumentasi, dan identifikasi aset.

Telemetri & IoT. Perangkat mengirim data proses dan status ke control room secara real-time melalui Wi-Fi industrial atau seluler, memungkinkan pemantauan jarak jauh, digital work instruction, dan pengurangan waktu personel di hazardous area.

Lone worker protection. Fitur keselamatan pekerja tunggal — man-down (deteksi jatuh), no-motion (tidak bergerak), tilt, panic button, dan geolokasi — memicu alarm otomatis ke supervisor bila operator tak merespons. Ini krusial di area terpencil atau ruang terbatas (confined space) yang lazim ada di hazardous area.

Integrasi sensor eksternal via Bluetooth. Perangkat dapat dipasangkan (pairing) dengan detektor gas pribadi (personal gas detector), meter portabel, atau sensor lingkungan bersertifikat Ex melalui Bluetooth berdaya rendah. Data konsentrasi gas dapat dibaca, dicatat, dan dialarmkan lewat perangkat, tanpa membawa banyak instrumen terpisah. Penting: kanal Bluetooth/nirkabel ikut dinilai dalam sertifikasi — antena dan modul RF harus tetap dalam batas intrinsic safety, dan hanya sensor yang secara kolektif tersertifikasi/kompatibel yang boleh dipasangkan.

Tabel 25.4 — Fungsi connected worker pada perangkat mobile Ex dan pertimbangan Ex terkait.

#### 25.6 Baterai, Pengisian Daya, Aksesori & Antarmuka

Baterai adalah komponen paling kritis pada perangkat mobile Ex karena menyimpan energi yang harus tetap dalam batas intrinsic safety pada kondisi normal maupun fault (mis. hubung singkat terminal). Karena itu berlaku beberapa aturan penting:

Baterai bersertifikat — hanya boleh menggunakan pack baterai asli/bersertifikat yang menjadi bagian dari sertifikat perangkat; baterai pengganti pihak ketiga membatalkan sertifikasi.

Pengisian di area aman — pengisian daya (charging) umumnya hanya boleh dilakukan di area non-hazardous, kecuali sistem charging tersertifikasi khusus untuk hazardous area. Charger dan docking bukan bagian yang aman dibawa ke zona.

Penggantian di lapangan — bila didukung, penggantian baterai di hazardous area hanya untuk perangkat & baterai yang secara eksplisit disertifikasi untuk itu (hot-swap), mengikuti instruksi pabrikan.

Aksesori & casing — pelindung, holster, dan aksesori harus yang direkomendasikan; casing logam atau modifikasi dapat memengaruhi bonding, muatan elektrostatik, dan disipasi panas.

Muatan elektrostatik — permukaan non-logam dapat menimbulkan electrostatic discharge; ikuti peringatan pabrikan (mis. hanya lap dengan kain lembap) untuk mencegah bahaya penyalaan.

Antarmuka kabel (USB, headset, docking) dan slot kartu (SIM, memori) juga masuk lingkup sertifikasi. Membuka penutup, mengganti kartu, atau menyambungkan kabel di dalam hazardous area hanya boleh sesuai instruksi khusus (special conditions of use, ditandai «X» pada sertifikat). Selalu baca sertifikat dan instruction manual untuk kondisi khusus ini.

#### 25.7 Checklist Pemilihan Perangkat Sesuai Zona Pelanggan

Checklist berikut menyusun langkah pemilihan perangkat mobile Ex secara berurutan, dari kebutuhan zona pelanggan sampai verifikasi dokumen. Gunakan bersama Bab 19–20 (marking & equipment selection).

Tabel 25.5 — Checklist pemilihan perangkat mobile Ex sesuai zona pelanggan.

#### 25.8  Poin Penting

Intrinsic safety (Ex i) adalah metode proteksi pilihan untuk perangkat genggam karena keamanan berasal dari pembatasan energi, bukan dari massa enclosure — memungkinkan perangkat ringan & ergonomis.

Ex ia (Ga/Zona 0), Ex ib (Gb/Zona 1), dan Ex ic (Gc/Zona 2) berbeda pada toleransi kesalahan dan faktor keamanan; pilih level sesuai zona tertinggi tempat perangkat akan dipakai.

Prinsip «boleh turun zona, tidak boleh naik» berlaku: perangkat Ex ib boleh di Zona 2, tetapi Ex ic tidak boleh di Zona 1.

Cocokkan tidak hanya EPL/zona, tetapi juga gas group (IIC mencakup lebih banyak zat) dan temperature class terhadap zat aktual di area.

Baterai, charging, aksesori, dan antarmuka nirkabel semuanya bagian dari sertifikasi — gunakan komponen asli dan patuhi kondisi khusus (sertifikat «X»).

Fungsi connected worker (telemetri, lone worker, sensor Bluetooth) menaikkan keselamatan, tetapi setiap kanal energi/RF harus tetap dalam batas intrinsic safety.

Catatan dan Rujukan — Bab 25 (catatan 86–86)

86.  IEC 60079-11, Explosive atmospheres — Part 11: Equipment protection by intrinsic safety "i".

Pustaka pendukung:

•  Singh, A. K. (2023). Explosion-Proof Equipment in Hazardous Area. Springer. [Berkas: 823211066-Arvind-Kumar-Singh-Explosion-Proof-Equipment-in-Hazardous-Area-Springer-2023.pdf]

•  Linström, H.-J. Basic Concepts for Explosion Protection. [Berkas: 193650475-Basic-Concepts-for-Explosion-Protection.pdf]

•  Kumar, H. Safety in Instrumentation & Control Systems, Unit 1. [Berkas: 886653684-Document-From-Hemanth-s-Kumar.pdf]

•  IESSA. Hazardous Area Course Notes. [Berkas: 793764224-Iessa-Haz-Course-Notes.pdf]

•  R. STAHL. Essential Explosion Protection. [Berkas: 695762365-ex-essential-explosion-protection-rstahl.pdf]

## LAMPIRAN A — Glosarium Istilah (ATEX, Ex, HazLoc)

Glosarium ini merangkum istilah baku yang dipakai di seluruh handbook. Definisi bersifat ringkas untuk rujukan cepat; untuk teks lengkap, rujuk edisi standar terkait (lihat Lampiran C).

Catatan dan Rujukan — LAMPIRAN A

Standar lain yang dirujuk pada tabel dan gambar bab ini:

•  Directive 2014/34/EU of the European Parliament and of the Council on equipment and protective systems intended for use in potentially explosive atmospheres (ATEX Equipment Directive).

•  Directive 1999/92/EC of the European Parliament and of the Council on minimum requirements for improving the safety and health protection of workers potentially at risk from explosive atmospheres (ATEX Workplace Directive).

•  CSA C22.1, Canadian Electrical Code (CEC), Part I — Section 18 dan Annex J: Hazardous Locations.

•  IEC 60079-1, Explosive atmospheres — Part 1: Equipment protection by flameproof enclosures "d".

•  IEC 60079-11, Explosive atmospheres — Part 11: Equipment protection by intrinsic safety "i".

•  IEC 60079-7, Explosive atmospheres — Part 7: Equipment protection by increased safety "e".

•  IEC 60079-2, Explosive atmospheres — Part 2: Equipment protection by pressurized enclosure "p".

•  IEC 60079-18, Explosive atmospheres — Part 18: Equipment protection by encapsulation "m".

•  NFPA 652, Standard on the Fundamentals of Combustible Dust.

Pustaka pendukung:

•  Singh, A. K. (2023). Explosion-Proof Equipment in Hazardous Area. Springer. [Berkas: 823211066-Arvind-Kumar-Singh-Explosion-Proof-Equipment-in-Hazardous-Area-Springer-2023.pdf]

•  CompEx Ex01–Ex04 Training Manual, Rev. 3. [Berkas: 658848905-Compex-Manual-Rev3-for-Printing-1.pdf]

•  International Reference Guide to Hazardous Areas. [Berkas: 218758933-International-Reference-Guide-to-Hazardous-Areas.pdf]

•  R. STAHL. Essential Explosion Protection. [Berkas: 695762365-ex-essential-explosion-protection-rstahl.pdf]

## LAMPIRAN B — Tabel Padanan Lengkap

Lampiran ini merangkum kesetaraan antar-sistem. Padanan bersifat pendekatan praktis; selalu verifikasi ke sertifikat peralatan dan edisi standar terbaru untuk kasus batas.

### B.1 Zona (IEC/ATEX) ↔ Division (NEC/CEC)

Tabel B.1 — Padanan Zona ↔ Division. Division 1 mencakup Zona 0 dan 1.

### B.2 Kategori ATEX ↔ EPL (IECEx) ↔ Zona

Tabel B.2 — Kategori ATEX ↔ EPL ↔ zona. Tanda kurung = zona lebih ringan yang juga tercakup.

### B.3 Gas Group & Dust Group

Tabel B.3 — Gas group IEC vs Group NEC 500 (nilai MESG indikatif).

Tabel B.4 — Dust group IEC vs sistem Group NEC.

### B.4 Temperature Class

Tabel B.5 — Temperature class (T1–T6) dan suhu permukaan maksimum. Berlaku identik ATEX/IECEx/NEC Zone.

Catatan: untuk debu, penandaan suhu umumnya ditulis sebagai nilai suhu permukaan aktual dalam °C (mis. T 120 °C), bukan kelas T1–T6, dengan margin terhadap suhu penyalaan awan dan lapisan debu.

Catatan dan Rujukan — LAMPIRAN B

Standar lain yang dirujuk pada tabel dan gambar bab ini:

•  NFPA 70 (NEC) Article 500–504, Hazardous (Classified) Locations — sistem Class/Division.

Pustaka pendukung:

•  International Reference Guide to Hazardous Areas. [Berkas: 218758933-International-Reference-Guide-to-Hazardous-Areas.pdf]

•  Kendall, S. A. (Intertek). HazLoc Guide — European Levels of Protection (white paper). [Berkas: 827604483-HazLoc-Guide-European-Levels-of-Protection.pdf]

•  Hazardous Locations eBook — Guide to Explosive Atmospheres. [Berkas: 378007194-Hazloc-eBook.pdf]

•  Singh, A. K. (2023). Explosion-Proof Equipment in Hazardous Area. Springer. [Berkas: 823211066-Arvind-Kumar-Singh-Explosion-Proof-Equipment-in-Hazardous-Area-Springer-2023.pdf]

## LAMPIRAN C — Daftar Standar Rujukan

Daftar berikut memuat standar dan regulasi yang dirujuk di seluruh handbook. Nomor edisi berubah dari waktu ke waktu — selalu verifikasi ke versi berlaku terbaru sebelum dipakai sebagai dasar desain atau compliance.

### C.1 Seri IEC/EN 60079 (Explosive Atmospheres)

### C.2 Amerika Utara (NEC/CEC) & NFPA

### C.3 Regulasi Uni Eropa & lain-lain

Catatan dan Rujukan — LAMPIRAN C

Standar lain yang dirujuk pada tabel dan gambar bab ini:

•  NFPA 70, National Electrical Code (NEC). National Fire Protection Association.

•  CSA C22.1, Canadian Electrical Code (CEC), Part I — Section 18 dan Annex J: Hazardous Locations.

•  NFPA 652, Standard on the Fundamentals of Combustible Dust.

•  NFPA 654, Standard for the Prevention of Fire and Dust Explosions from the Manufacturing, Processing, and Handling of Combustible Particulate Solids.

•  NFPA 499, Recommended Practice for the Classification of Combustible Dusts and of Hazardous (Classified) Locations for Electrical Installations in Chemical Process Areas.

•  Directive 2014/34/EU of the European Parliament and of the Council on equipment and protective systems intended for use in potentially explosive atmospheres (ATEX Equipment Directive).

•  Directive 1999/92/EC of the European Parliament and of the Council on minimum requirements for improving the safety and health protection of workers potentially at risk from explosive atmospheres (ATEX Workplace Directive).

•  EN 1127-1, Explosive atmospheres — Explosion prevention and protection — Part 1: Basic concepts and methodology.

•  IEC 60079-32-1, Explosive atmospheres — Part 32-1: Electrostatic hazards — Guidance.

•  ISO 80079-36, Explosive atmospheres — Part 36: Non-electrical equipment for explosive atmospheres — Basic method and requirements.

•  IECEx OD 504, IECEx Scheme for Certification of Personnel Competence for Explosive Atmospheres — Requirements and Units of Competence.

## LAMPIRAN D — Contoh Area Classification Drawing & Template EPD

### D.1 Contoh Area Classification Drawing

Gambar D.1 memperlihatkan skematik klasifikasi zona di sekitar tangki penyimpanan cairan mudah terbakar dan titik dispensing. Ruang uap di dalam tangki adalah Zona 0; sekitar vent dan titik pengisian menjadi Zona 1; di luarnya Zona 2. Extent (jarak) aktual ditentukan lewat IEC 60079-10-1 berdasarkan laju pelepasan, ventilasi, dan sifat zat.

Gambar D.1 — Contoh area classification drawing: tangki penyimpanan dan titik dispensing dengan zona 0/1/2.

Sebuah area classification drawing yang lengkap umumnya memuat: denah/tampak dengan batas zona berkode warna, tabel source of release (identitas, grade, zat), asumsi ventilasi, extent tiap zona beserta acuan perhitungan, temperature class & gas group zat, serta referensi revisi dan penanggung jawab.

### D.2 Template Ringkas Explosion Protection Document (EPD)

Template berikut merangkum struktur minimum EPD sesuai pendekatan ATEX 153/DSEAR. Isi tiap bagian disesuaikan dengan fasilitas (lihat Bab 22 untuk metodologi).

Catatan dan Rujukan — LAMPIRAN D

Standar lain yang dirujuk pada tabel dan gambar bab ini:

•  IEC 60079-10-1, Explosive atmospheres — Part 10-1: Classification of areas — Explosive gas atmospheres.

•  EN 1127-1, Explosive atmospheres — Explosion prevention and protection — Part 1: Basic concepts and methodology.

•  IEC 60079-17, Explosive atmospheres — Part 17: Electrical installations inspection and maintenance.

Pustaka pendukung:

•  BS EN 60079-10-1:2015, Explosive atmospheres — Part 10-1: Classification of areas — Explosive gas atmospheres. British Standards Institution. [Berkas: 710477444-BS-60079-10-1-2015-Explosive-atmospheres-Part-10-1.pdf]

•  Rowe, V. Class I Area Classification — A Practical Approach (API RP 505 Style). [Berkas: 354654267-Area-Classification.pdf]

•  Davis, J. (Fike, 2022). Explosion Risk Assessment and Explosion Protection Document (webinar, 5 Mei 2022). [Berkas: 618882413-Fike-Webinar-Explosion-Risk-Assessment-and-Explosion-Protecti.pdf]

•  Bozek, A. IEC 60079-10-1 — Classification of Areas: Explosive Atmospheres. IEEE PCIC. [Berkas: 744219049-iec-60079-10-1-ieee-pcic-proracuni.pdf]

## LAMPIRAN E — Quick Reference Card: Pembacaan Marking

Kartu referensi ini merangkum cara membaca marking peralatan Ex secara cepat. Gunakan bersama Bab 19–20 untuk detail dan Lampiran B untuk padanan antar-sistem.

Gambar E.1 — Quick reference card pembacaan marking «II 2G Ex ib IIC T4 Gb».

### E.1 Urutan Marking ATEX/IECEx & Artinya

Tabel E.1 — Anatomi marking dan makna tiap segmen.

### E.2 Aturan Emas Pemilihan

EPL/kategori peralatan harus ≥ kebutuhan zona (Ga untuk Zona 0, Gb untuk Zona 1, Gc untuk Zona 2).

Gas group peralatan harus mencakup zat: IIC mencakup IIB & IIA; IIB mencakup IIA (tidak sebaliknya).

Temperature class peralatan harus di bawah suhu penyalaan zat (T4 aman bila Tign > 135 °C).

«Boleh turun zona, tidak boleh naik» — peralatan zona lebih ketat sah dipakai di zona lebih ringan.

Periksa suhu ambien (Ta), IP rating, dan kondisi khusus (sertifikat «X») sebelum finalisasi.

Catatan dan Rujukan — LAMPIRAN E

Pustaka pendukung:

•  Marking for Equipment Installed in ATEX Zones (lembar acuan penandaan, 2017). [Berkas: 443286861-po-atex-2017-en.pdf]

•  Åkesson, J. (BARTEC / Roxtec). Introduction to Ex-protection. [Berkas: 46665022-BOS-Ex-Presentation-Jorgen-Akesson.pdf]

•  CompEx Ex01–Ex04 Training Manual, Rev. 3. [Berkas: 658848905-Compex-Manual-Rev3-for-Printing-1.pdf]

## LAMPIRAN F — FAQ HazLoc

Kumpulan pertanyaan yang sering muncul seputar hazardous area dan perbandingan sistem internasional. Jawaban bersifat ringkas; rujuk bab terkait untuk uraian penuh.

T: Apa beda 'Zone' dan 'Division'?

J: Keduanya menandai seberapa sering atmosfer eksplosif hadir. Sistem Zone (IEC/ATEX & NEC 505) membagi gas menjadi Zona 0/1/2 (tiga tingkat), sedangkan sistem Division tradisional (NEC 500) hanya dua: Division 1 (mencakup Zona 0 & 1) dan Division 2 (setara Zona 2).87,88

T: Apakah peralatan ATEX otomatis diterima di Amerika Utara?

J: Tidak. Meski banyak standar IEC diadopsi, Amerika Utara memerlukan listing/approval oleh NRTL (mis. UL, FM, CSA). Peralatan sering disertifikasi ganda (dual/multi-approval) agar dapat dipakai lintas wilayah.

T: Apa arti gas group IIC — apakah lebih 'kuat'?

J: IIC mencakup gas paling mudah menyala (hidrogen, asetilen) dengan MESG terkecil. Peralatan IIC memenuhi syarat paling ketat, sehingga juga sah untuk IIB dan IIA. Jadi IIC adalah cakupan terluas, bukan sekadar 'lebih kuat'.

T: Boleh tidak memakai perangkat T4 di area dengan gas ber-suhu penyalaan 300 °C?

J: Boleh. T4 berarti suhu permukaan peralatan ≤ 135 °C, yang aman selama suhu penyalaan zat di atas 135 °C. Karena 300 °C > 135 °C, T4 (bahkan T3) memenuhi syarat. Yang dilarang adalah kebalikannya — memakai peralatan bersuhu permukaan lebih tinggi dari suhu penyalaan zat.

T: Apa perbedaan Ex ia, ib, dan ic?

J: Ketiganya intrinsic safety, berbeda pada toleransi kesalahan: ia aman dengan dua fault (Zona 0), ib aman dengan satu fault (Zona 1), ic aman pada kondisi normal saja (Zona 2).

T: Apakah smartphone biasa boleh dibawa ke hazardous area?

J: Tidak. Hanya perangkat bersertifikat Ex (mis. Ex ib IIC T4 Gb) yang boleh. Ponsel konsumen dapat menjadi sumber penyalaan melalui baterai, RF, atau percikan; membawanya ke zona melanggar aturan keselamatan dan izin kerja.

T: Apa itu sertifikat 'X' dan 'U'?

J: 'X' menandai adanya kondisi khusus penggunaan (special conditions of use) yang wajib dipenuhi. 'U' menandai Ex Component — komponen bersertifikat yang belum menjadi peralatan lengkap dan harus diintegrasikan lebih dulu sebelum dipakai.

T: Di mana perangkat Ex boleh diisi ulang (charging)?

J: Umumnya hanya di area non-hazardous (area aman), kecuali sistem charging secara khusus disertifikasi untuk hazardous area. Charger dan dock bukan bagian yang aman dibawa ke zona.

T: Apakah debu (dust) juga perlu klasifikasi seperti gas?

J: Ya. Debu mudah terbakar diklasifikasi ke Zona 20/21/22 (atau Division untuk NEC), dengan dust group IIIA/IIIB/IIIC dan penilaian bahaya (Dust Hazard Analysis). Bahaya lapisan (layer) dan awan (cloud) debu dinilai terpisah dari gas.

T: Standar mana yang mengatur inspeksi peralatan Ex terpasang?

J: IEC/EN 60079-17 mengatur inspeksi & pemeliharaan (visual, close, detailed), sedangkan IEC/EN 60079-14 mengatur desain, pemilihan, dan instalasi. Keduanya saling melengkapi sepanjang siklus hidup peralatan.

Catatan dan Rujukan — LAMPIRAN F (catatan 87–88)

87.  NFPA 70 (NEC) Article 505, Zone Classification System for Class I Locations.

88.  NFPA 70 (NEC) Article 500–504, Hazardous (Classified) Locations — sistem Class/Division.

Pustaka pendukung:

•  Intertek. HazLoc FAQs. [Berkas: 827603352-HazLoc-FAQs.pdf]

•  Hazardous Locations eBook — Guide to Explosive Atmospheres. [Berkas: 378007194-Hazloc-eBook.pdf]

•  International Reference Guide to Hazardous Areas. [Berkas: 218758933-International-Reference-Guide-to-Hazardous-Areas.pdf]

## DAFTAR PUSTAKA

Daftar ini menggabungkan seluruh rujukan yang dipakai dalam penyusunan handbook, tanpa pengulangan. Rujukan per bab beserta nomor catatannya dapat dilihat pada blok "Catatan dan Rujukan" di akhir masing-masing bab; penomoran catatan berlanjut dari bab ke bab di sepanjang buku. Entri standar sengaja ditulis tanpa tahun edisi kecuali bila edisi tertentu memang dipakai sebagai sumber verifikasi; seri IEC 60079 direvisi berkala sehingga tahun edisi perlu disesuaikan dengan edisi yang berlaku pada yurisdiksi dan tanggal pemakaian.

### A. Seri IEC/EN 60079 dan ISO 80079 — Explosive Atmospheres

•  IEC 60079-0, Explosive atmospheres — Part 0: Equipment — General requirements.

•  IEC 60079-1, Explosive atmospheres — Part 1: Equipment protection by flameproof enclosures "d".

•  IEC 60079-2, Explosive atmospheres — Part 2: Equipment protection by pressurized enclosure "p".

•  IEC 60079-4, Method of test for ignition temperature (ditarik; digantikan seri IEC 60079-20-1).

•  IEC 60079-5, Explosive atmospheres — Part 5: Equipment protection by powder filling "q".

•  IEC 60079-6, Explosive atmospheres — Part 6: Equipment protection by liquid immersion "o".

•  IEC 60079-7, Explosive atmospheres — Part 7: Equipment protection by increased safety "e".

•  IEC 60079-10, Explosive atmospheres — Part 10: Classification of areas (seri; lihat -10-1 dan -10-2).

•  IEC 60079-10-1, Explosive atmospheres — Part 10-1: Classification of areas — Explosive gas atmospheres.

•  IEC 60079-10-2, Explosive atmospheres — Part 10-2: Classification of areas — Explosive dust atmospheres.

•  IEC 60079-11, Explosive atmospheres — Part 11: Equipment protection by intrinsic safety "i".

•  IEC 60079-11:2011 (Edisi 6), Explosive atmospheres — Part 11: Equipment protection by intrinsic safety "i".

•  ABNT NBR IEC 60079-11:2013, Atmosferas explosivas — Parte 11: Proteção de equipamento por segurança intrínseca "i". Adopsi nasional Brasil atas IEC 60079-11:2011 (Edisi 6). Associação Brasileira de Normas Técnicas.

•  IEC 60079-14, Explosive atmospheres — Part 14: Electrical installations design, selection and erection.

•  IEC 60079-15, Explosive atmospheres — Part 15: Equipment protection by type of protection "n".

•  IEC 60079-17, Explosive atmospheres — Part 17: Electrical installations inspection and maintenance.

•  IEC 60079-18, Explosive atmospheres — Part 18: Equipment protection by encapsulation "m".

•  IEC 60079-19, Explosive atmospheres — Part 19: Equipment repair, overhaul and reclamation.

•  IEC 60079-20-1, Explosive atmospheres — Part 20-1: Material characteristics for gas and vapour classification — Test methods and data.

•  IEC 60079-25, Explosive atmospheres — Part 25: Intrinsically safe electrical systems.

•  IEC 60079-28, Explosive atmospheres — Part 28: Protection of equipment and transmission systems using optical radiation.

•  IEC 60079-31, Explosive atmospheres — Part 31: Equipment dust ignition protection by enclosure "t".

•  IEC 60079-32-1, Explosive atmospheres — Part 32-1: Electrostatic hazards — Guidance.

•  ISO 80079-36, Explosive atmospheres — Part 36: Non-electrical equipment for explosive atmospheres — Basic method and requirements.

•  ISO 80079-37, Explosive atmospheres — Part 37: Non-electrical equipment — Non-electrical type of protection constructional safety "c", control of ignition sources "b", liquid immersion "k".

### B. Standar Pendukung Lain

•  IEC 60529, Degrees of protection provided by enclosures (IP Code).

•  EN 1127-1, Explosive atmospheres — Explosion prevention and protection — Part 1: Basic concepts and methodology.

•  IEC 61508, Functional safety of electrical/electronic/programmable electronic safety-related systems.

•  IEC 61511, Functional safety — Safety instrumented systems for the process industry sector.

### C. Regulasi Uni Eropa

•  Directive 2014/34/EU of the European Parliament and of the Council on equipment and protective systems intended for use in potentially explosive atmospheres (ATEX Equipment Directive).

•  Directive 1999/92/EC of the European Parliament and of the Council on minimum requirements for improving the safety and health protection of workers potentially at risk from explosive atmospheres (ATEX Workplace Directive).

•  Directive 94/9/EC (ATEX 95) — directive produk ATEX terdahulu, digantikan oleh 2014/34/EU sejak 20 April 2016.

### D. Kode dan Praktik Amerika Utara

•  NFPA 70, National Electrical Code (NEC). National Fire Protection Association.

•  NFPA 70 (NEC) Article 500–504, Hazardous (Classified) Locations — sistem Class/Division.

•  NFPA 70 (NEC) Article 501, Class I Locations.

•  NFPA 70 (NEC) Article 505, Zone Classification System for Class I Locations.

•  NFPA 497, Recommended Practice for the Classification of Flammable Liquids, Gases, or Vapors and of Hazardous (Classified) Locations for Electrical Installations in Chemical Process Areas.

•  NFPA 499, Recommended Practice for the Classification of Combustible Dusts and of Hazardous (Classified) Locations for Electrical Installations in Chemical Process Areas.

•  NFPA 652, Standard on the Fundamentals of Combustible Dust.

•  NFPA 654, Standard for the Prevention of Fire and Dust Explosions from the Manufacturing, Processing, and Handling of Combustible Particulate Solids.

•  CSA C22.1, Canadian Electrical Code (CEC), Part I — Section 18 dan Annex J: Hazardous Locations.

•  API RP 500, Recommended Practice for Classification of Locations for Electrical Installations at Petroleum Facilities Classified as Class I, Division 1 and Division 2. American Petroleum Institute.

•  API RP 505, Recommended Practice for Classification of Locations for Electrical Installations at Petroleum Facilities Classified as Class I, Zone 0, Zone 1 and Zone 2. American Petroleum Institute.

### E. Dokumen Skema Sertifikasi dan Kompetensi

•  IECEx OD 504, IECEx Scheme for Certification of Personnel Competence for Explosive Atmospheres — Requirements and Units of Competence.

•  Munro, J. IECEx TCD-02 — An IECEx Assessor’s Guide, Ed. 8.1. IEC System for Certification to Standards Relating to Equipment for Use in Explosive Atmospheres (IECEx System). [Berkas: 562187460-IECEx-TCD-02-Scheme-Ed-8-1.pdf]

•  Isaksen, S. (2015). IECEx CoPC Unit Ex 001 — Examination Preparation (sesuai IECEx OD 504 v3.0). [Berkas: 836463206-IECEx-CoPC-Unit-001-Version-1-2015-acc-to-OD-504-v3-0.pdf]

•  Syed Mohamed, S. F. (2020). Introduction to Basic Hazardous Area (Ex) — Basic to IECEx Requirements. [Berkas: 475076704-000-BASIC-TO-IECEx-REQUIREMENTS-AUGUST-2020.pdf]

### F. Buku dan Panduan Teknis

•  Singh, A. K. (2023). Explosion-Proof Equipment in Hazardous Area. Springer. [Berkas: 823211066-Arvind-Kumar-Singh-Explosion-Proof-Equipment-in-Hazardous-Area-Springer-2023.pdf]

•  Linström, H.-J. Basic Concepts for Explosion Protection. [Berkas: 193650475-Basic-Concepts-for-Explosion-Protection.pdf]

•  R. STAHL. Essential Explosion Protection. [Berkas: 695762365-ex-essential-explosion-protection-rstahl.pdf]

•  Hazardous Areas Technical Guide. [Berkas: 120420138-ATEX.pdf]

•  International Reference Guide to Hazardous Areas. [Berkas: 218758933-International-Reference-Guide-to-Hazardous-Areas.pdf]

•  Hazardous Locations eBook — Guide to Explosive Atmospheres. [Berkas: 378007194-Hazloc-eBook.pdf]

•  Kendall, S. A. (Intertek). HazLoc Guide — European Levels of Protection (white paper). [Berkas: 827604483-HazLoc-Guide-European-Levels-of-Protection.pdf]

•  Intertek. HazLoc FAQs. [Berkas: 827603352-HazLoc-FAQs.pdf]

•  BS IEC 61892-7:2014, Mobile and fixed offshore units — Electrical installations — Part 7: Hazardous areas. [Berkas: 734589163-BS-IEC-61892-7-2014.pdf]

### G. Materi Klasifikasi Area

•  BS EN 60079-10-1:2015, Explosive atmospheres — Part 10-1: Classification of areas — Explosive gas atmospheres. British Standards Institution. [Berkas: 710477444-BS-60079-10-1-2015-Explosive-atmospheres-Part-10-1.pdf]

•  Bozek, A. IEC 60079-10-1 — Classification of Areas: Explosive Atmospheres. IEEE PCIC. [Berkas: 744219049-iec-60079-10-1-ieee-pcic-proracuni.pdf]

•  Rowe, V. Class I Area Classification — A Practical Approach (API RP 505 Style). [Berkas: 354654267-Area-Classification.pdf]

•  Das, D. Hazardous Area Classification. Indian Oil Corporation Limited. [Berkas: 429619322-Hazardous-Area-Classification.pdf]

•  Nikam, D. K. Hazardous Area Classification (HAC). [Berkas: 17219479-Hazardous-Area-Classification.pdf]

•  Hazardous Area Classification & Equipment Selection (materi presentasi). [Berkas: 564305563-Hazardous-Area-Classification-Equipment-Selection.pdf]

•  Hazardous Area Classification (materi presentasi pengantar). [Berkas: 293976168-Hazardous-Area-Classification-pdf.pdf]

•  Zone and ATEX (materi presentasi; berkas hasil pindaian tanpa lapisan teks). [Berkas: 251698506-Zone-and-ATEX-pdf.pdf]

### H. Materi Pelatihan CompEx

•  CompEx Ex01–Ex04 Training Manual, Rev. 3. [Berkas: 658848905-Compex-Manual-Rev3-for-Printing-1.pdf]

•  ATEC. Modul Training CompEx — Training and Certification for Personnel. [Berkas: 870204494-Modul-training-ATEC-Compex-1.pdf]

•  CompEx Training (materi pelatihan; berkas hasil pindaian tanpa lapisan teks). [Berkas: 713446200-Compex-training.pdf]

•  CompEx Basic Book, Tab I (berkas hasil pindaian tanpa lapisan teks). [Berkas: 706183928-COMPEX-Basic-Book-Tab-I.pdf]

•  CompEx Foundation Course Notes (berkas hasil pindaian tanpa lapisan teks). [Berkas: 330246290-CompEx-Foundation-Course-Notes.pdf]

•  CompEx Manual (berkas hasil pindaian tanpa lapisan teks). [Berkas: 694452093-CompEx-Manual.pdf]

•  CompEx Hazardous Area Training Ex01 to Ex04 (ringkasan kursus). [Berkas: 428418255-compex-manual.pdf]

•  CompEx EX11 — Mechanical Flange Integrity (berkas hasil pindaian tanpa lapisan teks). [Berkas: 837788168-CompEx-Mechanical-Flange-Integrity-EX11 (1).pdf]

•  Awareness CompEx EX01, EX03 & EX04 Courses Outline. [Berkas: 610812864-Awareness-Compex-EX01-01-03-04-courses-outline.pdf]

### I. Presentasi, Webinar, dan Materi Industri

•  Åkesson, J. (BARTEC / Roxtec). Introduction to Ex-protection. [Berkas: 46665022-BOS-Ex-Presentation-Jorgen-Akesson.pdf]

•  Ravasi, L. (2020). ATEX – IECEx – EAC Ex (webinar, 15 Mei 2020). [Berkas: 639104099-WF-72-slide-showatexiecexeac-exwebinaren.pdf]

•  Davis, J. (Fike, 2022). Explosion Risk Assessment and Explosion Protection Document (webinar, 5 Mei 2022). [Berkas: 618882413-Fike-Webinar-Explosion-Risk-Assessment-and-Explosion-Protecti.pdf]

•  Marking for Equipment Installed in ATEX Zones (lembar acuan penandaan, 2017). [Berkas: 443286861-po-atex-2017-en.pdf]

•  IESSA. Hazardous Area Course Notes. [Berkas: 793764224-Iessa-Haz-Course-Notes.pdf]

•  Kumar, H. Safety in Instrumentation & Control Systems, Unit 1. [Berkas: 886653684-Document-From-Hemanth-s-Kumar.pdf]

•  IEC 60079-17 Edition 6, Explosive atmospheres — Part 17: Electrical installations inspection and maintenance. [Berkas: 698213096-IEC60079-17-Edition-6-1.pdf]

•  BS EN 60079-2:2014 (incorporating corrigendum July 2015), Explosive atmospheres — Part 2: Equipment protection by pressurized enclosure "p". British Standards Institution. [Berkas: 752205022-BS-EN-60079-22014-r1.pdf]

•  IEC 60079-10-2:2015, Explosive atmospheres — Part 10-2: Classification of areas — Explosive dust atmospheres (redline version). International Electrotechnical Commission. [Berkas: 809618221-IEC-60079-10-2-2015.pdf]

•  BS EN 60079-18:2009, Explosive atmospheres — Part 18: Equipment protection by encapsulation "m". [Berkas: 526402057-BS-EN-60079-18-2009.pdf]

•  BS EN ISO 80079-36:2016, Explosive atmospheres — Part 36: Non-electrical equipment for explosive atmospheres — Basic method and requirements. [Berkas: 713053025-ENG-ISO-80079-36-2016-ATMOSFERAS-EXPLOSIVAS.pdf]

•  ABNT NBR IEC 60079-0:2020, Atmosferas explosivas — Parte 0: Equipamentos — Requisitos gerais (adopsi IEC 60079-0:2017). [Berkas: 658051268-ABNT-IEC-60079-0-2020.pdf]

•  Interpreting the Requirements of Articles 500–516 of the NEC. [Berkas: 368752157-Interpreting-the-Requirements-of-Articles-500-516-of-the-NEC-en-518452.pdf]

•  Directive 1999/92/EC — Potentially Explosive Atmosphere, dokumen acuan Komisi Eropa. [Berkas: 161349468-111010-Directiva-ATEX-1999-92-EC-Doc-134-05-E.pdf]

•  IEC 60079-15:2017 (Edisi 5.0), Explosive atmospheres — Part 15: Equipment protection by type of protection "n". International Electrotechnical Commission. [Berkas: IEC-60079-15-2017.pdf]

•  EIGA / IGC Doc 134/05, Potentially Explosive Atmosphere — panduan industri gas atas Directive 1999/92/EC. Dokumen ini merupakan interpretasi industri, bukan teks directive. [Berkas: 161349468-111010-Directiva-ATEX-1999-92-EC-Doc-134-05-E.pdf]

•  Holt, M. Interpreting the Requirements of Articles 500–516 of the NEC — komentar berilustrasi atas NFPA 70. [Berkas: 331652584-norma-NEC-500.pdf dan 368752157-Interpreting-the-Requirements-of-Articles-500-516-of-the-NEC-en-518452.pdf]

•  European Commission (2016). ATEX 2014/34/EU Guidelines, 1st Edition, April 2016 — panduan resmi penerapan Directive 2014/34/EU. [Berkas: 325845468-Atex-2014-34-Eu-Guidelines-2016-First-Edition.pdf]

•  IEC 60079-5:2015 (Edisi 4.0, redline), Explosive atmospheres — Part 5: Equipment protection by powder filling "q". [Berkas: 754101914-IEC-60079-5-2015-Edition-4-0-REDLINE.pdf]

•  IEC 60079-7:2015 (Edisi 5.0), Explosive atmospheres — Part 7: Equipment protection by increased safety "e". Berkas yang tersedia berupa preview resmi yang memuat scope dan daftar perubahan. [Berkas: info_iec60079-7{ed5.0}en.pdf]

•  IEC 60079-20-1:2010 (Edisi 1.0) melalui adopsi IS/IEC 60079-20-1:2010, Explosive atmospheres — Part 20-1: Material characteristics for gas and vapour classification — Test methods and data. [Berkas: is.iec.60079.20.1.2010.pdf dan info_iec60079-20-1{ed1.0}b.pdf]

### J. Sumber Verifikasi Khusus Bab 18

•  IEC 60079-11:2011/ISH3:2016, Interpretation Sheet 3 — Explosive atmospheres, Part 11: Equipment protection by intrinsic safety "i". International Electrotechnical Commission. [Berkas: 634092666-IEC-60079-11-Interpretation-Sheet.pdf]

•  ABNT NBR IEC 60079-11:2013, Atmosferas explosivas — Parte 11: Proteção de equipamento por segurança intrínseca "i" (adopsi IEC 60079-11:2011, Ed. 6). [Berkas: 1015821195-Abnt-Nbr-Iec-60079-11.pdf]

•  CSA Group (2023). IEC 60079-11 Edition 7 — Guide to Changes. [Berkas: CSA-IEC60079-11Edition7Guide-EN_Accessible_9262023.pdf]

### Catatan atas daftar pustaka

•  Sebagian berkas sumber merupakan hasil pindaian tanpa lapisan teks sehingga hanya dapat dirujuk secara umum; berkas tersebut ditandai pada entrinya masing-masing.

•  Sebagian dokumen sumber adalah materi pelatihan dan presentasi tanpa data bibliografi lengkap. Untuk publikasi resmi, lengkapi penerbit dan tahun, atau ganti dengan rujukan primer berupa teks standar yang bersangkutan.

•  Rujukan pada §18.4A memakai IEC 60079-11:2011 (Edisi 6) melalui adopsi ABNT NBR IEC 60079-11:2013. Edisi 7 menata ulang penomoran klausul dan mengubah sejumlah persyaratan; lihat catatan edisi pada §18.4A.

•  Daftar ini memuat sumber yang benar-benar dipakai dalam penyusunan naskah, bukan bibliografi lengkap bidang explosion protection.


#### Tabel 1

| Miskonsepsi Umum | Kenyataan / Koreksi |

| --- | --- |

| “Kalau tidak tercium bau gas, berarti aman.” | Banyak gas tidak berbau atau menumpulkan indra penciuman (mis. H2S). Konsentrasi mematikan atau eksplosif bisa tercapai tanpa peringatan indrawi. Deteksi harus dengan instrumen, bukan hidung. |

| “Peralatan Ex tidak akan pernah meledak.” | Peralatan Ex tidak menghilangkan bahaya; ia dirancang agar tidak menjadi sumber penyalaan bila dipasang, dipelihara, dan dipakai sesuai sertifikasi. Instalasi atau pemeliharaan yang salah dapat meniadakan proteksi. |

| “Zona 2 itu praktis aman, jadi peralatan biasa boleh dipakai.” | Zona 2 tetap hazardous area. Atmosfer eksplosif memang jarang muncul, tetapi bisa muncul; peralatan tetap harus sesuai (minimal kategori 3G / EPL Gc). |

| “Selama tidak ada nyala api terbuka, tidak ada risiko penyalaan.” | Sumber penyalaan mencakup permukaan panas, percikan mekanik, listrik statis, arus liar, gelombang elektromagnetik, dan reaksi kimia — jauh melampaui nyala api terbuka (lihat EN 1127-1). |

| “Marking di label peralatan hanya formalitas.” | Marking (mis. II 2G Ex ib IIC T4 Gb) adalah instruksi teknis yang menentukan di zona, gas group, dan temperature class mana peralatan boleh dipakai. Salah baca berarti salah pasang. |

| “Debu tidak seberbahaya gas.” | Ledakan debu sering lebih dahsyat karena efek ledakan sekunder dari lapisan debu yang terangkat. Lapisan tipis pun bisa menjadi bahan bakar berlimpah. |

| “Boleh mengganti komponen dengan yang mirip asalkan muat.” | Penggantian dengan komponen non-identik dapat membatalkan sertifikasi. Integritas proteksi bergantung pada detail seperti celah flameproof, jarak rambat, atau parameter entity. |




#### Tabel 2

| Part | Cakupan | Bab |

| --- | --- | --- |

| Part I | Fondasi: sains ledakan & proteksi (bagian yang sedang Anda baca) | 1–3 |

| Part II | Kerangka Regulasi & Standar: ATEX, IECEx, HazLoc, peta standar global | 4–7 |

| Part III | Klasifikasi Area Berbahaya: zona gas & debu, metodologi & dokumentasi | 8–11 |

| Part IV | Klasifikasi Zat & Peralatan: gas/dust group, temperature class, kategori & EPL | 12–14 |

| Part V | Metode Proteksi (Types of Protection): Ex d, p, e, i, m, n, dll. | 15–18 |

| Part VI | Marking, Pemilihan & Instalasi peralatan Ex | 19–21 |

| Part VII | Compliance, Risiko & Kompetensi: EPD, sertifikasi, CompEx/IECEx CoPC | 22–24 |

| Part VIII | Penerapan Praktis: Perangkat Intrinsically Safe di lapangan | 25 |

| Lampiran | Glosarium, tabel padanan, daftar standar, template, quick reference, FAQ | A–F |




#### Tabel 3

| Poin Penting — Bab 1 Explosion protection adalah gabungan tindakan teknis, organisasi, dan prosedural untuk mencegah ledakan pada hazardous area atau membatasi dampaknya. Disiplin ini lahir dari tambang batu bara dan kini wajib di migas, petrokimia, kimia, farmasi, pertambangan, pangan/biji-bijian, dan pengolahan debu. Sebagian besar insiden berakar pada miskonsepsi mendasar — bukan kegagalan teknologi. Bau bukan indikator aman; peralatan Ex mencegah penyalaan hanya bila dipasang & dipelihara benar; Zona 2 tetap berbahaya. Handbook ini disusun 8 Part + Lampiran, mengikuti alur kerja nyata dari fondasi hingga penerapan; baca sesuai peran, dan selalu verifikasi angka ke edisi standar terbaru. |

| --- |




#### Tabel 4

| Temperature Class | Rentang Ignition Temperature campuran | Suhu Permukaan Maks. Peralatan |

| --- | --- | --- |

| T1 | > 450 °C | 450 °C |

| T2 | > 300 °C s/d ≤ 450 °C | 300 °C |

| T3 | > 200 °C s/d ≤ 300 °C | 200 °C |

| T4 | > 135 °C s/d ≤ 200 °C | 135 °C |

| T5 | > 100 °C s/d ≤ 135 °C | 100 °C |

| T6 | > 85 °C s/d ≤ 100 °C | 85 °C |




#### Tabel 5

| Kriteria | Group IIA | Group IIB | Group IIC |

| --- | --- | --- | --- |

| Batas definisi MESG (klausul 4.2) | ≥ 0,9 mm | > 0,5 mm dan < 0,9 mm | ≤ 0,5 mm |

| Batas definisi MIC ratio (klausul 4.3) | > 0,8 | > 0,45 dan < 0,8 | < 0,45 |

| Satu penentuan memadai (klausul 4.4) | MESG ≥ 0,9 mm atau MIC > 0,9 | MESG 0,55–0,9 mm atau MIC 0,5–0,8 | MESG < 0,5 mm atau MIC < 0,45 |

| Wajib dua penentuan (klausul 4.4) | MIC antara 0,8 dan 0,9 — konfirmasi lewat MESG | MIC antara 0,45 dan 0,5 — konfirmasi lewat MESG | MESG antara 0,5 dan 0,55 mm — konfirmasi lewat MIC |




#### Tabel 6

| Gas Group (IEC/ATEX) | Rentang MESG (indikatif) | Contoh gas/uap representatif |

| --- | --- | --- |

| I (tambang) | metana tambang + debu batu bara | Metana (firedamp) |

| IIA | > 0,9 mm | Propana, metana (industri), aseton, amonia, benzena, toluena, bensin |

| IIB | > 0,5 mm dan < 0,9 mm | Etilena, etilen oksida, hidrogen sulfida, etilen glikol |

| IIC | ≤ 0,5 mm | Hidrogen, asetilena |




#### Tabel 7

| Zat | LEL (% vol) | UEL (% vol) | Auto-ignition (°C) | Temp. Class | Gas Group |

| --- | --- | --- | --- | --- | --- |

| Metana (CH₄) | 5,0 | 15,0 | ≈ 537 | T1 | IIA |

| Propana (C₃H₈) | 2,1 | 9,5 | ≈ 470 | T1 | IIA |

| Butana (C₄H₁₀) | 1,8 | 8,4 | ≈ 365 | T2 | IIA |

| Bensin (uap) | 1,4 | 7,6 | ≈ 280 | T3 | IIA |

| n-Heksana | 1,1 | 7,5 | ≈ 225 | T3 | IIA |

| Aseton | 2,5 | 13,0 | ≈ 465 | T1 | IIA |

| Etanol | 3,3 | 19,0 | ≈ 363 | T2 | IIA |

| Amonia (NH₃) | 15,0 | 28,0 | ≈ 630 | T1 | IIA |

| Etilena (C₂H₄) | 2,7 | 36,0 | ≈ 425 | T2 | IIB |

| Hidrogen sulfida (H₂S) | 4,0 | 44,0 | ≈ 260 | T3 | IIB |

| Hidrogen (H₂) | 4,0 | 75,0 | ≈ 560 | T1 | IIC |

| Asetilena (C₂H₂) | 2,3 | ≈ 100 | ≈ 305 | T2 | IIC |




#### Tabel 8

| Aspek | Gas / Uap | Debu (Dust) | Serat (Fibres/Flyings) |

| --- | --- | --- | --- |

| Bentuk fisik | Molekul gas/uap tercampur udara | Partikel padat halus | Padatan memanjang, serpihan |

| Zona (IEC/ATEX) | Zona 0 / 1 / 2 | Zona 20 / 21 / 22 | Kerangka bahaya debu (Group III) |

| Group peralatan | Group II (IIA/IIB/IIC) | Group III (IIIA/IIIB/IIIC) | IIIA (combustible flyings) |

| Energi penyalaan (MIE) | Umumnya rendah (mudah tersulut) | Umumnya lebih tinggi | Bervariasi; lapisan mudah membara |

| Bahaya khas | Menyebar cepat mengikuti udara | Efek ledakan sekunder dari lapisan terangkat | Penumpukan pada permukaan & mesin |

| Suhu penyalaan | Satu ignition temperature | Dua nilai: lapisan & awan | Mirip debu (lapisan & awan) |




#### Tabel 9

| Poin Penting — Bab 2 Segitiga api (fuel + oksigen + sumber penyalaan) menjadi ledakan destruktif bila ditambah dispersion dan confinement — membentuk explosion pentagon. Memutus satu unsur mencegah ledakan. LEL/UEL menentukan rentang konsentrasi yang dapat meledak; flash point menentukan pada suhu berapa cairan melepaskan cukup uap; ignition temperature membatasi suhu permukaan peralatan (dasar temperature class T1–T6). MIE/MIC (kemudahan tersulut oleh energi kecil) mendasari intrinsic safety; MESG mendasari penggolongan gas group IIA/IIB/IIC dan metode flameproof. Gas, debu, dan serat berperilaku berbeda — terutama efek ledakan sekunder pada debu — sehingga memiliki sistem zona, group, dan uji suhu penyalaan yang terpisah. Semua nilai numerik parameter bersifat referensi; verifikasi ke IEC 60079-20-1 dan data produk sebelum dipakai untuk desain atau sertifikasi. |

| --- |




#### Tabel 10

| Sumber Penyalaan (EN 1127-1) | Contoh & Catatan |

| --- | --- |

| Permukaan panas (hot surfaces) | Kumparan, resistor, lampu, bearing yang memanas, permukaan mesin — dikendalikan lewat temperature class. |

| Nyala & gas panas (flames, hot gases) | Gas buang mesin pembakaran, partikel panas dari percikan sakelar daya. |

| Percikan mekanik (mechanical sparks) | Gerinda, pemotong; gesekan/benturan logam, bagian berputar tanpa pelumasan cukup. |

| Peralatan listrik (electrical apparatus) | Percikan saat memutus rangkaian, hubung-singkat, kontak longgar. |

| Arus liar & proteksi katodik (stray currents) | Beda potensial antar titik pembumian; diatasi dengan equipotential bonding. |

| Listrik statis (static electricity) | Muatan elektrostatik pada permukaan isolator, cairan mengalir, serbuk — pelepasan percikan berenergi rendah pun cukup untuk gas ber-MIE rendah. |

| Petir (lightning) | Sambaran langsung/tak langsung; memerlukan sistem proteksi petir & bonding. |

| Gelombang elektromagnetik & radiasi | Gelombang radio (RF), radiasi IR/cahaya terfokus, UV, radiasi pengion, ultrasonik. |

| Kompresi adiabatik & gelombang kejut | Pemanasan akibat kompresi tiba-tiba dalam sistem bertekanan. |

| Reaksi kimia eksotermik | Reaksi swa-panas (self-heating), material yang membara. |




#### Tabel 11

| Tingkat | Prinsip | Contoh pada Explosion Protection |

| --- | --- | --- |

| 1. Eliminasi | Hilangkan bahaya | Tiadakan zat mudah terbakar dari proses; ubah proses menjadi tak berbahaya. |

| 2. Substitusi | Ganti dengan yang lebih aman | Pelarut ber-flash point tinggi; bahan tidak mudah terbakar. |

| 3. Rekayasa (engineering) | Kendalikan lewat desain | Proteksi primer (ventilasi, inerting, containment), sekunder (peralatan Ex), konstruktif (venting, suppression). |

| 4. Administratif | Kendalikan lewat prosedur | Klasifikasi area, permit-to-work, hot work permit, prosedur operasi, housekeeping, pelatihan. |

| 5. APD (PPE) | Lindungi individu | Pakaian anti-statik, alas kaki konduktif, alat pelindung — lapis terakhir, bukan pengganti pengendalian di atas. |




#### Tabel 12

| Poin Penting — Bab 3 Urutan prioritas EN 1127-1: (1) cegah terbentuknya atmosfer eksplosif → (2) cegah sumber penyalaan → (3) batasi dampak ledakan. Proteksi primer menyerang bahan bakar/oksigen (substitusi, ventilasi, inerting, housekeeping); proteksi sekunder mencegah sumber penyalaan (peralatan Ex); proteksi konstruktif membatasi dampak (containment, venting, suppression, isolation). Sumber penyalaan jauh lebih luas dari nyala api terbuka — EN 1127-1 mencakup permukaan panas, percikan mekanik & listrik, statis, arus liar, RF, dan lainnya. Hirarki pengendalian menempatkan rekayasa sebagai tulang punggung dan APD sebagai lapis terakhir; tindakan non-teknis (EPD, permit, pelatihan, MoC, inspeksi, housekeeping) membuat proteksi teknis efektif dan berkelanjutan. |

| --- |




#### Tabel 13

| Aspek | Directive 2014/34/EU (ATEX Equipment) | Directive 1999/92/EC (ATEX Workplace) |

| --- | --- | --- |

| Nama umum | ATEX 114 / “ATEX Product Directive” | ATEX 137 / “ATEX Workplace Directive” / DSEAR (UK) |

| Pihak yang dibebani | Produsen / importir / distributor (manufacturer) | Pemberi kerja / operator fasilitas (employer) |

| Objek pengaturan | Peralatan & protective systems untuk explosive atmosphere | Keselamatan & kesehatan pekerja di explosive atmosphere |

| Fokus | Desain, sertifikasi, marking, dan penempatan produk di pasar | Klasifikasi area, EPD, pemilihan peralatan, prosedur kerja |

| Bukti kepatuhan | CE marking + EU Declaration of Conformity | Explosion Protection Document (EPD) + zona terdokumentasi |

| Dasar teknis | EN 60079 (peralatan), EN 1127-1 (konsep dasar) | EN 60079-10-1/-10-2 (klasifikasi area), EN 60079-14 (instalasi) |




#### Tabel 14

| Category | Contoh prosedur penilaian kesesuaian | Keterlibatan Notified Body |

| --- | --- | --- |

| 1G, 1D, M1 | EU-Type Examination (Modul B) + Production Quality Assurance (Modul D) atau Product Verification (Modul F) | Wajib — baik untuk pemeriksaan tipe maupun sistem mutu produksi |

| 2G, 2D, M2 | EU-Type Examination (Modul B) + kesesuaian tipe; untuk peralatan non-listrik cukup kontrol produksi internal + berkas ke Notified Body | Wajib untuk peralatan listrik & mesin pembakaran internal; lebih ringan untuk non-listrik |

| 3G, 3D | Internal production control (Modul A) — self-declaration produsen | Tidak wajib (produsen menyatakan sendiri) |




#### Tabel 15

| Skema | Objek sertifikasi | Keluaran utama |

| --- | --- | --- |

| Certified Equipment Scheme | Peralatan & komponen Ex (produk) | IECEx Certificate of Conformity (CoC), didukung ExTR & QAR |

| Certified Service Facilities Scheme | Bengkel/fasilitas reparasi & overhaul peralatan Ex | Sertifikat fasilitas jasa sesuai IEC 60079-19 |

| Certified Persons Scheme (CoPC) | Kompetensi individu (personel) | IECEx Certificate of Personnel Competence (CoPC) per Unit Ex |

| Conformity Mark Licensing System | Hak memakai IECEx Mark of Conformity | Lisensi penggunaan tanda IECEx pada produk |




#### Tabel 16

| Standar | Cakupan |

| --- | --- |

| IEC 60079-0 | Persyaratan umum semua peralatan Ex (general requirements), dasar marking |

| IEC 60079-1 | Flameproof enclosures “Ex d” |

| IEC 60079-2 | Pressurized enclosures “Ex p” |

| IEC 60079-5 / -6 | Powder filling “Ex q” / Oil immersion “Ex o” |

| IEC 60079-7 | Increased safety “Ex e” |

| IEC 60079-11 | Intrinsic safety “Ex i” |

| IEC 60079-15 / -18 | Type of protection “Ex n” / Encapsulation “Ex m” |

| IEC 60079-10-1 / -10-2 | Klasifikasi area — gas (10-1) dan debu (10-2) |

| IEC 60079-14 | Desain, pemilihan & instalasi (electrical installations design) |

| IEC 60079-17 | Inspeksi & pemeliharaan instalasi listrik |

| IEC 60079-19 | Reparasi, overhaul & rekondisi peralatan Ex |

| IEC 60079-25 / -31 | Sistem intrinsically safe / peralatan proteksi debu “Ex t” |




#### Tabel 17

| Aspek | ATEX | IECEx |

| --- | --- | --- |

| Sifat | Wajib (hukum) di Uni Eropa | Sukarela (voluntary), diakui global |

| Cakupan wilayah | Uni Eropa (dan UKEX untuk Inggris) | Internasional — negara peserta IECEx |

| Dasar hukum | Directive 2014/34/EU & 1999/92/EC | Tidak ada; berbasis kesepakatan skema IEC |

| Standar teknis | EN 60079 (harmonised) | IEC 60079 (langsung) |

| Lembaga penilai | Notified Body (nomor 4 digit) | ExCB + ExTL |

| Bukti kesesuaian | CE marking + EU Declaration of Conformity | IECEx Certificate of Conformity (CoC), dapat diverifikasi daring |

| Peralatan non-listrik | Termasuk (mesin/mekanik) | Secara historis fokus listrik; standar non-listrik ISO 80079-36/-37 mulai diintegrasikan |

| Verifikasi keaslian | Berbasis berkas produsen & pengawasan pasar | Online Certificate System publik |




#### Tabel 18

| Class | Jenis bahaya | Contoh lokasi |

| --- | --- | --- |

| Class I | Gas atau uap mudah terbakar (flammable gases/vapours) | Kilang, unit proses kimia, dispensing bahan bakar |

| Class II | Debu mudah terbakar (combustible dust) | Silo biji-bijian, pabrik gula, penanganan serbuk logam |

| Class III | Serat/partikel terbang mudah menyala (ignitable fibres/flyings) | Pabrik tekstil, pengolahan kayu, kapas |




#### Tabel 19

| Group | Class | Material representatif | Padanan IEC (indikatif) |

| --- | --- | --- | --- |

| A | Class I (gas) | Asetilena (acetylene) | IIC (paling mudah menyala) |

| B | Class I (gas) | Hidrogen (hydrogen); butadiena | IIC / sebagian IIB+H2 |

| C | Class I (gas) | Etilena (ethylene) | IIB |

| D | Class I (gas) | Propana, metana, bensin, pelarut umum | IIA |

| E | Class II (debu) | Debu logam (aluminium, magnesium) — konduktif | IIIC |

| F | Class II (debu) | Debu karbon (batu bara, coke) | IIIB/IIIC |

| G | Class II (debu) | Debu non-konduktif (tepung, gula, kayu, plastik) | IIIB / IIIA (flyings) |




#### Tabel 20

| T-Code | Suhu permukaan maks (°C) | T-Code (subdivisi NEC) | Suhu maks (°C) |

| --- | --- | --- | --- |

| T1 | 450 | T2A / T2B / T2C / T2D | 280 / 260 / 230 / 215 |

| T2 | 300 | T3A / T3B / T3C | 180 / 165 / 160 |

| T3 | 200 | T4A | 120 |

| T4 | 135 | — | — |

| T5 | 100 | — | — |

| T6 | 85 | — | — |




#### Tabel 21

| Aspek | Sistem Division (NEC 500/501–503) | Sistem Zone (NEC 505/506) |

| --- | --- | --- |

| Tingkat area gas | Division 1, Division 2 (dua tingkat) | Zone 0, 1, 2 (tiga tingkat) |

| Pengelompokan gas | Group A, B, C, D | Group IIA, IIB, IIC (ala IEC) |

| Pengelompokan debu | Group E, F, G | Group IIIA, IIIB, IIIC (ala IEC) |

| Penandaan peralatan | Class I, Div 1, Groups C&D, T4 | Class I, Zone 1, AEx d IIC T4 |

| Filosofi metode | Menekankan explosion-proof + seal/conduit | Membuka seluruh metode proteksi ala IEC |

| Keselarasan global | Khas Amerika Utara | Selaras dengan IEC/ATEX |




#### Tabel 22

| Wilayah | Skema / Otoritas | Catatan |

| --- | --- | --- |

| India | PESO (Petroleum & Explosives Safety Organisation), dahulu CCoE | Sertifikasi/aprobasi wajib; berbasis IS/IEC 60079; menerima ExTR sebagai basis |

| Brasil | INMETRO (via OCP terakreditasi) | Wajib; berbasis ABNT NBR IEC 60079; marking khas INMETRO |

| Korea Selatan | KCs (Korea Certification), diawasi KOSHA | Wajib; berbasis KS C IEC 60079 |

| Jepang | TIIS / Japan-Ex | Historis memakai sistem sendiri; kini menuju keselarasan IEC 60079 |

| China | PCEC / NEPSI + CCC untuk sebagian produk | Wajib; berbasis GB 3836 (turunan IEC 60079) |

| Inggris (pasca-Brexit) | UKEX + UKCA marking | Cerminan ATEX; UKCA menggantikan/mendampingi CE untuk pasar Inggris |

| Australia/Selandia Baru | IECEx + skema nasional (mis. ANZEx) | Mengandalkan IECEx secara luas |




#### Tabel 23

| IEC/ATEX Zone (gas) | ATEX Category | IECEx EPL | NEC 500 Division | Kehadiran atmosfer eksplosif |

| --- | --- | --- | --- | --- |

| Zone 0 | 1G | Ga | Division 1 | Terus-menerus atau untuk periode lama |

| Zone 1 | 2G | Gb | Division 1 | Kemungkinan terjadi dalam operasi normal |

| Zone 2 | 3G | Gc | Division 2 | Jarang & singkat saja |




#### Tabel 24

| IEC/ATEX Zone (debu) | ATEX Category | IECEx EPL | NEC 500 Division | Kehadiran awan debu |

| --- | --- | --- | --- | --- |

| Zone 20 | 1D | Da | Division 1 | Terus-menerus / sering / periode lama |

| Zone 21 | 2D | Db | Division 1 | Kemungkinan terjadi dalam operasi normal |

| Zone 22 | 3D | Dc | Division 2 | Jarang & singkat saja |




#### Tabel 25

| IEC/ATEX Group | NEC 500 Group | Material representatif | Keterangan |

| --- | --- | --- | --- |

| I (tambang) | MSHA (khusus) | Metana (firedamp) + debu batu bara | Tambang bawah tanah |

| IIA | Group D | Propana, metana permukaan, pelarut umum | Paling mudah dilindungi |

| IIB | Group C | Etilena | Menengah |

| IIB + H2 | Group B | Hidrogen | Ketat |

| IIC | Group A + B | Asetilena (A), Hidrogen (B) | Paling sulit dilindungi |

| IIIA | Group G (flyings) | Serat/flyings mudah menyala | Class III di NEC |

| IIIB | Group F / G | Debu non-konduktif (tepung, gula, kayu) | — |

| IIIC | Group E | Debu konduktif (logam) | Paling berbahaya |




#### Tabel 26

| Sumber / Standar | Rumusan definisi hazardous area |

| --- | --- |

| IEC 60079-10-1 / IEC 60079-0 | Area di mana atmosfer gas eksplosif hadir, atau dapat diperkirakan hadir, dalam jumlah yang menuntut tindakan pencegahan khusus terhadap konstruksi, instalasi, dan penggunaan peralatan. |

| ATEX — Directive 1999/92/EC | Area di mana atmosfer eksplosif dapat terbentuk dalam jumlah berbahaya; pemberi kerja wajib mengklasifikasikannya ke dalam zona dan menyusun Explosion Protection Document (EPD). |

| HazLoc — NEC 500 (Class/Division) | Lokasi di mana gas/uap mudah terbakar (Class I), debu mudah terbakar (Class II), atau serat/flyings (Class III) hadir atau mungkin hadir dalam kuantitas yang cukup untuk menghasilkan campuran yang dapat menyala. |

| IS 5572 / praktik migas | Area di mana atmosfer gas eksplosif hadir atau mungkin hadir dalam jumlah yang menuntut tindakan pencegahan khusus untuk konstruksi dan penggunaan peralatan listrik. |




#### Tabel 27

| Standar | Cakupan | Keluaran |

| --- | --- | --- |

| IEC 60079-10-1 | Klasifikasi area untuk atmosfer gas eksplosif (gas, uap, kabut). Mengatur konsep source of release, grade of release, degree & availability of ventilation, serta penentuan tipe dan extent zona. | Zona 0 / 1 / 2 beserta luas (extent) |

| IEC 60079-10-2 | Klasifikasi area untuk atmosfer debu eksplosif (combustible dust) dan serat/flyings. Mengatur source of release debu, pembentukan awan (cloud) dan lapisan (layer), serta pengaruh housekeeping. | Zona 20 / 21 / 22 beserta extent dan ketebalan lapisan |

| IEC 60079-0 | Persyaratan umum peralatan Ex — definisi explosive atmosphere, gas group, temperature class, EPL yang menjadi bahasa bersama klasifikasi dan peralatan. | Kerangka istilah & marking |

| IEC 60079-14 | Desain, pemilihan, dan pemasangan instalasi listrik di hazardous area — menggunakan hasil klasifikasi sebagai masukan wajib. | Aturan instalasi per zona |




#### Tabel 28

| Zona | Definisi (IEC 60079-10-1) | Perkiraan durasi indikatif* | EPL minimum |

| --- | --- | --- | --- |

| Zona 0 | Area di mana atmosfer gas eksplosif hadir secara terus-menerus, untuk periode panjang, atau sering. | > 1000 jam/tahun (>10%) | Ga |

| Zona 1 | Area di mana atmosfer gas eksplosif kemungkinan hadir pada operasi normal secara sesekali. | 10–1000 jam/tahun (0,1–10%) | Gb |

| Zona 2 | Area di mana atmosfer gas eksplosif tidak mungkin hadir pada operasi normal, dan bila hadir hanya berlangsung singkat. | < 10 jam/tahun (<0,1%) | Gc |




#### Tabel 29

| Grade of release | Definisi | Menghasilkan (tanpa modifikasi ventilasi) | Contoh sumber |

| --- | --- | --- | --- |

| Continuous | Pelepasan yang terjadi terus-menerus atau diperkirakan terjadi untuk periode panjang. | Zona 0 | Permukaan cairan di dalam tangki atap-tetap; interior separator yang bervent ke atmosfer. |

| Primary | Pelepasan yang dapat terjadi secara periodik atau sesekali pada operasi normal. | Zona 1 | Seal pompa/kompresor yang melepas saat operasi normal; vent proses yang rutin bekerja; sampling point yang dibuka berkala. |

| Secondary | Pelepasan yang tidak diperkirakan terjadi pada operasi normal, dan bila terjadi hanya jarang dan singkat. | Zona 2 | Flens, sambungan berulir, dan valve yang hanya bocor pada kegagalan; seal yang gagal. |




#### Tabel 30

| Degree of dilution | Pengaruh | Efek pada zona |

| --- | --- | --- |

| High | Mampu menurunkan konsentrasi di sumber nyaris seketika, ke bawah LEL; persistensi sangat singkat. | Dapat menurunkan extent menjadi dapat diabaikan (negligible) atau menjadikan area non-hazardous (NE). |

| Medium | Mengendalikan konsentrasi sehingga zona stabil dan tidak menyebar tak terkendali saat pelepasan berlangsung; awan hilang setelah pelepasan berhenti. | Zona sesuai grade (0/1/2) dengan extent terbatas dan terdefinisi. |

| Low | Tidak mampu mengendalikan konsentrasi selama pelepasan; awan bertahan setelah pelepasan berhenti. | Extent membesar; tipe zona dapat naik satu tingkat lebih ketat. |




#### Tabel 31

| Availability | Makna |

| --- | --- |

| Good | Ventilasi hadir secara praktis terus-menerus (mis. ventilasi alami di ruang terbuka). |

| Fair | Ventilasi hadir pada operasi normal; gangguan dibolehkan asalkan jarang dan singkat. |

| Poor | Ventilasi tidak memenuhi kriteria Good/Fair, namun tidak diperkirakan terjadi gangguan untuk periode panjang. |




#### Tabel 32

| Grade of release | Dilution HIGH — Good | HIGH — Fair | HIGH — Poor | Dilution MEDIUM — Good | MEDIUM — Fair | MEDIUM — Poor | Dilution LOW (availability apa pun) |

| --- | --- | --- | --- | --- | --- | --- | --- |

| Continuous | Non-hazardous (Zona 0 NE) | Non-hazardous (Zona 0 NE) | Non-hazardous (Zona 0 NE) | Zona 0 | Zona 0 + Zona 2 | Zona 0 + Zona 1 | Zona 0 |

| Primary | Non-hazardous (Zona 1 NE) | Non-hazardous (Zona 1 NE) | Non-hazardous (Zona 1 NE) | Zona 1 | Zona 1 + Zona 2 | Zona 1 + Zona 2 | Zona 1, atau Zona 0 bila ventilasi sangat lemah |

| Secondary | Non-hazardous (Zona 2 NE) | Non-hazardous (Zona 2 NE) | Non-hazardous (Zona 2 NE) | Zona 2 | Zona 2 | Zona 2 | Zona 1, bahkan Zona 0 |




#### Tabel 33

| Zona debu | Definisi (IEC 60079-10-2) | Padanan gas | EPL minimum |

| --- | --- | --- | --- |

| Zona 20 | Area di mana atmosfer eksplosif berupa awan debu mudah terbakar di udara hadir terus-menerus, untuk periode panjang, atau sering. | Zona 0 | Da |

| Zona 21 | Area di mana awan debu mudah terbakar kemungkinan hadir pada operasi normal secara sesekali. | Zona 1 | Db |

| Zona 22 | Area di mana awan debu mudah terbakar tidak mungkin hadir pada operasi normal, dan bila hadir hanya berlangsung singkat. | Zona 2 | Dc |




#### Tabel 34

| Aspek | Dust cloud (awan) | Dust layer (lapisan) |

| --- | --- | --- |

| Bentuk bahaya | Ledakan/deflagrasi bila terdispersi di udara dalam rentang mudah terbakar dan tersulut. | Smouldering/kebakaran permukaan; insulasi termal yang menaikkan suhu permukaan peralatan; sumber awan sekunder bila terangkat. |

| Penentu zona | Menentukan Zona 20/21/22 (probabilitas kehadiran awan). | Menentukan pembatasan suhu permukaan & housekeeping; lapisan tebal menaikkan kelas bahaya. |

| Parameter kunci | MIE (Minimum Ignition Energy), Kst, Pmax, konsentrasi minimum eksplosif (MEC). | Ketebalan lapisan, suhu penyalaan lapisan (LIT/MIT layer), luas cakupan. |




#### Tabel 35

| Industri | Debu tipikal | Titik/zona khas |

| --- | --- | --- |

| Pangan & pertanian (grain) | Tepung, gula, pati, biji-bijian, susu bubuk | Interior silo, bucket elevator, filter (Zona 20); titik transfer & pengantongan (Zona 21); sekitarnya (Zona 22). |

| Farmasi | Serbuk API, laktosa, eksipien | Interior mixer/granulator/fluid-bed dryer (Zona 20/21); ruang dispensing (Zona 21/22). |

| Kimia & plastik | Resin, pigmen, aditif, serbuk polimer | Interior reaktor bubuk & dryer (Zona 20/21); area pengeringan & pengemasan (Zona 21/22). |

| Logam | Serbuk aluminium, magnesium, besi (grup IIIC konduktif) | Interior mill & polishing/grinding booth (Zona 20/21); sangat sensitif — MIE rendah. |

| Kayu & kertas | Serbuk gergaji, serat, flyings | Interior cyclone & filter (Zona 20/21); sekitar sanding/sawing (Zona 22). |




#### Tabel 36

| Dokumen / kegiatan | Isi & tujuan |

| --- | --- |

| Area classification drawing | Denah + potongan berisi kontur zona; acuan grafis utama untuk seluruh disiplin. |

| Register source of release | Daftar sumber dengan grade, ventilasi, tipe zona, extent, dan basis keputusan; memungkinkan telusur & audit. |

| Basis of classification / laporan | Menjelaskan standar yang dipakai, asumsi, perhitungan/gambar generik, dan data zat. |

| Explosion Protection Document (EPD) | Menggabungkan klasifikasi dengan penilaian risiko & tindakan (Part VII); wajib pada ATEX/DSEAR. |

| Prosedur review & MoC | Meninjau ulang klasifikasi secara berkala dan pada setiap perubahan proses, zat, tata letak, atau ventilasi. |




#### Tabel 37

| Gas Group | MESG (mm) | MIC ratio (relatif metana) | Karakter |

| --- | --- | --- | --- |

| IIA | > 0,9 | > 0,8 | Paling mudah diproteksi |

| IIB | > 0,5 dan < 0,9 | > 0,45 dan < 0,8 | Menengah |

| IIC | ≤ 0,5 | < 0,45 | Paling sulit diproteksi |




#### Tabel 38

| Gas Group | Gas/uap representatif | Contoh lain | Campuran uji baku (IEC 60079-11 Tabel 7) |

| --- | --- | --- | --- |

| IIA | Propana | Metana (surface), gas alam, heksana, butana, aseton, amonia, sebagian besar pelarut & bahan bakar | Propana (5,25 ± 0,25) % vol di udara |

| IIB | Etilena (ethylene) | Dietil eter, etilen oksida, siklopropana, hidrogen sulfida (sebagian sumber) | Etilena (7,8 ± 0,5) % vol di udara |

| IIC | Hidrogen / Asetilena | Karbon disulfida (CS₂), asetilena | Hidrogen (21 ± 2) % vol di udara |




#### Tabel 39

| Dust Group | Jenis material | Penjelasan | Contoh |

| --- | --- | --- | --- |

| IIIA | Combustible flyings | Partikel padat/serat mudah terbakar berukuran nominal > 500 µm yang dapat melayang, mengendap, membentuk lapisan | Serat tekstil, serpih kayu, kapas, rayon |

| IIIB | Non-conductive dust | Debu halus (≤ 500 µm) yang tidak menghantar listrik (resistivitas listrik tinggi) | Tepung, gula, biji-bijian, banyak polimer/plastik, belerang |

| IIIC | Conductive dust | Debu halus yang menghantar listrik (resistivitas listrik rendah) | Serbuk logam (aluminium, magnesium), karbon/grafit, coke |




#### Tabel 40

| Poin Penting Zat dikelompokkan agar peralatan yang disertifikasi pada satu grup berlaku untuk semua zat yang 'sama atau lebih mudah' diproteksi. Group I = tambang (firedamp); Group II = gas/uap permukaan (IIA/IIB/IIC); Group III = debu (IIIA/IIIB/IIIC). Urutan bahaya gas: IIA < IIB < IIC; IIC (hidrogen, asetilena) paling sulit diproteksi. Hierarki inklusif menaik: IIC ⊇ IIB ⊇ IIA. Batas grup ditentukan oleh MESG (celah aman flameproof) dan MIC ratio (arus penyalaan minimum relatif metana): batas definisi IIA ≥ 0,9 mm; IIB antara 0,5 dan 0,9 mm; IIC ≤ 0,5 mm. Angka 0,55 mm bukan batas definisi melainkan ambang kecukupan satu penentuan (lihat Tabel 2.2A). Dust group: IIIA combustible flyings, IIIB debu non-konduktif, IIIC debu konduktif (paling menantang; butuh IP tinggi). Aturan pemilihan: gas/dust group peralatan harus ≥ grup zat di area. Angka batas definitif dirujuk ke IEC 60079-20-1 edisi terbaru. |

| --- |




#### Tabel 41

| Temperature class | Suhu permukaan maks. peralatan (°C) | Berlaku bila ignition temperature gas (°C) |

| --- | --- | --- |

| T1 | 450 | > 450 |

| T2 | 300 | > 300 |

| T3 | 200 | > 200 |

| T4 | 135 | > 135 |

| T5 | 100 | > 100 |

| T6 | 85 | > 85 |




#### Tabel 42

| Zat | Ignition temperature (°C) | T-class minimum diperlukan |

| --- | --- | --- |

| Hidrogen | ± 560 | T1 |

| Metana / gas alam | ± 537 | T1 |

| Amonia | ± 630 | T1 |

| Propana | ± 470 | T1 |

| Aseton | ± 465 | T1 |

| Etilena | ± 425 | T2 |

| Heksana | ± 225 | T3 |

| Dietil eter | ± 160 | T4 |

| Karbon disulfida (CS₂) | ± 90 | T6 |




#### Tabel 43

| Poin Penting Aturan inti: suhu permukaan maksimum peralatan < ignition temperature zat di area. Temperature class gas: T1 (450 °C) · T2 (300 °C) · T3 (200 °C) · T4 (135 °C) · T5 (100 °C) · T6 (85 °C). Angka kelas lebih tinggi = lebih ketat/aman; T6 mencakup semua kelas di bawahnya. Gas group dan temperature class independen — hidrogen (IIC) hanya butuh T1; CS₂ (IIC) butuh T6. Keduanya wajib dicocokkan. Untuk debu, dipakai suhu permukaan aktual (mis. T125 °C), bukan T1–T6. Kriteria debu: ≤ ⅔ ignition temperature awan, dan ≤ (ignition temperature lapisan 5 mm − 75 K); ambil yang terkecil, dengan derating untuk lapisan lebih tebal (IEC 60079-14). Suhu ambien acuan (Ta) dan housekeeping debu adalah bagian dari pemenuhan temperature class di lapangan. |

| --- |




#### Tabel 44

| EPL | Lingkungan | Tingkat jaminan (fault tolerance) | Zona sesuai |

| --- | --- | --- | --- |

| Ga | Gas | Sangat tinggi — aman saat operasi normal + 2 gangguan | 0, 1, 2 |

| Gb | Gas | Tinggi — aman saat operasi normal + 1 gangguan | 1, 2 |

| Gc | Gas | Ditingkatkan — aman saat operasi normal | 2 |

| Da | Debu | Sangat tinggi — aman saat operasi normal + 2 gangguan | 20, 21, 22 |

| Db | Debu | Tinggi — aman saat operasi normal + 1 gangguan | 21, 22 |

| Dc | Debu | Ditingkatkan — aman saat operasi normal | 22 |

| Ma | Tambang | Sangat tinggi — tetap berenergi & aman saat gas muncul | Tambang (Group I) |

| Mb | Tambang | Tinggi — aman hingga saat pemutusan daya ketika gas muncul | Tambang (Group I) |




#### Tabel 45

| Kategori ATEX | Jenis atmosfer | Tingkat proteksi | Zona sesuai | EPL setara |

| --- | --- | --- | --- | --- |

| 1G | Gas | Sangat tinggi (2 gangguan) | 0, 1, 2 | Ga |

| 2G | Gas | Tinggi (1 gangguan) | 1, 2 | Gb |

| 3G | Gas | Normal | 2 | Gc |

| 1D | Debu | Sangat tinggi (2 gangguan) | 20, 21, 22 | Da |

| 2D | Debu | Tinggi (1 gangguan) | 21, 22 | Db |

| 3D | Debu | Normal | 22 | Dc |




#### Tabel 46

| Zona (gas) | Zona (debu) | EPL | Kategori ATEX | Prinsip |

| --- | --- | --- | --- | --- |

| 0 | 20 | Ga / Da | 1G / 1D | Atmosfer hadir terus/lama → jaminan tertinggi |

| 1 | 21 | Gb / Db | 2G / 2D | Atmosfer hadir sesekali saat operasi normal |

| 2 | 22 | Gc / Dc | 3G / 3D | Atmosfer jarang & sebentar |




#### Tabel 47

| EPL peralatan | Zona 0 | Zona 1 | Zona 2 |

| --- | --- | --- | --- |

| Ga (1G) | Boleh | Boleh | Boleh |

| Gb (2G) | Tidak | Boleh | Boleh |

| Gc (3G) | Tidak | Tidak | Boleh |




#### Tabel 48

| Poin Penting Kategori ATEX dan EPL IECEx sama-sama menyatakan tingkat keandalan proteksi, dinyatakan lewat toleransi gangguan (2 / 1 / 0 gangguan). EPL: Ga/Gb/Gc (gas), Da/Db/Dc (debu), Ma/Mb (tambang). Huruf 'a' tertinggi, 'c' dasar. Padanan: Zona 0/20 → Ga/Da → 1G/1D; Zona 1/21 → Gb/Db → 2G/2D; Zona 2/22 → Gc/Dc → 3G/3D. Prinsip 'boleh turun zona, tidak boleh naik' — EPL lebih tinggi boleh dipakai di zona lebih ringan. Pemilihan benar = mencocokkan empat hal serentak: zona↔EPL, zat↔gas/dust group, zat↔temperature class, dan lingkungan↔metode proteksi/IP/ambien. |

| --- |




#### Tabel 49

| Kode | Nama / prinsip | Standar IEC 60079-x | EPL | Zona (gas) |

| --- | --- | --- | --- | --- |

| Ex d | Flameproof — mengurung ledakan internal, celah dinginkan gas | 60079-1 | Gb | 1, 2 |

| Ex p | Pressurization — tekanan lebih gas pelindung mencegah masuknya atmosfer | 60079-2 | Gb / Gc* | 1, 2 |

| Ex o | Oil immersion — bagian berpercikan direndam minyak | 60079-6 | Gb | 1, 2 |

| Ex q | Powder filling — bagian aktif dikubur dalam serbuk (pasir kuarsa) | 60079-5 | Gb | 1, 2 |

| Ex m | Encapsulation — bagian aktif dienkapsulasi resin/senyawa | 60079-18 | Ga/Gb/Gc | 0*, 1, 2 |

| Ex e | Increased safety — margin ekstra cegah busur/panas berlebih | 60079-7 | Gb / Gc | 1, 2 |

| Ex n | Type 'n' — non-sparking/energi terbatas untuk operasi normal | 60079-15 | Gc | 2 |

| Ex i | Intrinsic safety — energi rangkaian dibatasi di bawah ambang penyalaan | 60079-11 (& -25 sistem) | Ga/Gb/Gc | 0, 1, 2 |

| Ex op | Optical radiation — pembatasan energi optik (mis. serat optik) | 60079-28 | — | 0/1/2* |




#### Tabel 50

| Poin Penting Semua metode proteksi berpijak pada tiga strategi: mengurung ledakan, memisahkan sumber penyalaan, atau membatasi energi. Kode huruf standar: Ex d, p, o, q, m, e, n, i (gas Group II) dan padanan debu Ex t/pD/mD/iD. Tabel 15.1 adalah peta induk metode → standar IEC 60079-x → EPL → zona; gunakan sebagai rujukan cepat. Zona 0 → utamanya Ex ia (dan Ex ma); Zona 1 → banyak pilihan; Zona 2 → pilihan terluas (termasuk Ex n, Ex ic). Peralatan nyata sering mengkombinasikan metode (mis. Ex de, Ex db[ia]); proteksi non-listrik diatur ISO 80079-36/-37 (Ex h). IEC 60079-15 Ed. 5 (2017) hanya mencakup nC (sealed, hermetically sealed, non-incendive) dan nR. "nA" kini "ec" (IEC 60079-7); enclosed break "nC" kini "dc" (IEC 60079-1); "nL" tidak lagi ada. Ex e kini dua tingkat: "eb" (EPL Mb/Gb, tanpa semikonduktor & kapasitor elektrolit, ≤ 11 kV) dan "ec" (EPL Gc, boleh semikonduktor, ≤ 15 kV). "e" lama menjadi "eb"; "nA" lama menjadi "ec". |

| --- |




#### Tabel 51

| Tingkat proteksi | EPL yang diberikan selungkup | Peralatan yang boleh di dalam | Tekanan lebih minimum |

| --- | --- | --- | --- |

| pxb | Gb atau Db | Peralatan tak terproteksi (kecuali safety device) | 50 Pa |

| pyb | Gb atau Db | Peralatan ber-EPL Gc atau Dc (kecuali safety device) | 50 Pa |

| pzc | Gc atau Dc | Peralatan tak terproteksi (kecuali safety device) | 25 Pa |




#### Tabel 52

| Metode | Cara isolasi | Aplikasi tipikal | Zona | Perhatian lapangan |

| --- | --- | --- | --- | --- |

| Ex d | Mengurung ledakan; celah memadamkan nyala | Motor, switchgear, luminaire | 1, 2 | Integritas flame path, torsi baut, gland Ex d |

| Ex p | Tekanan lebih gas pelindung | Analyzer, panel besar, purged room | 1, 2 | Pasokan gas & monitoring tekanan/purge |

| Ex o | Rendam minyak | Transformator, switchgear minyak | 1, 2 | Level & kualitas minyak |

| Ex q | Kubur dalam serbuk (pasir) | Kapasitor, modul tanpa bagian bergerak | 1, 2 | Keutuhan pengisi, tak ada rongga |

| Ex m | Enkapsulasi resin/compound | Solenoid, relay, sensor, modul kecil | 0*, 1, 2 | Keutuhan compound, batas suhu |




#### Tabel 53

| Poin Penting Ex d (flameproof): ledakan boleh terjadi di dalam tetapi dikurung; flame path wajib dijaga saat pemeliharaan. Zona 1 & 2. Ex p (pressurization): tekanan lebih gas pelindung mencegah masuknya atmosfer; butuh purge + monitoring. Subtipe pxb/pyb (Zona 1), pzc (Zona 2); tekanan lebih minimum 50 Pa / 25 Pa. Ex o (oil): rendam minyak; Ex q (powder): kubur dalam pasir; keduanya Zona 1 & 2. Ex m (encapsulation): bungkus resin; subtipe ma/mb/mc menentukan zona (ma bisa Zona 0). Metode kurungan/isolasi cocok untuk peralatan berdaya besar yang tak bisa dibuat berenergi rendah. |

| --- |




#### Tabel 54

| Tingkat proteksi | EPL | Zona (gas) | Komponen elektronik di dalamnya | Batas tegangan pengenal |

| --- | --- | --- | --- | --- |

| eb | Mb atau Gb | 1 dan 2 | Tidak mencakup semikonduktor dan kapasitor elektrolit | ≤ 11 kV |

| ec | Gc | 2 | Mencakup semikonduktor dan kapasitor elektrolit | ≤ 15 kV |




#### Tabel 55

| Sub-jenis | Prinsip | Status pada edisi berlaku |

| --- | --- | --- |

| nC — sealed device | Perangkat tertutup rapat sehingga kontak berpercikan tidak menyentuh atmosfer | Masih diatur IEC 60079-15 Ed. 5 |

| nC — hermetically sealed device | Penyegelan hermetis (mis. dilas atau disolder) yang menjamin kekedapan permanen | Masih diatur IEC 60079-15 Ed. 5 |

| nC — non-incendive component | Komponen yang kontaknya tidak mampu menyalakan campuran uji | Masih diatur IEC 60079-15 Ed. 5 |

| nR — restricted breathing enclosure | Selungkup "napas terbatas" memperlambat masuknya gas sehingga konsentrasi berbahaya tak terbentuk | Masih diatur IEC 60079-15 Ed. 5 |

| nA — non-sparking (DIHAPUS) | Peralatan yang tidak menghasilkan busur atau percikan pada operasi normal | Dihapus dari IEC 60079-15 Ed. 5; kini menjadi tingkat proteksi "ec" pada IEC 60079-7 |

| nC — enclosed break (DIPINDAH) | Kontak berpercikan di dalam ruang yang menahan ledakan internal | Dipindah ke IEC 60079-1:2014; kini menjadi tingkat proteksi "dc" |




#### Tabel 56

| Poin Penting Ex e (increased safety): margin ekstra pada clearance, creepage, koneksi, dan suhu; untuk peralatan yang normal tak berbusur. Zona 1 & 2. Sering dikombinasi menjadi Ex de (motor: terminal Ex e + bagian berbusur Ex d). Ex n: dirancang khusus Zona 2; sub-jenis nA (non-sparking), nC (sparking-protected), nR (restricted breathing), nL (energy-limited). Penyelarasan edisi baru: nA → Ex ec, nL → Ex ic. Verifikasi ke sertifikat & edisi standar berlaku. Ex e/Ex n ekonomis namun bergantung pada kualitas konstruksi & pemeliharaan; tidak untuk Zona 0. |

| --- |




#### Tabel 57

| Level | Toleransi gangguan | EPL | Zona (gas) | Aplikasi tipikal |

| --- | --- | --- | --- | --- |

| Ex ia | Aman pada operasi normal + 2 gangguan independen | Ga | 0, 1, 2 | Instrumen di Zona 0 (mis. dalam tangki), sensor kritis |

| Ex ib | Aman pada operasi normal + 1 gangguan | Gb | 1, 2 | Instrumen lapangan Zona 1 |

| Ex ic | Aman pada operasi normal (tanpa gangguan tambahan) | Gc | 2 | Instrumen Zona 2 (ekonomis; dahulu ~Ex nL) |




#### Tabel 58

| Tingkat proteksi | Klausul | Faktor untuk penilaian penyalaan percikan | Faktor untuk penentuan temperature class | Kondisi gangguan yang dinilai |

| --- | --- | --- | --- | --- |

| Ex ia | 5.2 | 1,5 | 1,0 | operasi normal + 2 countable fault |

| Ex ib | 5.3 | 1,5 | 1,0 | operasi normal + 1 countable fault |

| Ex ic | 5.4 | 1,0 | 1,0 | operasi normal, tanpa countable maupun non-countable fault |




#### Tabel 59

| Grup peralatan | Energi penyalaan minimum | Zat acuan campuran uji (Tabela 7) |

| --- | --- | --- |

| Group I | 525 µJ | Metana (8,3 ± 0,3) % vol di udara |

| Group IIA | 320 µJ | Propana (5,25 ± 0,25) % vol di udara |

| Group IIB | 160 µJ | Etilena (7,8 ± 0,5) % vol di udara |

| Group IIC | 40 µJ | Hidrogen (21 ± 2) % vol di udara |




#### Tabel 60

| Tegangan (V) | IIC ×1 | IIC ×1,5 | IIB ×1 | IIB ×1,5 | IIA ×1 | IIA ×1,5 | Group I ×1 | Group I ×1,5 |

| --- | --- | --- | --- | --- | --- | --- | --- | --- |

| 15 | 1350 | 900 | 3290 | 2190 | 4730 | 3150 | — | — |

| 16 | 1030 | 687 | 2550 | 1700 | 3630 | 2420 | 5000 | 3330 |

| 18 | 660 | 440 | 1660 | 1110 | 2240 | 1490 | 3170 | 2110 |

| 20 | 464 | 309 | 1177 | 785 | 1572 | 1048 | 2274 | 1516 |

| 22 | 337 | 224 | 863 | 575 | 1172 | 781 | 1427 | 951,3 |

| 24 | 261 | 174 | 650 | 433 | 896 | 597 | 1057 | 704,7 |

| 30 | 152 | 101 | 379 | 253 | 510 | 340 | 710 | 473,3 |

| 45 | 68 | 45,3 | 169 | 113 | 227 | 151 | 286 | 190,7 |




#### Tabel 61

| Tegangan (V) | IIC ×1 | IIC ×1,5 | IIB ×1 | IIB ×1,5 | IIA ×1 | IIA ×1,5 | Group I ×1 | Group I ×1,5 |

| --- | --- | --- | --- | --- | --- | --- | --- | --- |

| 16 | 2,26 | 0,460 | 15,8 | 2,75 | 70 | 11,0 | 87,5 | 15,2 |

| 18 | 1,41 | 0,309 | 9,0 | 1,78 | 36 | 7,6 | 38 | 10 |

| 20 | 0,90 | 0,220 | 5,6 | 1,41 | 20,0 | 5,5 | 26 | 8 |

| 24 | 0,46 | 0,125 | 2,75 | 0,93 | 11,0 | 3,35 | 15,2 | 5,25 |

| 30 | 0,220 | 0,066 | 1,41 | 0,560 | 5,50 | 1,82 | 8 | 3,05 |

| 40 | 0,094 | 0,0325 | 0,73 | 0,305 | 2,40 | 0,940 | 4,25 | 1,78 |

| 50 | 0,0500 | 0,0200 | 0,425 | 0,193 | 1,43 | 0,570 | 2,46 | 1,12 |




#### Tabel 62

| Metode | Cara kerja | Catatan |

| --- | --- | --- |

| a) Memperberat rangkaian | Naikkan tegangan suplai ke 110 % nilai nominal untuk mensimulasikan variasi jaringan, lalu: untuk rangkaian resistif dan induktif, naikkan arus menjadi 1,5 kali arus gangguan dengan menurunkan nilai resistor pembatas; untuk rangkaian kapasitif, naikkan tegangan menjadi 1,5 kali tegangan gangguan. | Metode inilah yang berlaku bila penilaian memakai kurva Figura A.1–A.6 atau Tabela A.1 dan A.2. |

| b) Memperberat campuran uji | Gunakan campuran uji yang lebih mudah meledak pada Tabela 8 — campuran hidrogen-udara-oksigen, bukan campuran acuan Tabela 7. | Dipakai pada pengujian fisik dengan spark test apparatus ketika metode (a) tidak dapat diterapkan. |




#### Tabel 63

| Besaran | Batas kerja | Contoh penerapan |

| --- | --- | --- |

| Tegangan | ≤ ⅔ tegangan rating | Kapasitor rating 63 V dipakai maksimum pada 42 V |

| Arus | ≤ ⅔ arus rating | Resistor rating 1 A dinilai maksimum pada 0,67 A |

| Daya | ≤ ⅔ daya rating | Resistor pembatas 1 W tidak boleh mendisipasi lebih dari 0,67 W pada kondisi gangguan |




#### Tabel 64

| Parameter | Syarat | Arti |

| --- | --- | --- |

| Tegangan | Uo ≤ Ui | Tegangan yang disuplai barrier tak melampaui yang aman bagi perangkat |

| Arus | Io ≤ Ii | Arus yang disuplai barrier tak melampaui yang aman bagi perangkat |

| Daya | Po ≤ Pi | Daya yang disuplai barrier tak melampaui yang aman bagi perangkat |

| Induktansi | Lo ≥ Li + Lc (kabel) | Barrier mampu menoleransi induktansi total perangkat + kabel |

| Kapasitansi | Co ≥ Ci + Cc (kabel) | Barrier mampu menoleransi kapasitansi total perangkat + kabel |




#### Tabel 65

| Aspek | Zener barrier | Galvanic barrier |

| --- | --- | --- |

| Isolasi galvanis | Tidak ada | Ada |

| Pembumian IS | Wajib, resistansi sangat rendah | Tidak diperlukan |

| Ground loop | Rentan | Kebal |

| Biaya | Rendah | Lebih tinggi |

| Catu daya terpisah | Umumnya tidak | Ya |

| Aplikasi | Sederhana, hemat biaya | Instalasi modern, sinyal beragam |




#### Tabel 66

| Poin Penting Intrinsic safety membatasi energi (V, I, P) dan energi tersimpan (L, C) di bawah ambang penyalaan (MIE) — bukan mengurung/mengisolasi. Metode utama dan paling lazim untuk Zona 0 (Ex ia = EPL Ga; alternatif Ex ma — lihat Bab 15 dan 16); aman dikerjakan berenergi; ideal untuk instrumentasi & perangkat genggam berdaya rendah. Level: Ex ia (0 + 2 gangguan → Zona 0), Ex ib (0 + 1 gangguan → Zona 1), Ex ic (operasi normal → Zona 2); paralel EPL Ga/Gb/Gc. Kecocokan loop diverifikasi lewat entity parameters: Uo≤Ui · Io≤Ii · Po≤Pi · Lo≥Li+Lc · Co≥Ci+Cc (kabel wajib diperhitungkan). Zener barrier murah tapi butuh IS earth < 1 Ω; galvanic barrier terisolasi, tanpa pembumian khusus, dominan pada instalasi modern. Keselamatan IS bersifat sistem (IEC 60079-25): butuh dokumentasi loop lengkap; setiap perubahan menuntut verifikasi ulang & Management of Change. Faktor keamanan menurut IEC 60079-11: 1,5 untuk ia dan ib pada penilaian penyalaan percikan, 1,0 untuk ic. Untuk penentuan temperature class faktornya 1,0 pada semua tingkat (§18.4A). Aturan turunan dua pertiga: komponen keselamatan tidak boleh bekerja melampaui ⅔ rating tegangan, arus, dan dayanya, dinilai pada kondisi gangguan. Entity parameters pada sertifikat sudah memuat faktor keamanan — verifikasi loop memakai angka sertifikat apa adanya, tanpa mengalikannya lagi (§18.4A.5). Kurva dan tabel penyalaan referensi ada pada Anexo A IEC 60079-11 (Figura A.1–A.6, Tabela A.1–A.2); cuplikan pada Tabel 18.1C dan 18.1D hanya untuk orientasi — pakai tabel lengkap edisi berlaku untuk desain. |

| --- |




#### Tabel 67

| Elemen | Contoh | Arti |

| --- | --- | --- |

| Tanda CE + no. Notified Body | CE 0158 | Kesesuaian ATEX; angka = Notified Body pengawas QA (khusus ATEX). |

| Simbol Ex spesifik (heksagon) | Ⓔx | Menandai peralatan untuk atmosfer eksplosif (khusus ATEX). |

| Equipment Group | II | I = tambang bawah tanah (gas metana/coal dust); II = industri permukaan; III = debu (skema tertentu). |

| Category + huruf zat | 2G | Angka 1/2/3 = tingkat proteksi; G = Gas/uap, D = Dust. (Bagian ATEX). |

| Kode Ex (IEC) | Ex | Menyatakan peralatan mengikuti satu/lebih tipe proteksi IEC 60079. |

| Type of protection | d, e, ia, ib, ic, p, m, o, q, n, t | Metode proteksi yang dipakai (lihat Part V). Bisa lebih dari satu. |

| Gas/Dust Group | IIA / IIB / IIC ; IIIA / IIIB / IIIC | Kelompok zat menurut MESG/MIC (gas) atau jenis debu. |

| Temperature Class | T1–T6 (gas) ; atau T…°C (debu) | Batas suhu permukaan maksimum (lihat Part IV, Bab 13). |

| Equipment Protection Level (EPL) | Ga/Gb/Gc ; Da/Db/Dc ; Ma/Mb | Tingkat proteksi terintegrasi menurut IEC — menautkan langsung ke zona. |

| Rentang suhu ambien | Ta -20°C…+40°C | Rentang suhu lingkungan tempat sertifikasi berlaku. |

| IP rating | IP66 | Tingkat proteksi masuknya debu & air (IEC 60529). |

| Nomor sertifikat + sufiks | IECEx ABC 12.0001X / U | Referensi sertifikat; 'X' = kondisi khusus, 'U' = komponen Ex. |




#### Tabel 68

| Aspek | Division (NEC 500) | Zone (NEC 505) / IEC |

| --- | --- | --- |

| Dasar | Class–Division–Group | Zone 0/1/2 (gas), 20/21/22 (debu) |

| Contoh mark | Class I Div 1 Group D T3 | Class I Zone 1 AEx d IIC T4 / Ex d IIC T4 Gb |

| Gas grouping | A, B, C, D | IIA, IIB, IIC |

| Debu grouping | E, F, G | IIIA, IIIB, IIIC |

| Konsep EPL | Tidak ada | Ada (Ga/Gb/Gc, Da/Db/Dc) |

| Type of protection tercetak | Tidak selalu | Ya (d, e, i, p, m, …) |




#### Tabel 69

| Blok | Pertanyaan yang dijawab | Kunci baca |

| --- | --- | --- |

| II / I | Untuk industri apa? | I = tambang; II = permukaan; III = debu (skema tertentu). |

| 1/2/3 + G/D | Kategori & zat (ATEX)? | 1→Zona 0/20; 2→Zona 1/21; 3→Zona 2/22. G=gas, D=debu. |

| Ex | Standar IEC? | Mengikuti seri IEC/EN 60079. |

| d,e,i,p,m,o,q,n,t | Metode proteksi apa? | Lihat Part V. Bisa lebih dari satu. |

| IIA/IIB/IIC | Gas group? | IIC paling ketat; IIC mencakup IIB & IIA. |

| IIIA/IIIB/IIIC | Dust group? | IIIC (konduktif) paling ketat. |

| T1–T6 | Batas suhu permukaan? | T6=85°C … T1=450°C. Harus < ignition temp gas. |

| Ga/Gb/Gc, Da/Db/Dc | EPL → zona? | a→Zona 0/20; b→Zona 1/21; c→Zona 2/22. |

| Ta …°C | Rentang ambien? | Pasang hanya dalam rentang ini. |

| IP.. | Proteksi ingress? | Cek terhadap debu/air lingkungan (IEC 60529). |

| X / U | Kondisi khusus / komponen? | 'X'=patuhi syarat khusus; 'U'=komponen, tak berdiri sendiri. |




#### Tabel 70

| # | Parameter area (input) | Parameter peralatan (harus dipenuhi) |

| --- | --- | --- |

| 1 | Zona (0/1/2 atau 20/21/22) | EPL / Category yang sesuai atau lebih tinggi (Ga/Gb/Gc; 1/2/3) |

| 2 | Gas group / Dust group area | Gas/Dust group peralatan sama atau lebih ketat (IIC⊇IIB⊇IIA) |

| 3 | Suhu penyalaan (ignition temp) zat | Temperature class peralatan dengan Tmaks < ignition temp |

| 4 | Suhu ambien lokasi | Rentang Ta pada label mencakup suhu ambien aktual |

| 5 | Kondisi ingress (debu, air, jet) | IP rating memadai (mis. IP6X untuk debu; IPX6 untuk jet air) |

| 6 | Beban mekanik & korosi | Material & konstruksi tahan lingkungan (mis. SS316, impact rating) |




#### Tabel 71

| Zona | EPL (IECEx) | Kategori (ATEX) | Karakter zona |

| --- | --- | --- | --- |

| Zona 0 | Ga | II 1G | Atmosfer gas hadir terus-menerus / periode panjang / sering. |

| Zona 1 | Gb | II 2G | Atmosfer gas kemungkinan hadir pada operasi normal (kadang). |

| Zona 2 | Gc | II 3G | Atmosfer gas jarang & singkat, hanya saat abnormal. |

| Zona 20 | Da | II 1D | Awan debu hadir terus-menerus / sering / periode panjang. |

| Zona 21 | Db | II 2D | Awan debu kemungkinan hadir pada operasi normal. |

| Zona 22 | Dc | II 3D | Awan debu jarang & singkat, hanya saat abnormal. |




#### Tabel 72

| T-Class | Suhu permukaan maks | Contoh kesesuaian gas (ignition temp lebih tinggi) |

| --- | --- | --- |

| T1 | 450 °C | metana (~537°C), amonia, banyak gas ringan |

| T2 | 300 °C | etanol, aseton |

| T3 | 200 °C | bensin/heksana (~230°C), sebagian besar hidrokarbon |

| T4 | 135 °C | asetaldehida, dietil eter (~170°C) |

| T5 | 100 °C | aplikasi khusus suhu rendah |

| T6 | 85 °C | karbon disulfida (CS₂, ~90°C) |




#### Tabel 73

| Parameter flens/joint | Mengapa penting | Praktik pemeliharaan |

| --- | --- | --- |

| Gap (celah) maksimum | Celah terlalu lebar meloloskan nyala; menghilangkan proteksi | Ukur dengan feeler gauge; bandingkan terhadap batas sertifikat |

| Panjang flame path minimum | Path terlalu pendek tak cukup mendinginkan gas | Jangan mengurangi bidang kontak; jangan menambah lubang di flens |

| Kekasaran & kerataan permukaan | Goresan/penyok jadi jalur bocor | Bersihkan hanya dengan scraper non-logam & cairan non-korosif |

| Bebas korosi/cat pada flame path | Karat/cat mengganggu celah & bidang kontak | Lindungi dengan gemuk tipis non-korosif; jangan cat di dalam path |

| Baut & pengencang lengkap, benar | Baut kurang/keliru menurunkan kekuatan tahan tekanan | Gunakan baut grade & panjang sesuai desain pabrikan; torsi benar |

| Engagement ulir (untuk joint ulir) | Ulir kurang rapat meloloskan nyala | Penuhi jumlah ulir/panjang engagement minimum sesuai sertifikat |




#### Tabel 74

| Tipe | Definisi ringkas | Interval / catatan |

| --- | --- | --- |

| Initial | Inspeksi seluruh peralatan/sistem sebelum masuk layanan (bagian commissioning). | Sekali, sebelum start-up. Grade umumnya detailed. |

| Periodic | Inspeksi berulang untuk memastikan proteksi terjaga. | Interval tidak boleh melampaui 3 tahun tanpa risk assessment terdokumentasi oleh independent expert (klausul 4.4). Peralatan bergerak hanya boleh dipakai pada lokasi yang sesuai tipe proteksi, grup, dan suhu permukaannya (klausul 4.12). |

| Sample | Inspeksi atas sebagian (proporsi) instalasi untuk memantau efek lingkungan/getaran/kelemahan desain. | Visual/close/detailed atas sampel terpilih. |

| Continuous supervision | Kehadiran & perawatan berkelanjutan oleh personel terampil yang berpengalaman pada instalasi tersebut. | Menggantikan sebagian inspeksi periodik terjadwal jika memenuhi syarat 60079-17. |




#### Tabel 75

| No | Butir pemeriksaan | Grade minimum |

| --- | --- | --- |

| 1 | Peralatan sesuai klasifikasi area & marking benar (EPL/group/T-class cocok zona) | Visual |

| 2 | Tidak ada kerusakan/retak/korosi nyata pada selungkup | Visual |

| 3 | Tidak ada modifikasi atau penambahan tidak sah | Visual |

| 4 | Baut/pengencang lengkap & kencang; tidak ada yang hilang | Visual/Close |

| 5 | Glanda kabel benar, kencang, sesuai tipe; stopping plug bersertifikat pada lubang tak terpakai | Close |

| 6 | Sistem sealing/barrier sesuai (khusus Ex d) & compound utuh | Close/Detailed |

| 7 | Tingkat IP terjaga (gasket/O-ring baik, tidak ada celah masuk debu/air) | Close |

| 8 | Earthing & bonding kontinu; sambungan bersih & kencang | Close/Detailed |

| 9 | Terminasi listrik kencang; tidak ada tanda panas berlebih/oksidasi | Detailed |

| 10 | Flameproof joint (Ex d): gap, flame path, kebersihan, bebas cat/korosi | Detailed |

| 11 | Sirkuit IS terpisah dari non-IS; label & warna (biru) benar; barrier utuh | Close/Detailed |

| 12 | Kabel: tidak rusak, terfiksasi, radius tekuk memadai, tidak tegang | Close |

| 13 | Ventilasi/pendinginan tidak terhalang (mis. motor Ex e) | Visual/Close |

| 14 | Suhu ambien aktual masih dalam rentang Ta peralatan | Close |

| 15 | Dokumentasi (drawing, register peralatan, sertifikat, kondisi 'X') mutakhir | Detailed |




#### Tabel 76

| Kelompok regulasi | Ditujukan kepada | Fokus | Contoh instrumen |

| --- | --- | --- | --- |

| Safe Plant (fasilitas aman) | Pemilik/operator fasilitas (dutyholder) | Risiko di tempat kerja: klasifikasi zona, prosedur, pemeliharaan, pelatihan | ATEX 1999/92/EC (ATEX 153) → EPD; DSEAR (UK); OSHA/NFPA (US) → DHA |

| Safe Equipment (peralatan aman) | Produsen peralatan & sistem proteksi | Desain & manufaktur produk agar aman dipakai di hazardous area | ATEX 2014/34/EU (ATEX 114); IECEx; NEC/CEC |




#### Tabel 77

| No. | Sumber penyalaan (EN 1127-1) | No. | Sumber penyalaan (EN 1127-1) |

| --- | --- | --- | --- |

| 1 | Permukaan panas (hot surfaces) | 8 | Arus listrik liar / stray currents, proteksi katodik |

| 2 | Nyala api & gas panas (termasuk partikel panas) | 9 | Listrik statis (static electricity) |

| 3 | Percikan mekanis (mechanically generated sparks) | 10 | Petir (lightning) |

| 4 | Peralatan listrik (electrical apparatus) | 11 | Gelombang elektromagnetik RF |

| 5 | Kompresi adiabatik & gelombang kejut | 12 | Gelombang elektromagnetik optik |

| 6 | Radiasi pengion (ionizing radiation) | 13 | Reaksi kimia (termasuk self-ignition) |

| 7 | Ultrasound | — | — |




#### Tabel 78

| Elemen wajib EPD | Uraian singkat |

| --- | --- |

| Penilaian risiko ledakan | Bukti bahwa risiko ledakan telah diidentifikasi dan dinilai. |

| Tindakan teknis & organisatoris | Langkah mengurangi kemungkinan ledakan dan langkah meminimalkan dampaknya. |

| Perangkat peringatan dini | Deskripsi operasi alarm/gas detection dan sistem peringatan. |

| Klasifikasi area (zona) | Daftar tempat berklasifikasi (hazardous zone), penandaan area, dan lokasinya. |

| Sifat zat berbahaya | Properti zat yang menimbulkan bahaya ledakan (LEL/UEL, flash point, gas/dust group, dsb.). |

| Pelatihan & pengawasan | Prosedur pelatihan dan supervisi bagi pekerja di hazardous area. |

| Permit-to-work & prosedur | Sistem izin kerja, pemeliharaan, prosedur operasi, dan koordinasi antar-pemberi kerja. |

| Jalur evakuasi | Sarana penyelamatan diri (means of escape) jika terjadi ledakan/kebakaran. |




#### Tabel 79

| Bagian | Isi pokok |

| --- | --- |

| 0. Sampul & pengendalian dokumen | Judul, nomor revisi, tanggal, penyusun, peninjau, pengesah (dutyholder); riwayat perubahan. |

| 1. Ruang lingkup & lokasi | Batas fasilitas/unit yang dicakup; deskripsi proses; referensi P&ID dan plot plan. |

| 2. Zat berbahaya & sifatnya | Inventaris gas/uap/mist/debu; parameter (LEL/UEL, flash point, MIE, gas/dust group, Kst/Pmax); lembar data (SDS). |

| 3. Sumber pelepasan | Daftar source of release, grade (continuous/primary/secondary), laju & kondisi pelepasan. |

| 4. Klasifikasi area | Metodologi, tipe & luas (extent) zona, gambar klasifikasi area (area classification drawing), referensi IEC 60079-10-1/-10-2. |

| 5. Penilaian sumber penyalaan | Tinjauan 13 sumber EN 1127-1 per zona; efektivitas; kesesuaian peralatan Ex terpasang (marking vs zona). |

| 6. Penilaian & peringkat risiko | Skenario What-If, matriks Likelihood×Severity, risiko sisa, kriteria keberterimaan (ALARP). |

| 7. Tindakan pengendalian | Pencegahan, proteksi, dan mitigasi (teknis & organisatoris); sistem peringatan dini; jalur evakuasi. |

| 8. Aspek organisatoris | Pelatihan & kompetensi, permit-to-work, prosedur operasi & pemeliharaan, koordinasi kontraktor. |

| 9. Verifikasi & tinjauan | Rencana inspeksi (IEC 60079-17), jadwal tinjauan berkala, tautan ke Management of Change. |

| Lampiran | Register zona, register peralatan Ex, sertifikat, gambar, hasil DHA/HAZOP. |




#### Tabel 80

| Standar NFPA | Cakupan |

| --- | --- |

| NFPA 652 | Fundamentals of Combustible Dust — standar induk; mewajibkan DHA dan menetapkan tanggung jawab pemilik/operator. |

| NFPA 654 | Debu kimia, partikel padat organik & anorganik yang mudah terbakar (pemrosesan umum, dust collection, conveying). |

| NFPA 61 | Fasilitas pengolahan & penanganan produk pertanian dan pangan (grain, gula, tepung). |

| NFPA 484 / 664 / 655 | Contoh standar komoditas lain: logam mudah terbakar (484), kayu (664), sulfur (655) — untuk konteks. |




#### Tabel 81

| Poin Penting — Bab 22 Regulasi keselamatan ledakan terbagi dua: safe plant (kewajiban pemilik → EPD/DHA) dan safe equipment (kewajiban produsen → sertifikasi, Bab 23). Explosion risk assessment ala EU menempuh alur iteratif: identifikasi zat → kemungkinan atmosfer eksplosif → klasifikasi zona → 13 sumber penyalaan EN 1127-1 → evaluasi Likelihood×Severity → tindakan → EPD. EPD (ATEX 1999/92/EC; DSEAR di UK) wajib memuat penilaian risiko, tindakan teknis & organisatoris, klasifikasi zona, sifat zat, pelatihan, permit-to-work, dan jalur evakuasi. Di AS, Dust Hazard Analysis (NFPA 652 induk; 654/61 sektor) adalah instrumen setara untuk bahaya debu, dengan tinjauan berkala (umumnya ≤ 5 tahun). HAZOP memberi umpan skenario penyimpangan; Management of Change menjaga EPD/DHA tetap mutakhir — kepatuhan adalah siklus, bukan dokumen sekali jadi. |

| --- |




#### Tabel 82

| Aspek | IECEx (internasional) | ATEX (Uni Eropa) |

| --- | --- | --- |

| Sifat | Sukarela, global | Wajib untuk pasar UE (New Approach Directive) |

| Penilaian desain | IECEx Certificate of Conformity (CoC) | EU-Type Examination Certificate (Module B) |

| Laporan uji | ExTR (Ex Test Report) | Berkas teknis & laporan Notified Body |

| Sistem mutu | QAR (Quality Assessment Report) + IECEx QMS | Production QA (Module D) / Product QA (Module E); QAN (Quality Assurance Notification) |

| Badan penilai | ExCB (Certification Body) & ExTL (Test Laboratory) | Notified Body (bernomor 4 digit) |

| Penandaan hasil | Logo IECEx + nomor CoC | Marking CE + simbol Ex + nomor Notified Body |




#### Tabel 83

| Sufiks | Arti | Implikasi bagi pengguna |

| --- | --- | --- |

| X | Specific/Particular Conditions of Use — terdapat kondisi khusus penggunaan yang aman. | Wajib membaca dan mematuhi kondisi khusus di sertifikat (mis. batas suhu ambien, jenis cable gland tertentu, pembatasan pemasangan, pembersihan antistatik). Mengabaikannya membatalkan proteksi. |

| U | Ex Component — perangkat adalah komponen Ex (mis. terminal block, empty enclosure, plug), bukan peralatan lengkap. | Tidak boleh dipakai sendiri; harus diintegrasikan ke dalam peralatan/rakitan yang kemudian disertifikasi sebagai kesatuan. |




#### Tabel 84

| Badan | Skema | Peran |

| --- | --- | --- |

| ExTL — Ex Testing Laboratory | IECEx | Melakukan pengujian teknis produk dan menyusun ExTR. |

| ExCB — Ex Certification Body | IECEx | Menilai ExTR & sistem mutu, menerbitkan IECEx CoC, mengaudit pabrikan (QAR), melakukan surveilans. |

| Notified Body | ATEX | Badan yang ditunjuk otoritas negara anggota UE; menerbitkan EU-Type Examination Certificate dan/atau QAN, dikenali lewat nomor 4 digit (mis. 0044, 0081). |

| Manufacturer (pabrikan) | Keduanya | Bertanggung jawab atas desain, produksi, Declaration of Conformity, penerapan marking, dan pemeliharaan sistem mutu. |




#### Tabel 85

| Poin Penting — Bab 23 Sertifikasi bertumpu pada dua pilar: kesesuaian desain (pengujian & Type Examination) dan kesesuaian produksi (audit sistem mutu). Alur umum: pabrikan → pengujian lab → ExTR → penilaian ExCB/Notified Body → sertifikat (CoC / EU-Type Examination) → QAR/QAN → surveilans. IECEx (sukarela, global) memakai CoC + ExTR + QAR via ExCB/ExTL; ATEX (wajib di UE) memakai EU-Type Examination + QAN via Notified Body bernomor 4 digit. Sufiks 'X' = kondisi khusus penggunaan wajib dipatuhi; 'U' = komponen Ex yang tidak boleh dipakai berdiri sendiri. Sertifikat harus terus valid: surveilans, edisi standar, dan Management of Change ikut menentukan keabsahan — bukan hanya marking di nameplate. |

| --- |




#### Tabel 86

| Unit | Cakupan |

| --- | --- |

| EX01 | Preparation & Installation of Ex 'd', 'e', 'n' dan 'p' systems — persiapan dan pemasangan peralatan flameproof, increased safety, type n, dan pressurization. |

| EX02 | Inspection & Maintenance of Ex 'd', 'e', 'n' dan 'p' systems — inspeksi dan perawatan tipe-tipe proteksi tersebut. |

| EX03 | Preparation & Installation of Ex 'i' systems — persiapan dan pemasangan sistem intrinsically safe. |

| EX04 | Inspection & Maintenance of Ex 'i' systems — inspeksi dan perawatan sistem intrinsically safe. |

| EX11 | Mechanical — Ex 'd' Flanged Joint / Mechanical Flange Integrity: kompetensi menjaga integritas sambungan flange pada peralatan mekanis Ex (mis. flamepath, pengencangan baut sesuai torsi). |

| Foundation / Awareness | Modul pengantar prinsip hazardous area, klasifikasi, tipe proteksi, grouping, temperature class, dan marking sebagai dasar unit inti. |




#### Tabel 87

| Unit (contoh) | Fokus kompetensi |

| --- | --- |

| Ex 001 | Prinsip dasar proteksi di atmosfer eksplosif (fondasi bagi semua unit lain). |

| Ex 002 | Klasifikasi hazardous area (perform/apply area classification). |

| Ex 003 / Ex 004 | Instalasi dan pemasangan peralatan Ex (sesuai IEC 60079-14). |

| Ex 005 / Ex 006 | Pemeriksaan (inspection) peralatan Ex — visual, close, detailed (IEC 60079-17). |

| Ex 007 / lanjutan | Pemeliharaan/perbaikan (maintenance/overhaul), termasuk repair IEC 60079-19; unit spesialis lain sesuai peran. |




#### Tabel 88

| Peran | Tanggung jawab utama | Referensi standar |

| --- | --- | --- |

| Dutyholder / Operator | Menyediakan tempat kerja aman; memastikan EPD/DHA tersusun; menyediakan personel kompeten; menegakkan permit-to-work & MoC. | ATEX 1999/92/EC; DSEAR; OSHA/NFPA |

| Designer (Responsible Person) | Klasifikasi area; pemilihan tipe proteksi, EPL, gas group & temperature class; spesifikasi & dokumentasi desain. | IEC 60079-10-1/-10-2; -14 |

| Installer / Technician | Instalasi sesuai desain: pemilihan & pemasangan cable gland, sealing, glanding, earthing/bonding; menjaga flamepath. | IEC 60079-14 |

| Inspector / Maintainer | Inspeksi awal & berkala (visual, close, detailed); pemeliharaan; pelaporan cacat; menjaga integritas proteksi. | IEC 60079-17 (-19 untuk repair) |

| Management / QA | Sistem mutu, audit kompetensi, kendali dokumen, koordinasi kontraktor. | Sistem manajemen mutu & keselamatan proses |




#### Tabel 89

| Kesalahan umum | Konsekuensi / risiko |

| --- | --- |

| Cable gland salah tipe atau tidak sesuai sertifikat (mis. tanpa barrier pada Ex d). | Kehilangan integritas flameproof; jalur rambatan api ke luar enclosure. |

| Baut/penutup enclosure tidak lengkap atau tak dikencangkan sesuai torsi. | Celah flamepath melebihi batas; proteksi Ex d batal. |

| Flamepath tergores, berkarat, atau dicat sehingga dimensi berubah. | Gap/lebar flamepath di luar spesifikasi; api dapat lolos. |

| Substitusi suku cadang non-Ex atau tidak identik saat perbaikan. | Membatalkan sertifikat; peralatan tak lagi sesuai marking. |

| Mengabaikan kondisi khusus sertifikat 'X'. | Peralatan dioperasikan di luar batas amannya (suhu ambien, gland, dsb.). |

| Peralatan dipilih untuk zona/gas group/temperature class yang salah. | Proteksi tak memadai untuk atmosfer setempat (langgar prinsip 'boleh turun zona, tidak boleh naik'). |

| Earthing/bonding buruk; listrik statis tak dikelola. | Sumber penyalaan spark discharge (sumber ke-9 EN 1127-1). |

| Inspeksi berkala IEC 60079-17 tidak dijalankan atau tak terdokumentasi. | Degradasi proteksi tak terdeteksi; jejak audit hilang. |

| Housekeeping debu buruk (akumulasi lapisan debu). | Bahan bakar ledakan sekunder; naiknya kelas zona debu efektif. |




#### Tabel 90

| Poin Penting — Bab 24 Peralatan bersertifikat tetap gagal bila dipasang/dirawat oleh personel tak kompeten — kompetensi adalah pengendali risiko, bukan pelengkap administratif. CompEx menilai teori + praktik: EX01/EX02 (Ex d,e,n,p), EX03/EX04 (Ex i), EX11 (integritas flange mekanis). IECEx CoPC (Unit Ex 001+ per IECEx OD 504) adalah skema kompetensi internasional; Unit Ex 001 adalah fondasi prinsip proteksi. Rantai tanggung jawab: dutyholder (hukum) → designer → installer → inspector → management, masing-masing dengan referensi IEC 60079-10/-14/-17. Mayoritas kegagalan berasal dari kesalahan lapangan (gland salah, baut kurang torsi, flamepath rusak, kondisi 'X' diabaikan) — dicegah oleh kompetensi + budaya keselamatan. |

| --- |




#### Tabel 91

| Aspek | Ex d (Flameproof) | Ex i (Intrinsic Safety) |

| --- | --- | --- |

| Prinsip | Menahan & mendinginkan ledakan internal | Membatasi energi di bawah MIE |

| Bobot & ukuran | Berat, tebal — enclosure logam | Ringan, kompak |

| Perawatan energize | Dilarang buka saat energize | Boleh di-service saat energize |

| Ganti baterai lapangan | Umumnya tidak praktis | Dimungkinkan (baterai bersertifikat) |

| Kesesuaian mobile | Rendah | Sangat tinggi — metode pilihan |

| EPL tercapai | Gb (Zona 1) | Ga/Gb/Gc (Zona 0/1/2) |




#### Tabel 92

| Parameter | Ex ib IIC T4 Gb (Zona 1) | Ex ic IIC T4 Gc (Zona 2) |

| --- | --- | --- |

| EPL | Gb | Gc |

| Zona diizinkan | Zona 1 dan Zona 2 | Zona 2 saja |

| Toleransi kesalahan | Aman dengan 1 fault | Aman pada operasi normal |

| Faktor keamanan (arus) | 1,5 × | 1,0 × (tanpa margin tambahan) |

| Contoh area | Unit proses kilang, offshore, sekitar pompa/valve | Gudang, area berventilasi baik, storage |

| Implikasi biaya/desain | Proteksi lebih ketat | Lebih ringan/ekonomis, cakupan terbatas |




#### Tabel 93

| Segmen | Arti | Konsekuensi bagi pengguna |

| --- | --- | --- |

| II | Group peralatan permukaan (non-tambang) | Bukan untuk tambang bawah tanah (Group I) |

| 2G | Kategori ATEX 2, Gas | Cocok untuk Zona 1 (dan 2) |

| Ex ib | Intrinsic safety, aman 1 fault | Zona 1 ke bawah |

| IIC | Gas group IIC | Mencakup hidrogen & asetilen (paling menuntut) |

| T4 | Temperature class ≤ 135 °C | Aman untuk zat dengan suhu penyalaan > 135 °C |

| Gb | EPL Gas level b | Konsisten dengan Zona 1 |




#### Tabel 94

| Fungsi | Manfaat keselamatan/operasi | Catatan Ex |

| --- | --- | --- |

| Telemetri & IoT | Kurangi waktu di area; keputusan berbasis data | Modul RF dalam batas IS; antena bersertifikat |

| Lone worker | Deteksi man-down/no-motion; respons cepat | Sensor gerak internal, tidak menambah energi |

| Sensor Bluetooth | Baca detektor gas pribadi & meter portabel | Pairing hanya perangkat tersertifikasi/kompatibel |

| Kamera & video | Dokumentasi inspeksi; remote expert | Lampu/flash dinilai terhadap batas termal & energi |

| RFID / barcode | Identifikasi aset & work order (EAM/CMMS) | Pembaca daya rendah; dalam batas IS |

| Komunikasi | Push-to-talk, panggilan darurat | Radio/seluler dalam sertifikasi perangkat |




#### Tabel 95

| No. | Butir pemeriksaan | Kriteria diterima |

| --- | --- | --- |

| 1 | Tentukan zona area penggunaan (gas dan/atau debu) | Zona 0/1/2 dan/atau 20/21/22 terdefinisi dari area classification |

| 2 | Tetapkan EPL/kategori minimum yang dibutuhkan | EPL perangkat ≥ kebutuhan zona (Ga/Gb/Gc; Da/Db/Dc) |

| 3 | Identifikasi gas group & dust group zat | Gas group perangkat mencakup zat (IIC mencakup IIA/IIB) |

| 4 | Tentukan temperature class yang diperlukan | T-class perangkat ≥ kebutuhan (T4 aman bila Tign > 135 °C) |

| 5 | Periksa suhu ambien operasi (Ta) | Rentang Ta pada marking mencakup kondisi lokasi |

| 6 | Periksa proteksi debu bila ada Zona 20/21/22 | Marking ...D / Da/Db/Dc dan IP sesuai |

| 7 | Periksa IP rating & ketahanan lingkungan | IP, korosi, guncangan sesuai lingkungan |

| 8 | Konfirmasi baterai & charging bersertifikat | Baterai asli; charging di area aman/tersertifikasi |

| 9 | Verifikasi fungsi nirkabel & sensor eksternal | Bluetooth/RF & sensor pairing dalam sertifikasi |

| 10 | Baca kondisi khusus (sertifikat «X») | Semua special conditions of use dipahami & dipenuhi |

| 11 | Cek validitas sertifikat (ATEX/IECEx/HazLoc) | Sertifikat berlaku & sesuai skema wilayah pelanggan |

| 12 | Susun instruksi pengguna & pelatihan | Operator paham batasan zona, charging, dan perawatan |




#### Tabel 96

| Istilah | Definisi ringkas |

| --- | --- |

| ATEX | Regulasi Uni Eropa untuk peralatan (2014/34/EU) & tempat kerja (1999/92/EC) di atmosfer eksplosif. |

| IECEx | Skema sertifikasi internasional (IEC) untuk peralatan, service facility, dan kompetensi personel (CoPC). |

| HazLoc | Hazardous Location — istilah Amerika Utara (NEC/CEC) untuk hazardous area. |

| Hazardous area | Area di mana atmosfer eksplosif hadir atau berpotensi hadir dalam jumlah yang menuntut tindakan khusus. |

| Atmosfer eksplosif | Campuran udara dengan zat mudah terbakar (gas, uap, kabut, debu) yang setelah menyala menjalarkan pembakaran. |

| Source of release | Titik/lokasi tempat zat mudah terbakar dapat terlepas ke atmosfer. |

| Grade of release | Tingkat pelepasan: continuous, primary, atau secondary — menentukan zona. |

| EPL | Equipment Protection Level — tingkat proteksi peralatan (Ga/Gb/Gc, Da/Db/Dc, Ma/Mb). |

| Flameproof (Ex d) | Proteksi yang menahan ledakan internal & mencegah penjalaran ke luar via flame path (IEC 60079-1). |

| Intrinsic safety (Ex i) | Proteksi dengan membatasi energi listrik & termal di bawah ambang penyalaan (IEC 60079-11). |

| Increased safety (Ex e) | Proteksi dengan langkah tambahan mencegah busur/percikan & suhu berlebih (IEC 60079-7). |

| Pressurization (Ex p) | Menjaga tekanan gas pelindung dalam enclosure agar atmosfer eksplosif tak masuk (IEC 60079-2). |

| Encapsulation (Ex m) | Komponen dibungkus senyawa (compound) sehingga tak dapat menyalakan atmosfer (IEC 60079-18). |

| Temperature class | Klasifikasi suhu permukaan maksimum peralatan gas: T1 (450 °C) hingga T6 (85 °C). |

| Gas group | Pengelompokan gas menurut MESG/MIC: IIA, IIB, IIC (dan I untuk tambang metana). |

| Dust group | Pengelompokan debu: IIIA (serat), IIIB (non-konduktif), IIIC (konduktif). |

| Flash point | Suhu terendah saat cairan melepas uap cukup untuk membentuk campuran menyala. |

| LEL / UEL | Lower/Upper Explosive Limit — batas bawah/atas konsentrasi mudah terbakar. |

| MESG | Maximum Experimental Safe Gap — celah aman maksimum; dasar pengelompokan gas. |

| MIE | Minimum Ignition Energy — energi minimum untuk menyalakan atmosfer eksplosif. |

| Ignition temperature | Suhu penyalaan otomatis (auto-ignition) zat tanpa sumber percikan. |

| EPD | Explosion Protection Document — dokumen penilaian & proteksi ledakan (ATEX 153/DSEAR). |

| Dust Hazard Analysis | Analisis bahaya debu sistematis (pendekatan NFPA 652/654/61). |

| Notified Body | Badan yang ditunjuk untuk menilai kesesuaian peralatan ATEX (mis. EU-Type Examination). |

| Type Examination | Pengujian tipe yang menyatakan sebuah desain peralatan memenuhi standar. |

| Entity parameters | Parameter IS (Uo/Io/Po, Ui/Ii/Pi, Ca/Lo, Ci/Li) untuk verifikasi kecocokan loop. |

| IS barrier | Zener/galvanic barrier yang membatasi energi masuk ke hazardous area. |

| Sertifikat «X» | Sertifikat dengan kondisi khusus penggunaan (special conditions of use). |

| Sertifikat «U» | Sertifikat komponen Ex (Ex Component), bukan peralatan lengkap siap pakai. |




#### Tabel 97

| Zona Gas (IEC) | Division (NEC 500) | Zona Debu (IEC) | Keterangan |

| --- | --- | --- | --- |

| Zona 0 | Class I Division 1 | Zona 20 | Atmosfer hadir terus-menerus/lama |

| Zona 1 | Class I Division 1 | Zona 21 | Hadir saat operasi normal |

| Zona 2 | Class I Division 2 | Zona 22 | Hanya saat abnormal, singkat |




#### Tabel 98

| Kategori ATEX | EPL | Zona (Gas) | Zona (Debu) | Group |

| --- | --- | --- | --- | --- |

| 1G | Ga | 0 (1,2) | — | II |

| 2G | Gb | 1 (2) | — | II |

| 3G | Gc | 2 | — | II |

| 1D | Da | — | 20 (21,22) | III |

| 2D | Db | — | 21 (22) | III |

| 3D | Dc | — | 22 | III |

| M1 | Ma | energize saat gas hadir | — | I (tambang) |

| M2 | Mb | de-energize saat gas hadir | — | I (tambang) |




#### Tabel 99

| Gas Group (IEC) | Contoh gas | Group NEC 500 | MESG (mm) |

| --- | --- | --- | --- |

| IIA | Propana, metana (industri), bensin | Group D | > 0,90 |

| IIB | Etilen, etil eter | Group C | > 0,50 dan < 0,90 |

| IIC | Hidrogen, asetilen | Group A (asetilen), B (hidrogen) | ≤ 0,50 |




#### Tabel 100

| Dust Group (IEC) | Jenis debu | Group NEC 500 |

| --- | --- | --- |

| IIIA | Serat mudah terbakar (combustible flyings) | Group E/F/G (per jenis) |

| IIIB | Debu non-konduktif | Group G (mis. tepung, gula) |

| IIIC | Debu konduktif (mis. logam) | Group E (logam) |




#### Tabel 101

| T-Class | Suhu permukaan maks. | Ignition temp zat (harus di atas) |

| --- | --- | --- |

| T1 | 450 °C | > 450 °C |

| T2 | 300 °C | > 300 °C |

| T3 | 200 °C | > 200 °C |

| T4 | 135 °C | > 135 °C |

| T5 | 100 °C | > 100 °C |

| T6 | 85 °C | > 85 °C |




#### Tabel 102

| Standar | Cakupan |

| --- | --- |

| IEC/EN 60079-0 | Persyaratan umum peralatan (general requirements) & marking |

| IEC/EN 60079-1 | Flameproof enclosures 'd' |

| IEC/EN 60079-2 | Pressurized enclosures 'p' |

| IEC/EN 60079-5 | Powder filling 'q' |

| IEC/EN 60079-6 | Liquid immersion 'o' |

| IEC/EN 60079-7 | Increased safety 'e' |

| IEC/EN 60079-11 | Intrinsic safety 'i' |

| IEC/EN 60079-15 | Type of protection 'n' (nA/nC/nR) |

| IEC/EN 60079-18 | Encapsulation 'm' |

| IEC/EN 60079-25 | Intrinsically safe systems |

| IEC/EN 60079-26 | Peralatan EPL Ga (proteksi tingkat sangat tinggi) |

| IEC/EN 60079-28 | Proteksi peralatan optik/radiasi |

| IEC/EN 60079-10-1 | Klasifikasi area — atmosfer gas |

| IEC/EN 60079-10-2 | Klasifikasi area — atmosfer debu |

| IEC/EN 60079-14 | Desain, pemilihan & instalasi (electrical installations) |

| IEC/EN 60079-17 | Inspeksi & pemeliharaan (inspection & maintenance) |

| IEC/EN 60079-19 | Perbaikan, overhaul & rekondisi peralatan |

| IEC/EN 60079-31 | Proteksi debu dengan enclosure 't' |




#### Tabel 103

| Standar/Kode | Cakupan |

| --- | --- |

| NFPA 70 (NEC) Art. 500–504 | Sistem Class/Division & metode proteksi |

| NFPA 70 (NEC) Art. 505–506 | Sistem Zone untuk gas (505) dan debu (506) |

| CEC Section 18 & Annex J | Canadian Electrical Code — hazardous locations |

| NFPA 652 | Standar dasar Combustible Dust (Dust Hazard Analysis) |

| NFPA 654 | Debu partikulat mudah terbakar (kimia, farmasi) |

| NFPA 61 | Fasilitas pertanian & pengolahan pangan (grain) |

| NFPA 484 | Logam mudah terbakar |

| NFPA 499 | Klasifikasi area debu untuk instalasi listrik |

| UL 913 / UL 121201 | Intrinsic safety & peralatan Division 2 (AS) |




#### Tabel 104

| Regulasi/Standar | Cakupan |

| --- | --- |

| Directive 2014/34/EU (ATEX 114) | Peralatan & sistem proteksi untuk atmosfer eksplosif |

| Directive 1999/92/EC (ATEX 153) | Keselamatan & kesehatan pekerja (workplace) |

| DSEAR (UK) | Dangerous Substances and Explosive Atmospheres Regulations |

| EN 1127-1 | Pencegahan & proteksi ledakan — konsep dasar (13 sumber penyalaan) |

| IEC 60079-32-1 | Bahaya elektrostatik — panduan |

| ISO/IEC 80079-36 / -37 | Peralatan non-listrik (mekanik) untuk atmosfer eksplosif |

| IECEx OD 504 | Unit kompetensi personel (CoPC) |




#### Tabel 105

| Bagian EPD | Isi utama |

| --- | --- |

| 1. Identifikasi & ruang lingkup | Fasilitas, unit, batas kajian, tim penyusun, tanggal/revisi |

| 2. Zat mudah terbakar | Daftar gas/uap/debu, sifat (flash point, LEL/UEL, Tign, gas/dust group) |

| 3. Source of release & grade | Titik pelepasan, grade (continuous/primary/secondary) |

| 4. Ventilasi | Jenis (alami/paksa), tingkat, ketersediaan; pengaruh ke zona |

| 5. Klasifikasi area | Penetapan zona + area classification drawing (Lampiran D.1) |

| 6. Sumber penyalaan | Identifikasi 13 sumber (EN 1127-1) & penilaian efektivitasnya |

| 7. Penilaian risiko | Likelihood × Severity per skenario; risiko sisa |

| 8. Tindakan proteksi | Teknis (peralatan Ex, bonding, kontrol) & organisasi (izin kerja, pelatihan) |

| 9. Kesesuaian peralatan | Verifikasi EPL/kategori, gas group, T-class per zona |

| 10. Prosedur & kompetensi | Izin kerja panas, inspeksi (IEC 60079-17), kompetensi personel |

| 11. Koordinasi & MOC | Integrasi HAZOP, Management of Change, tinjauan berkala |

| 12. Kesimpulan & tindak lanjut | Pernyataan area aman dioperasikan; daftar aksi & PIC |




#### Tabel 106

| Posisi | Contoh | Makna |

| --- | --- | --- |

| Group peralatan | II | I = tambang; II = permukaan (gas); III = debu |

| Kategori (ATEX) | 2G | 1/2/3 + G(as)/D(ust); makin kecil angka makin ketat |

| Tanda Ex | Ex | Peralatan mengikuti standar proteksi Ex |

| Tipe proteksi | ib | d, e, p, m, i(a/b/c), n, o, q, t, dst. |

| Gas/dust group | IIC | IIA/IIB/IIC (gas); IIIA/IIIB/IIIC (debu) |

| Temperature class | T4 | T1–T6 (gas); suhu °C aktual (debu) |

| EPL | Gb | Ga/Gb/Gc, Da/Db/Dc, Ma/Mb |
