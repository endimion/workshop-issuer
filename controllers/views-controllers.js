// import { getSealSessionData, validateToken } from "../services/sealService";
import { endpoints } from "../config/seal_endpoints";
import { parseSealAttributeSet } from "../utils/dataStoreHelper";
import { defaultClaims } from "../config/defaultOidcClaims";
import { updatePassportConfig } from "../config/serverConfig";
import { v4 as uuidv4 } from "uuid";
import { getSessionData, setOrUpdateSessionData } from "../services/redis";

const landingPage = async (app, req, res) => {
  return app.render(req, res, "/", req.query);
};

const verifyUserDetailsPage = async (app, req, res, serverEndpoint) => {
  let {
    family_name,
    given_name,
    preferred_username,
    palaemon_age,
    palaemon_is_crew,
    palaemon_role,
    palaemon_gender,
    palaemon_ticket_number,
    palaemon_eid,
  } = req.session.passport.user.profile;
  if (family_name) req.sessionId = uuidv4();

  let userDetails = {
    Name: given_name.toUpperCase(),
    Surname: family_name.toUpperCase(),
    eID: palaemon_eid,
    Birthdate: palaemon_age,
    Gender: palaemon_gender,
    Role: palaemon_role,
  };

  setOrUpdateSessionData(req.sessionId, "userDetails", userDetails);

  req.endpoint = serverEndpoint;
  req.userDetails = userDetails;

  if (palaemon_is_crew === "true") {
    req.userDetails["Crew-Member"] = palaemon_is_crew;
  } else {
    req.userDetails["Ticket Number"] = palaemon_ticket_number;
  }

  return app.render(req, res, "/verify-user", req.query);
};

const ticketInfo = async (app, req, res) => {
  console.log(req.userDetails);
  return app.render(req, res, "/ticketInfo", req.query);
};

const issueServiceCard = async (app, req, res, serverEndpoint) => {
  req.userData = req.session.passport.user;
  req.sessionId = req.query.sessionId;
  req.endpoint = serverEndpoint;
  // console.log("view-controllers:: issueSserviceCard")
  // console.log(serverEndpoint)

  // let claims = defaultClaims;
  let redirectURI = process.env.CONNECTION_RESPONSE_URI
    ? process.env.CONNECTION_RESPONSE_URI
    : "http://localhost:5030/connection_response";

  return app.render(req, res, "/issue_card", req.query);
};

const startLogin = async (app, req, res, serverPassport, oidcClient) => {
  // let lei = req.body.lei;
  let companyName = req.body.companyName;
  let legalPersonIdentifier = req.body.legal_person_identifier;
  let email = req.body.email;
  let country = req.body.country;

  let claims = defaultClaims;
  let sessionId = req.cookies.sessionId;

  await setOrUpdateSessionData(
    sessionId,
    "legalPersonIdentifier",
    legalPersonIdentifier
  );
  await setOrUpdateSessionData(sessionId, "companyName", companyName);
  await setOrUpdateSessionData(sessionId, "email", email);
  await setOrUpdateSessionData(sessionId, "companyCountry", country);

  claims.userinfo.verified_claims.verification.evidence[0].registry.country.value =
    country;
  // console.log("!!!!!!!!!!! the claims that will be added!!!!!!!")
  // console.log(claims.userinfo.verified_claims.verification.evidence[0])
  if (companyName || legalPersonIdentifier) {
    const headerRaw = {
      alg: "none",
      typ: "JWT",
    };
    const payloadRaw = {
      sub: "mock",
      aud: "mock",
      iss: "http://localhost",
      client_id: oidcClient.client_id,
      redirect_uri: oidcClient.redirect_uris[0],
      claims: claims,
    };

    if (companyName) {
      payloadRaw.legal_name = companyName;
    }
    if (legalPersonIdentifier) {
      payloadRaw.legal_person_identifier = legalPersonIdentifier;
    }

    // console.log(oidcClient)
    // console.log(oidcClient.client_id)
    // console.log(oidcClient.redirect_uris)

    const header = JSON.stringify(headerRaw);
    const payload = JSON.stringify(payloadRaw);
    let jwt = `${urlEncode(header)}.${urlEncode(payload)}.`;
    console.log(`viewcontrollers.js::startLogin:: will make request with jwt`);
    updatePassportConfig(serverPassport, claims, oidcClient, jwt);
  } else {
    updatePassportConfig(serverPassport, claims, oidcClient);
  }

  // updatePassportConfig(serverPassport, claims, oidcClient);
  res.redirect(307, "/login");
};

