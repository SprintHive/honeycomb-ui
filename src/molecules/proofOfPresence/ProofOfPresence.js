
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
  const {identityVerification, dispatch, componentKey} = props;
  const _props = {identityVerificationId: identityVerification.identityVerificationId, componentKey, dispatch};
  const {status, errorCode, proofOfPresenceRequirement} = identityVerification[componentKey];
  _props.idvStatus = identityVerification.status.key;
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
  const {identityVerification, componentKey, entityKey, entityId} = props;
  const {errorCode} = identityVerification[componentKey];

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
  const {identityVerification, componentKey, showTitle} = props;
  const {proofOfPresenceRequirement} = identityVerification[componentKey];

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