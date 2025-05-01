/**
 * Valida que en el step dado haya una opción marcada para el input requerido
 * @param {HTMLSectionElement} step
 * @returns {boolean}  true si es válido, false y alerta en caso contrario
 */
export function validateStep(step) {
    const req = step.querySelector('input[required]');
    const name = req.name;
    const checked = step.querySelector(`input[name="${name}"]:checked`);
    if (!checked) {
        alert('Por favor seleccioná una respuesta para continuar.');
        return false;
    }
    return true;
}
