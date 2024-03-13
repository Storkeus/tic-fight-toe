import AScene from './AScene';
import BoardScene from './BoardScene';

export default class MenuScene extends AScene {
    
    static readonly key: string = 'Menu';

    constructor() {
        super(MenuScene.key);
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
            this.scene.stop(MenuScene.key);
            this.scene.start(BoardScene.key);
            this.scene.bringToTop(BoardScene.key);
        });
    }
}
