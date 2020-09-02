import { joinChannel } from "./emit";
import {
  decodeRapidWind,
  decodeObsSt,
} from "../../../utils/decodeWeatherflowObjects";

const SOCKET_SERVER = `ws://${document.location.host}/ws`;

export let socket: WebSocket;

export const socketEvents = ({ setValue }: SetSocketStateProps) => {
  const connect = () => {
    socket = new WebSocket(SOCKET_SERVER);
    socket.onopen = (event) => {
      console.log("Opened socket");
      joinChannel();
    };
    socket.onclose = (event) => {
      console.log("Lost Socket", event.reason);
      setTimeout(() => {
        connect();
      }, 3000);
    };
    socket.onerror = (err) => {
      console.log("socket error: closing.");
      socket.close();
    };
    socket.onmessage = (socketMessage) => {
      const message = JSON.parse(socketMessage.data);
      switch (message.type) {
        case "all":
          setValue(
            {
              summary: message.data.summary,
              obs_st: message.data.obs_st.map((e: any) => decodeObsSt(e)),
              rapid_wind: message.data.rapid_wind.map((e: any) =>
                decodeRapidWind(e)
              ),
            },
          );
          break;
        case "rapid_wind":
          // console.log(message.rapid_wind);
          setValue((state) => ({
            ...state,
            rapid_wind: message.rapid_wind.map((e: any) => decodeRapidWind(e)),
          }));
          break;
        case "obs_st":
          setValue((state) => ({
            ...state,
            obs_st: message.obs_st.map((e: any) => decodeObsSt(e)),
          }));
          break;
        case "summary":
          setValue((state) => ({ ...state, summary: message.summary }));
      }
    };
  };
  connect();
};
