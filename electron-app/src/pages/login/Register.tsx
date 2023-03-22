import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'dotenv/config';

if (!process.env.SERVER_URI) {
    throw new Error("SERVER_URI not set");
}

const SERVER_URI = process.env.SERVER_URI;

export function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useNavigate();

    useEffect(() => {
        if (document.cookie.includes("token")) {
            history("/");
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch(SERVER_URI + "/users/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (data.match && !data.error) {
            document.cookie = `token=${data.token}`;
            history("/");
        } else {
            console.log("Error");
        }
    }

    return (
        <div className="registerForm">
            <h1 className="registerh1">Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)}/>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}