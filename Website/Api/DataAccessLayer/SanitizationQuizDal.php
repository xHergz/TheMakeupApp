<?php
    require_once __DIR__.'/../Common/DataAccessLayer.php';
    require_once __DIR__.'/Dto/SanitizationQuizAnswerDto.php';
    require_once __DIR__.'/Dto/SanitizationQuizQuestionDto.php';
    require_once __DIR__.'/Response/GetSanitizationQuizQuestionIdsResponse.php';
    require_once __DIR__.'/Response/GetSanitizationQuizQuestionResponse.php';
    require_once __DIR__.'/Response/GetSanitizationQuizAnswersResponse.php';
    require_once __DIR__.'/Response/StatusResponse.php';

    define("GetSanitizationQuizQuestionIds", "GetSanitizationQuizQuestionIds");
    define("GetSanitizationQuizQuestion", "GetSanitizationQuizQuestion");
    define("GetSanitizationQuizAnswers", "GetSanitizationQuizAnswers");

    class SanitizationQuizDal extends DataAccessLayer {
        public function GetSanitizationQuizQuestionIds() {
            $parameterArray = array(
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(GetSanitizationQuizQuestionIds, 'SanitizationQuizQuestionDto', $parameterArray);
            return new GetSanitizationQuizQuestionIdsResponse($procResponse->Outputs[Status], $procResponse->Results);
        }

        public function GetSanitizationQuizQuestion($sanitizationQuestionId) {
            $parameterArray = array(
                new DatabaseParameter($sanitizationQuestionId, PDO::PARAM_INT, '_sanitizationQuestionId', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(GetSanitizationQuizQuestion, 'SanitizationQuizQuestionDto', $parameterArray);
            return new GetSanitizationQuizQuestionResponse($procResponse->Outputs[Status], $procResponse->GetSingleRow());
        }

        public function GetSanitizationQuizAnswers($sanitizationQuestionId) {
            $parameterArray = array(
                new DatabaseParameter($sanitizationQuestionId, PDO::PARAM_INT, '_sanitizationQuestionId', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(GetSanitizationQuizAnswers, 'SanitizationQuizAnswerDto', $parameterArray);
            return new GetSanitizationQuizAnswersResponse($procResponse->Outputs[Status], $procResponse->Results);
        }
    }
?>
