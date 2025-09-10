import B2BManager from '../../systems/B2BManager.js';
import GarbageManager from '../../systems/GarbageManager.js';
import HealthManager from '../../systems/HealthManager.js';
import TimerManager from '../../systems/TimerManager.js';
import QuestManager from '../../systems/QuestManager.js';

export default class RunScene extends Phaser.Scene {
    constructor() {
        super('RunScene');
        this.mode = 'ranked';
        this.practiceCfg = null;
    }

    init(data) {
        this.mode = data?.mode || 'ranked';
        this.practiceCfg = data?.cfg || null;
    }

    create() {
        this.C = this.cache.json.get('gameplayConstants');
        this.b2b = new B2BManager();
        this.garb = new GarbageManager();
        this.hp = new HealthManager(this.C.baseHP);
        this.timers = new TimerManager(this.C);
        this.quest = new QuestManager(this.C);
        this.quest.setClock(() => this.time.now);

        this.questsPassed = 0;
    }

    // Call this when a double-flip of the same card occurs.
    onDoubleFlip() {
        this.b2b.armBreakIfPossible(); // UI can gray the counter when isArmed() is true
    }

    /**
     * Handle a commit.
     * @param {'perfect'|'imperfect'} result
     * @param {boolean} isSecondQuest
     * @param {null|'r'|'u'} dpEchoTier
     */
    onCommit({ result, isSecondQuest = false, dpEchoTier = null }) {
        // Imperfect commits also ARM a break BEFORE conversion logic runs.
        if (result === 'imperfect') this.b2b.armBreakIfPossible();

        // Base attack for this commit (before any break conversion).
        let baseAttack = (result === 'perfect') ? this.C.damage.perfect
                        : (result === 'imperfect') ? this.C.damage.imperfect : 0;

        if (isSecondQuest) {
            baseAttack *= (this.C.dp.secondQuest.attackScale ?? 0.75);
        }

        // If a break is armed and this commit is a pass, convert it now.
        let converted = { heal: 0, attack: 0, mods: 0 };
        let convertedThisCommit = false;

        if (this.b2b.isArmed()) {
            const missing = this.C.baseHP - this.currentActiveHP();
            const divider = this.currentDividerAtSeconds(this.time.now / 1000);
            converted = this.b2b.convertArmedBreak(missing, divider);
            this.b2b.resetStreakAfterConversion(); // reset AFTER conversion
            convertedThisCommit = true;
        }

        // Apply inactive-side echo using ONLY baseAttack.
        if (dpEchoTier === 'r') this.hp.applyInactiveEcho(baseAttack, this.C.damage.dpEcho.reverse);
        if (dpEchoTier === 'u') this.hp.applyInactiveEcho(baseAttack, this.C.damage.dpEcho.ultra);

        // Outgoing payload for this commit (pre-cancel)
        const outAttack = baseAttack + converted.attack;
        const outMods = converted.mods;

        // Resolve both lanes on this commit.
        const { attackToApply, modsToApply, attackToSend, modsToSend } =
            this.garb.resolveNextCommit({ outAttack, outMods });

        // Apply local incoming
        if (attackToApply > 0) this.hp.applyDamage(attackToApply);
        if (modsToApply > 0) this.applyIncomingMods(modsToApply);

        // Heal from the pass (fraction of base) plus any break heal.
        const healFromPass = baseAttack * (this.C.healing.onPassMultiplier ?? 0.25);
        const totalHeal = healFromPass + converted.heal;
        if (totalHeal > 0) this.hp.heal(totalHeal);

        // Timers: reset + partial refill based on result/second-quest.
        this.timers.onPass();
        const refill = this.timers.refillAmount(result, isSecondQuest);
        // A UI damage bar would add `refill` to its fill fraction here.

        // Streak accounting AFTER conversion decision:
        // If we converted this commit, do NOT start a new streak from this pass.
        this.b2b.onCommitApplied(result, { isSecondQuest, allowIncrement: !convertedThisCommit });

        // Progress GV/damage tiers on successful pass
        this.questsPassed += 1;
        this.timers.updateGVOnPassed(this.questsPassed, 'n');
        this.timers.updateDamageOnPassed(this.questsPassed);

        // Outgoing messages (stubbed for now)
        if (attackToSend > 0) { /* send ATTACK_SEND { amount: attackToSend } */ }
        if (modsToSend > 0)   { /* send MODS_SEND { count: modsToSend } */ }

        if (this.hp.isDead()) {
            // Transition to results here
        }
    }

    currentActiveHP() {
        if (!this.hp.dp.active) return this.hp.left;
        return this.hp[this.hp.dp.activeSide];
    }

    currentDividerAtSeconds(tSec) {
        let d = 8;
        const timeline = this.C?.surge?.dividerTimeline || [];
        for (const node of timeline) if (tSec >= node.time) d = node.divider;
        return d;
    }

    applyIncomingMods(count) {
        // Placeholder for ModEffectManager integration.
    }
}