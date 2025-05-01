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
            },
            {
                name: 'Burnout Leve',
                conditions: facts =>
                    facts.concentracion === 'algo_menos' &&
                    facts.disfrute_actividades === 'algo' &&
                    facts.autoestima === 'media',
                actions: result => {
                    result.estadoEmocional = 'Levemente Vulnerable';
                    result.nivelFatiga = 'Leve';
                    result.riesgoBurnout = 'Leve';
                }
            },
            {
                name: 'Estrés Crónico',
                conditions: facts =>
                    facts.agobio_tension === 'alto' &&
                    facts.superar_dificultades === 'rara_vez' &&
                    facts.depresion === 'moderado',
                actions: result => {
                    result.estadoEmocional = 'Estresado';
                    result.nivelFatiga = 'Alto';
                }
            },
            {
                name: 'Resiliencia Alta',
                conditions: facts =>
                    facts.enfrentar_problemas === 'siempre' &&
                    facts.autoestima === 'alta' &&
                    facts.confianza === 'alta',
                actions: result => {
                    result.estadoEmocional = 'Resiliente';
                    result.nivelFatiga = 'Bajo';
                    result.riesgoBurnout = 'Nulo';
                }
            },
            {
                name: 'Depresión Alta',
                conditions: facts =>
                    facts.depresion === 'severo' &&
                    facts.disfrute_actividades === 'nada' &&
                    facts.felicidad === 'nada',
                actions: result => {
                    result.estadoEmocional = 'Depresivo';
                    result.nivelFatiga = 'Severo';
                }
            },
            {
                name: 'Fatiga Moderada',
                conditions: facts =>
                    facts.sueno_perdido === 'moderado' &&
                    facts.agobio_tension === 'moderado',
                actions: result => {
                    result.estadoEmocional = 'Cansado';
                    result.nivelFatiga = 'Moderado';
                }
            },
            {
                name: 'Optimismo Elevado',
                conditions: facts =>
                    facts.felicidad === 'si' &&
                    facts.confianza === 'alta' &&
                    facts.disfrute_actividades === 'mucho',
                actions: result => {
                    result.estadoEmocional = 'Optimista';
                    result.nivelFatiga = 'Bajo';
                    result.riesgoBurnout = 'Nulo';
                }
            },
            {
                name: 'Ansiedad Moderada',
                conditions: facts =>
                    facts.agobio_tension === 'moderado' &&
                    facts.confianza === 'baja',
                actions: result => {
                    result.estadoEmocional = 'Ansioso';
                }
            },
            {
                name: 'Burnout Potencial',
                conditions: facts =>
                    facts.concentracion === 'algo_menos' &&
                    facts.autoestima === 'baja' &&
                    facts.enfrentar_problemas === 'rara_vez',
                actions: result => {
                    result.estadoEmocional = 'Vulnerable';
                    result.riesgoBurnout = 'Potencial';
                }
            },
            {
                name: 'Recuperación Exitosa',
                conditions: facts =>
                    facts.sueno_perdido === 'no' &&
                    facts.agobio_tension === 'bajo' &&
                    facts.superar_dificultades === 'siempre',
                actions: result => {
                    result.estadoEmocional = 'Estable';
                    result.nivelFatiga = 'Nulo';
                }
            },
            {
                name: 'Fatiga Baja',
                conditions: facts =>
                    facts.sueno_perdido === 'leve' &&
                    facts.agobio_tension === 'leve',
                actions: result => {
                    result.estadoEmocional = 'Relajado';
                    result.nivelFatiga = 'Bajo';
                }
            },
            {
                name: 'Autoestima Comprometida',
                conditions: facts =>
                    facts.autoestima === 'baja' &&
                    facts.confianza === 'muy_baja',
                actions: result => {
                    result.estadoEmocional = 'Inseguro';
                }
            },
            {
                name: 'Estrés Agudo',
                conditions: facts =>
                    facts.agobio_tension === 'severo' &&
                    facts.enfrentar_problemas === 'nunca',
                actions: result => {
                    result.estadoEmocional = 'Extremadamente Estresado';
                    result.nivelFatiga = 'Severo';
                }
            }
        ];
    }
}
