
import React from "react";
import {compose, setDisplayName, withProps} from "recompose";
import PropertyInput from "../propertyInput/PropertyInput";

const enhance = compose(
  setDisplayName("FirstName"),
  withProps(() => {
    return {
      propertyName: "lastName",
      entityName: "application",
      entityIdName: "applicationId"
    }
  })
);

export default enhance(PropertyInput);