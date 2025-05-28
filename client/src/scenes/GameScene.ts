import * as PIXI from "pixi.js";
import { Player } from "../components/game/Player";
import { MainGameUI } from "../components/ui/MainGameUI";
import { PlayerMovementController } from "../utils/PlayerMovementController";

export class GameScene extends PIXI.Container {
    private player : Player;
	private playerMovement: PlayerMovementController;
	public mainGameUI : MainGameUI;

    constructor(app: PIXI.Application) {
        super();


        this.player = new Player(100, 100); 
        this.addChild(this.player);
		this.playerMovement = new PlayerMovementController(this.player);

		this.mainGameUI = new MainGameUI();
		this.addChild(this.mainGameUI);

		app.ticker.add(delta => this.update(delta.deltaTime));
    }

	private update(deltaTime: number) {
		this.playerMovement.update(deltaTime);
	}
}