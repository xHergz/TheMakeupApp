DELIMITER $$
CREATE PROCEDURE LogUserDeactivation
(
    IN _sessionKey VARCHAR(256)
)
BEGIN
    DECLARE USER_DEACTIVATE_ACTION SMALLINT DEFAULT 3;

    DECLARE sessionId INT;

    LogUserDeactivation:BEGIN
        SET sessionId = GetSessionIdBySessionKey(_sessionKey);

        INSERT INTO User_Log (Session_Id, User_Action_Id, Timestamp, Message) VALUES
        (sessionId, USER_DEACTIVATE_ACTION, CURRENT_TIMESTAMP, 'User deactivated.');
    END;
END
$$
DELIMITER ;