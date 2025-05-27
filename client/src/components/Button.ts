// src/components/Button.ts
import * as PIXI from 'pixi.js';

export class Button extends PIXI.Container {
    private background: PIXI.Graphics;
    private textLabel: PIXI.Text;

    constructor(text: string, width = 200, height = 60, style : PIXI.TextStyle) {
        super();

        this.eventMode = 'static';
        this.cursor = 'pointer';

        this.background = new PIXI.Graphics()
            .roundRect(0, 0, width, height, 10)
            .fill(0xf5f5f5);

        this.addChild(this.background);

        this.textLabel = new PIXI.Text({
            text,
            style,
        });

        this.textLabel.anchor.set(0.5);
        this.textLabel.x = width / 2;
        this.textLabel.y = height / 2;
        this.addChild(this.textLabel);

    }

    public onClick(fn: () => void) {
        this.on('pointerdown', fn);
    }
}
