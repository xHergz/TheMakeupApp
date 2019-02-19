DELIMITER $$
CREATE PROCEDURE LogSessionCreation
(
    IN _sessionId INT
)
BEGIN
    DECLARE SESSION_CREATE_ACTION SMALLINT DEFAULT 1;
    
    LogSessionCreation:BEGIN
        INSERT INTO Session_Log (Session_Id, Session_Action_Id, Timestamp) VALUES
        (_sessionId, SESSION_CREATE_ACTION, CURRENT_TIMESTAMP);
    END;
END
$$
DELIMITER ;