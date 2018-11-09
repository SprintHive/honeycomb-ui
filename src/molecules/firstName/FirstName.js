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
import {withValidationRequired, notEmptyValidator} from "../../hoc/withValidation";

const enhance = compose(
  setDisplayName("FirstName"),
  setPropTypes({
    placeholder: PropTypes.string
  }),
  withProps(() => {
    return {
      propertyName: "firstName",
      entityName: "lead",
      entityIdName: "leadId"
    }
  }),
  withValidationRequired([notEmptyValidator])
);

export default enhance(PropertyInput);