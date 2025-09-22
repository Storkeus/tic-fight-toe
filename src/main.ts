import Phaser from 'phaser'

import MenuScene from './scenes/MenuScene'
import GameOverScene from './scenes/GameOverScene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	pixelArt: true,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	scene: [MenuScene, GameOverScene]
}

export default new Phaser.Game(config)
