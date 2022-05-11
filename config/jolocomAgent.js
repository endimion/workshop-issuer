import { JolocomSDK, NaivePasswordStore } from "@jolocom/sdk";
import { JolocomTypeormStorage } from "@jolocom/sdk-storage-typeorm";
import { createConnection } from "typeorm";
import * as WebSocket from "ws";
import { JolocomLib } from "@jolocom/sdk";
import { resolve } from "path";
const fs = require("fs");
const  serialize = require('serialize-javascript');

const initAgent = async () => {
  let path = "./savedAgent.json";
  return new Promise(async (resolve, reject) => {
    fs.exists(path, async function (isExist) {
      if (isExist) {
        console.log("exists:", path);
        console.log("Serialized agent found!");
        resolve(serialize(await fs.readFile(path, "utf8")));
      } else {
        console.error("Serializeed SSI Agent not found will make a new one");
        
        const typeOrmConfig = {
          name: "demoDb",
          type: "sqlite",
          database: ":memory:",
          dropSchema: true,
          entities: [
            "node_modules/@jolocom/sdk-storage-typeorm/js/src/entities/*.js",
          ],
          synchronize: true,
          logging: false,
        };

        const connection = await createConnection(typeOrmConfig);
        const sdk = new JolocomSDK({
          storage: new JolocomTypeormStorage(connection),
        });
        sdk.transports.ws.configure({ WebSocket });
        let agentToStore = await sdk.createAgent("mySecretPassword", "jolo");
        // await fs.writeFile(path,  serialize(agentToStore));
        //TODO how can this be serialized!!!
        resolve(agentToStore);
      }
    });
  });
};

export { initAgent };
