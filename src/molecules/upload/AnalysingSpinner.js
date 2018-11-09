/**
 * Copyright (c) 2018 SprintHive (Pty) Ltd (buzz@sprinthive.com)
 *
 * This source code is licensed under the Apache License, Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */

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