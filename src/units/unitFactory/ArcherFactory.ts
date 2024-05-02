import Archer from "../unit/Archer";
import BoardScene from "../../scenes/BoardScene";
import IUnitFactory from "./IUnitFactory";
import AUnitFactory from "./AUnitFactory";
import AUnit from "../unit/AUnit";

export default class ArcherFactory extends AUnitFactory implements IUnitFactory {
    protected createSpecificUnit(scene: BoardScene, x: number = -100, y: number = -100 ): AUnit {
        return new Archer(this.player.playerNumber, scene, x, y);
    }
}