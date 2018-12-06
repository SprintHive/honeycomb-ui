
/**
 * A HOC which takes a character whitelist and adds a filterInput handler that filters on the whitelist
 */
import {withHandlers, compose} from "recompose";

export const lengthValidator = (minLength, maxLength) => (inputString) => {
  return inputString.length >= minLength && inputString.length <= maxLength;
};

export const emailValidator = () => (inputString) => {
  return inputString.match(/.+@.+/);
};

export const notEmptyValidator = (inputString) => {
  const isValid = !!inputString;
  return isValid;
};

export const withInputValidation = (validators) => compose(
  withHandlers({
    onInputValidation: ({pending, done, updateValue}) => e => {
      const value = e.target.value;
      updateValue(value);

      let isValid = true;
      for (let validator of validators) {
        if (!validator(value)) {
          isValid = false;
          break;
        }
      }

      if (isValid) {
        done && done(value);
      } else {
        pending && pending();
      }
    }
  })
);

export const withOnBlurValidation = (validators) => compose(
  withHandlers({
    onBlurValidation: () => (value) => {
      let isValid = true;
      for (let validator of validators) {
        if (!validator(value)) {
          isValid = false;
          break;
        }
      }
      return isValid;
    }
  })
);

export const withValidationRequired = (validators) => compose(
  withHandlers({
    whenValidationRequired: () => (value) => {
      let isValid = true;
      for (let validator of validators) {
        if (!validator(value)) {
          isValid = false;
          break;
        }
      }
      return isValid;
    }
  })
);
