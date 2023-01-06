import IDirection from "./IDirection";
import Left from "./Left";

export default class Right implements IDirection {
    public get oppositeDirection(): IDirection {
        return new Left();
    }
    getCoordinatesForGoingOneStep(positionX: number, positionY: number): { x: number; y: number; } {
        return {x: positionX + 1, y: positionY}
    }
}