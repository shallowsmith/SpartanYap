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
      <h1 style={{ textAlign: 'center', marginTop: '10px', marginBottom: '10px'}}><strong>Search Results for "{searchQuery}"</strong></h1>      
      <div style={{ display: 'flex', justifyContent: 'center', padding: '0 20px' }}>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {searchResults.map(post => (
            <li key={post.id}>
              {/* Wrapped post content in a bordered box */}
              <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                <h2 style={{ fontSize: '1.5em' }}>{post.title}</h2>
                <p>{post.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
  
  export default SearchResults;