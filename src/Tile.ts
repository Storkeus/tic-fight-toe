import IFighter from "./fighters/IFighter";
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
        .on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (this.scene.isFighterAction) {
                if (this.isActive && this.fighter) {
                    this.fighter.remove();
                    this.fighter = undefined;
                    this.scene.nextPlayer();
                }
            } else {
                let firstClickInTurn: boolean = false;
                if (!this.fighter) {
                    this.putFighter(this.scene.selectedFighter);
                    firstClickInTurn = true;
                }

                if (firstClickInTurn) {
                    if (this.fighter !== undefined) {
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
                    else {
                        throw new Error('Fighter should be defined at this after at first click in turn!');
                    }
                }
            }

        });
        this.positionXInGrid = positionXInGrid;
        this.positionYInGrid = positionYInGrid;
    }

    putFighter(fighter: IFighter)
    {
        fighter.isOnBoard = true;
        fighter.disableFollowingPointer();
        fighter.removeInteractive();
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