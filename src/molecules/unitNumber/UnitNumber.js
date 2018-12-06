
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
      entityName: "application",
      entityIdName: "applicationId"
    }
  }),
  withFiltering([numberFilter, maxLengthFilter(3)]),
  withValidationRequired([notEmptyValidator])
);

export default enhance(PropertyInput);