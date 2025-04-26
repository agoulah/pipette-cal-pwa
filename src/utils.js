// src/utils.js

export function mean(arr) {
  if (!arr || arr.length === 0) return NaN;
  const sum = arr.reduce((s, x) => s + x, 0);
  return sum / arr.length;
}

export function stddev(arr) {
  if (!arr || arr.length < 2) return NaN;
  const m = mean(arr);
  if (isNaN(m)) return NaN;
  const variance = arr.reduce((s, x) => s + (x - m) ** 2, 0) / (arr.length - 1);
  return Math.sqrt(variance);
}

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

export function formatNum(num, places = 2) {
  if (isNaN(num) || num === null || num === undefined) return "N/A";
  return num.toFixed(places);
}
