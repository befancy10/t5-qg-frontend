// Temporary fallback strategy for generate_question_answer.js
async function generateQuestions() {
    const context = document.getElementById('contextInput').value;
    const generateButton = document.getElementById('generateButton');
    
    if (!context.trim()) {
        alert('Please enter a passage.');
        return;
    }

    generateButton.innerText = 'Loading...';

    try {
        // Try HF Spaces with enhanced timeout
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
        
        showLoadingMessage('Questions generated successfully!');
        console.log('Generated questions:', data.question_answer);

        // Store questions and answers
        const questions = data.question_answer.map(q => q.question);
        const answers = data.question_answer.map(q => q.answer);

        localStorage.setItem('question_answer', JSON.stringify(questions));
        localStorage.setItem('answers', JSON.stringify(answers));
        localStorage.setItem('passage', context);
        
        setTimeout(() => {
            hideLoadingMessage();
            window.location.href = 'display_question_answer.html';
        }, 1500);

    } catch (error) {
        console.error('Error:', error);
        hideLoadingMessage();
        
        // Enhanced error handling with fallback option
        if (error.message.includes('taking longer than expected') || 
            error.message.includes('timed out') ||
            error.message.includes('temporarily unavailable')) {
            
            showFallbackDialog(context);
        } else {
            showErrorDialog(error.message);
        }
        
    } finally {
        generateButton.innerText = 'Generate';
    }
}

// Fallback dialog with options
function showFallbackDialog(context) {
    const fallbackDialog = document.createElement('div');
    fallbackDialog.id = 'fallback-dialog';
    fallbackDialog.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
        color: #333;
        padding: 30px;
        border-radius: 15px;
        z-index: 10001;
        text-align: center;
        max-width: 450px;
        box-shadow: 0 15px 35px rgba(0,0,0,0.3);
        font-family: 'Comic Neue', cursive;
    `;
    
    fallbackDialog.innerHTML = `
        <div style="font-size: 48px; margin-bottom: 15px;"></div>
        <div style="font-weight: bold; font-size: 20px; margin-bottom: 15px;">AI Model is Starting Up</div>
        <div style="font-size: 16px; line-height: 1.5; margin-bottom: 25px;">
            The AI model is currently loading and may take 2-5 minutes to start up. 
            This is normal for the first request after a period of inactivity.
        </div>
        <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
            <button onclick="retryWithPatience()" style="
                background: #667eea;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 25px;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
            ">
                Wait & Retry (5 min)
            </button>
            <button onclick="useQuickDemo('${context.replace(/'/g, "\\'")}'); document.getElementById('fallback-dialog').remove();" style="
                background: #ff6b6b;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 25px;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
            ">
                Use Demo Mode
            </button>
            <button onclick="document.getElementById('fallback-dialog').remove()" style="
                background: #6c757d;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 25px;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
            ">
                Cancel
            </button>
        </div>
    `;
    
    document.body.appendChild(fallbackDialog);
}

// Retry with maximum patience
async function retryWithPatience() {
    document.getElementById('fallback-dialog').remove();
    
    showLoadingMessage('Waiting for AI model to fully load...<br><small>This may take up to 5 minutes. Please be patient.</small>');
    
    try {
        // Use enhanced fetch with maximum timeout
        const response = await fetchHFSpaces('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                context: document.getElementById('contextInput').value 
            })
        }, 3); // 3 retry attempts

        if (response.ok) {
            const data = await response.json();
            
            showLoadingMessage('Success! AI model is now ready!');
            
            const questions = data.question_answer.map(q => q.question);
            const answers = data.question_answer.map(q => q.answer);

            localStorage.setItem('question_answer', JSON.stringify(questions));
            localStorage.setItem('answers', JSON.stringify(answers));
            localStorage.setItem('passage', document.getElementById('contextInput').value);
            
            setTimeout(() => {
                hideLoadingMessage();
                window.location.href = 'display_question_answer.html';
            }, 2000);
        } else {
            throw new Error('AI model still not responding');
        }
        
    } catch (error) {
        hideLoadingMessage();
        showErrorDialog('The AI model is still starting up. Please try again in a few minutes or use Demo Mode.');
    }
}

// Quick demo mode with sample questions
function useQuickDemo(context) {
    console.log('Using demo mode for context:', context);
    
    // Generate simple questions based on context analysis
    const words = context.toLowerCase().split(/\s+/);
    const sentences = context.split(/[.!?]+/).filter(s => s.trim());
    
    // Simple question generation logic
    const demoQuestions = [];
    const demoAnswers = [];
    
    // Extract some key entities for demo
    const commonNouns = ['cat', 'dog', 'house', 'car', 'book', 'food', 'water', 'time', 'day', 'night'];
    const foundNouns = words.filter(word => commonNouns.includes(word));
    
    if (foundNouns.length > 0) {
        demoQuestions.push(`What is mentioned in the text?`);
        demoAnswers.push(foundNouns[0]);
    }
    
    if (sentences.length > 0) {
        demoQuestions.push(`What does the text talk about?`);
        demoAnswers.push('story');
    }
    
    demoQuestions.push(`How many sentences are in this passage?`);
    demoAnswers.push(sentences.length.toString());
    
    // Ensure we have at least 3 questions
    while (demoQuestions.length < 3) {
        demoQuestions.push(`What is this passage about?`);
        demoAnswers.push('text');
    }
    
    // Store demo data
    localStorage.setItem('question_answer', JSON.stringify(demoQuestions));
    localStorage.setItem('answers', JSON.stringify(demoAnswers));
    localStorage.setItem('passage', context);
    localStorage.setItem('demo_mode', 'true');
    
    showLoadingMessage('Demo questions generated!');
    
    setTimeout(() => {
        hideLoadingMessage();
        window.location.href = 'display_question_answer.html';
    }, 1500);
}