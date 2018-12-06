
import React from "react";
import {compose, setDisplayName, withReducer, withState} from "recompose";
import FlexBox from "../../layout/FlexBox";
import WizardControls from "./WizardControls";

function stepComponentStatusChanged(state, action) {
  const {stepKey, componentKey, status} = action.payload;
  const ans = {...state};

  if (!ans['steps']) {
    ans['steps'] = {};
  }

  if (!ans['steps'][stepKey]) {
    ans['steps'][stepKey] = {};
  }

  if (!ans['steps'][stepKey]['status']) {
    ans['steps'][stepKey]['status'] = {};
  }

  if (!ans['steps'][stepKey]['status'][componentKey]) {
    ans['steps'][stepKey]['status'][componentKey] = {};
  }

  if (status !== null) {
    ans['steps'][stepKey]['status'][componentKey] = status;
  } else {
    // this allows unsetting previously-set statuses
    delete ans['steps'][stepKey]['status'][componentKey]
  }
  return ans;
}

const wizardStepReducer = (state, action) => {
  switch (action.type) {

    case "STEP_COMPONENT_STATUS_CHANGED":
      return stepComponentStatusChanged(state, action);

    default:
      return state;
  }
};

const enhance = compose(
  setDisplayName("Wizard"),
  withState("currentStepIndex", "setCurrentStepIndex", 0),
  withReducer("wizardStepStatus", "wizardStepStatusDispatcher", wizardStepReducer, {})
);

const Wizard = (props) => {
  console.log("Wizard", props);
  const {steps} = props;
  const stepKeysArray = Object.keys(steps);
  const stepCount = stepKeysArray.length;
  const wizardSteps = stepKeysArray.map((key, stepIndex) => {
    const {components} = steps[key];
    return <Step key={key}
                 stepKey={key}
                 stepIndex={stepIndex}
                 components={components}
                 stepCount={stepCount}
                 {...props}/>
  });

  return props.children({
    renderWizard: () => <FlexBox column>{wizardSteps}</FlexBox>,
    renderControls: () => <WizardControls {...props}/>
  })
};

const Step = (props) => {
  const {components, stepKey, stepIndex, currentStepIndex, autoNext} = props;
  const componentKeysArray = Object.keys(components);
  const componentCount = componentKeysArray.length;
  const items = componentKeysArray.map((componentKey, componentIndex) =>
    React.createElement(components[componentKey].component,
      {
        ...props,
        key: `${stepKey}-${componentKey}`,
        stepKey,
        componentKey,
        componentIndex,
        componentCount,
        centered: true,
        focus: componentIndex === 0,
        autoNext
      },
      null)
  );
  return <div style={{display: currentStepIndex === stepIndex ? null : "none"}}>{items}</div>
};


export default enhance(Wizard);