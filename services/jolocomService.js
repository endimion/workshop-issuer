const qr = require("qr-image");
const imageDataURI = require("image-data-uri");
import { streamToBuffer } from "@jorgeferrero/stream-to-buffer";
import { vcTypes } from "../config/vcTypes";
import { AuthenticationProcessor } from "../utils/jolocomProcessors/authenticationProcessor";
import { setOrUpdateSessionData } from "./redis";
// import session from "express-session";
const jsesc = require("jsesc");

const getProcessor = async (jwt, agent) => {
  let authProcessor = new AuthenticationProcessor();
  let processors = [authProcessor];
  // Fetching interaction instance to define processor type based on provided jwt
  const interaction = await agent.findInteraction(jwt);
  // Defining appropriate processor based on interaction flow type
  const processor = processors.find(
    (processor) => processor.supportedType() === interaction.flow.type
  );
  if (!processor) {
    throw new RuntimeException(
      `Can't find processor for '${interaction.flow.type}' interaction flow type.`
    );
  }
  return processor;
};

const handleJolocomFlow = async (jwt, agent) => {
  // Defining appropriate processor based on provided jwt type
  try {
    await agent.findInteraction(jwt);
  } catch (error) {
    // response.status(StatusCodes.NOT_FOUND).json({
    //   message: `Interaction with token '${request.body.token}' not found.`
    // })
    console.log(error);
  }
  const processor = await getProcessor(jwt, agent);
  let token;
  try {
    // Processing jwt and receiving token of the latest interaction message
    token = await processor.process(jwt, agent);
  } catch (error) {
    throw new RuntimeException(
      `Unable to process interaction with type '${processor.supportedType()}'. ${error}.`
    );
  }
  console.log(
    `'${processor.supportedType()}' interaction request processed successfully. Token nonce: '${
      token.nonce
    }'.`
  );
  return token;
};

const makeConnectionRequest = async (
  sealSession,
  vcType,
  isMobile,
  callback,
  sessionId,
  issuerAgent
) => {
  const authRequest = await issuerAgent.authRequestToken({
    callbackURL: `${callback}`,
    description: "Connect with PALAEMON?",
  });

  console.log("makeConnectionRequest");
  console.log(
    `session ${sealSession} vcType ${vcType} isMobile ${isMobile} callback ${callback}, sessionId ${sessionId}`
  );

  if (!isMobile) {
    // console.log(authRequest);
    var code = qr.image(authRequest.encode(), {
      type: "png",
      ec_level: "H",
      size: 10,
      margin: 10,
    });
    let mediaType = "PNG";
    let encodedQR = imageDataURI.encode(await streamToBuffer(code), mediaType);
    // store in the sessionManager the (sealSession,issuerSession)
    let sessionUpdated = await setOrUpdateSessionData(
      sealSession,
      "issuerSession",
      sessionId
    );
    //res.send({ qr: encodedQR, uuid: sealSession });
    return { qr: encodedQR, uuid: sealSession };
  } else {
    // console.log(authRequest);

    console.log(
      `jolocomService.js interaction token is deeplink ${{
        qr: authRequest.encode(),
        uuid: sealSession,
      }}`
    );
    return { qr: authRequest.encode(), uuid: sealSession };
  }
};

const connectionResponseServ = async (
  jwtResponse,
  issuerAgent,
  sealSessionId
) => {
  const userConnectionResponse = await issuerAgent.processJWT(jwtResponse);
  const did = userConnectionResponse.participants.responder.didDocument.did;
  console.log(
    `jolocomService.js:: will cache the DID ${did} in the session ${sealSessionId}`
  );
  let sessionUpdated = await setOrUpdateSessionData(sealSessionId, "DID", did);
  let responseToken =
    await userConnectionResponse.createAuthenticationResponse();
  return responseToken.encode();
};

