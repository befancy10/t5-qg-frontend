// config.js - Updated for Vercel proxy approach
const CONFIG = {
    // API Endpoints
    RAILWAY_API: 'https://t5-qg-db-server-production.up.railway.app',
    
    // HF Spaces via Vercel proxy (better for CORS and security)
    HF_SPACES_API: '', // Empty - use relative paths for proxy
    
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
        
        // HF Spaces Model (via Vercel proxy)
        GENERATE_QUESTIONS: '/api/generate',
        GENERATE_DISTRACTORS: '/api/generate-distractors'
    },
    
    // Helper functions
    getRailwayURL: (endpoint) => `${CONFIG.RAILWAY_API}${endpoint}`,
    
    // For HF Spaces, use relative URLs (Vercel proxy)
    getHFSpacesURL: (endpoint) => endpoint // Just return the endpoint for proxy
};

// Export for use in other files
window.CONFIG = CONFIG;