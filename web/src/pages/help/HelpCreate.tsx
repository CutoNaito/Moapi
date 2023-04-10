import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import env from "react-dotenv";

if (!env.SERVER_URI || !env.AUTH_TOKEN) {
    throw new Error("Environment variables not set");
}

const SERVER_URI = env.SERVER_URI;

export function HelpCreate() {
    const history = useNavigate();
    const [userID, setUserID] = useState("");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    async function fetchUser() {
        const response = await fetch(SERVER_URI + "/users/token/" + document.cookie.split("=")[1]);
        const data = await response.json();

        if (data.error) {
            history("/login");
        } else {
            setUserID(data.result.ID);
        };
    }

    useEffect(() => {
        if (!document.cookie.includes("token")) {
            history("/login");
        }

        fetchUser();
    }, []);

    const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await fetch(SERVER_URI + "/posts/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": env.AUTH_TOKEN!
            },
            body: JSON.stringify({
                user_id: userID,
                title: title,
                body: body
            })
        })

        const data = await response.json();

        if (data.error) {
            alert("Something went wrong");
        } else {
            history("/help");
        }
    }

    return (
        <div>
            <div className="help-create">
                <h1>Create a post</h1>
                <form onSubmit={handleSumbit}>
                    <input type="text" placeholder="Title" onChange={
                        (e) => {
                            setTitle(e.target.value);
                        }
                    } />

                    <textarea placeholder="Content" onChange={
                        (e) => {
                            setBody(e.target.value);
                        }
                    } />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}