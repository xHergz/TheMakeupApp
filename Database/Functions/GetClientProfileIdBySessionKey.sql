DELIMITER $$
CREATE FUNCTION GetClientProfileIdBySessionKey
(
	_sessionKey VARCHAR(256)
)
RETURNS INT
READS SQL DATA
NOT DETERMINISTIC
BEGIN
    DECLARE clientProfileId INT DEFAULT NULL;

    SELECT
        Client_Profile.Client_Profile_Id
    INTO
        clientProfileId
    FROM
        Client_Profile
        INNER JOIN Session ON Session.User_Id = Client_Profile.User_Id
    WHERE
        Session.Session_Key = _sessionKey;

    RETURN clientProfileId;
END
$$
DELIMITER ;
