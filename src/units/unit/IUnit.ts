import type { Players } from "../../Players";
import type Tile from "../../Tile";

export default interface IUnit {
    setPosition(x: number, y: number): void;
    getPlayer(): Players;
    findTargets(grid: Array<Array<Tile>>, startX: number, startY: number): number;
    remove(): void;
    removeInteractive(): void;
    getDescription(): string;
    getTextureNameForPlayer(playerNumber: integer): string;
    putOnBoard(x: number, y: number): void;
    isOnBoard: boolean;
    canUseAbility(): boolean;
    noteAbilityUsage(): void;
}