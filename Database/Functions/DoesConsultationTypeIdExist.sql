DELIMITER $$
CREATE FUNCTION DoesConsultationTypeIdExist
(
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
                Consultation_Type.Consultation_Type_Id
            FROM
                Consultation_Type
            WHERE
                Consultation_Type.Consultation_Type_Id = _consultationTypeId
        )
    ) THEN 
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END
$$
DELIMITER ;
