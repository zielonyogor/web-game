import { MapLayout } from "@shared/maps/Map";
import type { WebSocket } from 'ws';

export enum GameState{
    MatchMaking = "MatchMaking",
    MatchInProgress = "MatchInProgress",
}

export enum PlayerState{
    Init = "Init",
    Ready = "Ready",
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
    interval?: NodeJS.Timeout, 
    time?: number,
};