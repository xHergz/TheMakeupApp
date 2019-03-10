<?php
    require_once __DIR__. "/../Common/ApiUtilities.php";
    require_once __DIR__. "/../Common/Log.php";
    require_once __DIR__. "/../Data/ApiRequest.php";
    require_once __DIR__. "/../Data/HttpStatus.php";
    require_once __DIR__. "/../DataAccessLayer/Dto/SanitizationQuizQuestionDto.php";
    require_once __DIR__. "/../DataAccessLayer/SanitizationQuizDal.php";
    require_once __DIR__. "/../Helpers/AuthorizationMethods.php";
    require_once 'IApiEndpoint.php';

    class SanitizationQuizEndpoint implements IApiEndpoint {
        public function get() {
            $apiRequest = new ApiRequest($_GET, 'SanitizationQuiz');
            $apiRequest->LogRequest();

            if (!$apiRequest->IsEmpty()) {
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, "Request is not empty");
            }

            $sanitizationQuizDal = new SanitizationQuizDal();
            if (!$sanitizationQuizDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            // Get Sanitization Quiz Question Ids
            $sanitizationQuestionIdsResponse = $sanitizationQuizDal->GetSanitizationQuizQuestionIds();

            // Pick 5 Random Question Ids
            $selectedQuestionIds = array();
            $sanitizationQuizQuestionIds = array_column($sanitizationQuestionIdsResponse->SanitizationQuizQuestionIds, 'Sanitization_Quiz_Question_Id');
            $numberOfQuestions = count($sanitizationQuizQuestionIds);
            for ($count = 0; $count < 5; $count++) {
                $randomIndex = mt_rand(0, $numberOfQuestions - 1);
                $randomId = $sanitizationQuizQuestionIds[$randomIndex];
                array_splice($sanitizationQuizQuestionIds, $randomIndex, 1);
                $numberOfQuestions--;
                array_push($selectedQuestionIds, $randomId);
            }

            // Get the question and answers for each id
            $sanitizationQuestions = array();
            foreach($selectedQuestionIds as $questionId) {
                $sanitizationQuestionResponse = $sanitizationQuizDal->GetSanitizationQuizQuestion($questionId);
                $sanitizationAnswersResponse = $sanitizationQuizDal->GetSanitizationQuizAnswers($questionId);
                $question = $sanitizationQuestionResponse->SanitizationQuizQuestion;
                $question->Answers = $sanitizationAnswersResponse->SanitizationQuizAnswers;
                array_push($sanitizationQuestions, $question);
            }

            // Build response
            $fullApiResponse = (object) ['status' => 0, 'sanitizationQuiz' => $sanitizationQuestions];
            $jsonResponse = $sanitizationQuizDal->EncodeResponse($fullApiResponse);
            Log::LogInformation('Sanitization Quiz GET Response: ' . $jsonResponse);
            echo $jsonResponse;
            $sanitizationQuizDal->Close();
        }

        public function post() {
            BadRequest(405);
        }

        public function put() {
            BadRequest(405);
        }

        public function delete() {
            BadRequest(405);
        }

        public function options() {
            header('Allow: GET, OPTIONS');
        }
    }
?>