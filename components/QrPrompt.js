import { Table, Container, Row, Col, Button } from "react-bootstrap";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import { getPath } from "../utils/pathHelper";
import { makeStyles } from "@material-ui/core/styles";
import styles from "styles/jss/nextjs-material-kit/components/formStyle.js";
import stylesCustom from "../styles/jss/palaemon.module.js";

const QrPrompt = (props) => {
  const tableStyles = { ...styles, ...stylesCustom };
  const useStyles = makeStyles(tableStyles);
  const classes = useStyles();
  let index = 0;
  // const permissions = props.permissions.map((permission) => {
  //   index++;
  //   return (
  //     <tr key={index}>
  //       <td>{index}</td>
  //       <td>{permission}</td>
  //     </tr>
  //   );
  // });

  let thePrompt;
  let topHeader;

  if (props.isVCOffer) {
    thePrompt =
      "Scan the QR code with your Jolocom Wallet to receive your Credential";
    topHeader = "Your protable KYB Credential is ready ";
  } else {
    thePrompt = "Scan the QR code with your Jolocom Wallet to proceed";
    topHeader = "Before we begin";
  }

  if (props.prompt) {
    thePrompt = props.prompt;
  }

  return (
    <GridContainer
      className={"MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-4"}
    >
      <GridItem xs={12} sm={12} md={12}>
        <div className={"MuiBox-root jss270"}>
          <div className={"col-12 col-md-11 col-lg-6 pl-lg-0"}>
            <div className={classes.jss369}>
              <h6 className={classes.jss370} style={{ marginBottom: "0" }}>
                Connect your Jolocom Smart Wallet 
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
              {thePrompt}
            </h1>
          </div>
        </div>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <img
          className="img-fluid"
          style={{
            display: "block",
            margin: "auto",
            maxHeight: "21rem",
          }}
          src={props.qrData}
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={12} style={{ textAlign: "center" }}>
        <p className={classes.explanationParagraph}>
          Do not have the Jolocom app yet? Download it form your prefered app
          store
        </p>
      </GridItem>
      <GridContainer>
        <GridItem
          xs={12}
          sm={12}
          md={3}
          style={{ textAlign: "center", marginBottom: "1rem" }}
        ></GridItem>
        <GridItem
          xs={12}
          sm={12}
          md={3}
          style={{ textAlign: "center", marginBottom: "32px" }}
        >
          <a
            href="https://apps.apple.com/us/app/jolocom-smartwallet/id1223869062"
            target="_blank"
            className="w-inline-block"
          >
            <img
              className="img-fluid"
              style={{ display: "block", margin: "auto" }}
              src={
                props.baseUrl
                  ? `${props.baseUrl}app-store.png`
                  : "/app-store.png"
              }
            />
          </a>
        </GridItem>
        <GridItem xs={12} sm={12} md={3} style={{ textAlign: "center" }}>
          <a
            href="https://apps.apple.com/us/app/jolocom-smartwallet/id1223869062"
            target="_blank"
            className="w-inline-block"
          >
            <img
              className="img-fluid"
              style={{ display: "block", margin: "auto" }}
              src={
                props.baseUrl
                  ? `${props.baseUrl}app-store.png`
                  : "/app-store.png"
              }
            />
          </a>
        </GridItem>
        <GridItem
          xs={12}
          sm={12}
          md={3}
          style={{ textAlign: "center" }}
        ></GridItem>
      </GridContainer>
    </GridContainer>
  );
};

export default QrPrompt;
