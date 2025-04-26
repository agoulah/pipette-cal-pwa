// src/storage.js
import { sessionMeta, calibrationID, setCalibrationID } from "./state.js"; // Import setCalibrationID if needed elsewhere
// --- REMOVE dependency on metaElems ---

// This function now checks the state object, assuming it's been updated elsewhere (by dom.js)
export function readSessionMeta() {
  // Check if the properties within the imported sessionMeta object have values
  return (
    !!sessionMeta.operator &&
    !!sessionMeta.pipette &&
    !!sessionMeta.balance &&
    !!sessionMeta.date
  );
}

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
