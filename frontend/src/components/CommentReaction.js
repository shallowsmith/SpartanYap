import { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

function CommentReaction({ postid, userId }) {
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const [userReaction, setUserReaction] = useState(null);

  useEffect(() => {
    const fetchReaction = async () => {
      if (!token) {
        return;
      }
      try {
        console.log(
          `Fetching reaction for userId=${userId} and postid=${postid}`
        );
        const response = await fetch(
          `http://127.0.0.1:5000/get_reaction?userId=${userId}&postid=${postid}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          setUserReaction(data.type);
        }
      } catch (error) {
        console.error("Failed to fetch reaction:", error);
      }
    };
    fetchReaction();
  }, [postid, userId, token]);

  const handleReaction = async (type) => {
    const reactionData = {
      userId: userId,
      postid: postid,
      type: type, // 'Like' or 'Dislike'
    };
    if (!token) {
      alert("You must login to react");
      return;
    }

    try {
      const response = await fetch(
        "https://spartanyapb.onrender.com/toggle_reaction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(reactionData),
        }
      );
      console.log(postid);
      console.log(type);
      console.log(userId);

      if (response.ok) {
        const data = await response.json();
        setMessage("Reaction added successfully");
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to add reaction");
      }
    } catch (error) {
      console.error("Failed to send reaction:", error);
      setMessage("Failed to add reaction");
    }
  };

  return (
    <div>
      <i className="d-flex justify-content-start align-items-center">
        <button
          onClick={() => handleReaction("Like")}
          className={userReaction === "Like" ? "btn-selected" : ""}
        >
          <i className="bi bi-hand-thumbs-up"></i>
        </button>
        <button
          onClick={() => handleReaction("Dislike")}
          className={userReaction === "Dislike" ? "btn-selected" : ""}
        >
          <i className="bi bi-hand-thumbs-down"></i>
        </button>
      </i>
    </div>
  );
}

export default CommentReaction;
