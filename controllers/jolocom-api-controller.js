import { response } from "express";
import {
  makeConnectionRequest,
  connectionResponseServ,
  makeCredentialOffer,
  makeVC,
  handleJolocomFlow,
} from "../services/jolocomService";
import { getSessionData } from "../services/redis";


import { publish } from "../services/sse-service";

const makeConnectionRequestController = async (req, res, issuerAgent) => {
  let sessionId = req.body.sessionId;
  let vcType = req.body.vcType;
  let endpoint = req.body.endpoint
  let isMobile = req.body.isMobile ? true : false;
  let callback = req.baseUrl
    ? `${endpoint}/${req.baseUrl}/connectionResponse?sessionId=${sessionId}`
    : endpoint + "/connectionResponse?sessionId=" + sessionId;
  // console.log(
  //   "jolocom-api-contorller, makeConnectionRquest callback::" + callback
  // );

  console.log('jolocom-api-controllers:')
  console.log(` sessionId ${sessionId}, vcType ${vcType}, endpoint ${endpoint}, isMobile ${isMobile} callback ${callback}`)

  let response = await makeConnectionRequest(
    sessionId,
    vcType,
    isMobile,
    callback,
    sessionId,
    issuerAgent
  );
  res.send(response);
};

const handleConnectionResponse = async (req, res, issuerAgent) => {
  console.log("jolocom-api-controller.js handleConnectionResponse ");
  const sessionId = req.query.sessionId; //get the sesionId that is picked up from the response uri
  const jwtResponse = req.body.token;
  // retrieve the server sessionId from the SesssionManager
  const responseToken = await handleJolocomFlow(req.body.token, issuerAgent);

  // console.log("handleConnectionResponse")
  // console.log(jwtResponse)

  let responseForUserWallet = await connectionResponseServ(
    jwtResponse,
    issuerAgent,
    sessionId
  );

  req.session.did = true;
  publish(
    JSON.stringify({
      uuid: sessionId,
      sessionId: sessionId,
      status: "connected",
    })
  );

  res.set({
    "access-control-expose-headers": "WWW-Authenticate,Server-Authorization",
    "content-type": "text/html; charset=utf-8",
    vary: "origin",
    "strict-transport-security": "max-age=31536000",
    "cache-control": "no-cache",
    "content-length": "0",
    "content-type": "text/html; charset=utf-8",
  });
  res.status(200).end();
};

const handleVCRequestController = async (req, res, issuerAgent, endpoint) => {
  console.log("handleVCRequestController ");
  let sessionId = req.body.sessionId;
  let vcType = req.body.vcType;
  let isMobile = req.body.isMobile ? true : false;
  let userData = await getSessionData(sessionId,"profile")//req.session.userData;
  // console.log(userData);
  // req.session.endpoint = endpoint;
  // req.session.baseUrl = process.env.BASE_PATH;

  let callback = process.env.BASE_PATH
    ? `${endpoint}/${process.env.BASE_PATH}/offerResponse?vcType=${vcType}&sessionId=${sessionId} `
    : endpoint + `/offerResponse?vcType=${vcType}&sessionId=${sessionId} `;
  // console.log("handleVCRequestController userData in session")
  // console.log(userData)
  
  console.log(`sessionId ${sessionId} vcType ${vcType} isMobile ${isMobile} userData ${userData}`)

  let response = await makeCredentialOffer(
    sessionId,
    vcType,
    userData,
    callback,
    isMobile,
    issuerAgent
  );
  res.send(response);
};

const handleVCResponseController = async (req, res, issuerAgent) => {
  let sessionId = req.query.sessionId;
  let vcType = req.query.vcType;
  console.log("handleVCResponseController");
  // console.log(sealSessionId);

  let sessionDetails = await getSessionData(sessionId) //, "userDetails");
  console.log("session details")
  console.log(sessionDetails);
  let kybAttributes = JSON.parse(sessionDetails).userDetails;
  // console.log("user attributes::");
  // console.log(userAttributes);
  let userDID = JSON.parse(sessionDetails).DID;//await getSealSessionData(sealSessionId, "DID");

  let userResponseToken = req.body.token;
  let response = await makeVC(
    vcType,
    kybAttributes,
    userDID,
    userResponseToken,
    issuerAgent
  );

  publish(
    JSON.stringify({
      uuid: sessionId,
      sessionId: sessionId,
      status: "sent",
    })
  );
  res.send(response);
};

export {
  makeConnectionRequestController,
  handleConnectionResponse,
  handleVCRequestController,
  handleVCResponseController,
};
