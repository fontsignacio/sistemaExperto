/**
 * Crea una barra de progreso con tantos segmentos como pasos
 * @param {HTMLElement} container  Elemento donde insertar la barra (antes del formulario)
 * @param {number} stepsCount     Número de pasos en el wizard
 * @returns {HTMLElement}         El elemento de la barra de progreso
 */
export function createProgressBar(container, stepsCount) {
    const bar = document.createElement('div');
    bar.className = 'progress-bar';
    for (let i = 0; i < stepsCount; i++) {
        const seg = document.createElement('div');
        bar.appendChild(seg);
    }
    container.insertBefore(bar, container.querySelector('#psico-form'));
    return bar;
}

/**
 * Actualiza la barra de progreso activando los segmentos hasta el índice dado
 * @param {HTMLElement} bar   La barra de progreso creada
 * @param {number} index      Paso actual (0-based)
 */
export function updateProgressBar(bar, index) {
    Array.from(bar.children).forEach((seg, idx) => {
        seg.classList.toggle('active', idx <= index);
    });
}
