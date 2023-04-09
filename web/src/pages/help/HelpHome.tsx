import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import env from "react-dotenv";
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

if (!env.SERVER_URI || !env.AUTH_TOKEN) {
    throw new Error("Environment variables not set");
}

interface Posts {
    ID: string,
    ID_users: string,
    title: string,
    body: string
};

const SERVER_URI = env.SERVER_URI;

export function HelpHome() {
    const history = useNavigate();
    const [posts, setPosts] = useState<Posts[]>([]);

    async function fetchPosts() {
        const response = await fetch(SERVER_URI + "/posts/");
        const data = await response.json();

        if (data.error) {
            history("/");
        };

        if (data.length > 0) {
            setPosts(data);
        } else {
            setPosts([{ID: "0", ID_users: "0", title: "No posts found", body: ""}]);
        };
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div>
            <Header />
            <h1>Welcome to Moapi's Help Center</h1>
            <h2>Here you can find help from the community</h2>

            <div className="create-post">
                <button onClick={() => history("/help/create")}>Create Post</button>
            </div>

            <div className="posts">
                {posts.map((post) =>
                    <div className="post" key={post.ID}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                        <button onClick={() => history(`/help/post/?id=${post.ID}`)}>View Post</button>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};