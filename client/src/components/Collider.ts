import * as PIXI from "pixi.js";

interface ColliderProps {
    parent: PIXI.Container, 
    width?: number, 
    height?: number, 
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

        const bounds = parent.getLocalBounds();
        const finalWidth = width ?? bounds.width;
        const finalHeight = height ?? bounds.height;

        this.bounds = new PIXI.Rectangle(0, 0, finalWidth, finalHeight);

        const sprite = new PIXI.Graphics()
            .rect(this.bounds.x, this.bounds.y, finalWidth, finalHeight)
            .stroke({ color: 0xff00ff, width: 1 });
        this.parent.addChild(sprite);   
    }

    public update(): void {
        const global = this.parent.getGlobalPosition();
        const localBounds = this.parent.getLocalBounds();

        this.bounds.x = global.x + localBounds.x;
        this.bounds.y = global.y + localBounds.y;
    }

    public addOnTrigger(fn: (other : Collider) => void) {
        this.onTrigger = fn;
    }
}