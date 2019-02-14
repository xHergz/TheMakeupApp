CREATE TABLE Artist_Review
(
    Artist_Review_Id INT NOT NULL AUTO_INCREMENT,
    Artist_Portfolio_Id INT NOT NULL,
    Client_Profile_Id INT NOT NULL,
    Rating TINYINT NOT NULL,
    Review VARCHAR(1000) NOT NULL,
    PRIMARY KEY(Artist_Review_Id),
    FOREIGN KEY(Artist_Portfolio_Id) REFERENCES Artist_Portfolio(Artist_Portfolio_Id),
    FOREIGN KEY(Client_Profile_Id) REFERENCES Client_Profile(Client_Profile_Id)
);
