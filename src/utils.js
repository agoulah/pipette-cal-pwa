// src/utils.js

/**
 * Calculates the mean (average) of an array of numbers.
 * @param {number[]} arr - Array of numbers.
 * @returns {number} The mean value, or NaN if the array is empty or invalid.
 */
export function mean(arr) {
  if (!arr || arr.length === 0) return NaN;
  const sum = arr.reduce((s, x) => s + x, 0);
  return sum / arr.length;
}

/**
 * Calculates the sample standard deviation of an array of numbers.
 * @param {number[]} arr - Array of numbers.
 * @returns {number} The standard deviation, or NaN if array has fewer than 2 elements or is invalid.
 */
export function stddev(arr) {
  if (!arr || arr.length < 2) return NaN;
  const m = mean(arr);
  if (isNaN(m)) return NaN;
  const variance = arr.reduce((s, x) => s + (x - m) ** 2, 0) / (arr.length - 1);
  return Math.sqrt(variance);
}

/**
 * Performs linear interpolation for a value within a set of keys and corresponding values.
 * @param {number} val - The value to interpolate.
 * @param {number[]} keys - Sorted array of keys (x-values).
 * @param {Object} row - Object mapping keys to y-values.
 * @returns {number} The interpolated value.
 */
export function interp1D(val, keys, row) {
  if (val <= keys[0]) return row[keys[0]];
  if (val >= keys.at(-1)) return row[keys.at(-1)];
  for (let i = 1; i < keys.length; i++) {
    if (val < keys[i]) {
      const [x0, x1] = [keys[i - 1], keys[i]];
      const [y0, y1] = [row[x0], row[x1]];
      return y0 + ((y1 - y0) * (val - x0)) / (x1 - x0);
    }
  }
}

/**
 * Formats a number to a fixed number of decimal places, or returns "N/A" if invalid.
 * @param {number} num - The number to format.
 * @param {number} [places=2] - Number of decimal places.
 * @returns {string} The formatted number as a string, or "N/A" if input is invalid.
 */
export function formatNum(num, places = 2) {
  if (isNaN(num) || num === null || num === undefined) return "N/A";
  return num.toFixed(places);
}
