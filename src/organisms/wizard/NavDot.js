
import React from 'react';
import Radium from 'radium';
import {compose, setDisplayName} from 'recompose';
import FlexBox from "../../layout/FlexBox";

const style = {
  container: {
    borderRadius: '50%',
    minHeight: 10,
    maxHeight: 10,
    minWidth: 10,
    maxWidth: 10,
    background: "#575757"
  },
  marginLeft: {
    marginLeft: 5
  },
  active: {
    background: "#b3b3b3"
  }
};

const enhance = compose(
  setDisplayName('NavDot'),
  Radium
);

const NavDot = ({index, currentStepIndex}) => {
  return (
    <FlexBox item style={[
      style.container,
      index > 0 && style.marginLeft,
      index === currentStepIndex && style.active
    ]}/>
  )
};

export default enhance(NavDot);