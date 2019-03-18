DELIMITER $$
CREATE PROCEDURE SetArtistOnline
(
	IN _artistPortfolioId INT,
    IN _longitude DOUBLE,
    IN _latitude DOUBLE,
    OUT _status SMALLINT
)
BEGIN
    DECLARE ARTIST_PORTFOLIO_ID_DOES_NOT_EXIST SMALLINT DEFAULT 1070;

    SetArtistOnline:BEGIN
        IF (!DoesArtistPortfolioIdExist(_artistPortfolioId)) THEN
            SET _status = ARTIST_PORTFOLIO_ID_DOES_NOT_EXIST;
            LEAVE SetArtistOnline;
        END IF;

        INSERT INTO Online_Artist(Artist_Portfolio_Id, Longitude, Latitude, Went_Online) VALUES
        (_artistPortfolioId, _longitude, _latitude, CURRENT_TIMESTAMP);
        SET _status = 0;
    END;
END
$$
DELIMITER ;