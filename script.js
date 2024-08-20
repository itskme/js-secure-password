const passwordForm = document.getElementById('add-password-form');
const addPasswordButton = document.getElementById('add-password-button');
const viewPasswordsButton = document.getElementById('view-passwords-button');
const passwordsContainer = document.getElementById('passwords-container');
const decryptPasswordInput = document.getElementById('decrypt-password-input');
const decryptPasswordButton = document.getElementById('decrypt-password-button');

const passwordKey = 'mysecretpassword';
const encryptedPasswords = {};


function saveEncryptedPasswordsToFile() {
  const encryptedPasswordsString = JSON.stringify(encryptedPasswords);
  const blob = new Blob([encryptedPasswordsString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'encrypted_passwords.json';
  a.click();
}


function loadEncryptedPasswordsFromFile(file) {
  const reader = new FileReader();
  reader.onload = (event) => {
    const encryptedPasswordsString = event.target.result;
    encryptedPasswords = JSON.parse(encryptedPasswordsString);
  };
  reader.readAsText(file);
}

passwordForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value;
  const encryptedPassword = CryptoJS.AES.encrypt(password, passwordKey).toString();
  encryptedPasswords[name] = encryptedPassword;
  saveEncryptedPasswordsToFile();
  document.getElementById('name').value = '';
  document.getElementById('password').value = '';
});

viewPasswordsButton.addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.addEventListener('change', (event) => {
    const file = event.target.files[0];
    loadEncryptedPasswordsFromFile(file);
    const passwordsHtml = Object.keys(encryptedPasswords).map((name) => {
      return `
        <div class="password">
          <span class="password-name">${name}</span>
        </div>
      `;
    }).join('');
    passwordsContainer.innerHTML = passwordsHtml;
  });
  input.click();
});

decryptPasswordButton.addEventListener('click', () => {
  const passwordName = decryptPasswordInput.value;
  if (encryptedPasswords[passwordName]) {
    const encryptedPassword = encryptedPasswords[passwordName];
    const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, passwordKey).toString(CryptoJS.enc.Utf8);
    alert(`Decrypted password for ${passwordName}: ${decryptedPassword}`);
  } else {
    alert(`No password found for ${passwordName}`);
  }
});