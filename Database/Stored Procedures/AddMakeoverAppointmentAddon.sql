DELIMITER $$
CREATE PROCEDURE AddMakeoverAppointmentAddon
(
	IN _makeoverAppointmentId INT,
    IN _description VARCHAR(250),
    IN _price DOUBLE(6, 2),
    OUT _status SMALLINT
)
BEGIN
    DECLARE MAKEOVER_APPOINTMENT_ID_DOES_NOT_EXIST SMALLINT DEFAULT 2070;

    AddMakeoverAppointmentAddon:BEGIN
        IF (!DoesMakeoverAppointmentIdExist(_makeoverAppointmentId)) THEN
            SET _status = MAKEOVER_APPOINTMENT_ID_DOES_NOT_EXIST;
            LEAVE AddMakeoverAppointmentAddon;
        END IF;

        INSERT INTO
            Makeover_Appointment_Addon
                (
                    Makeover_Appointment_Id,
                    Description,
                    Price
                )
        VALUES
            (
                _makeoverAppointmentId,
                _description,
                _price
            );
        SET _status = 0;
    END;
END
$$
DELIMITER ;