// import * as React from "react";
// import LayoutNew from "./LayoutNew";
// import Head from "next/head";
// //AppBar
// import Box from "@mui/material/Box";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import MenuItem from "@mui/material/MenuItem";
// //Stepper
// import Button from "@mui/material/Button";
// import Grid from "@mui/material/Grid";
// //Forms
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import TextField from "@mui/material/TextField";
// import Select from "@mui/material/Select";

// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Snackbar from '@mui/material/Snackbar';
// import CloseIcon from '@mui/icons-material/Close';

// export default function TicketInfoForm(props) {

  
//   const action = (
//     <React.Fragment>
//       <Button color="secondary" size="small" >
//         UNDO
//       </Button>
//       <IconButton
//         size="small"
//         aria-label="close"
//         color="inherit"
        
//       >
//         <CloseIcon fontSize="small" />
//       </IconButton>
//     </React.Fragment>
//   );

//   return (
//     <LayoutNew home activeStep={2}>
//       <Head>
//         <title>Palaemon</title>
//       </Head>

//       <Typography variant="h5" sx={{ mt: 6, mb: 4 }}>
//         Provide your additonal Information
//       </Typography>

//       {props.errorMessage}

//       {/* <Grid container spacing={6} style={{ marginBottom: "1rem" }}>
//         <Grid item sm={12} xs={12}>
//           <FormGroup>
//             <FormControlLabel name="isCrew" control={<Switch onChange={props.handleChange}/>} label="Crew member registration" />
//           </FormGroup>
//         </Grid>
//       </Grid> */}

//       <Snackbar
//         open={props.open}
//         autoHideDuration={6000}
//         // onClose={handleClose}
//         message="Note archived"
//         action={action}
//       />

//       <Grid container spacing={6} style={{ marginBottom: "1rem" }}>
//         <Grid item sm={12} xs={12}>
//           <TextField
//             required
//             fullWidth
//             name="ticketNumber"
//             id="ticketNumber"
//             placeholder="Fill in your Ticket Number"
//             label="Ticket Number"
//             variant="filled"
//             value={props.userDetails["Ticket Number"]}
//             sx={{ mr: 4 }}
//             onChange={props.handleChange}
//             InputProps={{
//               readOnly: true,
//             }}
//           />
//         </Grid>
//       </Grid>

//       <Grid container spacing={6} style={{ marginBottom: "1rem" }}>
//         <Grid item sm={12} xs={12}>
//           <TextField
//             required
//             fullWidth
//             name="email"
//             id="email"
//             placeholder="Fill in your email address"
//             label="Email Address"
//             variant="filled"
//             sx={{ mr: 4 }}
//             value={props.userDetails["email"]}
//             onChange={props.handleChange}
//           />
//         </Grid>
//       </Grid>

//       <Grid container spacing={6} style={{ marginBottom: "1rem" }}>
//         <Grid item sm={12} xs={12}>
//           <TextField
//             required
//             fullWidth
//             name="phone_number"
//             id="phone_number"
//             placeholder="Fill in your phone number"
//             label="Phone Number"
//             variant="filled"
//             sx={{ mr: 4 }}
//             value={props.userDetails["msisdn"]}
//             onChange={props.handleChange}
//             InputProps={{
//               readOnly: true,
//             }}
//           />
//         </Grid>
//       </Grid>

//       <Grid container spacing={6} style={{ marginBottom: "1rem" }}>
//         <Grid item sm={12} xs={12}>
//           <TextField
//             required
//             fullWidth
//             name="bracelet"
//             id="bracelet"
//             placeholder="Fill in your Smart Bracelet ID"
//             label="Smart Bracelet ID"
//             variant="filled"
//             sx={{ mr: 4 }}
//             value={props.userDetails["bracelet"]}
//             onChange={props.handleChange}
//             InputProps={{
//               readOnly: true,
//             }}
//           />
//         </Grid>
//       </Grid>

//       {/* <Grid container spacing={6} style={{ marginBottom: "1rem" }}>
//         <Grid item sm={12} xs={12}>
//           <TextField
//             fullWidth
//             name="postal_address"
//             id="postal_address"
//             placeholder="Fill in your postal address"
//             label="Postal Address"
//             variant="filled"
//             sx={{ mr: 4 }}
//             onChange={props.handleChange}
//           />
//         </Grid>
//       </Grid> */}

//       <Grid container spacing={6}>
//         <Grid item sm={12} xs={12}>
//           <TextField
//             required
//             fullWidth
//             name="emergency_contact_details"
//             id="emergency_contact_details"
//             placeholder="Fill in your emergency contact's phone number"
//             label="Emergency Contact Number"
//             variant="filled"
//             sx={{ mr: 4 }}
//             onChange={props.handleChange}
//           />
//         </Grid>
//       </Grid>
//       <FormControl fullWidth sx={{ mt: 4 }}>
//         <InputLabel id="demo-simple-select-labelcountry_of_residence">
//           Country of Residence
//         </InputLabel>
//         <Select
//           labelId="demo-simple-select-label-country_of_residence"
//           required
//           name="country_of_residence"
//           id="country_of_residence"
//           onChange={props.handleChange}
//           variant="filled"
//         >
//           <MenuItem value={"AT"}>AUSTRIA</MenuItem>

