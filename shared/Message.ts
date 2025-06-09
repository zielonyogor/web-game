import { MapLayout } from "./maps/Map";

export enum MessageType {
    MoveGameObjects = "MoveGameObjects",
    PlayerWon = "PlayerWon",
    TimeUpdate = "TimeUpdate",
    LoadScene = "LoadScene",
    GameStart = "GameStart",
    GameEnd = "GameEnd",
    PlayerLeft = "PlayerLeft",
    PlayerLoaded = "PlayerLoaded",
    PlayerReady = "PlayerReady",
    PlayerPositionUpdate = "PlayerPositionUpdate",
}

interface MoveGameObjectsMessage {
    type: MessageType.MoveGameObjects;
    payload: {
        id: string;
        x: number;
        y: number;
    }[];
}

interface PlayerWonMessage {
    type: MessageType.PlayerWon;
    payload: {
        playerId: string;
    };
}

interface TimeUpdateMessage {
    type: MessageType.TimeUpdate;
    payload: {
        time: number;
    };
}

interface GameStartMessage {
    type: MessageType.GameStart;
    payload: {};
}

interface GameEndMessage {
    type: MessageType.GameEnd;
    payload: {
        winnerId: number;
    };
}

interface PlayerLeftMessage {
    type: MessageType.PlayerLeft;
    payload: {
        playerId: string;
    };
}

interface PlayerReadyMessage {
    type: MessageType.PlayerLoaded;
    payload: {
        code: string,
        playerId: string,
    };
}

interface LoadSceneMessage {
    type: MessageType.LoadScene;
    payload: {
        url: string,
        map: MapLayout,
    };
}

interface PlayerPositionUpdateMessage {
    type: MessageType.PlayerPositionUpdate;
    payload: {
        angle: number,
        x: number,
        y: number,
    };
}

export type Message =
    | MoveGameObjectsMessage
    | PlayerWonMessage
    | TimeUpdateMessage
    | GameStartMessage
    | GameEndMessage
    | PlayerLeftMessage
    | PlayerReadyMessage
    | LoadSceneMessage
    | PlayerPositionUpdateMessage;
