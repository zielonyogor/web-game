import * as PIXI from "pixi.js";
import { Keyboard, type Key } from "./Keyboard";
import { GameStyle } from "../core/GameStyle";
import { Player } from "../components/game/Player";



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

    
    /**
     * little class to control the movement of a character and add movement boundaries
     * @param player - sprite of the player
     * @param mapRect - player movement boundaries
     * @param keys - the keys used to control the character in the order of top-right-down-left
     */
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


    /**
     * updates player velocity and makes sure it doesn't exceed the boundaries
     * @param deltaTime delta time 
     */
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

        let newPlayerX:number = this.player.x + this.velocityX;
        let newPlayerY:number = this.player.y + this.velocityY;

        if(newPlayerX < 0){
            newPlayerX = 0;
        }
        if(newPlayerX > this.mapRect.width){
            newPlayerX = this.mapRect.width;
        }
        if(newPlayerY < 0){
            newPlayerY = 0;
        }
        if(newPlayerY > this.mapRect.height){
            newPlayerY = this.mapRect.height;
        }

        if(this.player.x != newPlayerX || this.player.y != newPlayerY){
            this.player.rotation = Math.atan2(newPlayerY - this.player.y, newPlayerX - this.player.x);
        }

        this.player.x = newPlayerX;
        this.player.y = newPlayerY;
    }


    /**
     * returns the players position on the map
     */
    public getPlayerPosition():PIXI.Point{
        return new PIXI.Point(this.player.x, this.player.y);
    }
}