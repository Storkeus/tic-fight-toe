import type { Players } from '../Players';
import type Tile from '../Tile';
import IUnit from '../units/unit/IUnit';

export default interface IBoardScene extends Phaser.Scene {
        readonly numberOfColumns: number;
        readonly numberOfRows: number;
        readonly boardStartX: number;
        readonly boardStartY: number;
        readonly tileOverlap: number;
        readonly tileSize: number;

        activePlayer: Players;
        tiles: Array<Array<Tile>>;
        isUnitAction: boolean;

        createBoard(): void;
        createUnitMenu(): void;
        destroyCurrentUnitsMenu(): void;
        refreshActivePlayerText(): void;
        nextPlayer(): void;
        markAllTilesUnactive(): void;
        endGame(): void;
        setUnitDescription(unit: IUnit): void;
        hideUnitDescription(): void;
        refreshSelectedUnitImage(unit: IUnit): void;
}