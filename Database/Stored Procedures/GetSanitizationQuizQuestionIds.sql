DELIMITER $$
CREATE PROCEDURE GetSanitizationQuizQuestionIds
(
    OUT _status SMALLINT
)
BEGIN
    GetSanitizationQuizQuestionIds:BEGIN
        SET _status = 0;
    END;

    SELECT
        Sanitization_Quiz_Question_Id
    FROM
        Sanitization_Quiz_Question;
END
$$
DELIMITER ;