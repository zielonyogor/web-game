import * as PIXI from 'pixi.js';
import { SceneManager } from './core/SceneManager';
import { GameStyle } from './core/GameStyle';
import "./style.css";
import { GameScene } from './scenes/GameScene';
import { NetworkManager } from './net/NetworkManager';
import { MessageType } from '@shared/Message';
import getCookie from '@shared/cookie';

const app = new PIXI.Application();


(window as any).__PIXI_APP__ = app;

(async () => {
  await document.fonts.ready;

  await app.init({
    background: 0x1099bb, 
    width: GameStyle.screenDimension.x, 
    height: GameStyle.screenDimension.y
  });

  document.body.appendChild(app.canvas);
  
  SceneManager.init(app);
  SceneManager.changeScene(new GameScene(app));

  const nickname = getCookie("nickname");
  const code = getCookie("code");
  // if(code === null) {
  //   document.location.href = '/';
  //   return;
  // }

  NetworkManager.send({
    type: MessageType.PlayerLoaded,
    payload: {
      playerId: nickname,
      code,
    }
  });
  
})();
