
import React from "react";
import {compose, setDisplayName, withProps} from "recompose";
import FlexBox from "../../layout/FlexBox";
import ToggleGroup from "../../atoms/toggleButton/ToggleGroup";
import {withComponentStatusChanged} from "../propertyInput/PropertyInput";
import PropertyInput from "../propertyInput/PropertyInput";

const enhance = compose(
  setDisplayName("MaritalStatus"),
  withProps({
    data: [
      {label: "Not Married", value: 'not-married'},
      {label: "Married", value: 'married'}
    ],
  }),
  withProps(() => {
    return {
      propertyName: "maritalStatus",
      entityName: "application",
      entityIdName: "applicationId"
    }
  }),
  withComponentStatusChanged
);

const MaritalStatus = (props) => {
  return (
    <PropertyInput {...props}>
      {props => {
        const {data, done, componentStatusChanged} = props;
        let initialValue = props.initialValue || data[0].value;
        return <FlexBox style={{marginTop: 10}} column centered>
          <FlexBox><span style={{cursor: "pointer"}}>Marital status</span></FlexBox>
          <ToggleGroup style={{marginTop: 10, maxWidth: 300}} data={data} onValueChanged={done}
                       initialValue={initialValue}
                       componentStatusChanged={componentStatusChanged}/>
        </FlexBox>
      }}
    </PropertyInput>
  )
};

export default enhance(MaritalStatus);