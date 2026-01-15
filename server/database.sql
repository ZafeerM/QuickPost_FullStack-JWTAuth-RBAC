-- Creating Database 
CREATE DATABASE QuickPost;

-- Creating Users Table
CREATE TABLE Users(
    User_ID     SERIAL PRIMARY KEY,
    User_Name   VARCHAR(40) UNIQUE,
    User_Pass   VARCHAR(150),
    User_Role   INTEGER
);
