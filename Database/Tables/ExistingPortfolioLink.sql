CREATE TABLE Existing_Portfolio_Link
(
    Existing_Portfolio_Link_Id INT NOT NULL AUTO_INCREMENT,
    Artist_Application_Id INT NOT NULL,
    Link VARCHAR(2048) NOT NULL,
    PRIMARY KEY(Existing_Portfolio_Link_Id),
    FOREIGN KEY(Artist_Application_Id) REFERENCES Artist_Application(Artist_Application_Id)
);
