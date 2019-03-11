DELIMITER $$
CREATE FUNCTION DoesSessionOwnArtistServiceAddon
(
	_sessionKey VARCHAR(256),
    _artistServiceAddonId INT
)
RETURNS SMALLINT
READS SQL DATA
NOT DETERMINISTIC
BEGIN
    DECLARE artistPortfolioLinkedToServiceAddon INT;

    SELECT
        Artist_Portfolio_Id
    INTO
        artistPortfolioLinkedToServiceAddon
    FROM
        Artist_Service_Addon
        INNER JOIN Artist_Service ON Artist_Service.Artist_Service_Id = Artist_Service_Addon.Artist_Service_Id
        INNER JOIN Artist_Makeover_Offered ON Artist_Makeover_Offered.Artist_Makeover_Offered_Id = Artist_Service.Artist_Makeover_Offered_Id
    WHERE
        Artist_Service_Addon_Id = _artistServiceAddonId

    RETURN DoesSessionOwnArtistPortfolio(_sessionKey, artistPortfolioLinkedToServiceAddon);
END
$$
DELIMITER ;
