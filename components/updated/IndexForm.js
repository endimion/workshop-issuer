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

export default function IndexForm(props) {
  let longText = "";

  return (
    <LayoutNew home activeStep={0}>
      <Head>
        <title>ERUA ISSUER</title>
      </Head>

      <Typography variant="h5" sx={{ mt: 6, mb: 4 }}>
        ERUA Issuer Service
      </Typography>
      <Typography sx={{ mt: 6, mb: 4 }}>
        To generate your ERUA ID please authenticate using:
        <Box fontWeight="fontWeightBold" display="inline">
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="1. Your Home Instituion Credentials" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Typography>

      <Typography></Typography>
      <Box>
        <Button
          variant="contained"
          size="large"
          type="submit"
          // onClick={() => {
          //   console.log(constants.BASE_PATH? `/${constants.BASE_PATH}/login`:"login")
          //   window.location = props.basePath? `/${props.basePath}/login`:"login"//"/login";
          // }}
        >
          <Link href="login">
             <a>Access the service</a>
          </Link>
        </Button>
      </Box>
    </LayoutNew>
  );
}
