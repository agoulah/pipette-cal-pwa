// src/calibrationEngine.js

import { mean, stddev, interp1D } from "./utils.js";
import { CF_TABLE } from "./constants.js";

/**
 * Calculates the density of water at a given temperature in Celsius.
 * Uses the IAPWS-95 formulation for pure water density.
 * @param {number} tempC - Temperature in degrees Celsius.
 * @returns {number} Density of water in g/mL.
 */
export function densityWater(tempC) {
  const t = tempC;
  const rho_kg_m3 =
    999.842594 +
    6.793952e-2 * t -
    9.09529e-3 * t ** 2 +
    1.001685e-4 * t ** 3 -
    1.120083e-6 * t ** 4 +
    6.536332e-9 * t ** 5;
  return rho_kg_m3 / 1000;
}

/**
 * Retrieves the Z-factor for water at a given temperature and pressure.
 * Interpolates from the CF_TABLE constant.
 * @param {number} tempC - Temperature in degrees Celsius.
 * @param {number} pressure - Pressure in kPa.
 * @returns {number} Z-factor (dimensionless).
 */
export function getZfactor(tempC, pressure) {
  const tempKeys = Object.keys(CF_TABLE)
    .map(Number)
    .sort((a, b) => a - b);
  const minTemp = tempKeys[0];
  const maxTemp = tempKeys[tempKeys.length - 1];

  // If tempC is outside the table range, return 1.0
  if (tempC < minTemp || tempC > maxTemp) return 1.0;

  // Clamp pressure to table range using keys from the first temperature entry
  const pKeys = Object.keys(CF_TABLE[tempKeys[0].toFixed(1)])
    .map(Number)
    .sort((a, b) => a - b);
  const minP = pKeys[0];
  const maxP = pKeys[pKeys.length - 1];
  let clampedP = pressure;
  if (clampedP < minP) clampedP = minP;
  if (clampedP > maxP) clampedP = maxP;

  // Interpolate Z-factor for pressure if needed
  // For each temperature, interpolate Z for the given pressure
  const zFactorsAtPressure = {};
  tempKeys.forEach((tNum) => {
    const tStr = tNum.toFixed(1); // CF_TABLE uses string keys for temperature
    const row = CF_TABLE[tStr];
    // Find two nearest pressure keys
    const pList = Object.keys(row).map(Number).sort((a, b) => a - b);
    let zVal;
    if (pList.includes(clampedP)) {
      zVal = row[clampedP];
    } else {
      // Find lower and upper pressure keys
      let lower = pList[0], upper = pList[pList.length - 1];
      for (let i = 0; i < pList.length - 1; i++) {
        if (pList[i] <= clampedP && clampedP < pList[i + 1]) {
          lower = pList[i];
          upper = pList[i + 1];
          break;
        }
      }
      // Linear interpolation
      const zLow = row[lower];
      const zHigh = row[upper];
      const f = (clampedP - lower) / (upper - lower);
      zVal = zLow + f * (zHigh - zLow);
    }
    zFactorsAtPressure[tNum] = zVal;
  });

  // Use interp1D for temperature interpolation
  const z = interp1D(tempC, tempKeys, zFactorsAtPressure);
  return z;
}

/**
 * Computes statistical metrics for a set of mass measurements.
 * Converts mass (mg) to volume (uL) using temperature and pressure corrections.
 * Returns mean, standard deviation, systematic error, random error, count, and volumes.
 * @param {number[]} mgArr - Array of mass measurements in milligrams.
 * @param {number} targetUl - Target volume in microliters.
 * @param {number} tempC - Temperature in degrees Celsius.
 * @param {number} pressureKpa - Pressure in kPa.
 * @returns {Object} Object containing Mean, SD, Sys, Rand, N, and vols.
 */
export function computeStats(mgArr, targetUl, tempC, pressureKpa) {
  // Validate tempC and pressureKpa
  if (
    typeof tempC !== "number" ||
    isNaN(tempC) ||
    typeof pressureKpa !== "number" ||
    isNaN(pressureKpa)
  ) {
    console.error(
      `Invalid temperature or pressure: tempC=${tempC}, pressureKpa=${pressureKpa}`
    );
    return {
      Mean: NaN,
      SD: NaN,
      Sys: NaN,
      Rand: NaN,
      N: 0,
      vols: [],
    };
  }
  const validMasses = mgArr.filter(
    (mg) => typeof mg === "number" && !isNaN(mg) && mg >= 0
  );
  if (validMasses.length === 0) {
    return {
      Mean: NaN,
      SD: NaN,
      Sys: NaN,
      Rand: NaN,
      N: 0,
      vols: [],
    };
  }
  const rho = densityWater(tempC);
  const Z = getZfactor(tempC, pressureKpa);
  if (isNaN(rho) || isNaN(Z)) {
    console.error(
      `Density or Z-factor calculation failed. rho=${rho}, Z=${Z}, tempC=${tempC}, pressureKpa=${pressureKpa}`
    );
    return {
      Mean: NaN,
      SD: NaN,
      Sys: NaN,
      Rand: NaN,
      N: validMasses.length,
      vols: [],
    };
  }
  // Convert mg to uL: vol (uL) = (mg * Z) / rho
  const vols = validMasses.map((mg) => (mg * Z) / rho);
  const meanVol = mean(vols);
  const n = vols.length;
  const sdVol = n === 0 ? NaN : stddev(vols);
  const sysErr = meanVol - targetUl;
  return {
    Mean: meanVol,
    SD: sdVol,
    Sys: sysErr,
    Rand: sdVol,
    N: validMasses.length,
    vols: vols,
  };
}
