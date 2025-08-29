import CLButton from '../ui/components/CLButton.js';
import CLTicker from '../ui/components/CLTicker.js';
import { Colors } from '../ui/styles.js';


export default class MainMenuScene extends Phaser.Scene {
    constructor(){ super('MainMenuScene'); }


    create(){
        const bannerHeight = 140;
        const hasBanner = false; // toggle when a banner is available
        const yStart = hasBanner ? bannerHeight + 40 : 80;
        const btnWidth = Math.min(this.scale.width * 0.8, 900);
        const btnHeight = 90;
        const rightX = this.scale.width - 40;


        const buttons = [
            { label: 'MULTIPLAYER', color: Colors.mp, action: () => this.scene.start('MultiplayerLoaderScene') },
            { label: 'PRACTICE', color: Colors.solo, action: () => this.scene.start('PracticeScene') },
            { label: 'CLICKER CHANNEL', color: Colors.channel, action: () => this.scene.start('ClickerChannelScene') },
            { label: 'CONFIG', color: Colors.config, action: () => this.scene.start('ConfigScene') },
            { label: 'ABOUT', color: Colors.about, action: () => this.scene.start('AboutScene') },
            { label: 'EXIT', color: '#333333', action: () => window.close() },
        ];


        buttons.forEach((b, i) => {
            const btn = new CLButton(this, rightX, yStart + i * (btnHeight + 24), btnWidth, btnHeight, b.label, b.color, b.action);
            this.add.existing(btn);
            btn.entrance(60 * i);
        });


        new CLTicker(this, 'WELCOME TO CLICKER LEAGUE! This is a fusion of Tetra League (from TETR.IO) and Zenith Clicker.');
    }
}