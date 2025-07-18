export default class MenuScene extends Phaser.Scene {
    // Set up cards for CL menu
    constructor() {
        super('MainMenu');
        this.modStack = [];
        this.cardKeys = [
            'EX', 'NH', 'MS', 'GV', 'VL', 'DH', 'IN', 'AS', 'DP'
        ];
    }

    // Load card images
    preload() {
        this.cardKeys.forEach(key => {
            this.load.image(`${key}-back`, `assets/cards/${key.toLowerCase()}-back.png`);
        });
    }

    // Set up interactive cards and queue button
    create() {
        this.add.text(320, 20, 'CLICKER LEAGUE - SELECT MODS', {
            fontSize: '18px', color: '#ffffff'
        });

        this.cards = [];
        this.cardKeys.forEach((key, index) => {
            const x = 100 + index * 90;
            const y = 200;
            const card = this.add.image(x, y, `${key}-back`).setInteractive(); // Create card sprites
            card.modKey = key;
            // Card interaction effects (hover, click)
            card.on('pointerover', () => {
                this.tweens.add({ targets: card, y: y - 20, duration: 150 });
            });
            card.on('pointerout', () => {
                this.tweens.add({ targets: card, y: y, duration: 150 });
            });
            card.on('pointerdown', () => {
                if (this.modStack.length < 9 && !this.modStack.includes(key)) {
                    this.modStack.push(key);
                    console.log('Selected:', this.modStack);
                }
            });
            this.cards.push(card);
        });

        // The big button
        const startBtn = this.add.text(400, 420, 'Start Run ▶', {
            fontSize: '22px', color: '#00ff00'
        }).setInteractive();
        startBtn.on('pointerdown', () => {
            this.scene.start('Run', { mods: this.modStack });
        });
    }
}