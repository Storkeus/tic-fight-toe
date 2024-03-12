import IFighter from "./fighters/IFighter";
import Knight from "./fighters/Knight";
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
    private fighter?: IFighter;

    public positionXInGrid: number;
    public positionYInGrid: number;

    private isActive: boolean = false;

    constructor (positionX: number, positionY: number, scene: BoardScene, positionXInGrid: number, positionYInGrid: number)
    {
        this.scene = scene;
        this.gameObject = this.scene.add.image(positionX, positionY, Tile.textureName).setInteractive()
        .on('pointerdown', () => {
            if (this.scene.isFighterAction) {
                if (this.isActive && this.fighter) {
                    this.fighter.remove();
                    this.fighter = undefined;
                    this.scene.nextPlayer();
                }
            } else {
                if (this.fighter !== undefined) {
                    this.putFighter(this.scene.selectedFighter);

                    const winConditionChecker = new WinConditionChecker();
                    if(winConditionChecker.checkWinConditionAfterTileChange(this.scene.tiles, this, this.scene.activePlayer)) {
                        this.scene.endGame();
                    }

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
        console.log(!!this.fighter && this.fighter.getPlayer() === player)
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