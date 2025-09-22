import type IUnitFactory from "./IUnitFactory";
import UnitIsPlacedObserver from "../unitObserver/UnitIsPlacedObserver";
import type AUnit from "../unit/AUnit";
import type { Players } from "../../Players";
import IBoardScene from "../../scenes/IBoardScene";

export default abstract class AUnitFactory implements IUnitFactory {

    playerNumber: Players;
    unitCount: number;
    unitCountIsLimited: boolean;
    unitIsPlacedObserver: UnitIsPlacedObserver;
    
    constructor(playerNumber: Players, unitCount: number = 0) {
        this.playerNumber = playerNumber;
        this.unitCount = unitCount;
        this.unitCountIsLimited = this.unitCount !== 0;
        this.unitIsPlacedObserver = new UnitIsPlacedObserver(this);
    }

    decrementUnitCount(): void {
        if (this.unitCountIsLimited) {
            this.unitCount--;
        }
    }

    createUnit(scene: IBoardScene, x: number = -100, y: number = -100 ): AUnit | null {
         if (!this.unitCountIsLimited || this.unitCount > 0) {
            const unit = this.createSpecificUnit(scene, x, y);
            unit.attach(this.unitIsPlacedObserver);
            return unit;
         } else {
            return null;
         }
    }

    protected abstract createSpecificUnit(_scene: IBoardScene, _x: number, _y: number): AUnit
}