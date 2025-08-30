// Minimal matchmaking UI shell: shows CR/Rating placeholders, live counters,
// and an ENTER MATCHMAKING button. Networking is not wired here.
import CLButton from '../ui/components/CLButton.js';
import { Fonts, Colors } from '../ui/styles.js';

export default class MultiplayerScene extends Phaser.Scene {
    constructor() { super('MultiplayerScene'); }

    create() {
        this.cameras.main.setBackgroundColor(Colors.bgDark);

        // Header
        this.add.text(32, 28, 'MULTIPLAYER', {
            fontFamily: Fonts.ui, fontSize: '32px', color: Colors.text
        });

        // Player stats placeholders
        const stats = [
            ['CR', '—'],
            ['RATING', '—'],
            ['GAMES', '—']
        ];
        stats.forEach((row, i) => {
            this.add.text(32, 78 + i*28, `${row[0]}: ${row[1]}`, {
                fontFamily: Fonts.ui, fontSize: '18px', color: Colors.textDim
            });
        });

        // Live counters (update these from server later)
        this.inQueue = 0;
        this.playing = 0;
        this.inQueueText = this.add.text(this.scale.width - 32, 28, 'IN QUEUE: 0', {
            fontFamily: Fonts.ui, fontSize: '18px', color: Colors.textDim
        }).setOrigin(1, 0);
        this.playingText = this.add.text(this.scale.width - 32, 52, 'PLAYING: 0', {
            fontFamily: Fonts.ui, fontSize: '18px', color: Colors.textDim
        }).setOrigin(1, 0);

        // Buttons (right-anchored)
        const rightX = this.scale.width - 40;
        const btnWidth = Math.min(this.scale.width * 0.8, 900);
        const btnHeight = 88;
        const yStart = 140;

        const qBtn = new CLButton(this, rightX, yStart, btnWidth, btnHeight, 'ENTER MATCHMAKING', Colors.mp, () => {
            // Placeholder: increment counters to simulate queue behavior.
            this.inQueue += 1;
            this.inQueueText.setText(`IN QUEUE: ${this.inQueue}`);
            // Transition to a queueing state here when networking is added.
        });
        this.add.existing(qBtn); qBtn.entrance();

        const backBtn = new CLButton(this, rightX, yStart + btnHeight + 24, btnWidth, btnHeight, 'BACK', '#444444', () => {
            this.scene.start('MainMenuScene');
        });
        this.add.existing(backBtn); backBtn.entrance(120);
    }
}