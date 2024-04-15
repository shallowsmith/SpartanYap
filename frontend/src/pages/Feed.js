// Placeholder for now

import React from "react";
import Post from "../components/Post";

export default function FeedPage() {
  const posts = [
    { id: 1, title: "Hello", content: "This is a simple text post." },
    { id: 2, title: "SpartanYap", content: "This is a simple text post." },
    { id: 3, title: "SpartanYap3", content: "CMPE131" },
  ];

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} title={post.title} content={post.content} />
      ))}
    </div>
  );
}
