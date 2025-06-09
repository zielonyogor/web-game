import * as PIXI from 'pixi.js';
import { SceneManager } from './core/SceneManager';
import { GameStyle } from './core/GameStyle';
import "./style.css";
import { GameScene } from './scenes/GameScene';
import { NetworkManager } from './net/NetworkManager';
import { MessageType } from '@shared/Message';



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
  
  NetworkManager.send({
    type: MessageType.PlayerReady,
    payload: {}
  });
}

async function preload() {
  const assets = [
      { alias: 'background', src: '/assets/images/background.png' },
      { alias: 'player', src: '/assets/images/player.png' },
      { alias: 'wall', src: '/assets/images/wall_tile.png' },
      { alias: 'obstacle', src: '/assets/images/obstacle.png' },
      { alias: 'finish_point', src: '/assets/images/finish_point.png' }
    ];
  await PIXI.Assets.load(assets);
}