
import React from "react";
import PropTypes from "prop-types";
import {compose, lifecycle, setDisplayName, setPropTypes} from "recompose";
import FlexBox from "../../layout/FlexBox";
import {withComponentStatusChanged} from "../propertyInput/PropertyInput";

const enhance = compose(
  setDisplayName("SuccessMessage"),
  withComponentStatusChanged,
  setPropTypes({
    message: PropTypes.string.isRequired,
  }),
  lifecycle({
    componentDidMount() {
      this.props.componentStatusChanged("captured")
    },
  })
);

const SuccessMessage = (props) => {
  return (
    <FlexBox style={{marginTop: 10, minWidth: 400}} column centered>
      <FlexBox item centered>
        <span style={{fontSize: 34, lineHeight: 1, color: "green"}} className="glyphicons glyphicons-ok-circle"/>
      </FlexBox>
      <FlexBox item centered>
        {props.message}
      </FlexBox>
    </FlexBox>
  )
};

export default enhance(SuccessMessage);
