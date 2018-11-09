export const ADDRESS_SEARCH_CHANGED = "ADDRESS_SEARCH_CHANGED";
export const addressSearchChanged = (payload) => ({type: ADDRESS_SEARCH_CHANGED, payload});
export const ADDRESS_SEARCH_SUGGESTIONS_RECEIVED = "ADDRESS_SEARCH_SUGGESTIONS_RECEIVED";
export const addressSearchSuggestionsReceived = (payload) => ({type: ADDRESS_SEARCH_SUGGESTIONS_RECEIVED, payload});
export const ADDRESS_SELECTED = "ADDRESS_SELECTED";
export const addressSelected = (payload) => ({type: ADDRESS_SELECTED, payload});
export const ADDRESS_SEARCH_IN_PROGRESS = "ADDRESS_SEARCH_IN_PROGRESS";
export const addressSearchInProgress = () => ({type: ADDRESS_SEARCH_IN_PROGRESS});