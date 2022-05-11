import QrPrompt from "./QrPrompt";
import SSE from "./Sse.js";
import GridContainer from "./Grid/GridContainer";
import GridItem from "./Grid/GridItem";
import IssueVCButton from "./IssueVCButton";

import { makeStyles } from "@material-ui/core/styles";
import styles from "styles/jss/nextjs-material-kit/components/formStyle.js";
import stylesCustom from "../styles/jss/palaemon.module.js";

const ProceedIssuePrompt = (props) => {
  const tableStyles = { ...styles, ...stylesCustom };
  const useStyles = makeStyles(tableStyles);
  const classes = useStyles();

  // Jolocom Wallet connected succesfully

  return (
    <GridContainer
      className={"MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-4"}
    >
      <GridItem xs={12} sm={12} md={12}>
        <div className={"MuiBox-root jss270"}>
          <div className={"col-12 col-md-11 col-lg-6 pl-lg-0"}>
            <div className={classes.jss369}>
              <h6 className={classes.jss370} style={{ marginBottom: "0" }}>
                Jolocom Wallet connected succesfully
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
              "Service Card" Issuance is ready
            </h1>

            <div
              className={classes.actionstagline}
              style={{ fontFamily: "Open Sans,sans-serif!important" }}
            >
              <ul>
                <li>
                  Click the following button to generate your Palaemon "Service
                  Card".
                </li>
                <li>
                  Next, scan the generated QR code to receive the Card on your
                  mobile wallet app (Jolocom).
                </li>
              </ul>
            </div>
          </div>
          <IssueVCButton
            hasRequiredAttributes={props.hasRequiredAttributes}
            baseUrl={props.baseUrl}
            uuid={props.uuid}
            vcType={props.vcType}
          />
        </div>
      </GridItem>
    </GridContainer>
  );
};

export default ProceedIssuePrompt;
