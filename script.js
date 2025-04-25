// script.js

// ── Constants and Lookups ───────────────────────────────────

// Z-factor Table (ensure this is complete as per your source)
const CF_TABLE = {
  "15.0": {
    "80": 1.0017,
    "85": 1.0018,
    "90": 1.0019,
    "95": 1.0019,
    "100": 1.0020,
    "101": 1.0020,
    "105": 1.0020
  },
  "15.5": {
    "80": 1.0018,
    "85": 1.0019,
    "90": 1.0019,
    "95": 1.0020,
    "100": 1.0020,
    "101": 1.0020,
    "105": 1.0021
  },
  "16.0": {
    "80": 1.0019,
    "85": 1.0020,
    "90": 1.0020,
    "95": 1.0021,
    "100": 1.0021,
    "101": 1.0021,
    "105": 1.0022
  },
  "16.5": {
    "80": 1.0020,
    "85": 1.0021,
    "90": 1.0021,
    "95": 1.0022,
    "100": 1.0022,
    "101": 1.0022,
    "105": 1.0023
  },
  "17.0": {
    "80": 1.0021,
    "85": 1.0022,
    "90": 1.0022,
    "95": 1.0023,
    "100": 1.0023,
    "101": 1.0023,
    "105": 1.0024
  },
  "17.5": {
    "80": 1.0022,
    "85": 1.0023,
    "90": 1.0024,
    "95": 1.0024,
    "100": 1.0024,
    "101": 1.0024,
    "105": 1.0025
  },
  "18.0": {
    "80": 1.0023,
    "85": 1.0024,
    "90": 1.0025,
    "95": 1.0025,
    "100": 1.0025,
    "101": 1.0025,
    "105": 1.0026
  },
  "18.5": {
    "80": 1.0024,
    "85": 1.0025,
    "90": 1.0026,
    "95": 1.0026,
    "100": 1.0026,
    "101": 1.0026,
    "105": 1.0027
  },
  "19.0": {
    "80": 1.0026,
    "85": 1.0027,
    "90": 1.0027,
    "95": 1.0027,
    "100": 1.0027,
    "101": 1.0028,
    "105": 1.0028
  },
  "19.5": {
    "80": 1.0027,
    "85": 1.0028,
    "90": 1.0028,
    "95": 1.0028,
    "100": 1.0029,
    "101": 1.0029,
    "105": 1.0029
  },
  "20.0": {
    "80": 1.0028,
    "85": 1.0029,
    "90": 1.0029,
    "95": 1.0030,
    "100": 1.0030,
    "101": 1.0030,
    "105": 1.0031
  },
  "20.5": {
    "80": 1.0030,
    "85": 1.0030,
    "90": 1.0031,
    "95": 1.0031,
    "100": 1.0031,
    "101": 1.0031,
    "105": 1.0032
  },
  "21.0": {
    "80": 1.0031,
    "85": 1.0032,
    "90": 1.0032,
    "95": 1.0032,
    "100": 1.0033,
    "101": 1.0033,
    "105": 1.0033
  },
  "21.5": {
    "80": 1.0032,
    "85": 1.0033,
    "90": 1.0033,
    "95": 1.0034,
    "100": 1.0034,
    "101": 1.0034,
    "105": 1.0035
  },
  "22.0": {
    "80": 1.0034,
    "85": 1.0034,
    "90": 1.0035,
    "95": 1.0035,
    "100": 1.0035,
    "101": 1.0036,
    "105": 1.0036
  },
  "22.5": {
    "80": 1.0035,
    "85": 1.0036,
    "90": 1.0036,
    "95": 1.0037,
    "100": 1.0037,
    "101": 1.0037,
    "105": 1.0038
  },
  "23.0": {
    "80": 1.0037,
    "85": 1.0037,
    "90": 1.0038,
    "95": 1.0038,
    "100": 1.0038,
    "101": 1.0039,
    "105": 1.0039
  },
  "23.5": {
    "80": 1.0038,
    "85": 1.0039,
    "90": 1.0039,
    "95": 1.0040,
    "100": 1.0040,
    "101": 1.0040,
    "105": 1.0041
  },
  "24.0": {
    "80": 1.0040,
    "85": 1.0040,
    "90": 1.0041,
    "95": 1.0041,
    "100": 1.0042,
    "101": 1.0042,
    "105": 1.0042
  },
  "24.5": {
    "80": 1.0041,
    "85": 1.0042,
    "90": 1.0042,
    "95": 1.0043,
    "100": 1.0043,
    "101": 1.0043,
    "105": 1.0044
  },
  "25.0": {
    "80": 1.0043,
    "85": 1.0043,
    "90": 1.0044,
    "95": 1.0044,
    "100": 1.0045,
    "101": 1.0045,
    "105": 1.0045
  },
  "25.5": {
    "80": 1.0044,
    "85": 1.0045,
    "90": 1.0045,
    "95": 1.0046,
    "100": 1.0046,
    "101": 1.0046,
    "105": 1.0047
  },
  "26.0": {
    "80": 1.0046,
    "85": 1.0047,
    "90": 1.0047,
    "95": 1.0048,
    "100": 1.0048,
    "101": 1.0048,
    "105": 1.0049
  },
  "26.5": {
    "80": 1.0047,
    "85": 1.0048,
    "90": 1.0049,
    "95": 1.0049,
    "100": 1.0050,
    "101": 1.0050,
    "105": 1.0050
  },
  "27.0": {
    "80": 1.0049,
    "85": 1.0050,
    "90": 1.0050,
    "95": 1.0051,
    "100": 1.0051,
    "101": 1.0051,
    "105": 1.0052
  },
  "27.5": {
    "80": 1.0051,
    "85": 1.0051,
    "90": 1.0052,
    "95": 1.0052,
    "100": 1.0053,
    "101": 1.0053,
    "105": 1.0054
  },
  "28.0": {
    "80": 1.0052,
    "85": 1.0053,
    "90": 1.0054,
    "95": 1.0054,
    "100": 1.0055,
    "101": 1.0055,
    "105": 1.0055
  },
  "28.5": {
    "80": 1.0054,
    "85": 1.0055,
    "90": 1.0055,
    "95": 1.0056,
    "100": 1.0056,
    "101": 1.0056,
    "105": 1.0057
  },
  "29.0": {
    "80": 1.0056,
    "85": 1.0056,
    "90": 1.0057,
    "95": 1.0057,
    "100": 1.0058,
    "101": 1.0058,
    "105": 1.0059
  },
  "29.5": {
    "80": 1.0057,
    "85": 1.0058,
    "90": 1.0059,
    "95": 1.0059,
    "100": 1.0060,
    "101": 1.0060,
    "105": 1.0060
  },
  "30.0": {
    "80": 1.0059,
    "85": 1.0060,
    "90": 1.0060,
    "95": 1.0061,
    "100": 1.0061,
    "101": 1.0062,
    "105": 1.0062
  }
};
const PERM_ERRORS = [{
  nom: 1,
  sysL: 0.050,
  sysP: 5.0,
  randL: 0.050,
  randP: 5.0
}, {
  nom: 2,
  sysL: 0.080,
  sysP: 4.0,
  randL: 0.040,
  randP: 2.0
},
{
  nom: 5,
  sysL: 0.13,
  sysP: 2.5,
  randL: 0.08,
  randP: 1.5
}, {
  nom: 10,
  sysL: 0.20,
  sysP: 2.0,
  randL: 0.10,
  randP: 1.0
},
{
  nom: 20,
  sysL: 0.40,
  sysP: 2.0,
  randL: 0.16,
  randP: 0.8
}, {
  nom: 50,
  sysL: 0.70,
  sysP: 1.4,
  randL: 0.30,
  randP: 0.6
},
{
  nom: 100,
  sysL: 1.50,
  sysP: 1.5,
  randL: 0.60,
  randP: 0.6
}, {
  nom: 200,
  sysL: 3.00,
  sysP: 1.5,
  randL: 0.80,
  randP: 0.4
},
{
  nom: 500,
  sysL: 6.00,
  sysP: 1.2,
  randL: 2.00,
  randP: 0.4
}, {
  nom: 1000,
  sysL: 12.0,
  sysP: 1.2,
  randL: 4.00,
  randP: 0.4
},
{
  nom: 2000,
  sysL: 24.0,
  sysP: 1.2,
  randL: 6.00,
  randP: 0.3
}, {
  nom: 5000,
  sysL: 60.0,
  sysP: 1.2,
  randL: 15.0,
  randP: 0.3
},
{
  nom: 10000,
  sysL: 120.0,
  sysP: 1.2,
  randL: 30.0,
  randP: 0.3
}
];
const SETPOINTS = [0.10, 0.50, 1.00];
const DEFAULT_PRECISION = 3;

