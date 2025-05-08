import * as PIXI from "pixi.js";

export class SceneManager {
    private static app : PIXI.Application;
    private static currentScene : PIXI.Container;

    static init(app : PIXI.Application) {
        this.app = app
    }

    static changeScene(newScene : PIXI.Container) {
        if(this.currentScene) {
            this.app.stage.removeChild(this.currentScene);
            this.currentScene.destroy({children: true});
        }
        
        this.currentScene = newScene;
        this.app.stage.addChild(this.currentScene);
    }
}