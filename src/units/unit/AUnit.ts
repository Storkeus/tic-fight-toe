import { Players } from "../../Players";
import BoardScene from "../../scenes/BoardScene";
import Tile from "../../Tile";
import IObservableUnit from "../unitObserver/IObservableUnit";
import IUnit from "./IUnit";
import IUnitObserver from "../unitObserver/IUnitObserver";
import UnitEventDTO from "../unitObserver/UnitEventDTO";

export default abstract class AUnit implements IUnit, IObservableUnit {
    private scene: BoardScene;
    private container: Phaser.GameObjects.Container;
    private gameObject: Phaser.GameObjects.Sprite;
    protected player: Players;
    public isOnBoard: boolean = false;
    private initialXPosition: number;
    private initialYPosition: number;
    private observers: Array<IUnitObserver> = [];
    protected numberOfSpecialAbilityUses: number = 0;
    private sparkle: Phaser.GameObjects.Sprite | undefined;

    constructor(player: Players , scene: BoardScene, x: number, y: number) {
        this.player = player;
        this.scene = scene;
        this.initialXPosition = x;
        this.initialYPosition = y;
        const texture = this.getActiveTexture();
        
        this.container = this.scene.add.container(x, y);
        this.gameObject = this.scene.add.sprite(0, 0, texture);
        this.container.add(this.gameObject);
        
        this.container.setInteractive(new Phaser.Geom.Rectangle(-this.gameObject.width/2, -this.gameObject.height/2, this.gameObject.width, this.gameObject.height), Phaser.Geom.Rectangle.Contains);
        this.scene.input.setDraggable(this.container);
        
        this.gameObject.anims.play(`${texture}-idle`, true);
        this.container.addListener(Phaser.Input.Events.POINTER_OVER, () => {
            this.scene.setUnitDescription(this);
        });

        this.container.addListener(Phaser.Input.Events.POINTER_OUT, () => {
            this.scene.hideUnitDescription();
        });

        this.container.on(Phaser.Input.Events.GAMEOBJECT_DRAG, (_pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
            this.setPosition(dragX, dragY);
        });

        this.container.on(Phaser.Input.Events.GAMEOBJECT_DRAG_END, (_pointer: Phaser.Input.Pointer, _dragX: number, _dragY: number) => {
            this.setPosition(this.initialXPosition, this.initialYPosition);
        });

        this.container.on(
            Phaser.Input.Events.GAMEOBJECT_DROP, 
            (
                _pointer: Phaser.Input.Pointer,
                gameObject: Phaser.GameObjects.GameObject,
                _dragX: number,
                _dragY: number
            ) => {
            gameObject.emit(Tile.EVENT_UNIT_DROPPED_INTO, this);
        });
    }

    canUseAbility(): boolean {
        return this.numberOfSpecialAbilityUses > 0;
    }
    noteAbilityUsage(): void {
        this.numberOfSpecialAbilityUses--;

        if (!this.canUseAbility()) {
            this.sparkle?.destroy();
            this.sparkle = undefined;
        }
    }

    putOnBoard(x: number, y: number): void {
        this.isOnBoard = true;
        this.removeInteractive();
        this.setPosition(x, y);
        this.notify();

        if (this.canUseAbility()) {
            this.sparkle = this.scene.add.sprite(
                0,
                0,
                'sparkle'
            );
            this.sparkle.anims.play('sparkle-sparkle-sparkle');
            this.container.add(this.sparkle);
        }

        this.scene.sound.play(BoardScene.UNIT_PLACED_SOUND_NAME);
    }

    attach(observer: IUnitObserver): void {
        if (this.observers.includes(observer)) {
            return;
        }
        this.observers.push(observer);
    }

    detach(observer: IUnitObserver): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return;
        }

        this.observers.splice(observerIndex, 1);
    }

    notify(): void {
        for (const observer of this.observers) { 
            observer.update(new UnitEventDTO(UnitEventDTO.EVENT_NAME_UNIT_IS_PLACED_ON_BOARD));
        }
    }

    abstract getDescription(): string 

    abstract getTextureNameForPlayer(_playerNumber: number): string;

    abstract findTargets(grid: Tile[][], startX: number, startY: number): number;

    setPosition(x: number, y: number): void {
       this.container.setPosition(x, y);
    }

    removeInteractive(): void {
        this.container.removeInteractive();
    }

    protected abstract getActiveTexture(): string;

    public getPlayer(): Players {
        return this.player;
    }

    remove(): void {
        this.container.destroy();
    }
}