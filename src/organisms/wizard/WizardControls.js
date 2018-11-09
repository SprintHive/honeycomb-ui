/**
 * Copyright (c) 2018 SprintHive (Pty) Ltd (buzz@sprinthive.com)
 *
 * This source code is licensed under the Apache License, Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */

import React from "react";
import {compose, withHandlers, withProps} from "recompose";
import {connect} from "react-redux";
import NavDot from "./NavDot";
import FlexBox from "../../layout/FlexBox";
import Button from "../../atoms/button/Button";

export const withWizardButtonState = compose(
  connect((state, props) => {
    const {steps, currentStepIndex, wizardStepStatus} = props;
    const stepCount = Object.keys(steps).length;
    const stepComplete = isStepComplete(steps, currentStepIndex, wizardStepStatus);
    const backDisabled = currentStepIndex === 0;
    const nextDisabled = !stepComplete || currentStepIndex === stepCount -1;
    return {backDisabled, nextDisabled, stepCount}
  })
);

export const withWizardButtonHandlers = compose(
  withHandlers({
    next: (props) => e => {
      const {currentStepIndex, stepCount, setCurrentStepIndex} = props;
      const current = currentStepIndex || 0;
      const nextIndex = current + 1;
      if (nextIndex < stepCount) {
        setCurrentStepIndex(nextIndex);
      }
    },
    back: (props) => e => {
      const {currentStepIndex, setCurrentStepIndex} = props;
      const current = currentStepIndex || 0;
      const nextIndex = current - 1;
      if (nextIndex > -1) {
        setCurrentStepIndex(nextIndex);
      }
    }
  })
);

const enhance = compose(
  withWizardButtonState,
  withWizardButtonHandlers,
  withProps(props => {
    const {steps, currentStepIndex} = props;
    const navDots = Object.keys(steps).map((step, index) => <NavDot key={index} {...{index, currentStepIndex}}/>);
    return {navDots}
  })
);

export function isStepComplete(steps, currentStepIndex, wizard) {
  const stepKeysArray = Object.keys(steps);
  const stepKey = stepKeysArray[currentStepIndex];
  const step = steps[stepKey];
  const {components} = step;
  const stepState = wizard && wizard.steps && wizard.steps[stepKey];
  let complete = true;
  if (stepState) {
    //loop over all the components for the step and make check that all of them have been captured
    const {status} = stepState;
    Object.keys(components).forEach(componentKey => {
      // once it is inComplete it will can never be true again
      complete = complete && status[componentKey] === 'captured';
    });
  } else {
    complete = false;
  }
  return complete
}

export default enhance(props => {
  const {back, next, backDisabled, nextDisabled, navDots} = props;

  return (
    <FlexBox style={{marginTop: 20, minWidth: 300, maxWidth: 300, justifyContent: 'space-between', alignSelf: 'center'}}>
      <FlexBox left item>
        <Button disabled={backDisabled} onClick={back}>Back</Button>
      </FlexBox>
      {navDots}
      <FlexBox right item>
        <Button disabled={nextDisabled} onClick={next}>Next</Button>
      </FlexBox>
    </FlexBox>
  )
});
