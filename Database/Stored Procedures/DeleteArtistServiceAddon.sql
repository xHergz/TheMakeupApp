DELIMITER $$
CREATE PROCEDURE DeleteArtistServiceAddon
(
    IN _artistServiceAddonId INT,
    OUT _status SMALLINT
)
BEGIN
    DECLARE ARTIST_SERVICE_ADDON_ID_DOES_NOT_EXIST SMALLINT DEFAULT 2040;

    DeleteArtistServiceAddon:BEGIN
        -- Check if the client headshot exists
        IF (!DoesArtistServiceAddonIdExist(_artistServiceAddonId)) THEN
            SET _status = ARTIST_SERVICE_ADDON_ID_DOES_NOT_EXIST;
            LEAVE DeleteArtistServiceAddon;
        END IF;

        -- Delete the entry
        DELETE FROM
            Artist_Service_Addon
        WHERE
            Artist_Service_Addon_Id = _artistServiceAddonId;
        
        SET _status = 0;
    END;
END
$$
DELIMITER ;