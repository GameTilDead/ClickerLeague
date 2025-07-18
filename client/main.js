import MenuScene from './scenes/menuscene.js';
import RunScene from './scenes/runscene.js';

// Phaser setup
const config = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    backgroundColor: '#121212',
    scene: [MenuScene, RunScene]
};

const game = new Phaser.Game(config);