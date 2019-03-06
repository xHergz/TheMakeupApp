DELIMITER $$
CREATE FUNCTION GetClientProfileIdByDisplayName
(
	_displayName VARCHAR(50)
)
RETURNS INT
READS SQL DATA
NOT DETERMINISTIC
BEGIN
    DECLARE clientProfileId INT DEFAULT NULL;

    SELECT
        Client_Profile.Client_Profile_Id
    INTO
        clientProfileId
    FROM
        Client_Profile
        INNER JOIN User ON User.User_Id = Client_Profile.User_Id
    WHERE
        User.Display_Name = _displayName;

    RETURN clientProfileId;
END
$$
DELIMITER ;
