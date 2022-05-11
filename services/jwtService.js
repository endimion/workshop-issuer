const CryptoJS = require("crypto-js");

const makeUnsigedJWT = (payloadJson) => {
  let header = {
    alg: "none",
  };
  let unsignedToken = base64url(header) + "." + base64url(payloadJson);
//   console.log(unsignedToken)
  return unsignedToken + ".";
};

function base64url(source) {
  console.log(source )
  console.log("2")
  let wordArray = CryptoJS.enc.Utf8.parse(JSON.stringify(source));  
  // Encode in classical base64
  let encodedSource = CryptoJS.enc.Base64.stringify(wordArray);
  // Remove padding equal characters
  encodedSource = encodedSource.replace(/=+$/, "");
  // Replace characters according to base64url specifications
  encodedSource = encodedSource.replace(/\+/g, "-");
  encodedSource = encodedSource.replace(/\//g, "_");
  return encodedSource;
}

export { makeUnsigedJWT };
