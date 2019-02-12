function isInputValid(validationMethod, inputElement) {
    if (validationMethod(inputElement.value)) {
        removeClass(inputElement, 'invalid-input');
        return true;
    }
    else {
        addClass(inputElement, 'invalid-input');
        return false;
    }
}

function isEmailValid() {
    var emailInput = document.getElementById("emailInput");
    return isInputValid(validateEmail, emailInput);
}

function isPasswordValid() {
    var passwordInput = document.getElementById("passwordInput");
    return isInputValid(validatePassword, passwordInput);
}

function isPasswordEntered() {
    var passwordInput = document.getElementById("passwordInput");
    return isInputValid(validateRequiredInput, passwordInput);
}

function isPasswordConfirmed() {
    var passwordInput = document.getElementById("passwordInput");
    var confirmPasswordInput = document.getElementById("confirmPasswordInput");
    if (confirmPassword(passwordInput.value, confirmPasswordInput.value)) {
        removeClass(confirmPasswordInput, 'invalid-input');
        return true;
    }
    else {
        addClass(confirmPasswordInput, 'invalid-input');
        return false;
    }
}

function isDisplayNameValid() {
    var displayNameInput = document.getElementById("displayNameInput");
    return isInputValid(validateDisplayName, displayNameInput);
}

function isFirstNameValid() {
    var firstNameInput = document.getElementById("firstNameInput");
    return isInputValid(validateName, firstNameInput);
}

function isLastNameValid() {
    var lastNameInput = document.getElementById("lastNameInput");
    return isInputValid(validateName, lastNameInput);
}

function submitSignUp() {
    var formIsValid = isEmailValid() && isPasswordValid() && isPasswordConfirmed() && isDisplayNameValid() && isFirstNameValid() && isLastNameValid();
    if (formIsValid) {
        console.log("Sign Up Submitted");
        return true;
    }
    console.log("Sign Up Not Submitted");
    return false;
}

function submitLogin() {
    var formIsValid = isEmailValid() && isPasswordEntered();
    if (formIsValid) {
        console.log("Login Submitted");
        return true;
    }
    console.log("Login Not Submitted");
    return false;
}