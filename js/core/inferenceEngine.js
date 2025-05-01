export class InferenceEngine {
    constructor(knowledgeBase, factBase) {
        this.kb = knowledgeBase;
        this.fb = factBase;
        this.result = {
            estadoEmocional: 'Estable',
            nivelFatiga: 'Leve',
            riesgoBurnout: 'Bajo'
        };
    }

    run() {
        const facts = this.fb.getAllFacts();
        for (const rule of this.kb.rules) {
            if (rule.conditions(facts)) {
                rule.actions(this.result);
            }
        }
        return this.result;
    }
}
