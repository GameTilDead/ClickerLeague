export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }
    preload() {
        this.load.image('cardBack', 'assets/cards/expert-back.png');
        this.load.image('cardFace', 'assets/cards/expert.png');
    }
    create() {
        this.add.text(300, 20, 'CLICKER LEAGUE - MAIN MENU', { fontSize: '20px', color: '#ffffff' });
        this.card = this.add.image(480, 270, 'cardBack').setInteractive();
        this.card.on('pointerdown', () => {
            this.scene.start('Run');
        });
    }
}