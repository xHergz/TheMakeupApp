DELIMITER $$
CREATE PROCEDURE LogUserDeactivation
(
    IN _sessionKey VARCHAR(256)
)
BEGIN
    DECLARE USER_DEACTIVATE_ACTION SMALLINT DEFAULT 3;

    DECLARE sessionId INT;

    LogUserDeactivation:BEGIN
        SELECT
            Session_Id
        INTO
            sessionId
        FROM
            Session
        WHERE
            Session_Key = _sessionKey;

        INSERT INTO User_Log (Session_Id, User_Action_Id, Timestamp, Message) VALUES
        (sessionId, USER_DEACTIVATE_ACTION, CURRENT_TIMESTAMP, 'User deactivated.');
    END;
END
$$
DELIMITER ;