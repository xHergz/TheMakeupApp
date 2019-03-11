DELIMITER $$
CREATE PROCEDURE GetArtistPortfolioPictures
(
    IN _displayName VARCHAR(50),
    OUT _status SMALLINT
)
BEGIN
    DECLARE DISPLAY_NAME_DOES_NOT_EXIST SMALLINT DEFAULT 1004;

    DECLARE artistPortfolioId INT;

    GetArtistPortfolioPictures:BEGIN
        -- Check if the display name exists
		IF (!DoesUserDisplayNameExist(_displayName)) THEN
			SET _status = DISPLAY_NAME_DOES_NOT_EXIST;
			LEAVE GetArtistPortfolioPictures;
		END IF;

        SET artistPortfolioId = GetArtistPortfolioIdByDisplayName(_displayName);
        SET _status = 0;
    END;

    SELECT
        Artist_Portfolio_Picture.Artist_Portfolio_Picture_Id,
        Artist_Portfolio_Picture.Artist_Portfolio_Id,
        Artist_Portfolio_Picture.Image_Path,
        Artist_Portfolio_Picture.Date_Added,
        Artist_Portfolio_Picture.Makeover_Type_Id
    FROM
        Artist_Portfolio_Picture
    WHERE
        Artist_Portfolio_Picture.Artist_Portfolio_Id = artistPortfolioId;    

END
$$
DELIMITER ;