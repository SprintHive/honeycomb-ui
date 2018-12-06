
import React from "react";
import PropTypes from "prop-types";
import {compose, setDisplayName, setPropTypes, withProps} from "recompose";
import PropertyInput from "../propertyInput/PropertyInput";
import {emailValidator, withOnBlurValidation} from "../../hoc/withValidation";

const enhance = compose(
  setDisplayName("EmailAddress"),
  setPropTypes({
    placeholder: PropTypes.string
  }),
  withProps(() => {
    return {
      propertyName: "emailAddress",
      entityName: "application",
      entityIdName: "applicationId"
    }
  }),
  withOnBlurValidation([emailValidator()]),
);

export default enhance(PropertyInput);