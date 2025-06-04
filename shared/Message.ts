export enum MessageType {
    MoveGameObject = "MoveGameObject",
    PlayerWon = "PlayerWon",
    TimeUpdate = "TimeUpdate",
    GameStart = "GameStart",
    GameEnd = "GameEnd",
    PlayerJoin = "PlayerJoin",
    PlayerLeft = "PlayerLeft"
}

interface MoveGameObjectMessage {
    type: MessageType.MoveGameObject;
    payload: {
        id: number;
        x: number;
        y: number;
    };
}

interface PlayerWonMessage {
    type: MessageType.PlayerWon;
    payload: {
        playerId: number;
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

interface PlayerJoinMessage {
    type: MessageType.PlayerJoin;
    payload: {
        playerId: number;
        name: string;
    };
}

interface PlayerLeftMessage {
    type: MessageType.PlayerLeft;
    payload: {
        playerId: number;
    };
}

export type Message =
    | MoveGameObjectMessage
    | PlayerWonMessage
    | TimeUpdateMessage
    | GameStartMessage
    | GameEndMessage
    | PlayerJoinMessage
    | PlayerLeftMessage;

// export interface MessagePacket {
//     type: MessageType;
//     payload: any;
// }