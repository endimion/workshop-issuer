import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import { makeStyles } from "@material-ui/core/styles";
import styles from "styles/jss/nextjs-material-kit/components/formStyle.js";
import stylesCustom from "styles/jss/palaemon.module.js";
//AppBar
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

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

  /*
   <Typography sx={{ mt: 6, mb: 4 }}>
        In order to register you must first Authenticate. Authentication is
        handled via:
         </Typography>
  */

  return (
    <React.Fragment>
      <Typography variant="h5" sx={{ mt: 6, mb: 4 }}>
        {thePrompt}
      </Typography>

      <Box fontWeight="fontWeightBold" display="inline">
        <img
          className="img-fluid"
          style={{
            display: "block",
            margin: "auto",
            maxHeight: "21rem",
          }}
          src={props.qrData}
        />
      </Box>
      <Typography sx={{ mt: 6, mb: 4 }} style={{ textAlign: "center" }}>
        Do not have the Jolocom app yet? Download it form your prefered app
        store
      </Typography>
      <Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={3}></Grid>
            <Grid item xs={3}>
              {" "}
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
            </Grid>
            <Grid item xs={3}>
              {" "}
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
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </Box>
      </Typography>
    </React.Fragment>
  );
};

export default QrPrompt;
