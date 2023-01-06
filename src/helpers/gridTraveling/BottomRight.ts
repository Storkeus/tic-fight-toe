import IDirection from "./IDirection";
import TopLeft from "./TopLeft";

export default class BottomRight implements IDirection {
    public get oppositeDirection(): IDirection {
        return new TopLeft();
    }
    getCoordinatesForGoingOneStep(positionX: number, positionY: number): { x: number; y: number; } {
        return {x: positionX + 1, y: positionY - 1}
    }
}