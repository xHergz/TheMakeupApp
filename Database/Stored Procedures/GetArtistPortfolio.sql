DELIMITER $$
CREATE PROCEDURE GetArtistPortfolio
(
    IN _displayName VARCHAR(50),
    OUT _status SMALLINT
)
BEGIN
    DECLARE DISPLAY_NAME_DOES_NOT_EXIST SMALLINT DEFAULT 1004;

    DECLARE artistPortfolioId INT;

    GetArtistPortfolio:BEGIN
        -- Check if the display name exists
		IF (!DoesUserDisplayNameExist(_displayName)) THEN
			SET _status = DISPLAY_NAME_DOES_NOT_EXIST;
			LEAVE GetArtistPortfolio;
		END IF;

        SET artistPortfolioId = GetArtistPortfolioIdByDisplayName(_displayName);
        SET _status = 0;
    END;

    SELECT
        Artist_Portfolio.Artist_Portfolio_Id,
        Artist_Portfolio.Profile_Picture_Url,
        Artist_Portfolio.Biography
    FROM
        Artist_Portfolio
    WHERE
        Artist_Portfolio.Artist_Portfolio_Id = artistPortfolioId;    

END
$$
DELIMITER ;