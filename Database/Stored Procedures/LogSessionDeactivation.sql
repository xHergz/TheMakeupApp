DELIMITER $$
CREATE PROCEDURE LogSessionDeactivation
(
    IN _sessionId INT
)
BEGIN
    DECLARE result SMALLINT DEFAULT 0;
    DECLARE sessionDeactivateAction SMALLINT DEFAULT 2;

    INSERT INTO Session_Log (Session_Id, Session_Action_Id, Timestamp) VALUES
    (_sessionId, sessionDeactivateAction, CURRENT_TIMESTAMP);

    SELECT
        result AS Result;
END
$$
DELIMITER ;