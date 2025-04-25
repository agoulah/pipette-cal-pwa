// ── Constants and Lookups ───────────────────────────────────

// Z-factor Table
const CF_TABLE = {
  "15.0": {
    80: 1.0017,
    85: 1.0018,
    90: 1.0019,
    95: 1.0019,
    100: 1.002,
    101: 1.002,
    105: 1.002,
  },
  15.5: {
    80: 1.0018,
    85: 1.0019,
    90: 1.0019,
    95: 1.002,
    100: 1.002,
    101: 1.002,
    105: 1.0021,
  },
  "16.0": {
    80: 1.0019,
    85: 1.002,
    90: 1.002,
    95: 1.0021,
    100: 1.0021,
    101: 1.0021,
    105: 1.0022,
  },
  16.5: {
    80: 1.002,
    85: 1.0021,
    90: 1.0021,
    95: 1.0022,
    100: 1.0022,
    101: 1.0022,
    105: 1.0023,
  },
  "17.0": {
    80: 1.0021,
    85: 1.0022,
    90: 1.0022,
    95: 1.0023,
    100: 1.0023,
    101: 1.0023,
    105: 1.0024,
  },
  17.5: {
    80: 1.0022,
    85: 1.0023,
    90: 1.0024,
    95: 1.0024,
    100: 1.0024,
    101: 1.0024,
    105: 1.0025,
  },
  "18.0": {
    80: 1.0023,
    85: 1.0024,
    90: 1.0025,
    95: 1.0025,
    100: 1.0025,
    101: 1.0025,
    105: 1.0026,
  },
  18.5: {
    80: 1.0024,
    85: 1.0025,
    90: 1.0026,
    95: 1.0026,
    100: 1.0026,
    101: 1.0026,
    105: 1.0027,
  },
  "19.0": {
    80: 1.0026,
    85: 1.0027,
    90: 1.0027,
    95: 1.0027,
    100: 1.0027,
    101: 1.0028,
    105: 1.0028,
  },
  19.5: {
    80: 1.0027,
    85: 1.0028,
    90: 1.0028,
    95: 1.0028,
    100: 1.0029,
    101: 1.0029,
    105: 1.0029,
  },
  "20.0": {
    80: 1.0028,
    85: 1.0029,
    90: 1.0029,
    95: 1.003,
    100: 1.003,
    101: 1.003,
    105: 1.0031,
  },
  20.5: {
    80: 1.003,
    85: 1.003,
    90: 1.0031,
    95: 1.0031,
    100: 1.0031,
    101: 1.0031,
    105: 1.0032,
  },
  "21.0": {
    80: 1.0031,
    85: 1.0032,
    90: 1.0032,
    95: 1.0032,
    100: 1.0033,
    101: 1.0033,
    105: 1.0033,
  },
  21.5: {
    80: 1.0032,
    85: 1.0033,
    90: 1.0033,
    95: 1.0034,
    100: 1.0034,
    101: 1.0034,
    105: 1.0035,
  },
  "22.0": {
    80: 1.0034,
    85: 1.0034,
    90: 1.0035,
    95: 1.0035,
    100: 1.0035,
    101: 1.0036,
    105: 1.0036,
  },
  22.5: {
    80: 1.0035,
    85: 1.0036,
    90: 1.0036,
    95: 1.0037,
    100: 1.0037,
    101: 1.0037,
    105: 1.0038,
  },
  "23.0": {
    80: 1.0037,
    85: 1.0037,
    90: 1.0038,
    95: 1.0038,
    100: 1.0038,
    101: 1.0039,
    105: 1.0039,
  },
  23.5: {
    80: 1.0038,
    85: 1.0039,
    90: 1.0039,
    95: 1.004,
    100: 1.004,
    101: 1.004,
    105: 1.0041,
  },
  "24.0": {
    80: 1.004,
    85: 1.004,
    90: 1.0041,
    95: 1.0041,
    100: 1.0042,
    101: 1.0042,
    105: 1.0042,
  },
  24.5: {
    80: 1.0041,
    85: 1.0042,
    90: 1.0042,
    95: 1.0043,
    100: 1.0043,
    101: 1.0043,
    105: 1.0044,
  },
  "25.0": {
    80: 1.0043,
    85: 1.0043,
    90: 1.0044,
    95: 1.0044,
    100: 1.0045,
    101: 1.0045,
    105: 1.0045,
  },
  25.5: {
    80: 1.0044,
    85: 1.0045,
    90: 1.0045,
    95: 1.0046,
    100: 1.0046,
    101: 1.0046,
    105: 1.0047,
  },
  "26.0": {
    80: 1.0046,
    85: 1.0047,
    90: 1.0047,
    95: 1.0048,
    100: 1.0048,
    101: 1.0048,
    105: 1.0049,
  },
  26.5: {
    80: 1.0047,
    85: 1.0048,
    90: 1.0049,
    95: 1.0049,
    100: 1.005,
    101: 1.005,
    105: 1.005,
  },
  "27.0": {
    80: 1.0049,
    85: 1.005,
    90: 1.005,
    95: 1.0051,
    100: 1.0051,
    101: 1.0051,
    105: 1.0052,
  },
  27.5: {
    80: 1.0051,
    85: 1.0051,
    90: 1.0052,
    95: 1.0052,
    100: 1.0053,
    101: 1.0053,
    105: 1.0054,
  },
  "28.0": {
    80: 1.0052,
    85: 1.0053,
    90: 1.0054,
    95: 1.0054,
    100: 1.0055,
    101: 1.0055,
    105: 1.0055,
  },
  28.5: {
    80: 1.0054,
    85: 1.0055,
    90: 1.0055,
    95: 1.0056,
    100: 1.0056,
    101: 1.0056,
    105: 1.0057,
  },
  "29.0": {
    80: 1.0056,
    85: 1.0056,
    90: 1.0057,
    95: 1.0057,
    100: 1.0058,
    101: 1.0058,
    105: 1.0059,
  },
  29.5: {
    80: 1.0057,
    85: 1.0058,
    90: 1.0059,
    95: 1.0059,
    100: 1.006,
    101: 1.006,
    105: 1.006,
  },
  "30.0": {
    80: 1.0059,
    85: 1.006,
    90: 1.006,
    95: 1.0061,
    100: 1.0061,
    101: 1.0062,
    105: 1.0062,
  },
};

