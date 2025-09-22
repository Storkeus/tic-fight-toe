import IDirection from "./IDirection";

export default class Right implements IDirection {
    public oppositeDirection!: IDirection;

    getCoordinatesForGoingOneStep(positionX: number, positionY: number): { x: number; y: number; } {
        return {x: positionX + 1, y: positionY}
    }
}