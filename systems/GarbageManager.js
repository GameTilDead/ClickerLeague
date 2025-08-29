export default class GarbageManager {
    constructor(){ this.incomingAttack=0; this.incomingMods=0; }
    recvAttack(a){ this.incomingAttack+=a; }
    recvMods(n){ this.incomingMods+=n; }


    resolveNextCommit({ outAttack=0, outMods=0 }){
        // Mods lane: only outMods produced this commit can cancel incoming mods.
        let modsToApply = 0, modsToSend = 0;
        if (outMods > 0) {
            const cancel = Math.min(outMods, this.incomingMods);
            this.incomingMods -= cancel;
            outMods -= cancel;
        }
        if (this.incomingMods > 0) { // any leftover applies now
            modsToApply = this.incomingMods; this.incomingMods = 0;
        } else {
            modsToSend = outMods; // leftover outgoing mods are sent to opponent
        }


        // Attack lane: outgoing attack cancels incoming attack first.
        let attackToApply = 0, attackToSend = 0;
        const cancel2 = Math.min(outAttack, this.incomingAttack);
        this.incomingAttack -= cancel2;
        outAttack -= cancel2;


        if (this.incomingAttack > 0) { // any leftover hits immediately
            attackToApply = this.incomingAttack; this.incomingAttack = 0;
        }
        attackToSend = outAttack; // leftover outgoing attack goes to opponent


        return { attackToApply, modsToApply, attackToSend, modsToSend };
    }
}