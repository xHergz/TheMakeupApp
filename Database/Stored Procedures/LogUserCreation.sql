DELIMITER $$
CREATE PROCEDURE LogUserCreation
(
    IN _sessionKey VARCHAR(256)
)
BEGIN
    DECLARE userCreateAction SMALLINT DEFAULT 1;
    DECLARE sessionId INT;

    SELECT
        Session_Id
    INTO
        sessionId
    FROM
        Session
    WHERE
        Session_Key = _sessionKey;

    INSERT INTO User_Log (Session_Id, User_Action_Id, Timestamp, Message) VALUES
    (sessionId, userCreateAction, CURRENT_TIMESTAMP, 'User created.');
END
$$
DELIMITER ;