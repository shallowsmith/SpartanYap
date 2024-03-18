-- Users Table
CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(255),
    HashedPassword VARCHAR(255),
    Email VARCHAR(255),
    SignUpDate DATETIME
);

-- Posts Table
CREATE TABLE Posts (
    PostID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    Content TEXT,
    Timestamp DATETIME,
    AnonymousFlag BOOLEAN,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Comments Table
CREATE TABLE Comments (
    CommentID INT AUTO_INCREMENT PRIMARY KEY,
    PostID INT,
    UserID INT,
    Content TEXT,
    Timestamp DATETIME,
    FOREIGN KEY (PostID) REFERENCES Posts(PostID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Reactions Table
CREATE TABLE Reactions (
    ReactionID INT AUTO_INCREMENT PRIMARY KEY,
    PostID INT,
    UserID INT,
    Type ENUM('Like', 'Dislike'),
    Timestamp DATETIME,
    FOREIGN KEY (PostID) REFERENCES Posts(PostID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Tags Table
CREATE TABLE Tags (
    TagID INT AUTO_INCREMENT PRIMARY KEY,
    TagName VARCHAR(255)
);

-- PostTags Table
CREATE TABLE PostTags (
    PostID INT,
    TagID INT,
    FOREIGN KEY (PostID) REFERENCES Posts(PostID),
    FOREIGN KEY (TagID) REFERENCES Tags(TagID)
);