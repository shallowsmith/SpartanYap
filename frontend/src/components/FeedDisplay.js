import { useState, useEffect } from "react";
import "./FeedDisplay.css" 
import 'bootstrap-icons/font/bootstrap-icons.css';

function FeedDisplay()
{
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async() => {
            try {
                const response = await fetch('http://127.0.0.1:5000/get_posts',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log('Status Code:', response.status, 'Status Text:', response.statusText);
                if (!response.ok)
                {
                    throw new Error('Failed to connect to backend')

                }
                const posts = await response.json()
                setPosts(posts)
            }
            catch (error)
            {
                console.log(error)
            }
        };
    

    fetchPosts();
}, []);

return (
    <div className = "posts">
            <ul>
                {posts.map(post => (
                    <li key={post.postid} className="post">
                        <p>{`Anonymous`}</p>
                        <small>{new Date(post.timestamp).toLocaleString()}</small>
                        <p>{post.content}</p>
                        <div class = "bottomPost">
                        <button className="commentButton">
                                <i className="bi bi-chat-right-text"></i> 
                            </button>
                            <button className="likeButton">
                                <i className="bi bi-hand-thumbs-up"></i> 
                            </button>
                            <button className="dislikeButton">
                                <i className="bi bi-hand-thumbs-down"></i> 
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default FeedDisplay;
