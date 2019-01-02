
import React from "react";
import PropTypes from "prop-types";
import {compose, mapProps, setDisplayName, setPropTypes} from "recompose";
import {errorCodeMapper} from "../../lib/errorUtils";
import UploadEvidence from "../upload/UploadEvidence";
import FlexBox from "../../layout/FlexBox";

const enhance = compose(
  setDisplayName("UploadProofOfIdentity"),
  setPropTypes({
    dispatch: PropTypes.func.isRequired,
    identityVerification: PropTypes.object.isRequired,
    componentKey: PropTypes.oneOf(["trustedSourceHeadshot"]),
    proofOfIdentityType: PropTypes.oneOf(["drivers-license-reverse", "id-card-front", "id-book"])
  }),
  mapProps(props => {
    const {identityVerification, componentKey, proofOfIdentityType, children, dispatch, endpoint, authToken} = props;
    const componentData = {typeCode: proofOfIdentityType};
    const _props = {identityVerificationId: identityVerification.identityVerificationId, componentKey, children,
      dispatch, componentData, endpoint, authToken, proofOfIdentityType};
    const {status, errorCode} = identityVerification[componentKey];
    _props.idvStatus = identityVerification.status.key;
    _props.status = status;
    _props.errorMessage = errorCode && errorCodeMapper(errorCode);
    return _props;
  }),
);

const UploadProofOfIdentity = (props) => {
  return (
    <FlexBox item centered>
      <UploadEvidence {...props}>
        {props.children(props)}
      </UploadEvidence>
    </FlexBox>
  )
};

export default enhance(UploadProofOfIdentity);