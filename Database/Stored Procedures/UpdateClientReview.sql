DELIMITER $$
CREATE PROCEDURE UpdateClientReview
(
    IN _clientReviewId INT,
    IN _rating TINYINT,
    IN _review VARCHAR(1000),
    OUT _status SMALLINT
)
BEGIN
    DECLARE CLIENT_REVIEW_DOES_NOT_EXIST SMALLINT DEFAULT 1043;

    DECLARE currentRating VARCHAR(2048);
    DECLARE currentReview VARCHAR(500);
    DECLARE updateRating BOOLEAN DEFAULT FALSE;
    DECLARE updateReview BOOLEAN DEFAULT FALSE;

    UpdateClientReview:BEGIN
        -- Check if the client profile id given exists
        IF (_clientReviewId IS NULL OR !DoesClientReviewIdExist(_clientReviewId)) THEN
            SET _status = CLIENT_REVIEW_DOES_NOT_EXIST;
            LEAVE UpdateClientReview;
        END IF;

        -- Get the current values
        SELECT
            Rating,
            Review
        INTO
            currentRating,
            currentReview
        FROM
            Client_Review
        WHERE
            Client_Review_Id = _clientReviewId;

        -- Check if each value has changed or is null to determine if it needs to be updated
        IF (currentRating != _rating AND _rating IS NOT NULL) THEN
            SET updateRating = TRUE;
        END IF;

        IF (currentReview != _review AND _review IS NOT NULL) THEN
            SET updateReview = TRUE;
        END IF;

        -- Update the user info
        UPDATE
            Client_Review
        SET
            Rating = CASE WHEN updateRating = TRUE THEN _rating ELSE currentRating END,
            Review = CASE WHEN updateReview = TRUE THEN _review ELSE currentReview END
        WHERE
            Client_Review_Id = _clientReviewId;

        SET _status = 0;
    END;
END
$$
DELIMITER ;