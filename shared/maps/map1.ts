import { MapLayout } from "./Map";

export const map1 = {
    id: "map1",
    spawnpoint: {
        x: 50,
        y: 100,
    },
    finishpoint: {
        x: 500,
        y: 500,
    },
    objects:[
        {
            type: "wall",
            position: {
                x: 200,
                y: 200
            },
        },
        {
            type: "wall",
            position: {
                x: 200,
                y: 150
            },
        },
        {
            type: "obstacle",
            position: {
                x: 400,
                y: 500
            },
        }
    ]
} as MapLayout;