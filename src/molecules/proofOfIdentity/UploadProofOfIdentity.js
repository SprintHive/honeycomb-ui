/**
 * Copyright (c) 2018 SprintHive (Pty) Ltd (buzz@sprinthive.com)
 *
 * This source code is licensed under the Apache License, Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */

import React from "react";
import PropTypes from "prop-types";
import {compose, mapProps, setDisplayName, setPropTypes} from "recompose";
import {errorCodeMapper} from "../../lib/errorUtils";
import UploadEvidence from "../upload/UploadEvidence";
import FlexBox from "../../layout/FlexBox";
import {DRIVERS_LICENCE, ID_BOOK, ID_CARD} from "./ProofOfIdentityToggle";

const enhance = compose(
  setDisplayName("UploadProofOfIdentity"),
  setPropTypes({
    dispatch: PropTypes.func.isRequired,
    idv: PropTypes.object.isRequired,
    componentKey: PropTypes.oneOf(["trustedSourceHeadshot"]),
    proofOfIdentityType: PropTypes.oneOf([DRIVERS_LICENCE.value, ID_CARD.value, ID_BOOK.value])
  }),
  mapProps(props => {
    const {idv, componentKey, proofOfIdentityType, children, dispatch, endpoint} = props;
    const componentData = {typeCode: proofOfIdentityType};
    const _props = {idvId: idv.identityVerificationId, componentKey, children, dispatch, componentData, endpoint,
      proofOfIdentityType};
    const {status, errorCode} = idv[componentKey];
    _props.idvStatus = idv.status.key;
    _props.status = status;
    _props.errorMessage = errorCode && errorCodeMapper(errorCode);
    return _props;
  }),
);

const UploadProofOfIdentity = (props) => {
  console.log("UploadProofOfIdentity", props)
  return (
    <FlexBox item centered>
      <UploadEvidence {...props}>
        {props.children(props)}
      </UploadEvidence>
    </FlexBox>
  )
};

export default enhance(UploadProofOfIdentity);