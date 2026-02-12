const form = document.getElementById('registrationForm');
let username = document.getElementById('username');
let email = document.getElementById('email');
let password = document.getElementById('password');
let confirmPassword = document.getElementById('confirmPassword');

const setError = (element, message) => {
    const inputGroup = element.parentElement;
    const errorDisplay = inputGroup.querySelector('.error-msg');
    errorDisplay.innerText = message;
    inputGroup.classList.add('error');
    inputGroup.classList.remove('success');
};

const setSuccess = element => {
    const inputGroup = element.parentElement;
    inputGroup.classList.add('success');
    inputGroup.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

// Validation Logic
const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value;
    const confirmValue = confirmPassword.value;

    let isValid = true;

    if (usernameValue === '' || usernameValue.length < 3) {
        setError(username, 'Username must be at least 3 characters');
        isValid = false;
    } else {
        setSuccess(username);
    }

    if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
        isValid = false;
    } else {
        setSuccess(email);
    }

    if (passwordValue.length < 8) {
        setError(password, 'Password must be at least 8 characters');
        isValid = false;
    } else if (!/[A-Z]/.test(passwordValue) || !/[0-9]/.test(passwordValue)) {
        setError(password, 'Include at least one uppercase letter and one number');
        isValid = false;
    } else {
        setSuccess(password);
    }

    if (confirmValue !== passwordValue || confirmValue === '') {
        setError(confirmPassword, 'Passwords do not match');
        isValid = false;
    } else {
        setSuccess(confirmPassword);
    }

    return isValid;
};

form.addEventListener('submit', e => {
    e.preventDefault();
    if (validateInputs()) {
        alert('Registration Successful! (Client-side validated)');
        form.reset();

        const inputGroups = document.querySelectorAll('.input-group');
        inputGroups.forEach(group => {
            group.classList.remove('success');
            group.classList.remove('error');
        });
    }
});