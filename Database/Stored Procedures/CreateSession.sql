DELIMITER $$
CREATE PROCEDURE CreateSession
(
    IN _userId INT,
    IN _ipAddress VARCHAR(45),
    OUT _status SMALLINT
)
BEGIN
    DECLARE DAYS_UNTIL_SESSION_EXPIRES_KEY VARCHAR(100) DEFAULT 'DefaultDaysUntilSessionExpires';
    DECLARE DEFAULT_DAYS_UNTIL_SESSION_EXPIRES SMALLINT DEFAULT 1;

    DECLARE defaultDaysUntilSessionExpires SMALLINT;
    DECLARE newSessionKey VARCHAR(256);
    DECLARE newSessionId INT;

    CreateSession:BEGIN
        -- Get the config value for session expiry
        SET defaultDaysUntilSessionExpires = CAST(GetSystemConfigValue(DAYS_UNTIL_SESSION_EXPIRES_KEY) AS UNSIGNED);

        -- Check if the config value was found
        IF (defaultDaysUntilSessionExpires IS NULL) THEN
            SET defaultDaysUntilSessionExpires = DEFAULT_DAYS_UNTIL_SESSION_EXPIRES;
        END IF;

        -- Create the session
        SET newSessionKey = UUID();
        INSERT INTO Session (User_Id, Session_Key, Created, Expires, Ip_Address) VALUES
        (_userId, newSessionKey, CURRENT_TIMESTAMP, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL defaultDaysUntilSessionExpires DAY), _ipAddress);

        SET newSessionId = LAST_INSERT_ID();
        CALL LogSessionCreation(newSessionId);
        
        SET _status = 0;
    END;

    SELECT
        newSessionKey AS New_Session_Key;
END
$$
DELIMITER ;