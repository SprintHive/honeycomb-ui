export const EVIDENCE_CAPTURE_RETRY = "EVIDENCE_CAPTURE_RETRY";
export const evidenceCaptureRetry = (payload) => ({type: EVIDENCE_CAPTURE_RETRY, payload});
export const EVIDENCE_CAPTURED = "EVIDENCE_CAPTURED";
export const evidenceCaptured = (payload) => ({type: EVIDENCE_CAPTURED, payload});
export const EVIDENCE_CAPTURED_COMPLETE = "EVIDENCE_CAPTURED_COMPLETE";
export const evidenceCaptureComplete = (payload) => ({type: EVIDENCE_CAPTURED_COMPLETE, payload});
