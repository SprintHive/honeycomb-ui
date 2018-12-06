import React from "react";
import PropTypes from "prop-types";
import {compose, setDisplayName, setPropTypes, withHandlers, withProps} from "recompose";
import SimpleInput from "../../atoms/simpleInput/SimpleInput";

export const STEP_COMPONENT_STATUS_CHANGED = "STEP_COMPONENT_STATUS_CHANGED";
export const stepComponentStatusChanged = (payload) => ({type: STEP_COMPONENT_STATUS_CHANGED, payload});

export const withComponentStatusChanged = compose(
  withHandlers({
    componentStatusChanged: (props) => (status) => {
      // provide a way for the parent component to manage the component status
      const {componentStatusChanged} = props;
      if (componentStatusChanged) {
        componentStatusChanged(status);
      } else {
        const {wizardStepStatusDispatcher, stepKey, componentKey} = props;
        wizardStepStatusDispatcher && wizardStepStatusDispatcher(stepComponentStatusChanged({stepKey, componentKey, status}));
      }
    }
  })
);

export const PROPERTY_CHANGED = "PROPERTY_CHANGED";
export const propertyChanged = (payload) => ({type: PROPERTY_CHANGED, payload});

const populateInitialValue = compose(
  withProps((props) => {
    const {propertyName, innerPropertyName, entityName} = props;
    if (innerPropertyName) {
      return {initialValue: props[entityName][propertyName] && props[entityName][propertyName][innerPropertyName]};
    } else {
      return {initialValue: props[entityName][propertyName]};
    }
  })
);

export const mapEntityNameToEntity = withProps(props => ({entity: props[props.entityName]}));

const enhance = compose(
  setDisplayName("PropertyInput"),
  setPropTypes({
    propertyName: PropTypes.string,
    innerPropertyName: PropTypes.string,
    entityName: PropTypes.string.isRequired,
    entityIdName: PropTypes.string.isRequired,
    endpoint: PropTypes.string.isRequired
  }),
  mapEntityNameToEntity,
  populateInitialValue,
  withComponentStatusChanged,
  withHandlers({
    done: (props) => (newValue) => {
      const {componentStatusChanged, dispatch, endpoint, authToken, entity, entityName, entityIdName, propertyName,
        innerPropertyName, initialValue, productId} = props;
      const entityId = entity[entityIdName];
      const oldValue = entity[propertyName];
      initialValue !== newValue && dispatch(propertyChanged({entityId, entityName, propertyName, innerPropertyName,
        endpoint, authToken, newValue, oldValue, productId}));
      componentStatusChanged && componentStatusChanged("captured");
    },
    pending: ({componentStatusChanged}) => () => {
      componentStatusChanged && componentStatusChanged("pending");
    }
  })
);

const PropertyInput = props => {
  return typeof props.children === "object" ? <SimpleInput {...props}/> : props.children(props);
};

export default enhance(PropertyInput);