import * as PIXI from "pixi.js";
import { SceneManager } from "../core/SceneManager";
import { GameScene } from "./GameScene";
import { GameStyle } from "../core/GameStyle";

export class TitleScene extends PIXI.Container {
    constructor() {
        super();

        const style = new PIXI.TextStyle({
            fill: '#ff00ff',
            fontSize: 32,
            align: "center"
        });

        const title = new PIXI.Text({
            text: 'GAME',
            style: GameStyle.Instance.basicTextStyle,
            x: 200,
            y: 200,
        });
        this.addChild(title);

        const playButton = new PIXI.Text({
            text: 'PLAY',
            style: style,
            x: 200,
            y: 400,
        });

        playButton.interactive = true;
        playButton.eventMode = 'static';
        playButton.cursor = 'pointer';

        playButton.on('pointerdown', () => {
            SceneManager.changeScene(new GameScene());
        });

        this.addChild(playButton);
    }
}