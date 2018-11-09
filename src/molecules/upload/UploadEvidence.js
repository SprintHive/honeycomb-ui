/**
 * Copyright (c) 2018 SprintHive (Pty) Ltd (buzz@sprinthive.com)
 *
 * This source code is licensed under the Apache License, Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */

import React from "react";
import PropTypes from "prop-types";
import {compose, setDisplayName, setPropTypes, withHandlers, withState} from "recompose";
import {evidenceCaptured} from "./UploadActions";
import UploadOrCaptureImage from "./UploadOrCaptureImage";
import DisplayErrorWithTryAgain from "./DisplayErrorWithTryAgain";
import {nonOptimalStates} from "../../hoc/nonOptimalStates";
import AnalysingSpinner from "./AnalysingSpinner";
import UploadProgressSpinner from "./UploadProgressSpinner";

const uploadInProgress = props => props.status === "Uploading";
const showUploadInProgress = ({uploadProgress}) => <UploadProgressSpinner {...{uploadProgress}}/>;

const busy = props => props.status === "InProgress";
const showSpinner = () => <AnalysingSpinner/>;

const thereAreErrors = props => props.status === "Failed";
const displayErrors = props => <DisplayErrorWithTryAgain {...props}/>;

const enhance = compose(
  setDisplayName("UploadEvidence"),
  setPropTypes({
    idvId: PropTypes.string.isRequired,
    componentKey: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    errorMessage: PropTypes.string,
    dispatch: PropTypes.func.isRequired
  }),
  withState("uploadProgress", "updateUploadProgress", 0),
  withHandlers({
    onChange: props => event => {
      if (event.target.files.length === 1
        && event.target.files[0].type.indexOf("image/") === 0) {

        const {dispatch, idvId, componentKey, updateUploadProgress, componentData, endpoint} = props;
        const data = new FormData();
        data.append("file", event.target.files[0]);
        if (componentData) {
          Object.keys(componentData).forEach(key => data.append(key, componentData[key]));
        }
        dispatch(evidenceCaptured({entityId: idvId , entityKey: "idv", data, endpoint, componentKey, updateUploadProgress}));
      }
    }
  }),
  nonOptimalStates([
    {when: uploadInProgress, render: showUploadInProgress},
    {when: thereAreErrors, render: displayErrors},
    {when: busy, render: showSpinner}
  ])
);

const UploadEvidence = (props) => {
  const {onChange, componentKey, children, endpoint} = props;
  return (
    <UploadOrCaptureImage {...{componentKey, onChange, endpoint}}>
      {children}
    </UploadOrCaptureImage>
  )
};

export default enhance(UploadEvidence);