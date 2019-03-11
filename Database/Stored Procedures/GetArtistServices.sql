DELIMITER $$
CREATE PROCEDURE GetArtistServices
(
    IN _displayName VARCHAR(50),
    OUT _status SMALLINT
)
BEGIN
    DECLARE DISPLAY_NAME_DOES_NOT_EXIST SMALLINT DEFAULT 1004;

    DECLARE artistPortfolioId INT;

    GetArtistServices:BEGIN
        -- Check if the display name exists
		IF (!DoesUserDisplayNameExist(_displayName)) THEN
			SET _status = DISPLAY_NAME_DOES_NOT_EXIST;
			LEAVE GetArtistServices;
		END IF;

        SET artistPortfolioId = GetArtistPortfolioIdByDisplayName(_displayName);
        SET _status = 0;
    END;

    SELECT
        Artist_Service.Artist_Service_Id,
        Artist_Makeover_Offered.Artist_Makeover_Offered_Id,
        Artist_Service.Service_Type_Id,
        Service_Type.Description AS Service_Type_Description,
        Artist_Service.Base_Price
    FROM
        Artist_Service
        INNER JOIN Service_Type ON Service_Type.Service_Type_Id = Artist_Service.Service_Type_Id
        INNER JOIN Artist_Makeover_Offered ON Artist_Makeover_Offered.Artist_Makeover_Offered_Id = Artist_Service.Artist_Makeover_Offered_Id
    WHERE
        Artist_Makeover_Offered.Artist_Portfolio_Id = artistPortfolioId;    

END
$$
DELIMITER ;