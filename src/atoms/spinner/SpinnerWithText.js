/**
 * Copyright (c) 2018 SprintHive (Pty) Ltd (buzz@sprinthive.com)
 *
 * This source code is licensed under the Apache License, Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */

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