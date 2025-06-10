import * as PIXI from "pixi.js";
import { GameObject } from "./GameObject";

export class Player extends GameObject {

    constructor(point: PIXI.Point) {
        const sprite = PIXI.Sprite.from('player');
        super({
            id: "player",
            sprite:'player',
            x: point.x, 
            y: point.y,
            colliderHeight: Math.floor(0.6 * sprite.height),
            colliderWidth: Math.floor(0.6 * sprite.width),
        });
    }
}