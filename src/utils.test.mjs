import { describe, it, expect } from "@jest/globals";

import { mean, stddev, interp1D, formatNum } from "./utils.js";

describe("mean", () => {
  it("returns the mean of a non-empty array", () => {
    expect(mean([1, 2, 3, 4])).toBe(2.5);
  });
  it("returns NaN for an empty array", () => {
    expect(mean([])).toBeNaN();
  });
  it("returns NaN for null or undefined", () => {
    expect(mean(null)).toBeNaN();
    expect(mean(undefined)).toBeNaN();
  });
  it("handles array with one element", () => {
    expect(mean([42])).toBe(42);
  });
});

describe("stddev", () => {
  it("returns the sample standard deviation for a valid array", () => {
    // The sample standard deviation of [2, 4, 4, 4, 5, 5, 7, 9] is sqrt(32/7) ≈ 2.138
    expect(stddev([2, 4, 4, 4, 5, 5, 7, 9])).toBeCloseTo(Math.sqrt(32 / 7));
  });
  it("returns NaN for arrays with fewer than 2 elements", () => {
    expect(stddev([])).toBeNaN();
    expect(stddev([1])).toBeNaN();
  });
  it("returns NaN for null or undefined", () => {
    expect(stddev(null)).toBeNaN();
    expect(stddev(undefined)).toBeNaN();
  });
  it("returns 0 for two identical numbers", () => {
    expect(stddev([5, 5])).toBe(0);
  });
});

describe("interp1D", () => {
  const keys = [0, 10, 20];
  const row = { 0: 0, 10: 100, 20: 200 };

  it("returns the value at the lower bound", () => {
    expect(interp1D(0, keys, row)).toBe(0);
  });
  it("returns the value at the upper bound", () => {
    expect(interp1D(20, keys, row)).toBe(200);
  });
  it("interpolates linearly between keys", () => {
    expect(interp1D(5, keys, row)).toBe(50);
    expect(interp1D(15, keys, row)).toBe(150);
  });
  it("returns the lower bound value for values below range", () => {
    expect(interp1D(-5, keys, row)).toBe(0);
  });
  it("returns the upper bound value for values above range", () => {
    expect(interp1D(25, keys, row)).toBe(200);
  });
});

describe("formatNum", () => {
  it("formats a number to 2 decimal places by default", () => {
    expect(formatNum(3.14159)).toBe("3.14");
  });
  it("formats a number to the specified decimal places", () => {
    expect(formatNum(3.14159, 4)).toBe("3.1416");
  });
  it("returns 'N/A' for NaN, null, or undefined", () => {
    expect(formatNum(NaN)).toBe("N/A");
    expect(formatNum(null)).toBe("N/A");
    expect(formatNum(undefined)).toBe("N/A");
  });
  it("formats integer numbers correctly", () => {
    expect(formatNum(42)).toBe("42.00");
  });
});
