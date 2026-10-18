// Unit Tests for Okumura-Hata Outdoor GIS Coverage Engine (DMR 450 MHz)
// PT Citradata Purnakharisma (CDPK) System Planner
const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('=== Running Unit Tests: Okumura-Hata Outdoor GIS Coverage ===\n');

// 1. Load engines.js and das_engine.js in a simulated window environment
const window = {};
global.window = window;
global.document = {
    getElementById: () => null,
    createElement: () => ({ getContext: () => ({}) })
};

const enginesCode = fs.readFileSync(path.join(__dirname, '../static/js/engines.js'), 'utf8');
eval(enginesCode);

const dasEngineCode = fs.readFileSync(path.join(__dirname, '../static/js/das_engine.js'), 'utf8');
eval(dasEngineCode);

// Test 1: Verify calculateOkumuraHata exists on CDPK_ENGINES
assert.strictEqual(typeof window.CDPK_ENGINES.calculateOkumuraHata, 'function', 'calculateOkumuraHata must be a function on window.CDPK_ENGINES');
console.log('✔ Test 1 Passed: calculateOkumuraHata exists on CDPK_ENGINES');

// Test 2: Verify calcOkumuraHataOutdoor exists on CDPK_DAS_ENGINE
assert.strictEqual(typeof window.CDPK_DAS_ENGINE.calcOkumuraHataOutdoor, 'function', 'calcOkumuraHataOutdoor must be a function on window.CDPK_DAS_ENGINE');
console.log('✔ Test 2 Passed: calcOkumuraHataOutdoor exists on CDPK_DAS_ENGINE');

// Test 3: Okumura-Hata Urban vs Suburban vs Open Environment Hierarchy
const urbanResult = window.CDPK_ENGINES.calculateOkumuraHata({
    freqMHz: 450,
    envProfile: 'urban',
    towerHeight: 35,
    txWatts: 50,
    antennaGainDbi: 6.5,
    cableLossDb: 2.1
});

const subResult = window.CDPK_ENGINES.calculateOkumuraHata({
    freqMHz: 450,
    envProfile: 'suburban',
    towerHeight: 35,
    txWatts: 50,
    antennaGainDbi: 6.5,
    cableLossDb: 2.1
});

const openResult = window.CDPK_ENGINES.calculateOkumuraHata({
    freqMHz: 450,
    envProfile: 'open',
    towerHeight: 35,
    txWatts: 50,
    antennaGainDbi: 6.5,
    cableLossDb: 2.1
});

assert.ok(urbanResult.radiiKm.strong > 1.5 && urbanResult.radiiKm.strong < 10.0, `Urban strong radius should be realistic (~3.5km), got ${urbanResult.radiiKm.strong}`);
assert.ok(subResult.radiiKm.strong > urbanResult.radiiKm.strong, `Suburban strong radius (${subResult.radiiKm.strong}) must exceed Urban (${urbanResult.radiiKm.strong})`);
assert.ok(openResult.radiiKm.strong > subResult.radiiKm.strong, `Open terrain strong radius (${openResult.radiiKm.strong}) must exceed Suburban (${subResult.radiiKm.strong})`);
console.log(`✔ Test 3 Passed: Environment Profile hierarchy validated (Urban: ${urbanResult.radiiKm.strong} km < Suburban: ${subResult.radiiKm.strong} km < Open: ${openResult.radiiKm.strong} km)`);

// Test 4: Topography Correction Effect
const flatResult = window.CDPK_ENGINES.calculateOkumuraHata({
    envProfile: 'urban',
    topography: 'flat',
    towerHeight: 35,
    txWatts: 50
});

const mountainResult = window.CDPK_ENGINES.calculateOkumuraHata({
    envProfile: 'urban',
    topography: 'mountainous',
    towerHeight: 35,
    txWatts: 50
});

assert.ok(mountainResult.radiiKm.strong < flatResult.radiiKm.strong, 'Mountainous terrain should reduce effective radius compared to flat terrain');
assert.strictEqual(mountainResult.topoCorrectionDb, 6.0, 'Mountainous correction must be +6.0 dB');
console.log(`✔ Test 4 Passed: Topography correction validated (Flat: ${flatResult.radiiKm.strong} km > Mountainous: ${mountainResult.radiiKm.strong} km with +6dB loss)`);

// Test 5: calcOkumuraHataOutdoor Link Budget & Margin Analysis
const linkParams = {
    freq: 450,
    dist: 4.0,
    bsHeight: 35,
    htHeight: 1.5,
    bsTxDbm: 47,
    htTxDbm: 36,
    bsGainDbi: 6.5,
    htGainDbi: 2.15,
    bsRxSensDbm: -118,
    htRxSensDbm: -116,
    bsFeederLossDb: 2.1,
    htFeederLossDb: 0
};

