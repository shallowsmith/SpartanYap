import React, { useState, useContext } from "react";

export default function Post({ updateCallback }) {

  const [postContent, setPostContent] = useState('');
  const token = localStorage.getItem('token');


  const onSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("You must login to post");
      return;
    }

    const data = {
      content: postContent,
    };
    const url = "http://127.0.0.1:5000/create_post"; // Static URL for creating posts
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`  // Include the token in the authorization header
      },
      body: JSON.stringify(data)
    };
    console.log(postContent)

    try {
      const response = await fetch(url, options);
      if (!response.ok) 
      {
        const jsonData = await response.json();
        throw new Error(jsonData.message || 'Failed to create the post');
      }
      updateCallback();   // Callback to refresh or update the parent component
      alert('Post created successfully!');
    } 
    catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="postContent">Post</label>
        <input
          type="text"
          id="postContent"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="What's on your mind?"
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
}
