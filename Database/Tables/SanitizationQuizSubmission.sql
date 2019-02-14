CREATE TABLE Sanitization_Quiz_Submission
(
    Sanitization_Quiz_Submission_Id INT NOT NULL AUTO_INCREMENT,
    Artist_Application_Id INT NOT NULL,
    Sanitization_Quiz_Question_Id INT NOT NULL,
    Sanitization_Quiz_Answer_Id INT NOT NULL,
    PRIMARY KEY(Sanitization_Quiz_Submission_Id),
    FOREIGN KEY(Sanitization_Quiz_Question_Id) REFERENCES Sanitization_Quiz_Question(Sanitization_Quiz_Question_Id),
    FOREIGN KEY(Sanitization_Quiz_Answer_Id) REFERENCES Sanitization_Quiz_Answer(Sanitization_Quiz_Answer_Id)
);
