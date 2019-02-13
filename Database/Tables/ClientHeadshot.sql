CREATE TABLE Client_Headshot
(
    Client_Headshot_Id INT NOT NULL AUTO_INCREMENT,
    Headshot_Type_Id INT NOT NULL,
    Client_Profile_Id INT NOT NULL,
    Image_Url VARCHAR(2048) NOT NULL,
    PRIMARY KEY(Client_Headshot_Id),
    FOREIGN KEY(Headshot_Type_Id) REFERENCES Headshot_Type(Headshot_Type_Id),
    FOREIGN KEY(Client_Profile_Id) REFERENCES Client_Profile(Client_Profile_Id)
);
