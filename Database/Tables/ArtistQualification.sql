CREATE TABLE Artist_Qualification
(
    Artist_Qualification_Id INT NOT NULL AUTO_INCREMENT,
    Artist_Portfolio_Id INT NOT NULL,
    Year_Obtained SMALLINT NOT NULL,
    Description VARCHAR(250) NOT NULL,
    PRIMARY KEY(Artist_Qualification_Id),
    FOREIGN KEY(Artist_Portfolio_Id) REFERENCES Artist_Portfolio(Artist_Portfolio_Id)
);
