import * as dotenv from "dotenv";
import openwhisk = require("openwhisk");
dotenv.config();

export interface AppConfig {
  chain_name: string | undefined;
  endpoint: string;
  contract_address: string | undefined;
  kafka_brokers: string[];
  openwhisk_api_key: string;
  openwhisk_namespace: string;
  openwhisk_host: string;
  event_reciever: string;
  event_processor: string;
  event_names: string[];
  topic:string;
}

export function loadConfigFromEnv(): AppConfig {
  const chainName = process.env.CHAIN_NAME;
  const endpoint = process.env.CHAIN_ENDPOINT;
  const contractAddress = process.env.CONTRACT_ADRESS;
  const kafkaBroker = process.env.KAFKA_BROKERS;
  const openwhiskApiKey = process.env.OPENWHISK_API_KEY;
  const openwhiskNamespace = process.env.OPENWHISK_NAMESPACE;
  const openwhiskHost = process.env.OPENWHISK_API_HOST;
  const eventReciever = process.env.EVENT_RECEIVER;
  const eventProcessor = process.env.EVENT_PROCESSOR;
  const eventName = process.env.EVENT_NAME;
  const topic = process.env.TOPIC;

  if (!endpoint) {
    throw new Error("Missing CHAIN_ENDPOINT environment variables.");
  }
  if (!topic) {
    throw new Error("Missing TOPIC environment variables.");
  }
  if (!eventName) {
    throw new Error("Missing EVENT_NAME environment variables.");
  }
  if (
    !openwhiskApiKey ||
    !openwhiskNamespace ||
    !openwhiskHost ||
    !kafkaBroker
  ) {
    throw new Error(
      "Missing openwhisk environment variables. (openwhisk_api_key, openwhisk_namespace,openwhisk_host,kafka_broker)"
    );
  }

  if (!eventProcessor || !eventReciever) {
    throw new Error(
      "Missing action environment variables.(event_reciever,event_processor)"
    );
  }
  const eventNames = eventName.split(";");
  const kafkaBrokers = kafkaBroker.split(";");

  return {
    chain_name: chainName,
    endpoint,
    contract_address: contractAddress,
    kafka_brokers: kafkaBrokers,
    openwhisk_api_key: openwhiskApiKey,
    openwhisk_namespace:openwhiskNamespace,
    openwhisk_host: openwhiskHost,
    event_reciever: eventReciever,
    event_processor:eventProcessor,
    event_names:eventNames,
    topic,
  };
}
