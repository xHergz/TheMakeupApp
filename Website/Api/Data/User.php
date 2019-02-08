<?php
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

        public function PasswordIsConfirmed() {
            if ($this->Password != null && $this->ConfirmPassword != null && $this->Password == $this->ConfirmPassword) {
                return true;
            }
            return false;
        }
    }
?>