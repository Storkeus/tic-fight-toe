import { Players } from "../../Players";
import BoardScene from "../../scenes/BoardScene";
import Tile from "../../Tile";
import AUnit from "./AUnit";
import IUnit from "./IUnit";

export default class Knight extends AUnit  implements IUnit {
    static readonly TEXTURE_NAME_PLAYER_1: string = 'knight-player-1';
    static readonly TEXTURE_PATH_PLAYER_1: string = 'images/red/knight/Combat Ready Idle.png';
    static readonly TEXTURE_NAME_PLAYER_2: string = 'knight-player-2';
    static readonly TEXTURE_PATH_PLAYER_2: string = 'images/green/knight/Combat Ready Idle.png';
    static readonly DESCRIPTION: string = `Kills one enemy next to him.\n\n"What a night to be a knight!"`;
    protected numberOfSpecialAbilityUses: number = 1;

    findTargets = (grid: Array<Array<Tile>>, startX: number, startY: number): number => {

        if (!this.canUseAbility()) {
            return 0;
        }

        let numberOfActiveTarget: number = 0;

        const upperTile: Tile | null = startY - 1 >= 0 ? grid[startX][startY - 1] : null;
        if (!!upperTile && upperTile.hasEnemyUnit()) {
            upperTile.markActive(this);
            numberOfActiveTarget++;
        }

        const rightTile: Tile | null = startX + 1 <= 2 ? grid[startX + 1][startY] : null;
        if (!!rightTile && rightTile.hasEnemyUnit()) {
            rightTile.markActive(this);
            numberOfActiveTarget++;
        }

        const leftTile: Tile | null = startX - 1 >= 0 ? grid[startX - 1][startY] : null;
        if (!!leftTile && leftTile.hasEnemyUnit()) {
            leftTile.markActive(this);
            numberOfActiveTarget++;
        }

        const bottomTile: Tile | null = startY + 1 <= 2 ? grid[startX][startY + 1] : null;
        if (!!bottomTile && bottomTile.hasEnemyUnit()) {
            bottomTile.markActive(this);
            numberOfActiveTarget++;
        }

        return numberOfActiveTarget;
    }

    constructor(player: Players, scene: BoardScene, x: number, y: number) {
        super(player, scene, x, y);
    }

    getTextureNameForPlayer(playerNumber: number): string {
        switch (playerNumber + 1) {
            case 2:
                return Knight.TEXTURE_NAME_PLAYER_2;
            case 1:
            default:
                return Knight.TEXTURE_NAME_PLAYER_1;
        }
    }

    getDescription(): string {
        return Knight.DESCRIPTION;
    }

    protected getActiveTexture(): string {
        return this.player === Players.Player_1 ? Knight.TEXTURE_NAME_PLAYER_1 : Knight.TEXTURE_NAME_PLAYER_2;
    }
}