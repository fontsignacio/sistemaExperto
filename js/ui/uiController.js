import { createProgressBar, updateProgressBar } from './progressBar.js';
import { showStep, attachNextButtons, attachBackButtons } from './stepNavigator.js';
import { validateStep } from '../utils/validators.js';
import { FactBase } from '../core/factBase.js';
import { KnowledgeBase } from '../core/knowledgeBase.js';
import { InferenceEngine } from '../core/inferenceEngine.js';

export class UIController {
    constructor() {
        this.container = document.querySelector('.container');
        this.steps = Array.from(document.querySelectorAll('.step'));
        this.currentStep = 0;

        // inicializar FactBase, KB y motor
        this.factBase = new FactBase();
        this.kb = new KnowledgeBase();
        this.engine = new InferenceEngine(this.kb, this.factBase);

        // crear y mostrar barra de progreso
        this.progressBar = createProgressBar(this.container, this.steps.length);
        showStep(this.steps, this.currentStep);
        updateProgressBar(this.progressBar, this.currentStep);

        // eventos de navegación
        attachNextButtons(this.steps, '.next-btn', idx => this.step(idx, true));
        attachBackButtons(this.steps, '.back-btn', idx => this.step(idx));
        document.getElementById('evaluar-btn').addEventListener('click', () => this.evaluate());
    }

    step(idx, next = false) {
        const step = this.steps[idx];
        if (next && !validateStep(step)) return;
    
        // Guardar hecho
        if (next) {
            const req = step.querySelector('input[required]');
            this.factBase.setFact(req.name, step.querySelector(`input[name="${req.name}"]:checked`).value);
        }
    
        // Actualizar el índice del paso actual
        next ? this.currentStep++ : this.currentStep--;
    
        // Mostrar el paso actual y actualizar la barra de progreso
        showStep(this.steps, this.currentStep);
        updateProgressBar(this.progressBar, this.currentStep);
    
        // Habilitar o deshabilitar el botón "Atrás"
        const backButton = this.steps[this.currentStep].querySelector('.back-btn');
        if (this.currentStep === 0) {
            backButton.disabled = true; // Deshabilitar si estamos en el primer paso
        } else {
            backButton.disabled = false; // Habilitar en otros pasos
        }
    }

    updateStep() {
        showStep(this.steps, this.currentStep);
        updateProgressBar(this.progressBar, this.currentStep);
    }

    evaluate() {
        const last = this.steps[this.currentStep];
        if (!validateStep(last)) return;

        // guardar último hecho
        const req = last.querySelector('input[required]');
        this.factBase.setFact(req.name, last.querySelector(`input[name="${req.name}"]:checked`).value);

        // ejecutar inferencia
        const { estadoEmocional, nivelFatiga, riesgoBurnout } = this.engine.run();

        // mostrar resultados
        document.getElementById('estadoSalida').textContent = `Estado emocional general: ${estadoEmocional}`; 
        document.getElementById('fatigaSalida').textContent = `Nivel de fatiga mental: ${nivelFatiga}`; 
        document.getElementById('burnoutSalida').textContent = `Riesgo de burnout: ${riesgoBurnout}`;
        document.getElementById('estadoSalida').className = `estado-${estadoEmocional.toLowerCase()}`;
        document.getElementById('fatigaSalida').className = `fatiga-${nivelFatiga.toLowerCase()}`;
        document.getElementById('burnoutSalida').className = `burnout-${riesgoBurnout.toLowerCase()}`;
        document.getElementById('resultado').style.display = 'block';
    }
}
