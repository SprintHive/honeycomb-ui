/**
 * Copyright (c) 2018 SprintHive (Pty) Ltd (buzz@sprinthive.com)
 *
 * This source code is licensed under the Apache License, Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */

import React from "react";
import {compose, setDisplayName, withProps} from "recompose";
import PropertyInput from "../propertyInput/PropertyInput";
import {maxLengthFilter, numberFilter, withFiltering} from "../../hoc/withFiltering";
import {lengthValidator, withOnBlurValidation} from "../../hoc/withValidation";

const enhance = compose(
  setDisplayName("IdNumber"),
  withProps(() => {
    return {
      propertyName: "idNumber",
      entityName: "lead",
      entityIdName: "leadId"
    }
  }),
  withFiltering([numberFilter, maxLengthFilter(13)]),
  withOnBlurValidation([lengthValidator(13, 13)])
);

export default enhance(PropertyInput);