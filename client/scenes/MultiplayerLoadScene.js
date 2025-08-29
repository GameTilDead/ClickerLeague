export default class MultiplayerLoaderScene extends Phaser.Scene {
    constructor(){ super('MultiplayerLoaderScene'); }


    async create(){
        this.cameras.main.setBackgroundColor('#000000');
        const label = this.add.text(this.scale.width/2, this.scale.height/2, 'Fetching Clicker League data...', {
        fontFamily:'DIN, Bahnschrift, sans-serif', fontSize:'22px', color:'#ffffff'
        }).setOrigin(0.5);


        // Phase 1: local config and initial network probes
        await new Promise(r => this.time.delayedCall(400, r));


        // Phase 2: matchmaking/session preparation
        label.setText('Entering matchmaking...');
        await new Promise(r => this.time.delayedCall(400, r));


        this.scene.start('MultiplayerScene');
    }
}