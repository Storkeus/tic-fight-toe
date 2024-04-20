import AScene from './AScene';
import BoardScene from './BoardScene';

export default class MenuScene extends AScene {
    
    static readonly key: string = 'Menu';

    constructor() {
        super(MenuScene.key);
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
            this.scene.add(BoardScene.key, BoardScene, true);
        });

        const copyrightText = this.add.text(400, 600, '© 2024 StorkyCode', {fontSize: '15px'});
        copyrightText.setX(copyrightText.x - (copyrightText.displayWidth / 2));
        copyrightText.setY(copyrightText.y - copyrightText.displayHeight);
    }
}
