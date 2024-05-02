import UnitEventDTO from "./UnitEventDTO";

export default interface IUnitObserver {
    update(eventData: UnitEventDTO): void;
}