export default class ProgressBar extends Phaser.GameObjects.Container {
    constructor(scene, x, y, width, height) {
        super(scene, x, y);
        this.w = width; this.h = height;
        this.bg = scene.add.rectangle(0, 0, width, height, 0x1a1a1a).setOrigin(0, 0.5);
        this.fg = scene.add.rectangle(0, 0, 0, height, 0xffffff).setOrigin(0, 0.5);
        this.add([this.bg, this.fg]);
        scene.add.existing(this);
    }
    setProgress(t) {
        const clamped = Math.max(0, Math.min(1, t));
        this.fg.width = this.w * clamped;
    }
}