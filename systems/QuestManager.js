export default class QuestManager {
    constructor(constants){
        this.c = constants.quest;
        this.current = null; // { mods:[..], createdAtMs:number }
    }


    setClock(fn){ this.now = fn; }


    accept(serverQuest){
        this.current = { ...serverQuest, createdAtMs: (this.now?this.now():performance.now()) };
    }


    shouldShowHint({ hasEX=false, hasIN=false, hasRIN=false, hasUIN=false }){
        if (!this.current) return { show:false };
        if (hasRIN || hasUIN) return { show:false };


        const now = (this.now?this.now():performance.now());
        const elapsed = now - this.current.createdAtMs;


        const appearDelay = hasEX ? 2600 : 1000; // ms
        const flashHz = hasIN ? 0.5 : 4.0;


        const ready = elapsed >= appearDelay;
        const phase = ready ? Math.floor((elapsed - appearDelay) * flashHz / 1000) : 0;
        return { show: ready, flashHz, phase };
    }
}