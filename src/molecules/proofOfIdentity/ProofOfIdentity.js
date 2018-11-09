/**
 * Copyright (c) 2018 SprintHive (Pty) Ltd (buzz@sprinthive.com)
 *
 * This source code is licensed under the Apache License, Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */

import React from "react";
import PropTypes from "prop-types";
import {compose, setDisplayName, withState} from "recompose";
import {nonOptimalStates} from "../../hoc/nonOptimalStates";
import FlexBox from "../../layout/FlexBox";
import ProofOfIdentityToggle, {DRIVERS_LICENCE, ID_BOOK, ID_CARD} from "./ProofOfIdentityToggle";
import UploadProofOfIdentity from "./UploadProofOfIdentity";
import SuccessMessage from "../upload/SuccessMessage";

const trustedHeadShotCaptured = ({idv}) => idv.trustedSourceHeadshot.status === "Captured";
const showSuccessMessage = ({stepKey, componentKey, wizardStepStatusDispatcher}) =>
  <SuccessMessage{...{stepKey, componentKey, wizardStepStatusDispatcher,
    message: "Proof of identity has been captured successfully."}}/>;

const UploadButton = props =>
  <FlexBox column>
    <FlexBox item centered>
      <span style={{fontSize: 24, lineHeight: 1}} className="glyphicons glyphicons-cloud-upload"/>
    </FlexBox>
    {props.children}
  </FlexBox>;

const renderUI = props => {
  let inner =
    <UploadButton>
      <FlexBox item centered>
        Upload an image of the back of
      </FlexBox>
      <FlexBox item centered>
        your drivers license
      </FlexBox>
    </UploadButton>;

  switch (props.proofOfIdentityType) {
    case (ID_CARD.value):
      inner =
        <UploadButton>
          <FlexBox item centered>
            Upload an image of the front of
          </FlexBox>
          <FlexBox item centered>
            your ID card
          </FlexBox>
        </UploadButton>;
      break;

    case (ID_BOOK.value):
      inner =
        <UploadButton>
          <FlexBox item centered>
            Upload an image of
          </FlexBox>
          <FlexBox item centered>
            your ID Book
          </FlexBox>
        </UploadButton>;
      break;
  }
  return inner;
};

const enhance = compose(
  setDisplayName("ProofOfIdentity"),
  withState("proofOfIdentityType", "proofOfIdentityChanged", DRIVERS_LICENCE.value),
  nonOptimalStates([
    {when: trustedHeadShotCaptured,  render: showSuccessMessage}
  ])

);

const ProofOfIdentity = (props) => {
  const render = props.renderUI || renderUI;

  return (
    <FlexBox column>
      <ProofOfIdentityToggle {...props}/>
      <UploadProofOfIdentity {...props}>
        {props => render(props)}
      </UploadProofOfIdentity>
    </FlexBox>
  )
};

export default enhance(ProofOfIdentity);