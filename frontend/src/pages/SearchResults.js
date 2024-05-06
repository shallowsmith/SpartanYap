import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./SearchDisplay.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch search results from the backend
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `https://spartanyapb.onrender.com/search_posts?query=${encodeURIComponent(
            searchQuery
          )}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery]);

  const handleCommentClick = (postid) => {
    navigate(`/post/${postid}`);
  };

  return (
    <div className>
      <h1 className="font-bold text-2xl mb-4 mt-8 text-center">
        Search Results for "{searchQuery}"
      </h1>
      <div className>
        <ul>
          {searchResults.map((post) => (
            <li key={post.postid} className="post">
              <p>{`Anonymous Spartan Yapper`}</p>
              <small className="align-right">
                Uploaded: {new Date(post.timestamp).toLocaleString()}
              </small>
              <p className="post-content">{post.content}</p>
              <div class="bottomPost">
                <button
                  className="commentButton"
                  onClick={() => handleCommentClick(post.postid)}
                >
                  <i className="bi bi-chat-right-text"></i>
                </button>
                <button className="likeButton">
                  <i className="bi bi-hand-thumbs-up"></i>
                </button>
                <button className="dislikeButton">
                  <i className="bi bi-hand-thumbs-down"></i>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchResults;
