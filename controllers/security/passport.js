// Part 0 GRIDS specific

// Part 1, import dependencies
const express = require("express");
const router = express.Router();
const passport = require("passport");
const { Strategy, discoverAndCreateClient } = require("passport-curity");
const https = require("https");
const jose = require("node-jose");
const fs = require("fs");
const constants = require("../../utils/consts");
import { defaultClaims } from "../../config/defaultOidcClaims";

// Part 3, create a JWKS
const keyStore = jose.JWK.createKeyStore();
keyStore
  .generate("RSA", 2048, { alg: "RSA-OAEP-256", use: "enc" })
  .then((result) => {
    fs.writeFileSync(
      "keys.json",
      JSON.stringify(keyStore.toJSON(true), null, "  ")
    );
  });

// Part 4, configuration of Passport
const getConfiguredPassport = async (
  isProduction,
  serverEndpoint,
  claims = defaultClaims
) => {
  let _issuer_url = constants.ISSUER_URL;

  let _redirect_uri = isProduction
    ? constants.OIDC_REDIRECT_URI
    : `http://localhost:5030/login/callback`;

  const clinteId = constants.OIDC_CLIENT; //"erua-issuer"
  const clientSecret = constants.OIDC_CLIENT_SECRET; //"b272587a-c842-4e35-9ded-09782195c198"

  // Part 4b, discover Curity Server metadata and configure the OIDC client
  const client = await discoverAndCreateClient({
    issuerUrl: _issuer_url,
    clientID: clinteId,
    clientSecret: clientSecret,
    redirectUris: [_redirect_uri],
  });

  let _user_info_request = constants.USER_INFO;
  let _user_info_port = constants.USER_INFO_PORT;
  // Part 4c, configure the passport strategy
  addClaimsToStrategy(
    claims,
    passport,
    _user_info_request,
    _user_info_port,
    client
  );

  // Part 4e, tell passport how to serialize and deserialize user data
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  // creates a dynamic client for registration
  function getDynClient(redirectURIs, jwksURI) {
    const data = JSON.stringify({
      application_type: "web",
      redirect_uris: redirectURIs,
      client_name: "palaemonClient",
      subject_type: "pairwise",
      token_endpoint_auth_method: "client_secret_basic",
      jwks_uri: jwksURI,
      userinfo_encrypted_response_alg: "RSA-OAEP-256",
      userinfo_encrypted_response_enc: "A128CBC-HS256",
    });

    let USER_INFO = constants.USER_INFO;
    const options = {
      hostname: USER_INFO,
      // port: 8180,
      path: "/auth/realms/grnetEidas/clients-registrations/openid-connect",
      method: "POST",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJlZmEwNWNkNi1jMWFmLTQ1NjgtYjMzOS0zZGY4YTE4MjBjZGYifQ.eyJqdGkiOiIxYmU4MmZmNi1kYWI2LTQ1ZGMtOTA5NS0zNjRmNTg2Y2Q4YTkiLCJleHAiOjE3NDk3MjUwMjUsIm5iZiI6MCwiaWF0IjoxNjYzMzI1MDI1LCJpc3MiOiJodHRwczovL2RzczEuYWVnZWFuLmdyL2F1dGgvcmVhbG1zL3BhbGFlbW9uLWxvY2FsIiwiYXVkIjoiaHR0cHM6Ly9kc3MxLmFlZ2Vhbi5nci9hdXRoL3JlYWxtcy9wYWxhZW1vbi1sb2NhbCIsInR5cCI6IkluaXRpYWxBY2Nlc3NUb2tlbiJ9.pmyGfojHq5WFCmW0qYQsV2eLtYx_KKXxubZbv-emP6c`,
        "Content-Type": "application/json",
        "Content-Length": data.length,
      },
    };

    return new Promise((resolve, reject) => {
      let req = https.request(options);

      req.on("response", (res) => {
        const chunks = [];
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });
        res.on("end", function () {
          const body = Buffer.concat(chunks);
          console.log("passpppport.js client registration response");
          console.log(body.toString());
          resolve(body.toString());
        });
      });

      req.on("error", (err) => {
        reject(err);
      });
      req.write(data);
      req.end();
    });
  }

  router.use(passport.initialize());
  router.use(passport.session());
  // Part 2, configure authentication endpoints
  // router.get("/", passport.authenticate("curity")); //listens to /login
  // router.post("/", passport.authenticate("curity")); //listens to /login
  router.get(
    "/",
    passport.authenticate("curity", {
      successRedirect: "/" + constants.BASE_PATH + "/login_success",
      failureRedirect: "/" + constants.BASE_PATH + "/login_failure",
    })
  ); //listens to /login
  router.post(
    "/",
    passport.authenticate("curity", {
      successRedirect: "/" + constants.BASE_PATH + "/login_success",
      failureRedirect: "/" + constants.BASE_PATH + "/login_failure",
    })
  ); //listens to /login

  router.get(
    "/callback",
    async (req, res, next) => {
      next();
    },
    passport.authenticate("curity", {
      successRedirect: "/" + constants.BASE_PATH + "/login_success",
      failureRedirect: "/" + constants.BASE_PATH + "/login",
    }), //listens to /login/callback

    async (req, res) => {
      console.log("passport.js:: will now redirect to the view");

      console.log("PASSPORT.JS REQ.USEr");
      console.log(req.user);
      let redirect_uri = "/login_success";

      console.log(`passport.js:: will redirect to ${redirect_uri}`);
      res.redirect(redirect_uri);
    }
  );
  return { passport: passport, client: client };
};

/*
 claims,
    passport,
    _user_info_request,
    _user_info_port,
    client,
    jwt
*/

const addClaimsToStrategy = (
  claims,
  passport,
  _user_info_request,
  _user_info_port,
  client,
  jwt = null
) => {
  // if (jwt) {
  //   console.log(`passport.js: ${jwt}`);
  //   finalParams = {
  //     scope: "openid profile",
  //     request: jwt,
  //   };
  // } else {
  //   finalParams = {
  //     scope: "openid profile",
  //     claims: claims,
  //   };
  // }
  let finalParams = {
    scope: "openid profile",
  };

  const strategy = new Strategy(
    {
      client,
      params: finalParams,
      fallbackToUserInfoRequest: true,
    },

    async function (accessToken, refreshToken, profile, cb) {
      try {
        const options = {
          hostname: "dss1.aegean.gr", //_user_info_request,
          // port: _user_info_port,
          path: "/auth/realms/grnetEidas/protocol/openid-connect/userinfo",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Length": "0",
          },
        };
        const httpsReq = https.request(options, function (res) {
          const chunks = [];
          res.on("data", function (chunk) {
            chunks.push(chunk);
          });
          res.on("end", function () {
            const body = Buffer.concat(chunks);
            console.log("******* USER INFO **********************");
            console.log(body.toString());
          });
        });
        httpsReq.end();

        // console.log("***********************!@@@@@@@@@@@@@@@((((((((((((((((((!!!!!!!!!")
        // console.log(profile)

        return cb(null, { profile });
      } catch (err) {
        console.log(err);
        return cb(null, { error: err });
      }
    }
  );

  // Part 4d, tell passport to use the strategy
  passport.use(strategy);
};

// Part 4, export objects
exports = module.exports;
exports.getConfiguredPassport = getConfiguredPassport;
exports.passportController = router;
exports.addClaimsToStrategy = addClaimsToStrategy;
