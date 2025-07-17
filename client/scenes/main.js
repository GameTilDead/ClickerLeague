import MainMenuScene from './scenes/MainMenuScene.js';
import RunScene from './scenes/RunScene.js';

const config = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    backgroundColor: '#121212',
    scene: [MainMenuScene, RunScene]
};