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

interface User {
    ID: string;
    username: string;
    password: string;
    email: string;
    token: string;
    verified: number;
    verification_code: string;
}

const SERVER_URI = env.SERVER_URI;

export function HelpHome() {
    const history = useNavigate();
    const [posts, setPosts] = useState<Posts[]>([]);
    const [users, setUsers] = useState<User[]>([]);

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

    async function fetchUsers() {
        const response = await fetch(SERVER_URI + "/users/");
        const data = await response.json();

        console.log(data);

        if (data.error) {
            history("/");
        } else {
            setUsers(data.result);
        };
    }

    useEffect(() => {
        fetchPosts();
        fetchUsers();
    }, []);

    function compareUserID(postUserID: string) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].ID === postUserID) {
                return users[i].username;
            };
        }
    }

    return (
        <div>
            <Header />
            <div className='help-home'>
                <h1>Welcome to Moapi's Help Center</h1>
                <h2>Here you can find help from the community</h2>

                <div className="create-post">
                    <button onClick={() => history("/help/create")}>Create Post</button>
                </div>

                <div className="posts">
                    {posts.map((post) =>
                        <div className="post" key={post.ID} onClick={
                            () => history(`/help/post/?id=${post.ID}`)
                        }>
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                            <p>Posted by: {compareUserID(post.ID_users)}</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};