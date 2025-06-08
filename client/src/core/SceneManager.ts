import * as PIXI from "pixi.js";
import type { Scene } from "../scenes/Scene";

export class SceneManager {
    private static app : PIXI.Application;
    private static currentScene : Scene;

    static init(app : PIXI.Application) {
        this.app = app
    }

    static changeScene(newScene : Scene) {
        if(this.currentScene) {
            this.app.stage.removeChild(this.currentScene);
            this.currentScene.destroy({children: true});
        }
        
        this.currentScene = newScene;
        this.app.stage.addChild(this.currentScene);
    }

    static getCurrentScene(): Scene {
        return this.currentScene;
    }
}