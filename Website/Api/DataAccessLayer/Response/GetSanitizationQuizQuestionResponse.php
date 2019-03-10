<?php
    class GetSanitizationQuizQuestionResponse {
        public $Status;

        public $SanitizationQuizQuestion;

        public function __construct($status, $sanitizationQuizQuestion) {
            $this->Status = $status;
            if (empty($sanitizationQuizQuestion)) {
                $this->SanitizationQuizQuestionIds = null;
            }
            else {
                $this->SanitizationQuizQuestion = $sanitizationQuizQuestion;
            }
        }
    }
?>