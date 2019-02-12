DELIMITER $$
CREATE FUNCTION DoesSessionOwnUser
(
	_sessionKey VARCHAR(256),
    _userId INT
)
RETURNS SMALLINT
READS SQL DATA
NOT DETERMINISTIC
BEGIN
    DECLARE userIdLinkedToSession INT;

    SELECT
        User_Id
    INTO
        userIdLinkedToSession
    FROM
        Session
    WHERE
        Session_Key = _sessionKey;

    IF (userIdLinkedToSession = _userId) THEN
        RETURN TRUE;
    END IF;

    RETURN FALSE;
END
$$
DELIMITER ;
