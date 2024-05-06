import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    // Fetch search results from the backend
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `/search_posts?query=${encodeURIComponent(searchQuery)}`
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

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="font-bold text-2xl mb-4 text-center">
        Search Results for "{searchQuery}"
      </h1>
      <div className="flex justify-center px-4">
        <ul className="list-none p-0">
          {searchResults.map((post) => (
            <li key={post.postid}>
              <div className="border border-gray-300 p-4 mb-4">
                <h2 className="text-xl font-semibold">{post.content}</h2>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchResults;
