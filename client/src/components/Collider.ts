import * as PIXI from "pixi.js";

interface ColliderProps {
    parent: PIXI.Container, 
    width: number, 
    height: number, 
    isTrigger?: boolean,
}

export class Collider{
    public bounds: PIXI.Rectangle;
    public isTrigger: boolean;
    public parent: PIXI.Container;

    public onTrigger?: (other: Collider) => void;

    constructor({
        parent, 
        width, 
        height, 
        isTrigger = false
    } : ColliderProps) {
        this.isTrigger = isTrigger;
        this.parent = parent;

        this.bounds = new PIXI.Rectangle(this.parent.getGlobalPosition().x, this.parent.getGlobalPosition().y, width, height);

        const sprite = new PIXI.Graphics()
            .rect(-width / 2, -height / 2, width, height)
            .stroke({ color: 0xff00ff, width: 1 });
        this.parent.addChild(sprite);
    }

    public update(): void {
        const global = this.parent.getGlobalPosition();
        this.bounds.x = global.x - this.bounds.width / 2;
        this.bounds.y = global.y - this.bounds.height / 2;
    }

    public addOnTrigger(fn: (other : Collider) => void) {
        this.onTrigger = fn;
    }
}