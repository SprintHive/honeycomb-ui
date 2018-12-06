
import React from "react";
import {compose, setDisplayName, withProps} from "recompose";
import UploadEvidence from "../upload/UploadEvidence";
import BaseEvidence from "../evidence/BaseEvidence";
import CaptureEvidence from "../evidence/CaptureEvidence";
import {errorCodeMapper} from "../../lib/errorUtils";
import FlexBox from "../../layout/FlexBox";
import Button from "../../atoms/button/Button";
import {evidenceCaptureRetry} from "../upload/UploadActions";

const renderUploadEvidence = props => {
  const {identityVerification, dispatch, componentKey} = props;
  const _props = {idvId: identityVerification.identityVerificationId, componentKey, dispatch};
  const {status, errorCode} = identityVerification[_props.componentKey];
  _props.idvStatus = identityVerification.status.key;
  _props.status = status;
  _props.errorMessage = errorCode && errorCodeMapper(errorCode);

  return (
    <UploadEvidence {..._props}>
      <FlexBox item centered>
        Please capture a self headshot
      </FlexBox>
      <FlexBox item centered>
        without smiling
      </FlexBox>
    </UploadEvidence>
  )
};

const renderCaptureEvidence = props => {
  return (
    <FlexBox column>
      {props.showTitle
        ? <FlexBox centered>Please capture a self headshot of yourself (not smiling)</FlexBox>
        : null}
      <CaptureEvidence {...props}/>
    </FlexBox>
  )
};

const renderErrors = props => {
  const {identityVerification, componentKey, entityKey, entityId} = props;
  const {errorCode} = identityVerification[componentKey];

  return (
    <FlexBox style={{marginTop: 10}} column centered>
      <FlexBox column item centered>
        <span style={{marginBottom: 10}}>{errorCodeMapper(errorCode)}</span>
        <Button onClick={() => props.dispatch(evidenceCaptureRetry({entityKey, entityId, componentKey}))}>
          Try again
        </Button>
      </FlexBox>
    </FlexBox>
  );
};

const enhance = compose(
  setDisplayName("SelfHeadshot"),
  withProps({
    renderUploadEvidence,
    renderCaptureEvidence,
    renderErrors,
    successMessage: "Your self headshot has been captured successfully."
  })
);

const SelfHeadshot = (props) => {
  return <BaseEvidence {...props}/>
};

export default enhance(SelfHeadshot);