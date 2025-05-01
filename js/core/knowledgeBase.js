export class KnowledgeBase {
    constructor() {
        this.rules = [
            {
                name: 'Burnout Alto',
                conditions: facts =>
                    facts.concentracion === 'mucho_menos' &&
                    facts.confianza === 'muy_baja' &&
                    facts.felicidad === 'nada' &&
                    facts.disfrute_actividades === 'nada',
                actions: result => {
                    result.estadoEmocional = 'Inestable';
                    result.nivelFatiga = 'Severo';
                    result.riesgoBurnout = 'Alto';
                }
            },
            {
                name: 'Burnout Medio',
                conditions: facts =>
                    facts.concentracion === 'menos' &&
                    ['rara_vez', 'nunca'].includes(facts.enfrentar_problemas) &&
                    facts.autoestima === 'baja',
                actions: result => {
                    result.estadoEmocional = 'Vulnerable';
                    result.nivelFatiga = 'Moderado';
                    result.riesgoBurnout = 'Medio';
                }
            },
            {
                name: 'Fatiga Severa',
                conditions: facts =>
                    facts.sueno_perdido === 'severo' &&
                    facts.agobio_tension === 'alto' &&
                    facts.superar_dificultades === 'nunca',
                actions: result => {
                    result.estadoEmocional = 'Inestable';
                    result.nivelFatiga = 'Severo';
                }
            },
            {
                name: 'Estable',
                conditions: facts =>
                    ['si', 'algo'].includes(facts.felicidad) &&
                    ['alta', 'media'].includes(facts.confianza) &&
                    ['mucho', 'algo'].includes(facts.disfrute_actividades) &&
                    ['no', 'leve'].includes(facts.depresion),
                actions: result => {
                    result.estadoEmocional = 'Estable';
                    result.nivelFatiga = 'Leve';
                    result.riesgoBurnout = 'Bajo';
                }
            },
            {
                name: 'Vulnerable',
                conditions: facts =>
                    ['moderado', 'severo'].includes(facts.depresion) &&
                    ['baja', 'nula'].includes(facts.autoestima),
                actions: result => {
                    result.estadoEmocional = 'Vulnerable';
                }
            }
        ];
    }
}
