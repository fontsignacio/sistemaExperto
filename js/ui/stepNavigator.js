/**
 * Muestra sólo el section `.step` correspondiente al índice dado
 * @param {HTMLSectionElement[]} steps   Array de <section class="step">
 * @param {number} index                 Paso a mostrar
 */
export function showStep(steps, index) {
    steps.forEach((s, i) => s.classList.toggle('active', i === index));
}

/**
 * Añade manejadores a los botones “Siguiente” de cada paso
 * @param {HTMLSectionElement[]} steps
 * @param {string} nextBtnSelector       Selector para los botones next (e.g. '.next-btn')
 * @param {(currentIndex: number) => void} onNext   Callback al avanzar de paso
 */
export function attachNextButtons(steps, nextBtnSelector, onNext) {
    steps.forEach((step, idx) => {
        const btn = step.querySelector(nextBtnSelector);
        if (btn) {
            btn.addEventListener('click', () => onNext(idx));
        }
    });
}

/**
 * Añade manejadores a los botones “Atrás” de cada paso
 * @param {HTMLSectionElement[]} steps
 * @param {string} backBtnSelector       Selector para los botones back (e.g. '.back-btn')
 * @param {(currentIndex: number) => void} onBack   Callback al retroceder de paso
 */
export function attachBackButtons(steps, backBtnSelector, onBack) {
    steps.forEach((step, idx) => {
        const btn = step.querySelector(backBtnSelector);
        if (btn) {
            btn.addEventListener('click', () => onBack(idx));
        }
    });
}