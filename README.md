# CDPK System Planner (v8.0 Cloud)
**Solution Sizing, RF Simulation & Commercial Suite — PT Citradata Purnakharisma**

Aplikasi perencanaan solusi terpadu **Dwi-Bahasa (ID 🇮🇩 & EN 🇬🇧)** untuk rekayasa sistem radio komunikasi **Motorola Solutions (MOTOTRBO DMR)**, antena **Avanti**, serta sistem keamanan video AI **Avigilon**, lengkap dengan sinkronisasi harga real-time dari **Google Drive / Google Sheets** dan **Multi-Model AI Copilot (Google Gemini 3.8 Flash & Gemini 3.8 Pro)**.

---

## Fitur Utama (v8.0 Cloud Edition)
1. **Dwi-Bahasa Instan (`ID` & `EN`)**: Seluruh antarmuka, deskripsi katalog, analisa teknis 8-aspek, dan ekspor dokumen (`PDF` & `Excel .xlsx`) mendukung Bahasa Indonesia dan Bahasa Inggris.
2. **Standarisasi Bank Knowledge Resmi**:
   - Repeater DMR 50W distandarisasi ke **`MOTOTRBO SLR 5300`** (menggantikan referensi lama `SLR 5500`).
   - Repeater In-Building DAS compact distandarisasi ke **`MOTOTRBO SLR 1000`** (menggantikan `CLR Series`).
   - Alokasi kuantitas Handy Talky (85%) dan Mobile Radio (15%) dihitung otomatis dari jumlah pengguna (`userCount`).
3. **System & Bundle Pricing Configurator (Parent-Child BOM)**:
   - Menghitung harga suatu sistem/perangkat lengkap yang terdiri dari beberapa sub-item (misal: **Sistem Repeater Outdoor SLR 5300** = Unit Repeater + Duplexer + Antena Omni Avanti + Kabel Coaxial 7/8" otomatis sesuai tinggi tower + Konektor N & Grounding + Lightning Arrester + Standing Rack 19" + Online UPS).
   - Mendukung **2 Mode Ekspor**: `Technical BoQ` (tanpa harga) dan `Commercial Quotation` (lengkap harga satuan, rincian sub-item, diskon, PPN 11%/12%, dan biaya jasa Mandays).
4. **Sinkronisasi Harga Real-Time via Google Drive (`drive citradata`)**:
   - **Folder Google Drive**: [`CDPK System Planner`](https://drive.google.com/drive/folders/1OB_UaNyd65Ccb3lmdwJuw5raufCwhgbS) (`1OB_UaNyd65Ccb3lmdwJuw5raufCwhgbS`)
   - **Master Pricelist Spreadsheet**: [`Master Pricelist`](https://docs.google.com/spreadsheets/d/1Kp85v81JXeRC5ti-ZXYBChgrj2ztnnwrCHokI02LX6U/edit) (`1Kp85v81JXeRC5ti-ZXYBChgrj2ztnnwrCHokI02LX6U`) dengan 4 tab terstruktur (`Products_Catalog`, `System_Bundles`, `Industry_RF_Params`, `Commercial_Config`).
5. **Multi-Model AI Copilot**:
   - **`Google Gemini 3.8 Flash`** (`gemini-3.8-flash`): Kalkulasi cepat sizing, ekstraksi parameter dari bahasa alami, dan optimasi BoQ.
   - **`Google Gemini 3.8 Pro`** (`gemini-3.8-pro`): Analisa arsitektur RF mendalam, mitigasi risiko, dan penyusunan narasi proposal eksekutif.

---

## Cara Menjalankan Secara Lokal
```bash
python3 app.py
```
Buka di browser: **`http://localhost:7860`**

## Deployment Cloud (Render + GitHub Actions)
Repository ini dilengkapi [`Dockerfile`](Dockerfile), [`render.yaml`](render.yaml), dan [`.github/workflows/keep_alive.yml`](.github/workflows/keep_alive.yml) untuk auto-deploy setiap `git push origin main`.
