import moment from 'moment';

const NAME_MAX_LENGTH = 50;

const PASSWORD_MIN_LENGTH = 10;

const PASSWORD_MAX_LENGTH = 50;

const LONG_TEXT_MAX_LENGTH = 250;

const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD';

function createValidationObject(isValid, message = '') {
    return {
        isValid: isValid,
        message: message
    };
}

export function validateEmail(email) {
    const emailRegex = new RegExp(/^.+@.+\..+$/);
    if (!emailRegex.test(email)) {
        return createValidationObject(false, 'Must be a valid email address.');
    }
    return createValidationObject(true);
}

export function validateName(name) {
    if (name.length > NAME_MAX_LENGTH) {
        return createValidationObject(false, `Must be ${NAME_MAX_LENGTH} characters or less.`);
    }
    return createValidationObject(true);
}

export function validateLongText(name) {
    if (name.length > LONG_TEXT_MAX_LENGTH) {
        return createValidationObject(false, `Must be ${LONG_TEXT_MAX_LENGTH} characters or less.`);
    }
    return createValidationObject(true);
}

export function validatePassword(password) {
    if (password.length < PASSWORD_MIN_LENGTH) {
        return createValidationObject(false, `Must be more than ${PASSWORD_MIN_LENGTH} characters.`);
    }
    if (password.length > PASSWORD_MAX_LENGTH) {
        return createValidationObject(false, `Must be ${PASSWORD_MAX_LENGTH} characters or less.`);
    }
    return createValidationObject(true);
}

export function validateConfirmPassword(confirmValue, passwordValue) {
    if (confirmValue !== passwordValue) {
        return createValidationObject(false, 'Must match password.');
    }
    return createValidationObject(true);
}

export function validatePrice(price) {
    const priceRegex = RegExp(/^(\d+\.\d{2})$/g);
    if (!priceRegex.test(price)) {
        return createValidationObject(false, 'Must be valid number with 2 decimal places.');
    }
    return createValidationObject(true);
}

export function validateDate(date, format = DEFAULT_DATE_FORMAT) {
    const test = moment(date, format);
    console.log(test);
    return createValidationObject(moment(date, format).isValid());
}

export function validateFutureDate(date) {
    const givenDate = moment(date);
    const now = moment();
    if (now.diff(givenDate) > 0) {
        return createValidationObject(false, 'Must be date in the future.');
    }
    return createValidationObject(true);
}

export function validateIsbn(isbn) {
    return createValidationObject(true);
}
