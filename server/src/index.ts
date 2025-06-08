import http from "http";
import express from "express";
import { WebSocketServer } from "ws";
import { NetworkManager } from "./NetworkManager";
import routing from "./routing";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.get("/", (req, res) => {
  res.send("Matchmaking server is running");
});

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use('/', routing);

wss.on("connection", NetworkManager.handleConnection);

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});