import {
  ADDRESS_SEARCH_CHANGED,
  ADDRESS_SEARCH_IN_PROGRESS,
  ADDRESS_SEARCH_SUGGESTIONS_RECEIVED,
  ADDRESS_SELECTED
} from "./AddressInputActions";

function addressSearchChanged(state, action) {
  const ans = {...state};
  ans.searchStr = action.payload.searchStr;
  return ans;
}

function addressSearchSuggestionsReceived(state, action) {
  const ans = {...state};
  ans.suggestions = action.payload.suggestions;
  ans.searchAddressInProgress = false;
  return ans;
}

function addressSearchInProgress(state, action) {
  const ans = {...state};
  ans.searchAddressInProgress = true;
  return ans;
}

function addressSelected(state, action) {
  const ans = {...state};
  ans.searchStr = undefined;
  ans.suggestions = undefined;
  return ans;
}

const initialState = {searchStr: undefined};

export const addressInputReducer = (state = initialState, action) => {
  switch (action.type) {

    case ADDRESS_SEARCH_CHANGED:
      return addressSearchChanged(state, action);

    case ADDRESS_SEARCH_SUGGESTIONS_RECEIVED:
      return addressSearchSuggestionsReceived(state, action);

    case ADDRESS_SELECTED:
      return addressSelected(state, action);

    case ADDRESS_SEARCH_IN_PROGRESS:
      return addressSearchInProgress(state, action);

    default:
      return state;
  }
};
