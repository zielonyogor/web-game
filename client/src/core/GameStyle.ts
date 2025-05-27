import * as PIXI from "pixi.js";
import '../style.css';


export class GameStyle {
    private static _instance: GameStyle;

    public basicTextStyle : PIXI.TextStyle;
    public mainColor : PIXI.Color;

    constructor() {
        this.mainColor = new PIXI.Color('0x0000ff');

        this.basicTextStyle = new PIXI.TextStyle({
            fontSize: 36,
            align: "left",
            fontFamily: ["PixelFont", "sans-serif"],
            fill: this.mainColor
        }); 
    }

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }
}