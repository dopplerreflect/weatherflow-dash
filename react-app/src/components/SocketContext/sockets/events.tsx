import { joinChannel } from "./emit";
const SOCKET_SERVER = "ws://localhost:3001/ws";

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
      console.log(message);
      switch (message.type) {
        case "all":
          setValue(message.data);
          break;
        case "rapid_wind":
          setValue((state) => ({ ...state, rapid_wind: message.rapid_wind }));
          break;
        case "obs_st":
          setValue((state) => ({ ...state, obs_st: message.obs_st }));
          break;
        case "summary":
          setValue((state) => ({ ...state, summary: message.summary }));
      }
    };
  };
  connect();
};
