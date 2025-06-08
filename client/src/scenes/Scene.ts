import * as PIXI from "pixi.js";
import { GameObject } from "../components/game/GameObject";

export class Scene extends PIXI.Container {
    protected allObjects: Array<GameObject> = [];

    constructor(app: PIXI.Application) {
        super();

		app.ticker.add(delta => this.update(delta.deltaTime));
    }

    protected update(deltaTime: number) {

    }

    public getObjectById(id: string): GameObject | undefined {
        return this.allObjects.find(obj => obj.id === id);
    }
}