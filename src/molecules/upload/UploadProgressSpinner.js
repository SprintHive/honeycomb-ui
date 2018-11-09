/**
 * Copyright (c) 2018 SprintHive (Pty) Ltd (buzz@sprinthive.com)
 *
 * This source code is licensed under the Apache License, Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */

import React from "react";
import PropTypes from "prop-types";
import {compose, setDisplayName, setPropTypes} from "recompose";
import FlexBox from "../../layout/FlexBox";
import SpinnerWithText from "../../atoms/spinner/SpinnerWithText";

const enhance = compose(
  setDisplayName("UploadProgressSpinner"),
  setPropTypes({
    uploadProgress: PropTypes.number.isRequired
  })
);

const UploadProgressSpinner = (props) => {
  return (
    <FlexBox style={{minWidth: 320}} centered>
      <SpinnerWithText text={`Uploading... (${props.uploadProgress}%)`}/>
    </FlexBox>
  )
};

export default enhance(UploadProgressSpinner);