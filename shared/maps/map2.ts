import { MapLayout } from "./Map";

export const map2 = {
  id: "map2",
  spawnpoint: {
    x: 80,
    y: 80,
  },
  finishpoint: {
    x: 780,
    y: 540,
  },
  objects: [
    ...Array.from({ length: 18 }, (_, i) => ({
      type: "wall",
      position: { x: i * 48 + 24, y: 24 },
    })),
    ...Array.from({ length: 18 }, (_, i) => ({
      type: "wall",
      position: { x: i * 48 + 24, y: 622 - 24 },
    })),
    ...Array.from({ length: 12 }, (_, i) => ({
      type: "wall",
      position: { x: 24, y: i * 48 + 24 },
    })),
    ...Array.from({ length: 12 }, (_, i) => ({
      type: "wall",
      position: { x: 864 - 24, y: i * 48 + 24 },
    })),

    { type: "wall", position: { x: 168, y: 252 } },
    { type: "wall", position: { x: 216, y: 252 } },
    { type: "wall", position: { x: 264, y: 252 } },
    { type: "wall", position: { x: 312, y: 252 } },
    { type: "wall", position: { x: 360, y: 252 } },

    { type: "wall", position: { x: 360, y: 300 } },
    { type: "wall", position: { x: 360, y: 348 } },
    { type: "wall", position: { x: 360, y: 396 } },

    { type: "wall", position: { x: 408, y: 396 } },
    { type: "wall", position: { x: 456, y: 396 } },
    { type: "wall", position: { x: 504, y: 396 } },
    { type: "wall", position: { x: 552, y: 396 } },

    { type: "wall", position: { x: 552, y: 348 } },
    { type: "wall", position: { x: 552, y: 300 } },
    { type: "wall", position: { x: 552, y: 252 } },

    { type: "wall", position: { x: 600, y: 252 } },
    { type: "wall", position: { x: 648, y: 252 } },
    { type: "wall", position: { x: 696, y: 252 } },
    { type: "wall", position: { x: 744, y: 252 } },

    { type: "obstacle", position: { x: 240, y: 100 } },
    { type: "obstacle", position: { x: 408, y: 160 } },
    { type: "obstacle", position: { x: 660, y: 380 } },
    { type: "obstacle", position: { x: 720, y: 500 } },
  ],
} as MapLayout;