import { MessageType } from "@shared/Message";
import { NetworkManager } from "./NetworkManager";
import type { WebSocket } from 'ws';
import { maps } from "@shared/maps";
import { GameSession, GameState, Player, PlayerState } from "./types/GameTypes";

const minPlayers = 2; // depends on debugging
const gameSessions = new Map<string, GameSession>();

export function createGameSession(code: string): GameSession {
    const game: GameSession = {
        code,
        players: [],
        state: GameState.MatchMaking,
    };

    gameSessions.set(code, game);
    console.log(game);
    return game;
}

export function getGame(code: string): GameSession | undefined;
export function getGame(socket: WebSocket): GameSession | undefined;

export function getGame(param: string | WebSocket): GameSession | undefined {
    if (typeof param === 'string') {
        return gameSessions.get(param);
    } else {
        for (const game of gameSessions.values()) {
            if (game.players.some(p => p.socket === param)) {
                return game;
            }
        }
        return undefined;
    }
}

export function getPlayer(socket: WebSocket): Player | undefined{
    const game = getGame(socket);
    if(game === undefined) return undefined;

    return game.players.find(p => p.socket !== socket);
}


export function gameExists(code: string): boolean {
    return gameSessions.has(code);
}

export function addPlayer(code: string, player: string, socket: WebSocket) {
    const game = gameSessions.get(code);
    if(game === undefined) {
        return;
    }
    if(game.players.length >= 2) return;
    
    game.players.push({
        nickname: player, 
        state: PlayerState.Init,
        socket: socket,
    });
    console.log(game);
    
    if(game.players.length < minPlayers) return;
    
    game.currentMap = maps[0];
    game.players.forEach(p => {
        NetworkManager.send(p.socket, {
            type: MessageType.LoadScene,
            payload: {
                url: "/game",
                map: maps[0],
            },
        })
    });
}

export function updatePlayer(socket: WebSocket, angle: number, x: number, y: number) {
    const otherPlayer = getPlayer(socket);
    if(otherPlayer === undefined) return;
    
    NetworkManager.send(otherPlayer.socket, {
        type: MessageType.PlayerPositionUpdate,
        payload: {
            angle: angle,
            x: x,
            y: y,
        }
    });
}

export function readyPlayer(socket: WebSocket) {
    const game = getGame(socket);
    if(game === undefined) return;

    const player = game.players.find(p => p.socket === socket);
    if(player === undefined) return;
    player.state = PlayerState.Ready;
    
    const allReady = game.players.every(p => p.state === PlayerState.Ready);
    if (!allReady) return;

    countdown(game);
}

function countdown(game: GameSession) {
    game.time = 2;
    game.interval = setInterval(() => {
        if(game.time == undefined) return;

        game.players.forEach(p => {
            NetworkManager.send(p.socket, {
                type: MessageType.TimeUpdate,
                payload: {
                    time: game.time,
                },
            });
        });
        game.time--;

        if (game.time < 0) {
            clearInterval(game.interval);
            game.players.forEach(p => {
                NetworkManager.send(p.socket, {
                    type: MessageType.PlayerReady,
                    payload: {},
                });
            });
            update(game);
        }
    }, 1000);
}

function update(game: GameSession) {
    const startTime = Date.now();

    game.interval = setInterval(() => {
        const now = Date.now();
        const elapsed = (now - (startTime ?? now)) / 1000;

        game.players.forEach(p => {
            NetworkManager.send(p.socket, {
                type: MessageType.TimeUpdate,
                payload: {
                    time: parseFloat(elapsed.toFixed(1)),
                },
            });
        });

    }, 100);
}

export function playerWin(socket: WebSocket) {
    const game = getGame(socket);
    if(game === undefined) return;

    const player = game.players.find(p => p.socket === socket);
    if(player === undefined) return;

    clearInterval(game.interval);
    game.players.forEach(p => {
        NetworkManager.send(p.socket, {
            type: MessageType.PlayerWon,
            payload: {
                id: player.nickname,
            },
        });
    });
}

export function disconnectPlayer(socket: WebSocket) {
    const game = getGame(socket);
    if(game === undefined) return;

    const disconnectedPlayerIndex = game.players.findIndex(p => p.socket === socket);
    if (disconnectedPlayerIndex === -1) return;
    const [disconnectedPlayer] = game.players.splice(disconnectedPlayerIndex, 1);
    console.log(`Player ${disconnectedPlayer.nickname} disconnected from game ${game.code}`);

    const remainingPlayer = game.players[0];

    if (remainingPlayer) {
        if (remainingPlayer.state === PlayerState.Ready) {
            if (game.interval) {
                clearInterval(game.interval);
                delete game.interval;
            }

            NetworkManager.send(remainingPlayer.socket, {
                type: MessageType.PlayerDisconnect,
                payload: {
                    id: disconnectedPlayer.nickname
                }
            });

            gameSessions.delete(game.code);
            console.log(`Game ${game.code} ended due to disconnect`);
        }
    } 
    else {
        if (game.interval) {
            clearInterval(game.interval);
            delete game.interval;
        }
        gameSessions.delete(game.code);
        console.log(`Game session ${game.code} deleted — no players remaining`);
    }
}