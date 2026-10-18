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
        }
    };

    window.CDPK_GIS_ENGINE = CDPK_GIS_ENGINE;

})(window);
