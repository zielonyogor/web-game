import * as PIXI from "pixi.js";
import { GameObject } from "../components/game/GameObject";
import type { Message } from "@shared/Message";

export class Scene extends PIXI.Container {
    protected allObjects: Array<GameObject> = [];
    protected uiLayer: PIXI.IRenderLayer;

    constructor(app: PIXI.Application) {
        super();

        this.uiLayer = new PIXI.RenderLayer();
        this.addChild(this.uiLayer);
		app.ticker.add(delta => this.update(delta.deltaTime));
    }

    protected update(deltaTime: number) {}

    public getObjectById(id: string): GameObject | undefined {
        return this.allObjects.find(obj => obj.id === id);
    }

    public manageData(data: Message) {}
}