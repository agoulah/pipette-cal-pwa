// src/dom.js

import { DigitSpinner } from "./spinner.js";
import { computeStats } from "./calibrationEngine.js";
import { saveSession } from "./storage.js";
import { exportPdf } from "./report.js";
import { sessionMeta } from "./state.js";
import { SETPOINTS, DEFAULT_PRECISION, MPE } from "./constants.js";
import { formatNum } from "./utils.js";

export function buildSetpointInputs(
  container,
  phaseLabel,
  nominalVolValue,
  numReadingsValue,
  isFastEntry
) {
  container.innerHTML = "";
  // Use the passed values directly
  const nominalVol = nominalVolValue || 0;
  const numReadings = numReadingsValue || 5;
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
      if (isFastEntry) {
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

function limitsFor(nominal, setFraction) {
  const row = MPE.find((r) => r.nom === nominal) || interpRow(nominal);
  const key = setFraction === 1 ? "p100" : setFraction === 0.5 ? "p50" : "p10";
  return { sys: row.sys[key], rand: row.rand[key] };
}

function setExportButtonEnabled(elements, enabled) {
  if (elements && elements.export) {
    elements.export.disabled = !enabled;
    console.log(`Export button ${enabled ? "enabled" : "disabled"}`);
  } else {
    console.warn(
      "Attempted to set export button state, but elements.export not found."
    );
  }
}

// Reads DOM and updates the shared state object
function updateSessionMetaFromDOM(elements) {
  if (!elements || !elements.operator) {
    console.error("Meta elements not found for updating state.");
    return false; // Indicate failure or incomplete elements
  }
  sessionMeta.operator = elements.operator.value.trim();
  sessionMeta.pipette = elements.pipette.value.trim();
  sessionMeta.balance = elements.balance.value.trim();
  sessionMeta.date =
    elements.date.value || new Date().toISOString().slice(0, 10);

  // Return true if all essential fields are filled
  return !!(
    sessionMeta.operator &&
    sessionMeta.pipette &&
    sessionMeta.balance &&
    sessionMeta.date
  );
}

export function bindEventHandlers() {
  let currentPhase = "Pre";
  let chartInstances = {};
  let fastEntryMode = false;

  // Define elements here
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
    infoToggleIcon: document.querySelector("#info-toggle .info-toggle-icon"),
    practicalGuideSection: document.getElementById("practical-guide-section"),
    practicalGuideToggle: document.getElementById("practical-guide-toggle"),
    practicalGuideContent: document.getElementById("practical-guide-content"),
    fastEntryCheckbox: document.getElementById("fast_entry"),
    // Add meta elements here
    operator: document.getElementById("operator_name"),
    pipette: document.getElementById("pipette_id"),
    balance: document.getElementById("balance_id"),
    date: document.getElementById("session_date"),
    export: document.getElementById("export-btn"),
    resetBtn: document.getElementById("reset-btn"), // Added reset button here
    balanceUncInput: document.getElementById("balance_unc"), // Added balance uncertainty
  };

  // Initial state for export button

  setExportButtonEnabled(elements, false);

  // --- Event Listeners for Meta Fields ---
  // Update state whenever meta fields change
  ["operator", "pipette", "balance", "date"].forEach((key) => {
    if (elements[key]) {
      elements[key].addEventListener("change", () => {
        updateSessionMetaFromDOM(elements);
        // Optionally, re-check if export can be enabled *if* results exist
        // This depends on the desired UX. Usually, export is enabled only after calculation.
      });
    }
  });

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

        if (updateSessionMetaFromDOM(elements)) {
          // enable Export right away
          saveSession(phaseResults, null, true);
          setExportButtonEnabled(elements, true);
        } else {
          updateStatus(
            "Fill in Session Details at the top before exporting a report.",
            "fail"
          );
          setExportButtonEnabled(elements, false);
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
        setExportButtonEnabled(elements, false);
        currentPhase = "Post";
        elements.preSection.classList.remove("phase-active");
        elements.postSection.classList.remove("hidden");
        elements.postSection.classList.add("phase-active");
        elements.calculateBtn.textContent = "Check Post-Calibration";
        buildSetpointInputs(
          elements.postContainer,
          currentPhase,
          parseFloat(elements.nominalVolInput.value),
          parseInt(elements.numReadingsInput.value),
          fastEntryMode
        );
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

      if (updateSessionMetaFromDOM(elements)) {
        saveSession(preResults, phaseResults, postOverallPass);
        setExportButtonEnabled(elements, true);
      } else {
        updateStatus(
          "Fill in Session Details at the top before exporting a report.",
          "fail"
        );
        setExportButtonEnabled(elements, false);
      }

      elements.calculateBtn.disabled = true;
      elements.calculateBtn.textContent = "Calibration Complete";
      scrollToElement(elements.resultsSection);
    }
  }

  function initializeApp() {
    Object.values(chartInstances).forEach((chart) => chart?.destroy());
    chartInstances = {};
    buildSetpointInputs(
      elements.preContainer,
      currentPhase,
      parseFloat(elements.nominalVolInput.value),
      parseInt(elements.numReadingsInput.value),
      fastEntryMode
    );
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
    setExportButtonEnabled(elements, false);
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

  // --- Bind event listeners ---
  elements.calculateBtn.addEventListener("click", handleCalculation);
  elements.export.addEventListener("click", () => {
    // Retrieve results from localStorage or state if not readily available
    const pre = JSON.parse(localStorage.getItem("pipetteCalPreResults"));
    const post = JSON.parse(localStorage.getItem("pipetteCalPostResults"));
    // Call exportPdf with the data
    exportPdf(pre, post);
  });
  elements.resetBtn.addEventListener("click", initializeApp); // Use initializeApp for reset
  elements.nominalVolInput.addEventListener("change", () => {
    buildSetpointInputs(
      elements.preContainer,
      currentPhase,
      parseFloat(elements.nominalVolInput.value),
      parseInt(elements.numReadingsInput.value),
      fastEntryMode
    );
    if (
      currentPhase === "Post" &&
      !elements.postSection.classList.contains("hidden")
    ) {
      buildSetpointInputs(
        elements.postContainer,
        currentPhase,
        parseFloat(elements.nominalVolInput.value),
        parseInt(elements.numReadingsInput.value),
        fastEntryMode
      );
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
    buildSetpointInputs(
      elements.preContainer,
      currentPhase,
      parseFloat(elements.nominalVolInput.value),
      parseInt(elements.numReadingsInput.value),
      fastEntryMode
    );
    if (
      currentPhase === "Post" &&
      !elements.postSection.classList.contains("hidden")
    ) {
      buildSetpointInputs(
        elements.postContainer,
        currentPhase,
        parseFloat(elements.nominalVolInput.value),
        parseInt(elements.numReadingsInput.value),
        fastEntryMode
      );
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
    buildSetpointInputs(
      elements.preContainer,
      currentPhase,
      parseFloat(elements.nominalVolInput.value),
      parseInt(elements.numReadingsInput.value),
      fastEntryMode
    );
    if (
      currentPhase === "Post" &&
      !elements.postSection.classList.contains("hidden")
    ) {
      buildSetpointInputs(
        elements.postContainer,
        currentPhase,
        parseFloat(elements.nominalVolInput.value),
        parseInt(elements.numReadingsInput.value),
        fastEntryMode
      );
    }
  });

  // Setup collapsible sections
  setupCollapsibleSection(elements.infoToggle, elements.infoSection);
  setupCollapsibleSection(
    elements.practicalGuideToggle,
    elements.practicalGuideSection
  );

  // Initial setup
  initializeApp();
  // Update meta state from initial DOM values (e.g., pre-filled date)
  updateSessionMetaFromDOM(elements);

  // Service worker registration
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("../sw.js") // Adjust path if needed
      .then((reg) => {
        reg.update(); // always check for new SW
        console.log("Service-worker scope:", reg.scope);
      })
      .catch((err) => console.error("SW registration failed:", err));
  }
}
