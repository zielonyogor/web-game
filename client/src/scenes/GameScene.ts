import * as PIXI from "pixi.js";
import { Player } from "../components/game/Player";
import { MainGameUI } from "../components/ui/MainGameUI";
import { PlayerMovementController } from "../utils/PlayerMovementController";
import { GameObject } from "../components/game/GameObject";
import { Obstacle } from "../components/game/Obstacle";
import { NetworkManager } from "../net/NetworkManager";
import type { MapLayout } from "@shared/maps/Map";
import { Scene } from "./Scene";
import * as Network from "@shared/Message";
import getCookie from "@shared/cookie";

export class GameScene extends Scene {
    private player!: Player;
	private playerSpawnpoint!: PIXI.Point;
	private playerMovement: PlayerMovementController | undefined;
	public mainGameUI : MainGameUI;

    constructor(app: PIXI.Application) {
        super(app);

		this.addChild(PIXI.Sprite.from('background'));
		
		this.mainGameUI = new MainGameUI();
		
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

		this.allObjects = [];
		
		this.addObjects(map);
		this.addFinish(map);
		this.addOtherPlayer();

		this.addChild(this.mainGameUI);
    }

	protected update(deltaTime: number) {
		super.update(deltaTime);
		this.playerMovement?.update(deltaTime);

		// this.allObjects.forEach(obj => {
		// 	obj.update(deltaTime);
		// });
	}

	private addObjects(map: MapLayout) {
		console.log(map);
		if(map.objects.length === 0) return;

		for (const obj of map.objects) {
			if(obj.type == 'wall') {
				const wall = new GameObject({
					id: obj.type,
					sprite: 'wall',
					x: obj.position.x,
					y: obj.position.y
				});
				this.addChild(wall);
				this.allObjects.push(wall);
			}
			else {
				const obstacle = new Obstacle({
					id: obj.type,
					sprite: 'obstacle',
					x: obj.position.x,
					y: obj.position.y
				});
				obstacle.collider.addOnTrigger((_) => {
					this.player.position = this.playerSpawnpoint;
				})
				this.addChild(obstacle);
				this.allObjects.push(obstacle);
			}
		}
	}

	private addFinish(map: MapLayout) {
		const finish = new GameObject({
			id: "finish_point",
			sprite: 'finish_point',
			x: map.finishpoint.x,
			y: map.finishpoint.y,
			isTrigger: true,
		});
		finish.collider.addOnTrigger(() => {
			const nickname = getCookie('nickname');
			NetworkManager.send({
				type: Network.MessageType.PlayerWon,
				payload: {
					id: nickname
				}
			})
		});
		this.addChild(finish);
		this.allObjects.push(finish);
	}

	private addOtherPlayer() {
		const otherPlayer = new GameObject({ 
			id: "otherplayer",
			sprite: 'player',
			x: this.playerSpawnpoint.x, 
			y: this.playerSpawnpoint.y, 
			isTrigger: true 
		});
		this.addChild(otherPlayer);
		this.allObjects.push(otherPlayer);
	}

	public manageData(data: Network.Message): void {
		if(data.type == Network.MessageType.PlayerPositionUpdate) {
			const otherPlayer = this.getObjectById("otherplayer");
			if(otherPlayer === undefined) {
				return;
			}
			otherPlayer.x = data.payload.x;
			otherPlayer.y = data.payload.y;
			otherPlayer.rotation = data.payload.angle;
		}
		else if(data.type == Network.MessageType.PlayerReady) {
			this.playerMovement = new PlayerMovementController(this.player);
			this.mainGameUI.changeTimer();
		}
		else if(data.type == Network.MessageType.TimeUpdate) {
			if(data.payload.time === undefined) return;
			this.mainGameUI.updateTime(data.payload.time);
		}
		else if(data.type == Network.MessageType.PlayerWon) {
			const nickname = getCookie('nickname');
			if(nickname === data.payload.id) {
				this.mainGameUI.showWin();
				this.playerMovement?.disableInput();
			}
			else {
				this.mainGameUI.showLost();
				this.playerMovement?.disableInput();
			}
		}
		else if(data.type === Network.MessageType.PlayerDisconnect) {
			this.mainGameUI.showPlayerDisconnected(data.payload.id);
		}
	}
}