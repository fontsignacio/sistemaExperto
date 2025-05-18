import { EstadoEmocional, NivelFatiga, RiesgoBurnout } from "../enums/resultEnum.js";

export class InferenceEngine {
    constructor(knowledgeBase, factBase) {
        this.kb = knowledgeBase;
        this.fb = factBase;
        this.result = {
            estadoEmocional: EstadoEmocional.NIVEL1,
            nivelFatiga: NivelFatiga.LEVE,
            riesgoBurnout: RiesgoBurnout.LEVE
        };
    }

    run() {
        const facts = this.fb.getAllFacts();
        for (const rule of this.kb.rules) {
            if (rule.conditions(facts)) {
                rule.actions(this.result);
                if (rule.stop) break;
            }
        }
        return this.result;
    }
}
