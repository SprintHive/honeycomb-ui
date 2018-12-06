
import React from "react";
import PropTypes from "prop-types";
import {compose, setDisplayName, withProps} from "recompose";
import Button from "../../atoms/button/Button";
import PropertyInput from "../propertyInput/PropertyInput";

const enhance = compose(
  setDisplayName("AcceptTandCs"),
  withProps(() => {
    return {
      propertyName: "termsAndConditionsAccepted",
      entityName: "application",
      entityIdName: "applicationId"
    }
  }),
);

const AcceptTandCs = (props) => {
  return (
    <PropertyInput {...props}>
      {
        newProps => <Button onClick={() => newProps.done(true)}>{props.children}</Button>
      }
    </PropertyInput>

  )
};

export default enhance(AcceptTandCs);