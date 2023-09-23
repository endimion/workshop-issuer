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
import ListItemIcon from "@mui/material/ListItemIcon";

const CredentialSelectorComponent = (props) => {
  const tableStyles = { ...styles, ...stylesCustom };
  // const useStyles = makeStyles(tableStyles);
    let ticketUrl = props.basePath ? `/${props.basePath}/profile.svg` : process.env.BASE_PATH
        ? `/${process.env.BASE_PATH}/ticket-solid.svg`: "/ticket-solid.svg";
  let optionalCredentialsList = props.optionalCredentials.map(
    (credentialDef, index) => {
      return (
        <ListItem disablePadding key={credentialDef.name} className="credential" >
          <ListItemButton
              className="credential-item"
            onClick={(event) => {
              //TODO ensure basePath is fetched here
              window.location.href = props.baseUrl
                ? `/${props.baseUrl}/issue_card?sessionId=${props.sessionId}&type=${credentialDef.type}`
                : `/issue_card?sessionId=${props.sessionId}&type=${credentialDef.type}`;
            }}
          >
              
              <ListItemIcon> <div className='credential-icon'><img src={ticketUrl}/></div> </ListItemIcon>
              <ListItemText> <span className='credential-item-text'>{`Ticket for: ${credentialDef.name}`}</span></ListItemText>
          </ListItemButton>
        </ListItem>
      );
    }
  );

  let toRender =
    props.optionalCredentials && props.optionalCredentials.length > 0 ? (
      <div className="content-wrapper">
        <h2 className="">
          Select one of the available Tickets to Issue:
        </h2>
          <div className="inner-content">
              <Box fontWeight="fontWeightBold" display="inline">
                  <List>{optionalCredentialsList}</List>
              </Box>
          </div>
      </div>
    ) : (
      <div className="content-wrapper">
          <div style={{textAlign:'left'}}>
              <h2> No Ticket Credential</h2>
              <Typography sx={{ mt: 6, mb: 2 }}>
                  Based on the authentication details you provided, you are not entitled
                  to issue any Ticket Credential.
              </Typography>
              <Typography sx={{ mt: 2, mb: 4 }}>
                  Please ensure you have registered to an ERUA workshop and you have
                  been approved before trying again.
              </Typography>
          </div>

      </div>
    );

  return toRender;
};
export default CredentialSelectorComponent;
//export default ProceedIssuePrompt;
