import IDirection from "./IDirection";
import Top from "./Top";

export default class Bottom implements IDirection {
    public get oppositeDirection(): IDirection {
        return new Top();
    }
    getCoordinatesForGoingOneStep(positionX: number, positionY: number): { x: number; y: number; } {
        return {x: positionX, y: positionY - 1}
    }
   
}