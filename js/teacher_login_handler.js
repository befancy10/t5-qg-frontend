document.addEventListener('DOMContentLoaded', function() {
    const usernameInput = document.getElementById('usernameInput');
    const passwordInputs = document.querySelectorAll('.password-input');
    const loginButton = document.getElementById('loginButton');


    const modal = document.getElementById('messageModal');
    const modalMessage = document.getElementById('modalMessage');
    const modalContent = document.querySelector('#messageModal .modal-content');
    const modalOkayBtn = document.getElementById('modalOkayBtn');
    const toggleBtn = document.getElementById('togglePasswordBtn');

    // Focus on username input on page load
    usernameInput.focus();

    // Event listener for Login button
    loginButton.addEventListener('click', handleTeacherLogin);

    // Event listeners for password inputs (auto-tabbing and backspace)
    passwordInputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            if (this.value.length === this.maxLength && index < passwordInputs.length - 1) {
                passwordInputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', function(event) {
            if (event.key === 'Backspace' && this.value.length === 0 && index > 0) {
                passwordInputs[index - 1].focus();
            }
            if (event.key === 'Enter' && index === passwordInputs.length - 1) {
                handleTeacherLogin();
            }
        });
    });

    // Event listener for username input (Enter key to focus first password box)
    usernameInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            passwordInputs[0].focus();
        }
    });

    let passwordsVisible = false;

    toggleBtn.addEventListener('click', (event) => {
        event.preventDefault(); // <-- Hindari trigger submit/login
        passwordsVisible = !passwordsVisible;
        passwordInputs.forEach(input => {
            input.type = passwordsVisible ? 'text' : 'password';
        });
        toggleBtn.textContent = passwordsVisible ?  'Hide' : 'Show';
    });

    // Event listener for modal's OK button
    modalOkayBtn.addEventListener('click', hideModal);

    // Close modal if clicked outside
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            hideModal();
        }
    });

    let isLoginSuccess = false;
    let redirectTimeoutId = null;

    function handleTeacherLogin() {
        const username = usernameInput.value;
        const password = Array.from(passwordInputs).map(input => input.value).join('');

        const dummyUsername = "teacher";
        const dummyPassword = "pass"; // Password dummy adalah "pass"

        if (username === dummyUsername && password === dummyPassword) {
            isLoginSuccess = true;
            showModal("Login successful!", true);
            
            // Set timeout to redirect after 2 seconds
            redirectTimeoutId = setTimeout(() => {
                window.location.href = 'user_input.html';
            }, 2000);
        } else {
            isLoginSuccess = false;
            showModal("Invalid username or password.<br>Please try again.", false);
        }
    }


    function showModal(message, isSuccess) {
        modalMessage.innerHTML = message;
        if (isSuccess) {
            modalContent.style.borderColor = '#00ff7f'; // Green border for success
            modalMessage.style.color = '#00ff7f';
        } else {
            modalContent.style.borderColor = '#ff0000'; // Red border for error
            modalMessage.style.color = '#ff0000';
        }
        modal.style.display = 'flex'; // Use flex to center the modal
    }

    function hideModal() {
        modal.style.display = 'none';
        if (isLoginSuccess) {
            clearTimeout(redirectTimeoutId); // Cancel the auto redirect if OK was clicked early
            window.location.href = 'user_input.html';
        }
    }   

    document.getElementById('backButton').addEventListener('click', function () {
        window.location.href = "/select_role.html";
    });


});