import { MapLayout } from "./Map";

export const map1 = {
    id: "map1",
    spawnpoint: {
        x: 10,
        y: 100,
    },
    finishpoint: {
        x: 500,
        y: 500,
    },
    objects:[{
        type: "wall",
        position: {
            x: 200,
            y: 200
        },
    }]
} as MapLayout;