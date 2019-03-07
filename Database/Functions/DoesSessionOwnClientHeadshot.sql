DELIMITER $$
CREATE FUNCTION DoesSessionOwnClientHeadshot
(
	_sessionKey VARCHAR(256),
    _clientHeadshotId INT
)
RETURNS SMALLINT
READS SQL DATA
NOT DETERMINISTIC
BEGIN
    DECLARE clientProfileLinkedToSession INT;
    DECLARE clientProfileLinkedToHeadshot INT;

    SET clientProfileLinkedToSession = GetClientProfileIdBySessionKey(_sessionKey);

    SELECT
        Client_Headshot.Client_Profile_Id
    INTO
        clientProfileLinkedToHeadshot
    FROM
        Client_Headshot
    WHERE
        Client_Headshot.Client_Headshot_Id = _clientHeadshotId;

    IF (clientProfileLinkedToSession = clientProfileLinkedToHeadshot) THEN
        RETURN TRUE;
    END IF;

    RETURN FALSE;
END
$$
DELIMITER ;
