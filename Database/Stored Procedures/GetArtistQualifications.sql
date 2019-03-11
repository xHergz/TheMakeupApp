DELIMITER $$
CREATE PROCEDURE GetArtistQualifications
(
    IN _displayName VARCHAR(50),
    OUT _status SMALLINT
)
BEGIN
    DECLARE DISPLAY_NAME_DOES_NOT_EXIST SMALLINT DEFAULT 1004;

    DECLARE artistPortfolioId INT;

    GetArtistQualifications:BEGIN
        -- Check if the display name exists
		IF (!DoesUserDisplayNameExist(_displayName)) THEN
			SET _status = DISPLAY_NAME_DOES_NOT_EXIST;
			LEAVE GetArtistQualifications;
		END IF;

        SET artistPortfolioId = GetArtistPortfolioIdByDisplayName(_displayName);
        SET _status = 0;
    END;

    SELECT
        Artist_Qualification.Artist_Qualification_Id,
        Artist_Qualification.Artist_Portfolio_Id,
        Artist_Qualification.Year_Obtained,
        Artist_Qualification.Description AS Qualification_Description
    FROM
        Artist_Qualification
    WHERE
        Artist_Qualification.Artist_Portfolio_Id = artistPortfolioId;    

END
$$
DELIMITER ;