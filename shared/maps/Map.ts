export interface MapLayout {
    id: string,
    spawnpoint: {
        x: number,
        y: number
    },
    finishpoint: {
        x: number,
        y: number
    },
    objects:{
        type: string,
        position: {
            x: number,
            y: number
        },
        data?: any,
    }[]
}