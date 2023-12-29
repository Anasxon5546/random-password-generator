const statusDisplay = document.querySelector('.status');
const passwordDisplay = document.querySelector('.password');
const lengthInput = document.querySelector('.length');

lengthInput.value = 8;

let passwordLength = lengthInput.value;
let includeLowercase = true;
let includeUppercase = true;
let includeNumbers = true;
let includeSymbols = true;

function generatePassword(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols) {
  const lowercaseChars = "abcdefghlmnopqurstwxyz";
  const uppercaseChars = lowercaseChars.toLocaleUpperCase();
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_-+={}[]|\\:;\"'<>,.?/";

  let allowedChars = "";
  let password = "";

  allowedChars += includeLowercase ? lowercaseChars : "";
  allowedChars += includeUppercase ? uppercaseChars : "";
  allowedChars += includeNumbers ? numberChars : "";
  allowedChars += includeSymbols ? symbolChars : "";

  if (length <= 0) {
    return 'password length must be at least 1';
  } else if (allowedChars.length === 0) {
    return 'Atleast 1 set of characters needs be selected';
  }

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    password += allowedChars[randomIndex];
  }

  return password;
}

function updatePassword() {
  passwordLength = parseInt(lengthInput.value);
  includeLowercase = document.getElementById('lowercase').checked;
  includeUppercase = document.getElementById('uppercase').checked;
  includeNumbers = document.getElementById('numbers').checked;
  includeSymbols = document.getElementById('special').checked;

  const newPassword = generatePassword(passwordLength, includeLowercase, includeUppercase, includeNumbers, includeSymbols);

  if (newPassword !== 'password length must be at least 1' && newPassword !== 'Atleast 1 set of characters needs be selected') {
    statusDisplay.textContent = `length: ${passwordLength}`;
  }
  passwordDisplay.textContent = newPassword;
}

document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevents the default form submission behavior
  updatePassword();
});

document.querySelector('svg').addEventListener('click', () => {
  const textToCopy = passwordDisplay.textContent;

  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      alert('Password copied to clipboard!');
    })
    .catch(err => {
      alert('Failed to copy password. Please try again.');
    });
});

updatePassword();