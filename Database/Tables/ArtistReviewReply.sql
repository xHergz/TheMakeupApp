CREATE TABLE Artist_Review_Reply
(
    Artist_Review_Reply_Id INT NOT NULL AUTO_INCREMENT,
    Artist_Review_Id INT NOT NULL,
    Reply VARCHAR(1000),
    PRIMARY KEY(Artist_Review_Reply_Id),
    FOREIGN KEY(Artist_Review_Id) REFERENCES Artist_Review(Artist_Review_Id)
);