/*  MPE limits (ISO 8655-2 : 2022 Table 2 — variable-volume, single-channel, type A/D1/D2)
 *  Values are the ABSOLUTE µL limits.  p100/p50 share the same limit for Sys;
 *  p10 has its own smaller limit.
 */
const MPE = [
  {
    nom: 1,
    sys: { p100: 0.05, p50: 0.05, p10: 0.03 },
    rand: { p100: 0.05, p50: 0.08, p10: 0.03 },
  },
  {
    nom: 2,
    sys: { p100: 0.08, p50: 0.08, p10: 0.05 },
    rand: { p100: 0.04, p50: 0.08, p10: 0.04 },
  },
  {
    nom: 5,
    sys: { p100: 0.13, p50: 0.13, p10: 0.08 },
    rand: { p100: 0.08, p50: 0.12, p10: 0.06 },
  },
  {
    nom: 10,
    sys: { p100: 0.2, p50: 0.2, p10: 0.1 },
    rand: { p100: 0.1, p50: 0.16, p10: 0.08 },
  },
  {
    nom: 20,
    sys: { p100: 0.4, p50: 0.4, p10: 0.2 },
    rand: { p100: 0.16, p50: 0.24, p10: 0.16 },
  },
  {
    nom: 50,
    sys: { p100: 0.7, p50: 0.7, p10: 0.3 },
    rand: { p100: 0.3, p50: 0.5, p10: 0.3 },
  },
  {
    nom: 100,
    sys: { p100: 1.5, p50: 1.5, p10: 0.6 },
    rand: { p100: 0.6, p50: 1.0, p10: 0.6 },
  },
  {
    nom: 200,
    sys: { p100: 3.0, p50: 3.0, p10: 1.2 },
    rand: { p100: 0.8, p50: 1.5, p10: 0.8 },
  },
  {
    nom: 500,
    sys: { p100: 6.0, p50: 6.0, p10: 2.5 },
    rand: { p100: 2.0, p50: 3.0, p10: 2.0 },
  },
  {
    nom: 1000,
    sys: { p100: 12.0, p50: 12.0, p10: 6.0 },
    rand: { p100: 4.0, p50: 8.0, p10: 2.0 },
  },
  {
    nom: 2000,
    sys: { p100: 24.0, p50: 24.0, p10: 12.0 },
    rand: { p100: 6.0, p50: 12.0, p10: 4.0 },
  },
  {
    nom: 5000,
    sys: { p100: 60.0, p50: 60.0, p10: 30.0 },
    rand: { p100: 15.0, p50: 30.0, p10: 15.0 },
  },
  {
    nom: 10000,
    sys: { p100: 120.0, p50: 120.0, p10: 60.0 },
    rand: { p100: 30.0, p50: 60.0, p10: 30.0 },
  },
];

function interpRow(nom) {
  // simple log-log interpolation between nearest rows
  const xs = MPE.map((r) => r.nom);
  if (nom <= xs[0]) return MPE[0];
  if (nom >= xs[xs.length - 1]) return MPE[xs.length - 1];

  let i = xs.findIndex((x) => x > nom);
  const lo = MPE[i - 1],
    hi = MPE[i];
  const f = (nom - lo.nom) / (hi.nom - lo.nom);

  const mix = (a, b) => a + f * (b - a);
  const blend = (o1, o2) =>
    Object.fromEntries(Object.keys(o1).map((k) => [k, mix(o1[k], o2[k])]));

  return {
    nom: nom,
    sys: blend(lo.sys, hi.sys),
    rand: blend(lo.rand, hi.rand),
  };
}

// get appropriate limits for a specific set-point
function limitsFor(nominal, setFraction) {
  const row = MPE.find((r) => r.nom === nominal) || interpRow(nominal);
  const key = setFraction === 1 ? "p100" : setFraction === 0.5 ? "p50" : "p10";
  return { sys: row.sys[key], rand: row.rand[key] };
}

const SETPOINTS = [0.1, 0.5, 1.0];
const DEFAULT_PRECISION = 3;

// ---------- GLOBAL SESSION STATE ----------
const sessionMeta = {}; // operator / pipette / balance / date
let calibrationID = null; // time-based unique ID for storage key
let metaElems; // <-- declare in outer scope

// enable/disable “Export” button when calibration complete
function setExportEnabled(flag) {
  if (metaElems && metaElems.export) {
    metaElems.export.disabled = !flag;
  }
}

