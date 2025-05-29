import * as PIXI from "pixi.js";
import { Collider } from "../Collider";

export class Player extends PIXI.Container {
    private sprite: PIXI.Graphics;
    public collider: Collider;

    constructor(x : number, y : number) {
        super();
        

        this.sprite = new PIXI.Graphics()
            .rect(0, 0, 120, 120)
            .fill(0xffffff);

        this.x = x;
        this.y = y;

        this.width = this.sprite.width;
        this.height = this.sprite.height;
        this.pivot.x = this.sprite.width / 2;
        this.pivot.y = this.sprite.height / 2;
        this.addChild(this.sprite);

        console.log(this.getLocalBounds());

        this.collider = new Collider({
            parent: this,
        });
    }
}