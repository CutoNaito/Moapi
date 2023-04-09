import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import env from "react-dotenv";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

if (!env.SERVER_URI || !env.AUTH_TOKEN) {
    throw new Error("Environment variables not set");
};

const SERVER_URI = env.SERVER_URI;

export function HelpPost() {
    const history = useNavigate();
    const [searchParams] = useSearchParams();
    const postID = searchParams.get("id");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [userID, setUserID] = useState("");
    const [postUserID, setPostUserID] = useState("");

    async function fetchPost() {
        const response = await fetch(SERVER_URI + `/posts/${postID}`);
        const data = await response.json();

        console.log(data);

        if (data.error) {
            history("/help");
        } else {
            setTitle(data[0].title);
            setBody(data[0].body);
            setPostUserID(data[0].ID_user);
        };
    };

    async function fetchUser() {
        const response = await fetch(SERVER_URI + "/users/token/" + document.cookie.split("=")[1]);
        const data = await response.json();

        if (data.error) {
            history("/login");
        } else {
            setUserID(data.result.ID);
        };
    };

    async function deletePost() {
        const response = await fetch(SERVER_URI + `/posts/${postID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": env.AUTH_TOKEN!
            }
        });

        const data = await response.json();

        if (data.error) {
            alert("Something went wrong");
        } else {
            history("/help");
        };
    }

    useEffect(() => {
        fetchPost();
        fetchUser();
    }, []);

    return (
        <div>
            <Header />
            <div className="post">
                {userID === postUserID && <button onClick={deletePost}>Delete post</button>}
                <h1>{title}</h1>
                <p>{body}</p>
            </div>
            <Footer />
        </div>
    );
}