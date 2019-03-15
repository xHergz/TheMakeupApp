DELIMITER $$
CREATE FUNCTION DoesMakeoverAppointmentIdExist
(
	_makeoverAppointmentId INT
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
                Makeover_Appointment_Id
            FROM
                Makeover_Appointment
            WHERE
                Makeover_Appointment_Id = _makeoverAppointmentId
        )
    ) THEN 
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END
$$
DELIMITER ;
