// Simple static credits list. Edit the 'credits' array to add entries.
import { Fonts, Colors } from '../ui/styles.js';

export default class AboutScene extends Phaser.Scene {
    constructor(){ super('AboutScene'); }

    create(){
        this.cameras.main.setBackgroundColor(Colors.bgDark);
        this.add.text(32, 28, 'ABOUT', { fontFamily: Fonts.ui, fontSize: '32px', color: Colors.text });

        const credits = [
            { name: 'Your Name', role: 'Lead Developer', sub: '' },
            { name: 'Contributors', role: 'Thanks to everyone who helped', sub: '' }
        ];

        let y = 90;
        credits.forEach(c => {
            this.add.text(32, y, c.name, { fontFamily: Fonts.ui, fontSize: '22px', color: Colors.text });
            y += 26;
            this.add.text(32, y, c.role, { fontFamily: Fonts.ui, fontSize: '16px', color: Colors.textDim });
            y += 28;
            if (c.sub) { this.add.text(32, y, c.sub, { fontFamily: Fonts.ui, fontSize: '14px', color: Colors.textDim }); y += 22; }
            y += 6;
        });

        const back = this.add.text(32, this.scale.height - 28, 'BACK', {
            fontFamily: Fonts.ui, fontSize: '16px', color: Colors.accent
        }).setInteractive({ useHandCursor: true }).on('pointerup', () => this.scene.start('MainMenuScene'));
    }
}