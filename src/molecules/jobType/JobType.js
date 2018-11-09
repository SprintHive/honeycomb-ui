/**
 * Copyright (c) 2018 SprintHive (Pty) Ltd (buzz@sprinthive.com)
 *
 * This source code is licensed under the Apache License, Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */

import React from "react";
import PropTypes from "prop-types";
import {compose, setDisplayName, withProps} from "recompose";
import SelectInput from "../../atoms/selectInput/SelectInput";
import PropertyInput from "../propertyInput/PropertyInput";
import FlexBox from "../../layout/FlexBox";

const enhance = compose(
  setDisplayName("JobType"),
  withProps({
    options: [
      {label: "Agriculture", value: "Agriculture"},
      {label: "Catering and Entertainment", value: "Catering and Entertainment"},
      {label: "Civil Service", value: "Civil Service"},
      {label: "Clerical", value: "Clerical"},
      {label: "Construction", value: "Construction"},
      {label: "Education", value: "Education"},
      {label: "Finance", value: "Finance"},
      {label: "Health", value: "Health"},
      {label: "Industry", value: "Industry"},
      {label: "Legal", value: "Legal"},
      {label: "Media", value: "Media"},
      {label: "Nature Resources", value: "Nature Resources"},
      {label: "Armed Forces", value: "Armed Forces"},
      {label: "Science / Computing", value: "Science / Computing"},
      {label: "Security", value: "Security "},
      {label: "Selling Retailing", value: "Selling Retailing"},
      {label: "Transportation", value: "Transportation"},
      {label: "Welfare", value: "Welfare"},
      {label: "Unclassified", value: "Unclassified"},
      {label: "Unemployed", value: "Unemployed"},
      {label: "No Information", value: "No Information"}
    ]
  }),
  withProps(() => {
    return {
      propertyName: "jobType",
      entityName: "lead",
      entityIdName: "leadId"
    }
  }),
);

const JobType = (props) => {
  return (
    <FlexBox column centered={props.centered}>
      <PropertyInput {...props}>
        { propertyInputProps => {
          const {style, placeholder, options, done, initialValue} = propertyInputProps;
          return <SelectInput style={style}
                              placeholder={placeholder || "Select an industry"}
                              options={options}
                              done={done}
                              initialValue={initialValue}/>
        }}
      </PropertyInput>
    </FlexBox>

  )
};

export default enhance(JobType);