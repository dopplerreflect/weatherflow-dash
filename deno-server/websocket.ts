import { config } from "https://deno.land/x/dotenv/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import {
  acceptWebSocket,
  isWebSocketCloseEvent,
} from "https://deno.land/std@0.69.0/ws/mod.ts";

import type { WfData, WfMessageObj } from "./types.d.ts";
import { setCache, getCache } from "./database.ts";

const ENV = config();

// used to truncate data length
const MAX_RAPID_WIND_ENTRIES = (60 / 3) * 60;
const MAX_OBS_ST_ENTRIES = 60;

const WEATHERFLOW_API_KEY = Deno.env.toObject()["WEATHERFLOW_API_KEY"];
const WEATHERFLOW_DEVICE_ID = Deno.env.toObject()["WEATHERFLOW_DEVICE_ID"];

const endpoint =
  `wss://ws.weatherflow.com/swd/data?api_key=${WEATHERFLOW_API_KEY ||
    ENV.WEATHERFLOW_API_KEY}`;

const clientsMap = new Map();

let data: WfData;
data = await getCache();

if (!data.summary) {
  data = {
    summary: {},
    rapid_wind: [],
    obs_st: [],
  };
}

const sendMessage = (message: any) => {
  clientsMap.forEach((client) => {
    if (client.ws._isClosed) {
      clientsMap.delete(client.clientId);
    } else {
      try {
        client.ws.send(JSON.stringify(message));
      } catch (e) {
        console.error(`Error sending message to ${client.clientId}`, client.ws);
      }
    }
  });
};

const wsClient: WebSocket = new WebSocket(endpoint);

wsClient.addEventListener("open", function () {
  console.log("wsClient connected!");
  sendStartRequests();
});

wsClient.addEventListener("close", (event: any) => {
  console.log("close", event);
});

wsClient.addEventListener("message", async function (message) {
  const messageObj: WfMessageObj = JSON.parse(message.data);
  console.log(
    messageObj.type,
    messageObj.type === "obs_st"
      ? messageObj.obs[0]
      : messageObj.type === "rapid_wind"
      ? messageObj.ob
      : messageObj,
  );
  switch (messageObj.type) {
    case "rapid_wind":
      data.rapid_wind.push(messageObj.ob);
      data.rapid_wind.length > MAX_RAPID_WIND_ENTRIES &&
        data.rapid_wind.shift();
      sendMessage({ type: "rapid_wind", rapid_wind: data.rapid_wind });
      await setCache(JSON.stringify(data));
      break;
    case "obs_st":
      data.obs_st.push(messageObj.obs[0]);
      data.obs_st.length > MAX_OBS_ST_ENTRIES && data.obs_st.shift();
      sendMessage({ type: "obs_st", obs_st: data.obs_st });
      data.summary = messageObj.summary;
      sendMessage({ type: "summary", summary: data.summary });
      await setCache(JSON.stringify(data));
      break;
    default:
      break;
  }
});

const sendStartRequests = (): void => {
  const device_id = WEATHERFLOW_DEVICE_ID || ENV.WEATHERFLOW_DEVICE_ID;
  wsClient.send(JSON.stringify({
    device_id,
    type: "listen_rapid_start",
    id: v4.generate(),
  }));
  wsClient.send(JSON.stringify({
    device_id,
    type: "listen_start",
    id: v4.generate(),
  }));
};

export const handleSocketEvents = async (ws: any) => {
  let clientId = v4.generate();

  for await (let message of ws) {
    const event = typeof message === "string" ? JSON.parse(message) : message;
    console.log(message);
    if (isWebSocketCloseEvent(message)) {
      console.log(`removing ${clientId}`);
      clientsMap.delete(clientId);
    }
    if (event.join) {
      console.log(`adding ${clientId}`);
      clientsMap.set(clientId, {
        clientId,
        ws,
      });
      const { summary, obs_st, rapid_wind } = data;
      sendMessage({ type: "all", data: { summary, obs_st, rapid_wind } });
    }
  }
};

export const handleSocket = async (ctx: any) => {
  const { conn, r: bufReader, w: bufWriter, headers } =
    ctx.request.serverRequest;
  const socket = await acceptWebSocket({
    conn,
    bufReader,
    bufWriter,
    headers,
  });
  await handleSocketEvents(socket);
};
