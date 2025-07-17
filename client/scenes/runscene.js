export default class RunScene extends Phaser.Scene {
    constructor() {
        super('Run');
    }

    init(data) {
        this.mods = data.mods || [];
    }

    create() {
        this.add.text(320, 260, 'Running Match...', {
            fontSize: '24px', color: '#ffffff'
        });

        this.add.text(20, 500, `Mods: ${this.mods.join(', ')}`, {
            fontSize: '14px', color: '#aaaaaa'
        });
    }
}