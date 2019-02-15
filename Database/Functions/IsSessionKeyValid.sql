DELIMITER $$
CREATE FUNCTION IsSessionKeyValid
(
	_sessionKey VARCHAR(256)
)
RETURNS SMALLINT
READS SQL DATA
NOT DETERMINISTIC
BEGIN
    DECLARE isSessionActive BOOLEAN;
    DECLARE sessionExpiry DATETIME;
    DECLARE isUserActive BOOLEAN;

    -- Check if the session exists
    IF
    (
        NOT EXISTS
        (
            SELECT
                Session_Key
            FROM
                Session
            WHERE
                Session_Key = _sessionKey
        )
    ) THEN 
        RETURN 101;
    END IF;

    SELECT
        Session.Active,
        Session.Expires,
        User.Active
    INTO
        isSessionActive,
        sessionExpiry,
        isUserActive
    FROM
        Session
    INNER JOIN User ON User.User_Id = Session.User_Id
    WHERE
        Session_Key = _sessionKey;

    -- Check if the session is active
    IF (!isSessionActive) THEN
        RETURN 102;
    END IF;

    -- Check if the session has expired
    IF (sessionExpiry <= CURRENT_TIMESTAMP) THEN
        RETURN 103;
    END IF;

    -- Check if the user is active
    IF (!isUserActive) THEN
        RETURN 104;
    END IF;

    RETURN 0;
END
$$
DELIMITER ;
