const EMAIL_MIN_LENGTH = 3;

const EMAIL_MAX_LENGTH = 256;

const PASSWORD_MIN_LENGTH = 8;

const PASSWORD_MAX_LENGTH = 50;

const DISPLAY_NAME_MIN_LENGTH = 1;

const DISPLAY_NAME_MAX_LENGTH = 50;

const NAME_MIN_LENGTH = 1;

const NAME_MAX_LENGTH = 100;

function validateEmail(email) {
    const emailRegex = new RegExp(/^.+@.+\..+$/);
    return emailRegex.test(email) && email !== null && checkLength(email, EMAIL_MIN_LENGTH, EMAIL_MAX_LENGTH);
}

function validatePassword(password) {
    return password !== null && checkLength(password, PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH);
}

function confirmPassword(password, confirmPassword) {
    return password !== null && confirmPassword !== null && password === confirmPassword;
}

function validateDisplayName(displayName) {
    const displayNameRegex = new RegExp(/^([A-Za-z0-9\-\_]+)$/);
    return displayNameRegex.test(displayName) && displayName !== null && checkLength(displayName, DISPLAY_NAME_MIN_LENGTH, DISPLAY_NAME_MAX_LENGTH);
}

function validateName(name) {
    return name !== null && checkLength(name, NAME_MIN_LENGTH, NAME_MAX_LENGTH);
}

function checkLength(string, min, max) {
    return string.length >= min && string.length <= max;
}