DELIMITER $$
CREATE PROCEDURE GetMakeoverAppointment
(
    IN _makeoverAppointmentId INT,
    OUT _status SMALLINT
)
BEGIN
    DECLARE MAKEOVER_APPOINTMENT_ID_DOES_NOT_EXIST SMALLINT DEFAULT 2070;

    GetMakeoverAppointment:BEGIN
		IF (!DoesMakeoverAppointmentIdExist(_makeoverAppointmentId)) THEN
			SET _status = MAKEOVER_APPOINTMENT_ID_DOES_NOT_EXIST;
			LEAVE GetMakeoverAppointment;
		END IF;

        SET _status = 0;
    END;

    SELECT
        Client_Profile.Client_Profile_Id,
        Client_User.Display_Name AS Client_Profile_Display_Name,
        Artist_Portfolio.Artist_Portfolio_Id,
        Artist_User.Display_Name AS Artist_Portfolio_Display_Name,
        Consultation_Type.Consultation_Type_Id,
        Consultation_Type.Minute_Length AS Consultation_Type_Minute_Length,
        Makeover_Appointment.Consultation_Price,
        Service_Type.Service_Type_Id,
        Service_Type.Description AS Service_Type_Description,
        Makeover_Appointment.Service_Price,
        Makeover_Type.Makeover_Type_Id,
        Makeover_Type.Description AS Makeover_Type_Description,
        Makeover_Appointment.Appointment_Date,
        Makeover_Appointment.Date_Scheduled
    FROM
        Makeover_Appointment
        INNER JOIN Client_Profile ON Client_Profile.Client_Profile_Id = Makeover_Appointment.Client_Profile_Id
        INNER JOIN User AS Client_User ON Client_User.User_Id = Client_Profile.User_Id
        INNER JOIN Artist_Portfolio ON Artist_Portfolio.Artist_Portfolio_Id = Makeover_Appointment.Artist_Portfolio_Id
        INNER JOIN User AS Artist_User ON Artist_User.User_Id = Artist_Portfolio.User_Id
        INNER JOIN Consultation_Type ON Consultation_Type.Consultation_Type_Id = Makeover_Appointment.Consultation_Type_Id
        INNER JOIN Service_Type ON Service_Type.Service_Type_Id = Makeover_Appointment.Service_Type_Id
        INNER JOIN Makeover_Type ON Makeover_Type.Makeover_Type_Id = Makeover_Appointment.Makeover_Type_Id
    WHERE
        Makeover_Appointment.Makeover_Appointment_Id = _makeoverAppointmentId;
END
$$
DELIMITER ;