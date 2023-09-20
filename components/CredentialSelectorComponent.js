import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "styles/jss/nextjs-material-kit/components/formStyle.js";
import stylesCustom from "../styles/jss/palaemon.module.js";
// List
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";

const CredentialSelectorComponent = (props) => {
  const tableStyles = { ...styles, ...stylesCustom };
  // const useStyles = makeStyles(tableStyles);

  let optionalCredentialsList = props.optionalCredentials.map(
    (credentialDef, index) => {
      return (
        <ListItem disablePadding key={credentialDef.name}>
          <ListItemButton
            onClick={(event) => {
              window.location.href = props.baseUrl
                ? `/${props.baseUrl}/issue_card?sessionId=${props.sessionId}&type=${credentialDef.type}`
                : `/issue_card?sessionId=${props.sessionId}&type=${credentialDef.type}`;
            }}
          >
            <ListItemText primary={`${1 + index}.Ticket for: ${credentialDef.name}`} />
          </ListItemButton>
        </ListItem>
      );
    }
  );

  let toRender =
    props.optionalCredentials && props.optionalCredentials.length > 0 ? (
      <>
        <Typography sx={{ mt: 6, mb: 4 }}>
          Select one of the available Tickets to Issue:
        </Typography>
        <Box fontWeight="fontWeightBold" display="inline">
          <List>{optionalCredentialsList}</List>
        </Box>
      </>
    ) : (
      <>
        <Typography sx={{ mt: 6, mb: 4 }}>
          Based on the authentication details you provided, you are not entitled
          to issue any Ticket Credential.
        </Typography>
        <Typography sx={{ mt: 6, mb: 4 }}>
          Please ensure you have registered to an ERUA workshop and you have
          been approved before trying again.
        </Typography>
      </>
    );

  return toRender;
};
export default CredentialSelectorComponent;
//export default ProceedIssuePrompt;
