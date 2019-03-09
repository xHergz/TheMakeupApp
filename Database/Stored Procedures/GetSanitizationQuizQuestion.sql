DELIMITER $$
CREATE PROCEDURE GetSanitizationQuizQuestion
(
    IN _sanitizationQuestionId VARCHAR(50),
    OUT _status SMALLINT
)
BEGIN
    DECLARE SANITIZATION_QUIZ_QUESTION_ID_DOES_NOT_EXIST SMALLINT DEFAULT 1050;

    GetSanitizationQuizQuestion:BEGIN
		IF (!DoesSanitizationQuizQuestionIdExist(_sanitizationQuestionId)) THEN
			SET _status = SANITIZATION_QUIZ_QUESTION_ID_DOES_NOT_EXIST;
			LEAVE GetSanitizationQuizQuestion;
		END IF;

        SET _status = 0;
    END;

    SELECT
        Sanitization_Quiz_Question.Sanitization_Quiz_Question_Id,
        Sanitization_Quiz_Question.Question
    FROM
        Sanitization_Quiz_Question
    WHERE
        Sanitization_Quiz_Question.Sanitization_Quiz_Question_Id = _sanitizationQuestionId;
END
$$
DELIMITER ;