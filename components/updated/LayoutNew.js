import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
//AppBar
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
//Stepper
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import Grid from "@mui/material/Grid";

//Card
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

//Forms
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";

//Icons
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";

//Table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import CustomStepper from "./stepper.js";

export default function LayoutNew(props, { children, home }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

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

  const steps = ["Authenticate", "Confirm Details", "Pair Device"];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item md={4} xs={10}>
            <img
              src="/img/palaemon-logo-sticker.png"
              alt=""
              className="kyb"
              width="100%"
            />
          </Grid>

          <Grid item xs={6} sx={{ display: { xs: "none", md: "block" } }}>
            <img
              src="/pattern.svg"
              alt=""
              className="Pattern"
              width="750px"
              style={{ marginTop: -480, marginBottom: -250, marginLeft: -100 }}
            />
          </Grid>
        </Grid>
        {/* side box  */}
        <Grid container spacing={4} sx={{ mt: 3 }}>
          <Grid item md={9} sm={12}>
            <Box sx={{ width: "100%", mt: 2 }}>
              <CustomStepper activeStep={props.activeStep} steps={steps} />

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
                    Welcome
                  </Typography>
                  <Typography variant="h5" component="div">
                    {props.activeStep + 1}. Authenticate
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 4 }}>
                    In order to access the service authenticate using your
                    "Palaemon Service Card". This card was issued to you during
                    your pre-Embarkation Registration process and is stored in
                    your Jolocom SmartWallet app. To complete the authentication
                    please click the "Access the Service" button and follow the
                    instructions. Remember to have your Jolocom SmartWallet app
                    handy.
                    <br />
                  </Typography>
                  <Box my={3} sx={{ width: { md: "100%", xs: "50%" } }}>
                    <img src="/profile.svg" alt="provile-img" width="100%" />
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
                    Validate
                  </Typography>
                  <Typography variant="h5" component="div">
                    {props.activeStep + 1}. Verify your Details
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 4 }}>
                    You have accessed the Palaemon Embarkation registration
                    service. <br />
                    Before providing the rest of your details, please ensure
                    your Personal Identification Information below is correct
                    <br />
                  </Typography>

                  <Box my={3}>
                    <img src="/sign.svg" alt="sign-img" width="100%" />
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
                    <img
                      src="/connect.jpg"
                      alt="information"
                      width="100%"
                    />
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
                    Register
                  </Typography>
                  <Typography variant="h5" component="div">
                    {props.activeStep + 1}. Connect your Jolocom Smart Wallet
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 4 }}>
                    In order to complete the process you need to connect your
                    Jolocom Smart Wallet. If you do not have it installed you
                    can download it from one of the available links <br />
                  </Typography>

                  <Box my={3}>
                    <img src="/connect.jpg" alt="done" width="100%" />
                  </Box>
                </CardContent>
              </Card>
            ) : null}
          </Grid>
        </Grid>

        {/* footer */}
        <Grid container spacing={5} sx={{ pt: 12, mb: 2 }}>
          <Grid item md={2} xs={4}>
            <img src="/eu_flag.jpg" style={{ maxWidth: "8rem" }} alt="cef" />
          </Grid>
          <Grid item md={6} xs={8}>
            <Typography>
              THE PALAEMON PROJECT HAS RECEIVED FUNDING FROM THE EUROPEAN
              UNION’S HORIZON 2020 RESEARCH AND INNOVATION PROGRAMME UNDER GRANT
              AGREEMENT NO 814962
            </Typography>{" "}
            <br />
          </Grid>

          <Grid item md={4} xs={12}>
            <Grid container>
              <Typography sx={{ mb: 2, mr: 2 }}>
                Developed by{" "}
                <a href="http://www.atlantis-group.gr/i4Mlab">
                  {" "}
                  UAegean i4m Lab{" "}
                </a>
              </Typography>

              <Grid sx={{ mr: 1 }}>
                <a href="mailto:i4mlab@uaegean">
                  <img src="/mail.svg" height="35" className="facebook" />
                </a>{" "}
              </Grid>
              <Grid sx={{ mr: 1 }}>
                {" "}
                <a href="https://www.linkedin.com/showcase/grids-kyb-custodian">
                  <img
                    src="/linkedin.svg"
                    height="35"
                    alt="linkedin"
                    className="twitter"
                  />
                </a>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
