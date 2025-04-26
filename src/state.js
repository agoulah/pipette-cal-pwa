// src/state.js
export const sessionMeta   = {
  operator: '',
  pipette: '',
  balance: '',
  date: '',
}; // Initialize with empty strings
export let   calibrationID = null;
export function setCalibrationID(id){ calibrationID = id; }