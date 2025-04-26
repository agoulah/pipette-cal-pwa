// src/state.js

/**
 * Holds session metadata for the current calibration session.
 * @type {{operator: string, pipette: string, balance: string, date: string}}
 */
export const sessionMeta = {
  operator: "",
  pipette: "",
  balance: "",
  date: "",
}; // Initialize with empty strings

/**
 * The unique identifier for the current calibration session.
 * @type {string|null}
 */
export let calibrationID = null;

/**
 * Sets the calibration ID for the current session.
 * @param {string} id - The calibration session identifier.
 */
export function setCalibrationID(id) {
  calibrationID = id;
}
