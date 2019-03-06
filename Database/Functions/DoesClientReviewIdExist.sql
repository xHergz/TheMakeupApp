DELIMITER $$
CREATE FUNCTION DoesClientReviewIdExist
(
	_clientReviewId INT
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
                Client_Review_Id
            FROM
                Client_Review
            WHERE
                Client_Review_Id = _clientReviewId
        )
    ) THEN 
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END
$$
DELIMITER ;
