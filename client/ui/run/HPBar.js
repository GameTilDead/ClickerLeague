export default class HPBar extends Phaser.GameObjects.Container {
    constructor(scene, xCenter, y, width, height) {
        super(scene, xCenter, y);
        this.totalW = width; this.h = height;


        // Background spans full width for context
        this.bg = scene.add.rectangle(-width/2, 0, width, height, 0x222222).setOrigin(0, 0.5);
        // Left and right fills begin at center and expand outward
        this.leftFill = scene.add.rectangle(0, 0, 0, height, 0x5ad469).setOrigin(1, 0.5);
        this.rightFill = scene.add.rectangle(0, 0, 0, height, 0x5ad469).setOrigin(0, 0.5);


        this.add([this.bg, this.leftFill, this.rightFill]);
        scene.add.existing(this);
    }


    setValue(f){
        const t = Math.max(0, Math.min(1, f));
        const half = (this.totalW/2) * t;
        // Left fill extends left from center by half the fraction
        this.leftFill.width = half;
        this.leftFill.x = 0; // right edge anchored at center
        // Right fill mirrors left for symmetry
        this.rightFill.width = half;
        this.rightFill.x = 0; // left edge anchored at center
    }
}