import Bottom from "./Bottom";
import IDirection from "./IDirection";

export default class Top implements IDirection {
    public get oppositeDirection(): IDirection {
        return new Bottom();
    }
    getCoordinatesForGoingOneStep(positionX: number, positionY: number): { x: number; y: number; } {
        return {x: positionX, y: positionY + 1}
    }
}