// ---------- CAPTURE METADATA ----------
function readSessionMeta() {
  // guard in case DOM not ready
  if (!metaElems || !metaElems.operator) return false;

  sessionMeta.operator = metaElems.operator.value.trim();
  sessionMeta.pipette = metaElems.pipette.value.trim();
  sessionMeta.balance = metaElems.balance.value.trim();
  sessionMeta.date =
    metaElems.date.value || new Date().toISOString().slice(0, 10);
  return Object.values(sessionMeta).every(Boolean);
}

// ---------- LOCAL STORAGE ----------
function saveSession(preResults, postResults, pass) {
  const db = JSON.parse(localStorage.getItem("pipetteCalSessions") || "[]");

  calibrationID = calibrationID || "CAL-" + Date.now();

  db.push({
    id: calibrationID,
    meta: sessionMeta,
    pre: preResults,
    post: postResults,
    finalPass: pass,
    timestamp: new Date().toISOString(),
  });

  localStorage.setItem("pipetteCalSessions", JSON.stringify(db));
  setExportEnabled(true);
}

async function exportPdf() {
  if (!calibrationID) return;
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const M = 40; // margin
  let y = M;

  /* ---------- 1.  Metadata (real text) ---------- */
  doc.setFontSize(16).text("Pipette Calibration Report", M, y);
  doc.setFontSize(10);
  y += 24;
  doc.text(`ID: ${calibrationID}`, M, y);
  doc.text(`Date: ${sessionMeta.date}`, pageW / 2, y);
  y += 14;
  doc.text(`Operator: ${sessionMeta.operator}`, M, y);
  doc.text(`Pipette: ${sessionMeta.pipette}`, pageW / 2, y);
  y += 14;
  doc.text(`Balance: ${sessionMeta.balance}`, M, y);
  y += 20;

  /* ---------- 2.  Results table (selectable) ---- */
  const hdr = [
    [
      "Phase",
      "Setpoint",
      "Target (µL)",
      "Mean (µL)",
      "Sys. Err (µL)",
      "Rand. Err (µL)",
      "Status",
    ],
  ];

  const body = Array.from(document.querySelectorAll("#summary-tbody tr")).map(
    (tr) => Array.from(tr.cells, (td) => td.textContent.trim())
  );

  doc.autoTable({
    head: hdr,
    body: body,
    startY: y,
    margin: { left: M, right: M },
    styles: { fontSize: 9, overflow: "linebreak" },
  });

  y = doc.lastAutoTable.finalY + 20;

  /* ---------- 3.  Charts (as images) ------------ */
  const charts = [
    document.getElementById("chart-volume"),
    document.getElementById("chart-syserr"),
    document.getElementById("chart-randerr"),
  ];

  for (const cnv of charts) {
    // Skip hidden / not-rendered canvases
    if (!cnv || !cnv.toDataURL) continue;

    const img = cnv.toDataURL("image/png", 1.0);
    const w = pageW - 2 * M;
    const h = (cnv.height / cnv.width) * w;

    // page break if needed
    if (y + h > pageH - M) {
      doc.addPage();
      y = M;
    }
    doc.addImage(img, "PNG", M, y, w, h, "", "FAST");
    y += h + 20;
  }

  /* ---------- 4.  Save -------------------------- */
  doc.save(`${calibrationID}.pdf`);
}

