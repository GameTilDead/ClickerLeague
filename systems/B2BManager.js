export default class B2BManager {
    constructor() {
        this.streak = 0;           // consecutive perfects (2nd quest never increases)
        this.breakArmedFrom = 0;   // captured streak at the moment the break is armed
    }

    // Arm a break if not armed and there is something to convert.
    armBreakIfPossible() {
        if (this.breakArmedFrom === 0 && this.streak > 0) {
            this.breakArmedFrom = this.streak;
        }
    }

    isArmed() { return this.breakArmedFrom > 0; }

    // Convert the armed break into healing/attack/mods. Does NOT change streak.
    // Caller decides when to zero the streak (immediately after conversion).
    convertArmedBreak(missingHP, divider) {
        const n = this.breakArmedFrom;
        // heal-first by raw points
        const heal = Math.min(n, missingHP);
        const leftover = Math.max(0, n - heal);
        // harmonic-ish sum for attack
        let sum = 0; for (let k = 1; k <= leftover; k++) sum += 1 / (1 + 0.1 * k);
        const attack = Math.ceil(sum);
        // mod count from raw n against the divider
        const mods = Math.floor(n / divider);
        // clear armed flag; caller will zero streak
        this.breakArmedFrom = 0;
        return { heal, attack, mods };
    }

    // After a conversion, the design requires the streak to reset to 0.
    resetStreakAfterConversion() { this.streak = 0; }

    // Update streak from a commit result. If a conversion happened on this commit,
    // pass allowIncrement=false so the current commit does NOT start a new streak.
    onCommitApplied(result, { isSecondQuest = false, allowIncrement = true } = {}) {
        if (result === 'perfect' && !isSecondQuest && allowIncrement) {
            this.streak += 1;
        }
        // Note: 'imperfect' does not change streak here; if it armed a break and
        // then converted on the same commit, the caller will reset the streak.
    }
}