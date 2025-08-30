// Right-anchored menu button that extends left from the right edge.
// Includes entrance animation and subtle hover nudge/lift.
import { Fonts } from '../styles.js';

export default class CLButton extends Phaser.GameObjects.Container {
    constructor(scene, rightX, y, width, height, label, hexColor, onClick) {
        super(scene, rightX, y);

        this.w = width;
        this.h = height;
        this.onClick = onClick;

        // Drawn so the right edge lines up at x=0; the body extends left.
        this.bg = scene.add.rectangle(0, 0, width, height, Phaser.Display.Color.HexStringToColor(hexColor).color)
            .setOrigin(1, 0.5);
        this.bg.setStrokeStyle(2, 0xFFFFFF, 0.12);

        this.text = scene.add.text(-width + 24, 0, label, {
            fontFamily: Fonts.ui,
            fontSize: '28px',
            color: '#ffffff'
        }).setOrigin(0, 0.5);

        this.add([this.bg, this.text]);
        scene.add.existing(this);

        this.setSize(width, height);
        this.setInteractive(new Phaser.Geom.Rectangle(-width, -height/2, width, height), Phaser.Geom.Rectangle.Contains);

        // Hover: slight left nudge and lift; Out: restore.
        this.on('pointerover', () => {
            scene.tweens.add({ targets: this, y: y - 3, duration: 90, ease: 'Quad.easeOut' });
            scene.tweens.add({ targets: this, x: rightX + 6, duration: 90, ease: 'Quad.easeOut' });
        });
        this.on('pointerout', () => {
            scene.tweens.add({ targets: this, y, duration: 120, ease: 'Quad.easeOut' });
            scene.tweens.add({ targets: this, x: rightX, duration: 120, ease: 'Quad.easeOut' });
        });

        this.on('pointerup', () => { if (typeof this.onClick === 'function') this.onClick(); });
    }

    // Slides in from the right with a slight upward motion.
    entrance(delayMs = 0) {
        const startX = this.x + 40;
        const startY = this.y + 6;
        this.setPosition(startX, startY);
        this.scene.tweens.add({
            targets: this,
            x: this.x - 40, y: this.y - 6,
            ease: 'Cubic.easeOut',
            duration: 380,
            delay: delayMs
        });
    }
}