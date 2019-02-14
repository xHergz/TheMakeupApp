CREATE TABLE Artist_Portfolio_Picture
(
    Artist_Portfolio_Picture_Id INT NOT NULL AUTO_INCREMENT,
    Artist_Portfolio_Id INT NOT NULL,
    Makeover_Type_Id INT NOT NULL,
    Image_Path VARCHAR(2048) NOT NULL,
    Date_Added DATETIME NOT NULL,
    PRIMARY KEY(Artist_Portfolio_Picture_Id),
    FOREIGN KEY(Artist_Portfolio_Id) REFERENCES Artist_Portfolio(Artist_Portfolio_Id),
    FOREIGN KEY(Makeover_Type_Id) REFERENCES Makeover_Type(Makeover_Type_Id)
);
