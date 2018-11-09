/**
 * Copyright (c) 2018 SprintHive (Pty) Ltd (buzz@sprinthive.com)
 *
 * This source code is licensed under the Apache License, Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */

import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {compose, lifecycle, onlyUpdateForKeys, setDisplayName, withHandlers, withProps, withReducer} from "recompose";
import FlexBox from "../../layout/FlexBox";
import AddressCard from "./AddressCard";
import {inputStyle} from "../../atoms/simpleInput/SimpleInput";
import {withComponentStatusChanged} from "../propertyInput/PropertyInput";
import {addressSearchChanged, addressSelected} from "./AddressInputActions";
import {withLiveValue} from "../../hoc/withLiveValue";
import {withStyle} from "../../theme/ThemeManager";

const suggestionStyle = {
  suggestionsTitle: {
    display: "none",
    lineHeight: "0"
  },
  suggestions: {
    marginTop: 10,
    marginBottom: 12,
    display: "none",
    maxWidth: 600,
    minWidth: 600,
  },
  show: {
    display: "flex"
  }
};

function formatAddress(address) {
  const {addressLines, ...rest} = address;
  const values = {...addressLines, ...rest};
  return Object.keys(values)
    .filter(key => !['area', 'placeId', 'location'].includes(key))
    .reduce((acc, key) => {
      const value = values[key];
      const prefix = acc.length ? ', ' : ' ';
      if (acc.includes(value)) {
        return acc;
      } else {
        return `${acc}${prefix}${value}`;
      }
    }, "");
}

const populateInitialValue = compose(
  withProps(props => {
    if (props.lead && props.lead.address && !props.searchAddressInProgress) {
      const initialValue = formatAddress(props.lead.address);
      return {initialValue};
    } else {
      return {initialValue: ""}
    }
  })
);


const enhance = compose(
  setDisplayName("AddressInput"),
  connect(state => ({...state.addressInput})),
  withComponentStatusChanged,
  populateInitialValue,
  withHandlers({
    onChange: props => e => {
      const {componentStatusChanged, lead, endpoint, dispatch} = props;
      dispatch(addressSearchChanged({leadId: lead.leadId, searchStr: e.target.value, endpoint}));
      componentStatusChanged && componentStatusChanged(undefined);
    },
    done: props => () => {
      const {componentStatusChanged} = props;
      componentStatusChanged && componentStatusChanged("captured");

    },
    addressSelected: props => ({leadId, placeId}) => {
      const {dispatch, endpoint, leadEndpoint} = props;
      dispatch(addressSelected({leadId, endpoint, leadEndpoint, placeId}));
    }
  }),
  onlyUpdateForKeys(["searchStr", "suggestions", "initialValue"]),
  withLiveValue(),
  withStyle("inputStyle")
);

const Suggestions = (props) => {
  const {lead, addressSelected} = props;
  const suggestions = props.suggestions || [];
  const leadId = lead.leadId;

  const addressCards = suggestions.map(({id, placeId, description}) =>
    <AddressCard key={id} {...{id, leadId, placeId, description, done: addressSelected}} />);

  return (
    <FlexBox column centered>
      <FlexBox style={[
        suggestionStyle.suggestions,
        suggestions.length > 0 && suggestionStyle.show
      ]} column item>
        {addressCards}
      </FlexBox>
    </FlexBox>
  )
};

const AddressInput = (props) => {
  const {onChange, searchStr, suggestions, initialValue, inputStyle, placeholder} = props;
  const value = searchStr !== undefined && searchStr !== null ? searchStr : initialValue;

  return (
    <FlexBox column centered>
      <FlexBox centered item>
        <input style={[inputStyle, {minWidth: 600, maxWidth: 800}]}
               type="text"
               placeholder={placeholder}
               onChange={onChange}
               value={value}
        />
      </FlexBox>
      <FlexBox style={[
        suggestionStyle.suggestionsTitle,
        suggestions && suggestions.length > 0 && suggestionStyle.show
      ]}>
        <p>Please select your address below:</p>
      </FlexBox>
      <Suggestions {...props} />
    </FlexBox>
  )
};

export default enhance(AddressInput);