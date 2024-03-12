import Phaser from 'phaser'

import BoardScene from './scenes/BoardScene'
import MenuScene from './scenes/MenuScene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	scene: [MenuScene, BoardScene]
}

export default new Phaser.Game(config)
