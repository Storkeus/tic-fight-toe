import Phaser from 'phaser'
import IFighter from '~/fighters/IFighter';
import Knight from '~/fighters/Knight';
import { Players } from '~/Players';
import Tile from '~/Tile';

export default class BoardScene extends Phaser.Scene {

    readonly numberOfColumns: number = 3;
    readonly numberOfRows: number = 3;
    readonly boardStartX: number = 285;
    readonly boardStartY: number = 150;
    readonly tileOverlap: number = 5;
    readonly tileSize: number = 150;

    activePlayerText?: Phaser.GameObjects.Text;
    activePlayer: Players = Players.Player_1;

    selectedFighter: IFighter;

    tiles: Array<Array<Tile>> = [];


    constructor() {
        super('Board');
    }

    preload() {
        this.load.image('background', 'images/background.png');
        this.load.image(Tile.textureName, Tile.texturePath);

        this.load.spritesheet('knight-player-1', 'images/red/knight/Combat Ready Idle.png', {
            frameWidth: 99,
            frameHeight: 108
        });

        this.load.spritesheet('knight-player-2', 'images/green/knight/Combat Ready Idle.png', {
            frameWidth: 99,
            frameHeight: 108
        });
    }

    create() {
        this.anims.create({
            key: 'knight-player-1-idle',
            frames: this.anims.generateFrameNumbers('knight-player-1', { start: 0, end: 4 }),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: 'knight-player-2-idle',
            frames: this.anims.generateFrameNumbers('knight-player-2', { start: 0, end: 4 }),
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
                    this
                );

            }
        }
    }

    refreshActivePlayerText() {
        const text = `Gracz: ${this.activePlayer === Players.Player_1 ? '1' : '2'}`;

        if (!this.activePlayerText) {
            this.activePlayerText = this.add.text(400, 30, text);
        } else {
            this.activePlayerText.setText(text);
        }
    }

    nextPlayer() {

        if (this.isWin()) {

        } else {
            if (this.activePlayer === Players.Player_1) {
                this.activePlayer = Players.Player_2;
            } else {
                this.activePlayer = Players.Player_1;
            }

            this.selectedFighter = new Knight(this.activePlayer, this, -100, -100);

            this.refreshActivePlayerText();
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
                console.log('Player 1 wins!');
                return true;
            }

            if (activeSecondPlayersTilesInLine === this.numberOfColumns) {
                console.log('Player 2 wins!');
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
                console.log('Player 1 wins!');
                return true;
            }

            if (activeSecondPlayersTilesInLine === this.numberOfColumns) {
                console.log('Player 2 wins!');
                return true;
            }
        }

        //Need fix if a board is not square
        let activeFirstPlayersTilesInLine = 0;
        let activeSecondPlayersTilesInLine = 0;
        for (let x = this.tiles.length - 1; x >= 0; x--) {
            const y = this.tiles[0].length - 1 - x;
                const tile = this.tiles[x][y];
                console.log(x,y);
                if (tile.belongsToPlayer(Players.Player_1)) {
                    activeFirstPlayersTilesInLine++;
                } else if (tile.belongsToPlayer(Players.Player_2)) {
                    activeSecondPlayersTilesInLine++;
                }
        }

        if (activeFirstPlayersTilesInLine === this.numberOfColumns) {
            console.log('Player 1 wins!');
            return true;
        }

        if (activeSecondPlayersTilesInLine === this.numberOfColumns) {
            console.log('Player 2 wins!');
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
            console.log('Player 1 wins!');
            return true;
        }

        if (activeSecondPlayersTilesInLine === this.numberOfColumns) {
            console.log('Player 2 wins!');
            return true;
        }

        return false;
    }
}
