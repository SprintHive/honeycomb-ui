
import React from "react";
import {compose, setDisplayName, withProps} from "recompose";
import ExpenseInput from "./ExpenseInput";

const enhance = compose(
  setDisplayName("Maintenance"),
  withProps(() => {
    return {
      propertyName: "maintenance"
    }
  }),
);

export default enhance(ExpenseInput);