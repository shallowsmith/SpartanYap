// Placeholder for now
import React from "react";
import { useState } from "react";

export default function Post({ existingUser = {}, updateCallback}) {
  const [post, setPost] = useState(existingUser.post || "");
  const onSubmit = async (e) => {
    e.preventDefault()

    //Determine if we are updating
    const updating = Object.entries(existingUser).length !== 0

    const data = {
      postMessage
    }
     const url = "http://127.0.0.1:5000/" + (updating ? `update_post/${existingUser.post}` : "create_post")
     const options = {
            method: updating ? "PATCH" : "POST",
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
  }

  return (
    <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="postMessage">Post</label>
                <input
                    type="text"
                    id="postContent"
                    value={postMessage}
                    onChange={(e) => setPost(e.target.value)}
                />
            </div>
            <button type="submit">{existingUser.post ? "Update" : "Create"}</button>
      </form>
  );
}
