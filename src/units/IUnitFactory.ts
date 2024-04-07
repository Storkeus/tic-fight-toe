import BoardScene from "~/scenes/BoardScene";
import IUnit from "./IUnit";

export default interface IUnitFactory {
    createUnit(scene: BoardScene, x: number, y: number): IUnit;
}