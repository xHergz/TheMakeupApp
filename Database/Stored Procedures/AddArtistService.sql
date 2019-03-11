DELIMITER $$
CREATE PROCEDURE AddArtistService
(
    IN _artistMakeoverOfferedId INT,
    IN _serviceTypeId INT,
    IN _basePrice DOUBLE(6, 2),
    OUT _status SMALLINT
)
BEGIN
    DECLARE ARTIST_MAKEOVER_OFFERED_ID_DOES_NOT_EXIST SMALLINT DEFAULT 2010;
    DECLARE SERVICE_TYPE_ID_DOES_NOT_EXIST SMALLINT DEFAULT 2020;
    DECLARE ARTIST_SERVICE_ALREADY_EXISTS SMALLINT DEFAULT 2031;

    AddArtistService:BEGIN
        -- Check if the artist portfolio exists
		IF (!DoesArtistMakeoverOfferedIdExist(_artistMakeoverOfferedId)) THEN
			SET _status = ARTIST_MAKEOVER_OFFERED_ID_DOES_NOT_EXIST;
			LEAVE AddArtistService;
		END IF;

        IF (!DoesServiceTypeIdExist(_serviceTypeId)) THEN
			SET _status = SERVICE_TYPE_ID_DOES_NOT_EXIST;
			LEAVE AddArtistService;
		END IF;

        IF (DoesArtistMakeoverOfferedHaveService(_artistMakeoverOfferedId, _serviceTypeId)) THEN
			SET _status = ARTIST_SERVICE_ALREADY_EXISTS;
			LEAVE AddArtistService;
		END IF;

        INSERT INTO Artist_Service(Artist_Makeover_Offered_Id, Service_Type_Id, Base_Price) VALUES
        (_artistMakeoverOfferedId, _serviceTypeId, _basePrice);
        SET _status = 0;
    END;
END
$$
DELIMITER ;