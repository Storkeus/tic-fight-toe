export default interface IDirection {
    getCoordinatesForGoingOneStep(positionX: number, positionY: number) : {x: number, y: number};
    oppositeDirection: IDirection;
}