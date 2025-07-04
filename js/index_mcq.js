// REPLACE the main event listener in index_mcq.js with this enhanced version
document.getElementById('gen_mcq').addEventListener('click', async function () {
    const mcqDiv = document.getElementById('mcqDiv');
    mcqDiv.innerHTML = ''; // clear existing content
  
    const questions = JSON.parse(localStorage.getItem('question_answer'));
    const answers = JSON.parse(localStorage.getItem('answers'));
    const passage = localStorage.getItem('passage'); // Get passage for context
  
    if (!questions || !answers) {
      alert('No questions or answers available.');
      return;
    }

    // Get passage for enhanced distractor generation
    if (!passage) {
      alert('No passage available for context-aware distractor generation.');
      return;
    }

    // Ambil index dari checkbox yang dicentang
    const checkboxes = document.querySelectorAll('.mcq-checkbox');
    const selectedIndexes = [];

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        selectedIndexes.push(parseInt(checkbox.dataset.index));
      }
    });
  
    if (selectedIndexes.length === 0) {
      showNoQuestionModal();
      return;
    }    
  
    const mcqList = [];

    // Use enhanced loading message if available, otherwise fallback to existing
    if (typeof showLoadingMessage === 'function') {
        showLoadingMessage('🧠 Generating enhanced multiple choice questions...');
    } else {
        // Fallback to existing loading indicator
        const loadingDiv = document.createElement('div');
        loadingDiv.classList.add('loading-indicator');
        loadingDiv.innerHTML = `
          <div class="loading-spinner"></div>
          <p>Generating enhanced distractors using AI...</p>
          <p class="loading-detail">This may take a moment for better quality questions.</p>
        `;
        mcqDiv.appendChild(loadingDiv);

        // Add CSS for loading indicator if not already present
        if (!document.querySelector('#loading-styles')) {
          const style = document.createElement('style');
          style.id = 'loading-styles';
          style.textContent = `
            .loading-indicator {
              text-align: center;
              padding: 20px;
              background: rgba(255, 255, 255, 0.1);
              border-radius: 10px;
              margin: 10px 0;
            }
            .loading-spinner {
              border: 3px solid rgba(255, 255, 255, 0.3);
              border-top: 3px solid #ff69b4;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              animation: spin 1s linear infinite;
              margin: 0 auto 10px;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .loading-detail {
              font-size: 0.9em;
              color: rgba(255, 255, 255, 0.7);
              margin-top: 5px;
            }
          `;
          document.head.appendChild(style);
        }
    }
  
    try {
        const totalQuestions = selectedIndexes.length;
        
        // Process each selected question
        for (let displayIndex = 0; displayIndex < selectedIndexes.length; displayIndex++) {
            const i = selectedIndexes[displayIndex];
            const question = questions[i];
            const correctAnswer = answers[i];
          
            console.log(`Processing Q${displayIndex + 1}/${totalQuestions}: "${question}" with answer: "${correctAnswer}"`);
            
            // Enhanced progress message
            const progressMessage = `Generating multiple choice options for question ${displayIndex + 1} of ${totalQuestions}...`;
            
            if (typeof showLoadingMessage === 'function') {
                showLoadingMessage(`🧠 ${progressMessage}`);
            } else {
                // Update existing loading indicator
                const loadingDiv = document.querySelector('.loading-indicator');
                if (loadingDiv) {
                    loadingDiv.innerHTML = `
                      <div class="loading-spinner"></div>
                      <p>${progressMessage}</p>
                      <p class="loading-detail">Using enhanced AI to create realistic options...</p>
                    `;
                }
            }
            
            try {
                // ✅ Generate enhanced distractors using optimized function
                const distractors = await generateEnhancedDistractors(passage, correctAnswer);
                console.log(`✅ Enhanced distractors for "${correctAnswer}":`, distractors);

                // Create options array and shuffle
                const options = [correctAnswer, ...distractors];
                shuffleArray(options);
              
                mcqList.push({
                  question: question,
                  options: options,
                  correctAnswer: correctAnswer
                });
                
                console.log(`✅ Q${displayIndex + 1} completed successfully`);
                
            } catch (questionError) {
                console.error(`❌ Error with question ${displayIndex + 1}:`, questionError);
                
                // Still add the question with intelligent fallback options
                const fallbackOptions = [correctAnswer, ...generateIntelligentFallbacks(correctAnswer)];
                shuffleArray(fallbackOptions);
                
                mcqList.push({
                  question: question,
                  options: fallbackOptions,
                  correctAnswer: correctAnswer
                });
                
                console.log(`⚠️ Q${displayIndex + 1} completed with fallback options`);
            }
        }

        // Hide loading message
        if (typeof hideLoadingMessage === 'function') {
            hideLoadingMessage();
        } else {
            // Remove existing loading indicator
            const loadingDiv = document.querySelector('.loading-indicator');
            if (loadingDiv && loadingDiv.parentNode) {
                loadingDiv.parentNode.removeChild(loadingDiv);
            }
        }

        // Display generated MCQs
        mcqList.forEach((mcqItem, displayIndex) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('mcq-question');
            questionDiv.innerHTML = `
              <p><strong>Q${displayIndex + 1}:</strong> ${mcqItem.question}</p>
              <ul>
                ${mcqItem.options.map((opt, idx) => {
                  const isCorrect = opt === mcqItem.correctAnswer;
                  return `<li class="${isCorrect ? 'correct' : ''}">(${String.fromCharCode(65 + idx)}) ${opt}</li>`;
                }).join('')}          
              </ul>
            `;
          
            mcqDiv.appendChild(questionDiv);
        });

        // Save mcqList ke localStorage untuk export
        localStorage.setItem('mcqList', JSON.stringify(mcqList));

        document.getElementById("result").style.display = "none";
        document.getElementById("gen_mcq").style.display = "none";
        document.getElementById('export_mcq').style.display = 'inline-block';

        console.log(`🎉 MCQ generation completed successfully! Generated ${mcqList.length} questions.`);

    } catch (error) {
        console.error('Error during MCQ generation:', error);
        
        // Hide loading message
        if (typeof hideLoadingMessage === 'function') {
            hideLoadingMessage();
        } else {
            // Remove existing loading indicator
            const loadingDiv = document.querySelector('.loading-indicator');
            if (loadingDiv && loadingDiv.parentNode) {
                loadingDiv.parentNode.removeChild(loadingDiv);
            }
        }
        
        // Enhanced error display
        if (typeof showErrorDialog === 'function') {
            let errorMessage = 'There was an issue generating multiple choice questions. ';
            
            if (error.message.includes('timed out') || error.message.includes('starting up')) {
                errorMessage += 'The AI model is starting up. Please wait a moment and try again.';
            } else if (error.message.includes('Network connection')) {
                errorMessage += 'Please check your internet connection and try again.';
            } else {
                errorMessage += 'Please try again or contact support if the problem persists.';
            }
            
            showErrorDialog(errorMessage);
        } else {
            // Fallback to existing error display
            const errorDiv = document.createElement('div');
            errorDiv.classList.add('error-message');
            errorDiv.innerHTML = `
              <h3>Error Generating MCQ</h3>
              <p>There was an issue generating enhanced distractors. Please try again.</p>
              <p class="error-detail">Error: ${error.message}</p>
              <button onclick="location.reload()">Try Again</button>
            `;
            mcqDiv.appendChild(errorDiv);

            // Add error styles if not present
            if (!document.querySelector('#error-styles')) {
                const style = document.createElement('style');
                style.id = 'error-styles';
                style.textContent = `
                  .error-message {
                    background: rgba(255, 0, 0, 0.1);
                    border: 2px solid rgba(255, 0, 0, 0.3);
                    border-radius: 10px;
                    padding: 20px;
                    text-align: center;
                    color: white;
                  }
                  .error-detail {
                    font-size: 0.8em;
                    color: rgba(255, 255, 255, 0.7);
                    margin-top: 10px;
                  }
                  .error-message button {
                    background: #ff69b4;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-top: 10px;
                  }
                `;
                document.head.appendChild(style);
            }
        }
    }
});
  
  
//   try {
//       // Process each selected question
//       for (let displayIndex = 0; displayIndex < selectedIndexes.length; displayIndex++) {
//         const i = selectedIndexes[displayIndex];
//         const question = questions[i];
//         const correctAnswer = answers[i];
      
