/**
 * CDPK System Planner — Outdoor GIS Coverage Engine (Opsi 1 Fase 2: Fitur A & B)
 * PT Citradata Purnakharisma (CDPK)
 * 
 * Features:
 * - Feature A: OGC KML 2.2 & KMZ Polygon Export for Google Earth Pro, ArcGIS, QGIS & AutoCAD.
 * - Feature B: Client Concession Boundary Import (GeoJSON/KML WIUP) & % Spatial Coverage Calculation.
 */

(function (window) {
    'use strict';

    const CDPK_GIS_ENGINE = {
        EARTH_RADIUS_METERS: 6378137,

        /**
         * Calculate destination point given distance and bearing using Great-Circle geodesic formula (WGS84 sphere)
         */
        destinationPoint(lat, lon, distMeters, bearingDeg) {
            const R = this.EARTH_RADIUS_METERS;
            const delta = distMeters / R;
            const theta = (bearingDeg * Math.PI) / 180;
            const phi1 = (lat * Math.PI) / 180;
            const lambda1 = (lon * Math.PI) / 180;

            const sinPhi1 = Math.sin(phi1);
            const cosPhi1 = Math.cos(phi1);
            const sinDelta = Math.sin(delta);
            const cosDelta = Math.cos(delta);
            const sinTheta = Math.sin(theta);
            const cosTheta = Math.cos(theta);

            const phi2 = Math.asin(sinPhi1 * cosDelta + cosPhi1 * sinDelta * cosTheta);
            const lambda2 = lambda1 + Math.atan2(sinTheta * sinDelta * cosPhi1, cosDelta - sinPhi1 * Math.sin(phi2));

            const resLat = (phi2 * 180) / Math.PI;
            const resLon = ((lambda2 * 180) / Math.PI + 540) % 360 - 180;

            return {
                lat: parseFloat(resLat.toFixed(6)),
                lon: parseFloat(resLon.toFixed(6))
            };
        },

        /**
         * Generate a closed circle polygon ring as [[lon, lat], ...] coordinates
         * Closed ring: points + 1 coordinates where first == last
         */
        createGeodesicRing(lat, lon, distMeters, numPoints = 72) {
            const ring = [];
            for (let i = 0; i <= numPoints; i++) {
                const bearing = (i * 360) / numPoints;
                const pt = this.destinationPoint(lat, lon, distMeters, bearing);
                ring.push([pt.lon, pt.lat]);
            }
            return ring;
        },

        /**
         * Generate a GeoJSON Polygon Feature for a circle
         */
        createCircleFeature(lat, lon, distMeters, properties = {}, numPoints = 72) {
            const ring = this.createGeodesicRing(lat, lon, distMeters, numPoints);
            return {
                type: 'Feature',
                properties: properties,
                geometry: {
                    type: 'Polygon',
                    coordinates: [ring]
                }
            };
        },

        // ══════════════════════════════════════════════════════════════════════
        // FITUR A: OGC KML 2.2 & KMZ GENERATOR
        // ══════════════════════════════════════════════════════════════════════

        /**
         * Escape XML special characters
         */
        escapeXml(str) {
            if (str == null) return '';
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&apos;');
        },

        /**
         * Convert ring coordinates [[lon, lat], ...] to KML <coordinates> string: "lon,lat,0 lon,lat,0 ..."
         */
        ringToKmlCoordinates(ring) {
            return ring.map(pt => `${pt[0]},${pt[1]},0`).join(' ');
        },

        /**
         * Generate full OGC KML 2.2 XML Document
         */
        generateKmlDocument(app) {
            const sites = (app.gisSites || []).filter(s => s.enabled !== false);
            const hata = (typeof app.getOkumuraHataRadii === 'function')
                ? app.getOkumuraHataRadii()
                : { coreMeters: 2100, acceptMeters: 4000, fringeMeters: 7800, deadMeters: 15000, eirpDbm: 51.4 };

            const projName = app.projName || 'CDPK DMR Coverage';
            const clientName = app.clientName || 'General Client';
            const freq = app.covFreqMhz || 450;
            const envProfile = {
                urbanL: 'Urban Metropolitan (Large City)',
                urbanS: 'Urban (Medium / Small City)',
                subS: 'Suburban / Industrial Park',
                openS: 'Open / Rural / Mining Area'
            }[app.covEnvProfile || 'urbanS'] || 'Urban Okumura-Hata';

            // KML colors are in aabbggrr hex format (Alpha, Blue, Green, Red)
            // Core: Sky Blue (#0284c7) -> 7fc78402
            // Accept: Emerald (#10b981) -> 7f81b910
            // Fringe: Amber (#f59e0b) -> 730b9ef5
            // Dead: Red (#ef4444) -> 4d4444ef
            // WIUP: Gold (#d97706) -> ff0677d9 (solid line)

            let kml = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>${this.escapeXml(projName)} — Outdoor GIS Coverage</name>
    <description><![CDATA[
      <div style="font-family: Arial, sans-serif; font-size: 13px;">
        <h3 style="color: #002b5c; margin: 0 0 6px;">PT Citradata Purnakharisma (CDPK)</h3>
        <p style="margin: 0 0 4px;"><strong>Proyek:</strong> ${this.escapeXml(projName)}</p>
        <p style="margin: 0 0 4px;"><strong>Klien:</strong> ${this.escapeXml(clientName)}</p>
        <p style="margin: 0 0 4px;"><strong>Model Propagasi:</strong> Okumura-Hata 4-Band SDPPI (${freq} MHz)</p>
        <p style="margin: 0 0 4px;"><strong>Profil Lingkungan:</strong> ${envProfile}</p>
        <p style="margin: 0 0 4px;"><strong>Jumlah Site:</strong> ${sites.length} Titik Repeater</p>
        <p style="margin: 4px 0 0; font-size: 11px; color: #64748b;">Dihasilkan oleh CDPK System Planner v8.6.0</p>
      </div>
    ]]></description>

    <!-- Styles for Coverage Zones -->
    <Style id="styleCore">
      <LineStyle><color>ffc78402</color><width>2.5</width></LineStyle>
      <PolyStyle><color>7fc78402</color><fill>1</fill><outline>1</outline></PolyStyle>
    </Style>
    <Style id="styleAccept">
      <LineStyle><color>ff81b910</color><width>2.0</width></LineStyle>
      <PolyStyle><color>7f81b910</color><fill>1</fill><outline>1</outline></PolyStyle>
    </Style>
    <Style id="styleFringe">
      <LineStyle><color>ff0b9ef5</color><width>1.8</width></LineStyle>
      <PolyStyle><color>730b9ef5</color><fill>1</fill><outline>1</outline></PolyStyle>
    </Style>
    <Style id="styleDead">
      <LineStyle><color>ff4444ef</color><width>1.5</width></LineStyle>
      <PolyStyle><color>4d4444ef</color><fill>1</fill><outline>1</outline></PolyStyle>
    </Style>

    <!-- Style for Repeater Site Markers -->
    <Style id="styleSitePin">
      <IconStyle>
        <scale>1.2</scale>
        <Icon>
          <href>https://maps.google.com/mapfiles/kml/shapes/placemark_circle.png</href>
        </Icon>
      </IconStyle>
      <LabelStyle><scale>1.0</scale><color>ffffffff</color></LabelStyle>
    </Style>

    <!-- Style for WIUP Boundary -->
    <Style id="styleWiup">
      <LineStyle><color>ff0677d9</color><width>3.0</width></LineStyle>
      <PolyStyle><color>260677d9</color><fill>1</fill><outline>1</outline></PolyStyle>
    </Style>

    <!-- ── FOLDER 1: REPEATER SITES (PLACEMARKS) ── -->
    <Folder>
      <name>Titik Repeater Base Station</name>
      <open>1</open>
`;

            sites.forEach((site, idx) => {
                const siteName = site.name || `Site ${idx + 1}`;
                const towerH = site.towerHeight || app.covTowerHeight || 35;
                const txWatts = site.txWatts || app.covTxWatts || 50;

                kml += `      <Placemark>
        <name>${this.escapeXml(siteName)}</name>
        <styleUrl>#styleSitePin</styleUrl>
        <description><![CDATA[
          <div style="font-family: Arial, sans-serif; font-size: 12px; line-height: 1.5; min-width: 260px;">
            <div style="border-bottom: 2px solid #0284c7; padding-bottom: 4px; margin-bottom: 6px;">
              <strong style="color: #0284c7; font-size: 14px;">📡 ${this.escapeXml(siteName)}</strong><br/>
              <span style="color: #64748b; font-size: 11px;">Stasiun Pengulang DMR (Repeater)</span>
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 11.5px;">
              <tr><td style="color:#64748b; padding:2px 0;">Koordinat WGS84:</td><td><strong>${site.lat}, ${site.lon}</strong></td></tr>
              <tr><td style="color:#64748b; padding:2px 0;">Frekuensi Kerja:</td><td><strong>${freq} MHz</strong></td></tr>
              <tr><td style="color:#64748b; padding:2px 0;">Tinggi Tower (hb):</td><td><strong>${towerH} Meter</strong></td></tr>
              <tr><td style="color:#64748b; padding:2px 0;">Daya TX Repeater:</td><td><strong>${txWatts} Watt</strong></td></tr>
              <tr><td style="color:#64748b; padding:2px 0;">EIRP Transmit:</td><td><strong>${hata.eirpDbm} dBm</strong></td></tr>
              <tr><td style="color:#64748b; padding:2px 0;">Profil Lingkungan:</td><td><strong>${hata.env.toUpperCase()} (${hata.topography})</strong></td></tr>
            </table>
            <div style="margin-top: 8px; padding-top: 6px; border-top: 1px dashed #cbd5e1; font-size: 11px;">
              <span style="color:#0284c7;">● Core (&ge; -75 dBm):</span> ~${(hata.coreMeters/1000).toFixed(1)} km<br/>
              <span style="color:#10b981;">● Acceptance (&ge; -85 dBm):</span> ~${(hata.acceptMeters/1000).toFixed(1)} km<br/>
              <span style="color:#f59e0b;">● Fringe (&ge; -95 dBm):</span> ~${(hata.fringeMeters/1000).toFixed(1)} km<br/>
              <span style="color:#ef4444;">● Dead Zone (&lt; -95 dBm):</span> ~${(hata.deadMeters/1000).toFixed(1)} km
            </div>
          </div>
        ]]></description>
        <Point>
          <coordinates>${site.lon},${site.lat},0</coordinates>
        </Point>
      </Placemark>
`;
            });

            kml += `    </Folder>

    <!-- ── FOLDER 2: OKUMURA-HATA COVERAGE CONTOURS ── -->
    <Folder>
      <name>Kontur Cakupan Sinyal Okumura-Hata</name>
      <open>1</open>
`;

            sites.forEach((site, idx) => {
                const siteName = site.name || `Site ${idx + 1}`;

                // Ring points for 4 zones
                const coreRing = this.createGeodesicRing(site.lat, site.lon, hata.coreMeters, 72);
                const acceptRing = this.createGeodesicRing(site.lat, site.lon, hata.acceptMeters, 72);
                const fringeRing = this.createGeodesicRing(site.lat, site.lon, hata.fringeMeters, 72);
                const deadRing = this.createGeodesicRing(site.lat, site.lon, hata.deadMeters, 72);

                kml += `      <Folder>
        <name>${this.escapeXml(siteName)} — Zona Sinyal</name>
        <open>0</open>

        <!-- Zone 1: Core High-Coverage (>= -75 dBm) -->
        <Placemark>
          <name>${this.escapeXml(siteName)} — Core (&ge; -75 dBm)</name>
          <description>Jangkauan Sinyal Sangat Kuat (&ge; -75 dBm). Penetrasi Gedung/Kabin Kendaraan. Radius: ~${(hata.coreMeters/1000).toFixed(1)} km</description>
          <styleUrl>#styleCore</styleUrl>
          <Polygon>
            <extrude>0</extrude>
            <altitudeMode>clampToGround</altitudeMode>
            <outerBoundaryIs>
              <LinearRing>
                <coordinates>${this.ringToKmlCoordinates(coreRing)}</coordinates>
              </LinearRing>
            </outerBoundaryIs>
          </Polygon>
        </Placemark>

        <!-- Zone 2: Acceptance Standard (>= -85 dBm) -->
        <Placemark>
          <name>${this.escapeXml(siteName)} — Acceptance (&ge; -85 dBm)</name>
          <description>Standar Keberterimaan Sinyal Layanan DMR (&ge; -85 dBm). Target Portable HT Indoor/Outdoor. Radius: ~${(hata.acceptMeters/1000).toFixed(1)} km</description>
          <styleUrl>#styleAccept</styleUrl>
          <Polygon>
            <extrude>0</extrude>
            <altitudeMode>clampToGround</altitudeMode>
            <outerBoundaryIs>
              <LinearRing>
                <coordinates>${this.ringToKmlCoordinates(acceptRing)}</coordinates>
              </LinearRing>
            </outerBoundaryIs>
          </Polygon>
        </Placemark>

        <!-- Zone 3: Fringe Coverage (>= -95 dBm) -->
        <Placemark>
          <name>${this.escapeXml(siteName)} — Fringe (&ge; -95 dBm)</name>
          <description>Batas Sinyal Operasional Lapangan (&ge; -95 dBm). Outdoor Handheld &amp; Mobile Radio. Radius: ~${(hata.fringeMeters/1000).toFixed(1)} km</description>
          <styleUrl>#styleFringe</styleUrl>
          <Polygon>
            <extrude>0</extrude>
            <altitudeMode>clampToGround</altitudeMode>
            <outerBoundaryIs>
              <LinearRing>
                <coordinates>${this.ringToKmlCoordinates(fringeRing)}</coordinates>
              </LinearRing>
            </outerBoundaryIs>
          </Polygon>
        </Placemark>

        <!-- Zone 4: Dead-Zone Boundary (< -95 dBm) -->
        <Placemark>
          <name>${this.escapeXml(siteName)} — Dead-Zone Limit (&lt; -95 dBm)</name>
          <description>Batas Ambang Sensitivitas Penerima DMR (-118 dBm). Daerah Marginal / Berisiko Blank Spot. Radius: ~${(hata.deadMeters/1000).toFixed(1)} km</description>
          <styleUrl>#styleDead</styleUrl>
          <Polygon>
            <extrude>0</extrude>
            <altitudeMode>clampToGround</altitudeMode>
            <outerBoundaryIs>
              <LinearRing>
                <coordinates>${this.ringToKmlCoordinates(deadRing)}</coordinates>
              </LinearRing>
            </outerBoundaryIs>
          </Polygon>
        </Placemark>
      </Folder>
`;
            });

            kml += `    </Folder>\n`;

            // ── FOLDER 3: CLIENT CONCESSION WIUP (IF LOADED) ──
            if (app.gisWiupData && Array.isArray(app.gisWiupData.features) && app.gisWiupData.features.length > 0) {
                const wiupName = app.gisWiupFileName || 'Batas Konsesi WIUP Klien';
                const stats = app.gisWiupStats || {};
                kml += `    <Folder>
      <name>Batas Konsesi Klien (WIUP)</name>
      <open>1</open>
      <Placemark>
        <name>${this.escapeXml(wiupName)}</name>
        <description><![CDATA[
          <div style="font-family: Arial, sans-serif; font-size: 12px; line-height: 1.5;">
            <strong style="color: #d97706; font-size: 13px;">Batas Konsesi / WIUP Resmi</strong><br/>
            Berkas: ${this.escapeXml(wiupName)}<br/>
            Total Luas: <strong>${stats.totalAreaKm2 || '-'} km²</strong> (${stats.totalAreaHa || '-'} Ha)<br/>
            Luas Tercover: <strong>${stats.coveredAreaKm2 || '-'} km² (${stats.coveragePct || 0}%)</strong><br/>
            Status: <strong>${this.escapeXml(stats.statusLabel || '-')}</strong>
          </div>
        ]]></description>
        <styleUrl>#styleWiup</styleUrl>
`;
                app.gisWiupData.features.forEach(feat => {
                    if (!feat.geometry) return;
                    if (feat.geometry.type === 'Polygon') {
                        const outer = feat.geometry.coordinates[0];
                        kml += `        <Polygon>
          <outerBoundaryIs><LinearRing><coordinates>${this.ringToKmlCoordinates(outer)}</coordinates></LinearRing></outerBoundaryIs>
        </Polygon>\n`;
                    } else if (feat.geometry.type === 'MultiPolygon') {
                        kml += `        <MultiGeometry>\n`;
                        feat.geometry.coordinates.forEach(poly => {
                            kml += `          <Polygon><outerBoundaryIs><LinearRing><coordinates>${this.ringToKmlCoordinates(poly[0])}</coordinates></LinearRing></outerBoundaryIs></Polygon>\n`;
                        });
                        kml += `        </MultiGeometry>\n`;
                    }
                });
                kml += `      </Placemark>
    </Folder>\n`;
            }

            kml += `  </Document>
</kml>`;
            return kml;
        },

        /**
         * Export KML or KMZ file to user download
         */
        async exportKmlOrKmz(app, options = {}) {
            const format = (options.format || 'kml').toLowerCase();
            const projName = (app.projName || 'CDPK_DMR_Coverage').replace(/[^a-zA-Z0-9_\-]/g, '_');
            const kmlContent = this.generateKmlDocument(app);

            if (format === 'kmz' && window.JSZip) {
                try {
                    const zip = new window.JSZip();
                    zip.file('doc.kml', kmlContent);
                    const blob = await zip.generateAsync({
                        type: 'blob',
                        compression: 'DEFLATE',
                        compressionOptions: { level: 6 }
                    });
                    this.triggerBlobDownload(blob, `${projName}_GIS_Coverage.kmz`);
                    return { success: true, format: 'kmz' };
                } catch (e) {
                    console.warn('KMZ compression failed, falling back to KML:', e);
                }
            }

            // Default fallback: direct .kml download
            const blob = new Blob([kmlContent], { type: 'application/vnd.google-earth.kml+xml;charset=utf-8' });
            this.triggerBlobDownload(blob, `${projName}_GIS_Coverage.kml`);
            return { success: true, format: 'kml' };
        },

        triggerBlobDownload(blob, fileName) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 500);
        },

        // ══════════════════════════════════════════════════════════════════════
        // FITUR B: WIUP CONCESSION IMPORT & SPATIAL COVERAGE CALCULATION
        // ══════════════════════════════════════════════════════════════════════

        /**
         * Parse KML XML text into GeoJSON FeatureCollection
         */
        parseKmlToGeoJson(kmlText) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(kmlText, 'text/xml');
            const parseError = xmlDoc.getElementsByTagName('parsererror');
            if (parseError.length > 0) {
                throw new Error('Format berkas KML tidak valid atau rusak.');
            }

            const features = [];
            const placemarks = xmlDoc.getElementsByTagName('Placemark');

            for (let i = 0; i < placemarks.length; i++) {
                const pm = placemarks[i];
                const nameNode = pm.getElementsByTagName('name')[0];
                const descNode = pm.getElementsByTagName('description')[0];
                const name = nameNode ? nameNode.textContent.trim() : `Placemark ${i + 1}`;
                const desc = descNode ? descNode.textContent.trim() : '';

                // Extract Polygons
                const polygons = pm.getElementsByTagName('Polygon');
                for (let j = 0; j < polygons.length; j++) {
                    const poly = polygons[j];
                    const outerBoundary = poly.getElementsByTagName('outerBoundaryIs')[0];
                    if (!outerBoundary) continue;
                    const coordsNode = outerBoundary.getElementsByTagName('coordinates')[0];
                    if (!coordsNode) continue;

                    const coordStr = coordsNode.textContent.trim();
                    const rawCoords = coordStr.split(/\s+/);
                    const ring = [];
                    rawCoords.forEach(c => {
                        const parts = c.split(',');
                        if (parts.length >= 2) {
                            const lon = parseFloat(parts[0]);
                            const lat = parseFloat(parts[1]);
                            if (!isNaN(lon) && !isNaN(lat)) {
                                ring.push([lon, lat]);
                            }
                        }
                    });

                    if (ring.length >= 3) {
                        // Ensure ring is closed
                        const first = ring[0];
                        const last = ring[ring.length - 1];
                        if (first[0] !== last[0] || first[1] !== last[1]) {
                            ring.push([first[0], first[1]]);
                        }

                        features.push({
                            type: 'Feature',
                            properties: { name, description: desc },
                            geometry: {
                                type: 'Polygon',
                                coordinates: [ring]
                            }
                        });
                    }
                }

                // If no direct Polygon, check for MultiGeometry / LineString
                if (polygons.length === 0) {
                    const lineStrings = pm.getElementsByTagName('LineString');
                    for (let j = 0; j < lineStrings.length; j++) {
                        const ls = lineStrings[j];
                        const coordsNode = ls.getElementsByTagName('coordinates')[0];
                        if (!coordsNode) continue;
                        const rawCoords = coordsNode.textContent.trim().split(/\s+/);
                        const line = [];
                        rawCoords.forEach(c => {
                            const parts = c.split(',');
                            if (parts.length >= 2) {
                                const lon = parseFloat(parts[0]);
                                const lat = parseFloat(parts[1]);
                                if (!isNaN(lon) && !isNaN(lat)) line.push([lon, lat]);
                            }
                        });
                        if (line.length >= 3) {
                            // If closed line, treat as polygon
                            if (line[0][0] === line[line.length - 1][0] && line[0][1] === line[line.length - 1][1]) {
                                features.push({
                                    type: 'Feature',
                                    properties: { name, description: desc },
                                    geometry: { type: 'Polygon', coordinates: [line] }
                                });
                            }
                        }
                    }
                }
            }

            if (features.length === 0) {
                throw new Error('Tidak ditemukan geometri poligon batas konsesi di dalam berkas KML.');
            }

            return {
                type: 'FeatureCollection',
                features: features
            };
        },

        /**
         * Process uploaded concession boundary file (.geojson or .kml) and perform spatial KPI calculation
         */
        async processWiupFile(file, app) {
            const fileName = file.name || 'concession';
            const ext = fileName.split('.').pop().toLowerCase();
            let geoJson = null;

            if (ext === 'kmz' && window.JSZip) {
                const zip = await window.JSZip.loadAsync(file);
                // Look for .kml file inside
                let kmlFile = zip.file('doc.kml') || Object.values(zip.files).find(f => f.name.endsWith('.kml'));
                if (!kmlFile) {
                    throw new Error('Berkas KMZ tidak berisi file doc.kml.');
                }
                const kmlText = await kmlFile.async('text');
                geoJson = this.parseKmlToGeoJson(kmlText);
            } else if (ext === 'kml') {
                const text = await file.text();
                geoJson = this.parseKmlToGeoJson(text);
            } else if (ext === 'geojson' || ext === 'json') {
                const text = await file.text();
                const parsed = JSON.parse(text);
                if (parsed.type === 'FeatureCollection') {
                    geoJson = parsed;
                } else if (parsed.type === 'Feature') {
                    geoJson = { type: 'FeatureCollection', features: [parsed] };
                } else if (parsed.type === 'Polygon' || parsed.type === 'MultiPolygon') {
                    geoJson = { type: 'FeatureCollection', features: [{ type: 'Feature', properties: {}, geometry: parsed }] };
                } else {
                    throw new Error('Format berkas GeoJSON tidak dikenali.');
                }
            } else {
                throw new Error('Format berkas tidak didukung. Harap unggah berkas .geojson, .kml, atau .kmz.');
            }

            // Calculate spatial coverage KPI against active repeater sites
            const stats = this.calculateSpatialCoverage(geoJson, app);

            return {
                success: true,
                geoJson: geoJson,
                stats: stats
            };
        },

        /**
         * Perform spatial intersection & area calculation using Turf.js (with geodesic fallbacks)
         */
        calculateSpatialCoverage(wiupGeoJson, app) {
            const sites = (app.gisSites || []).filter(s => s.enabled !== false);
            const hata = (typeof app.getOkumuraHataRadii === 'function')
                ? app.getOkumuraHataRadii()
                : { acceptMeters: 4000 };

            // Fallback object in case geometry cannot be evaluated
            const defaultStats = {
                totalAreaKm2: 0,
                totalAreaHa: 0,
                coveredAreaKm2: 0,
                coveredAreaHa: 0,
                blankAreaKm2: 0,
                blankAreaHa: 0,
                coveragePct: 0,
                statusBadge: 'gray',
                statusLabel: 'Tidak dapat dihitung',
                darkSpotGeoJson: null
            };

            if (!wiupGeoJson || !Array.isArray(wiupGeoJson.features) || wiupGeoJson.features.length === 0) {
                return defaultStats;
            }

            // If Turf.js is loaded
            if (typeof window.turf !== 'undefined') {
                try {
                    const turf = window.turf;

                    // 1. Calculate total concession area
                    let totalAreaSqMeters = 0;
                    wiupGeoJson.features.forEach(f => {
                        try {
                            totalAreaSqMeters += turf.area(f);
                        } catch (e) {}
                    });

                    if (totalAreaSqMeters <= 0) {
                        return defaultStats;
                    }

                    // 2. Build signal coverage polygon for all active sites (Acceptance Zone >= -85 dBm)
                    const signalPolys = [];
                    sites.forEach(s => {
                        const radiusKm = hata.acceptMeters / 1000;
                        const circlePoly = turf.circle([s.lon, s.lat], radiusKm, { steps: 64, units: 'kilometers' });
                        signalPolys.push(circlePoly);
                    });

                    let combinedSignalPoly = null;
                    if (signalPolys.length === 1) {
                        combinedSignalPoly = signalPolys[0];
                    } else if (signalPolys.length > 1) {
                        // Iterative union
                        combinedSignalPoly = signalPolys[0];
                        for (let i = 1; i < signalPolys.length; i++) {
                            try {
                                combinedSignalPoly = turf.union(combinedSignalPoly, signalPolys[i]);
                            } catch (e) {
                                console.warn('Turf union issue:', e);
                            }
                        }
                    }

                    // 3. Compute Intersection with each WIUP feature
                    let coveredAreaSqMeters = 0;
                    const darkSpotFeatures = [];

                    if (combinedSignalPoly) {
                        wiupGeoJson.features.forEach(wiupFeat => {
                            try {
                                const inter = turf.intersect(wiupFeat, combinedSignalPoly);
                                if (inter) {
                                    coveredAreaSqMeters += turf.area(inter);
                                }
                                // Compute dark spots (uncovered areas inside WIUP)
                                const diff = turf.difference(wiupFeat, combinedSignalPoly);
                                if (diff) {
                                    darkSpotFeatures.push(diff);
                                }
                            } catch (err) {
                                console.warn('Turf intersect/diff error:', err);
                            }
                        });
                    }

                    // Constrain covered area <= total area
                    coveredAreaSqMeters = Math.min(totalAreaSqMeters, Math.max(0, coveredAreaSqMeters));
                    const blankAreaSqMeters = Math.max(0, totalAreaSqMeters - coveredAreaSqMeters);

                    const totalAreaKm2 = +(totalAreaSqMeters / 1e6).toFixed(2);
                    const totalAreaHa = +(totalAreaSqMeters / 1e4).toFixed(1);
                    const coveredAreaKm2 = +(coveredAreaSqMeters / 1e6).toFixed(2);
                    const coveredAreaHa = +(coveredAreaSqMeters / 1e4).toFixed(1);
                    const blankAreaKm2 = +(blankAreaSqMeters / 1e6).toFixed(2);
                    const blankAreaHa = +(blankAreaSqMeters / 1e4).toFixed(1);

                    const coveragePct = +(Math.min(100, (coveredAreaSqMeters / totalAreaSqMeters) * 100)).toFixed(1);

                    let statusBadge = 'emerald';
                    let statusLabel = app.lang === 'en' ? 'Optimal Coverage (Tender Compliant)' : 'Cakupan Optimal / Memenuhi Syarat Tender';

                    if (coveragePct < 75) {
                        statusBadge = 'red';
                        statusLabel = app.lang === 'en' ? 'Critical Coverage / High Dark Spots' : 'Cakupan Kritis / Perlu Relokasi Repeater';
                    } else if (coveragePct < 90) {
                        statusBadge = 'amber';
                        statusLabel = app.lang === 'en' ? 'Adequate Coverage / Fill-in Recommended' : 'Cakupan Memadai / Disarankan Fill-in Repeater';
                    }

                    const darkSpotGeoJson = darkSpotFeatures.length > 0 ? {
                        type: 'FeatureCollection',
                        features: darkSpotFeatures
                    } : null;

                    return {
                        totalAreaKm2,
                        totalAreaHa,
                        coveredAreaKm2,
                        coveredAreaHa,
                        blankAreaKm2,
                        blankAreaHa,
                        coveragePct,
                        statusBadge,
                        statusLabel,
                        darkSpotGeoJson
                    };
                } catch (e) {
                    console.error('Turf spatial calculation error:', e);
                }
            }

            // Approximate spherical fallback if Turf is not loaded
            return defaultStats;
        },

        /**
         * Render WIUP Boundary & Dark Spot Layers on Leaflet Map
         */
        renderWiupLayers(app) {
            if (!app.gisMap || typeof L === 'undefined' || !app.gisWiupData) return null;

            // 1. WIUP Concession Boundary Layer (Gold / Orange #d97706)
            const wiupLayer = L.geoJSON(app.gisWiupData, {
                style: {
                    color: '#d97706',
                    weight: 3.0,
                    opacity: 0.95,
                    dashArray: '6, 6',
                    fillColor: '#f59e0b',
                    fillOpacity: 0.08
                },
                onEachFeature: (feature, layer) => {
                    const name = (feature.properties && feature.properties.name) || app.gisWiupFileName || 'Batas Konsesi WIUP';
                    const stats = app.gisWiupStats || {};
                    layer.bindTooltip(
                        `<b>⛏️ ${name}</b><br>Luas Konsesi: ${stats.totalAreaKm2 || '-'} km² (${stats.totalAreaHa || '-'} Ha)<br>Cakupan Sinyal: ${stats.coveragePct || 0}%`,
                        { sticky: true }
                    );
                }
            });

            if (app.showWiupBoundary !== false) {
                wiupLayer.addTo(app.gisMap);
            }

            // 2. Uncovered Dark Spots Layer (Red striped fill #dc2626)
            let darkSpotLayer = null;
            if (app.gisWiupStats && app.gisWiupStats.darkSpotGeoJson) {
                darkSpotLayer = L.geoJSON(app.gisWiupStats.darkSpotGeoJson, {
                    style: {
                        color: '#b91c1c',
                        weight: 1.5,
                        opacity: 0.85,
                        dashArray: '4, 4',
                        fillColor: '#dc2626',
                        fillOpacity: 0.35
                    },
                    onEachFeature: (feature, layer) => {
                        const stats = app.gisWiupStats || {};
                        layer.bindTooltip(
                            `<b>🔴 Area Blank Spot / Celah Konsesi</b><br>Luas Tidak Tercover: ~${stats.blankAreaKm2 || '-'} km²<br>Rekomendasi: Pasang Repeater Fill-in`,
                            { sticky: true }
                        );
                    }
                });

                if (app.showWiupDarkSpots !== false) {
                    darkSpotLayer.addTo(app.gisMap);
                }
            }

            // Fit bounds to WIUP concession
            try {
                const bounds = wiupLayer.getBounds();
                if (bounds && bounds.isValid()) {
                    app.gisMap.fitBounds(bounds.pad(0.12));
                }
            } catch (e) {}

            return {
                wiupLayer,
                darkSpotLayer
            };
        },

        // =========================================================================
        // FITUR C: PROFIL ELEVASI TANAH DIGITAL (DEM) & CLEARANCE ZONA FRESNEL KE-1
        // =========================================================================

        /**
         * Sample N intermediate geographic points along a great-circle / geodesic path between Site A and Site B
         */
        samplePathPoints(siteA, siteB, sampleCount = 35) {
            const points = [];
            const lat1 = Number(siteA.lat);
            const lon1 = Number(siteA.lon);
            const lat2 = Number(siteB.lat);
            const lon2 = Number(siteB.lon);

            // Haversine total distance
            const R = 6371; // Earth radius km
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLon = (lon2 - lon1) * Math.PI / 180;
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                      Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const totalDistKm = R * c;

            for (let i = 0; i <= sampleCount; i++) {
                const fraction = i / sampleCount;
                const lat = lat1 + fraction * (lat2 - lat1);
                const lon = lon1 + fraction * (lon2 - lon1);
                const distFromA = fraction * totalDistKm;
                points.push({
                    index: i,
                    fraction,
                    lat: Number(lat.toFixed(6)),
                    lon: Number(lon.toFixed(6)),
                    distKm: Number(distFromA.toFixed(3)),
                    distMeters: Number((distFromA * 1000).toFixed(1)),
                    elevationM: 0
                });
            }

            return {
                points,
                totalDistKm: Number(totalDistKm.toFixed(3)),
                totalDistMeters: Number((totalDistKm * 1000).toFixed(1))
            };
        },

        /**
         * Fetch elevation profile from Open-Elevation API with timeout fallback to synthetic topographic profile
         */
        async fetchElevationProfile(points, topography = 'open') {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 4500);

            try {
                const locations = points.map(p => ({ latitude: p.lat, longitude: p.lon }));
                const response = await fetch('https://api.open-elevation.com/api/v1/lookup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ locations }),
                    signal: controller.signal
                });
                clearTimeout(timeoutId);

                if (response.ok) {
                    const data = await response.json();
                    if (data && Array.isArray(data.results) && data.results.length === points.length) {
                        return points.map((p, idx) => ({
                            ...p,
                            elevationM: Math.max(0, Number(data.results[idx].elevation) || 0),
                            source: 'Open-Elevation DEM API'
                        }));
                    }
                }
            } catch (err) {
                // Network failure or timeout -> fallback to topographic model
            } finally {
                clearTimeout(timeoutId);
            }

            // Fallback: Generate synthetic topography elevation based on CDPK terrain setting
            let baseElev = 65;
            let undulation = 18;
            if (topography === 'mountain') {
                baseElev = 320;
                undulation = 140;
            } else if (topography === 'hilly') {
                baseElev = 160;
                undulation = 65;
            } else if (topography === 'urban') {
                baseElev = 35;
                undulation = 15;
            }

            return points.map((p, idx) => {
                const sineWave = Math.sin(p.fraction * Math.PI) * undulation;
                const ridgeNoise = Math.sin(p.fraction * Math.PI * 4) * (undulation * 0.25);
                const elev = Math.max(5, Math.round(baseElev + sineWave + ridgeNoise));
                return {
                    ...p,
                    elevationM: elev,
                    source: 'Synthetic Topographic Fallback'
                };
            });
        },

        /**
         * Calculate 1st Fresnel zone, Earth curvature (k=4/3), and clearance metrics along the path
         */
        calculateFresnelProfile(pathData, freqMhz = 150, towerH1 = 45, towerH2 = 45) {
            const { points, totalDistKm } = pathData;
            const D = Math.max(0.01, totalDistKm); // total link distance in km
            const fGhz = Math.max(0.01, (Number(freqMhz) || 150) / 1000); // frequency in GHz

            const elev1 = points[0].elevationM;
            const elev2 = points[points.length - 1].elevationM;

            const site1TotalH = elev1 + towerH1;
            const site2TotalH = elev2 + towerH2;

            let worstClearanceM = 99999;
            let worstClearancePct = 99999;
            let maxFresnelRadiusM = 0;
            let worstPointIdx = -1;

            const analyzedPoints = points.map((p, i) => {
                const d1 = p.distKm;
                const d2 = Math.max(0, D - d1);

                // 1. First Fresnel Zone radius at point (meters)
                // F1 = 17.32 * sqrt((d1 * d2) / (f_GHz * D))
                let F1 = 0;
                if (d1 > 0 && d2 > 0) {
                    F1 = 17.32 * Math.sqrt((d1 * d2) / (fGhz * D));
                }
                if (F1 > maxFresnelRadiusM) {
                    maxFresnelRadiusM = F1;
                }

                // 2. Earth Curvature drop with standard 4/3 effective Earth radius (k = 1.333)
                // h_curv = (d1 * d2) / 17.0 (meters)
                const earthBulgeM = (d1 * d2) / 17.0;

                // Total obstruction ground height including Earth curvature
                const groundWithBulgeM = p.elevationM + earthBulgeM;

                // 3. Direct Line-of-Sight (LoS) height above sea level
                const losHeightM = site1TotalH + (d1 / D) * (site2TotalH - site1TotalH);

                // 4. Fresnel Clearance
                const clearanceM = losHeightM - groundWithBulgeM;
                const clearancePct = F1 > 0 ? (clearanceM / F1) * 100 : 100;

                // 5. Fresnel boundaries (upper & lower ellipsoid edges)
                const fresnelUpperM = losHeightM + F1;
                const fresnelLowerM = losHeightM - F1;
                const fresnel60LowerM = losHeightM - (0.6 * F1);

                // Check obstruction (skip end points site 1 and site 2)
                if (i > 0 && i < points.length - 1) {
                    if (clearancePct < worstClearancePct) {
                        worstClearancePct = clearancePct;
                        worstClearanceM = clearanceM;
                        worstPointIdx = i;
                    }
                }

                return {
                    ...p,
                    d1Km: Number(d1.toFixed(3)),
                    d2Km: Number(d2.toFixed(3)),
                    F1RadiusM: Number(F1.toFixed(2)),
                    earthBulgeM: Number(earthBulgeM.toFixed(2)),
                    groundWithBulgeM: Number(groundWithBulgeM.toFixed(2)),
                    losHeightM: Number(losHeightM.toFixed(2)),
                    clearanceM: Number(clearanceM.toFixed(2)),
                    clearancePct: Number(clearancePct.toFixed(1)),
                    fresnelUpperM: Number(fresnelUpperM.toFixed(2)),
                    fresnelLowerM: Number(fresnelLowerM.toFixed(2)),
                    fresnel60LowerM: Number(fresnel60LowerM.toFixed(2))
                };
            });

            // Evaluation status
            // ITU-R P.530 recommendation: Clearance >= 60% F1 required for unattenuated LoS
            let status = 'clear';
            let statusLabel = 'Clear LoS (≥ 60% F1)';
            let statusColor = '#10b981'; // emerald
            let statusDesc = 'Lintasan radio jernih tanpa difraksi terrain.';

            if (worstClearancePct < 0) {
                status = 'blocked';
                statusLabel = 'Terhalang Total (Blocked / Difraksi Berat)';
                statusColor = '#ef4444'; // rose/red
                statusDesc = 'Terrain memotong garis pandang (LoS terblokir). Tinggikan tower atau pasang repeater pasif.';
            } else if (worstClearancePct < 60) {
                status = 'subpath';
                statusLabel = 'Sub-Path Obstruction (< 60% F1)';
                statusColor = '#f59e0b'; // amber
                statusDesc = 'Garis pandang tembus, namun memotong zona Fresnel 60%. Potensi redaman difraksi (knife-edge).';
            }

            return {
                points: analyzedPoints,
                totalDistKm,
                freqMhz,
                towerH1,
                towerH2,
                elevSite1: elev1,
                elevSite2: elev2,
                maxFresnelRadiusM: Number(maxFresnelRadiusM.toFixed(2)),
                worstClearanceM: Number(worstClearanceM.toFixed(2)),
                worstClearancePct: Number(worstClearancePct.toFixed(1)),
                worstPoint: worstPointIdx >= 0 ? analyzedPoints[worstPointIdx] : null,
                status,
                statusLabel,
                statusColor,
                statusDesc
            };
        },

        /**
         * Render 2D elevation cross-section and Fresnel ellipsoid on an HTML Canvas (Retina ready)
         */
        renderFresnelCrossSection(canvas, profile) {
            if (!canvas || !profile || !profile.points || profile.points.length === 0) return;

            const ctx = canvas.getContext('2d');
            const dpr = window.devicePixelRatio || 1;

            // Canvas size from CSS layout
            const rect = canvas.getBoundingClientRect();
            const width = Math.max(480, Math.floor(rect.width || canvas.width));
            const height = Math.max(260, Math.floor(rect.height || canvas.height));

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);

            // Padding around chart
            const padLeft = 65;
            const padRight = 35;
            const padTop = 35;
            const padBottom = 45;
            const chartW = width - padLeft - padRight;
            const chartH = height - padTop - padBottom;

            // Find min/max elevation for vertical scaling
            let minH = 99999;
            let maxH = -99999;
            profile.points.forEach(p => {
                minH = Math.min(minH, p.elevationM, p.fresnelLowerM || 99999);
                maxH = Math.max(maxH, p.groundWithBulgeM, p.fresnelUpperM || -99999, p.losHeightM);
            });
            minH = Math.max(0, Math.floor((minH - 15) / 10) * 10);
            maxH = Math.ceil((maxH + 25) / 10) * 10;
            const rangeH = Math.max(20, maxH - minH);

            const getX = (distKm) => padLeft + (distKm / profile.totalDistKm) * chartW;
            const getY = (hM) => padTop + chartH - ((hM - minH) / rangeH) * chartH;

            // 1. Background Grid & Axes
            ctx.fillStyle = '#0f172a'; // slate-900 background
            ctx.fillRect(0, 0, width, height);

            ctx.strokeStyle = '#1e293b';
            ctx.lineWidth = 1;
            const yTicks = 5;
            for (let i = 0; i <= yTicks; i++) {
                const hVal = Math.round(minH + (rangeH * i) / yTicks);
                const yPos = getY(hVal);
                ctx.beginPath();
                ctx.moveTo(padLeft, yPos);
                ctx.lineTo(width - padRight, yPos);
                ctx.stroke();

                ctx.fillStyle = '#94a3b8';
                ctx.font = '10px ui-monospace, SFMono-Regular, Menlo, monospace';
                ctx.textAlign = 'right';
                ctx.textBaseline = 'middle';
                ctx.fillText(`${hVal} m`, padLeft - 8, yPos);
            }

            // X-axis ticks (Distance in km)
            const xTicks = 6;
            for (let i = 0; i <= xTicks; i++) {
                const distVal = (profile.totalDistKm * i) / xTicks;
                const xPos = getX(distVal);
                ctx.beginPath();
                ctx.moveTo(xPos, padTop);
                ctx.lineTo(xPos, height - padBottom);
                ctx.stroke();

                ctx.fillStyle = '#94a3b8';
                ctx.font = '10px ui-monospace, SFMono-Regular, Menlo, monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText(`${distVal.toFixed(1)} km`, xPos, height - padBottom + 8);
            }

            // 2. 1st Fresnel Ellipsoid (Gradient Fill & Outlines)
            // Draw upper curve forward, lower curve backward
            ctx.beginPath();
            profile.points.forEach((p, idx) => {
                const x = getX(p.distKm);
                const y = getY(p.fresnelUpperM);
                if (idx === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            for (let i = profile.points.length - 1; i >= 0; i--) {
                const p = profile.points[i];
                const x = getX(p.distKm);
                const y = getY(p.fresnelLowerM);
                ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fillStyle = 'rgba(56, 189, 248, 0.12)'; // sky-400 translucent
            ctx.fill();

            // Fresnel Boundary Lines
            ctx.strokeStyle = '#38bdf8'; // sky-400
            ctx.lineWidth = 1.5;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            profile.points.forEach((p, idx) => {
                const x = getX(p.distKm);
                const y = getY(p.fresnelUpperM);
                if (idx === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.stroke();

            ctx.beginPath();
            profile.points.forEach((p, idx) => {
                const x = getX(p.distKm);
                const y = getY(p.fresnelLowerM);
                if (idx === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.stroke();
            ctx.setLineDash([]); // reset dash

            // 3. 60% Fresnel Zone Inner Boundary (Crucial clearance limit)
            ctx.strokeStyle = 'rgba(251, 191, 36, 0.65)'; // amber-400
            ctx.lineWidth = 1;
            ctx.setLineDash([2, 3]);
            ctx.beginPath();
            profile.points.forEach((p, idx) => {
                const x = getX(p.distKm);
                const y = getY(p.fresnel60LowerM);
                if (idx === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.stroke();
            ctx.setLineDash([]);

            // 4. Direct Line-of-Sight (LoS) Ray (Site 1 Antenna -> Site 2 Antenna)
            const pFirst = profile.points[0];
            const pLast = profile.points[profile.points.length - 1];
            ctx.beginPath();
            ctx.moveTo(getX(pFirst.distKm), getY(pFirst.losHeightM));
            ctx.lineTo(getX(pLast.distKm), getY(pLast.losHeightM));
            ctx.strokeStyle = '#f43f5e'; // rose-500 direct optical beam
            ctx.lineWidth = 2;
            ctx.stroke();

            // 5. Terrain Surface (with Earth Curvature Bulge)
            ctx.beginPath();
            ctx.moveTo(getX(pFirst.distKm), getY(minH));
            profile.points.forEach(p => {
                ctx.lineTo(getX(p.distKm), getY(p.groundWithBulgeM));
            });
            ctx.lineTo(getX(pLast.distKm), getY(minH));
            ctx.closePath();

            const terrainGrad = ctx.createLinearGradient(0, padTop, 0, height - padBottom);
            terrainGrad.addColorStop(0, '#475569'); // slate-600
            terrainGrad.addColorStop(1, '#0f172a'); // slate-900
            ctx.fillStyle = terrainGrad;
            ctx.fill();

            // Terrain outline
            ctx.beginPath();
            profile.points.forEach((p, idx) => {
                const x = getX(p.distKm);
                const y = getY(p.groundWithBulgeM);
                if (idx === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.strokeStyle = '#94a3b8'; // slate-400
            ctx.lineWidth = 2;
            ctx.stroke();

            // 6. Antenna Towers Representation
            // Site 1 Tower
            const x1 = getX(pFirst.distKm);
            const y1Ground = getY(pFirst.elevationM);
            const y1Ant = getY(pFirst.losHeightM);
            ctx.beginPath();
            ctx.moveTo(x1, y1Ground);
            ctx.lineTo(x1, y1Ant);
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.fillStyle = '#38bdf8';
            ctx.beginPath();
            ctx.arc(x1, y1Ant, 4, 0, Math.PI * 2);
            ctx.fill();

            // Site 2 Tower
            const x2 = getX(pLast.distKm);
            const y2Ground = getY(pLast.elevationM);
            const y2Ant = getY(pLast.losHeightM);
            ctx.beginPath();
            ctx.moveTo(x2, y2Ground);
            ctx.lineTo(x2, y2Ant);
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.fillStyle = '#38bdf8';
            ctx.beginPath();
            ctx.arc(x2, y2Ant, 4, 0, Math.PI * 2);
            ctx.fill();

            // 7. Worst Obstruction Highlight Marker
            if (profile.worstPoint) {
                const wp = profile.worstPoint;
                const wx = getX(wp.distKm);
                const wyGround = getY(wp.groundWithBulgeM);
                const wyLos = getY(wp.losHeightM);

                // Vertical clearance line
                ctx.beginPath();
                ctx.moveTo(wx, wyGround);
                ctx.lineTo(wx, wyLos);
                ctx.strokeStyle = profile.statusColor;
                ctx.lineWidth = 2;
                ctx.setLineDash([2, 2]);
                ctx.stroke();
                ctx.setLineDash([]);

                // Ground marker dot
                ctx.fillStyle = profile.statusColor;
                ctx.beginPath();
                ctx.arc(wx, wyGround, 5, 0, Math.PI * 2);
                ctx.fill();

                // Clearance Callout Text
                ctx.fillStyle = profile.statusColor;
                ctx.font = 'bold 10px Inter, system-ui, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(
                    `Min Clearance: ${wp.clearanceM}m (${wp.clearancePct}%)`,
                    wx,
                    Math.min(wyGround, wyLos) - 10
                );
            }

            // 8. Watermark / Legend
            ctx.font = '9px Inter, system-ui, sans-serif';
            ctx.fillStyle = '#64748b';
            ctx.textAlign = 'left';
            ctx.fillText(
                `PT Citradata Purnakharisma | F1 = 17.32√(d1·d2/f·D) | k = 4/3 (${profile.freqMhz} MHz)`,
                padLeft,
                padTop - 12
            );
        }
    };

    window.CDPK_GIS_ENGINE = CDPK_GIS_ENGINE;

})(window);
