DELIMITER $$
CREATE PROCEDURE DeleteArtistPortfolioPicture
(
    IN _artistPortfolioPictureId INT,
    OUT _status SMALLINT
)
BEGIN
    DECLARE ARTIST_PORTFOLIO_PICTURE_ID_DOES_NOT_EXIST SMALLINT DEFAULT 1090;

    DeleteArtistPortfolioPicture:BEGIN
        -- Check if the client headshot exists
        IF (!DoesArtistPortfolioPictureIdExist(_artistPortfolioPictureId)) THEN
            SET _status = ARTIST_PORTFOLIO_PICTURE_ID_DOES_NOT_EXIST;
            LEAVE DeleteArtistPortfolioPicture;
        END IF;

        -- Delete the entry
        DELETE FROM
            Artist_Portfolio_Picture
        WHERE
            Artist_Portfolio_Picture_Id = _artistPortfolioPictureId;
        
        SET _status = 0;
    END;
END
$$
DELIMITER ;