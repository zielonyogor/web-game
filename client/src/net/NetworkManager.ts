export class NetworkManager {
    private static socket: WebSocket;

    public static connect() {
        this.socket = new WebSocket("ws://localhost:3000");

        this.socket.onopen = function () {
            console.log("Connected to the server");
        }
    }

    public static send(data: any) {
        if(this.socket?.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(data));
        }
    }
}