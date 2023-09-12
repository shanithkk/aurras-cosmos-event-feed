import {
  Event,
  fromTendermintEvent,
  GasPrice,
  calculateFee,
} from "@cosmjs/stargate";
import * as dotenv from "dotenv";
import { AppConfig, loadConfigFromEnv } from "./config_files";
import { StargateClient } from "@cosmjs/stargate";

dotenv.config();
export const config: AppConfig = loadConfigFromEnv();

export async function waitForEvent(
  signingClient: StargateClient,
  eventName: string[],
  cb: (e: Event[]) => void,
  Target_height?: number
) {
  let height = await signingClient.getHeight();
  if (Target_height != undefined) {
    height = Target_height;
  }
  let decodedEvent: Event;
  while (true) {
    const filteredEvents: Array<Event> = [];
    let tmp = height;
    const query = `tx.height=` + height;
    await sleep(5000);
    const txs = await signingClient.searchTx(query);
    if (txs.length > 0) {
      for (const tx of txs) {
        const events = tx.events;
        for (const event of events) {
          // if (event.type === eventName) {
          for (let i = 0; i < eventName.length; i++) {
            if (event.type === eventName[i]) {
              decodedEvent = fromTendermintEvent(event);
              filteredEvents.push(decodedEvent);
            }
          }
        }
        if (filteredEvents.length > 0) {
          cb(filteredEvents);
        }
      }
    }
    console.log(height);
    while (height < tmp + 1) {
      height = await signingClient.getHeight();
    }
  }
}

function sleep(millis: number) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}
