import http from "http";
import express from "express";
import { WebSocketServer } from "ws";
import { handleConnection } from "./playerConnection";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.get("/", (req, res) => {
  res.send("Matchmaking server is running");
});

wss.on("connection", handleConnection);

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});