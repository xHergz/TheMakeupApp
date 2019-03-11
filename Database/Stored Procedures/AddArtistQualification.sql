DELIMITER $$
CREATE PROCEDURE AddArtistQualification
(
    IN _artistPortfolioId INT,
    IN _yearObtained INT,
    IN _description VARCHAR(250),
    OUT _status SMALLINT
)
BEGIN
    DECLARE ARTIST_PORTFOLIO_DOES_NOT_EXIST SMALLINT DEFAULT 1070;

    AddArtistQualification:BEGIN
        -- Check if the artist portfolio exists
		IF (!DoesArtistPortfolioIdExist(_artistPortfolioId)) THEN
			SET _status = ARTIST_PORTFOLIO_DOES_NOT_EXIST;
			LEAVE AddArtistQualification;
		END IF;

        INSERT INTO Artist_Qualification(Artist_Portfolio_Id, Year_Obtained, Description) VALUES
        (_artistPortfolioId, _yearObtained, _description);
        SET _status = 0;
    END;
END
$$
DELIMITER ;