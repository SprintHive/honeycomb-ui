
import React from "react";
import Radium from "radium";
import PropTypes from "prop-types";
import {compose, lifecycle, setDisplayName, withHandlers, withState} from "recompose";

import {withComponentStatusChanged} from "../propertyInput/PropertyInput";
import FlexBox from "../../layout/FlexBox";
import {nonOptimalStates} from "../../hoc/nonOptimalStates";
import {proofOfIncomeCaptured} from "./ProofOfIncomeActions";

const style = {
  container: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#db7400',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10
  },
  labelStyle: {cursor: 'pointer'},
  hideFileInput: {
    width: 0.1,
    height: 0.1,
    opacity: 0,
    overflow: 'hidden',
    position: 'absolute',
    zIndex: -1
  }
};

const captured = ({lead, viewMode}) => viewMode === "captured" || lead.proofOfIncome;
const enhanceCaptureComplete = compose(
  setDisplayName("ShowCaptureProofOfIncomeComplete"),
  withComponentStatusChanged,
  lifecycle({
    componentDidMount() {
      const {componentStatusChanged} = this.props;
      componentStatusChanged && componentStatusChanged("captured")
    },
  })
);

const showCaptureComplete = enhanceCaptureComplete(() => {
  return (
    <FlexBox style={{marginTop: 10}} column centered>
      <FlexBox item centered>
        <span style={{fontSize: 34, lineHeight: 1, color: "green"}} className="glyphicons glyphicons-ok-circle"/>
      </FlexBox>
      <FlexBox item centered>
        Your bank statement has been uploaded successfully
      </FlexBox>
    </FlexBox>
  )
});

const enhance = compose(
  setDisplayName("ProofOfIncome"),
  withState("viewMode", "updateViewMode", "initialising"),
  withComponentStatusChanged,
  withHandlers({
    submit: ({dispatch, lead, componentStatusChanged, updateViewMode, endpoint, headers}) => event => {
      if (event.target.files.length === 3) {
        if (event.target.files[0].type.indexOf("application/pdf") === 0
          && event.target.files[1].type.indexOf("application/pdf") === 0
          && event.target.files[2].type.indexOf("application/pdf") === 0) {
          const {leadId} = lead;
          const data = new FormData();
          data.append('file', event.target.files[0]);
          data.append('file', event.target.files[1]);
          data.append('file', event.target.files[2]);
          dispatch(proofOfIncomeCaptured({leadId, data, endpoint, headers}));
          componentStatusChanged && componentStatusChanged("captured");
          updateViewMode("captured");
        } else {
          console.error("All files must be of type application/pdf")
        }
      } else {
        console.error(event.target.files.length + " file(s) found, 3 required")
      }
    }
  }),
  nonOptimalStates([
    {when: captured, render: showCaptureComplete}
  ]),
  Radium
);

const ProofOfIncome = (props) => {
  return (
    <FlexBox style={style.container} column centered>
      <input id={"proofOfIncome_input"} style={[style.hideFileInput]} type="file" multiple="multiple"
             onChange={props.submit} accept="application/pdf"/>
      <FlexBox column item>
        <label style={style.labelStyle} htmlFor={"proofOfIncome_input"}>
          <FlexBox item centered>
            <span style={{fontSize: 24, lineHeight: 1}} className="glyphicons glyphicons-cloud-upload"/>
          </FlexBox>
          <FlexBox item centered>
            UPLOAD BANK STATEMENTS
          </FlexBox>
          <FlexBox item centered>
            <ul>
              <li>PDF files from your bank</li>
              <li>3 consecutive months in any order</li>
              <li>3rd month no more than 2 months old</li>
            </ul>
          </FlexBox>
        </label>
      </FlexBox>
    </FlexBox>
  )
};

export default enhance(ProofOfIncome);