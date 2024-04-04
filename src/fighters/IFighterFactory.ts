import BoardScene from "~/scenes/BoardScene";
import IFighter from "./IFighter";

export default interface IFighterFactory {
    createFighter(scene: BoardScene, x: number, y: number): IFighter;
}