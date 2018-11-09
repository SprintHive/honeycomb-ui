/**
 * Copyright (c) 2018 SprintHive (Pty) Ltd (buzz@sprinthive.com)
 *
 * This source code is licensed under the Apache License, Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */

import React from "react";
import PropTypes from "prop-types";
import {compose, setDisplayName, setPropTypes, withHandlers} from "recompose";
import {connect} from "react-redux";
import {stepComponentStatusChanged} from "../propertyInput/PropertyInput";
import {nonOptimalStates} from "../../hoc/nonOptimalStates";
import SuccessMessage from "../upload/SuccessMessage";

const evidenceCaptured = ({componentKey, idv}) =>
  idv[componentKey].status === "Captured" || idv.status.key === "VERIFICATION_PASSED";
const showSuccessMessage = ({wizardStepStatusDispatcher, stepKey, componentKey, successMessage: message}) =>
  <SuccessMessage{...{stepKey, componentKey, wizardStepStatusDispatcher, message}}/>;

const thereAreErrors = ({componentKey, idv}) => idv[componentKey].status === "Failed";
const showErrors = ({renderErrors, ...props}) => renderErrors(props);

const enhance = compose(
  setDisplayName("BaseEvidenceContainer"),
  setPropTypes({
    lead: PropTypes.object.isRequired,
    idv: PropTypes.object.isRequired,
    renderUploadEvidence: PropTypes.func.isRequired,
    renderCaptureEvidence: PropTypes.func.isRequired,
    renderErrors: PropTypes.func.isRequired,
    dispatch: PropTypes.func,
    stepKey: PropTypes.string,
    componentKey: PropTypes.string.isRequired,
    successMessage: PropTypes.string.isRequired
  }),
  connect(state => ({isMobile: state.isMobile})),
  withHandlers({
    done: props => () => {
      const {dispatch, stepKey, componentKey} = props;
      dispatch(stepComponentStatusChanged({stepKey, componentKey, status: 'captured'}));
    }
  }),
  nonOptimalStates([
    {when: evidenceCaptured, render: showSuccessMessage},
    { when: thereAreErrors, render: showErrors}
  ])
);

const BaseEvidenceContainer = (props) => {
  const {renderUploadEvidence, renderCaptureEvidence} = props;
  return props.isMobile
    ? renderUploadEvidence(props)
    : renderCaptureEvidence(props);
};

export default enhance(BaseEvidenceContainer);