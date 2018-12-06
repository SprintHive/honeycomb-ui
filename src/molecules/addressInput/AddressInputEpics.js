import {Observable} from 'rxjs';
import axios from 'axios';

import {
  ADDRESS_SEARCH_CHANGED,
  ADDRESS_SELECTED,
  addressSearchInProgress,
  addressSearchSuggestionsReceived, placeReceived
} from "./AddressInputActions";
import {propertyChanged} from "../propertyInput/PropertyInput";

const printError = ({e, message}) => {
  if (e.response) {
    const {status, data} = e.response;
    console.error(message, status, data)
  } else {
    console.error(message);
    console.error(e);
  }
};

export function addressSearchChanged(action$) {
  return action$.ofType(ADDRESS_SEARCH_CHANGED)
    .debounceTime(500)
    .filter(action => action.payload.searchStr !== "")
    .filter(action => action.payload.searchStr.length > 3)
    .switchMap(action => {
      console.log(`Processing action ${action.type}`);
      const {leadId, searchStr, endpoint} = action.payload;
      const inProgress = Observable.of(addressSearchInProgress());
      const request = Observable.fromPromise(
        axios.post(`${endpoint}/address/search`, {searchStr}))
        .map(({data}) => ({leadId, suggestions: data.suggestions}))
        .map(addressSearchSuggestionsReceived)
        .catch((e) => {
          const message = "Something went wrong trying to search for addresses";
          printError({e, message: message});
          return Observable.of({type: "ADDRESS_SEARCH_FAILED", message: message});
        });
      return Observable.concat(inProgress, request)
    });
}

export function addressSelected(action$) {
  return action$.ofType(ADDRESS_SELECTED)
    .switchMap(action => {
      console.log(`Processing action ${action.type}`, action.payload);
      const {leadId, placeId, endpoint, leadEndpoint} = action.payload;
      return Observable.fromPromise(
        axios.post(`${endpoint}/address/getPlace`, {placeId}))
        .map((res) => propertyChanged({entityId: leadId, entityName: "application", propertyName: "address",
          endpoint: leadEndpoint, newValue: res.data.address}))
        .catch((e) => {
          const message = "Something went wrong trying to get Place";
          printError({e, message: message});
          return Observable.of({type: "GET_PLACE_FAILED", message: message});
        });
    });
}