import * as PIXI from "pixi.js";
//import '../style.css';

const fontFamily = ["PixelFont", "sans-serif"];
export class GameStyle {
    private static _instance: GameStyle;

    public static readonly screenDimension : PIXI.Point = new PIXI.Point(864, 622);
    public basicTextStyle : PIXI.TextStyle;
    public buttonTextStyle : PIXI.TextStyle;
    public titleTextStyle : PIXI.TextStyle;

    public primaryColor : PIXI.Color;
    public secondaryColor : PIXI.Color;
    public teritaryColor : PIXI.Color;

    constructor() {
        this.primaryColor = new PIXI.Color(0x5eaa93);
        this.secondaryColor = new PIXI.Color(0x5eaa93);
        this.teritaryColor = new PIXI.Color(0x1A1423);

        this.basicTextStyle = new PIXI.TextStyle({
            fontSize: 40,
            fontFamily: fontFamily,
            align: "left",
            fill: this.primaryColor
        }); 

        this.buttonTextStyle = new PIXI.TextStyle({
            fontSize: 36,
            fontFamily: fontFamily,
            align: "center",
            fill: this.secondaryColor,
        });

        this.titleTextStyle = new PIXI.TextStyle({
            fontSize: 64,
            fontFamily: fontFamily,
            align: "center",
            fill: this.primaryColor,
        });
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}