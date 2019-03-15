DELIMITER $$
CREATE PROCEDURE CreateMakeoverAppointment
(
	IN _clientProfileId INT,
    IN _artistPortfolioId INT,
    IN _makeoverTypeId INT,
    IN _serviceTypeId INT,
    IN _servicePrice DOUBLE(6, 2),
    IN _consultationTypeId INT,
    IN _consultationPrice DOUBLE(6, 2),
    IN _appointmentDate DATETIME,
    OUT _status SMALLINT
)
BEGIN
    DECLARE CLIENT_PROFILE_ID_DOES_NOT_EXIST SMALLINT DEFAULT 1035;
    DECLARE ARTIST_PORTFOLIO_ID_DOES_NOT_EXIST SMALLINT DEFAULT 1070;
    DECLARE MAKEOVER_TYPE_ID_DOES_NOT_EXIST SMALLINT DEFAULT 1080;
    DECLARE SERVICE_TYPE_ID_DOES_NOT_EXIST SMALLINT DEFAULT 2020;
    DECLARE CONSULTATION_TYPE_ID_DOES_NOT_EXIST SMALLINT DEFAULT 2050;

    DECLARE newAppointmentId INT DEFAULT NULL;

    CreateMakeoverAppointment:BEGIN
        IF (!DoesClientProfileIdExist(_clientProfileId)) THEN
            SET _status = CLIENT_PROFILE_ID_DOES_NOT_EXIST;
            LEAVE CreateMakeoverAppointment;
        END IF;

        IF (!DoesArtistPortfolioIdExist(_artistPortfolioId)) THEN
            SET _status = ARTIST_PORTFOLIO_ID_DOES_NOT_EXIST;
            LEAVE CreateMakeoverAppointment;
        END IF;

        IF (!DoesMakeoverTypeIdExist(_makeoverTypeId)) THEN
            SET _status = MAKEOVER_TYPE_ID_DOES_NOT_EXIST;
            LEAVE CreateMakeoverAppointment;
        END IF;

        IF (!DoesServiceTypeIdExist(_serviceTypeId)) THEN
            SET _status = SERVICE_TYPE_ID_DOES_NOT_EXIST;
            LEAVE CreateMakeoverAppointment;
        END IF;

        IF (!DoesConsultationTypeIdExist(_consultationTypeId)) THEN
            SET _status = CONSULTATION_TYPE_ID_DOES_NOT_EXIST;
            LEAVE CreateMakeoverAppointment;
        END IF;

        INSERT INTO
            Makeover_Appointment (
                Client_Profile_Id,
                Artist_Portfolio_Id,
                Consultation_Type_Id,
                Consultation_Price,
                Service_Type_Id,
                Service_Price,
                Makeover_Type_Id,
                Appointment_Date,
                Date_Scheduled
            )
        VALUES
            (
                _clientProfileId,
                _artistPortfolioId,
                _consultationTypeId,
                _consultationPrice,
                _serviceTypeId,
                _servicePrice,
                _makeoverTypeId,
                _appointmentDate,
                CURRENT_TIMESTAMP
            );
        SET newAppointmentId = LAST_INSERT_ID();
        SET _status = 0;
    END;

    SELECT
        newAppointmentId AS New_Makeover_Appointment_Id;
END
$$
DELIMITER ;