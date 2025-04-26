// src/calibrationEngine.js

import { mean, stddev, interp1D } from "./utils.js";
import { CF_TABLE } from "./constants.js";


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

export function getZfactor(temp, pressure) {
  // Temperature nodes as numbers, but CF_TABLE keys are strings like "15.0"
  const Tkeys = Object.keys(CF_TABLE)
    .map(parseFloat)
    .sort((a, b) => a - b);

  // Determine the lower-bound temperature
  const t0 = Math.max(Tkeys[0], Math.min(Tkeys.at(-1), temp));
  const key0 = t0.toFixed(1);
  const row0 = CF_TABLE[key0];
  if (!row0) {
    console.warn(`Z-factor: no data for temperature ${key0}°C.`);
    return 1.0;
  }

  // Pressure nodes from that row
  const Pkeys = Object.keys(row0)
    .map(parseFloat)
    .sort((a, b) => a - b);
  const z0 = interp1D(pressure, Pkeys, row0);
  if (temp === t0) return z0;

  // Interpolate up to the next temperature node
  const t1 = Tkeys.find((t) => t > temp);
  const key1 = t1.toFixed(1);
  const row1 = CF_TABLE[key1];
  if (!row1) {
    console.warn(`Z-factor: no data for temperature ${key1}°C.`);
    return z0;
  }
  const z1 = interp1D(pressure, Pkeys, row1);

  return z0 + ((z1 - z0) * (temp - t0)) / (t1 - t0);
}

export function computeStats(mgArr, targetUl, tempC, pressureKpa) {
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
    console.error("Density or Z-factor calculation failed.");
    return {
      Mean: NaN,
      SD: NaN,
      Sys: NaN,
      Rand: NaN,
      N: validMasses.length,
      vols: [],
    };
  }
  const vols = validMasses.map((mg) => (mg * Z) / rho);
  const meanVol = mean(vols);
  const sdVol = stddev(vols);
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
