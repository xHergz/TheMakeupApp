DELIMITER $$
CREATE PROCEDURE LogUserUpdate
(
    IN _sessionKey INT,
    IN _columnName VARCHAR(100),
    IN _oldValue VARCHAR(256),
    IN _newValue VARCHAR(256)
)
BEGIN
    DECLARE userUpdateAction SMALLINT DEFAULT 2;
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
    (sessionId, userUpdateAction, CURRENT_TIMESTAMP, CONCAT('"', _columnName, '" has been changed from "', _oldValue, '" to "', _newValue, '".'));
END
$$
DELIMITER ;