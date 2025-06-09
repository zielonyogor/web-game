import * as PIXI from "pixi.js";
import { Collider } from "../Collider";
import { ColliderManager } from "../../core/ColliderManager";

export interface GameObjectProps {
    id: string,
    sprite: string,
    x?: number;
    y?: number;
    isTrigger?: boolean;
    colliderWidth?: number;
    colliderHeight?: number;
}

export class GameObject extends PIXI.Container {
    public id: string;
    public collider: Collider;
    protected sprite: PIXI.Sprite;
    private onUpdate?: (deltaTime: number) => void;

    constructor({
        id,
        sprite,
        x = 0,
        y = 0,
        isTrigger = false,
        colliderWidth,
        colliderHeight,
    }: GameObjectProps) {
        super();

        this.id = id;

        this.sprite = PIXI.Sprite.from(sprite);
        this.sprite.anchor.set(0.5, 0.5);
        this.addChild(this.sprite);

        this.x = x;
        this.y = y;

        this.collider = new Collider({
            parent: this,
            width: colliderWidth ?? this.sprite.width,
            height: colliderHeight ?? this.sprite.height,
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