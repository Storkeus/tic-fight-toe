import type { Players } from "../../Players";
import type IUnitFactory from "../unitFactory/IUnitFactory";
import type ISelectableUnit from "./ISelectableUnit";

export default abstract class ASelectableUnit implements ISelectableUnit
{
    private unitCount: number = 0;
    private player: Players;

    constructor(player: Players) {
        this.player = player;
    }
    abstract cost: number;

    abstract getUnitFactory(): IUnitFactory;
    abstract getTextureName(): string;

    getUnitCount(): number {
        return this.unitCount;
    }

    incrementUnitCount(): void {
        this.unitCount++;
    }

    decrementUnitCount(): void {
        this.unitCount--;
    }

    getPlayer(): Players {
        return this.player;
    }
}