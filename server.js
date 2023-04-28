import { getSessionConfg, getCacheStore } from "./config/sessionConf";
import { configServer } from "./config/serverConfig";
import { initAgent } from "./config/jolocomAgent";
import {
  landingPage,
  verifyUserDetailsPage,
  issueServiceCard,
} from "./controllers/views-controllers";

import {
  makeConnectionRequestController,
  handleConnectionResponse,
  handleVCRequestController,
  handleVCResponseController,
} from "./controllers/jolocom-api-controller";
import { jwksController } from "./controllers/jwks-controllers";
import { subscribe } from "./services/sse-service";
import { searchDbController } from "./controllers/seach-db-controllers";
import { saveUserToDB } from "./controllers/dBControllers";


// import winston from "winston";
// import expressWinston from "express-winston";
const cors = require("cors");
const KeycloakMultiRealm = require("./config/KeycloakMultiRealm");
const express = require("express");
const https = require("https");
const fs = require("fs");
const next = require("next");
const jsesc = require("jsesc");
const request = require("request-promise");
const constants = require("./utils/consts");
const bodyParser = require("body-parser");
const session = require("express-session");
const axios = require("axios");
const moment = require("moment");
const dev = constants.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const cookieParser = require("cookie-parser");
const { passportController } = require("./controllers/security/passport");

// server session cache config
const isProduction = constants.NODE_ENV === "production";
const SESSION_CONF = getSessionConfg(isProduction);

const Prometheus = require("prom-client");
// Create a Registry which registers the metrics
const register = new Prometheus.Registry();
// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: "pameas-messaging-service",
});
// Enable the collection of default metrics
Prometheus.collectDefaultMetrics({ register });

// configure Keycloak connector for OIDC support
const eruaConfig = JSON.parse(
  fs.readFileSync("./config/keycloakRealms/erua.json")
);
const keycloak = new KeycloakMultiRealm({ store: getCacheStore() }, [
  // esmoRealmConfig,
  eruaConfig,
]);

//Configure and Start the server
let serverConfiguration = { endpoint: "" };

app.prepare().then(async () => {
  const server = express();
  server.set("trust proxy", 1); // trust first proxy
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json({ type: "*/*" }));
  server.use(session(SESSION_CONF));
  server.use(cookieParser());

  // server.use(keycloak.middleware());

  // initiate the jolocom agent

  let issuerAgent = null; //await initAgent();

  //CONTROLLERS

  //sse
  server.get(["/issuer-events", `\/${constants.BASE_PATH}/issuer-events`], subscribe);

  //view
  server.get(
    ["/", "/register", `\/${constants.BASE_PATH}/`],
    async (req, res) => {
      console.log("/register");
      return landingPage(app, req, res, serverConfiguration.endpoint);
    }
  );

  server.get(
    ["/login_success", `\/${constants.BASE_PATH}/login_success`],
    async (req, res) => {
      console.log("/login_success");
      // console.log(req.session.passport.user)
      return verifyUserDetailsPage(app, req, res, serverConfiguration.endpoint);
    }
  );

  server.get(["/pair-device"], async (req, res) => {
    console.log("/pair-device");
    return pairDeviceController(app, req, res, serverConfiguration.endpoint);
  });

  server.post(["/generate-qr"], async (req, res) => {
    console.log("/generate-qr");
    return getQRCode(req, res, serverConfiguration.endpoint);
  });

  server.post(["/add-device"], async (req, res) => {
    console.log("/add-device");
    return addDevice(req, res, serverConfiguration.endpoint);
  });

  server.get(["/ticketInfo"], async (req, res) => {
    console.log("/ticketInfo");
    // console.log(req.session.passport.user)
    return ticketInfo(app, req, res, serverConfiguration.endpoint);
  });

  //data-base api
  server.post(["/storeUser"], async (req, res) => {
    console.log("/storeUser");
    saveUserToDB(req, res);
  });

  server.get(
    [
      "/issue_card",
      "/issue",
      `\/${constants.BASE_PATH}/issue`,
      `\/${constants.BASE_PATH}/issue_card`,
    ],
    async (req, res) => {
      console.log("/issue");
      // console.log(req.session.passport.user); //works ok to fetch the userdetails
      req.port=constants.PORT
      issueServiceCard(app, req, res, serverConfiguration.endpoint);
    }
  );

  // Metrics endpoint
  server.get("/metrics", async (req, res) => {
    res.setHeader("Content-Type", register.contentType);
    let result = register.metrics();
    res.end(await register.metrics());
  });

  // **********************************

  // session
  server.post(
    [
      "/start-session",
      "/palaemon/start-session",
      `\/${constants.BASE_PATH}/start-session`,
    ],
    async (req, res) => {
      console.log("/start-session");
      await startSession(app, req, res, serverConfiguration.endpoint);
    }
  );
  server.post(
    [
      "/update-session",
      "/palaemon/update-session",
      `\/${constants.BASE_PATH}/update-session`,
    ],
    async (req, res) => {
      console.log("/update-session ");
      res.send(await updateSession(req, res, serverConfiguration.endpoint));
    }
  );

  //jolo
  server.post(
    [
      "/makeConnectionRequest",
      "/palaemon/makeConnectionRequest",
      `\/${constants.BASE_PATH}/makeConnectionRequest`,
    ],
    async (req, res) => {
      console.log("/makeConnectionRequest");
      makeConnectionRequestController(req, res, issuerAgent);
    }
  );

  server.post(
    [
      "/connectionResponse",
      "/palaemon/connectionResponse",
      `\/${constants.BASE_PATH}/connectionResponse`,
    ],
    async (req, res) => {
      console.log("/connectionResponse");
      handleConnectionResponse(req, res, issuerAgent);
    }
  );

  server.post(
    ["/issueVC", "/palaemon/issueVC", `\/${constants.BASE_PATH}/issueVC`],
    async (req, res) => {
      console.log("/issueVC");
      // console.log(req.body)
      handleVCRequestController(
        req,
        res,
        issuerAgent,
        serverConfiguration.endpoint
      );
    }
  );

  server.post(
    [
      "/offerResponse",
      "/palaemon/offerResponse",
      `\/${constants.BASE_PATH}/offerResponse`,
    ],
    async (req, res) => {
      console.log("/offerResponse");
      handleVCResponseController(req, res, issuerAgent);
    }
  );

  // this call needs to be on the end of the config as, the handle(*,*) must be last
  // otherwise the rest of the controllers are ignored
  let { endpoint, passport, client } = await configServer(
    server,
    https,
    constants.PORT, //port,
    isProduction,
    handle,
    serverConfiguration
  );
  let serverPassport = passport;
  let oidcClient = client;
  // grids login flow, all /login*.* uris will be handles by the passportController router
  server.use(["/login", `\/${constants.BASE_PATH}/login`], passportController);

  server.use("/jwks", jwksController);
  server.use("/query", searchDbController);
  server.use("/jwks", jwksController);
  server.all("*", async (req, res) => {
    return handle(req, res);
  });

  // moved after server startup to speed boot up for dev
  console.log("--- initiating jolocom agent---");
  issuerAgent = await initAgent();
  console.log("--- agent ready ---");
});
