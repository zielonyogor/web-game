import * as PIXI from "pixi.js";
import { Player } from "../components/game/Player";
import { MainGameUI } from "../components/ui/MainGameUI";
import { PlayerMovementController } from "../utils/PlayerMovementController";
import { Collider } from "../components/Collider";
import { ColliderManager } from "../core/ColliderManager";
import { NetworkManager } from "../net/NetworkManager";
import { GameObject } from "../components/game/GameObject";
import { Obstacle } from "../components/game/Obstacle";

export class GameScene extends PIXI.Container {
    private player : Player;
	private playerSpawnPoint: PIXI.Point;
	private playerMovement: PlayerMovementController;
	public mainGameUI : MainGameUI;

	private allObjects: Array<GameObject>;

    constructor(app: PIXI.Application) {
        super();
		NetworkManager.send("Hello!!!");

		this.playerSpawnPoint = new PIXI.Point(0,0);
        this.player = new Player(this.playerSpawnPoint); 
        this.addChild(this.player);
		this.playerMovement = new PlayerMovementController(this.player);

		this.mainGameUI = new MainGameUI();
		this.addChild(this.mainGameUI);

		this.allObjects = [];

		this.addWalls();
		this.addTeleporter();
		this.addObstacles();
		this.addOtherPlayer();

		app.ticker.add(delta => this.update(delta.deltaTime));
    }

	private update(deltaTime: number) {
		this.playerMovement.update(deltaTime);

		this.allObjects.forEach(obj => {
			obj.update(deltaTime);
		});
	}

	private addWalls() {
		const wall = new GameObject({ width: 60, height: 60, color: 0x888888, x: 300, y: 200 });
		this.addChild(wall);
		this.allObjects.push(wall);
	}
	
	private addTeleporter() {
		const tp = new GameObject({ width: 60, height: 60, color: 0x00ffff, x: 500, y: 300, isTrigger: true });
		tp.collider.addOnTrigger(() => {
			this.player.x = 100;
			this.player.y = 100;
			console.log("teleported!");
		});
		this.addChild(tp);
		this.allObjects.push(tp);
	}
	
	private addObstacles() {
		const ob1 = new Obstacle({points: [new PIXI.Point(550, 0), new PIXI.Point(550, 100)], width: 60, height: 60, color: 0x00ffff, x: 550, y: 10});
		ob1.collider.addOnTrigger(() => {
			this.player.position = this.playerSpawnPoint;
		});
		this.addChild(ob1);
		this.allObjects.push(ob1);
	}

	private addOtherPlayer() {
		const otherPlayer = new GameObject({ width: 60, height: 60, color: 0x888888, x: 0, y: 0 });
		otherPlayer.addOnUpdate((number) => {
			
		});

		this.addChild(otherPlayer);
		this.allObjects.push(otherPlayer);
	}
}