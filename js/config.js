// Optimized config.js - Direct call as primary method
const CONFIG = {
    RAILWAY_API: 'https://t5-qg-db-server-production.up.railway.app',
    
    // HF Spaces - Direct as primary
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
        
        // HF Spaces Model (direct paths)
        GENERATE_QUESTIONS: '/generate',
        GENERATE_DISTRACTORS: '/generate-distractors'
    },
    
    // Helper functions
    getRailwayURL: (endpoint) => `${CONFIG.RAILWAY_API}${endpoint}`,
    getHFSpacesURL: (endpoint) => `${CONFIG.HF_SPACES_DIRECT}${endpoint}`
};

// Optimized fetch function - Direct first, proxy fallback
async function fetchHFSpaces(endpoint, options) {
    const directURL = CONFIG.getHFSpacesURL(endpoint);
    const proxyURL = `/api${endpoint}`; // Proxy fallback
    
    try {
        // Try direct first (we know this works!)
        console.log('🚀 Connecting directly to HF Spaces...');
        showLoadingMessage('🤖 Connecting to AI model...');
        
        const directResponse = await fetch(directURL, {
            ...options,
            signal: AbortSignal.timeout(120000) // 2 minutes timeout
        });
        
        if (directResponse.ok) {
            console.log('✅ Direct HF Spaces call successful!');
            showLoadingMessage('✅ AI model connected! Generating...');
            return directResponse;
        }
        
        // If direct fails, try proxy as fallback
        console.log('⚠️ Direct call failed, trying proxy fallback...');
        showLoadingMessage('🔄 Trying alternative connection...');
        
        const proxyResponse = await fetch(proxyURL, {
            ...options,
            signal: AbortSignal.timeout(30000) // 30s for proxy
        });
        
        if (proxyResponse.ok) {
            console.log('✅ Proxy fallback successful!');
            showLoadingMessage('✅ Connected via proxy!');
        }
        
        return proxyResponse;
        
    } catch (error) {
        console.error('Both direct and proxy failed:', error);
        
        // Enhanced error messages
        if (error.name === 'AbortError') {
            throw new Error('Request timed out. The AI model might be starting up. Please try again in a moment.');
        } else if (error.message.includes('Failed to fetch')) {
            throw new Error('Network connection issue. Please check your internet connection and try again.');
        } else {
            throw new Error('Unable to connect to AI model. Please try again.');
        }
    }
}

// Enhanced loading messages with better UX
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
            padding: 25px 30px;
            border-radius: 15px;
            z-index: 9999;
            text-align: center;
            max-width: 400px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.3);
            font-family: 'Comic Neue', cursive;
            font-size: 16px;
            line-height: 1.5;
            backdrop-filter: blur(10px);
        `;
        document.body.appendChild(loadingDiv);
    }
    
    loadingDiv.innerHTML = `
        <div style="margin-bottom: 15px;">
            <div style="width: 50px; height: 50px; border: 4px solid rgba(255,255,255,0.3); border-top: 4px solid #fff; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
        </div>
        <div style="font-weight: bold; margin-bottom: 8px;">${message}</div>
        <div style="font-size: 14px; opacity: 0.9;">This may take a moment...</div>
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