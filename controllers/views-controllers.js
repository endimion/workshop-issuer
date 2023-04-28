// import { getSealSessionData, validateToken } from "../services/sealService";
import { endpoints } from "../config/seal_endpoints";
import { parseSealAttributeSet } from "../utils/dataStoreHelper";
import { defaultClaims } from "../config/defaultOidcClaims";
import { updatePassportConfig } from "../config/serverConfig";
import { v4 as uuidv4 } from "uuid";
import { getSessionData, setOrUpdateSessionData } from "../services/redis";
const constants = require("../utils/consts")

const landingPage = async (app, req, res) => {
  return app.render(req, res, "/", req.query);
};

const verifyUserDetailsPage = async (app, req, res, serverEndpoint) => {
  let {
    family_name,
    given_name,
    eduPersonUniqueId,
    email,
    schacHomeOrganization,
    eduPersonAffiliation
  } = req.session.passport.user.profile;
  if (family_name) req.sessionId = uuidv4();

  let userDetails = {
    Name: given_name.toUpperCase(),
    Surname: family_name.toUpperCase(),
    email: email,
    eduPersonUniqueId: eduPersonUniqueId,
    schacHomeOrganization: schacHomeOrganization,
    eduPersonAffiliation: eduPersonAffiliation
  };

  setOrUpdateSessionData(req.sessionId, "userDetails", userDetails);

  req.endpoint = serverEndpoint;
  req.userDetails = userDetails;
  req.basePath = constants.BASE_PATH
  // console.log(req.basePath)
 
  return app.render(req, res, "/verify-user", req.query);
};

// const ticketInfo = async (app, req, res) => {
//   console.log(req.userDetails);
//   return app.render(req, res, "/ticketInfo", req.query);
// };

const issueServiceCard = async (app, req, res, serverEndpoint) => {
  req.userData = req.session.passport.user;
  req.sessionId = req.query.sessionId;
  req.endpoint = serverEndpoint;
  req.basePath = constants.BASE_PATH
  // console.log("view-controllers:: issueSserviceCard")
  // console.log(serverEndpoint)

  // let claims = defaultClaims;
  let redirectURI = constants.CONNECTION_RESPONSE_URI
    ? constants.CONNECTION_RESPONSE_URI
    : "http://localhost:5030/connection_response";

  return app.render(req, res, "/issue_card", req.query);
};

// const startLogin = async (app, req, res, serverPassport, oidcClient) => {
//   // let lei = req.body.lei;
//   let companyName = req.body.companyName;
//   let legalPersonIdentifier = req.body.legal_person_identifier;
//   let email = req.body.email;
//   let country = req.body.country;

//   let claims = defaultClaims;
//   let sessionId = req.cookies.sessionId;

//   await setOrUpdateSessionData(
//     sessionId,
//     "legalPersonIdentifier",
//     legalPersonIdentifier
//   );
//   await setOrUpdateSessionData(sessionId, "companyName", companyName);
//   await setOrUpdateSessionData(sessionId, "email", email);
//   await setOrUpdateSessionData(sessionId, "companyCountry", country);

//   claims.userinfo.verified_claims.verification.evidence[0].registry.country.value =
//     country;
//   // console.log("!!!!!!!!!!! the claims that will be added!!!!!!!")
//   // console.log(claims.userinfo.verified_claims.verification.evidence[0])
//   if (companyName || legalPersonIdentifier) {
//     const headerRaw = {
//       alg: "none",
//       typ: "JWT",
//     };
//     const payloadRaw = {
//       sub: "mock",
//       aud: "mock",
//       iss: "http://localhost",
//       client_id: oidcClient.client_id,
//       redirect_uri: oidcClient.redirect_uris[0],
//       claims: claims,
//     };

//     if (companyName) {
//       payloadRaw.legal_name = companyName;
//     }
//     if (legalPersonIdentifier) {
//       payloadRaw.legal_person_identifier = legalPersonIdentifier;
//     }

//     // console.log(oidcClient)
//     // console.log(oidcClient.client_id)
//     // console.log(oidcClient.redirect_uris)

//     const header = JSON.stringify(headerRaw);
//     const payload = JSON.stringify(payloadRaw);
//     let jwt = `${urlEncode(header)}.${urlEncode(payload)}.`;
//     console.log(`viewcontrollers.js::startLogin:: will make request with jwt`);
//     updatePassportConfig(serverPassport, claims, oidcClient, jwt);
//   } else {
//     updatePassportConfig(serverPassport, claims, oidcClient);
//   }

//   // updatePassportConfig(serverPassport, claims, oidcClient);
//   res.redirect(307, "/login");
// };

 
 
 

 

const encode = function (unencoded) {
  return new Buffer(unencoded || "").toString("base64");
};
const urlEncode = function (unencoded) {
  const encoded = encode(unencoded);
  return encoded.replace(/\+/g, "-").replace(/\//, "_").replace(/=+$/, "");
};

export {
  // startLogin,
  landingPage,
  verifyUserDetailsPage,
  // ticketInfo,
  issueServiceCard,
};
