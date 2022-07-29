import Phaser from 'phaser'
import IFighter from '~/fighters/IFighter';
import Knight from '~/fighters/Knight';
import { Players } from '~/Players';
import Tile from '~/Tile';

export default class BoardScene extends Phaser.Scene {

    readonly numberOfColumns: number = 3;
    readonly numberOfRows: number = 3;
    readonly boardStartX: number = 100;
    readonly boardStartY: number = 100;
    readonly tileOverlap: number = 5;
    readonly tileSize: number = 150;

    activePlayerText?: Phaser.GameObjects.Text;
    activePlayer: Players = Players.Player_1;

    selectedFighter: IFighter;

    tiles: Array<Array<Tile>> = [];

    isFighterAction: boolean = false;


    constructor() {
        super('Board');
    }

    preload() {
        this.load.image('background', 'images/background.png');
        this.load.image(Tile.textureName, Tile.texturePath);
        this.load.image(Tile.textureNameActive, Tile.texturePathActive);

        this.load.spritesheet(Knight.textureNamePlayer_1, Knight.texturePathPlayer_1, {
            frameWidth: 99,
            frameHeight: 108
        });

        this.load.spritesheet(Knight.textureNamePlayer_2, Knight.texturePathPlayer_2, {
            frameWidth: 99,
            frameHeight: 108
        });
    }

    create() {
        this.anims.create({
            key: `${Knight.textureNamePlayer_1}-idle`,
            frames: this.anims.generateFrameNumbers(Knight.textureNamePlayer_1, { start: 0, end: 4 }),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: `${Knight.textureNamePlayer_2}-idle`,
            frames: this.anims.generateFrameNumbers(Knight.textureNamePlayer_2, { start: 0, end: 4 }),
            frameRate: 3,
            repeat: -1
        });



        this.add.image(400, 300, 'background');
        this.createBoard();
        this.refreshActivePlayerText();

        this.selectedFighter = new Knight(this.activePlayer, this, -100, -100);
    }

    createBoard() {
        for (let offsetX = 0; offsetX < this.numberOfColumns; offsetX++) {
            this.tiles[offsetX] = [];
            for (let offsetY = 0; offsetY < this.numberOfRows; offsetY++) {
                this.tiles[offsetX][offsetY] = new Tile(
                    this.boardStartX + offsetX * (this.tileSize - this.tileOverlap),
                    this.boardStartY + offsetY * (this.tileSize - this.tileOverlap),
                    this,
                    offsetX,
                    offsetY
                );

            }
        }
    }

    refreshActivePlayerText() {
        const text = `Player: ${this.activePlayer === Players.Player_1 ? '1' : '2'}`;

        if (!this.activePlayerText) {
            this.activePlayerText = this.add.text(600, 30, text);
        } else {
            this.activePlayerText.setText(text);
        }
    }

    nextPlayer() {
        if (this.isWin()) {
            if (this.activePlayer === Players.Player_1) {
                alert('Player 1 wins');
            }

            if (this.activePlayer === Players.Player_2) {
                alert('Player 2 wins');
            }

        } else {
            if (this.activePlayer === Players.Player_1) {
                this.activePlayer = Players.Player_2;
            } else {
                this.activePlayer = Players.Player_1;
            }

            this.selectedFighter = new Knight(this.activePlayer, this, -100, -100);

            this.refreshActivePlayerText();
            this.markAllTilesUnactive();
            this.isFighterAction = false;
        }
    }

    markAllTilesUnactive() {
        for (let x = 0; x < this.tiles.length; x++) {
            for (let y = 0; y < this.tiles[0].length; y++) {
                const tile = this.tiles[x][y];
                tile.markUnactive();
            }
        }
    }

    isWin() {
        //TODO: OMG refactor that monster
        for (let x = 0; x < this.tiles.length; x++) {
            let activeFirstPlayersTilesInLine = 0;
            let activeSecondPlayersTilesInLine = 0;
            for (let y = 0; y < this.tiles[0].length; y++) {
                const tile = this.tiles[x][y];
                if (tile.belongsToPlayer(Players.Player_1)) {
                    activeFirstPlayersTilesInLine++;
                } else if (tile.belongsToPlayer(Players.Player_2)) {
                    activeSecondPlayersTilesInLine++;
                }
            }
            if (activeFirstPlayersTilesInLine === this.numberOfColumns) {
                return true;
            }

            if (activeSecondPlayersTilesInLine === this.numberOfColumns) {
                return true;
            }
        }

        for (let y = 0; y < this.tiles[0].length; y++) {
            let activeFirstPlayersTilesInLine = 0;
            let activeSecondPlayersTilesInLine = 0;
            for (let x = 0; x < this.tiles.length; x++) {
                const tile = this.tiles[x][y];
                if (tile.belongsToPlayer(Players.Player_1)) {
                    activeFirstPlayersTilesInLine++;
                } else if (tile.belongsToPlayer(Players.Player_2)) {
                    activeSecondPlayersTilesInLine++;
                }
            }
            if (activeFirstPlayersTilesInLine === this.numberOfColumns) {
                return true;
            }

            if (activeSecondPlayersTilesInLine === this.numberOfColumns) {
                return true;
            }
        }

        //Need fix if a board is not square
        let activeFirstPlayersTilesInLine = 0;
        let activeSecondPlayersTilesInLine = 0;
        for (let x = this.tiles.length - 1; x >= 0; x--) {
            const y = this.tiles[0].length - 1 - x;
                const tile = this.tiles[x][y];
                if (tile.belongsToPlayer(Players.Player_1)) {
                    activeFirstPlayersTilesInLine++;
                } else if (tile.belongsToPlayer(Players.Player_2)) {
                    activeSecondPlayersTilesInLine++;
                }
        }

        if (activeFirstPlayersTilesInLine === this.numberOfColumns) {
            return true;
        }

        if (activeSecondPlayersTilesInLine === this.numberOfColumns) {
            return true;
        }

        //Need fix if a board is not square
        activeFirstPlayersTilesInLine = 0;
        activeSecondPlayersTilesInLine = 0;
        for (let x = 0; x < this.tiles.length; x++) {


            const tile = this.tiles[x][x];
            if (tile.belongsToPlayer(Players.Player_1)) {
                activeFirstPlayersTilesInLine++;
            } else if (tile.belongsToPlayer(Players.Player_2)) {
                activeSecondPlayersTilesInLine++;
            }
        }

        if (activeFirstPlayersTilesInLine === this.numberOfColumns) {
            return true;
        }

        if (activeSecondPlayersTilesInLine === this.numberOfColumns) {
            return true;
        }

        return false;
    }
}
