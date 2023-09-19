import { v4 as uuidv4 } from "uuid";
import { getSessionData, setOrUpdateSessionData } from "../services/redis";
const constants = require("../utils/consts_backend");
import axios from "axios";

const landingPage = async (app, req, res) => {
  req.basePath = constants.BASE_PATH;
  console.log("the base path is " + constants.BASE_PATH)
  return app.render(req, res, "/", req.query);
};

const verifyUserDetailsPage = async (app, req, res, serverEndpoint) => {
  let {
    family_name,
    given_name,
    eduPersonUniqueId,
    email,
    schacHomeOrganization,
    eduPersonAffiliation,
  } = req.session.passport.user.profile;
  if (family_name) req.sessionId = uuidv4();

  let userDetails = {
    Name: given_name.toUpperCase(),
    Surname: family_name.toUpperCase(),
    email: email,
    eduPersonUniqueId: eduPersonUniqueId,
    schacHomeOrganization: schacHomeOrganization,
    eduPersonAffiliation: eduPersonAffiliation,
  };

  setOrUpdateSessionData(req.sessionId, "userDetails", userDetails);

  req.endpoint = serverEndpoint;
  req.userDetails = userDetails;
  req.basePath = constants.BASE_PATH;
  // console.log(req.basePath)

  return app.render(req, res, "/verify-user", req.query);
};

const verifyEmailPage = async (app, req, res, serverEndpoint) => {
  req.sessionId = uuidv4();
  req.endpoint = serverEndpoint;
  req.basePath = constants.BASE_PATH;
  // console.log(req)
  return app.render(req, res, "/email-verification", req.query);
};

const selectCredentialtoIssue = async (app, req, res, serverEndpoint) => {
  console.log("view-controllers selectCredentialtoIssue");
  // console.log(req.session.passport);
  req.userData = req.session.passport
    ? {
        name: req.session.passport.user.profile.given_name,
        surname: req.session.passport.user.profile.family_name,
        email: req.session.passport.user.profile.email,
      }
    : JSON.parse(await getSessionData(req.query.sessionId, "userDetails"));
  req.sessionId = req.query.sessionId;
  req.endpoint = serverEndpoint;
  req.basePath = constants.BASE_PATH;

  // console.log("view-controllers:: selectCredentialtoIssue");
  // console.log(req.userData);
  // console.log(req.sessionId);
  // console.log(req.endpoint);
  // console.log(req.basePath);

  if (req.userData && req.userData.workshops) {
    req.optionalCredentials = req.userData.workshops.map((ws) => {
      return { type: "workshop-ticket-" + ws, name: ws };
    });
    return app.render(req, res, "/select_credential", req.query);
  } else {
    let options = {
      method: "POST",
      url: constants.CHECK_USER_WORKSHOPS,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        first_name: req.userData.name,
        last_name: req.userData.surname,
        email: req.userData.email,
      },
    };
    axios
      .request(options)
      .then(async (response) => {
        /*
[{
   id:"",
   first_name:"",
   last_name:"",
   application_status:"PENDING"
   workshop: [{
    id:"",
    title:"",
    slug:"",
    landing_page:""
   }]
}]


*/
        //TODO unmock this
        response = [
          {
            id: "",
            first_name: "Nikos",
            last_name: "Triantafyllou",
            application_status: "OK",
            workshop: {
              id: "",
              title: "ANIMA SYROS",
              slug: "",
              landing_page: "",
            },
          },
        ];

        let jsonToSend = { name: "", surname: "" };
        response.forEach((element) => {
          if (element.application_status != "PENDING") {
            if (jsonToSend.name === "") jsonToSend.name = element.first_name;
            if (jsonToSend.surname === "")
              jsonToSend.surname = element.last_name;
            if (jsonToSend.workshops === undefined) {
              jsonToSend.workshops = [];
            }
            jsonToSend.workshops.push(element.workshop.title);
          }
        });
        // console.log("TTTTTTTTTTTTT")
        // console.log(jsonToSend);
        // console.log("TTTTTTTTTTTTT")
        if (jsonToSend.workshops) {
          req.optionalCredentials = jsonToSend.workshops.map((ws) => {
            return { type: "workshop-ticket-" + ws, name: ws };
          });
          console.log(req.optionalCredentials);
          return app.render(req, res, "/select_credential", req.query);
        }
      })
      .catch((err) => {
        console.log("No Credentials avaiable for user");
        return app.render(req, res, "/select_credential", req.query);
      });
  }
};

const issueServiceCard = async (app, req, res, serverEndpoint) => {
  req.userData = req.session.passport
    ? req.session.passport.user
    : JSON.parse(await getSessionData(req.query.sessionId, "userDetails"));
  req.sessionId = req.query.sessionId;
  req.credentialToIssueType = req.query.type
  req.endpoint = serverEndpoint;
  req.basePath = constants.BASE_PATH;
  console.log("view-controllers:: issueSserviceCard");
  console.log("userData");
  console.log(req.userData);
  // console.log("credType")
  // console.log(req.credentialToIssueType)

  // let claims = defaultClaims;
  let redirectURI = constants.CONNECTION_RESPONSE_URI
    ? constants.CONNECTION_RESPONSE_URI
    : "http://localhost:5030/connection_response";

  return app.render(req, res, "/issue_card", req.query);
};

const encode = function (unencoded) {
  return new Buffer(unencoded || "").toString("base64");
};
const urlEncode = function (unencoded) {
  const encoded = encode(unencoded);
  return encoded.replace(/\+/g, "-").replace(/\//, "_").replace(/=+$/, "");
};

export {
  selectCredentialtoIssue,
  landingPage,
  verifyUserDetailsPage,
  // ticketInfo,
  issueServiceCard,
  verifyEmailPage,
};
