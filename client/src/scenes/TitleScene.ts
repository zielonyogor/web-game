import * as PIXI from "pixi.js";
import { SceneManager } from "../core/SceneManager";
import { GameStyle } from "../core/GameStyle";
import { Button } from "../components/ui/Button";
import { LobbyScene } from "./LobbyScene";

export class TitleScene extends PIXI.Container {
    constructor(app: PIXI.Application) {
        super();

        const title = new PIXI.Text({
            text: 'Game',
            style: GameStyle.Instance.basicTextStyle,
            x: 200,
            y: 200,
        });
        this.addChild(title);

        const playButton = new Button({
            text: "Host game",
            x: 200,
            y: 400
        });

        playButton.interactive = true;
        playButton.eventMode = 'static';
        playButton.cursor = 'pointer';

        playButton.on('pointerdown', () => {
            SceneManager.changeScene(new LobbyScene(app));
        });

        this.addChild(playButton);
    }
}