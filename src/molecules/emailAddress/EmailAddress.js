/**
 * Copyright (c) 2018 SprintHive (Pty) Ltd (buzz@sprinthive.com)
 *
 * This source code is licensed under the Apache License, Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */

import React from "react";
import PropTypes from "prop-types";
import {compose, setDisplayName, setPropTypes, withProps} from "recompose";
import PropertyInput from "../propertyInput/PropertyInput";
import {emailValidator, withOnBlurValidation} from "../../hoc/withValidation";

const enhance = compose(
  setDisplayName("EmailAddress"),
  setPropTypes({
    placeholder: PropTypes.string
  }),
  withProps(() => {
    return {
      propertyName: "emailAddress",
      entityName: "lead",
      entityIdName: "leadId"
    }
  }),
  withOnBlurValidation([emailValidator()]),
);

export default enhance(PropertyInput);