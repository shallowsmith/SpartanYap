import React from 'react';

const SearchResults = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {posts.length === 0 ? (
        <p className="text-center">No results found.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600">{post.body}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchResults;
