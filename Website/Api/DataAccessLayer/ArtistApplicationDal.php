<?php
    require_once __DIR__.'/../Common/DataAccessLayer.php';
    require_once __DIR__.'/Response/StatusResponse.php';

    define("AddExistingPortfolioLink", "AddExistingPortfolioLink");
    define("AddSanitizationQuizSubmission", "AddSanitizationQuizSubmission");
    define("CreateArtistApplication", "CreateArtistApplication");

    class ArtistApplicationDal extends DataAccessLayer {
        public function AddExistingPortfolioLink($artistApplicationId, $link) {
            $parameterArray = array(
                new DatabaseParameter($artistApplicationId, PDO::PARAM_INT, '_artistApplicationId', ParameterDirection::IN),
                new DatabaseParameter($link, PDO::PARAM_STR, '_link', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(AddExistingPortfolioLink, null, $parameterArray);
            return new StatusResponse($procResponse->Outputs[Status]);
        }

        public function AddSanitizationQuizSubmission($artistApplicationId, $questionId, $answerId) {
            $parameterArray = array(
                new DatabaseParameter($artistApplicationId, PDO::PARAM_INT, '_artistApplicationId', ParameterDirection::IN),
                new DatabaseParameter($questionId, PDO::PARAM_INT, '_questionId', ParameterDirection::IN),
                new DatabaseParameter($answerId, PDO::PARAM_INT, '_answerId', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(AddSanitizationQuizSubmission, null, $parameterArray);
            return new StatusResponse($procResponse->Outputs[Status]);
        }

        public function CreateArtistApplication($clientProfileId, $resumePath, $coverLetterPath) {
            $parameterArray = array(
                new DatabaseParameter($clientProfileId, PDO::PARAM_INT, '_clientProfileId', ParameterDirection::IN),
                new DatabaseParameter($resumePath, PDO::PARAM_STR, '_resumePath', ParameterDirection::IN),
                new DatabaseParameter($coverLetterPath, PDO::PARAM_STR, '_coverLetterPath', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(CreateArtistApplication, null, $parameterArray);
            return new StatusResponse($procResponse->Outputs[Status]);
        }
    }
?>
