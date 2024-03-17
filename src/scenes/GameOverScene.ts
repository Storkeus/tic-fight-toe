import AScene from './AScene';
import BoardScene from './BoardScene';
import MenuScene from './MenuScene';

export default class GameOverScene extends AScene {
    
    static readonly key: string = 'GameOver';
    
    winner: string = 'unknown';

    constructor() {
        super(GameOverScene.key);
    }

    init(data){
        this.winner = data.winner;
    }

    preload() {
        this.load.image('background-menu', 'images/background-menu.png');
    }

    create() {
        this.scene.remove(BoardScene.key);

        this.add.image(400, 300, 'background-menu');
 
        const gameOverText = this.add.text(400, 300, `Player ${this.winner} wins`, {fontSize: 50});
        gameOverText.setX(gameOverText.x - (gameOverText.displayWidth / 2));
        gameOverText.setY(gameOverText.y - gameOverText.displayHeight);

        const backToMenuButton = this.add.text(800, 600, 'Back to menu', {fontSize: 30});
        backToMenuButton.setX(backToMenuButton.x - backToMenuButton.displayWidth - 20);
        backToMenuButton.setY(backToMenuButton.y - backToMenuButton.displayHeight - 20);

        backToMenuButton.setInteractive();

        backToMenuButton.on('pointerdown', () => {
            this.scene.start(MenuScene.key);
        });
    }
}
