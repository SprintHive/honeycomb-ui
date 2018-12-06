
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