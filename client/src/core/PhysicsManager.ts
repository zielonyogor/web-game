import type { Collider } from "../components/Collider";

export class PhysicsManager {
    private static _instance: PhysicsManager;

    private colliders: Array<Collider>;

    constructor() {
        this.colliders = new Array();
    }

    public addCollider(collider: Collider) {
        this.colliders.push(collider);
    }

    public update(deltaTime: number) {

    }

    public static get Instance() {
        return this._instance;
    }
}