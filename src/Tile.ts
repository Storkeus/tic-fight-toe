import IFighter from "./fighters/IFighter";
import Knight from "./fighters/Knight";
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
    private fighter?: IFighter;

    private positionXInGrid: number;
    private positionYInGrid: number;

    private isActive: boolean = false;

    constructor (positionX: number, positionY: number, scene: BoardScene, positionXInGrid: number, positionYInGrid: number)
    {
        this.scene = scene;
        this.gameObject = this.scene.add.image(positionX, positionY, Tile.textureName).setInteractive()
        .on('pointerdown', () => {
            if (this.scene.isFighterAction) {
                if (this.isActive && this.fighter) {
                    console.log('removing');
                    this.fighter.remove();
                    this.fighter = undefined;
                    this.scene.nextPlayer();
                }
            } else {
                if (!this.fighter) {
                    this.putFighter(this.scene.selectedFighter);
                    const targets: number = this.fighter.findTargets(this.scene.tiles, this.positionXInGrid, this.positionYInGrid);
                    if (targets === 0) {
                        this.scene.nextPlayer();
                    } else {
                        this.scene.isFighterAction = true;
                    }
                }
            }

        });
        this.positionXInGrid = positionXInGrid;
        this.positionYInGrid = positionYInGrid;
    }

    putFighter(fighter: IFighter)
    {
        fighter.setPosition(this.gameObject.x, this.gameObject.y);
        this.fighter = fighter;
    }

    belongsToPlayer(player: Players): boolean {
        return !!this.fighter && this.fighter.getPlayer() === player;
    }

    markActive(): void {
        this.gameObject.setTexture(Tile.textureNameActive);
        this.isActive = true;
    }
    markUnactive(): void {
        this.gameObject.setTexture(Tile.textureName);
        this.isActive = false;
    }

    hasEnemyFighter(): boolean {
        return !!this.fighter && this.fighter.getPlayer() != this.scene.activePlayer;
    }
}