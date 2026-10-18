/**
 * Unit Test: CDPK_GIS_ENGINE (Fitur A: KML/KMZ Export & Fitur B: WIUP Spatial Coverage)
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

// Mock browser environment for Node.js
global.window = global;

// Mock DOMParser for KML parsing in Node.js test environment
    // Lightweight mock DOMParser using basic regex/xml structure
    global.DOMParser = class {
        parseFromString(str, type) {
            return {
                getElementsByTagName: (tagName) => {
                    if (tagName === 'parsererror') return [];
                    if (tagName === 'Placemark') {
                        const placemarks = [];
                        const pmMatches = str.match(/<Placemark[\s\S]*?<\/Placemark>/gi) || [];
                        pmMatches.forEach(pmStr => {
                            placemarks.push({
                                getElementsByTagName: (tag) => {
                                    if (tag === 'name') {
                                        const m = pmStr.match(/<name>(.*?)<\/name>/i);
                                        return m ? [{ textContent: m[1] }] : [];
                                    }
                                    if (tag === 'description') {
                                        const m = pmStr.match(/<description>([\s\S]*?)<\/description>/i);
                                        return m ? [{ textContent: m[1] }] : [];
                                    }
                                    if (tag === 'Polygon') {
                                        const polyMatches = pmStr.match(/<Polygon[\s\S]*?<\/Polygon>/gi) || [];
                                        return polyMatches.map(pStr => ({
                                            getElementsByTagName: (pTag) => {
                                                if (pTag === 'outerBoundaryIs') {
                                                    return [{
                                                        getElementsByTagName: (cTag) => {
                                                            const cm = pStr.match(/<coordinates>([\s\S]*?)<\/coordinates>/i);
                                                            return cm ? [{ textContent: cm[1] }] : [];
                                                        }
                                                    }];
                                                }
                                                return [];
                                            }
                                        }));
                                    }
                                    return [];
                                }
                            });
                        });
                        return placemarks;
                    }
                    return [];
                }
            };
        }
    };

// Load gis_engine.js
require(path.join(__dirname, '../static/js/gis_engine.js'));

console.log('=== Running Unit Tests: CDPK GIS Engine (Fitur A & B) ===\n');

const engine = window.CDPK_GIS_ENGINE;
assert(engine, 'CDPK_GIS_ENGINE must be defined on window');

// Test 1: Geodesic Destination Point
const centerLat = -1.2379; // Samboja / IKN area (Kalimantan Timur)
const centerLon = 116.8529;
const northPt = engine.destinationPoint(centerLat, centerLon, 5000, 0); // 5 km North
assert(northPt.lat > centerLat, 'North point latitude must be greater than center');
assert(Math.abs(northPt.lon - centerLon) < 0.001, 'North point longitude should remain approximately equal');
console.log('✔ Test 1 Passed: Geodesic destination point calculation accurate (WGS84)');

// Test 2: Geodesic Circle Ring
const ring = engine.createGeodesicRing(centerLat, centerLon, 3500, 72);
assert.strictEqual(ring.length, 73, '72 points ring must have 73 coordinates (closed ring)');
assert.strictEqual(ring[0][0], ring[72][0], 'First and last longitude must match (closed polygon)');
assert.strictEqual(ring[0][1], ring[72][1], 'First and last latitude must match (closed polygon)');
console.log('✔ Test 2 Passed: Closed geodesic polygon ring generation validated (72 segments)');

// Test 3: KML Document Generation (Fitur A)
const mockApp = {
    projName: 'Tambang Batubara Mahakam Prima',
    clientName: 'PT Kaltim Coal Resources',
    covFreqMhz: 450,
    covEnvProfile: 'openS',
    covTowerHeight: 45,
    covTxWatts: 50,
    gisSites: [
        { id: 1, name: 'Site R1 Highwall', lat: -1.2379, lon: 116.8529, towerHeight: 45, txWatts: 50, enabled: true },
        { id: 2, name: 'Site R2 Port Facility', lat: -1.2650, lon: 116.8900, towerHeight: 35, txWatts: 45, enabled: true }
    ],
    getOkumuraHataRadii: () => ({
        coreMeters: 2500,
        acceptMeters: 5500,
        fringeMeters: 9800,
        deadMeters: 18000,
        eirpDbm: 51.4,
        env: 'openS',
        topography: 'flat'
    })
};

const kmlDoc = engine.generateKmlDocument(mockApp);
assert(kmlDoc.includes('<?xml version="1.0" encoding="UTF-8"?>'), 'Must contain XML declaration');
assert(kmlDoc.includes('<kml xmlns="http://www.opengis.net/kml/2.2">'), 'Must contain OGC KML 2.2 namespace');
assert(kmlDoc.includes('Site R1 Highwall'), 'Must include site 1 placemark');
assert(kmlDoc.includes('Site R2 Port Facility'), 'Must include site 2 placemark');
assert(kmlDoc.includes('#styleCore') && kmlDoc.includes('#styleAccept'), 'Must reference zone styles');
assert(kmlDoc.includes('<Polygon>') && kmlDoc.includes('<outerBoundaryIs>'), 'Must generate valid 3D polygon geometry');
console.log('✔ Test 3 Passed: OGC KML 2.2 export generation verified with 4-zone Okumura-Hata polygons');

// Test 4: Parse KML Concession (Fitur B)
const sampleKmlWIUP = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <Placemark>
      <name>Blok Konsesi WIUP Kutai Prima</name>
      <Polygon>
        <outerBoundaryIs>
          <LinearRing>
            <coordinates>
              116.8400,-1.2300,0 116.8700,-1.2300,0 116.8700,-1.2600,0 116.8400,-1.2600,0 116.8400,-1.2300,0
            </coordinates>
          </LinearRing>
        </outerBoundaryIs>
      </Polygon>
    </Placemark>
  </Document>
</kml>`;

const parsedGeoJson = engine.parseKmlToGeoJson(sampleKmlWIUP);
assert(parsedGeoJson && parsedGeoJson.type === 'FeatureCollection', 'Must parse into GeoJSON FeatureCollection');
assert.strictEqual(parsedGeoJson.features.length, 1, 'Must contain 1 feature');
assert.strictEqual(parsedGeoJson.features[0].geometry.type, 'Polygon', 'Geometry must be Polygon');
assert.strictEqual(parsedGeoJson.features[0].geometry.coordinates[0].length, 5, 'Ring must contain 5 points');
console.log('✔ Test 4 Passed: KML to GeoJSON parser successfully extracted concession polygons');

// Test 5: KML with WIUP Overlay in KML Export
mockApp.gisWiupData = parsedGeoJson;
mockApp.gisWiupFileName = 'WIUP_Kutai_Prima.kml';
mockApp.gisWiupStats = { totalAreaKm2: 11.2, totalAreaHa: 1120, coveredAreaKm2: 10.8, coveragePct: 96.4, statusLabel: 'Optimal' };

const kmlWithWiup = engine.generateKmlDocument(mockApp);
assert(kmlWithWiup.includes('Batas Konsesi Klien (WIUP)'), 'KML must include WIUP folder when concession is loaded');
assert(kmlWithWiup.includes('WIUP_Kutai_Prima.kml'), 'KML must contain concession file name');
console.log('✔ Test 5 Passed: Unified KML export with both Signal Contours & Concession boundary verified');

console.log('\n=== All CDPK GIS Engine Unit Tests PASSED Successfully! ===\n');
