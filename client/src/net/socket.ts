import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:3000", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("Connected to server:", socket.id);
});

export default socket;