import Knight from "../unit/Knight";
import type IUnitFactory from "./IUnitFactory";
import AUnitFactory from "./AUnitFactory";
import type AUnit from "../unit/AUnit";
import IBoardScene from "../../scenes/IBoardScene";

export default class KnightFactory extends AUnitFactory implements IUnitFactory {
    protected createSpecificUnit(scene: IBoardScene, x: number = -100, y: number = -100 ): AUnit {
        return new Knight(this.playerNumber, scene, x, y);
    }
}