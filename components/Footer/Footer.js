/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import styles from "styles/jss/nextjs-material-kit/components/footerStyle.js";
import Button from "../CustomButtons/Button";
import Link from "next/link";

const useStyles = makeStyles(styles);
const constants = require("../../utils/consts")

let cefImgURL = constants.BASE_PATH? `/${constants.BASE_PATH}/cef-logo.png` :"/cef-logo.png" 

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.footerContainer}>
        <div className={classes.left}>
          <div className={classes.lfImgAndTextWr}>
            <img style={{maxHeight:"7rem"}}
                 src={cefImgURL}
                 alt="..."
            />
            <div className={classes.lfImgAndText}>
              <div>
                <b>Co-financed by the European Union</b>
                <hr className={classes.hrFtr} />
              </div>
              <div>Connecting Europe Facility</div>
            </div>
          </div>
          <div className={classes.btmText}>
            <p>
              Grant Agreement under the Connection Europe Facility (CEF) <br/>
              Telecommunications Sector <br />
              Agreement number INEA/CEF/ICT/A2019/1926018
            </p>
          </div>

        </div>
        <div className={classes.right}>
          <div>
            University of the Aegean | Dpt of Financial and Management
            Engineering | i4m Lab
          </div>
          <div>
            Web address | Dpt:{" "}
            <Link simple color="primary" href={"http://www.fme.aegean.gr/"}>
              <a>http://www.fme.aegean.gr/</a>
            </Link>
          </div>
          <div>
            Web address | i4m Lab:{" "}
            <a href="http://www.atlantis-group.gr/i4Mlab">
              http://www.atlantis-group.gr/i4Mlab
            </a>
          </div>
          <div>e-mail: i4mlab-courses@aegean.gr</div>
          <div>Service developed by UAegean | i4m Lab © 2021</div>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool,
};
