import IFighter from "./fighters/IFighter";
import { Players } from "./Players";
import BoardScene from "./scenes/BoardScene";

export default class Tile
{
    static readonly textureName: string = 'tile';
    static readonly texturePath: string = 'images/tile.png';
    private gameObject: Phaser.GameObjects.Image; 
    private scene: BoardScene;
    private fighter?: IFighter;

    constructor (positionX: number, positionY: number, scene: BoardScene)
    {
        this.scene = scene;
        this.gameObject = this.scene.add.image(positionX, positionY, Tile.textureName).setInteractive()
        .on('pointerdown', () => {
            if (!this.fighter) {
                this.putFighter(this.scene.selectedFighter);
                this.scene.nextPlayer();
            }
        });
    }

    putFighter(fighter: IFighter)
    {
            fighter.setPosition(this.gameObject.x, this.gameObject.y);
            this.fighter = fighter;
    }

    belongsToPlayer(player: Players): boolean {
        return !!this.fighter && this.fighter.getPlayer() === player;
    }
}