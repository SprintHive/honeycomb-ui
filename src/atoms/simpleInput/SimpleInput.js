/**
 * Copyright (c) 2018 SprintHive (Pty) Ltd (buzz@sprinthive.com)
 *
 * This source code is licensed under the Apache License, Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */

import React from "react";
import PropTypes from "prop-types";
import {
  compose,
  onlyUpdateForKeys,
  setDisplayName,
  setPropTypes,
  withHandlers,
  withState,
} from "recompose";
import {withLiveValue} from "../../hoc/withLiveValue";
import FlexBox from "../../layout/FlexBox";
import {withStyle} from "../../theme/ThemeManager";

const enhance = compose(
  setDisplayName('SimpleInput'),
  withStyle("inputStyle"),
  setPropTypes({
    done: PropTypes.func,
    initialValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
  }),
  withState('value', 'updateValue', ""),
  withHandlers({
    onKeyPress: ({filterInput, onBlurValidation, value, done, pending}) => e => {
      // add support the withFiltering hoc which adds a filterInput function to props.
      if (filterInput) {
        if (!filterInput({charCode: e.charCode, value})) {
          e.preventDefault();
          pending && pending();
          return false;
        }
      }
    },
    onKeyUp: ({whenValidationRequired, value, done, pending}) => e => {
      if (e.keyCode === 13) {  //enter clicked
        if (whenValidationRequired) {
          if (!whenValidationRequired(value)) {
            // User has entered an invalid input so disable the wizard next and back button
            pending && pending();
          }
        } else {
          done && done(value);
        }
      } else {
        if (whenValidationRequired) {
          const isValid = whenValidationRequired(value);
          if (!isValid) {
            pending && pending();
          }
        }
      }
    },
    onBlur: ({initialValue, pending, value, done, onBlurValidation}) => () => {
      if (onBlurValidation) {
        const isValid = onBlurValidation(value);
        if (isValid) {
          if (isValid) {
            done && done(value);
          } else {
            pending && pending();
          }
        }
      } else {
        value && value !== initialValue && done && done(value);
      }
    },
    onChange: (props) => e => {
      const {updateValue, value} = props;
      const newValue = e.target.value;

      if (value !== newValue) {
        updateValue(newValue);
      }
    }
  }),
  withLiveValue(),
  onlyUpdateForKeys(["initialValue", "value"])
);

const SimpleInput = (props) => {
  const {centered, onKeyPress, onKeyUp, onBlur, onChange, placeholder = "", value,
    focus=false, style, password, tabIndex, inputStyle} = props;

  let type = (password && "password") || "text";

  return (
    <FlexBox centered={centered} item>
      <input style={[inputStyle, style]}
             type={type}
             placeholder={placeholder}
             onKeyPress={onKeyPress}
             onKeyUp={onKeyUp}
             onBlur={onBlur}
             onChange={onChange}
             value={value}
             autoFocus={focus}
             tabIndex={tabIndex}
      />
    </FlexBox>
  )
};

export default enhance(SimpleInput);