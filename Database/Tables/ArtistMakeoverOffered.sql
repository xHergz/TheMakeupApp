CREATE TABLE Artist_Makeover_Offered
(
    Artist_Makeover_Offered_Id INT NOT NULL AUTO_INCREMENT,
    Artist_Portfolio_Id INT NOT NULL,
    Makeover_Type_Id INT NOT NULL,
    PRIMARY KEY(Artist_Makeover_Offered_Id),
    FOREIGN KEY(Artist_Portfolio_Id) REFERENCES Artist_Portfolio(Artist_Portfolio_Id),
    FOREIGN KEY(Makeover_Type_Id) REFERENCES Makeover_Type(Makeover_Type_Id)
);
