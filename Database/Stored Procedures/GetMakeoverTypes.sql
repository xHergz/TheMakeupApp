DELIMITER $$
CREATE PROCEDURE GetMakeoverTypes
(
    OUT _status SMALLINT
)
BEGIN
    GetMakeoverTypes:BEGIN
        SET _status = 0;
    END;

    SELECT
        Makeover_Type_Id,
        Description AS Makeover_Type_Description
    FROM
        Makeover_Type;
END
$$
DELIMITER ;