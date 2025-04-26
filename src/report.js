// src/report.js
import { sessionMeta, calibrationID } from "./state.js";
import { formatNum } from "./utils.js";

/**
 * Exports a pipette calibration report as a PDF file.
 * The report includes session metadata, pre- and post-calibration results, and charts.
 * Uses jsPDF and autoTable for PDF generation.
 *
 * @param {Object} preResults - Pre-calibration results keyed by setpoint.
 * @param {Object} postResults - Post-calibration results keyed by setpoint.
 * @returns {Promise<void>} Resolves when the PDF is generated and saved.
 */
export async function exportPdf(preResults, postResults) {
  if (!calibrationID) {
      console.error("Cannot export PDF: Calibration ID missing.");
      return;
  }
  if (!sessionMeta || !sessionMeta.operator) { // Check if essential meta is present
      console.error("Cannot export PDF: Session metadata missing.");
      // Optionally alert the user
      return;
  }
  
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const M = 40; // margin
  let y = M;

  /* ---------- 1. Metadata (from state) ---------- */
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

  /* ---------- 2. Results table (from data) ---- */
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
  const body = [];

  // Function to create a row's data array
  const createRowData = (phaseLabel, sp, stats) => {
      if (!stats) return [phaseLabel, `${Math.round(sp * 100)}%`, 'N/A', 'N/A', 'N/A', 'N/A', 'Data Missing'];
      const target = stats.target ?? (stats.Mean - stats.Sys); // Calculate target if missing
      const passSys = stats.passSys;
      const passRand = stats.passRand;
      const status = (passSys === null || passRand === null) ? "N/A" : (passSys && passRand ? "PASS" : `FAIL (${!passSys ? 'Sys' : ''}${!passSys && !passRand ? '/' : ''}${!passRand ? 'Rand' : ''})`);
      return [
          phaseLabel,
          `${Math.round(sp * 100)}%`,
          formatNum(target, 1),
          formatNum(stats.Mean),
          formatNum(stats.Sys),
          formatNum(stats.Rand),
          status
      ];
  };

  // Add Pre-Calibration rows
  if (preResults) {
      Object.entries(preResults).forEach(([spKey, stats]) => {
          body.push(createRowData("Pre", parseFloat(spKey), stats));
      });
  }

  // Add Post-Calibration rows
  if (postResults) {
       Object.entries(postResults).forEach(([spKey, stats]) => {
          body.push(createRowData("Post", parseFloat(spKey), stats));
      });
  }

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
