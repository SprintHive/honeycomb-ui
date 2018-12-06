
import React from "react";
import {compose, setDisplayName, withProps} from "recompose";
import PropertyInput from "../propertyInput/PropertyInput";
import {numberFilter, withFiltering} from "../../hoc/withFiltering";

const enhance = compose(
  setDisplayName("NetIncome"),
  withProps(() => {
    return {
      propertyName: "netMonthlyIncome",
      entityName: "application",
      entityIdName: "applicationId"
    }
  }),
  withFiltering([numberFilter]),
);

export default enhance(PropertyInput);