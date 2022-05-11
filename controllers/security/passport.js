// Part 0 GRIDS specific

// Part 1, import dependencies
const express = require("express");
const router = express.Router();
const passport = require("passport");
const { Strategy, discoverAndCreateClient } = require("passport-curity");
const https = require("https");
const jose = require("node-jose");
const fs = require("fs");
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
  let _issuer_url = process.env.ISSUER_URL
    ? process.env.ISSUER_URL
    : "https://dss1.aegean.gr/auth/realms/SSI";

    let _redirect_uri = isProduction
    ? process.env.OIDC_REDIRECT_URI
    : `http://localhost:5030/login/callback`;

  let vc_redirect_uri = isProduction
    ? process.env.VC_REDIRECT_URI
    : `http://localhost:5030/vc/response/kyb`;

  let jwks_uri = process.env.JWKS_URI
    ? process.env.JWKS_URI
    : `${serverEndpoint}/jwks`;

 


  const dynClientId =  "test-ssi" 
  const dynClientSecret = "5da95a22-1eb9-4026-9e5a-2367fa02f8e8" 

  // Part 4b, discover Curity Server metadata and configure the OIDC client
  const client = await discoverAndCreateClient({
    issuerUrl: _issuer_url,
    clientID: dynClientId,
    clientSecret: dynClientSecret,
    redirectUris: [_redirect_uri],
  });

  let _user_info_request = process.env.USER_INFO
    ? process.env.USER_INFO
    : "dss1.aegean.gr";
  let _user_info_port = process.env.USER_INFO_PORT
    ? process.env.USER_INFO_PORT
    : "8180";
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

    let USER_INFO = process.env.USER_INFO
    const options = {
      hostname: USER_INFO,
      // port: 8180,
      path: "/auth/realms/grnetEidas/clients-registrations/openid-connect",
      method: "POST",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI4OWZjYTFlNC03Zjc4LTRkNWEtODhkNC0zMzJlYjczNjliOGUifQ.eyJqdGkiOiIwZWRmOWIyYy02ZGZiLTQ5NzgtYWQ5Zi00NzdjODg3YzBhZTMiLCJleHAiOjAsIm5iZiI6MCwiaWF0IjoxNjM3MzE4MjQ5LCJpc3MiOiJodHRwczovL2RzczEuYWVnZWFuLmdyL2F1dGgvcmVhbG1zL2dybmV0RWlkYXMiLCJhdWQiOiJodHRwczovL2RzczEuYWVnZWFuLmdyL2F1dGgvcmVhbG1zL2dybmV0RWlkYXMiLCJ0eXAiOiJJbml0aWFsQWNjZXNzVG9rZW4ifQ.MkyA9bAPcxK7BWqFkV9SUU3CY38AUOWVJTbTLgG7PZY`,
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
          console.log("passpppport.js client registration response")
          console.log(body.toString())
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
  router.get("/", passport.authenticate("curity")); //listens to /login
  router.post("/", passport.authenticate("curity")); //listens to /login
  router.get(
    "/callback",
    async (req, res, next) => {
      // console.log(req)
      // console.log("***************")
      // console.log(req.sessionStore.sessions)
      // console.log(req.sessionStore.sessions)
      // console.log(req.sessionStore)

      // let key = Object.keys(req.sessionStore.sessions)[0];
      // let oidcSession = JSON.parse(req.sessionStore.sessions[key])[
      //   "oidc:vm.project-grids.eu"
      // ];
      // req.session["oidc:vm.project-grids.eu"] = oidcSession;
      next();
    },
    passport.authenticate("curity", { failureRedirect: "/login" }), //listens to /login/callback
    async (req, res) => {
      console.log("passport.js:: will now redirect to the view");
      
      console.log("PASSPORT.JS REQ.USEr");
      console.log(req.user);
      let redirect_uri="/login_success"
      
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
    scope: "openid profile Palaemon_Service_Card",
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
          hostname: "dss1.aegean.gr",//_user_info_request,
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
