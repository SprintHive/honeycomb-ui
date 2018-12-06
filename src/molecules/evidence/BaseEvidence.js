import React from "react";
import PropTypes from "prop-types";
import {compose, setDisplayName, setPropTypes, withHandlers, withProps} from "recompose";
import {stepComponentStatusChanged} from "../propertyInput/PropertyInput";
import {nonOptimalStates} from "../../hoc/nonOptimalStates";
import SuccessMessage from "../upload/SuccessMessage";
import {mobileAndTabletCheck} from "../../lib/detectmobilebrowser";

const evidenceCaptured = ({componentKey, identityVerification}) =>
  identityVerification[componentKey].status === "Captured" || identityVerification.status.key === "VERIFICATION_PASSED";
const showSuccessMessage = ({wizardStepStatusDispatcher, stepKey, componentKey, successMessage: message}) =>
  <SuccessMessage{...{stepKey, componentKey, wizardStepStatusDispatcher, message}}/>;

const thereAreErrors = ({componentKey, identityVerification}) => identityVerification[componentKey].status === "Failed";
const showErrors = ({renderErrors, ...props}) => renderErrors(props);

const enhance = compose(
  setDisplayName("BaseEvidenceContainer"),
  setPropTypes({
    application: PropTypes.object.isRequired,
    identityVerification: PropTypes.object.isRequired,
    renderUploadEvidence: PropTypes.func.isRequired,
    renderCaptureEvidence: PropTypes.func.isRequired,
    renderErrors: PropTypes.func.isRequired,
    dispatch: PropTypes.func,
    stepKey: PropTypes.string,
    componentKey: PropTypes.string.isRequired,
    successMessage: PropTypes.string.isRequired
  }),
  withProps({isMobile: mobileAndTabletCheck()}),
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