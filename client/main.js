import MenuScene from './scenes/MainMenuScene.js';
import RunScene from './scenes/RunScene.js';

// Phaser setup
const config = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    backgroundColor: '#121212',
    scene: [MenuScene, RunScene]
};

const game = new Phaser.Game(config);