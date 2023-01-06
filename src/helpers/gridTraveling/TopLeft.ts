import BottomRight from "./BottomRight";
import IDirection from "./IDirection";

export default class TopLeft implements IDirection {
    public get oppositeDirection(): IDirection {
        return new BottomRight();
    }
    getCoordinatesForGoingOneStep(positionX: number, positionY: number): { x: number; y: number; } {
        return {x: positionX - 1, y: positionY + 1}
    }
}