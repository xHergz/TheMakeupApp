DELIMITER $$
CREATE PROCEDURE DeactivateSession
(
    IN _sessionKey VARCHAR(256)
)
BEGIN
    DECLARE result SMALLINT;
    DECLARE sessionId INT;

    SELECT
        Session_Id
    INTO
        sessionId
    FROM
        Session
    WHERE
        Session_Key = _sessionKey;

    -- Deactivate the session
    UPDATE
        Session
    SET
        Active = FALSE
    WHERE
        Session_Id = sessionId;

    SET result = 0;

    SELECT
        result AS Result;
END
$$
DELIMITER ;