import Head from "next/head";
import LayoutNew from "../components/updated/LayoutNew";
import IndexForm from "../components/updated/IndexForm"
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import MessageBox from "../components/messageBox";
import ProductSection from "../pages-sections/LandingPage-Sections/ProductSection";
import React from "react";

import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInputNew from "components/CustomInput/CustomInputNew.js";

import styles from "styles/jss/nextjs-material-kit/components/formStyle.js";
import stylesCustom from "../styles/jss/palaemon.module.js";

const constants = require("../utils/consts")

export default function Home() {
  return (
    <IndexForm />
  )
}
