// Enhanced config.js with longer timeout and retry logic
const CONFIG = {
    RAILWAY_API: 'https://t5-qg-db-server-production.up.railway.app',
    HF_SPACES_DIRECT: 'https://befancy10-t5-qg-grade34.hf.space',
    
    // API Endpoints
    ENDPOINTS: {
        // Railway Backend
        CROSSWORD_SAVE: '/display_question_answer',
        MCQ_SAVE: '/export_mcq_data',
        CHECK_KEY: '/check-key',
        CHECK_MCQ: '/check-mcq',
        SAVE_NAME: '/save-name',
        SAVE_MCQ_NAME: '/save-mcq-name',
        LEADERBOARD: '/leaderboard',
        LEADERBOARD_MCQ: '/leaderboard-mcq',
        UPDATE_DONE: '/update-is-done',
        UPDATE_MCQ_RESULT: '/update-mcq-result',
        
        // HF Spaces Model
        GENERATE_QUESTIONS: '/generate',
        GENERATE_DISTRACTORS: '/generate-distractors'
    },
    
    // Helper functions
    getRailwayURL: (endpoint) => `${CONFIG.RAILWAY_API}${endpoint}`,
    getHFSpacesURL: (endpoint) => `${CONFIG.HF_SPACES_DIRECT}${endpoint}`
};

// Enhanced fetch with longer timeout and retry logic
async function fetchHFSpaces(endpoint, options, maxRetries = 2) {
    const directURL = CONFIG.getHFSpacesURL(endpoint);
    const proxyURL = `/api${endpoint}`;
    
    // Try direct first with increasing timeouts
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`Attempt ${attempt}/${maxRetries}: Connecting to HF Spaces...`);
            
            // Progressive timeout: 3min, 4min, 5min
            const timeoutMs = 180000 + (attempt * 60000); // 3, 4, 5 minutes
            
            if (attempt === 1) {
                showLoadingMessage('🤖 Connecting to AI model...');
            } else {
                showLoadingMessage(`AI model is starting up... Attempt ${attempt}/${maxRetries}<br><small>This can take up to 5 minutes on first use</small>`);
            }
            
            const directResponse = await fetch(directURL, {
                ...options,
                signal: AbortSignal.timeout(timeoutMs)
            });
            
            if (directResponse.ok) {
                console.log(`Direct HF Spaces call successful on attempt ${attempt}!`);
                showLoadingMessage('AI model connected! Generating...');
                return directResponse;
            }
            
            // If not ok but not timeout, don't retry
            if (directResponse.status !== 502 && directResponse.status !== 503) {
                throw new Error(`Server error: ${directResponse.status}`);
            }
            
        } catch (error) {
            console.log(`❌ Attempt ${attempt} failed:`, error.message);
            
            // If it's a timeout and not the last attempt, continue
            if (error.name === 'TimeoutError' && attempt < maxRetries) {
                showLoadingMessage(`⏰ Timeout on attempt ${attempt}. Trying again with longer timeout...<br><small>AI model is loading, please be patient</small>`);
                await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5s between retries
                continue;
            }
            
            // If last attempt or non-timeout error, try proxy fallback
            if (attempt === maxRetries) {
                console.log('All direct attempts failed, trying proxy fallback...');
                showLoadingMessage('Trying alternative connection method...');
                
                try {
                    const proxyResponse = await fetch(proxyURL, {
                        ...options,
                        signal: AbortSignal.timeout(60000) // 1 minute for proxy
                    });
                    
                    if (proxyResponse.ok) {
                        console.log('Proxy fallback successful!');
                        showLoadingMessage('Connected via alternative method!');
                        return proxyResponse;
                    }
                    
                    throw new Error(`Proxy also failed: ${proxyResponse.status}`);
                    
                } catch (proxyError) {
                    console.error('Both direct and proxy failed:', proxyError);
                    
                    // Enhanced error messages
                    if (error.name === 'TimeoutError') {
                        throw new Error('The AI model is taking longer than expected to start up. This can happen when the model has been idle. Please try again in 2-3 minutes, or contact support if the issue persists.');
                    } else if (error.message.includes('Failed to fetch')) {
                        throw new Error('Network connection issue. Please check your internet connection and try again.');
                    } else {
                        throw new Error('Unable to connect to AI model. The service might be temporarily unavailable. Please try again in a few minutes.');
                    }
                }
            }
        }
    }
}

// Enhanced loading messages with better cold start communication
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
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 15px;
            z-index: 9999;
            text-align: center;
            max-width: 450px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.3);
            font-family: 'Comic Neue', cursive;
            backdrop-filter: blur(10px);
        `;
        document.body.appendChild(loadingDiv);
    }
    
    loadingDiv.innerHTML = `
        <div style="margin-bottom: 20px;">
            <div style="width: 60px; height: 60px; border: 4px solid rgba(255,255,255,0.3); border-top: 4px solid #fff; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
        </div>
        <div style="font-weight: bold; font-size: 18px; line-height: 1.4;">${message}</div>
    `;
    
    loadingDiv.style.display = 'block';
    
    // Add CSS animation
    if (!document.querySelector('#loading-animation')) {
        const style = document.createElement('style');
        style.id = 'loading-animation';
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

function hideLoadingMessage() {
    const loadingDiv = document.getElementById('loading-message');
    if (loadingDiv) {
        loadingDiv.style.display = 'none';
    }
}

// Export for global use
window.CONFIG = CONFIG;
window.fetchHFSpaces = fetchHFSpaces;
window.showLoadingMessage = showLoadingMessage;
window.hideLoadingMessage = hideLoadingMessage;