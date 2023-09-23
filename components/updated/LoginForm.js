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



  const btnstyle = { margin: "8px 0" };
  const eruaBtnStyle = { margin: "2px 0", backgroundColor: "#00ff9a" };
  const othersBtnStyle = { margin: "2px 0", backgroundColor: "#525562" };
  return (
    <Grid>
      <Paper className="content-wrapper login-wrapper" >
        <Grid align="center">
          <h2>Sign In to issue your ticket</h2>
        </Grid>
        <Grid align="center" className="inner-content ">
          <div class="login-content">
            <Button
                type="submit"
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
                2. Others: email verification
              </span>
              </Link>
            </Button>
          </div>

        </Grid>
      </Paper>
    </Grid>
  );
}
