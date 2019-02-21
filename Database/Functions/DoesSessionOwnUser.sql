DELIMITER $$
CREATE FUNCTION DoesSessionOwnUser
(
	_sessionKey VARCHAR(256),
    _displayName VARCHAR(50)
)
RETURNS SMALLINT
READS SQL DATA
NOT DETERMINISTIC
BEGIN
    DECLARE userIdLinkedToSession INT;
    DECLARE userIdLinkedToDisplayName INT;

    SET userIdLinkedToSession = GetUserIdBySessionKey(_sessionKey);
    SET userIdLinkedToDisplayName = GetUserIdByDisplayName(_displayName);

    IF (userIdLinkedToSession = userIdLinkedToDisplayName) THEN
        RETURN TRUE;
    END IF;

    RETURN FALSE;
END
$$
DELIMITER ;
