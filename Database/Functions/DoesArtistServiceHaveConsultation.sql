DELIMITER $$
CREATE FUNCTION DoesArtistServiceHaveConsultation
(
	_artistServiceId INT,
    _consultationTypeId INT
)
RETURNS SMALLINT
READS SQL DATA
NOT DETERMINISTIC
BEGIN
    IF
    (
        NOT EXISTS
        (
            SELECT
                Artist_Service_Consultation.Artist_Service_Consultation_Id
            FROM
                Artist_Service_Consultation
            WHERE
                Artist_Service_Consultation.Artist_Service_Id = _artistServiceId
                AND Artist_Service_Consultation.Consultation_Type_Id = _consultationTypeId
        )
    ) THEN 
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END
$$
DELIMITER ;
