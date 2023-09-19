import * as React from "react";
import LayoutNew from "./LayoutNew";
import Head from "next/head";
//AppBar
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// List
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
//
import LoginForm from "./LoginForm";

export default function IndexForm(props) {
  let longText = "";
  const paperStyle = {
    padding: 20,
    // height: "70vh",
    width: "50%",
    margin: "20px auto",
  };

  const top3EM = { marginTop: "3em" };

  return (
    <LayoutNew home activeStep={0} basePath={props.basePath}>
      <Head >
        <title>ERUA Workshop Ticket Issuer</title>
      </Head>

      <Typography variant="h5" sx={{ mt: 6, mb: 4 }} style={top3EM}>
        
      </Typography>

      {/* <Typography sx={{ mt: 6, mb: 4 }} style={top1EM}>
        To generate your Ticket for an ERUA Workshop, first verify you identity
        by authenticating with one of the available options:
      </Typography> */}
      <LoginForm basePath={props.basePath}/>
    </LayoutNew>
  );
}
