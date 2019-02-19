DELIMITER $$
CREATE PROCEDURE LogSessionDeactivation
(
    IN _sessionId INT
)
BEGIN
    DECLARE SESSION_DEACTIVATE_ACTION SMALLINT DEFAULT 2;

    LogSessionDeactivation:BEGIN
        INSERT INTO Session_Log (Session_Id, Session_Action_Id, Timestamp) VALUES
        (_sessionId, SESSION_DEACTIVATE_ACTION, CURRENT_TIMESTAMP);
    END;
END
$$
DELIMITER ;