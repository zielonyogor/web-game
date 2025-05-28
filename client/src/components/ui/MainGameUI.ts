import * as PIXI from "pixi.js";
import { GameStyle } from "../../core/GameStyle";

export class MainGameUI extends PIXI.Container {
    private timeText : PIXI.Text;
    
    constructor() {
        super({
            width: GameStyle.screenDimension.x,
            height: GameStyle.screenDimension.y,
            x: 0,
            y: 0,
        });

        this.timeText = new PIXI.Text({
            text: 'Time: 00.00',
            style: GameStyle.Instance.basicTextStyle,
            x: 0,
            y: 0,
        });
        this.addChild(this.timeText);
    }
}