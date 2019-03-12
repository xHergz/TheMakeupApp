DELIMITER $$
CREATE FUNCTION DoesSessionOwnArtistPortfolioPicture
(
	_sessionKey VARCHAR(256),
    _artistPortfolioPictureId INT
)
RETURNS SMALLINT
READS SQL DATA
NOT DETERMINISTIC
BEGIN
    DECLARE artistPortfolioLinkedToPicture INT;

    SELECT
        Artist_Portfolio_Id
    INTO
        artistPortfolioLinkedToPicture
    FROM
        Artist_Portfolio_Picture
    WHERE
        Artist_Portfolio_Picture_Id = _artistPortfolioPictureId;

    RETURN DoesSessionOwnArtistPortfolio(_sessionKey, artistPortfolioLinkedToPicture);
END
$$
DELIMITER ;
