
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