// Untuk halaman get_mcq.html (Student mengerjakan MCQ)

let startTime = Date.now();

// Fetch soal MCQ berdasarkan Key
window.addEventListener('DOMContentLoaded', async () => {
    const key = sessionStorage.getItem('key');
    const name = sessionStorage.getItem('name');

    if (!key || !name) {
        alert('Invalid session. Please input key again.');
        window.location.href = 'user_key_input.html';
        return;
    }

    try {
        const alreadyExists = await checkMCQNameExists(name, key);
        console.log('Name exists?', alreadyExists);

        if (!alreadyExists) {
            await saveMCQName(name, key); 
        } else {
            console.log('Name already exists, not inserting.');
        }
    } catch (err) {
        console.error('Validation failed:', err);
    }

    // Cek apakah data sudah ada
    if (
        sessionStorage.getItem('mcqQuestions') &&
        sessionStorage.getItem('mcqOptions') &&
        sessionStorage.getItem('mcqCorrectAnswers') &&
        sessionStorage.getItem('mcqPassage')
    ) {
        loadMCQData();
    } else {
        // Ambil dari server
        fetch(CONFIG.getRailwayURL(`/check-mcq/${key}`))
        .then(res => res.json())
        .then(data => {
            if (!data.found) {
            alert('Invalid MCQ key.');
            window.location.href = 'user_key_input.html';
            return;
            }

            sessionStorage.setItem('mcqQuestions', data.questions);
            sessionStorage.setItem('mcqOptions', data.options);
            sessionStorage.setItem('mcqCorrectAnswers', data.correct_answers);
            sessionStorage.setItem('mcqPassage', data.passage);

            loadMCQData(); // tampilkan
        })
        .catch(err => {
            console.error('Error fetching MCQ:', err);
            alert('Failed to load MCQ.');
        });
    }
});

async function checkMCQNameExists(name, key) {
    try {
        const res = await fetch(CONFIG.getRailwayURL(`/check-mcq-name/${name}/${key}`));
        const data = await res.json();
        return data.found === true;
    } catch (err) {
        console.error('Error checking MCQ name existence:', err);
        return false; // asumsikan belum ada kalau gagal
    }
}

// Fungsi menyimpan nama ke leaderboard MCQ
function saveMCQName(name, key) {
    fetch(CONFIG.getRailwayURL('/save-mcq-name'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, key })
    })
    .then(res => res.json())
    .then(data => {
        console.log('MCQ name saved:', data);
    })
    .catch(err => {
        console.error('Error saving MCQ name:', err);
    });
}

// Render soal MCQ
function loadMCQData(data) {
    let questions = sessionStorage.getItem('mcqQuestions');
    let options = sessionStorage.getItem('mcqOptions');
    const passage = sessionStorage.getItem('mcqPassage');
    const studentName = sessionStorage.getItem('name');
    const key = sessionStorage.getItem('key');

    try {
        questions = JSON.parse(questions);
        options = JSON.parse(options);
    } catch (e) {
        console.error('Error parsing MCQ questions/options:', e);
        alert('Data error. Please contact admin.');
        return;
    }

    if (!Array.isArray(questions)) questions = Object.values(questions);
    if (!Array.isArray(options)) options = Object.values(options);

    document.getElementById('nameStudent').innerHTML = `<strong>Student Name:</strong> ${studentName}`;
    document.getElementById('keyGenerated').innerHTML = `<strong>Generated Key:</strong> ${key}`;
    document.getElementById('passageResult').innerHTML = `<strong>Passage:</strong><br><br>${passage}`;

    const mcqQuestionsDiv = document.getElementById('mcqQuestions');
    mcqQuestionsDiv.innerHTML = '';

    questions.forEach((q, index) => {
        const container = document.createElement('div');
        container.classList.add('mcq-question');

        let html = `<p><strong>Q${index + 1}:</strong> ${q}</p>`;

        const opts = Array.isArray(options[index]) ? options[index] : Object.values(options[index]);
        opts.forEach((opt) => {
            html += `
                <label>
                    <input type="radio" name="q${index}" value="${opt}">${opt}
                </label><br>
            `;
        });

        container.innerHTML = html;
        mcqQuestionsDiv.appendChild(container);
    });
}

// Submit MCQ Jawaban Student
// Submit MCQ Jawaban Student
async function submitMCQAnswers() {
    const key = sessionStorage.getItem('key');
    const name = sessionStorage.getItem('name');
    const correctAnswersRaw = sessionStorage.getItem('mcqCorrectAnswers');

    if (!key || !name || !correctAnswersRaw) {
        alert('Session data missing. Please re-enter.');
        return;
    }

    let correctAnswers;
    try {
        correctAnswers = JSON.parse(correctAnswersRaw);
    } catch (e) {
        console.error('Failed to parse correct answers:', e);
        alert('Internal error reading correct answers.');
        return;
    }
    
    const totalQuestions = correctAnswers.length;

    // Cek jika ada soal belum dijawab
    let allAnswered = true;
    for (let i = 0; i < totalQuestions; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (!selected) {
            allAnswered = false;
            break;
        }
    }

    if (!allAnswered) {
        showUnansweredModal();
        return;
    }

    let score = 0;

    correctAnswers.forEach((correct, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected && selected.value === correct) {
            score++;
        }
    });

    const finalScore = Math.round((score / totalQuestions) * 100);

    const endTime = Date.now();
    const timeTakenSeconds = ((endTime - startTime) / 1000).toFixed(2);

    const saveResult = {
        name: name,
        score: finalScore,
        time: timeTakenSeconds,
        key: key
    };

    try {
        const res = await fetch(CONFIG.getRailwayURL('/update-mcq-result'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(saveResult)
        });

        if (res.ok) {
            showIsFinishedModal(key, finalScore, totalQuestions);
        } else {
            throw new Error('Failed to save result');
        }
    } catch (error) {
        console.error('Error saving MCQ result:', error);
        alert('Failed to submit your quiz.');
    }
}

function showUnansweredModal() {
    const modal = document.getElementById("mcqUnansweredModal");
    modal.style.display = "flex"; // Show modal

    const okayBtn = document.getElementById("mcqUnansweredOkayBtn");
    okayBtn.onclick = () => {
        modal.style.display = "none"; // Hide modal on click
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none"; // Hide modal when clicking outside
        }
    };
}

function showIsFinishedModal(key, finalScore, totalQuestions) {
    const modal = document.getElementById("mcqIsFinishedModal");
    const modalContent = modal.querySelector('.modal-content');
    
    // Optionally update modal content to show score
    const modalBody = modalContent.querySelector('.modal-body');
    if (modalBody) {
        modalBody.innerHTML = `Quiz submitted!`;
    }

    modal.style.display = "flex"; // Show modal

    const leaderboardBtn = document.getElementById('viewLeaderboard');
    const okayBtn = document.getElementById('mcqIsFinishedModalOkayButton');

    okayBtn.onclick = () => {
        modal.style.display = "none"; // Hide modal on click
    };

    leaderboardBtn.onclick = () => {
        sessionStorage.setItem("leaderboardKey", key);
        window.location.href = 'leaderboard.html';
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none"; // Hide modal when clicking outside
        }
    };
}

