import * as PIXI from "pixi.js";
import '../style.css';

const fontFamily = ["PixelFont", "sans-serif"];
export class GameStyle {
    private static _instance: GameStyle;

    public static readonly screenDimension : PIXI.Point = new PIXI.Point(800, 600);
    public basicTextStyle : PIXI.TextStyle;
    public buttonTextStyle : PIXI.TextStyle;

    public primaryColor : PIXI.Color;
    public secondaryColor : PIXI.Color;

    constructor() {
        this.primaryColor = new PIXI.Color(0x0000ff);
        this.secondaryColor = new PIXI.Color(0xffffff);

        this.basicTextStyle = new PIXI.TextStyle({
            fontSize: 36,
            fontFamily: fontFamily,
            align: "left",
            fill: this.primaryColor
        }); 

        this.buttonTextStyle = new PIXI.TextStyle({
            fontSize: 32,
            fontFamily: fontFamily,
            align: "center",
            fill: this.secondaryColor,
        });
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}