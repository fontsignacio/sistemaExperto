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
                    result.estadoEmocional = EstadoEmocional.DEPRESIVO;
                    result.nivelFatiga = NivelFatiga.SEVERO;
                    result.riesgoBurnout = RiesgoBurnout.ALTO;
                },
                stop: true
            },

            // fatiga:preguntas 2, 5 
            {
                name: 'Fatiga Leve',
                conditions: facts => facts.sueno_perdido === 'no' && facts.agobio_tension === 'no',
                actions: result => { result.nivelFatiga = NivelFatiga.LEVE; }
            },
            {
                name: 'Fatiga Bajo 1',
                conditions: facts => facts.sueno_perdido === 'leve' && facts.agobio_tension === 'no',
                actions: result => { result.nivelFatiga = NivelFatiga.BAJO; }
            },
            {
                name: 'Fatiga Bajo 2',
                conditions: facts => facts.sueno_perdido === 'no' && facts.agobio_tension === 'leve',
                actions: result => { result.nivelFatiga = NivelFatiga.BAJO; }
            },
            {
                name: 'Fatiga Moderado 1',
                conditions: facts => facts.sueno_perdido === 'leve' && facts.agobio_tension === 'leve',
                actions: result => { result.nivelFatiga = NivelFatiga.MODERADO; }
            },
            {
                name: 'Fatiga Moderado 2',
                conditions: facts => facts.sueno_perdido === 'moderado' && facts.agobio_tension === 'no',
                actions: result => { result.nivelFatiga = NivelFatiga.MODERADO; }
            },
            {
                name: 'Fatiga Moderado 3',
                conditions: facts => facts.sueno_perdido === 'leve' && facts.agobio_tension === 'moderado',
                actions: result => { result.nivelFatiga = NivelFatiga.MODERADO; }
            },
            {
                name: 'Fatiga Alto 1',
                conditions: facts => facts.sueno_perdido === 'no' && facts.agobio_tension === 'alto',
                actions: result => { result.nivelFatiga = NivelFatiga.ALTO; }
            },
            {
                name: 'Fatiga Alto 2',
                conditions: facts => facts.sueno_perdido === 'leve' && facts.agobio_tension === 'alto',
                actions: result => { result.nivelFatiga = NivelFatiga.ALTO; }
            },
            {
                name: 'Fatiga Alto 3',
                conditions: facts => facts.sueno_perdido === 'severo' && facts.agobio_tension === 'leve',
                actions: result => { result.nivelFatiga = NivelFatiga.ALTO; }
            },
            {
                name: 'Fatiga Alto 4',
                conditions: facts => facts.sueno_perdido === 'severo' && facts.agobio_tension === 'moderado',
                actions: result => { result.nivelFatiga = NivelFatiga.ALTO; }
            },
            {
                name: 'Fatiga Alto 5',
                conditions: facts => facts.sueno_perdido === 'severo' && facts.agobio_tension === 'moderado',
                actions: result => { result.nivelFatiga = NivelFatiga.ALTO; }
            },
            {
                name: 'Fatiga Severo 1',
                conditions: facts => facts.sueno_perdido === 'moderado' && facts.agobio_tension === 'alto',
                actions: result => { result.nivelFatiga = NivelFatiga.SEVERO; }
            },
            {
                name: 'Fatiga Severo 2',
                conditions: facts => facts.sueno_perdido === 'severo' && facts.agobio_tension === 'alto',
                actions: result => { result.nivelFatiga = NivelFatiga.SEVERO; }
            },


            // riesgo burnout: preguntas 4,6

          {
                name: 'Riesgo Leve',
                conditions: facts => facts.capacidad_decidir === 'alta' && facts.dificultades === 'nunca',
                actions: result => { result.riesgo = RiesgoBurnout.LEVE; }
            },
            {
                name: 'Riesgo Bajo 1',
                conditions: facts => facts.capacidad_decidir === 'alta' && facts.dificultades === 'a_veces',
                actions: result => { result.riesgo = RiesgoBurnout.BAJO; }
            },
            {
                name: 'Riesgo Bajo 2',
                conditions: facts => facts.capacidad_decidir === 'media' && facts.dificultades === 'nunca',
                actions: result => { result.riesgo = RiesgoBurnout.BAJO; }
            },
            {
                name: 'Riesgo Moderado 1',
                conditions: facts => facts.capacidad_decidir === 'alta' && (facts.dificultades === 'frecuentemente' || facts.dificultades === 'si'),
                actions: result => { result.riesgo = RiesgoBurnout.MODERADO; }
            },
            {
                name: 'Riesgo Moderado 2',
                conditions: facts => facts.capacidad_decidir === 'media' && facts.dificultades === 'a_veces',
                actions: result => { result.riesgo = RiesgoBurnout.MODERADO; }
            },
            {
                name: 'Riesgo Alto 1',
                conditions: facts => facts.capacidad_decidir === 'media' && (facts.dificultades === 'frecuentemente' || facts.dificultades === 'si'),
                actions: result => { result.riesgo = RiesgoBurnout.ALTO; }
            },
            {
                name: 'Riesgo Alto 2',
                conditions: facts => facts.capacidad_decidir === 'baja' && facts.dificultades !== 'nunca',
                actions: result => { result.riesgo = RiesgoBurnout.ALTO; }
            },
            {
                name: 'Riesgo Moderado 3',
                conditions: facts => facts.capacidad_decidir === 'baja' && facts.dificultades === 'nunca',
                actions: result => { result.riesgo = RiesgoBurnout.MODERADO; }
            },
            {
                name: 'Riesgo Alto 3',
                conditions: facts => facts.capacidad_decidir === 'nula',
                actions: result => { result.riesgo = RiesgoBurnout.ALTO; }
            },





            // Estado emocional: preguntas 1, 3, 7, 9, 10, 11, 12
            {
                name: 'Estado Feliz',
                conditions: facts =>
                    facts.concentracion === 'mejor' &&
                    facts.sentido_utilidad === 'mucho' &&
                    facts.disfrute_actividades === 'mucho' &&
                    facts.depresion === 'no' &&
                    facts.desconfianza === 'muy_baja' &&
                    facts.baja_autoestima === 'nula' &&
                    facts.felicidad === 'si',
                actions: result => { result.estadoEmocional = EstadoEmocional.FELIZ; }
            },
            {
                name: 'Estado Triste',
                conditions: facts =>
                    (facts.felicidad === 'poco' || facts.felicidad === 'nada') &&
                    (facts.disfrute_actividades === 'poco' || facts.disfrute_actividades === 'nada') &&
                    (facts.sentido_utilidad === 'poco' || facts.sentido_utilidad === 'nada') &&
                    (facts.concentracion === 'menos' || facts.concentracion === 'mucho_menos') &&
                    (facts.baja_autoestima === 'media' || facts.baja_autoestima === 'alta') &&
                    (facts.desconfianza === 'media' || facts.desconfianza === 'baja'),
                actions: result => { result.estadoEmocional = EstadoEmocional.TRISTE; }
            },
            {
                name: 'Estado Depresivo',
                conditions: facts =>
                    (facts.depresion === 'moderado' || facts.depresion === 'severo') &&
                    (facts.felicidad === 'nada' || facts.felicidad === 'poco') &&
                    (facts.disfrute_actividades === 'nada' || facts.disfrute_actividades === 'poco') &&
                    (facts.sentido_utilidad === 'nada' || facts.sentido_utilidad === 'poco') &&
                    facts.baja_autoestima === 'alta' &&
                    facts.desconfianza === 'alta' &&
                    (facts.concentracion === 'mucho_menos' || facts.concentracion === 'menos'),
                actions: result => { result.estadoEmocional = EstadoEmocional.DEPRESIVO; }
            },
            {
                name: 'Estado Estresado',
                conditions: facts =>
                    (facts.concentracion === 'menos' || facts.concentracion === 'mucho_menos') &&
                    (facts.desconfianza === 'media' || facts.desconfianza === 'baja') &&
                    (facts.disfrute_actividades === 'poco' || facts.disfrute_actividades === 'algo') &&
                    (facts.felicidad === 'algo' || facts.felicidad === 'poco') &&
                    (facts.depresion === 'leve' || facts.depresion === 'moderado') &&
                    (facts.sentido_utilidad === 'algo') &&
                    (facts.baja_autoestima === 'media'),
                actions: result => { result.estadoEmocional = EstadoEmocional.ESTRESADO; }
            },
            {
                name: 'Estado Miedoso',
                conditions: facts =>
                    facts.desconfianza === 'muy_baja' &&
                    (facts.baja_autoestima === 'alta' || facts.baja_autoestima === 'media') &&
                    (facts.felicidad === 'poco' || facts.felicidad === 'nada') &&
                    (facts.concentracion === 'mucho_menos') &&
                    (facts.sentido_utilidad === 'nada' || facts.sentido_utilidad === 'poco') &&
                    (facts.depresion === 'moderado'),
                actions: result => { result.estadoEmocional = EstadoEmocional.MIEDOSO; }
            },
            {
                name: 'Estado Enojado',
                conditions: facts =>
                    facts.concentracion === 'mucho_menos' &&
                    facts.sentido_utilidad === 'nada' &&
                    facts.felicidad === 'nada' &&
                    (facts.disfrute_actividades === 'nada' || facts.disfrute_actividades === 'poco') &&
                    facts.desconfianza === 'alta' &&
                    (facts.depresion === 'leve' || facts.depresion === 'moderado'),
                actions: result => { result.estadoEmocional = EstadoEmocional.ENOJADO; }
            }

        
        ]
    
    }
    
}


