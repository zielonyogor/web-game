// src/components/Button.ts
import * as PIXI from 'pixi.js';
import { GameStyle } from '../../core/GameStyle';

interface ButtonProps {
    text?: string, 
    width?: number, 
    height?: number, 
    style?: PIXI.TextStyle,
    x?: number,
    y?: number,
};

export class Button extends PIXI.Container {
    private background: PIXI.Graphics;
    private textLabel: PIXI.Text;

    constructor({
        text,
        width = 200,
        height = 60,
        x, y,
        style = GameStyle.Instance.buttonTextStyle
    } : ButtonProps) {
        super();

        this.eventMode = 'static';
        this.cursor = 'pointer';

        this.background = new PIXI.Graphics()
            .roundRect(0, 0, width, height, 10)
            .fill(GameStyle.Instance.teritaryColor);

        this.addChild(this.background);

        this.textLabel = new PIXI.Text({
            text,
            style,
        });

        this.textLabel.anchor.set(0.5);
        this.textLabel.x = width / 2;
        this.textLabel.y = height / 2;
        this.addChild(this.textLabel);

        this.x = x ?? 0;
        this.y = y ?? 0;
    }

    public onClick(fn: () => void) {
        this.on('pointerdown', fn);
    }
}
