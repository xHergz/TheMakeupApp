CREATE TABLE Artist_Credential
(
    Artist_Credential_Id INT NOT NULL AUTO_INCREMENT,
    Artist_Application_Id INT NOT NULL,
    File_Path VARCHAR(2048) NOT NULL,
    PRIMARY KEY(Artist_Credential_Id),
    FOREIGN KEY(Artist_Application_Id) REFERENCES Artist_Application(Artist_Application_Id)
);
