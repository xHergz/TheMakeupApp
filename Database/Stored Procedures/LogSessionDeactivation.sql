DELIMITER $$
CREATE PROCEDURE LogSessionDeactivation
(
    IN _sessionId INT
)
BEGIN
    DECLARE sessionDeactivateAction SMALLINT DEFAULT 2;

    INSERT INTO Session_Log (Session_Id, Session_Action_Id, Timestamp) VALUES
    (_sessionId, sessionDeactivateAction, CURRENT_TIMESTAMP);
END
$$
DELIMITER ;