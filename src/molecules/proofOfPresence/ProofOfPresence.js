/**
 * Copyright (c) 2018 SprintHive (Pty) Ltd (buzz@sprinthive.com)
 *
 * This source code is licensed under the Apache License, Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */

import React from "react";
import {compose, setDisplayName, withProps} from "recompose";
import BaseEvidence from "../evidence/BaseEvidence";
import UploadEvidence from "../upload/UploadEvidence";
import FlexBox from "../../layout/FlexBox";
import Button from "../../atoms/button/Button";
import CaptureEvidence from "../evidence/CaptureEvidence";
import {errorCodeMapper} from "../../lib/errorUtils";
import {evidenceCaptureRetry} from "../upload/UploadActions";

const getPopRequirement = proofOfPresenceRequirement => {
  let popRequirement;

  switch (proofOfPresenceRequirement) {
    case ('smile'):
      popRequirement = "smiling";
      break;

    case ('show-surprise'):
      popRequirement = "surprised";
      break;

    case ('show-sadness'):
      popRequirement = "sad";
      break;

    default:
      console.warn(`Unknown proofOfPresenceRequirement ${proofOfPresenceRequirement}`);
      popRequirement = "doing a funky chicken dance";
  }
  return popRequirement;
};


const renderUploadEvidence = props => {
  const {idv, dispatch, componentKey} = props;
  const _props = {idvId: idv.identityVerificationId, componentKey, dispatch};
  const {status, errorCode, proofOfPresenceRequirement} = idv[componentKey];
  _props.idvStatus = idv.status.key;
  _props.status = status;
  _props.errorMessage = errorCode && errorCodeMapper(errorCode);

  return (
    <UploadEvidence {..._props}>
      <FlexBox item centered>
        Please upload a picture
      </FlexBox>
      <FlexBox item centered>
        of you {getPopRequirement(proofOfPresenceRequirement)}
      </FlexBox>
    </UploadEvidence>
  )
};

const style = {
  container: {marginTop: 10},
  messageStyle: {marginBottom: 10},
};


const renderErrors = props => {
  const {idv, componentKey, entityKey, entityId} = props;
  const {errorCode} = idv[componentKey];

  return (
    <FlexBox style={style.container} column centered>
      <FlexBox column item centered>
        <span style={style.messageStyle}>{errorCodeMapper(errorCode)}</span>
        <Button onClick={() => props.dispatch(evidenceCaptureRetry({entityKey, entityId, componentKey}))}>Try again</Button>
      </FlexBox>
    </FlexBox>
  );
};

const renderCaptureEvidence = props => {
  const {idv, componentKey, showTitle} = props;
  const {proofOfPresenceRequirement} = idv[componentKey];

  return (
    <FlexBox column>
      {showTitle
        ? <FlexBox centered>Please capture a picture of you {getPopRequirement(proofOfPresenceRequirement)}</FlexBox>
        : null}
      <CaptureEvidence {...props}/>
    </FlexBox>
  )
};

const enhance = compose(
  setDisplayName("ProofOfPresence"),
  withProps({
    renderUploadEvidence,
    renderCaptureEvidence,
    renderErrors,
    successMessage: "Your proof of presence has been captured successfully."
  })
);

const ProofOfPresence = (props) => {
  return <BaseEvidence {...props}/>
};

export default enhance(ProofOfPresence);