// Placeholder for now
import React from "react";
import Post from "../components/Post";
import FeedDisplay from "../components/FeedDisplay";

export default function FeedPage() {
  return (
    <div>
      <h1 className="font-bold text-2xl mb-4 mt-5 text-center">Create your post</h1>
      <Post></Post>
      <FeedDisplay> </FeedDisplay>
    </div>
  )

};

