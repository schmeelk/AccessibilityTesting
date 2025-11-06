function calculate() {
    
    // Read values from inputs
    const xInput = document.getElementById('x-value');
    const yInput = document.getElementById('y-value');
    const mlXInput = document.getElementById('ml-x-value');
    const mlYInput = document.getElementById('ml-y-value');
    const x = parseFloat(xInput && xInput.value) || 0;
    const y = parseFloat(yInput && yInput.value) || 0;

    // Compute result (example: sum)
    const result = x * y;

    // Find or create result container
    let resultEl = document.getElementById('result');
    if (!resultEl) {
        let equalOperator = document.createElement('mo');
        equalOperator.textContent = "=";

        resultEl = document.createElement('mn');
        resultEl.id = 'result';
        resultEl.setAttribute('aria-live', 'polite');
        // Insert after the form section
        const equation = document.getElementById('equation');
        if (equation) {
            equation.appendChild(equalOperator);
            equation.appendChild(resultEl);
        }
        else document.body.appendChild(resultEl);
    }

    mlXInput.textContent = x;
    mlYInput.textContent = y;
    resultEl.textContent = result;
    MathJax.typeset([mlXInput, mlYInput, resultEl]);
    return result;
}

// Expose for inline handlers in older browsers
window.calculate = calculate;