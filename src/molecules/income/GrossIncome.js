
import React from "react";
import {compose, setDisplayName, withProps} from "recompose";
import PropertyInput from "../propertyInput/PropertyInput";
import {numberFilter, withFiltering} from "../../hoc/withFiltering";

const enhance = compose(
  setDisplayName("GrossIncome"),
  withProps(() => {
    return {
      propertyName: "grossMonthlyIncome",
      entityName: "application",
      entityIdName: "applicationId"
    }
  }),
  withFiltering([numberFilter]),
);

export default enhance(PropertyInput);