DELIMITER $$
CREATE FUNCTION DoesMakeoverTypeIdExist
(
	_makeoverTypeId INT
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
                Makeover_Type.Makeover_Type_Id
            FROM
                Makeover_Type
            WHERE
                Makeover_Type.Makeover_Type_Id = _makeoverTypeId
        )
    ) THEN 
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END
$$
DELIMITER ;
