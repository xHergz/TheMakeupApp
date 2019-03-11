DELIMITER $$
CREATE PROCEDURE AddArtistServiceAddon
(
    IN _artistServiceId INT,
    IN _description VARCHAR(250),
    IN _price DOUBLE(6, 2),
    OUT _status SMALLINT
)
BEGIN
    DECLARE ARTIST_SERVICE_ID_DOES_NOT_EXIST SMALLINT DEFAULT 2030;

    AddArtistServiceAddon:BEGIN
        -- Check if the artist portfolio exists
		IF (!DoesArtistServiceIdExist(_artistServiceId)) THEN
			SET _status = ARTIST_SERVICE_ID_DOES_NOT_EXIST;
			LEAVE AddArtistServiceAddon;
		END IF;

        INSERT INTO Artist_Service_Addon(Artist_Service_Id, Description, Price) VALUES
        (_artistServiceId, _description, _price);
        SET _status = 0;
    END;
END
$$
DELIMITER ;