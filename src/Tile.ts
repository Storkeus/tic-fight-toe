import IUnit from "./units/unit/IUnit";
import WinConditionChecker from "./helpers/WinConditionChecker";
import { Players } from "./Players";
import BoardScene from "./scenes/BoardScene";

export default class Tile
{
    static readonly textureName: string = 'tile';
    static readonly texturePath: string = 'images/tile.png';
    static readonly textureNameActive: string = 'tile-active';
    static readonly texturePathActive: string = 'images/tile-active.png';
    static readonly EVENT_UNIT_DROPPED_INTO =  'unit_dropped_into';

    private gameObject: Phaser.GameObjects.Image; 
    private scene: BoardScene;
    private unit?: IUnit;
    private activationReasonUnit?: IUnit;

    public positionXInGrid: number;
    public positionYInGrid: number;

    private isActive: boolean = false;

    constructor (positionX: number, positionY: number, scene: BoardScene, positionXInGrid: number, positionYInGrid: number)
    {
        this.scene = scene;
        this.gameObject = this.scene.add.image(positionX, positionY, Tile.textureName).setInteractive({dropZone: true})
        .on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (this.scene.isUnitAction) {
                if (this.isActive && this.unit) {
                    this.unit.remove();
                    this.unit = undefined;

                    if (this.activationReasonUnit) {
                        this.activationReasonUnit.numberOfSpecialAbilityUses--;
                    }

                    this.scene.nextPlayer();
                }
            }  else if (this.unit && this.unit.getPlayer() === this.scene.activePlayer) {
                const targets: number = this.unit.findTargets(this.scene.tiles, this.positionXInGrid, this.positionYInGrid);
                if (targets > 0) {
                    this.scene.isUnitAction = true;
                }
            }
        }).on(Tile.EVENT_UNIT_DROPPED_INTO, (unit: IUnit) => {
            if (!this.scene.isUnitAction && !this.unit) {
                this.putUnit(unit);

                const winConditionChecker = new WinConditionChecker();
                if(winConditionChecker.checkWinConditionAfterTileChange(this.scene.tiles, this, this.scene.activePlayer)) {
                    this.scene.endGame();
                } else {
                    this.scene.nextPlayer();
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

        unit.putOnBoard(this.gameObject.x, this.gameObject.y);
        this.unit = unit;
    }

    belongsToPlayer(player: Players): boolean {
        return !!this.unit && this.unit.getPlayer() === player;
    }

    markActive(activationReasonUnit?: IUnit): void {
        this.activationReasonUnit = activationReasonUnit;
        this.gameObject.setTexture(Tile.textureNameActive);
        this.isActive = true;
    }
    markUnactive(): void {
        this.activationReasonUnit = undefined;
        this.gameObject.setTexture(Tile.textureName);
        this.isActive = false;
    }

    hasEnemyUnit(): boolean {
        return !!this.unit && this.unit.getPlayer() != this.scene.activePlayer;
    }
}