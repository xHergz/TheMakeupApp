DELIMITER $$
CREATE PROCEDURE GetConsultationTypes
(
    OUT _status SMALLINT
)
BEGIN
    GetConsultationTypes:BEGIN
        SET _status = 0;
    END;

    SELECT
        Consultation_Type_Id,
        Minute_Length
    FROM
        Consultation_Type;
END
$$
DELIMITER ;