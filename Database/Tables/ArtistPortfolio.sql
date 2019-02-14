CREATE TABLE Artist_Portfolio
(
    Artist_Portfolio_Id INT NOT NULL AUTO_INCREMENT,
    User_Id INT NOT NULL,
    Profile_Picture_Url VARCHAR(2048) NOT NULL,
    Biography VARCHAR(500) NOT NULL,
    PRIMARY KEY(Artist_Portfolio_Id),
    FOREIGN KEY(User_Id) REFERENCES User(User_Id)
);
