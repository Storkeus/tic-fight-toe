import BoardScene from "../../scenes/BoardScene";
import IUnitFactory from "./IUnitFactory";
import Player from "../../Player";
import UnitIsPlacedObserver from "../unitObserver/UnitIsPlacedObserver";
import AUnit from "../unit/AUnit";

export default abstract class AUnitFactory implements IUnitFactory {

    player: Player;
    unitCount: number;
    unitCountIsLimited: boolean;
    unitIsPlacedObserver: UnitIsPlacedObserver;
    
    constructor(player: Player, unitCount: number = 0) {
        this.player = player;
        this.unitCount = unitCount;
        this.unitCountIsLimited = this.unitCount !== 0;
        this.unitIsPlacedObserver = new UnitIsPlacedObserver(this);
    }

    decrementUnitCount(): void {
        if (this.unitCountIsLimited) {
            this.unitCount--;
        }
    }

    createUnit(scene: BoardScene, x: number = -100, y: number = -100 ): AUnit | null {
         if (!this.unitCountIsLimited || this.unitCount > 0) {
            const unit = this.createSpecificUnit(scene, x, y);
            unit.attach(this.unitIsPlacedObserver);
            return unit;
         } else {
            return null;
         }
    }

    protected abstract createSpecificUnit(_scene: BoardScene, _x: number, _y: number): AUnit
}