CREATE TABLE Artist_Review_Picture_Link
(
    Artist_Review_Id INT NOT NULL,
    Artist_Portfolio_Picture_Id INT NOT NULL,
    PRIMARY KEY(Artist_Review_Id, Artist_Portfolio_Picture_Id)
);
