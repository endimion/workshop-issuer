// import { getSealSessionData, validateToken } from "../services/sealService";
const qr = require("qr-image");
const imageDataURI = require("image-data-uri");
import { streamToBuffer } from "@jorgeferrero/stream-to-buffer";
import { v4 as uuidv4 } from "uuid";
import { getSessionData, setOrUpdateSessionData } from "../services/redis";
import { publish } from "../services/sse-service";
import {addDeviceToUserProfileViaEidas} from "../services/DBProxyService"

const pairDeviceController = async (app, req, res) => {
  let endpoint = process.env.EMBARKATION_BACKEND_URI
    ? process.env.EMBARKATION_BACKEND_URI
    : "http://localhost:5030/addDevice";

  req.sessionId = uuidv4();
  req.device_endpoint = endpoint;

  return app.render(req, res, "/pair-device", req.query);
};

const getQRCode = async (req, res) => {
  let invitation = req.body.invitation;
  console.log("device-controller: getQRCode");
  console.log(invitation);
  var code = qr.image(JSON.stringify(invitation), {
    type: "png",
    ec_level: "H",
    size: 10,
    margin: 10,
  });

  let mediaType = "PNG";
  res
    .status(200)
    .send(imageDataURI.encode(await streamToBuffer(code), mediaType));
};

const addDevice = async (req, res) => {
  let deviceDetails = req.body.device;
  let sessionId = req.body.sessionId;
  console.log("device-controller: addDevice");
  // console.log(deviceDetails);
  // console.log(sessionId);

  let userDetails = await getSessionData(sessionId, "userDetails");
  // console.log("user found from cache");
  // console.log(userDetails);
  /*
  {
  Name: 'CLAUDE',
  Surname: 'PHIL',
  eID: 'EL/EL/11111',
  Birthdate: '1965-01-02',
  Gender: 'Male',
  Role: 'back_of_house'
}
  */

  await addDeviceToUserProfileViaEidas(deviceDetails,userDetails)

  publish(
    JSON.stringify({
      uuid: sessionId,
      sessionId: sessionId,
      status: "palaemon-device",
    })
  );

  res.send(200);
};

export { pairDeviceController, getQRCode, addDevice };
