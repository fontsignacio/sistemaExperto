import { EstadoEmocional, NivelFatiga, RiesgoBurnout } from '../enums/resultEnum.js';

export class KnowledgeBase {
    constructor() {
        this.rules = [
            // 1) Caso más desfavorable: detiene la inferencia
            {
                name: 'Burnout Máximo',
                conditions: facts =>
                    facts.concentracion === 'mucho_menos' &&
                    facts.sueno_perdido === 'severo' &&
                    facts.sentido_utilidad === 'nada' &&
                    facts.capacidad_decidir === 'nula' &&
                    facts.agobio_tension === 'alto' &&
                    facts.dificultades === 'si' &&
                    facts.disfrute_actividades === 'nada' &&
                    facts.enfrentar_problemas === 'nunca' &&
                    facts.depresion === 'severo' &&
                    facts.desconfianza === 'alta' &&
                    facts.baja_autoestima === 'alta' &&
                    facts.felicidad === 'nada',
                actions: result => {
                    result.estadoEmocional = EstadoEmocional.DEPRESIVO;
                    result.nivelFatiga = NivelFatiga.SEVERO;
                    result.riesgoBurnout = RiesgoBurnout.ALTO;
                },
                stop: true    // marca para detener inferencia
            },

            // 2) Fatiga: Severo, Alto, Moderado, Bajo, Leve
            {
                name: 'Fatiga Severo',
                conditions: facts => facts.sueno_perdido === 'severo' || facts.agobio_tension === 'alto',
                actions: result => { result.nivelFatiga = NivelFatiga.SEVERO; }
            },
            {
                name: 'Fatiga Alto',
                conditions: facts => facts.sueno_perdido === 'moderado' || facts.agobio_tension === 'moderado',
                actions: result => { result.nivelFatiga = NivelFatiga.ALTO; }
            },
            {
                name: 'Fatiga Bajo',
                conditions: facts => facts.sueno_perdido === 'leve' && facts.agobio_tension === 'leve',
                actions: result => { result.nivelFatiga = NivelFatiga.BAJO; }
            },
            {
                name: 'Fatiga Leve',
                conditions: facts => facts.sueno_perdido === 'no' && facts.agobio_tension === 'no',
                actions: result => { result.nivelFatiga = NivelFatiga.LEVE; }
            },

            // 3) Riesgo burnout según dificultades
            {
                name: 'Burnout Alto',
                conditions: facts => facts.dificultades === 'si',
                actions: result => { result.riesgoBurnout = RiesgoBurnout.ALTO; }
            },
            {
                name: 'Burnout Moderado',
                conditions: facts => facts.dificultades === 'frecuentemente',
                actions: result => { result.riesgoBurnout = RiesgoBurnout.MODERADO; }
            },
            {
                name: 'Burnout Bajo',
                conditions: facts => facts.dificultades === 'a_veces',
                actions: result => { result.riesgoBurnout = RiesgoBurnout.BAJO; }
            },
            {
                name: 'Burnout Leve',
                conditions: facts => facts.dificultades === 'nunca',
                actions: result => { result.riesgoBurnout = RiesgoBurnout.LEVE; }
            },

            // 4) Estado emocional según combinaciones
            {
                name: 'Estado Depresivo',
                conditions: facts => facts.depresion === 'severo' || facts.sentido_utilidad === 'nada',
                actions: result => { result.estadoEmocional = EstadoEmocional.DEPRESIVO; }
            },
            {
                name: 'Estado Triste',
                conditions: facts => facts.depresion === 'moderado' || facts.disfrute_actividades === 'poco',
                actions: result => { result.estadoEmocional = EstadoEmocional.TRISTE; }
            },
            {
                name: 'Estado Enojado',
                conditions: facts => facts.agobio_tension === 'alto' && facts.enfrentar_problemas === 'nunca',
                actions: result => { result.estadoEmocional = EstadoEmocional.ENOJADO; }
            },
            {
                name: 'Estado Miedoso',
                conditions: facts => facts.agobio_tension === 'moderado' && facts.desconfianza === 'baja',
                actions: result => { result.estadoEmocional = EstadoEmocional.MIEDOSO; }
            },
            {
                name: 'Estado Feliz',
                conditions: facts => ['si', 'algo'].includes(facts.felicidad) && ['muy_baja', 'media'].includes(facts.desconfianza),
                actions: result => { result.estadoEmocional = EstadoEmocional.FELIZ; }
            },
            {
                name: 'Ansiedad Severa',
                conditions: facts =>
                    (['mucho_menos', 'menos'].includes(facts.concentracion) ? 1 : 0) +
                    (['moderado', 'severo'].includes(facts.sueno_perdido) ? 1 : 0) +
                    (['moderado', 'alto'].includes(facts.agobio_tension) ? 1 : 0) +
                    (['rara_vez', 'nunca'].includes(facts.enfrentar_problemas) ? 1 : 0) >= 4,
                actions: result => {
                    result.estadoEmocional = EstadoEmocional.MIEDOSO;
                    result.nivelFatiga = NivelFatiga.ALTO;
                    result.riesgoBurnout = RiesgoBurnout.MODERADO;
                }
            },
            {
                name: 'Ansiedad Moderada',
                conditions: facts =>
                    (['mucho_menos', 'menos'].includes(facts.concentracion) ? 1 : 0) +
                    (['moderado', 'severo'].includes(facts.sueno_perdido) ? 1 : 0) +
                    (['moderado', 'alto'].includes(facts.agobio_tension) ? 1 : 0) +
                    (['rara_vez', 'nunca'].includes(facts.enfrentar_problemas) ? 1 : 0) >= 2,
                actions: result => {
                    if (result.estadoEmocional !== EstadoEmocional.MIEDOSO) {
                        result.estadoEmocional = EstadoEmocional.ESTRESADO;
                    }
                    if (result.nivelFatiga !== NivelFatiga.SEVERO) {
                        result.nivelFatiga = NivelFatiga.MODERADO;
                    }
                }
            },
            {
                name: 'Depresión Severa',
                conditions: facts =>
                    (['moderado', 'severo'].includes(facts.depresion) ? 1 : 0) +
                    (['poco', 'nada'].includes(facts.disfrute_actividades) ? 1 : 0) +
                    (facts.sentido_utilidad === 'nada' ? 1 : 0) +
                    (facts.capacidad_decidir === 'nula' ? 1 : 0) >= 3,
                actions: result => {
                    result.estadoEmocional = EstadoEmocional.DEPRESIVO;
                    result.nivelFatiga = NivelFatiga.SEVERO;
                    result.riesgoBurnout = RiesgoBurnout.ALTO;
                }
            },
            {
                name: 'Depresión Moderada',
                conditions: facts =>
                    (['moderado', 'severo'].includes(facts.depresion) ? 1 : 0) +
                    (['poco', 'nada'].includes(facts.disfrute_actividades) ? 1 : 0) >= 2,
                actions: result => {
                    if (result.estadoEmocional !== EstadoEmocional.DEPRESIVO) {
                        result.estadoEmocional = EstadoEmocional.TRISTE;
                    }
                    if (result.nivelFatiga !== NivelFatiga.SEVERO) {
                        result.nivelFatiga = NivelFatiga.ALTO;
                    }
                }
            }
        ];
    }
}
