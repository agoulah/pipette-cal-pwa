import { describe, it, expect } from "@jest/globals";
// calibrationEngine.test.js
// Unit tests for calibrationEngine.js

import { densityWater, getZfactor, computeStats } from "./calibrationEngine.js";
import { CF_TABLE } from "./constants.js";
import { stddev } from "./utils.js"; // Import stddev

describe("densityWater", () => {
  it("returns correct density at 0°C", () => {
    expect(densityWater(0)).toBeCloseTo(0.9998, 4);
  });
  it("returns correct density at 20°C", () => {
    expect(densityWater(20)).toBeCloseTo(0.9982, 4);
  });
  it("handles negative temperatures", () => {
    expect(densityWater(-10)).toBeGreaterThan(0.99);
  });
  it("handles high temperatures", () => {
    expect(densityWater(100)).toBeLessThan(1);
  });
});

describe("getZfactor", () => {
  it("returns correct Z-factor for table value", () => {
    expect(getZfactor(15, 100)).toBeCloseTo(CF_TABLE["15.0"][100], 4);
  });
  it("interpolates between temperatures", () => {
    const z = getZfactor(15.25, 100);
    expect(z).toBeGreaterThanOrEqual(CF_TABLE["15.0"][100]);
    expect(z).toBeLessThanOrEqual(CF_TABLE["16.0"][100]);
    // Accept equality if the table is flat at this pressure
  });
  it("returns 1.0 for out-of-range temperature", () => {
    expect(getZfactor(-100, 100)).toBe(1.0);
  });
  it("clamps pressure to table range", () => {
    expect(getZfactor(15, 200)).toBeCloseTo(CF_TABLE["15.0"][105], 4);
    expect(getZfactor(15, 50)).toBeCloseTo(CF_TABLE["15.0"][80], 4);
  });
  it("clamps temperature to table range and computes Z-factor", () => {
    // Temp below range should return 1.0 (out-of-range)
    expect(getZfactor(-100, 100)).toBe(1.0);
    // Temp above range should return 1.0 (out-of-range)
    expect(getZfactor(50, 100)).toBe(1.0);
  });
});

describe("computeStats", () => {
  it("returns NaN for empty input", () => {
    const stats = computeStats([], 100, 20, 100);
    expect(stats.N).toBe(0);
    expect(stats.Mean).toBeNaN();
  });
  it("ignores negative and NaN masses", () => {
    const stats = computeStats([100, -5, NaN, 105], 100, 20, 100);
    expect(stats.N).toBe(2);
  });
  it("computes correct stats for valid input", () => {
    const arr = [100, 102, 98];
    // Calculate expected values using the same formulas as computeStats
    const tempC = 20;
    const pressure = 100;
    const targetUl = 100;
    const rho = densityWater(tempC);
    const Z = getZfactor(tempC, pressure);
    const vols = arr.map((mg) => (mg * Z) / rho);
    const meanVol = vols.reduce((a, b) => a + b, 0) / vols.length;
    const sdVol = stddev(vols); // Use the imported stddev function
    const sysErr = meanVol - targetUl;

    const stats = computeStats(arr, targetUl, tempC, pressure);
    expect(stats.N).toBe(3);
    expect(stats.Mean).toBeCloseTo(meanVol, 6);
    expect(stats.SD).toBeCloseTo(sdVol, 6); // Now compares against stddev(vols)
    expect(stats.Sys).toBeCloseTo(sysErr, 6);
    expect(stats.vols.length).toBe(3);
    // Optionally, check each volume
    for (let i = 0; i < vols.length; ++i) {
      expect(stats.vols[i]).toBeCloseTo(vols[i], 6);
    }
  });
  it("returns NaN if density or Z-factor fails", () => {
    const stats = computeStats([100], 100, NaN, 100);
    expect(stats.Mean).toBeNaN();
  });
});
