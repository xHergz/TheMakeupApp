CREATE TABLE Consultation
(
    Consultation_Id INT NOT NULL AUTO_INCREMENT,
    Room_Id VARCHAR(256) NOT NULL UNIQUE,
    Artist_Portfolio_Id INT NOT NULL,
    Client_Profile_Id INT NOT NULL,
    Date_Created DATETIME NOT NULL,
    PRIMARY KEY(Consultation_Id),
    FOREIGN KEY(Artist_Portfolio_Id) REFERENCES Artist_Portfolio(Artist_Portfolio_Id),
    FOREIGN KEY(Client_Profile_Id) REFERENCES Client_Profile(Client_Profile_Id)
);
