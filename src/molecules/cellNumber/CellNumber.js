
import React from "react";
import {compose, setDisplayName, withProps} from "recompose";
import PropertyInput from "../propertyInput/PropertyInput";
import {maxLengthFilter, numberFilter, withFiltering} from "../../hoc/withFiltering";
import {lengthValidator, withOnBlurValidation} from "../../hoc/withValidation";

const enhance = compose(
  setDisplayName("CellNumber"),
  withProps(() => {
    return {
      propertyName: "cellNumber",
      entityName: "application",
      entityIdName: "applicationId"
    }
  }),
  withFiltering([numberFilter, maxLengthFilter(10)]),
  withOnBlurValidation([lengthValidator(10, 10)])
);

export default enhance(PropertyInput);