<?php
    class GetSanitizationQuizQuestionIdsResponse {
        public $Status;

        public $SanitizationQuizQuestionIds;

        public function __construct($status, $sanitizationQuizQuestionIds) {
            $this->Status = $status;
            if (empty($sanitizationQuizQuestionIds)) {
                $this->SanitizationQuizQuestionIds = null;
            }
            else {
                $this->SanitizationQuizQuestionIds = $sanitizationQuizQuestionIds;
            }
        }
    }
?>