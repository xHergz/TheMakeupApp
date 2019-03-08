DELIMITER $$
CREATE FUNCTION DoesSessionOwnClientProfile
(
	_sessionKey VARCHAR(256),
    _clientProfileId INT
)
RETURNS SMALLINT
READS SQL DATA
NOT DETERMINISTIC
BEGIN
    DECLARE clientProfileLinkedToSession INT;

    SET clientProfileLinkedToSession = GetClientProfileIdBySessionKey(_sessionKey);

    IF (clientProfileLinkedToSession = _clientProfileId) THEN
        RETURN TRUE;
    END IF;

    RETURN FALSE;
END
$$
DELIMITER ;
