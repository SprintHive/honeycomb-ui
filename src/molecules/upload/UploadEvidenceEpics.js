import {Observable, Subject} from 'rxjs';
import axios from 'axios';
import {EVIDENCE_CAPTURED, evidenceCaptureComplete} from "./UploadActions";

const printError = ({e, message}) => {
  if (e.response) {
    const {status, data} = e.response;
    console.error(message, status, data)
  } else {
    console.error(message);
    console.error(e);
  }
};

export function evidenceCaptured(action$) {
  return action$.ofType(EVIDENCE_CAPTURED)
    .switchMap(action => {
      console.log(`Processing action ${action.type}`, JSON.stringify(action.payload, null, 2));
      const {entityKey, entityId, componentKey, data, updateUploadProgress, endpoint, authToken} = action.payload;
      let idType;
      switch (componentKey) {
        case "trustedSourceHeadshot":
          idType = "proofOfIdentity";
          break;

        case "selfHeadshot":
          idType = "selfHeadshot";
          break;

        case "proofOfPresence":
          idType = "proofOfPresence";
          break;

        default:
          idType = componentKey;
      }

      const subject = new Subject();
      // setup a listener to calculated the progress of the upload.
      // if the action has a updateUploadProgress function call it with the progress
      // when the percent completed is >= 100 dispatch an action to updated the store
      const config = {
        onUploadProgress: function(progressEvent) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log("Tracking file upload", componentKey, percentCompleted);
          if (updateUploadProgress) {
            updateUploadProgress(percentCompleted);
          }
          if (percentCompleted >= 100) {
            subject.next(evidenceCaptureComplete({entityKey, entityId, componentKey}))
          }
        }
      };

      if (authToken) {
        config.headers = {Authorization: `Bearer ${authToken}`};
      }

      axios.post(`${endpoint}/identityVerification/${entityId}/${idType}`, data, config)
        .catch(e => {
          const message = "Something went wrong trying to upload evidence";
          printError({e, message});
          return Observable.of({type: `${EVIDENCE_CAPTURED}_FAILED`, message});
        });
      return subject;
    })
}
