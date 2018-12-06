import React from 'react'
import {compose, setDisplayName} from 'recompose'
import FlexBox from "../../layout/FlexBox";
import Spinner from "./Spinner";
import {withStyle} from "../../theme/ThemeManager";

const enhance = compose(
  setDisplayName('SpinnerWithText'),
  withStyle("spinnerWithText")
);

const SpinnerWithText = (props) => {
  const {spinnerWithText} = props;

  return (
    <FlexBox style={spinnerWithText.container} column centered>
      <FlexBox><Spinner/></FlexBox>
      <FlexBox style={spinnerWithText.textBoxStyle}>
        <span>{props.text}</span>
      </FlexBox>
    </FlexBox>
  )
};

export default enhance(SpinnerWithText);