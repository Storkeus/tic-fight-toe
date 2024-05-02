import BoardScene from "../../scenes/BoardScene";
import AUnit from "../unit/AUnit";

export default interface IUnitFactory {
    createUnit(scene: BoardScene, x: number, y: number): AUnit | null;
    decrementUnitCount(): void;
}