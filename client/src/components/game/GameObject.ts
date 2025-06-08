import * as PIXI from "pixi.js";
import { Collider } from "../Collider";
import { ColliderManager } from "../../core/ColliderManager";

export interface GameObjectProps {
    id: string,
    width: number;
    height: number;
    color?: number;
    x?: number;
    y?: number;
    isTrigger?: boolean;
    colliderWidth?: number;
    colliderHeight?: number;
}

export class GameObject extends PIXI.Container {
    public id: string;
    public collider: Collider;
    protected sprite: PIXI.Graphics;
    private onUpdate?: (deltaTime: number) => void;

    constructor({
        id,
        width,
        height,
        color = 0xffffff, // change to sprite later
        x = 0,
        y = 0,
        isTrigger = false,
        colliderWidth,
        colliderHeight,
    }: GameObjectProps) {
        super();

        this.id = id;

        // Centered drawing (around 0,0)
        this.sprite = new PIXI.Graphics()
            .rect(-width / 2, -height / 2, width, height)
            .fill(color);
        this.addChild(this.sprite);

        this.x = x;
        this.y = y;

        this.collider = new Collider({
            parent: this,
            width: colliderWidth ?? width,
            height: colliderHeight ?? height,
            isTrigger,
        });

        ColliderManager.add(this.collider);
    }

    public addOnUpdate(fn: (deltaTime: number) => void) {
        this.onUpdate = fn;
    }

    public update(deltaTime: number) {
        this.onUpdate?.(deltaTime);
    }
}