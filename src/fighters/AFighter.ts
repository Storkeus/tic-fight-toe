import { Players } from "~/Players";
import BoardScene from "~/scenes/BoardScene";
import Tile from "~/Tile";
import IFighter from "./IFighter";

export default abstract class AFighter implements IFighter {
    private scene: BoardScene;
    private gameObject: Phaser.GameObjects.Sprite;
    protected player: Players;

    constructor(player: Players , scene: BoardScene, x: number, y: number) {
        this.player = player;
        this.scene = scene;
        const texture = this.getActiveTexture();
        this.gameObject = this.scene.add.sprite(x, y, texture);

        this.gameObject.anims.play(`${texture}-idle`, true);
    }

    abstract findTargets(grid: Tile[][], startX: number, startY: number): number;

    setPosition(x: number, y: number): void {
       this.gameObject.setPosition(x, y);
    }

    protected abstract getActiveTexture(): string;

    public getPlayer(): Players {
        return this.player;
    }
    remove():void {
        this.gameObject.destroy();
    };
}