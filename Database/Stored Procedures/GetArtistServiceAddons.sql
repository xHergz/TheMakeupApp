DELIMITER $$
CREATE PROCEDURE GetArtistServiceAddons
(
    IN _displayName VARCHAR(50),
    OUT _status SMALLINT
)
BEGIN
    DECLARE DISPLAY_NAME_DOES_NOT_EXIST SMALLINT DEFAULT 1004;

    DECLARE artistPortfolioId INT;

    GetArtistServiceAddons:BEGIN
        -- Check if the display name exists
		IF (!DoesUserDisplayNameExist(_displayName)) THEN
			SET _status = DISPLAY_NAME_DOES_NOT_EXIST;
			LEAVE GetArtistServiceAddons;
		END IF;

        SET artistPortfolioId = GetArtistPortfolioIdByDisplayName(_displayName);
        SET _status = 0;
    END;

    SELECT
        Artist_Service_Addon.Artist_Service_Addon_Id,
        Artist_Service.Artist_Service_Id,
        Artist_Service_Addon.Description AS Artist_Service_Addon_Description,
        Artist_Service_Addon.Price
    FROM
        Artist_Service_Addon
        INNER JOIN Artist_Service ON Artist_Service.Artist_Service_Id = Artist_Service_Addon.Artist_Service_Id
        INNER JOIN Artist_Makeover_Offered ON Artist_Makeover_Offered.Artist_Makeover_Offered_Id = Artist_Service.Artist_Makeover_Offered_Id
    WHERE
        Artist_Makeover_Offered.Artist_Portfolio_Id = artistPortfolioId;    

END
$$
DELIMITER ;