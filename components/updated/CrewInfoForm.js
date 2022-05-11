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
//
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function CrewInfoForm(props) {
  // let nextButton =

  return (
    <LayoutNew home activeStep={2}>
      <Head>
        <title>Palaemon</title>
      </Head>

      <Typography variant="h5" sx={{ mt: 6, mb: 4 }}>
        Provide your Professional Information
      </Typography>

      {props.errorMessage}

      <Grid container spacing={6} style={{ marginBottom: "1rem" }}>
        <Grid item sm={12} xs={12}>
          <FormGroup>
            <FormControlLabel
              // checked={props.checked}
              name="isCrew"
              control={<Switch defaultChecked onChange={props.handleChange} />}
              label="Crew Member Registration"
            />
          </FormGroup>
        </Grid>
      </Grid>

      <Grid container spacing={6} style={{ marginBottom: "1rem" }}>
        <Grid item sm={12} xs={12}>
          <TextField
            fullWidth
            name="email"
            id="email"
            placeholder="Fill in your email address"
            label="Email Address"
            variant="filled"
            sx={{ mr: 4 }}
            onChange={props.handleChange}
          />
        </Grid>
      </Grid>

      <Grid container spacing={6} style={{ marginBottom: "1rem" }}>
        <Grid item sm={12} xs={12}>
          <TextField
            fullWidth
            name="phone_number"
            id="phone_number"
            placeholder="Fill in your phone number"
            label="Phone Number"
            variant="filled"
            sx={{ mr: 4 }}
            onChange={props.handleChange}
          />
        </Grid>
      </Grid>

      <Grid container spacing={6} style={{ marginBottom: "1rem" }}>
        <Grid item sm={12} xs={12}>
          <TextField
            fullWidth
            name="postal_address"
            id="postal_address"
            placeholder="Fill in your postal address"
            label="Postal Address"
            variant="filled"
            sx={{ mr: 4 }}
            onChange={props.handleChange}
          />
        </Grid>
      </Grid>

      <FormControl fullWidth sx={{ mt: 4 }}>
        <InputLabel id="demo-simple-select-labelcountry_of_residence">
          Country of Residence
        </InputLabel>
        <Select
          labelId="demo-simple-select-label-country_of_residence"
          name="country_of_residence"
          id="country_of_residence"
          onChange={props.handleChange}
          variant="filled"
        >
          <MenuItem value={"AT"}>AUSTRIA</MenuItem>
          <MenuItem value={"BE"}>BELGIUM</MenuItem>
          <MenuItem value={"BG"}>BULGARIA</MenuItem>
          <MenuItem value={"HR"}>CROATIA</MenuItem>
          <MenuItem value={"CY"}>CYPRUS</MenuItem>
          <MenuItem value={"CZ"}>CZECHIA</MenuItem>
          <MenuItem value={"DK"}>DENMARK</MenuItem>
          <MenuItem value={"EE"}>ESTONIA</MenuItem>
          <MenuItem value={"FI"}>FINLAND</MenuItem>
          <MenuItem value={"FR"}>FRANCE</MenuItem>
          <MenuItem value={"DE"}>GERMANY</MenuItem>
          <MenuItem value={"GR"}>GREECE</MenuItem>
          <MenuItem value={"HU"}>HUNGARY</MenuItem>
          <MenuItem value={"IE"}>IRELAND</MenuItem>
          <MenuItem value={"IT"}>ITALY</MenuItem>
          <MenuItem value={"LV"}>LATVIA</MenuItem>
          <MenuItem value={"LU"}>LUXEMBOURG</MenuItem>
          <MenuItem value={"LT"}>LITHUANIA</MenuItem>
          <MenuItem value={"MT"}>MALTA</MenuItem>
          <MenuItem value={"NL"}>NETHERLANDS</MenuItem>
          <MenuItem value={"PL"}>POLAND</MenuItem>
          <MenuItem value={"PT"}>PORTUGAL</MenuItem>
          <MenuItem value={"RO"}>ROMANIA</MenuItem>
          <MenuItem value={"ES"}>SPAIN</MenuItem>
          <MenuItem value={"SK"}>SLOVAKIA</MenuItem>
          <MenuItem value={"SI"}>SLOVENIA</MenuItem>
          <MenuItem value={"SE"}>SWEDEN</MenuItem>
          <MenuItem value={"UK"}>UNITED KINGDOM</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mt: 4 }}>
        <InputLabel id="demo-simple-select-Preferred Language">
          Spoken Languages
        </InputLabel>
        <Select
          labelId="demo-simple-select-label-Preferred Language"
          name="preferred_language"
          id="preferred_language"
          onChange={props.handleChange}
          variant="filled"
        >
          <MenuItem value={"AT"}>AUSTRIA</MenuItem>
          <MenuItem value={"BE"}>BELGIUM</MenuItem>
          <MenuItem value={"BG"}>BULGARIA</MenuItem>
          <MenuItem value={"HR"}>CROATIA</MenuItem>
          <MenuItem value={"CY"}>CYPRUS</MenuItem>
          <MenuItem value={"CZ"}>CZECHIA</MenuItem>
          <MenuItem value={"DK"}>DENMARK</MenuItem>
          <MenuItem value={"EE"}>ESTONIA</MenuItem>
          <MenuItem value={"FI"}>FINLAND</MenuItem>
          <MenuItem value={"FR"}>FRANCE</MenuItem>
          <MenuItem value={"DE"}>GERMANY</MenuItem>
          <MenuItem value={"GR"}>GREECE</MenuItem>
          <MenuItem value={"HU"}>HUNGARY</MenuItem>
          <MenuItem value={"IE"}>IRELAND</MenuItem>
          <MenuItem value={"IT"}>ITALY</MenuItem>
          <MenuItem value={"LV"}>LATVIA</MenuItem>
          <MenuItem value={"LU"}>LUXEMBOURG</MenuItem>
          <MenuItem value={"LT"}>LITHUANIA</MenuItem>
          <MenuItem value={"MT"}>MALTA</MenuItem>
          <MenuItem value={"NL"}>NETHERLANDS</MenuItem>
          <MenuItem value={"PL"}>POLAND</MenuItem>
          <MenuItem value={"PT"}>PORTUGAL</MenuItem>
          <MenuItem value={"RO"}>ROMANIA</MenuItem>
          <MenuItem value={"ES"}>SPAIN</MenuItem>
          <MenuItem value={"SK"}>SLOVAKIA</MenuItem>
          <MenuItem value={"SI"}>SLOVENIA</MenuItem>
          <MenuItem value={"SE"}>SWEDEN</MenuItem>
          <MenuItem value={"UK"}>UNITED KINGDOM</MenuItem>
        </Select>
      </FormControl>


      <FormControl fullWidth sx={{ mt: 4 }}>
        <InputLabel id="demo-simple-select-Preferred Language">
          Primary Role
        </InputLabel>
        <Select
          labelId="demo-simple-select-label-Preferred Language"
          name="role"
          id="role"
          onChange={props.handleChange}
          variant="filled"
        >
          <MenuItem value={"captain"}>Captain</MenuItem>
          <MenuItem value={"day_work_officers"}>Day work Officer</MenuItem>
          <MenuItem value={"watch_keepers"}>Watch Keeper</MenuItem>
          <MenuItem value={"seamen"}>Seamen</MenuItem>
          <MenuItem value={"security_staff"}>Security Staff</MenuItem>
          <MenuItem value={"chief_engineer"}>Chief Engineer</MenuItem>
          <MenuItem value={"electrical_engineer"}>Electrical Engineer</MenuItem>
          <MenuItem value={"officer"}>Officer</MenuItem>
          <MenuItem value={"technical_crew"}>Technical Crew</MenuItem>
          <MenuItem value={"cadet"}>Cadet</MenuItem>
          <MenuItem value={"hotel_officer"}>Hotel Officer</MenuItem>
          <MenuItem value={"waiter"}>Waiter</MenuItem>
          <MenuItem value={"bar_staff"}>Bar Staff</MenuItem>
          <MenuItem value={"chef"}>Chef</MenuItem>
          <MenuItem value={"staff"}>Staff</MenuItem>
          <MenuItem value={"back_of_house"}>Back of House</MenuItem>
          <MenuItem value={"cabin_stweard"}>Cabin Steward</MenuItem>
          <MenuItem value={"entertainers"}>Entertainers</MenuItem>
          <MenuItem value={"shop_staff"}>Shop Staff</MenuItem>
          <MenuItem value={"beautician"}>Beautician</MenuItem>
          <MenuItem value={"casino_staff"}>Casion Staff</MenuItem>
        
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mt: 4 }}>
        <InputLabel id="demo-simple-select-Preferred Language">
          Emergency Role
        </InputLabel>
        <Select
          labelId="demo-simple-select-label-Preferred Language"
          name="emergency_duty"
          id="emergency_duty"
          onChange={props.handleChange}
          variant="filled"
        >
          <MenuItem value={"command_team"}>Command Team</MenuItem>
          <MenuItem value={"first_response_unit"}>First Response Unit</MenuItem>
          <MenuItem value={"boat_preparation_unit"}>Boat Preparation Unit</MenuItem>
          <MenuItem value={"passenger_mustering_unit"}>Passenger Mustering Unit</MenuItem>
          <MenuItem value={"firefighting_unit"}>Firefighting Unit</MenuItem>
          <MenuItem value={"damage_control_unit"}>Damage Control Unit</MenuItem>
          <MenuItem value={"first_aid_unit"}>First Aid Unit</MenuItem>
          <MenuItem value={"medical_unit"}>Medical Unit</MenuItem>
          <MenuItem value={"passenger_assistance_units"}>Passenger Assistance Unit</MenuItem>
          <MenuItem value={"cabin_searching_unit"}>Cabin Search Unit</MenuItem>
        </Select>
      </FormControl>

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

        <Button
          variant="contained"
          size="large"
          type="submit"
          disabled={!props.isNextEnabled}
          onClick={props.handleClick}
        >
          Continue
        </Button>
      </Box>
    </LayoutNew>
  );
}
