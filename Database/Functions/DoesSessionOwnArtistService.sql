DELIMITER $$
CREATE FUNCTION DoesSessionOwnArtistService
(
	_sessionKey VARCHAR(256),
    _artistServiceId INT
)
RETURNS SMALLINT
READS SQL DATA
NOT DETERMINISTIC
BEGIN
    DECLARE artistPortfolioLinkedToService INT;

    SELECT
        Artist_Portfolio_Id
    INTO
        artistPortfolioLinkedToService
    FROM
        Artist_Service
        INNER JOIN Artist_Makeover_Offered ON Artist_Makeover_Offered.Artist_Makeover_Offered_Id = Artist_Service.Artist_Makeover_Offered_Id
    WHERE
        Artist_Service_Id = _artistServiceId;

    RETURN DoesSessionOwnArtistPortfolio(_sessionKey, artistPortfolioLinkedToService);
END
$$
DELIMITER ;
