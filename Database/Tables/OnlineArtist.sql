CREATE TABLE Online_Artist
(
    Online_Artist_Id INT NOT NULL AUTO_INCREMENT,
    Artist_Portfolio_Id INT NOT NULL,
    Latitude DOUBLE NOT NULL,
    Longitude DOUBLE NOT NULL,
    Went_Online DATETIME NOT NULL,
    PRIMARY KEY(Online_Artist_Id),
    FOREIGN KEY(Artist_Portfolio_Id) REFERENCES Artist_Portfolio(Artist_Portfolio_Id)
);
