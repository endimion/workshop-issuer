import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";

import styles from "styles/jss/nextjs-material-kit/components/layoutStyle.js";

const useStyles = makeStyles(styles);

export default function LayoutNew(props, { children, home }) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <GridContainer direction="column" justifyContent="space-between" >
      <div className={classes.jss413}>
        <Header
          absolute
          color="primary"
          brand="NextJS Material Kit"
          rightLinks={<HeaderLinks />}
          {...rest}
        />
      </div>
      <div className={classes.container} style={{fontFamily: "Open Sans,sans-serif!important"}}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <main>{props.children}</main>
          </GridItem>
        </GridContainer>
      </div>
      <div>
        <Footer />
      </div>
    </GridContainer>
  );
}
