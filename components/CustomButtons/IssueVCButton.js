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

  // const classes = makeComponentStyles();

  // const btnClasses = classNames({
  //   [classes.button]: true,
  //   [classes[size]]: size,
  //   [classes[color]]: color,
  //   [classes.round]: round,
  //   [classes.fullWidth]: fullWidth,
  //   [classes.disabled]: disabled,
  //   [classes.simple]: simple,
  //   [classes.block]: block,
  //   [classes.link]: link,
  //   [classes.justIcon]: justIcon,
  //   [className]: className,
  // });
  return (
    // <Button
    // {...rest} ref={ref} classes={{ root: btnClasses }}
    //   variant="primary"
    //   disabled={props.disabled}
    //   onClick={props.onClick}
    //   color="primary"
    //   size="lg"
    // >
    //   Issue Verifiable Credential
    // </Button>
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

// IssueVCButtonUI.propTypes = {
//   color: PropTypes.oneOf([
//     "primary",
//     "info",
//     "success",
//     "warning",
//     "danger",
//     "rose",
//     "white",
//     "facebook",
//     "twitter",
//     "google",
//     "github",
//     "transparent",
//   ]),
//   size: PropTypes.oneOf(["sm", "lg"]),
//   simple: PropTypes.bool,
//   round: PropTypes.bool,
//   fullWidth: PropTypes.bool,
//   disabled: PropTypes.bool,
//   block: PropTypes.bool,
//   link: PropTypes.bool,
//   justIcon: PropTypes.bool,
//   children: PropTypes.node,
//   className: PropTypes.string,
// };
export default IssueVCButtonUI;
