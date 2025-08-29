export default class TimerManager {
    constructor(config){
        this.gv = config.timers.gv;
        this.damage = config.timers.damage;


        this.gvIndex = 0;
        this.gvLimitMs = this.gv.normal[0] * 1000;
        this.damageIndex = 0;
        this.damageElapsed = 0;
    }


    updateGVOnPassed(passed, tier){
        // Steps every 10 quests; clamps at last tier.
        this.gvIndex = Math.min(Math.floor(passed / 10), this.gv.normal.length - 1);
        const arr = tier==='r' ? this.gv.reverse : (tier==='u' ? this.gv.ultra : this.gv.normal);
        this.gvLimitMs = arr[this.gvIndex] * 1000;
    }


    tickGV(dtMs, sinceQuestMs, { tier='n', onTimeout }){
        const grace = tier==='u' ? 0 : this.gv.graceMs;
        if (sinceQuestMs >= grace + this.gvLimitMs) onTimeout();
    }


    updateDamageOnPassed(passed){
        this.damageIndex = Math.min(Math.floor(passed / this.damage.stepPerQuests), this.damage.tiers.length - 1);
    }


    tickDamage(dtMs, { onTimeout }){
        const tier = this.damage.tiers[this.damageIndex];
        this.damageElapsed += dtMs;
        if (this.damageElapsed >= tier.full * 1000) {
            onTimeout();
            // After damage triggers, resume such that the next hit occurs after the cycle duration.
            const leftover = tier.full * 1000 - tier.cycle * 1000;
            this.damageElapsed = Math.max(0, leftover);
        }
    }


    onPass(){ this.damageElapsed = 0; }


    refillAmount(result, isSecondQuest){
        // Returns a fraction in [0..1] that should be added back to the
        // damage timer immediately upon a pass.
        if (result === 'perfect') return isSecondQuest ? 0.25 : 0.5;
        if (result === 'imperfect') return isSecondQuest ? 0.20 : 0.33;
        return 0;
    }


    incorrectDamage(){ return this.damage.tiers[this.damageIndex].incorrect; }
}