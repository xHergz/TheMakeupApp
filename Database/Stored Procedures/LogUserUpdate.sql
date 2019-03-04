DELIMITER $$
CREATE PROCEDURE LogUserUpdate
(
    IN _sessionKey VARCHAR(256),
    IN _columnName VARCHAR(100),
    IN _oldValue VARCHAR(256),
    IN _newValue VARCHAR(256)
)
BEGIN
    DECLARE USER_UPDATE_ACTION SMALLINT DEFAULT 2;

    DECLARE sessionId INT;

    LogUserUpdate:BEGIN
        SET sessionId = GetSessionIdBySessionKey(_sessionKey);

        INSERT INTO User_Log (Session_Id, User_Action_Id, Timestamp, Message) VALUES
        (sessionId, USER_UPDATE_ACTION, CURRENT_TIMESTAMP, CONCAT('"', _columnName, '" has been changed from "', _oldValue, '" to "', _newValue, '".'));
    END;
END
$$
DELIMITER ;