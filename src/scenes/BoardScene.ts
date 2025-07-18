import Phaser from 'phaser'
import IUnit from '../units/unit/IUnit';
import Knight from '../units/unit/Knight';
import Archer from '../units/unit/Archer';
import { Players } from '../Players';
import Tile from '../Tile';
import AScene from './AScene';
import GameOverScene from './GameOverScene';
import KnightFactory from '../units/unitFactory/KnightFactory';
import Player from '../Player';
import ArcherFactory from '../units/unitFactory/ArcherFactory';
import Peasant from '../units/unit/Peasant';
import PeasantFactory from '../units/unitFactory/PeasantFactory';

export default class BoardScene extends AScene {

    static readonly key: string = 'Board';
    static readonly UNIT_PLACED_SOUND_NAME = 'unit-placed';

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

    players: Array<Player> = [new Player(Players.Player_1, []), new Player(Players.Player_2, [])];
    unitsInMenu: Array<IUnit> = [];


    constructor() {
        super(BoardScene.key);
    }

    preload() {
        this.load.image('background', 'images/background.png');
        this.load.image(Tile.textureName, Tile.texturePath);
        this.load.image(Tile.textureNameActive, Tile.texturePathActive);

        this.load.audio(BoardScene.UNIT_PLACED_SOUND_NAME, ['sounds/jumpland44100_by_MentalSanityOff.mp3']);

        this.load.spritesheet(Peasant.TEXTURE_NAME_PLAYER_1, Peasant.TEXTURE_PATH_PLAYER_1, {
            frameWidth: 99,
            frameHeight: 108
        });

        this.load.spritesheet(Peasant.TEXTURE_NAME_PLAYER_2, Peasant.TEXTURE_PATH_PLAYER_2, {
            frameWidth: 99,
            frameHeight: 108
        });


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

        this.load.spritesheet('sparkle', 'images/sparkle.png', {
            frameWidth: 99,
            frameHeight: 108
        });
    }

    create() {
        this.anims.create({
            key: `${Peasant.TEXTURE_NAME_PLAYER_1}-idle`,
            frames: this.anims.generateFrameNumbers(Peasant.TEXTURE_NAME_PLAYER_1, { start: 0, end: 4 }),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: `${Peasant.TEXTURE_NAME_PLAYER_2}-idle`,
            frames: this.anims.generateFrameNumbers(Peasant.TEXTURE_NAME_PLAYER_2, { start: 0, end: 4 }),
            frameRate: 3,
            repeat: -1
        });

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

        this.anims.create({
            key: `sparkle-sparkle-sparkle`,
            frames: this.anims.generateFrameNumbers('sparkle', { start: 0, end: 1 }),
            frameRate: 3,
            repeat: -1
        });

        this.add.image(400, 300, 'background');
        this.setAvailableUnitsOnPlayers();
        this.createBoard();
        this.createUnitMenu();
        this.refreshActivePlayerText();
    }

    setAvailableUnitsOnPlayers() {
        this.players[0].availableUnits = [
            new PeasantFactory(this.players[0]),
            new KnightFactory(this.players[0], 3),
            new ArcherFactory(this.players[0], 3)
        ];
        this.players[1].availableUnits = [
            new PeasantFactory(this.players[1]),
            new KnightFactory(this.players[1], 4),
            new ArcherFactory(this.players[1], 3)
        ];
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
        this.scene.start(GameOverScene.key, {winner: this.activePlayer === Players.Player_1 ? '1' : '2'});
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
