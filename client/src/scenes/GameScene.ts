import * as PIXI from "pixi.js";

export class GameScene extends PIXI.Container {
    private player : PIXI.Graphics;

    constructor() {
        super();

        this.player = new PIXI.Graphics()
            .circle(0, 0, 30)
            .fill(0xffffff);
        this.player.x = 400;
        this.player.y = 300;
        this.addChild(this.player);
        console.log('game scene');

        this.addEventListeners();
    }

    public addEventListeners(){
		window.addEventListener("keydown", this.downHandler.bind(this), false);
		window.addEventListener("keyup", this.upHandler.bind(this), false);
	}

    private downHandler(event:KeyboardEvent) {
		if (event.key === "ArrowRight") {
			//MOVE RIGHT
		}
		if (event.key === "ArrowDown") {
			//MOVE DOWN
		}
	}

	private upHandler(event:KeyboardEvent) {
		if (event.key === "ArrowRight") {
			//STOP MOVING RIGHT
		}
		if (event.key === "ArrowDown") {
			//MOVE DOWN
		}
	}
}