import { startSealSession, makeRedirectionToken, updateSessionData } from "../services/sealService";
import { endpoints } from "../config/seal_endpoints";

const startSession = async (app, req, res, endpoint) => {
  // console.log(endpoints)
  // console.log("sealApiControllers makeSession");
  let response = await startSealSession(
    endpoints.sealSMUri,
    endpoints.sealSMPort
  );
  res.send(response);
};

const makeEidasRedirectionToken = async (req, res, endpoint) => {
  
};

const updateSession = async (req, res, endpoint) => {
  const sessionId = req.body.sessionId;
  const variableName = req.body.variableName;
  const variableValue = req.body.variableValue;
  let result = await updateSessionData(sessionId, variableName, variableValue);
  return result;
};


export { startSession, makeEidasRedirectionToken,updateSession };
