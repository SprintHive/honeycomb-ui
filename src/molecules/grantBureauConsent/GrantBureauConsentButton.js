
import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {compose, setDisplayName, setPropTypes, withHandlers} from "recompose";

import Button from "../../atoms/button/Button";
import {propertyChanged} from "../propertyInput/PropertyInput";

const enhance = compose(
  setDisplayName("GrantBureauConsentButton"),
  setPropTypes({
    endpoint: PropTypes.string.isRequired,
    applicationId: PropTypes.string.isRequired,
  }),
  connect(),
  withHandlers({
    grantBureauPermission: props => () => {
      const {dispatch, endpoint, applicationId, authToken, productId} = props;
      dispatch(propertyChanged({
        entityId: applicationId,
        entityName: "application",
        propertyName: "lookupConsentGiven",
        endpoint, newValue: true, oldValue: false, authToken, productId
      }));
    }
  })
);

const GrantBureauConsentButton = (props) => {
  return (
    <Button {...props} onClick={props.grantBureauPermission}>{props.children}</Button>
  )
};

export default enhance(GrantBureauConsentButton);