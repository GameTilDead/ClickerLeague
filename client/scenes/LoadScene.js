import ProgressBar from '../ui/components/ProgressBar.js';

export default class LoadScene extends Phaser.Scene {
    constructor() { super('LoadScene'); }

    // Load JSON constants before create() runs.
    preload() {
        this.cameras.main.setBackgroundColor('#000000');
        this.load.json('gameplayConstants', '../shared/constants/gameplay.json');
    }

    async create() {
        // UI: status text + progress bar
        const msg = this.add.text(this.scale.width / 2, this.scale.height / 2 - 40, 'Loading...', {
            fontFamily: 'DIN, Bahnschrift, sans-serif', fontSize: '20px', color: '#ffffff'
        }).setOrigin(0.5);

        const bar = new ProgressBar(this, this.scale.width / 2 - 200, this.scale.height / 2, 400, 8);

        // Simulated phased init; replace or extend with real work as needed
        const steps = [
            { label: 'Preparing renderer',   delay: 200 },
            { label: 'Loading constants',    delay: 200 },
            { label: 'Initializing systems', delay: 250 },
            { label: 'Connecting services',  delay: 250 }
        ];

        for (let i = 0; i < steps.length; i++) {
            msg.setText(steps[i].label + '...');
            await this._wait(steps[i].delay);
            bar.setProgress((i + 1) / steps.length);
        }

        this.scene.start('MainMenuScene');
    }

    // Helper: resolves after ms using Phaser's clock (keeps the game loop responsive)
    _wait(ms) {
        return new Promise(res => this.time.delayedCall(ms, res));
    }
}