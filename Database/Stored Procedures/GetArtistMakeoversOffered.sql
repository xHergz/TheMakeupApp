DELIMITER $$
CREATE PROCEDURE GetArtistMakeoversOffered
(
    IN _displayName VARCHAR(50),
    OUT _status SMALLINT
)
BEGIN
    DECLARE DISPLAY_NAME_DOES_NOT_EXIST SMALLINT DEFAULT 1004;

    DECLARE artistPortfolioId INT;

    GetArtistMakeoversOffered:BEGIN
        -- Check if the display name exists
		IF (!DoesUserDisplayNameExist(_displayName)) THEN
			SET _status = DISPLAY_NAME_DOES_NOT_EXIST;
			LEAVE GetArtistMakeoversOffered;
		END IF;

        SET artistPortfolioId = GetArtistPortfolioIdByDisplayName(_displayName);
        SET _status = 0;
    END;

    SELECT
        Artist_Makeover_Offered.Artist_Makeover_Offered_Id,
        Artist_Makeover_Offered.Artist_Portfolio_Id,
        Artist_Makeover_Offered.Makeover_Type_Id,
        Makeover_Type.Description AS Makeover_Type_Description
    FROM
        Artist_Makeover_Offered
        INNER JOIN Makeover_Type ON Makeover_Type.Makeover_Type_Id = Artist_Makeover_Offered.Makeover_Type_Id
    WHERE
        Artist_Makeover_Offered.Artist_Portfolio_Id = artistPortfolioId;    

END
$$
DELIMITER ;