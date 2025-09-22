
import type Sprite from "./Sprite";
import { ARCHER_PLAYER_1, ARCHER_PLAYER_2, KNIGHT_PLAYER_1, KNIGHT_PLAYER_2, MINUS_BUTTON, PEASANT_PLAYER_1, PEASANT_PLAYER_2, PLUS_BUTTON } from "./Sprites";

export default class SpriteLoader {
    private loadSpritesheet(scene: Phaser.Scene, unitSprite: Sprite) {
        scene.load.spritesheet(unitSprite.textureName, unitSprite.texturePath, {
            frameWidth: unitSprite.frameWidth,
            frameHeight: unitSprite.frameHeight
        });
    }

    private loadAnimation(scene: Phaser.Scene, unitSprite: Sprite, keyPostfix: string) {
        scene.anims.create({
            key: `${unitSprite.textureName}-${keyPostfix}`,
            frames: scene.anims.generateFrameNumbers(unitSprite.textureName, { start: unitSprite.startFrame, end: unitSprite.endFrame }),
            frameRate: unitSprite.frameRate,
            repeat: unitSprite.repeat
        });
    }

    public loadAllUnitSpritesheets(scene: Phaser.Scene, includeFreeUnits: boolean) {
        this.loadSpritesheet(scene, KNIGHT_PLAYER_1);
        this.loadSpritesheet(scene, KNIGHT_PLAYER_2);
        this.loadSpritesheet(scene, ARCHER_PLAYER_1);
        this.loadSpritesheet(scene, ARCHER_PLAYER_2);
        if (includeFreeUnits) {
            this.loadSpritesheet(scene, PEASANT_PLAYER_1);
            this.loadSpritesheet(scene, PEASANT_PLAYER_2);
        }
    }

    public loadAllUnitAnimations(scene: Phaser.Scene, includeFreeUnits: boolean) {
        this.loadAnimation(scene, KNIGHT_PLAYER_1, 'idle');
        this.loadAnimation(scene, KNIGHT_PLAYER_2, 'idle');
        this.loadAnimation(scene, ARCHER_PLAYER_1, 'idle');
        this.loadAnimation(scene, ARCHER_PLAYER_2, 'idle');
        if (includeFreeUnits) {
            this.loadAnimation(scene, PEASANT_PLAYER_1, 'idle');
            this.loadAnimation(scene, PEASANT_PLAYER_2, 'idle');
        }
    }

    public loadPlusButton(scene: Phaser.Scene) {
        this.loadSpritesheet(scene, PLUS_BUTTON);
    }

    public loadMinusButton(scene: Phaser.Scene) {
        this.loadSpritesheet(scene, MINUS_BUTTON);
    }
}