import { getSessionData, setOrUpdateSessionData } from "../services/redis";
import {saveUserProfileToDBProxy} from "../services/DBProxyService"

const saveUserToDB = async (req, res) => {
 let userDetails = req.body.userDetails
 let sessionId = req.body.sessionId;

 saveUserProfileToDBProxy(userDetails)
    .then((resp) => {
      // console.log(`dbControllers storing user`)
      // console.log(userDetails)
      setOrUpdateSessionData(sessionId, "profile",userDetails)
      res.status(200).end();
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export { saveUserToDB };
