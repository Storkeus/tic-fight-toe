import IUnitFactory from "../unitFactory/IUnitFactory";
import IUnitObserver from "./IUnitObserver";
import UnitEventDTO from "./UnitEventDTO";

export default class UnitIsPlacedObserver implements IUnitObserver {

    private unitFactory: IUnitFactory;

    constructor (unitFactory: IUnitFactory) {
        this.unitFactory = unitFactory;
    }

    update(eventData: UnitEventDTO): void {
        if (eventData.eventName === UnitEventDTO.EVENT_NAME_UNIT_IS_PLACED_ON_BOARD) {
            this.unitFactory.decrementUnitCount();
        }
    }
}