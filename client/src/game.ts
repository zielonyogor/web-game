import * as PIXI from 'pixi.js';
import { SceneManager } from './core/SceneManager';
import { GameStyle } from './core/GameStyle';
import "./style.css";
import { GameScene } from './scenes/GameScene';
import { NetworkManager } from './net/NetworkManager';
import { MessageType } from '@shared/Message';
import getCookie from '@shared/cookie';


await document.fonts.ready;

export async function initGame() {
  const app = new PIXI.Application();
  (window as any).__PIXI_APP__ = app;
  
  await app.init({
    background: 0x1099bb, 
    width: GameStyle.screenDimension.x, 
    height: GameStyle.screenDimension.y
  });

  const appDiv = document.getElementById("app");
  if(!appDiv) return;

  appDiv.innerHTML = "";
  appDiv.appendChild(app.canvas);
  await preload();
  
  SceneManager.init(app);
  SceneManager.changeScene(new GameScene(app));

  const nickname = getCookie("nickname");
  const code = getCookie("code");
  

  NetworkManager.send({
    type: MessageType.PlayerLoaded,
    payload: {
      playerId: nickname,
      code,
    }
  });
  
}

async function preload() {
  const assets = [
      //{ alias: 'background', src: 'https://pixijs.com/assets/tutorials/fish-pond/pond_background.jpg' },
      { alias: 'player', src: '/public/assets/images/player.png' },
      { alias: 'wall', src: '/public/assets/images/wall_tile.png' }
    ];
  
  await PIXI.Assets.load(assets);
}