
import React from "react";
import PropTypes from "prop-types";
import {compose, setDisplayName, setPropTypes} from "recompose";
import FlexBox from "../../layout/FlexBox";

const buttonStyle = {fontSize: 34, lineHeight: 1, cursor: "pointer"};

const enhance = compose(
  setDisplayName("ImageButton"),
  setPropTypes({
    onClick: PropTypes.func.isRequired,
    glyphIcon: PropTypes.string.isRequired
  })
);

const ImageButton = ({style, glyphIcon, text, onClick}) => {
  return (
    <FlexBox style={[{maxWidth: 40, cursor: "pointer"}, style]} item onClick={onClick}>
      <FlexBox centered column>
        <FlexBox style={[buttonStyle, {minWidth: 40, minHeight: 40}]} className={`glyphicons ${glyphIcon}`} />
        {
          text
          ? <FlexBox style={{whiteSpace: "nowrap"}}>{text}</FlexBox>
          : null
        }
      </FlexBox>
    </FlexBox>
  )
};

export default enhance(ImageButton);