// ── Utility Functions ─────────────────────────────────────
function densityWater(tempC) {
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

function mean(arr) {
  if (!arr || arr.length === 0) return NaN;
  const sum = arr.reduce((s, x) => s + x, 0);
  return sum / arr.length;
}

function stddev(arr) {
  if (!arr || arr.length < 2) return NaN;
  const m = mean(arr);
  if (isNaN(m)) return NaN;
  const variance = arr.reduce((s, x) => s + (x - m) ** 2, 0) / (arr.length - 1);
  return Math.sqrt(variance);
}

function interp1D(val, keys, row) {
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

function getZfactor(temp, pressure) {
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

function formatNum(num, places = 2) {
  if (isNaN(num) || num === null || num === undefined) return "N/A";
  return num.toFixed(places);
}

// ── Digit Spinner Class ───────────────────────────────────
class DigitSpinner {
  constructor(containerElement, options = {}) {
    this.container = containerElement;
    this.options = {
      initialValue: 0,
      step: 0.1,
      min: 0,
      max: 10000,
      precision: DEFAULT_PRECISION,
      ...options,
    };
    this._value = this._parseValue(this.options.initialValue);
    this._precision = this._getPrecision();
    this._createElements();
    this._addEventListeners();
    this.render();
    this.container.spinnerInstance = this;
  }
  _getPrecision() {
    const stepString = String(this.options.step);
    if (stepString.includes(".")) {
      return stepString.split(".")[1].length;
    }
    return this.options.precision;
  }
  _parseValue(value) {
    let num = parseFloat(value);
    if (isNaN(num)) num = this.options.min;
    num = Math.max(this.options.min, num);
    num = Math.min(this.options.max, num);
    const factor = Math.pow(10, this._precision || DEFAULT_PRECISION);
    return Math.round(num * factor) / factor;
  }
  _createElements() {
    this.container.innerHTML = "";
    this.container.classList.add("digit-spinner");
    this.container.setAttribute("tabindex", "0");
    this.digitsDisplay = document.createElement("div");
    this.digitsDisplay.className = "spinner-digits";
    this.container.appendChild(this.digitsDisplay);
    const controlsDiv = document.createElement("div");
    controlsDiv.className = "spinner-controls";
    this.downButton = document.createElement("button");
    this.downButton.type = "button";
    this.downButton.className = "spinner-btn spinner-down";
    this.downButton.textContent = "-";
    this.downButton.setAttribute("aria-label", "Decrease value");
    controlsDiv.appendChild(this.downButton);
    this.upButton = document.createElement("button");
    this.upButton.type = "button";
    this.upButton.className = "spinner-btn spinner-up";
    this.upButton.textContent = "+";
    this.upButton.setAttribute("aria-label", "Increase value");
    controlsDiv.appendChild(this.upButton);
    this.container.appendChild(controlsDiv);
  }
  _addEventListeners() {
    this.upButton.addEventListener("click", () => this.stepUp());
    this.downButton.addEventListener("click", () => this.stepDown());
    this.container.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          this.stepUp();
          break;
        case "ArrowDown":
          e.preventDefault();
          this.stepDown();
          break;
      }
    });
  }
  render() {
    const valueString = this._value.toFixed(this._precision);
    this.digitsDisplay.innerHTML = "";
    const [integerPart, fractionalPart] = valueString.split(".");
    integerPart.split("").forEach((digitChar) => {
      const digitSpan = document.createElement("span");
      digitSpan.className = "digit";
      digitSpan.textContent = digitChar;
      this.digitsDisplay.appendChild(digitSpan);
    });
    if (this._precision > 0) {
      const decimalPointSpan = document.createElement("span");
      decimalPointSpan.className = "decimal-point";
      decimalPointSpan.textContent = ".";
      this.digitsDisplay.appendChild(decimalPointSpan);
      (fractionalPart || "")
        .padEnd(this._precision, "0")
        .split("")
        .forEach((digitChar) => {
          const digitSpan = document.createElement("span");
          digitSpan.className = "digit";
          digitSpan.textContent = digitChar;
          this.digitsDisplay.appendChild(digitSpan);
        });
    }
    this.container.dataset.value = this._value;
  }
  stepUp() {
    this.setValue(this._value + this.options.step);
  }
  stepDown() {
    this.setValue(this._value - this.options.step);
  }
  setValue(newValue) {
    const parsedValue = this._parseValue(newValue);
    if (parsedValue !== this._value) {
      this._value = parsedValue;
      this.render();
    }
  }
  getValue() {
    return this._value;
  }
}

