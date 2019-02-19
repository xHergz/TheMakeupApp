DELIMITER $$
CREATE PROCEDURE DeactivateSession
(
    IN _sessionKey VARCHAR(256),
    OUT _status SMALLINT
)
BEGIN
    DECLARE sessionId INT DEFAULT NULL;

    DeactivateSession:BEGIN
        -- Get the sessions id
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

        CALL LogSessionDeactivation(sessionId);
        
        SET _status = 0;
    END;
END
$$
DELIMITER ;