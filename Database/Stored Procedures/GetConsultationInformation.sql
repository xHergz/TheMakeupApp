DELIMITER $$
CREATE PROCEDURE GetConsultationInformation
(
    IN _consultationId INT,
    OUT _status SMALLINT
)
BEGIN
    DECLARE CONSULTATION_ID_DOES_NOT_EXIST SMALLINT DEFAULT 2080;

    GetConsultationInformation:BEGIN
		IF (!DoesConsultationIdExist(_consultationId)) THEN
			SET _status = CONSULTATION_ID_DOES_NOT_EXIST;
			LEAVE GetConsultationInformation;
		END IF;

        SET _status = 0;
    END;

    SELECT
        Consultation.Consultation_Id,
        Consultation.Room_Id,
        Consultation.Client_Profile_Id,
        Consultation.Artist_Portfolio_Id,
        Consultation.Date_Created
    FROM
        Consultation
    WHERE
        Consultation.Consultation_Id = _consultationId;
END
$$
DELIMITER ;