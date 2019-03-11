DELIMITER $$
CREATE PROCEDURE DeleteArtistServiceConsultation
(
    IN _artistServiceConsultationId INT,
    OUT _status SMALLINT
)
BEGIN
    DECLARE ARTIST_SERVICE_CONSULTATION_ID_DOES_NOT_EXIST SMALLINT DEFAULT 2060;

    DeleteArtistServiceConsultation:BEGIN
        -- Check if the client headshot exists
        IF (!DoesArtistServiceConsultationIdExist(_artistServiceConsultationId)) THEN
            SET _status = ARTIST_SERVICE_CONSULTATION_ID_DOES_NOT_EXIST;
            LEAVE DeleteArtistServiceConsultation;
        END IF;

        -- Delete the entry
        DELETE FROM
            Artist_Service_Consultation
        WHERE
            Artist_Service_Consultation_Id = _artistServiceConsultationId;
        
        SET _status = 0;
    END;
END
$$
DELIMITER ;