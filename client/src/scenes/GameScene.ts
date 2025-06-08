import * as PIXI from "pixi.js";
import { Player } from "../components/game/Player";
import { MainGameUI } from "../components/ui/MainGameUI";
import { PlayerMovementController } from "../utils/PlayerMovementController";
import { GameObject } from "../components/game/GameObject";
import { Obstacle } from "../components/game/Obstacle";
import { NetworkManager } from "../net/NetworkManager";
import type { MapLayout } from "@shared/maps/Map";
import { Scene } from "./Scene";

export class GameScene extends Scene {
    private player!: Player;
	private playerSpawnpoint!: PIXI.Point;
	private playerMovement!: PlayerMovementController;
	public mainGameUI : MainGameUI;

    constructor(app: PIXI.Application) {
        super(app);

		this.mainGameUI = new MainGameUI();
		this.addChild(this.mainGameUI);

		const mapJSON = sessionStorage.getItem('loadedMap');
		if (!mapJSON) {
			console.error("No map loaded from sessionStorage");
			return;
		}
		const map: MapLayout = JSON.parse(mapJSON);

		this.playerSpawnpoint = new PIXI.Point(
			map.spawnpoint.x,
			map.spawnpoint.y,
		);
        this.player = new Player(this.playerSpawnpoint); 
        this.addChild(this.player);
		this.playerMovement = new PlayerMovementController(this.player);


		this.allObjects = [];

		this.addObjects(map);
		this.addFinish(map);
		this.addOtherPlayer();
    }

	protected update(deltaTime: number) {
		super.update(deltaTime);
		this.playerMovement.update(deltaTime);

		this.allObjects.forEach(obj => {
			obj.update(deltaTime);
		});
	}

	private addObjects(map: MapLayout) {
		console.log(map);
		if(map.objects.length === 0) return;

		for (const obj of map.objects) {
			const wall = new GameObject({
				id: obj.type,
				width: 40,
				height: 40,
				color: 0x888888,
				x: obj.position.x,
				y: obj.position.y
			});
			this.addChild(wall);
			this.allObjects.push(wall);
		}
	}

	private addFinish(map: MapLayout) {
		const finish = new GameObject({
			id: "finishpoint",
			width: 60,
			height: 60,
			color: 0x00ff00,
			x: map.finishpoint.x,
			y: map.finishpoint.y,
			isTrigger: true,
		});
		finish.collider.addOnTrigger(() => {
			console.log("You win!");
		});
		this.addChild(finish);
		this.allObjects.push(finish);
	}

	private addOtherPlayer() {
		const otherPlayer = new GameObject({ 
			id: "otherplayer",
			width: 60, 
			height: 60, 
			color: 0x888888, 
			x: 0, 
			y: 0, 
			isTrigger: true 
		});
		this.addChild(otherPlayer);
		this.allObjects.push(otherPlayer);
	}
}