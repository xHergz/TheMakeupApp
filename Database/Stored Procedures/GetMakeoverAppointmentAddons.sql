DELIMITER $$
CREATE PROCEDURE GetMakeoverAppointmentAddons
(
    IN _makeoverAppointmentId INT,
    OUT _status SMALLINT
)
BEGIN
    DECLARE MAKEOVER_APPOINTMENT_ID_DOES_NOT_EXIST SMALLINT DEFAULT 2070;

    GetMakeoverAppointmentAddons:BEGIN
		IF (!DoesMakeoverAppointmentIdExist(_makeoverAppointmentId)) THEN
			SET _status = MAKEOVER_APPOINTMENT_ID_DOES_NOT_EXIST;
			LEAVE GetMakeoverAppointmentAddons;
		END IF;

        SET _status = 0;
    END;

    SELECT
        Makeover_Appointment_Addon_Id,
        Makeover_Appointment_Id,
        Description,
        Price
    FROM
        Makeover_Appointment_Addon
    WHERE
        Makeover_Appointment_Addon.Makeover_Appointment_Id = _makeoverAppointmentId;
END
$$
DELIMITER ;