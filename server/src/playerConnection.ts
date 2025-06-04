import crypto, { randomBytes } from 'crypto';

export function generateMatchID() : string {
    return crypto.randomBytes(6).toString("base64url");
}

export function handleConnection(socket: WebSocket) {
    socket.onopen = function (event) {
        console.log("[alert] Conenction");
        socket.send("helllo from server");
    }

    socket.onmessage = function (event) {
        console.log(`[message] Data received from server: ${event.data}`);
    }
}