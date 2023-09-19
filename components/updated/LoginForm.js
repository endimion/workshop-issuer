import { useState } from "react";
import React from "react";
import {
  Button,
  TextField,
  Grid,
  Paper,
  AppBar,
  Typography,
  Toolbar,
   
} from "@material-ui/core";
import Link from "next/link";

export default function LoginForm({ value }) {
  const paperStyle = {
    padding: 20,
    // height: "70vh",
    width: "70%",
    margin: "20px auto",
  };

  const innerStyle = {
    padding: 20,
    // height: "70vh",
    width: "60%",
    margin: "20px auto",
  };

  const btnstyle = { margin: "8px 0" };
  const eruaBtnStyle = { margin: "8px 0", backgroundColor: "#00ff9a" };
  const othersBtnStyle = { margin: "8px 0", backgroundColor: "#525562" };
  const top1EM = { marginTop: "1em" };
  return (
    <Grid style={top1EM}>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <h2>Sign In to issue your ticket</h2>
        </Grid>

        <Grid align="center" style={innerStyle}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={eruaBtnStyle}
            fullWidth
          >
            <Link href="login">
              <span style={{ color: "black" }}>1. ERUA Members: ERUA-iD</span>
            </Link>
          </Button>

          {/* <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            <Link href="login">
              <span style={{ color: "white" }}>
                {" "}
                2. Greek Citizens: Gov.gr Wallet
              </span>
            </Link>
          </Button> */}

          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            <Link href="email-verification">
              <span style={{ color: "white" }}>
                {" "}
                3. Others: email verification
              </span>
            </Link>
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
}
