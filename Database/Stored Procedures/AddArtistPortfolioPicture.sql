DELIMITER $$
CREATE PROCEDURE AddArtistPortfolioPicture
(
    IN _artistPortfolioId INT,
    IN _imagePath VARCHAR(2048),
    IN _makeoverTypeId INT,
    OUT _status SMALLINT
)
BEGIN
    DECLARE ARTIST_PORTFOLIO_DOES_NOT_EXIST SMALLINT DEFAULT 1070;
    DECLARE MAKEOVER_TYPE_ID_DOES_NOT_EXIST SMALLINT DEFAULT 1080;

    AddArtistPortfolioPicture:BEGIN
        -- Check if the artist portfolio exists
		IF (!DoesArtistPortfolioIdExist(_artistPortfolioId)) THEN
			SET _status = ARTIST_PORTFOLIO_DOES_NOT_EXIST;
			LEAVE AddArtistPortfolioPicture;
		END IF;

        -- Check if the make over type exists
		IF (!DoesMakeoverTypeIdExist(_makeoverTypeId)) THEN
			SET _status = MAKEOVER_TYPE_ID_DOES_NOT_EXIST;
			LEAVE AddArtistPortfolioPicture;
		END IF;

        INSERT INTO Artist_Portfolio_Picture(Artist_Portfolio_Id, Image_Path, Makeover_Type_Id, DATE_ADDED) VALUES
        (_artistPortfolioId, _imagePath, _makeoverTypeId, CURRENT_TIMESTAMP);
        SET _status = 0;
    END;
END
$$
DELIMITER ;