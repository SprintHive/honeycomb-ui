/**
 * Copyright (c) 2018 SprintHive (Pty) Ltd (buzz@sprinthive.com)
 *
 * This source code is licensed under the Apache License, Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import {compose, setDisplayName, withProps} from 'recompose'
import Radium from 'radium'
import {withStyle} from "../../theme/ThemeManager";

const enhance = compose(
  setDisplayName('Button'),
  withStyle("buttonStyle"),
  withProps(props => ({buttonStyle: props.buttonStyle || buttonStyle})),
  Radium
);

export default enhance(({buttonStyle, style, size, children, onClick, disabled}) => {
  return (
    <button style={[
      buttonStyle.base,
      style,
      size && buttonStyle[size],
      disabled && buttonStyle.disabled
    ]}
            onClick={onClick}
            disabled={disabled}
    >{children}</button>
  )
});