DELIMITER $$
CREATE FUNCTION IsSessionAuthorizedForMakeoverAppointment
(
	_sessionKey VARCHAR(256),
    _makeoverAppointmentId INT
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    DECLARE sessionClientProfileId INT DEFAULT NULL;
    DECLARE sessionArtistPortfolioId INT DEFAULT NULL;
    DECLARE appointmentClientProfileId INT DEFAULT NULL;
    DECLARE appointmentArtistPortfolioId INT DEFAULT NULL;

    SET sessionClientProfileId = GetClientProfileIdBySessionKey(_sessionKey);
    SET sessionArtistPortfolioId = GetArtistPortfolioIdBySessionKey(_sessionKey);

    SELECT
        Client_Profile_Id,
        Artist_Portfolio_Id
    INTO
        appointmentClientProfileId,
        appointmentArtistPortfolioId
    FROM
        Makeover_Appointment
    WHERE
        Makeover_Appointment_Id = _makeoverAppointmentId;

    IF (sessionClientProfileId = appointmentClientProfileId OR sessionArtistPortfolioId = appointmentArtistPortfolioId) THEN
        RETURN TRUE;
    END IF;

    RETURN FALSE;
END
$$
DELIMITER ;
