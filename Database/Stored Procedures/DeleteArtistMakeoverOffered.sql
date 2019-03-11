DELIMITER $$
CREATE PROCEDURE DeleteArtistMakeoverOffered
(
    IN _artistMakeoverOfferedId INT,
    OUT _status SMALLINT
)
BEGIN
    DECLARE ARTIST_MAKEOVER_OFFERED_ID_DOES_NOT_EXIST SMALLINT DEFAULT 2010;

    DeleteArtistMakeoverOffered:BEGIN
        -- Check if the client headshot exists
        IF (!DoesArtistMakeoverOfferedIdExist(_artistMakeoverOfferedId)) THEN
            SET _status = ARTIST_MAKEOVER_OFFERED_ID_DOES_NOT_EXIST;
            LEAVE DeleteArtistMakeoverOffered;
        END IF;

        -- Delete the entry
        DELETE FROM
            Artist_Makeover_Offered
        WHERE
            Artist_Makeover_Offered_Id = _artistMakeoverOfferedId;
        
        SET _status = 0;
    END;
END
$$
DELIMITER ;