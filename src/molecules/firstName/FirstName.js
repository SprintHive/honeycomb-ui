
import React from "react";
import PropTypes from "prop-types";
import {compose, setDisplayName, setPropTypes, withProps} from "recompose";
import PropertyInput from "../propertyInput/PropertyInput";
import {withValidationRequired, notEmptyValidator} from "../../hoc/withValidation";

const enhance = compose(
  setDisplayName("FirstName"),
  setPropTypes({
    placeholder: PropTypes.string
  }),
  withProps(() => {
    return {
      propertyName: "firstName",
      entityName: "application",
      entityIdName: "applicationId"
    }
  }),
  withValidationRequired([notEmptyValidator])
);

export default enhance(PropertyInput);