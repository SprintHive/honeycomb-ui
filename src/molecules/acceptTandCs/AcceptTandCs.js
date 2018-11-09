/**
 * Copyright (c) 2018 SprintHive (Pty) Ltd (buzz@sprinthive.com)
 *
 * This source code is licensed under the Apache License, Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */

import React from "react";
import PropTypes from "prop-types";
import {compose, setDisplayName, withProps} from "recompose";
import Button from "../../atoms/button/Button";
import PropertyInput from "../propertyInput/PropertyInput";

const enhance = compose(
  setDisplayName("AcceptTandCs"),
  withProps(() => {
    return {
      propertyName: "termsAndConditionsAccepted",
      entityName: "lead",
      entityIdName: "leadId"
    }
  }),
);

const AcceptTandCs = (props) => {
  return (
    <PropertyInput {...props}>
      {
        newProps => <Button onClick={() => newProps.done(true)}>{props.children}</Button>
      }
    </PropertyInput>

  )
};

export default enhance(AcceptTandCs);