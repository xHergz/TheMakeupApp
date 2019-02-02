DELIMITER $$
CREATE PROCEDURE CreateSession
(
    IN _userId INT,
    IN _ipAddress VARCHAR(45)
)
BEGIN
    DECLARE result SMALLINT;
    DECLARE defaultDaysUntilSessionExpires SMALLINT;
    DECLARE newSessionKey VARCHAR(256);

    -- Get the config value for session expiry
    SELECT
        CAST(Config_Value AS UNSIGNED)
    INTO
        defaultDaysUntilSessionExpires
    FROM
        System_Configuration
    WHERE
        Config_Key = 'DefaultDaysUntilSessionExpires';

    -- Create the session
    SET newSessionKey = UUID();
    INSERT INTO Session (User_Id, Session_Key, Created, Expires, Ip_Address) VALUES
    (_userId, newSessionKey, CURRENT_TIMESTAMP, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL defaultDaysUntilSessionExpires DAY), _ipAddress);
    SET result = 0;

    SELECT
        result AS Result,
        newSessionKey AS New_Session_Key;
END
$$
DELIMITER ;