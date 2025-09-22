import IBoardScene from "../../scenes/IBoardScene";
import type AUnit from "../unit/AUnit";
import Peasant from "../unit/Peasant";
import AUnitFactory from "./AUnitFactory";
import type IUnitFactory from "./IUnitFactory";

export default class PeasantFactory extends AUnitFactory implements IUnitFactory {
    protected createSpecificUnit(scene: IBoardScene, x: number = -100, y: number = -100 ): AUnit {
        return new Peasant(this.playerNumber, scene, x, y);
    }
}