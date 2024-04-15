import { Players } from "~/Players";
import BoardScene from "~/scenes/BoardScene";
import Tile from "~/Tile";
import IUnit from "./IUnit";
import debounce from "debounce";

export default abstract class AUnit implements IUnit {
    private scene: BoardScene;
    private gameObject: Phaser.GameObjects.Sprite;
    protected player: Players;
    public isOnBoard: boolean = false;
    private shouldFollowPointer: boolean = false;
    private initialXPosition: number;
    private initialYPosition: number;

    constructor(player: Players , scene: BoardScene, x: number, y: number) {
        this.player = player;
        this.scene = scene;
        this.initialXPosition = x;
        this.initialYPosition = y;
        const texture = this.getActiveTexture();
        
        this.gameObject = this.scene.add.sprite(x, y, texture).setInteractive({draggable: true});
        this.gameObject.anims.play(`${texture}-idle`, true);
        this.gameObject.addListener(Phaser.Input.Events.POINTER_OVER, () => {
            this.scene.setUnitDescription(this); // Refactor to event sending
        });

        this.gameObject.addListener(Phaser.Input.Events.POINTER_OUT, () => {
            this.scene.hideUnitDescription();
        });

        this.gameObject.on(Phaser.Input.Events.GAMEOBJECT_DRAG, (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
            this.setPosition(dragX, dragY);
        });

        this.gameObject.on(Phaser.Input.Events.GAMEOBJECT_DRAG_END, (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
            this.setPosition(this.initialXPosition, this.initialYPosition);
        });

        this.gameObject.on(
            Phaser.Input.Events.GAMEOBJECT_DROP, 
            (
                pointer: Phaser.Input.Pointer,
                gameObject: Phaser.GameObjects.GameObject,
                dragX: number,
                dragY: number
            ) => {
            gameObject.emit(Tile.EVENT_UNIT_DROPPED_INTO, this);
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
}