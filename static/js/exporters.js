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
            `PT Citra Data Purnama Karya  |  ${isEn ? 'Project' : 'Proyek'}: ${app.projName || 'Radio & Security System'}  |  ${isEn ? 'Client' : 'Klien'}: ${app.clientName || '-'}  |  ${new Date().toLocaleDateString()}`,
            52, 20
        );

        // Sizing Summary Box
        doc.setTextColor(15, 23, 42);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text(
            `${isEn ? 'Topology' : 'Topologi'}: ${s.topologyName}   |   ${isEn ? 'Outdoor Sites' : 'Site Outdoor'}: ${s.outdoorSites} (${s.totalOutdoorRepeaters}x SLR 5300)   |   DAS: ${s.dasNodes}x SLR 1000   |   ${isEn ? 'Subscribers' : 'Total User'}: ${app.userCount} (${s.htQty} HT + ${s.mobileQty} Mobile)`,
            12, 35
        );

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
            startY: 39,
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
                12, finalY - 6
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
    }
};
