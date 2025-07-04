// Leaderboard Script for both Crossword and MCQ
// Auto-focus and paste handling
const inputs = document.querySelectorAll('.key-input, .key-input-first');
let isPasting = false;

// Handle paste into any input
inputs.forEach((input, index) => {
    input.addEventListener('paste', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(`Paste event triggered on input ${index}`);
        isPasting = true;
        const pastedText = (e.clipboardData || window.clipboardData).getData('text').trim();
        console.log('Pasted text:', pastedText);
        if (pastedText.length === 9 && /^[cm][A-Za-z0-9]{8}$/.test(pastedText)) {
            inputs.forEach(inp => inp.value = '');
            const chars = pastedText.split('');
            inputs.forEach((inp, idx) => {
                inp.value = idx === 0 ? chars[idx].toLowerCase() : chars[idx].toUpperCase();
            });
            console.log('Populated inputs:', Array.from(inputs).map(inp => inp.value));
            inputs[inputs.length - 1].focus();
        } else {
            alert('Pasted key must be exactly 9 characters, starting with lowercase "c" or "m", followed by 8 alphanumeric characters.');
            inputs.forEach(inp => inp.value = '');
        }
        setTimeout(() => { isPasting = false; }, 0);
    });
});

// Auto-focus to next input and validate manual input
inputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        if (isPasting) return;
        console.log(`Input event on input ${index}, value: ${input.value}`);
        if (input.value.length > 1) {
            input.value = input.value.slice(-1);
        }
        const isValid = index === 0 ? input.value.match(/[cm]/) : input.value.match(/[A-Za-z0-9]/);
        if (isValid) {
            if (index === 0) {
                input.value = input.value.toLowerCase();
            } else {
                input.value = input.value.toUpperCase();
            }
            if (index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        } else {
            input.value = '';
        }
    });
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && input.value.length === 0 && index > 0) {
            inputs[index - 1].focus();
        }
    });
});

// Load key from session storage
window.onload = function () {
    const key = sessionStorage.getItem("leaderboardKey");
    if (key) {
        const inputs = document.querySelectorAll('.key-input, .key-input-first');
        if (inputs.length === 9 && /^[cm][A-Za-z0-9]{8}$/.test(key)) {
            const chars = key.split('');
            inputs.forEach((input, index) => {
                input.value = index === 0 ? chars[index].toLowerCase() : chars[index].toUpperCase();
            });
            console.log('Populated inputs from session storage:', Array.from(inputs).map(inp => inp.value));
        } else {
            console.log('Invalid or missing inputs for session storage key:', key);
        }
        sessionStorage.removeItem("leaderboardKey");
    }
};

// Create animated stars
function createStars() {
    const starsContainer = document.getElementById('starsContainer');
    const numberOfStars = 150;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random size
        const sizeRandom = Math.random();
        if (sizeRandom < 0.6) {
            star.classList.add('small');
        } else if (sizeRandom < 0.9) {
            star.classList.add('medium');
        } else {
            star.classList.add('large');
        }
        
        // Random position
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Random animation delay
        star.style.animationDelay = Math.random() * 3 + 's';
        
        starsContainer.appendChild(star);
    }
}

// Create floating particles
function createFloatingParticles() {
    const starsContainer = document.getElementById('starsContainer');
    
    function addParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle floating';
        
        // Random size (1-3px)
        const size = Math.random() * 2 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random horizontal position
        particle.style.left = Math.random() * 100 + '%';
        
        // Random animation duration
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        starsContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 25000);
    }
    
    // Add particles periodically
    setInterval(addParticle, 800);
}

// Unified function to determine leaderboard type and sort data
function sortLeaderboardData(data, isMCQ) {
    if (isMCQ) {
        // MCQ sorting: score desc, then time asc
        data.leaderboard.sort((a, b) =>
            a.score !== b.score ? b.score - a.score : a.time_taken - b.time_taken
        );
    } else {
        // Crossword sorting: completed first, then by time, then alphabetical
        data.leaderboard.sort((a, b) => {
            if (a.is_done !== b.is_done) {
                return b.is_done - a.is_done;
            } else if (a.is_done && b.is_done) {
                return a.time_taken - b.time_taken;
            } else {
                return a.name.localeCompare(b.name);
            }
        });
    }
    return data;
}

// Create card for top 3 positions
function createCard(rank, entry, isMCQ, imgSrc) {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.animationDelay = `${(rank - 1) * 0.3}s`;
    
    const image = document.createElement('div');
    image.className = 'card-image';
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = `Rank ${rank} Medal`;
    img.onerror = () => { img.src = `https://via.placeholder.com/280x250.png?text=Rank+${rank}+Image+Not+Found`; };
    image.appendChild(img);
    
    const overlay = document.createElement('div');
    overlay.className = 'card-overlay';
    
    const name = document.createElement('div');
    name.className = 'card-name';
    name.innerHTML = `${entry.name}`;
    
    const content = document.createElement('div');
    content.className = 'card-content';
    const timeTaken = entry.time_taken.toFixed(3);
    const status = entry.is_done ? 'Selesai' : 'Belum Selesai';
    content.innerHTML = `
        <div class="card-description">${isMCQ ? `Score: ${entry.score}, ` : ''}Time: ${timeTaken}s, Status: ${status}</div>
    `;
    
    overlay.appendChild(name);
    overlay.appendChild(content);
    card.appendChild(image);
    card.appendChild(overlay);
    return card;
}

