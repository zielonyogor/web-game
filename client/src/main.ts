import * as PIXI from 'pixi.js';

const app = new PIXI.Application();

(async () => {
    await app.init({
      background: '#1099bb', 
      width: 800, 
      height: 600
    });

    document.body.appendChild(app.canvas);
})()