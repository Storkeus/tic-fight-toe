import IDirection from "./IDirection";
import TopRight from "./TopRight";

export default class BottomLeft implements IDirection {
    public get oppositeDirection(): IDirection {
        return new TopRight();
    }
    getCoordinatesForGoingOneStep(positionX: number, positionY: number): { x: number; y: number; } {
        return {x: positionX - 1, y: positionY - 1}
    }
}