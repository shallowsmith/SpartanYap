import { useState, useEffect } from "react";

function FeedDisplay() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log('Status Code:', response.status, 'Status Text:', response.statusText);
                if (!response.ok) {
                    throw new Error('Failed to connect to backend');
                }
                const posts = await response.json();
                setPosts(posts);
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchPosts();
    }, []);

    return (
        <div className="max-w-md mx-auto mt-8">
            <h1 className="font-bold text-2xl border-b border-gray-300 pb-2 mb-4 text-center">The yappening</h1>
            {posts.map(post => (
                <div key={post.postid} className="border-b border-gray-300 pb-4 mb-4">
                    <p>{post.content}</p>
                    <small>{new Date(post.timestamp).toLocaleString()}</small>
                    <p>{`Anonymous`}</p>
                </div>
            ))}
        </div>
    );
}

export default FeedDisplay;
