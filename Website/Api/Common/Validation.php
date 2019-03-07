<?php
    class Validation {
        public const EMAIL_MIN_LENGTH = 3;

        public const EMAIL_MAX_LENGTH = 256;

        public const PASSWORD_MIN_LENGTH = 8;

        public const PASSWORD_MAX_LENGTH = 50;

        public const DISPLAY_NAME_MIN_LENGTH = 1;

        public const DISPLAY_NAME_MAX_LENGTH = 50;

        public const NAME_MIN_LENGTH = 1;

        public const NAME_MAX_LENGTH = 100;

        public const BIOGRAPHY_MIN_LENGTH = 0;

        public const BIOGRAPHY_MAX_LENGTH = 500;

        public const RATING_MIN = 0;

        public const RATING_MAX = 5;

        public const REVIEW_MIN_LENGTH = 1;

        public const REVIEW_MAX_LENGTH = 1000;

        public static function ValidateEmail($email) {
            return $email != null && self::CheckLength($email, self::EMAIL_MIN_LENGTH, self::EMAIL_MAX_LENGTH) && preg_match("/^.+@.+\..+$/", $email);
        }

        public static function ValidatePassword($password) {
            $length = strlen($password);
            return $password != null && self::CheckLength($password, self::PASSWORD_MIN_LENGTH, self::PASSWORD_MAX_LENGTH);
        }

        public static function ValidateDisplayName($displayName) {
            return $displayName != null && self::CheckLength($displayName, self::DISPLAY_NAME_MIN_LENGTH, self::DISPLAY_NAME_MAX_LENGTH)
                && preg_match("/^([A-Za-z0-9\-\_]+)$/", $displayName);
        }

        public static function ValidateName($name) {
            return $name != null && self::CheckLength($name, self::NAME_MIN_LENGTH, self::NAME_MAX_LENGTH);
        }

        public static function ValidateBiography($biography) {
            return $biography != null && self::CheckLength($biography, self::BIOGRAPHY_MIN_LENGTH, self::BIOGRAPHY_MAX_LENGTH);
        }

        public static function ValidateNumber($number) {
            return $number != null && is_numeric($number);
        }

        public static function ValidateRating($rating) {
            return $rating >= self::RATING_MIN && $rating <= self::RATING_MAX;
        }

        public static function ValidateReview($review) {
            return $review != null && self::CheckLength($review, self::REVIEW_MIN_LENGTH, self::REVIEW_MAX_LENGTH);
        }

        private static function CheckLength($string, $min, $max) {
            $length = strlen($string);
            return $length >= $min && $length <= $max;
        }
    }
?>