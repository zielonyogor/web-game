import * as PIXI from 'pixi.js';
import { SceneManager } from './core/SceneManager';
import { TitleScene } from './scenes/TitleScene';
import { GameStyle } from './core/GameStyle';
import "./style.css";
import { NetworkManager } from './net/NetworkManager';
import { GameScene } from './scenes/GameScene';

const app = new PIXI.Application();


(window as any).__PIXI_APP__ = app;

(async () => {
    await app.init({
      background: 0x1099bb, 
      width: GameStyle.screenDimension.x, 
      height: GameStyle.screenDimension.y
    });

    document.body.appendChild(app.canvas);

    NetworkManager.connect();
    
    SceneManager.init(app);
    SceneManager.changeScene(new TitleScene(app));
    //SceneManager.changeScene(new GameScene(app));
})()
