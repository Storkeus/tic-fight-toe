import Phaser from 'phaser'
import IUnit from '~/units/IUnit';
import Knight from '~/units/Knight';
import Archer from '~/units/Archer';
import { Players } from '~/Players';
import Tile from '~/Tile';
import AScene from './AScene';
import GameOverScene from './GameOverScene';
import KnightFactory from '~/units/KnightFactory';
import Player from '~/Player';
import ArcherFactory from '~/units/ArcherFactory';

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

    selectedUnitDescription?: Phaser.GameObjects.Text;
    selectedUnitImage?: Phaser.GameObjects.Image;
    selectedUnitImageOnPointer?: Phaser.GameObjects.Image;

    tiles: Array<Array<Tile>> = [];

    isUnitAction: boolean = false;

    currentTurnUnit: string = 'knight';
    orderOfUnits: Array<string> = ['knight', 'archer'];
    players: Array<Player> = [new Player(Players.Player_1, []), new Player(Players.Player_2, [])];
    unitsInMenu: Array<IUnit> = [];


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
        this.setAvailableUnitsOnPlayers();
        this.createBoard();
        this.createUnitMenu();
        this.refreshActivePlayerText();
    }

    setAvailableUnitsOnPlayers() {
        this.players[0].availableUnits = [new KnightFactory(this.players[0]), new ArcherFactory(this.players[0])];
        this.players[1].availableUnits = [new ArcherFactory(this.players[1]), new KnightFactory(this.players[1])];
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

    createUnitMenu() {
        this.destroyCurrentUnitsMenu();

        let x = this.boardStartX;
        for (const unitFactory of this.players[this.activePlayer].availableUnits) {
            const unit = unitFactory.createUnit(this, x, 520);
            this.unitsInMenu.push(unit);
            x += 100;
        }
    }

    destroyCurrentUnitsMenu() {
        for (const unit of this.unitsInMenu) {
            if (!unit.isOnBoard) {
                unit.remove();
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
        let shouldUnitChange = false;
        if (this.activePlayer === Players.Player_1) {
            this.activePlayer = Players.Player_2;
            shouldUnitChange = true;
        } else {
            this.activePlayer = Players.Player_1;
        }

        this.refreshActivePlayerText();
        this.createUnitMenu();
        this.markAllTilesUnactive();
        this.isUnitAction = false;

        if (shouldUnitChange) {
            const currentTurnUnitIndex = this.orderOfUnits.findIndex((unit) => unit === this.currentTurnUnit);
            if (currentTurnUnitIndex >= 0) {
                if (currentTurnUnitIndex === this.orderOfUnits.length -1) {
                    this.currentTurnUnit = this.orderOfUnits[0];
                } else {
                    this.currentTurnUnit = this.orderOfUnits[currentTurnUnitIndex + 1];
                }
            } else {
                this.currentTurnUnit = 'knight';
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

    getCurrentUnit(): IUnit {
        let unit: IUnit;
        switch (this.currentTurnUnit) {
            case 'knight':
                {
                    unit = new Knight(this.activePlayer, this, -100, -100);
                    break;
                }
            case 'archer':
                {
                    unit = new Archer(this.activePlayer, this, -100, -100);
                    break;
                }
            default:
                {
                    unit = new Knight(this.activePlayer, this, -100, -100);
                    break;
                }
        }

        return unit;
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
