 
import GridItem from "./Grid/GridItem";
import IssueVCButton from "./IssueVCButton";

 
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
//Stepper
import Grid from "@mui/material/Grid";

import { makeStyles } from "@material-ui/core/styles";
import styles from "styles/jss/nextjs-material-kit/components/formStyle.js";
import stylesCustom from "../styles/jss/palaemon.module.js";

const ProceedIssuePrompt = (props) => {
  const tableStyles = { ...styles, ...stylesCustom };
  const useStyles = makeStyles(tableStyles);

  // Jolocom Wallet connected succesfully

  return (
    <Grid
      container
      spacing={4}
      sx={{ mt: 3 }}
    >
      <Grid item md={9} sm={12}  >
       
          <Box display="flex">
            <Box m="auto">
              <Typography
                variant="h6"
                sx={{ mt: 6, mb: 4, textAlign: "center" }}
              >
                Wallet connection success!
              </Typography>

             
               
            </Box>
          </Box>

          <GridItem
            xs={12}
            sm={12}
            md={12}
          >
            <Box display="flex">
              <Box m="auto">
                <IssueVCButton
                  hasRequiredAttributes={props.hasRequiredAttributes}
                  baseUrl={props.baseUrl}
                  uuid={props.uuid}
                  vcType={props.vcType}
                />
              </Box>
            </Box>
          </GridItem>
        
      </Grid>
    </Grid>
  );
};

export default ProceedIssuePrompt;
