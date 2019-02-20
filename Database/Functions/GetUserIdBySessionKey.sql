DELIMITER $$
CREATE FUNCTION GetUserIdBySessionKey
(
	_sessionKey VARCHAR(256)
)
RETURNS INT
READS SQL DATA
NOT DETERMINISTIC
BEGIN
    DECLARE userId INT DEFAULT NULL;

    SELECT
        User_Id
    INTO
        userId
    FROM
        Session
    WHERE
        Session_Key = _sessionKey;

    RETURN userId;
END
$$
DELIMITER ;
