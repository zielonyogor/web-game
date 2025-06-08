import getCookie from "@shared/cookie";
import * as Network from "@shared/Message";
import { SceneManager } from "../core/SceneManager";

export class NetworkManager {
    private static socket: WebSocket;

    public static connect() {
        this.socket = new WebSocket("ws://localhost:3000");

        this.socket.onopen = function () {
            console.log("Connected to the server");
            
            const nickname = getCookie("nickname");
            const code = getCookie("code");
            if(code === null) {
                alert("AAAAAAAAAAAAAA");
                document.location.href = '/';
                return;
            }
            
            NetworkManager.send({
                type: Network.MessageType.PlayerLoaded,
                payload: {
                    playerId: nickname,
                    code,
                }
            });
        }

        this.socket.onmessage = this.manageMessage;
    }

    public static send(message: Network.Message) {
        if(this.socket?.readyState === WebSocket.OPEN) {
            console.log("send");
            this.socket.send(JSON.stringify(message));
        }
    }

    private static manageMessage(ev: MessageEvent) {
        console.log(`[message] Data received from server: ${ev.data}`);
        const data = JSON.parse(ev.data.toString()) as Network.Message;

        if(data.type == Network.MessageType.LoadScene) {
            sessionStorage.setItem('loadedMap', JSON.stringify(data.payload.map));
            window.location.href = data.payload.url;
            console.log(data.payload.map);
        }
        else if(data.type == Network.MessageType.TimeUpdate) {

        }
        else if(data.type == Network.MessageType.PlayerPositionUpdate) {
            const otherPlayer = SceneManager.getCurrentScene().getObjectById("otherplayer");
            if(otherPlayer === undefined) {
                return;
            }
            otherPlayer.x = data.payload.x;
            otherPlayer.y = data.payload.y;
        }
    }
}