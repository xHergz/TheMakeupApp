DELIMITER $$
CREATE FUNCTION DoesConsultationIdExist
(
	_consultationId INT
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
                Consultation_Id
            FROM
                Consultation
            WHERE
                Consultation_Id = _consultationId
        )
    ) THEN 
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END
$$
DELIMITER ;
