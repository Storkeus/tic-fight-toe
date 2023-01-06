import BottomLeft from "./BottomLeft";
import IDirection from "./IDirection";

export default class TopRight implements IDirection {
    public get oppositeDirection(): IDirection {
        return new BottomLeft();
    }
    getCoordinatesForGoingOneStep(positionX: number, positionY: number): { x: number; y: number; } {
        return {x: positionX + 1, y: positionY + 1}
    }
}