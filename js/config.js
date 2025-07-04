// Update config.js to include direct HF Spaces fallback
const CONFIG = {
    RAILWAY_API: 'https://t5-qg-db-server-production.up.railway.app',
    
    // HF Spaces URLs - both proxy and direct
    HF_SPACES_PROXY: '', // Empty for proxy
    HF_SPACES_DIRECT: 'https://befancy10-t5-qg-grade34.hf.space',
    
    // API Endpoints
    ENDPOINTS: {
        // Railway Backend (direct calls)
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
        
        // HF Spaces Model (proxy first, direct fallback)
        GENERATE_QUESTIONS: '/api/generate',
        GENERATE_DISTRACTORS: '/api/generate-distractors'
    },
    
    // Helper functions
    getRailwayURL: (endpoint) => `${CONFIG.RAILWAY_API}${endpoint}`,
    
    // HF Spaces with fallback
    getHFSpacesURL: (endpoint, useDirect = false) => {
        if (useDirect) {
            return `${CONFIG.HF_SPACES_DIRECT}${endpoint.replace('/api', '')}`;
        }
        return endpoint; // Use proxy
    }
};

// Smart fetch with fallback
async function fetchHFSpaces(endpoint, options, useDirectFallback = true) {
    try {
        // Try proxy first
        console.log('Trying Vercel proxy...');
        const response = await fetch(CONFIG.getHFSpacesURL(endpoint), options);
        
        if (response.ok) {
            return response;
        }
        
        // If proxy fails and direct fallback enabled
        if (useDirectFallback && (response.status === 502 || response.status === 503)) {
            console.log('Proxy failed, trying direct HF Spaces...');
            const directResponse = await fetch(CONFIG.getHFSpacesURL(endpoint, true), options);
            return directResponse;
        }
        
        return response;
        
    } catch (error) {
        // Network error with proxy, try direct
        if (useDirectFallback) {
            console.log('Network error with proxy, trying direct HF Spaces...');
            try {
                const directResponse = await fetch(CONFIG.getHFSpacesURL(endpoint, true), options);
                return directResponse;
            } catch (directError) {
                console.error('Both proxy and direct failed:', directError);
                throw directError;
            }
        }
        throw error;
    }
}

// Export for use in other files
window.CONFIG = CONFIG;
window.fetchHFSpaces = fetchHFSpaces;