DELIMITER $$
CREATE FUNCTION DoesSanitizationQuizAnswerBelongToQuestion
(
	_sanitizationAnswerId INT,
    _sanitizationQuestionId INT
)
RETURNS SMALLINT
READS SQL DATA
NOT DETERMINISTIC
BEGIN
    DECLARE questionIdLinkedToAnswer INT DEFAULT NULL;

    SELECT
        Sanitization_Quiz_Question_Id
    INTO
        questionIdLinkedToAnswer
    FROM
        Sanitization_Quiz_Answer
    WHERE
        Sanitization_Quiz_Answer.Sanitization_Quiz_Answer_Id = _sanitizationAnswerId;

    IF (questionIdLinkedToAnswer IS NOT NULL AND questionIdLinkedToAnswer = _sanitizationQuestionId) THEN
        RETURN TRUE;
    END IF;
    
    RETURN FALSE;
END
$$
DELIMITER ;
