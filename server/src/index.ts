import http from "http";
import { WebSocketServer } from "ws";
import { handleConnection } from "./match";

const server = http.createServer();
const wss = new WebSocketServer({ server });

wss.on("connection", handleConnection);

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});