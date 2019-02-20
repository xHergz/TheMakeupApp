DELIMITER $$
CREATE PROCEDURE LogUserCreation
(
    IN _sessionKey VARCHAR(256)
)
BEGIN
    DECLARE USER_CREATE_ACTION SMALLINT DEFAULT 1;

    DECLARE sessionId INT;

    LogUserCreation:BEGIN
        SET sessionId = GetSessionIdBySessionKey(_sessionKey);

        INSERT INTO User_Log (Session_Id, User_Action_Id, Timestamp, Message) VALUES
        (sessionId, USER_CREATE_ACTION, CURRENT_TIMESTAMP, 'User created.');
    END;
END
$$
DELIMITER ;