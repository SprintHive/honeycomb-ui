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
import {maxLengthFilter, numberFilter, withFiltering} from "../../hoc/withFiltering";

const enhance = compose(
  setDisplayName("UnitNumber"),
  setPropTypes({
    placeholder: PropTypes.string
  }),
  withProps(() => {
    return {
      propertyName: "unitNumber",
      entityName: "lead",
      entityIdName: "leadId"
    }
  }),
  withFiltering([numberFilter, maxLengthFilter(3)]),
  withValidationRequired([notEmptyValidator])
);

export default enhance(PropertyInput);