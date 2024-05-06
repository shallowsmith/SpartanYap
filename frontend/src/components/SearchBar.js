import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Redirect to the search results page component with the search query
    navigate(`/searchresults/${encodeURIComponent(searchQuery)}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-4 lg:gap-3">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="py-1.5 px-3 bg-blue-gray-100 rounded-md text-sm focus:outline-none focus:ring focus:border-blue-gray-400 hidden lg:block"
      />
        <button type="submit" className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-600" style={{ backgroundImage: "linear-gradient(to right, black, black)", fontFamily: "'Helvetica', sans-serif", fontWeight: "bold" }}>
        Search
        </button>
    </form>
  );
};

export default SearchBar;
