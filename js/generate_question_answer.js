async function generateQuestions() {
    const context = document.getElementById('contextInput').value;
    const generateButton = document.getElementById('generateButton');
    
    if (!context.trim()) {
        alert('Please enter a passage.');
        return;
    }

    generateButton.innerText = 'Loading...';
    showLoadingMessage('Connecting to AI model...');

    try {
        // Use smart fetch with fallback
        const response = await fetchHFSpaces('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ context })
        }, true); // Enable direct fallback

        if (!response.ok) {
            throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        showLoadingMessage('Questions generated successfully!');

        // Store questions and answers in variables
        const questions = data.question_answer.map(q => q.question);
        const answers = data.question_answer.map(q => q.answer);

        // Store in localStorage and redirect
        localStorage.setItem('question_answer', JSON.stringify(questions));
        localStorage.setItem('answers', JSON.stringify(answers));
        localStorage.setItem('passage', context);
        
        // Small delay to show success message
        setTimeout(() => {
            window.location.href = 'display_question_answer.html';
        }, 1000);

    } catch (error) {
        console.error('Error:', error);
        
        // More specific error messages
        let errorMessage = 'Error generating questions. ';
        
        if (error.message.includes('502')) {
            errorMessage += 'The AI model is starting up. Please wait 2-3 minutes and try again.';
        } else if (error.message.includes('timeout')) {
            errorMessage += 'Request timed out. The AI model might be loading. Please try again.';
        } else if (error.message.includes('Failed to fetch')) {
            errorMessage += 'Network connection issue. Please check your internet connection.';
        } else {
            errorMessage += 'Please try again in a few moments.';
        }
        
        alert(errorMessage);
        hideLoadingMessage();
    } finally {
        generateButton.innerText = 'Generate';
    }
}

// Retry function for handling cold starts
async function fetchWithRetry(url, options, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            showLoadingMessage(`Attempt ${i + 1}/${retries}: Connecting to AI model...`);
            
            // Increase timeout for each retry
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), (30 + i * 30) * 1000); // 30s, 60s, 90s
            
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (response.ok) {
                showLoadingMessage('AI model connected! Generating questions...');
                return response;
            }
            
            // If 502/503 and not last retry, wait and try again
            if ((response.status === 502 || response.status === 503) && i < retries - 1) {
                showLoadingMessage(`AI model starting up... Retrying in ${(i + 1) * 10} seconds...`);
                await new Promise(resolve => setTimeout(resolve, (i + 1) * 10000)); // 10s, 20s, 30s
                continue;
            }
            
            return response;
            
        } catch (error) {
            if (error.name === 'AbortError') {
                showLoadingMessage('Request timed out, retrying...');
            }
            
            if (i === retries - 1) {
                throw error;
            }
            
            // Wait before retry
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
}

// Helper functions for better UX
function showLoadingMessage(message) {
    let loadingDiv = document.getElementById('loading-message');
    if (!loadingDiv) {
        loadingDiv = document.createElement('div');
        loadingDiv.id = 'loading-message';
        loadingDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 20px;
            border-radius: 10px;
            z-index: 9999;
            text-align: center;
            max-width: 300px;
        `;
        document.body.appendChild(loadingDiv);
    }
    loadingDiv.textContent = message;
    loadingDiv.style.display = 'block';
}

function hideLoadingMessage() {
    const loadingDiv = document.getElementById('loading-message');
    if (loadingDiv) {
        loadingDiv.style.display = 'none';
    }
}