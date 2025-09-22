import IDirection from "./IDirection";

export default class Top implements IDirection {
    public oppositeDirection!: IDirection;

    getCoordinatesForGoingOneStep(positionX: number, positionY: number): { x: number; y: number; } {
        return {x: positionX, y: positionY + 1}
    }
}