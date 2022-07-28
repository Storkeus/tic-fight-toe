import { Players } from "~/Players";
import Tile from "~/Tile";

export default interface IFighter {
    setPosition(x: number, y: number): void;
    getPlayer(): Players;
}