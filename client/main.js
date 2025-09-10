import LoadScene from './scenes/LoadScene.js';
import MainMenuScene from './scenes/MainMenuScene.js';
import MultiplayerLoadScene from './scenes/MultiplayerLoadScene.js';
import MultiplayerScene from './scenes/MultiplayerScene.js';     // provided below
import SingleplayerScene from './scenes/SingleplayerScene.js';
import RunScene from './scenes/RunScene.js';

const config = {
    type: Phaser.AUTO,
    parent: 'app',
    backgroundColor: '#000000',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720
    },
    scene: [
        LoadScene,
        MainMenuScene,
        MultiplayerLoadScene,
        MultiplayerScene,
        SingleplayerScene,
        RunScene
    ]
};

window.addEventListener('DOMContentLoaded', () => {
    new Phaser.Game(config);
});