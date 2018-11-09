/**
 * Copyright (c) 2018 SprintHive (Pty) Ltd (buzz@sprinthive.com)
 *
 * This source code is licensed under the Apache License, Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */

import React from "react";
import PropTypes from "prop-types";
import {compose, setDisplayName, setPropTypes} from "recompose";

const enhance = compose(
  setDisplayName("ViewBase64Image"),
  setPropTypes({
    base64Str: PropTypes.string.isRequired
  })
);

const ViewBase64Image = (props) => {
  return (
    <img src={`${props.base64Str}`} width={320} height={240} alt="current image"/>
  )
};

export default enhance(ViewBase64Image);