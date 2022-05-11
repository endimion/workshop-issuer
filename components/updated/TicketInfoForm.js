import * as React from "react";
import LayoutNew from "./LayoutNew";
import Head from "next/head";
//AppBar
import Switch from "@mui/material/Switch";
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
import Checkbox from "@mui/material/Checkbox";

export default function TicketInfoForm(props) {
  // let nextButton =

  return (
    <LayoutNew home activeStep={2}>
      <Head>
        <title>Palaemon</title>
      </Head>

      <Typography variant="h5" sx={{ mt: 6, mb: 4 }}>
        Provide your additonal Information
      </Typography>

      {props.errorMessage}

      <Grid container spacing={6} style={{ marginBottom: "1rem" }}>
        <Grid item sm={12} xs={12}>
          <FormGroup>
            <FormControlLabel name="isCrew" control={<Switch onChange={props.handleChange}/>} label="Crew member registration" />
          </FormGroup>
        </Grid>
      </Grid>

      <Grid container spacing={6} style={{ marginBottom: "1rem" }}>
        <Grid item sm={12} xs={12}>
          <TextField
            fullWidth
            name="ticketNumber"
            id="ticketNumber"
            placeholder="Fill in your Ticket Number"
            label="Ticket Number"
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

      <Grid container spacing={6}>
        <Grid item sm={12} xs={12}>
          <TextField
            fullWidth
            name="emergency_contact_details"
            id="emergency_contact_details"
            placeholder="Fill in your emergency contact's phone number"
            label="Emergency Contact"
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
        <InputLabel id="demo-simple-select-label">Medical Condition</InputLabel>
        <Select
          value={props.medical_condnitions}
          labelId="demo-simple-select-label-medical_condnitions"
          name="medical_condnitions"
          id="medical_condnitions"
          // placeholder="Company Country of Registration"
          label="Medical Condition"
          onChange={props.handleChange}
          variant="filled"
        >
          <MenuItem value={"none"}>None</MenuItem>
          <MenuItem value={"equip_required"}>
            Medical Equipemnt Required during emergencies
          </MenuItem>
          <MenuItem value={"stretcher"}>
            Stretcher required during emergencies
          </MenuItem>
          <MenuItem value={"heavy_doses"}>
            Currently receiving heavy medication affecting cognitive
            capabilities
          </MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mt: 4 }}>
        <InputLabel id="demo-simple-select-label">Mobility Status</InputLabel>
        <Select
          value={props.mobility_issues}
          labelId="demo-simple-select-label-mobility_issues"
          name="mobility_issues"
          id="mobility_issues"
          // placeholder="Company Country of Registration"
          label="Medical Condition"
          onChange={props.handleChange}
          variant="filled"
        >
          <MenuItem value={"none"}>None</MenuItem>
          <MenuItem value={"assisted_gait"}>
            Mobility via assisted gait
          </MenuItem>
          <MenuItem value={"walking_disability"}>Walking disability</MenuItem>
          <MenuItem value={"severe_walking_disability"}>
            Severe walking disability
          </MenuItem>
          <MenuItem value={"unable_to_walk"}>Unable to walk</MenuItem>
          <MenuItem value={"visually_impaired"}>Visual impairments</MenuItem>
          <MenuItem value={"hearing_impaired"}>
            Hearing or speech impairments
          </MenuItem>
          <MenuItem value={"hearing_impaired"}>
            Cognitive or developmental impairments
          </MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mt: 4 }}>
        <InputLabel id="demo-simple-select-label-pregnency_data">
          Pregnency Details
        </InputLabel>
        <Select
          value={props.pregnency_data}
          labelId="demo-simple-select-label"
          name="pregnency_data"
          id="pregnency_data"
          // placeholder="Company Country of Registration"
          label="Medical Condition"
          onChange={props.handleChange}
          variant="filled"
        >
          <MenuItem value={"none"}>None</MenuItem>
          <MenuItem value={"complicated"}>
            Pregnancy with any form of increased risk of miscarriage
          </MenuItem>
          <MenuItem value={"normal"}>
            Pregnancy with no risk of miscarrige
          </MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mt: 4 }}>
        <InputLabel id="demo-simple-select-Preferred Language">
          Preferred Language
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

      {/* <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              name="crew"
              onChange={(e) => {
                props.handleChange({
                  target: {
                    name: e.target.name,
                    value: e.target.checked,
                  },
                });
              }}
            />
          }
          label="Crew Member"
        />
      </FormGroup> */}

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
