import type { Collider } from "../components/Collider";

export class ColliderManager {
    private static colliders: Collider[] = [];

    public static add(collider: Collider) {
        this.colliders.push(collider);
    }

    public static remove(collider: Collider) {
        this.colliders = this.colliders.filter(c => c !== collider);
    }

    public static willCollide(collider: Collider, newX: number, newY: number): boolean {
        const tempBounds = collider.bounds.clone();
        tempBounds.x = newX;
        tempBounds.y = newY;

        for (const other of this.colliders) {
            if (other === collider) continue;
            other.update();
            if (tempBounds.intersects(other.bounds) && !other.isTrigger) {
                return true;
            }   
        }
        return false;
    }

    public static checkTriggers(collider: Collider) {
        collider.update();
        
        for (const other of this.colliders) {
            if (other === collider) continue;
            other.update();

            if (collider.bounds.intersects(other.bounds) && other.isTrigger) {
                other.onTrigger?.(collider);
            }
        }
    }
}