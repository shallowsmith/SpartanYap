import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Comment({ postid }) {
  const [comment, setComment] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("You must login to post a comment");
      return;
    }

    if (!comment.trim()) {
      alert("Comment can't be empty");
      return;
    }

    try {
      const data = {
        postid: postid,
        content: comment,
      };

      const url = "https://spartanyapb.onrender.com/add_comment";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Authorization header as expected by the backend
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(url, options);
      if (!response.ok) {
        const jsonData = await response.json();
        throw new Error(jsonData.message || "Failed to add the comment");
      }
      const jsonData = await response.json();
      alert("Comment added successfully!");
      setComment("");
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  };

  if (!token) {
    return (
      <div>
        <p className="text-center">
          You must be logged in to post a comment. Please{" "}
          <a href="/login">login</a>.
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={onSubmit} className="space-y-4 w-3/5">
        <div className="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <label htmlFor="commentContent" className="sr-only">
              Your Comment
            </label>
            <textarea
              id="commentContent"
              rows="4"
              className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="Add a comment..."
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <button
              type="submit"
              className="inline-flex items-center py-2 px-4 text-xs font-medium text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              Add Comment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
