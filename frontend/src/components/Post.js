import React, { useState } from "react";

export default function Post() {

  const [postContent, setPostContent] = useState('');
  const token = localStorage.getItem('token');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("You must login to post");
      return;
    }

    if (!postContent.trim())
    {
      alert("Post can't be empty")
      return;
    }

    try {
    const data = {
      content: postContent,
    }

    const url = "http://127.0.0.1:5000/create_post"; // Static URL for creating posts
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`  // Include the token in the authorization header
      },
      body: JSON.stringify(data)
    }
      console.log(postContent)
      const response = await fetch(url, options);
      console.log(JSON.stringify(response));
      if (!response.ok) 
      {
        const jsonData = await response.json();
        throw new Error(jsonData.message || 'Failed to create the post');
      }
      const jsonData = await response.json();
      alert('Post created successfully!');
    } 
    catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto mt-2 border border-gray-300 p-4">
      <div className="mb-4">
        <label htmlFor="postContent" className="block text-gray-700">Post</label>
        <input
          type="text"
          id="postContent"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="What's on your mind?"
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <button 
        type="submit" 
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
      >
        Create
      </button>
    </form>
  );
}
