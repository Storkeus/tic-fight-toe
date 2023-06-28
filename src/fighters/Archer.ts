import { Players } from "~/Players";
import BoardScene from "~/scenes/BoardScene";
import Tile from "~/Tile";
import AFighter from "./AFighter";
import IFighter from "./IFighter";

export default class Archer extends AFighter  implements IFighter {
    static readonly textureNamePlayer_1: string = 'archer-player-1';
    static readonly texturePathPlayer_1: string = 'images/red/archer/Combat Ready Idle.png';
    static readonly textureNamePlayer_2: string = 'archer-player-2';
    static readonly texturePathPlayer_2: string = 'images/green/archer/Combat Ready Idle.png';

    findTargets = (grid: Array<Array<Tile>>, startX: number, startY: number): number => {

        let numberOfActiveTarget: number = 0;

        for (const row of grid) {
            for (const tile of row) {
                if (tile.hasEnemyFighter()) {
                    tile.markActive();
                    numberOfActiveTarget++;
                }
            }
        }

        const upperTile: Tile | null = startY - 1 >= 0 ? grid[startX][startY - 1] : null;
        if (!!upperTile && upperTile.hasEnemyFighter()) {
            upperTile.markUnactive();
            numberOfActiveTarget--;
        }

        const rightTile: Tile | null = startX + 1 <= 2 ? grid[startX + 1][startY] : null;
        if (!!rightTile && rightTile.hasEnemyFighter()) {
            rightTile.markUnactive();
            numberOfActiveTarget--;
        }

        const leftTile: Tile | null = startX - 1 >= 0 ? grid[startX - 1][startY] : null;
        if (!!leftTile && leftTile.hasEnemyFighter()) {
            leftTile.markUnactive();
            numberOfActiveTarget--;
        }

        const bottomTile: Tile | null = startY + 1 <= 2 ? grid[startX][startY + 1] : null;
        if (!!bottomTile && bottomTile.hasEnemyFighter()) {
            bottomTile.markUnactive();
            numberOfActiveTarget--;
        }

        return numberOfActiveTarget;
    }

    constructor(player: Players, scene: BoardScene, x: number, y: number) {
        super(player, scene, x, y);
    }

    protected getActiveTexture(): string {
        return this.player === Players.Player_1 ? Archer.textureNamePlayer_1 : Archer.textureNamePlayer_2;
    }
}