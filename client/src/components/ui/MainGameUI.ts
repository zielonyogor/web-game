import * as PIXI from "pixi.js";
import { GameStyle } from "../../core/GameStyle";
import { Button } from "./Button";

export class MainGameUI extends PIXI.Container {
    private timeText: PIXI.Text;
    private isCountdown: boolean;
    
    constructor() {
        super({
            width: GameStyle.screenDimension.x,
            height: GameStyle.screenDimension.y,
            x: 0,
            y: 0,
        });

        this.isCountdown = true;

        this.timeText = new PIXI.Text({
            text: '',
            style: GameStyle.Instance.basicTextStyle,
            x: 0,
            y: 0,
        });
        this.timeText.anchor.set(0.5, 0.5);
        this.timeText.position = new PIXI.Point(GameStyle.screenDimension.x/2, GameStyle.screenDimension.y/2 - 100);
        this.addChild(this.timeText);

        const readyText = new PIXI.Text({
            text: 'Get ready',
            style: GameStyle.Instance.titleTextStyle,
            x: 0,
            y: 0,
        });
        readyText.anchor.set(0.5, 0.5);
        readyText.position = new PIXI.Point(GameStyle.screenDimension.x/2, GameStyle.screenDimension.y/2 - 200);
        this.addChild(readyText);
    }

    public updateTime(time: number) {
        this.timeText.text = this.isCountdown ? `${time}` : `Time: ${time}`;
    }

    public changeTimer() { //change from get ready to main game
        this.isCountdown = false;
        this.removeChildren();
        this.timeText = new PIXI.Text({
            text: '00.00',
            style: GameStyle.Instance.basicTextStyle,
            x: 20,
            y: 20,
        });
        this.addChild(this.timeText);
    }

    public showLost() {
        const lostText = new PIXI.Text({
            text: 'You lost',
            style: GameStyle.Instance.basicTextStyle,
        });
        lostText.anchor.set(0.5, 0.5);
        lostText.position = new PIXI.Point(GameStyle.screenDimension.x/2, GameStyle.screenDimension.y/2 - 100);
        this.addChild(lostText);
        
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

    public showWin() {
        const wonText = new PIXI.Text({
            text: `You won`,
            style: GameStyle.Instance.titleTextStyle,    
        });
        wonText.anchor.set(0.5, 0.5);
        wonText.position = new PIXI.Point(GameStyle.screenDimension.x/2, GameStyle.screenDimension.y/2 - 100);
        this.addChild(wonText);
        
        const newGameButton = new Button({
            text: "New match",
            width: 140,
            height: 50,
            x: 400,
            y: 300,
            style: GameStyle.Instance.buttonTextStyle,
        });
        newGameButton.onClick(newGame);

        this.addChild(newGameButton);
    }

    public showPlayerDisconnected(nickname: string) {
        const disconnectText = new PIXI.Text({
            text: `${nickname} has chicken out and disconnected`,
            style: GameStyle.Instance.titleTextStyle,    
        });
        disconnectText.anchor.set(0.5, 0.5);
        disconnectText.position = new PIXI.Point(GameStyle.screenDimension.x, GameStyle.screenDimension.y);
        this.addChild(disconnectText);
        
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
    window.location.reload();
}