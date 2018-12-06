
import React from "react"
import PropTypes from "prop-types";
import {compose, mapProps, setDisplayName, setPropTypes} from "recompose";
import FlexBox from "../../layout/FlexBox";
import {withStyle} from "../../theme/ThemeManager";

const style = {
  container: {
    marginTop: 10
  },
  messageStyle: {marginBottom: 10},
  hideFileInput: {
    width: 0.1,
    height: 0.1,
    opacity: 0,
    overflow: "hidden",
    position: "absolute",
    zIndex: -1
  }
};

const enhance = compose(
  setDisplayName("DisplayErrorWithTryAgain"),
  setPropTypes({
    dispatch: PropTypes.func.isRequired,
    componentKey: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired
  }),
  mapProps(({errorMessage, onChange}) => ({buttonText: "Try again", errorMessage, onChange})),
  withStyle("buttonStyle")
);

const DisplayErrorWithTryAgain = ({buttonStyle, errorMessage, buttonText, onChange}) => {
  return (
    <FlexBox style={style.container} column centered>
      <input style={[style.hideFileInput]} id="imageCapture" type="file" capture="camera"
             onChange={onChange} accept="image/*"/>
      <FlexBox column item centered>
        <span style={style.messageStyle}>{errorMessage}</span>
        <label style={buttonStyle.base} htmlFor="imageCapture">
          <span>Try again</span>
        </label>
      </FlexBox>
    </FlexBox>
  )
};

export default enhance(DisplayErrorWithTryAgain);