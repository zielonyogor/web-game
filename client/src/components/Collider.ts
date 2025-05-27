import * as PIXI from "pixi.js";

class Collider{
    public bounds: PIXI.Rectangle;
    public isTrigger: boolean;
    public parent: PIXI.Container;

    constructor(parent: PIXI.Container, width: number, height: number, isTrigger = false) {
        this.bounds = new PIXI.Rectangle(0, 0, width, height);
        this.isTrigger = isTrigger;
        this.parent = parent;
    }

    public update(): void {
        const globalPosition = this.parent.getGlobalPosition();
        this.bounds.x = globalPosition.x;
        this.bounds.y = globalPosition.y;
    }

    
}