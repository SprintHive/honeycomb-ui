
/**
 * A HOC which takes a character whitelist and adds a filterInput handler that filters on the whitelist
 */
import {withHandlers, compose} from "recompose";

const numberWhitelist = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

export const minLengthFilter = (minLength) => ({value}) => {
  return value.length >= minLength;
};

export const maxLengthFilter = (maxLength) => ({value}) => {
  return value.length < maxLength;
};

export const numberFilter = ({inputChar}) => {
  return numberWhitelist.includes(inputChar);
};

export const withFiltering = (filters) => compose(
  withHandlers({
    filterInput: () => ({value, charCode}) => {
      const inputChar = String.fromCharCode(charCode);
      let inputAllowed = true;
      for (let filter of filters) {
        if (!filter({inputChar, value})) {
          inputAllowed = false;
          break;
        }
      }
      return inputAllowed;
    }
  })
);
