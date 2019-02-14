CREATE TABLE Sanitization_Quiz_Answer
(
    Sanitization_Quiz_Answer_Id INT NOT NULL AUTO_INCREMENT,
    Sanitization_Quiz_Question_Id INT NOT NULL,
    Answer VARCHAR(500) NOT NULL,
    Is_Correct BOOLEAN NOT NULL,
    PRIMARY KEY(Sanitization_Quiz_Answer_Id),
    FOREIGN KEY(Sanitization_Quiz_Question_Id) REFERENCES Sanitization_Quiz_Question(Sanitization_Quiz_Question_Id) 
);
