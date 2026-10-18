// Document Export Engine (PDF, XLSX, PNG, DOCX) for CDPK System Planner
// Supports Bilingual (ID/EN) & Dual Export Modes (Technical BoQ vs Commercial Quotation)
window.CDPK_EXPORTERS = {
    exportBoqPDF(app) {
        if (!window.jspdf || !window.jspdf.jsPDF) {
            alert(app.lang === 'en' ? 'jsPDF library is loading, please try again.' : 'Pustaka PDF sedang dimuat, silakan coba sesaat lagi.');
            return;
        }
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
        const isEn = app.lang === 'en';
        const isComm = app.exportMode === 'commercial';
        const s = app.sizingResult;

        // Header Banner
        doc.setFillColor(0, 56, 117);
        doc.rect(0, 0, 297, 28, 'F');
        if (window.CDPK_LOGO_B64) {
            try {
                doc.addImage(window.CDPK_LOGO_B64, 'PNG', 12, 4, 34, 18);
            } catch (e) {}
        }
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(15);
        doc.setFont('helvetica', 'bold');
        const docTitle = isComm
            ? (isEn ? 'COMMERCIAL QUOTATION & SYSTEM BOM' : 'PENAWARAN HARGA KOMERSIAL & BOQ SISTEM')
            : (isEn ? 'TECHNICAL BILL OF QUANTITIES (BOQ)' : 'DOKUMEN TECHNICAL BILL OF QUANTITIES (BOQ)');
        doc.text(`CDPK SYSTEM PLANNER — ${docTitle}`, 52, 12);

        doc.setFontSize(9.5);
        doc.setFont('helvetica', 'normal');
        doc.text(
            `PT Citradata Purnakharisma  |  ${isEn ? 'Project' : 'Proyek'}: ${app.projName || 'Radio & Security System'}  |  ${isEn ? 'Client' : 'Klien'}: ${app.clientName || '-'}  |  ${new Date().toLocaleDateString()}`,
            52, 20
        );

        // Sizing Summary Box
        doc.setTextColor(15, 23, 42);
        doc.setFontSize(8.8);
        doc.setFont('helvetica', 'bold');
        doc.text(
            `${isEn ? 'Topology' : 'Topologi'}: ${s.topologyName}   |   ${isEn ? 'Outdoor Sites' : 'Site Outdoor'}: ${s.outdoorSites} (${s.totalOutdoorRepeaters}x SLR 5300)   |   DAS: ${s.dasNodes}x SLR 1000   |   ${isEn ? 'Subscribers' : 'Total User'}: ${app.userCount} (${s.htQty} HT + ${s.mobileQty} Mobile)`,
            12, 34
        );

        // Turnkey RFoF DAS by FMTCS Architecture Summary
        const dasFloorsArr = (app.das && Array.isArray(app.das.floors)) ? app.das.floors : [];
        const dasAntTotal = dasFloorsArr.reduce((acc, fl) => acc + (Number(fl.q) || 0), 0);
        let tableStartY = 39;
        if (dasAntTotal > 0) {
            const dasOrus = Math.ceil(dasAntTotal / ((app.das && app.das.r_oru) || 30));
            const dasOmus = Math.ceil(dasOrus / ((app.das && app.das.r_omu) || 32));
            const arch = ((app.das && app.das.archMode) || 'digital').toUpperCase();
            const topo = ((app.das && app.das.fiberTopo) || 'star').toUpperCase();
            doc.setFontSize(8.2);
            doc.setTextColor(2, 132, 199);
            doc.text(
                isEn
                    ? `FMTCS RFoF DAS: ${arch} Mode (${topo} Topology)   |   ${dasFloorsArr.length} Floors (${dasAntTotal} Indoor Antennas)   |   ${dasOrus}x DORU/AORU   |   ${dasOmus}x DOMU/AOMU Master Units`
                    : `FMTCS RFoF DAS: Mode ${arch} (Topologi Fiber ${topo})   |   ${dasFloorsArr.length} Lantai (${dasAntTotal} Antena Indoor)   |   ${dasOrus}x DORU/AORU   |   ${dasOmus}x DOMU/AOMU Master Unit`,
                12, 39
            );
            tableStartY = 44;
        }

        // Build Table Rows (including expanded child BOM sub-items for bundles)
        const rows = [];
        let rowNum = 1;
        app.boqItems.forEach((item) => {
            const unitPriceDisp = app.formatCurrency(app.getEffectiveUnitPrice(item));
            const lineTotalDisp = app.formatCurrency(app.getLineTotal(item));
            const titleText = item.isBundle
                ? `[BUNDLE] ${item.name} (${item.children ? item.children.filter(c => c.enabled !== false).length : 0} Sub-Items)`
                : item.name;
            if (isComm) {
                rows.push([
                    String(rowNum++),
                    item.category,
                    titleText,
                    item.sku || '-',
                    String(item.qty),
                    item.unit || 'Unit',
                    unitPriceDisp,
                    lineTotalDisp,
                    item.notes || ''
                ]);
            } else {
                rows.push([
                    String(rowNum++),
                    item.category,
                    titleText,
                    item.sku || '-',
                    String(item.qty),
                    item.unit || 'Unit',
                    item.notes || ''
                ]);
            }

            // Include sub-items underneath parent bundle
            if (item.isBundle && Array.isArray(item.children)) {
                item.children.filter(c => c.enabled !== false).forEach((sub) => {
                    const subTotalQty = sub.qtyPerBundle * item.qty;
                    if (isComm) {
                        rows.push([
                            '',
                            '   ↳ Sub-BOM',
                            `   • ${isEn ? sub.role_en : sub.role_id}: ${sub.model}`,
                            sub.sku,
                            `${sub.qtyPerBundle} x ${item.qty} = ${subTotalQty}`,
                            sub.unit,
                            app.formatCurrency(app.convertPrice(sub.price_idr, sub.price_usd)),
                            app.formatCurrency(app.convertPrice(sub.price_idr, sub.price_usd) * subTotalQty),
                            isEn ? 'Included in System Bundle' : 'Termasuk dalam Paket Sistem'
                        ]);
                    } else {
                        rows.push([
                            '',
                            '   ↳ Sub-BOM',
                            `   • ${isEn ? sub.role_en : sub.role_id}: ${sub.model}`,
                            sub.sku,
                            `${subTotalQty}`,
                            sub.unit,
                            isEn ? 'System Sub-Component' : 'Komponen Pembentuk Sistem'
                        ]);
                    }
                });
            }
        });

        if (isComm && app.includeMandaysInBoq) {
            rows.push([
                String(rowNum++),
                'Services',
                isEn ? 'Certified RF Engineering, Installation & Commissioning Services (WES)' : 'Jasa Engineering, Survey, Instalasi, Tuning RF & Commissioning (WES)',
                'SVC-CDPK-MANDAYS',
                String(app.mandaysResult.totalMandays),
                'Mandays',
                app.formatCurrency(app.convertPrice(app.mandaysRateIdr, app.mandaysRateIdr / app.exchangeRate)),
                app.formatCurrency(app.serviceFeeTotal),
                `${app.mandaysResult.calendarDays} ${isEn ? 'Working Days' : 'Hari Kerja'}`
            ]);
        }

        const head = isComm
            ? [[
                'No',
                isEn ? 'Category' : 'Kategori',
                isEn ? 'System / Hardware Description' : 'Deskripsi Sistem / Perangkat',
                'SKU',
                'Qty',
                isEn ? 'Unit' : 'Satuan',
                isEn ? `Unit Price (${app.currency})` : `Harga Satuan (${app.currency})`,
                isEn ? `Total (${app.currency})` : `Total Harga (${app.currency})`,
                isEn ? 'Notes' : 'Catatan'
            ]]
            : [[
                'No',
                isEn ? 'Category' : 'Kategori',
                isEn ? 'System / Hardware Description' : 'Deskripsi Sistem / Perangkat',
                'SKU',
                'Qty',
                isEn ? 'Unit' : 'Satuan',
                isEn ? 'Technical Specification & Notes' : 'Spesifikasi & Catatan Teknis'
            ]];

        doc.autoTable({
            startY: tableStartY,
            head: head,
            body: rows,
            theme: 'grid',
            headStyles: { fillColor: [0, 56, 117], textColor: 255, fontSize: 8.2 },
            bodyStyles: { fontSize: 7.8, cellPadding: 2.2 },
            didParseCell(data) {
                if (data.section === 'body' && String(data.row.raw[1] || '').includes('Sub-BOM')) {
                    data.cell.styles.fillColor = [241, 245, 249];
                    data.cell.styles.textColor = [71, 85, 105];
                    data.cell.styles.fontStyle = 'italic';
                }
            }
        });

        let finalY = (doc.lastAutoTable && doc.lastAutoTable.finalY) ? doc.lastAutoTable.finalY + 6 : 150;
        if (isComm) {
            if (finalY > 170) {
                doc.addPage();
                finalY = 20;
            }
            doc.setFontSize(9.5);
            doc.setFont('helvetica', 'bold');
            doc.text(`${isEn ? 'Hardware & Bundles Subtotal' : 'Subtotal Perangkat & Sistem'}: ${app.formatCurrency(app.hardwareSubtotal)}`, 190, finalY);
            if (app.includeMandaysInBoq) {
                finalY += 5.5;
                doc.text(`${isEn ? 'Engineering Service Fee' : 'Biaya Jasa Engineering (Mandays)'}: ${app.formatCurrency(app.serviceFeeTotal)}`, 190, finalY);
            }
            if (app.discountPercent > 0) {
                finalY += 5.5;
                doc.text(`${isEn ? 'Commercial Discount' : 'Diskon Komersial'} (${app.discountPercent}%): -${app.formatCurrency(app.discountAmount)}`, 190, finalY);
            }
            finalY += 5.5;
            doc.text(`PPN / VAT (${app.ppnPercent}%): ${app.formatCurrency(app.ppnAmount)}`, 190, finalY);
            finalY += 6.5;
            doc.setFontSize(11);
            doc.setTextColor(0, 86, 179);
            doc.text(`GRAND TOTAL (${app.currency}): ${app.formatCurrency(app.grandTotal)}`, 190, finalY);

            doc.setTextColor(71, 85, 105);
            doc.setFontSize(8);
            doc.setFont('helvetica', 'normal');
            doc.text(
                isEn ? `Terms: ${app.commercialConfig.payment_terms_en || '30% DP, 60% Delivery, 10% Commissioning'}` : `Syarat Pembayaran: ${app.commercialConfig.payment_terms_id || 'DP 30%, 60% Delivery, 10% BAST'}`,
                12, finalY - 14
            );

            const fxModeLabel = app.fxConfig ? (app.fxConfig.mode === 'finance' ? 'Finance SSOT' : (app.fxConfig.mode === 'live' ? 'Live Spot' : 'Manual Buffer')) : 'Finance SSOT';
            const fxRateVal = (app.fxConfig ? (app.fxConfig.effectiveRate || app.exchangeRate) : app.exchangeRate) || 16200;
            const fxSourceVal = (app.fxConfig ? app.fxConfig.sourceName : 'PT Citradata Purnakharisma') || 'PT Citradata Purnakharisma';

            doc.setFont('helvetica', 'italic');
            doc.setFontSize(7.5);
            doc.text(
                isEn ? `* Indicative FX Rate: USD 1.00 = IDR ${fxRateVal.toLocaleString('en-US')} (Ref: ${fxModeLabel} - ${fxSourceVal})` : `* Acuan Kurs Indikatif: USD 1.00 = IDR ${fxRateVal.toLocaleString('id-ID')} (Ref: ${fxModeLabel} - ${fxSourceVal})`,
                12, finalY - 8
            );
            doc.text(
                isEn ? `* Disclaimer: Final pricing and USD components are subject to written confirmation by Finance Division prior to PO.` : `* Disclaimer: Harga final & komponen berbasis valas wajib dikonfirmasi ke Divisi Finance sebelum penerbitan PO.`,
                12, finalY - 3
            );
        }

        const safeName = (app.projName || 'CDPK_System_Planner').replace(/[^a-zA-Z0-9_-]/g, '_');
        doc.save(`${safeName}_${isComm ? 'Commercial_Quotation' : 'Technical_BoQ'}.pdf`);
    },

    exportBoqXLSX(app) {
        if (!window.XLSX) {
            alert('SheetJS (XLSX) sedang dimuat.');
            return;
        }
        const isEn = app.lang === 'en';
        const isComm = app.exportMode === 'commercial';
        const wb = window.XLSX.utils.book_new();
        const s = app.sizingResult;

        // Sheet 1: Project & Sizing Summary
        const summaryAoA = [
            ["CDPK SYSTEM PLANNER — SOLUTION SIZING & COMMERCIAL SUITE"],
            [isEn ? "Project Name" : "Nama Proyek", app.projName || "-"],
            [isEn ? "Client / Company" : "Nama Klien", app.clientName || "-"],
            [isEn ? "Location" : "Lokasi", app.projLocation || "-"],
            [isEn ? "Export Mode" : "Mode Dokumen", isComm ? "Commercial Quotation" : "Technical BoQ"],
            [],
            [isEn ? "PARAMETER SIZING RF" : "HASIL KALKULASI SIZING RF", isEn ? "VALUE" : "NILAI"],
            ["Recommended Topology", s.topologyName],
            ["Primary Repeater Platform", s.primaryRepeaterModel],
            ["Outdoor Repeater Sites", s.outdoorSites],
            ["Total Outdoor Repeaters", s.totalOutdoorRepeaters],
            ["In-Building DAS Repeaters (MOTOTRBO SLR 1000)", s.dasNodes],
            ["Total TDMA Channels (Time Slots)", s.totalTimeSlots],
            ["Recommended Handy Talky", `${s.htQty}x ${s.recommendedHtModel}`],
            ["Recommended Mobile/Base Radio", `${s.mobileQty}x ${s.recommendedMobileModel}`],
            ["Estimated Implementation Mandays (WES)", `${app.mandaysResult.totalMandays} Mandays (${app.mandaysResult.calendarDays} Days)`]
        ];
        const wsSum = window.XLSX.utils.aoa_to_sheet(summaryAoA);
        window.XLSX.utils.book_append_sheet(wb, wsSum, "1_Sizing_Summary");

        // Sheet 2: Main BoQ / Commercial Quotation
        const boqHeader = isComm
            ? ["No", "Category", "Item / System Bundle Name", "SKU", "Qty", "Unit", `Unit Price (${app.currency})`, `Total Price (${app.currency})`, "Technical Notes"]
            : ["No", "Category", "Item / System Bundle Name", "SKU", "Qty", "Unit", "Technical Notes"];
        const boqAoA = [boqHeader];
        let idx = 1;
        app.boqItems.forEach((it) => {
            const uPrice = Math.round(app.getEffectiveUnitPrice(it) * 100) / 100;
            const lTotal = Math.round(app.getLineTotal(it) * 100) / 100;
            if (isComm) {
                boqAoA.push([idx++, it.category, it.name, it.sku, it.qty, it.unit, uPrice, lTotal, it.notes]);
            } else {
                boqAoA.push([idx++, it.category, it.name, it.sku, it.qty, it.unit, it.notes]);
            }
            if (it.isBundle && Array.isArray(it.children)) {
                it.children.filter(c => c.enabled !== false).forEach((sub) => {
                    const subQty = sub.qtyPerBundle * it.qty;
                    const subUnitP = Math.round(app.convertPrice(sub.price_idr, sub.price_usd) * 100) / 100;
                    if (isComm) {
                        boqAoA.push(["", "  ↳ Sub-BOM", `  • ${isEn ? sub.role_en : sub.role_id}: ${sub.model}`, sub.sku, subQty, sub.unit, subUnitP, Math.round(subUnitP * subQty * 100) / 100, "Bundle Sub-Item"]);
                    } else {
                        boqAoA.push(["", "  ↳ Sub-BOM", `  • ${isEn ? sub.role_en : sub.role_id}: ${sub.model}`, sub.sku, subQty, sub.unit, "Bundle Sub-Item"]);
                    }
                });
            }
        });

        if (isComm) {
            if (app.includeMandaysInBoq) {
                boqAoA.push([
                    idx++, "Services",
                    isEn ? "Engineering, Site Survey, Installation & Commissioning (WES)" : "Jasa Engineering, Survey, Instalasi & Commissioning (WES)",
                    "SVC-CDPK-MANDAYS", app.mandaysResult.totalMandays, "Mandays",
                    Math.round(app.convertPrice(app.mandaysRateIdr, app.mandaysRateIdr / app.exchangeRate)),
                    Math.round(app.serviceFeeTotal),
                    "Professional Services"
                ]);
            }
            boqAoA.push([]);
            boqAoA.push(["", "", "Subtotal Hardware & Systems", "", "", "", "", Math.round(app.hardwareSubtotal)]);
            if (app.includeMandaysInBoq) {
                boqAoA.push(["", "", "Engineering Service Fee (Mandays)", "", "", "", "", Math.round(app.serviceFeeTotal)]);
            }
            if (app.discountPercent > 0) {
                boqAoA.push(["", "", `Commercial Discount (${app.discountPercent}%)`, "", "", "", "", -Math.round(app.discountAmount)]);
            }
            boqAoA.push(["", "", `PPN / VAT (${app.ppnPercent}%)`, "", "", "", "", Math.round(app.ppnAmount)]);
            boqAoA.push(["", "", `GRAND TOTAL (${app.currency})`, "", "", "", "", Math.round(app.grandTotal)]);
            boqAoA.push([]);
            const fxModeLabel = app.fxConfig ? (app.fxConfig.mode === 'finance' ? 'Finance SSOT' : (app.fxConfig.mode === 'live' ? 'Live Spot' : 'Manual Buffer')) : 'Finance SSOT';
            const fxRateVal = (app.fxConfig ? (app.fxConfig.effectiveRate || app.exchangeRate) : app.exchangeRate) || 16200;
            const fxSourceVal = (app.fxConfig ? app.fxConfig.sourceName : 'PT Citradata Purnakharisma') || 'PT Citradata Purnakharisma';
            boqAoA.push(["Catatan Finansial Valuta Asing:"]);
            boqAoA.push(["Acuan Kurs", `USD 1.00 = IDR ${fxRateVal.toLocaleString('id-ID')}`, `Ref: ${fxModeLabel} - ${fxSourceVal}`]);
            boqAoA.push(["Disclaimer Finance", app.getFxDisclaimerText ? app.getFxDisclaimerText() : "Harga indikatif, konfirmasi Finance sebelum PO."]);
        }

        const wsBoq = window.XLSX.utils.aoa_to_sheet(boqAoA);
        window.XLSX.utils.book_append_sheet(wb, wsBoq, isComm ? "2_Commercial_Quotation" : "2_Technical_BoQ");

        const safeName = (app.projName || 'CDPK_System_Planner').replace(/[^a-zA-Z0-9_-]/g, '_');
        window.XLSX.writeFile(wb, `${safeName}_${isComm ? 'Commercial_Quotation' : 'Technical_BoQ'}.xlsx`);
    },

    exportCoveragePNG(canvasId, projName) {
        const c = document.getElementById(canvasId);
        if (!c) return;
        const link = document.createElement('a');
        link.download = `${(projName || 'CDPK_RF_Coverage').replace(/[^a-zA-Z0-9_-]/g, '_')}_Heatmap.png`;
        link.href = c.toDataURL('image/png');
        link.click();
    },

    exportGisCoveragePNG(app) {
        if (!app.gisMap) {
            alert(app.lang === 'en' ? 'GIS Map is not initialized yet.' : 'Peta GIS belum diinisialisasi.');
            return;
        }
        const map = app.gisMap;
        const mapContainer = document.getElementById('cdpkLeafletMap');
        if (!mapContainer) return;

        const size = map.getSize();
        const w = size.x;
        const h = size.y;
        const scaleFactor = 2.0; // Retina 2x

        const bannerHeaderH = 75;
        const bannerFooterH = 80;
        const totalW = w * scaleFactor;
        const totalH = (h + bannerHeaderH + bannerFooterH) * scaleFactor;

        const exportCanvas = document.createElement('canvas');
        exportCanvas.width = totalW;
        exportCanvas.height = totalH;
        const ctx = exportCanvas.getContext('2d');
        ctx.scale(scaleFactor, scaleFactor);

        // 1. Header Banner
        ctx.fillStyle = '#002b5c'; // PT Citradata Purnakharisma Corporate Blue
        ctx.fillRect(0, 0, w, bannerHeaderH);

        // Citradata Logo
        if (window.CDPK_LOGO_B64) {
            try {
                const logoImg = new Image();
                logoImg.src = window.CDPK_LOGO_B64;
                ctx.drawImage(logoImg, 16, 12, 38, 20);
            } catch (e) {}
        }

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 15px Inter, system-ui, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('PT CITRADATA PURNAKHARISMA (CDPK) — OUTDOOR GIS COVERAGE MAP', 64, 28);

        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 11px Inter, system-ui, sans-serif';
        const envLabel = {
            urbanL: 'Urban Metropolitan (Large City)',
            urbanS: 'Urban (Medium / Small City)',
            subS: 'Suburban / Industrial Park',
            openS: 'Open / Rural / Mining Area'
        }[app.covEnvProfile || 'urbanS'] || 'Urban Okumura-Hata';
        ctx.fillText(`Model: Okumura-Hata 450 MHz DMR  |  Profil: ${envLabel}  |  Frekuensi: ${app.covFreqMhz || 450} MHz`, 64, 46);

        ctx.fillStyle = '#cbd5e1';
        ctx.font = '10px Inter, system-ui, sans-serif';
        const proj = app.projName || 'CDPK DMR Project';
        const client = app.clientName || 'General Client';
        const dateStr = new Date().toLocaleDateString('id-ID');
        ctx.fillText(`Proyek: ${proj}   |   Klien: ${client}   |   Tanggal: ${dateStr}   |   Site Aktif: ${(app.gisSites || []).length}`, 64, 62);

        // 2. Map Snapshot Area
        ctx.save();
        ctx.translate(0, bannerHeaderH);
        ctx.rect(0, 0, w, h);
        ctx.clip();

        // Fill background
        ctx.fillStyle = (app.gisBasemap === 'sat' || app.gisBasemap === 'google_sat') ? '#1e293b' : '#f8fafc';
        ctx.fillRect(0, 0, w, h);

        // Draw visible map tiles
        const mapRect = mapContainer.getBoundingClientRect();
        const tileImgs = mapContainer.querySelectorAll('.leaflet-tile-pane img');
        let tilesRendered = 0;
        tileImgs.forEach(img => {
            if (img.complete && img.naturalWidth > 0) {
                const r = img.getBoundingClientRect();
                const dx = r.left - mapRect.left;
                const dy = r.top - mapRect.top;
                try {
                    ctx.drawImage(img, dx, dy, r.width, r.height);
                    tilesRendered++;
                } catch (e) {}
            }
        });

        // Fallback cartographic grid if tiles fail CORS
        if (tilesRendered === 0) {
            ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
            ctx.lineWidth = 1;
            for (let x = 0; x < w; x += 60) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
            }
            for (let y = 0; y < h; y += 60) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
            }
        }

        // Draw Coverage Circles for each site
        const sites = (app.gisSites && app.gisSites.length > 0) ? app.gisSites : [{ lat: app.covLat, lon: app.covLon, name: 'Site 1', color: '#0284c7' }];
        const hata = (typeof app.getOkumuraHataRadii === 'function') ? app.getOkumuraHataRadii() : { coreMeters: 2100, acceptMeters: 4000, fringeMeters: 7800, deadMeters: 15000 };
        const rings = [
            { key: 'dead', rMeters: hata.deadMeters, label: 'Dead-Zone Boundary (< -95 dBm)', alpha: 0.12, strokeWidth: 1.5, dash: [4, 4] },
            { key: 'fringe', rMeters: hata.fringeMeters, label: 'Fringe / Batas (≥ -95 dBm)', alpha: 0.25, strokeWidth: 2, dash: [6, 4] },
            { key: 'accept', rMeters: hata.acceptMeters, label: 'Acceptance Standard (≥ -85 dBm)', alpha: 0.45, strokeWidth: 2.2, dash: [] },
            { key: 'core', rMeters: hata.coreMeters, label: 'Core High-Coverage (≥ -75 dBm)', alpha: 0.70, strokeWidth: 2.5, dash: [] }
        ];

        sites.forEach((site, sIdx) => {
            const centerLatLng = L.latLng(site.lat, site.lon);
            const centerPt = map.latLngToContainerPoint(centerLatLng);
            const siteColor = site.color || '#0284c7';

            rings.forEach(ring => {
                const edgeLatLng = L.latLng(site.lat, site.lon + (ring.rMeters / (111320 * Math.cos(site.lat * Math.PI / 180))));
                const edgePt = map.latLngToContainerPoint(edgeLatLng);
                const radiusPx = Math.abs(edgePt.x - centerPt.x);

                ctx.save();
                ctx.beginPath();
                ctx.arc(centerPt.x, centerPt.y, radiusPx, 0, Math.PI * 2);
                ctx.fillStyle = siteColor;
                ctx.globalAlpha = (app.gisHeatmapOpacity || 0.50) * ring.alpha;
                ctx.fill();

                ctx.globalAlpha = 0.90;
                ctx.strokeStyle = siteColor;
                ctx.lineWidth = ring.strokeWidth;
                if (ring.dash.length > 0) ctx.setLineDash(ring.dash);
                ctx.stroke();
                ctx.restore();
            });

            // Draw Site Marker
            ctx.save();
            ctx.beginPath();
            ctx.arc(centerPt.x, centerPt.y, 14, 0, Math.PI * 2);
            ctx.fillStyle = siteColor;
            ctx.fill();
            ctx.lineWidth = 2.5;
            ctx.strokeStyle = '#ffffff';
            ctx.stroke();

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 11px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`R${sIdx + 1}`, centerPt.x, centerPt.y);

            // Site Label Pill above marker
            const siteLabel = `${site.name || 'Site ' + (sIdx + 1)}`;
            ctx.font = 'bold 10px Inter, sans-serif';
            const labelW = ctx.measureText(siteLabel).width + 12;
            ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
            ctx.fillRect(centerPt.x - labelW / 2, centerPt.y - 30, labelW, 18);
            ctx.strokeStyle = siteColor;
            ctx.lineWidth = 1;
            ctx.strokeRect(centerPt.x - labelW / 2, centerPt.y - 30, labelW, 18);
            ctx.fillStyle = '#ffffff';
            ctx.fillText(siteLabel, centerPt.x, centerPt.y - 21);
            ctx.restore();
        });

        // Metric Scale Bar
        const centerLat = map.getCenter().lat;
        const zoom = map.getZoom();
        const metersPerPx = 156543.03392 * Math.cos(centerLat * Math.PI / 180) / Math.pow(2, zoom);
        let scaleDistMeters = 5000;
        if (metersPerPx * 100 > 20000) scaleDistMeters = 20000;
        else if (metersPerPx * 100 > 10000) scaleDistMeters = 10000;
        else if (metersPerPx * 100 < 1500) scaleDistMeters = 1000;
        else if (metersPerPx * 100 < 500) scaleDistMeters = 500;

        const scaleBarPx = scaleDistMeters / metersPerPx;
        const sbX = w - scaleBarPx - 24;
        const sbY = h - 22;

        ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
        ctx.fillRect(sbX - 8, sbY - 18, scaleBarPx + 16, 28);
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(sbX, sbY - 2, scaleBarPx, 4);
        ctx.fillRect(sbX, sbY - 6, 2, 12);
        ctx.fillRect(sbX + scaleBarPx - 2, sbY - 6, 2, 12);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9.5px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${scaleDistMeters >= 1000 ? (scaleDistMeters / 1000) + ' km' : scaleDistMeters + ' m'}`, sbX + scaleBarPx / 2, sbY - 7);

        ctx.restore();

        // 3. Footer Legend Banner
        ctx.save();
        ctx.translate(0, bannerHeaderH + h);
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, w, bannerFooterH);

        // Legend Title
        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 10px Inter, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('LEGENDA ZONA SINYAL RF (OKUMURA-HATA DMR 450 MHz):', 16, 18);

        // Legend items
        const legItems = [
            { color: '#0284c7', label: `Core (≥ -75 dBm): ~${(hata.coreMeters / 1000).toFixed(1)} km`, desc: 'Heavy Indoor / Penetrasi Bangunan' },
            { color: '#10b981', label: `Acceptance (≥ -85 dBm): ~${(hata.acceptMeters / 1000).toFixed(1)} km`, desc: 'Indoor HT & Target Layanan' },
            { color: '#f59e0b', label: `Fringe (≥ -95 dBm): ~${(hata.fringeMeters / 1000).toFixed(1)} km`, desc: 'Outdoor Handheld / Mobil' },
            { color: '#ef4444', label: `Dead-Zone (≥ -105 dBm): ~${(hata.deadMeters / 1000).toFixed(1)} km`, desc: 'Batas Jangkauan Sensitivitas' }
        ];

        let legX = 16;
        legItems.forEach(item => {
            ctx.fillStyle = item.color;
            ctx.fillRect(legX, 26, 12, 12);
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1;
            ctx.strokeRect(legX, 26, 12, 12);

            ctx.fillStyle = '#f8fafc';
            ctx.font = 'bold 10px Inter, sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(item.label, legX + 18, 36);

            ctx.fillStyle = '#94a3b8';
            ctx.font = '8.5px Inter, sans-serif';
            ctx.fillText(item.desc, legX + 18, 48);

            legX += Math.max(160, Math.floor((w - 32) / 4));
        });

        // Multi-site GPS coordinate summary bar at very bottom
        ctx.fillStyle = '#64748b';
        ctx.font = '9px Inter, monospace';
        const siteCoordStr = sites.map((s, i) => `R${i + 1}: ${s.name || 'Site ' + (i + 1)} (${Number(s.lat).toFixed(4)}, ${Number(s.lon).toFixed(4)})`).join('  |  ');
        ctx.fillText(`KOORDINAT SITE: ${siteCoordStr}`, 16, 68);

        ctx.fillStyle = '#475569';
        ctx.font = '9px Inter, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText('PT Citradata Purnakharisma (CDPK) — System Planner Engineering Document', w - 16, 68);
        ctx.restore();

        // Trigger download
        try {
            const safeName = (app.projName || 'CDPK_GIS_Coverage').replace(/[^a-zA-Z0-9_-]/g, '_');
            const link = document.createElement('a');
            link.download = `${safeName}_Okumura_Hata_Map_2x.png`;
            link.href = exportCanvas.toDataURL('image/png');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            app.showToast(app.lang === 'en' ? 'High-Res GIS Coverage Map PNG exported!' : 'Peta GIS Okumura-Hata PNG (Retina 2x) berhasil diunduh!', 'success');
        } catch (err) {
            console.warn('Canvas export error:', err);
            app.showToast('Gagal ekspor gambar peta karena pembatasan tile layer. Gunakan opsi PDF.', 'error');
        }
    },

    exportGisCoveragePDF(app) {
        if (!window.jspdf || !window.jspdf.jsPDF) {
            alert(app.lang === 'en' ? 'jsPDF library is loading, please try again.' : 'Pustaka PDF sedang dimuat, silakan coba lagi.');
            return;
        }
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
        const isEn = app.lang === 'en';
        const sites = (app.gisSites && app.gisSites.length > 0) ? app.gisSites : [{ lat: app.covLat, lon: app.covLon, name: 'Site 1', color: '#0284c7' }];
        const hata = (typeof app.getOkumuraHataRadii === 'function') ? app.getOkumuraHataRadii() : { coreMeters: 2100, acceptMeters: 4000, fringeMeters: 7800, deadMeters: 15000, txDbm: 47.0, eirpDbm: 51.4 };

        // 1. Header Banner
        doc.setFillColor(0, 43, 92); // #002b5c
        doc.rect(0, 0, 297, 26, 'F');
        if (window.CDPK_LOGO_B64) {
            try {
                doc.addImage(window.CDPK_LOGO_B64, 'PNG', 12, 3.5, 32, 17);
            } catch (e) {}
        }
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('PT CITRADATA PURNAKHARISMA (CDPK) — ENGINEERING REPORT', 48, 11);

        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        const envLabel = {
            urbanL: 'Urban Metropolitan (Large City)',
            urbanS: 'Urban (Medium / Small City)',
            subS: 'Suburban / Industrial Park',
            openS: 'Open / Rural / Mining Area'
        }[app.covEnvProfile || 'urbanS'] || 'Urban Okumura-Hata';
        doc.text(`Outdoor GIS Coverage Simulation (Okumura-Hata 450 MHz DMR) | Profil: ${envLabel}`, 48, 17);
        doc.text(`Proyek: ${app.projName || 'Radio System'} | Klien: ${app.clientName || '-'} | Tanggal: ${new Date().toLocaleDateString('id-ID')}`, 48, 22);

        // 2. Technical Parameters Card (Left side, Y: 30)
        doc.setFillColor(241, 245, 249);
        doc.rect(12, 30, 95, 76, 'F');
        doc.setDrawColor(203, 213, 225);
        doc.rect(12, 30, 95, 76, 'S');

        doc.setTextColor(15, 23, 42);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('Parameter Link Budget & Model Okumura-Hata', 16, 36);

        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        let py = 43;
        const addParamRow = (label, val) => {
            doc.setTextColor(100, 116, 139);
            doc.text(label, 16, py);
            doc.setTextColor(15, 23, 42);
            doc.setFont('helvetica', 'bold');
            doc.text(String(val), 102, py, { align: 'right' });
            doc.setFont('helvetica', 'normal');
            py += 5.5;
        };

        addParamRow('Frekuensi Pembawa (f)', `${app.covFreqMhz || 450} MHz (DMR UHF)`);
        addParamRow('Tinggi Tower Base Station (hb)', `${app.covTowerHeight || 35} m`);
        addParamRow('Tinggi Antena HT Mobile (hm)', `${app.covMobileHeight || 1.5} m`);
        addParamRow('Daya Pancar Repeater (TX)', `${app.covTxWatts || 50} W (${hata.txDbm} dBm)`);
        addParamRow('Antenna Gain (Base / HT)', `${app.covAntGainDbi || 6.5} dBi / 2.15 dBi`);
        addParamRow('Cable / Feeder Loss', `${app.covCableLossDb || 2.1} dB`);
        addParamRow('Total EIRP Base Station', `${hata.eirpDbm} dBm`);
        addParamRow('Profil Lingkungan', envLabel);

        // Radii Summary Box (Below Parameters, Y: 110)
        doc.setFillColor(238, 242, 255);
        doc.rect(12, 110, 95, 54, 'F');
        doc.setDrawColor(199, 210, 254);
        doc.rect(12, 110, 95, 54, 'S');

        doc.setTextColor(30, 58, 138);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('Radius Jangkauan Okumura-Hata Terhitung', 16, 116);

        doc.setFontSize(8);
        let ry = 123;
        const addRadiusRow = (colorBox, label, val, desc) => {
            doc.setFillColor(colorBox[0], colorBox[1], colorBox[2]);
            doc.rect(16, ry - 3, 3, 3, 'F');
            doc.setTextColor(15, 23, 42);
            doc.setFont('helvetica', 'bold');
            doc.text(label, 22, ry);
            doc.text(val, 102, ry, { align: 'right' });
            doc.setTextColor(100, 116, 139);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(7);
            doc.text(desc, 22, ry + 3.5);
            doc.setFontSize(8);
            ry += 8.5;
        };

        addRadiusRow([2, 132, 199], 'Core (≥ -75 dBm)', `~${(hata.coreMeters / 1000).toFixed(1)} km`, 'Heavy In-Building Penetration');
        addRadiusRow([16, 185, 129], 'Acceptance (≥ -85 dBm)', `~${(hata.acceptMeters / 1000).toFixed(1)} km`, 'Indoor HT & Target Kinerja Standar');
        addRadiusRow([245, 158, 11], 'Fringe (≥ -95 dBm)', `~${(hata.fringeMeters / 1000).toFixed(1)} km`, 'Outdoor Handheld & Mobile Radio');
        addRadiusRow([239, 68, 68], 'Dead-Zone (≥ -105 dBm)', `~${(hata.deadMeters / 1000).toFixed(1)} km`, 'Batas Sensitivitas Penerima DMR');

        // 3. Map Canvas Rendering on Right Side (X: 112, Y: 30, Width: 173, Height: 134)
        const mapContainer = document.getElementById('cdpkLeafletMap');
        if (mapContainer && app.gisMap) {
            try {
                const size = app.gisMap.getSize();
                const off = document.createElement('canvas');
                off.width = size.x;
                off.height = size.y;
                const oCtx = off.getContext('2d');
                
                oCtx.fillStyle = '#f8fafc';
                oCtx.fillRect(0, 0, size.x, size.y);

                const mapRect = mapContainer.getBoundingClientRect();
                const tileImgs = mapContainer.querySelectorAll('.leaflet-tile-pane img');
                tileImgs.forEach(img => {
                    if (img.complete && img.naturalWidth > 0) {
                        const r = img.getBoundingClientRect();
                        try { oCtx.drawImage(img, r.left - mapRect.left, r.top - mapRect.top, r.width, r.height); } catch(e){}
                    }
                });

                const rings = [
                    { rMeters: hata.deadMeters, color: '#ef4444', alpha: 0.15 },
                    { rMeters: hata.fringeMeters, color: '#f59e0b', alpha: 0.30 },
                    { rMeters: hata.acceptMeters, color: '#10b981', alpha: 0.50 },
                    { rMeters: hata.coreMeters, color: '#0284c7', alpha: 0.70 }
                ];

                sites.forEach((site, sIdx) => {
                    const centerPt = app.gisMap.latLngToContainerPoint(L.latLng(site.lat, site.lon));
                    const sColor = site.color || '#0284c7';
                    rings.forEach(ring => {
                        const edgePt = app.gisMap.latLngToContainerPoint(L.latLng(site.lat, site.lon + (ring.rMeters / (111320 * Math.cos(site.lat * Math.PI / 180)))));
                        const radiusPx = Math.abs(edgePt.x - centerPt.x);
                        oCtx.save();
                        oCtx.beginPath();
                        oCtx.arc(centerPt.x, centerPt.y, radiusPx, 0, Math.PI * 2);
                        oCtx.fillStyle = sColor;
                        oCtx.globalAlpha = ring.alpha;
                        oCtx.fill();
                        oCtx.strokeStyle = sColor;
                        oCtx.lineWidth = 2;
                        oCtx.globalAlpha = 0.9;
                        oCtx.stroke();
                        oCtx.restore();
                    });

                    // Marker
                    oCtx.save();
                    oCtx.beginPath();
                    oCtx.arc(centerPt.x, centerPt.y, 14, 0, Math.PI * 2);
                    oCtx.fillStyle = sColor;
                    oCtx.fill();
                    oCtx.strokeStyle = '#ffffff';
                    oCtx.lineWidth = 2.5;
                    oCtx.stroke();
                    oCtx.fillStyle = '#ffffff';
                    oCtx.font = 'bold 11px sans-serif';
                    oCtx.textAlign = 'center';
                    oCtx.textBaseline = 'middle';
                    oCtx.fillText(`R${sIdx + 1}`, centerPt.x, centerPt.y);
                    oCtx.restore();
                });

                const imgData = off.toDataURL('image/png');
                doc.addImage(imgData, 'PNG', 112, 30, 173, 134);
                doc.setDrawColor(203, 213, 225);
                doc.rect(112, 30, 173, 134, 'S');
            } catch (e) {
                console.warn('PDF map image embed error:', e);
            }
        }

        // 4. Multi-Site Registry Table (Bottom Y: 168)
        const siteRows = sites.map((s, idx) => [
            `R${idx + 1}`,
            s.name || `Site ${idx + 1}`,
            `${Number(s.lat).toFixed(4)}, ${Number(s.lon).toFixed(4)}`,
            `${s.towerHeight || app.covTowerHeight || 35} m`,
            `${s.txWatts || app.covTxWatts || 50} W`,
            `~${(hata.acceptMeters / 1000).toFixed(1)} km`,
            `~${(hata.fringeMeters / 1000).toFixed(1)} km`,
            'Operational'
        ]);

        doc.autoTable({
            startY: 168,
            head: [['Site', 'Nama Base Station', 'Koordinat GPS (Lat, Lon)', 'Tinggi Tower', 'Daya TX', 'Radius Acceptance', 'Batas Fringe', 'Status']],
            body: siteRows,
            styles: { fontSize: 7.5, cellPadding: 1.5, font: 'helvetica' },
            headStyles: { fillColor: [0, 43, 92], textColor: 255, fontStyle: 'bold' },
            margin: { left: 12, right: 12 }
        });

        // Sign-off footer
        doc.setTextColor(148, 163, 184);
        doc.setFontSize(7.5);
        doc.text('PT Citradata Purnakharisma (CDPK) • Standar Perhitungan Propagasi RF Berdasarkan Okumura-Hata Model • Dokumen Rekayasa Tender Resmi', 12, 204);

        const safeName = (app.projName || 'CDPK_GIS_Coverage').replace(/[^a-zA-Z0-9_-]/g, '_');
        doc.save(`${safeName}_Okumura_Hata_Technical_Report.pdf`);
        app.showToast(isEn ? 'Official GIS Technical Report PDF exported!' : 'Dokumen Laporan Teknis GIS PDF berhasil diunduh!', 'success');
    },

    async exportGisCoverageKML(app, options = {}) {
        if (!window.CDPK_GIS_ENGINE || typeof window.CDPK_GIS_ENGINE.exportKmlOrKmz !== 'function') {
            app.showToast(app.lang === 'en' ? 'GIS Engine is not available.' : 'Engine GIS belum siap.', 'error');
            return;
        }
        const format = options.format || 'kml';
        try {
            app.gisExportingKml = true;
            const res = await window.CDPK_GIS_ENGINE.exportKmlOrKmz(app, { format });
            const msg = app.lang === 'en'
                ? `Outdoor GIS Coverage (${res.format.toUpperCase()}) exported successfully!`
                : `Kontur Poligon GIS (${res.format.toUpperCase()}) untuk Google Earth & ArcGIS berhasil diekspor!`;
            app.showToast(msg, 'success');
        } catch (e) {
            console.error('KML Export failed:', e);
            app.showToast(app.lang === 'en' ? 'Export failed: ' + e.message : 'Gagal mengekspor berkas: ' + e.message, 'error');
        } finally {
            app.gisExportingKml = false;
        }
    },

    exportPackagesPDF(app) {
        if (!window.jspdf || !window.jspdf.jsPDF) {
            alert(app.lang === 'en' ? 'PDF library is loading, please try again.' : 'Pustaka PDF sedang dimuat, silakan coba lagi.');
            return;
        }
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
        const isEn = app.lang === 'en';
        const summary = app.getPackagesGrandSummary();

        // Header Banner
        doc.setFillColor(0, 43, 92);
        doc.rect(0, 0, 297, 26, 'F');
        if (window.CDPK_LOGO_B64) {
            try {
                doc.addImage(window.CDPK_LOGO_B64, 'PNG', 12, 3.5, 32, 17);
            } catch (e) {}
        }
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('PT CITRADATA PURNAKHARISMA — CITRADATA GROUP', 50, 11);

        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.text(
            `${isEn ? 'System & Product Quotation' : 'Dokumen Penawaran Konfigurasi Produk & Sistem Radio'}  |  ${isEn ? 'Project' : 'Proyek'}: ${app.projName || 'Radio System'}  |  ${isEn ? 'Client' : 'Klien'}: ${app.clientName || '-'}  |  ${new Date().toLocaleDateString('id-ID')}`,
            50, 18
        );

        // Metadata Bar
        doc.setTextColor(15, 23, 42);
        doc.setFontSize(8.5);
        doc.setFont('helvetica', 'bold');
        doc.text(
            `Total Paket: ${summary.totalPackages}   |   Total Radio/Repeater: ${summary.totalMainUnits} Unit   |   Total Add-on: ${summary.totalAddons} Item   |   PIC: ${app.salesPic || 'Presales Team'}`,
            12, 33
        );

        // Build Table Rows
        const rows = [];
        let num = 1;
        (app.systemPackages || []).forEach(pkg => {
            const bom = app.calculatePackageBom(pkg);
            // Package Header Row
            rows.push([
                String(num++),
                `[PAKET] ${pkg.name}`,
                pkg.category === 'ht' ? 'Portable Radio Fleet' : 'Repeater Base Station',
                pkg.mainSku,
                '-',
                '-',
                '-',
                app.formatCurrency(app.currency === 'USD' ? bom.totalSellUsd : bom.totalSellIdr)
            ]);

            // Child BOM Rows
            bom.items.forEach(it => {
                const unitP = app.currency === 'USD' ? it.sellUsd : it.sellIdr;
                const lineT = app.currency === 'USD' ? (it.subtotalSellUsd || unitP * it.qty) : (it.subtotalSellIdr || unitP * it.qty);
                rows.push([
                    "",
                    `  ↳ ${it.isMain ? '★ Unit Utama' : '• Add-on'}`,
                    it.name,
                    it.sku,
                    String(it.qty),
                    it.unit || 'Unit',
                    app.formatCurrency(unitP),
                    app.formatCurrency(lineT)
                ]);
            });
        });

        if (doc.autoTable) {
            doc.autoTable({
                startY: 37,
                head: [[
                    'No',
                    isEn ? 'Package / Component' : 'Paket / Komponen',
                    isEn ? 'Description' : 'Deskripsi',
                    'SKU / Part No',
                    'Qty',
                    isEn ? 'Unit' : 'Satuan',
                    isEn ? 'Unit Price' : 'Harga Satuan',
                    isEn ? 'Subtotal' : 'Subtotal'
                ]],
                body: rows,
                theme: 'striped',
                headStyles: { fillColor: [0, 56, 117], textColor: 255, fontSize: 8, fontStyle: 'bold' },
                bodyStyles: { fontSize: 7.5, cellPadding: 1.8 },
                columnStyles: {
                    0: { cellWidth: 10, halign: 'center' },
                    1: { cellWidth: 50 },
                    2: { cellWidth: 70 },
                    3: { cellWidth: 32 },
                    4: { cellWidth: 12, halign: 'center' },
                    5: { cellWidth: 15, halign: 'center' },
                    6: { cellWidth: 36, halign: 'right' },
                    7: { cellWidth: 38, halign: 'right', fontStyle: 'bold' }
                },
                didParseCell: (data) => {
                    if (data.row.raw && data.row.raw[1] && data.row.raw[1].startsWith('[PAKET]')) {
                        data.cell.styles.fillColor = [224, 238, 255];
                        data.cell.styles.fontStyle = 'bold';
                        data.cell.styles.textColor = [0, 43, 92];
                    }
                }
            });

            // Grand Total Footer Box
            const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 6 : 160;
            doc.setFillColor(248, 250, 252);
            doc.rect(170, finalY, 115, 24, 'F');
            doc.setDrawColor(203, 213, 225);
            doc.rect(170, finalY, 115, 24, 'S');

            doc.setFontSize(8);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(71, 85, 105);
            doc.text(`Subtotal Paket: ${app.formatCurrency(app.currency === 'USD' ? summary.grandSellUsd : summary.grandSellIdr)}`, 175, finalY + 6);
            doc.text(`PPN (${app.ppnPercent}%): ${app.formatCurrency((app.currency === 'USD' ? summary.grandSellUsd : summary.grandSellIdr) * (app.ppnPercent / 100))}`, 175, finalY + 12);

            doc.setFontSize(9.5);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 43, 92);
            const grandWithTax = (app.currency === 'USD' ? summary.grandSellUsd : summary.grandSellIdr) * (1.0 + app.ppnPercent / 100);
            doc.text(`GRAND TOTAL: ${app.formatCurrency(grandWithTax)}`, 175, finalY + 19);
        }

        const safeName = (app.projName || 'CDPK_Paket_Sistem').replace(/[^a-zA-Z0-9_-]/g, '_');
        doc.save(`${safeName}_Penawaran_Sistem.pdf`);
    },

    exportPackagesXLSX(app) {
        if (!window.XLSX) {
            alert(app.lang === 'en' ? 'Excel library is loading, please try again.' : 'Pustaka Excel sedang dimuat, silakan coba lagi.');
            return;
        }
        const wb = window.XLSX.utils.book_new();
        const isEn = app.lang === 'en';
        const summary = app.getPackagesGrandSummary();

        const aoa = [
            ["CDPK SYSTEM PLANNER — PAKET PRODUK & SISTEM TERKONFIGURASI"],
            ["PT Citradata Purnakharisma | Citradata Group"],
            [],
            ["Informasi Proyek:"],
            ["Nama Proyek", app.projName || "-"],
            ["Nama Klien", app.clientName || "-"],
            ["Lokasi", app.projLocation || "-"],
            ["Sales PIC", app.salesPic || "-"],
            ["Mata Uang", app.currency || "IDR"],
            ["Kurs USD-IDR", app.exchangeRate || 16200],
            ["PPN %", `${app.ppnPercent}%`],
            ["Tanggal Export", new Date().toLocaleDateString('id-ID')],
            [],
            ["No", "Paket Sistem", "Kategori", "SKU / Part No", "Deskripsi Komponen / Add-on", "Qty", "Satuan", "Harga Satuan", "Subtotal", "Keterangan"]
        ];

        let num = 1;
        (app.systemPackages || []).forEach(pkg => {
            const bom = app.calculatePackageBom(pkg);
            aoa.push([
                num++,
                pkg.name,
                pkg.category === 'ht' ? 'Handy Talky Fleet' : 'Repeater Base Station',
                pkg.mainSku,
                `Total ${bom.items.length} Komponen Sistem`,
                pkg.quantity,
                'Paket',
                Math.round(app.currency === 'USD' ? bom.totalSellUsd : bom.totalSellIdr),
                Math.round(app.currency === 'USD' ? bom.totalSellUsd : bom.totalSellIdr),
                "Paket Induk"
            ]);

            bom.items.forEach(it => {
                const unitP = app.currency === 'USD' ? it.sellUsd : it.sellIdr;
                const lineT = app.currency === 'USD' ? (it.subtotalSellUsd || unitP * it.qty) : (it.subtotalSellIdr || unitP * it.qty);
                aoa.push([
                    "",
                    "  ↳ Sub-BOM",
                    it.category,
                    it.sku,
                    it.name,
                    it.qty,
                    it.unit || "Unit",
                    Math.round(unitP),
                    Math.round(lineT),
                    it.isMain ? "Unit Utama" : "Add-on Komponen"
                ]);
            });
            aoa.push([]);
        });

        const subtotal = app.currency === 'USD' ? summary.grandSellUsd : summary.grandSellIdr;
        const ppnVal = subtotal * (app.ppnPercent / 100);
        const grandTotalVal = subtotal + ppnVal;

        aoa.push(["", "", "", "", "SUBTOTAL PAKET SISTEM", "", "", "", Math.round(subtotal)]);
        aoa.push(["", "", "", "", `PPN (${app.ppnPercent}%)`, "", "", "", Math.round(ppnVal)]);
        aoa.push(["", "", "", "", "GRAND TOTAL INVESTASI", "", "", "", Math.round(grandTotalVal)]);

        const ws = window.XLSX.utils.aoa_to_sheet(aoa);
        window.XLSX.utils.book_append_sheet(wb, ws, "Paket_Produk_dan_Sistem");

        const safeName = (app.projName || 'CDPK_Paket_Sistem').replace(/[^a-zA-Z0-9_-]/g, '_');
        window.XLSX.writeFile(wb, `${safeName}_Paket_Sistem.xlsx`);
    }
};
