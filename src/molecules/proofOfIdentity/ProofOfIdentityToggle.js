/**
 * Copyright (c) 2018 SprintHive (Pty) Ltd (buzz@sprinthive.com)
 *
 * This source code is licensed under the Apache License, Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */

import React from "react";
import {compose, setDisplayName, withProps} from "recompose";
import ToggleGroup from "../../atoms/toggleButton/ToggleGroup";

export const DRIVERS_LICENCE = {label: "Drivers Licence", value: "drivers-license-reverse"};
export const ID_CARD = {label: "ID Card", value: "id-card-front"};
export const ID_BOOK = {label: "ID Book", value: "id-book"};

const enhance = compose(
  setDisplayName("ProofOfIdentityToggle"),
  withProps({identityTypes: [DRIVERS_LICENCE, ID_CARD, ID_BOOK]})
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