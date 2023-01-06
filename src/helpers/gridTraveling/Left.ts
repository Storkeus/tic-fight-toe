import IDirection from "./IDirection";
import Right from "./Right";

export default class Left implements IDirection {
    public get oppositeDirection(): IDirection {
        return new Right();
    }
    getCoordinatesForGoingOneStep(positionX: number, positionY: number): { x: number; y: number; } {
        return {x: positionX - 1, y: positionY}
    }
}