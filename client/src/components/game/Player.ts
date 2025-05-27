import * as PIXI from "pixi.js";

export class Player extends PIXI.Container {
    private sprite : PIXI.Graphics;

    constructor(x : number, y : number) {
        super();

        this.sprite = new PIXI.Graphics()
            .circle(0, 0, 30)
            .fill(0xffffff);

        this.x = x;
        this.y = y;
    }
}