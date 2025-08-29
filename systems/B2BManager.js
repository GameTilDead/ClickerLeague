export default class B2BManager {
    constructor(){
        this.streak = 0; // count of consecutive perfect passes
        this.pendingBreakFrom = 0; // streak value captured when the player broke
    }


    noteMistakeOrDoubleFlip(){
        // Called when the player commits wrong or double-flips a card.
        if (this.streak > 0 && this.pendingBreakFrom === 0) {
            this.pendingBreakFrom = this.streak; // capture streak at break time
        }
        this.streak = 0; // streak always resets when break occurs
    }


    onQuestResult(result, { isSecondQuest=false }){
        // Increment streak only on perfect passes. Second quest does not contribute.
        if (result === 'perfect' && !isSecondQuest) {
            this.streak += 1;
        } else if (result === 'imperfect' || result === 'fail') {
        // Imperfect/fail does not create a pending break unless the caller
        // explicitly calls noteMistakeOrDoubleFlip() when the mistake happens.
        this.streak = 0;
        }
    }


    hasPendingBreak(){ return this.pendingBreakFrom > 0; }


    convertPendingBreak(missingHP, divider){
        /* Uses the captured streak at break time. Healing is applied first,
        the remainder becomes attack via a harmonic-like sum. Mods use the
        raw captured streak divided by divider. */
        const n = this.pendingBreakFrom;
        const heal = Math.min(n, missingHP);
        const leftover = Math.max(0, n - heal);


        let sum = 0; for (let k=1; k<=leftover; k++) sum += 1/(1+0.1*k);
        const attack = Math.ceil(sum);


        const mods = Math.floor(n / divider);


        this.pendingBreakFrom = 0; // clear after conversion
        return { heal, attack, mods };
    }
}