const validateRelationship = async (app, req, res, endpoint) => {
  let sessionId = req.cookies.sessionId;
  let userDetails = await getSessionData(sessionId, "userDetails");
  let legalPersonIdentifier = await getSessionData(
    sessionId,
    "legalPersonIdentifier"
  );
  let companyName = await getSessionData(sessionId, "companyName");
  // console.log(`sessionId ${sessionId} details:`)
  req.userDetails = userDetails;
  req.companyName = companyName;
  req.legalPersonIdentifier = legalPersonIdentifier;
  req.sessionId = sessionId;
  if (userDetails.error) {
    req.error = userDetails.error;
  }
  // console.log(userDetails)
  /*
  {
  lei: '529900ENKWV3BZ5GYL12',
  address: null,
  birthdate: '1965-01-01',
  business_role: null,
  trading_status: 'LIVE',
  legal_name: '360kompany AG',
  sub_jurisdiction: 'AT',
  sic: '["7375 - Informationsabruf von entfernten Datenbanken","1450 - Media","73759903 - Remote data base information retrieval","63120 - Web portals"]',
  given_name: 'claude',
  vat_registration: 'ATU67091005',
  legal_person_identifier: '375714x',
  family_name: 'Phil',
  personal_number: 'el/el/11111'
}
  */
  return app.render(req, res, "/kyb/validate-relation", req.query);
};

const registryPrompt = async (app, req, res, endpoint) => {
  let sessionId = req.cookies.sessionId;
  let userDetails = await getSessionData(sessionId, "userDetails");
  let selfLei = await getSessionData(sessionId, "selfLEI");
  // console.log(`sessionId ${sessionId} details:`)
  req.userDetails = userDetails;
  req.selfLei = selfLei;
  req.sessionId = sessionId;
  // req.extSessionId = req.cookies.extSessionId;
  req.keycloakRedirectURI = process.env.KEYCLOAK_REDIRECT_URI
    ? `${
        process.env.KEYCLOAK_REDIRECT_URI
      }?extSessionId=${sessionId}&userDetails=${encodeURIComponent(
        JSON.stringify(userDetails)
      )}`
    : `http://localhost:8081/auth/realms/kyb/rest/kybResponse?extSessionId=${
        req.cookies.extSessionId
      }&userDetails=${encodeURIComponent(JSON.stringify(userDetails))}`;
  return app.render(req, res, "/kyb/registry-prompt", req.query);
};

const issueKYB = async (app, req, res, serverPassport, oidcClient) => {
  let sessionId = req.query.sessionId;
  let claims = defaultClaims;
  let redirectURI = process.env.ISSUE_REDIRECT_URI
    ? process.env.ISSUE_REDIRECT_URI
    : "http://localhost:5000/vc/response/kyb";

  const headerRaw = {
    alg: "none",
    typ: "JWT",
  };
  const payloadRaw = {
    sub: "mock",
    aud: "mock",
    iss: "http://localhost",
    client_id: oidcClient.client_id,
    redirect_uri: redirectURI,
    claims: claims,
  };
  const header = JSON.stringify(headerRaw);
  const payload = JSON.stringify(payloadRaw);
  let jwt = `${urlEncode(header)}.${urlEncode(payload)}.`;
  updatePassportConfig(serverPassport, claims, oidcClient, jwt);
  let options = {
    maxAge: 1000 * 60 * 15, // would expire after 5 minutes
    httpOnly: true, // The cookie only accessible by the web server
    signed: false, // Indicates if the cookie should be signed
  };
  // Set cookie
  res.cookie("kyb", sessionId, options); // options is optional
  res.cookie("sessionId", sessionId, options); // options is optional
  res.redirect(307, "/login");
  // return app.render(req, res, "/vc/issue/kyb", req.query);
};

const issueVcKYBResponse = async (
  app,
  req,
  res,
  endpoint,
  serverPassport,
  oidcClient
) => {
  let sessionId = req.query.sessionId;
  let userDetails = await getSessionData(sessionId, "userDetails");
  // console.log(updatedUsersAttributes);
  req.session.DID = false;
  req.session.userData = userDetails;
  req.session.sessionId = sessionId;
  req.session.endpoint = endpoint;
  req.session.baseUrl = process.env.BASE_PATH;
  return app.render(req, res, "/vc/issue/kyb", req.query);
};

const encode = function (unencoded) {
  return new Buffer(unencoded || "").toString("base64");
};
const urlEncode = function (unencoded) {
  const encoded = encode(unencoded);
  return encoded.replace(/\+/g, "-").replace(/\//, "_").replace(/=+$/, "");
};

export {
  startLogin,
  validateRelationship,
  registryPrompt,
  issueKYB,
  issueVcKYBResponse,
  landingPage,
  verifyUserDetailsPage,
  ticketInfo,
  issueServiceCard,
};
