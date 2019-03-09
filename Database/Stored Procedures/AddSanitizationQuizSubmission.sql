DELIMITER $$
CREATE PROCEDURE AddSanitizationQuizSubmission
(
	IN _artistApplicationId INT,
    IN _questionId INT,
    IN _answerId INT,
    OUT _status SMALLINT
)
BEGIN
    DECLARE SANITIZATION_QUIZ_QUESTION_ID_DOES_NOT_EXIST SMALLINT DEFAULT 1050;
    DECLARE SANITIZATION_QUIZ_ANSWER_ID_DOES_NOT_EXIST SMALLINT DEFAULT 1051;
    DECLARE SANITIZATION_QUIZ_ANSWER_DOES_NOT_BELONG_TO_QUESTION SMALLINT DEFAULT 1052;
    DECLARE ARTIST_APPLICATION_DOES_NOT_EXIST SMALLINT DEFAULT 1060;

    AddSanitizationQuizSubmission:BEGIN
        IF (!DoesArtistApplicationIdExist(_artistApplicationId)) THEN
            SET _status = ARTIST_APPLICATION_DOES_NOT_EXIST;
            LEAVE AddSanitizationQuizSubmission;
        END IF;

        IF (!DoesSanitizationQuizQuestionIdExist(_questionId)) THEN
            SET _status = SANITIZATION_QUIZ_QUESTION_ID_DOES_NOT_EXIST;
            LEAVE AddSanitizationQuizSubmission;
        END IF;

        IF (!DoesSanitizationQuizAnswerIdExist(_answerId)) THEN
            SET _status = SANITIZATION_QUIZ_ANSWER_ID_DOES_NOT_EXIST;
            LEAVE AddSanitizationQuizSubmission;
        END IF;

        IF (!DoesSanitizationQuizAnswerBelongToQuestion(_answerId, _questionId)) THEN
            SET _status = SANITIZATION_QUIZ_ANSWER_DOES_NOT_BELONG_TO_QUESTION;
            LEAVE AddSanitizationQuizSubmission;
        END IF;
        
        INSERT INTO Sanitization_Quiz_Submission(Artist_Application_Id, Sanitization_Quiz_Question_Id, Sanitization_Quiz_Answer_Id) VALUES
        (_artistApplicationId, _questionId, _answerId);
        SET _status = 0;
    END;
END
$$
DELIMITER ;