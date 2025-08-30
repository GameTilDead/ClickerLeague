import { Fonts, Colors } from '../ui/styles.js';

export default class ClickerChannelScene extends Phaser.Scene {
    constructor(){ super('ClickerChannelScene'); }

    create(){
        this.cameras.main.setBackgroundColor(Colors.bgDark);
        this.add.text(32, 28, 'CLICKER CHANNEL', { fontFamily: Fonts.ui, fontSize: '32px', color: Colors.text });

        const items = ['LEADERBOARDS', 'ME', 'PLAYERS', 'ACHIEVEMENTS'];
        items.forEach((t, i) => {
            this.add.text(32, 90 + i*36, t, { fontFamily: Fonts.ui, fontSize: '18px', color: Colors.textDim });
        });

        this.add.text(32, this.scale.height - 28, 'BACK', {
            fontFamily: Fonts.ui, fontSize: '16px', color: Colors.accent
        }).setInteractive({ useHandCursor: true }).on('pointerup', () => this.scene.start('MainMenuScene'));
    }
}