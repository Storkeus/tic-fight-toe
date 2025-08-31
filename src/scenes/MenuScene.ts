import { MENU_SCENE_KEY, UNIT_SELECTION_SCENE_KEY } from '../helpers/SceneKeys';
import UnitSelectionScene from './UnitSelectionScene';

export default class MenuScene extends Phaser.Scene {

    constructor() {
        super(MENU_SCENE_KEY);
    }

    preload() {
        this.load.image('background-menu', 'images/background-menu.png');
    }

    create() {
        this.add.image(400, 300, 'background-menu');

        const helloButton = this.add.text(400, 300, 'Start', {fontSize: '50px'});
        helloButton.setX(helloButton.x - (helloButton.displayWidth / 2));
        helloButton.setY(helloButton.y - helloButton.displayHeight);

        helloButton.setInteractive();

        helloButton.on('pointerdown', () => {
            this.scene.add(UNIT_SELECTION_SCENE_KEY, UnitSelectionScene, true);
        });

        const copyrightText = this.add.text(400, 600, '© 2025 StorkyCode', {fontSize: '15px'});
        copyrightText.setX(copyrightText.x - (copyrightText.displayWidth / 2));
        copyrightText.setY(copyrightText.y - copyrightText.displayHeight);
    }
}
