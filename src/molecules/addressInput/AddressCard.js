import React from "react"
import {compose, setDisplayName, withHandlers} from "recompose"
import FlexBox from "../../layout/FlexBox";

const addressCard = {
  ':hover': {
    color: '#f79733'
  },
  cursor: 'pointer'
};

const enhance = compose(
  setDisplayName("AddressCard"),
  withHandlers({
    onClick: props => () => {
      const {leadId, placeId} = props;
      props.done && props.done({leadId, placeId});
    }
  })
);

const AddressCard = (props) => {
  const {id, description, onClick} = props;
  return (
    <FlexBox key={id} item onClick={onClick} style={[addressCard]}>{description}</FlexBox>
  )
};

export default enhance(AddressCard);