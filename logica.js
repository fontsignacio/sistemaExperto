const steps = Array.from(document.querySelectorAll('.step'));
let currentStep = 0;

function showStep(index) {
    steps.forEach((s, i) => s.classList.toggle('active', i === index));
}

// Crear barra de progreso
const progressBar = document.createElement('div');
progressBar.className = 'progress-bar';
steps.forEach(() => {
    const progressStep = document.createElement('div');
    progressBar.appendChild(progressStep);
});
document.querySelector('.container').insertBefore(progressBar, document.getElementById('psico-form'));

// Actualizar barra de progreso
function updateProgressBar(index) {
    const progressSteps = document.querySelectorAll('.progress-bar div');
    progressSteps.forEach((step, i) => {
        step.classList.toggle('active', i <= index);
    });
}

// Mostrar paso inicial y actualizar barra de progreso
showStep(currentStep);
updateProgressBar(currentStep);

// Next buttons
document.querySelectorAll('.next-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // validar que haya una opción seleccionada
        const stepSection = steps[currentStep];
        const requiredInput = stepSection.querySelector('input[required]');
        if (!stepSection.querySelector('input[name="' + requiredInput.name + '"]:checked')) {
            alert('Por favor seleccioná una respuesta para continuar.');
            return;
        }
        currentStep++;
        showStep(currentStep);
        updateProgressBar(currentStep);
    });
});

// Evaluar al final
document.getElementById('evaluar-btn').addEventListener('click', () => {
    // validar última pregunta
    const last = steps[currentStep];
    const req = last.querySelector('input[required]');
    if (!last.querySelector('input[name="' + req.name + '"]:checked')) {
        alert('Por favor seleccioná una respuesta para evaluar.');
        return;
    }
    evaluarRespuestas();
});

function evaluarRespuestas() {
    const getVal = name => document.querySelector(`input[name="${name}"]:checked`).value;
    const c = getVal('concentracion');
    const s = getVal('sueno_perdido');
    const u = getVal('sentido_utilidad');
    const d = getVal('capacidad_decidir');
    const a = getVal('agobio_tension');
    const sd = getVal('superar_dificultades');
    const da = getVal('disfrute_actividades');
    const ep = getVal('enfrentar_problemas');
    const dep = getVal('depresion');
    const conf = getVal('confianza');
    const auto = getVal('autoestima');
    const fel = getVal('felicidad');

    let estadoEmocional = 'Estable';
    let nivelFatiga = 'Leve';
    let riesgoBurnout = 'Bajo';

    if (c === 'mucho_menos' && conf === 'muy_baja' && fel === 'nada' && da === 'nada') {
        estadoEmocional = 'Inestable'; nivelFatiga = 'Severo'; riesgoBurnout = 'Alto';
    } else if (c === 'menos' && (ep === 'rara_vez' || ep === 'nunca') && auto === 'baja') {
        estadoEmocional = 'Vulnerable'; nivelFatiga = 'Moderado'; riesgoBurnout = 'Medio';
    } else if (s === 'severo' && a === 'alto' && sd === 'nunca') {
        estadoEmocional = 'Inestable'; nivelFatiga = 'Severo';
    } else if ((fel === 'si' || fel === 'algo') && (conf === 'alta' || conf === 'media')
        && (da === 'mucho' || da === 'algo') && (dep === 'no' || dep === 'leve')) {
        estadoEmocional = 'Estable'; nivelFatiga = 'Leve'; riesgoBurnout = 'Bajo';
    } else if ((dep === 'moderado' || dep === 'severo') && (auto === 'baja' || auto === 'nula')) {
        estadoEmocional = 'Vulnerable';
    }

    document.getElementById('estadoSalida').textContent = `Estado emocional general: ${estadoEmocional}`;
    document.getElementById('fatigaSalida').textContent = `Nivel de fatiga mental: ${nivelFatiga}`;
    document.getElementById('burnoutSalida').textContent = `Riesgo de burnout académico: ${riesgoBurnout}`;
    document.getElementById('estadoSalida').className = `estado-${estadoEmocional.toLowerCase()}`;
    document.getElementById('fatigaSalida').className = `fatiga-${nivelFatiga.toLowerCase()}`;
    document.getElementById('burnoutSalida').className = `burnout-${riesgoBurnout.toLowerCase()}`;
    document.getElementById('resultado').style.display = 'block';
}
