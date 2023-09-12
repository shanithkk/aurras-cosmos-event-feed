import { IconService, HttpProvider } from "icon-sdk-js";
import * as openwhisk from "openwhisk";
import * as dotenv from "dotenv";

import { loadConfigFromEnv, AppConfig } from "./config_files";
import { waitEvent } from "./event_fileter";

dotenv.config();
export const config: AppConfig = loadConfigFromEnv();

const OpenwhiskClinet = openwhisk({
  apihost: config.openwhisk_host,
  api_key: config.openwhisk_api_key,
  namespace: config.openwhisk_namespace,
  ignore_certs: true,
});

// Enter the contract address you want to monitor events for
const contractAddress = config.contract_address;

// Enter the event name you want to monitor
const eventName = config.event_names.map((item) =>
  item === "CallMessage" ? "CallMessage(str,str,int,int,bytes)" : item
);

waitEvent(eventName, (events) => {
  events.forEach((event) => {
    OpenwhiskClinet.actions
      .invoke({
        name: config.event_reciever,
        params: {
          brokers: config.kafka_brokers,
          event: JSON.stringify(event),
          topic: config.topic,
          eventProcessor: config.event_processor,
        },
      })
      .then((activation) => console.log(activation));
  });
}).catch((error) => console.log(error));
