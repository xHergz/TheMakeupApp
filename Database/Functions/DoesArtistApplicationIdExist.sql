DELIMITER $$
CREATE FUNCTION DoesArtistApplicationIdExist
(
	_artistApplicationId INT
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
                Artist_Application_Id
            FROM
                Artist_Application
            WHERE
                Artist_Application_Id = _artistApplicationId
        )
    ) THEN 
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END
$$
DELIMITER ;
