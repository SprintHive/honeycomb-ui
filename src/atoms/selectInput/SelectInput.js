
import React from "react";
import Radium from "radium";
import PropTypes from "prop-types";
import {compose, onlyUpdateForKeys, setDisplayName, setPropTypes, withHandlers, withState} from "recompose";
import {withLiveValue} from "../../hoc/withLiveValue";

const selectStyle = {
  backgroundColor: 'transparent',
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  borderBottomWidth: 2,
  borderBottomColor: '#c1c1c1',
  borderBottomStyle: 'solid',
  paddingTop: 15,
  paddingBottom: 15,
  outline: 'none',
  maxWidth: 400,
  minWidth: 300,
  fontSize: '130%',
  color: '#c1c1c1',
  marginBottom: 10,
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  borderBottomRightRadius: 0,
  borderBottomLeftRadius: 0,
  paddingLeft: 5,
  cursor: 'pointer',
  textAlignLast: 'center'
};

const propTypes = compose(
  setPropTypes({
    done: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })),
    initialValue: PropTypes.string,
    placeholder: PropTypes.string,
  })
);

const enhance = compose(
  setDisplayName("SelectInput"),
  propTypes,
  withState('value', 'updateValue', ""),
  withHandlers({
    onChange: ({done, options, updateValue}) => e => {
      done(e.target.value);
      updateValue(e.target.value);
    }
  }),
  withLiveValue(),
  onlyUpdateForKeys(["initialValue", "value"]),
  Radium
);

const SelectInput = ({style, options, onChange, placeholder, value}) => {
  if (placeholder) options = [{label: placeholder, value: null}].concat(options);
  const items = options.map(o => {
    if (o.value === null) {
      // add a place holder which is not selectable
      return <option key={o.label} value={o.value}>{o.label}</option>
    } else {
      return <option key={o.label} value={o.value}>{o.label}</option>
    }
  });
  return value
    ? <select style={[selectStyle, style, !value && {color: '#7d7c7c'}]} onChange={onChange}
              value={value}>{items}</select>
    : <select style={[selectStyle, style, !value && {color: '#7d7c7c'}]} onChange={onChange}
              value={""}>{items}</select>
};

export default enhance(SelectInput);