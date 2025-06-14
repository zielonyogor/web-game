import * as Network from "@shared/Message";
import * as GM from "./gameManager";
import { WebSocket } from "ws";

export class NetworkManager {
    public static handleConnection(socket: WebSocket) {
        socket.onopen = function (event) {
            console.log("[alert] Conenction");
        }

        socket.onclose = function (_) {
            GM.disconnectPlayer(socket);
        }

        socket.onmessage = function (event) {
            console.log(`[message] Data received from client: ${event.data}`);
            const data = JSON.parse(event.data.toString()) as Network.Message;

            if(data.type == Network.MessageType.PlayerLoaded) {
                GM.addPlayer(data.payload.code, data.payload.playerId, socket);
            }
            else if(data.type == Network.MessageType.PlayerPositionUpdate) {
                GM.updatePlayer(socket, data.payload.angle, data.payload.x, data.payload.y);
            }
            else if(data.type == Network.MessageType.PlayerReady){
                GM.readyPlayer(socket);
            }
            else if(data.type == Network.MessageType.PlayerWon) {
                GM.playerWin(socket);
            }
        }
    }

    public static send(socket: WebSocket, message: Network.Message) {
        if(socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(message));
        }
    }
}
