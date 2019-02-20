DELIMITER $$
CREATE FUNCTION GetSessionIdBySessionKey
(
	_sessionKey VARCHAR(256)
)
RETURNS INT
READS SQL DATA
NOT DETERMINISTIC
BEGIN
    DECLARE sessionId INT DEFAULT NULL;

    SELECT
        Session_Id
    INTO
        sessionId
    FROM
        Session
    WHERE
        Session_Key = _sessionKey;

    RETURN sessionId;
END
$$
DELIMITER ;
