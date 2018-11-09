/**
 * Copyright (c) 2018 SprintHive (Pty) Ltd (buzz@sprinthive.com)
 *
 * This source code is licensed under the Apache License, Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */

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
    leadId: PropTypes.string.isRequired,
  }),
  connect(),
  withHandlers({
    grantBureauPermission: props => () => {
      const {dispatch, endpoint, leadId} = props;
      dispatch(propertyChanged({
        entityId: leadId,
        entityName: "lead", propertyName: "lookupConsentGiven",
        endpoint, newValue: true, oldValue: false
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