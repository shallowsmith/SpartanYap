import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from 'react';

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    // Fetch posts from the database or an API endpoint
    const fetchPosts = async () => {
      try {
        // Replace this with your actual API call to fetch posts
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?q=${encodeURIComponent(searchQuery)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        const filteredPosts = data.filter(post =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.body.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filteredPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    if (searchQuery) {
      fetchPosts();
    }
  }, [searchQuery]);

    return (
    <div>
      <h1>Search Results for "{searchQuery}"</h1>
      <ul>
        {searchResults.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
  
  export default SearchResults;