//         console.log(`Processing Q${displayIndex + 1}: "${question}" with answer: "${correctAnswer}"`);
        
//         // Update loading message
//         loadingDiv.innerHTML = `
//           <div class="loading-spinner"></div>
//           <p>Generating distractors for question ${displayIndex + 1} of ${selectedIndexes.length}...</p>
//           <p class="loading-detail">Using enhanced BERT + Word2Vec + Category matching...</p>
//         `;
        
//         // ✅ Generate enhanced distractors using context
//         const distractors = await generateEnhancedDistractors(passage, correctAnswer);
//         console.log(`Enhanced distractors for "${correctAnswer}":`, distractors);

//         // Create options array and shuffle
//         const options = [correctAnswer, ...distractors];
//         shuffleArray(options);
      
//         mcqList.push({
//           question: question,
//           options: options,
//           correctAnswer: correctAnswer
//         });
//       }

//       // Remove loading indicator
//       mcqDiv.removeChild(loadingDiv);

//       // Display generated MCQs
//       mcqList.forEach((mcqItem, displayIndex) => {
//         const questionDiv = document.createElement('div');
//         questionDiv.classList.add('mcq-question');
//         questionDiv.innerHTML = `
//           <p><strong>Q${displayIndex + 1}:</strong> ${mcqItem.question}</p>
//           <ul>
//             ${mcqItem.options.map((opt, idx) => {
//               const isCorrect = opt === mcqItem.correctAnswer;
//               return `<li class="${isCorrect ? 'correct' : ''}">(${String.fromCharCode(65 + idx)}) ${opt}</li>`;
//             }).join('')}          
//           </ul>
//         `;
      
