-- Creating Database 
CREATE DATABASE QuickPost;

-- Creating Users Table
CREATE TABLE Users(
    User_ID     SERIAL PRIMARY KEY,
    User_Name   VARCHAR(40) UNIQUE NOT NULL,
    User_Pass   VARCHAR(150) NOT NULL,
    User_Role   INTEGER NOT NULL
);

-- Creating Refresh Token Table
CREATE TABLE Refreshtokens(
    User_ID         INTEGER PRIMARY KEY,
    Refresh_Token   VARCHAR(500),
    FOREIGN KEY (User_ID) REFERENCES Users(User_ID)
);

-- Creating Posts Table
CREATE TABLE Userposts(
    Post_ID         SERIAL PRIMARY KEY,
    User_ID         INTEGER,
    Post_Data       VARCHAR(500),
    Post_Time       VARCHAR(50),
    FOREIGN KEY (User_ID) REFERENCES Users(User_ID)
)