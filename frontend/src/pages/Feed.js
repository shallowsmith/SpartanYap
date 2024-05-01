// Placeholder for now
import React from "react";
import { useState, useContext } from "react";
import Post from "../components/Post";

export default function FeedPage({posts, updateCallback}) {
  const [newPostContent, setNewPostContent] = useState()
  const {currentUser} = true

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!currentUser)
    {
      alert("You must login to post")
      return;
    }
    const data = {
      content: newPostContent,
      userId: currentUser.id
    }
    //Determine if we are updating
     const url = "http://127.0.0.1:5000/" + (newPostContent ? `update_post/${currentUser.post}` : "create_post")
     const options = {
            method: newPostContent ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        } 
        else
        {
          updateCallback()
        }

        try {
          const response = await fetch(url, options);
          const jsonData = await response.json();
          if (!response.ok) {
            throw new Error(jsonData.message || 'Failed to post');
          }
          setNewPostContent(""); // Clear the input on successful post/patch
          alert('Post successful!');
        } 
        catch (error) {
          alert(error.message);
        }
  }

  return (
    <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="postMessage">Post</label>
                <input
                    type="text"
                    id="postContent"
                    value={postMessage}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder = "What's on your mind?"
                />
            </div>
            <button type="submit">{newPostContent ? "Update" : "Create"}</button>
      </form>
  );
};

