
import React from "react";
import PropTypes from "prop-types";
import {compose, setDisplayName, setPropTypes, withProps, withState} from "recompose";
import {nonOptimalStates} from "../../hoc/nonOptimalStates";
import FlexBox from "../../layout/FlexBox";
import ProofOfIdentityToggle from "./ProofOfIdentityToggle";
import UploadProofOfIdentity from "./UploadProofOfIdentity";
import SuccessMessage from "../upload/SuccessMessage";

export const DRIVERS_LICENCE = {label: "Drivers Licence", value: "drivers-license-reverse"};
export const ID_CARD = {label: "ID Card", value: "id-card-front"};
export const ID_BOOK = {label: "ID Book", value: "id-book"};

const trustedHeadShotCaptured = ({identityVerification: idv}) => idv.trustedSourceHeadshot
  && idv.trustedSourceHeadshot.status === "Captured";

const showSuccessMessage = ({stepKey, componentKey, wizardStepStatusDispatcher}) =>
  <SuccessMessage{...{
    stepKey, componentKey, wizardStepStatusDispatcher,
    message: "Proof of identity has been captured successfully."
  }}/>;

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
  withProps(props => {
    // only if we don't find any identityTypes setup some defaults
    if (!props.identityTypes) {
      return {identityTypes: [DRIVERS_LICENCE, ID_CARD, ID_BOOK]}
    }
  }),
  setPropTypes({
    identityTypes: PropTypes.array.isRequired
  }),
  withState("proofOfIdentityType", "proofOfIdentityChanged", (props) => {
    return props.identityTypes[0].value;
  }),
  nonOptimalStates([
    {when: trustedHeadShotCaptured, render: showSuccessMessage}
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