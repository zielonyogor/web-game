import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

io.on("connection", (socket) => {
  console.log("Player connected:", socket.id);
  socket.on("move", data => { /* update player state */ });
});

httpServer.listen(3000, () => {
  console.log("Server listening on :3000");
});
