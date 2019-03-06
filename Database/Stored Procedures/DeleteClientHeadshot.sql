DELIMITER $$
CREATE PROCEDURE DeleteClientHeadshot
(
    IN _clientHeadshotId INT,
    OUT _status SMALLINT
)
BEGIN
    DECLARE CLIENT_HEADSHOT_DOES_NOT_EXIST SMALLINT DEFAULT 1045;

    DeleteClientHeadshot:BEGIN
        -- Check if the client headshot exists
        IF (!DoesClientHeadshotIdExist(_clientHeadshotId)) THEN
            SET _status = CLIENT_HEADSHOT_DOES_NOT_EXIST;
            LEAVE DeleteClientHeadshot;
        END IF;

        -- Delete the entry
        DELETE FROM
            Client_Headshot
        WHERE
            Client_Headshot_Id = _clientHeadshotId;
        
        SET _status = 0;
    END;
END
$$
DELIMITER ;