import CLButton from '../ui/components/CLButton.js';


export default class PracticeScene extends Phaser.Scene {
    constructor(){ super('PracticeScene'); }


    create(){
        this.add.text(32, 24, 'PRACTICE', { fontFamily:'DIN, Bahnschrift, sans-serif', fontSize:'32px', color:'#ffffff' });


        // Simple toggles stored on the scene; RunScene can read from data
        this.practiceCfg = {
            difficulty: 'normal', // affects quest generation server-sim side
            marginLevel: 0, // 0..5 tiered margin presets
            inflictedMods: 0, // count of mod garbage sent to the player per minute (sim)
            inflictedDPS: 0, // constant damage per second (sim)
        };


        const mkBtn = (label, y, cb) => {
            const b = new CLButton(this, this.scale.width - 40, y, Math.min(this.scale.width*0.7, 760), 72, label, '#3a59b7', cb);
            this.add.existing(b); b.entrance(); return b;
        };


        mkBtn('DIFFICULTY: NORMAL', 120, () => {
            this.practiceCfg.difficulty = this.practiceCfg.difficulty === 'normal' ? 'hard' : 'normal';
        });


        mkBtn('MARGIN LEVEL: 0', 210, () => {
            this.practiceCfg.marginLevel = (this.practiceCfg.marginLevel + 1) % 6;
        });


        mkBtn('INFlicted MODS: 0/min', 300, () => {
            this.practiceCfg.inflictedMods = (this.practiceCfg.inflictedMods + 1) % 6;
        });


        mkBtn('INFlicted DPS: 0', 390, () => {
            this.practiceCfg.inflictedDPS = (this.practiceCfg.inflictedDPS + 1) % 11; // 0..10
        });


        mkBtn('START PRACTICE', 500, () => {
            this.scene.start('RunScene', { mode: 'practice', cfg: this.practiceCfg });
        });


        mkBtn('BACK', 590, () => this.scene.start('MainMenuScene'));
    }
}