// Main function to fetch and display leaderboard
function fetchLeaderboard() {
    const button = document.querySelector('button');
    
    // Add shimmer effect
    button.classList.add('shimmer');
    setTimeout(() => {
        button.classList.remove('shimmer');
    }, 600);

    // Retrieve key from 9 input fields
    const inputKey = Array.from(document.querySelectorAll('.key-input, .key-input-first')).map(input => input.value.trim()).join('');
    console.log('Collected key:', inputKey);

    if (!inputKey || inputKey.length !== 9) {
        alert('Please enter a 9-character key.');
        return;
    }

    const validKeyFormat = /^[cm][A-Za-z0-9]{8}$/;
    if (!validKeyFormat.test(inputKey)) {
        alert('Invalid key format. Key must start with lowercase "c" or "m" followed by 8 alphanumeric characters.');
        return;
    }

    // Show overlay and spinner
    document.body.classList.add('overlay-active');
    document.getElementById('leaderboardOverlay').style.display = 'block';
    document.getElementById('overlaySpinner').style.display = 'block';

    // Initialize space background
    createStars();
    createFloatingParticles();

    // Determine type based on first character
    const isMCQ = inputKey.charAt(0) === 'm';
    const leaderboardEndpoint = isMCQ ? `/leaderboard-mcq/${inputKey}` : `/leaderboard/${inputKey}`;
    const modalTitle = isMCQ ? `MCQ Leaderboard` : `Crossword Leaderboard`;

    // Update overlay header
    document.getElementById('overlayTitle').textContent = modalTitle;
    document.getElementById('overlayKey').textContent = `Key: ${inputKey}`;

    fetch(CONFIG.getRailwayURL(leaderboardEndpoint))
        .then(response => {
            console.log('Response status:', response.status);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('overlaySpinner').style.display = 'none';
            const leaderboardDiv = document.getElementById('overlayLeaderboard');
            leaderboardDiv.innerHTML = '';

            if (!data.found) {
                leaderboardDiv.innerHTML = '<div class="no-data-message">No data found for the entered key.</div>';
                return;
            }

            // Sort leaderboard data based on type
            const sortedData = sortLeaderboardData(data, isMCQ);

            // Create card zone for all ranks
            const cardZone = document.createElement('div');
            cardZone.className = 'card-zone';
            
            // Top 1 card
            if (sortedData.leaderboard.length >= 1) {
                const top1 = sortedData.leaderboard[0];
                const card1 = createCard(1, top1, isMCQ, 'pap/juara1.png');
                cardZone.appendChild(card1);
            }

            // Container for 2nd and 3rd
            const secondaryZone = document.createElement('div');
            secondaryZone.className = 'secondary-card-zone';
            
            if (sortedData.leaderboard.length >= 2) {
                const top2 = sortedData.leaderboard[1];
                const card2 = createCard(2, top2, isMCQ, 'pap/juara-2 (2).png');
                secondaryZone.appendChild(card2);
            }
            
            if (sortedData.leaderboard.length >= 3) {
                const top3 = sortedData.leaderboard[2];
                const card3 = createCard(3, top3, isMCQ, 'pap/juara-3.png');
                secondaryZone.appendChild(card3);
            }
            
            cardZone.appendChild(secondaryZone);

            // Table for 4th and beyond
            if (sortedData.leaderboard.length > 3) {
                const table = document.createElement('table');
                table.className = 'leaderboard-table';
                const thead = document.createElement('thead');
                const tbody = document.createElement('tbody');

                const headerRow = document.createElement('tr');
                headerRow.innerHTML = `
                    <th>Rank</th>
                    <th>Name</th>
                    ${isMCQ ? '<th>Score</th>' : ''}
                    <th>Time</th>
                    <th>Status</th>
                `;
                thead.appendChild(headerRow);
                table.appendChild(thead);

                sortedData.leaderboard.slice(3).forEach((entry, index) => {
                    const rank = index + 4;
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${rank}</td>
                        <td>${entry.name}</td>
                        ${isMCQ ? `<td>${entry.score}</td>` : ''}
                        <td>${entry.time_taken.toFixed(3)}s</td>
                        <td>${entry.is_done ? 'Selesai' : 'Belum Selesai'}</td>
                    `;
                    tbody.appendChild(row);
                });
                table.appendChild(tbody);
                cardZone.appendChild(table);
            }
            
            leaderboardDiv.appendChild(cardZone);
        })
        .catch(error => {
            console.error('Error fetching leaderboard data:', error);
            document.getElementById('overlaySpinner').style.display = 'none';
            const leaderboardDiv = document.getElementById('overlayLeaderboard');
            leaderboardDiv.innerHTML = '<div class="no-data-message">Error fetching leaderboard data. Please try again.</div>';
        });
}

// Close leaderboard overlay
function closeLeaderboard() {
    const overlay = document.getElementById('leaderboardOverlay');
    overlay.classList.add('slide-out');
    
    setTimeout(() => {
        overlay.style.display = 'none';
        overlay.classList.remove('slide-out');
        document.body.classList.remove('overlay-active');
        
        // Clear stars container
        const starsContainer = document.getElementById('starsContainer');
        starsContainer.innerHTML = '';
    }, 500);
}

// Handle back button with escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('leaderboardOverlay').style.display === 'block') {
        closeLeaderboard();
    }
});