//         mcqDiv.appendChild(questionDiv);
//       });

//       // Save mcqList ke localStorage untuk export
//       localStorage.setItem('mcqList', JSON.stringify(mcqList));

//       document.getElementById("result").style.display = "none";
//       document.getElementById("gen_mcq").style.display = "none";
//       document.getElementById('export_mcq').style.display = 'inline-block';

//       console.log('MCQ generation completed successfully!');

//     } catch (error) {
//       console.error('Error during MCQ generation:', error);
      
//       // Remove loading indicator and show error
//       if (loadingDiv.parentNode) {
//         mcqDiv.removeChild(loadingDiv);
//       }
      
//       const errorDiv = document.createElement('div');
//       errorDiv.classList.add('error-message');
//       errorDiv.innerHTML = `
//         <h3>Error Generating MCQ</h3>
//         <p>There was an issue generating enhanced distractors. Please try again.</p>
//         <p class="error-detail">Error: ${error.message}</p>
//         <button onclick="location.reload()">Try Again</button>
//       `;
//       mcqDiv.appendChild(errorDiv);

//       // Add error styles if not present
//       if (!document.querySelector('#error-styles')) {
//         const style = document.createElement('style');
//         style.id = 'error-styles';
//         style.textContent = `
//           .error-message {
//             background: rgba(255, 0, 0, 0.1);
//             border: 2px solid rgba(255, 0, 0, 0.3);
//             border-radius: 10px;
//             padding: 20px;
//             text-align: center;
//             color: white;
//           }
//           .error-detail {
//             font-size: 0.8em;
//             color: rgba(255, 255, 255, 0.7);
//             margin-top: 10px;
//           }
//           .error-message button {
//             background: #ff69b4;
//             color: white;
//             border: none;
//             padding: 10px 20px;
//             border-radius: 5px;
//             cursor: pointer;
//             margin-top: 10px;
//           }
//         `;
//         document.head.appendChild(style);
//       }
//     }
// });

  function closeNoQuestionModal() {
    document.getElementById("noQuestionModal").style.display = "none";
    // document.getElementById("gen_mcq").style.display = "inline-block";
  }    

  async function generateEnhancedDistractors(context, correctAnswer) {
    try {
        console.log(`Generating distractors for: "${correctAnswer}" with context: "${context.substring(0, 100)}..."`);
        
        // Use optimized HF Spaces fetch (direct first) - requires config.js to be loaded first
        const response = await fetchHFSpaces('/generate-distractors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                context: context,
                answer: correctAnswer 
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        // Validate response
        if (!data.distractors || !Array.isArray(data.distractors)) {
            throw new Error('Invalid response format from distractor API');
        }

        // Ensure we have exactly 3 distractors
        const distractors = data.distractors.slice(0, 3);
        
        // Fill with intelligent fallbacks if needed
        while (distractors.length < 3) {
            distractors.push(generateIntelligentFallback(correctAnswer, distractors.length + 1));
        }

        console.log(`✅ Enhanced distractors received: ${distractors}`);
        return distractors;
        
    } catch (error) {
        console.error('Error calling enhanced distractor API:', error);
        
        // Return intelligent fallbacks instead of generic ones
        console.log('Using intelligent fallback distractors...');
        return generateIntelligentFallbacks(correctAnswer);
    }
}

// REPLACE generateFallbackDistractors with this improved version
function generateIntelligentFallbacks(correctAnswer) {
    const answer = correctAnswer.toLowerCase();
    
    // Generate contextually relevant fallbacks based on answer type
    const fallbacks = [];
    
    // For animals
    const animals = ['cat', 'dog', 'bird', 'fish', 'rabbit', 'mouse', 'elephant', 'lion'];
    // For colors  
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'black'];
    // For numbers
    const numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
    // For common objects
    const objects = ['book', 'table', 'chair', 'ball', 'car', 'house', 'tree', 'flower'];
    // For actions
    const actions = ['run', 'walk', 'jump', 'sit', 'play', 'read', 'write', 'sing'];
    // For places
    const places = ['park', 'school', 'home', 'garden', 'beach', 'forest', 'city', 'village'];
    
    if (animals.some(animal => answer.includes(animal))) {
        fallbacks.push(...animals.filter(a => !answer.includes(a)).slice(0, 3));
    } else if (colors.some(color => answer.includes(color))) {
        fallbacks.push(...colors.filter(c => !answer.includes(c)).slice(0, 3));
    } else if (numbers.some(num => answer.includes(num))) {
        fallbacks.push(...numbers.filter(n => !answer.includes(n)).slice(0, 3));
    } else if (objects.some(obj => answer.includes(obj))) {
        fallbacks.push(...objects.filter(o => !answer.includes(o)).slice(0, 3));
    } else if (actions.some(action => answer.includes(action))) {
        fallbacks.push(...actions.filter(a => !answer.includes(a)).slice(0, 3));
    } else if (places.some(place => answer.includes(place))) {
        fallbacks.push(...places.filter(p => !answer.includes(p)).slice(0, 3));
    } else {
        // Generic but contextually appropriate fallbacks
        fallbacks.push('option A', 'choice B', 'answer C');
    }
    
    // Ensure we have exactly 3 unique fallbacks
    const uniqueFallbacks = [...new Set(fallbacks)].slice(0, 3);
    while (uniqueFallbacks.length < 3) {
        uniqueFallbacks.push(`alternative ${uniqueFallbacks.length + 1}`);
    }
    
    console.log(`Using intelligent fallbacks for "${correctAnswer}":`, uniqueFallbacks);
    return uniqueFallbacks;
}

