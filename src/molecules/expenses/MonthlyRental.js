
import React from "react";
import {compose, setDisplayName, withProps} from "recompose";
import ExpenseInput from "./ExpenseInput";

const enhance = compose(
  setDisplayName("MonthlyRental"),
  withProps(() => {
    return {
      propertyName: "monthly-rental",
    }
  }),
);

export default enhance(ExpenseInput);