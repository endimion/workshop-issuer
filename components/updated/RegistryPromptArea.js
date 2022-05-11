import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import LayoutNew from "../LayoutNew";
import Button from "../CustomButtons/Button.js";
import Head from "next/head";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import styles from "styles/jss/nextjs-material-kit/components/infoStyle.js";
import stylesCustom from "styles/jss/palaemon.module.js";

const tableStyles = { ...styles, ...stylesCustom };
const useStyles = makeStyles(tableStyles);

export default function RegistryPromptAreaComp(props) {
  const classes = useStyles();

  let attributeRows = Object.keys(props.userDetails).flatMap(
    (attributeName) => {
      return (
        <GridItem
          key={attributeName}
          className="MuiGrid-root jss372 MuiGrid-container"
          style={{
            fontSize: "19px",
            marginTop: "16px",
          }}
        >
          <GridItem className="MuiGrid-root MuiGrid-container MuiGrid-item">
            <GridItem
              xs={12}
              sm={6}
              md={6}
              className={classes.tableLabel}
              style={{ fontWeight: "500" }}
            >
              {attributeName}
            </GridItem>
            <GridItem xs={12} sm={6} md={6}>
              {props.userDetails[attributeName]}
            </GridItem>
          </GridItem>
          <GridItem>
            <hr
              className="MuiDivider-root"
              style={{
                border: "none",
                height: "1px",
                margin: "0",
                flexShrink: "0",
                backgroundColor: "rgba(0, 0, 0, 0.12)",
              }}
            />
          </GridItem>
        </GridItem>
      );
    }
  );

  return (
    <div
      className={classes.container}
      style={{
        color: "rgba(0, 0, 0, 0.87)",
        margin: 0,
        fontSize: "1rem",
        fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
        fontWeight: 400,
        lineHeight: "1.43",
        letterSpacing: "0.01071em",
      }}
    >
      <GridContainer style={{ fontSize: "19px", marginTop: "16px" }}>
        <GridItem xs={12} sm={12} md={12}>
          <GridContainer>{attributeRows}</GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
}
