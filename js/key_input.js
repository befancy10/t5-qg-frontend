document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.key-input, .key-input-first');
    let isProcessingPaste = false;

    // Spline viewer setup
    const splineViewer = document.querySelector('spline-viewer');
    if (splineViewer) {
        splineViewer.addEventListener('load', () => {
            try {
                const spline = splineViewer.shadowRoot.querySelector('spline-viewer-app').application;
                spline.setCameraControls(true);
            } catch (error) {
                console.log('Spline viewer setup error:', error);
            }
        });
    }

    // Global paste handler - works when any input is focused
    document.addEventListener('paste', function(e) {
        // Check if the focused element is one of our key inputs
        const activeElement = document.activeElement;
        const isKeyInput = activeElement && (activeElement.classList.contains('key-input') || activeElement.classList.contains('key-input-first'));
        
        if (!isKeyInput) return;

        e.preventDefault();
        isProcessingPaste = true;

        const pastedText = (e.clipboardData || window.clipboardData).getData('text').trim();
        console.log('Pasted text:', pastedText);

        // Validate pasted text format
        if (pastedText.length === 9 && /^[cm][A-Za-z0-9]{8}$/i.test(pastedText)) {
            // Clear all inputs first
            inputs.forEach(inp => inp.value = '');
            
            // Distribute characters to inputs
            const chars = pastedText.split('');
            inputs.forEach((inp, idx) => {
                if (idx === 0) {
                    inp.value = chars[idx].toLowerCase(); // First character (c/m) should be lowercase
                } else {
                    inp.value = chars[idx].toUpperCase(); // Other characters should be uppercase
                }
            });
            
            // Focus on the last input to indicate completion
            inputs[inputs.length - 1].focus();
            console.log('Successfully populated all inputs');
        } else {
            alert('Invalid key format! Please paste a 9-character key starting with "c" or "m" followed by 8 alphanumeric characters.');
            // Clear all inputs
            inputs.forEach(inp => inp.value = '');
            // Focus on first input
            inputs[0].focus();
        }

        setTimeout(() => {
            isProcessingPaste = false;
        }, 100);
    });

    // Enhanced input handling for each field
    inputs.forEach((input, index) => {
        // Handle manual typing
        input.addEventListener('input', function(e) {
            if (isProcessingPaste) return;

            const value = input.value;
            
            // Validate input based on position
            let isValid = false;
            if (index === 0) {
                // First input: only 'c' or 'm' allowed
                isValid = /^[cm]$/i.test(value);
                if (isValid) {
                    input.value = value.toLowerCase();
                }
            } else {
                // Other inputs: alphanumeric characters
                isValid = /^[A-Za-z0-9]$/.test(value);
                if (isValid) {
                    input.value = value.toUpperCase();
                }
            }

            if (!isValid) {
                input.value = '';
                return;
            }

            // Auto-move to next input
            if (isValid && value && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });

        // Handle backspace navigation
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace') {
                if (input.value === '' && index > 0) {
                    // Move to previous input if current is empty
                    inputs[index - 1].focus();
                }
            } else if (e.key === 'ArrowLeft' && index > 0) {
                inputs[index - 1].focus();
            } else if (e.key === 'ArrowRight' && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });

        // Prevent multiple characters in a single input
        input.addEventListener('keypress', function(e) {
            if (input.value.length >= 1 && e.key !== 'Backspace' && e.key !== 'Delete') {
                e.preventDefault();
            }
        });

        // Auto-select content when focused
        input.addEventListener('focus', function() {
            setTimeout(() => {
                input.select();
            }, 10);
        });
    });

    // Auto-focus first input on page load
    inputs[0].focus();
});