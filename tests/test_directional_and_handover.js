/**
 * Unit Test for Features D & E: Directional Antenna Sector Lobe & Multi-Site Handover Overlap Analysis
 */
const assert = require('assert');

global.window = {};
require('../static/js/gis_engine.js');
const gisEngine = global.window.CDPK_GIS_ENGINE;

console.log('🧪 Starting Unit Tests for Features D & E...\n');

// 1. Test Feature D: Directional Sector Polar Coordinate Generation
console.log('Test 1: Directional Sector Polar Coordinate Generation');
const lat = -1.2379;
const lon = 116.8529;
const maxRadiusMeters = 5000;
const azimuthDeg = 90; // Facing East
const beamwidthDeg = 65;
const coords = gisEngine.createDirectionalSectorCoords(lat, lon, maxRadiusMeters, azimuthDeg, beamwidthDeg, 18, 72, false);

assert.strictEqual(coords.length, 73, 'Should generate 73 coordinates for closed 72-point ring');
// Point along azimuth (90 deg = East): point at index 18 (bearing 90) should be at max radius
const eastPt = coords[18];
// Point opposite to azimuth (270 deg = West): point at index 54 (bearing 270) should be attenuated by F/B ratio
const westPt = coords[54];

assert.ok(eastPt[1] > lon, 'East point should have greater longitude than base');
assert.ok(westPt[1] < lon, 'West point should have smaller longitude than base');

// Distance to East point vs West point
const R = 6378137;
const dEast = Math.abs(eastPt[1] - lon) * (Math.PI / 180) * R * Math.cos(lat * Math.PI / 180);
const dWest = Math.abs(westPt[1] - lon) * (Math.PI / 180) * R * Math.cos(lat * Math.PI / 180);

console.log(`- Forward Max Distance (East): ${dEast.toFixed(1)} m`);
console.log(`- Attenuated Back Lobe (West): ${dWest.toFixed(1)} m`);
assert.ok(dEast > 4500 && dEast <= 5100, `Forward radius should be ~5000m, got ${dEast}`);
assert.ok(dWest < 1800, `Back lobe should be heavily attenuated (< 1800m), got ${dWest}`);
console.log('✅ Test 1 Passed: Directional polar sector coordinates verified with front-to-back ratio.\n');

// 2. Test Feature E: Multi-Site Overlap and Roaming Handover Assessment
console.log('Test 2: Multi-Site Overlap and Roaming Handover Assessment');
const mockSites = [
    { id: 1, name: 'Site 1 (Pit Utara)', lat: -1.2379, lon: 116.8529, enabled: true, antennaType: 'omni' },
    { id: 2, name: 'Site 2 (Hauling Road)', lat: -1.2700, lon: 116.8800, enabled: true, antennaType: 'omni' } // ~4.6 km away
];

const hataRadii = {
    coreMeters: 1500,
    acceptMeters: 4000,
    fringeMeters: 6700,
    deadMeters: 12000
};

const result = gisEngine.calculateMultiSiteOverlap(mockSites, hataRadii);
assert.strictEqual(result.hasMultiSite, true);
assert.strictEqual(result.totalPairs, 1);
const pair = result.pairs[0];
console.log(`- Sites: ${pair.siteAName} ➔ ${pair.siteBName}`);
console.log(`- Distance: ${pair.distKm} km`);
console.log(`- Overlap Area: ${pair.overlapKm2} km² (${pair.overlapPct}%)`);
console.log(`- Handover Status: ${pair.statusLabel} (${pair.status})`);

assert.ok(pair.distKm > 3 && pair.distKm < 6, `Expected distance around 4.6 km, got ${pair.distKm}`);
assert.ok(pair.overlapPct > 0, 'Overlap percentage must be positive for adjacent sites');
assert.ok(['optimal', 'marginal', 'excessive', 'disconnected'].includes(pair.status));
console.log('✅ Test 2 Passed: Multi-site overlap calculation evaluated accurately.\n');

// 3. Test Feature E: Single Site Graceful Handling
console.log('Test 3: Single Site Graceful Fallback');
const singleSiteResult = gisEngine.calculateMultiSiteOverlap([mockSites[0]], hataRadii);
assert.strictEqual(singleSiteResult.hasMultiSite, false);
assert.strictEqual(singleSiteResult.pairs.length, 0);
console.log('✅ Test 3 Passed: Single-site gracefully handled.\n');

console.log('🎉 ALL FEATURE D & E TESTS PASSED! (3/3)\n');
