DELIMITER $$
CREATE PROCEDURE LogSessionCreation
(
    IN _sessionId INT
)
BEGIN
    DECLARE sessionCreateAction SMALLINT DEFAULT 1;

    INSERT INTO Session_Log (Session_Id, Session_Action_Id, Timestamp) VALUES
    (_sessionId, sessionCreateAction, CURRENT_TIMESTAMP);
END
$$
DELIMITER ;