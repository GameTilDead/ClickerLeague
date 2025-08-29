export default class HealthManager {
    constructor(base){
        this.base = base;
        this.left = base; // when DP is off, only left is used
        this.right = null; // becomes a number when DP is enabled
        this.dp = { active:false, activeSide:'left', ultraBlocksFlip:false };
    }


    enableDP(){
        if (this.dp.active) return;
        this.dp.active = true;
        // When DP starts, both halves equal the current single-bar HP.
        this.right = this.left;
        this.dp.activeSide = 'left';
    }


    setUltraBlocksFlip(flag){ this.dp.ultraBlocksFlip = !!flag; }


    switchSideBySecondQuest(){ if (this.dp.active) this.dp.activeSide = this.dp.activeSide==='left'?'right':'left'; }
    switchSideByCardFlip(){ if (this.dp.active && !this.dp.ultraBlocksFlip) this.dp.activeSide = this.dp.activeSide==='left'?'right':'left'; }


    applyDamage(amount){
        if (!this.dp.active) {
            this.left = Math.max(0, this.left - amount);
            return;
        }
        const k = this.dp.activeSide;
        this[k] = Math.max(0, this[k] - amount);
    }


    applyInactiveEcho(baseAttack, ratio){
        // Applies echo damage to the inactive side. The opponent still receives
        // the full outgoing attack; this method only affects the local inactive half.
        if (!this.dp.active) return;
        const other = this.dp.activeSide==='left' ? 'right' : 'left';
        this[other] = Math.max(0, this[other] - baseAttack * ratio);
    }


    heal(amount){
        if (!this.dp.active) {
            this.left = Math.min(this.base, this.left + amount);
            return;
        }
        const k = this.dp.activeSide;
        this[k] = Math.min(this.base, this[k] + amount);
    }


    isDead(){
        if (!this.dp.active) return this.left <= 0;
        return this.left <= 0 && this.right <= 0;
    }
}