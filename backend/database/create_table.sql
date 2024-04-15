-- Users Table
CREATE TABLE Users (
    UserID SERIAL PRIMARY KEY,
    Username VARCHAR(255),
    Password VARCHAR(255),
    Email VARCHAR(255),
    SignUpDate TIMESTAMP
);

-- Posts Table
CREATE TABLE Posts (
    PostID SERIAL PRIMARY KEY,
    UserID INT,
    Content TEXT,
    Timestamp TIMESTAMP,
    AnonymousFlag BOOLEAN,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Comments Table
CREATE TABLE Comments (
    CommentID SERIAL PRIMARY KEY,
    PostID INT,
    UserID INT,
    Content TEXT,
    Timestamp TIMESTAMP,
    FOREIGN KEY (PostID) REFERENCES Posts(PostID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Reactions Table
CREATE TABLE Reactions (
    ReactionID SERIAL PRIMARY KEY,
    PostID INT,
    UserID INT,
    Type TEXT CHECK (Type IN ('Like', 'Dislike')),
    Timestamp TIMESTAMP,
    FOREIGN KEY (PostID) REFERENCES Posts(PostID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Tags Table
CREATE TABLE Tags (
    TagID SERIAL PRIMARY KEY,
    TagName VARCHAR(255)
);

-- PostTags Table
CREATE TABLE PostTags (
    PostID INT,
    TagID INT,
    FOREIGN KEY (PostID) REFERENCES Posts(PostID),
    FOREIGN KEY (TagID) REFERENCES Tags(TagID)
);
