const generatedKeys = new Set();

// function generateRandomKey(length = 8) {
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//   let result = '';
  
//   do {
//     result = '';
//     for (let i = 0; i < length; i++) {
//       result += characters.charAt(Math.floor(Math.random() * characters.length));
//     }
//   } while (generatedKeys.has(result));
  
//   generatedKeys.add(result);
//   return result;
// }

async function generateRandomKeyWithPrefix(prefix, length = 8) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let key;
  let isUnique = false;

  while (!isUnique) {
    let randomPart = '';
    for (let i = 0; i < length; i++) {
      randomPart += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    key = prefix + randomPart;

    const response = await fetch(`/check-key-availability/${key}`);
    const data = await response.json();
    isUnique = data.available;
  }

  return key;
}

function copyKeyToClipboard() {
  const key = document.getElementById('messageModalBody').innerText;
  navigator.clipboard.writeText(key).then(() => {
      // Remove any existing notification or buttons
      const existingNotification = document.querySelector('.copy-notification');
      if (existingNotification) existingNotification.remove();
      const footer = document.querySelector('#messageModal .modal-footer');
      footer.innerHTML = ''; // Clear existing buttons

      // Show Copy Confirmation
      const notification = document.createElement('div');
      notification.classList.add('copy-notification');
      notification.textContent = 'Key copied to clipboard!';
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 2000); // 2s display

      // Add Navigation Options
      const backButton = document.createElement('button');
      backButton.id = 'backToSelectRoleButton';
      backButton.classList.add('btn');
      backButton.textContent = 'Return to Main Menu';
      backButton.addEventListener('click', () => {
          if (confirm('Are you sure you want to return to Select Role?')) {
              window.location.href = 'select_role.html';
          }
      });

      const stayButton = document.createElement('button');
      stayButton.id = 'stayOnDisplayButton';
      stayButton.classList.add('btn');
      stayButton.textContent = 'Generate More Keys';
      stayButton.addEventListener('click', () => {
          // Set a flag to disable animations on reload
          sessionStorage.setItem('noAnimation', 'true');
          window.location.reload(); // Refresh the current page (display_question_answer.html)
      });

      footer.appendChild(backButton);
      footer.appendChild(stayButton);
  }).catch(err => {
      console.error('Failed to copy text: ', err);
  });
}

// On page load, check the flag and apply no-animation class
window.addEventListener('load', () => {
  if (sessionStorage.getItem('noAnimation') === 'true') {
      const body = document.body;
      const container = document.getElementById('container');
      body.classList.add('no-animation');
      // Explicitly apply styles to ensure full viewport coverage
      container.style.opacity = '1';
      container.style.minHeight = '100vh'; // Ensure full height
      container.style.display = 'flex';
      container.style.padding = '0'; // Temporarily remove padding to test
      // Force reflow to ensure layout is updated
      container.getBoundingClientRect(); // Trigger reflow
      window.scrollTo(0, 0); // Ensure top of page is visible
      // Clear the flag after applying to avoid persistent effect
      sessionStorage.removeItem('noAnimation');
  }
});

function displayMessage(message) {
  const modal = document.getElementById('messageModal');
  const modalBody = document.getElementById('messageModalBody');

  modalBody.innerText = message;
  modal.style.display = 'block';

  // Menutup modal saat mengklik di luar modal
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }
}