import * as PIXI from 'pixi.js';
import { SceneManager } from './core/SceneManager';
import { TitleScene } from './scenes/TitleScene';
import { GameStyle } from './core/GameStyle';
import { GameScene } from './scenes/GameScene';

const app = new PIXI.Application();

(async () => {
    await app.init({
      background: 0x1099bb, 
      width: GameStyle.screenDimension.x, 
      height: GameStyle.screenDimension.y
    });

    document.body.appendChild(app.canvas);
    
    SceneManager.init(app);
    //SceneManager.changeScene(new TitleScene(app));
    SceneManager.changeScene(new GameScene(app));
})()