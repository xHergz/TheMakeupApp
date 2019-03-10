<?php
    class GetSanitizationQuizAnswersResponse {
        public $Status;

        public $SanitizationQuizAnswers;

        public function __construct($status, $sanitizationQuizAnswers) {
            $this->Status = $status;
            if (empty($sanitizationQuizAnswers)) {
                $this->SanitizationQuizAnswers = null;
            }
            else {
                $this->SanitizationQuizAnswers = $sanitizationQuizAnswers;
            }
        }
    }
?>