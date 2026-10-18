/**
 * CDPK System Planner — 2D Indoor Floor Plan Heatmap & Camera FoV Simulator Engine
 * PT Citradata Purnakharisma (CDPK) — Proprietary Engineering Module
 * Version: 8.6.0
 *
 * Capabilities:
 * 1. Architectural Floor Plan Rendering (Pan, Zoom, Grid Snap, Real-World Calibration in PPM).
 * 2. RFoF DAS FMTCS Indoor Antenna Placer & RSSI Heatmap (Log-Distance Indoor Path Loss Model).
 * 3. Video Security CCTV Camera Placer & DORI Forensic Coverage Cones (EN 62676-4 Standard).
 * 4. Interactive Drag-and-Drop, Rotation Handles, and Real-Time Signal Probing.
 * 5. Two-Way Sync to RFoF DAS Multi-Floor Table & CCTV Sizing Fleet.
 * 6. High-Resolution PNG & Proposal Visual Export.
 */

(function () {
    'use strict';

    const FLOORPLAN_ENGINE = {
        version: '8.6.0',

        // Default path loss and frequency settings
        DEFAULT_FREQ_MHZ: 450.0,
        DEFAULT_EIRP_DBM: 13.0,       // Typical output from FMTCS ORU + indoor ceiling antenna
        DEFAULT_PATH_LOSS_EXP: 2.8,    // 2.6 - 3.0 for commercial office buildings with soft partitions
        DEFAULT_INDOOR_WALL_LOSS: 8.0, // Additional indoor partition absorption in dB
        DEFAULT_PPM: 40.0,            // Default 40 pixels = 1 meter

        // Sensor widths in mm
        SENSOR_WIDTHS: {
            '1/2.8': 5.18,
            '1_2_8': 5.18,
            '1/2.7': 5.37,
            '1_2_7': 5.37,
            '1/1.8': 7.18,
            '1_1_8': 7.18,
            '1/2': 6.40,
            '1_2': 6.40,
            '1/3': 4.80,
            '1_3': 4.80,
            'default': 5.18
        },

        // Horizontal resolutions in pixels
        RESOLUTION_PIXELS: {
            '1080p': 1920,
            '2MP': 1920,
            '4MP': 2560,
            '5MP': 2592,
            '4K': 3840,
            '8MP': 3840,
            '12MP': 4000,
            'default': 2560
        },

        // DORI Standard PPM thresholds (EN 62676-4)
        DORI_THRESHOLDS: {
            identification: 250, // PPM >= 250 (Recognize beyond doubt / facial forensics)
            recognition: 125,    // PPM >= 125 (Recognize known individual / vehicle model)
            observation: 62,     // PPM >= 62  (Observe individual details / clothing)
            detection: 25        // PPM >= 25  (Detect human presence or movement)
        },

        // DORI Color Definitions
        DORI_COLORS: {
            identification: { fill: 'rgba(239, 68, 68, 0.35)', stroke: 'rgba(220, 38, 38, 0.9)', name: 'Identifikasi (≥250 PPM)' },
            recognition:    { fill: 'rgba(245, 158, 11, 0.28)', stroke: 'rgba(217, 119, 6, 0.9)', name: 'Pengenalan (≥125 PPM)' },
            observation:    { fill: 'rgba(6, 182, 212, 0.22)', stroke: 'rgba(8, 145, 178, 0.85)', name: 'Observasi (≥62 PPM)' },
            detection:      { fill: 'rgba(59, 130, 246, 0.15)', stroke: 'rgba(37, 99, 235, 0.8)', name: 'Deteksi (≥25 PPM)' }
        },

        // Sample architectural floor plans (Procedural blueprint for instant test)
        createDefaultFloorPlanDataUrl(width = 1200, height = 800) {
            const c = document.createElement('canvas');
            c.width = width;
            c.height = height;
            const ctx = c.getContext('2d');

            // Background floor - clean modern architectural grid
            ctx.fillStyle = '#f8fafc';
            ctx.fillRect(0, 0, width, height);

            // Subtle construction grid
            ctx.strokeStyle = '#e2e8f0';
            ctx.lineWidth = 1;
            const gridSize = 40; // 1 meter per grid box
            for (let x = 0; x <= width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }
            for (let y = 0; y <= height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }

            // Outer building walls
            ctx.strokeStyle = '#1e293b';
            ctx.lineWidth = 8;
            ctx.strokeRect(40, 40, width - 80, height - 80);

            // Interior rooms & partitions
            ctx.strokeStyle = '#475569';
            ctx.lineWidth = 4;

            // Main Corridor (horizontal, center)
            const corrTop = height * 0.44;
            const corrBottom = height * 0.56;
            ctx.beginPath();
            ctx.moveTo(40, corrTop);
            ctx.lineTo(width - 40, corrTop);
            ctx.moveTo(40, corrBottom);
            ctx.lineTo(width - 40, corrBottom);
            ctx.stroke();

            // North Wing Dividers
            const northW = (width - 80) / 4;
            for (let i = 1; i < 4; i++) {
                ctx.beginPath();
                ctx.moveTo(40 + i * northW, 40);
                ctx.lineTo(40 + i * northW, corrTop);
                ctx.stroke();
            }

            // South Wing Dividers
            const southW = (width - 80) / 3;
            for (let i = 1; i < 3; i++) {
                ctx.beginPath();
                ctx.moveTo(40 + i * southW, corrBottom);
                ctx.lineTo(40 + i * southW, height - 40);
                ctx.stroke();
            }

            // Doors / Openings
            ctx.strokeStyle = '#0284c7';
            ctx.lineWidth = 3;
            // North wing doors
            for (let i = 0; i < 4; i++) {
                const doorX = 40 + i * northW + northW * 0.5;
                ctx.beginPath();
                ctx.arc(doorX, corrTop, 16, 0, Math.PI, false);
                ctx.stroke();
            }
            // South wing doors
            for (let i = 0; i < 3; i++) {
                const doorX = 40 + i * southW + southW * 0.5;
                ctx.beginPath();
                ctx.arc(doorX, corrBottom, 16, Math.PI, 0, false);
                ctx.stroke();
            }

            // Room labels with dimensions
            ctx.font = 'bold 13px Inter, system-ui, sans-serif';
            ctx.fillStyle = '#334155';
            ctx.textAlign = 'center';

            ctx.fillText('Ruang Server & Control Room', 40 + northW * 0.5, 40 + (corrTop - 40) * 0.45);
            ctx.font = '10px Inter, system-ui, sans-serif';
            ctx.fillStyle = '#64748b';
            ctx.fillText('(7.0m × 7.5m)', 40 + northW * 0.5, 40 + (corrTop - 40) * 0.45 + 16);

            ctx.font = 'bold 13px Inter, system-ui, sans-serif';
            ctx.fillStyle = '#334155';
            ctx.fillText('Meeting Room VIP', 40 + northW * 1.5, 40 + (corrTop - 40) * 0.45);
            ctx.font = '10px Inter, system-ui, sans-serif';
            ctx.fillStyle = '#64748b';
            ctx.fillText('(7.0m × 7.5m)', 40 + northW * 1.5, 40 + (corrTop - 40) * 0.45 + 16);

            ctx.font = 'bold 13px Inter, system-ui, sans-serif';
            ctx.fillStyle = '#334155';
            ctx.fillText('Open Space Engineering', 40 + northW * 2.5, 40 + (corrTop - 40) * 0.45);
            ctx.font = '10px Inter, system-ui, sans-serif';
            ctx.fillStyle = '#64748b';
            ctx.fillText('(7.0m × 7.5m)', 40 + northW * 2.5, 40 + (corrTop - 40) * 0.45 + 16);

            ctx.font = 'bold 13px Inter, system-ui, sans-serif';
            ctx.fillStyle = '#334155';
            ctx.fillText('Executive Management', 40 + northW * 3.5, 40 + (corrTop - 40) * 0.45);
            ctx.font = '10px Inter, system-ui, sans-serif';
            ctx.fillStyle = '#64748b';
            ctx.fillText('(7.0m × 7.5m)', 40 + northW * 3.5, 40 + (corrTop - 40) * 0.45 + 16);

            ctx.font = 'bold 12px Inter, system-ui, sans-serif';
            ctx.fillStyle = '#0284c7';
            ctx.fillText('🏢 Koridor Utama & Akses Evakuasi (28.0m × 2.4m)', width * 0.5, (corrTop + corrBottom) * 0.5 + 4);

            ctx.font = 'bold 13px Inter, system-ui, sans-serif';
            ctx.fillStyle = '#334155';
            ctx.fillText('Warehouse Logistik & Suku Cadang', 40 + southW * 0.5, corrBottom + (height - 40 - corrBottom) * 0.45);
            ctx.font = '10px Inter, system-ui, sans-serif';
            ctx.fillStyle = '#64748b';
            ctx.fillText('(9.3m × 8.8m)', 40 + southW * 0.5, corrBottom + (height - 40 - corrBottom) * 0.45 + 16);

            ctx.font = 'bold 13px Inter, system-ui, sans-serif';
            ctx.fillStyle = '#334155';
            ctx.fillText('Workshop Teknis & Kalibrasi', 40 + southW * 1.5, corrBottom + (height - 40 - corrBottom) * 0.45);
            ctx.font = '10px Inter, system-ui, sans-serif';
            ctx.fillStyle = '#64748b';
            ctx.fillText('(9.3m × 8.8m)', 40 + southW * 1.5, corrBottom + (height - 40 - corrBottom) * 0.45 + 16);

            ctx.font = 'bold 13px Inter, system-ui, sans-serif';
            ctx.fillStyle = '#334155';
            ctx.fillText('Loading Dock & Main Gate', 40 + southW * 2.5, corrBottom + (height - 40 - corrBottom) * 0.45);
            ctx.font = '10px Inter, system-ui, sans-serif';
            ctx.fillStyle = '#64748b';
            ctx.fillText('(9.3m × 8.8m)', 40 + southW * 2.5, corrBottom + (height - 40 - corrBottom) * 0.45 + 16);

            // Scale reference bar in blueprint
            ctx.fillStyle = '#0284c7';
            ctx.fillRect(60, height - 60, 200, 5);
            ctx.fillStyle = '#0f172a';
            ctx.font = 'bold 11px monospace';
            ctx.textAlign = 'left';
            ctx.fillText('Skala Referensi Denah: 5.0 Meter (200 px = 40 px/m)', 60, height - 70);

            // Compass rose
            ctx.fillStyle = '#0f172a';
            ctx.beginPath();
            ctx.moveTo(width - 70, 70);
            ctx.lineTo(width - 64, 90);
            ctx.lineTo(width - 70, 85);
            ctx.lineTo(width - 76, 90);
            ctx.closePath();
            ctx.fill();
            ctx.font = 'bold 11px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('U', width - 70, 65);

            return c.toDataURL('image/png');
        },

        // Calculate HFoV in degrees from focal length and sensor size
        calcHFoVDegrees(focalMm, sensorFormat = '1/2.8') {
            const key = String(sensorFormat).replace('/', '_');
            const w_s = this.SENSOR_WIDTHS[key] || this.SENSOR_WIDTHS[sensorFormat] || this.SENSOR_WIDTHS.default;
            const f = Math.max(1.0, Number(focalMm) || 4.0);
            const rad = 2 * Math.atan(w_s / (2 * f));
            return Math.round((rad * 180 / Math.PI) * 10) / 10;
        },

        // Calculate DORI maximum distance in meters (EN 62676-4)
        calcDoriDistances(focalMm, sensorFormat = '1/2.8', resolution = '4MP') {
            const key = String(sensorFormat).replace('/', '_');
            const w_s = this.SENSOR_WIDTHS[key] || this.SENSOR_WIDTHS[sensorFormat] || this.SENSOR_WIDTHS.default;
            const f = Math.max(1.0, Number(focalMm) || 4.0);
            const W_pixel = this.RESOLUTION_PIXELS[resolution] || this.RESOLUTION_PIXELS.default;

            const res = {};
            for (const [zone, ppm] of Object.entries(this.DORI_THRESHOLDS)) {
                // d = (W_pixel * f) / (PPM * w_s)
                const d = (W_pixel * f) / (ppm * w_s);
                res[zone] = Math.round(d * 10) / 10;
            }
            return res;
        },

        // Calculate RF signal RSSI at distance d (meters) with indoor absorption
        calcRssiAtDistance(d_m, eirpDbm = 13.0, nExp = 2.8, freqMhz = 450.0, wallLossDb = 8.0) {
            const d = Math.max(0.5, Number(d_m) || 1.0);
            // Free space path loss at 1 meter: FSPL(1m) = 20*log10(450) - 27.55 ≈ 25.5 dB
            const fspl_1m = 20 * Math.log10(freqMhz) - 27.55;
            // Indoor attenuation: log-distance + soft partition attenuation factor
            const pathLoss = fspl_1m + 10 * nExp * Math.log10(d) + (d > 5.0 ? wallLossDb : 0);
            const rssi = eirpDbm - pathLoss;
            return Math.round(rssi * 10) / 10;
        },

        // Calculate coverage radii for DAS signal thresholds (in meters)
        calcDasCoverageRadii(eirpDbm = 13.0, nExp = 2.8, freqMhz = 450.0, wallLossDb = 8.0) {
            const fspl_1m = 20 * Math.log10(freqMhz) - 27.55;

            const calcDistForRssi = (targetRssi) => {
                // targetRssi = EIRP - (fspl_1m + 10 * n * log10(d) + wallLossDb)
                const exponent = (eirpDbm - fspl_1m - wallLossDb - targetRssi) / (10 * nExp);
                return Math.max(1.0, Math.round(Math.pow(10, exponent) * 10) / 10);
            };

            return {
                excellentM: calcDistForRssi(-75.0),  // >= -75 dBm (Strong Green)
                acceptableM: calcDistForRssi(-85.0), // >= -85 dBm (SAT Pass Standard Yellow)
                weakM: calcDistForRssi(-95.0)        // >= -95 dBm (Minimum voice, edge of coverage)
            };
        }
    };

    /**
     * Interactive Canvas Controller Class
     */
    class CDPKFloorPlanViewer {
        constructor(canvasEl, stateRef, updateCallback) {
            this.canvas = canvasEl;
            this.ctx = canvasEl.getContext('2d');
            this.state = stateRef; // Reactive state from Alpine
            this.onUpdate = updateCallback || function () {};

            this.bgImage = null;
            this.viewTransform = { scale: 1.0, offsetX: 0, offsetY: 0 };
            this.isDragging = false;
            this.isRotating = false;
            this.dragStart = { x: 0, y: 0 };
            this.dragItem = null;
            this.calibPointA = null;
            this.calibPointB = null;
            this.mouseWorld = { x: 0, y: 0 };
            this.hoveredItem = null;

            this._animFrameId = null;
            this.initEvents();
            this.loadInitialImage();
        }

        initEvents() {
            const el = this.canvas;

            el.addEventListener('mousedown', (e) => this.handleMouseDown(e));
            window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
            window.addEventListener('mouseup', (e) => this.handleMouseUp(e));
            el.addEventListener('wheel', (e) => this.handleWheel(e), { passive: false });

            // Touch events for tablet / mobile support
            el.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: false });
            window.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
            window.addEventListener('touchend', (e) => this.handleTouchEnd(e));

            // Drag and drop image upload onto canvas
            el.addEventListener('dragover', (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; });
            el.addEventListener('drop', (e) => this.handleFileDrop(e));

            // Prevent standard right click context menu on canvas
            el.addEventListener('contextmenu', (e) => e.preventDefault());
        }

        loadInitialImage(dataUrl) {
            const img = new Image();
            img.onload = () => {
                this.bgImage = img;
                this.fitToScreen();
                this.requestRender();
            };
            img.src = dataUrl || FLOORPLAN_ENGINE.createDefaultFloorPlanDataUrl(1200, 800);
        }

        setImageFromDataUrl(dataUrl) {
            const img = new Image();
            img.onload = () => {
                this.bgImage = img;
                this.fitToScreen();
                this.requestRender();
            };
            img.src = dataUrl;
        }

        fitToScreen() {
            if (!this.bgImage || !this.canvas) return;
            const cw = this.canvas.width;
            const ch = this.canvas.height;
            const iw = this.bgImage.width;
            const ih = this.bgImage.height;

            const scaleX = (cw - 40) / iw;
            const scaleY = (ch - 40) / ih;
            const fitScale = Math.min(scaleX, scaleY, 1.2);

            this.viewTransform.scale = Math.max(0.3, fitScale);
            this.viewTransform.offsetX = (cw - iw * this.viewTransform.scale) / 2;
            this.viewTransform.offsetY = (ch - ih * this.viewTransform.scale) / 2;
        }

        screenToWorld(sx, sy) {
            return {
                x: (sx - this.viewTransform.offsetX) / this.viewTransform.scale,
                y: (sy - this.viewTransform.offsetY) / this.viewTransform.scale
            };
        }

        worldToScreen(wx, wy) {
            return {
                x: wx * this.viewTransform.scale + this.viewTransform.offsetX,
                y: wy * this.viewTransform.scale + this.viewTransform.offsetY
            };
        }

        getCanvasPos(e) {
            const rect = this.canvas.getBoundingClientRect();
            return {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        }

        handleMouseDown(e) {
            const pos = this.getCanvasPos(e);
            this.mouseWorld = this.screenToWorld(pos.x, pos.y);
            const tool = this.state.activeTool;

            // Right-click or Middle-click: always pan
            if (e.button === 1 || e.button === 2) {
                this.isDragging = true;
                this.dragItem = { type: 'pan' };
                this.dragStart = { x: pos.x, y: pos.y };
                return;
            }

            if (tool === 'calibrate') {
                if (!this.calibPointA) {
                    this.calibPointA = { x: this.mouseWorld.x, y: this.mouseWorld.y };
                    this.onUpdate({ calibStatus: 'Titik A ditentukan. Klik Titik B.' });
                } else {
                    this.calibPointB = { x: this.mouseWorld.x, y: this.mouseWorld.y };
                    const pxDist = Math.hypot(this.calibPointB.x - this.calibPointA.x, this.calibPointB.y - this.calibPointA.y);
                    if (pxDist < 5) {
                        this.calibPointA = null;
                        this.calibPointB = null;
                        return;
                    }
                    this.state.calibrating = true;
                    this.state.calibPixelDist = Math.round(pxDist * 10) / 10;
                    this.onUpdate({ calibReady: true, pxDist });
                }
                this.requestRender();
                return;
            }

            if (tool === 'antenna') {
                const newAnt = {
                    id: 'ANT-' + String(this.state.antennas.length + 1).padStart(2, '0'),
                    x: Math.round(this.mouseWorld.x),
                    y: Math.round(this.mouseWorld.y),
                    label: 'Antena DAS Lantai ' + (this.state.antennas.length + 1),
                    model: 'ANTI400R.M (FMTCS Ceiling Omni 3dBi)',
                    eirpDbm: 13.0,
                    freqMhz: 450.0,
                    nExp: 2.8,
                    floor: this.state.floorName || 'Lantai 1'
                };
                this.state.antennas.push(newAnt);
                this.state.selectedItemId = newAnt.id;
                this.state.selectedItemType = 'antenna';
                this.state.activeTool = 'select';
                this.onUpdate({ added: 'antenna', item: newAnt });
                this.requestRender();
                return;
            }

            if (tool === 'camera') {
                const newCam = {
                    id: 'CAM-' + String(this.state.cameras.length + 1).padStart(2, '0'),
                    x: Math.round(this.mouseWorld.x),
                    y: Math.round(this.mouseWorld.y),
                    label: 'Kamera CCTV ' + (this.state.cameras.length + 1),
                    model: 'Sarix Professional 4 Dome 4MP IR',
                    brand: 'pelco',
                    resolution: '4MP',
                    sensorFormat: '1/2.8',
                    focalMm: 4.0,
                    rotationDeg: 45,
                    mountingHeightM: 2.8,
                    floor: this.state.floorName || 'Lantai 1'
                };
                this.state.cameras.push(newCam);
                this.state.selectedItemId = newCam.id;
                this.state.selectedItemType = 'camera';
                this.state.activeTool = 'select';
                this.onUpdate({ added: 'camera', item: newCam });
                this.requestRender();
                return;
            }

            // Hit testing for select / move / rotate
            const hit = this.hitTest(this.mouseWorld.x, this.mouseWorld.y);
            if (hit) {
                if (hit.isRotationHandle) {
                    this.isRotating = true;
                    this.dragItem = hit.item;
                } else {
                    this.isDragging = true;
                    this.dragItem = hit.item;
                    this.state.selectedItemId = hit.item.id;
                    this.state.selectedItemType = hit.type;
                    this.dragStart = { x: this.mouseWorld.x - hit.item.x, y: this.mouseWorld.y - hit.item.y };
                }
                this.onUpdate({ selected: hit.item, type: hit.type });
                this.requestRender();
            } else {
                if (tool === 'pan') {
                    this.isDragging = true;
                    this.dragItem = { type: 'pan' };
                    this.dragStart = { x: pos.x, y: pos.y };
                } else {
                    this.state.selectedItemId = null;
                    this.state.selectedItemType = null;
                    this.onUpdate({ selected: null });
                    this.requestRender();
                }
            }
        }

        handleMouseMove(e) {
            const pos = this.getCanvasPos(e);
            this.mouseWorld = this.screenToWorld(pos.x, pos.y);

            // Compute Probe Info (live RSSI under cursor)
            if (this.state.showProbe && this.state.antennas.length > 0) {
                let maxRssi = -120;
                let nearestDist = 999;
                let bestAnt = null;
                const ppm = this.state.scalePpm || 40.0;

                for (const ant of this.state.antennas) {
                    const distPx = Math.hypot(this.mouseWorld.x - ant.x, this.mouseWorld.y - ant.y);
                    const distM = distPx / ppm;
                    const rssi = FLOORPLAN_ENGINE.calcRssiAtDistance(distM, ant.eirpDbm, ant.nExp, ant.freqMhz);
                    if (rssi > maxRssi) {
                        maxRssi = rssi;
                        nearestDist = Math.round(distM * 10) / 10;
                        bestAnt = ant;
                    }
                }

                let statusText = 'Lemah / Deadzone';
                let statusBadge = 'bg-rose-500/80';
                if (maxRssi >= -75.0) {
                    statusText = 'Sangat Kuat (Pass)';
                    statusBadge = 'bg-emerald-500/80';
                } else if (maxRssi >= -85.0) {
                    statusText = 'Standar SAT (Pass)';
                    statusBadge = 'bg-amber-500/80';
                } else if (maxRssi >= -95.0) {
                    statusText = 'Batas Sinyal (Marginal)';
                    statusBadge = 'bg-orange-500/80';
                }

                this.state.probeInfo = {
                    rssi: maxRssi,
                    distM: nearestDist,
                    antId: bestAnt ? bestAnt.id : '',
                    statusText,
                    statusBadge,
                    screenX: pos.x,
                    screenY: pos.y
                };
            } else {
                this.state.probeInfo = null;
            }

            if (this.isRotating && this.dragItem) {
                const dx = this.mouseWorld.x - this.dragItem.x;
                const dy = this.mouseWorld.y - this.dragItem.y;
                let deg = Math.round(Math.atan2(dy, dx) * 180 / Math.PI);
                if (deg < 0) deg += 360;
                this.dragItem.rotationDeg = deg;
                this.requestRender();
                return;
            }

            if (this.isDragging) {
                if (this.dragItem && this.dragItem.type === 'pan') {
                    const dx = pos.x - this.dragStart.x;
                    const dy = pos.y - this.dragStart.y;
                    this.viewTransform.offsetX += dx;
                    this.viewTransform.offsetY += dy;
                    this.dragStart = { x: pos.x, y: pos.y };
                    this.requestRender();
                } else if (this.dragItem) {
                    this.dragItem.x = Math.round(this.mouseWorld.x - this.dragStart.x);
                    this.dragItem.y = Math.round(this.mouseWorld.y - this.dragStart.y);
                    this.requestRender();
                }
            } else {
                // Change cursor dynamically based on hover
                const hit = this.hitTest(this.mouseWorld.x, this.mouseWorld.y);
                if (hit) {
                    this.canvas.style.cursor = hit.isRotationHandle ? 'crosshair' : 'move';
                } else if (this.state.activeTool === 'calibrate') {
                    this.canvas.style.cursor = 'crosshair';
                } else if (this.state.activeTool === 'pan') {
                    this.canvas.style.cursor = 'grab';
                } else {
                    this.canvas.style.cursor = 'default';
                }
            }
        }

        handleMouseUp() {
            if (this.isDragging || this.isRotating) {
                this.isDragging = false;
                this.isRotating = false;
                this.dragItem = null;
                this.onUpdate({ changed: true });
                this.requestRender();
            }
        }

        handleWheel(e) {
            e.preventDefault();
            const pos = this.getCanvasPos(e);
            const zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;
            const curScale = this.viewTransform.scale;
            const newScale = Math.min(4.0, Math.max(0.2, curScale * zoomFactor));

            if (newScale !== curScale) {
                this.viewTransform.offsetX = pos.x - (pos.x - this.viewTransform.offsetX) * (newScale / curScale);
                this.viewTransform.offsetY = pos.y - (pos.y - this.viewTransform.offsetY) * (newScale / curScale);
                this.viewTransform.scale = newScale;
                this.requestRender();
            }
        }

        handleTouchStart(e) {
            if (e.touches.length === 1) {
                const t = e.touches[0];
                this.handleMouseDown({ clientX: t.clientX, clientY: t.clientY, button: 0 });
            }
        }

        handleTouchMove(e) {
            if (e.touches.length === 1) {
                const t = e.touches[0];
                this.handleMouseMove({ clientX: t.clientX, clientY: t.clientY });
            }
        }

        handleTouchEnd() {
            this.handleMouseUp();
        }

        handleFileDrop(e) {
            e.preventDefault();
            if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
                const file = e.dataTransfer.files[0];
                if (file.type.match(/^image\//)) {
                    const reader = new FileReader();
                    reader.onload = (evt) => {
                        this.setImageFromDataUrl(evt.target.result);
                        this.onUpdate({ message: 'Denah arsitektur berhasil dimuat dari file lokal!' });
                    };
                    reader.readAsDataURL(file);
                }
            }
        }

        hitTest(wx, wy) {
            const ppm = this.state.scalePpm || 40.0;

            // 1. Check selected camera rotation handle first
            if (this.state.selectedItemId && this.state.selectedItemType === 'camera') {
                const cam = this.state.cameras.find(c => c.id === this.state.selectedItemId);
                if (cam) {
                    const rad = (cam.rotationDeg || 0) * Math.PI / 180;
                    const handleDist = 45; // Handle radius in world pixels
                    const hx = cam.x + Math.cos(rad) * handleDist;
                    const hy = cam.y + Math.sin(rad) * handleDist;
                    if (Math.hypot(wx - hx, wy - hy) <= 12) {
                        return { type: 'camera', item: cam, isRotationHandle: true };
                    }
                }
            }

            // 2. Check Cameras
            for (let i = this.state.cameras.length - 1; i >= 0; i--) {
                const cam = this.state.cameras[i];
                if (Math.hypot(wx - cam.x, wy - cam.y) <= 18) {
                    return { type: 'camera', item: cam, isRotationHandle: false };
                }
            }

            // 3. Check Antennas
            for (let i = this.state.antennas.length - 1; i >= 0; i--) {
                const ant = this.state.antennas[i];
                if (Math.hypot(wx - ant.x, wy - ant.y) <= 18) {
                    return { type: 'antenna', item: ant, isRotationHandle: false };
                }
            }

            return null;
        }

        requestRender() {
            if (this._animFrameId) cancelAnimationFrame(this._animFrameId);
            this._animFrameId = requestAnimationFrame(() => this.render());
        }

        render() {
            const ctx = this.ctx;
            const w = this.canvas.width;
            const h = this.canvas.height;
            const ppm = this.state.scalePpm || 40.0;

            ctx.clearRect(0, 0, w, h);

            // Dark architectural backdrop
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(0, 0, w, h);

            ctx.save();
            ctx.translate(this.viewTransform.offsetX, this.viewTransform.offsetY);
            ctx.scale(this.viewTransform.scale, this.viewTransform.scale);

            // 1. Draw floor plan image
            if (this.bgImage) {
                ctx.drawImage(this.bgImage, 0, 0);
            }

            // 2. Draw DAS RF Heatmap
            if (this.state.showDasHeatmap && this.state.antennas.length > 0) {
                this.renderDasHeatmaps(ctx, ppm);
            }

            // 3. Draw CCTV DORI Cones
            if (this.state.showCctvDori && this.state.cameras.length > 0) {
                this.renderCctvDoriCones(ctx, ppm);
            }

            // 4. Draw Antennas
            this.renderAntennas(ctx);

            // 5. Draw Cameras
            this.renderCameras(ctx);

            // 6. Draw Calibration Line if active
            this.renderCalibrationLine(ctx);

            ctx.restore();

            // 7. Overlay HUD: Scale Bar & Watermark
            this.renderHud(ctx, w, h, ppm);
        }

        renderDasHeatmaps(ctx, ppm) {
            for (const ant of this.state.antennas) {
                const radii = FLOORPLAN_ENGINE.calcDasCoverageRadii(ant.eirpDbm, ant.nExp, ant.freqMhz);
                const rExcPx = radii.excellentM * ppm;
                const rAccPx = radii.acceptableM * ppm;
                const rWeakPx = radii.weakM * ppm;

                // Radial gradient heatmap overlay
                const grad = ctx.createRadialGradient(ant.x, ant.y, 0, ant.x, ant.y, rWeakPx);
                grad.addColorStop(0, 'rgba(16, 185, 129, 0.40)');     // >= -75 dBm Center
                grad.addColorStop(rExcPx / rWeakPx, 'rgba(16, 185, 129, 0.28)');
                grad.addColorStop(rAccPx / rWeakPx, 'rgba(245, 158, 11, 0.18)'); // -85 dBm SAT pass
                grad.addColorStop(1, 'rgba(239, 68, 68, 0.0)');        // Edge falloff

                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(ant.x, ant.y, rWeakPx, 0, Math.PI * 2);
                ctx.fill();

                // SAT Pass boundary ring (-85 dBm)
                ctx.strokeStyle = 'rgba(245, 158, 11, 0.7)';
                ctx.lineWidth = 1.5;
                ctx.setLineDash([4, 4]);
                ctx.beginPath();
                ctx.arc(ant.x, ant.y, rAccPx, 0, Math.PI * 2);
                ctx.stroke();
                ctx.setLineDash([]);

                // Excellent boundary ring (-75 dBm)
                ctx.strokeStyle = 'rgba(16, 185, 129, 0.85)';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.arc(ant.x, ant.y, rExcPx, 0, Math.PI * 2);
                ctx.stroke();
            }
        }

        renderCctvDoriCones(ctx, ppm) {
            for (const cam of this.state.cameras) {
                const hfovDeg = FLOORPLAN_ENGINE.calcHFoVDegrees(cam.focalMm, cam.sensorFormat);
                const doriM = FLOORPLAN_ENGINE.calcDoriDistances(cam.focalMm, cam.sensorFormat, cam.resolution);

                const centerRad = (cam.rotationDeg || 0) * Math.PI / 180;
                const halfAngleRad = (hfovDeg / 2) * Math.PI / 180;
                const startAngle = centerRad - halfAngleRad;
                const endAngle = centerRad + halfAngleRad;

                const zones = [
                    { key: 'detection', distPx: doriM.detection * ppm, color: FLOORPLAN_ENGINE.DORI_COLORS.detection },
                    { key: 'observation', distPx: doriM.observation * ppm, color: FLOORPLAN_ENGINE.DORI_COLORS.observation },
                    { key: 'recognition', distPx: doriM.recognition * ppm, color: FLOORPLAN_ENGINE.DORI_COLORS.recognition },
                    { key: 'identification', distPx: doriM.identification * ppm, color: FLOORPLAN_ENGINE.DORI_COLORS.identification }
                ];

                // Draw from largest (Detection) to smallest (Identification)
                for (const z of zones) {
                    ctx.fillStyle = z.color.fill;
                    ctx.strokeStyle = z.color.stroke;
                    ctx.lineWidth = 1.5;

                    ctx.beginPath();
                    ctx.moveTo(cam.x, cam.y);
                    ctx.arc(cam.x, cam.y, z.distPx, startAngle, endAngle, false);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                }

                // Center view line
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
                ctx.lineWidth = 1;
                ctx.setLineDash([2, 2]);
                ctx.beginPath();
                ctx.moveTo(cam.x, cam.y);
                ctx.lineTo(cam.x + Math.cos(centerRad) * (zones[0].distPx), cam.y + Math.sin(centerRad) * (zones[0].distPx));
                ctx.stroke();
                ctx.setLineDash([]);
            }
        }

        renderAntennas(ctx) {
            for (const ant of this.state.antennas) {
                const isSelected = this.state.selectedItemId === ant.id;

                // Selection pulse ring
                if (isSelected) {
                    ctx.strokeStyle = '#38bdf8';
                    ctx.lineWidth = 3;
                    ctx.beginPath();
                    ctx.arc(ant.x, ant.y, 22, 0, Math.PI * 2);
                    ctx.stroke();
                }

                // Antenna Base Circle
                ctx.fillStyle = '#4f46e5'; // Indigo
                ctx.beginPath();
                ctx.arc(ant.x, ant.y, 14, 0, Math.PI * 2);
                ctx.fill();

                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 2;
                ctx.stroke();

                // Antenna Emitter waves icon
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.arc(ant.x, ant.y, 7, -Math.PI * 0.75, -Math.PI * 0.25);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(ant.x, ant.y, 10, -Math.PI * 0.75, -Math.PI * 0.25);
                ctx.stroke();

                // Label pill badge
                ctx.font = 'bold 11px Inter, system-ui, sans-serif';
                const text = ant.id;
                const textWidth = ctx.measureText(text).width;

                ctx.fillStyle = isSelected ? '#1e1b4b' : 'rgba(15, 23, 42, 0.85)';
                ctx.beginPath();
                ctx.roundRect(ant.x - textWidth / 2 - 6, ant.y + 16, textWidth + 12, 16, 4);
                ctx.fill();

                ctx.fillStyle = '#ffffff';
                ctx.textAlign = 'center';
                ctx.fillText(text, ant.x, ant.y + 28);
            }
        }

        renderCameras(ctx) {
            for (const cam of this.state.cameras) {
                const isSelected = this.state.selectedItemId === cam.id;
                const rad = (cam.rotationDeg || 0) * Math.PI / 180;

                // Selection pulse ring
                if (isSelected) {
                    ctx.strokeStyle = '#10b981'; // Emerald
                    ctx.lineWidth = 3;
                    ctx.beginPath();
                    ctx.arc(cam.x, cam.y, 22, 0, Math.PI * 2);
                    ctx.stroke();

                    // Rotation Handle
                    const handleDist = 45;
                    const hx = cam.x + Math.cos(rad) * handleDist;
                    const hy = cam.y + Math.sin(rad) * handleDist;

                    ctx.strokeStyle = '#f59e0b';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(cam.x, cam.y);
                    ctx.lineTo(hx, hy);
                    ctx.stroke();

                    ctx.fillStyle = '#f59e0b';
                    ctx.beginPath();
                    ctx.arc(hx, hy, 7, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.strokeStyle = '#ffffff';
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }

                // Camera Body
                ctx.fillStyle = '#059669'; // Teal/Emerald
                ctx.beginPath();
                ctx.arc(cam.x, cam.y, 14, 0, Math.PI * 2);
                ctx.fill();

                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 2;
                ctx.stroke();

                // Camera lens pointer wedge
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.moveTo(cam.x + Math.cos(rad) * 16, cam.y + Math.sin(rad) * 16);
                ctx.lineTo(cam.x + Math.cos(rad + 2.5) * 8, cam.y + Math.sin(rad + 2.5) * 8);
                ctx.lineTo(cam.x + Math.cos(rad - 2.5) * 8, cam.y + Math.sin(rad - 2.5) * 8);
                ctx.closePath();
                ctx.fill();

                // Label pill badge
                ctx.font = 'bold 11px Inter, system-ui, sans-serif';
                const text = `${cam.id} (${cam.focalMm}mm)`;
                const textWidth = ctx.measureText(text).width;

                ctx.fillStyle = isSelected ? '#064e3b' : 'rgba(15, 23, 42, 0.85)';
                ctx.beginPath();
                ctx.roundRect(cam.x - textWidth / 2 - 6, cam.y + 16, textWidth + 12, 16, 4);
                ctx.fill();

                ctx.fillStyle = '#ffffff';
                ctx.textAlign = 'center';
                ctx.fillText(text, cam.x, cam.y + 28);
            }
        }

        renderCalibrationLine(ctx) {
            if (this.calibPointA) {
                const target = this.calibPointB || this.mouseWorld;

                ctx.strokeStyle = '#38bdf8';
                ctx.lineWidth = 2;
                ctx.setLineDash([4, 4]);
                ctx.beginPath();
                ctx.moveTo(this.calibPointA.x, this.calibPointA.y);
                ctx.lineTo(target.x, target.y);
                ctx.stroke();
                ctx.setLineDash([]);

                // Markers at endpoints
                ctx.fillStyle = '#0284c7';
                ctx.beginPath();
                ctx.arc(this.calibPointA.x, this.calibPointA.y, 6, 0, Math.PI * 2);
                ctx.fill();

                ctx.beginPath();
                ctx.arc(target.x, target.y, 6, 0, Math.PI * 2);
                ctx.fill();

                // Distance in pixels
                const distPx = Math.hypot(target.x - this.calibPointA.x, target.y - this.calibPointA.y);
                ctx.font = 'bold 12px monospace';
                ctx.fillStyle = '#38bdf8';
                ctx.textAlign = 'center';
                ctx.fillText(`${Math.round(distPx)} px`, (this.calibPointA.x + target.x) / 2, (this.calibPointA.y + target.y) / 2 - 10);
            }
        }

        renderHud(ctx, w, h, ppm) {
            // Scale bar (5 meters = 5 * ppm px)
            const meterBar = 5;
            const barPx = meterBar * ppm * this.viewTransform.scale;

            if (barPx > 20 && barPx < w / 2) {
                const bx = 20;
                const by = h - 25;

                ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
                ctx.fillRect(bx - 8, by - 22, barPx + 16, 34);

                ctx.fillStyle = '#38bdf8';
                ctx.fillRect(bx, by, barPx, 4);

                // End ticks
                ctx.fillRect(bx, by - 4, 2, 8);
                ctx.fillRect(bx + barPx - 2, by - 4, 2, 8);

                ctx.fillStyle = '#f8fafc';
                ctx.font = 'bold 11px Inter, monospace';
                ctx.textAlign = 'left';
                ctx.fillText(`Skala: ${meterBar} m (${Math.round(ppm)} px/m)`, bx, by - 8);
            }

            // Citradata watermark badge
            ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
            ctx.fillRect(w - 290, h - 30, 280, 22);
            ctx.fillStyle = '#94a3b8';
            ctx.font = '10px Inter, sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText('PT Citradata Purnakharisma — System Planner', w - 18, h - 15);
        }

        exportHighResPng(projectName = 'Project') {
            if (!this.bgImage) return;

            // Render high-res export offscreen at 2x native image size
            const exportCanvas = document.createElement('canvas');
            const iw = this.bgImage.width;
            const ih = this.bgImage.height;
            const scaleFactor = 2.0;

            exportCanvas.width = iw * scaleFactor;
            exportCanvas.height = (ih + 120) * scaleFactor; // Extra space for header & legend banner
            const eCtx = exportCanvas.getContext('2d');
            eCtx.scale(scaleFactor, scaleFactor);

            // 1. Header Banner
            eCtx.fillStyle = '#002b5c'; // CDPK Corporate Blue
            eCtx.fillRect(0, 0, iw, 70);

            eCtx.fillStyle = '#ffffff';
            eCtx.font = 'bold 20px Inter, system-ui, sans-serif';
            eCtx.textAlign = 'left';
            eCtx.fillText('PT CITRADATA PURNAKHARISMA — TECHNICAL BLUEPRINT SIMULATION', 24, 32);

            eCtx.fillStyle = '#38bdf8';
            eCtx.font = '12px Inter, system-ui, sans-serif';
            eCtx.fillText(`Proyek: ${projectName}   |   Lantai: ${this.state.floorName || 'Lantai 1'}   |   Tanggal: ${new Date().toLocaleDateString('id-ID')}`, 24, 52);

            // 2. Blueprint area
            eCtx.translate(0, 70);
            eCtx.drawImage(this.bgImage, 0, 0);

            const ppm = this.state.scalePpm || 40.0;
            if (this.state.showDasHeatmap) this.renderDasHeatmaps(eCtx, ppm);
            if (this.state.showCctvDori) this.renderCctvDoriCones(eCtx, ppm);
            this.renderAntennas(eCtx);
            this.renderCameras(eCtx);

            // 3. Footer Legend Banner
            eCtx.translate(0, ih);
            eCtx.fillStyle = '#0f172a';
            eCtx.fillRect(0, 0, iw, 50);

            // DORI Legend
            eCtx.font = 'bold 11px Inter, sans-serif';
            eCtx.textAlign = 'left';
            let lx = 20;

            const doriEntries = [
                { color: '#ef4444', label: 'Identifikasi (≥250 PPM)' },
                { color: '#f59e0b', label: 'Pengenalan (≥125 PPM)' },
                { color: '#06b6d4', label: 'Observasi (≥62 PPM)' },
                { color: '#3b82f6', label: 'Deteksi (≥25 PPM)' }
            ];

            for (const d of doriEntries) {
                eCtx.fillStyle = d.color;
                eCtx.fillRect(lx, 18, 12, 12);
                eCtx.fillStyle = '#cbd5e1';
                eCtx.fillText(d.label, lx + 16, 28);
                lx += 180;
            }

            // DAS Legend
            eCtx.fillStyle = '#10b981';
            eCtx.fillRect(lx, 18, 12, 12);
            eCtx.fillStyle = '#cbd5e1';
            eCtx.fillText('Sinyal DAS ≥ -75 dBm', lx + 16, 28);
            lx += 160;

            eCtx.fillStyle = '#eab308';
            eCtx.fillRect(lx, 18, 12, 12);
            eCtx.fillStyle = '#cbd5e1';
            eCtx.fillText('SAT Standar ≥ -85 dBm', lx + 16, 28);

            // Trigger download
            const dataUrl = exportCanvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.download = `CDPK_FloorPlan_Simulator_${(projectName || 'Project').replace(/\s+/g, '_')}_${Date.now()}.png`;
            a.href = dataUrl;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }

    // Expose engine & controller class
    window.CDPK_FLOORPLAN_ENGINE = FLOORPLAN_ENGINE;
    window.CDPKFloorPlanViewer = CDPKFloorPlanViewer;
    console.log('[CDPK] Floor Plan & FoV Heatmap Engine initialized v' + FLOORPLAN_ENGINE.version);
})();
