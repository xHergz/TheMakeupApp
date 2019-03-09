DELIMITER $$
CREATE FUNCTION DoesSanitizationQuizAnswerIdExist
(
	_sanitizationQuizAnswerId INT
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
                Sanitization_Quiz_Answer_Id
            FROM
                Sanitization_Quiz_Answer
            WHERE
                Sanitization_Quiz_Answer.Sanitization_Quiz_Answer_Id = _sanitizationQuizAnswerId
        )
    ) THEN 
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END
$$
DELIMITER ;
