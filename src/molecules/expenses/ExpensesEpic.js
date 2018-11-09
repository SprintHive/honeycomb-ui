import {Observable} from "rxjs/Rx";
import axios from "axios";

import {MONTHLY_LIVING_EXPENSE_CHANGED} from "./ExpensesActions";

const printError = ({e, message}) => {
  if (e.response) {
    const {status, data} = e.response;
    console.error(message, status, data)
  } else {
    console.error(message);
    console.error(e);
  }
};

export function monthlyLivingExpenseChanged(action$, store, deps) {
  const honeycombHeaders = deps && deps.honeycombHeaders;

  return action$.ofType(MONTHLY_LIVING_EXPENSE_CHANGED)
    .switchMap(action => {
      console.log(`Processing action ${action.type}`, JSON.stringify(action.payload, null, 2));
      const {leadId, endpoint, propertyName, value, headers} = action.payload;
      const reqHeaders = headers || honeycombHeaders;

      return Observable.fromPromise(axios.post(
          `${endpoint}/v1/lead/${leadId}/monthlyLivingExpense/${propertyName}`,
          {value},
          {headers: reqHeaders}))
        .mergeMap(() => Observable.empty())
        .catch((e) => {
          const message = "Something went wrong trying to update a monthly living expense";
          printError({e, message});
          return Observable.of({type: `${MONTHLY_LIVING_EXPENSE_CHANGED}_FAILED`, message});
        });
    })
}
