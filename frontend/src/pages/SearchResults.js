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
      <div className="max-w-2xl mx-auto mt-8">
      <h1 className="font-bold text-2xl mb-4 text-center">Search Results for "{searchQuery}"</h1>      
      <div className="flex justify-center px-4">
        <ul className="list-none p-0">
          {searchResults.map(post => (
            <li key={post.id}>
              <div className="border border-gray-300 p-4 mb-4">
                <h2 className="text-xl font-semibold">{post.title}</h2>
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