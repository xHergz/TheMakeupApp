DELIMITER $$
CREATE PROCEDURE DeleteClientReview
(
    IN _clientReviewId INT,
    OUT _status SMALLINT
)
BEGIN
    DECLARE CLIENT_REVIEW_DOES_NOT_EXIST SMALLINT DEFAULT 1043;

    DeleteClientReview:BEGIN
        -- Check if the client headshot exists
        IF (!DoesClientReviewIdExist(_clientReviewId)) THEN
            SET _status = CLIENT_REVIEW_DOES_NOT_EXIST;
            LEAVE DeleteClientReview;
        END IF;

        -- Delete the entry
        DELETE FROM
            Client_Review
        WHERE
            Client_Review_Id = _clientReviewId;
        
        SET _status = 0;
    END;
END
$$
DELIMITER ;