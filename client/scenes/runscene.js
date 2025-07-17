export default class RunScene extends Phaser.Scene {
    constructor() {
        super('Run');
    }
    create() {
        this.add.text(320, 260, 'Running Match...', { fontSize: '24px', color: '#ffffff' });
    }
}