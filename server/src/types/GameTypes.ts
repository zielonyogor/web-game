import { MapLayout } from "@shared/maps/Map";
import type { WebSocket } from 'ws';

export enum GameState{
    MatchMaking = "MatchMaking",
    MatchInProgress = "MatchInProgress",
}

export enum PlayerState{ // is this useful???
    Init = "Init",
    Ready = "Ready",
    Won = "Won",
    InGame = "InGame",
}

export type Player = {
    nickname: string,
    state: PlayerState,
    socket: WebSocket,
}

export type GameSession = {
    code: string;
    players: Player[];
    state: GameState,
    currentMap?: MapLayout,
    matchTimer?: NodeJS.Timeout, 
};