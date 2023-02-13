import axios from "axios";
import qs from "qs";

const saveUserProfileToDBProxy = async (userDetails) => {
  console.log("DBPrpxy service::");
  console.log(userDetails);

  /*
 {
      "name": "Nikos",
      "surname": "Test",
      "identifier": "EL/EL/111112",
      "gender": "Male",
      "age": "1965-01-01",
      "connectedPassengers": [
      "embarkation_port": "pireaus",
      "disembarkation_port": "chios",
      "ticketNumber": "123",
      "email": "triantafyllou.ni@gmail.com",
      "postal_address": "Kallistratous 50",
      "emergency_contact_details": "6943808730",
      "country_of_residence": "GR",
      "medical_condnitions": "equip_required",
      "mobility_issues": "hearing_impaired",
      "pregnency_data": "normal",
      "is_crew": false,
      "role": "passenger",
      "emergency_duty": "firefighting_unit",
      "preferred_language": [ "IE" ],
      "in_position": false,
      "assignment_status": "ASSIGNED",
      "assigned_muster_station": "geo1"
}
*/

  // console.log("DBProxyService:: saveUserProfile ");
  let DB_PROXY_URL = process.env.DB_PROXY_URL
    ? process.env.DB_PROXY_URL
    // : "http://localhost:8080";
  : "http://dss.aegean.gr:8090";

  const options = {
    method: "POST",
    url: `${DB_PROXY_URL}/addPerson/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await getOAuth2AccessToken()}`,
    },
    data: userDetails,
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    });
  return { code: 200 };
};

const addDeviceToUserProfileViaEidas = async (deviceDetails, userDetails) => {
  console.log("DBPrpxy service:: addDeviceToUserProfileViaEidas");
  console.log(userDetails);
  let DB_PROXY_URL = process.env.DB_PROXY_URL
    ? process.env.DB_PROXY_URL
    : "http://localhost:8080";

  let dataToPost = deviceDetails;
  dataToPost["identifier"] = userDetails.eID;

  const options = {
    method: "POST",
    url: `${DB_PROXY_URL}/addDevice/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await getOAuth2AccessToken()}`,
    },
    data: dataToPost,
  };

  // console.log(options)

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  return { code: 200 };
};

async function getOAuth2AccessToken() {
  let keycloakAuthTokenEndpoint = process.env.KEYCLOAK_OAUTH_TOKEN
    ? process.env.KEYCLOAK_OAUTH_TOKEN
    : "https://dss1.aegean.gr/auth/realms/palaemon/protocol/openid-connect/token";
  let client_id = process.env.KEYCLOAK_OAUTH_CLIENT
    ? process.env.KEYCLOAK_OAUTH_CLIENT
    : "palaemonRegistration";
  let client_secret = process.env.KEYCLOAK_OAUTH_SECRET
    ? process.env.KEYCLOAK_OAUTH_SECRET
    : "bdbbb8d5-3ee7-4907-b95c-2baae17bd10f";
  return (
    await axios({
      method: "post",
      url: keycloakAuthTokenEndpoint,
      data: qs.stringify({
        client_id: client_id,
        client_secret: client_secret,
        grant_type: "client_credentials",
        scope: "openid",
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    })
  ).data.access_token;
}

export { saveUserProfileToDBProxy, addDeviceToUserProfileViaEidas };
