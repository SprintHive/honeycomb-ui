
import React from 'react'
import Radium from "radium";
import {compose, setDisplayName, setPropTypes} from 'recompose'
import FlexBox from "../../layout/FlexBox";
import PropTypes from "prop-types";
import {withStyle} from "../../theme/ThemeManager";

const enhance = compose(
  setDisplayName('UploadOrCaptureImage'),
  withStyle("uploadOrCaptureImage"),
  setPropTypes({
    componentKey: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    uploadOrCaptureImage: PropTypes.object.isRequired
  }),
  Radium
);

const UploadOrCaptureImage = (props) => {
  const {componentKey, onChange, uploadOrCaptureImage} = props;
  const instanceId = `${componentKey}_imageCapture`;
  return (
    <FlexBox style={uploadOrCaptureImage.container} column centered>
      <input style={[uploadOrCaptureImage.hideFileInput]} id={instanceId} type="file" capture="camera"
             onChange={onChange} accept="image/jpeg"/>
      <FlexBox column item>
        <label style={uploadOrCaptureImage.labelStyle} htmlFor={instanceId}>
          {props.children}
        </label>
      </FlexBox>
    </FlexBox>
  )
};

export default enhance(UploadOrCaptureImage);