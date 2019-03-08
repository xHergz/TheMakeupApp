DELIMITER $$
CREATE FUNCTION DoesSessionOwnClientReview
(
	_sessionKey VARCHAR(256),
    _clientReviewId INT
)
RETURNS SMALLINT
READS SQL DATA
NOT DETERMINISTIC
BEGIN
    DECLARE artistPortfolioIdLinkedToSession INT;
    DECLARE artistPortfolioIdLinkedToReview INT;

    SET artistPortfolioIdLinkedToSession = GetArtistPortfolioIdBySessionKey(_sessionKey);

    SELECT
        Client_Review.Artist_Portfolio_Id
    INTO
        artistPortfolioIdLinkedToReview
    FROM
        Client_Review
    WHERE
        Client_Review.Client_Review_Id = _clientReviewId;

    IF (artistPortfolioIdLinkedToSession = artistPortfolioIdLinkedToReview) THEN
        RETURN TRUE;
    END IF;

    RETURN FALSE;
END
$$
DELIMITER ;
