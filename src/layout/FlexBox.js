import React from 'react'
import {compose, setDisplayName} from 'recompose'
import Radium from 'radium'
import {blueBox, greenBox, orangeBox, redBox, yellowBox} from "../BoxStyles";

export const flexStyle = {
  base: {
    display: 'flex'
  },
  flexDirectionColumn: {
    flexDirection: 'column'
  },
  flexWrap: {
    flexWrap: 'wrap'
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  left: {
    justifyContent: 'flex-start',
  },
  right: {
    justifyContent: 'flex-end',
  },
  spaceBetween: {
    justifyContent: "space-between"
  },
  flexItem: {
    flex: 1
  },
  flexGrow: {
    flexGrow: 1
  },
  marginBottom: {
    marginBottom: 10,
  },
  margin: {
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
    marginLeft: 10,
  },
  padding: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  round: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  }
};

const enhance = compose(
  setDisplayName('FlexBox'),
  Radium,
);

const FlexBox = enhance(({style, column, centered, left, right, wrap, item, flexGrow, margin, marginBottom,
                           round, spaceBetween, className, children, onClick, red, blue, green, orange, yellow}) =>
  <div className={className} style={[
    flexStyle.base,
    column && flexStyle.flexDirectionColumn,
    centered && flexStyle.centered,
    left && flexStyle.left,
    right && flexStyle.right,
    wrap && flexStyle.flexWrap,
    item && flexStyle.flexItem,
    flexGrow && flexStyle.flexGrow,
    margin && flexStyle.margin,
    marginBottom && flexStyle.marginBottom,
    round && flexStyle.round,
    spaceBetween && flexStyle.spaceBetween,
    red && redBox,
    blue && blueBox,
    green && greenBox,
    orange && orangeBox,
    yellow && yellowBox,
    style
  ]}
       onClick={onClick}
  >
    {children}
  </div>
);

export default FlexBox;