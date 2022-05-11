import * as React from "react";
import LayoutNew from "./LayoutNew";
import Head from "next/head";
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
// List
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Link from "next/link";

function mapName(name) {
  switch (name) {
    case "Identifier":
      return "eID Identifier";
      break;
    default:
      return name;
  }
}

function createData(variabl, value) {
  return { variabl, value };
}

const VerifyUser = (props) => {
  let userDetails = props.userDetails;
  // ? props.userDetails:{
  //   Name: "Nikos",
  //   Surname: "Triantafyllou",
  //   Identifier: "1231",
  // }

  const rows = [];

  Object.keys(props.userDetails).forEach((attributeName) => {
    if (attributeName !== "Identifier") {
      rows.push(
        createData(mapName(attributeName), props.userDetails[attributeName])
      );
    }
  });

  return (
    <LayoutNew home alert={!props.userDetails} activeStep={1}>
      <>
        <Typography variant="h5" sx={{ mt: 6, mb: 4 }}>
          Before we begin, Is your Personal Information accurate?
        </Typography>
        <TableContainer>
          <Table aria-label="simple table">
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.variabl}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    <Box fontWeight="fontWeightBold" display="inline">
                      {row.variabl}
                    </Box>
                  </TableCell>
                  <TableCell align="left">{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>

      <Box sx={{ display: "flex", flexDirection: "row", pt: 4 }}>
        {/* <Button
          color="inherit"
          disabled={props.activeStep === 0}
          onClick={props.handleBack}
          sx={{ mr: 1 }}
          size="large"
        >
          Back
        </Button> */}
        <Box sx={{ flex: "1 1 auto" }} />

        <>
          <Link href="/pair-device">
            <Button variant="contained" size="large" sx={{ mr: 1 }}>
              Confirm
            </Button>
          </Link>
        </>
      </Box>
    </LayoutNew>
  );
};

export default VerifyUser;
