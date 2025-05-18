import { EstadoEmocional, NivelFatiga, RiesgoBurnout } from '../enums/resultEnum.js';

export class KnowledgeBase {
    constructor() {
        this.rules = [
            // 1) Caso más desfavorable: detiene la inferencia
            {
                name: 'Peor extremo',
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
                    result.estadoEmocional = EstadoEmocional.NIVEL6;
                    result.nivelFatiga = NivelFatiga.SEVERO;
                    result.riesgoBurnout = RiesgoBurnout.ALTO;
                },
                stop: true
            },

            // fatiga:preguntas 2, 5, 6 , 7 (sueno_perdido, agobio_tension, disfrute_actividades, dificultades)
            {
                name: 'Fatiga Severo',
                conditions: facts => {
                    const total =
                        (facts.sueno_perdido === 'severo' ? 3 : facts.sueno_perdido === 'moderado' ? 2 : facts.sueno_perdido === 'leve' ? 1 : 0) +
                        (facts.agobio_tension === 'alto' ? 3 : facts.agobio_tension === 'moderado' ? 2 : facts.agobio_tension === 'leve' ? 1 : 0) +
                        (facts.dificultades === 'si' ? 3 : facts.dificultades === 'frecuentemente' ? 2 : facts.dificultades === 'a_veces' ? 1 : 0) +
                        (facts.disfrute_actividades === 'nada' ? 3 : facts.disfrute_actividades === 'poco' ? 2 : facts.disfrute_actividades === 'algo' ? 1 : 0);
                    return total >= 9;
                },
                actions: result => { result.nivelFatiga = NivelFatiga.SEVERO; }
            },

            // 2) Fatiga Alto (6–8)
            {
                name: 'Fatiga Alto',
                conditions: facts => {
                    const total =
                        (facts.sueno_perdido === 'severo' ? 3 : facts.sueno_perdido === 'moderado' ? 2 : facts.sueno_perdido === 'leve' ? 1 : 0) +
                        (facts.agobio_tension === 'alto' ? 3 : facts.agobio_tension === 'moderado' ? 2 : facts.agobio_tension === 'leve' ? 1 : 0) +
                        (facts.dificultades === 'si' ? 3 : facts.dificultades === 'frecuentemente' ? 2 : facts.dificultades === 'a_veces' ? 1 : 0) +
                        (facts.disfrute_actividades === 'nada' ? 3 : facts.disfrute_actividades === 'poco' ? 2 : facts.disfrute_actividades === 'algo' ? 1 : 0);
                    return total >= 6 && total <= 8;
                },
                actions: result => { result.nivelFatiga = NivelFatiga.ALTO; }
            },

            // 3) Fatiga Moderado (3–5)
            {
                name: 'Fatiga Moderado',
                conditions: facts => {
                    const total =
                        (facts.sueno_perdido === 'severo' ? 3 : facts.sueno_perdido === 'moderado' ? 2 : facts.sueno_perdido === 'leve' ? 1 : 0) +
                        (facts.agobio_tension === 'alto' ? 3 : facts.agobio_tension === 'moderado' ? 2 : facts.agobio_tension === 'leve' ? 1 : 0) +
                        (facts.dificultades === 'si' ? 3 : facts.dificultades === 'frecuentemente' ? 2 : facts.dificultades === 'a_veces' ? 1 : 0) +
                        (facts.disfrute_actividades === 'nada' ? 3 : facts.disfrute_actividades === 'poco' ? 2 : facts.disfrute_actividades === 'algo' ? 1 : 0);
                    return total >= 3 && total <= 5;
                },
                actions: result => { result.nivelFatiga = NivelFatiga.MODERADO; }
            },

            // 4) Fatiga Bajo (1–2)
            {
                name: 'Fatiga Bajo',
                conditions: facts => {
                    const total =
                        (facts.sueno_perdido === 'severo' ? 3 : facts.sueno_perdido === 'moderado' ? 2 : facts.sueno_perdido === 'leve' ? 1 : 0) +
                        (facts.agobio_tension === 'alto' ? 3 : facts.agobio_tension === 'moderado' ? 2 : facts.agobio_tension === 'leve' ? 1 : 0) +
                        (facts.dificultades === 'si' ? 3 : facts.dificultades === 'frecuentemente' ? 2 : facts.dificultades === 'a_veces' ? 1 : 0) +
                        (facts.disfrute_actividades === 'nada' ? 3 : facts.disfrute_actividades === 'poco' ? 2 : facts.disfrute_actividades === 'algo' ? 1 : 0);
                    return total >= 1 && total <= 2;
                },
                actions: result => { result.nivelFatiga = NivelFatiga.BAJO; }
            },

            // 5) Fatiga Leve (0)
            {
                name: 'Fatiga Leve',
                conditions: facts => {
                    const total =
                        (facts.sueno_perdido === 'severo' ? 3 : facts.sueno_perdido === 'moderado' ? 2 : facts.sueno_perdido === 'leve' ? 1 : 0) +
                        (facts.agobio_tension === 'alto' ? 3 : facts.agobio_tension === 'moderado' ? 2 : facts.agobio_tension === 'leve' ? 1 : 0) +
                        (facts.dificultades === 'si' ? 3 : facts.dificultades === 'frecuentemente' ? 2 : facts.dificultades === 'a_veces' ? 1 : 0) +
                        (facts.disfrute_actividades === 'nada' ? 3 : facts.disfrute_actividades === 'poco' ? 2 : facts.disfrute_actividades === 'algo' ? 1 : 0);
                    return total === 0;
                },
                actions: result => { result.nivelFatiga = NivelFatiga.LEVE; }
            },

            // riesgo burnout: preguntas 1, 8 , 11 (concentracion, enfrentar_problemas, baja_autoestima)
            {
                name: 'Burnout Alto',
                conditions: facts => {
                    const wCon = facts.concentracion === 'mucho_menos' ? 3
                        : facts.concentracion === 'menos' ? 2
                            : facts.concentracion === 'igual' ? 1
                                : 0;
                    const wCap = facts.enfrentar_problemas === 'nunca' ? 3
                        : facts.enfrentar_problemas === 'rara_vez' ? 2
                            : facts.enfrentar_problemas === 'a_veces' ? 1
                                : 0;
                    const wAuto = facts.baja_autoestima === 'alta' ? 3
                        : facts.baja_autoestima === 'media' ? 2
                            : facts.baja_autoestima === 'baja' ? 1
                                : 0;
                    const total = wCon + wCap + wAuto;
                    return total >= 6;
                },
                actions: result => { result.riesgoBurnout = RiesgoBurnout.ALTO; }
            },

            // Riesgo Burnout Moderado (total 3–5)
            {
                name: 'Burnout Moderado',
                conditions: facts => {
                    const wCon = facts.concentracion === 'mucho_menos' ? 3
                        : facts.concentracion === 'menos' ? 2
                            : facts.concentracion === 'igual' ? 1
                                : 0;
                    const wCap = facts.enfrentar_problemas === 'nunca' ? 3
                        : facts.enfrentar_problemas === 'rara_vez' ? 2
                            : facts.enfrentar_problemas === 'a_veces' ? 1
                                : 0;
                    const wAuto = facts.baja_autoestima === 'alta' ? 3
                        : facts.baja_autoestima === 'media' ? 2
                            : facts.baja_autoestima === 'baja' ? 1
                                : 0;
                    const total = wCon + wCap + wAuto;
                    return total >= 3 && total <= 5;
                },
                actions: result => { result.riesgoBurnout = RiesgoBurnout.MODERADO; }
            },

            // Riesgo Burnout Bajo (total 1–2)
            {
                name: 'Burnout Bajo',
                conditions: facts => {
                    const wCon = facts.concentracion === 'mucho_menos' ? 3
                        : facts.concentracion === 'menos' ? 2
                            : facts.concentracion === 'igual' ? 1
                                : 0;
                    const wCap = facts.enfrentar_problemas === 'nunca' ? 3
                        : facts.enfrentar_problemas === 'rara_vez' ? 2
                            : facts.enfrentar_problemas === 'a_veces' ? 1
                                : 0;
                    const wAuto = facts.baja_autoestima === 'alta' ? 3
                        : facts.baja_autoestima === 'media' ? 2
                            : facts.baja_autoestima === 'baja' ? 1
                                : 0;
                    const total = wCon + wCap + wAuto;
                    return total >= 1 && total <= 2;
                },
                actions: result => { result.riesgoBurnout = RiesgoBurnout.BAJO; }
            },

            // Riesgo Burnout Leve (total == 0)
            {
                name: 'Burnout Leve',
                conditions: facts => {
                    const wCon = facts.concentracion === 'mucho_menos' ? 3
                        : facts.concentracion === 'menos' ? 2
                            : facts.concentracion === 'igual' ? 1
                                : 0;
                    const wCap = facts.enfrentar_problemas === 'nunca' ? 3
                        : facts.enfrentar_problemas === 'rara_vez' ? 2
                            : facts.enfrentar_problemas === 'a_veces' ? 1
                                : 0;
                    const wAuto = facts.baja_autoestima === 'alta' ? 3
                        : facts.baja_autoestima === 'media' ? 2
                            : facts.baja_autoestima === 'baja' ? 1
                                : 0;
                    const total = wCon + wCap + wAuto;
                    return total === 0;
                },
                actions: result => { result.riesgoBurnout = RiesgoBurnout.LEVE; }
            },

            // Estado emocional: preguntas 3, 4, 9, 10, 12 (sentido_utilidad, capacidad_decidir, depresion, desconfianza, felicidad)
            {
                name: 'Estado Nivel 6',
                conditions: facts => {
                    const wUtil = facts.sentido_utilidad === 'mucho' ? 3
                        : facts.sentido_utilidad === 'algo' ? 2
                            : facts.sentido_utilidad === 'poco' ? 1
                                : 0;
                    const wDec = facts.capacidad_decidir === 'alta' ? 3
                        : facts.capacidad_decidir === 'media' ? 2
                            : facts.capacidad_decidir === 'baja' ? 1
                                : 0;
                    const wDep = facts.depresion === 'no' ? 3
                        : facts.depresion === 'leve' ? 2
                            : facts.depresion === 'moderado' ? 1
                                : 0;
                    const wDes = facts.desconfianza === 'muy_baja' ? 3
                        : facts.desconfianza === 'baja' ? 2
                            : facts.desconfianza === 'media' ? 1
                                : 0;
                    const wFeli = facts.felicidad === 'si' ? 3
                        : facts.felicidad === 'algo' ? 2
                            : facts.felicidad === 'poco' ? 1
                                : 0;
                    const total = wUtil + wDec + wDep + wDes + wFeli;
                    return total <= 2;
                },
                actions: result => { result.estadoEmocional = EstadoEmocional.NIVEL6; }
            },


            {
                name: 'Estado Nivel 5',
                conditions: facts => {
                    const wUtil = facts.sentido_utilidad === 'mucho' ? 3
                        : facts.sentido_utilidad === 'algo' ? 2
                            : facts.sentido_utilidad === 'poco' ? 1
                                : 0;
                    const wDec = facts.capacidad_decidir === 'alta' ? 3
                        : facts.capacidad_decidir === 'media' ? 2
                            : facts.capacidad_decidir === 'baja' ? 1
                                : 0;
                    const wDep = facts.depresion === 'no' ? 3
                        : facts.depresion === 'leve' ? 2
                            : facts.depresion === 'moderado' ? 1
                                : 0;
                    const wDes = facts.desconfianza === 'muy_baja' ? 3
                        : facts.desconfianza === 'baja' ? 2
                            : facts.desconfianza === 'media' ? 1
                                : 0;
                    const wFeli = facts.felicidad === 'si' ? 3
                        : facts.felicidad === 'algo' ? 2
                            : facts.felicidad === 'poco' ? 1
                                : 0;
                    const total = wUtil + wDec + wDep + wDes + wFeli;
                    return total >= 3 && total <= 5;
                },
                actions: result => { result.estadoEmocional = EstadoEmocional.NIVEL5; }
            },

            
            {
                name: 'Estado Nivel 4',
                conditions: facts => {
                    const wUtil = facts.sentido_utilidad === 'mucho' ? 3
                        : facts.sentido_utilidad === 'algo' ? 2
                            : facts.sentido_utilidad === 'poco' ? 1
                                : 0;
                    const wDec = facts.capacidad_decidir === 'alta' ? 3
                        : facts.capacidad_decidir === 'media' ? 2
                            : facts.capacidad_decidir === 'baja' ? 1
                                : 0;
                    const wDep = facts.depresion === 'no' ? 3
                        : facts.depresion === 'leve' ? 2
                            : facts.depresion === 'moderado' ? 1
                                : 0;
                    const wDes = facts.desconfianza === 'muy_baja' ? 3
                        : facts.desconfianza === 'baja' ? 2
                            : facts.desconfianza === 'media' ? 1
                                : 0;
                    const wFeli = facts.felicidad === 'si' ? 3
                        : facts.felicidad === 'algo' ? 2
                            : facts.felicidad === 'poco' ? 1
                                : 0;
                    const total = wUtil + wDec + wDep + wDes + wFeli;
                    return total >= 6 && total <= 8;
                },
                actions: result => { result.estadoEmocional = EstadoEmocional.NIVEL4; }
            },

            
            {
                name: 'Estado Nivel 3',
                conditions: facts => {
                    const wUtil = facts.sentido_utilidad === 'mucho' ? 3
                        : facts.sentido_utilidad === 'algo' ? 2
                            : facts.sentido_utilidad === 'poco' ? 1
                                : 0;
                    const wDec = facts.capacidad_decidir === 'alta' ? 3
                        : facts.capacidad_decidir === 'media' ? 2
                            : facts.capacidad_decidir === 'baja' ? 1
                                : 0;
                    const wDep = facts.depresion === 'no' ? 3
                        : facts.depresion === 'leve' ? 2
                            : facts.depresion === 'moderado' ? 1
                                : 0;
                    const wDes = facts.desconfianza === 'muy_baja' ? 3
                        : facts.desconfianza === 'baja' ? 2
                            : facts.desconfianza === 'media' ? 1
                                : 0;
                    const wFeli = facts.felicidad === 'si' ? 3
                        : facts.felicidad === 'algo' ? 2
                            : facts.felicidad === 'poco' ? 1
                                : 0;
                    const total = wUtil + wDec + wDep + wDes + wFeli;
                    return total >= 9 && total <= 10;
                },
                actions: result => { result.estadoEmocional = EstadoEmocional.NIVEL3; }
            },

            
            {
                name: 'Estado Nivel 2',
                conditions: facts => {
                    const wUtil = facts.sentido_utilidad === 'mucho' ? 3
                        : facts.sentido_utilidad === 'algo' ? 2
                            : facts.sentido_utilidad === 'poco' ? 1
                                : 0;
                    const wDec = facts.capacidad_decidir === 'alta' ? 3
                        : facts.capacidad_decidir === 'media' ? 2
                            : facts.capacidad_decidir === 'baja' ? 1
                                : 0;
                    const wDep = facts.depresion === 'no' ? 3
                        : facts.depresion === 'leve' ? 2
                            : facts.depresion === 'moderado' ? 1
                                : 0;
                    const wDes = facts.desconfianza === 'muy_baja' ? 3
                        : facts.desconfianza === 'baja' ? 2
                            : facts.desconfianza === 'media' ? 1
                                : 0;
                    const wFeli = facts.felicidad === 'si' ? 3
                        : facts.felicidad === 'algo' ? 2
                            : facts.felicidad === 'poco' ? 1
                                : 0;
                    const total = wUtil + wDec + wDep + wDes + wFeli;
                    return total === 11;
                },
                actions: result => { result.estadoEmocional = EstadoEmocional.NIVEL2; }
            },

            
            {
                name: 'Estado Nivel 1',
                conditions: facts => {
                    const wUtil = facts.sentido_utilidad === 'mucho' ? 3
                        : facts.sentido_utilidad === 'algo' ? 2
                            : facts.sentido_utilidad === 'poco' ? 1
                                : 0;
                    const wDec = facts.capacidad_decidir === 'alta' ? 3
                        : facts.capacidad_decidir === 'media' ? 2
                            : facts.capacidad_decidir === 'baja' ? 1
                                : 0;
                    const wDep = facts.depresion === 'no' ? 3
                        : facts.depresion === 'leve' ? 2
                            : facts.depresion === 'moderado' ? 1
                                : 0;
                    const wDes = facts.desconfianza === 'muy_baja' ? 3
                        : facts.desconfianza === 'baja' ? 2
                            : facts.desconfianza === 'media' ? 1
                                : 0;
                    const wFeli = facts.felicidad === 'si' ? 3
                        : facts.felicidad === 'algo' ? 2
                            : facts.felicidad === 'poco' ? 1
                                : 0;
                    const total = wUtil + wDec + wDep + wDes + wFeli;
                    return total >= 12;
                },
                actions: result => { result.estadoEmocional = EstadoEmocional.NIVEL1; }
            }
        ]
    }
}