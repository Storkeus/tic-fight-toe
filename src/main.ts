import Phaser from 'phaser'

import BoardScene from './scenes/BoardScene'

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
	scene: [BoardScene]
}

export default new Phaser.Game(config)
