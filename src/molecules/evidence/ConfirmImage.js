/**
 * Copyright (c) 2018 SprintHive (Pty) Ltd (buzz@sprinthive.com)
 *
 * This source code is licensed under the Apache License, Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */

import React from "react";
import PropTypes from "prop-types";
import {compose, setDisplayName, setPropTypes} from "recompose";
import ViewBase64Image from "../../atoms/base64Image/ViewBase64Image";
import ImageButton from "../../atoms/imageButton/ImageButton";
import FlexBox from "../../layout/FlexBox";

const enhance = compose(
  setDisplayName("ConfirmImage"),
  setPropTypes({
    reTakeImage: PropTypes.func.isRequired,
    acceptImage: PropTypes.func.isRequired,
    imageBase64Str: PropTypes.string.isRequired
  })
);

const ConfirmImage = (props) => {
  const {reTakeImage, acceptImage, imageBase64Str} = props;
  return (
    <FlexBox style={[{marginTop: 10}]} column item>
      <FlexBox centered>
        <ViewBase64Image base64Str={imageBase64Str}/>
      </FlexBox>
      <FlexBox style={[{marginTop: 10, justifyContent: "space-around"}]} item>
        <ImageButton glyphIcon="glyphicons-restart" text="Re-take" onClick={reTakeImage}/>
        <ImageButton glyphIcon="glyphicons-send" text="Submit" onClick={acceptImage}/>
      </FlexBox>
    </FlexBox>
  )
};

export default enhance(ConfirmImage);