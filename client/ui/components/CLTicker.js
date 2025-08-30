// Bottom left static ticker: "WELCOME TO CLICKER LEAGUE!".
import { Fonts, Colors } from '../styles.js';

export default class CLTicker extends Phaser.GameObjects.Container {
    constructor(scene, text = 'WELCOME TO CLICKER LEAGUE!') {
        super(scene, 0, 0);

        const margin = 16;
        const y = scene.scale.height - margin;

        // Slight translucent background for legibility.
        const bg = scene.add.rectangle(margin, y, 520, 28, 0x000000, 0.35).setOrigin(0, 1);
        const label = scene.add.text(margin + 10, y - 4, text, {
            fontFamily: Fonts.ui,
            fontSize: '16px',
            color: Colors.textDim
        }).setOrigin(0, 1);

        this.add([bg, label]);
        scene.add.existing(this);

        // Adjust on resize.
        scene.scale.on('resize', (gameSize) => {
            const yy = gameSize.height - margin;
            bg.y = yy; label.y = yy - 4;
        });
    }
}