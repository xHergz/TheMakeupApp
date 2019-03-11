DELIMITER $$
CREATE PROCEDURE AddArtistServiceConsultation
(
    IN _artistServiceId INT,
    IN _consultationTypeId INT,
    IN _price DOUBLE(6, 2),
    OUT _status SMALLINT
)
BEGIN
    DECLARE ARTIST_SERVICE_ID_DOES_NOT_EXIST SMALLINT DEFAULT 2030;
    DECLARE CONSULTATION_TYPE_ID_DOES_NOT_EXIST SMALLINT DEFAULT 2050;
    DECLARE ARTIST_SERVICE_CONSULTATION_ALREADY_EXISTS SMALLINT DEFAULT 2061;

    AddArtistServiceConsultation:BEGIN
		IF (!DoesArtistServiceIdExist(_artistServiceId)) THEN
			SET _status = ARTIST_SERVICE_ID_DOES_NOT_EXIST;
			LEAVE AddArtistServiceConsultation;
		END IF;

        IF (!DoesConsultationTypeIdExist(_consultationTypeId)) THEN
			SET _status = CONSULTATION_TYPE_ID_DOES_NOT_EXIST;
			LEAVE AddArtistServiceConsultation;
		END IF;

        IF (DoesArtistServiceHaveConsultation(_artistServiceId, _consultationTypeId)) THEN
			SET _status = ARTIST_SERVICE_CONSULTATION_ALREADY_EXISTS;
			LEAVE AddArtistServiceConsultation;
		END IF;

        INSERT INTO Artist_Service_Consultation(Artist_Service_Id, Consultation_Type_Id, Price) VALUES
        (_artistServiceId, _consultationTypeId, _price);
        SET _status = 0;
    END;
END
$$
DELIMITER ;