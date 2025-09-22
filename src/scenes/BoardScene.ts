import Phaser from 'phaser'
import type IUnit from '../units/unit/IUnit';
import { Players } from '../Players';
import Tile from '../Tile';
import Player from '../Player';
import SpriteLoader from '../helpers/SpriteLoader';
import { BOARD_SCENE_KEY, GAME_OVER_SCENE_KEY, UNIT_SELECTION_SCENE_KEY } from '../helpers/SceneKeys';
import { UNIT_PLACED_SOUND_NAME } from '../helpers/Sounds';
import IBoardScene from './IBoardScene';

export default class BoardScene extends Phaser.Scene implements IBoardScene {
    readonly numberOfColumns: number = 3;
    readonly numberOfRows: number = 3;
    readonly boardStartX: number = 100;
    readonly boardStartY: number = 100;
    readonly tileOverlap: number = 5;
    readonly tileSize: number = 150;

    activePlayerText?: Phaser.GameObjects.Text;
    activePlayer: Players = Players.Player_1;

    selectedUnitDescription?: Phaser.GameObjects.Text;
    selectedUnitImage?: Phaser.GameObjects.Image;
    selectedUnitImageOnPointer?: Phaser.GameObjects.Image;

    tiles: Array<Array<Tile>> = [];

    isUnitAction: boolean = false;

    players: Array<Player> = [];
    unitsInMenu: Array<IUnit> = [];

    private spriteLoader: SpriteLoader;

    constructor() {
        super(BOARD_SCENE_KEY);
        this.spriteLoader = new SpriteLoader();
    }

    preload() {
        this.spriteLoader.loadAllUnitSpritesheets(this, true);

        this.load.image('background', 'images/background.png');
        this.load.image(Tile.textureName, Tile.texturePath);
        this.load.image(Tile.textureNameActive, Tile.texturePathActive);

        this.load.audio(UNIT_PLACED_SOUND_NAME, ['sounds/jumpland44100_by_MentalSanityOff.mp3']);

        this.load.spritesheet('sparkle', 'images/sparkle.png', {
            frameWidth: 99,
            frameHeight: 108
        });
    }

    init(data: {players: Array<Player>}) {
        this.players = data.players;
    }

    create() {
        this.scene.remove(UNIT_SELECTION_SCENE_KEY);

        this.spriteLoader.loadAllUnitAnimations(this, true);

        this.anims.create({
            key: `sparkle-sparkle-sparkle`,
            frames: this.anims.generateFrameNumbers('sparkle', { start: 0, end: 1 }),
            frameRate: 3,
            repeat: -1
        });

        this.add.image(400, 300, 'background');
        this.createBoard();
        this.createUnitMenu();
        this.refreshActivePlayerText();
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
                // Set initial tile color
                this.tiles[offsetX][offsetY].setTintForPlayer(this.activePlayer);
            }
        }
    }

    createUnitMenu() {
        this.destroyCurrentUnitsMenu();

        let x = this.boardStartX;
        for (const unitFactory of this.players[this.activePlayer].availableUnits) {
            const unit = unitFactory.createUnit(this, x, 520);
            if (unit) {
                this.unitsInMenu.push(unit);

                if (unitFactory.unitCountIsLimited) 
                {
                    unit.setCountText(unitFactory.unitCount);
                }
                
                x += 100;
            }
        }
    }

    destroyCurrentUnitsMenu() {
        for (const unit of this.unitsInMenu) {
            if (!unit.isOnBoard) {
                unit.remove();
            }
        }
        this.unitsInMenu = [];
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
        if (this.activePlayer === Players.Player_1) {
            this.activePlayer = Players.Player_2;
        } else {
            this.activePlayer = Players.Player_1;
        }

        this.refreshActivePlayerText();
        this.createUnitMenu();
        this.markAllTilesUnactive();
        this.isUnitAction = false;

        // Color all tiles based on active player
        for (let x = 0; x < this.tiles.length; x++) {
            for (let y = 0; y < this.tiles[0].length; y++) {
                this.tiles[x][y].setTintForPlayer(this.activePlayer);
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
        this.scene.start(GAME_OVER_SCENE_KEY, {winner: this.activePlayer === Players.Player_1 ? '1' : '2'});
    }

    setUnitDescription(unit: IUnit) {
        if (!this.selectedUnitDescription) {
            this.selectedUnitDescription = this.add.text(550, 250, unit.getDescription());
            this.selectedUnitDescription.setWordWrapWidth(200);
        } else {
            this.selectedUnitDescription.setText(unit.getDescription());
            this.selectedUnitDescription.setVisible(true);
        } 


        this.refreshSelectedUnitImage(unit);
    }

    hideUnitDescription() {
        this.selectedUnitDescription?.setVisible(false);
        this.selectedUnitImage?.setVisible(false);
    }
    
    refreshSelectedUnitImage(unit: IUnit) {
        if (!this.selectedUnitImage) {
            this.selectedUnitImage = this.add.image(
                650,
                175,
                unit.getTextureNameForPlayer(this.activePlayer)
            ).setInteractive();
        } else {
            this.selectedUnitImage = this.selectedUnitImage.setTexture(
                unit.getTextureNameForPlayer(this.activePlayer)
            );
            this.selectedUnitImage.setVisible(true);
        }
    }
}
