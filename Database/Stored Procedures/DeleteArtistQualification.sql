DELIMITER $$
CREATE PROCEDURE DeleteArtistQualification
(
    IN _artistQualificationId INT,
    OUT _status SMALLINT
)
BEGIN
    DECLARE ARTIST_QUALIFICATION_ID_DOES_NOT_EXIST SMALLINT DEFAULT 2000;

    DeleteArtistQualification:BEGIN
        -- Check if the client headshot exists
        IF (!DoesArtistQualificationIdExist(_artistQualificationId)) THEN
            SET _status = ARTIST_QUALIFICATION_ID_DOES_NOT_EXIST;
            LEAVE DeleteArtistQualification;
        END IF;

        -- Delete the entry
        DELETE FROM
            Artist_Qualification
        WHERE
            Artist_Qualification_Id = _artistQualificationId;
        
        SET _status = 0;
    END;
END
$$
DELIMITER ;