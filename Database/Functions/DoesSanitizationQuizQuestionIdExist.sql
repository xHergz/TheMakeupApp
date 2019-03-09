DELIMITER $$
CREATE FUNCTION DoesSanitizationQuizQuestionIdExist
(
	_sanitizationQuizQuestionId INT
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
                Sanitization_Quiz_Question_Id
            FROM
                Sanitization_Quiz_Question
            WHERE
                Sanitization_Quiz_Question.Sanitization_Quiz_Question_Id = _sanitizationQuizQuestionId
        )
    ) THEN 
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END
$$
DELIMITER ;
