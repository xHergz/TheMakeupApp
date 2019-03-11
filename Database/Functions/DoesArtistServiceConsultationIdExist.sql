DELIMITER $$
CREATE FUNCTION DoesArtistServiceConsultationIdExist
(
	_artistServiceConsultationId INT
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
                Artist_Service_Consultation.Artist_Service_Consultation_Id = _artistServiceConsultationId
        )
    ) THEN 
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END
$$
DELIMITER ;
