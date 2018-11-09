import {Observable} from 'rxjs';
import axios from "axios";

import {PROOF_OF_INCOME_CAPTURED} from "./ProofOfIncomeActions";

const printError = ({e, message}) => {
  if (e.response) {
    const {status, data} = e.response;
    console.error(message, status, data)
  } else {
    console.error(message);
    console.error(e);
  }
};

export function proofOfIncomeCaptured(action$) {
  return action$.ofType(PROOF_OF_INCOME_CAPTURED)
    .switchMap(action => {
      console.log(`Processing action ${action.type}`, JSON.stringify(action.payload, null, 2));
      const {leadId, headers, endpoint, data} = action.payload;
      return Observable.fromPromise(
        axios.post(`${endpoint}/lead/${leadId}/proofOfIncome/upload/bank-statement`, data, {headers}))
        .mergeMap(() => Observable.empty())
        .catch((e) => {
          const message = "Something went wrong trying to update proof of income";
          printError({e, message});
          return Observable.of({type: `${PROOF_OF_INCOME_CAPTURED}_FAILED`, message});
        });
    })
}
