
import React from "react";
import {compose, setDisplayName} from "recompose";
import ToggleGroup from "../../atoms/toggleButton/ToggleGroup";

const enhance = compose(
  setDisplayName("ProofOfIdentityToggle"),
);

const ProofOfIdentityToggle = (props) => {
  const {identityTypes, proofOfIdentityChanged, initialValue} = props;
  return (
    <ToggleGroup style={{marginTop: 20, maxWidth: 300}}
                 data={identityTypes}
                 onValueChanged={proofOfIdentityChanged}
                 initialValue={initialValue}>
    </ToggleGroup>
  )
};

export default enhance(ProofOfIdentityToggle);