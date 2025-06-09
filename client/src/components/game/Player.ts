import * as PIXI from "pixi.js";
import { GameObject } from "./GameObject";

export class Player extends GameObject {

    constructor(point: PIXI.Point) {
        super({
            id: "player",
            sprite:'player',
            x: point.x, 
            y: point.y,
            colliderHeight: 0.5 * 60,
            colliderWidth: 0.5 * 60,
        });
    }
}