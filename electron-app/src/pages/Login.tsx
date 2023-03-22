import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import 'dotenv/config';

if (!process.env.SERVER_URI) {
    throw new Error("SERVER_URI not set");
}

const SERVER_URI = process.env.SERVER_URI;

export function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch(SERVER_URI + "/users/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        console.log(response);
        const data = await response.json();

        if (data.match && !data.error) {
            document.cookie = `token=${data.token}`;
            history("/");
        } else {
            console.log("Error");
        }
    }

    return (
        <div className="loginForm">
            <Header />
            <h1 className="loginh1">Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)}/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Login</button>
            </form>
            <Footer />
        </div>
    );
}