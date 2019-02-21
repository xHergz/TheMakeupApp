DELIMITER $$
CREATE FUNCTION GetSystemConfigValue
(
	_configKey VARCHAR(100)
)
RETURNS INT
READS SQL DATA
NOT DETERMINISTIC
BEGIN
    DECLARE configValue VARCHAR(50) DEFAULT NULL;

    SELECT
        Config_Value
    INTO
        configValue
    FROM
        System_Configuration
    WHERE
        Config_Key = _configKey;

    RETURN configValue;
END
$$
DELIMITER ;
