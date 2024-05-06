import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Comment from "./Comment";
import "./FeedDisplay.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function PostDetail() {
  const { postid } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://spartanyapb.onrender.com/get_post/${postid}` // Changed endpoint
        );
        const data = await response.json();
        if (response.ok) {
          setPost(data);
        } else {
          throw new Error("Post could not be fetched");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }

      try {
        const commentsResponse = await fetch(
          `https://spartanyapb.onrender.com/get_comments/${postid}`
        );
        const commentsData = await commentsResponse.json();
        if (commentsResponse.ok) {
          setComments(commentsData);
        } else {
          throw new Error("Comments could not be fetched");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchPost();
  }, [postid]);

  const goBack = () => {
    navigate(-1);
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className>
      <ul>
        <li key={post.postid} className="post">
          <button className="buttonblue" onClick={goBack}>
            <i className="bi bi-arrow-left-circle"> </i>
          </button>
          <p>{`Anonymous Spartan Yapper`}</p>
          <small className="align-right">
            Uploaded: {new Date(post.timestamp).toLocaleString()}
          </small>
          <p className="post-content">{post.content}</p>
          <div class="bottomPost"></div>
        </li>
      </ul>
      <Comment postid={postid} />

      <div>
        {comments.length > 0 ? (
          <ul>
            {comments.map((comment, index) => (
              <li key={comment.commentid} className="post">
                <p>{`Spartan Comment #${index + 1}`}</p>
                <p className="post-content">{comment.content}</p>
                <small>{new Date(comment.timestamp).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        ) : (
          <div className="post">
            <p>No comments yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostDetail;
