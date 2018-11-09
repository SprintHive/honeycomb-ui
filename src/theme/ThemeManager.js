import {withProps} from "recompose";
import {defaultStyle} from "./DefaultStyle";


let style = defaultStyle;

export const withStyle = (styleName) => withProps(() => {
  return {[styleName]: style[styleName]}
});

export const loadStyle = newStyle => style = newStyle;

export const getStyle = () => style;