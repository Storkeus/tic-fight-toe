import { BOARD_SCENE_KEY, GAME_OVER_SCENE_KEY, MENU_SCENE_KEY } from '../helpers/SceneKeys';

export default class GameOverScene extends Phaser.Scene {
        
    winner: string = 'unknown';

    constructor() {
        super(GAME_OVER_SCENE_KEY);
    }

    init(data: { winner: string; }){
        this.winner = data.winner;
    }

    preload() {
        this.load.image('background-menu', 'images/background-menu.png');
    }

    create() {
        this.scene.remove(BOARD_SCENE_KEY);

        this.add.image(400, 300, 'background-menu');
 
        const gameOverText = this.add.text(400, 300, `Player ${this.winner} wins`, {fontSize: '50px'});
        gameOverText.setX(gameOverText.x - (gameOverText.displayWidth / 2));
        gameOverText.setY(gameOverText.y - gameOverText.displayHeight);

        const backToMenuButton = this.add.text(800, 600, 'Back to menu', {fontSize: '30px'});
        backToMenuButton.setX(backToMenuButton.x - backToMenuButton.displayWidth - 20);
        backToMenuButton.setY(backToMenuButton.y - backToMenuButton.displayHeight - 20);

        backToMenuButton.setInteractive();

        backToMenuButton.on('pointerdown', () => {
            this.scene.start(MENU_SCENE_KEY);
        });
    }
}
