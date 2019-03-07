<?php
    require_once __DIR__.'/../Common/DataAccessLayer.php';
    require_once __DIR__.'/Dto/ClientReviewDto.php';
    require_once __DIR__.'/Response/GetClientReviewsResponse.php';
    require_once __DIR__.'/Response/StatusResponse.php';

    define("AddClientReview", "AddClientReview");
    define("GetClientReviews", "GetClientReviews");
    define("UpdateClientReview", "UpdateClientReview");
    define("DeleteClientReview", "DeleteClientReview");

    class ClientReviewsDal extends DataAccessLayer {
        public function AddClientReview($clientProfileId, $artistPortfolioId, $rating, $review) {
            $parameterArray = array(
                new DatabaseParameter($clientProfileId, PDO::PARAM_INT, '_clientProfileId', ParameterDirection::IN),
                new DatabaseParameter($artistPortfolioId, PDO::PARAM_INT, '_artistPortfolioId', ParameterDirection::IN),
                new DatabaseParameter($rating, PDO::PARAM_INT, '_rating', ParameterDirection::IN),
                new DatabaseParameter($review, PDO::PARAM_STR, '_review', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(AddClientReview, null, $parameterArray);
            return new StatusResponse($procResponse->Outputs[Status]);
        }

        public function GetClientReviews($displayName) {
            $parameterArray = array(
                new DatabaseParameter($displayName, PDO::PARAM_STR, '_displayName', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(GetClientReviews, 'ClientReviewDto', $parameterArray);
            return new GetClientReviewsResponse($procResponse->Outputs[Status], $procResponse->Results);
        }

        public function UpdateClientReview($clientReviewId, $rating, $review) {
            $parameterArray = array(
                new DatabaseParameter($clientReviewId, PDO::PARAM_INT, '_clientReviewId', ParameterDirection::IN),
                new DatabaseParameter($rating, PDO::PARAM_INT, '_rating', ParameterDirection::IN),
                new DatabaseParameter($review, PDO::PARAM_STR, '_review', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(UpdateClientReview, null, $parameterArray);
            return new StatusResponse($procResponse->Outputs[Status]);
        }

        public function DeleteClientReview($clientReviewId) {
            $parameterArray = array(
                new DatabaseParameter($clientReviewId, PDO::PARAM_INT, '_clientReviewId', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(DeleteClientReview, null, $parameterArray);
            return new StatusResponse($procResponse->Outputs[Status]);
        }
    }
?>
