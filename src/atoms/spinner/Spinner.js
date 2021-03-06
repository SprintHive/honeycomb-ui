
import React from 'react'
import {compose, setDisplayName} from 'recompose'

import './Spinner.css';
import {withStyle} from "../../theme/ThemeManager";


const enhance = compose(
  setDisplayName('Spinner'),
  withStyle("spinner")
);

const Spinner = props => {
  const {spinner} = props;
  return (
    <div className="spinner">
      <div className="bounce1" style={spinner}/>
      <div className="bounce2" style={spinner}/>
      <div className="bounce3" style={spinner}/>
    </div>
  )
};

export default enhance(Spinner);