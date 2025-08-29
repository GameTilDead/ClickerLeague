import B2BManager from '../systems/B2BManager.js';
import GarbageManager from '../systems/GarbageManager.js';
import HealthManager from '../systems/HealthManager.js';
import TimerManager from '../systems/TimerManager.js';
import QuestManager from '../systems/QuestManager.js';

export default class RunScene extends Phaser.Scene {
    constructor() {
        super('RunScene');
        this.mode = 'ranked';   // 'ranked' | 'practice'
        this.practiceCfg = null;
    }

    // Receives optional practice configuration
    init(data) {
        this.mode = data?.mode || 'ranked';
        this.practiceCfg = data?.cfg || null;
    }

    create() {
        // Load gameplay constants (numbers for timers, dividers, HP, etc.)
        this.C = this.cache.json.get('gameplayConstants') || {
            baseHP: 20,
            damage: { perfect: 2, imperfect: 1, rDP_inactive: 0.26 },
            dp: { secondQuest: { attackScale: 0.75 } },
            surge: { dividerTimeline: [{ time: 0, divider: 8 }] },
            timers: {
                gv: { normal: [9, 8, 7.5], reverse: [3, 2.8, 2.6], ultra: [3, 2.8, 2.6], graceMs: 2600 },
                damage: { tiers: [{ full: 15, cycle: 5, incorrect: 1 }], stepPerQuests: 10 }
            }
        };

        // Instantiate systems used during a run
        this.b2b = new B2BManager();
        this.garb = new GarbageManager();
        this.hp = new HealthManager(this.C.baseHP);
        this.timers = new TimerManager(this.C);
        this.quest = new QuestManager(this.C);
        this.quest.setClock(() => this.time.now); // use Phaser clock for hint timing

        // Scene-local state
        this.questsPassed = 0;      // increments on each successful commit
        this.timeQuestShownMs = 0;  // ms timestamp when current quest appeared

        // Placeholder visuals would be created here (HP bar, garbage bars, timers, etc.)
        // This implementation focuses on deterministic logic and messaging points.
    }

    // Records a break event caused by a wrong commit or a double-flip.
    onBreakEvent() {
        this.b2b.noteMistakeOrDoubleFlip();
        // UI can gray the streak indicator when hasPendingBreak() is true.
    }

    /**
     * Handles a commit from the player.
     * @param {Object} params
     * @param {'perfect'|'imperfect'|'fail'} params.result
     * @param {boolean} [params.isSecondQuest=false] - true if this was the second quest
     * @param {'n'|'r'|'u'} [params.gvTier='n'] - GV tier affecting commit window (not used here directly)
     * @param {null|'r'|'u'} [params.dpEchoTier=null] - DP echo tier for inactive side damage
     */
    onCommit(params) {
        const result = params?.result ?? 'fail';
        const isSecondQuest = !!params?.isSecondQuest;
        const dpEchoTier = params?.dpEchoTier ?? null;

        // Determine base attack from this commit before any break conversion.
        let baseAttack = 0;
        if (result === 'perfect') baseAttack = this.C.damage.perfect;
        else if (result === 'imperfect') baseAttack = this.C.damage.imperfect;

        // Apply second-quest scaling to base attack.
        if (isSecondQuest) {
            const scale = this.C?.dp?.secondQuest?.attackScale ?? 0.75;
            baseAttack *= scale;
        }

        // Update streak state according to the commit result.
        this.b2b.onQuestResult(result, { isSecondQuest });

        // If a break was pending and this commit succeeded, convert it now.
        let breakHeal = 0;
        let breakAttack = 0;
        let breakMods = 0;
        if (this.b2b.hasPendingBreak() && result !== 'fail') {
            const missing = this.C.baseHP - this.currentActiveHP();
            const divider = this.currentDividerAtSeconds(this.time.now / 1000);
            const converted = this.b2b.convertPendingBreak(missing, divider);
            breakHeal = converted.heal;
            breakAttack = converted.attack;
            breakMods = converted.mods;
        }

        // Apply inactive-side echo damage from baseAttack only.
        if (dpEchoTier === 'r') {
            this.hp.applyInactiveEcho(baseAttack, this.C.damage.rDP_inactive);
        } else if (dpEchoTier === 'u') {
            this.hp.applyInactiveEcho(baseAttack, 0.40); // ultra DP echo ratio
        }

        // Outgoing payload for this commit before cancellation by incoming garbage.
        const outAttack = baseAttack + breakAttack;
        const outMods = breakMods; // mods are only present when a pending break converts

        // Resolve both garbage lanes for this commit.
        const settled = this.garb.resolveNextCommit({ outAttack, outMods });
        const { attackToApply, modsToApply, attackToSend, modsToSend } = settled;

        // Apply incoming attack damage immediately if any remains after cancellation.
        if (attackToApply > 0) this.hp.applyDamage(attackToApply);

        // Apply incoming mods now if not canceled this commit; actual effect scheduling would occur elsewhere.
        if (modsToApply > 0) this.applyIncomingMods(modsToApply);

        // Apply healing from pass and any break healing once the commit succeeds.
        if (result !== 'fail') {
            const healFromPass = baseAttack * 0.25; // heal is a fraction of the base attack
            const totalHeal = healFromPass + breakHeal;
            if (totalHeal > 0) this.hp.heal(totalHeal);

            // Reset damage timer and apply a partial refill based on result and second-quest status.
            this.timers.onPass();
            const refill = this.timers.refillAmount(result, isSecondQuest);
            // A UI damage bar would immediately increase its fill by `refill` here.

            // Count a successful quest.
            this.questsPassed += 1;
            this.timers.updateGVOnPassed(this.questsPassed, /*tier*/ 'n');
            this.timers.updateDamageOnPassed(this.questsPassed);
    }

        // Outgoing messaging hooks. Replace with NetplayClient calls when wired.
        if (attackToSend > 0) {
            // send ATTACK_SEND { amount: attackToSend }
        }
        if (modsToSend > 0) {
            // send MODS_SEND { count: modsToSend }
        }

        // Loss check transitions to results when HP reaches defeat conditions.
        if (this.hp.isDead()) {
            // scene transition to ResultsScene would occur here.
        }
    }

    // Returns the active-side HP when DP is enabled; otherwise the single bar HP.
    currentActiveHP() {
        if (!this.hp.dp.active) return this.hp.left;
        return this.hp[this.hp.dp.activeSide];
    }

    // Looks up the surge divider from the time-based timeline.
    currentDividerAtSeconds(tSec) {
        let d = 8;
        const timeline = this.C?.surge?.dividerTimeline || [];
        for (const node of timeline) {
            if (tSec >= node.time) d = node.divider;
        }
        return d;
    }

    // Placeholder for future ModEffectManager integration.
    applyIncomingMods(count) {
        // Expand `count` into concrete mod effects and durations when ModEffectManager is implemented.
    }
}