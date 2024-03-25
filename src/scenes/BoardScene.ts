import Phaser from 'phaser'
import IFighter from '~/fighters/IFighter';
import Knight from '~/fighters/Knight';
import Archer from '~/fighters/Archer';
import { Players } from '~/Players';
import Tile from '~/Tile';
import AScene from './AScene';
import GameOverScene from './GameOverScene';
import debounce from 'debounce';

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
    selectedFighterDescription?: Phaser.GameObjects.Text;
    selectedFighterImage?: Phaser.GameObjects.Image;
    selectedFighterImageOnPointer?: Phaser.GameObjects.Image;

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

        this.load.spritesheet(Knight.TEXTURE_NAME_PLAYER_1, Knight.TEXTURE_PATH_PLAYER_1, {
            frameWidth: 99,
            frameHeight: 108
        });

        this.load.spritesheet(Knight.TEXTURE_NAME_PLAYER_2, Knight.TEXTURE_PATH_PLAYER_2, {
            frameWidth: 99,
            frameHeight: 108
        });

        this.load.spritesheet(Archer.TEXTURE_NAME_PLAYER_1, Archer.TEXTURE_PATH_PLAYER_1, {
            frameWidth: 99,
            frameHeight: 108
        });

        this.load.spritesheet(Archer.TEXTURE_NAME_PLAYER_2, Archer.TEXTURE_PATH_PLAYER_2, {
            frameWidth: 99,
            frameHeight: 108
        });
    }

    create() {
        this.anims.create({
            key: `${Knight.TEXTURE_NAME_PLAYER_1}-idle`,
            frames: this.anims.generateFrameNumbers(Knight.TEXTURE_NAME_PLAYER_1, { start: 0, end: 4 }),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: `${Knight.TEXTURE_NAME_PLAYER_2}-idle`,
            frames: this.anims.generateFrameNumbers(Knight.TEXTURE_NAME_PLAYER_2, { start: 0, end: 4 }),
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: `${Archer.TEXTURE_NAME_PLAYER_1}-idle`,
            frames: this.anims.generateFrameNumbers(Archer.TEXTURE_NAME_PLAYER_1, { start: 0, end: 4 }),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: `${Archer.TEXTURE_NAME_PLAYER_2}-idle`,
            frames: this.anims.generateFrameNumbers(Archer.TEXTURE_NAME_PLAYER_2, { start: 0, end: 4 }),
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
        this.scene.start(GameOverScene.key, {winner: this.activePlayer === Players.Player_1 ? '1' : '2'});
    }

    getCurrentFighter(): IFighter {
        let fighter: IFighter;
        switch (this.currentTurnFighter) {
            case 'knight':
                {
                    fighter = new Knight(this.activePlayer, this, -100, -100);
                    break;
                }
            case 'archer':
                {
                    fighter = new Archer(this.activePlayer, this, -100, -100);
                    break;
                }
            default:
                {
                    fighter = new Knight(this.activePlayer, this, -100, -100);
                    break;
                }
        }

        this.setFighterDescription(fighter);

        return fighter;
    }

    setFighterDescription(fighter: IFighter) {
        if (!this.selectedFighterDescription) {
            this.selectedFighterDescription = this.add.text(550, 250, fighter.getDescription());
            this.selectedFighterDescription.setWordWrapWidth(200);
        } else {
            this.selectedFighterDescription.setText(fighter.getDescription());
        }


        this.refreshSelectedFighterImage(fighter);
        this.refreshSelectedFighterImageOnPointer(fighter);

        
    }
    
    refreshSelectedFighterImage(fighter: IFighter) {
        if (!this.selectedFighterImage) {
            this.selectedFighterImage = this.add.image(
                650,
                175,
                fighter.getTextureNameForPlayer(this.activePlayer)
            ).setInteractive();
        } else {
            this.selectedFighterImage = this.selectedFighterImage.setTexture(
                fighter.getTextureNameForPlayer(this.activePlayer)
            );
        }
    }

    refreshSelectedFighterImageOnPointer(fighter: IFighter) {
        if (!this.selectedFighterImageOnPointer) {
            this.selectedFighterImageOnPointer = this.add.image(
                -200,
                -200,
                fighter.getTextureNameForPlayer(this.activePlayer)
            ).setInteractive();

            this.selectedFighterImageOnPointer!.setDepth(50);
            this.input.on(Phaser.Input.Events.POINTER_MOVE, debounce((pointer: Phaser.Input.Pointer) => {
                if (this.isFighterAction) {
                    this.selectedFighterImageOnPointer!.setPosition(650, 175);
                } else {
                    this.selectedFighterImageOnPointer!.setPosition(pointer.worldX-50, pointer.worldY-50);
                }
            }, 10));
        } else {
            this.selectedFighterImageOnPointer = this.selectedFighterImageOnPointer.setTexture(
                fighter.getTextureNameForPlayer(this.activePlayer)
            );
        }

        this.selectedFighterImageOnPointer.setVisible(true);
    }

    hideSelectedFighterImageOnPointer() {
        this.selectedFighterImageOnPointer!.setVisible(false);
    }
}
