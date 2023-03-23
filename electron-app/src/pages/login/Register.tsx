import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'dotenv/config';

if (!process.env.SERVER_URI || !process.env.AUTH_TOKEN) {
    throw new Error("Environment variables not set");
}

const SERVER_URI = process.env.SERVER_URI;

function GenerateCode(lenght: number) {
    let code = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < lenght; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return code;
}

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
        const response = await fetch(SERVER_URI + "/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": process.env.AUTH_TOKEN!
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                verification_code: GenerateCode(6)
            })
        });

        const data = await response.json();

        if (!data.error) {
            document.cookie = `token=${data.token}`;
            history("/verify");
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