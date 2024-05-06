import React, { useState } from "react";

export default function Post() {
  const [postContent, setPostContent] = useState("");
  const token = localStorage.getItem("token");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("You must login to post");
      return;
    }

    if (!postContent.trim()) {
      alert("Post can't be empty");
      return;
    }

    try {
      const data = {
        content: postContent,
      };

      const url = "http://127.0.0.1:5000/create_post"; // Static URL for creating posts
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the authorization header
        },
        body: JSON.stringify(data),
      };
      console.log(postContent);
      const response = await fetch(url, options);
      console.log(JSON.stringify(response));
      if (!response.ok) {
        const jsonData = await response.json();
        throw new Error(jsonData.message || "Failed to create the post");
      }
      const jsonData = await response.json();
      alert("Post created successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  if (!token) {
    return (
      <div>
        <p>
          You must be logged in to create a post. Please{" "}
          <a href="/login">login</a>.
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={onSubmit} className="space-y-4 w-3/5 mt-7 mb-7">
        <div className="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <label htmlFor="postContent" className="sr-only">
              Your Post
            </label>
            <textarea
              id="postContent"
              rows="4"
              className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="What's on your mind yapper?"
              required
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            ></textarea>
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <button
              type="submit"
              className="inline-flex items-center py-2 px-4 text-xs font-medium text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              YAP ON!
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