const makeCredentialOffer = async (
  sessionId,
  vcType,
  userAttributes,
  callback,
  isMobile,
  issuerAgent
) => {
  // let did = await getSessionData(sealSession, "DID");
  //store the attributes of the user in session to get them from the call of the wallet
  console.log("jolocomService makeCredentialOffer");
  console.log(userAttributes);

  await setOrUpdateSessionData(
    sessionId,
    "user",
    jsesc(userAttributes, {
      json: true,
    })
  );

  let credentialOfferJSON = {
    callbackURL: callback,
    offeredCredentials: [
      {
        type: "ERUA_ID",
        renderInfo: {
          renderAs: "document",
        },
        credential: {
          name: "ERUA_ID",
          display: {
            properties: [
              { path: ["$.name"], label: "Name", value: "" },
              {
                path: ["$.surname"],
                label: "Surname",
                value: "",
              },
              {
                path: ["$.eduPersonUniqueId"],
                label: "Identifier",
                value: "",
              },
              {
                path: ["$.email"],
                label: "Contact email",
                value: "",
              },
              {
                path: ["$.dateOfBirth"],
                label: "Date of Birth",
                value: "",
              },
              {
                 //eduPersonPrimaryAffiliation
                 path: ["$.eduPersonAffiliation"],
                 label: "Affiliation",
                 value: "",
              },
              {
                path: ["$.schacHomeOrganization"],
                label: "Home Institution",
                value: "",
             },
              {
                //eduPersonPrimaryAffiliation
                path: ["$.ERUAMember"],
                label: "Is ERUA MEMBER",
                value: "",
             }
             
              
            ],
          },
        },
      },
    ],
  };

  if (!isMobile) {
    let credentialOffer = await issuerAgent.credOfferToken(credentialOfferJSON);
    let code = qr.image(credentialOffer.encode(), {
      type: "png",
      ec_level: "L",
      size: 100,
      margin: 0,
    });
    let mediaType = "PNG";
    let encodedQR = imageDataURI.encode(await streamToBuffer(code), mediaType);
    return { qr: encodedQR };
  } else {
    let credentialOffer = await issuerAgent.credOfferToken(credentialOfferJSON);
    return { qr: credentialOffer.encode()};
  }
};

const makeVC = async (
  credType,
  userData,
  userDID,
  responseToken,
  issuerAgent
) => {
  const simpleExampleCredMetadata = {
    type: ["Credential", "ERUA_ID"],
    name: "ERUA_ID",
    context: [
      {
        SimpleExample: `https://palaemon.eu/terms/${credType}`,
        schema: "https://schema.org/",
        source: "schema:source",
      },
    ],
  };

  console.log("JolocomService.js:: makeVC");
  console.log(userData);

  let claimValues = {};

  simpleExampleCredMetadata.context[0].family_name = "schema:name";
  simpleExampleCredMetadata.context[0].given_name = "schema:surname";
  simpleExampleCredMetadata.context[0].email = "schema:email";
  simpleExampleCredMetadata.context[0].date_of_birth = "schema:date_of_birth";
  simpleExampleCredMetadata.context[0].eduPersonUniqueId = "schema:eduPersonUniqueId";
  simpleExampleCredMetadata.context[0].schacHomeOrganization = "schema:schacHomeOrganization";
  simpleExampleCredMetadata.context[0].eduPersonAffiliation = "schema:eduPersonAffiliation";
  simpleExampleCredMetadata.context[0].ERUAMember = "schema:ERUAMember";

  console.log("```````````")
  console.log(userData)
  console.log("```````````")
  if (userData.Name) claimValues.name = userData.Name;
  if (userData.Surname) claimValues.surname = userData.Surname;
  if (userData.eduPersonUniqueId) claimValues.eduPersonUniqueId = userData.eduPersonUniqueId;
  if (userData.schacHomeOrganization) claimValues.schacHomeOrganization = userData.schacHomeOrganization;
  if (userData.eduPersonAffiliation) claimValues.eduPersonAffiliation = userData.eduPersonAffiliation;
  if (userData.email) claimValues.email = userData.email;
  claimValues.ERUAMember ="true";

  
  console.log(claimValues)

  const offeredCredential = await issuerAgent.signedCredential(
    {
      metadata: simpleExampleCredMetadata,
      subject: userDID,
      claim: claimValues,
    },
    "mySecretPassword"
  );
  const userIssuerInteraction = await issuerAgent.processJWT(responseToken);
  let credentialOffer = {
    token: (
      await userIssuerInteraction.createCredentialReceiveToken([
        offeredCredential,
      ])
    ).encode(),
  };
  // console.log("jolocomService.js makeVC:: the credential VC is");
  // console.log(credentialOffer);
  console.log("jolocomService.js makeVC:: made a the VC");
  return credentialOffer;
};

export {
  makeConnectionRequest,
  connectionResponseServ,
  makeCredentialOffer,
  makeVC,
  handleJolocomFlow,
};