//           <MenuItem value={"BE"}>BELGIUM</MenuItem>
//           <MenuItem value={"BG"}>BULGARIA</MenuItem>
//           <MenuItem value={"HR"}>CROATIA</MenuItem>
//           <MenuItem value={"CY"}>CYPRUS</MenuItem>

//           <MenuItem value={"CZ"}>CZECHIA</MenuItem>

//           <MenuItem value={"DK"}>DENMARK</MenuItem>
//           <MenuItem value={"EE"}>ESTONIA</MenuItem>
//           <MenuItem value={"FI"}>FINLAND</MenuItem>

//           <MenuItem value={"FR"}>FRANCE</MenuItem>

//           <MenuItem value={"DE"}>GERMANY</MenuItem>
//           <MenuItem value={"GR"}>GREECE</MenuItem>
//           <MenuItem value={"HU"}>HUNGARY</MenuItem>

//           <MenuItem value={"IE"}>IRELAND</MenuItem>
//           <MenuItem value={"IT"}>ITALY</MenuItem>

//           <MenuItem value={"LV"}>LATVIA</MenuItem>
//           <MenuItem value={"LU"}>LUXEMBOURG</MenuItem>
//           <MenuItem value={"LT"}>LITHUANIA</MenuItem>
//           <MenuItem value={"MT"}>MALTA</MenuItem>
//           <MenuItem value={"NL"}>NETHERLANDS</MenuItem>

//           <MenuItem value={"PL"}>POLAND</MenuItem>
//           <MenuItem value={"PT"}>PORTUGAL</MenuItem>
//           <MenuItem value={"RO"}>ROMANIA</MenuItem>

//           <MenuItem value={"ES"}>SPAIN</MenuItem>
//           <MenuItem value={"SK"}>SLOVAKIA</MenuItem>

//           <MenuItem value={"SI"}>SLOVENIA</MenuItem>
//           <MenuItem value={"SE"}>SWEDEN</MenuItem>
//           <MenuItem value={"UK"}>UNITED KINGDOM</MenuItem>
//         </Select>
//       </FormControl>

//       <FormControl fullWidth sx={{ mt: 4 }}>
//         <InputLabel id="demo-simple-select-label">Medical Condition</InputLabel>
//         <Select
//           labelId="demo-simple-select-label-medical_condnitions"
//           required
//           name="medical_condnitions"
//           id="medical_condnitions"
//           // placeholder="Company Country of Registration"
//           label="Medical Condition"
//           onChange={props.handleChange}
//           variant="filled"
//           value={props.userDetails["health_status"]}
//           disabled
//         >
//           <MenuItem value={"none"}>None</MenuItem>
//           <MenuItem value={""}>None</MenuItem>
//           <MenuItem value={'""'}>None</MenuItem>
//           {/* <MenuItem value={"equip_required"}>
//             Medical Equipemnt Required during emergencies
//           </MenuItem>
//           <MenuItem value={"stretcher"}>
//             Stretcher required during emergencies
//           </MenuItem>
//           <MenuItem value={"heavy_doses"}>
//             Currently receiving heavy medication affecting cognitive
//             capabilities
//           </MenuItem> */}
//         </Select>
//       </FormControl>

//       <FormControl fullWidth sx={{ mt: 4 }}>
//         <InputLabel id="demo-simple-select-label">Mobility Status</InputLabel>
//         <Select
//           // value={props.mobility_issues}
//           value={props.userDetails["mobility_status"]}
//           labelId="demo-simple-select-label-mobility_issues"
//           name="mobility_issues"
//           id="mobility_issues"
//           // placeholder="Company Country of Registration"
//           label="Mobility Issues"
//           onChange={props.handleChange}
//           variant="filled"
//           required
//           disabled
//         >
//           <MenuItem value={"none"}>None</MenuItem>
//           <MenuItem value={""}>-</MenuItem>
//           {/* <MenuItem value={"assisted_gait"}>
//             Mobility via assisted gait
//           </MenuItem> */}
//           <MenuItem value={"walking_disability"}>Walking disability</MenuItem>
//           <MenuItem value={"strecher"}>Strecher Required</MenuItem>
//           <MenuItem value={"none"}>None</MenuItem>
//           {/* <MenuItem value={"severe_walking_disability"}>
//             Severe walking disability
//           </MenuItem>
//           <MenuItem value={"unable_to_walk"}>Unable to walk</MenuItem>
//           <MenuItem value={"visually_impaired"}>Visual impairments</MenuItem>
//           <MenuItem value={"hearing_impaired"}>
//             Hearing or speech impairments
//           </MenuItem>
//           <MenuItem value={"hearing_impaired"}>
//             Cognitive or developmental impairments
//           </MenuItem> */}
//         </Select>
//       </FormControl>

