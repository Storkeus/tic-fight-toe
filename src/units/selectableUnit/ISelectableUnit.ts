import type { Players } from "../../Players";
import type IUnitFactory from "../unitFactory/IUnitFactory";

export default interface ISelectableUnit {
    getUnitFactory(): IUnitFactory
    getUnitCount(): number
    incrementUnitCount(): void
    decrementUnitCount(): void
    getPlayer(): Players
    cost: number;
    getTextureName(): string;
}