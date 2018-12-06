
import React from "react";
import {compose, setDisplayName, withProps} from "recompose";
import FlexBox from "../../layout/FlexBox";
import ToggleGroup from "../../atoms/toggleButton/ToggleGroup";
import {withComponentStatusChanged} from "../propertyInput/PropertyInput";
import PropertyInput from "../propertyInput/PropertyInput";

const enhance = compose(
  setDisplayName("LoanAmount"),
  withProps({
    data: [
      {label: "R 1 000", value: 1000},
      {label: "R 5 000", value: 5000},
      {label: "R 10 000", value: 10000},
      {label: "R 25 000", value: 25000}
    ],
  }),
  withProps(() => {
    return {
      propertyName: "loanAmount",
      entityName: "application",
      entityIdName: "applicationId"
    }
  }),
  withComponentStatusChanged
);

const LoanAmount = (props) => {
  return (
    <PropertyInput {...props}>
      {props => {
        const {componentStatusChanged, data, done} = props;
        let initialValue = props.initialValue || data[0].value;
        return <FlexBox style={{marginTop: 10}} column centered>
          <FlexBox><span style={{cursor: "pointer"}}>Loan amount</span></FlexBox>
          <ToggleGroup style={{marginTop: 10, maxWidth: 300}} data={data} onValueChanged={done}
                       initialValue={initialValue}
                       componentStatusChanged={componentStatusChanged}/>
        </FlexBox>
      }}
    </PropertyInput>
  )
};

export default enhance(LoanAmount);