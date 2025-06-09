import * as PIXI from "pixi.js";
import { GameStyle } from "../../core/GameStyle";
import { Button } from "./Button";

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

    public updateTime(time: number) {
        this.timeText.text = `Time: ${time}`;
    }

    public showLost() {
        const lostText = new PIXI.Text({
            text: 'You lost',
            style: GameStyle.Instance.basicTextStyle,
            x: 400,
            y: 220,
        });
        this.addChild(lostText);

        const newGameButton = new Button({
            text: "New match",
            width: 100,
            height: 100,
            x: 400,
            y: 150,
            style: GameStyle.Instance.buttonTextStyle,
        })
        newGameButton.onClick(newGame);
        
        this.addChild(newGameButton);
    }
    public showWin() {
        const wonText = new PIXI.Text({
            text: 'You won',
            style: GameStyle.Instance.basicTextStyle,
            x: 400,
            y: 220,
        });
        this.addChild(wonText);
        
        const newGameButton = new Button({
            text: "New match",
            width: 140,
            height: 50,
            x: 400,
            y: 150,
            style: GameStyle.Instance.buttonTextStyle,
        });
        newGameButton.onClick(newGame);

        this.addChild(newGameButton);
    }
}

function newGame() {
    console.log("new game");
    window.location.reload();
}