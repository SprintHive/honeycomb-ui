/**
 * Copyright (c) 2018 SprintHive (Pty) Ltd (buzz@sprinthive.com)
 *
 * This source code is licensed under the Apache License, Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */

import React from "react";
import {compose, setDisplayName, withProps} from "recompose";
import FlexBox from "../../layout/FlexBox";
import ToggleGroup from "../../atoms/toggleButton/ToggleGroup";
import {withComponentStatusChanged} from "../propertyInput/PropertyInput";
import PropertyInput from "../propertyInput/PropertyInput";

const enhance = compose(
  setDisplayName("RepaymentPeriod"),
  withProps({
    data: [
      {label: "6 months", value: 6},
      {label: "1 year", value: 12},
      {label: "2 years", value: 24}
    ],
  }),
  withProps(() => {
    return {
      propertyName: "repaymentPeriod",
      entityName: "lead",
      entityIdName: "leadId"
    }
  }),
  withComponentStatusChanged
);

const RepaymentPeriod = (props) => {
  return (
    <PropertyInput {...props}>
      {props => {
        const {data, done, componentStatusChanged} = props;
        let initialValue = props.initialValue || data[0].value;
        return <FlexBox style={{marginTop: 10}} column centered>
          <FlexBox><span style={{cursor: "pointer"}}>Repayment period</span></FlexBox>
          <ToggleGroup style={{marginTop: 10, maxWidth: 300}}
                       data={data} onValueChanged={done}
                       componentStatusChanged={componentStatusChanged}
                       initialValue={initialValue}/>
        </FlexBox>
      }}
    </PropertyInput>
  )
};

export default enhance(RepaymentPeriod);