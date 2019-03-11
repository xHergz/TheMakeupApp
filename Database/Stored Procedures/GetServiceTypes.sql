DELIMITER $$
CREATE PROCEDURE GetServiceTypes
(
    OUT _status SMALLINT
)
BEGIN
    GetServiceTypes:BEGIN
        SET _status = 0;
    END;

    SELECT
        Service_Type_Id,
        Description AS Service_Type_Description
    FROM
        Service_Type;
END
$$
DELIMITER ;