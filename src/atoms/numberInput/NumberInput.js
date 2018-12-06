
import React from "react";
import PropTypes from "prop-types";
import {compose, onlyUpdateForKeys, setDisplayName, setPropTypes, withState} from "recompose";
import {ui} from "honeycomb-sdk";
import {numberFilter, withFiltering} from "../../hoc/withFiltering";
import {notEmptyValidator, withOnBlurValidation} from "../../hoc/withValidation";
import {withLiveValue} from "../../hoc/withLiveValue";
import {withStyle} from "../../theme/ThemeManager";

const {FlexBox} = ui.layout;


const enhance = compose(
  setDisplayName('NumberInput'),
  setPropTypes({done: PropTypes.func.isRequired}),
  withState("value", "updateValue", ""),
  withFiltering([numberFilter]),
  withOnBlurValidation([notEmptyValidator]),
  onlyUpdateForKeys(["value", "initialValue"]),
  withLiveValue(),
  withStyle("inputStyle")
);

const NumberInput = (props) => {
  return (
    <FlexBox centered item>
      <input style={[props.inputStyle, props.style]}
             type="text"
             placeholder={props.placeholder}
             onKeyPress={props.filterInput}
             onBlur={props.onBlur}
             onChange={props.onUpdated}
             value={props.value}
             autoFocus={props.focus}
      />
    </FlexBox>
  )
};

export default enhance(NumberInput);