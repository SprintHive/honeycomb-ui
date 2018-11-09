/**
 * Copyright (c) 2018 SprintHive (Pty) Ltd (buzz@sprinthive.com)
 *
 * This source code is licensed under the Apache License, Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */

import React from "react";
import Radium from "radium";
import {compose, setDisplayName} from "recompose";
import {withStyle} from "../../theme/ThemeManager";

const enhance = compose(
  setDisplayName('ButtonNoHover'),
  withStyle("buttonNoHover"),
  Radium
);

export default enhance(({buttonNoHover, style, size, children, onClick}) => {
  return (
    <button style={[
      buttonNoHover.base,
      style,
      size && buttonNoHover[size]
    ]} onClick={onClick}>{children}</button>
  )
})