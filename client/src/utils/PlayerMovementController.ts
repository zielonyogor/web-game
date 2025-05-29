import * as PIXI from "pixi.js";
import { Keyboard, type Key } from "./Keyboard";
import { GameStyle } from "../core/GameStyle";
import { Player } from "../components/game/Player";
import { ColliderManager } from "../core/ColliderManager";


export class PlayerMovementController{
    private player: Player;
    private mapRect: PIXI.Rectangle = new PIXI.Rectangle(0, 0, GameStyle.screenDimension.x, GameStyle.screenDimension.y);

    private keyManager:Keyboard = new Keyboard();
    private keyTop: Key;
    private keyRight: Key;
    private keyDown: Key;
    private keyLeft: Key;

    private velocityX: number = 0;
    private velocityY: number = 0;

    private speed: number = 3;
    private drag: number = 0.1;

    
    constructor(
        player: Player,  
        keys:string[] = ["W","D","S","A"]
    ){
        this.player = player;

        this.keyTop = this.keyManager.addKey(keys[0], this.keyTopPressed.bind(this));
        this.keyRight = this.keyManager.addKey(keys[1], this.keyRightPressed.bind(this));
        this.keyDown = this.keyManager.addKey(keys[2], this.keyDownPressed.bind(this));
        this.keyLeft = this.keyManager.addKey(keys[3], this.keyLeftPressed.bind(this));
    }

    private keyTopPressed(){
        this.velocityY = -this.speed;
    }

    private keyRightPressed(){
        this.velocityX = this.speed;
    }

    private keyDownPressed(){
        this.velocityY = this.speed;
    }

    private keyLeftPressed(){
        this.velocityX = -this.speed;
    }

    public update(deltaTime: number){
        if(this.velocityY != 0 && this.keyTop.isUp && this.keyDown.isUp){
            this.velocityY *= this.drag;
            if(Math.abs(this.velocityY) < .5){
                this.velocityY = 0;
            }
        }
        if(this.velocityX != 0 && this.keyRight.isUp && this.keyLeft.isUp){
            this.velocityX *= this.drag;

            if(Math.abs(this.velocityX) < .5){
                this.velocityX = 0;
            }
        }

        const newX = this.player.x + this.velocityX;
        const newY = this.player.y + this.velocityY;

        const withinBoundsX = newX >= 0 && newX <= this.mapRect.width;
        const withinBoundsY = newY >= 0 && newY <= this.mapRect.height;

        const blocked = ColliderManager.willCollide(this.player.collider, newX, newY);

        if (!blocked && withinBoundsX && withinBoundsY) {
            this.player.rotation = Math.atan2(newY - this.player.y, newX - this.player.x);
            this.player.x = newX;
            this.player.y = newY;
	        ColliderManager.checkTriggers(this.player.collider);
        }
    }


    public getPlayerPosition():PIXI.Point{
        return new PIXI.Point(this.player.x, this.player.y);
    }
}