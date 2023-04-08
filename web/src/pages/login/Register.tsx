import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import env from "react-dotenv";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

if (!env.SERVER_URI || !env.AUTH_TOKEN) {
    throw new Error("Environment variables not set");
}

const SERVER_URI = env.SERVER_URI;

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
        const code = GenerateCode(6);
        const token = GenerateCode(32);

        const response = await fetch(SERVER_URI + "/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": env.AUTH_TOKEN!
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                token: token,
                verification_code: code
            })
        });

        const data = await response.json();

        if (!data.error) {
            document.cookie = `token=${token}`;

            const mail = await fetch(SERVER_URI + "/smtp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": env.AUTH_TOKEN!
                },
                body: JSON.stringify({
                    email: email,
                    code: code
                })
            });

            const mailData = await mail.json();

            if (!mailData.error) {
                history("/verify");
            } else {
                alert("Internal server error, try again later")
            }
        } else {
            console.log("Error");
        }
    }

    return (
        <div>
            <Header />
            <div className="login">
                <h1 className="loginh1">Register</h1>
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
            <Footer />
        </div>
    )
}