
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
      entityName: "application",
      entityIdName: "applicationId"
    }
  }),
  withFiltering([numberFilter, maxLengthFilter(13)]),
  withOnBlurValidation([lengthValidator(13, 13)])
);

export default enhance(PropertyInput);