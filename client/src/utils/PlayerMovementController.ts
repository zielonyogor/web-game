import * as PIXI from "pixi.js";
import { Keyboard, type Key } from "./Keyboard";
import { GameStyle } from "../core/GameStyle";
import { Player } from "../components/game/Player";
import { ColliderManager } from "../core/ColliderManager";
import { NetworkManager } from "../net/NetworkManager";
import * as Network from "@shared/Message";

export class PlayerMovementController {
    private player: Player;
    private mapRect: PIXI.Rectangle = new PIXI.Rectangle(0, 0, GameStyle.screenDimension.x, GameStyle.screenDimension.y);

    private keyManager: Keyboard = new Keyboard();
    private keyTop: Key;
    private keyRight: Key;
    private keyDown: Key;
    private keyLeft: Key;

    private inputX: number = 0;
    private inputY: number = 0;

    private velocityX: number = 0;
    private velocityY: number = 0;

    private speed: number = 3;
    private drag: number = 0.1;

    private sendInterval = 30; // ms
    private lastSentTime = 0;

    constructor(
        player: Player,
        keys: string[] = ["W", "D", "S", "A"]
    ) {
        this.player = player;

        this.keyTop = this.keyManager.addKey(
            keys[0],
            () => this.inputY = -1,
            () => this.inputY = this.keyDown.isDown ? 1 : 0
        );
        this.keyRight = this.keyManager.addKey(
            keys[1],
            () => this.inputX = 1,
            () => this.inputX = this.keyLeft.isDown ? -1 : 0
        );
        this.keyDown = this.keyManager.addKey(
            keys[2],
            () => this.inputY = 1,
            () => this.inputY = this.keyTop.isDown ? -1 : 0
        );
        this.keyLeft = this.keyManager.addKey(
            keys[3],
            () => this.inputX = -1,
            () => this.inputX = this.keyRight.isDown ? 1 : 0
        );
    }

    public disableInput() {
        this.keyManager.removeKey(this.keyTop);
        this.keyManager.removeKey(this.keyDown);
        this.keyManager.removeKey(this.keyRight);
        this.keyManager.removeKey(this.keyLeft);
        this.inputX = 0;
        this.inputY = 0;
        this.velocityX = 0;
        this.velocityY = 0;
    }

    public update(deltaTime: number) {
        this.lastSentTime += deltaTime * (1000 / 60);

        let moveX = this.inputX;
        let moveY = this.inputY;

        if (moveX !== 0 || moveY !== 0) {
            const length = Math.hypot(moveX, moveY);
            moveX = (moveX / length) * this.speed;
            moveY = (moveY / length) * this.speed;
        } else {
            this.velocityX *= this.drag;
            this.velocityY *= this.drag;

            if (Math.abs(this.velocityX) < 0.5) this.velocityX = 0;
            if (Math.abs(this.velocityY) < 0.5) this.velocityY = 0;

            moveX = this.velocityX;
            moveY = this.velocityY;
        }

        this.velocityX = moveX;
        this.velocityY = moveY;

        const newX = this.player.x + moveX;
        const newY = this.player.y + moveY;

        if (newX === this.player.x && newY === this.player.y) return;

        const withinBoundsX = newX >= 0 && newX <= this.mapRect.width;
        const withinBoundsY = newY >= 0 && newY <= this.mapRect.height;

        const blocked = ColliderManager.willCollide(this.player.collider, newX, newY);

        if (!blocked && withinBoundsX && withinBoundsY) {
            const rotation = Math.atan2(newY - this.player.y, newX - this.player.x);
            this.player.rotation = rotation;
            this.player.x = newX;
            this.player.y = newY;

            ColliderManager.checkTriggers(this.player.collider);

            if (this.lastSentTime >= this.sendInterval) {
                this.lastSentTime = 0;
                NetworkManager.send({
                    type: Network.MessageType.PlayerPositionUpdate,
                    payload: {
                        angle: rotation,
                        x: this.player.x,
                        y: this.player.y,
                    }
                });
            }
        }
    }

    public getPlayerPosition(): PIXI.Point {
        return new PIXI.Point(this.player.x, this.player.y);
    }
}