DELIMITER $$
CREATE PROCEDURE DeleteArtistService
(
    IN _artistServiceId INT,
    OUT _status SMALLINT
)
BEGIN
    DECLARE ARTIST_SERVICE_ID_DOES_NOT_EXIST SMALLINT DEFAULT 2030;

    DeleteArtistService:BEGIN
        -- Check if the client headshot exists
        IF (!DoesArtistServiceIdExist(_artistServiceId)) THEN
            SET _status = ARTIST_SERVICE_ID_DOES_NOT_EXIST;
            LEAVE DeleteArtistService;
        END IF;

        -- Delete All Addons for the service
        DELETE FROM
            Artist_Service_Addon
        WHERE
            Artist_Service_Id = _artistServiceId;

        -- Delete All Consultations for the service
        DELETE FROM
            Artist_Service_Consultation
        WHERE
            Artist_Service_Id = _artistServiceId;

        -- Delete the entry
        DELETE FROM
            Artist_Service
        WHERE
            Artist_Service_Id = _artistServiceId;
        
        SET _status = 0;
    END;
END
$$
DELIMITER ;