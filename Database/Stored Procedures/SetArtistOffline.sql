DELIMITER $$
CREATE PROCEDURE SetArtistOffline
(
	IN _artistPortfolioId INT,
    OUT _status SMALLINT
)
BEGIN
    DECLARE ARTIST_PORTFOLIO_ID_DOES_NOT_EXIST SMALLINT DEFAULT 1070;

    SetArtistOffline:BEGIN
        IF (!DoesArtistPortfolioIdExist(_artistPortfolioId)) THEN
            SET _status = ARTIST_PORTFOLIO_ID_DOES_NOT_EXIST;
            LEAVE SetArtistOffline;
        END IF;

        DELETE FROM
            Online_Artist
        WHERE
            Artist_Portfolio_Id = _artistPortfolioId;
        SET _status = 0;
    END;
END
$$
DELIMITER ;