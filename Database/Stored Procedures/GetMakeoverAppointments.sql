DELIMITER $$
CREATE PROCEDURE GetMakeoverAppointments
(
    IN _clientProfileId INT,
    IN _artistPortfolioId INT,
    OUT _status SMALLINT
)
BEGIN
    GetMakeoverAppointments:BEGIN
        SET _status = 0;
    END;

    SELECT
        Makeover_Appointment.Makeover_Appointment_Id,
        Client_Profile.Client_Profile_Id,
        Client_User.Display_Name AS Client_Profile_Display_Name,
        Artist_Portfolio.Artist_Portfolio_Id,
        Artist_User.Display_Name AS Artist_Portfolio_Display_Name,
        Service_Type.Service_Type_Id,
        Service_Type.Description AS Service_Type_Description,
        Makeover_Type.Makeover_Type_Id,
        Makeover_Type.Description AS Makeover_Type_Description,
        Makeover_Appointment.Appointment_Date
    FROM
        Makeover_Appointment
        INNER JOIN Client_Profile ON Client_Profile.Client_Profile_Id = Makeover_Appointment.Client_Profile_Id
        INNER JOIN User AS Client_User ON Client_User.User_Id = Client_Profile.User_Id
        INNER JOIN Artist_Portfolio ON Artist_Portfolio.Artist_Portfolio_Id = Makeover_Appointment.Artist_Portfolio_Id
        INNER JOIN User AS Artist_User ON Artist_User.User_Id = Artist_Portfolio.User_Id
        INNER JOIN Service_Type ON Service_Type.Service_Type_Id = Makeover_Appointment.Service_Type_Id
        INNER JOIN Makeover_Type ON Makeover_Type.Makeover_Type_Id = Makeover_Appointment.Makeover_Type_Id
    WHERE
        (Makeover_Appointment.Client_Profile_Id = _clientProfileId OR _clientProfileId IS NULL)
        OR (Makeover_Appointment.Artist_Portfolio_Id = _artistPortfolioId OR _artistPortfolioId IS NULL);
END
$$
DELIMITER ;