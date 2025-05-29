import * as PIXI from "pixi.js";
import { SceneManager } from "../core/SceneManager";
import { GameScene } from "./GameScene";
import { GameStyle } from "../core/GameStyle";
import { Button } from "../components/ui/Button";

export class LobbyScene extends PIXI.Container {
    constructor(app: PIXI.Application) {
        super();

        const title = new PIXI.Text({
            text: 'Waiting for player...',
            style: GameStyle.Instance.basicTextStyle,
            x: 200,
            y: 200,
        });
        this.addChild(title);

        const playButton = new Button({
            text: "Start game",
            x: 200,
            y: 400
        });

        playButton.interactive = true;
        playButton.eventMode = 'static';
        playButton.cursor = 'pointer';

        playButton.on('pointerdown', () => {
            SceneManager.changeScene(new GameScene(app));
        });

        this.addChild(playButton);
    }
}