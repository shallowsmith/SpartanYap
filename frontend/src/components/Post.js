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
