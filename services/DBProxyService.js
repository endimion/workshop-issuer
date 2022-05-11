import axios from "axios";
import qs from "qs";

const saveUserProfileToDBProxy = async (userDetails) => {
  console.log("DBPrpxy service::");
  console.log(userDetails);
  /*
{
  name: 'CLAUDE',
  surname: 'PHIL',
  identifier: 'EL/EL/11111',
  gender: 'Male',
  age: '1965-01-01',
  connectedPassengers: [
    {
      name: 'Nikos',
      surname: 'Triantafyllou',
      gender: "'Male'",
      age: '2007-05-10'
    },
    {
      name: 'Katerina',
      surname: "'Ksystra'",
      gender: "'Female'",
      age: "2005-09-11'"
    }
  ],
  embarkation_port: 'pireaus',
  disembarkation_port: 'chios',
  ticketNumber: '123',
  email: 'triantafyllou.ni@gmail.com',
  postal_address: 'Kallistratous 50',
  emergency_contact_details: '6943808730',
  country_of_residence: 'GR',
  medical_condnitions: 'equip_required',
  mobility_issues: 'hearing_impaired',
  pregnency_data: 'normal',
  isCrew: 'false',
  role: 'passenger'


   isCrew: true,
  emergency_duty: 'firefighting_unit',
  role: 'staff',
  preferred_language: [ 'IE' ],

}





  */
  // console.log("DBProxyService:: saveUserProfile ");
  let DB_PROXY_URL = process.env.DB_PROXY_URL
    ? process.env.DB_PROXY_URL
    : "http://localhost:8080";

  // const data = {
  //   name: userDetails.name,
  //   surname: userDetails.surname,
  //   identifier: userDetails.identifier,
  //   gender: userDetails.gender,
  //   age: userDetails.age,
  //   connectedPassengers: userDetails.connectedPassengers,
  //   ticketNumber: userDetails.ticketNumber,
  //   medical_conditions: userDetails.medical_condnitions,
  //   isCrew: userDetails.isCrew,
  //   role: userDetails.role,
  // };

  // console.log("DBProxyService:: will post ")
  // console.log(options)

  const options = {
    method: "POST",
    url: `${DB_PROXY_URL}/addPerson/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await getOAuth2AccessToken()}`,
    },
    data: userDetails,
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
  let client_id = process.env.KEYCLOAK_OAUTH_CLIENT?process.env.KEYCLOAK_OAUTH_CLIENT:"palaemonRegistration";
  let client_secret = process.env.KEYCLOAK_OAUTH_SECRET?process.env.KEYCLOAK_OAUTH_SECRET:"bdbbb8d5-3ee7-4907-b95c-2baae17bd10f";
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
