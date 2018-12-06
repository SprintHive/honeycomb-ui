
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