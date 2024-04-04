import { Players } from "~/Players";
import BoardScene from "~/scenes/BoardScene";
import Tile from "~/Tile";
import IFighter from "./IFighter";
import debounce from "debounce";

export default abstract class AFighter implements IFighter {
    private scene: BoardScene;
    private gameObject: Phaser.GameObjects.Sprite;
    protected player: Players;
    public isOnBoard: boolean = false;

    constructor(player: Players , scene: BoardScene, x: number, y: number) {
        this.player = player;
        this.scene = scene;
        const texture = this.getActiveTexture();
        
        this.gameObject = this.scene.add.sprite(x, y, texture).setInteractive();
        this.gameObject.anims.play(`${texture}-idle`, true);
        this.gameObject.addListener(Phaser.Input.Events.POINTER_OVER, () => {
            this.scene.setFighterDescription(this); // Refactor to event sending
        });

        this.gameObject.addListener(Phaser.Input.Events.POINTER_OUT, () => {
            this.scene.hideFighterDescription();
        });

        this.gameObject.addListener(Phaser.Input.Events.POINTER_DOWN, () => {
            this.scene.selectedFighter = this;
            this.enableFollowingPointer();
        });

    }

    getDescription(): string {
        throw new Error("Method not implemented.");
    }

    getTextureNameForPlayer(playerNumber: number): string {
        throw new Error("Method not implemented.");
    }

    abstract findTargets(grid: Tile[][], startX: number, startY: number): number;

    setPosition(x: number, y: number): void {
       this.gameObject.setPosition(x, y);
    }

    removeInteractive(): void {
        this.gameObject.removeInteractive();
    }

    protected abstract getActiveTexture(): string;

    public getPlayer(): Players {
        return this.player;
    }

    remove(): void {
        this.gameObject.destroy();
    }

    enableFollowingPointer(): void {
        this.gameObject.setDepth(50);
        this.removeInteractive();
        this.scene.input.on(Phaser.Input.Events.POINTER_MOVE, this.followPointerFunction);
    }

    disableFollowingPointer(): void {
        this.gameObject.setDepth(0);
        this.scene.input.off(Phaser.Input.Events.POINTER_MOVE, this.followPointerFunction);
    }

    private followPointerFunction: Function = debounce((pointer: Phaser.Input.Pointer) => {
        this.gameObject.setPosition(pointer.worldX-50, pointer.worldY-50);
    }, 10);
}