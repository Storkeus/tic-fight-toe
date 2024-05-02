import Knight from "../unit/Knight";
import BoardScene from "../../scenes/BoardScene";
import IUnitFactory from "./IUnitFactory";
import AUnitFactory from "./AUnitFactory";
import AUnit from "../unit/AUnit";

export default class KnightFactory extends AUnitFactory implements IUnitFactory {
    protected createSpecificUnit(scene: BoardScene, x: number = -100, y: number = -100 ): AUnit {
        return new Knight(this.player.playerNumber, scene, x, y);
    }
}