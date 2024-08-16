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

