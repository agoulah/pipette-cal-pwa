/**
 * @file charts.js
 * @description Chart-rendering utilities for pipette calibration results.
 * Provides functions to render line charts for mean delivered volumes,
 * systematic errors, and random errors using Chart.js.
 * Expects Chart.js to be loaded globally (via <script> tag).
 */

/**
 * Render a line chart of mean delivered volumes.
 * @param {HTMLCanvasElement} canvas - The canvas element to draw into.
 * @param {Array<string|number>} labels - Labels for the x-axis (e.g., setpoint percentages).
 * @param {Array<number>} volumes - Mean volume data in µL.
 * @returns {Chart} - The Chart.js instance.
 */
export function renderVolumeChart(canvas, labels, volumes) {
  // Cleanup previous chart instance if exists
  if (canvas._chart) {
    canvas._chart.destroy();
  }
  const ctx = canvas.getContext("2d");
  canvas._chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Mean Delivered Volume (µL)",
          data: volumes,
          tension: 0.3,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true },
      },
      scales: {
        x: { title: { display: true, text: "Setpoint" } },
        y: { title: { display: true, text: "Volume (µL)" } },
      },
    },
  });
  return canvas._chart;
}

/**
 * Render a line chart of systematic errors.
 * @param {HTMLCanvasElement} canvas
 * @param {Array<string|number>} labels
 * @param {Array<number>} sysErrs - Systematic error data in µL.
 * @returns {Chart}
 */
export function renderSysErrChart(canvas, labels, sysErrs) {
  if (canvas._chart) {
    canvas._chart.destroy();
  }
  const ctx = canvas.getContext("2d");
  canvas._chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Systematic Error (µL)",
          data: sysErrs,
          tension: 0.3,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true },
      },
      scales: {
        x: { title: { display: true, text: "Setpoint" } },
        y: { title: { display: true, text: "Sys Error (µL)" } },
      },
    },
  });
  return canvas._chart;
}

/**
 * Render a line chart of random errors.
 * @param {HTMLCanvasElement} canvas
 * @param {Array<string|number>} labels
 * @param {Array<number>} randErrs - Random error data in µL.
 * @returns {Chart}
 */
export function renderRandErrChart(canvas, labels, randErrs) {
  if (canvas._chart) {
    canvas._chart.destroy();
  }
  const ctx = canvas.getContext("2d");
  canvas._chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Random Error (µL)",
          data: randErrs,
          tension: 0.3,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true },
      },
      scales: {
        x: { title: { display: true, text: "Setpoint" } },
        y: { title: { display: true, text: "Rand Error (µL)" } },
      },
    },
  });
  return canvas._chart;
}
