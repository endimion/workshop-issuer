import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInputNew from "components/CustomInput/CustomInputNew.js";

import styles from "styles/jss/nextjs-material-kit/components/formStyle.js";

const useStyles = makeStyles(styles);

export default function TicketInfoForm(props) {
  const classes = useStyles();
  const { ...rest } = props;
  // let nextButton =

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <CustomInputNew
          labelText="Ticket Number"
          name="ticketNumber"
          id="ticketNumber"
          formControlProps={{
            fullWidth: true,
          }}
          handleChange={props.handleChange}
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <CustomInputNew
          labelText="Medical Conditions"
          name="medical_condnitions"
          id="medical_condnitions"
          formControlProps={{
            fullWidth: true,
          }}
          handleChange={props.handleChange}
        />
      </GridItem>

      <div style={{ paddingTop: "32px", marginBottom: "32px" }}>
        <Button
          disabled={!props.isNextEnabled}
          color="primary"
          size="lg"
          type="submit"
          onClick={props.handleClick}
        >
          Generate "Service Card"
        </Button>
      </div>
    </GridContainer>
  );
}
