import { Players } from "../Players";
import Tile from "../Tile";

export default interface IUnit {
    setPosition(x: number, y: number): void;
    getPlayer(): Players;
    findTargets(grid: Array<Array<Tile>>, startX: number, startY: number): number;
    remove(): void;
    removeInteractive(): void;
    getDescription(): string;
    getTextureNameForPlayer(playerNumber: integer): string;
    isOnBoard: boolean;
}