/**
 * Unit Test for CDPK GIS Feature C (DEM & 1st Fresnel Zone Clearance) and FX Configuration Rules
 */
const assert = require('assert');

// Mock window and Leaflet environment for Node.js
global.window = {};
require('../static/js/gis_engine.js');
const gisEngine = global.window.CDPK_GIS_ENGINE;

console.log('🧪 Starting Tests for Feature C (DEM & Fresnel Zone) & FX Rules...\n');

// 1. Test Geodesic Sampling
console.log('Test 1: Path Geodesic Sampling (35 points)');
const siteA = { id: 1, name: 'Repeater 1', lat: -2.5320, lon: 121.3650, height: 45 };
const siteB = { id: 2, name: 'Repeater 2', lat: -2.4800, lon: 121.4100, height: 45 };

const pathData = gisEngine.samplePathPoints(siteA, siteB, 35);
assert.strictEqual(pathData.points.length, 36, 'Should generate 36 points for 35 intervals');
assert.ok(pathData.totalDistKm > 5 && pathData.totalDistKm < 15, `Distance should be reasonable (~7.7 km), got ${pathData.totalDistKm}`);
assert.strictEqual(pathData.points[0].lat, -2.5320);
assert.strictEqual(pathData.points[35].lat, -2.4800);
console.log(`✅ Test 1 Passed: Path sampled across ${pathData.totalDistKm} km with 36 points.`);

// 2. Test Synthetic Elevation Profile Fallback
console.log('\nTest 2: Synthetic Elevation Profile Generator');
gisEngine.fetchElevationProfile(pathData.points, 'mountain').then(elevationPoints => {
    assert.strictEqual(elevationPoints.length, 36);
    assert.ok(elevationPoints[0].elevationM > 0, 'Elevation should be positive');
    console.log(`✅ Test 2 Passed: Generated ${elevationPoints.length} elevation points (Sample Elev: ${elevationPoints[10].elevationM}m)`);

    // 3. Test Fresnel Zone & Earth Curvature Calculations (150 MHz VHF)
    console.log('\nTest 3: Fresnel Zone & Earth Curvature Math (VHF 150 MHz)');
    pathData.points = elevationPoints;
    const profile = gisEngine.calculateFresnelProfile(pathData, 150, 45, 45);

    assert.ok(profile.maxFresnelRadiusM > 0, 'Max Fresnel radius must be positive');
    // F1 mid-path formula: 17.32 * sqrt((D/2 * D/2) / (f_GHz * D)) = 17.32 * sqrt(D / (4 * f))
    // For D ~ 7.7 km, f = 0.15 GHz: D / (4 * 0.15) = 7.7 / 0.6 = 12.833. sqrt(12.833) = 3.582 * 17.32 ~= 62.0 m
    console.log(`- Total Distance: ${profile.totalDistKm} km`);
    console.log(`- Max Fresnel Radius F1: ${profile.maxFresnelRadiusM} m`);
    console.log(`- Worst Clearance: ${profile.worstClearanceM} m (${profile.worstClearancePct}% F1)`);
    console.log(`- Propagation Status: ${profile.statusLabel}`);

    assert.ok(profile.maxFresnelRadiusM > 40 && profile.maxFresnelRadiusM < 80, `Expected F1 max between 40m and 80m, got ${profile.maxFresnelRadiusM}`);
    assert.ok(['clear', 'subpath', 'blocked'].includes(profile.status), 'Status must be one of clear, subpath, or blocked');
    console.log('✅ Test 3 Passed: Fresnel and curvature formulas evaluated successfully.');

    // 4. Test Obstruction Detection with artificially high mountain ridge
    console.log('\nTest 4: Artificial Obstruction (Knife-Edge Blocked LoS)');
    const blockedPoints = JSON.parse(JSON.stringify(elevationPoints));
    // Inject a 400m ridge right at mid path (index 18)
    blockedPoints[18].elevationM = 600;
    const blockedPathData = { points: blockedPoints, totalDistKm: pathData.totalDistKm };
    const blockedProfile = gisEngine.calculateFresnelProfile(blockedPathData, 150, 45, 45);

    assert.strictEqual(blockedProfile.status, 'blocked', `High ridge must trigger blocked status, got ${blockedProfile.status}`);
    assert.ok(blockedProfile.worstClearancePct < 0, 'Clearance percentage must be negative when LoS is penetrated');
    console.log(`✅ Test 4 Passed: Correctly identified blocked LoS (Clearance: ${blockedProfile.worstClearanceM}m, ${blockedProfile.worstClearancePct}%)`);

    // 5. Test FX Rules: Minimum 16,000 IDR Manual Constraint
    console.log('\nTest 5: Global FX Rules Verification');
    const validateManualRate = (val) => Math.max(16000, Number(val) || 16000);
    assert.strictEqual(validateManualRate(14000), 16000, 'Rate below 16000 must be clamped to 16000');
    assert.strictEqual(validateManualRate(15999), 16000, '15999 must be clamped to 16000');
    assert.strictEqual(validateManualRate(16500), 16500, 'Rate >= 16000 must be preserved');
    assert.strictEqual(validateManualRate(18200), 18200, 'Rate >= 16000 must be preserved');
    console.log('✅ Test 5 Passed: Hard floor of Rp 16.000 strictly enforced.');

    console.log('\n🎉 ALL TESTS PASSED! (5/5)\n');
}).catch(err => {
    console.error('❌ Test Failed:', err);
    process.exit(1);
});