//       <FormControl fullWidth sx={{ mt: 4 }}>
//         <InputLabel id="demo-simple-select-label-pregnency_data">
//           Pregnency Details
//         </InputLabel>
//         <Select
//           // value={props.pregnency_data}
//           value={"none"}
//           labelId="demo-simple-select-label"
//           name="pregnency_data"
//           id="pregnency_data"
//           // placeholder="Company Country of Registration"
//           label="Medical Condition"
//           onChange={props.handleChange}
//           variant="filled"
//           required
//           disabled
//         >
//           <MenuItem value={"none"}>None</MenuItem>
//           <MenuItem value={""}>-</MenuItem>
//           {/* <MenuItem value={"complicated"}>
//             Pregnancy with any form of increased risk of miscarriage
//           </MenuItem>
//           <MenuItem value={"normal"}>
//             Pregnancy with no risk of miscarrige
//           </MenuItem> */}
//         </Select>
//       </FormControl>

//       <FormControl fullWidth sx={{ mt: 4 }}>
//         <InputLabel id="demo-simple-select-Preferred Language">
//           Preferred Communication Language
//         </InputLabel>
//         <Select
//           labelId="demo-simple-select-label-Preferred Language"
//           name="preferred_language"
//           id="preferred_language"
//           onChange={props.handleChange}
//           variant="filled"
//           required
//         >
//           {/* <MenuItem value={"AT"}>AUSTRIA</MenuItem>

//           <MenuItem value={"BE"}>BELGIUM</MenuItem>
//           <MenuItem value={"BG"}>BULGARIA</MenuItem>
//           <MenuItem value={"HR"}>CROATIA</MenuItem>
//           <MenuItem value={"CY"}>CYPRUS</MenuItem>

//           <MenuItem value={"CZ"}>CZECHIA</MenuItem>

//           <MenuItem value={"DK"}>DENMARK</MenuItem>
//           <MenuItem value={"EE"}>ESTONIA</MenuItem>
//           <MenuItem value={"FI"}>FINLAND</MenuItem>

//           <MenuItem value={"FR"}>FRANCE</MenuItem>

//           <MenuItem value={"DE"}>GERMANY</MenuItem> */}
//           <MenuItem value={"GR"}>Greek</MenuItem>
//           {/* <MenuItem value={"HU"}>HUNGARY</MenuItem>

//           <MenuItem value={"IE"}>IRELAND</MenuItem>
//           <MenuItem value={"IT"}>ITALY</MenuItem>

//           <MenuItem value={"LV"}>LATVIA</MenuItem>
//           <MenuItem value={"LU"}>LUXEMBOURG</MenuItem>
//           <MenuItem value={"LT"}>LITHUANIA</MenuItem>
//           <MenuItem value={"MT"}>MALTA</MenuItem>
//           <MenuItem value={"NL"}>NETHERLANDS</MenuItem>

//           <MenuItem value={"PL"}>POLAND</MenuItem>
//           <MenuItem value={"PT"}>PORTUGAL</MenuItem>
//           <MenuItem value={"RO"}>ROMANIA</MenuItem>

//           <MenuItem value={"ES"}>SPAIN</MenuItem>
//           <MenuItem value={"SK"}>SLOVAKIA</MenuItem>

//           <MenuItem value={"SI"}>SLOVENIA</MenuItem>
//           <MenuItem value={"SE"}>SWEDEN</MenuItem> */}
//           <MenuItem value={"EN"}>English</MenuItem>
//         </Select>
//       </FormControl>

//       {/* <FormGroup>
//         <FormControlLabel
//           control={
//             <Checkbox
//               name="crew"
//               onChange={(e) => {
//                 props.handleChange({
//                   target: {
//                     name: e.target.name,
//                     value: e.target.checked,
//                   },
//                 });
//               }}
//             />
//           }
//           label="Crew Member"
//         />
//       </FormGroup> */}

//       <Box sx={{ display: "flex", flexDirection: "row", pt: 4 }}>
//         {/* <Button
//           color="inherit"
//           disabled={props.activeStep === 0}
//           onClick={props.handleBack}
//           sx={{ mr: 1 }}
//           size="large"
//         >
//           Back
//         </Button> */}

//         <Box sx={{ flex: "1 1 auto" }} />

//         <Button
//           variant="contained"
//           size="large"
//           type="submit"
//           disabled={!props.isNextEnabled}
//           onClick={props.handleClick}
//         >
//           Continue
//         </Button>
//       </Box>
//     </LayoutNew>
//   );
// }
