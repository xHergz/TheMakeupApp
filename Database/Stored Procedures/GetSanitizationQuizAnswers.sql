DELIMITER $$
CREATE PROCEDURE GetSanitizationQuizAnswers
(
    IN _sanitizationQuestionId VARCHAR(50),
    OUT _status SMALLINT
)
BEGIN
    DECLARE SANITIZATION_QUIZ_QUESTION_ID_DOES_NOT_EXIST SMALLINT DEFAULT 1050;

    GetSanitizationQuizAnswers:BEGIN
		IF (!DoesSanitizationQuizQuestionIdExist(_sanitizationQuestionId)) THEN
			SET _status = SANITIZATION_QUIZ_QUESTION_ID_DOES_NOT_EXIST;
			LEAVE GetSanitizationQuizAnswers;
		END IF;

        SET _status = 0;
    END;

    SELECT
        Sanitization_Quiz_Answer.Sanitization_Quiz_Answer_Id,
        Sanitization_Quiz_Answer.Answer
    FROM
        Sanitization_Quiz_Answer
    WHERE
        Sanitization_Quiz_Answer.Sanitization_Quiz_Question_Id = _sanitizationQuestionId;
END
$$
DELIMITER ;