// ── Utility Functions ─────────────────────────────────────
function densityWater(tempC) {
  const t = tempC;
  const rho_kg_m3 = (999.842594 + 6.793952e-2 * t - 9.095290e-3 * t ** 2 + 1.001685e-4 * t ** 3 - 1.120083e-6 * t ** 4 + 6.536332e-9 * t ** 5);
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

function nearestKey(val, keys) {
  if (!keys || keys.length === 0) return undefined;
  return keys.reduce((best, k) => Math.abs(k - val) < Math.abs(best - val) ? k : best, keys[0]);
}

function getZfactor(temp, pressure) {
  const temps = Object.keys(CF_TABLE).map(parseFloat);
  const nearestT = nearestKey(temp, temps);
  if (nearestT === undefined) return 1.0;
  const tempKey = nearestT.toFixed(1);
  const row = CF_TABLE[tempKey];
  if (!row) {
    console.warn(`No Z-factor data found for temperature: ${tempKey}`);
    return 1.0;
  }
  const pressures = Object.keys(row).map(parseFloat);
  const nearestP = nearestKey(pressure, pressures);
  if (nearestP === undefined) return 1.0;
  return row[nearestP.toString()] ?? 1.0;
}

function lookupPermLimits(nominalVol) {
  const bestMatch = PERM_ERRORS.reduce((best, current) => {
    const diffBest = Math.abs(best.nom - nominalVol);
    const diffCurrent = Math.abs(current.nom - nominalVol);
    if (diffCurrent < diffBest || (diffCurrent === diffBest && current.nom < best.nom)) {
      return current;
    }
    return best;
  });
  const limitSys = Math.min((bestMatch.sysP / 100) * nominalVol, bestMatch.sysL);
  const limitRand = Math.min((bestMatch.randP / 100) * nominalVol, bestMatch.randL);
  return {
    systematic: limitSys,
    random: limitRand,
    sourceNominal: bestMatch.nom
  };
}

function formatNum(num, places = 2) {
  if (isNaN(num) || num === null || num === undefined) return 'N/A';
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
    if (stepString.includes('.')) {
      return stepString.split('.')[1].length;
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
    this.container.innerHTML = '';
    this.container.classList.add('digit-spinner');
    this.container.setAttribute('tabindex', '0');
    this.digitsDisplay = document.createElement('div');
    this.digitsDisplay.className = 'spinner-digits';
    this.container.appendChild(this.digitsDisplay);
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'spinner-controls';
    this.downButton = document.createElement('button');
    this.downButton.type = 'button';
    this.downButton.className = 'spinner-btn spinner-down';
    this.downButton.textContent = '-';
    this.downButton.setAttribute('aria-label', 'Decrease value');
    controlsDiv.appendChild(this.downButton);
    this.upButton = document.createElement('button');
    this.upButton.type = 'button';
    this.upButton.className = 'spinner-btn spinner-up';
    this.upButton.textContent = '+';
    this.upButton.setAttribute('aria-label', 'Increase value');
    controlsDiv.appendChild(this.upButton);
    this.container.appendChild(controlsDiv);
  }
  _addEventListeners() {
    this.upButton.addEventListener('click', () => this.stepUp());
    this.downButton.addEventListener('click', () => this.stepDown());
    this.container.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          this.stepUp();
          break;
        case 'ArrowDown':
          e.preventDefault();
          this.stepDown();
          break;
      }
    });
  }
  render() {
    const valueString = this._value.toFixed(this._precision);
    this.digitsDisplay.innerHTML = '';
    const [integerPart, fractionalPart] = valueString.split('.');
    integerPart.split('').forEach(digitChar => {
      const digitSpan = document.createElement('span');
      digitSpan.className = 'digit';
      digitSpan.textContent = digitChar;
      this.digitsDisplay.appendChild(digitSpan);
    });
    if (this._precision > 0) {
      const decimalPointSpan = document.createElement('span');
      decimalPointSpan.className = 'decimal-point';
      decimalPointSpan.textContent = '.';
      this.digitsDisplay.appendChild(decimalPointSpan);
      (fractionalPart || '').padEnd(this._precision, '0').split('').forEach(digitChar => {
        const digitSpan = document.createElement('span');
        digitSpan.className = 'digit';
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
  const validMasses = mgArr.filter(mg => typeof mg === 'number' && !isNaN(mg) && mg >= 0);
  if (validMasses.length === 0) {
    return {
      Mean: NaN,
      SD: NaN,
      Sys: NaN,
      Rand: NaN,
      N: 0,
      vols: []
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
      vols: []
    };
  }
  const vols = validMasses.map(mg => (mg * Z) / rho);
  const meanVol = mean(vols);
  const sdVol = stddev(vols);
  const sysErr = meanVol - targetUl;
  return {
    Mean: meanVol,
    SD: sdVol,
    Sys: sysErr,
    Rand: sdVol,
    N: validMasses.length,
    vols: vols
  };
}

// ── DOM Manipulation & UI Logic ───────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const elements = {
    nominalVolInput: document.getElementById('nominal_vol'),
    tempCInput: document.getElementById('temp_c'),
    pressureKpaInput: document.getElementById('pressure_kpa'),
    numReadingsInput: document.getElementById('num_readings'),
    preContainer: document.getElementById('setpoints-pre'),
    postContainer: document.getElementById('setpoints-post'),
    preSection: document.getElementById('pre-section'),
    postSection: document.getElementById('post-section'),
    calculateBtn: document.getElementById('calculate-btn'),
    statusMessage: document.getElementById('status-message'),
    resultsSection: document.getElementById('results'),
    summaryTbody: document.getElementById('summary-tbody'),
    finalComparison: document.getElementById('final-comparison'),
    comparisonText: document.getElementById('comparison-text'),
    volumeChartCanvas: document.getElementById('chart-volume'),
    sysErrChartCanvas: document.getElementById('chart-syserr'),
    randErrChartCanvas: document.getElementById('chart-randerr'),
    infoSection: document.getElementById('info-section'),
    infoToggle: document.getElementById('info-toggle'),
    infoContent: document.getElementById('info-content'),
    infoToggleIcon: document.querySelector('#info-toggle .info-toggle-icon'), // Get the icon span
    practicalGuideSection: document.getElementById('practical-guide-section'),
    practicalGuideToggle: document.getElementById('practical-guide-toggle'),
    practicalGuideContent: document.getElementById('practical-guide-content')
  };
  let currentPhase = 'Pre';
  let chartInstances = {};

  function buildSetpointInputs(container, phaseLabel) {
    container.innerHTML = '';
    const nominalVol = parseFloat(elements.nominalVolInput.value) || 0;
    const numReadings = parseInt(elements.numReadingsInput.value) || 5;
    if (nominalVol <= 0) {
      container.innerHTML = `<div class="placeholder-text">Enter a valid Nominal Volume above.</div>`;
      return;
    }
    SETPOINTS.forEach(sp => {
      const targetVol = nominalVol * sp;
      const targetMass = targetVol;
      const pct = Math.round(sp * 100);
      const setpointDiv = document.createElement('div');
      setpointDiv.className = 'measurement-setpoint';
      setpointDiv.id = `setpoint-${phaseLabel.toLowerCase()}-${sp}`;
      setpointDiv.innerHTML = `<h4>${pct}% Setpoint <span style="font-weight:400; color:var(--text-muted)">(${formatNum(targetVol, 1)} µL)</span></h4>`;
      const readingsContainer = document.createElement('div');
      readingsContainer.className = 'readings-container';
      for (let i = 1; i <= numReadings; i++) {
        const spinnerContainer = document.createElement('div');
        spinnerContainer.dataset.phase = phaseLabel;
        spinnerContainer.dataset.sp = sp;
        new DigitSpinner(spinnerContainer, {
          initialValue: targetMass,
          step: 0.1,
          min: 0,
          max: nominalVol * 1.5,
          precision: DEFAULT_PRECISION
        });
        readingsContainer.appendChild(spinnerContainer);
      }
      setpointDiv.appendChild(readingsContainer);
      container.appendChild(setpointDiv);
    });
    console.log(`Built inputs for Phase: ${phaseLabel}, Container children: ${container.children.length}`);
  }

  function getReadingsForPhase(phaseLabel) {
    const container = (phaseLabel === 'Pre') ? elements.preContainer : elements.postContainer;
    let allStats = {};
    let isValid = true;
    let missingData = false;
    SETPOINTS.forEach(sp => {
      const spinnerContainers = container.querySelectorAll(`.digit-spinner[data-phase="${phaseLabel}"][data-sp="${sp}"]`);
      if (spinnerContainers.length === 0) {
        console.warn(`No spinner containers found for ${phaseLabel} ${sp * 100}%`);
        missingData = true;
        return;
      }
      const massesMg = Array.from(spinnerContainers).map(sc => sc.spinnerInstance?.getValue()).filter(val => typeof val === 'number' && !isNaN(val) && val >= 0);
      if (massesMg.length < Math.min(3, spinnerContainers.length)) {
        console.warn(`Insufficient valid readings for ${phaseLabel} ${sp * 100}% (${massesMg.length} / ${spinnerContainers.length}).`);
        isValid = false;
        const setpointBlock = document.getElementById(`setpoint-${phaseLabel.toLowerCase()}-${sp}`);
        setpointBlock?.classList.add('input-error');
      } else {
        const setpointBlock = document.getElementById(`setpoint-${phaseLabel.toLowerCase()}-${sp}`);
        setpointBlock?.classList.remove('input-error');
      }
      allStats[sp] = massesMg;
    });
    if (missingData || Object.keys(allStats).length !== SETPOINTS.length) {
      updateStatus("Error: Input fields missing for one or more setpoints. Please check setup.", 'fail');
      return null;
    }
    if (!isValid) {
      updateStatus("Please ensure at least 3 valid readings (use +/- buttons) for each setpoint.", 'fail');
      return null;
    }
    return allStats;
  }

  elements.calculateBtn.addEventListener('click', handleCalculation);

  function handleCalculation() {
    const nominalVol = parseFloat(elements.nominalVolInput.value);
    const tempC = parseFloat(elements.tempCInput.value);
    const pressureKpa = parseFloat(elements.pressureKpaInput.value);
    if (isNaN(nominalVol) || nominalVol <= 0 || isNaN(tempC) || isNaN(pressureKpa)) {
      updateStatus("Please enter valid numerical Setup Details.", 'fail');
      return;
    }

    const readings = getReadingsForPhase(currentPhase);
    if (!readings) return;

    let phaseResults = {};
    // Default overallPass to true ONLY for the purpose of the 100% check below.
    // Individual setpoint passes are determined within the loop.
    let overallPass = true;
    const limits = lookupPermLimits(nominalVol); // Get limits based on nominal volume ONCE.

    for (const sp of SETPOINTS) {
      if (!readings[sp]) {
        console.error(`Missing readings data for setpoint ${sp} in phase ${currentPhase}`);
        // Assign default fail status if data missing for a setpoint
        phaseResults[sp] = {
          Mean: NaN,
          SD: NaN,
          Sys: NaN,
          Rand: NaN,
          N: 0,
          vols: [],
          target: nominalVol * sp,
          limits: limits,
          passSys: false,
          passRand: false
        };
        if (sp === 1.0) overallPass = false; // Fail overall if 100% data missing
        continue;
      }

      const targetUl = nominalVol * sp;
      const stats = computeStats(readings[sp], targetUl, tempC, pressureKpa);
      stats.target = targetUl;
      stats.limits = limits; // Attach the common limits object

      // --- MODIFICATION START ---
      // Calculate pass/fail status for THIS setpoint (sp = 0.1, 0.5, or 1.0)
      if (isNaN(stats.Mean) || isNaN(stats.Sys) || isNaN(stats.Rand)) {
        console.warn(`Calculation resulted in NaN for ${currentPhase} ${sp * 100}%. Inputs:`, readings[sp]);
        stats.passSys = false; // Calculation failed, so status is Fail
        stats.passRand = false;
      } else {
        // Compare this setpoint's errors against the nominal limits
        stats.passSys = Math.abs(stats.Sys) <= limits.systematic;
        stats.passRand = stats.Rand <= limits.random;
      }
      // --- MODIFICATION END ---

      // Determine overall pass/fail for the *entire phase* based ONLY on the 100% setpoint result.
      if (sp === 1.0) {
        overallPass = stats.passSys && stats.passRand; // Update overallPass based on 100% status
      }

      phaseResults[sp] = stats; // Store results for this setpoint
    }

    // Check if results were generated for all setpoints (might have failed if data was missing)
    if (Object.keys(phaseResults).length !== SETPOINTS.length) {
      updateStatus("Error: Could not calculate results for all setpoints.", 'fail');
      console.error("Phase Results Object:", phaseResults);
      return;
    }

    // --- Update UI based on phase and results ---
    if (currentPhase === 'Pre') {
      localStorage.setItem('pipetteCalPreResults', JSON.stringify(phaseResults));
      // Pass the calculated results which now include pass/fail for all setpoints
      renderSummaryTable(['Pre'], [phaseResults]);
      renderAllCharts([phaseResults], ['Pre']);
      elements.resultsSection.classList.remove('hidden');
      scrollToElement(elements.resultsSection);

      // Decision to proceed is still based on overallPass (100% point)
      if (overallPass) {
        updateStatus(`✅ Pre-Calibration PASSED (based on 100% setpoint). No adjustment needed. Limits: Sys ±${formatNum(limits.systematic)} µL, Rand ≤${formatNum(limits.random)} µL.`, 'success');
        elements.calculateBtn.disabled = true;
        elements.calculateBtn.textContent = 'Pre-Calibration Complete';
        elements.postSection.classList.add('hidden');
      } else {
        updateStatus(`⚠️ Pre-Calibration FAILED (based on 100% setpoint). Adjustment required. Limits: Sys ±${formatNum(limits.systematic)} µL, Rand ≤${formatNum(limits.random)} µL. Proceed to Post-Calibration.`, 'fail');
        currentPhase = 'Post';
        elements.preSection.classList.remove('phase-active');
        elements.postSection.classList.remove('hidden');
        elements.postSection.classList.add('phase-active');
        elements.calculateBtn.textContent = 'Check Post-Calibration';
        buildSetpointInputs(elements.postContainer, 'Post');
        scrollToElement(elements.postSection);
      }
    } else { // Current phase is 'Post'
      const preResults = JSON.parse(localStorage.getItem('pipetteCalPreResults'));
      localStorage.setItem('pipetteCalPostResults', JSON.stringify(phaseResults));

      if (!preResults) {
        updateStatus("Error: Pre-calibration results not found. Please start over.", 'fail');
        initializeApp();
        return;
      }

      // Render tables/charts with both phases, status included for all setpoints
      renderSummaryTable(['Pre', 'Post'], [preResults, phaseResults]);
      renderAllCharts([preResults, phaseResults], ['Pre', 'Post']);
      elements.resultsSection.classList.remove('hidden');

      // Evaluate Post-Calibration pass/fail based ONLY on the 100% point result
      const postStats100 = phaseResults[1.0];
      const postOverallPass = postStats100 && typeof postStats100.passSys === 'boolean' && typeof postStats100.passRand === 'boolean' ?
        postStats100.passSys && postStats100.passRand : false;

      if (postOverallPass) {
        updateStatus(`✅ Post-Calibration PASSED (based on 100% setpoint). Pipette is now within tolerance.`, 'success');
        renderFinalComparison(preResults, phaseResults, true);
      } else {
        updateStatus(`❌ Post-Calibration FAILED (based on 100% setpoint). Pipette still out of tolerance. Requires service.`, 'fail');
        renderFinalComparison(preResults, phaseResults, false);
      }

      elements.calculateBtn.disabled = true;
      elements.calculateBtn.textContent = 'Calibration Complete';
      scrollToElement(elements.resultsSection);
    }
  }

  function renderSummaryTable(phases, resultsArray) {
    elements.summaryTbody.innerHTML = '';
    const nominalVol = parseFloat(elements.nominalVolInput.value);
    phases.forEach((phaseLabel, phaseIndex) => {
      const results = resultsArray[phaseIndex];
      if (!results) {
        console.error(`Missing results data for phase: ${phaseLabel}`);
        return;
      }
      SETPOINTS.forEach(sp => {
        const stats = results[sp];
        if (!stats) {
          console.warn(`Missing stats for ${phaseLabel} ${sp * 100}%`);
          const tr = elements.summaryTbody.insertRow();
          tr.innerHTML = `<td>${phaseLabel}</td><td>${Math.round(sp * 100)}%</td><td colspan="5" style="text-align:center; font-style:italic; color: var(--danger-color);">Data Missing</td>`;
          return;
        }
        const target = nominalVol * sp;
        const limits = stats.limits || lookupPermLimits(nominalVol);
        const tr = elements.summaryTbody.insertRow();
        tr.innerHTML = `<td>${phaseLabel}</td><td>${Math.round(sp * 100)}%</td><td>${formatNum(target, 1)}</td><td>${formatNum(stats.Mean)}</td><td>${formatNum(stats.Sys)}</td><td>${formatNum(stats.Rand)}</td><td class="status-cell-${getStatusClass(stats.passSys, stats.passRand)}">${getStatusText(stats.passSys, stats.passRand, limits)}</td>`;
      });
    });
  }

  function getStatusClass(passSys, passRand) {
    if (passSys === null || passRand === null) return 'na';
    return (passSys && passRand) ? 'pass' : 'fail';
  }

  function getStatusText(passSys, passRand, limits) {
    if (passSys === null || passRand === null) return 'N/A';
    if (passSys && passRand) return 'PASS';
    let reasons = [];
    if (!passSys) reasons.push('Sys');
    if (!passRand) reasons.push('Rand');
    return `FAIL (${reasons.join('/')})`;
  }

  function renderFinalComparison(preResults, postResults, postPass) {
    const preSys100 = preResults?.[1.0]?.Sys;
    const preRand100 = preResults?.[1.0]?.Rand;
    const postSys100 = postResults?.[1.0]?.Sys;
    const postRand100 = postResults?.[1.0]?.Rand;
    if (preSys100 === undefined || preRand100 === undefined || postSys100 === undefined || postRand100 === undefined) {
      elements.comparisonText.innerHTML = `<span style="color: var(--danger-color);">Could not compare results due to missing data.</span>`;
      elements.finalComparison.classList.remove('hidden');
      return;
    }
    let comparisonHTML = `<strong>100% Setpoint Changes:</strong><br>Systematic Error: ${formatNum(preSys100)} µL → ${formatNum(postSys100)} µL<br>Random Error: ${formatNum(preRand100)} µL → ${formatNum(postRand100)} µL<br><br>`;
    if (postPass) {
      comparisonHTML += `<span style="color: var(--success-color);">Adjustment successful. Pipette performance improved to within ISO 8655 limits.</span>`;
    } else {
      comparisonHTML += `<span style="color: var(--danger-color);">Adjustment did not bring the pipette within limits. Further service or investigation is required.</span>`;
    }
    elements.comparisonText.innerHTML = comparisonHTML;
    elements.finalComparison.classList.remove('hidden');
  }

  function updateStatus(message, type = 'info') {
    elements.statusMessage.textContent = message;
    elements.statusMessage.className = `status-box status-${type}`;
  }

  function scrollToElement(element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  function renderAllCharts(resultsArray, phases) {
    const labels = SETPOINTS.map(sp => `${Math.round(sp * 100)}% Target`);
    const datasetsVolume = [];
    const datasetsSysErr = [];
    const datasetsRandErr = [];
    const colors = ['#0D5AC6', '#EC0048', '#28a745', '#ffc107'];
    phases.forEach((phaseLabel, index) => {
      const results = resultsArray[index];
      if (!results) {
        console.warn(`Skipping chart rendering for phase ${phaseLabel} due to missing results.`);
        return;
      }
      const color = colors[index % colors.length];
      const getData = (sp, key) => results[sp]?.[key] ?? NaN;
      datasetsVolume.push({
        label: `${phaseLabel} Mean Vol`,
        data: SETPOINTS.map(sp => getData(sp, 'Mean')),
        borderColor: color,
        backgroundColor: `${color}80`,
        tension: 0.1,
        fill: false,
        type: 'line',
        pointRadius: 5,
        pointHoverRadius: 7
      });
      if (index === 0) {
        datasetsVolume.push({
          label: 'Target Vol',
          data: SETPOINTS.map(sp => getData(sp, 'target')),
          borderColor: '#6c757d',
          borderDash: [5, 5],
          fill: false,
          type: 'line',
          pointRadius: 0
        });
      }
      datasetsSysErr.push({
        label: `${phaseLabel} Sys Err`,
        data: SETPOINTS.map(sp => getData(sp, 'Sys')),
        backgroundColor: `${color}B3`,
        borderColor: color,
        borderWidth: 1,
        type: 'bar'
      });
      if (index === 0) {
        const limitSys = results[1.0]?.limits?.systematic ?? NaN;
        if (!isNaN(limitSys)) {
          datasetsSysErr.push({
            label: 'Sys Limit (+)',
            data: Array(SETPOINTS.length).fill(limitSys),
            borderColor: 'rgba(220, 53, 69, 0.7)',
            borderDash: [5, 5],
            fill: false,
            type: 'line',
            pointRadius: 0
          });
          datasetsSysErr.push({
            label: 'Sys Limit (-)',
            data: Array(SETPOINTS.length).fill(-limitSys),
            borderColor: 'rgba(220, 53, 69, 0.7)',
            borderDash: [5, 5],
            fill: false,
            type: 'line',
            pointRadius: 0
          });
        }
      }
      datasetsRandErr.push({
        label: `${phaseLabel} Rand Err (SD)`,
        data: SETPOINTS.map(sp => getData(sp, 'Rand')),
        backgroundColor: `${color}B3`,
        borderColor: color,
        borderWidth: 1,
        type: 'bar'
      });
      if (index === 0) {
        const limitRand = results[1.0]?.limits?.random ?? NaN;
        if (!isNaN(limitRand)) {
          datasetsRandErr.push({
            label: 'Rand Limit',
            data: Array(SETPOINTS.length).fill(limitRand),
            borderColor: 'rgba(255, 193, 7, 0.7)',
            borderDash: [5, 5],
            fill: false,
            type: 'line',
            pointRadius: 0
          });
        }
      }
    });
    Object.values(chartInstances).forEach(chart => chart?.destroy());
    if (datasetsVolume.length > 0) {
      chartInstances.volume = new Chart(elements.volumeChartCanvas, createChartConfig(labels, datasetsVolume, 'Volume (µL)'));
    }
    if (datasetsSysErr.length > 0) {
      chartInstances.sysErr = new Chart(elements.sysErrChartCanvas, createChartConfig(labels, datasetsSysErr, 'Systematic Error (µL)'));
    }
    if (datasetsRandErr.length > 0) {
      chartInstances.randErr = new Chart(elements.randErrChartCanvas, createChartConfig(labels, datasetsRandErr, 'Random Error (SD) (µL)'));
    }
  }

  function createChartConfig(labels, datasets, yAxisLabel) {
    return {
      data: {
        labels,
        datasets
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += formatNum(context.parsed.y, 3) + ' µL';
                }
                return label;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: yAxisLabel.includes('Random Error'),
            title: {
              display: true,
              text: yAxisLabel
            }
          },
          x: {
            title: {
              display: true,
              text: 'Setpoint'
            }
          }
        },
        interaction: {
          mode: 'index',
          intersect: false
        },
      }
    };
  }

  function initializeApp() {
    Object.values(chartInstances).forEach(chart => chart?.destroy());
    chartInstances = {};
    buildSetpointInputs(elements.preContainer, 'Pre');
    elements.calculateBtn.textContent = 'Check Pre-Calibration';
    elements.calculateBtn.disabled = false;
    elements.postSection.classList.add('hidden');
    elements.preSection.classList.add('phase-active');
    elements.postSection.classList.remove('phase-active');
    elements.resultsSection.classList.add('hidden');
    elements.finalComparison.classList.add('hidden');
    updateStatus('Enter setup details and Pre-Calibration readings.', 'info');
    currentPhase = 'Pre';
    localStorage.removeItem('pipetteCalPreResults');
    localStorage.removeItem('pipetteCalPostResults');
  }
  elements.nominalVolInput.addEventListener('change', () => {
    buildSetpointInputs(elements.preContainer, 'Pre');
    if (currentPhase === 'Post' && !elements.postSection.classList.contains('hidden')) {
      buildSetpointInputs(elements.postContainer, 'Post');
    }
    elements.resultsSection.classList.add('hidden');
    elements.finalComparison.classList.add('hidden');
    elements.calculateBtn.disabled = false;
    updateStatus('Setup changed. Enter Pre-Calibration readings.', 'info');
    currentPhase = 'Pre';
    elements.preSection.classList.add('phase-active');
    elements.postSection.classList.add('hidden');
    elements.postSection.classList.remove('phase-active');
  });
  elements.numReadingsInput.addEventListener('change', () => {
    buildSetpointInputs(elements.preContainer, 'Pre');
    if (currentPhase === 'Post' && !elements.postSection.classList.contains('hidden')) {
      buildSetpointInputs(elements.postContainer, 'Post');
    }
    elements.resultsSection.classList.add('hidden');
    elements.finalComparison.classList.add('hidden');
    elements.calculateBtn.disabled = false;
    updateStatus('Number of readings changed. Enter Pre-Calibration readings.', 'info');
    currentPhase = 'Pre';
    elements.preSection.classList.add('phase-active');
    elements.postSection.classList.add('hidden');
    elements.postSection.classList.remove('phase-active');
  });
  // --- Event Listener Toggles ---
  // Generic toggle function
  function setupCollapsibleSection(toggleElement, sectionElement) {
    if (toggleElement && sectionElement) {
      toggleElement.addEventListener('click', () => {
        const isCollapsed = sectionElement.classList.toggle('collapsed');
        toggleElement.setAttribute('aria-expanded', !isCollapsed);
        const icon = toggleElement.querySelector('.info-toggle-icon');
        if (icon) {
          icon.textContent = isCollapsed ? '▶' : '▼';
        }
      });
      toggleElement.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleElement.click();
        }
      });
    } else {
      console.error("Toggle element or section not found for:", toggleElement || sectionElement);
    }
  }

  // Setup both collapsible sections
  setupCollapsibleSection(elements.infoToggle, elements.infoSection);
  setupCollapsibleSection(elements.practicalGuideToggle, elements.practicalGuideSection);
  initializeApp();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => {
        reg.update();                         // always check for new SW
        console.log('Service-worker scope:', reg.scope);
      })
      .catch(err => console.error('SW registration failed:', err));
  }
});