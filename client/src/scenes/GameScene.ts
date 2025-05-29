import * as PIXI from "pixi.js";
import { Player } from "../components/game/Player";
import { MainGameUI } from "../components/ui/MainGameUI";
import { PlayerMovementController } from "../utils/PlayerMovementController";
import { Collider } from "../components/Collider";
import { ColliderManager } from "../core/ColliderManager";

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

		this.addWalls();
		this.addTeleporter();

		app.ticker.add(delta => this.update(delta.deltaTime));
    }

	private update(deltaTime: number) {
		this.playerMovement.update(deltaTime);
	}

	private addWalls() {
		const wall = new PIXI.Graphics().rect(0, 0, 60, 60).fill(0x888888);
		wall.x = 300;
		wall.y = 200;
		this.addChild(wall);

		const wallCollider = new Collider({ parent: wall });
		ColliderManager.add(wallCollider);
	}

	 private addTeleporter() {
		const tp = new PIXI.Graphics().rect(0, 0, 60, 60).fill(0x00ffff);
		tp.x = 500;
		tp.y = 300;
		this.addChild(tp);

		const tpCollider = new Collider({ parent: tp, isTrigger: true });
		tpCollider.addOnTrigger((other) => {
			this.player.x = 100;
			this.player.y = 100;
			console.log("test");
		});

		ColliderManager.add(tpCollider);
	}
}