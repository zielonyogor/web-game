import * as PIXI from "pixi.js";
import { GameObject, type GameObjectProps } from "./GameObject";

interface ObstacleProps extends Omit<GameObjectProps, 'isTrigger'> {
    speed?: number;
    points?: PIXI.Point[];
}

export class Obstacle extends GameObject {
    private points: Array<PIXI.Point>;
    private speed: number;
    private currentPoint: number;

     constructor({ speed = 3, points, ...props }: Omit<ObstacleProps, 'isTrigger'>) {
        super({
            ...props,
            isTrigger: true, // Always true
        });
        this.speed = speed;

        this.points = points ?? [];
        this.currentPoint = 0;

        this.addOnUpdate(this.moveAlongNamepoints);
    }

    private moveAlongNamepoints(deltaTime: number) {
        if (this.points.length === 0) return;

        const target = this.points[this.currentPoint];
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 1) {
            // Go to next point
            this.currentPoint = (this.currentPoint + 1) % this.points.length;
            return;
        }

        const vx = (dx / distance) * this.speed;
        const vy = (dy / distance) * this.speed;

        this.x += vx * deltaTime;
        this.y += vy * deltaTime; 
    }
}