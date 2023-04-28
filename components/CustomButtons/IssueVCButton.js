import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@mui/material/Button";

// core components

import buttonStyle from "styles/jss/nextjs-material-kit/components/buttonStyle.js";

const makeComponentStyles = makeStyles(() => ({
  ...buttonStyle,
}));

const IssueVCButtonUI = React.forwardRef((props, ref) => {
  const {
    color,
    round,
    children,
    fullWidth,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    ...rest
  } = props;

 
  return (
 
    <Button
      variant="contained"
      size="large"
      type="submit"
      disabled={props.disabled}
        onClick={props.onClick}
    >
      Issue ERUA ID
    </Button>
  );
});
 
export default IssueVCButtonUI;
