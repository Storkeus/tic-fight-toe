import type IUnitObserver from "./IUnitObserver";

export default interface IObservableUnit {
    attach(observer: IUnitObserver): void;
    detach(observer: IUnitObserver): void;
    notify(): void;
}