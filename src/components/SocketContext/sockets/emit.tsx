import { socket } from "./events";
export const joinChannel = () => {
  console.log("sending join request");
  socket.send('{"join":true}');
};