// ── Core Calculation Logic ────────────────────────────────
function computeStats(mgArr, targetUl, tempC, pressureKpa) {
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

// ── DOM Manipulation & UI Logic ───────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const elements = {
    nominalVolInput: document.getElementById("nominal_vol"),
    tempCInput: document.getElementById("temp_c"),
    pressureKpaInput: document.getElementById("pressure_kpa"),
    numReadingsInput: document.getElementById("num_readings"),
    preContainer: document.getElementById("setpoints-pre"),
    postContainer: document.getElementById("setpoints-post"),
    preSection: document.getElementById("pre-section"),
    postSection: document.getElementById("post-section"),
    calculateBtn: document.getElementById("calculate-btn"),
    statusMessage: document.getElementById("status-message"),
    resultsSection: document.getElementById("results"),
    summaryTbody: document.getElementById("summary-tbody"),
    finalComparison: document.getElementById("final-comparison"),
    comparisonText: document.getElementById("comparison-text"),
    volumeChartCanvas: document.getElementById("chart-volume"),
    sysErrChartCanvas: document.getElementById("chart-syserr"),
    randErrChartCanvas: document.getElementById("chart-randerr"),
    infoSection: document.getElementById("info-section"),
    infoToggle: document.getElementById("info-toggle"),
    infoContent: document.getElementById("info-content"),
    infoToggleIcon: document.querySelector("#info-toggle .info-toggle-icon"), // Get the icon span
    practicalGuideSection: document.getElementById("practical-guide-section"),
    practicalGuideToggle: document.getElementById("practical-guide-toggle"),
    practicalGuideContent: document.getElementById("practical-guide-content"),
    fastEntryCheckbox: document.getElementById("fast_entry"),
  };

  const resetBtn = document.getElementById("reset-btn");

  metaElems = {
    operator: document.getElementById("operator_name"),
    pipette: document.getElementById("pipette_id"),
    balance: document.getElementById("balance_id"),
    date: document.getElementById("session_date"),
    export: document.getElementById("export-btn"),
  };

  // pre-fill date
  metaElems.date.valueAsDate = new Date();

  let currentPhase = "Pre";
  let chartInstances = {};
  let fastEntryMode = false;

  function buildSetpointInputs(container, phaseLabel) {
    container.innerHTML = "";
    const nominalVol = parseFloat(elements.nominalVolInput.value) || 0;
    const numReadings = parseInt(elements.numReadingsInput.value) || 5;
    if (nominalVol <= 0) {
      container.innerHTML = `<div class="placeholder-text">Enter a valid Nominal Volume above.</div>`;
      return;
    }
    SETPOINTS.forEach((sp) => {
      const targetVol = nominalVol * sp;
      const targetMass = targetVol;
      const pct = Math.round(sp * 100);
      const setpointDiv = document.createElement("div");
      setpointDiv.className = "measurement-setpoint";
      setpointDiv.id = `setpoint-${phaseLabel.toLowerCase()}-${sp}`;
      setpointDiv.innerHTML = `<h4>${pct}% Setpoint <span style="font-weight:400; color:var(--text-muted)">(${formatNum(
        targetVol,
        1
      )} µL)</span></h4>`;
      const readingsContainer = document.createElement("div");
      readingsContainer.className = "readings-container";
      for (let i = 1; i <= numReadings; i++) {
        let field;
        if (fastEntryMode) {
          field = document.createElement("input");
          field.type = "number";
          field.step = "0.1";
          field.min = "0";
          field.max = nominalVol * 1.5;
          field.value = targetMass.toFixed(DEFAULT_PRECISION);
          field.className = "mass-input";
        } else {
          field = document.createElement("div");
          new DigitSpinner(field, {
            initialValue: targetMass,
            step: 0.1,
            min: 0,
            max: nominalVol * 1.5,
            precision: DEFAULT_PRECISION,
          });
        }
        field.dataset.phase = phaseLabel;
        field.dataset.sp = sp;
        readingsContainer.appendChild(field);
      }

      setpointDiv.appendChild(readingsContainer);
      container.appendChild(setpointDiv);
    });
    console.log(
      `Built inputs for Phase: ${phaseLabel}, Container children: ${container.children.length}`
    );
  }

  function getReadingsForPhase(phaseLabel) {
    const container =
      phaseLabel === "Pre" ? elements.preContainer : elements.postContainer;
    let allStats = {};
    let isValid = true;
    let missingData = false;
    SETPOINTS.forEach((sp) => {
      const spinnerContainers = container.querySelectorAll(
        `[data-phase="${phaseLabel}"][data-sp="${sp}"]`
      );
      if (spinnerContainers.length === 0) {
        console.warn(
          `No spinner containers found for ${phaseLabel} ${sp * 100}%`
        );
        missingData = true;
        return;
      }
      const massesMg = Array.from(spinnerContainers)
        .map((el) => {
          if (fastEntryMode) {
            return parseFloat(el.value);
          } else {
            return el.spinnerInstance?.getValue();
          }
        })
        .filter((v) => typeof v === "number" && !isNaN(v) && v >= 0);
      if (massesMg.length < Math.min(3, spinnerContainers.length)) {
        console.warn(
          `Insufficient valid readings for ${phaseLabel} ${sp * 100}% (${
            massesMg.length
          } / ${spinnerContainers.length}).`
        );
        isValid = false;
        const setpointBlock = document.getElementById(
          `setpoint-${phaseLabel.toLowerCase()}-${sp}`
        );
        setpointBlock?.classList.add("input-error");
      } else {
        const setpointBlock = document.getElementById(
          `setpoint-${phaseLabel.toLowerCase()}-${sp}`
        );
        setpointBlock?.classList.remove("input-error");
      }
      allStats[sp] = massesMg;
    });
    if (missingData || Object.keys(allStats).length !== SETPOINTS.length) {
      updateStatus(
        "Error: Input fields missing for one or more setpoints. Please check setup.",
        "fail"
      );
      return null;
    }
    if (!isValid) {
      updateStatus(
        "Please ensure at least 3 valid readings (use +/- buttons) for each setpoint.",
        "fail"
      );
      return null;
    }
    return allStats;
  }

  elements.calculateBtn.addEventListener("click", handleCalculation);
  metaElems.export.addEventListener("click", exportPdf);

  resetBtn.addEventListener("click", () => {
    // Clear any stored session data
    calibrationID = null;
    sessionMeta.operator = "";
    sessionMeta.pipette = "";
    sessionMeta.balance = "";
    sessionMeta.date = "";

    // Clear the meta form fields
    metaElems.operator.value = "";
    metaElems.pipette.value = "";
    metaElems.balance.value = "";
    metaElems.date.valueAsDate = new Date();

    // Disable export until a new run finishes
    setExportEnabled(false);

    // Reinitialize the whole app UI
    initializeApp();
  });

  function handleCalculation() {
    const nominalVol = parseFloat(elements.nominalVolInput.value);
    const tempC = parseFloat(elements.tempCInput.value);
    const pressureKpa = parseFloat(elements.pressureKpaInput.value);
    if (
      isNaN(nominalVol) ||
      nominalVol <= 0 ||
      isNaN(tempC) ||
      isNaN(pressureKpa)
    ) {
      updateStatus("Please enter valid numerical Setup Details.", "fail");
      return;
    }

    if (parseInt(elements.numReadingsInput.value) < 10) {
      updateStatus(
        "ISO 8655 requires ≥ 10 replicate weighings per volume.",
        "fail"
      );
      return;
    }
    const balanceU = parseFloat(document.getElementById("balance_unc").value);
    const mpeSys100 = limitsFor(nominalVol, 1).sys;
    if (balanceU >= mpeSys100 / 4) {
      updateStatus(
        `Balance uncertainty (${balanceU} mg) exceeds ISO limit (<¼ MPEsys = ${formatNum(
          mpeSys100 / 4
        )} mg).`,
        "fail"
      );
      return;
    }

    const readings = getReadingsForPhase(currentPhase);
    if (!readings) return;

    let phaseResults = {};
    // Default overallPass to true ONLY for the purpose of the 100% check below.
    // Individual setpoint passes are determined within the loop.
    let overallPass = true;

    for (const sp of SETPOINTS) {
      const lim = limitsFor(nominalVol, sp);
      const stats = computeStats(
        readings[sp] || [],
        nominalVol * sp,
        tempC,
        pressureKpa
      );
      stats.target = nominalVol * sp;
      stats.limits = lim;
      stats.passSys = Math.abs(stats.Sys) <= lim.sys;
      stats.passRand = stats.Rand <= lim.rand;
      phaseResults[sp] = stats;
      overallPass = overallPass && stats.passSys && stats.passRand;
    }

    // Pre-calculate the 100 % set-point limits for messaging
    const lim100 = limitsFor(nominalVol, 1);
    if (Object.keys(phaseResults).length !== SETPOINTS.length) {
      updateStatus(
        "Error: Could not calculate results for all setpoints.",
        "fail"
      );
      console.error("Phase Results Object:", phaseResults);
      return;
    }

    // --- Update UI based on phase and results ---
    if (currentPhase === "Pre") {
      localStorage.setItem(
        "pipetteCalPreResults",
        JSON.stringify(phaseResults)
      );
      // Pass the calculated results which now include pass/fail for all setpoints
      renderSummaryTable(["Pre"], [phaseResults]);
      renderAllCharts([phaseResults], ["Pre"]);
      elements.resultsSection.classList.remove("hidden");
      scrollToElement(elements.resultsSection);

      // Decision to proceed is still based on overallPass (100% point)
      if (overallPass) {
        updateStatus(
          `✅ Pre-Calibration PASSED (100%). ISO limits: Sys ±${formatNum(
            lim100.sys
          )} µL, Rand ≤${formatNum(lim100.rand)} µL.`,
          "success"
        );
        elements.calculateBtn.disabled = true;
        elements.calculateBtn.textContent = "Pre-Calibration Complete";
        elements.postSection.classList.add("hidden");

        if (readSessionMeta()) {
          // enable Export right away
          saveSession(phaseResults, null, true);
        } else {
          updateStatus(
            "Fill in Session Details at the top before exporting a report.",
            "fail"
          );
        }
      } else {
        updateStatus(
          `⚠️ Pre-Calibration FAILED (100%). ISO limits: Sys ±${formatNum(
            lim100.sys
          )} µL, Rand ≤${formatNum(
            lim100.rand
          )} µL. Proceeding to Post-Calibration.`,
          "fail"
        );
        currentPhase = "Post";
        elements.preSection.classList.remove("phase-active");
        elements.postSection.classList.remove("hidden");
        elements.postSection.classList.add("phase-active");
        elements.calculateBtn.textContent = "Check Post-Calibration";
        buildSetpointInputs(elements.postContainer, "Post");
        scrollToElement(elements.postSection);
      }
    } else {
      // Current phase is 'Post'
      const preResults = JSON.parse(
        localStorage.getItem("pipetteCalPreResults")
      );
      localStorage.setItem(
        "pipetteCalPostResults",
        JSON.stringify(phaseResults)
      );

      if (!preResults) {
        updateStatus(
          "Error: Pre-calibration results not found. Please start over.",
          "fail"
        );
        initializeApp();
        return;
      }

      // Render tables/charts with both phases, status included for all setpoints
      renderSummaryTable(["Pre", "Post"], [preResults, phaseResults]);
      renderAllCharts([preResults, phaseResults], ["Pre", "Post"]);
      elements.resultsSection.classList.remove("hidden");

      // Evaluate Post-Calibration pass/fail based ONLY on the 100% point result
      const postStats100 = phaseResults[1.0];
      const postOverallPass =
        postStats100 &&
        typeof postStats100.passSys === "boolean" &&
        typeof postStats100.passRand === "boolean"
          ? postStats100.passSys && postStats100.passRand
          : false;

      if (postOverallPass) {
        updateStatus(
          `✅ Post-Calibration PASSED (based on 100% setpoint). Pipette is now within tolerance.`,
          "success"
        );
        renderFinalComparison(preResults, phaseResults, true);
      } else {
        updateStatus(
          `❌ Post-Calibration FAILED (based on 100% setpoint). Pipette still out of tolerance. Requires service.`,
          "fail"
        );
        renderFinalComparison(preResults, phaseResults, false);
      }

      if (readSessionMeta()) {
        saveSession(preResults, phaseResults, postOverallPass);
      } else {
        updateStatus(
          "Fill in Session Details at the top before exporting a report.",
          "fail"
        );
      }

      elements.calculateBtn.disabled = true;
      elements.calculateBtn.textContent = "Calibration Complete";
      setExportEnabled(true);

      scrollToElement(elements.resultsSection);
    }
  }

  function renderSummaryTable(phases, resultsArray) {
    elements.summaryTbody.innerHTML = "";
    const nominalVol = parseFloat(elements.nominalVolInput.value);
    phases.forEach((phaseLabel, phaseIndex) => {
      const results = resultsArray[phaseIndex];
      if (!results) {
        console.error(`Missing results data for phase: ${phaseLabel}`);
        return;
      }
      SETPOINTS.forEach((sp) => {
        const stats = results[sp];
        if (!stats) {
          console.warn(`Missing stats for ${phaseLabel} ${sp * 100}%`);
          const tr = elements.summaryTbody.insertRow();
          tr.innerHTML = `<td>${phaseLabel}</td><td>${Math.round(
            sp * 100
          )}%</td><td colspan="5" style="text-align:center; font-style:italic; color: var(--danger-color);">Data Missing</td>`;
          return;
        }
        const target = nominalVol * sp;
        const limits = stats.limits;
        const tr = elements.summaryTbody.insertRow();
        tr.innerHTML = `<td>${phaseLabel}</td><td>${Math.round(
          sp * 100
        )}%</td><td>${formatNum(target, 1)}</td><td>${formatNum(
          stats.Mean
        )}</td><td>${formatNum(stats.Sys)}</td><td>${formatNum(
          stats.Rand
        )}</td><td class="status-cell-${getStatusClass(
          stats.passSys,
          stats.passRand
        )}">${getStatusText(stats.passSys, stats.passRand, limits)}</td>`;
      });
    });
  }

  function getStatusClass(passSys, passRand) {
    if (passSys === null || passRand === null) return "na";
    return passSys && passRand ? "pass" : "fail";
  }

  function getStatusText(passSys, passRand, limits) {
    if (passSys === null || passRand === null) return "N/A";
    if (passSys && passRand) return "PASS";
    let reasons = [];
    if (!passSys) reasons.push("Sys");
    if (!passRand) reasons.push("Rand");
    return `FAIL (${reasons.join("/")})`;
  }

  function renderFinalComparison(preResults, postResults, postPass) {
    const preSys100 = preResults?.[1.0]?.Sys;
    const preRand100 = preResults?.[1.0]?.Rand;
    const postSys100 = postResults?.[1.0]?.Sys;
    const postRand100 = postResults?.[1.0]?.Rand;
    if (
      preSys100 === undefined ||
      preRand100 === undefined ||
      postSys100 === undefined ||
      postRand100 === undefined
    ) {
      elements.comparisonText.innerHTML = `<span style="color: var(--danger-color);">Could not compare results due to missing data.</span>`;
      elements.finalComparison.classList.remove("hidden");
      return;
    }
    let comparisonHTML = `<strong>100% Setpoint Changes:</strong><br>Systematic Error: ${formatNum(
      preSys100
    )} µL → ${formatNum(postSys100)} µL<br>Random Error: ${formatNum(
      preRand100
    )} µL → ${formatNum(postRand100)} µL<br><br>`;
    if (postPass) {
      comparisonHTML += `<span style="color: var(--success-color);">Adjustment successful. Pipette performance improved to within ISO 8655 limits.</span>`;
    } else {
      comparisonHTML += `<span style="color: var(--danger-color);">Adjustment did not bring the pipette within limits. Further service or investigation is required.</span>`;
    }
    elements.comparisonText.innerHTML = comparisonHTML;
    elements.finalComparison.classList.remove("hidden");
  }

  function updateStatus(message, type = "info") {
    elements.statusMessage.textContent = message;
    elements.statusMessage.className = `status-box status-${type}`;
  }

  function scrollToElement(element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function renderAllCharts(resultsArray, phases) {
    const labels = SETPOINTS.map((sp) => `${Math.round(sp * 100)}% Target`);
    const datasetsVolume = [];
    const datasetsSysErr = [];
    const datasetsRandErr = [];
    const colors = ["#0D5AC6", "#EC0048", "#28a745", "#ffc107"];
    phases.forEach((phaseLabel, index) => {
      const results = resultsArray[index];
      if (!results) {
        console.warn(
          `Skipping chart rendering for phase ${phaseLabel} due to missing results.`
        );
        return;
      }
      const color = colors[index % colors.length];
      const getData = (sp, key) => results[sp]?.[key] ?? NaN;
      datasetsVolume.push({
        label: `${phaseLabel} Mean Vol`,
        data: SETPOINTS.map((sp) => getData(sp, "Mean")),
        borderColor: color,
        backgroundColor: `${color}80`,
        tension: 0.1,
        fill: false,
        type: "line",
        pointRadius: 5,
        pointHoverRadius: 7,
      });
      if (index === 0) {
        datasetsVolume.push({
          label: "Target Vol",
          data: SETPOINTS.map((sp) => getData(sp, "target")),
          borderColor: "#6c757d",
          borderDash: [5, 5],
          fill: false,
          type: "line",
          pointRadius: 0,
        });
      }
      datasetsSysErr.push({
        label: `${phaseLabel} Sys Err`,
        data: SETPOINTS.map((sp) => getData(sp, "Sys")),
        backgroundColor: `${color}B3`,
        borderColor: color,
        borderWidth: 1,
        type: "bar",
      });
      if (index === 0) {
        const limitSys = results[1.0]?.limits?.systematic ?? NaN;
        if (!isNaN(limitSys)) {
          datasetsSysErr.push({
            label: "Sys Limit (+)",
            data: Array(SETPOINTS.length).fill(limitSys),
            borderColor: "rgba(220, 53, 69, 0.7)",
            borderDash: [5, 5],
            fill: false,
            type: "line",
            pointRadius: 0,
          });
          datasetsSysErr.push({
            label: "Sys Limit (-)",
            data: Array(SETPOINTS.length).fill(-limitSys),
            borderColor: "rgba(220, 53, 69, 0.7)",
            borderDash: [5, 5],
            fill: false,
            type: "line",
            pointRadius: 0,
          });
        }
      }
      datasetsRandErr.push({
        label: `${phaseLabel} Rand Err (SD)`,
        data: SETPOINTS.map((sp) => getData(sp, "Rand")),
        backgroundColor: `${color}B3`,
        borderColor: color,
        borderWidth: 1,
        type: "bar",
      });
      if (index === 0) {
        const limitRand = results[1.0]?.limits?.random ?? NaN;
        if (!isNaN(limitRand)) {
          datasetsRandErr.push({
            label: "Rand Limit",
            data: Array(SETPOINTS.length).fill(limitRand),
            borderColor: "rgba(255, 193, 7, 0.7)",
            borderDash: [5, 5],
            fill: false,
            type: "line",
            pointRadius: 0,
          });
        }
      }
    });
    Object.values(chartInstances).forEach((chart) => chart?.destroy());
    if (datasetsVolume.length > 0) {
      chartInstances.volume = new Chart(
        elements.volumeChartCanvas,
        createChartConfig(labels, datasetsVolume, "Volume (µL)")
      );
    }
    if (datasetsSysErr.length > 0) {
      chartInstances.sysErr = new Chart(
        elements.sysErrChartCanvas,
        createChartConfig(labels, datasetsSysErr, "Systematic Error (µL)")
      );
    }
    if (datasetsRandErr.length > 0) {
      chartInstances.randErr = new Chart(
        elements.randErrChartCanvas,
        createChartConfig(labels, datasetsRandErr, "Random Error (SD) (µL)")
      );
    }
  }

  function createChartConfig(labels, datasets, yAxisLabel) {
    return {
      data: {
        labels,
        datasets,
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            mode: "index",
            intersect: false,
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || "";
                if (label) {
                  label += ": ";
                }
                if (context.parsed.y !== null) {
                  label += formatNum(context.parsed.y, 3) + " µL";
                }
                return label;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: yAxisLabel.includes("Random Error"),
            title: {
              display: true,
              text: yAxisLabel,
            },
          },
          x: {
            title: {
              display: true,
              text: "Setpoint",
            },
          },
        },
        interaction: {
          mode: "index",
          intersect: false,
        },
      },
    };
  }

  function initializeApp() {
    Object.values(chartInstances).forEach((chart) => chart?.destroy());
    chartInstances = {};
    buildSetpointInputs(elements.preContainer, "Pre");
    elements.calculateBtn.textContent = "Check Pre-Calibration";
    elements.calculateBtn.disabled = false;
    elements.postSection.classList.add("hidden");
    elements.preSection.classList.add("phase-active");
    elements.postSection.classList.remove("phase-active");
    elements.resultsSection.classList.add("hidden");
    elements.finalComparison.classList.add("hidden");
    updateStatus("Enter setup details and Pre-Calibration readings.", "info");
    currentPhase = "Pre";
    localStorage.removeItem("pipetteCalPreResults");
    localStorage.removeItem("pipetteCalPostResults");
  }
  elements.nominalVolInput.addEventListener("change", () => {
    buildSetpointInputs(elements.preContainer, "Pre");
    if (
      currentPhase === "Post" &&
      !elements.postSection.classList.contains("hidden")
    ) {
      buildSetpointInputs(elements.postContainer, "Post");
    }
    elements.resultsSection.classList.add("hidden");
    elements.finalComparison.classList.add("hidden");
    elements.calculateBtn.disabled = false;
    updateStatus("Setup changed. Enter Pre-Calibration readings.", "info");
    currentPhase = "Pre";
    elements.preSection.classList.add("phase-active");
    elements.postSection.classList.add("hidden");
    elements.postSection.classList.remove("phase-active");
  });
  elements.numReadingsInput.addEventListener("change", () => {
    buildSetpointInputs(elements.preContainer, "Pre");
    if (
      currentPhase === "Post" &&
      !elements.postSection.classList.contains("hidden")
    ) {
      buildSetpointInputs(elements.postContainer, "Post");
    }
    elements.resultsSection.classList.add("hidden");
    elements.finalComparison.classList.add("hidden");
    elements.calculateBtn.disabled = false;
    updateStatus(
      "Number of readings changed. Enter Pre-Calibration readings.",
      "info"
    );
    currentPhase = "Pre";
    elements.preSection.classList.add("phase-active");
    elements.postSection.classList.add("hidden");
    elements.postSection.classList.remove("phase-active");
  });
  elements.fastEntryCheckbox.addEventListener("change", () => {
    fastEntryMode = elements.fastEntryCheckbox.checked;
    // rebuild current phase inputs with the new mode
    buildSetpointInputs(elements.preContainer, "Pre");
    if (
      currentPhase === "Post" &&
      !elements.postSection.classList.contains("hidden")
    ) {
      buildSetpointInputs(elements.postContainer, "Post");
    }
  });
  // --- Event Listener Toggles ---
  // Generic toggle function
  function setupCollapsibleSection(toggleElement, sectionElement) {
    if (toggleElement && sectionElement) {
      toggleElement.addEventListener("click", () => {
        const isCollapsed = sectionElement.classList.toggle("collapsed");
        toggleElement.setAttribute("aria-expanded", !isCollapsed);
        const icon = toggleElement.querySelector(".info-toggle-icon");
        if (icon) {
          icon.textContent = isCollapsed ? "▶" : "▼";
        }
      });
      toggleElement.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleElement.click();
        }
      });
    } else {
      console.error(
        "Toggle element or section not found for:",
        toggleElement || sectionElement
      );
    }
  }

  // Setup both collapsible sections
  setupCollapsibleSection(elements.infoToggle, elements.infoSection);
  setupCollapsibleSection(
    elements.practicalGuideToggle,
    elements.practicalGuideSection
  );
  initializeApp();
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./sw.js")
      .then((reg) => {
        reg.update(); // always check for new SW
        console.log("Service-worker scope:", reg.scope);
      })
      .catch((err) => console.error("SW registration failed:", err));
  }
});
