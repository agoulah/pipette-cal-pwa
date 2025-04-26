// src/storage.js
import { sessionMeta, calibrationID, setCalibrationID } from "./state.js"; // Import setCalibrationID if needed elsewhere

/**
 * Checks if all required session metadata fields (operator, pipette, balance, date)
 * have been populated in the sessionMeta state object.
 *
 * @returns {boolean} True if all metadata fields are non-empty, false otherwise.
 */
export function readSessionMeta() {
  // Check if the properties within the imported sessionMeta object have values
  return (
    !!sessionMeta.operator &&
    !!sessionMeta.pipette &&
    !!sessionMeta.balance &&
    !!sessionMeta.date
  );
}

/**
 * Saves a calibration session to localStorage, including metadata, pre- and post-calibration results,
 * and pass/fail status. If a session with the current calibration ID exists, it is overwritten.
 *
 * @param {Object} preResults - Results from the pre-calibration measurements.
 * @param {Object} postResults - Results from the post-calibration measurements.
 * @param {boolean} pass - Whether the calibration passed or failed.
 * @returns {boolean} True if the session was saved successfully.
 */
export function saveSession(preResults, postResults, pass) {
  const db = JSON.parse(localStorage.getItem("pipetteCalSessions") || "[]");

  // Ensure calibrationID is set (either passed in or generated)
  // Using || might overwrite an existing ID if called multiple times, consider a check
  const currentID = calibrationID || `CAL-${Date.now()}`;
  if (!calibrationID) {
    setCalibrationID(currentID); // Update state if newly generated
  }


  // Check if an entry with this ID already exists to avoid duplicates/overwrite unintendedly
  const existingIndex = db.findIndex(entry => entry.id === currentID);
  const sessionData = {
    id: currentID,
    meta: { ...sessionMeta }, // Store a copy of the current meta state
    pre: preResults,
    post: postResults,
    finalPass: pass,
    timestamp: new Date().toISOString(),
  };

  if (existingIndex > -1) {
    console.warn(`Overwriting existing session data for ID: ${currentID}`);
    db[existingIndex] = sessionData;
  } else {
    db.push(sessionData);
  }


  localStorage.setItem("pipetteCalSessions", JSON.stringify(db));
  console.log(`Session ${currentID} saved.`);
  return true; // Indicate success (optional, but can be helpful)
}
