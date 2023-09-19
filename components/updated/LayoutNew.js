import * as React from "react";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

//Stepper

import Container from "@mui/material/Container";

import Grid from "@mui/material/Grid";

//Card
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";

import CustomStepper from "./stepper.js";
import AccountMenu from "./UserMenu.js";

export default function LayoutNew(props, { children, home }) {
  let eruaLogonURL = props.basePath? `/${props.basePath}/img/erua.png`:process.env.BASE_PATH
    ? `/${process.env.BASE_PATH}/img/erua.png`
    : "/img/erua.png";
  let patternURL = props.basePath? `/${props.basePath}/pattern.svg`:process.env.BASE_PATH
    ? `/${process.env.BASE_PATH}/pattern.svg`
    : "/pattern.svg";
  let profileURL = props.basePath? `/${props.basePath}/profile.svg`:process.env.BASE_PATH
    ? `/${process.env.BASE_PATH}/profile.svg`
    : "/profile.svg";
  let signURL = props.basePath? `/${props.basePath}/sign.svg`:process.env.BASE_PATH
    ? `/${process.env.BASE_PATH}/sign.svg`
    : "/sign.svg";
  let connectURL = props.basePath? `/${props.basePath}/connect.jpg`:process.env.BASE_PATH
    ? `/${process.env.BASE_PATH}/connect.jpg`
    : "/connect.jpg";
  let euFlagURL = props.basePath? `/${props.basePath}/eu_flag.jpg`:process.env.BASE_PATH
    ? `/${process.env.BASE_PATH}/eu_flag.jpg`
    : "/eu_flag.jpg";
  let mailURL = props.basePath? `/${props.basePath}/mail.svg`:process.env.BASE_PATH
    ? `/${process.env.BASE_PATH}/mail.svg`
    : "/mail.svg";
  let linkedInURL = props.basePath? `/${props.basePath}/linkedin.svg`:process.env.BASE_PATH
    ? `/${process.env.BASE_PATH}/linkedin.svg`
    : "/linkedin.svg";

  let ebsiLogo = props.basePath? `/${props.basePath}/img/ebsi_logo.png`:process.env.BASE_PATH
    ? `/${process.env.BASE_PATH}/img/ebsi_logo.png`
    : "/img/ebsi_logo.png";

  let ewcLogo = props.basePath? `/${props.basePath}/img/ewc_logo.png`:process.env.BASE_PATH
    ? `/${process.env.BASE_PATH}/img/ewc_logo.png`
    : "/img/ewc_logo.png";

  let cefLogo = props.basePath? `/${props.basePath}/img/cef_logo.webp`:process.env.BASE_PATH
    ? `/${process.env.BASE_PATH}/img/cef_logo.webp`
    : "/img/cef_logo.webp";
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const top1EM = { marginTop: "1em" };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const steps = [
    "Authenticate",
    "Confirm Details",
    "Select Credential",
    "Issue Credential",
  ];

  const alternativeSteps = [
    "Authenticate",
    "Verify Email",
    "Select Credential",
    "Issue Credential",
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mt: 2 }} style={top1EM}>
          <Grid item md={4} xs={10}>
            <img
              src={eruaLogonURL}
              alt=""
              className="kyb"
              width="100%"
              style={{ width: "50%" }}
            />
          </Grid>

          <Grid item xs={6} sx={{ display: { xs: "none", md: "block" } }}>
            <img
              src={patternURL}
              alt=""
              className="Pattern"
              width="750px"
              style={{ marginTop: -480, marginBottom: -250, marginLeft: -100 }}
            />
          </Grid>
        </Grid>
        {/* side box  */}
        <Grid container spacing={4} sx={{ mt: 3 }}>
          <Grid
            item
            md={12}
            sm={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <AccountMenu
              userName={props.accountName}
              basePath={props.basePath ? props.basePath : ""}
              name={props.name}
              surname={props.surname}
            />
          </Grid>
          <Grid item md={9} sm={12}>
            <Box sx={{ width: "100%", mt: 2 }}>
              <CustomStepper
                activeStep={props.activeStep}
                steps={steps}
                alternativeSteps={alternativeSteps}
              />

              <React.Fragment>{props.children}</React.Fragment>
            </Box>
          </Grid>

          <Grid item md={3} xs={12}>
            {props.activeStep == 0 ? (
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    ERUA Workshop Ticket Issuer
                  </Typography>
                  <Typography variant="h5" component="div">
                    {props.activeStep + 1}. Authenticate
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 4 }} style={top1EM}>
                    To generate your Ticket for an ERUA Workshop, first verify
                    you identity by authenticating with one of the available
                    options
                    <br />
                  </Typography>
                  <Box my={3} sx={{ width: { md: "100%", xs: "50%" } }}>
                    <img src={profileURL} alt="provile-img" width="100%" />
                  </Box>
                </CardContent>
              </Card>
            ) : null}

            {props.activeStep === "1a" ? (
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Verification
                  </Typography>
                  <Typography variant="h5" component="div">
                    {1}. Verify your Email
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 4 }}>
                    Please provide the email you used to register to the
                    workshop with.
                    <br />
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 4 }}>
                    You will receive an One Time Password (OTP) that you will
                    need to provide to verify your ownership over the email
                    address to continue.
                    <br />
                  </Typography>

                  <Box my={3}>
                    <img src={signURL} alt="sign-img" width="100%" />
                  </Box>
                </CardContent>
              </Card>
            ) : null}

            {props.activeStep == 1 ? (
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Verification
                  </Typography>
                  <Typography variant="h5" component="div">
                    {props.activeStep + 1}. Verify your Details
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 4 }}>
                    You have accessed the ERUA Issuer service. <br />
                    Please ensure your Personal Identification Information
                    presented in the adjustent table is correct. If the
                    presented information is correct you can proceed to
                    selecting one of the credentials that are available to you
                    for issuance by clicking "Continue". If the information is
                    not correct, please contact your Home Institutions Identity
                    Provider.
                    <br />
                  </Typography>

                  <Box my={3}>
                    <img src={signURL} alt="sign-img" width="100%" />
                  </Box>
                </CardContent>
              </Card>
            ) : null}

            {props.activeStep == 2 ? (
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Select
                  </Typography>
                  <Typography variant="h5" component="div">
                    {props.activeStep + 1}. Select Credential
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 4 }}>
                    Based on the information you provided during authentication
                    you are entitled to issue the presented Tickets.
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 4 }}>
                    Please select the Ticket you want to issue by clicking the
                    respective Ticket name. <br />
                  </Typography>
                  <Box my={3}>
                    <img src={connectURL} alt="information" width="100%" />
                  </Box>
                </CardContent>
              </Card>
            ) : null}

            {props.activeStep == 3 ? (
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Credential Issuance powered by UAegean via GATACA.
                  </Typography>
                  <Typography variant="h5" component="div">
                    {props.activeStep + 1}. Receive your Credential
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 4 }}>
                    Scan with your wallet app the QR code or tap the button to
                    receive your Ticket.
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 4 }}>
                    Your wallet will prompt you if you wish to store this
                    credential by UAegean. If you accept, you will receive a
                    notification in your wallet once issuance is completed. It
                    is all automated!
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 4 }}>
                    {" "}
                    It is all automated!
                  </Typography>

                  <Box my={3}>
                    <img src={connectURL} alt="done" width="100%" />
                  </Box>
                </CardContent>
              </Card>
            ) : null}

            {props.activeStep == 4 ? (
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Profile
                  </Typography>
                  <Typography variant="h5" component="div">
                    {props.activeStep + 1}. Pair your Device
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 4 }}>
                    In order to proceed please scan the provide QR code with
                    your Palaemon APP. This will add the device to your profile
                    and will enable you to gain personalized assistance in cases
                    of emergency directly on your phone <br />
                  </Typography>
                  <Box my={3}>
                    <img src={connectURL} alt="information" width="100%" />
                  </Box>
                </CardContent>
              </Card>
            ) : null}
          </Grid>
        </Grid>

        {/* footer */}
        <Grid
          container
          spacing={2}
          sx={{ pt: 12, mb: 3 }}
          id="footer"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid item xs={3}>
            <img src={cefLogo} style={{ maxWidth: "12rem" }} alt="cef" />
          </Grid>
          <Grid item xs={3}>
            <img src={ewcLogo} style={{ maxWidth: "8rem" }} alt="cef" />
          </Grid>
          <Grid item xs={3}>
            <img src={ebsiLogo} style={{ maxWidth: "8rem" }} alt="cef" />
          </Grid>

          <Grid item xs={3} md={3}>
            <Grid container>
              <Typography sx={{ mb: 3, mr: 3 }}>
                Developed by{" "}
                <a href="http://www.atlantis-group.gr/i4Mlab">
                  {" "}
                  UAegean i4m Lab{" "}
                </a>
              </Typography>

              <Grid sx={{ mr: 2 }}>
                <a href="mailto:i4mlab@uaegean">
                  <img src={mailURL} height="35" className="facebook" />
                </a>{" "}
              </Grid>
              <Grid sx={{ mr: 2 }}>
                {" "}
                <a href="https://www.linkedin.com/company/uaegean-i4m-lab">
                  <img
                    src={linkedInURL}
                    height="35"
                    alt="linkedin"
                    className="twitter"
                  />
                </a>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={12}>
            <Typography style={{ color: "grey" }}>
              {/* The European Commission's support for the production of this
              publication does not constitute an endorsement of the contents,
              which reflect the views only of the authors, and the Commission
              cannot be held responsible for any use which may be made of the
              information contained therein. */}
              The EWC project is co-funded by the EU’s Digital Europe Programme
              under Grant Agreement – GAP-101102744
            </Typography>{" "}
            <br />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
