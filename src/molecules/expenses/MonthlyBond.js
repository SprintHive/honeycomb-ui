/**
 * Copyright (c) 2018 SprintHive (Pty) Ltd (buzz@sprinthive.com)
 *
 * This source code is licensed under the Apache License, Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */

import React from "react";
import {compose, setDisplayName, withProps} from "recompose";
import ExpenseInput from "./ExpenseInput";

const enhance = compose(
  setDisplayName("MonthlyBond"),
  withProps(() => {
    return {
      propertyName: "monthly-bond",
    }
  }),
);

export default enhance(ExpenseInput);