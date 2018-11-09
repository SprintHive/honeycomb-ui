/**
 * Copyright (c) 2018 SprintHive (Pty) Ltd (buzz@sprinthive.com)
 *
 * This source code is licensed under the Apache License, Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */

import React from "react";
import {compose, setDisplayName, withProps} from "recompose";
import SelectInput from "../../atoms/selectInput/SelectInput";
import PropertyInput from "../propertyInput/PropertyInput";

const enhance = compose(
  setDisplayName("EmploymentType"),
  withProps({
    options: [
      {label: "Temporary", value: "Temporary"},
      {label: "Housewife", value: "Housewife"},
      {label: "Contractor", value: "Contractor"},
      {label: "Part time employed", value: "Part time employed"},
      {label: "Permanent", value: "Permanent"},
      {label: "Self-Employed", value: "Self-Employed"},
      {label: "Pensioner", value: "Pensioner"}
    ]
  }),
  withProps(() => {
    return {
      propertyName: "employmentType",
      innerPropertyName: "type",
      entityName: "lead",
      entityIdName: "leadId"
    }
  }),
);

const EmploymentType = (props) => {
  return (
    <PropertyInput {...props}>
      { props => {
        return <SelectInput style={props.style}
                     placeholder={props.placeholder || "Select an employment type"}
                     options={props.options}
                     done={props.done}
                     initialValue={props.initialValue}/>
      }}
    </PropertyInput>
  )
};

export default enhance(EmploymentType);