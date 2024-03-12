import Phaser from 'phaser'

export default class MenuScene extends Phaser.Scene {
    
    constructor() {
        super('Menu');
    }

    preload() {
        this.load.image('background', 'images/background-menu.png');
    }

    create() {
        this.add.image(400, 300, 'background');

        const helloButton = this.add.text(400, 300, 'Start', {fontSize: 50});
        helloButton.setX(helloButton.x - (helloButton.displayWidth / 2));
        helloButton.setY(helloButton.y - helloButton.displayHeight);

        helloButton.setInteractive();

        helloButton.on('pointerdown', () => {
            this.scene.stop('Menu');
            this.scene.start('Board');
            this.scene.bringToTop('Board');
        });
    }
}
