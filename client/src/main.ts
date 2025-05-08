import * as PIXI from 'pixi.js';
import { SceneManager } from './core/SceneManager';
import { TitleScene } from './scenes/TitleScene';

const app = new PIXI.Application();

(async () => {
    await app.init({
      background: '#1099bb', 
      width: 800, 
      height: 600
    });

    document.body.appendChild(app.canvas);
    
    SceneManager.init(app);
    SceneManager.changeScene(new TitleScene());
})()