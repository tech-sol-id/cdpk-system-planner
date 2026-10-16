// RF Visualization, Topology SVG, 8-Slide Engineering Analysis & 60x60 Path-Loss Simulation Engine
window.CDPK_ENGINES = {
    buildTopoSVG(topo, sites, rptPerSite, backhaul, dasNodes, lang) {
        const isEn = lang === 'en';
        const effSites = Math.max(1, parseInt(sites || 1, 10));
        const shownSites = Math.min(effSites, 4);
        const bhLabel = {
            fiber: isEn ? 'Fiber Optic / IP LAN Backhaul' : 'Backhaul Fiber Optic / IP LAN',
            radio_ip: isEn ? 'PtP Microwave IP Backhaul' : 'Backhaul Radio IP Microwave PtP',
            starlink: isEn ? 'LEO Starlink / VSAT IP Backhaul' : 'Backhaul Satelit Starlink / VSAT'
        }[backhaul] || 'IP Backhaul';

        let siteNodesSvg = '';
        const spacing = 520 / Math.max(1, shownSites);
        for (let i = 0; i < shownSites; i++) {
            const cx = 90 + i * spacing + (spacing / 2 - 45);
            siteNodesSvg += `
                <g transform="translate(${cx}, 115)">
                    <line x1="45" y1="0" x2="45" y2="-38" stroke="#0284c7" stroke-width="2" stroke-dasharray="4,3"/>
                    <rect x="0" y="0" width="90" height="54" rx="8" fill="#0f172a" stroke="#0ea5e9" stroke-width="1.8"/>
                    <text x="45" y="19" text-anchor="middle" fill="#38bdf8" font-size="10" font-weight="700">SITE #${i + 1}</text>
                    <text x="45" y="33" text-anchor="middle" fill="#f8fafc" font-size="9" font-weight="600">${rptPerSite}x SLR 5300</text>
                    <text x="45" y="46" text-anchor="middle" fill="#94a3b8" font-size="8">${rptPerSite * 2} TDMA Slots</text>
                </g>
            `;
        }

        const dasBadge = dasNodes > 0 ? `
            <g transform="translate(505, 192)">
                <rect x="0" y="0" width="155" height="44" rx="7" fill="#0c4a6e" stroke="#38bdf8" stroke-width="1.5"/>
                <text x="77" y="18" text-anchor="middle" fill="#7dd3fc" font-size="9.5" font-weight="700">IN-BUILDING DAS</text>
                <text x="77" y="33" text-anchor="middle" fill="#ffffff" font-size="9">${dasNodes}x MOTOTRBO SLR 1000</text>
            </g>
        ` : '';

        return `
        <svg viewBox="0 0 680 250" width="100%" height="235" xmlns="http://www.w3.org/2000/svg" style="background:linear-gradient(180deg,#0b192c 0%,#0f172a 100%);border-radius:10px;border:1px solid #1e293b;">
            <defs>
                <linearGradient id="coreGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="#0056b3"/>
                    <stop offset="100%" stop-color="#0284c7"/>
                </linearGradient>
            </defs>
            <!-- Top Core Backbone -->
            <rect x="130" y="20" width="420" height="44" rx="8" fill="url(#coreGrad)" stroke="#7dd3fc" stroke-width="1.5"/>
            <text x="340" y="39" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="700">${topo.toUpperCase()}</text>
            <text x="340" y="54" text-anchor="middle" fill="#e0f2fe" font-size="9.5">${bhLabel} • Total ${effSites} Site(s)</text>

            <!-- Backbone Bus Line -->
            <line x1="80" y1="77" x2="600" y2="77" stroke="#38bdf8" stroke-width="2.5"/>
            <line x1="340" y1="64" x2="340" y2="77" stroke="#38bdf8" stroke-width="2.5"/>

            ${siteNodesSvg}

            <!-- Subscriber Fleet Layer -->
            <rect x="30" y="192" width="455" height="44" rx="7" fill="#1e293b" stroke="#475569" stroke-width="1.2"/>
            <text x="257" y="211" text-anchor="middle" fill="#f1f5f9" font-size="10" font-weight="700">
                ${isEn ? 'SUBSCRIBER FLEET LAYER (PORTABLE HT, VEHICLE MOBILE & DISPATCH)' : 'LAPISAN PENGGUNA RADIO (HANDY TALKY, MOBILE KENDARAAN & DISPATCH)'}
            </text>
            <text x="257" y="226" text-anchor="middle" fill="#94a3b8" font-size="8.8">
                ${isEn ? 'Automatic Roaming, Emergency Pre-emption & GPS/AVL Telemetry' : 'Roaming Otomatis Antar-Site, Tombol Darurat & Telemetri GPS/AVL'}
            </text>
            ${dasBadge}
        </svg>`;
    },

    buildCovSVG(effRadiusKm, sites, areaKm2, band, terrain, lang) {
        const isEn = lang === 'en';
        const r = Number(effRadiusKm || 5).toFixed(1);
        return `
        <svg viewBox="0 0 420 235" width="100%" height="235" xmlns="http://www.w3.org/2000/svg" style="background:radial-gradient(circle at 50% 50%,#0f2942 0%,#091326 100%);border-radius:10px;border:1px solid #1e293b;">
            <circle cx="210" cy="118" r="92" fill="rgba(16,185,129,0.08)" stroke="#10b981" stroke-width="1.4" stroke-dasharray="5,4"/>
            <circle cx="210" cy="118" r="64" fill="rgba(56,189,248,0.12)" stroke="#38bdf8" stroke-width="1.5"/>
            <circle cx="210" cy="118" r="34" fill="rgba(59,130,246,0.22)" stroke="#60a5fa" stroke-width="1.5"/>
            <circle cx="210" cy="118" r="6" fill="#ef4444" stroke="#ffffff" stroke-width="2"/>
            <line x1="210" y1="118" x2="302" y2="118" stroke="#fbbf24" stroke-width="2"/>
            <text x="256" y="111" text-anchor="middle" fill="#fbbf24" font-size="10" font-weight="700">R = ${r} km</text>
            <text x="210" y="22" text-anchor="middle" fill="#f8fafc" font-size="11" font-weight="700">
                ${isEn ? `EFFECTIVE CELL RADIUS (${band.toUpperCase()})` : `RADIUS EFEKTIF PER SITE (${band.toUpperCase()})`}
            </text>
            <text x="210" y="224" text-anchor="middle" fill="#94a3b8" font-size="9.5">
                ${isEn ? `Total Area: ${Number(areaKm2).toFixed(1)} km² • ${sites} Active Site(s) • 25% Handover Overlap` : `Total Area: ${Number(areaKm2).toFixed(1)} km² • ${sites} Site Aktif • Overlap Handover 25%`}
            </text>
        </svg>`;
    },

    generateTechAnalysisSlides(s, lang) {
        const isEn = lang === 'en';
        if (isEn) {
            return [
                {
                    title: "1. RF Propagation & Cell Geometry",
                    badge: `${s.freqBand.toUpperCase()} Band`,
                    body: `Operating on **${s.freqBand.toUpperCase()}** across **${s.areaKm2.toFixed(2)} km²** (${s.terrainLabel}) yields an effective cell radius of **${s.effRadiusKm.toFixed(1)} km** per tower (${s.towerHeight}m height). Allowing a 25% inter-cell handover overlap requires **${s.outdoorSites} outdoor repeater site(s)**.`
                },
                {
                    title: "2. DMR 2-Slot TDMA Traffic & Capacity",
                    badge: `${s.totalTimeSlots} Time Slots`,
                    body: `For **${s.userCount} subscribers**, peak voice/data traffic requires **${s.requiredChannels} logical channels**. Deploying **${s.rptPerSite} repeater(s) per site** provides **${s.totalTimeSlots} simultaneous 12.5 kHz TDMA paths**, maintaining <2% Grade of Service blocking probability.`
                },
                {
                    title: "3. System Topology Selection",
                    badge: s.topologyName,
                    body: `Selected architecture: **${s.topologyName}**. ${s.outdoorSites > 1 ? 'Enables seamless automatic wide-area site roaming and centralized network management across all sites.' : 'Provides reliable digital voice/data coverage with dual-slot efficiency.'}`
                },
                {
                    title: "4. Repeater Hardware Standardization",
                    badge: s.primaryRepeaterModel,
                    body: `Standardized on **${s.primaryRepeaterModel}** continuous-duty repeater(s) paired with 6-cavity band-pass duplexers, **${s.coaxMetersPerSite}m of 7/8" low-loss feeder cable** per site, and coaxial lightning arresters.${s.dasNodes > 0 ? ` Supplemented by **${s.dasNodes}x MOTOTRBO SLR 1000** for in-building DAS coverage.` : ''}`
                },
                {
                    title: "5. Subscriber Fleet Allocation",
                    badge: `${s.htQty} HT + ${s.mobileQty} Mobile`,
                    body: `Auto-allocated **${s.htQty}x ${s.recommendedHtModel}** portable radios (85%) and **${s.mobileQty}x ${s.recommendedMobileModel}** vehicle/fixed radios (15%) matched to **${s.industryLabel}** environmental durability requirements.`
                },
                {
                    title: "6. Power Load, UPS & Solar Autonomy",
                    badge: `${s.upsRecommendedVA} VA / ${s.batteryAh} Ah`,
                    body: `Each repeater site draws ~**${s.sitePowerWatts}W** average continuous load. For **${s.backupHours} hours** backup autonomy, a **${s.upsRecommendedVA} VA Online Sinewave UPS** with **${s.batteryAh} Ah (12V eq.)** deep-cycle battery bank is specified${s.powerSource === 'solar' ? ` plus a **${s.solarWp} Wp** solar PV array.` : '.'}`
                },
                {
                    title: "7. Inter-Site IP Backhaul & QoS",
                    badge: s.backhaul.toUpperCase(),
                    body: `Inter-site voice/CSBK packets require **${s.bandwidthKbps} kbps** deterministic throughput with jitter <40ms and packet loss <1%. Industrial router with DSCP EF QoS prioritization is included.`
                },
                {
                    title: "8. Safety, Regulatory & ISR Compliance",
                    badge: s.needAtex ? "ATEX Zone 1/21" : "KOMDIGI ISR",
                    body: `Requires Indonesian Spectrum Frequency License (ISR KOMDIGI) per Tx/Rx frequency pair. ${s.needAtex ? 'Mandatory **ATEX/IECEx Intrinsically Safe** certification enforced via XiR P8600 Ex terminals.' : 'Standard MIL-STD-810H & IP68 ingress protection applied.'}`
                }
            ];
        }
        return [
            {
                title: "1. Propagasi RF & Geometri Sel Cakupan",
                badge: `Pita ${s.freqBand.toUpperCase()}`,
                body: `Operasi pada pita **${s.freqBand.toUpperCase()}** untuk area **${s.areaKm2.toFixed(2)} km²** (${s.terrainLabel}) menghasilkan radius efektif **${s.effRadiusKm.toFixed(1)} km** per site (tower ${s.towerHeight}m). Dengan overlap handover 25%, dibutuhkan **${s.outdoorSites} site repeater outdoor**.`
            },
            {
                title: "2. Kapasitas Trafik TDMA 2-Slot & Erlang",
                badge: `${s.totalTimeSlots} Slot Kanal`,
                body: `Untuk **${s.userCount} pengguna radio**, dibutuhkan minimal **${s.requiredChannels} kanal pembicaraan**. Konfigurasi **${s.rptPerSite} repeater per site** menyediakan total **${s.totalTimeSlots} jalur komunikasi simultan** dengan risiko antrean <2%.`
            },
            {
                title: "3. Pemilihan Topologi Jaringan",
                badge: s.topologyName,
                body: `Arsitektur terpilih: **${s.topologyName}**. ${s.outdoorSites > 1 ? 'Mendukung automatic roaming lintas site tanpa putus serta manajemen terpusat.' : 'Memberikan efisiensi 2x kapasitas kanal dalam 1 frekuensi berlisensi.'}`
            },
            {
                title: "4. Standarisasi Perangkat Repeater & RF",
                badge: s.primaryRepeaterModel,
                body: `Menggunakan repeater utama **${s.primaryRepeaterModel}** continuous-duty lengkap dengan Duplexer 6-Cavity, **${s.coaxMetersPerSite} meter Kabel Coaxial 7/8" Low-Loss** per site, dan Lightning Arrester.${s.dasNodes > 0 ? ` Ditambah **${s.dasNodes} unit MOTOTRBO SLR 1000** untuk distribusi antena DAS indoor.` : ''}`
            },
            {
                title: "5. Alokasi Radio User (Handy Talky & Mobile)",
                badge: `${s.htQty} HT + ${s.mobileQty} Mobile`,
                body: `Dialokasikan otomatis **${s.htQty} unit ${s.recommendedHtModel}** (85% Portable HT) dan **${s.mobileQty} unit ${s.recommendedMobileModel}** (15% Mobile/Base) sesuai profil ketahanan industri **${s.industryLabel}**.`
            },
            {
                title: "6. Kalkulasi Daya, UPS & Baterai Backup",
                badge: `${s.upsRecommendedVA} VA / ${s.batteryAh} Ah`,
                body: `Konsumsi daya rata-rata per site adalah **${s.sitePowerWatts}W**. Untuk waktu backup **${s.backupHours} jam**, direkomendasikan **UPS Online ${s.upsRecommendedVA} VA** dengan baterai deep-cycle **${s.batteryAh} Ah (12V)**${s.powerSource === 'solar' ? ` serta panel surya **${s.solarWp} Wp**.` : '.'}`
            },
            {
                title: "7. Spesifikasi IP Backhaul & QoS",
                badge: s.backhaul.toUpperCase(),
                body: `Kebutuhan bandwidth interkoneksi antar-site sebesar **${s.bandwidthKbps} kbps** dengan syarat latency <60ms dan jitter <40ms menggunakan prioritas paket suara QoS DSCP EF.`
            },
            {
                title: "8. Kepatuhan Regulasi ISR & Keselamatan",
                badge: s.needAtex ? "Wajib ATEX/IECEx" : "Standar ISR KOMDIGI",
                body: `Setiap pasang frekuensi Tx/Rx repeater wajib didaftarkan pada Izin Stasiun Radio (ISR KOMDIGI). ${s.needAtex ? 'Zona berbahaya mewajibkan perangkat bersertifikat **ATEX/IECEx (XiR P8600 Ex)**.' : 'Perangkat memenuhi uji ketahanan militer MIL-STD-810H & IP68.'}`
            }
        ];
    },

    renderCoverageSimulationCanvas(canvas, cfg) {
        if (!canvas) return { strongPct: 0, fairPct: 0, weakPct: 0, deadZones: [] };
        const ctx = canvas.getContext('2d');
        const W = canvas.width = 600;
        const H = canvas.height = 420;
        ctx.clearRect(0, 0, W, H);

        // Background map grid
        ctx.fillStyle = '#091526';
        ctx.fillRect(0, 0, W, H);

        const N = 60;
        const cellW = W / N;
        const cellH = H / N;

        // Fixed path loss exponents including mixed_inout: 3.5
        const terrainN = {
            flat: 2.35,
            hilly: 3.10,
            mountainous: 3.70,
            dense: 3.45,
            indoor: 3.85,
            mixed_inout: 3.50
        };
        const nExp = terrainN[cfg.terrain] || 3.10;
        const freqMHz = cfg.freqBand === 'vhf' ? 155 : (cfg.freqBand === '800' ? 855 : 435);
        const txWatt = Number(cfg.txWatts || 50);
        const txDbm = 10 * Math.log10(txWatt * 1000);
        const antGainDbi = Number(cfg.antennaGainDbi || 6.5);
        const cableLossDb = Number(cfg.cableLossDb || 2.2);
        const eirpDbm = txDbm + antGainDbi - cableLossDb;

        // Place repeater sites evenly inside coverage box
        const numSites = Math.max(1, Math.min(8, parseInt(cfg.sites || 1, 10)));
        const siteCoords = [];
        if (numSites === 1) {
            siteCoords.push({ x: W * 0.5, y: H * 0.5 });
        } else {
            const angleStep = (2 * Math.PI) / numSites;
            const ringR = Math.min(W, H) * 0.27;
            for (let i = 0; i < numSites; i++) {
                siteCoords.push({
                    x: W * 0.5 + ringR * Math.cos(i * angleStep - Math.PI / 4),
                    y: H * 0.5 + ringR * Math.sin(i * angleStep - Math.PI / 4)
                });
            }
        }

        const sideKm = Math.max(1.5, Math.sqrt(Math.max(1, Number(cfg.areaKm2 || 25))));
        const kmPerPx = sideKm / Math.min(W, H);

        // Reference path loss at 100m (0.1 km)
        const pl100m = 32.45 + 20 * Math.log10(freqMHz) + 20 * Math.log10(0.1);

        let strongCnt = 0, fairCnt = 0, weakCnt = 0;
        const deadCells = [];

        for (let gy = 0; gy < N; gy++) {
            for (let gx = 0; gx < N; gx++) {
                const px = (gx + 0.5) * cellW;
                const py = (gy + 0.5) * cellH;

                // Best RSSI from nearest repeater site
                let bestRssi = -140;
                for (let s = 0; s < siteCoords.length; s++) {
                    const dx = (px - siteCoords[s].x) * kmPerPx;
                    const dy = (py - siteCoords[s].y) * kmPerPx;
                    const distKm = Math.max(0.08, Math.sqrt(dx * dx + dy * dy));
                    // Deterministic terrain shadow variation
                    const shadow = Math.sin(gx * 0.42 + s) * Math.cos(gy * 0.37 - s) * 4.5;
                    const pl = pl100m + 10 * nExp * Math.log10(distKm / 0.1) + shadow - (Number(cfg.towerHeight || 30) * 0.18);
                    const rssi = eirpDbm - pl;
                    if (rssi > bestRssi) bestRssi = rssi;
                }

                let fill = 'rgba(239,68,68,0.58)'; // Dead/Weak (< -105 dBm)
                if (bestRssi >= -85) {
                    fill = 'rgba(16,185,129,0.58)'; // Strong
                    strongCnt++;
                } else if (bestRssi >= -102) {
                    fill = 'rgba(245,158,11,0.55)'; // Fair
                    fairCnt++;
                } else {
                    weakCnt++;
                    if (gx > 4 && gx < N - 5 && gy > 4 && gy < N - 5 && (gx + gy) % 19 === 0 && deadCells.length < 4) {
                        deadCells.push({ gx, gy, px, py, rssi: Math.round(bestRssi) });
                    }
                }
                ctx.fillStyle = fill;
                ctx.fillRect(gx * cellW, gy * cellH, cellW - 0.5, cellH - 0.5);
            }
        }

        // Draw Coordinate Grid Lines
        ctx.strokeStyle = 'rgba(148,163,184,0.18)';
        ctx.lineWidth = 1;
        for (let i = 1; i < 6; i++) {
            ctx.beginPath();
            ctx.moveTo((W / 6) * i, 0);
            ctx.lineTo((W / 6) * i, H);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, (H / 6) * i);
            ctx.lineTo(W, (H / 6) * i);
            ctx.stroke();
        }

        // Draw Repeater Site Markers
        siteCoords.forEach((sc, idx) => {
            ctx.beginPath();
            ctx.arc(sc.x, sc.y, 11, 0, Math.PI * 2);
            ctx.fillStyle = '#0284c7';
            ctx.fill();
            ctx.lineWidth = 2.5;
            ctx.strokeStyle = '#ffffff';
            ctx.stroke();

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 10px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(`R${idx + 1}`, sc.x, sc.y + 3.5);
        });

        // Draw Dead-Zone Markers
        deadCells.forEach((dz, idx) => {
            ctx.beginPath();
            ctx.arc(dz.px, dz.py, 9, 0, Math.PI * 2);
            ctx.fillStyle = '#dc2626';
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#fecaca';
            ctx.stroke();
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 9px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(`!`, dz.px, dz.py + 3);
        });

        const total = N * N;
        return {
            strongPct: Math.round((strongCnt / total) * 100),
            fairPct: Math.round((fairCnt / total) * 100),
            weakPct: Math.round((weakCnt / total) * 100),
            deadZones: deadCells.map((d, i) => ({
                id: `DZ-${i + 1}`,
                rssi: `${d.rssi} dBm`,
                rec: cfg.terrain === 'indoor' || cfg.terrain === 'mixed_inout'
                    ? 'Tambah 1x MOTOTRBO SLR 1000 In-Building DAS'
                    : 'Naikkan antena +10m / Tambah Fill-in Repeater SLR 5300'
            }))
        };
    }
};
