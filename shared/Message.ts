import { MapLayout } from "./maps/Map";

export enum MessageType {
    MoveGameObjects = "MoveGameObjects",
    PlayerWon = "PlayerWon",
    TimeUpdate = "TimeUpdate",
    LoadScene = "LoadScene",
    GameStart = "GameStart",
    GameEnd = "GameEnd",
    PlayerDisconnect = "PlayerDisconnect",
    PlayerLoaded = "PlayerLoaded",
    PlayerReady = "PlayerReady",
    PlayerPositionUpdate = "PlayerPositionUpdate",
    Heartbeat = "Heartbeat",
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
        id: string;
    };
}

interface TimeUpdateMessage {
    type: MessageType.TimeUpdate;
    payload: {
        time: number | undefined;
    };
}

interface GameStartMessage {
    type: MessageType.GameStart;
    payload: {};
}

interface PlayerLeftMessage {
    type: MessageType.PlayerDisconnect;
    payload: {
        id: string;
    };
}

interface PlayerLoadedMessage {
    type: MessageType.PlayerLoaded;
    payload: {
        code: string,
        playerId: string,
    };
}

interface PlayerReadyMessage {
    type: MessageType.PlayerReady;
    payload: {
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
    | PlayerLeftMessage
    | PlayerLoadedMessage
    | LoadSceneMessage
    | PlayerPositionUpdateMessage
    | PlayerReadyMessage;
