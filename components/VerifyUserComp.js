import Head from "next/head";
import LayoutNewAlert from "../components/LayoutNewAlert";
import RegistryPromptArea from "../components/InfoArea/RegistryPromptArea";
import Link from 'next/link'
import React from "react";

import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import styles from "styles/jss/nextjs-material-kit/components/formStyle.js";
import stylesCustom from "../styles/jss/palaemon.module.js";


const VerifyUser = (props) => {
  const tableStyles = { ...styles, ...stylesCustom };
  const useStyles = makeStyles(tableStyles);
  const classes = useStyles();

  let userDetails = props.userDetails
  // ? props.userDetails:{
  //   Name: "Nikos",
  //   Surname: "Triantafyllou",
  //   Identifier: "1231",
  // }


  return (
    <LayoutNewAlert home alert={!props.userDetails}>
      <Head>
        <title>Palaemon Registration Service</title>
      </Head>

    

            <GridContainer  className={"MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-4"}>
              <GridItem xs={12} sm={12} md={12}>
                <div className={"MuiBox-root jss270"}>
                  <div className={"col-12 col-md-11 col-lg-6 pl-lg-0"}>
                    <div className={classes.jss369}>
                      <h6
                        className={classes.jss370}
                        style={{ marginBottom: "0" }}
                      >
                        Before we begin
                      </h6>
                    </div>

                    <h1
                      style={{
                        margin: "0px 0px 48px 0px",
                        fontSize: "3rem",
                        overflowWrap: "break-word",
                        display: "block",
                        marginBlockStart: "0.67em",
                        marginBlockEnd: "0.67em",
                        marginInlineStart: "0px",
                        marginInlineEnd: "0px",
                        fontWeight: "bold",
                        lineHeight: "1.43",
                        letterSpacing: "0.01071em",
                        marginTop: "0",
                      }}
                    >
                      Is your Personal Information accurate?
                    </h1>
                    <p className={classes.explanationParagraph}>
                      You have accessed the Palaemon pre-Embarkation
                      registration service.
                    </p>
                    <p className={classes.explanationParagraph}>
                      Before providing the rest of your details, please ensure
                      your Personal Identification Information below is correct
                    </p>
                    <div
                      className={classes.actionstagline}
                      style={{
                        fontFamily: "Open Sans,sans-serif!important",
                      }}
                    >
                      <RegistryPromptArea
                        userDetails={userDetails}
                      />
                    </div>
                  </div>

                  <div
                    className={"serviceActionsList"}
                    style={{ paddingTop: "32px", marginBottom: "32px" }}
                  >
                     <Link  href="/ticketInfo">
                    <a
                      className={[
                        classes.btn,
                        classes.btnBlue,
                        classes.fontWeightBold,
                        classes.textWhite,
                        classes.serviceActionsListA,
                      ].join(" ")}
                      data-uw-rm-brl="false"
                    >
                      <span data-uw-styling-context="true">
                        Confirm
                      </span>{" "}
                    </a>
                    </Link>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
          
    </LayoutNewAlert>
  );
}

export default VerifyUser;