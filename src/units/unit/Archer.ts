import { ARCHER_PLAYER_1, ARCHER_PLAYER_2 } from "../../helpers/Sprites";
import { Players } from "../../Players";
import type IBoardScene from "../../scenes/IBoardScene";
import Tile from "../../Tile";
import AUnit from "./AUnit";
import type IUnit from "./IUnit";

export default class Archer extends AUnit implements IUnit {
    static readonly DESCRIPTION: string = `Kills one enemy away from him.\n\n"Crossbows are for losers."`;
    protected numberOfSpecialAbilityUses: number = 1;

    findTargets = (grid: Array<Array<Tile>>, startX: number, startY: number): number => {

        if (!this.canUseAbility()) {
            return 0;
        }

        let numberOfActiveTarget: number = 0;

        for (const row of grid) {
            for (const tile of row) {
                if (tile.hasEnemyUnit()) {
                    tile.markActive(this);
                    numberOfActiveTarget++;
                }
            }
        }

        const upperTile: Tile | null = startY - 1 >= 0 ? grid[startX][startY - 1] : null;
        if (!!upperTile && upperTile.hasEnemyUnit()) {
            upperTile.markUnactive();
            numberOfActiveTarget--;
        }

        const rightTile: Tile | null = startX + 1 <= 2 ? grid[startX + 1][startY] : null;
        if (!!rightTile && rightTile.hasEnemyUnit()) {
            rightTile.markUnactive();
            numberOfActiveTarget--;
        }

        const leftTile: Tile | null = startX - 1 >= 0 ? grid[startX - 1][startY] : null;
        if (!!leftTile && leftTile.hasEnemyUnit()) {
            leftTile.markUnactive();
            numberOfActiveTarget--;
        }

        const bottomTile: Tile | null = startY + 1 <= 2 ? grid[startX][startY + 1] : null;
        if (!!bottomTile && bottomTile.hasEnemyUnit()) {
            bottomTile.markUnactive();
            numberOfActiveTarget--;
        }

        return numberOfActiveTarget;
    }

    constructor(player: Players, scene: IBoardScene, x: number, y: number) {
        super(player, scene, x, y);
    }

    getTextureNameForPlayer(playerNumber: number): string {
        switch (playerNumber + 1) {
            case 2:
                return ARCHER_PLAYER_2.textureName;
            case 1:
            default:
                return ARCHER_PLAYER_1.textureName;
        }
    }

    getDescription(): string {
        return Archer.DESCRIPTION;
    }

    protected getActiveTexture(): string {
        return this.player === Players.Player_1 ? ARCHER_PLAYER_1.textureName : ARCHER_PLAYER_2.textureName;
    }
}