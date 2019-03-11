DELIMITER $$
CREATE FUNCTION DoesArtistServiceAddonIdExist
(
	_artistServiceAddonId INT
)
RETURNS SMALLINT
READS SQL DATA
NOT DETERMINISTIC
BEGIN
    IF
    (
        NOT EXISTS
        (
            SELECT
                Artist_Service_Addon.Artist_Service_Addon_Id
            FROM
                Artist_Service_Addon
            WHERE
                Artist_Service_Addon.Artist_Service_Addon_Id = _artistServiceAddonId
        )
    ) THEN 
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END
$$
DELIMITER ;
