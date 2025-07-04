// Optimized generateQuestions function
async function generateQuestions() {
    const context = document.getElementById('contextInput').value;
    const generateButton = document.getElementById('generateButton');
    
    if (!context.trim()) {
        alert('Please enter a passage.');
        return;
    }

    generateButton.innerText = 'Loading...';

    try {
        // Use optimized HF Spaces fetch (direct first)
        const response = await fetchHFSpaces('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ context })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        // Success feedback
        showLoadingMessage('✅ Questions generated successfully!');
        
        console.log('Generated questions:', data.question_answer);

        // Store questions and answers in variables
        const questions = data.question_answer.map(q => q.question);
        const answers = data.question_answer.map(q => q.answer);

        // Store in localStorage
        localStorage.setItem('question_answer', JSON.stringify(questions));
        localStorage.setItem('answers', JSON.stringify(answers));
        localStorage.setItem('passage', context);
        
        // Small delay to show success message
        setTimeout(() => {
            hideLoadingMessage();
            window.location.href = 'display_question_answer.html';
        }, 1500);

    } catch (error) {
        console.error('Error:', error);
        hideLoadingMessage();
        
        // User-friendly error messages
        let errorMessage = '';
        
        if (error.message.includes('timed out') || error.message.includes('starting up')) {
            errorMessage = 'The AI model is starting up. This usually takes 1-2 minutes on first use. Please try again.';
        } else if (error.message.includes('Network connection')) {
            errorMessage = 'Network connection issue. Please check your internet connection and try again.';
        } else if (error.message.includes('502') || error.message.includes('Bad Gateway')) {
            errorMessage = 'The AI service is temporarily busy. Please wait a moment and try again.';
        } else {
            errorMessage = 'Error generating questions. Please try again with different text or check your internet connection.';
        }
        
        // Enhanced error dialog
        showErrorDialog(errorMessage);
        
    } finally {
        generateButton.innerText = 'Generate';
    }
}

// Enhanced error dialog
function showErrorDialog(message) {
    // Remove existing error dialog
    const existingDialog = document.getElementById('error-dialog');
    if (existingDialog) {
        existingDialog.remove();
    }
    
    const errorDialog = document.createElement('div');
    errorDialog.id = 'error-dialog';
    errorDialog.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
        color: white;
        padding: 30px;
        border-radius: 15px;
        z-index: 10000;
        text-align: center;
        max-width: 400px;
        box-shadow: 0 15px 35px rgba(0,0,0,0.3);
        font-family: 'Comic Neue', cursive;
        backdrop-filter: blur(10px);
    `;
    
    errorDialog.innerHTML = `
        <div style="font-size: 48px; margin-bottom: 15px;">⚠️</div>
        <div style="font-weight: bold; font-size: 18px; margin-bottom: 15px;">Oops! Something went wrong</div>
        <div style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">${message}</div>
        <button onclick="document.getElementById('error-dialog').remove()" style="
            background: rgba(255,255,255,0.2);
            border: 2px solid white;
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            transition: all 0.3s ease;
        " onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">
            Try Again
        </button>
    `;
    
    document.body.appendChild(errorDialog);
    
    // Auto-close after 8 seconds
    setTimeout(() => {
        if (document.getElementById('error-dialog')) {
            errorDialog.remove();
        }
    }, 8000);
}