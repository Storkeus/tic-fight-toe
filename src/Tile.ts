import IUnit from "./units/IUnit";
import WinConditionChecker from "./helpers/WinConditionChecker";
import { Players } from "./Players";
import BoardScene from "./scenes/BoardScene";

export default class Tile
{
    static readonly textureName: string = 'tile';
    static readonly texturePath: string = 'images/tile.png';
    static readonly textureNameActive: string = 'tile-active';
    static readonly texturePathActive: string = 'images/tile-active.png';

    private gameObject: Phaser.GameObjects.Image; 
    private scene: BoardScene;
    private unit?: IUnit;

    public positionXInGrid: number;
    public positionYInGrid: number;

    private isActive: boolean = false;

    constructor (positionX: number, positionY: number, scene: BoardScene, positionXInGrid: number, positionYInGrid: number)
    {
        this.scene = scene;
        this.gameObject = this.scene.add.image(positionX, positionY, Tile.textureName).setInteractive()
        .on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (this.scene.isUnitAction) {
                if (this.isActive && this.unit) {
                    this.unit.remove();
                    this.unit = undefined;
                    this.scene.nextPlayer();
                }
            } else {
                let firstClickInTurn: boolean = false;
                if (!this.unit) {
                    this.putUnit(this.scene.selectedUnit);
                    firstClickInTurn = true;
                }

                if (firstClickInTurn) {
                    if (this.unit !== undefined) {
                        const winConditionChecker = new WinConditionChecker();
                        if(winConditionChecker.checkWinConditionAfterTileChange(this.scene.tiles, this, this.scene.activePlayer)) {
                            this.scene.endGame();
                        }
    
                        const targets: number = this.unit.findTargets(this.scene.tiles, this.positionXInGrid, this.positionYInGrid);
                        if (targets === 0) {
                            this.scene.nextPlayer();
                        } else {
                            this.scene.isUnitAction = true;
                        }
                    }
                    else {
                        throw new Error('Unit should be defined at this after at first click in turn!');
                    }
                }
            }

        });
        this.positionXInGrid = positionXInGrid;
        this.positionYInGrid = positionYInGrid;
    }

    putUnit(unit: IUnit)
    {
        if (unit.getPlayer() !== this.scene.activePlayer) {
            return;
        }

        unit.isOnBoard = true;
        unit.disableFollowingPointer();
        unit.removeInteractive();
        unit.setPosition(this.gameObject.x, this.gameObject.y);
        this.unit = unit;
    }

    belongsToPlayer(player: Players): boolean {
        return !!this.unit && this.unit.getPlayer() === player;
    }

    markActive(): void {
        this.gameObject.setTexture(Tile.textureNameActive);
        this.isActive = true;
    }
    markUnactive(): void {
        this.gameObject.setTexture(Tile.textureName);
        this.isActive = false;
    }

    hasEnemyUnit(): boolean {
        return !!this.unit && this.unit.getPlayer() != this.scene.activePlayer;
    }
}