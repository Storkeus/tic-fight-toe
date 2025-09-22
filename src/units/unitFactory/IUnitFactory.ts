import IBoardScene from "../../scenes/IBoardScene";
import type AUnit from "../unit/AUnit";

export default interface IUnitFactory {
    unitCountIsLimited: boolean;
    unitCount: number;
    createUnit(scene: IBoardScene, x: number, y: number): AUnit | null;
    decrementUnitCount(): void;
}