DELIMITER $$
CREATE PROCEDURE LogUserDeactivation
(
    IN _sessionKey INT
)
BEGIN
    DECLARE result SMALLINT DEFAULT 0;
    DECLARE userDeactivateAction SMALLINT DEFAULT 3;
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
    (sessionId, userDeactivateAction, CURRENT_TIMESTAMP, 'User deactivated.');

    SELECT
        result AS Result;
END
$$
DELIMITER ;