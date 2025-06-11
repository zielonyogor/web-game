import { MapLayout } from "./Map";

export const map3 = {
  id: "map3",
  spawnpoint: {
    x: 80,
    y: 80,
  },
  finishpoint: {
    x: 780,
    y: 552,
  },
  objects: [
    ...Array.from({ length: 18 }, (_, i) => ({ // top border
      type: "wall",
      position: { x: i * 48 + 24, y: 24 }
    })),
    ...Array.from({ length: 12 }, (_, i) => ({ // left border
      type: "wall",
      position: { x: 24, y: i * 48 + 24 }
    })),
    ...Array.from({ length: 12 }, (_, i) => ({ // right border
      type: "wall",
      position: { x: 840, y: i * 48 + 24 }
    })),
    ...Array.from({ length: 18 }, (_, i) => ({ // bottom border
      type: "wall",
      position: { x: i * 48 + 24, y: 598 }
    })),

    { type: "wall", position: { x: 168, y: 168 } },
    { type: "wall", position: { x: 168, y: 216 } },
    { type: "wall", position: { x: 168, y: 312 } },
    { type: "wall", position: { x: 168, y: 360 } },
    { type: "wall", position: { x: 168, y: 408 } },
    { type: "wall", position: { x: 168, y: 456 } },
    { type: "obstacle", position: { x: 168, y: 504 } },

    { type: "wall", position: { x: 168, y: 264 } },
    { type: "wall", position: { x: 216, y: 264 } },
    { type: "wall", position: { x: 264, y: 264 } },
    { type: "wall", position: { x: 312, y: 264 } },
    { type: "wall", position: { x: 360, y: 264 } },
    { type: "obstacle", position: { x: 408, y: 264 } },
    { type: "wall", position: { x: 456, y: 264 } },
    { type: "wall", position: { x: 504, y: 264 } },
    { type: "wall", position: { x: 552, y: 264 } },

    { type: "wall", position: { x: 312, y: 72 } },
    { type: "wall", position: { x: 312, y: 120 } },

    { type: "wall", position: { x: 600, y: 120 } },
    { type: "wall", position: { x: 648, y: 120 } },
    { type: "wall", position: { x: 696, y: 120 } },
    { type: "wall", position: { x: 696, y: 168 } },
    { type: "wall", position: { x: 696, y: 216 } },
    { type: "wall", position: { x: 600, y: 216 } },

    { type: "obstacle", position: { x: 408, y: 360 } },
    { type: "obstacle", position: { x: 456, y: 360 } },
    { type: "obstacle", position: { x: 504, y: 360 } },

    { type: "wall", position: { x: 744, y: 504 } },
    { type: "wall", position: { x: 696, y: 504 } },
    { type: "wall", position: { x: 792, y: 504 } },
    { type: "obstacle", position: { x: 672, y: 456 } },
  ]
} as MapLayout;
