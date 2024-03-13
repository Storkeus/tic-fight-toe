import Phaser from 'phaser'
import IFighter from '~/fighters/IFighter';
import Knight from '~/fighters/Knight';
import Archer from '~/fighters/Archer';
import { Players } from '~/Players';
import Tile from '~/Tile';
import AScene from './AScene';

export default class BoardScene extends AScene {

    static readonly key: string = 'Board';

    readonly numberOfColumns: number = 3;
    readonly numberOfRows: number = 3;
    readonly boardStartX: number = 100;
    readonly boardStartY: number = 100;
    readonly tileOverlap: number = 5;
    readonly tileSize: number = 150;

    activePlayerText?: Phaser.GameObjects.Text;
    activePlayer: Players = Players.Player_1;

    selectedFighter!: IFighter;

    tiles: Array<Array<Tile>> = [];

    isFighterAction: boolean = false;

    currentTurnFighter: string = 'knight';
    orderOfFighters: Array<string> = ['knight', 'archer'];


    constructor() {
        super(BoardScene.key);
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

        this.load.spritesheet(Archer.textureNamePlayer_1, Archer.texturePathPlayer_1, {
            frameWidth: 99,
            frameHeight: 108
        });

        this.load.spritesheet(Archer.textureNamePlayer_2, Archer.texturePathPlayer_2, {
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

        this.anims.create({
            key: `${Archer.textureNamePlayer_1}-idle`,
            frames: this.anims.generateFrameNumbers(Archer.textureNamePlayer_1, { start: 0, end: 4 }),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: `${Archer.textureNamePlayer_2}-idle`,
            frames: this.anims.generateFrameNumbers(Archer.textureNamePlayer_2, { start: 0, end: 4 }),
            frameRate: 3,
            repeat: -1
        });

        this.add.image(400, 300, 'background');
        this.createBoard();
        this.refreshActivePlayerText();

        this.selectedFighter = this.getCurrentFighter();
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
        let shouldFighterChange = false;
        if (this.activePlayer === Players.Player_1) {
            this.activePlayer = Players.Player_2;
            shouldFighterChange = true;
        } else {
            this.activePlayer = Players.Player_1;
        }

        this.selectedFighter = this.getCurrentFighter();

        this.refreshActivePlayerText();
        this.markAllTilesUnactive();
        this.isFighterAction = false;

        console.log(shouldFighterChange);
        if (shouldFighterChange) {
            const currentTurnFighterIndex = this.orderOfFighters.findIndex((fighter) => fighter === this.currentTurnFighter);
            if (currentTurnFighterIndex >= 0) {
                if (currentTurnFighterIndex === this.orderOfFighters.length -1) {
                    this.currentTurnFighter = this.orderOfFighters[0];
                } else {
                    this.currentTurnFighter = this.orderOfFighters[currentTurnFighterIndex + 1];
                }
            } else {
                this.currentTurnFighter = 'knight';
            }
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

    endGame() {
        alert(`Wygrywa gracz: ${this.activePlayer === Players.Player_1 ? '1' : '2'}!`);
        // pokazuję tylko Miłoszowi - do zmiany.
        this.preload();
        console.log(`Wygrywa gracz: ${this.activePlayer === Players.Player_1 ? '1' : '2'}!`);
    }

    getCurrentFighter(): IFighter {
        switch (this.currentTurnFighter) {
            case 'knight':
                return new Knight(this.activePlayer, this, -100, -100);
            case 'archer':
                return new Archer(this.activePlayer, this, -100, -100);
            default:
                return new Knight(this.activePlayer, this, -100, -100);
        }
    }
}
