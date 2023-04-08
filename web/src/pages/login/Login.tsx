import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import env from "react-dotenv";

if (!env.SERVER_URI || !env.AUTH_TOKEN) {
    throw new Error("Environment variables not set");
}

const SERVER_URI = env.SERVER_URI;

export function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useNavigate();

    useEffect(() => {
        if (document.cookie.includes("token")) {
            history("/");
        }
    }, []);

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

        const token = data.result[0].token;

        if (token === undefined) {
            alert("Error");
        } else {
            if (data.match && !data.error) {
                document.cookie = `token=${token}`;
                history("/");
            } else {
                console.log("Error");
            }
        }
    }

    return (
        <div>
            <Header />
            <div className="login">
                <h1 className="loginh1">Login</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)}/>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                    <button type="submit">Login</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}