const passwordForm = document.getElementById('add-password-form');
const addPasswordButton = document.getElementById('add-password-button');
const viewPasswordsButton = document.getElementById('view-passwords-button');
const passwordsContainer = document.getElementById('passwords-container');

const passwordKey = 'mysecretpassword';
const encryptedPasswords = {};

passwordForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value;
  const encryptedPassword = CryptoJS.AES.encrypt(password, passwordKey).toString();
  encryptedPasswords[name] = encryptedPassword;
  localStorage.setItem('encryptedPasswords', JSON.stringify(encryptedPasswords));
  document.getElementById('name').value = '';
  document.getElementById('password').value = '';
});

viewPasswordsButton.addEventListener('click', () => {
  const storedEncryptedPasswords = localStorage.getItem('encryptedPasswords');
  if (storedEncryptedPasswords) {
    encryptedPasswords = JSON.parse(storedEncryptedPasswords);
    const passwordsHtml = Object.keys(encryptedPasswords).map((name) => {
      const encryptedPassword = encryptedPasswords[name];
      const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, passwordKey).toString(CryptoJS.enc.Utf8);
      return `
        <div class="password">
          <span class="password-name">${name}</span>
          <span class="password-value">${decryptedPassword}</span>
        </div>
      `;
    }).join('');
    passwordsContainer.innerHTML = passwordsHtml;
  } else {
    passwordsContainer.innerHTML = '<p>No passwords stored.</p>';
  }
});

const storedEncryptedPasswords = localStorage.getItem('encryptedPasswords');
if (storedEncryptedPasswords) {
  encryptedPasswords = JSON.parse(storedEncryptedPasswords);
}