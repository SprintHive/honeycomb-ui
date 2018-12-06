
import React from "react";
import SpinnerWithText from "../../atoms/spinner/SpinnerWithText";
import FlexBox from "../../layout/FlexBox";

const AnalysingSpinner = () => {
  return (
    <FlexBox style={{minWidth: 320}} centered>
      <SpinnerWithText text="Analysing..."/>
    </FlexBox>
  )
};

export default AnalysingSpinner;