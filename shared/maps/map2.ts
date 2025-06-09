import { MapLayout } from "./Map";

export const map2 = {
    id: "map2",
    spawnpoint: {
        x: 30,
        y: 200,
    },
    finishpoint: {
        x: 780,
        y: 100,
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
                y: 152
            },
        },
        {
            type: "wall",
            position: {
                x: 200,
                y: 104
            },
        },
        {
            type: "wall",
            position: {
                x: 200,
                y: 56
            },
        },
        {
            type: "obstacle",
            position: {
                x: 300,
                y: 392
            },
        },
        {
            type: "wall",
            position: {
                x: 400,
                y: 344
            },
        },
        {
            type: "wall",
            position: {
                x: 400,
                y: 296
            },
        },
        {
            type: "wall",
            position: {
                x: 400,
                y: 248
            },
        },
        {
            type: "wall",
            position: {
                x: 400,
                y: 200
            },
        },
        {
            type: "wall",
            position: {
                x: 400,
                y: 152
            },
        },
        {
            type: "wall",
            position: {
                x: 400,
                y: 104
            },
        },
        {
            type: "obstacle",
            position: {
                x: 500,
                y: 100
            },
        }
    ]
} as MapLayout;