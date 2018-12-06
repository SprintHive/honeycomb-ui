
import React from 'react';
import Radium from 'radium';
import {compose, lifecycle, setDisplayName, withHandlers, withProps, withState} from 'recompose';

import Button from './ButtonNoHover'
import FlexBox from "../../layout/FlexBox";
import {withStyle} from "../../theme/ThemeManager";

const enhance = compose(
  setDisplayName('ToggleGroup'),
  withStyle("toggleGroup"),
  withStyle("toggleButton"),
  withState("selectedItem", "updateSelectedItem", ({initialValue, data}) => {
    if (initialValue) {
      return data.find(d => d.value === initialValue);
    } else {
      return data[0];
    }
  }),
  lifecycle({
    componentWillMount() {
      const {componentStatusChanged, onValueChanged, initialValue} = this.props;
      componentStatusChanged && componentStatusChanged("captured");
      if (initialValue) {
        onValueChanged && onValueChanged(initialValue);
      }
    },
    componentWillUpdate(newProps) {
      if (this.props.initialValue !== newProps.initialValue) {
        const {componentStatusChanged, updateSelectedItem, initialValue, data} = newProps;
        updateSelectedItem(data.find(d => d.value === initialValue));
        componentStatusChanged && componentStatusChanged("captured");
      }
    }
  }),
  withHandlers({
    onValueChanged: ({onValueChanged, updateSelectedItem}) => ({data}) => {
      onValueChanged && onValueChanged(data.value);
      updateSelectedItem(data)
    },
    toggle: (props) => (clickedItem) => {
      const {updateSelectedItem, onValueChanged} = props;
      onValueChanged && onValueChanged(clickedItem.value);
      updateSelectedItem(clickedItem);
    }
  }),
  Radium
);

const ToggleButton = ({toggleButton, style, size, toggledOn, toggle, children}) => {
  const styles = [toggleButton.base];
  toggledOn && styles.push(toggleButton.toggledOn);
  styles.push(style);
  return <Button style={styles} size={size} onClick={toggle}>{children}</Button>
};

const ToggleGroup = (props) => {
  const {toggleGroup, toggleButton, style, toggle, onValueChanged, data, selectedItem, initialValue} = props;
  const items = data.map((d, i) => {
      const toggledOn = selectedItem ? selectedItem.value === d.value : d.value === initialValue;
      return (
        <ToggleButton key={`tb-${i}-${d.value}`}
                      noHover
                      toggleButton={toggleButton}
                      style={[
                        i > 0 && toggleGroup.lastChild,
                        toggleGroup.noRadius]}
                      onValueChanged={onValueChanged}
                      data={d}
                      value={d.value}
                      toggle={() => toggle(d)}
                      toggledOn={toggledOn}
                      size="tiny">
          {d.label}
        </ToggleButton>
      )
    }
  );

  return (
    <FlexBox column centered>
      <FlexBox style={[toggleGroup.base, style]}>
        {items}
      </FlexBox>
    </FlexBox>
  )
};

export default enhance(ToggleGroup);