import {EVIDENCE_CAPTURE_RETRY, EVIDENCE_CAPTURED, EVIDENCE_CAPTURED_COMPLETE} from "./UploadActions";


const initialState = {searchStr: undefined};

export const uploadEvidenceReducer = (state = initialState, action) => {
  switch (action.type) {

    case EVIDENCE_CAPTURED:
      return evidenceCaptureInProgress(state, action);

    case EVIDENCE_CAPTURE_RETRY:
      return evidenceCaptureRetry(state, action);

    case EVIDENCE_CAPTURED_COMPLETE:
      return evidenceCaptureComplete(state, action);

    default:
      return state;
  }
};

function evidenceCaptureRetry(state, action) {
  const ans = {...state};
  const {entityKey, entityId, componentKey} = action.payload;
  const found = ans[entityKey][entityId];
  if (found) {
    console.log("Setting the status to retrying", entityKey, entityId, componentKey);
    found[componentKey].status = "Retrying"
  } else {
    console.error(`Trying to change the status for evidence that could not be found. (idvId: ${entityId})`);
  }
  return ans;
}

function evidenceCaptureInProgress(state, action) {
  const ans = {...state};
  const {entityKey, entityId, componentKey} = action.payload;
  const found = ans[entityKey][entityId];
  if (found) {
    console.log("Setting the status to uploading", entityKey, entityId, componentKey);
    found[componentKey].status = "Uploading"
  } else {
    console.error(`Trying to change the status for evidence that could not be found. (idvId: ${entityId})`);
  }
  return ans;
}

function evidenceCaptureComplete(state, action) {
  const ans = {...state};
  const {entityKey, entityId, componentKey} = action.payload;
  const found = ans[entityKey][entityId];
  if (found) {
    console.log("Setting the status to in progress", entityKey, entityId, componentKey);
    found[componentKey].status = "InProgress"
  } else {
    console.error(`Trying to change the status for an idv that could not be found. (idvId: ${entityId})`)
  }
  return ans;
}