function generateIntelligentFallback(correctAnswer, index) {
    const fallbacks = generateIntelligentFallbacks(correctAnswer);
    return fallbacks[index - 1] || `fallback ${index}`;
}

function generateFallbackDistractors(correctAnswer) {
    /**
     * Simple fallback distractor generation when API fails
     */
    const fallbacks = [
        `Alternative_${correctAnswer}`,
        `Other_${correctAnswer}`, 
        `Different_${correctAnswer}`
    ];
    
    console.log(`Using fallback distractors: ${fallbacks}`);
    return fallbacks;
}

// KEEP the existing generateFallbackDistractors for backward compatibility
function generateFallbackDistractors(correctAnswer) {
    // Use the new intelligent fallbacks
    return generateIntelligentFallbacks(correctAnswer);
}

// Helper function to save context when questions are first generated
// This should be called when the original questions are generated
function saveOriginalContext(context) {
    localStorage.setItem('original_context', context);
    console.log('Context saved for distractor generation');
}

// Helper function to get context from localStorage
function getOriginalContext() {
    return localStorage.getItem('original_context');
}
  
  // Generate 3 dummy distractors (placeholder)
  function generateDummyDistractors(correctAnswer) {
    const dummyDistractors = [
      correctAnswer + 'XXX',
      correctAnswer + 'YYY',
      correctAnswer + 'ZZZ'
    ];
    return dummyDistractors;
  }
  
  // Shuffle array (Fisher-Yates Shuffle)
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  async function testDistractorGeneration(context, answer) {
    console.log('Testing distractor generation...');
    const distractors = await generateDistractors(context, answer);
    console.log(`Input: "${answer}"`);
    console.log(`Context: "${context.substring(0, 100)}..."`);
    console.log(`Generated distractors:`, distractors);
    return distractors;
  }

  // Function to check data availability before MCQ generation
  function checkMCQRequirements() {
    const questions = JSON.parse(localStorage.getItem('question_answer') || '[]');
    const answers = JSON.parse(localStorage.getItem('answers') || '[]');
    const context = localStorage.getItem('original_context') || localStorage.getItem('passage');
    
    const requirements = {
      hasQuestions: questions.length > 0,
      hasAnswers: answers.length > 0,
      hasContext: !!context,
      dataConsistent: questions.length === answers.length,
      questionsCount: questions.length,
      answersCount: answers.length,
      contextLength: context ? context.length : 0
    };
    
    console.log('MCQ Requirements Check:', requirements);
    return requirements;
  }

  // Function to monitor distractor generation performance
  async function monitorDistractorPerformance(context, answers) {
    console.log('Starting distractor performance monitoring...');
    const results = [];
    
    for (let i = 0; i < Math.min(3, answers.length); i++) {
      const startTime = Date.now();
      try {
        const distractors = await generateDistractors(context, answers[i]);
        const endTime = Date.now();
        
        results.push({
          answer: answers[i],
          distractors: distractors,
          success: true,
          responseTime: endTime - startTime,
          quality: distractors.length >= 3 ? 'Good' : 'Partial'
        });
      } catch (error) {
        const endTime = Date.now();
        results.push({
          answer: answers[i],
          distractors: [],
          success: false,
          responseTime: endTime - startTime,
          error: error.message
        });
      }
    }
    
    console.log('Distractor Performance Results:', results);
    return results;
  }
  