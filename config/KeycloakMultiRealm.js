const Keycloak = require("keycloak-connect");
const compose = require("compose-middleware").compose;
const constants = require("../utils/consts_backend")


function KeycloakMultiRealm(config, keycloakConfigs) {
  this.keycloakPerRealm = {};
  this.getRealmName = req => {
    //if we are behind a reverse proxy then the realm will be the third  index of the array
    // else it will be the second
    let url = req.originalUrl; 
    // for example, you could get the realmName from the path
    // console.log(`the url is ${req.originalUrl}`);
    if (constants.BASE_PATH) {
      url = url.replace(`/${constants.BASE_PATH}/`,'')
    }
    return url.split("/")[1];
  };
  keycloakConfigs.forEach(kConfig => {
    this.keycloakPerRealm[kConfig.realm] = new Keycloak(config, kConfig);
  });
}

KeycloakMultiRealm.prototype.middleware = function(options) {
  return (req, res, next) => {
    const realmName = this.getRealmName(req);
    if (realmName === "test" || realmName === "esmo" || realmName === "eidas" 
    || realmName === "taxis") {
      console.log(`keylcoakMultiRealm.js:: ${realmName}`);
      const keycloak = this.keycloakPerRealm[realmName];
      // console.log(`***********keycloakMultiRealm******`)
      // console.log(keycloak)
      // console.log(`*****************`)
      const middleware = compose(keycloak.middleware());
      middleware(req, res, next);
    } else {
      //if no realm exists in the path, just continue the request
      const middleware = compose();
      middleware(req, res, next);
    }
  };
};

KeycloakMultiRealm.prototype.protect = function(spec) {
  return (req, res, next) => {
    const realmName = this.getRealmName(req);
    const keycloak = this.keycloakPerRealm[realmName];
    keycloak.protect(spec)(req, res, next);
  };
};

KeycloakMultiRealm.prototype.getKeycloakForRealm = function(req) {
  const realmName = this.getRealmName(req);
  const keycloak = this.keycloakPerRealm[realmName];
  return keycloak;
};

module.exports = KeycloakMultiRealm;
