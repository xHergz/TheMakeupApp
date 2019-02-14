CREATE TABLE Artist_Application
(
    Artist_Application_Id INT NOT NULL AUTO_INCREMENT,
    Application_Date DATETIME NOT NULL,
    Client_Profile_Id INT NOT NULL,
    Resume_Path VARCHAR(2048) NOT NULL,
    Cover_Letter_Path VARCHAR(2048) NOT NULL,
    PRIMARY KEY(Artist_Application_Id),
    FOREIGN KEY(Client_Profile_Id) REFERENCES Client_Profile(Client_Profile_Id)
);