const dasHata = window.CDPK_DAS_ENGINE.calcOkumuraHataOutdoor(linkParams);
assert.strictEqual(dasHata.isValid, true, 'dasHata should be valid');
assert.ok(dasHata.results.length >= 4, 'dasHata must return results for all environment profiles');

const urbanS_env = dasHata.results.find(r => r.key === 'urbanS');
assert.ok(urbanS_env, 'urbanS result should exist');
assert.ok(isFinite(urbanS_env.pathLoss) && urbanS_env.pathLoss > 100, `Path loss at 4km should exceed 100dB, got ${urbanS_env.pathLoss}`);
console.log(`✔ Test 5 Passed: calcOkumuraHataOutdoor computed 450MHz path loss: ${urbanS_env.formatted.pl}, Downlink Margin: ${urbanS_env.formatted.downMargin}`);

// Test 6: DMR Signal Zones Threshold Progression
assert.ok(urbanResult.radiiKm.core < urbanResult.radiiKm.strong, 'Core zone (< -75dBm) radius must be smaller than Strong (< -85dBm)');
assert.ok(urbanResult.radiiKm.strong < urbanResult.radiiKm.fair, 'Strong zone (< -85dBm) radius must be smaller than Fair (< -95dBm)');
assert.ok(urbanResult.radiiKm.fair < urbanResult.radiiKm.fringe, 'Fair zone (< -95dBm) radius must be smaller than Fringe (< -105dBm)');
assert.ok(urbanResult.radiiKm.fringe < urbanResult.radiiKm.limit, 'Fringe zone radius must be smaller than sensitivity limit (< -118dBm)');
console.log(`✔ Test 6 Passed: Signal zone radii progression validated (${urbanResult.radiiKm.core}km -> ${urbanResult.radiiKm.strong}km -> ${urbanResult.radiiKm.fair}km -> ${urbanResult.radiiKm.fringe}km -> ${urbanResult.radiiKm.limit}km)`);

// Test 7: Indonesian Spectrum 4-Band Propagation Progression (VHF > 350 MHz > UHF > 800 MHz)
const vhfRes = window.CDPK_ENGINES.calculateOkumuraHata({ freqMHz: 155, envProfile: 'urban', towerHeight: 35, txWatts: 50 });
const band350Res = window.CDPK_ENGINES.calculateOkumuraHata({ freqMHz: 360, envProfile: 'urban', towerHeight: 35, txWatts: 50 });
const uhfRes = window.CDPK_ENGINES.calculateOkumuraHata({ freqMHz: 450, envProfile: 'urban', towerHeight: 35, txWatts: 50 });
const band800Res = window.CDPK_ENGINES.calculateOkumuraHata({ freqMHz: 850, envProfile: 'urban', towerHeight: 35, txWatts: 50 });

assert.ok(vhfRes.radiiKm.strong > band350Res.radiiKm.strong, `VHF radius (${vhfRes.radiiKm.strong} km) must exceed 350 MHz (${band350Res.radiiKm.strong} km)`);
assert.ok(band350Res.radiiKm.strong > uhfRes.radiiKm.strong, `350 MHz radius (${band350Res.radiiKm.strong} km) must exceed UHF (${uhfRes.radiiKm.strong} km)`);
assert.ok(uhfRes.radiiKm.strong > band800Res.radiiKm.strong, `UHF radius (${uhfRes.radiiKm.strong} km) must exceed 800 MHz (${band800Res.radiiKm.strong} km)`);

// Custom frequency within allowable range check
const customRes = window.CDPK_ENGINES.calculateOkumuraHata({ freqMHz: 142.125, envProfile: 'open', towerHeight: 45, txWatts: 50 });
assert.ok(customRes.radiiKm.strong > 10.0, `VHF open custom frequency 142.125MHz should provide extensive open reach, got ${customRes.radiiKm.strong} km`);

console.log(`✔ Test 7 Passed: Indonesian 4-Band Frequency hierarchy validated:`);
console.log(`   - VHF (155 MHz): ~${vhfRes.radiiKm.strong} km`);
console.log(`   - 350 MHz (360 MHz): ~${band350Res.radiiKm.strong} km`);
console.log(`   - UHF (450 MHz): ~${uhfRes.radiiKm.strong} km`);
console.log(`   - 800 MHz (850 MHz): ~${band800Res.radiiKm.strong} km`);
console.log(`   - Custom VHF (142.125 MHz Open): ~${customRes.radiiKm.strong} km`);

console.log('\n=== All 7 Okumura-Hata Unit Tests PASSED Successfully! ===\n');
