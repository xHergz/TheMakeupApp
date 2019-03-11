DELIMITER $$
CREATE FUNCTION DoesServiceTypeIdExist
(
	_serviceTypeId INT
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
                Service_Type.Service_Type_Id
            FROM
                Service_Type
            WHERE
                Service_Type.Service_Type_Id = _serviceTypeId
        )
    ) THEN 
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END
$$
DELIMITER ;
