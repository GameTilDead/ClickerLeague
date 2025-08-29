import ProgressBar from '../ui/components/ProgressBar.js';


export default class LoadScene extends Phaser.Scene {
    constructor() { super('LoadScene'); }


    async create() {
        this.cameras.main.setBackgroundColor('#000000');


        const msg = this.add.text(this.scale.width/2, this.scale.height/2 - 40, 'Loading...', {
        fontFamily: 'DIN, Bahnschrift, sans-serif', fontSize: '20px', color: '#ffffff'
        }).setOrigin(0.5);


        const bar = new ProgressBar(this, this.scale.width/2 - 200, this.scale.height/2, 400, 8);


        // Simulated incremental loading. Replace these with real asset/JSON loads.
        const steps = [
            { label: 'Preparing renderer', delay: 200 },
            { label: 'Loading constants', delay: 250 },
            { label: 'Initializing systems', delay: 250 },
            { label: 'Connecting services', delay: 250 },
        ];


        for (let i=0; i<steps.length; i++) {
            msg.setText(steps[i].label + '...');
            await new Promise(r => this.time.delayedCall(steps[i].delay, r));
            bar.setProgress((i+1)/steps.length);
        }


        this.scene.start('MainMenuScene');
    }
}