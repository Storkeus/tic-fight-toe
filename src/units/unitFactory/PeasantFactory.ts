import BoardScene from "../../scenes/BoardScene";
import AUnit from "../unit/AUnit";
import Peasant from "../unit/Peasant";
import AUnitFactory from "./AUnitFactory";
import IUnitFactory from "./IUnitFactory";

export default class PeasantFactory extends AUnitFactory implements IUnitFactory {
    protected createSpecificUnit(scene: BoardScene, x: number = -100, y: number = -100 ): AUnit {
        return new Peasant(this.player.playerNumber, scene, x, y);
    }
}