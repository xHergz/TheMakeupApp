<?php
    require_once __DIR__.'/../Common/Validation.php';
    require_once __DIR__.'/Errors.php';

    class User {
        public const EMAIL_INPUT = 'email';

        public const PASSWORD_INPUT = 'password';

        public const CONFIRM_PASSWORD_INPUT = 'confirmPassword';

        public const DISPLAY_NAME_INPUT = 'displayName';

        public const FIRST_NAME_INPUT = 'firstName';

        public const LAST_NAME_INPUT = 'lastName';

        public $Email;

        public $Password;

        public $ConfirmPassword;

        public $DisplayName;

        public $FirstName;

        public $LastName;

        public function __construct() {
			$this->Email = null;
            $this->Password = null;
            $this->ConfirmPassword = null;
            $this->DisplayName = null;
            $this->FirstName = null;
            $this->LastName = null;
        }
        
        public function SetInfo($email, $password, $confirmPassword, $displayName, $firstName, $lastName) {
            $this->Email = $email == '' ? null : $email;
            $this->Password = $password == '' ? null : $password;
            $this->ConfirmPassword = $confirmPassword == '' ? null : $confirmPassword;
            $this->DisplayName = $displayName == '' ? null : $displayName;
            $this->FirstName = $firstName == '' ? null : $firstName;
            $this->LastName = $lastName == '' ? null : $lastName;
        }

        public function IsSignUpInfoAvailable() {
            return isset($_POST[self::EMAIL_INPUT]) && isset($_POST[self::PASSWORD_INPUT]) && isset($_POST[self::CONFIRM_PASSWORD_INPUT])
                && isset($_POST[self::DISPLAY_NAME_INPUT]) && isset($_POST[self::FIRST_NAME_INPUT]) && isset($_POST[self::LAST_NAME_INPUT]);
        }

        public function GetSignUpInfo() {
            $this->Email = $_POST[self::EMAIL_INPUT];
            $this->Password = $_POST[self::PASSWORD_INPUT];
            $this->ConfirmPassword = $_POST[self::CONFIRM_PASSWORD_INPUT];
            $this->DisplayName = $_POST[self::DISPLAY_NAME_INPUT];
            $this->FirstName = $_POST[self::FIRST_NAME_INPUT];
            $this->LastName = $_POST[self::LAST_NAME_INPUT];
        }

        public function IsValidForSignUp() {
            return $this->IsEmailValid() && $this->IsPasswordValid() && $this->IsPasswordConfirmed() && $this->IsDisplayNameValid()
                && $this->IsFirstNameValid() && $this->IsLastNameValid();
        }

        public function IsLoginInfoAvailable() {
            return isset($_POST[self::EMAIL_INPUT]) && isset($_POST[self::PASSWORD_INPUT]);
        }

        public function GetLoginInfo() {
            $this->Email = $_POST[self::EMAIL_INPUT];
            $this->Password = $_POST[self::PASSWORD_INPUT];
        }

        public function IsValidForLogin() {
            return $this->IsEmailValid();
        }

        public function GetSignUpErrors() {
            $errorCodes = array();

            if (!$this->IsEmailValid()) {
                array_push($errorCodes, Errors::EMAIL_INVALID);
            }

            if (!$this->IsPasswordValid()) {
                array_push($errorCodes, Errors::PASSWORD_INVALID);
            }

            if (!$this->IsPasswordConfirmed()) {
                array_push($errorCodes, Errors::PASSWORD_NOT_CONFIRMED);
            }

            if (!$this->IsDisplayNameValid()) {
                array_push($errorCodes, Errors::DISPLAY_NAME_INVALID);
            }

            if (!$this->IsFirstNameValid()) {
                array_push($errorCodes, Errors::FIRST_NAME_INVALID);
            }

            if (!$this->IsLastNameValid()) {
                array_push($errorCodes, Errors::LAST_NAME_INVALID);
            }

            return $errorCodes;
        }

        public function GetLoginErrors() {
            $errorCodes = array();

            if (!$this->IsEmailValid()) {
                array_push($errorCodes, Errors::EMAIL_INVALID);
            }

            return $errorCodes;
        }

        public function GetUpdateErrors() {
            $errorCodes = array();

            if ($this->Email != null && !$this->IsEmailValid()) {
                array_push($errorCodes, Errors::EMAIL_INVALID);
            }

            if ($this->Password != null && !$this->IsPasswordValid()) {
                array_push($errorCodes, Errors::PASSWORD_INVALID);
            }

            if ($this->Password != null && !$this->IsPasswordConfirmed()) {
                array_push($errorCodes, Errors::PASSWORD_NOT_CONFIRMED);
            }

            if ($this->DisplayName != null && !$this->IsDisplayNameValid()) {
                array_push($errorCodes, Errors::DISPLAY_NAME_INVALID);
            }

            if ($this->FirstName != null && !$this->IsFirstNameValid()) {
                array_push($errorCodes, Errors::FIRST_NAME_INVALID);
            }

            if ($this->LastName != null && !$this->IsLastNameValid()) {
                array_push($errorCodes, Errors::LAST_NAME_INVALID);
            }

            return $errorCodes;
        }

        private function IsEmailValid() {
            return Validation::ValidateEmail($this->Email);
        }

        private function IsPasswordValid() {
            return Validation::ValidatePassword($this->Password);
        }

        private function IsPasswordConfirmed() {
            if ($this->Password != null && $this->ConfirmPassword != null && $this->Password == $this->ConfirmPassword) {
                return true;
            }
            return false;
        }

        private function IsDisplayNameValid() {
            return Validation::ValidateDisplayName($this->DisplayName);
        }

        private function IsFirstNameValid() {
            return Validation::ValidateName($this->FirstName);
        }

        private function IsLastNameValid() {
            return Validation::ValidateName($this->LastName);
        }
    }
?>