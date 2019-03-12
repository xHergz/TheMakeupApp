DELIMITER $$
CREATE FUNCTION DoesSessionOwnArtistMakeoverOffered
(
	_sessionKey VARCHAR(256),
    _artistMakeoverOfferedId INT
)
RETURNS SMALLINT
READS SQL DATA
NOT DETERMINISTIC
BEGIN
    DECLARE artistPortfolioLinkedToMakeoverOffered INT;

    SELECT
        Artist_Portfolio_Id
    INTO
        artistPortfolioLinkedToMakeoverOffered
    FROM
        Artist_Makeover_Offered
    WHERE
        Artist_Makeover_Offered_Id = _artistMakeoverOfferedId;

    RETURN DoesSessionOwnArtistPortfolio(_sessionKey, artistPortfolioLinkedToMakeoverOffered);
END
$$
DELIMITER ;
