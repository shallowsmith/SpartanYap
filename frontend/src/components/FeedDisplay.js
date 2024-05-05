import { useState, useEffect } from "react";

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
    <div>
            <h1>Posts</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.postid}>
                        <p>{post.content}</p>
                        <small>{new Date(post.timestamp).toLocaleString()}</small>
                        <p>{`Anonymous`}</p>
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default FeedDisplay;
