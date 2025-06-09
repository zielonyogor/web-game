import { MessageType } from "@shared/Message";
import { NetworkManager } from "./NetworkManager";
import type { WebSocket } from 'ws';
import { maps } from "@shared/maps";
import { MapLayout } from "@shared/maps/Map";

enum GameState{
    MatchMaking = "MatchMaking",
    MatchInProgress = "MatchInProgress",
}

enum PlayerState{ // is this useful???
    Init = "Init",
    Ready = "Ready",
    Won = "Won",
    InGame = "InGame",
}

type GameSession = {
    code: string;
    players: {
        nickname: string,
        state: PlayerState,
        socket: WebSocket,
    }[];
    state: GameState,
    currentMap?: MapLayout,
};

const gameSessions = new Map<string, GameSession>();

export function createGameSession(code: string): GameSession {
    const game: GameSession = {
        code,
        players: [],
        //players: [{nickname: player, state: PlayerState.Init}],
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


export function gameExists(code: string): boolean {
    return gameSessions.has(code);
}

export function addPlayer(code: string, player: string, socket: WebSocket) {
    const game = gameSessions.get(code);
    if(game === undefined) {
        return;
    }
    if(game.players.length >= 2) {
        return;
    }
    
    game.players.push({
        nickname: player, 
        state: PlayerState.Ready,
        socket: socket,
    });
    console.log(game);
    
    if(game.players.length < 2) {
        return;
    }
    
    if(game.players[0].state == PlayerState.Ready 
        && game.players[1].state == PlayerState.Ready) {
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
}

export function updatePlayer(socket: WebSocket, angle: number, x: number, y: number) {
    console.log("updating");
    const game = getGame(socket);
    if(game == undefined) {
        console.log("[error] Couldn't find game of requesting player");
        return;
    }

    const otherPlayer = game.players.find(p => p.socket !== socket);
    if(otherPlayer) {
        NetworkManager.send(otherPlayer.socket, {
            type: MessageType.PlayerPositionUpdate,
            payload: {
                angle: angle,
                x: x,
                y: y,
            }
        });
    }
}