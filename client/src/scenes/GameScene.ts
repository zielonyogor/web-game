import * as PIXI from "pixi.js";
import { Player } from "../components/game/Player";

export class GameScene extends PIXI.Container {
    private player : Player;

    constructor() {
        super();

        this.player = new Player(100, 100); 
        this.addChild(this.player);

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